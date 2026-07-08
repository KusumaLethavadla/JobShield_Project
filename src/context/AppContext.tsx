import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_JOBS, MOCK_SCAMS, MOCK_REVIEWS } from '../utils/mockData';
import type { Job, ScamReport, Review } from '../utils/mockData';
import type { ScanResult } from '../utils/scanner';

export type PageName =
  | 'home'
  | 'verify-job'
  | 'verify-company'
  | 'trusted-jobs'
  | 'report-scam'
  | 'reviews'
  | 'resume-builder'
  | 'scam-awareness'
  | 'about'
  | 'contact'
  | 'dashboard';

export interface UserProfile {
  username: string;
  email: string;
  isStudentVerified: boolean;
  universityEmail?: string;
  studentIdCard?: string;
  universityName?: string;
}

export interface AnalysisHistoryItem {
  id: string;
  text: string;
  result: ScanResult;
  timestamp: string;
}

interface AppContextType {
  activePage: PageName;
  setActivePage: (page: PageName) => void;
  // Auth state
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  login: (username: string, email: string) => void;
  logout: () => void;
  verifyStudent: (uniEmail: string, uniName: string) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showVerifyModal: boolean;
  setShowVerifyModal: (show: boolean) => void;
  // Jobs & Bookmarks
  jobs: Job[];
  bookmarkedJobs: string[]; // Job IDs
  appliedJobs: string[]; // Job IDs
  toggleBookmark: (jobId: string) => void;
  applyForJob: (jobId: string) => void;
  // Scans history
  scanHistory: AnalysisHistoryItem[];
  addScanToHistory: (text: string, result: ScanResult) => void;
  clearScanHistory: () => void;
  // Scam reports
  scamReports: ScamReport[];
  submitScamReport: (report: Omit<ScamReport, 'id' | 'dateReported' | 'status'>) => void;
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'likes' | 'helpfulCount' | 'date'>) => void;
  likeReview: (id: string) => void;
  helpfulReview: (id: string) => void;
  // Notifications
  notifications: string[];
  addNotification: (msg: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageName>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default logged in to show nice dashboard initially
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    username: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    isStudentVerified: true,
    universityEmail: 'alex.rivera@university.edu',
    universityName: 'State Tech University'
  });
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // Load from local storage if available
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [scanHistory, setScanHistory] = useState<AnalysisHistoryItem[]>([]);
  const [scamReports, setScamReports] = useState<ScamReport[]>(MOCK_SCAMS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [notifications, setNotifications] = useState<string[]>([
    'Welcome back to JobShield! Your Student badge is active.',
    'Scam Alert: WhatsApp tasks scams originating from +62 country codes are on the rise today.'
  ]);

  // Read storage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('js_bookmarks');
    const savedApplied = localStorage.getItem('js_applied');
    const savedHistory = localStorage.getItem('js_history');
    const savedReports = localStorage.getItem('js_reports');
    const savedReviews = localStorage.getItem('js_reviews');
    
    if (savedBookmarks) setBookmarkedJobs(JSON.parse(savedBookmarks));
    if (savedApplied) setAppliedJobs(JSON.parse(savedApplied));
    if (savedHistory) setScanHistory(JSON.parse(savedHistory));
    if (savedReports) setScamReports(JSON.parse(savedReports));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, []);

  const login = (username: string, email: string) => {
    setIsLoggedIn(true);
    setUserProfile({
      username,
      email,
      isStudentVerified: email.endsWith('.edu') || email.includes('student'),
      universityEmail: email.endsWith('.edu') ? email : undefined,
      universityName: email.endsWith('.edu') ? 'Simulated University' : undefined
    });
    addNotification(`Signed in successfully as ${username}.`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setBookmarkedJobs([]);
    setAppliedJobs([]);
    setScanHistory([]);
    addNotification('Logged out successfully.');
  };

  const verifyStudent = (uniEmail: string, uniName: string) => {
    if (userProfile) {
      const updated = {
        ...userProfile,
        isStudentVerified: true,
        universityEmail: uniEmail,
        universityName: uniName
      };
      setUserProfile(updated);
      addNotification('Student status verified! Resume Builder is now fully unlocked.');
    }
  };

  const toggleBookmark = (jobId: string) => {
    let updated;
    if (bookmarkedJobs.includes(jobId)) {
      updated = bookmarkedJobs.filter(id => id !== jobId);
      addNotification('Job removed from saved list.');
    } else {
      updated = [...bookmarkedJobs, jobId];
      addNotification('Job added to saved list.');
    }
    setBookmarkedJobs(updated);
    localStorage.setItem('js_bookmarks', JSON.stringify(updated));
  };

  const applyForJob = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      const updated = [...appliedJobs, jobId];
      setAppliedJobs(updated);
      localStorage.setItem('js_applied', JSON.stringify(updated));
      const jobName = MOCK_JOBS.find(j => j.id === jobId)?.title || 'Job';
      addNotification(`Applied for ${jobName}! Check your dashboard for updates.`);
    }
  };

  const addScanToHistory = (text: string, result: ScanResult) => {
    const newItem: AnalysisHistoryItem = {
      id: `scan-${Date.now()}`,
      text,
      result,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newItem, ...scanHistory].slice(0, 20); // Keep last 20
    setScanHistory(updated);
    localStorage.setItem('js_history', JSON.stringify(updated));
    addNotification(`AI scan complete. Risk score: ${result.score}/100.`);
  };

  const clearScanHistory = () => {
    setScanHistory([]);
    localStorage.removeItem('js_history');
    addNotification('Scan history cleared.');
  };

  const submitScamReport = (report: Omit<ScamReport, 'id' | 'dateReported' | 'status'>) => {
    const newReport: ScamReport = {
      ...report,
      id: `report-${Date.now()}`,
      dateReported: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };
    const updated = [newReport, ...scamReports];
    setScamReports(updated);
    localStorage.setItem('js_reports', JSON.stringify(updated));
    addNotification('Scam report submitted. Thank you for keeping the community safe!');
  };

  const addReview = (review: Omit<Review, 'id' | 'likes' | 'helpfulCount' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      likes: 0,
      helpfulCount: 0,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('js_reviews', JSON.stringify(updated));
    addNotification(`Review submitted for ${review.companyName}.`);
  };

  const likeReview = (id: string) => {
    const updated = reviews.map(r => {
      if (r.id === id) {
        const liked = !r.userLiked;
        return {
          ...r,
          likes: liked ? r.likes + 1 : r.likes - 1,
          userLiked: liked
        };
      }
      return r;
    });
    setReviews(updated);
    localStorage.setItem('js_reviews', JSON.stringify(updated));
  };

  const helpfulReview = (id: string) => {
    const updated = reviews.map(r => {
      if (r.id === id) {
        const helpful = !r.userHelpful;
        return {
          ...r,
          helpfulCount: helpful ? r.helpfulCount + 1 : r.helpfulCount - 1,
          userHelpful: helpful
        };
      }
      return r;
    });
    setReviews(updated);
    localStorage.setItem('js_reviews', JSON.stringify(updated));
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 10));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        isLoggedIn,
        userProfile,
        login,
        logout,
        verifyStudent,
        showAuthModal,
        setShowAuthModal,
        showVerifyModal,
        setShowVerifyModal,
        jobs: MOCK_JOBS,
        bookmarkedJobs,
        appliedJobs,
        toggleBookmark,
        applyForJob,
        scanHistory,
        addScanToHistory,
        clearScanHistory,
        scamReports,
        submitScamReport,
        reviews,
        addReview,
        likeReview,
        helpfulReview,
        notifications,
        addNotification,
        clearNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
