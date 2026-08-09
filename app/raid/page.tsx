import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RaidCalculator } from '@/components/RaidCalculator'
import { seoMetadata } from '@/lib/seo'
import { CalcSeo } from '@/components/CalcSeo'
import { RAID_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Raid Calculator — Cheapest Way to Raid Any Base',
  description:
    'Pick a structure and the explosives you have, and the Rust Raid Calculator finds the cheapest combo to break it by sulfur, with the full resource cost.',
  path: '/raid',
})

// The Suspense fallback is sized on purpose: if this boundary re-suspends (Next
// refetches the route the first time nuqs writes search params to the URL), an
// empty fallback collapses the document to 0 height and the browser clamps the
// scroll position back to the top.
export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <RaidCalculator />
      </Suspense>
      <CalcSeo {...RAID_SEO} />
    </>
  )
}
