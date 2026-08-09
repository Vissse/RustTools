import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ShopCalculator } from '@/components/ShopCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { SHOPS_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Shops Calculator — Bandit Camp, Outpost & Fishing Village',
  description:
    'Calculate scrap costs for items at the Bandit Camp, Outpost, and Fishing Village in Rust. Track your scrap balance, purchases, and exchange rates.',
  path: '/shops',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ShopCalculator />
      </Suspense>
      <CalcSeo {...SHOPS_SEO} />
    </>
  )
}
