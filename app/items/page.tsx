import type { Metadata } from 'next'
import Link from 'next/link'
import { seoMetadata } from '@/lib/seo'
import { ITEMS_DATA } from '@/lib/data/items-data'
import { CATEGORY_SLUG_ENTRIES } from '@/lib/data/items-data/slugs'

export const metadata: Metadata = seoMetadata({
  title: 'Items — Rust Item List',
  description: 'Browse every item in Rust, sorted by category.',
  path: '/items',
  index: false,
})

export default function ItemsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 text-text font-sans">
      <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Items</span>
      </nav>

      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          RUST <span className="text-rust">ITEMS</span>
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed mt-6">
          Every item in Rust, sorted by category. Names only for now — icons,
          stats and subcategories are coming later.
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {CATEGORY_SLUG_ENTRIES.map(({ slug, category }) => (
          <Link
            key={slug}
            href={`/items/${slug}`}
            className="group relative overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] p-8 transition-all duration-300 hover:border-rust/30 before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-0 hover:before:opacity-80 before:transition-opacity"
          >
            <h2 className="text-3xl font-display font-bold uppercase tracking-wide text-text-bright group-hover:text-rust transition-colors">
              {category}
            </h2>
            <p className="mt-3 text-text-dim text-base leading-relaxed">
              {ITEMS_DATA[category].length} items
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
