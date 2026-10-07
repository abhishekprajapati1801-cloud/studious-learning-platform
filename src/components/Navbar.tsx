import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, LogIn, Phone, Home as HomeIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Contact Us', path: '#contact', icon: Phone },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">
              Studious<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={link.name === 'Contact Us' ? handleContactClick : undefined}
                className="text-slate-600 hover:text-brand font-medium transition-colors flex items-center gap-1.5"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
            {!isDashboard && (
              <Link
                to="/login"
                className="bg-brand text-white px-6 py-2 rounded-full font-semibold hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login / Signup
              </Link>
            )}
            {isDashboard && (
              <button
                onClick={handleLogout}
                className="text-slate-600 hover:text-brand font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-brand transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={link.name === 'Contact Us' ? handleContactClick : () => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-brand hover:bg-brand/5 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </div>
                </Link>
              ))}
              {!isDashboard && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-bold text-white bg-brand rounded-xl shadow-lg shadow-brand/20"
                >
                  <div className="flex items-center gap-3">
                    <LogIn className="w-5 h-5" />
                    Login / Signup
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
