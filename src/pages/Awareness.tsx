import React, { useState } from 'react';
import { SCAM_EXAMPLES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { ShieldAlert, MessageSquare, Check, X, Award } from 'lucide-react';

export const Awareness: React.FC = () => {
  // Simulator states
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      sender: '+62 858-9128-4422 (Apex HR)',
      message: 'Hello! I got your number from recruitment agency. We offer part-time jobs: you only need to like YouTube music videos and subscribe. We pay $3 for each task. Daily earn $150. No experience needed. Join Telegram: t.me/apex_media_task',
      options: [
        { text: 'A: Genuine - YouTube tasks are standard marketing promotion', isScam: false },
        { text: 'B: Scam - Free domains, WhatsApp/Telegram redirects, and task deposit schemes', isScam: true }
      ],
      explanation: 'This is the infamous Task Completion scam. They give you $5 at first to earn trust, then demand a deposit of $20+ to unlock "high commission tasks". Once you pay, they block you.'
    },
    {
      sender: 'hr@google-staffing-desk.com',
      message: 'Dear applicant, you have been selected for direct interview and onboarding for the Online Typing Typist role. Salary is $35/hour. To process your contract, please buy the specific encryption software for $15 from our agent at t.me/google_materials_desk.',
      options: [
        { text: 'A: Scam - Legit employers cover software costs and do not recruit on Telegram groups', isScam: true },
        { text: 'B: Genuine - Large companies have dedicated software procurement routes', isScam: false }
      ],
      explanation: 'No real employer asks candidates to pay for starting gear, software, or laptop insurance. If they ask for payment, it is 100% fraud.'
    }
  ];

  const handleAnswerSelect = (isScam: boolean, optionText: string) => {
    if (selectedAnswer) return; // Only allow one choice
    setSelectedAnswer(optionText);
    
    if (isScam) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (activeQuizIndex < quizQuestions.length - 1) {
      setActiveQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setActiveQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-12 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header info */}
      <div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900 font-display">Scam Awareness Center</h2>
        <p className="text-slate-400 text-xs font-medium mt-1">Study how recruiters coordinate digital employment fraud. Spot red flags before responding.</p>
      </div>

      {/* Interactive WhatsApp Recruiter Simulator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Quiz Simulator Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-blue" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Recruiter Message Simulator</h3>
          </div>

          {!quizFinished ? (
            <GlassCard hoverable={false} className="border-brand-blue/20 flex flex-col justify-between min-h-[360px]">
              <div className="space-y-4">
                {/* Header mock contact */}
                <div className="flex items-center gap-3 border-b dark:border-white/5 pb-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 text-sm flex items-center justify-center">👤</div>
                  <div>
                    <h4 className="font-bold text-xs dark:text-slate-200 light:text-slate-900">{quizQuestions[activeQuizIndex].sender}</h4>
                    <p className="text-[9px] text-brand-green font-bold">Online</p>
                  </div>
                </div>

                {/* Simulated chat message balloon */}
                <div className="p-3.5 rounded-2xl bg-brand-blue/5 dark:text-slate-200 light:text-slate-800 border dark:border-white/5 light:border-slate-200 text-xs font-medium leading-relaxed font-mono italic max-w-[90%]">
                  "{quizQuestions[activeQuizIndex].message}"
                </div>

                {/* Options list */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold text-slate-400">Is this message a scam or genuine?</p>
                  {quizQuestions[activeQuizIndex].options.map((opt, oIdx) => {
                    let btnColor = 'dark:border-white/5 light:border-slate-200 dark:bg-slate-900/30 light:bg-white hover:border-brand-blue/30';
                    if (selectedAnswer) {
                      if (opt.isScam) btnColor = 'border-brand-green bg-brand-green/5 text-brand-green';
                      else btnColor = 'border-red-500 bg-red-500/5 text-red-500 opacity-60';
                    }
                    return (
                      <button
                        key={oIdx}
                        disabled={!!selectedAnswer}
                        onClick={() => handleAnswerSelect(opt.isScam, opt.text)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex justify-between items-center ${btnColor} ${!selectedAnswer ? 'cursor-pointer' : ''}`}
                      >
                        <span>{opt.text}</span>
                        {selectedAnswer && opt.isScam && <Check className="w-4 h-4 text-brand-green" />}
                        {selectedAnswer && !opt.isScam && <X className="w-4 h-4 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanatory text */}
              {selectedAnswer && (
                <div className="mt-6 pt-4 border-t dark:border-white/5 space-y-3">
                  <div className="p-3 bg-brand-blue/5 rounded-xl text-xs leading-relaxed text-slate-400 font-medium border border-brand-blue/10">
                    <span className="font-bold dark:text-white light:text-slate-950 block mb-1">AI Verdict Details:</span>
                    {quizQuestions[activeQuizIndex].explanation}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="py-2 px-5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs cursor-pointer float-right"
                  >
                    Next Case &rarr;
                  </button>
                </div>
              )}
            </GlassCard>
          ) : (
            <GlassCard hoverable={false} className="text-center p-8 border-brand-green/20 space-y-6">
              <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg dark:text-white light:text-slate-950">Quiz Complete!</h3>
                <p className="text-xs text-slate-400 font-medium">You identified {quizScore} / {quizQuestions.length} recruiter scam templates correctly.</p>
              </div>
              <button
                onClick={handleResetQuiz}
                className="py-2.5 px-6 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Retake Quiz
              </button>
            </GlassCard>
          )}
        </div>

        {/* Scam Warning Red Flags Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Critical Scam Red Flags</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: '1. Registration Fees / Security Deposits',
                desc: 'They claim deposits are "refundable" after job completion. Real employers do not ask you to purchase starter files, certificates, or software licenses.',
                badge: 'High Risk'
              },
              {
                title: '2. Non-Corporate Domains',
                desc: 'Fake agents send contracts or emails from generic addresses (@gmail.com, @outlook.com, @hotmail.com). Official business always communicates via @company.com.',
                badge: 'Suspicious'
              },
              {
                title: '3. Recruiting on WhatsApp / Telegram',
                desc: 'If they offer jobs immediately over chat without a video call or structured corporate pipeline (Workday, Lever, Greenhouse), stay alert.',
                badge: 'Medium Risk'
              }
            ].map((flag, idx) => (
              <GlassCard key={idx} hoverable={false} className="p-4 flex gap-4 border-red-500/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-1.5 animate-pulse" />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs dark:text-white light:text-slate-900">{flag.title}</h4>
                    <span className="text-[8px] font-bold tracking-wider uppercase text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">{flag.badge}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{flag.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </section>

      {/* Real examples cases list */}
      <section className="space-y-6">
        <h3 className="font-bold text-base dark:text-white light:text-slate-900 font-display">Common Social Media Phishing Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCAM_EXAMPLES.map((ex, i) => (
            <GlassCard key={i} hoverable={false} className="border-amber-500/15 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-500 bg-amber-500/10 py-1 px-3 rounded-full border border-amber-500/20">{ex.title}</span>
                <p className="text-xs text-slate-400 mt-4 font-bold">Example Template Message:</p>
                <div className="p-3 rounded-xl bg-slate-900/30 border dark:border-white/5 font-mono italic text-[11px] mt-1.5 leading-relaxed text-slate-300">
                  "{ex.message}"
                </div>

                <div className="mt-4 space-y-1.5 text-[11px] font-medium text-slate-400">
                  <p className="font-bold text-red-500">Why it is suspicious:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {ex.redFlags.map((rf, rfIdx) => <li key={rfIdx}>{rf}</li>)}
                  </ul>
                </div>
              </div>

              <div className="border-t dark:border-white/5 pt-4 mt-6">
                <p className="text-[11px] text-brand-green font-semibold">🟢 Safe Alternative: {ex.safeAlternative}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

    </div>
  );
};
