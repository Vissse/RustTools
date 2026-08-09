import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GiantExcavatorCalculator } from '@/components/GiantExcavatorCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { GIANT_EXCAVATOR_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Giant Excavator Calculator — Output & Fuel',
  description:
    'Calculate Giant Excavator output and diesel fuel use in Rust to plan your mining runs at the monument.',
  path: '/giant-excavator',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <GiantExcavatorCalculator />
      </Suspense>
      <CalcSeo {...GIANT_EXCAVATOR_SEO} />
    </>
  )
}
