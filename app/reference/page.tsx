import type { Metadata } from 'next'
import Link from 'next/link'
import {
  seoMetadata,
  breadcrumbJsonLd,
  itemListJsonLd,
  DATA_VERIFIED_LABEL,
} from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { REFERENCE_INDEX, RAID_REFERENCE_INDEX } from '@/lib/reference-content'

/**
 * Hub for the written reference pages.
 *
 * The raid page's copy is solved from the raid data at build time, so it isn't
 * in REFERENCE_INDEX; its slug, title and description are listed separately and
 * pinned first here — it is the page most people arrive for.
 */
const PAGES = [
  {
    slug: RAID_REFERENCE_INDEX.slug,
    crumb: RAID_REFERENCE_INDEX.crumb,
    description: RAID_REFERENCE_INDEX.description,
  },
  ...REFERENCE_INDEX.map((c) => ({
    slug: c.slug,
    crumb: c.crumb,
    description: c.description,
  })),
]

export const metadata: Metadata = seoMetadata({
  title: 'Rust Reference — Verified Game Data and Tables',
  description: `Verified Rust game data as published tables: raid costs, recycler yields, smelting times, decay rates, upkeep, excavator output and harvest yields. Last checked ${DATA_VERIFIED_LABEL}.`,
  path: '/reference',
})

export default function ReferenceHub() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Reference', path: '/reference' }]),
          itemListJsonLd({
            name: 'Rust reference tables',
            description:
              'Published game data for Rust: raid costs, recycler yields, smelting times, decay rates, base upkeep, excavator output and harvest yields.',
            items: PAGES.map((p) => ({
              name: p.crumb,
              path: `/reference/${p.slug}`,
            })),
          }),
        ]}
      />

      <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
        <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
          <Link href="/" className="hover:text-text-bright transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-rust font-medium">Reference</span>
        </nav>

        <header className="mb-8 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-text-bright leading-none font-display uppercase">
            Rust <span className="text-rust">Reference</span>
          </h1>
          <p className="text-xl text-text-dim font-light max-w-3xl leading-loose">
            The numbers behind the calculators, published as tables you can read
            and quote: what it costs to raid each structure, what every component
            returns when recycled, how long ore takes to smelt, and what a base
            costs to keep standing. All data was last verified against Rust in{' '}
            {DATA_VERIFIED_LABEL}.
          </p>
        </header>

        <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/reference/${p.slug}`}
              className="block h-full"
            >
              <article className="transition-all duration-300 h-full flex flex-col bg-panel hover:bg-[#1f1f1f] hover:-translate-y-2 shadow-xl hover:shadow-2xl animate-fade-in-up border-t-2 border-t-rust p-6">
                <h2 className="text-2xl font-bold text-text-bright tracking-wide font-display uppercase leading-tight mb-4">
                  {p.crumb}
                </h2>
                <p className="text-text-dim leading-relaxed text-sm font-light flex-1">
                  {p.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
