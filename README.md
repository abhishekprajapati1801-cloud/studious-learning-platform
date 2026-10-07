# Studious

**A student learning and career guidance platform.** Studious combines subject quizzes, a learning dashboard, performance charts, and career suggestions in a responsive React app.

## Features

- Account registration and sign-in with scrypt password hashing
- Signed, HTTP-only session cookies and protected dashboard/quiz routes
- SQLite-backed accounts and sessions, with persistent storage support on Render
- Timed quizzes and a personalized progress dashboard
- Contact form API with optional email delivery
- Existing visual design preserved

## Technology

React 19, TypeScript, Vite, Tailwind CSS, Express, and SQLite (`better-sqlite3`). The Express server serves both the API and the built frontend from one deployable service.

## Run locally

Requirements: Node.js 22.18 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`, choose **Login / Signup**, and create an account. Quiz results are saved in browser storage on that device.

Useful checks:

```bash
npm run lint
npm run build
```

## Deploy to Render

The included `render.yaml` configures the frontend and API as one web service and mounts a persistent disk for the SQLite database. Render's configured Starter service and disk are paid resources; check current pricing in your Render account before applying the blueprint.

1. Push this repository to GitHub.
2. In Render, select **New → Blueprint** and connect the repository.
3. Review the service and disk costs, then apply the blueprint. Render generates `SESSION_SECRET` and provides the public HTTPS URL.
4. To enable contact email, configure `EMAIL_USER`, `EMAIL_PASS` (a Gmail app password), and `CONTACT_TO` in the service environment settings.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account and sign in |
| `POST` | `/api/auth/login` | Sign in |
| `GET` | `/api/auth/me` | Get the signed-in account |
| `POST` | `/api/auth/logout` | End the session |
| `POST` | `/api/contact` | Submit a contact message |

## Configuration

See [.env.example](.env.example). In production, set a unique `SESSION_SECRET` and a persistent `DATA_DIR`. Never commit `.env` files, credentials, or database files.
