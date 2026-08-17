'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented or declined
    const consent = localStorage.getItem('rusttools_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rusttools_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rusttools_cookie_consent', 'declined');
    setIsVisible(false);
  };

  const pathname = usePathname();

  if (!isVisible || pathname === '/privacy') return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      style={{ animation: 'fadeIn 0.4s ease-out forwards' }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popInCookie {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div 
        className="w-full max-w-sm bg-[rgba(19,18,16,0.85)] backdrop-blur-[20px] border border-white/[0.06] p-6 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
        style={{ animation: 'popInCookie 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display font-bold text-text-bright tracking-wide uppercase flex items-center gap-2 text-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust animate-pulse">
              <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-10 10 1 1 0 0 0 1 1h1"/><path d="M7 10v.01"/><path d="M10 14v.01"/><path d="M15 13v.01"/>
            </svg>
            Cookie Consent
          </h3>
        </div>
        <p className="text-sm text-text-dim mb-6 leading-relaxed">
          We use cookieless analytics to respect your privacy, but we still ask for your consent to track anonymous usage data to improve the site. Read our <Link href="/privacy" className="text-rust hover:text-text-bright transition-colors hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-rust hover:bg-rust-hover text-text-bright font-bold py-2.5 px-4 rounded-lg transition-all hover:-translate-y-1 hover:shadow-[0_8px_16px_var(--rust-glow)] active:scale-95 text-sm font-display tracking-wider uppercase shadow-[0_0_10px_var(--rust-glow)] cursor-pointer"
          >
            Accept
          </button>
          <button 
            onClick={handleDecline}
            className="flex-1 bg-white/5 hover:bg-white/10 text-text-bright font-bold py-2.5 px-4 rounded-lg transition-all hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(255,255,255,0.05)] active:scale-95 text-sm font-display tracking-wider uppercase border border-white/10 cursor-pointer"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
