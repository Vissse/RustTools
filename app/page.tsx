import type { Metadata } from 'next'
import { Home } from '@/components/Home'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'RustTools — Master Your Wipe',
  description:
    'Precise calculators and in-depth strategy guides giving you the ultimate advantage. Survive longer, raid smarter.',
  path: '/',
})

export default function Page() {
  return <Home />
}
