import React, { useState } from 'react';
import { MOCK_COMPANIES } from '../utils/mockData';
import type { Company } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { Search, Building2, Globe, Calendar, Briefcase, Users, Star, Award, ShieldCheck, ShieldAlert, Check } from 'lucide-react';

export const VerifyCompany: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(MOCK_COMPANIES[0]); // Default to first

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredCompanies = MOCK_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Page Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900">Verify Company Registers</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Check official trust badges, employee records, ratings, and domains before accepting invitations.</p>
        </div>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="w-full md:w-80 relative flex items-center">
          <input
            type="text"
            placeholder="Search company registers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none focus:border-brand-blue dark:text-white light:text-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Directory / Matches */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Available Companies ({filteredCompanies.length})</h3>
          
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12 border dark:border-white/5 light:border-slate-200 rounded-2xl bg-slate-900/5">
              <p className="text-xs text-slate-400 font-medium">No matches found</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredCompanies.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCompany(c)}
                  className={`
                    p-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3 cursor-pointer
                    ${selectedCompany?.id === c.id
                      ? 'border-brand-blue bg-brand-blue/5 shadow-md'
                      : 'dark:border-white/5 light:border-slate-200 dark:bg-slate-900/20 light:bg-white hover:border-brand-blue/30'
                    }
                  `}
                >
                  <img src={c.logo} alt={c.name} className="w-9 h-9 rounded-lg object-cover bg-slate-800 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs truncate dark:text-white light:text-slate-900">{c.name}</h4>
                      {c.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-brand-green shrink-0" />}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{c.industry}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      c.trustScore >= 80 ? 'bg-brand-green/10 text-brand-green' :
                      c.trustScore >= 50 ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      TS: {c.trustScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Detailed Profile */}
        <div className="lg:col-span-8">
          {selectedCompany ? (
            <GlassCard hoverable={false} className="space-y-6 border-brand-blue/10">
              
              {/* Header profile details */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-6 border-b dark:border-white/5 light:border-slate-200">
                <div className="flex items-start gap-4">
                  <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-16 h-16 rounded-xl object-cover bg-slate-800 border dark:border-white/10 light:border-slate-200" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-extrabold text-xl dark:text-white light:text-slate-900">{selectedCompany.name}</h3>
                      {selectedCompany.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-brand-green/15 text-brand-green py-0.5 px-2 rounded-full border border-brand-green/20">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-red-500/15 text-red-500 py-0.5 px-2 rounded-full border border-red-500/20 animate-pulse">
                          <ShieldAlert className="w-3.5 h-3.5" /> Unverified Portal
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 font-medium text-[11px] pt-1">
                      <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-brand-blue">{selectedCompany.website.replace('https://', '')}</a></span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Est. {selectedCompany.founded}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {selectedCompany.industry}</span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Trust Score</p>
                  <p className={`text-4xl font-extrabold mt-1 ${
                    selectedCompany.trustScore >= 80 ? 'text-brand-green' :
                    selectedCompany.trustScore >= 50 ? 'text-amber-500' :
                    'text-red-500'
                  }`}>
                    {selectedCompany.trustScore}%
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">About Company</h4>
                <p className="text-xs dark:text-slate-300 light:text-slate-600 leading-relaxed font-medium">
                  {selectedCompany.description}
                </p>
              </div>

              {/* Company Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/10 light:bg-slate-100/50 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Employee Count</span>
                  <div className="flex items-center gap-1.5 dark:text-slate-200 light:text-slate-800">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm font-bold">{selectedCompany.employeeCount}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/10 light:bg-slate-100/50 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Glassdoor Rating</span>
                  <div className="flex items-center gap-1.5 dark:text-slate-200 light:text-slate-800">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold">{selectedCompany.glassdoorRating} / 5</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/10 light:bg-slate-100/50 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Indeed Rating</span>
                  <div className="flex items-center gap-1.5 dark:text-slate-200 light:text-slate-800">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold">{selectedCompany.indeedRating} / 5</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/10 light:bg-slate-100/50 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">LinkedIn Presence</span>
                  <div className="flex items-center gap-1.5 dark:text-slate-200 light:text-slate-800">
                    <Globe className="w-4 h-4 text-brand-blue" />
                    <span className="text-[10px] font-bold truncate max-w-[100px]">{selectedCompany.linkedin.replace('linkedin.com/', '')}</span>
                  </div>
                </div>
              </div>

              {/* Security Audit Vibe Checklist */}
              <div className="p-4 rounded-xl border border-brand-green/20 bg-brand-green/5 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-green flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Shield Verification Checkmarks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold dark:text-slate-300 light:text-slate-700">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-green shrink-0" /> Registered domains check out</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-green shrink-0" /> Official company email matching</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-green shrink-0" /> Verified HR linkedin contacts found</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-green shrink-0" /> Zero deposit warnings logged</div>
                </div>
              </div>

            </GlassCard>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 border border-dashed dark:border-white/10 rounded-2xl">
              <Building2 className="w-12 h-12 text-slate-500 animate-pulse" />
              <p className="text-xs text-slate-400 mt-2 font-medium">Select a company from the left panel to review trust coordinates.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
