'use client';

import { useState } from 'react';

export function SupportCards() {
  const [showPopup, setShowPopup] = useState(false);

  const handleNotReadyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
    // Hide after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <>
      <div className="max-w-4xl animate-fade-in-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        
        {/* Ko-fi */}
        <button onClick={handleNotReadyClick} className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#13C3FF]/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-[#13C3FF]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(19,195,255,0.15)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#13C3FF] translate-y-[2px] -translate-x-[1px]">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.051-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.74 4.311zm8.173.268c-2.309.513-4.449.214-4.449.214s-.04-3.21-.04-3.874c.002-.66.02-1.427.02-1.427s2.518-.031 3.593.023c1.074.053 2.128.513 2.373 1.631.244 1.119-.188 2.92-1.497 3.433z"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide">Ko-fi</h2>
          <p className="text-sm text-text-dim text-center">Buy us a coffee! One-time donations are always appreciated.</p>
        </button>

        {/* Patreon */}
        <button onClick={handleNotReadyClick} className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF424D]/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-[#FF424D]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,66,77,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF424D] translate-y-[1px] translate-x-[1px]">
              <path d="M22.957 7.027c0 4.964-4.004 8.989-8.948 8.989-4.945 0-8.948-4.025-8.948-8.989 0-4.965 4.003-8.99 8.948-8.99 4.944 0 8.948 4.025 8.948 8.99M.043 23h3.585V.037H.043V23z"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide">Patreon</h2>
          <p className="text-sm text-text-dim text-center">Support us monthly and get a special role in our upcoming Discord.</p>
        </button>

        {/* PayPal */}
        <button onClick={handleNotReadyClick} className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#0070BA]/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-[#0070BA]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,112,186,0.15)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-[#0070BA] translate-y-[1px] translate-x-[1px]">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
              <path d="M21.115 7.32c-.08-.184-.176-.367-.286-.547C20.48 5.6 19.344 4.8 17.5 4.8h-4.32a.641.641 0 0 0-.633.541l-2.023 12.836a.641.641 0 0 0 .633.74h3.69c.524 0 .968-.382 1.05-.9l.542-3.447c.081-.518.525-.9 1.05-.9h1.164c3.923 0 7.025-1.595 7.923-6.19.06-.307.112-.622.155-.947a5.534 5.534 0 0 0-.616-2.213z" opacity=".8"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-text-bright uppercase tracking-wide">PayPal</h2>
          <p className="text-sm text-text-dim text-center">Direct, secure one-time donations via PayPal.</p>
        </button>

      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#151515] border border-rust/30 text-text-bright px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(255,87,34,0.15)] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span className="font-medium text-sm tracking-wide">Donation links are not set up yet!</span>
        </div>
      )}
    </>
  );
}
