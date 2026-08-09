import type { Metadata } from 'next'
import { MonumentsGuide } from '@/components/guides/MonumentsGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Monument Puzzles | RustTools',
  description:
    'Step-by-step walkthroughs for every keycard puzzle and monument puzzle in the game.',
  path: '/guides/monuments',
  // Placeholder page — heading only, no content yet. Keep it out of the index
  // until it is written: thin pages drag down sitewide quality signals.
  index: false,
})

export default function Page() {
  return <MonumentsGuide />
}
