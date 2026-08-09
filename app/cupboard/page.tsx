import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CupboardCalculator } from '@/components/CupboardCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { CUPBOARD_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Cupboard Calculator — Tool Cupboard Upkeep & Decay Time',
  description:
    'Enter your daily upkeep and see how long your base stays protected, laid out across the 24 Tool Cupboard slots in Rust.',
  path: '/cupboard',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <CupboardCalculator />
      </Suspense>
      <CalcSeo {...CUPBOARD_SEO} />
    </>
  )
}
