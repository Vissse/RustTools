import React from "react";

export function ReqCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 ml-6 md:ml-10">
      <div className="font-bold text-text-bright text-lg sm:w-40 flex-shrink-0">{title}</div>
      <div className="text-base text-text-dim font-light leading-relaxed">{desc}</div>
    </div>
  )
}

export function Step({ number, title, children, isLast }: { number: number; title: string; children: React.ReactNode; isLast?: boolean }) {
  return (
    <div className="flex gap-8 md:gap-16">
      {/* Osa */}
      <div className="flex-shrink-0 relative flex flex-col items-center">
        <div className="w-16 h-16 bg-panel border-2 border-rust relative z-10 flex items-center justify-center shadow-[0_0_15px_var(--rust-glow)]">
          <span className="text-3xl font-bold text-rust mt-2 font-display">{number}</span>
        </div>
        
        {!isLast && (
          <div className="absolute top-16 bottom-[-6rem] md:bottom-[-8rem] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-[2px] h-full bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-rust to-transparent animate-pulse" />
            </div>
          </div>
        )}
      </div>
      
      {/* Obsah */}
      <div className="flex-1 pb-4">
        <h3 className="text-3xl font-medium text-text-bright mb-6 tracking-wide mt-2 font-display uppercase">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Tip({ title, children, type = "info" }: { title: string; children: React.ReactNode, type?: "warning" | "info" }) {
  const isWarning = type === "warning";
  const borderColor = isWarning ? 'border-l-red-cost' : 'border-l-rust';
  const icon = isWarning 
    ? <svg className="w-6 h-6 text-red-cost" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    : <svg className="w-6 h-6 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

  return (
    <div className={`border border-border border-l-[4px] ${borderColor} p-8 bg-panel flex gap-6 items-start`}>
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-text-bright font-bold mb-3 text-2xl font-display uppercase tracking-wide">{title}</h4>
        <p className="text-text-dim text-base leading-loose font-light">{children}</p>
      </div>
    </div>
  );
}

export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full border border-dashed border-border-hi bg-bg py-24 px-12 flex flex-col items-center justify-center text-center relative overflow-hidden group mb-10">
      <div className="absolute inset-0 bg-panel opacity-0 group-hover:opacity-10 transition-opacity" />
      <span className="text-sm font-bold text-text-muted uppercase tracking-[0.2em] mb-4 font-display">Image Placeholder</span>
      <span className="text-base text-text-dim leading-loose max-w-lg font-light relative z-10">{label}</span>
    </div>
  );
}
