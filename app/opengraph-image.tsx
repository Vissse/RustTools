import { ImageResponse } from 'next/og'

/**
 * Site-wide Open Graph / Twitter card image, rendered as a real 1200×630 PNG.
 *
 * Next applies this to every route that doesn't define its own, and appends a
 * content hash to the URL so scrapers re-fetch it whenever this file changes.
 * Do not set `openGraph.images` in metadata unless you mean to override it.
 *
 * Drawn with inline styles only — Satori (the renderer behind ImageResponse)
 * supports a flexbox subset of CSS and knows nothing about Tailwind classes or
 * the CSS variables in global.css, so the palette is repeated literally here.
 */
export const alt = 'RustTools — free calculators and guides for Rust'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const RUST = '#ce422b'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0a',
          backgroundImage: `radial-gradient(circle at 20% 0%, rgba(206,66,43,0.22) 0%, transparent 55%)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: 8,
            color: '#8a8a8a',
            textTransform: 'uppercase',
          }}
        >
          rust-tools.eu
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 116,
            fontWeight: 800,
            lineHeight: 1,
            color: '#f2f2f2',
            letterSpacing: -3,
          }}
        >
          RUST<span style={{ color: RUST }}>TOOLS</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 40,
            color: '#b8b8b8',
            lineHeight: 1.3,
          }}
        >
          Raid, recycling, upkeep &amp; smelting calculators
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 56,
            height: 8,
            width: 260,
            background: RUST,
          }}
        />
      </div>
    ),
    size,
  )
}
