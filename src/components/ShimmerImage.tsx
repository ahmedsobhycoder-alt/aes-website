"use client";
import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * next/image with a shimmer placeholder underneath until the file decodes.
 *
 * Used instead of `placeholder="blur"` because this project runs
 * `images.unoptimized: true` for static export, so Next generates no blur data
 * for runtime string paths — a blurDataURL would have to be authored per image.
 *
 * Drop-in for <Image>: same props. The wrapper is absolutely positioned, so the
 * parent must already be `relative` — which every call site here is, since they
 * all use `fill`.
 */
export default function ShimmerImage({ className = "", alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A cached image can finish decoding before hydration, so its onLoad never
    // fires and the shimmer would sit there forever. `complete` catches that.
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && (
        <span aria-hidden className="img-shimmer absolute inset-0 z-[1] block" />
      )}
      <Image
        {...props}
        alt={alt}
        ref={ref}
        onLoad={() => setLoaded(true)}
        // Treat a failed load as settled: a permanent shimmer reads as a hang.
        onError={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
