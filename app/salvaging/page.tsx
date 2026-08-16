import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SalvagingCalculator } from '@/components/SalvagingCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { SALVAGING_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Salvaging Calculator — Bradley & Heli Yields',
  description:
    'Check how much charcoal, metal fragments, and HQM you get by salvaging destroyed Bradleys and Patrol Helicopters in Rust.',
  path: '/salvaging',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(SALVAGING_SEO)} />
      <CalcShell headerAccent="SALVAGING" headerRest="CALCULATOR" variant="recycling">
        <Suspense fallback={<div className="min-h-screen" />}>
          <SalvagingCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
