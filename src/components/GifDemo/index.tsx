"use client"

import { Lightbox } from "@/components/Lightbox"
import { cn } from "@/lib/utils"

interface GifDemoProps {
  src: string
  alt: string
  caption?: string
  className?: string
}

/**
 * Animated GIF demo with terminal chrome wrapper and lightbox.
 * Used for workflow demonstrations throughout the marketing site.
 */
export function GifDemo({ src, alt, caption, className }: GifDemoProps) {
  return (
    <figure className={cn("overflow-hidden", className)}>
      <div className="overflow-hidden rounded-lg border border-border/60 shadow-lg shadow-black/30">
        {/* macOS title bar */}
        <div className="flex items-center gap-2 bg-bg-elevated/80 backdrop-blur-sm px-4 py-2 border-b border-border/40">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            coco
          </span>
        </div>

        {/* GIF with lightbox. leading-[0] kills the inline-image baseline
            gap that would otherwise pad the bottom of the terminal pane. */}
        <Lightbox src={src} alt={alt}>
          <div className="overflow-hidden bg-[hsl(var(--code-bg))] leading-[0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </Lightbox>
      </div>

      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
