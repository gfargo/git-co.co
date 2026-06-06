"use client"

import { CopyCommand } from "@/components/CopyCommand"
import { MediaFrame } from "@/components/MediaFrame"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"

/**
 * The smart-entry command gets top billing — it's the one most people
 * run first, and it adapts to where you are (repo → workstation, fresh
 * install → wizard).
 */
const primaryCommand = {
  command: "coco",
  description: "opens the workstation in a repo, the setup wizard on a fresh install",
}

const commands = [
  { command: "coco commit", description: "AI commit messages from your staged changes" },
  { command: "coco changelog", description: "Generate changelogs for any branch or range" },
  { command: "coco review", description: "Catch issues before you push" },
  { command: "coco ui", description: "The full workstation — every tool, one screen" },
  { command: "coco init", description: "Setup wizard — pick a provider, set preferences" },
]

export const InstallSection = () => {
  return (
    <Section id="install" variant="gradient">
      <div className="container px-4 md:px-6">
        <SectionHeader
          prompt="~/coco $ init"
          title="Get started"
          subtitle="Get up and running in seconds. One command installs and configures everything."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* Left — install command + the toolbelt as a terminal session */}
          <div>
            <CopyCommand command="npx git-coco@latest init" />

            <div className="mt-8 overflow-hidden rounded-lg border border-border bg-[hsl(var(--code-bg))]">
              <div className="flex items-center gap-2 border-b border-border/40 bg-bg-elevated/60 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground/50">
                  then run any of these
                </span>
              </div>

              {/* Primary — smart entry, set apart with an accent rail + tint */}
              <div className="flex flex-col gap-1 border-b border-border/40 border-l-2 border-l-terminal-green bg-terminal-green/5 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4">
                <code className="shrink-0 font-mono text-sm font-semibold text-terminal-green sm:w-[8.5rem]">
                  <span className="mr-1.5 text-muted-foreground/60">$</span>
                  {primaryCommand.command}
                </code>
                <span className="text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Smart entry</span> — {primaryCommand.description}
                </span>
              </div>

              {/* The rest of the toolbelt — aligned command / description columns.
                  The shared `coco` prefix is dimmed so the subcommand reads first. */}
              <ul className="divide-y divide-border/30">
                {commands.map(({ command, description }) => {
                  const subcommand = command.replace("coco ", "")
                  return (
                    <li
                      key={command}
                      className="grid grid-cols-1 gap-0.5 px-4 py-2.5 transition-colors hover:bg-foreground/5 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-4"
                    >
                      <code className="font-mono text-sm">
                        <span className="mr-1.5 text-muted-foreground/50">$</span>
                        <span className="text-muted-foreground/50">coco </span>
                        <span className="text-terminal-green">{subcommand}</span>
                      </code>
                      <span className="text-sm leading-6 text-muted-foreground">
                        {description}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Right — the workstation booting on a real repo, as live proof */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-terminal-green/5 blur-3xl"
            />
            <div className="overflow-hidden rounded-xl border border-border/40 shadow-2xl shadow-black/40 ring-1 ring-black/20">
              <div className="flex items-center gap-2 border-b border-border/30 bg-[hsl(150_20%_8%)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
                  ~/coco — coco ui
                </span>
              </div>
              <MediaFrame
                kind="gif"
                src="/screenshots/demo-boot-workstation.gif"
                alt="coco ui booting up — the workstation loads a repo's history, branches and diffs the moment you launch it"
                width={1463}
                height={689}
              />
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              coco ui — your repo, the moment it boots
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
