import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import {
    MonitorIcon,
    RouteIcon,
    ServerIcon,
    ShieldCheckIcon,
    SparklesIcon,
    ZapIcon,
} from "lucide-react"
import { type LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: SparklesIcon,
    title: "AI-Powered Git Commands",
    description:
      "Each command solves a specific problem: intelligent commits, automated changelogs, code recaps for standups, AI code reviews, and commit splitting for clean history.",
  },
  {
    icon: MonitorIcon,
    title: "Terminal Workstation",
    description:
      "A keyboard-driven Git workstation with 9 views that brings every tool together in one surface. History, status, diff, compose, branches, tags, stash, worktrees, and pull-request.",
  },
  {
    icon: RouteIcon,
    title: "Dynamic Model Routing",
    description:
      "Task-aware model selection picks the right model for each job. Fast models for commits, thorough models for changelogs and reviews. Set it once and forget it.",
  },
  {
    icon: ServerIcon,
    title: "Multi-Provider AI",
    description:
      "OpenAI, Anthropic, and Ollama. Run fully local with Ollama for complete privacy and zero API costs. Your code, your infrastructure, your choice.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Conventional Commits & Commitlint",
    description:
      "First-class support for Conventional Commits with automatic commitlint validation and intelligent retry logic. Integrates with your existing rules.",
  },
  {
    icon: ZapIcon,
    title: "Instant Boot & Disk Cache",
    description:
      "The workstation paints in under 100ms. A per-repo disk cache serves history from the first frame on subsequent boots. Lazy loading keeps the runtime lean.",
  },
]

export const KeyFeaturesSection = () => {
  return (
    <Section id="key-features">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="Key Features"
          subtitle="Powerful capabilities that adapt to your workflow and coding standards"
          prompt="~/coco $ features"
        />
        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-5 sm:p-8 rounded-lg bg-bg-elevated border border-border transition-colors hover:border-terminal-green-dim"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-lg bg-terminal-green/10">
                <feature.icon className="w-6 h-6 text-terminal-green" />
              </div>
              <h3 className="text-xl font-mono font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
