import Link from "next/link";

export function AppPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">App</span>
      </div>

      {/* Hero Section */}
      <header className="guide-hero animate-fade-in-up">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
            RustTools <span className="text-rust">App</span>
          </h1>
          <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
            Progressive Web App Coming Soon
          </p>
          <div className="mt-8 text-lg text-text-dim max-w-2xl">
            <p>
              This section is currently under development. RustTools will soon
              be available as a
              <strong className="text-text-bright"> Progressive Web App</strong>
              , allowing you to install it directly on your device for offline
              use, faster loading times, and a native app experience right from
              your home screen.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
