import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { ROUTES, SITE_URL, siteJsonLd } from './src/lib/seo'

/**
 * Injects JSON-LD structured data into index.html and emits robots.txt +
 * sitemap.xml at build time, all derived from SITE_URL in src/lib/seo.ts.
 */
function seoAssets(): Plugin {
  return {
    name: 'seo-assets',
    transformIndexHtml(html) {
      const jsonLd = `<script type="application/ld+json">${JSON.stringify(
        siteJsonLd()
      )}</script>`
      return html.replace('<!-- %SEO_JSONLD% -->', jsonLd)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(({ path, priority }) => {
        const loc = `${SITE_URL}${path === '/' ? '/' : path}`
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`
      }).join('\n')
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })

      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // The router plugin must come before the React plugin.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    seoAssets(),
  ],
  preview: {
    port: 4174,
  },
})
