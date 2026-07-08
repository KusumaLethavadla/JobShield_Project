import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  Shield,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  BookOpen,
  PlusCircle,
  FileText,
  User,
  LogOut,
  Info,
  Phone,
  Home,
  ShieldCheck,
  Building2,
  Star
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    activePage,
    setActivePage,
    isLoggedIn,
    userProfile,
    logout,
    setShowAuthModal,
    setShowVerifyModal,
    notifications,
    clearNotifications
  } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Home', id: 'home' as PageName, icon: Home },
    { name: 'AI Verification', id: 'verify-job' as PageName, icon: Shield },
    { name: 'Company Search', id: 'verify-company' as PageName, icon: Building2 },
    { name: 'Trusted Jobs', id: 'trusted-jobs' as PageName, icon: ShieldCheck },
    { name: 'Report Scam', id: 'report-scam' as PageName, icon: PlusCircle },
    { name: 'Reviews Feed', id: 'reviews' as PageName, icon: Star },
    { name: 'Resume Builder', id: 'resume-builder' as PageName, icon: FileText },
    { name: 'Awareness Hub', id: 'scam-awareness' as PageName, icon: BookOpen },
    { name: 'About Mission', id: 'about' as PageName, icon: Info },
    { name: 'Contact & FAQ', id: 'contact' as PageName, icon: Phone },
  ];

  const handleNavigate = (page: PageName) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-800`}>
      {/* Dynamic colorful gradients behind the content */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-blue/10 via-brand-green/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" />

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b dark:border-white/5 light:border-slate-200 backdrop-blur-md no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavigate('home')}>
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20 transition-all duration-300">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-green bg-clip-text text-transparent">
                JobShield
              </span>
              <span className="block text-[9px] text-slate-400 font-medium leading-none">Student Protection Platform</span>
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border dark:border-white/5 light:border-slate-200 dark:hover:bg-white/5 light:hover:bg-slate-200 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-blue" />}
            </button>

            {/* Notifications panel dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserDropdownOpen(false);
                }}
                className="p-2 rounded-xl border dark:border-white/5 light:border-slate-200 dark:hover:bg-white/5 light:hover:bg-slate-200 transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-blue rounded-full" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 glass-panel shadow-2xl rounded-2xl border dark:border-white/10 light:border-slate-300 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-sm">
                  <div className="flex items-center justify-between border-b dark:border-white/10 light:border-slate-200 pb-2 mb-2">
                    <span className="font-semibold dark:text-white light:text-slate-900">Notifications ({notifications.length})</span>
                    {notifications.length > 0 && (
                      <button onClick={clearNotifications} className="text-xs text-brand-blue hover:underline cursor-pointer">
                        Clear all
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
                  ) : (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto">
                      {notifications.map((n, i) => (
                        <div key={i} className="text-xs dark:text-slate-300 light:text-slate-600 border-b dark:border-white/5 light:border-slate-100 pb-2 last:border-0 last:pb-0">
                          {n}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile / Login Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-xl border dark:border-white/5 light:border-slate-200 dark:bg-slate-900/40 light:bg-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs">
                    {userProfile?.username.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold hidden sm:inline">{userProfile?.username}</span>
                  {userProfile?.isStudentVerified && (
                    <span className="text-[9px] font-bold bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded-full">
                      Student
                    </span>
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 glass-panel shadow-2xl rounded-2xl border dark:border-white/10 light:border-slate-300 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-sm">
                    <button
                      onClick={() => {
                        handleNavigate('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-brand-blue/10 hover:text-brand-blue transition-colors flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </button>
                    {!userProfile?.isStudentVerified && (
                      <button
                        onClick={() => {
                          setShowVerifyModal(true);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-brand-green/10 hover:text-brand-green transition-colors flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-green" /> Verify Student
                      </button>
                    )}
                    <div className="border-t dark:border-white/5 light:border-slate-200 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        handleNavigate('home');
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="py-1.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition-colors cursor-pointer shadow-md hover:shadow-brand-blue/20"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border dark:border-white/5 light:border-slate-200 dark:hover:bg-white/5 light:hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 pr-6 no-print">
          <nav className="space-y-1.5 sticky top-24">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3.5 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15 scale-[1.02]'
                      : 'dark:text-slate-300 dark:hover:bg-white/5 light:text-slate-600 light:hover:bg-slate-200 hover:translate-x-1'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </button>
              );
            })}
            
            {isLoggedIn && (
              <>
                <div className="border-t dark:border-white/5 light:border-slate-200 my-4" />
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className={`
                    w-full flex items-center gap-3.5 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
                    ${activePage === 'dashboard'
                      ? 'bg-brand-green text-white shadow-md shadow-brand-green/15 scale-[1.02]'
                      : 'dark:text-slate-300 dark:hover:bg-white/5 light:text-slate-600 light:hover:bg-slate-200 hover:translate-x-1'
                    }
                  `}
                >
                  <User className="w-4 h-4 shrink-0" />
                  My Dashboard
                </button>
              </>
            )}
          </nav>
        </aside>

        {/* Dynamic Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm no-print">
            <div className="absolute right-0 top-0 bottom-0 w-72 glass-panel border-l dark:border-white/10 light:border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b dark:border-white/5 pb-4">
                  <span className="font-bold font-display text-lg">JobShield Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg border dark:border-white/5"><X className="w-5 h-5" /></button>
                </div>
                <nav className="space-y-2">
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`
                          w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors cursor-pointer
                          ${isActive ? 'bg-brand-blue text-white' : 'dark:hover:bg-white/5 light:hover:bg-slate-100'}
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </button>
                    );
                  })}
                  {isLoggedIn && (
                    <button
                      onClick={() => handleNavigate('dashboard')}
                      className={`
                        w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors cursor-pointer
                        ${activePage === 'dashboard' ? 'bg-brand-green text-white' : 'dark:hover:bg-white/5 light:hover:bg-slate-100'}
                      `}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>
                  )}
                </nav>
              </div>

              {!isLoggedIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold text-center"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer Section */}
      <footer className="glass-panel border-t dark:border-white/5 light:border-slate-200 mt-12 py-12 px-4 sm:px-6 lg:px-8 text-sm no-print relative z-10 bg-slate-950/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-brand-blue" />
              <span className="font-display font-bold text-lg dark:text-white light:text-slate-900">JobShield</span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Empowering students with AI-assisted protection mechanisms to safeguard against digital employment fraud and unlock verified career pathways.
            </p>
            <div className="flex items-center gap-3.5 text-slate-400">
              <span className="hover:text-brand-blue transition-colors cursor-pointer text-xs">LinkedIn</span>
              <span>•</span>
              <span className="hover:text-brand-blue transition-colors cursor-pointer text-xs">GitHub</span>
              <span>•</span>
              <span className="hover:text-brand-blue transition-colors cursor-pointer text-xs">Twitter</span>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h5 className="font-bold mb-3.5 dark:text-slate-200 light:text-slate-700">Platform</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleNavigate('verify-job')} className="hover:text-brand-blue transition-colors cursor-pointer">AI Verification</button></li>
              <li><button onClick={() => handleNavigate('verify-company')} className="hover:text-brand-blue transition-colors cursor-pointer">Company Search</button></li>
              <li><button onClick={() => handleNavigate('trusted-jobs')} className="hover:text-brand-blue transition-colors cursor-pointer">Vetted Jobs</button></li>
              <li><button onClick={() => handleNavigate('resume-builder')} className="hover:text-brand-blue transition-colors cursor-pointer">Resume Builder</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3.5 dark:text-slate-200 light:text-slate-700">Safety Hub</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleNavigate('scam-awareness')} className="hover:text-brand-blue transition-colors cursor-pointer">Awareness articles</button></li>
              <li><button onClick={() => handleNavigate('report-scam')} className="hover:text-brand-blue transition-colors cursor-pointer">Report Scam Post</button></li>
              <li><button onClick={() => handleNavigate('reviews')} className="hover:text-brand-blue transition-colors cursor-pointer">Company Reviews</button></li>
              <li><span className="hover:text-brand-blue transition-colors cursor-pointer">Help Center</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3.5 dark:text-slate-200 light:text-slate-700">Company</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleNavigate('about')} className="hover:text-brand-blue transition-colors cursor-pointer">About Mission</button></li>
              <li><button onClick={() => handleNavigate('contact')} className="hover:text-brand-blue transition-colors cursor-pointer">Contact Us</button></li>
              <li><span className="hover:text-brand-blue transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-brand-blue transition-colors cursor-pointer">Terms & Conditions</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t dark:border-white/5 light:border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} JobShield. Built for student security.</span>
          <span className="mt-2 sm:mt-0">Designed by Antigravity under Gemini Sandbox.</span>
        </div>
      </footer>
    </div>
  );
};
