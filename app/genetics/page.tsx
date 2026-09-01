import type { Metadata } from 'next'
import { GeneticsCalculator } from '@/components/GeneticsCalculator'
import { seoMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { GENETICS_SEO } from '@/lib/calculator-seo'

// `index: false` and no WebApplication node until the calculator is built.
// GeneticsCalculator currently renders "GENETICS CALCULATOR INCOMING", and this
// page was previously in the sitemap at priority 0.7 with structured data
// asserting a working, free web application. A search engine ranks that as a
// thin page; an answer engine that follows the schema, fetches the page and
// finds a placeholder has been told something false about the whole site.
// Restore the calculatorPageJsonLd call and the /genetics entry in ROUTES when
// there is a calculator here.
export const metadata: Metadata = seoMetadata({
  title: 'Rust Genetics Calculator — Best Plant Gene Combinations',
  description:
    'Cross-breed plant genes in Rust to find the best crop genetics. Enter your gene sets and see the optimal combination.',
  path: '/genetics',
  index: false,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Calculators', path: '/calculators' },
          { name: GENETICS_SEO.crumb, path: GENETICS_SEO.path },
        ])}
      />
      <CalcShell headerAccent="GENETICS" headerRest="CALCULATOR" variant="cupboard">
        <GeneticsCalculator />
      </CalcShell>
    </>
  )
}
