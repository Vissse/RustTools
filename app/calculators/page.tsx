import type { Metadata } from 'next'
import { CalculatorsHub } from '@/components/calculators/CalculatorsHub'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Calculators & Tools',
  description:
    'Optimize your gameplay with our precision tools. Calculate raid costs, smelting times, and resource yields to dominate the wipe.',
  path: '/calculators',
})

export default function Page() {
  return <CalculatorsHub />
}
