export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  salary: string;
  location: string;
  category: string;
  isVerified: boolean;
  type: 'Work From Home' | 'On Site' | 'Hybrid';
  postedTime: string;
  description: string;
  requirements: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  founded: number;
  industry: string;
  employeeCount: string;
  linkedin: string;
  glassdoorRating: number;
  indeedRating: number;
  isVerified: boolean;
  trustScore: number;
  description: string;
}

export interface ScamReport {
  id: string;
  companyName: string;
  recruiterName: string;
  jobLink: string;
  description: string;
  dateReported: string;
  status: 'Pending Review' | 'Flagged Scam' | 'Verified Safe';
}

export interface Review {
  id: string;
  companyName: string;
  rating: number;
  reviewText: string;
  experience: string;
  recommend: boolean;
  likes: number;
  helpfulCount: number;
  userLiked?: boolean;
  userHelpful?: boolean;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScamExample {
  title: string;
  type: string;
  message: string;
  redFlags: string[];
  safeAlternative: string;
}

// --- Dynamic Database of Vetted Jobs ---
export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Junior Web Developer Intern',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$28 - $35/hour',
    location: 'Remote',
    category: 'Web Development',
    isVerified: true,
    type: 'Work From Home',
    postedTime: '2 hours ago',
    description: 'Collaborate with the developer relations team to build interactive API playgrounds and optimize student sandbox environments. Mentorship provided by senior developers.',
    requirements: ['Basic HTML, CSS, JavaScript', 'React familiarity is a plus', 'Active GitHub profile']
  },
  {
    id: 'job-2',
    title: 'Content Writing Assistant',
    company: 'Notion Labs',
    logo: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$20 - $24/hour',
    location: 'San Francisco, CA',
    category: 'Content Writing',
    isVerified: true,
    type: 'Hybrid',
    postedTime: '1 day ago',
    description: 'Help draft product updates, community templates walkthroughs, and student workspace guide manuals. Flexible hours that can be managed around college schedules.',
    requirements: ['Excellent written communication', 'Passionate about organizing notes', 'Portfolio of draft blogs or reports']
  },
  {
    id: 'job-3',
    title: 'UX/UI Graphic Designer',
    company: 'Linear App',
    logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$30 - $38/hour',
    location: 'Remote',
    category: 'Graphic Design',
    isVerified: true,
    type: 'Work From Home',
    postedTime: '3 days ago',
    description: 'Create interactive system diagrams, vector graphics, and template dashboards for our marketing campaigns and student developer newsletters.',
    requirements: ['Figma expertise', 'Understanding of dark layouts and minimal aesthetics', 'Strong UI layout design portfolio']
  },
  {
    id: 'job-4',
    title: 'Student Campus Ambassador',
    company: 'Vercel Inc.',
    logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$150 - $250/event',
    location: 'On Campus (University Tier 1)',
    category: 'Campus Ambassador',
    isVerified: true,
    type: 'On Site',
    postedTime: '5 days ago',
    description: 'Advocate Vercel tools and Next.js framework in hackathons, club meetings, and developer study groups on your campus. Organise swag distributions.',
    requirements: ['Undergraduate student', 'Organised coding meetups previously', 'Passionate about developer ecosystem']
  },
  {
    id: 'job-5',
    title: 'Python Teaching Assistant',
    company: 'Codecademy',
    logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$18 - $22/hour',
    location: 'Remote',
    category: 'Teaching',
    isVerified: true,
    type: 'Work From Home',
    postedTime: '1 week ago',
    description: 'Host weekly programming clinics and answer discussion forum questions for adult learners and high school students starting Python basics.',
    requirements: ['Strong programming basics in Python', 'Patience in explaining bugs', '10 hours availability per week']
  },
  {
    id: 'job-6',
    title: 'Digital Marketing Intern',
    company: 'Buffer',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$18 - $23/hour',
    location: 'Remote',
    category: 'Digital Marketing',
    isVerified: true,
    type: 'Work From Home',
    postedTime: '6 hours ago',
    description: 'Draft social posts, schedule community newsletters, and collect reach and impression metrics using analytics platforms. Fully flexible hours.',
    requirements: ['Familiar with social platform trends', 'Basic copywriting skill', 'Self-motivated remote worker']
  },
  {
    id: 'job-7',
    title: 'Data entry & Annotation Intern',
    company: 'Scale AI',
    logo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$16 - $20/hour',
    location: 'Hybrid',
    category: 'Data Entry',
    isVerified: true,
    type: 'Hybrid',
    postedTime: '2 days ago',
    description: 'Label datasets for AI text classification models, bounding boxes for computer vision, and structure conversation data logs for LLM tuning. Accurate and secure workflow.',
    requirements: ['Meticulous attention to detail', 'Can work with cloud-based annotation platforms', 'Reliable internet connection']
  },
  {
    id: 'job-8',
    title: 'Freelance Technical Writer',
    company: 'LogRocket',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&h=80&q=80',
    salary: '$300 - $500/article',
    location: 'Remote',
    category: 'Freelancing',
    isVerified: true,
    type: 'Work From Home',
    postedTime: '4 days ago',
    description: 'Write comprehensive, developer-focused guides on React performance debugging, TypeScript typings, or backend routing mechanisms.',
    requirements: ['Practical frontend or backend project experience', 'Clear explanatory writing style', 'Familiar with developer diagnostics']
  }
];

