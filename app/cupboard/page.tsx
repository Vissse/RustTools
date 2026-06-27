import type { Metadata } from 'next'
import { CupboardCalculator } from '@/components/CupboardCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Cupboard Calculator — Tool Cupboard Upkeep & Decay Time',
  description:
    'Enter your daily upkeep and see how long your base stays protected, laid out across the 24 Tool Cupboard slots in Rust.',
  path: '/cupboard',
})

export default function Page() {
  return <CupboardCalculator />
}
