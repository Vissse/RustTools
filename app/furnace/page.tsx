import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FurnaceCalculator } from '@/components/FurnaceCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { FURNACE_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Furnace Calculator — Smelting Ratios & Times',
  description:
    'Plan your smelting in Rust: calculate furnace ratios, fuel and time to refine ore into metal, sulfur and high quality metal.',
  path: '/furnace',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <FurnaceCalculator />
      </Suspense>
      <CalcSeo {...FURNACE_SEO} />
    </>
  )
}
