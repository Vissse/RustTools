import type { Metadata } from 'next'
import { SalvagingGuide } from '@/components/guides/SalvagingGuide'
import { seoMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = seoMetadata({
  title: 'Rust Salvaging Guide — Heli & Bradley Yields',
  description:
    'Check how much charcoal, metal fragments, and HQM you get by salvaging destroyed Bradleys and Patrol Helicopters in Rust.',
  path: '/guides/salvaging',
})

// Same as the skinning guide: yields sit behind a tool picker and never reach
// the HTML. The published table lives at /reference/salvage-yields.
export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Guides', path: '/guides' },
          { name: 'Salvaging', path: '/guides/salvaging' },
        ])}
      />
      <SalvagingGuide />
    </>
  )
}
