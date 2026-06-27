/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimized on Vercel (and locally via sharp). AVIF preferred, WebP fallback.
    // The icon-heavy item images route through src/components/Img.tsx → next/image.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
