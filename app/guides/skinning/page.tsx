import type { Metadata } from 'next'
import { SkinningGuide } from '@/components/guides/SkinningGuide'
import { seoMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Skinning Guide — Animal Yields',
  description:
    'Check how much meat, fat, leather, and bone fragments you get by skinning animals in Rust with different tools.',
  path: '/guides/skinning',
})

// The card grid keeps every yield behind a tool picker, so this page's HTML is
// the animal names and no numbers. The published yield table lives at
// /reference/animal-yields; this page had no structured data at all, so the
// breadcrumb is added here.
export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Guides', path: '/guides' },
          { name: 'Skinning', path: '/guides/skinning' },
        ])}
      />
      <SkinningGuide />
    </>
  )
}
