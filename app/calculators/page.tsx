import type { Metadata } from 'next'
import { CalculatorsHub } from '@/components/calculators/CalculatorsHub'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbJsonLd, seoMetadata, SITE_URL } from '@/lib/seo'
import { CALCULATOR_SEO_INDEX } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Calculators — Raid, Recycling, Upkeep & Smelting Tools',
  description:
    'Every free Rust calculator in one place: raid cost, recycler yields, base upkeep, decay, smelting, genetics, shops and more.',
  path: '/calculators',
})

// An ItemList tells Google this is a hub over the individual calculators rather
// than a page competing with them, which keeps the tool pages ranking for their
// own queries instead of being collapsed into this one.
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rust calculators',
  itemListElement: CALCULATOR_SEO_INDEX.map((calc, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: calc.name,
    url: `${SITE_URL}${calc.path}`,
  })),
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Calculators', path: '/calculators' }]),
          itemList,
        ]}
      />
      <CalculatorsHub />
    </>
  )
}
