import { Link } from '@tanstack/react-router'

export function MonumentsGuide() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link to="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/guides" className="hover:text-text-bright transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Monument Puzzles</span>
      </div>

      {/* Hero Section */}
      <header className="guide-hero animate-fade-in-up">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
            The Ultimate <span className="text-rust">Monuments</span> Guide
          </h1>
          <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
            Keycards, Puzzles, and Elite Loot
          </p>
        </div>
      </header>
    </div>
  )
}
