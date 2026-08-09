import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SalvagingCalculator } from '@/components/SalvagingCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { SALVAGING_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Salvaging Calculator — Bradley & Heli Yields',
  description:
    'Check how much charcoal, metal fragments, and HQM you get by salvaging destroyed Bradleys and Patrol Helicopters in Rust.',
  path: '/salvaging',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <SalvagingCalculator />
      </Suspense>
      <CalcSeo {...SALVAGING_SEO} />
    </>
  )
}
