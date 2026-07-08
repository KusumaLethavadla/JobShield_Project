import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { ChatBot } from './components/ChatBot';

// Pages
import { Home } from './pages/Home';
import { VerifyJob } from './pages/VerifyJob';
import { VerifyCompany } from './pages/VerifyCompany';
import { Jobs } from './pages/Jobs';
import { ReportScam } from './pages/ReportScam';
import { Reviews } from './pages/Reviews';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { Awareness } from './pages/Awareness';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';

// Lucide Icons
import { X, ShieldCheck, Mail, Lock, User } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activePage,
    isLoggedIn,
    login,
    showAuthModal,
    setShowAuthModal,
    showVerifyModal,
    setShowVerifyModal,
    verifyStudent
  } = useApp();

  // Auth modal states
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [authUsername, setAuthUsername] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Student verification states
  const [uniEmail, setUniEmail] = useState('');
  const [uniName, setUniName] = useState('');
  const [studentIdUploaded, setStudentIdUploaded] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(authUsername || 'Alex Rivera', authEmail || 'alex.rivera@university.edu');
    } else if (authMode === 'signup') {
      login(authUsername || 'New Student', authEmail || 'student@university.edu');
    } else {
      alert('Reset code sent to your email.');
    }
    setShowAuthModal(false);
  };

  const handleStudentVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uniEmail.trim() || !uniName.trim() || !studentIdUploaded) {
      alert('Please fill all credentials and upload student ID.');
      return;
    }
    verifyStudent(uniEmail, uniName);
    setShowVerifyModal(false);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'verify-job':
        return <VerifyJob />;
      case 'verify-company':
        return <VerifyCompany />;
      case 'trusted-jobs':
        return <Jobs />;
      case 'report-scam':
        return <ReportScam />;
      case 'reviews':
        return <Reviews />;
      case 'resume-builder':
        return <ResumeBuilder />;
      case 'scam-awareness':
        return <Awareness />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard /> : <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Layout>
        {renderActivePage()}
      </Layout>
      <ChatBot />

      {/* 1. Auth Modal Overlay */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm glass-panel border border-brand-blue/30 rounded-2xl p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {authMode === 'login' && (
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left text-xs font-semibold">
                <div className="text-center space-y-1 pb-2">
                  <h3 className="font-display font-extrabold text-xl dark:text-white light:text-slate-900">Welcome Back</h3>
                  <p className="text-slate-400 font-medium">Protect your search profile with JobShield</p>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Username / Handle</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full p-2.5 pl-9 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Student Email Address</label>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="alex.rivera@university.edu"
                      className="w-full p-2.5 pl-9 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Security Password</label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 pl-9 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs focus:outline-none dark:text-white"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[10px] text-brand-blue hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs shadow-md"
                >
                  Sign In to Platform
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-slate-400 font-medium">New student? </span>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-[10px] text-brand-green hover:underline cursor-pointer font-bold"
                  >
                    Create Free Account
                  </button>
                </div>
              </form>
            )}

            {authMode === 'signup' && (
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left text-xs font-semibold">
                <div className="text-center space-y-1 pb-2">
                  <h3 className="font-display font-extrabold text-xl dark:text-white light:text-slate-900">Create Account</h3>
                  <p className="text-slate-400 font-medium">Free student safety credentials</p>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Username</label>
                  <input
                    type="text"
                    required
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">University Email Address</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="alex.rivera@university.edu"
                    className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Password</label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs shadow-md"
                >
                  Register Account
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-slate-400 font-medium">Already registered? </span>
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-[10px] text-brand-blue hover:underline cursor-pointer font-bold"
                  >
                    Login here
                  </button>
                </div>
              </form>
            )}

            {authMode === 'forgot' && (
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left text-xs font-semibold">
                <div className="text-center space-y-1 pb-2">
                  <h3 className="font-display font-extrabold text-xl dark:text-white">Recover Password</h3>
                  <p className="text-slate-400 font-medium">Enter your registered email address</p>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Email Address</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="alex.rivera@university.edu"
                    className="w-full p-2.5 rounded-xl border dark:border-white/10 dark:bg-slate-950 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs"
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full py-2 rounded-xl border dark:border-white/5 text-slate-400 font-bold text-xs text-center"
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Student Verification Modal Overlay */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm glass-panel border border-brand-green/30 rounded-2xl p-6 relative">
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <form onSubmit={handleStudentVerifySubmit} className="space-y-4 text-left text-xs font-semibold">
              <div className="text-center space-y-1 pb-2">
                <h3 className="font-display font-extrabold text-xl dark:text-white light:text-slate-900 flex justify-center items-center gap-1.5">
                  <ShieldCheck className="w-6 h-6 text-brand-green" /> Student Verification
                </h3>
                <p className="text-slate-400 font-medium">Unlock Resume downloads and verified priority applications</p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">University Email Address (e.g. .edu / university.ac.in)</label>
                <input
                  type="email"
                  required
                  value={uniEmail}
                  onChange={(e) => setUniEmail(e.target.value)}
                  placeholder="alex.rivera@university.edu"
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">University Name</label>
                <input
                  type="text"
                  required
                  value={uniName}
                  onChange={(e) => setUniName(e.target.value)}
                  placeholder="State Tech University"
                  className="w-full p-2.5 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400">Upload Student ID Photo</label>
                
                {studentIdUploaded ? (
                  <div className="p-3 rounded-xl border border-brand-green/30 bg-brand-green/5 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-brand-green">✓ student_id_card_scan.jpg</span>
                    <button
                      type="button"
                      onClick={() => setStudentIdUploaded(false)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStudentIdUploaded(true)}
                    className="w-full py-4 border-2 border-dashed dark:border-white/10 light:border-slate-200 rounded-xl hover:border-brand-green transition-colors text-center text-xs text-slate-400 font-bold cursor-pointer"
                  >
                    📁 Upload student identity card image
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs shadow-md"
              >
                Submit Verification
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
