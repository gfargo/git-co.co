"use client"

import {
    GitCommitHorizontalIcon,
    ScrollTextIcon,
    CalendarClockIcon,
    ClipboardCheckIcon,
    ScissorsIcon,
    MonitorIcon,
    SettingsIcon,
} from "lucide-react"
import { track } from "@vercel/analytics/react"

import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { CommandCard, type CommandCardProps } from "@/components/CommandCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/*  Command data — one entry per tool in the coco toolbelt             */
/* ------------------------------------------------------------------ */

const commands: (CommandCardProps & { id: string })[] = [
  {
    id: "commit",
    name: "commit",
    tagline: "Write your commits with AI",
    description:
      "Generate intelligent commit messages from staged changes with optional Conventional Commits support and automatic commitlint validation.",
    usage: "coco commit",
    icon: GitCommitHorizontalIcon,
    flags: [
      { flag: "-i, --interactive", description: "Open editor for review and editing" },
      { flag: "-s, --stage-all", description: "Stage all changes and commit in one step" },
      { flag: "--conventional", description: "Force conventional commits mode" },
      { flag: "--append [text]", description: "Add content to end of commit message" },
      { flag: "-t, --append-ticket", description: "Auto-append Jira/Linear ticket from branch" },
      { flag: "--open-in-editor", description: "Open message in editor before committing" },
    ],
  },
  {
    id: "changelog",
    name: "changelog",
    tagline: "Build release notes from history",
    description:
      "Create detailed changelogs from any branch, commit range, or tag. Perfect for release notes and documentation.",
    usage: "coco changelog",
    icon: ScrollTextIcon,
    flags: [
      { flag: "-r, --range", description: "Specific commit range (HEAD refs or hashes)" },
      { flag: "-b, --branch", description: "Compare against target branch" },
      { flag: "-t, --tag", description: "Compare against a specific tag" },
      { flag: "--since-last-tag", description: "All commits since last tag" },
      { flag: "--with-diff", description: "Include diff for each commit in analysis" },
      { flag: "--author", description: "Include author attribution" },
    ],
  },
  {
    id: "recap",
    name: "recap",
    tagline: "Summarize what you shipped",
    description:
      "Summarize your work from yesterday, last week, last month, or any time period for standups and status reports.",
    usage: "coco recap",
    icon: CalendarClockIcon,
    flags: [
      { flag: "--yesterday", description: "Summarize yesterday's changes" },
      { flag: "--last-week", description: "Summarize last week's changes" },
      { flag: "--last-month", description: "Summarize last month's changes" },
      { flag: "--last-tag", description: "Changes since last git tag" },
      { flag: "--current-branch", description: "Summarize current branch changes" },
    ],
  },
  {
    id: "review",
    name: "review",
    tagline: "Catch issues before you push",
    description:
      "Get AI-powered code review feedback on your changes before committing. Analyzes working directory changes and provides actionable suggestions.",
    usage: "coco review",
    icon: ClipboardCheckIcon,
    flags: [
      { flag: "-i, --interactive", description: "Interactive review mode" },
      { flag: "-b, --branch", description: "Review specific branch" },
    ],
  },
  {
    id: "commit-split",
    name: "commit split",
    tagline: "Break messy commits apart",
    description:
      "Split a large staging area into clean, logical commits. Each split gets its own AI-generated message.",
    usage: "coco commit split",
    icon: ScissorsIcon,
    flags: [
      { flag: "--plan", description: "Preview the split plan without applying" },
      { flag: "--apply", description: "Apply a previously generated plan" },
      { flag: "--split", description: "Plan and apply in one step" },
    ],
  },
  {
    id: "ui",
    name: "ui",
    tagline: "Your full terminal workstation",
    description:
      "Launch the keyboard-driven Git workstation with 9 views: history, status, diff, compose, branches, tags, stash, worktrees, and pull-request.",
    usage: "coco ui",
    icon: MonitorIcon,
    flags: [
      { flag: "--view", description: "Open a specific view on launch" },
      { flag: "--theme", description: "Set color theme (default, monochrome, catppuccin, gruvbox)" },
      { flag: "--all", description: "Show all branches in history" },
      { flag: "--branch", description: "Filter to a specific branch" },
      { flag: "--path", description: "Filter history to a file path" },
      { flag: "--limit", description: "Limit number of commits loaded" },
    ],
  },
  {
    id: "init",
    name: "init",
    tagline: "Set up in seconds",
    description:
      "Interactive setup wizard to configure coco for your project or globally. Walks you through provider selection, API keys, and preferences.",
    usage: "coco init",
    icon: SettingsIcon,
    flags: [
      { flag: "--scope project", description: "Configure for current project only" },
      { flag: "--scope global", description: "Configure globally for user" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const ToolbeltSection = () => {
  const handleTabChange = (value: string) => {
    track("Toolbelt Tab Switch", {
      command: value,
      section: "toolbelt",
    })
  }

  return (
    <Section id="toolbelt">
      <div className="container">
        <SectionHeader
          prompt="~/coco $ --help"
          title="Every command, a sharp tool"
          subtitle="Each command solves a real problem on its own. Pick the one you need, or use them all."
        />

        <Tabs
          defaultValue="commit"
          className="w-full"
          onValueChange={handleTabChange}
        >
          {/* Tab triggers — scrollable on mobile */}
          <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-1 bg-transparent p-0 h-auto">
            {commands.map(({ id, name, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="inline-flex items-center gap-1.5 rounded-md border border-transparent px-3 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-terminal-green-dim data-[state=active]:bg-bg-elevated data-[state=active]:text-terminal-green sm:py-2 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5" />
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content — one CommandCard per command */}
          {commands.map(({ id, ...cardProps }) => (
            <TabsContent key={id} value={id}>
              <CommandCard {...cardProps} isActive />
            </TabsContent>
          ))}
        </Tabs>

        {/* Dynamic model routing note */}
        <div className="mt-10 rounded-lg border border-border bg-bg-elevated p-6">
          <h4 className="mb-2 font-mono text-sm font-semibold text-foreground">
            Dynamic model routing
          </h4>
          <p className="text-sm leading-6 text-muted-foreground">
            coco supports{" "}
            <code className="font-mono text-terminal-green">dynamic</code>{" "}
            model routing which selects the best model per task — a fast model
            for commits, a thorough one for changelogs and reviews. Works across
            providers: OpenAI, Anthropic, and Ollama for fully local, private
            operation.
          </p>
        </div>
      </div>
    </Section>
  )
}
