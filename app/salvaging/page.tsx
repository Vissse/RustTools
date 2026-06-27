import type { Metadata } from 'next'
import { SalvagingCalculator } from '@/components/SalvagingCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Salvaging Calculator — Bradley & Heli Yields',
  description:
    'Check how much charcoal, metal fragments, and HQM you get by salvaging destroyed Bradleys and Patrol Helicopters in Rust.',
  path: '/salvaging',
})

export default function Page() {
  return <SalvagingCalculator />
}
