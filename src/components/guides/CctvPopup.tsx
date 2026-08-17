import { useState } from 'react';

const CAMERA_CODES: Record<string, string[]> = {
  "Large Oil Rig": ["OILRIG2HELI", "OILRIG2DOCK", "OILRIG2EXHAUST", "OILRIG2L1", "OILRIG2L2", "OILRIG2L3A", "OILRIG2L3B", "OILRIG2L4", "OILRIG2L5", "OILRIG2L6A", "OILRIG2L6B", "OILRIG2L6C", "OILRIG2L6D"],
  "Oil Rig": ["OILRIG1HELI", "OILRIG1L4", "OILRIG1L3", "OILRIG1L2", "OILRIG1L1", "OILRIG1DOCK"],
  "Outpost": ["COMPOUNDSTREET", "COMPOUNDCRUDE", "COMPOUNDMUSIC", "COMPOUNDCHILL"],
  "Bandit Camp": ["TOWNWEAPONS", "CASINO"],
  "Airfield": ["AIRFIELDHELIPAD"],
  "The Dome": ["DOME1", "DOMETOP"],
  "Missile Silo": ["SILOEXIT1", "SILOEXIT2", "SILOSHIPPING", "SILOTOWER", "SILOMISSILE"],
  "Ferry Terminal": ["FERRYDOCK", "FERRYUTILITIES", "FERRYPARKING", "FERRYLOGISTICS"],
  "Rad Town": ["RADTOWNAPARTMENTS", "RADTOWNHOUSE", "RADTOWNSBL"]
};

interface CctvPopupProps {
  monumentName: string;
  onClose: () => void;
}

export function CctvPopup({ monumentName, onClose }: CctvPopupProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const codes = CAMERA_CODES[monumentName] || [];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#151515] border border-border rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,1)] overflow-hidden animate-scale-in flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-border relative overflow-hidden bg-white/[0.02]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-text-dim hover:text-text-bright transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
              <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"></path>
              <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"></path>
              <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"></path>
              <path d="M2 21v-4"></path>
              <path d="M7 9h.01"></path>
            </svg>
            <h3 className="text-2xl font-display text-text-bright uppercase tracking-wide">
              {monumentName}
            </h3>
          </div>
          <p className="text-text-dim text-sm">
            Copy and paste these identifiers into a Computer Station to access the cameras.
          </p>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
          {codes.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {codes.map((code) => (
                <button
                  key={code}
                  onClick={() => handleCopy(code)}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-rust/10 hover:border-rust/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group text-left"
                >
                  <span className="font-mono text-lg font-bold text-text-bright tracking-wider group-hover:text-rust transition-colors">
                    {code}
                  </span>
                  
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-text-dim group-hover:bg-rust group-hover:text-text-bright transition-all">
                    {copiedCode === code ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-bright">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-text-dim">
              No static camera codes available for this monument.
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border bg-black/20 text-center">
          <p className="text-xs text-text-dim/60">
            Click any code to instantly copy it to your clipboard.
          </p>
        </div>
      </div>
    </div>
  );
}
