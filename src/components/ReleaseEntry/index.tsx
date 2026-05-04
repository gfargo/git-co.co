"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronRightIcon, ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReleaseEntryProps {
  version: string
  date: string
  highlights: string[]
  body: string
  githubUrl: string
  isExpanded?: boolean
}

/**
 * Expandable card for a single release entry on the changelog page.
 * Shows version badge, date, highlights summary, and an expandable
 * full markdown body. Links to the GitHub release.
 */
export function ReleaseEntry({
  version,
  date,
  highlights,
  body,
  githubUrl,
  isExpanded: initialExpanded = false,
}: ReleaseEntryProps) {
  const [expanded, setExpanded] = useState(initialExpanded)

  return (
    <article className="group rounded-lg border border-border bg-bg-elevated transition-colors hover:border-terminal-green/20">
      {/* Header — always visible */}
      <button
        type="button"
        className="flex w-full items-start gap-4 rounded-t-lg p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-label={`Toggle release notes for v${version}`}
      >
        {/* Expand/collapse chevron */}
        <span className="mt-0.5 shrink-0 text-muted-foreground transition-transform">
          {expanded ? (
            <ChevronDownIcon className="h-4 w-4 text-terminal-green" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          {/* Version badge + date row */}
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="inline-block rounded bg-terminal-green/10 px-2.5 py-0.5 font-mono text-sm font-semibold text-terminal-green">
              v{version}
            </span>
            {date && (
              <time
                dateTime={date}
                className="font-mono text-xs text-muted-foreground"
              >
                {date}
              </time>
            )}
          </div>

          {/* Highlights summary */}
          {highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-terminal-green-dim before:content-['›']"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </button>

      {/* Expandable body */}
      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          {/* Markdown body rendered as preformatted text */}
          <div
            className={cn(
              "prose-terminal max-w-none overflow-x-auto",
              "font-sans text-sm leading-7 text-muted-foreground",
              "[&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:font-mono [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground",
              "[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:font-mono [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
              "[&_ul]:my-2 [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:list-disc",
              "[&_li]:text-muted-foreground [&_li::marker]:text-terminal-green-dim",
              "[&_strong]:text-foreground [&_strong]:font-medium",
              "[&_code]:rounded [&_code]:bg-[hsl(var(--code-bg))] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-terminal-green",
              "[&_a]:text-terminal-green [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-terminal-green-bright",
              "[&_p]:my-2"
            )}
          >
            <MarkdownBody content={body} />
          </div>

          {/* GitHub release link */}
          <div className="mt-6 border-t border-border pt-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View on GitHub
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </article>
  )
}

/**
 * Minimal markdown-to-JSX renderer for release note bodies.
 * Handles headings, lists, bold, code, links, and paragraphs.
 * No external dependency — keeps the bundle light.
 */
function MarkdownBody({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]!

    // Skip empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(<h3 key={i}>{renderInline(line.slice(4))}</h3>)
      i++
      continue
    }
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i}>{renderInline(line.slice(3))}</h2>)
      i++
      continue
    }

    // Unordered list items
    if (line.match(/^[-*] /)) {
      const listItems: React.ReactNode[] = []
      while (i < lines.length && lines[i]!.match(/^[-*] /)) {
        listItems.push(
          <li key={i}>{renderInline(lines[i]!.replace(/^[-*] /, ""))}</li>
        )
        i++
      }
      elements.push(<ul key={`ul-${i}`}>{listItems}</ul>)
      continue
    }

    // Paragraph (collect consecutive non-empty, non-heading, non-list lines)
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i]!.trim() !== "" &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.match(/^[-*] /)
    ) {
      paraLines.push(lines[i]!)
      i++
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={`p-${i}`}>{renderInline(paraLines.join(" "))}</p>
      )
    }
  }

  return <>{elements}</>
}

/** Render inline markdown: **bold**, `code`, and [links](url) */
function renderInline(text: string): React.ReactNode {
  // Split on inline patterns: **bold**, `code`, [text](url)
  const parts: React.ReactNode[] = []
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[2]) {
      // Bold
      parts.push(<strong key={match.index}>{match[2]}</strong>)
    } else if (match[3]) {
      // Inline code
      parts.push(<code key={match.index}>{match[3]}</code>)
    } else if (match[4] && match[5]) {
      // Link
      parts.push(
        <a
          key={match.index}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[4]}
        </a>
      )
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}
