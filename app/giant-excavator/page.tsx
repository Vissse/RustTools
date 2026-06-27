import type { Metadata } from 'next'
import { GiantExcavatorCalculator } from '@/components/GiantExcavatorCalculator'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Giant Excavator Calculator — Output & Fuel',
  description:
    'Calculate Giant Excavator output and diesel fuel use in Rust to plan your mining runs at the monument.',
  path: '/giant-excavator',
})

export default function Page() {
  return <GiantExcavatorCalculator />
}
