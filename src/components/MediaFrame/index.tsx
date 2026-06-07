"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { versionedAsset } from "@/lib/assetVersion"

interface MediaFrameProps {
  src: string
  alt: string
  /**
   * `"image"` uses next/image (optimized stills); `"gif"` uses a plain
   * <img> (next/image doesn't optimize animated GIFs).
   */
  kind?: "image" | "gif"
  /** Intrinsic dimensions — used only to reserve the aspect-ratio box (no layout shift). */
  width: number
  height: number
  priority?: boolean
  sizes?: string
  objectFit?: "cover" | "contain"
  /** CSS object-position, e.g. "top" to anchor tall screenshots. */
  objectPosition?: string
  /** Class names for the outer frame. */
  className?: string
}

/**
 * Image / GIF slot with a loading skeleton. Reserves the aspect-ratio
 * box up front (so the page doesn't shift as media streams in), shows a
 * terminal-tinted shimmer while the bytes download, then crossfades the
 * decoded media in. Works for both next/image stills and animated GIFs.
 *
 * The shimmer honours `prefers-reduced-motion` (it falls back to a
 * static dim block) and the skeleton is `aria-hidden` so it never reaches
 * assistive tech.
 */
export function MediaFrame({
  src,
  alt,
  kind = "image",
  width,
  height,
  priority,
  sizes = "(max-width: 1024px) 100vw, 640px",
  objectFit = "cover",
  objectPosition = "top",
  className,
}: MediaFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const url = versionedAsset(src)
  const fit = objectFit === "contain" ? "object-contain" : "object-cover"
  const fade = cn(
    "transition-opacity duration-500 ease-out",
    loaded ? "opacity-100" : "opacity-0"
  )

  return (
    <div
      className={cn("relative overflow-hidden bg-[hsl(var(--code-bg))]", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-bg-elevated/60" aria-hidden="true">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-terminal-green/10 to-transparent motion-reduce:animate-none" />
        </div>
      )}

      {kind === "gif" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          className={cn("absolute inset-0 h-full w-full", fit, fade)}
          style={{ objectPosition }}
        />
      ) : (
        <Image
          src={url}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={cn(fit, fade)}
          style={{ objectPosition }}
        />
      )}
    </div>
  )
}
