import type { Metadata, Viewport } from 'next'
import '@/styles/global.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'
import { SITE_URL, seoMetadata, siteJsonLd } from '@/lib/seo'

// Site-wide head defaults. Per-route `metadata` exports (title, description,
// canonical) are merged on top of these by Next.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...seoMetadata({
    title: 'RustTools — Raid, Recycling & Cupboard Calculators for Rust',
    description:
      'Free calculators for the survival game Rust: work out the cheapest raid, recycler yields, base upkeep, smelting, decay and more.',
    path: '/',
  }),
  robots: { index: true, follow: true },
  icons: { icon: '/logo/filled_icon.png', apple: '/logo/filled_icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Self-hosted fonts (see @font-face in src/styles/global.css). Preloaded
            so they're available before first paint — this prevents the
            fallback→webfont swap (FOUT) that otherwise reflowed header/footer
            width on load. */}
        <link
          rel="preload"
          href="/fonts/teko-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body>
        <AnalyticsProvider />
        {/* #root is the flex column that centers the navbar/content/footer
            (max-width 1400px) and pins the footer to the bottom. global.css
            styles `#root` and its children directly, so this wrapper is
            required. AnalyticsProvider renders null, so #root's flex children
            stay exactly [Navbar, page content, Footer]. */}
        <div id="root">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
