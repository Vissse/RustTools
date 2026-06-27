import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SkinningCalculator } from '@/components/SkinningCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Skinning Calculator — Animal & Entity Yields',
  description:
    'Check how much meat, fat, leather, and bone fragments you get by skinning animals in Rust with different tools.',
  path: '/skinning',
})

export default function Page() {
  return (
    <Suspense>
      <SkinningCalculator />
    </Suspense>
  )
}
