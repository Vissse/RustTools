import type { Metadata } from 'next'
import { MonumentsGuide } from '@/components/guides/MonumentsGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Monument Puzzles | RustTools',
  description:
    'Step-by-step walkthroughs for every keycard puzzle and monument puzzle in the game.',
  path: '/guides/monuments',
})

export default function Page() {
  return <MonumentsGuide />
}
