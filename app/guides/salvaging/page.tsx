import type { Metadata } from 'next'
import { SalvagingGuide } from '@/components/guides/SalvagingGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Salvaging Guide — Heli & Bradley Yields',
  description:
    'Check how much charcoal, metal fragments, and HQM you get by salvaging destroyed Bradleys and Patrol Helicopters in Rust.',
  path: '/guides/salvaging',
})

export default function Page() {
  return <SalvagingGuide />
}
