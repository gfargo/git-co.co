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
          {/* Left — install command + the first commands to run.
              Deliberately *not* dressed as a fake terminal window: the
              right column is the real terminal, so this reads as a clean,
              scannable command reference instead of competing chrome. */}
          <div>
            <div className="flex flex-col gap-2.5">
              <div>
                <span className="mb-1 block font-mono text-xs text-muted-foreground/70">
                  Homebrew — no prerequisites
                </span>
                <CopyCommand command="brew install gfargo/tap/coco" />
              </div>
              <div>
                <span className="mb-1 block font-mono text-xs text-muted-foreground/70">
                  curl
                </span>
                <CopyCommand command="curl -fsSL https://coco.griffen.codes/install.sh | sh" />
              </div>
              <div>
                <span className="mb-1 block font-mono text-xs text-muted-foreground/70">
                  npm — or try it with npx, no install
                </span>
                <CopyCommand command="npx git-coco@latest init" />
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-mono text-sm font-semibold text-foreground">
                Then run any of these
              </h3>
              <p className="mb-5 mt-1 text-sm text-muted-foreground">
                One smart entry point, plus a sharp tool for each job.
              </p>

              <div className="flex flex-col gap-1.5">
                {/* Smart entry — the one most people run first, set apart
                    with an accent rail + faint tint. */}
                <div className="group relative overflow-hidden rounded-lg border border-terminal-green/30 bg-terminal-green/[0.06] px-4 py-3.5 transition-colors hover:border-terminal-green/50 sm:flex sm:items-baseline sm:gap-4">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-terminal-green"
                  />
                  <code className="block shrink-0 font-mono text-sm font-semibold text-terminal-green sm:w-[7.5rem]">
                    <span className="mr-1.5 text-terminal-green/50">$</span>
                    {primaryCommand.command}
                  </code>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground sm:mt-0">
                    <span className="font-medium text-foreground">Smart entry</span> — {primaryCommand.description}
                  </span>
                </div>

                {/* The focused tools — the shared `coco` prefix is dimmed
                    so the subcommand reads first; the whole row lifts on
                    hover and the prompt glyph greens up. */}
                {commands.map(({ command, description }) => {
                  const subcommand = command.replace("coco ", "")
                  return (
                    <div
                      key={command}
                      className="group rounded-lg px-4 py-2.5 transition-colors hover:bg-foreground/[0.04] sm:flex sm:items-baseline sm:gap-4"
                    >
                      <code className="block shrink-0 font-mono text-sm sm:w-[7.5rem]">
                        <span className="mr-1.5 text-muted-foreground/40 transition-colors group-hover:text-terminal-green/70">$</span>
                        <span className="text-muted-foreground/50">coco </span>
                        <span className="text-terminal-green">{subcommand}</span>
                      </code>
                      <span className="mt-0.5 block text-sm leading-6 text-muted-foreground sm:mt-0">
                        {description}
                      </span>
                    </div>
                  )
                })}
              </div>
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
