'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm bg-[#151515] border border-white/10 p-6 rounded-xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-bold text-text-bright tracking-wide uppercase flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-10 10 1 1 0 0 0 1 1h1"/><path d="M7 10v.01"/><path d="M10 14v.01"/><path d="M15 13v.01"/>
          </svg>
          Cookie Consent
        </h3>
      </div>
      <p className="text-sm text-text-dim mb-5 leading-relaxed">
        We use cookieless analytics to respect your privacy, but we still ask for your consent to track anonymous usage data to improve the site. Read our <Link href="/privacy" className="text-rust hover:underline">Privacy Policy</Link>.
      </p>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleAccept}
          className="flex-1 bg-rust hover:bg-rust-hover text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm font-display tracking-wider uppercase shadow-[0_0_10px_var(--rust-glow)] cursor-pointer"
        >
          Accept
        </button>
        <button 
          onClick={handleDecline}
          className="flex-1 bg-white/5 hover:bg-white/10 text-text-bright font-bold py-2.5 px-4 rounded-lg transition-colors text-sm font-display tracking-wider uppercase border border-white/10 cursor-pointer"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
