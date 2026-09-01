import type { Metadata } from 'next'
import { MissionsGuide } from '@/components/guides/MissionsGuide'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd, faqJsonLd, seoMetadata } from '@/lib/seo'
import { MISSION_FAQ } from '@/lib/data/missions-data'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Missions Guide — Jobs, Locations & Rewards',
  description:
    'Find every listed Rust mission, where it starts, what it requires, and what you receive when the work is done.',
  path: '/world/missions',
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'World', path: '/world' },
          { name: 'Missions', path: '/world/missions' },
        ])}
      />
      {/* The same Q&A is rendered visibly at the bottom of the guide. */}
      <JsonLd data={faqJsonLd(MISSION_FAQ)} />
      <MissionsGuide />
    </>
  )
}
