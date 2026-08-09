import type { MetadataRoute } from 'next'
import { ROUTES, SITE_URL } from '@/lib/seo'

// Derived from the ROUTES array in src/lib/seo.ts (single source of truth —
// keep in sync there when adding a page).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
