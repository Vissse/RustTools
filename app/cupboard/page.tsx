import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CupboardCalculator } from '@/components/CupboardCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { CUPBOARD_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Cupboard Calculator — Tool Cupboard Upkeep & Decay Time',
  description:
    'Enter your daily upkeep and see how long your base stays protected, laid out across the 24 Tool Cupboard slots in Rust.',
  path: '/cupboard',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(CUPBOARD_SEO)} />
      <CalcShell headerAccent="CUPBOARD" headerRest="CALCULATOR" variant="cupboard">
        <Suspense fallback={<div className="min-h-screen" />}>
          <CupboardCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
