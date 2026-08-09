import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SkinningCalculator } from '@/components/SkinningCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { SKINNING_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Skinning Calculator — Animal & Entity Yields',
  description:
    'Check how much meat, fat, leather, and bone fragments you get by skinning animals in Rust with different tools.',
  path: '/skinning',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <SkinningCalculator />
      </Suspense>
      <CalcSeo {...SKINNING_SEO} />
    </>
  )
}
