import { useState, useEffect, type ImgHTMLAttributes } from "react";
import { Img } from "../Img";
import { recycleSrc } from "../../lib/recycleImg";

/**
 * <Img> for the recycle page: loads the small 96x96 WebP copy from
 * /images/recycle/ instead of the full-size original. If that copy is missing
 * or fails to decode, it falls back once to the original /images/ path (undoing
 * Img's dim-to-0.3) before Img's normal failure handling kicks in.
 */
export function RecycleImg({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const original = typeof src === "string" ? src : undefined;
  const [current, setCurrent] = useState(() => recycleSrc(original) ?? src);

  useEffect(() => {
    setCurrent(recycleSrc(original) ?? src);
  }, [original, src]);

  return (
    <Img
      {...props}
      src={current}
      onError={(e) => {
        if (original && current !== original) {
          setCurrent(original);
        }
      }}
    />
  );
}
