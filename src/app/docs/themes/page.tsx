import { Metadata } from "next"
import Image from "next/image"
import { PaletteIcon } from "lucide-react"

import { Lightbox } from "@/components/Lightbox"
import { ThemeSlideshow } from "@/components/ThemeSlideshow"
import { versionedAsset } from "@/lib/assetVersion"
import { THEMES, THEME_COUNT, type ThemeMeta } from "@/config/themes"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Color themes",
  description: `Browse all ${THEME_COUNT} built-in color themes for the coco workstation — Catppuccin, Gruvbox, Dracula, Tokyo Night, Solarized, and more. Set one with coco ui --theme <name>.`,
  alternates: { canonical: `${siteConfig.url}/docs/themes` },
  openGraph: {
    title: "Color themes | Coco Docs",
    description: `All ${THEME_COUNT} built-in color themes for the coco terminal workstation.`,
    url: `${siteConfig.url}/docs/themes`,
    siteName: siteConfig.name,
  },
}

function ThemeCard({ theme }: { theme: ThemeMeta }) {
  const src = versionedAsset(`/screenshots/theme-${theme.slug}.png`)
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-[hsl(var(--bg-secondary))] transition-colors hover:border-terminal-green-dim">
      {/* Screenshot */}
      <Lightbox src={src} alt={`coco ui — ${theme.name} theme`}>
        <div className="aspect-[16/10] overflow-hidden border-b border-border/60 bg-[hsl(var(--code-bg))]">
          <Image
            src={src}
            alt={`coco ui — ${theme.name} theme`}
            width={1260}
            height={800}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        </div>
      </Lightbox>

      {/* Meta */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 shrink-0 rounded-full ring-1 ring-inset ring-white/10"
            style={{ backgroundColor: theme.accent }}
            aria-hidden="true"
          />
          <h3 className="font-mono text-sm font-semibold text-foreground">{theme.name}</h3>
          {theme.mode === "light" && (
            <span className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              light
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
          {theme.blurb}
        </p>
        <code className="mt-3 inline-block rounded bg-[hsl(var(--code-bg))] px-2 py-1 font-mono text-xs text-terminal-green">
          --theme {theme.slug}
        </code>
      </div>
    </div>
  )
}

function ThemeGrid({ themes }: { themes: ThemeMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {themes.map((t) => (
        <ThemeCard key={t.slug} theme={t} />
      ))}
    </div>
  )
}

export default function ThemesDocsPage() {
  const dark = THEMES.filter((t) => t.mode === "dark")
  const light = THEMES.filter((t) => t.mode === "light")

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-terminal-green/70">
          <PaletteIcon className="h-4 w-4" />
          Appearance
        </div>
        <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground">
          Color themes
        </h1>
        <p className="max-w-2xl text-xl text-[hsl(var(--text-secondary))]">
          {THEME_COUNT} built-in palettes for the coco workstation — every one a
          complete theme, surface and all. Click any preview to enlarge.
        </p>
      </div>

      {/* Usage */}
      <div className="rounded-lg border border-border bg-[hsl(var(--bg-secondary))] p-5 sm:p-6">
        <h2 className="font-mono text-sm font-semibold text-foreground">Setting a theme</h2>
        <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
          Pass <code className="rounded bg-[hsl(var(--code-bg))] px-1.5 py-0.5 font-mono text-xs text-terminal-green">--theme</code>{" "}
          on launch, or set it once in your config so it sticks.
        </p>
        <div className="mt-4 space-y-2">
          <code className="block rounded-md bg-[hsl(var(--code-bg))] px-3 py-2 font-mono text-sm text-terminal-green">
            <span className="text-muted-foreground/60">$ </span>coco ui --theme gruvbox
          </code>
          <code className="block rounded-md bg-[hsl(var(--code-bg))] px-3 py-2 font-mono text-sm text-foreground/80">
            <span className="text-muted-foreground/60"># .coco.config.json</span>
            {"  "}
            <span className="text-terminal-green">{`{ "logTui": { "theme": { "preset": "gruvbox" } } }`}</span>
          </code>
          <p className="text-xs text-muted-foreground">
            Prefer no color at all? Set{" "}
            <code className="rounded bg-[hsl(var(--code-bg))] px-1.5 py-0.5 font-mono text-[11px] text-terminal-green">
              NO_COLOR=1
            </code>{" "}
            and coco renders monochrome.
          </p>
        </div>
      </div>

      {/* Slideshow — flip through every theme one at a time */}
      <section className="space-y-5">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-lg font-semibold text-foreground">
            Flip through them
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            ← → to navigate
          </span>
        </div>
        <ThemeSlideshow />
      </section>

      {/* Dark themes */}
      <section className="space-y-5">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-lg font-semibold text-foreground">Dark themes</h2>
          <span className="font-mono text-xs text-muted-foreground">{dark.length}</span>
        </div>
        <ThemeGrid themes={dark} />
      </section>

      {/* Light themes */}
      <section className="space-y-5">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-lg font-semibold text-foreground">Light themes</h2>
          <span className="font-mono text-xs text-muted-foreground">{light.length}</span>
        </div>
        <ThemeGrid themes={light} />
      </section>
    </div>
  )
}
