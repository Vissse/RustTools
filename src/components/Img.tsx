import { useState, useEffect, type ImgHTMLAttributes } from 'react'

/**
 * <img> that dims itself if the source fails to load — mirrors the original
 * `onerror="this.style.opacity='.3'"` fallback used across the static pages.
 */
export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [props.src])

  return (
    <img
      {...props}
      style={{ opacity: failed ? 0.3 : undefined, ...props.style }}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        setFailed(true)
        props.onError?.(e)
      }}
    />
  )
}
