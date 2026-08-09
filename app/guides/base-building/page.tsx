import type { Metadata } from 'next'
import { BaseBuildingGuide } from '@/components/guides/BaseBuildingGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Base Building Patterns | RustTools',
  description:
    'Discover the most effective base footprints, honeycombing, pixel gaps, and unraidable bunker designs.',
  path: '/guides/base-building',
  // Placeholder page — heading only, no content yet. Keep it out of the index
  // until it is written: thin pages drag down sitewide quality signals.
  index: false,
})

export default function Page() {
  return <BaseBuildingGuide />
}
