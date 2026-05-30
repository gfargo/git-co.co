"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  AlertTriangleIcon,
  ArchiveIcon,
  CircleDotIcon,
  ClockIcon,
  DiffIcon,
  FileEditIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  GitPullRequestArrowIcon,
  HistoryIcon,
  PackageIcon,
  PenToolIcon,
  SearchIcon,
  TagIcon,
  TreesIcon,
  type LucideIcon,
} from "lucide-react"

import { KbdBadge } from "@/components/KbdBadge"
import { Lightbox } from "@/components/Lightbox"
import { cn } from "@/lib/utils"

interface TuiView {
  icon: LucideIcon
  name: string
  chord: string[]
  description: string
  screenshot: string
}

// Co-located here (not in the server page) because a client component
// can't receive icon *components* as props across the server boundary.
const VIEWS: TuiView[] = [
  { icon: ClockIcon, name: "History", chord: ["g", "h"], description: "Browse commit history with graph visualization.", screenshot: "/screenshots/view-history.png" },
  { icon: FileEditIcon, name: "Status", chord: ["g", "s"], description: "View working-tree status and stage changes.", screenshot: "/screenshots/view-status.png" },
  { icon: DiffIcon, name: "Diff", chord: ["g", "d"], description: "Side-by-side diff viewer for any commit or file.", screenshot: "/screenshots/view-diff.png" },
  { icon: PenToolIcon, name: "Compose", chord: ["g", "c"], description: "Draft and edit commit messages with optional AI assistance.", screenshot: "/screenshots/view-compose.png" },
  { icon: GitBranchIcon, name: "Branches", chord: ["g", "b"], description: "Manage local and remote branches with live sync state.", screenshot: "/screenshots/view-branches.png" },
  { icon: TagIcon, name: "Tags", chord: ["g", "t"], description: "Browse and create tags across the repo.", screenshot: "/screenshots/view-tags.png" },
  { icon: ArchiveIcon, name: "Stash", chord: ["g", "z"], description: "Inspect, apply, and drop stash entries.", screenshot: "/screenshots/view-stash.png" },
  { icon: TreesIcon, name: "Worktrees", chord: ["g", "w"], description: "Manage linked git worktrees on different branches.", screenshot: "/screenshots/view-worktrees.png" },
  { icon: GitPullRequestIcon, name: "Pull Request", chord: ["g", "p"], description: "Review, approve, merge, and comment on the current branch's PR.", screenshot: "/screenshots/view-pull-request.png" },
  { icon: GitPullRequestArrowIcon, name: "PR Triage", chord: ["g", "P"], description: "Multi-PR triage with filter cycling, reviews/checks in the inspector, and the full action panel.", screenshot: "/screenshots/view-pr-triage.png" },
  { icon: CircleDotIcon, name: "Issues", chord: ["g", "i"], description: "Issue triage with filter cycling and per-row comment / label / assign / close / reopen.", screenshot: "/screenshots/view-issues.png" },
  { icon: AlertTriangleIcon, name: "Conflicts", chord: ["g", "x"], description: "Resolve merge / rebase / cherry-pick / revert conflicts inline.", screenshot: "/screenshots/view-conflicts.png" },
  { icon: HistoryIcon, name: "Reflog", chord: ["g", "r"], description: "Chronological recovery log — every HEAD movement, one keystroke away.", screenshot: "/screenshots/view-reflog.png" },
  { icon: SearchIcon, name: "Bisect", chord: ["g", "B"], description: "Binary-search history to find regressions — good / bad / skip / reset.", screenshot: "/screenshots/view-bisect.png" },
  { icon: PackageIcon, name: "Submodules", chord: ["g", "M"], description: "Submodules with pinned sha and state. Enter drills into the cursored one.", screenshot: "/screenshots/view-submodules.png" },
  { icon: GitBranchIcon, name: "Changelog", chord: ["L"], description: "Full-screen AI-generated changelog — yank, edit, or seed a PR from it.", screenshot: "/screenshots/view-changelog.png" },
]

/**
 * Interactive explorer for the 16 workstation views. A selectable
 * command-list (styled like coco's own sidebar) drives a single large,
 * sticky terminal preview — hover, click, or arrow-key through the list
 * and the screen swaps with a crossfade. Replaces the old wall of 16
 * identical cropped thumbnails: one view is shown big and legible at a
 * time, and the interaction itself reinforces the keyboard-driven story.
 */
export function ViewExplorer() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const view = VIEWS[active]!

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const next =
      e.key === "ArrowDown"
        ? (active + 1) % VIEWS.length
        : (active - 1 + VIEWS.length) % VIEWS.length
    setActive(next)
    const btn = listRef.current?.querySelectorAll<HTMLButtonElement>("[data-view-row]")[next]
    btn?.focus()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      {/* Selectable command-list */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Workstation views"
        onKeyDown={onKeyDown}
        className="order-2 max-h-[520px] overflow-y-auto rounded-lg border border-border bg-[hsl(var(--code-bg))] p-1.5 lg:order-1"
      >
        {VIEWS.map((v, i) => {
          const Icon = v.icon
          const selected = i === active
          return (
            <button
              key={v.name}
              data-view-row
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border-l-2 px-3 py-2 text-left font-mono text-sm transition-colors",
                selected
                  ? "border-terminal-green bg-terminal-green/10 text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-bg-elevated/60 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  selected ? "text-terminal-green" : "text-muted-foreground"
                )}
              />
              <span className="flex-1 truncate">{v.name}</span>
              <KbdBadge keys={v.chord} />
            </button>
          )
        })}
      </div>

      {/* Sticky preview screen */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-xl border border-border/60 shadow-2xl shadow-black/40 ring-1 ring-black/20">
          {/* Title bar reflecting the active view */}
          <div className="flex items-center gap-2 border-b border-border/40 bg-[hsl(150_20%_8%)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
              coco ui — {view.name.toLowerCase()}
            </span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
              {view.chord.join(" ")}
            </span>
          </div>
          <Lightbox src={view.screenshot} alt={`${view.name} view`}>
            <div className="bg-[hsl(var(--code-bg))]">
              <Image
                key={view.screenshot}
                src={view.screenshot}
                alt={`${view.name} view`}
                width={1260}
                height={800}
                priority={active === 0}
                className="h-auto w-full animate-fade-in-up object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
          </Lightbox>
        </div>

        {/* Caption for the active view */}
        <div className="mt-4 flex items-start gap-3 px-1">
          <view.icon className="mt-0.5 h-4 w-4 shrink-0 text-terminal-green" />
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">{view.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{view.description}</p>
          </div>
        </div>
        <p className="mt-3 px-1 font-mono text-[11px] text-muted-foreground/50">
          ↑ ↓ to explore · click to enlarge
        </p>
      </div>
    </div>
  )
}
