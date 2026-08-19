import type { Metadata } from 'next'
import { MonumentsGuide } from '@/components/guides/MonumentsGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'All Monuments — Rust Game Map Locations',
  description:
    'Browse every monument in Rust: loot tables, keycard puzzles, scientists, radiation levels, recyclers and more for all 38 monuments.',
  path: '/world/monuments',
})

export default function MonumentsPage() {
  return <MonumentsGuide />
}
