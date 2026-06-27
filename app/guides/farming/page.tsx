import type { Metadata } from 'next'
import { FarmingGuide } from '@/components/guides/FarmingGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Farming Guide — Seeds, Genetics, and Breeding',
  description:
    'Learn how to build a fully functional and highly efficient farm in Rust. Master irrigation, lighting, advanced gene crossbreeding and animal farming.',
  path: '/guides/farming',
})

export default function Page() {
  return <FarmingGuide />
}
