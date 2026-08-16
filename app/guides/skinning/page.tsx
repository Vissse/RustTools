import type { Metadata } from 'next'
import { SkinningGuide } from '@/components/guides/SkinningGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Skinning Guide — Animal Yields',
  description:
    'Check how much meat, fat, leather, and bone fragments you get by skinning animals in Rust with different tools.',
  path: '/guides/skinning',
})

export default function Page() {
  return <SkinningGuide />
}
