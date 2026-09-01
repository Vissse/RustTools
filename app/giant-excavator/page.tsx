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

// See app/raid/page.tsx: tool only, no prose. The written reference and the
// yield table live at /reference/excavator-yields.
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
