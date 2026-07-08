import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { ShieldCheck, Target } from 'lucide-react';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sofia Martinez',
      role: 'Founding Engineer & Cybersecurity Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
      bio: 'Ex-security research engineer specialized in digital communication fraud frameworks.'
    },
    {
      name: 'Marcus Chen',
      role: 'Student Relations & Partnerships Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      bio: 'Coordinates manual vetting operations and organizes campus hackathon integrations.'
    }
  ];

  return (
    <div className="space-y-12 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Mission Header */}
      <section className="space-y-4">
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl dark:text-white light:text-slate-900 font-display">Securing Student Careers</h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-medium">
          JobShield was founded to defend college students from predatory digital hiring scams. Millions of dollars are lost yearly to malicious coordinators posing as company HR leads.
        </p>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverable={false} className="p-6 text-center space-y-2">
          <h3 className="text-4xl font-extrabold text-brand-blue">Thousands</h3>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Of students lose money to fake recruiters yearly</p>
        </GlassCard>
        <GlassCard hoverable={false} className="p-6 text-center space-y-2">
          <h3 className="text-4xl font-extrabold text-brand-green">$1.2M+</h3>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Saved in deposits and phishing preventions</p>
        </GlassCard>
        <GlassCard hoverable={false} className="p-6 text-center space-y-2">
          <h3 className="text-4xl font-extrabold text-purple-500">10+ Universities</h3>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Directly partner with JobShield checkmarks</p>
        </GlassCard>
      </section>

      {/* Vision & Mission Core Panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard hoverable={false} className="space-y-3">
          <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base dark:text-white light:text-slate-900">Our Vision</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            To create an online hiring environment where students can secure part-time roles and internships without fear of malware, fee scams, or identity data theft.
          </p>
        </GlassCard>

        <GlassCard hoverable={false} className="space-y-3">
          <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base dark:text-white light:text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Building open-source, crowdsourced, and machine-learning heuristic models to analyze hiring post details, catalog fraudulent agents, and verify business registries.
          </p>
        </GlassCard>
      </section>

      {/* Team section */}
      <section className="space-y-6">
        <h3 className="font-display font-extrabold text-xl dark:text-white light:text-slate-900 font-display">Meet the Team</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((tm, idx) => (
            <GlassCard key={idx} hoverable={false} className="flex gap-4 p-5 items-start">
              <img src={tm.avatar} alt={tm.name} className="w-16 h-16 rounded-xl object-cover bg-slate-800 border dark:border-white/5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm dark:text-white light:text-slate-900">{tm.name}</h4>
                <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">{tm.role}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">{tm.bio}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

    </div>
  );
};
