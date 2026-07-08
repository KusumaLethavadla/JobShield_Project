import React from 'react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import { AnalyticsChart } from '../components/AnalyticsChart';
import {
  ShieldAlert,
  Bookmark,
  Award,
  ChevronRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    userProfile,
    bookmarkedJobs,
    appliedJobs,
    scanHistory,
    jobs,
    setActivePage,
    setShowVerifyModal
  } = useApp();

  const handleActionClick = (page: 'verify-job' | 'trusted-jobs' | 'report-scam' | 'resume-builder') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find job items for bookmarked list
  const savedJobsData = jobs.filter(j => bookmarkedJobs.includes(j.id));

  return (
    <div className="space-y-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900 font-display">Student Workspace Dashboard</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Review verified opportunities, recent scam reports, and analyze security stats.</p>
        </div>

        {userProfile?.isStudentVerified ? (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green bg-brand-green/10 border border-brand-green/20 py-1.5 px-4 rounded-xl">
            <Award className="w-4 h-4 text-brand-green animate-bounce" /> Certified Student Member
          </div>
        ) : (
          <button
            onClick={() => setShowVerifyModal(true)}
            className="py-2 px-4 rounded-xl border border-amber-500 bg-amber-500/10 text-amber-500 text-xs font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
          >
            Verify Student Status
          </button>
        )}
      </div>

      {/* Profile & Main Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* User Card info */}
        <div className="lg:col-span-4">
          <GlassCard hoverable={false} className="h-full flex flex-col justify-between py-8">
            <div className="space-y-6 text-center">
              {/* Avatar circle */}
              <div className="w-20 h-20 bg-brand-blue/15 text-brand-blue rounded-full border border-brand-blue/20 flex items-center justify-center text-3xl font-bold mx-auto">
                {userProfile?.username.charAt(0)}
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-lg dark:text-white light:text-slate-900">{userProfile?.username}</h3>
                <p className="text-xs text-slate-400 font-semibold">{userProfile?.email}</p>
                {userProfile?.universityName && (
                  <p className="text-[11px] text-brand-blue font-bold mt-1.5 flex items-center justify-center gap-1">🏫 {userProfile.universityName}</p>
                )}
              </div>
            </div>

            <div className="border-t dark:border-white/5 my-6" />

            <div className="space-y-3.5 text-xs font-semibold text-slate-400 px-2">
              <div className="flex justify-between"><span>Jobs Applied</span> <span className="dark:text-white text-slate-800">{appliedJobs.length}</span></div>
              <div className="flex justify-between"><span>Saved Bookmarks</span> <span className="dark:text-white text-slate-800">{bookmarkedJobs.length}</span></div>
              <div className="flex justify-between"><span>AI Scans Run</span> <span className="dark:text-white text-slate-800">{scanHistory.length}</span></div>
            </div>
          </GlassCard>
        </div>

        {/* Dynamic Analytics Chart Widget */}
        <div className="lg:col-span-8">
          <GlassCard hoverable={false} className="h-full">
            <AnalyticsChart />
          </GlassCard>
        </div>

      </div>

      {/* Center layout lists (Recent Scans, Saved/Applied Jobs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Saved & Applied list */}
        <div className="space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Bookmark className="w-4.5 h-4.5 text-brand-blue" /> Saved & Vetted Jobs ({savedJobsData.length})
          </h3>

          {savedJobsData.length === 0 ? (
            <GlassCard hoverable={false} className="p-8 text-center space-y-2">
              <p className="text-xs text-slate-400 font-semibold">No saved jobs found</p>
              <button
                onClick={() => handleActionClick('trusted-jobs')}
                className="text-xs font-bold text-brand-blue hover:underline cursor-pointer"
              >
                Browse Vetted Opportunities &rarr;
              </button>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {savedJobsData.map(job => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/20 light:bg-white flex justify-between items-center text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <img src={job.logo} alt={job.company} className="w-8 h-8 rounded-lg object-cover bg-slate-800 shrink-0" />
                    <div>
                      <h4 className="font-bold dark:text-white light:text-slate-800">{job.title}</h4>
                      <p className="text-slate-400 font-medium">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleActionClick('trusted-jobs')}
                    className="p-1 rounded-lg text-brand-blue hover:bg-brand-blue/10 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* History scanned lists */}
        <div className="space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ShieldAlert className="w-4.5 h-4.5 text-red-500 animate-pulse" /> Recent AI Analyses ({scanHistory.length})
          </h3>

          {scanHistory.length === 0 ? (
            <GlassCard hoverable={false} className="p-8 text-center space-y-2">
              <p className="text-xs text-slate-400 font-semibold">No job posts scanned yet</p>
              <button
                onClick={() => handleActionClick('verify-job')}
                className="text-xs font-bold text-brand-blue hover:underline cursor-pointer"
              >
                Test AI Verification &rarr;
              </button>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {scanHistory.slice(0, 4).map(item => (
                <div
                  key={item.id}
                  onClick={() => handleActionClick('verify-job')}
                  className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/20 light:bg-white hover:border-brand-blue/30 transition-colors cursor-pointer flex justify-between items-center text-xs font-semibold"
                >
                  <div>
                    <h4 className="font-bold dark:text-slate-200 light:text-slate-800 line-clamp-1 italic">"{item.text}"</h4>
                    <p className="text-slate-400 font-medium mt-0.5">{item.timestamp}</p>
                  </div>
                  <span className={`py-0.5 px-2 rounded-md font-bold ${
                    item.result.status === 'scam' ? 'bg-red-500/10 text-red-500' :
                    item.result.status === 'suspicious' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-brand-green/10 text-brand-green'
                  }`}>
                    Risk: {item.result.score}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
