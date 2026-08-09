import type { Metadata } from 'next'
import { BindsGuide } from '@/components/guides/BindsGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Console Binds Guide | RustTools',
  description: 'Master console commands and binds to improve your gameplay.',
  path: '/guides/binds',
  // Placeholder page — heading only, no content yet. Keep it out of the index
  // until it is written: thin pages drag down sitewide quality signals.
  index: false,
})

export default function Page() {
  return <BindsGuide />
}
