import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FurnaceCalculator } from '@/components/FurnaceCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Furnace Calculator — Smelting Ratios & Times',
  description:
    'Plan your smelting in Rust: calculate furnace ratios, fuel and time to refine ore into metal, sulfur and high quality metal.',
  path: '/furnace',
})

export default function Page() {
  return (
    <Suspense>
      <FurnaceCalculator />
    </Suspense>
  )
}
