import type { Metadata } from 'next'
import { BaseBuildingGuide } from '@/components/guides/BaseBuildingGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Base Building Patterns | RustTools',
  description:
    'Discover the most effective base footprints, honeycombing, pixel gaps, and unraidable bunker designs.',
  path: '/guides/base-building',
})

export default function Page() {
  return <BaseBuildingGuide />
}
