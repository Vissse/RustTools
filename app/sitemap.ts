import type { MetadataRoute } from 'next'
import { ROUTES, SITE_URL } from '@/lib/seo'

// Replaces the old Vite `seoAssets()` plugin sitemap output. Derived from the
// ROUTES array in src/lib/seo.ts (single source of truth — keep in sync there).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
    lastModified,
    priority,
  }))
}
