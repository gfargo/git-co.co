"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  FileEditIcon,
  FolderTreeIcon,
  GitBranchIcon,
  GitCompareIcon,
  GitPullRequestIcon,
  SearchIcon,
  type LucideIcon,
} from "lucide-react"

import { KbdBadge } from "@/components/KbdBadge"
import { Lightbox } from "@/components/Lightbox"
import { cn } from "@/lib/utils"

interface Workflow {
  icon: LucideIcon
  name: string
  chord: string[]
  description: string
  screenshot: string
}

// Cross-view flows: a key on one surface acts on a second view. Each is
// paired with the most representative capture of where it lands. (Split
// and create-PR render AI-generated overlays that can't be captured
// deterministically, so they point at the surface they're driven from.)
const WORKFLOWS: Workflow[] = [
  {
    icon: GitCompareIcon,
    name: "Compare two refs",
    chord: ["m"],
    description:
      "Mark a ref on branches / tags / history with m, then Enter on a second ref to open git diff base..head. Cleared automatically when the diff is popped.",
    screenshot: "/screenshots/view-diff.png",
  },
  {
    icon: GitPullRequestIcon,
    name: "Create a pull request",
    chord: ["C"],
    description:
      "From history or branches, C generates a PR title + body from coco changelog against the default branch, then opens a multi-line review prompt. Auto-detects head + base; surfaces a pointer if a PR is already open.",
    screenshot: "/screenshots/view-pull-request.png",
  },
  {
    icon: GitBranchIcon,
    name: "Generate a changelog",
    chord: ["L"],
    description:
      "From history or branches, L opens a full-screen changelog view. Per-branch cache for instant re-entry; r regenerates, y yanks to clipboard, E opens in $EDITOR, c kicks off create-PR seeded with this content.",
    screenshot: "/screenshots/view-changelog.png",
  },
  {
    icon: FileEditIcon,
    name: "Split commits",
    chord: ["S"],
    description:
      "From compose, S opens an overlay with an LLM-generated multi-commit plan. Each group's title respects your conventional-commits + commitlint config. y apply / r regenerate / < cancel.",
    screenshot: "/screenshots/view-compose.png",
  },
  {
    icon: SearchIcon,
    name: "Bisect (in-view actions)",
    chord: ["g", "b", "s", "x"],
    description:
      "Inside the bisect view: g good · b bad · s skip · x reset. The title bar shows a BISECTING badge whenever a bisect is in progress.",
    screenshot: "/screenshots/view-bisect.png",
  },
  {
    icon: FolderTreeIcon,
    name: "Submodule drill-in",
    chord: ["Enter"],
    description:
      "Press Enter on a submodule row (g M) or a submodule file in a diff to drill in. Every view re-scopes to the submodule's working directory — like running coco ui from inside it. Esc or < walks back out; frames stack.",
    screenshot: "/screenshots/view-submodules.png",
  },
]

/**
 * Interactive showcase for the cross-view workflows. A selectable list on
 * the left drives one large, sticky terminal preview on the right — hover,
 * click, or arrow-key through the flows and the screen swaps with a
 * crossfade. Replaces the static card grid so each multi-step flow gets a
 * real picture of where it lands.
 */
export function CrossViewShowcase() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const flow = WORKFLOWS[active]!

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const next =
      e.key === "ArrowDown"
        ? (active + 1) % WORKFLOWS.length
        : (active - 1 + WORKFLOWS.length) % WORKFLOWS.length
    setActive(next)
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("[data-flow-row]")
      [next]?.focus()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      {/* Selectable flow list */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Cross-view workflows"
        onKeyDown={onKeyDown}
        className="order-2 rounded-lg border border-border bg-[hsl(var(--code-bg))] p-1.5 lg:order-1"
      >
        {WORKFLOWS.map((w, i) => {
          const Icon = w.icon
          const selected = i === active
          return (
            <button
              key={w.name}
              data-flow-row
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
              <span className="flex-1 truncate">{w.name}</span>
              <KbdBadge keys={w.chord} />
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
              coco ui — {flow.name.toLowerCase()}
            </span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
              {flow.chord.join(" ")}
            </span>
          </div>
          <Lightbox src={flow.screenshot} alt={`${flow.name} — coco ui`}>
            <div className="bg-[hsl(var(--code-bg))]">
              <Image
                key={flow.screenshot}
                src={flow.screenshot}
                alt={`${flow.name} — coco ui`}
                width={1260}
                height={800}
                priority={active === 0}
                className="h-auto w-full animate-fade-in-up object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
          </Lightbox>
        </div>

        <div className="mt-4 flex items-start gap-3 px-1">
          <flow.icon className="mt-0.5 h-4 w-4 shrink-0 text-terminal-green" />
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">{flow.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{flow.description}</p>
          </div>
        </div>
        <p className="mt-3 px-1 font-mono text-[11px] text-muted-foreground/50">
          ↑ ↓ to explore · click to enlarge
        </p>
      </div>
    </div>
  )
}
