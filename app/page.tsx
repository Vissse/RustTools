import type { Metadata } from 'next'
import { Home } from '@/components/Home'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  // Lead with what people search for, not the tagline. "RustTools — Master
  // Your Wipe" only ever matched people who already knew the brand.
  title: 'Rust Calculators & Guides — Raid, Recycling, Upkeep | RustTools',
  description:
    'Free Rust calculators for raid cost, recycler yields, base upkeep, smelting, decay and more, plus in-depth guides. No account needed.',
  path: '/',
})

export default function Page() {
  return <Home />
}
