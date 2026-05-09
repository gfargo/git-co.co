import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenshotPlaceholderProps {
  /** Path to the screenshot image in /public/screenshots/. When provided, renders the image. */
  src?: string
  /** Alt text for the screenshot */
  alt: string
  /** Aspect ratio class, e.g. "aspect-video" or "aspect-[4/3]" */
  aspect?: string
  /** Optional caption below the image */
  caption?: string
  className?: string
}

/**
 * Screenshot slot that renders an actual image when `src` is provided,
 * or a styled placeholder with a label when no image exists yet.
 * Use this to mark spots where real TUI screenshots should go.
 */
export function ScreenshotPlaceholder({
  src,
  alt,
  aspect = "aspect-video",
  caption,
  className,
}: ScreenshotPlaceholderProps) {
  return (
    <figure className={cn("overflow-hidden", className)}>
      {src ? (
        <div className={cn("relative overflow-hidden rounded-lg border border-border", aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
          />
        </div>
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
