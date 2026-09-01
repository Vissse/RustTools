import type { Metadata } from 'next'
import { MonumentsGuide } from '@/components/guides/MonumentsGuide'
import { seoMetadata, breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { MONUMENT_SLUG_ENTRIES } from '@/lib/data/monuments-data/slugs'

const MONUMENT_COUNT = MONUMENT_SLUG_ENTRIES.length

export const metadata: Metadata = seoMetadata({
  title: 'All Monuments — Rust Game Map Locations',
  description: `Browse every monument in Rust: loot tables, keycard puzzles, scientists, radiation levels, recyclers and more for all ${MONUMENT_COUNT} monuments.`,
  path: '/world/monuments',
})

// This page had no structured data of its own, which left the site's largest
// directory indistinguishable from an article that happens to name monuments.
// The ItemList states what it actually is — an index of MONUMENT_COUNT pages —
// and points at each one, so the hub gets picked for "what monuments are in
// Rust" while the individual pages answer questions about a single monument.
export default function MonumentsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Monuments', path: '/world/monuments' }]),
          itemListJsonLd({
            name: 'Rust monuments',
            description: `All ${MONUMENT_COUNT} monuments in Rust, with loot, puzzles, keycards, scientists and facilities.`,
            items: MONUMENT_SLUG_ENTRIES.map((e) => ({
              name: e.monument.name,
              path: `/world/monuments/${e.slug}`,
            })),
          }),
        ]}
      />
      <MonumentsGuide />
    </>
  )
}
