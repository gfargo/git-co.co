"use client"

import { CopyCommand } from "@/components/CopyCommand"
import { Lightbox } from "@/components/Lightbox"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import Image from "next/image"

const quickStartItems = [
  { command: "coco", description: "Smart entry — opens the workstation in a repo, the setup wizard on a fresh install" },
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
              <ul className="divide-y divide-border/40">
                {quickStartItems.map(({ command, description }) => (
                  <li key={command} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3">
                    <code className="shrink-0 font-mono text-sm text-terminal-green">
                      <span className="mr-1.5 text-muted-foreground/60">$</span>
                      {command}
                    </code>
                    <span className="text-sm leading-6 text-muted-foreground">
                      {description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — a real `coco doctor` capture as visual proof */}
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
                  coco doctor
                </span>
              </div>
              <Lightbox
                src="/screenshots/docs-doctor.png"
                alt="coco doctor — environment and configuration checks"
              >
                <Image
                  src="/screenshots/docs-doctor.png"
                  alt="coco doctor — environment and configuration checks"
                  width={1260}
                  height={800}
                  className="h-auto w-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </Lightbox>
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              coco doctor — verify your setup any time
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
