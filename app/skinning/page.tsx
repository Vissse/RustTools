import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SkinningCalculator } from '@/components/SkinningCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { SKINNING_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Skinning Calculator — Animal & Entity Yields',
  description:
    'Check how much meat, fat, leather, and bone fragments you get by skinning animals in Rust with different tools.',
  path: '/skinning',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(SKINNING_SEO)} />
      <CalcShell headerAccent="SKINNING" headerRest="CALCULATOR" variant="recycling">
        <Suspense fallback={<div className="min-h-screen" />}>
          <SkinningCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
