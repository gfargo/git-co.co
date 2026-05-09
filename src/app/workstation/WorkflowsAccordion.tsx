"use client"

import {
    GitCommitIcon,
    GitPullRequestIcon,
    LayoutGridIcon,
    RotateCcwIcon,
    SplitIcon,
} from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const workflows = [
  {
    id: "hunk-staging",
    title: "Hunk-level staging",
    icon: LayoutGridIcon,
    description:
      "Stage individual hunks from the status view. Navigate to a file, expand hunks, stage or unstage with precision. No more committing entire files when you only want part of the change.",
  },
  {
    id: "side-by-side-diff",
    title: "Side-by-side diff",
    icon: SplitIcon,
    description:
      "View changes in a split-pane diff viewer. Supports both staged and unstaged changes, with syntax highlighting and line-level navigation.",
  },
  {
    id: "commit-compose",
    title: "Commit compose with AI draft",
    icon: GitCommitIcon,
    description:
      "Open the compose view, optionally generate an AI-drafted message from your staged changes, edit it to your liking, and commit — all without leaving the terminal.",
  },
  {
    id: "pr-actions",
    title: "PR actions",
    icon: GitPullRequestIcon,
    description:
      "Merge, approve, and comment on pull requests directly from the PR view. Review diffs, check CI status, and take action without switching to a browser.",
  },
  {
    id: "history-mutations",
    title: "History mutations",
    icon: RotateCcwIcon,
    description:
      "Revert, reset, rebase, and cherry-pick from the history view. Navigate to any commit and apply operations with keyboard shortcuts.",
  },
]

export function WorkflowsAccordion() {
  return (
    <div className="mx-auto max-w-3xl">
      <Accordion type="single" collapsible className="space-y-2">
        {workflows.map(({ id, title, icon: Icon, description }) => (
          <AccordionItem
            key={id}
            value={id}
            className="rounded-lg border border-border bg-bg-surface/30 px-5 data-[state=open]:bg-bg-elevated"
          >
            <AccordionTrigger className="gap-3 py-4 font-mono text-sm font-semibold text-foreground hover:no-underline">
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-terminal-green" />
                {title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
