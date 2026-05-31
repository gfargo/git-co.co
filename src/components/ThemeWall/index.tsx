"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Lightbox } from "@/components/Lightbox"
import { THEMES, type ThemeMeta } from "@/config/themes"

/* Theme tiles read from the shared catalog (src/config/themes.ts), the
   single source of truth shared with the /docs/themes page. */
type ThemeTile = ThemeMeta

/** Split the catalog into N roughly-even marquee rows. */
function intoRows<T>(items: T[], rows: number): T[][] {
  const out: T[][] = Array.from({ length: rows }, () => [])
  items.forEach((item, i) => out[i % rows]!.push(item))
  return out
}

function Tile({
  theme,
  onHover,
  active,
  onLightbox,
}: {
  theme: ThemeTile
  onHover: (t: ThemeTile | null) => void
  active: boolean
  onLightbox: (open: boolean) => void
}) {
  const src = `/screenshots/theme-${theme.slug}.png`
  return (
    <Lightbox src={src} alt={`coco ui — ${theme.name} theme`} onOpenChange={onLightbox}>
      <figure
        onMouseEnter={() => onHover(theme)}
        onMouseLeave={() => onHover(null)}
        className={cn(
          "group/tile relative w-[260px] shrink-0 overflow-hidden rounded-md border bg-bg-elevated transition-all duration-300 sm:w-[300px]",
          "border-border/60 hover:z-10 hover:scale-[1.04]"
        )}
        style={{
          boxShadow: active ? `0 0 0 1px ${theme.accent}, 0 12px 40px -12px ${theme.accent}80` : undefined,
          borderColor: active ? theme.accent : undefined,
        }}
      >
        <Image
          src={src}
          alt={`coco ui — ${theme.name} theme`}
          width={1260}
          height={800}
          className="h-auto w-full object-cover object-top"
          sizes="300px"
        />
        {/* Name badge — slides up on hover */}
        <figcaption
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-6 font-mono text-xs font-medium text-white transition-transform duration-300 group-hover/tile:translate-y-0"
        >
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
            style={{ backgroundColor: theme.accent }}
          />
          {theme.name}
        </figcaption>
      </figure>
    </Lightbox>
  )
}

interface MarqueeRowProps {
  themes: ThemeTile[]
  duration: number
  reverse?: boolean
  onHover: (t: ThemeTile | null) => void
  activeSlug: string | null
  paused: boolean
  onLightbox: (open: boolean) => void
}

function MarqueeRow({ themes, duration, reverse, onHover, activeSlug, paused, onLightbox }: MarqueeRowProps) {
  // Duplicate the row so the translateX loop is seamless.
  const doubled = [...themes, ...themes]
  return (
    <div className="group/row relative flex overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 gap-4 pr-4 group-hover/row:[animation-play-state:paused]",
          // Freeze every row while the lightbox is open so the zoomed
          // tile isn't yanked out from under the cursor.
          paused && "[animation-play-state:paused]"
        )}
        // Use the animation *longhands* (not the `animation` shorthand) so we
        // never set animation-play-state inline — otherwise the inline value
        // would beat the hover/paused utility classes and they'd never apply.
        style={{
          animationName: "theme-marquee",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((theme, i) => (
          <Tile
            key={`${theme.slug}-${i}`}
            theme={theme}
            onHover={onHover}
            active={activeSlug === theme.slug}
            onLightbox={onLightbox}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Kinetic wall of every coco theme. Three marquee rows scroll in
 * alternating directions and pause on hover; hovering a tile lifts it,
 * rings it in the theme's accent, and bleeds that hue into the section.
 * Click any tile for a full-size lightbox. Replaces the old one-at-a-time
 * arrow carousel — 37 palettes shown at once instead of one every click.
 */
export function ThemeWall({ className }: { className?: string }) {
  const [active, setActive] = useState<ThemeTile | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const rows = intoRows(THEMES, 3)

  return (
    <div className={cn("relative", className)}>
      {/* Accent atmosphere — tints toward the hovered theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-3xl transition-all duration-700"
        style={{
          opacity: active ? 0.18 : 0,
          background: active
            ? `radial-gradient(ellipse 60% 50% at 50% 50%, ${active.accent}, transparent 70%)`
            : undefined,
        }}
      />

      {/* Edge fades so tiles dissolve in/out rather than hard-clipping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

      <div className="flex flex-col gap-4">
        <MarqueeRow themes={rows[0]!} duration={64} onHover={setActive} activeSlug={active?.slug ?? null} paused={lightboxOpen} onLightbox={setLightboxOpen} />
        <MarqueeRow themes={rows[1]!} duration={78} reverse onHover={setActive} activeSlug={active?.slug ?? null} paused={lightboxOpen} onLightbox={setLightboxOpen} />
        <MarqueeRow themes={rows[2]!} duration={70} onHover={setActive} activeSlug={active?.slug ?? null} paused={lightboxOpen} onLightbox={setLightboxOpen} />
      </div>

      {/* Live caption — name of whatever you're pointing at */}
      <div className="mt-6 flex items-center justify-center gap-2 font-mono text-sm">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: active?.accent ?? "hsl(var(--muted-foreground))" }}
        />
        <span className="text-muted-foreground">
          {active ? (
            <>
              <span className="font-semibold text-foreground">{active.name}</span>
              <span className="text-muted-foreground/60"> · click to enlarge</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">{THEMES.length} built-in themes</span>
              <span className="text-muted-foreground/60"> · hover to pause, click to enlarge</span>
            </>
          )}
        </span>
      </div>

      <style jsx>{`
        @keyframes theme-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
