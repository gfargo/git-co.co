"use client"

import { CopyCommand } from "@/components/CopyCommand"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"

const quickStartItems = [
  {
    command: "coco commit",
    description: "AI-powered commit messages from your staged changes",
  },
  {
    command: "coco changelog",
    description: "Generate changelogs for any branch or range",
  },
  {
    command: "coco review",
    description: "Catch issues before you push",
  },
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

        {/* Prominent install command */}
        <div className="mb-12 md:mb-16">
          <CopyCommand command="npx git-coco@latest init" />
        </div>

        {/* Quick-start flow */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Fast path commands */}
          {quickStartItems.map((item) => (
            <div key={item.command} className="space-y-2">
              <code className="inline-block rounded bg-[hsl(var(--code-bg))] px-3 py-1.5 font-mono text-sm text-terminal-green">
                {item.command}
              </code>
              <p className="text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}

          {/* Full experience */}
          <div className="space-y-2">
            <code className="inline-block rounded bg-[hsl(var(--code-bg))] px-3 py-1.5 font-mono text-sm text-terminal-green">
              coco ui
            </code>
            <p className="text-sm leading-6 text-muted-foreground">
              The full workstation — every tool in one keyboard-driven terminal
              interface
            </p>
          </div>

          {/* Setup wizard */}
          <div className="space-y-2">
            <code className="inline-block rounded bg-[hsl(var(--code-bg))] px-3 py-1.5 font-mono text-sm text-terminal-green">
              coco init
            </code>
            <p className="text-sm leading-6 text-muted-foreground">
              First-time setup wizard — pick your AI provider, set your
              preferences, and you&apos;re ready to go
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
