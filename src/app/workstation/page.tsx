import { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangleIcon,
  ArchiveIcon,
  BookOpenIcon,
  ChevronRightIcon,
  CircleDotIcon,
  ClockIcon,
  CodeIcon,
  DiffIcon,
  FileEditIcon,
  FolderTreeIcon,
  GitBranchIcon,
  GitCompareIcon,
  GitPullRequestIcon,
  GitPullRequestArrowIcon,
  HistoryIcon,
  MonitorIcon,
  PackageIcon,
  PenToolIcon,
  SearchIcon,
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
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder"
import { ThemeWall } from "@/components/ThemeWall"
import { siteConfig } from "@/config/site"
import { WorkflowsAccordion } from "./WorkflowsAccordion"
import { GifHero } from "./GifHero"
import { GifDemo } from "@/components/GifDemo"

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

export function generateMetadata(): Metadata {
  const title = "Workstation — Terminal Git Workstation"
  const description =
    "A keyboard-driven terminal Git workstation with 16 specialized views — including GitHub issue and PR triage surfaces and recursive submodule navigation — chord navigation, AI-powered commits, one-keystroke PR creation, full-screen changelog generation, and customizable themes. No Electron, no mouse required."

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
    screenshot: "/screenshots/view-history.png",
  },
  {
    icon: FileEditIcon,
    name: "Status",
    chord: ["g", "s"],
    description: "View working tree status and stage changes",
    screenshot: "/screenshots/view-status.png",
  },
  {
    icon: DiffIcon,
    name: "Diff",
    chord: ["g", "d"],
    description: "Side-by-side diff viewer for any commit or file",
    screenshot: "/screenshots/view-diff.png",
  },
  {
    icon: PenToolIcon,
    name: "Compose",
    chord: ["g", "c"],
    description: "Draft and edit commit messages with optional AI assistance",
    screenshot: "/screenshots/view-compose.png",
  },
  {
    icon: GitBranchIcon,
    name: "Branches",
    chord: ["g", "b"],
    description: "Manage local and remote branches",
    screenshot: "/screenshots/view-branches.png",
  },
  {
    icon: TagIcon,
    name: "Tags",
    chord: ["g", "t"],
    description: "Browse and create tags",
    screenshot: "/screenshots/view-tags.png",
  },
  {
    icon: ArchiveIcon,
    name: "Stash",
    chord: ["g", "z"],
    description: "Manage stash entries",
    screenshot: "/screenshots/view-stash.png",
  },
  {
    icon: TreesIcon,
    name: "Worktrees",
    chord: ["g", "w"],
    description: "Manage git worktrees",
    screenshot: "/screenshots/view-worktrees.png",
  },
  {
    icon: GitPullRequestIcon,
    name: "Pull Request",
    chord: ["g", "p"],
    description: "Review, approve, merge, and comment on the current branch's PR",
    screenshot: "/screenshots/view-pull-request.png",
  },
  {
    icon: GitPullRequestArrowIcon,
    name: "PR Triage",
    chord: ["g", "P"],
    description: "Multi-PR triage list with filter cycling, body / reviews / checks in the inspector, and the full action panel by-number",
    screenshot: "/screenshots/view-pr-triage.png",
  },
  {
    icon: CircleDotIcon,
    name: "Issues",
    chord: ["g", "i"],
    description: "Issue triage list with filter cycling, body / comments in the inspector, and per-row comment / label / assign / close / reopen",
    screenshot: "/screenshots/view-issues.png",
  },
  {
    icon: AlertTriangleIcon,
    name: "Conflicts",
    chord: ["g", "x"],
    description: "Resolve merge / rebase / cherry-pick / revert conflicts inline",
    screenshot: "/screenshots/view-conflicts.png",
  },
  {
    icon: HistoryIcon,
    name: "Reflog",
    chord: ["g", "r"],
    description: "Chronological recovery log — every HEAD movement, one keystroke away",
    screenshot: "/screenshots/view-reflog.png",
  },
  {
    icon: SearchIcon,
    name: "Bisect",
    chord: ["g", "B"],
    description: "Binary-search through history to find regressions — good / bad / skip / reset",
    screenshot: "/screenshots/view-bisect.png",
  },
  {
    icon: PackageIcon,
    name: "Submodules",
    chord: ["g", "M"],
    description: "Registered submodules with pinned sha, tracking branch, and clean / modified / uninitialized state. Enter drills into the cursored submodule.",
    screenshot: "/screenshots/view-submodules.png",
  },
  {
    icon: GitBranchIcon,
    name: "Changelog",
    chord: ["L"],
    description: "Full-screen AI-generated changelog for the current branch — yank, edit, or seed a PR from it",
    screenshot: "/screenshots/view-changelog.png",
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
  { key: "P", label: "PR Triage" },
  { key: "i", label: "Issues" },
  { key: "x", label: "Conflicts" },
  { key: "r", label: "Reflog" },
  { key: "B", label: "Bisect" },
  { key: "M", label: "Submodules" },
  { key: "L", label: "Changelog" },
]

/**
 * Cross-view workflows that span multiple views (#779, #784).
 * Surfaced as a distinct section because the keys are scoped to the
 * source view but the action lands on a *second* view — they're not
 * top-level destinations like the entries above.
 */
const crossViewWorkflows = [
  {
    icon: GitCompareIcon,
    name: "Compare two refs",
    chord: ["m"],
    description:
      "Mark a ref on branches / tags / history with `m`, then `Enter` on a second ref to open `git diff base..head`. Cleared automatically when the diff is popped.",
  },
  {
    icon: SearchIcon,
    name: "Bisect (in-view actions)",
    chord: ["g", "b", "s", "x"],
    description:
      "Inside the bisect view: `g` good · `b` bad · `s` skip · `x` reset. The title bar shows a BISECTING badge whenever a bisect is in progress.",
  },
  {
    icon: GitPullRequestIcon,
    name: "Create a pull request",
    chord: ["C"],
    description:
      "From history or branches, `C` generates a PR title + body from `coco changelog` against the default branch, then opens a multi-line review prompt. Auto-detects head + base; surfaces a pointer if a PR is already open.",
  },
  {
    icon: GitBranchIcon,
    name: "Generate a changelog",
    chord: ["L"],
    description:
      "From history or branches, `L` opens a full-screen changelog view. Per-branch cache for instant re-entry; `r` regenerates, `y` yanks to clipboard, `E` opens in $EDITOR, `c` kicks off create-PR seeded with this content.",
  },
  {
    icon: FileEditIcon,
    name: "Split commits",
    chord: ["S"],
    description:
      "From compose, `S` opens an overlay with an LLM-generated multi-commit plan. Each group's title respects your conventional-commits + commitlint config. `y` apply / `r` regenerate / `<` cancel.",
  },
  {
    icon: FileEditIcon,
    name: "Edit in $EDITOR",
    chord: ["E"],
    description:
      "From compose / status / diff, `E` opens the current commit draft in $EDITOR or $VISUAL. Round-trips through a temp file with `.md` extension for markdown highlighting. Companion to lowercase `e` (inline edit).",
  },
  {
    icon: FolderTreeIcon,
    name: "Submodule drill-in",
    chord: ["Enter"],
    description:
      "Press `Enter` on a submodule row (`g M`) or on a submodule file in a commit diff to drill in. Every view re-scopes to the submodule's working directory — like running `coco ui` from inside it. `Esc` or `<` walks back out; the title bar shows `coco › vendor/lib   ← esc` so you always know where you are. Frames stack.",
  },
]

const migrationFeatures = [
  "Terminal-native (no Electron)",
  "AI-powered commits & reviews",
  "Keyboard-first chord navigation",
  "16 specialized views",
  "PR workflows in terminal",
  "One-keystroke split / changelog / PR creation",
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
      "A keyboard-driven terminal Git workstation with 16 specialized views, recursive submodule navigation, chord navigation, AI-powered commits, one-keystroke PR creation, full-screen changelog generation, and customizable themes.",
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
      "16 specialized TUI views",
      "Chord-based keyboard navigation",
      "Hunk-level staging",
      "AI-powered commit drafting",
      "One-keystroke PR creation seeded from AI changelog",
      "Full-screen AI changelog view with per-branch cache",
      "Multi-commit split workflow with rescue chain",
      "Edit commit drafts in $EDITOR / $VISUAL",
      "Pull request workflows",
      "Side-by-side diff viewer",
      "Compare any two refs (branches / tags / commits)",
      "Bisect workflow with single-keystroke decisions",
      "Reflog browser with one-key drill-in to any HEAD movement",
      "Conflict resolution helper for merge / rebase / cherry-pick / revert",
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
        {/* ============================================================ */}
        {/*  HERO                                                        */}
        {/* ============================================================ */}
        <Section id="workstation-hero" className="relative overflow-hidden pt-8 pb-0 md:pt-12 lg:pt-16">
          <TerminalAtmosphere variant="hero" />

          <div className="container relative z-10">
            {/* Tight header — title + CTA on one line */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-xs tracking-widest uppercase text-terminal-green/70">
                  coco workstation
                </span>
                <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  Git, keyboard-first
                  <span
                    className="ml-1 inline-block h-[0.8em] w-[0.45ch] translate-y-[0.05em] bg-terminal-green animate-cursor-blink"
                    aria-hidden="true"
                  />
                </h1>
              </div>
              <CopyCommand command="npx git-coco@latest ui" />
            </div>
          </div>

          {/* Full-bleed GIF — breaks out of container, edge to edge */}
          <div className="relative mt-2">
            {/* Subtle glow behind */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-terminal-green/5 to-transparent pointer-events-none" />

            <div className="mx-auto max-w-[1600px] px-2 sm:px-4">
              <div className="overflow-hidden rounded-t-xl border border-b-0 border-border/40 shadow-2xl shadow-black/60">
                {/* Minimal title bar */}
                <div className="flex items-center gap-2 bg-[hsl(150_20%_8%)] px-4 py-2 border-b border-border/30">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
                    workspace → repo → history
                  </span>
                </div>

                {/* The GIF */}
                <GifHero />
              </div>
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
              title="16 specialized views"
              subtitle="Each view is purpose-built for a specific Git workflow. Switch between them instantly with chord navigation."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tuiViews.map(({ icon: Icon, name, chord, description, screenshot }) => (
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

                  {/* Screenshot for this view */}
                  <div className="mt-3">
                    <ScreenshotPlaceholder
                      src={screenshot}
                      alt={`${name} view screenshot`}
                      aspect="aspect-[4/3]"
                    />
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
        {/*  SEARCH & FILTER — live demo                                 */}
        {/* ============================================================ */}
        <Section id="search">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12 items-center">
              <div>
                <SectionHeader
                  prompt="~/coco $ /"
                  title="Find anything instantly"
                  subtitle="Press / to filter commits, branches, or files in real time. Results narrow as you type — no waiting, no separate search UI."
                />
              </div>
              <GifDemo
                src="/screenshots/demo-search-filter.gif"
                alt="Live search filter narrowing commits as you type"
              />
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

            {/* View-switching GIF demo */}
            <div className="mt-10">
              <GifDemo
                src="/screenshots/demo-ui-view-switching.gif"
                alt="Chord navigation in action — switching between history, status, branches, and diff"
                caption="g + key — instant view switching without leaving the keyboard"
              />
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  CROSS-VIEW WORKFLOWS — multi-step flows                     */}
        {/* ============================================================ */}
        <Section id="cross-view-workflows">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ help workflows"
              title="Cross-view workflows"
              subtitle="Some flows span multiple views — mark a state on one surface, act on it from another. Footer hints adapt so the override is always discoverable."
            />

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
              {crossViewWorkflows.map(({ icon: Icon, name, chord, description }) => (
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

            {/* Full-width workflow GIF demo */}
            <div className="mt-12">
              <GifDemo
                src="/screenshots/demo-hunk-staging.gif"
                alt="Staging individual files from the status view"
                caption="Stage files one by one with Space — precise control over every commit"
              />
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  THEMING                                                     */}
        {/* ============================================================ */}
        <Section id="theming" className="relative overflow-hidden">
          <div className="container">
            <SectionHeader
              prompt="~/coco $ ui --theme"
              title="Thirty-one ways to make it yours"
              subtitle="From Catppuccin to Gruvbox to Synthwave — every preset is a complete palette, surface and all. Plus full NO_COLOR support for minimal environments."
            />
          </div>

          {/* Full-bleed kinetic theme wall — breaks out of the container */}
          <ThemeWall className="mt-2" />

          <div className="container">
            {/* NO_COLOR callout */}
            <div className="mt-12 rounded-lg border border-border bg-[hsl(var(--code-bg))] px-5 py-4">
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
