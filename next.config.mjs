/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimized on Vercel (and locally via sharp). AVIF preferred, WebP fallback.
    // The icon-heavy item images route through src/components/Img.tsx → next/image.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // Missions moved from Guides to World — keep old links/bookmarks alive.
        source: '/guides/missions',
        destination: '/world/missions',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
