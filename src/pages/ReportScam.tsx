import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import { AlertTriangle, CheckCircle, Upload, X } from 'lucide-react';

export const ReportScam: React.FC = () => {
  const { submitScamReport } = useApp();
  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [description, setDescription] = useState('');
  
  // screenshot upload simulator
  const [screenshotName, setScreenshotName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !description.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      submitScamReport({
        companyName,
        recruiterName: recruiterName || 'Unknown Agent',
        jobLink: jobLink || 'N/A',
        description
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setCompanyName('');
    setRecruiterName('');
    setJobLink('');
    setDescription('');
    setScreenshotName(null);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-xl mx-auto text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header details */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-500/10 text-red-500 py-1 px-3 rounded-full border border-red-500/20">
          <AlertTriangle className="w-3.5 h-3.5" /> Crowdsourced Safety Network
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900 font-display">Report Fake Recruitment</h2>
        <p className="text-slate-400 text-xs font-medium">Have you been contacted by a suspicious agent requesting money or files? File a report below. Our team reviews all logs daily.</p>
      </div>

      {!isSuccess ? (
        <GlassCard hoverable={false} className="border-red-500/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Company Name / Recruiter Profile Name (Required)</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Media Group / Clara HR Manager"
                className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* Recruiter Contact details */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Recruiter WhatsApp/Telegram handles or Contact Phone</label>
              <input
                type="text"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                placeholder="e.g. Telegram: @clara_hr / Phone: +62 813..."
                className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* Job link */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Recruitment Link or Referral URL</label>
              <input
                type="text"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="e.g. Direct Telegram group link or email domain website..."
                className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Scam Description & Details (Required)</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about payment requests, security deposit amounts, task models, or OTP prompts they asked for..."
                className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue leading-relaxed"
              />
            </div>

            {/* Screenshot upload simulation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Screenshot upload (Optional)</label>
              
              {screenshotName ? (
                <div className="p-3 rounded-xl border border-brand-blue/30 bg-brand-blue/5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-brand-blue flex items-center gap-1.5">🖼️ {screenshotName}</span>
                  <button
                    type="button"
                    onClick={() => setScreenshotName(null)}
                    className="p-1 rounded-lg hover:bg-red-500/10 text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setScreenshotName('screenshot_wa_chat_apex_2026.png')}
                  className="w-full py-4 border-2 border-dashed dark:border-white/10 light:border-slate-300 rounded-xl hover:border-brand-blue transition-all flex flex-col items-center justify-center gap-1 text-slate-400 text-xs font-bold cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  Upload Scam Conversation Screenshot
                </button>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-red-600/15
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? 'Filing Security Report...' : 'File Security Report'}
              </button>
            </div>

          </form>
        </GlassCard>
      ) : (
        <GlassCard hoverable={false} className="text-center p-10 border-brand-green/20 space-y-6">
          <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-xl dark:text-white light:text-slate-900">Thank you. Our team will review this report.</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto font-medium">
              We appreciate you taking steps to keep other students safe. Verified logs will be indexed in our directory to help warn future candidates.
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={handleReset}
              className="py-2 px-5 rounded-xl border dark:border-white/5 light:border-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold cursor-pointer"
            >
              Report Another Scam
            </button>
          </div>
        </GlassCard>
      )}

    </div>
  );
};
