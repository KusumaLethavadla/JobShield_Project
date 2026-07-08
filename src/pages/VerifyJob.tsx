import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeJobPost } from '../utils/scanner';
import type { ScanResult } from '../utils/scanner';
import { GlassCard } from '../components/GlassCard';
import {
  ShieldAlert,
  Zap,
  History,
  CheckCircle,
  RefreshCw,
  Info
} from 'lucide-react';

export const VerifyJob: React.FC = () => {
  const { addScanToHistory, scanHistory, clearScanHistory } = useApp();
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const sampleScams = [
    {
      label: 'WhatsApp Task Scam',
      text: 'Hi there, I am HR manager from Apex Advertising. We have a part-time job. Like 3 YouTube videos and subscribe to channels to get $10. Earn $200-$500 per day. Connect on Telegram at @apex_advertising_hr to start. Deposit $10 refundable fee for security.'
    },
    {
      label: 'Telegram typing scam',
      text: 'Typing Job Opportunity! Earn $40 per page. 50 pages needs to be converted from JPG images to MS Word files. Budget $2000. Registration fees of $15 applies to obtain task sheets. Direct joining, no interview required. Mail us at hr.jobs.desk@gmail.com'
    },
    {
      label: 'Genuine Next.js Internship',
      text: 'Junior Frontend Developer Intern - Vercel. We are looking for a student developer to join our Next.js Developer Relations team. Must have basic React and HTML skills. Location is hybrid or remote. Applications accepted through our official careers page at vercel.com/careers. No payment required.'
    }
  ];

  const handleScan = () => {
    if (!inputText.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    // Simulate AI scanning delay
    setTimeout(() => {
      const result = analyzeJobPost(inputText);
      setScanResult(result);
      addScanToHistory(inputText, result);
      setIsScanning(false);
    }, 1500);
  };

  const handleSampleClick = (sample: string) => {
    setInputText(sample);
  };

  const getStatusColor = (status: 'genuine' | 'suspicious' | 'scam') => {
    switch (status) {
      case 'scam': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'suspicious': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'genuine': return 'text-brand-green bg-brand-green/10 border-brand-green/20';
    }
  };

  const getStatusBadge = (status: 'genuine' | 'suspicious' | 'scam') => {
    switch (status) {
      case 'scam': return '🔴 Scam Flagged';
      case 'suspicious': return '🟡 Suspicious Elements';
      case 'genuine': return '🟢 Verified Genuine';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Input area / Scanner Details */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Core Input card */}
        <GlassCard hoverable={false} className="border-brand-blue/15">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-brand-blue animate-pulse" />
            <h2 className="text-xl font-bold dark:text-white light:text-slate-900">AI Job Post Analyzer</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">
            Paste job emails, WhatsApp/Telegram screenshots text, or job link content here. Our engine checks domains, payment keywords, chat redirect patterns, and compensation realities.
          </p>

          <div className="space-y-4">
            <textarea
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste recruiter text templates, direct messages or email transcripts..."
              className="w-full p-4 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 dark:text-white light:text-slate-900 font-mono"
            />

            {/* Test samples */}
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2">Test with quick samples:</p>
              <div className="flex flex-wrap gap-2">
                {sampleScams.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => handleSampleClick(sample.text)}
                    className="text-xs py-1.5 px-3 rounded-lg border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/40 light:bg-white hover:bg-brand-blue/5 hover:border-brand-blue/20 dark:text-slate-300 light:text-slate-600 font-medium transition-colors cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setInputText('')}
                className="py-2.5 px-4 rounded-xl border dark:border-white/5 light:border-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Text
              </button>
              <button
                onClick={handleScan}
                disabled={isScanning || !inputText.trim()}
                className={`
                  py-2.5 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-brand-blue/20
                  ${(isScanning || !inputText.trim()) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4.5 h-4.5 animate-spin" /> Analyzing job posting...
                  </>
                ) : (
                  <>
                    Analyze Posting <ShieldAlert className="w-4.5 h-4.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Scan UI Results */}
        {isScanning && (
          <GlassCard hoverable={false} className="text-center p-12 border-dashed border-brand-blue/30 relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-brand-green/5 to-transparent animate-pulse" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-brand-blue flex items-center justify-center animate-spin" />
              <div>
                <h3 className="font-bold text-lg dark:text-white light:text-slate-900">Scanning Job Description Patterns</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Cross referencing contact coordinates with fraud registry database...</p>
              </div>
            </div>
          </GlassCard>
        )}

        {scanResult && !isScanning && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Risk Gauge and Core Stats */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Score card */}
              <GlassCard hoverable={false} className="md:col-span-5 text-center flex flex-col items-center justify-center py-8">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Risk Score</span>
                <div className="relative w-36 h-36 flex items-center justify-center mt-4">
                  {/* Outer SVG Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="60" stroke="currentColor" className="text-slate-800" strokeWidth="10" fill="transparent" />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke={scanResult.score >= 65 ? 'var(--color-brand-red, #ef4444)' : scanResult.score >= 30 ? 'var(--color-brand-amber, #f59e0b)' : 'var(--color-brand-green, #22c55e)'}
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 60}
                      strokeDashoffset={2 * Math.PI * 60 * (1 - scanResult.score / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-4xl font-extrabold dark:text-white light:text-slate-950">{scanResult.score}</span>
                    <span className="text-xs block text-slate-400 font-semibold">/ 100</span>
                  </div>
                </div>

                <div className={`mt-6 py-1 px-4 rounded-full border text-xs font-bold ${getStatusColor(scanResult.status)}`}>
                  {getStatusBadge(scanResult.status)}
                </div>
              </GlassCard>

              {/* Suggestions */}
              <GlassCard hoverable={false} className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-3">AI Suggestions Checklist</h3>
                  <div className="space-y-3">
                    {scanResult.suggestions.map((sug, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <div className="p-0.5 rounded-full bg-brand-green/10 text-brand-green shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="text-xs dark:text-slate-300 light:text-slate-600 font-medium leading-relaxed">{sug}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-400 bg-white/5 p-2.5 rounded-xl border dark:border-white/5 light:border-slate-200">
                  <Info className="w-4 h-4 shrink-0 text-brand-blue" />
                  <span>Always check LinkedIn pages directly. Genuine recruiters use company email domains.</span>
                </div>
              </GlassCard>
            </div>

            {/* Warnings list breakdown */}
            <GlassCard hoverable={false}>
              <h3 className="font-bold text-base mb-4 dark:text-white light:text-slate-900">Analysis Breakdown Details</h3>
              
              <div className="divide-y dark:divide-white/5 light:divide-slate-200">
                {scanResult.details.map((detail, idx) => (
                  <div key={idx} className="py-3.5 flex items-start gap-4 justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${detail.isTriggered ? 'bg-red-500 animate-pulse' : 'bg-brand-green'}`} />
                        <h4 className="font-semibold text-sm dark:text-slate-200 light:text-slate-800">{detail.label}</h4>
                      </div>
                      <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{detail.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      {detail.isTriggered ? (
                        <span className="text-xs font-bold text-red-500 bg-red-500/10 py-1 px-2.5 rounded-lg">
                          +{detail.impact} pts Risk
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400 bg-slate-800/10 dark:bg-white/5 py-1 px-2.5 rounded-lg">
                          0 pts
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>
        )}

      </div>

      {/* History Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <GlassCard hoverable={false} className="h-full">
          <div className="flex items-center justify-between border-b dark:border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-brand-blue" />
              <h3 className="font-bold text-base dark:text-white light:text-slate-900">Scan Logs</h3>
            </div>
            {scanHistory.length > 0 && (
              <button
                onClick={clearScanHistory}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {scanHistory.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <span className="text-2xl text-slate-500">🗂️</span>
              <p className="text-xs text-slate-400 font-medium">No previous scans found</p>
              <p className="text-[10px] text-slate-500">Your recent scans will be listed here.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {scanHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setScanResult(item.result)}
                  className="p-3 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/20 light:bg-white hover:border-brand-blue/30 transition-all cursor-pointer text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-400">{item.timestamp}</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded-full text-[9px] ${
                      item.result.status === 'scam' ? 'bg-red-500/10 text-red-500' :
                      item.result.status === 'suspicious' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-brand-green/10 text-brand-green'
                    }`}>
                      Score: {item.result.score}
                    </span>
                  </div>
                  <p className="dark:text-slate-300 light:text-slate-600 line-clamp-2 italic font-mono font-medium">
                    "{item.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

    </div>
  );
};
