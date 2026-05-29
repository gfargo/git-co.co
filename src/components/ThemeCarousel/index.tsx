"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeSlide {
  name: string
  description: string
  src: string
}

interface ThemeCarouselProps {
  slides: ThemeSlide[]
  className?: string
}

/**
 * Client-side carousel for cycling through theme screenshots with
 * left/right arrows. Shows the active theme name + description below
 * the image, with dot indicators for position.
 */
export function ThemeCarousel({ slides, className }: ThemeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  const active = slides[activeIndex]

  return (
    <div className={cn("relative", className)}>
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-bg-elevated">
        <Image
          src={active.src}
          alt={`${active.name} theme — ${active.description}`}
          fill
          className="object-cover object-top transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
          priority
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background hover:border-terminal-green/40"
          aria-label="Previous theme"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background hover:border-terminal-green/40"
          aria-label="Next theme"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Caption + dots */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="font-mono text-sm font-semibold text-foreground">
            {active.name}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {active.description}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.name}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === activeIndex
                  ? "bg-terminal-green"
                  : "bg-border hover:bg-muted-foreground/40"
              )}
              aria-label={`Switch to ${slide.name} theme`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