// --- Verified Company Directory ---
export const MOCK_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    website: 'https://stripe.com',
    founded: 2010,
    industry: 'Financial Technology (SaaS)',
    employeeCount: '8,000+',
    linkedin: 'linkedin.com/company/stripe',
    glassdoorRating: 4.3,
    indeedRating: 4.1,
    isVerified: true,
    trustScore: 99,
    description: 'Stripe builds financial infrastructure for the internet. Millions of businesses, from startups to large enterprises, use Stripe software to accept payments.'
  },
  {
    id: 'comp-2',
    name: 'Notion',
    logo: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=120&h=120&q=80',
    website: 'https://notion.so',
    founded: 2013,
    industry: 'Productivity Software',
    employeeCount: '500+',
    linkedin: 'linkedin.com/company/notion-labs',
    glassdoorRating: 4.6,
    indeedRating: 4.4,
    isVerified: true,
    trustScore: 97,
    description: 'Notion is a single space where you can write, plan, and collaborate. Find workspace setups customized for students and teams alike.'
  },
  {
    id: 'comp-3',
    name: 'Vercel',
    logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=120&h=120&q=80',
    website: 'https://vercel.com',
    founded: 2015,
    industry: 'Cloud Computing & Hosting',
    employeeCount: '400+',
    linkedin: 'linkedin.com/company/vercel',
    glassdoorRating: 4.5,
    indeedRating: 4.2,
    isVerified: true,
    trustScore: 98,
    description: 'Vercel provides developer tools and cloud hosting for frontend frameworks, enabling developers to build and launch high-performance websites instantly.'
  },
  {
    id: 'comp-4',
    name: 'Linear',
    logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=120&h=120&q=80',
    website: 'https://linear.app',
    founded: 2019,
    industry: 'Project Management SaaS',
    employeeCount: '80+',
    linkedin: 'linkedin.com/company/linear-app',
    glassdoorRating: 4.8,
    indeedRating: 4.5,
    isVerified: true,
    trustScore: 95,
    description: 'Linear helps product teams plan projects, track issues, and ship software. Known for speed, beautiful design, and custom keyboard layouts.'
  },
  {
    id: 'comp-5',
    name: 'Apex Recruiting Group',
    logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&h=120&q=80',
    website: 'https://apexrecruit-group.org',
    founded: 2023,
    industry: 'Third-party Staffing Agencies',
    employeeCount: '5-10',
    linkedin: 'No active business profile',
    glassdoorRating: 1.5,
    indeedRating: 2.1,
    isVerified: false,
    trustScore: 28,
    description: 'Apex Recruiting Group is an unverified portal offering simple part-time online data typing contracts. Warning: Reported for asking onboarding fees.'
  }
];

// --- Mock Scam Reports Feed ---
export const MOCK_SCAMS: ScamReport[] = [
  {
    id: 'scam-1',
    companyName: 'DailyTask Media',
    recruiterName: 'Elena Johnson (WhatsApp HR)',
    jobLink: 'WhatsApp +62-813-4422-9901',
    description: 'Offered $5 per YouTube video liked. Required depositing $20 to "upgrade to Tier-2 worker level" after doing 3 free trials.',
    dateReported: '2026-07-06',
    status: 'Flagged Scam'
  },
  {
    id: 'scam-2',
    companyName: 'Cloud typing ventures',
    recruiterName: 'Direct Telegram Agent',
    jobLink: 't.me/cloudtyping_recruiting',
    description: 'Offered $300 a week for copy-pasting document content. Demanded $15 "security registration fee" to release the writing files.',
    dateReported: '2026-07-05',
    status: 'Flagged Scam'
  },
  {
    id: 'scam-3',
    companyName: 'Google Ads Task Inc',
    recruiterName: 'Ravi Kumar (WhatsApp)',
    jobLink: 'WhatsApp +91-72901-22910',
    description: 'Promises payments for reviewing local maps locations. Later asks to transfer money into an online crypto portfolio to unlock salary.',
    dateReported: '2026-07-04',
    status: 'Flagged Scam'
  }
];

