import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DecayCalculator } from '@/components/DecayCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { DECAY_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Decay Calculator — Building Decay Time by Material',
  description:
    'Work out how long a Rust structure survives without upkeep. Pick the building material and HP to see the full decay time.',
  path: '/decay',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <DecayCalculator />
      </Suspense>
      <CalcSeo {...DECAY_SEO} />
    </>
  )
}
