import type { Metadata } from 'next'
import Link from 'next/link'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'World — Rust Game Map, Monuments & More',
  description:
    'Explore the world of Rust: monuments, animals, biomes, and in-game locations with detailed guides and data.',
  path: '/world',
  index: false,
})

/**
 * World hub — landing page for all "world" content (monuments, animals, …).
 *
 * Kept intentionally minimal for now: a heading and links to the available
 * sub-sections. More sub-sections (biomes, events, …) will be added in later
 * phases.
 */
export default function WorldPage() {
  const sections = [
    {
      href: '/world/monuments',
      label: 'Monuments',
      description: 'All 38 monuments — loot, puzzles, keycards, scientists and more.',
    },
  ]

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 text-text font-sans">
      {/* Breadcrumb */}
      <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">World</span>
      </nav>

      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          RUST <span className="text-rust">WORLD</span>
        </h1>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 animate-fade-in-up">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] p-8 transition-all duration-300 hover:border-rust/30 before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-0 hover:before:opacity-80 before:transition-opacity"
          >
            <h2 className="text-3xl font-display font-bold uppercase tracking-wide text-text-bright group-hover:text-rust transition-colors">
              {s.label}
            </h2>
            <p className="mt-3 text-text-dim text-base leading-relaxed">
              {s.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
