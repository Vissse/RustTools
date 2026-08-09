import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/seo'

/**
 * Web app manifest. Next links this from every page automatically.
 *
 * The site has an /app page telling people to install RustTools as a PWA, but
 * there was no manifest at all, so there was nothing to install.
 *
 * NOTE: installability also requires 192×192 and 512×512 icons. The only icon
 * in the repo is 100×100, so it is listed at its real size here rather than
 * upscaled — add the two larger PNGs and list them below to make the install
 * prompt actually appear.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Rust Calculators & Guides`,
    short_name: SITE_NAME,
    description:
      'Free Rust calculators for raid cost, recycler yields, base upkeep, smelting and decay, plus in-depth guides.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/logo/filled_icon.png',
        sizes: '100x100',
        type: 'image/png',
      },
    ],
  }
}
