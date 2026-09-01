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

// See app/raid/page.tsx: tool only, no prose. The written reference and the full
// smelting table live at /reference/smelting-times.
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
