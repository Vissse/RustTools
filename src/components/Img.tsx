import type { ImgHTMLAttributes } from "react";

/**
 * <img> that dims itself if the source fails to load — mirrors the original
 * `onerror="this.style.opacity='.3'"` fallback used across the static pages.
 */
export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      onError={(e) => {
        e.currentTarget.style.opacity = "0.3";
        props.onError?.(e);
      }}
    />
  );
}
