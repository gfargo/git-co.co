"use client"

import Image from "next/image"
import {
  ArchiveIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  LayoutGridIcon,
  RectangleHorizontalIcon,
  RotateCcwIcon,
  SplitIcon,
  type LucideIcon,
} from "lucide-react"

import { Lightbox } from "@/components/Lightbox"
import { cn } from "@/lib/utils"

interface WorkflowRow {
  icon: LucideIcon
  title: string
  description: string
  keys: string[]
  media: { src: string; animated?: boolean }
}

const WORKFLOWS: WorkflowRow[] = [
  {
    icon: LayoutGridIcon,
    title: "Tactile hunk staging",
    description:
      "Open a changed file and stage it hunk by hunk. Each hunk carries a ● staged / ○ unstaged badge, the selected hunk is highlighted with an accent bar, and ↑/↓ walk between them — so you stage exactly what you mean, never the whole file by accident.",
    keys: ["↵", "↑/↓", "Space"],
    media: { src: "/screenshots/demo-staging-hunks.gif", animated: true },
  },
  {
    icon: ArchiveIcon,
    title: "Stash like a pro",
    description:
      "Stash from any view with gZ — even mid-diff — then manage stashes that actually read: every entry shows its origin branch, file count, and age, with a live contents preview. Rename one, branch off it, apply keeping your index, or undo a drop, all without leaving the keyboard.",
    keys: ["g", "Z", "R"],
    media: { src: "/screenshots/demo-stash-workflow.gif", animated: true },
  },
  {
    icon: SplitIcon,
    title: "Side-by-side diff",
    description:
      "Read changes in a split-pane diff with syntax highlighting and line-level navigation — staged or unstaged, any commit or file, without leaving the keyboard.",
    keys: ["g", "d"],
    media: { src: "/screenshots/view-diff.png" },
  },
  {
    icon: GitCommitIcon,
    title: "Compose with AI draft",
    description:
      "Open the compose view, draft a message from your staged changes with one keystroke, edit it to taste, and commit — Conventional Commits and commitlint respected.",
    keys: ["g", "c"],
    media: { src: "/screenshots/view-compose.png" },
  },
  {
    icon: GitPullRequestIcon,
    title: "Pull-request actions",
    description:
      "Merge, approve, request changes, and comment on PRs straight from the PR view. Review the diff, check CI status, and act — no browser round-trip.",
    keys: ["g", "p"],
    media: { src: "/screenshots/view-pull-request.png" },
  },
  {
    icon: RotateCcwIcon,
    title: "History mutations",
    description:
      "Revert, reset, rebase, and cherry-pick from the history view. Cursor to any commit and apply the operation with a single key — with reflog one keystroke away if you need to walk it back.",
    keys: ["g", "h"],
    media: { src: "/screenshots/view-reflog.png" },
  },
  {
    icon: RectangleHorizontalIcon,
    title: "Fits any terminal",
    description:
      "Down to an 80×24 tmux split, the three-pane IDE folds to a single full-width pane you Tab between — no feature locked behind screen real estate. Press v to peek the sidebar without losing your place, then snap right back.",
    keys: ["Tab", "v"],
    media: { src: "/screenshots/single-pane-narrow.png" },
  },
]

function FramedMedia({ title, media }: { title: string; media: WorkflowRow["media"] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 shadow-2xl shadow-black/40 ring-1 ring-black/20">
      <div className="flex items-center gap-2 border-b border-border/30 bg-[hsl(150_20%_8%)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-[10px] text-muted-foreground/40">
          coco ui
        </span>
      </div>
      <Lightbox src={media.src} alt={title}>
        <div className="bg-[hsl(var(--code-bg))]">
          {media.animated ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={title} className="block w-full" loading="lazy" />
          ) : (
            <Image
              src={media.src}
              alt={title}
              width={1260}
              height={800}
              className="block h-auto w-full object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          )}
        </div>
      </Lightbox>
    </div>
  )
}

/**
 * Key workflows as numbered, alternating feature rows — a deliberately
 * different rhythm from the list+preview and 2-column blocks elsewhere on
 * the page. Each row pairs a real capture with the keys that drive it.
 */
export function KeyWorkflows() {
  return (
    <div className="mt-4 space-y-16 lg:space-y-24">
      {WORKFLOWS.map((w, i) => {
        const Icon = w.icon
        const reversed = i % 2 === 1
        return (
          <div
            key={w.title}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            {/* Copy */}
            <div className={cn(reversed && "lg:order-2")}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-4xl font-bold leading-none text-terminal-green/20 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-terminal-green" />
                  <h3 className="font-mono text-lg font-semibold text-foreground sm:text-xl">
                    {w.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {w.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-1.5">
                {w.keys.map((k, ki) => (
                  <span key={ki} className="flex items-center gap-1.5">
                    {ki > 0 && <span className="text-muted-foreground/40">+</span>}
                    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-bg-elevated px-1.5 font-mono text-xs text-terminal-green">
                      {k}
                    </kbd>
                  </span>
                ))}
              </div>
            </div>

            {/* Media */}
            <div className={cn(reversed && "lg:order-1")}>
              <FramedMedia title={w.title} media={w.media} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
