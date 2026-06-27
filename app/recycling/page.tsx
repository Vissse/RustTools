import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RecyclingCalculator } from '@/components/RecyclingCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Recycling Calculator — Recycler Yields & Outputs',
  description:
    'Drop items into a recycler and see exactly what you get back, for both the Radtown and Safe Zone recyclers in Rust.',
  path: '/recycling',
})

export default function Page() {
  return (
    <Suspense>
      <RecyclingCalculator />
    </Suspense>
  )
}
