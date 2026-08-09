import type { Metadata } from 'next'
import { FarmingGuide } from '@/components/guides/FarmingGuide'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd, seoMetadata, SITE_URL, SITE_NAME } from '@/lib/seo'

const TITLE = 'Rust Farming Guide — Seeds, Genetics, and Breeding'
const DESCRIPTION =
  'Learn how to build a fully functional and highly efficient farm in Rust. Master irrigation, lighting, advanced gene crossbreeding and animal farming.'

export const metadata: Metadata = seoMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/guides/farming',
  type: 'article',
})

// Marked up as an Article rather than a plain page: this is the one guide with
// real long-form content, and Article is what makes it eligible for the
// author/date treatment on "rust farming guide" style queries.
const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: `${SITE_URL}/guides/farming`,
  author: { '@type': 'Organization', name: SITE_NAME },
  publisher: { '@id': `${SITE_URL}/#organization` },
  about: { '@type': 'VideoGame', name: 'Rust' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Guides', path: '/guides' },
            { name: 'Farming Guide', path: '/guides/farming' },
          ]),
          article,
        ]}
      />
      <FarmingGuide />
    </>
  )
}
