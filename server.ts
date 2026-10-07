import express from "express";
import { createServer as createViteServer } from "vite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { promisify } from "node:util";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const scrypt = promisify(crypto.scrypt);
const dbDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
fs.mkdirSync(dbDir, { recursive: true });
const db = new Database(path.join(dbDir, "studious.sqlite"));
db.pragma("journal_mode = WAL");
db.exec(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, salt TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
db.exec(`CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires INTEGER NOT NULL)`);
const SESSION_COOKIE = "studious_session";
const sessionSecret = process.env.SESSION_SECRET || "development-only-change-this-secret";
if (process.env.NODE_ENV === "production" && sessionSecret.length < 32) {
  throw new Error("Set SESSION_SECRET to a unique random value of at least 32 characters in production.");
}
const authAttempts = new Map<string, { count: number; resetAt: number }>();
function limitAuthAttempts(req: express.Request, res: express.Response, next: express.NextFunction) {
  const key = `${req.path}:${req.ip}`;
  const now = Date.now();
  let entry = authAttempts.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + 15 * 60 * 1000 };
    authAttempts.set(key, entry);
  }
  if (entry.count >= 10) {
    res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
    return res.status(429).json({ message: "Too many attempts. Please wait a few minutes and try again." });
  }
  entry.count += 1;
  if (authAttempts.size > 5000) {
    for (const [attemptKey, attempt] of authAttempts) if (attempt.resetAt <= now) authAttempts.delete(attemptKey);
  }
  return next();
}

function cookieValue(req: express.Request, name: string) {
  const item = req.headers.cookie?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return item ? decodeURIComponent(item.slice(name.length + 1)) : undefined;
}
function sessionSignature(id: string) { return crypto.createHmac("sha256", sessionSecret).update(id).digest("hex"); }
function issueSession(res: express.Response, userId: string) {
  const id = crypto.randomBytes(32).toString("hex");
  const maxAge = 7 * 24 * 60 * 60;
  db.prepare("INSERT INTO sessions (id, user_id, expires) VALUES (?, ?, ?)").run(id, userId, Date.now() + maxAge * 1000);
  res.cookie(SESSION_COOKIE, `${id}.${sessionSignature(id)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: maxAge * 1000, path: "/" });
}
function currentUser(req: express.Request) {
  const value = cookieValue(req, SESSION_COOKIE);
  if (!value) return undefined;
  const [id, signature] = value.split(".");
  const expected = sessionSignature(id || "");
  if (!id || !signature || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return undefined;
  const session = db.prepare("SELECT user_id, expires FROM sessions WHERE id = ?").get(id) as { user_id: string; expires: number } | undefined;
  if (!session || session.expires < Date.now()) { if (session) db.prepare("DELETE FROM sessions WHERE id = ?").run(id); return undefined; }
  return db.prepare("SELECT id, name, email FROM users WHERE id = ?").get(session.user_id) as { id: string; name: string; email: string } | undefined;
}

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "20kb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  app.post("/api/auth/register", limitAuthAttempts, async (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (name.length < 2 || name.length > 80) return res.status(400).json({ message: "Enter your name (2–80 characters)." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ message: "Enter a valid email address." });
    if (password.length < 8 || password.length > 128) return res.status(400).json({ message: "Use a password between 8 and 128 characters." });
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    const id = crypto.randomUUID();
    try {
      db.prepare("INSERT INTO users (id, name, email, salt, password_hash) VALUES (?, ?, ?, ?, ?)").run(id, name, email, salt, hash.toString("hex"));
      issueSession(res, id);
      return res.status(201).json({ user: { id, name, email } });
    } catch (error: any) {
      if (error?.code === "SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({ message: "An account with this email already exists. Sign in instead." });
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Could not create your account. Please try again." });
    }
  });

  app.post("/api/auth/login", limitAuthAttempts, async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    const user = db.prepare("SELECT id, name, email, salt, password_hash FROM users WHERE email = ?").get(email) as { id: string; name: string; email: string; salt: string; password_hash: string } | undefined;
    const candidate = (await scrypt(password, user?.salt || "constant-time-dummy-salt", 64)) as Buffer;
    if (!user || !crypto.timingSafeEqual(candidate, Buffer.from(user.password_hash, "hex"))) return res.status(401).json({ message: "Email or password is incorrect." });
    issueSession(res, user.id);
    return res.json({ user: { id: user.id, name: user.name, email: user.email } });
  });

  app.get("/api/auth/me", (req, res) => {
    const user = currentUser(req);
    return user ? res.json({ user }) : res.status(401).json({ message: "Please sign in to continue." });
  });
  app.post("/api/auth/logout", (req, res) => {
    const value = cookieValue(req, SESSION_COOKIE);
    if (value) db.prepare("DELETE FROM sessions WHERE id = ?").run(value.split(".")[0]);
    res.clearCookie(SESSION_COOKIE, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    return res.json({ success: true });
  });

  app.post("/api/contact", async (req, res) => {
    const { firstName, lastName, email, message } = req.body || {};
    if (![firstName, lastName, email, message].every((value) => typeof value === "string") || !email.includes("@") || message.trim().length < 5) return res.status(400).json({ success: false, message: "Please complete all fields with a valid email and message." });
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return res.status(503).json({ success: false, message: "Contact email is not configured yet. Please try again later." });
    try {
      const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
      await transporter.sendMail({ from: process.env.EMAIL_USER, to: process.env.CONTACT_TO || process.env.EMAIL_USER, subject: `New Studious Query from ${firstName} ${lastName}`, text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`, replyTo: email });
      return res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) { console.error("Contact email error:", error); return res.status(500).json({ success: false, message: "Failed to send message. Please try again later." }); }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  const port = Number(process.env.PORT || 3000);
  app.listen(port, "0.0.0.0", () => console.log(`Studious server listening on port ${port}`));
}
startServer();
