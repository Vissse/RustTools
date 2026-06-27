import type { Metadata } from 'next'
import { ShopCalculator } from '@/components/ShopCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Shops Calculator — Bandit Camp, Outpost & Fishing Village',
  description:
    'Calculate scrap costs for items at the Bandit Camp, Outpost, and Fishing Village in Rust. Track your scrap balance, purchases, and exchange rates.',
  path: '/shops',
})

export default function Page() {
  return <ShopCalculator />
}
