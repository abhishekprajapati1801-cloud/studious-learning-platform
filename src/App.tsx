import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then((response) => setAuthorized(response.ok))
      .catch(() => setAuthorized(false));
  }, []);
  if (authorized === null) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading your learning space…</div>;
  return authorized ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-brand/30 selection:text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
