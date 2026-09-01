import type { Metadata } from 'next'
import { seoMetadata, referencePageJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ReferencePage } from '@/components/reference/ReferencePage'
import { SHOPS_CONTENT as content } from '@/lib/reference-content'

export const metadata: Metadata = seoMetadata({
  title: content.title,
  description: content.description,
  path: `/reference/${content.slug}`,
  type: 'article',
})

// No table: the vendor inventories run to hundreds of rows across five
// monuments, and dumping all of them answers no question anyone actually asks.
// The shops calculator is the right surface for that data.
export default function Page() {
  return (
    <>
      <JsonLd
        data={referencePageJsonLd({
          slug: content.slug,
          crumb: content.crumb,
          faq: content.faq,
        })}
      />
      <ReferencePage content={content} />
    </>
  )
}
