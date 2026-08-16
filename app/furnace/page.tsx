import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FurnaceCalculator } from '@/components/FurnaceCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { FURNACE_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Furnace Calculator — Smelting Ratios & Times',
  description:
    'Plan your smelting in Rust: calculate furnace ratios, fuel and time to refine ore into metal, sulfur and high quality metal.',
  path: '/furnace',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(FURNACE_SEO)} />
      <CalcShell headerAccent="SMELTING" headerRest="CALCULATOR" variant="recycling">
        <Suspense fallback={<div className="min-h-screen" />}>
          <FurnaceCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
