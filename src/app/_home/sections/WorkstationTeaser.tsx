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
import Image from 'next/image'

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
    title: "16 specialized views",
    description:
      "History, status, diff, compose, branches, tags, stash, worktrees, pull-request, PR triage, issues, conflicts, reflog, bisect, submodules, and changelog. Drill into any submodule with Enter — every view re-scopes to it.",
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
          {/* Left — real screenshot */}
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
            <Image
              src="/screenshots/hero-history-graph.png"
              alt="coco ui — full-screen Git workstation with commit graph, branches, and inspector"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
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
