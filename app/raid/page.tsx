import type { Metadata } from 'next'
import { RaidCalculator } from '@/components/RaidCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Raid Calculator — Cheapest Way to Raid Any Base',
  description:
    'Pick a structure and the explosives you have, and the Rust Raid Calculator finds the cheapest combo to break it by sulfur, with the full resource cost.',
  path: '/raid',
})

export default function Page() {
  return <RaidCalculator />
}
