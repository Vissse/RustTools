import type { Metadata } from 'next'
import { BindsGuide } from '@/components/guides/BindsGuide'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Console Binds Guide | RustTools',
  description: 'Master console commands and binds to improve your gameplay.',
  path: '/guides/binds',
})

export default function Page() {
  return <BindsGuide />
}
