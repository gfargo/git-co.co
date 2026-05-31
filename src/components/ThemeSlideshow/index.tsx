"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Lightbox } from "@/components/Lightbox"
import { cn } from "@/lib/utils"
import { THEMES } from "@/config/themes"

/**
 * One-at-a-time theme browser for the /docs/themes page. A large stage
 * shows the current theme's capture (click to enlarge), flanked by
 * prev/next controls; a thumbnail rail below jumps directly to any theme
 * and keeps the active one scrolled into view. Left/Right arrow keys
 * navigate while the slideshow is hovered or focused, so they don't
 * hijack the rest of the page.
 */
export function ThemeSlideshow() {
  const count = THEMES.length
  const [index, setIndex] = useState(0)
  const theme = THEMES[index]!

  const rootRef = useRef<HTMLDivElement>(null)
  const hovered = useRef(false)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const firstRender = useRef(true)

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  )
  const prev = useCallback(() => go(-1), [go])
  const next = useCallback(() => go(1), [go])

  // Left/Right arrows — only when the slideshow is hovered or holds focus,
  // so reading the rest of the page isn't disrupted.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      const engaged =
        hovered.current ||
        (rootRef.current?.contains(document.activeElement) ?? false)
      if (!engaged) return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [prev, next])

  // Keep the active thumbnail centered in the rail (horizontal only).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }, [index])

  const src = `/screenshots/theme-${theme.slug}.png`

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      aria-roledescription="carousel"
      aria-label="Theme previews"
      className="relative outline-none"
    >
      {/* Accent atmosphere behind the stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl transition-all duration-700"
        style={{
          opacity: 0.16,
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${theme.accent}, transparent 70%)`,
        }}
      />

      {/* Stage */}
      <div
        className="relative overflow-hidden rounded-xl border bg-[hsl(var(--code-bg))] transition-colors duration-300"
        style={{ borderColor: theme.accent }}
      >
        <Lightbox src={src} alt={`coco ui — ${theme.name} theme`}>
          <div className="aspect-[16/10] overflow-hidden">
            <Image
              key={src}
              src={src}
              alt={`coco ui — ${theme.name} theme`}
              width={1260}
              height={800}
              className="h-full w-full object-cover object-top"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </Lightbox>

        {/* Prev / Next — siblings of the Lightbox button (never nested) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous theme"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/80 backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next theme"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/80 backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        {/* Counter */}
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
          {index + 1} / {count}
        </div>
      </div>

      {/* Meta for the current theme */}
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className="inline-block h-3 w-3 shrink-0 translate-y-0.5 rounded-full ring-1 ring-inset ring-white/10"
          style={{ backgroundColor: theme.accent }}
          aria-hidden="true"
        />
        <h3 className="font-mono text-lg font-semibold text-foreground">
          {theme.name}
        </h3>
        {theme.mode === "light" && (
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            light
          </span>
        )}
        <code className="ml-auto rounded bg-[hsl(var(--code-bg))] px-2 py-1 font-mono text-xs text-terminal-green">
          --theme {theme.slug}
        </code>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
        {theme.blurb}
      </p>

      {/* Thumbnail rail */}
      <div
        className="mt-5 flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Jump to a theme"
      >
        {THEMES.map((t, i) => {
          const active = i === index
          return (
            <button
              key={t.slug}
              ref={(el) => {
                thumbRefs.current[i] = el
              }}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={t.name}
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-12 w-20 shrink-0 overflow-hidden rounded border transition-all duration-200",
                active
                  ? "border-transparent"
                  : "border-border/60 opacity-50 hover:opacity-100"
              )}
              style={
                active
                  ? { boxShadow: `0 0 0 2px ${t.accent}` }
                  : undefined
              }
            >
              <Image
                src={`/screenshots/theme-${t.slug}.png`}
                alt=""
                width={160}
                height={100}
                className="h-full w-full object-cover object-top"
                sizes="80px"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
