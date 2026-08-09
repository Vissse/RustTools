import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RecyclingCalculator } from '@/components/RecyclingCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { RECYCLING_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Recycling Calculator — Recycler Yields & Outputs',
  description:
    'Drop items into a recycler and see exactly what you get back, for both the Radtown and Safe Zone recyclers in Rust.',
  path: '/recycling',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <RecyclingCalculator />
      </Suspense>
      <CalcSeo {...RECYCLING_SEO} />
    </>
  )
}
