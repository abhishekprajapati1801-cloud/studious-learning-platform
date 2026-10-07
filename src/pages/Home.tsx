import { motion } from 'motion/react';
import HeroAnimation from '../components/HeroAnimation';
import ReviewMarquee from '../components/ReviewMarquee';
import ContactSection from '../components/ContactSection';
import { ArrowRight, BookOpen, Target, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand rounded-full text-sm font-bold mb-6">
                Next-Gen Adaptive Learning
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Master Science with <span className="text-brand">Cognitive AI</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Personalized learning paths for 11th & 12th standard students.
                Identify your strengths, overcome weaknesses, and plan your future career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="bg-brand text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Studious?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform uses advanced cognitive AI to adapt to your unique learning style and pace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "Adaptive Learning",
                desc: "Difficulty levels adjust automatically based on your performance to keep you challenged but not overwhelmed."
              },
              {
                icon: Target,
                title: "Performance Tracking",
                desc: "Detailed analytics for Maths, Physics, Chemistry, and more. Visualize your growth over time."
              },
              {
                icon: BookOpen,
                title: "Career Guidance",
                desc: "Get personalized degree suggestions based on your subject strengths and academic interests."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-brand/5 hover:border-brand/20 transition-all group"
              >
                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReviewMarquee />

      <ContactSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-brand p-1.5 rounded-lg">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Studious<span className="text-brand">.</span>
            </span>
          </div>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Empowering the next generation of scientists and engineers through adaptive cognitive AI.
          </p>
          <div className="border-t border-slate-800 pt-8 text-sm text-slate-500">
            © 2026 Studious Learning Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
