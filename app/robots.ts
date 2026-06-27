import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Replaces the old Vite `seoAssets()` plugin robots.txt output.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
