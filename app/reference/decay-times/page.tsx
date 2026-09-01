import type { Metadata } from 'next'
import { seoMetadata, referencePageJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ReferencePage } from '@/components/reference/ReferencePage'
import { DecayTable } from '@/components/reference/DecayTable'
import { DECAY_CONTENT as content } from '@/lib/reference-content'

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
        <DecayTable />
      </ReferencePage>
    </>
  )
}
