"use client"

import { useMemo, useState } from "react"
import { ExternalLinkIcon, SearchIcon, XIcon } from "lucide-react"

import { ReleaseEntry } from "@/components/ReleaseEntry"
import type { ChangelogEntry } from "@/lib/changelog/types"

interface ChangelogSearchProps {
  entries: ChangelogEntry[]
}

/**
 * Client component that wraps the release entry list with a
 * version filter/search input. Filters entries by version number
 * or highlight/summary text as the user types.
 */
export function ChangelogSearch({ entries }: ChangelogSearchProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries

    return entries.filter((entry) => {
      // Match against version (with or without "v" prefix)
      if (entry.version.toLowerCase().includes(q)) return true
      if (`v${entry.version}`.toLowerCase().includes(q)) return true

      // Match against summary text
      if (entry.summary?.toLowerCase().includes(q)) return true

      // Match against highlights
      if (entry.highlights.some((h) => h.toLowerCase().includes(q))) return true

      return false
    })
  }, [entries, query])

  return (
    <>
      {/* Search / filter bar */}
      <div className="mb-8">
        <div className="relative mx-auto max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by version or keyword…"
            aria-label="Filter releases"
            className="w-full rounded-lg border border-border bg-bg-elevated py-2.5 pl-10 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-terminal-green/40 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Clear filter"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Result count when filtering */}
        {query && (
          <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
            {filtered.length === 0
              ? "No matching releases"
              : `${filtered.length} release${filtered.length === 1 ? "" : "s"} found`}
          </p>
        )}
      </div>

      {/* Release entries */}
      {filtered.length === 0 && query ? (
        <div className="mx-auto max-w-lg rounded-lg border border-border bg-bg-elevated p-8 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            No releases match &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-3 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl space-y-4">
          {filtered.map((entry) => (
            <ReleaseEntry
              key={entry.version}
              version={entry.version}
              date={entry.date}
              highlights={entry.highlights}
              body={entry.body}
              githubUrl={entry.githubUrl}
              searchQuery={query.trim()}
            />
          ))}

          {/* Footer — link to full release history on GitHub */}
          <div className="mt-10 rounded-lg border border-border bg-bg-elevated p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Showing the {filtered.length} most recent releases.
            </p>
            <a
              href="https://github.com/gfargo/coco/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all releases on GitHub
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
