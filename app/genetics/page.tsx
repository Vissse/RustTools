import type { Metadata } from 'next'
import { GeneticsCalculator } from '@/components/GeneticsCalculator'
import { seoMetadata, calculatorPageJsonLd } from '@/lib/seo'
import { CalcShell } from '@/components/CalcShell'
import { JsonLd } from '@/components/JsonLd'
import { GENETICS_SEO } from '@/lib/calculator-seo'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Genetics Calculator — Best Plant Gene Combinations',
  description:
    'Cross-breed plant genes in Rust to find the best crop genetics. Enter your gene sets and see the optimal combination.',
  path: '/genetics',
})

export default function Page() {
  return (
    <>
      <JsonLd data={calculatorPageJsonLd(GENETICS_SEO)} />
      <CalcShell headerAccent="GENETICS" headerRest="CALCULATOR" variant="cupboard">
        <GeneticsCalculator />
      </CalcShell>
    </>
  )
}
