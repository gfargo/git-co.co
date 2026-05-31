"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LightboxProps {
  src: string
  alt: string
  children: React.ReactNode
  className?: string
  /** Notified whenever the overlay opens or closes. */
  onOpenChange?: (open: boolean) => void
}

/**
 * Wraps any clickable element (typically a screenshot) and opens a
 * full-viewport lightbox overlay on click. Press Escape or click the
 * backdrop to close.
 *
 * The overlay is rendered through a portal on `document.body` — not in
 * place — so it escapes any ancestor with `overflow: hidden` or a CSS
 * `transform` (e.g. the marquee rows in ThemeWall, whose animated
 * transform would otherwise become the containing block for the
 * fixed-position overlay and clip it).
 */
export function Lightbox({ src, alt, children, className, onOpenChange }: LightboxProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const setOpenState = useCallback(
    (next: boolean) => {
      setOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  const close = useCallback(() => setOpenState(false), [setOpenState])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [open, close])

  const overlay =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            style={{ animation: "fadeIn 150ms ease-out" }}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:bg-white/10 hover:text-white hover:scale-110"
              aria-label="Close lightbox"
            >
              <XIcon className="h-5 w-5" />
            </button>

            {/* Hint text */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/40">
              esc to close
            </span>

            {/* Image — fills as much of the viewport as possible */}
            <div
              className="relative flex h-full w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={2520}
                height={1600}
                className="max-h-[85vh] max-w-[92vw] w-auto h-auto rounded-md object-contain shadow-2xl shadow-black/80 border border-white/5"
                priority
                quality={95}
              />
            </div>

            <style jsx global>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </div>,
          document.body
        )
      : null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenState(true)}
        // `block` is essential: a default inline-block button sits on the
        // parent's text baseline, padding a gap below it (visible under GIF
        // panes). Block-level removes that baseline gap.
        className={cn("block w-full cursor-zoom-in text-left leading-[0]", className)}
        aria-label={`View ${alt} full size`}
      >
        {children}
      </button>

      {overlay}
    </>
  )
}
