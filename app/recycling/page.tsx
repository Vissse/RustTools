import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RecyclingCalculator } from '@/components/RecyclingCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { RECYCLING_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Recycling Calculator — Recycler Yields & Outputs',
  description:
    'Drop items into a recycler and see exactly what you get back, for both the Radtown and Safe Zone recyclers in Rust.',
  path: '/recycling',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(RECYCLING_SEO)} />
      <CalcShell headerAccent="RECYCLING" headerRest="CALCULATOR" variant="recycling">
        <Suspense fallback={<div className="min-h-screen" />}>
          <RecyclingCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
