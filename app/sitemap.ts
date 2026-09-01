import type { MetadataRoute } from 'next'
import { ROUTES, SITE_URL, DATA_VERIFIED_ISO } from '@/lib/seo'
import { MONUMENT_SLUGS } from '@/lib/data/monuments-data/slugs'

// Derived from the ROUTES array in src/lib/seo.ts (single source of truth —
// keep in sync there when adding a page), plus dynamically generated entries
// for content pages (monuments, items, animals, etc.).
//
// `lastModified` is DATA_VERIFIED_ISO, not `new Date()`. The build timestamp
// claimed every one of these 50+ URLs had changed on every deploy, including
// deploys that only touched CSS — a crawler that re-fetches on that signal and
// finds byte-identical pages starts ignoring the field entirely. Bump the date
// in seo.ts when the game data is actually re-checked.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = DATA_VERIFIED_ISO

  // Static routes from ROUTES
  const staticEntries = ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))

  // Dynamic monument pages
  const monumentEntries = MONUMENT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/world/monuments/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...monumentEntries]
}
