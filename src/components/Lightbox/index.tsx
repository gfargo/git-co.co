"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LightboxProps {
  src: string
  alt: string
  children: React.ReactNode
  className?: string
}

/**
 * Wraps any clickable element (typically a screenshot) and opens a
 * full-viewport lightbox overlay on click. Press Escape or click the
 * backdrop to close.
 */
export function Lightbox({ src, alt, children, className }: LightboxProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("cursor-zoom-in w-full text-left", className)}
        aria-label={`View ${alt} full size`}
      >
        {children}
      </button>

      {open && (
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
            className="relative w-full h-full flex items-center justify-center"
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
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}
