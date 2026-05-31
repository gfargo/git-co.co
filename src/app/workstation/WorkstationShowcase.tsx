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
  FolderTreeIcon,
  GitBranchIcon,
  GitCompareIcon,
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

interface ShowcaseItem {
  icon: LucideIcon
  name: string
  chord: string[]
  description: string
  screenshot: string
}

interface ShowcaseGroup {
  id: string
  label: string
  items: ShowcaseItem[]
}

// Co-located here (not in the server page) because a client component
// can't receive icon *components* across the server boundary.
const GROUPS: ShowcaseGroup[] = [
  {
    id: "views",
    label: "16 views",
    items: [
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
    ],
  },
  {
    id: "cross-view",
    label: "Cross-view actions",
    items: [
      { icon: GitCompareIcon, name: "Compare two refs", chord: ["m"], description: "Mark a ref on branches / tags / history with m, then Enter on a second ref to open git diff base..head. Cleared automatically when the diff is popped.", screenshot: "/screenshots/view-diff.png" },
      { icon: GitPullRequestIcon, name: "Create a pull request", chord: ["C"], description: "From history or branches, C generates a PR title + body from coco changelog against the default branch, then opens a multi-line review prompt. Auto-detects head + base.", screenshot: "/screenshots/view-pull-request.png" },
      { icon: GitBranchIcon, name: "Generate a changelog", chord: ["L"], description: "From history or branches, L opens a full-screen changelog view. Per-branch cache; r regenerates, y yanks, E opens in $EDITOR, c seeds create-PR with this content.", screenshot: "/screenshots/view-changelog.png" },
      { icon: FileEditIcon, name: "Split commits", chord: ["S"], description: "From compose, S opens an overlay with an LLM-generated multi-commit plan. Each group's title respects your conventional-commits + commitlint config. y apply / r regenerate / < cancel.", screenshot: "/screenshots/view-compose.png" },
      { icon: SearchIcon, name: "Bisect (in-view actions)", chord: ["g", "b", "s", "x"], description: "Inside the bisect view: g good · b bad · s skip · x reset. The title bar shows a BISECTING badge whenever a bisect is in progress.", screenshot: "/screenshots/view-bisect.png" },
      { icon: FolderTreeIcon, name: "Submodule drill-in", chord: ["Enter"], description: "Press Enter on a submodule row (g M) or a submodule file in a diff to drill in. Every view re-scopes to the submodule — like running coco ui from inside it. Esc or < walks back out; frames stack.", screenshot: "/screenshots/view-submodules.png" },
    ],
  },
]

/**
 * Unified interactive showcase for the workstation surfaces. A segmented
 * toggle switches between the 16 destination views and the cross-view
 * actions; a selectable list (styled like coco's own sidebar) drives one
 * large, sticky terminal preview — hover, click, or arrow-key through it
 * and the screen crossfades, lightbox one click away. Merges what used to
 * be two near-identical list+preview sections into one.
 */
export function WorkstationShowcase() {
  const [groupIdx, setGroupIdx] = useState(0)
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const group = GROUPS[groupIdx]!
  const item = group.items[active]!

  function selectGroup(i: number) {
    setGroupIdx(i)
    setActive(0)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const count = group.items.length
    const next =
      e.key === "ArrowDown" ? (active + 1) % count : (active - 1 + count) % count
    setActive(next)
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("[data-showcase-row]")
      [next]?.focus()
  }

  return (
    <div>
      {/* Group toggle */}
      <div className="mb-6 inline-flex rounded-lg border border-border bg-[hsl(var(--code-bg))] p-1">
        {GROUPS.map((g, i) => (
          <button
            key={g.id}
            onClick={() => selectGroup(i)}
            aria-pressed={i === groupIdx}
            className={cn(
              "rounded-md px-4 py-1.5 font-mono text-xs transition-colors sm:text-sm",
              i === groupIdx
                ? "bg-terminal-green/15 text-terminal-green"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        {/* Selectable list */}
        <div
          ref={listRef}
          role="tablist"
          aria-label={group.label}
          onKeyDown={onKeyDown}
          className="order-2 max-h-[520px] overflow-y-auto rounded-lg border border-border bg-[hsl(var(--code-bg))] p-1.5 lg:order-1"
        >
          {group.items.map((it, i) => {
            const Icon = it.icon
            const selected = i === active
            return (
              <button
                key={it.name}
                data-showcase-row
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-left font-mono text-sm transition-colors",
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
                <span className="flex-1 truncate">{it.name}</span>
                <KbdBadge keys={it.chord} />
              </button>
            )
          })}
        </div>

        {/* Sticky preview */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-border/60 shadow-2xl shadow-black/40 ring-1 ring-black/20">
            <div className="flex items-center gap-2 border-b border-border/40 bg-[hsl(150_20%_8%)] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
                coco ui — {item.name.toLowerCase()}
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
                {item.chord.join(" ")}
              </span>
            </div>
            <Lightbox src={item.screenshot} alt={`${item.name} — coco ui`}>
              <div className="bg-[hsl(var(--code-bg))] leading-[0]">
                <Image
                  key={`${group.id}-${item.screenshot}`}
                  src={item.screenshot}
                  alt={`${item.name} — coco ui`}
                  width={1260}
                  height={800}
                  priority={groupIdx === 0 && active === 0}
                  className="h-auto w-full animate-fade-in-up object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
              </div>
            </Lightbox>
          </div>

          <div className="mt-4 flex items-start gap-3 px-1">
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-terminal-green" />
            <div>
              <h3 className="font-mono text-sm font-semibold text-foreground">{item.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </div>
          <p className="mt-3 px-1 font-mono text-[11px] text-muted-foreground/50">
            ↑ ↓ to explore · click to enlarge
          </p>
        </div>
      </div>
    </div>
  )
}
