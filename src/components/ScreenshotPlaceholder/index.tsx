"use client"

import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Lightbox } from "@/components/Lightbox"

interface ScreenshotPlaceholderProps {
  /** Path to the screenshot image in /public/screenshots/. When provided, renders the image. */
  src?: string
  /** Alt text for the screenshot */
  alt: string
  /** Aspect ratio class, e.g. "aspect-video" or "aspect-[4/3]" */
  aspect?: string
  /** Optional caption below the image */
  caption?: string
  /** Disable lightbox on click (default: enabled when src is provided) */
  disableLightbox?: boolean
  className?: string
}

/**
 * Screenshot slot that renders an actual image when `src` is provided,
 * or a styled placeholder with a label when no image exists yet.
 * Images are wrapped in a Lightbox for full-screen viewing on click.
 */
export function ScreenshotPlaceholder({
  src,
  alt,
  aspect = "aspect-video",
  caption,
  disableLightbox = false,
  className,
}: ScreenshotPlaceholderProps) {
  const imageContent = src ? (
    <div className={cn("overflow-hidden rounded-lg border border-border", aspect)}>
      <Image
        src={src}
        alt={alt}
        width={1260}
        height={800}
        className="h-auto w-full object-cover object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
      />
    </div>
  ) : null

  return (
    <figure className={cn("overflow-hidden", className)}>
      {src ? (
        disableLightbox ? (
          imageContent
        ) : (
          <Lightbox src={src} alt={alt}>
            {imageContent}
          </Lightbox>
        )
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border/60 bg-bg-elevated/50",
            aspect
          )}
        >
          <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
          <span className="font-mono text-xs text-muted-foreground/60">
            {alt}
          </span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
