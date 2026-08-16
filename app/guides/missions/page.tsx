import type { Metadata } from 'next'
import { MissionsGuide } from '@/components/guides/MissionsGuide'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd, seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Missions Guide ?" Jobs, Locations & Rewards',
  description:
    'Find every listed Rust mission, where it starts, what it requires, and what you receive when the work is done.',
  path: '/guides/missions',
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Guides', path: '/guides' },
          { name: 'Missions', path: '/guides/missions' },
        ])}
      />
      <MissionsGuide />
    </>
  )
}
