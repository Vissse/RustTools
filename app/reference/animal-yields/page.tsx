import type { Metadata } from 'next'
import { seoMetadata, referencePageJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ReferencePage } from '@/components/reference/ReferencePage'
import { HarvestTable } from '@/components/reference/HarvestTable'
import { SKINNING_ROWS } from '@/lib/harvest-reference'
import { SKINNING_CONTENT as content } from '@/lib/reference-content'

export const metadata: Metadata = seoMetadata({
  title: content.title,
  description: content.description,
  path: `/reference/${content.slug}`,
  type: 'article',
})

// /guides/skinning is the card explorer — pick an animal, compare tools. This is
// the flat table of every target at once. Different questions, different pages;
// they cross-link rather than duplicating each other.
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
          rows={SKINNING_ROWS}
          targetLabel="Animal"
          caption="Harvest yield for every animal and entity in Rust, using the highest-yield tool."
        />
      </ReferencePage>
    </>
  )
}
