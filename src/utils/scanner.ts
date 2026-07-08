export interface ScanDetail {
  id: string;
  label: string;
  description: string;
  impact: number;
  isTriggered: boolean;
}

export interface ScanResult {
  score: number;
  status: 'genuine' | 'suspicious' | 'scam';
  details: ScanDetail[];
  suggestions: string[];
}

export function analyzeJobPost(text: string): ScanResult {
  const content = text.toLowerCase();
  let score = 0; // Starts at 0, goes to 100 (100 = full scam)
  const details: ScanDetail[] = [
    {
      id: 'upfront_payment',
      label: 'Upfront Payment requested',
      description: 'The job post mentions registration fees, training charges, or purchasing starter kits.',
      impact: 40,
      isTriggered: false
    },
    {
      id: 'free_email',
      label: 'Public or Free Email Domain',
      description: 'The contact email uses a free domain (like @gmail.com, @yahoo.com, @hotmail.com) instead of a corporate domain.',
      impact: 20,
      isTriggered: false
    },
    {
      id: 'whatsapp_telegram',
      label: 'Redirects to Chat Apps',
      description: 'Recruitment is conducted purely over WhatsApp, Telegram, or other chat platforms without official application portals.',
      impact: 25,
      isTriggered: false
    },
    {
      id: 'salary_unrealistic',
      label: 'Unrealistically High Salary',
      description: 'The salary structure is excessively high for the level of effort described (e.g. $50/hour for data entry).',
      impact: 20,
      isTriggered: false
    },
    {
      id: 'otp_request',
      label: 'Asks for Personal OTP or Security Codes',
      description: 'Instructions ask you to share security codes, verification codes, or bank OTPs.',
      impact: 45,
      isTriggered: false
    },
    {
      id: 'urgency_pressure',
      label: 'High Urgency / Pressure Tactics',
      description: 'Language demands immediate action (e.g., "join in 1 hour", "limited seats left", "direct selection without interview").',
      impact: 15,
      isTriggered: false
    },
    {
      id: 'no_interview',
      label: 'Direct Hire / No Interview Process',
      description: 'Indicates direct onboarding without formal technical or background interviews.',
      impact: 15,
      isTriggered: false
    },
    {
      id: 'shortened_links',
      label: 'Suspicious or Shortened Links',
      description: 'Uses generic URL shorteners (bit.ly, t.me, tinyurl) instead of official company website addresses.',
      impact: 15,
      isTriggered: false
    },
    {
      id: 'fake_hr',
      label: 'Generic / Fake Recruiter Profile',
      description: 'HR names are generic, or messages are sent from foreign country codes (+62, +234, +92) claiming local HR positions.',
      impact: 25,
      isTriggered: false
    },
    {
      id: 'lack_of_details',
      label: 'Vague Job Description',
      description: 'No detailed requirements, company profile, or registered business address is provided.',
      impact: 10,
      isTriggered: false
    }
  ];

  // 1. Upfront Payment Check
  if (
    content.includes('deposit') ||
    content.includes('security fee') ||
    content.includes('registration fee') ||
    content.includes('training fee') ||
    content.includes('pay to start') ||
    content.includes('processing fee') ||
    content.includes('buy equipment') ||
    content.includes('refundable deposit')
  ) {
    const detail = details.find(d => d.id === 'upfront_payment');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 2. Free Email check
  const emailRegex = /[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|live|mail|yandex|protonmail)\.[a-zA-Z]{2,}/;
  if (emailRegex.test(content) || content.includes('gmail.com') || content.includes('yahoo.com')) {
    const detail = details.find(d => d.id === 'free_email');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 3. Redirects to Chat Apps
  if (
    content.includes('telegram') ||
    content.includes('t.me/') ||
    content.includes('whatsapp') ||
    content.includes('wa.me/') ||
    content.includes('dm me') ||
    content.includes('instagram dm')
  ) {
    const detail = details.find(d => d.id === 'whatsapp_telegram');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 4. Unrealistically High Salary
  // Matches expressions like "$50/hr", "$100 per day", "$1000/week", "5000 rs per day" for simple tasks
  const salaryIndicators = [
    'typing job', 'data entry', 'copy paste', 'online typing', 'watching video', 'like video', 'subscribe channels'
  ];
  const hasSimpleTask = salaryIndicators.some(ind => content.includes(ind));
  const hasHighPay = content.includes('$50/hr') ||
                     content.includes('$40/hr') ||
                     content.includes('$100/day') ||
                     content.includes('$500/week') ||
                     content.includes('earn $') ||
                     content.includes('salary $100') ||
                     content.includes('1000 rs') ||
                     content.includes('5000 rs') ||
                     content.includes('earn daily');
  
  if (hasSimpleTask && hasHighPay) {
    const detail = details.find(d => d.id === 'salary_unrealistic');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 5. OTP Request
  if (
    content.includes('otp') ||
    content.includes('one time password') ||
    content.includes('verification code') ||
    content.includes('code sent to your phone') ||
    content.includes('bank details and code')
  ) {
    const detail = details.find(d => d.id === 'otp_request');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 6. Urgency Pressure
  if (
    content.includes('immediately') ||
    content.includes('urgent') ||
    content.includes('last few hours') ||
    content.includes('limited slots') ||
    content.includes('apply now before') ||
    content.includes('hurry')
  ) {
    const detail = details.find(d => d.id === 'urgency_pressure');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 7. No Interview
  if (
    content.includes('no interview') ||
    content.includes('direct hiring') ||
    content.includes('direct selection') ||
    content.includes('instant selection') ||
    content.includes('joining letter without')
  ) {
    const detail = details.find(d => d.id === 'no_interview');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 8. Shortened Links
  if (
    content.includes('bit.ly') ||
    content.includes('tinyurl.com') ||
    content.includes('cutt.ly') ||
    content.includes('linktr.ee') ||
    content.includes('t.me/')
  ) {
    const detail = details.find(d => d.id === 'shortened_links');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 9. Fake HR Profile
  const foreignCodeRegex = /(\+62|\+234|\+92|\+60|\+91-[0-9]{5})/;
  if (
    foreignCodeRegex.test(content) ||
    content.includes('hr manager') && (content.includes('whatsapp') || content.includes('telegram')) ||
    content.includes('part-time tasks specialist')
  ) {
    const detail = details.find(d => d.id === 'fake_hr');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // 10. Lack of details
  if (text.trim().length > 10 && text.trim().length < 150) {
    const detail = details.find(d => d.id === 'lack_of_details');
    if (detail) {
      detail.isTriggered = true;
      score += detail.impact;
    }
  }

  // Cap score at 100
  score = Math.min(100, score);
  
  // If text is super clean (e.g. standard developer job description), it might stay 0.
  // Add base score based on length if nothing is triggered but text is too short.
  if (score === 0 && text.trim().length < 30) {
    score = 15;
    const detail = details.find(d => d.id === 'lack_of_details');
    if (detail) detail.isTriggered = true;
  }

  let status: 'genuine' | 'suspicious' | 'scam' = 'genuine';
  if (score >= 65) {
    status = 'scam';
  } else if (score >= 30) {
    status = 'suspicious';
  }

  // Suggestions builder
  const suggestions: string[] = ['Always cross-check the company on Google and LinkedIn.'];
  
  if (score >= 30) {
    suggestions.push('Never send money for registration, laptops, certificates, or training.');
  }
  if (details.find(d => d.id === 'free_email')?.isTriggered) {
    suggestions.push('Contact the official HR department using the official company website contact form.');
  }
  if (details.find(d => d.id === 'whatsapp_telegram')?.isTriggered) {
    suggestions.push('Insist on having a formal video interview on Google Meet, Microsoft Teams, or Zoom before joining.');
  }
  if (details.find(d => d.id === 'otp_request')?.isTriggered) {
    suggestions.push('Never share OTPs, credit card numbers, or government ID numbers over WhatsApp or Telegram.');
  }
  if (score >= 50) {
    suggestions.push('Report this scammer on JobShield to warn other students.');
  }

  return {
    score,
    status,
    details,
    suggestions
  };
}