// --- Community Reviews ---
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    companyName: 'Stripe',
    rating: 5,
    reviewText: 'Awesome student internship environment. Fully remote, flexible hours around exams, and real engineering responsibilities. They treat interns like full-timers.',
    experience: '6-Month Web Developer Intern',
    recommend: true,
    likes: 42,
    helpfulCount: 28,
    date: '2026-06-25'
  },
  {
    id: 'rev-2',
    companyName: 'Notion',
    rating: 4,
    reviewText: 'Writing guides for student groups was fun. The managers are super helpful and check in weekly. Only drawback was that some shifts were late night SF time (remote from London).',
    experience: 'Content Creator Intern',
    recommend: true,
    likes: 18,
    helpfulCount: 11,
    date: '2026-07-01'
  },
  {
    id: 'rev-3',
    companyName: 'Apex Recruiting Group',
    rating: 1,
    reviewText: 'STAY AWAY! Sent me a PDF contract that looked extremely professional, but once I typed 40 pages, they said I had an accuracy issue and had to deposit $30 to rerun the correction algorithm. Total Scam!',
    experience: 'Online Typist Applicant',
    recommend: false,
    likes: 112,
    helpfulCount: 94,
    date: '2026-07-03'
  }
];

// --- FAQ Items ---
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does the AI Job Verification work?',
    answer: 'Our engine uses advanced pattern heuristics and NLP cues. It scans job post text for standard high-risk indicators like upfront registration fees, redirection to anonymous chat accounts, non-company domains (such as Gmail), hyper-inflated salaries for basic work, and recruitment urgency pressures.'
  },
  {
    question: 'Should I ever pay money to get a job?',
    answer: 'Absolutely never. Reputable companies cover their training and onboarding expenses. If a recruiter asks you to pay for software, "refundable deposits", training kits, or insurance fees, it is 100% a scam.'
  },
  {
    question: 'What is Student Verification on JobShield?',
    answer: 'Verification allows students to get priority listings and access safe apply links. By confirming your university email (e.g. .edu) or uploading a valid student ID, we verify you are a student, unlocking access to verified campus opportunities and our ATS Resume builder.'
  },
  {
    question: 'How are the "Trusted Jobs" vetted?',
    answer: 'Our listing validation team manually reviews company domain registers, LinkedIn HR profiles, and matches community ratings on glassdoor and indeed before any company receives a "Verified" badge on JobShield.'
  }
];

// --- Scam Awareness Examples ---
export const SCAM_EXAMPLES: ScamExample[] = [
  {
    title: 'The WhatsApp "Like & Subscribe" Task Scam',
    type: 'WhatsApp Message',
    message: '"Hello! I am Clara, HR Manager from Apex Media. We have a part-time job from home: you only need to like YouTube videos and send screenshots. Earn $3 for each task. You can earn $100-$300 daily. To start, please join this Telegram group: t.me/ApexMedia_tasks"',
    redFlags: [
      'No formal job description or interview process.',
      'Recruitment conducted entirely via WhatsApp + foreign numbers.',
      'Promises large daily payouts for 5 minutes of basic tasks.',
      'Redirects to anonymous Telegram channels.'
    ],
    safeAlternative: 'Search for official Social Media Content Moderation roles on official career portals like Vercel or Buffer.'
  },
  {
    title: 'The "Refundable Security Deposit" Typist Scam',
    type: 'LinkedIn Direct Message / Telegram group',
    message: '"Urgent hiring for document copying! We pay $20 per page typed. Total 100 pages to be delivered in 4 days ($2000 total). Note: To register and secure the text files, new candidates must pay a refundable security deposit of $15. This is refunded with your first salary."',
    redFlags: [
      'Asks for money upfront for "file security" or "materials".',
      'Pay rate is vastly higher than market averages for transcription.',
      'Urgent hiring pressure to bypass logic.'
    ],
    safeAlternative: 'Apply for official transcription work on vetted platforms like Rev, TranscribeMe, or Scale AI annotation programs.'
  }
];
