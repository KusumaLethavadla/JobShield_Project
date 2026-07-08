import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import { Star, ThumbsUp, Plus, CheckCircle, Search } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { reviews, addReview, likeReview, helpfulReview, isLoggedIn, setShowAuthModal } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Review form state
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [experience, setExperience] = useState('');
  const [recommend, setRecommend] = useState(true);
  
  const filteredReviews = reviews.filter(r =>
    r.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddForm = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setShowAddForm(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !reviewText.trim()) return;

    addReview({
      companyName,
      rating,
      reviewText,
      experience: experience || 'Student Applicant',
      recommend
    });

    // Reset Form
    setCompanyName('');
    setRating(5);
    setReviewText('');
    setExperience('');
    setRecommend(true);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900 font-display">Student Reviews Feed</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Read honest feedback from fellow students about recruitment loops, payment safety, and work environments.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64 flex items-center">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-9 pr-4 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue dark:text-white light:text-slate-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          </div>

          <button
            onClick={handleOpenAddForm}
            className="py-2 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Review
          </button>
        </div>
      </div>

      {/* Review creation form popup */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 no-print animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-panel border border-brand-blue/30 rounded-2xl p-6 relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm cursor-pointer"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg dark:text-white light:text-slate-900 mb-4">Write a Review</h3>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-400">Company Name (Required)</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Stripe / Apex Recruiting"
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white light:text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Rating (1 to 5 Stars)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white focus:outline-none dark:text-white"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Your Experience / Role</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. Web Developer Intern / Candidate"
                    className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white focus:outline-none dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Review Text (Required)</label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Describe your application process, interviewing, work quality, and if they behaved safely (requested fees, documents etc.)"
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white focus:outline-none dark:text-white leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recommend"
                  checked={recommend}
                  onChange={(e) => setRecommend(e.target.checked)}
                  className="accent-brand-blue w-4 h-4 cursor-pointer"
                />
                <label htmlFor="recommend" className="text-slate-300 cursor-pointer">I recommend this company to other students</label>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="py-2 px-4 rounded-xl border dark:border-white/5 light:border-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Reviews feed */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 border dark:border-white/5 rounded-2xl bg-slate-950/20">
          <p className="text-slate-400 text-sm font-semibold">No reviews found for that company.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <GlassCard key={rev.id} hoverable={false} className="border-brand-blue/5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                {/* Review Body */}
                <div className="space-y-3 flex-1">
                  
                  {/* Company and Rating */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-base dark:text-white light:text-slate-950">{rev.companyName}</h3>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  {/* Role experience */}
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Role: {rev.experience}
                  </p>

                  {/* Review Text */}
                  <p className="text-xs dark:text-slate-300 light:text-slate-600 leading-relaxed font-medium">
                    "{rev.reviewText}"
                  </p>

                  {/* Recommendation badge */}
                  <div className="pt-1.5">
                    {rev.recommend ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-green bg-brand-green/10 py-0.5 px-2 rounded-lg">
                        🟢 Would Recommend
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 py-0.5 px-2 rounded-lg">
                        🔴 Does Not Recommend
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating feedback controls (Likes, Helpful) */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0 md:items-end justify-start md:justify-center border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  
                  <button
                    onClick={() => likeReview(rev.id)}
                    className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      rev.userLiked
                        ? 'bg-brand-blue/15 text-brand-blue border-brand-blue/30'
                        : 'dark:border-white/5 light:border-slate-200 text-slate-400 dark:hover:bg-white/5 light:hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.likes})</span>
                  </button>

                  <button
                    onClick={() => helpfulReview(rev.id)}
                    className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      rev.userHelpful
                        ? 'bg-brand-green/15 text-brand-green border-brand-green/30'
                        : 'dark:border-white/5 light:border-slate-200 text-slate-400 dark:hover:bg-white/5 light:hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Info ({rev.helpfulCount})</span>
                  </button>

                </div>

              </div>
            </GlassCard>
          ))}
        </div>
      )}

    </div>
  );
};
