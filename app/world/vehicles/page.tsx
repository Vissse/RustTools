import type { Metadata } from 'next'
import Link from 'next/link'
import { seoMetadata } from '@/lib/seo'
import { Img } from '@/components/Img'
import { VEHICLE_SUBCATEGORIES } from '@/lib/data/vehicles-data'
import { VEHICLE_SLUG_ENTRIES } from '@/lib/data/vehicles-data/slugs'

export const metadata: Metadata = seoMetadata({
  title: 'Vehicles — Rust Vehicle List',
  description: 'Every vehicle in Rust: air, land, siege weapons and water.',
  path: '/world/vehicles',
  index: false,
})

export default function VehiclesPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 text-text font-sans">
      <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/world" className="hover:text-text-bright transition-colors">
          World
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Vehicles</span>
      </nav>

      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          RUST <span className="text-rust">VEHICLES</span>
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed mt-6">
          Every vehicle in Rust, sorted by type. Names only for now — stats and
          fuel/health info are coming later.
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <div className="flex flex-col gap-10 animate-fade-in-up">
        {VEHICLE_SUBCATEGORIES.map((subcategory) => (
          <section key={subcategory}>
            <span className="sec-label">{subcategory}</span>
            <div className="flex flex-wrap gap-2 mt-4">
              {VEHICLE_SLUG_ENTRIES.filter((v) => v.subcategory === subcategory).map(({ name, slug, image }) => (
                <Link
                  key={slug}
                  href={`/world/vehicles/${slug}`}
                  className="flex items-center gap-2 text-sm text-text-dim bg-white/[0.03] border border-white/5 rounded-full py-1.5 pl-1.5 pr-3.5 hover:border-rust/40 hover:text-text-bright transition-colors"
                >
                  {image && <Img src={image} alt="" width={40} height={40} className="w-6 h-6 object-contain" />}
                  {name}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
