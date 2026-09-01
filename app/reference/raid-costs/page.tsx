import type { Metadata } from 'next'
import { seoMetadata, referencePageJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ReferencePage } from '@/components/reference/ReferencePage'
import { RaidCostTable } from '@/components/reference/RaidCostTable'
import { buildRaidReference } from '@/lib/raid-reference'
import { raidContent, RAID_REFERENCE_INDEX } from '@/lib/reference-content'

export const metadata: Metadata = seoMetadata({
  title: RAID_REFERENCE_INDEX.title,
  description: RAID_REFERENCE_INDEX.description,
  path: '/reference/raid-costs',
  type: 'article',
})

// Async because the table is solved on the server at build time — the same
// solver and the same data the calculator uses, so the published numbers cannot
// drift from the tool's. The route still prerenders statically (check for
// `○ /reference/raid-costs` in the build output); it awaits data, not a request.
export default async function Page() {
  const reference = await buildRaidReference()
  const content = raidContent(reference)

  return (
    <>
      <JsonLd
        data={referencePageJsonLd({
          slug: content.slug,
          crumb: content.crumb,
          faq: content.faq,
          dataset: content.dataset,
        })}
      />
      <ReferencePage content={content}>
        <RaidCostTable rows={reference.rows} />
      </ReferencePage>
    </>
  )
}
