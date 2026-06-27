import type { Metadata } from 'next'
import { GeneticsCalculator } from '@/components/GeneticsCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Genetics Calculator — Best Plant Gene Combinations',
  description:
    'Cross-breed plant genes in Rust to find the best crop genetics. Enter your gene sets and see the optimal combination.',
  path: '/genetics',
})

export default function Page() {
  return <GeneticsCalculator />
}
