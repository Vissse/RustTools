import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RaidCalculator } from '@/components/RaidCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { RAID_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Raid Calculator — Cheapest Way to Raid Any Base',
  description:
    'Pick a structure and the explosives you have, and the Rust Raid Calculator finds the cheapest combo to break it by sulfur, with the full resource cost.',
  path: '/raid',
})

// The calculator reads search params, so it renders on the client and the
// pre-rendered HTML for this route is the fallback below — which is why the
// breadcrumb and <h1> live in CalcShell, outside the boundary, where a crawler
// still sees them. The fallback is sized so the page doesn't jump on swap-in.
export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(RAID_SEO)} />
      <CalcShell headerAccent="RAID" headerRest="CALCULATOR" variant="raid">
        <Suspense fallback={<div className="min-h-screen" />}>
          <RaidCalculator />
        </Suspense>
      </CalcShell>
    </>
  )
}
