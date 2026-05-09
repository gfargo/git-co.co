import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { getChangelog } from "@/lib/changelog"
import type { ChangelogEntry } from "@/lib/changelog/types"

/** How many releases to show in the compact list */
const DISPLAY_COUNT = 5

/**
 * Pick a one-liner for a release entry.
 * Prefers the `summary` field; falls back to the first highlight;
 * falls back to the first ~150 chars of the body.
 */
function oneLiner(entry: ChangelogEntry): string {
  if (entry.summary) return entry.summary
  if (entry.highlights.length > 0) return entry.highlights[0] ?? ""
  if (entry.body) return entry.body.slice(0, 150).trim() + "…"
  return "See release notes for details."
}

export function WhatsNewSection() {
  const changelog = getChangelog()

  if (changelog.length === 0) {
    return (
      <Section id="whats-new" variant="elevated">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="What's New"
            prompt="~/coco $ changelog --latest"
          />
          <p className="text-muted-foreground">
            No releases found.{" "}
            <a
              href="https://github.com/gfargo/coco/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-terminal-green underline underline-offset-4 hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View releases on GitHub&nbsp;→
            </a>
          </p>
        </div>
      </Section>
    )
  }

  const entries = changelog.slice(0, DISPLAY_COUNT)

  return (
    <Section id="whats-new" variant="elevated">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="What's New"
          subtitle="Recent releases and highlights from the changelog"
          prompt="~/coco $ changelog --latest"
        />

        <ul className="space-y-6 max-w-3xl">
          {entries.map((entry) => (
            <li key={entry.version} className="group">
              <div className="flex flex-col gap-2">
                {/* Version badge + one-liner */}
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="inline-block font-mono text-sm font-semibold text-terminal-green bg-terminal-green/10 px-2 py-0.5 rounded">
                    v{entry.version}
                  </span>
                  {entry.date && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {entry.date}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {oneLiner(entry)}
                </p>

                {/* Compact highlight bullets */}
                {entry.highlights.length > 0 && (
                  <ul className="mt-1 space-y-1 pl-4">
                    {entry.highlights.slice(0, 4).map((h, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground before:content-['›'] before:mr-2 before:text-terminal-green-dim"
                      >
                        {h}
                      </li>
                    ))}
                    {entry.highlights.length > 4 && (
                      <li className="text-xs text-muted-foreground/60 italic">
                        +{entry.highlights.length - 4} more
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Link to full changelog */}
        <div className="mt-10">
          <Link
            href="/changelog"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-mono text-terminal-green hover:text-terminal-green-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View full changelog
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Section>
  )
}

