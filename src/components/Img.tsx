'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

/**
 * Thin wrapper over next/image for the game item icons. It keeps the original
 * behaviour callers rely on:
 *  - sized by CSS `className` (w-7 h-7, .item-img, …), so width/height here are
 *    just the intrinsic aspect/optimization hint — 128² covers icons shown up to
 *    64px at 2× DPR crisply. Most icons are square; pass width/height to override.
 *  - dims itself to 0.3 opacity if the source fails to load (mirrors the old
 *    `onerror="this.style.opacity='.3'"`).
 *
 * Images are served optimized via Next's /_next/image (AVIF/WebP, resized).
 * SVG logos are intentionally left as plain <img> elsewhere (next/image doesn't
 * optimize SVG).
 */
type ImgProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  src?: string
  alt?: string
  width?: number
  height?: number
}

export function Img({
  src,
  alt = '',
  width = 128,
  height = 128,
  style,
  onError,
  ...rest
}: ImgProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src) return null

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ opacity: failed ? 0.3 : undefined, ...style }}
      onError={(e) => {
        setFailed(true)
        onError?.(e)
      }}
      {...rest}
    />
  )
}
