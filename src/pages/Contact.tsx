import React, { useState } from 'react';
import { FAQ_ITEMS } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0); // Default open first
  
  // Feedback form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(prev => (prev === index ? null : index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMsg('');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Left side: FAQ Accordion */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-1">
          <h2 className="font-display font-extrabold text-2xl dark:text-white light:text-slate-900 font-display">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs font-medium">Clear answers about job scanning, verification processes, and safety checks.</p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openFAQIndex === i;
            return (
              <div
                key={i}
                className="glass-panel rounded-2xl border dark:border-white/5 light:border-slate-200 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between p-4 font-semibold text-xs dark:text-slate-200 light:text-slate-800 hover:bg-white/5 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2"><HelpCircle className="w-4.5 h-4.5 text-brand-blue" /> {faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-blue' : 'text-slate-400'}`} />
                </button>

                {isOpen && (
                  <div className="p-4 border-t dark:border-white/5 light:border-slate-100 text-xs dark:text-slate-400 light:text-slate-600 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: Contact Details & Feedback form */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Contact direct credentials */}
        <GlassCard hoverable={false} className="space-y-3">
          <h3 className="font-bold text-sm dark:text-white light:text-slate-900">Direct Contacts</h3>
          <div className="space-y-3 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-3.5"><Mail className="w-4.5 h-4.5 text-brand-blue" /> <span>support@jobshield.org</span></div>
            <div className="flex items-center gap-3.5"><Phone className="w-4.5 h-4.5 text-brand-green" /> <span>+1 (800) 555-SAFE</span></div>
            <div className="flex items-center gap-3.5"><MapPin className="w-4.5 h-4.5 text-purple-500" /> <span>University Tech Labs, Suite 104</span></div>
          </div>
        </GlassCard>

        {/* Feedback form */}
        <GlassCard hoverable={false} className="border-brand-blue/15">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-sm dark:text-white light:text-slate-900">Platform Feedback</h3>
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Let us know if you find layout errors, want custom features, or found bugs.</p>

              <div className="space-y-1 text-xs font-semibold">
                <label className="text-slate-400">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white"
                />
              </div>

              <div className="space-y-1 text-xs font-semibold">
                <label className="text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@university.edu"
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white"
                />
              </div>

              <div className="space-y-1 text-xs font-semibold">
                <label className="text-slate-400">Message</label>
                <textarea
                  rows={3}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us what you think or what we can build..."
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                {isSubmitting ? 'Transmitting...' : 'Send Feedback'} <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm dark:text-white light:text-slate-900">Message Received!</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-semibold max-w-xs mx-auto">We review comments weekly and will update registers appropriately.</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="py-1.5 px-4 rounded-lg bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Send another message
              </button>
            </div>
          )}
        </GlassCard>

      </div>

    </div>
  );
};
