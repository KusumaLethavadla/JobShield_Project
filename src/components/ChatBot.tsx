import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const ChatBot: React.FC = () => {
  const { isLoggedIn, userProfile } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: `Hi ${isLoggedIn ? userProfile?.username : 'there'}! I'm Shieldy, your AI safety assistant. Ask me anything about suspicious job descriptions, recruiter messages, or safe platforms!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: timeString }]);
    setInputValue('');

    // Simulate AI thinking and replying
    setTimeout(() => {
      let botResponse = "I can help analyze that. Could you copy and paste the exact message or job posting? Remember: if they ask you to deposit money, it's always a scam!";
      
      const lower = userText.toLowerCase();
      if (lower.includes('deposit') || lower.includes('registration fee') || lower.includes('pay money')) {
        botResponse = "🛑 WARNING: A legitimate employer will NEVER ask you to pay money, purchase software, or deposit a security fee to get a job or start training. This is a 100% scam. Do not pay!";
      } else if (lower.includes('whatsapp') || lower.includes('telegram')) {
        botResponse = "⚠️ Recruiting through WhatsApp or Telegram without a website application or official email check is highly suspicious. Scammers often use these channels because they are anonymous and difficult to trace.";
      } else if (lower.includes('typing') || lower.includes('data entry')) {
        botResponse = "📝 Data entry and typing jobs are the most common student scams. Be extremely careful if they promise high hourly rates (like $30+/hr) for copy-paste tasks, and ask for upfront refundable deposits.";
      } else if (lower.includes('verification') || lower.includes('verify')) {
        botResponse = "🔍 You can verify any job or company using our 'AI Verification' or 'Company Search' tabs on the sidebar. I recommend pasting the full text or entering the company name there.";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        botResponse = `Hello! How can I help you stay safe in your job search today? You can paste any suspicious text here and I will check it for red flags.`;
      } else if (lower.includes('resume') || lower.includes('cv')) {
        botResponse = "📄 Looking to build a resume? We have an ATS-Optimized Resume Builder right here on JobShield! Just click 'Resume Builder' on the menu to get started.";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white shadow-xl hover:shadow-brand-blue/20 hover:scale-105 transition-all duration-300 group cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute right-12 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs py-1 px-3 rounded-lg shadow-lg font-medium transition-all duration-300 whitespace-nowrap mr-2">
            Ask Shieldy Bot
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[360px] md:w-[380px] h-[500px] flex flex-col rounded-2xl glass-panel shadow-2xl border border-brand-blue/30 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/10 light:border-slate-200 bg-brand-blue/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-brand-blue/20 text-brand-blue">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-1.5 dark:text-slate-100 light:text-slate-900">
                  Shieldy AI Chatbot
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                  </span>
                </h4>
                <p className="text-[10px] dark:text-slate-400 light:text-slate-500 font-medium">Job Verification Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 dark:text-slate-400 light:text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 dark:bg-slate-950/40 light:bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-brand-blue/10 dark:text-brand-blue-light light:text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/20">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-brand-blue text-white rounded-tr-none'
                        : 'dark:bg-slate-900 light:bg-white dark:text-slate-200 light:text-slate-800 border dark:border-white/5 light:border-slate-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] dark:text-slate-500 light:text-slate-400 mt-1 block px-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-white/5 dark:bg-slate-900/50 light:bg-slate-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about typing jobs, deposits..."
              className="flex-1 py-1.5 px-3 rounded-xl border dark:border-white/10 light:border-slate-200 dark:bg-slate-950 light:bg-white text-sm focus:outline-none focus:border-brand-blue dark:text-white light:text-slate-900 placeholder-slate-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
