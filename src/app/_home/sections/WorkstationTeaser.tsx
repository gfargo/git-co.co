import Link from "next/link"
import {
    ArrowRight,
    KeyboardIcon,
    LayoutGridIcon,
    LayersIcon,
    SparklesIcon,
    GitPullRequestIcon,
} from "lucide-react"

import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { TerminalAtmosphere } from "@/components/TerminalAtmosphere"

/* ------------------------------------------------------------------ */
/*  Feature bullets                                                    */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: KeyboardIcon,
    title: "Keyboard-driven navigation",
    description:
      "g + key chord navigation across all views — no mouse required.",
  },
  {
    icon: LayoutGridIcon,
    title: "9 specialized views",
    description:
      "History, status, diff, compose, branches, tags, stash, worktrees, and pull-request.",
  },
  {
    icon: LayersIcon,
    title: "Hunk-level staging",
    description:
      "Stage individual hunks, not just whole files. Precise control over every commit.",
  },
  {
    icon: SparklesIcon,
    title: "AI-assisted commits",
    description:
      "Draft commit messages with AI right from the compose view.",
  },
  {
    icon: GitPullRequestIcon,
    title: "PR workflows",
    description:
      "Merge, approve, and comment on pull requests without leaving the terminal.",
  },
]

/* ------------------------------------------------------------------ */
/*  Terminal mockup                                                     */
/* ------------------------------------------------------------------ */

function TerminalMockup() {
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
            <div className="text-muted-foreground">
              <span className="text-terminal-green">●</span>
              <span className="text-terminal-green-dim">─</span>
              <span className="text-foreground/60"> docs: navigation reference</span>
            </div>
          </div>

          {/* Right panel — file details */}
          <div className="hidden space-y-1 border-l border-border pl-3 text-muted-foreground sm:block sm:pl-4">
            <div className="text-foreground/70">3 files changed</div>
            <div>
              <span className="text-terminal-green">+42</span>{" "}
              <span className="text-red-400">-8</span>
            </div>
            <div className="mt-2 truncate text-foreground/50">
              src/views/pr.ts
            </div>
            <div className="truncate text-foreground/50">
              src/actions/merge.ts
            </div>
            <div className="truncate text-foreground/50">
              src/keymaps.ts
            </div>
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
/*  WorkstationTeaser section                                          */
/* ------------------------------------------------------------------ */

export function WorkstationTeaser() {
  return (
    <Section id="workstation-teaser" className="relative overflow-hidden">
      <TerminalAtmosphere variant="section" />

      <div className="container relative z-10">
        <SectionHeader
          prompt="~/coco $ ui"
          title="One surface for everything"
          subtitle="A keyboard-driven Git workstation that lives in your terminal. All your tools, all your views, one screen."
        />

        {/* Asymmetric 60/40 layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          {/* Left — terminal mockup */}
          <div>
            <TerminalMockup />
          </div>

          {/* Right — feature bullets */}
          <div className="flex flex-col justify-center gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-bg-elevated">
                  <Icon className="h-4 w-4 text-terminal-green" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA link */}
            <Link
              href="/workstation"
              className="group mt-2 inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the full workstation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
