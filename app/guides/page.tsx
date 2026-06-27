import type { Metadata } from 'next'
import { GuidesHub } from '@/components/guides/GuidesHub'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Guides & Tutorials',
  description:
    'In-depth tutorials and advanced strategies to help you dominate your wipe in Rust. From basic survival to complex electrical systems.',
  path: '/guides',
})

export default function Page() {
  return <GuidesHub />
}
