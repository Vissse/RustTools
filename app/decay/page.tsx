import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DecayCalculator } from '@/components/DecayCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { DECAY_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Decay Calculator — Building Decay Time by Material',
  description:
    'Work out how long a Rust structure survives without upkeep. Pick the building material and HP to see the full decay time.',
  path: '/decay',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(DECAY_SEO)} />
      <CalcShell headerAccent="DECAY" headerRest="CALCULATOR" variant="recycling">
        <Suspense fallback={<div className="min-h-screen" />}>
          <DecayCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
