import type { Metadata } from 'next'
import { GuidesHub } from '@/components/guides/GuidesHub'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd, seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Guides — Tips, Tricks & Tutorials',
  description:
    'Rust tips and tricks for every stage of the wipe: farming and genetics, base building, monument puzzles and console binds.',
  path: '/guides',
})

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Guides', path: '/guides' }])} />
      <GuidesHub />
    </>
  )
}
