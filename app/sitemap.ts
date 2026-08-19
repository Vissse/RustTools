import type { MetadataRoute } from 'next'
import { ROUTES, SITE_URL } from '@/lib/seo'
import { MONUMENT_SLUGS } from '@/lib/data/monuments-data/slugs'

// Derived from the ROUTES array in src/lib/seo.ts (single source of truth —
// keep in sync there when adding a page), plus dynamically generated entries
// for content pages (monuments, items, animals, etc.).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

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
