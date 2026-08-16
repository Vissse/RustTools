import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GiantExcavatorCalculator } from '@/components/GiantExcavatorCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { GIANT_EXCAVATOR_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Giant Excavator Calculator — Output & Fuel',
  description:
    'Calculate Giant Excavator output and diesel fuel use in Rust to plan your mining runs at the monument.',
  path: '/giant-excavator',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(GIANT_EXCAVATOR_SEO)} />
      <CalcShell headerAccent="GIANT" headerRest="EXCAVATOR" variant="cupboard">
        <Suspense fallback={<div className="min-h-screen" />}>
          <GiantExcavatorCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
