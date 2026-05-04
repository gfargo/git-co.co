import { Metadata } from "next"
import Link from "next/link"
import {
    ArchiveIcon,
    BookOpenIcon,
    ChevronRightIcon,
    ClockIcon,
    CodeIcon,
    DiffIcon,
    FileEditIcon,
    GitBranchIcon,
    GitPullRequestIcon,
    MonitorIcon,
    PenToolIcon,
    TagIcon,
    TreesIcon,
} from "lucide-react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { TerminalAtmosphere } from "@/components/TerminalAtmosphere"
import { KbdBadge } from "@/components/KbdBadge"
import { CopyCommand } from "@/components/CopyCommand"
import { TrackedLink } from "@/components/TrackedLink"
import { siteConfig } from "@/config/site"
import { WorkflowsAccordion } from "./WorkflowsAccordion"

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

export function generateMetadata(): Metadata {
  const title = "Workstation — Terminal Git Workstation"
  const description =
    "A keyboard-driven terminal Git workstation with 9 specialized views, chord navigation, AI-powered commits, PR workflows, and customizable themes. No Electron, no mouse required."

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}/workstation`,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1280,
          height: 640,
          alt: "Coco UI — Terminal Git Workstation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tuiViews = [
  {
    icon: ClockIcon,
    name: "History",
    chord: ["g", "h"],
    description: "Browse commit history with graph visualization",
  },
  {
    icon: FileEditIcon,
    name: "Status",
    chord: ["g", "s"],
    description: "View working tree status and stage changes",
  },
  {
    icon: DiffIcon,
    name: "Diff",
    chord: ["g", "d"],
    description: "Side-by-side diff viewer for any commit or file",
  },
  {
    icon: PenToolIcon,
    name: "Compose",
    chord: ["g", "c"],
    description: "Draft and edit commit messages with optional AI assistance",
  },
  {
    icon: GitBranchIcon,
    name: "Branches",
    chord: ["g", "b"],
    description: "Manage local and remote branches",
  },
  {
    icon: TagIcon,
    name: "Tags",
    chord: ["g", "t"],
    description: "Browse and create tags",
  },
  {
    icon: ArchiveIcon,
    name: "Stash",
    chord: ["g", "z"],
    description: "Manage stash entries",
  },
  {
    icon: TreesIcon,
    name: "Worktrees",
    chord: ["g", "w"],
    description: "Manage git worktrees",
  },
  {
    icon: GitPullRequestIcon,
    name: "Pull Request",
    chord: ["g", "p"],
    description: "Review, approve, merge, and comment on PRs",
  },
]

const chordKeys = [
  { key: "h", label: "History" },
  { key: "s", label: "Status" },
  { key: "d", label: "Diff" },
  { key: "c", label: "Compose" },
  { key: "b", label: "Branches" },
  { key: "t", label: "Tags" },
  { key: "z", label: "Stash" },
  { key: "w", label: "Worktrees" },
  { key: "p", label: "Pull Request" },
]

const themePresets = [
  {
    name: "Default",
    description: "Terminal green on dark",
    colors: ["#121418", "#1a1d24", "#4d9e6d", "#6bc490"],
  },
  {
    name: "Monochrome",
    description: "Grayscale palette",
    colors: ["#121418", "#1a1d24", "#888888", "#cccccc"],
  },
  {
    name: "Catppuccin",
    description: "Pastel colors on dark",
    colors: ["#1e1e2e", "#313244", "#cba6f7", "#f5c2e7"],
  },
  {
    name: "Gruvbox",
    description: "Warm retro palette",
    colors: ["#282828", "#3c3836", "#b8bb26", "#fabd2f"],
  },
]

const migrationFeatures = [
  "Terminal-native (no Electron)",
  "AI-powered commits & reviews",
  "Keyboard-first chord navigation",
  "9 specialized views",
  "PR workflows in terminal",
  "Theming + NO_COLOR",
  "Free & open source",
]

const competitors = [
  { name: "GitKraken", values: ["✗", "✗", "✗", "~", "✓", "✗", "✗"] },
  { name: "lazygit", values: ["✓", "✗", "~", "~", "✗", "✓", "✓"] },
  { name: "gitui", values: ["✓", "✗", "✗", "~", "✗", "✓", "✓"] },
  { name: "coco ui", values: ["✓", "✓", "✓", "✓", "✓", "✓", "✓"] },
]

/* ------------------------------------------------------------------ */
/*  Terminal Mockup                                                    */
/* ------------------------------------------------------------------ */

function HeroTerminalMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* Title bar */}
      <div className="flex items-center gap-2 bg-bg-elevated px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">
          coco ui
        </span>
      </div>

      {/* Terminal content */}
      <div className="bg-[hsl(var(--code-bg))] p-4 font-mono text-xs leading-5 sm:text-sm sm:leading-6">
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 sm:gap-x-4">
          {/* Left sidebar */}
          <div className="space-y-1 border-r border-border pr-3 text-muted-foreground sm:pr-4">
            <div className="text-terminal-green">Branches</div>
            <div className="pl-1 text-foreground/70">main</div>
            <div className="pl-1 text-foreground/50">feat/ui</div>
            <div className="mt-2 text-terminal-green">Tags</div>
            <div className="pl-1 text-foreground/50">v0.41.0</div>
            <div className="mt-2 text-terminal-green">Stashes</div>
            <div className="pl-1 text-foreground/50">wip: layout</div>
          </div>

          {/* Main area — commit history */}
          <div className="min-w-0 space-y-1 overflow-hidden">
            <div className="text-muted-foreground">
              <span className="text-terminal-green">●</span>
              <span className="text-terminal-green-dim">─</span>
              <span className="text-foreground/80"> feat: add PR workflows</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-terminal-green">●</span>
              <span className="text-terminal-green-dim">─</span>
              <span className="text-foreground/80"> fix: hunk staging edge case</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-terminal-green-bright">●</span>
              <span className="text-terminal-green-dim">─</span>
              <span className="text-foreground"> chore: update deps</span>
              <span className="ml-1 text-terminal-green">&lt;HEAD&gt;</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-terminal-green">●</span>
              <span className="text-terminal-green-dim">─</span>
              <span className="text-foreground/80"> feat: compose view AI draft</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-terminal-green">●</span>
              <span className="text-terminal-green-dim">─</span>
              <span className="text-foreground/80"> refactor: keybinding system</span>
            </div>
          </div>

          {/* Right panel — file details */}
          <div className="hidden space-y-1 border-l border-border pl-3 text-muted-foreground sm:block sm:pl-4">
            <div className="text-foreground/70">3 files changed</div>
            <div>
              <span className="text-terminal-green">+42</span>{" "}
              <span className="text-red-400">-8</span>
            </div>
            <div className="mt-2 truncate text-foreground/50">src/views/pr.ts</div>
            <div className="truncate text-foreground/50">src/actions/merge.ts</div>
            <div className="truncate text-foreground/50">src/keymaps.ts</div>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-muted-foreground">
          <span>
            <span className="text-terminal-green">history</span> view
          </span>
          <span className="hidden sm:inline">
            <kbd className="rounded border border-border bg-bg-elevated px-1 text-[10px]">g</kbd>
            {" + "}
            <kbd className="rounded border border-border bg-bg-elevated px-1 text-[10px]">h</kbd>
            {" history"}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Component (Server Component)                                  */
/* ------------------------------------------------------------------ */

export default function WorkstationPage() {
  // Page-specific JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "coco ui — Terminal Git Workstation",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "A keyboard-driven terminal Git workstation with 9 specialized views, chord navigation, AI-powered commits, PR workflows, and customizable themes.",
    url: `${siteConfig.url}/workstation`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    featureList: [
      "9 specialized TUI views",
      "Chord-based keyboard navigation",
      "Hunk-level staging",
      "AI-powered commit drafting",
      "Pull request workflows",
      "Side-by-side diff viewer",
      "4 built-in theme presets",
      "NO_COLOR support",
    ],
    softwareVersion: "latest",
    keywords:
      "terminal git client, TUI, git workstation, keyboard-driven, AI commits, git UI",
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Header />
      <main className="w-full flex-1 pb-2 overflow-hidden">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ============================================================ */}
        {/*  HERO                                                        */}
        {/* ============================================================ */}
        <Section id="workstation-hero" className="relative overflow-hidden md:py-20 lg:py-32">
          <TerminalAtmosphere variant="hero" />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14 items-center">
              {/* Left — text */}
              <div className="flex flex-col items-start gap-6">
                <span className="font-mono text-sm tracking-wide text-terminal-green animate-fade-in-up">
                  ~/coco $ ui
                </span>

                <h1 className="font-mono text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                  Your terminal Git workstation
                  <span
                    className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.05em] bg-terminal-green animate-cursor-blink"
                    aria-hidden="true"
                  />
                </h1>

                <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                  A keyboard-driven TUI that brings branches, diffs, commits, PRs,
                  and more into a single full-screen interface — no mouse, no
                  Electron, no context switching.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CopyCommand command="npx git-coco@latest init" />
                </div>
              </div>

              {/* Right — terminal mockup (desktop) */}
              <div className="hidden lg:block">
                <HeroTerminalMockup />
              </div>
            </div>

            {/* Mobile mockup below text */}
            <div className="mt-10 lg:hidden">
              <HeroTerminalMockup />
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  VIEWS GRID                                                  */}
        {/* ============================================================ */}
        <Section id="views" variant="elevated">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ ui --view"
              title="9 specialized views"
              subtitle="Each view is purpose-built for a specific Git workflow. Switch between them instantly with chord navigation."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tuiViews.map(({ icon: Icon, name, chord, description }) => (
                <div
                  key={name}
                  className="group rounded-lg border border-border bg-bg-surface/30 p-5 transition-colors hover:border-terminal-green/30 hover:bg-bg-elevated"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-bg-elevated">
                      <Icon className="h-4 w-4 text-terminal-green" />
                    </div>
                    <KbdBadge keys={chord} />
                  </div>
                  <h3 className="mt-3 font-mono text-sm font-semibold text-foreground">
                    {name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  NAVIGATION REFERENCE — Chord Map                            */}
        {/* ============================================================ */}
        <Section id="navigation">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ help navigation"
              title="Chord navigation"
              subtitle="Press g to enter navigation mode, then a second key to jump to any view. Muscle memory replaces mouse clicks."
            />

            <div className="mx-auto max-w-2xl">
              <div className="rounded-lg border border-border bg-[hsl(var(--code-bg))] p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-center gap-3">
                  <kbd className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-terminal-green/40 bg-bg-elevated font-mono text-lg text-terminal-green">
                    g
                  </kbd>
                  <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-mono text-sm text-muted-foreground">then press…</span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {chordKeys.map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 rounded-md border border-border/50 bg-bg-elevated/50 px-4 py-2.5"
                    >
                      <kbd className="inline-flex h-7 min-w-7 items-center justify-center rounded border border-border bg-bg-elevated font-mono text-xs text-terminal-green">
                        {key}
                      </kbd>
                      <span className="font-mono text-sm text-foreground/80">{label}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="rounded border border-border bg-bg-elevated px-1 font-mono text-[10px]">
                    ?
                  </kbd>{" "}
                  anywhere for the full keymap reference
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  KEY WORKFLOWS (client component for accordion)              */}
        {/* ============================================================ */}
        <Section id="workflows" variant="elevated">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ workflows"
              title="Key workflows"
              subtitle="Real Git operations, not just a viewer. Stage hunks, compose commits, review PRs, and rewrite history — all from the keyboard."
            />
            <WorkflowsAccordion />
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  THEMING                                                     */}
        {/* ============================================================ */}
        <Section id="theming">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ ui --theme"
              title="Make it yours"
              subtitle="Four built-in theme presets, plus full NO_COLOR support for minimal environments."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {themePresets.map(({ name, description, colors }) => (
                <div
                  key={name}
                  className="rounded-lg border border-border bg-bg-surface/30 p-5 transition-colors hover:border-terminal-green/30"
                >
                  <div className="mb-4 flex gap-2">
                    {colors.map((color, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-md border border-border"
                        style={{ backgroundColor: color }}
                        aria-label={`${name} theme color ${i + 1}`}
                      />
                    ))}
                  </div>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>

            {/* NO_COLOR callout */}
            <div className="mt-8 rounded-lg border border-border bg-[hsl(var(--code-bg))] px-5 py-4">
              <div className="flex items-start gap-3">
                <MonitorIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-mono text-sm text-foreground">NO_COLOR support</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Set{" "}
                    <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-terminal-green">
                      NO_COLOR=1
                    </code>{" "}
                    to strip all color output. Respects the{" "}
                    <TrackedLink
                      eventName="NO_COLOR Link"
                      href="https://no-color.org"
                      target="_blank"
                      className="rounded-sm text-terminal-green underline underline-offset-2 hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      no-color.org
                    </TrackedLink>{" "}
                    convention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  MIGRATION TABLE                                             */}
        {/* ============================================================ */}
        <Section id="migration" variant="elevated">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ compare"
              title="How coco stacks up"
              subtitle="Coming from another Git client? Here's what you get with coco ui."
            />

            <div className="sm:max-w-4xl sm:mx-auto overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Feature
                    </th>
                    {competitors.map(({ name }) => (
                      <th
                        key={name}
                        className={`px-3 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                          name === "coco ui"
                            ? "text-terminal-green"
                            : "text-muted-foreground"
                        }`}
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {migrationFeatures.map((feature, i) => (
                    <tr key={feature} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 text-foreground/80">{feature}</td>
                      {competitors.map(({ name, values }) => (
                        <td
                          key={name}
                          className={`px-3 py-3 text-center ${
                            values[i] === "✓"
                              ? name === "coco ui"
                                ? "text-terminal-green"
                                : "text-foreground/70"
                              : values[i] === "~"
                                ? "text-muted-foreground"
                                : "text-muted-foreground/50"
                          }`}
                        >
                          {values[i]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  CTA                                                         */}
        {/* ============================================================ */}
        <Section id="workstation-cta" variant="gradient">
          <TerminalAtmosphere variant="section" />

          <div className="container relative z-10 text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Try the workstation
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
              Install coco and launch the TUI. One command to get started.
            </p>

            <div className="mt-8 flex flex-col items-center gap-6">
              <CopyCommand command="npx git-coco@latest init" />

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <BookOpenIcon className="h-4 w-4" />
                  Read the docs
                </Link>
                <TrackedLink
                  eventName="Workstation GitHub Link"
                  href={siteConfig.links.github}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <CodeIcon className="h-4 w-4" />
                  View on GitHub
                </TrackedLink>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
