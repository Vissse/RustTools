import type { Metadata } from 'next'
import { AppPage } from '@/components/AppPage'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Progressive Web App | RustTools',
  description: 'Download the RustTools Progressive Web App (PWA) to use our calculators and guides directly from your device.',
  path: '/app',
})

export default function Page() {
  return <AppPage />
}
