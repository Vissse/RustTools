import type { Metadata } from 'next'
import { seoMetadata, referencePageJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ReferencePage } from '@/components/reference/ReferencePage'
import { HarvestTable } from '@/components/reference/HarvestTable'
import { SALVAGING_ROWS } from '@/lib/harvest-reference'
import { SALVAGING_CONTENT as content } from '@/lib/reference-content'

export const metadata: Metadata = seoMetadata({
  title: content.title,
  description: content.description,
  path: `/reference/${content.slug}`,
  type: 'article',
})

export default function Page() {
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
        <HarvestTable
          rows={SALVAGING_ROWS}
          targetLabel="Wreck"
          caption="Resources returned by harvesting a destroyed Bradley APC or Patrol Helicopter, using the fastest tool. Yields are identical across tools; only time and condition loss differ."
        />
      </ReferencePage>
    </>
  )
}
