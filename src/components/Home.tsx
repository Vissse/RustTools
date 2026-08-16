import Link from "next/link";

export function Home() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center font-sans text-text px-6">
      
      <div className="text-center">
        <h1 className="text-[5rem] md:text-[12rem] font-bold tracking-tighter text-text-bright leading-none font-display uppercase mb-16 md:mb-24 animate-fade-in-up">
          MASTER<br />
          YOUR <span className="text-rust">WIPE</span>
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 animate-fade-in-up">
          <Link
            href="/calculators"
            className="text-2xl md:text-5xl text-text-dim font-display uppercase tracking-[0.2em] hover:text-rust transition-colors"
          >
            Calculators
          </Link>

          <Link
            href="/guides"
            className="text-2xl md:text-5xl text-text-dim font-display uppercase tracking-[0.2em] hover:text-rust transition-colors"
          >
            Guides
          </Link>
        </div>
      </div>

    </div>
  );
}
