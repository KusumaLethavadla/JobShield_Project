import React from 'react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  FileCheck,
  ExternalLink,
  MessageSquare,
  Users,
  ArrowRight,
  ShieldAlert as ScamAlertIcon
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setActivePage } = useApp();

  const features = [
    {
      title: 'AI Fake Job Detection',
      desc: 'Paste description, texts, or links to calculate risk scores based on recruiters behavior pattern analysis.',
      icon: ShieldAlert,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      action: () => setActivePage('verify-job')
    },
    {
      title: 'Trusted Job Listings',
      desc: 'Browse manually verified and vetted student part-time jobs, campus opportunities, and freelance contracts.',
      icon: ShieldCheck,
      color: 'text-brand-green bg-brand-green/10 border-brand-green/20',
      action: () => setActivePage('trusted-jobs')
    },
    {
      title: 'Resume Builder',
      desc: 'Build clean, ATS-friendly resumes directly designed to pass recruiter scanners and export them to PDF.',
      icon: FileCheck,
      color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
      action: () => setActivePage('resume-builder')
    },
    {
      title: 'Company Verification',
      desc: 'Search registration directories, Trust Scores, social profiles, and employee metrics of potential employers.',
      icon: Search,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      action: () => setActivePage('verify-company')
    },
    {
      title: 'Scam Report Portal',
      desc: 'Contribute to the student network safety by reporting suspicious contacts, WhatsApp messages, or links.',
      icon: ScamAlertIcon,
      color: 'text-red-500 bg-red-500/10 border-red-500/20',
      action: () => setActivePage('report-scam')
    },
    {
      title: 'Community Reviews',
      desc: 'Read real hiring feedback, working experiences, and recommendations submitted by other students.',
      icon: Users,
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
      action: () => setActivePage('reviews')
    },
    {
      title: 'Safe Apply Links',
      desc: 'Avoid malware, trackers, or phishing sites with secured application redirection links.',
      icon: ExternalLink,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      action: () => setActivePage('trusted-jobs')
    },
    {
      title: 'Real-time Scam Alerts',
      desc: 'Receive live updates about active hiring fraud, spoofed company domain names, and phishing formats.',
      icon: MessageSquare,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      action: () => setActivePage('scam-awareness')
    }
  ];

  return (
    <div className="space-y-16 py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Hero details */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border dark:border-white/10 light:border-slate-200 dark:bg-slate-900/40 light:bg-white text-xs font-semibold">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-slate-400">Trusted by 10,000+ Students Nationwide</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] dark:text-white light:text-slate-900">
            Find Genuine
            <span className="block mt-1 bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-green bg-clip-text text-transparent">
              Part-Time Jobs.
            </span>
            Avoid Scams.
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-xl font-medium leading-relaxed">
            AI-powered job verification platform designed for students. Protect your bank accounts and identity from fake social media recruiters.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePage('verify-job')}
              className="py-3 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold transition-all hover:scale-102 flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-blue/15"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('scam-awareness')}
              className="py-3 px-6 rounded-xl border dark:border-white/10 light:border-slate-300 dark:bg-slate-900/20 light:bg-white hover:bg-slate-100 dark:hover:bg-white/5 dark:text-slate-200 light:text-slate-700 font-bold transition-all cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Animated illustration (Student searching protected by AI Shield) */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] relative">
            
            {/* Core Shield (AI protection ring) */}
            <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 dark:border-brand-blue/10 animate-[spin_12s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-dashed border-brand-green/20 dark:border-brand-green/10 animate-[spin_8s_linear_infinite_reverse]" />
            
            {/* Background glowing circle */}
            <div className="absolute inset-16 bg-gradient-to-tr from-brand-blue to-brand-green rounded-full opacity-10 dark:opacity-20 blur-2xl animate-pulse" />

            {/* Glowing Shield Ring */}
            <div className="absolute inset-20 rounded-full border-4 border-brand-blue/30 dark:border-brand-blue/20 flex items-center justify-center animate-float">
              
              {/* Central Student Avatar Vibe */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900 dark:bg-slate-950 border-2 border-brand-blue flex flex-col items-center justify-center overflow-hidden shadow-2xl relative">
                
                {/* Simulated Student Drawing */}
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 mt-2 flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <div className="w-16 h-10 bg-slate-800 rounded-t-2xl border-t border-slate-700 mt-1" />
                
                {/* Mini shield badge */}
                <div className="absolute bottom-1 bg-brand-green/90 text-white p-1 rounded-full border border-slate-950">
                  <ShieldCheck className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Floating Job post icons being vetted */}
            <div className="absolute top-4 left-6 py-2 px-3 rounded-xl glass-panel border border-brand-green-light/40 shadow-xl flex items-center gap-2 hover:scale-105 transition-transform duration-300 select-none animate-float">
              <span className="text-base text-brand-green">🟢</span>
              <div className="text-[10px] text-left">
                <p className="font-bold dark:text-white light:text-slate-900">Vercel Inc.</p>
                <p className="text-slate-400 font-medium">Remote TA Vetted</p>
              </div>
            </div>

            <div className="absolute bottom-12 left-2 py-2 px-3 rounded-xl glass-panel border border-red-500/40 shadow-xl flex items-center gap-2 hover:scale-105 transition-transform duration-300 select-none animate-float [animation-delay:1.5s]">
              <span className="text-base text-red-500">🔴</span>
              <div className="text-[10px] text-left">
                <p className="font-bold dark:text-white light:text-slate-900">WhatsApp HR</p>
                <p className="text-slate-400 font-medium">Scam Flagged</p>
              </div>
            </div>

            <div className="absolute top-1/3 right-0 py-2 px-3 rounded-xl glass-panel border border-amber-500/40 shadow-xl flex items-center gap-2 hover:scale-105 transition-transform duration-300 select-none animate-float [animation-delay:2.5s]">
              <span className="text-base text-amber-500">🟡</span>
              <div className="text-[10px] text-left">
                <p className="font-bold dark:text-white light:text-slate-900">Direct Telegram</p>
                <p className="text-slate-400 font-medium">Suspicious Post</p>
              </div>
            </div>

            <div className="absolute bottom-4 right-10 py-1 px-2.5 rounded-lg bg-brand-blue/20 text-brand-blue border border-brand-blue/30 text-[9px] font-bold tracking-wider uppercase animate-pulse select-none">
              AI Guardian Active
            </div>

          </div>
        </div>

      </section>

      {/* Statistics section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Fake Jobs Blocked', val: '45,290+' },
          { label: 'Vetted Students Supported', val: '12,400+' },
          { label: 'Safe Postings Available', val: '430+' },
          { label: 'Accuracy Rating', val: '99.4%' },
        ].map((stat, i) => (
          <GlassCard key={i} className="text-center p-4 py-6" hoverable={false}>
            <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">{stat.val}</p>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wide">{stat.label}</p>
          </GlassCard>
        ))}
      </section>

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900">Vigilant Features Built for Students</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto font-medium">
            Discover a comprehensive suite of security tools to navigate online recruitment safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <GlassCard
                key={i}
                onClick={feat.action}
                className="flex flex-col text-left justify-between h-56"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base mt-4 dark:text-white light:text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{feat.desc}</p>
                </div>
                <div className="text-xs font-semibold text-brand-blue mt-4 flex items-center gap-1 hover:underline">
                  Launch tool <ArrowRight className="w-3 h-3" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Interactive Safety CTA Banner */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border dark:border-white/5 light:border-slate-200 bg-slate-900/25">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-xl text-left space-y-6">
          <span className="text-xs font-extrabold tracking-wider uppercase bg-brand-blue/15 text-brand-blue py-1 px-3 rounded-full border border-brand-blue/20">
            Realtime Protection
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight dark:text-white light:text-slate-900">
            Received a sketchy DM or message template?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed font-medium">
            Paste the message inside our AI scanning engine. We verify company registers, free domain patterns, and request parameters immediately.
          </p>
          <button
            onClick={() => setActivePage('verify-job')}
            className="py-3 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold transition-all hover:scale-102 flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-blue/15"
          >
            Scan Recruiter Message <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
