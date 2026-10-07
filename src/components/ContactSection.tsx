import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

const CONTACT_PHONE = '+91 8369135933';
const CONTACT_PHONE_LINK = '+918369135933';
const CONTACT_EMAIL = 'abhishekprajapati1801@gmail.com';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setErrorMessage(result?.message || 'We could not send your message right now.');
        setStatus('error');
      }
    } catch (error) {
      console.error("Contact error:", error);
      setErrorMessage('The contact service is temporarily unavailable.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Get in Touch</h2>
            <p className="text-lg text-slate-600 mb-10">
              Have questions about our adaptive learning system? We're here to help you on your educational journey.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Call Us</p>
                  <a href={`tel:${CONTACT_PHONE_LINK}`} className="text-lg text-slate-800 font-bold hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" aria-label={`Call ${CONTACT_PHONE}`}>
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Email Us</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg text-slate-800 font-bold hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Visit Us</p>
                  <p className="text-lg text-slate-800 font-bold">Parul University, Vadodara, Gujarat</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-brand/10 shadow-xl shadow-brand/5">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-600">Thank you for reaching out. We will reply to the email address you provided.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-brand font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                    <p className="font-semibold">{errorMessage}</p>
                    <p className="mt-1">
                      Please contact us directly by <a className="font-bold underline" href={`mailto:${CONTACT_EMAIL}`}>email</a> or <a className="font-bold underline" href={`tel:${CONTACT_PHONE_LINK}`}>phone</a>.
                    </p>
                  </div>
                )}

                <button
                  disabled={status === 'loading'}
                  className="w-full bg-brand text-white py-4 rounded-xl font-bold hover:bg-brand/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

