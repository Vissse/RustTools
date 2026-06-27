import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DecayCalculator } from '@/components/DecayCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Decay Calculator — Building Decay Time by Material',
  description:
    'Work out how long a Rust structure survives without upkeep. Pick the building material and HP to see the full decay time.',
  path: '/decay',
})

export default function Page() {
  return (
    <Suspense>
      <DecayCalculator />
    </Suspense>
  )
}
