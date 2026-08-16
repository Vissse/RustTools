import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ShopCalculator } from '@/components/ShopCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { SHOPS_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Shops Calculator — Bandit Camp, Outpost & Fishing Village',
  description:
    'Calculate scrap costs for items at the Bandit Camp, Outpost, and Fishing Village in Rust. Track your scrap balance, purchases, and exchange rates.',
  path: '/shops',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(SHOPS_SEO)} />
      <CalcShell headerAccent="SHOPS" headerRest="CALCULATOR" variant="recycling">
        <Suspense fallback={<div className="min-h-screen" />}>
          <ShopCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
