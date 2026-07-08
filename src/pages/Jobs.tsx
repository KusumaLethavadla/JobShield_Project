import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Job } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  ShieldCheck,
  Filter,
  CheckCircle,
  X
} from 'lucide-react';

export const Jobs: React.FC = () => {
  const {
    jobs,
    bookmarkedJobs,
    appliedJobs,
    toggleBookmark,
    applyForJob,
    isLoggedIn,
    userProfile,
    setShowAuthModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeJobDetail, setActiveJobDetail] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  // Apply form state
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const categories = [
    'All',
    'Work From Home',
    'Data Entry',
    'Content Writing',
    'Teaching',
    'Internships',
    'Freelancing',
    'Campus Ambassador',
    'Web Development',
    'Graphic Design',
    'Digital Marketing'
  ];

  // Filtering Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category mapping or match
    const matchesCategory = selectedCategory === 'All' || 
                            job.category === selectedCategory ||
                            (selectedCategory === 'Work From Home' && job.type === 'Work From Home');

    const matchesType = selectedType === 'All' || job.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleOpenApply = (job: Job) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setActiveJobDetail(job);
    setShowApplyModal(true);
    setApplySuccess(false);
    setResumeUploaded(false);
    setCoverLetter('');
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobDetail) return;
    setIsApplying(true);
    
    setTimeout(() => {
      applyForJob(activeJobDetail.id);
      setIsApplying(false);
      setApplySuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900">Vetted Student Jobs</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Browse opportunities verified manually by the JobShield audit network. Purely safe apply links.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 flex items-center">
          <input
            type="text"
            placeholder="Search roles or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue dark:text-white light:text-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        </div>
      </div>

      {/* Main Jobs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Filter Options */}
        <div className="lg:col-span-3 space-y-4 sticky top-24">
          
          {/* Categories select */}
          <div className="glass-panel rounded-2xl p-4 border dark:border-white/5 light:border-slate-200">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
              <Filter className="w-4.5 h-4.5 text-brand-blue" /> Filter by Category
            </h3>
            
            <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    w-full text-left py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer
                    ${selectedCategory === cat
                      ? 'bg-brand-blue/15 text-brand-blue border-l-2 border-brand-blue'
                      : 'dark:text-slate-300 dark:hover:bg-white/5 light:text-slate-600 light:hover:bg-slate-100'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Type Select */}
          <div className="glass-panel rounded-2xl p-4 border dark:border-white/5 light:border-slate-200">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Job Environment</h3>
            <div className="space-y-2">
              {['All', 'Work From Home', 'Hybrid', 'On Site'].map((type) => (
                <label key={type} className="flex items-center gap-2 text-xs font-semibold dark:text-slate-300 light:text-slate-600 cursor-pointer">
                  <input
                    type="radio"
                    name="jobType"
                    checked={selectedType === type}
                    onChange={() => setSelectedType(type)}
                    className="accent-brand-blue"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Jobs feed cards & detail panel */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Jobs found: {filteredJobs.length}</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 border border-dashed dark:border-white/10 light:border-slate-200 rounded-2xl">
              <span className="text-3xl">🔍</span>
              <p className="text-sm text-slate-400 mt-2 font-semibold">No active jobs found for your filters</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the filters or modifying your search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const isBookmarked = bookmarkedJobs.includes(job.id);
                const isApplied = appliedJobs.includes(job.id);
                return (
                  <GlassCard
                    key={job.id}
                    className="flex flex-col justify-between h-[250px] border-brand-blue/5"
                  >
                    <div>
                      {/* Logo and metadata */}
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex gap-3">
                          <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0" />
                          <div className="text-left space-y-0.5">
                            <div className="flex items-center gap-1">
                              <h4 className="font-bold text-sm dark:text-slate-100 light:text-slate-800 line-clamp-1">{job.title}</h4>
                              {job.isVerified && <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />}
                            </div>
                            <p className="text-xs text-slate-400 font-semibold">{job.company}</p>
                          </div>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(job.id);
                          }}
                          className={`p-1.5 rounded-lg border dark:border-white/5 light:border-slate-200 dark:hover:bg-white/5 light:hover:bg-slate-100 transition-colors cursor-pointer ${
                            isBookmarked ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' : 'text-slate-400'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-3.5 mt-4 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-blue" /> {job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-brand-green" /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-500" /> {job.type}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-400 line-clamp-2 mt-4 font-medium leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between border-t dark:border-white/5 light:border-slate-100 pt-3 mt-4">
                      <span className="text-[10px] text-slate-500 font-medium">Posted {job.postedTime}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenApply(job)}
                          disabled={isApplied}
                          className={`
                            py-1.5 px-4 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer
                            ${isApplied
                              ? 'bg-brand-green/20 text-brand-green border border-brand-green/20 cursor-not-allowed'
                              : 'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-md shadow-brand-blue/10'
                            }
                          `}
                        >
                          {isApplied ? 'Applied ✓' : 'Apply Securely'}
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Simulated Application Modal */}
      {showApplyModal && activeJobDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 no-print">
          <div className="w-full max-w-lg glass-panel border border-brand-blue/30 rounded-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border dark:border-white/5 light:border-slate-200 dark:hover:bg-white/5 light:hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {!applySuccess ? (
              <form onSubmit={handleConfirmApply} className="space-y-4">
                <div className="flex items-start gap-3 border-b dark:border-white/5 pb-4">
                  <img src={activeJobDetail.logo} alt={activeJobDetail.company} className="w-12 h-12 rounded-xl object-cover bg-slate-800" />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base dark:text-white light:text-slate-900">{activeJobDetail.title}</h3>
                      {activeJobDetail.isVerified && <ShieldCheck className="w-4 h-4 text-brand-green" />}
                    </div>
                    <p className="text-xs text-slate-400 font-semibold">{activeJobDetail.company} • {activeJobDetail.location}</p>
                  </div>
                </div>

                <div className="text-left space-y-3">
                  <div className="p-3 bg-brand-green/5 border border-brand-green/20 rounded-xl flex items-start gap-2 text-xs font-semibold text-brand-green">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>JobShield Verified: This link is secured. No upfront deposits or OTP exchanges will ever occur on this pathway.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Applicant Details</label>
                    <div className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/30 light:bg-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold dark:text-white light:text-slate-900">{userProfile?.username}</p>
                        <p className="text-slate-400 font-medium mt-0.5">{userProfile?.email}</p>
                      </div>
                      {userProfile?.isStudentVerified && (
                        <span className="bg-brand-green/20 text-brand-green py-0.5 px-2.5 rounded-full text-[9px] font-bold border border-brand-green/20">Verified Student</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Resume / CV (Required)</label>
                    <div className="flex items-center gap-4">
                      {resumeUploaded ? (
                        <div className="flex-1 p-3 rounded-xl border border-brand-blue/30 bg-brand-blue/5 flex items-center justify-between text-xs">
                          <span className="font-semibold text-brand-blue">Alex_Rivera_Resume_ATS.pdf</span>
                          <button
                            type="button"
                            onClick={() => setResumeUploaded(false)}
                            className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setResumeUploaded(true)}
                          className="flex-1 py-4 border-2 border-dashed dark:border-white/10 light:border-slate-300 rounded-xl hover:border-brand-blue transition-colors text-center text-xs text-slate-400 font-bold cursor-pointer"
                        >
                          📁 Select PDF / Use ATS builder CV
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Why are you a good fit? (Optional)</label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Brief message to the recruiting team..."
                      className="w-full p-3 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2 border-t dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="py-2 px-4 rounded-xl border dark:border-white/5 light:border-slate-200 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isApplying || !resumeUploaded}
                    className={`
                      py-2 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer
                      ${(isApplying || !resumeUploaded) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {isApplying ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white light:text-slate-950">Application Transmitted!</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                    Your details and resume have been securely forwarded to the recruitment portal at <span className="font-semibold text-brand-blue">{activeJobDetail.company}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="py-2.5 px-6 rounded-xl bg-slate-800 text-white font-semibold text-xs cursor-pointer hover:bg-slate-700"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
