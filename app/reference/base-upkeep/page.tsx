import type { Metadata } from 'next'
import { seoMetadata, referencePageJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ReferencePage } from '@/components/reference/ReferencePage'
import { CUPBOARD_CONTENT as content } from '@/lib/reference-content'

export const metadata: Metadata = seoMetadata({
  title: content.title,
  description: content.description,
  path: `/reference/${content.slug}`,
  type: 'article',
})

// No table, and no Dataset node with it: upkeep depends on the block count and
// tier of one specific base, so there is no table that would be true for every
// reader. The facts list carries the fixed numbers (slots, stack sizes) and the
// cupboard calculator handles the part that varies.
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
