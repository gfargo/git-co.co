import { Metadata } from "next"
import Link from "next/link"
import { getWikiCategories } from "@/lib/wiki"
import {
    ArrowRight,
    Book,
    Settings,
    Users,
    Wrench,
    Map,
    HelpCircle,
    FolderOpen,
} from "lucide-react"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Comprehensive documentation for Coco, the AI-powered Git toolbelt. Learn about installation, configuration, team collaboration, and advanced features.",
  alternates: {
    canonical: `${siteConfig.url}/docs`,
  },
  openGraph: {
    title: "Documentation | Coco",
    description:
      "Comprehensive documentation for Coco, the AI-powered Git toolbelt. Learn about installation, configuration, team collaboration, and advanced features.",
    url: `${siteConfig.url}/docs`,
    siteName: siteConfig.name,
  },
}

const categoryIcons: Record<string, React.ElementType> = {
  "Getting Started": Book,
  Configuration: Settings,
  "Team & Enterprise": Users,
  "Advanced Features": Wrench,
  Roadmap: Map,
  "Help & Support": HelpCircle,
  Uncategorized: FolderOpen,
}

export default function DocsPage() {
  const categories = getWikiCategories()

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-mono font-bold tracking-tight text-foreground">
          Documentation
        </h1>
        <p className="text-xl text-[hsl(var(--text-secondary))] max-w-2xl">
          Learn how to use Coco to generate intelligent commit messages, create
          changelogs, and automate your git workflow with AI.
        </p>
      </div>

      {/* Quick Start Card */}
      <Link
        href="/docs/getting-started"
        className="group block p-6 rounded-lg border-2 border-terminal-green-dim bg-[hsl(var(--bg-elevated))] hover:border-terminal-green hover:bg-[hsl(var(--bg-surface))] transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-mono font-semibold text-terminal-green">
              Quick Start Guide
            </h2>
            <p className="text-[hsl(var(--text-secondary))]">
              New to Coco? Start here for a complete walkthrough from
              installation to your first AI-generated commit.
            </p>
          </div>
          <ArrowRight className="h-6 w-6 text-terminal-green group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Category Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = categoryIcons[category.name] || FolderOpen
          return (
            <div
              key={category.name}
              className="p-6 rounded-lg border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-secondary))] hover:border-[hsl(var(--border-accent))] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-[hsl(var(--bg-elevated))]">
                  <Icon className="h-5 w-5 text-terminal-green" />
                </div>
                <h3 className="font-mono font-semibold text-lg text-foreground">
                  {category.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/docs/${page.slug}`}
                      className="group flex items-center text-[hsl(var(--text-secondary))] hover:text-terminal-green transition-colors"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* External Links */}
      <div className="pt-8 border-t border-[hsl(var(--border-default))]">
        <h2 className="text-xl font-mono font-semibold mb-4 text-foreground">
          Additional Resources
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/gfargo/coco"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-elevated))] hover:border-terminal-green-dim hover:bg-[hsl(var(--bg-surface))] transition-colors text-sm text-[hsl(var(--text-secondary))] hover:text-foreground"
          >
            GitHub Repository
          </a>
          <a
            href="https://discord.gg/KGu9nE9Ejx"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-elevated))] hover:border-terminal-green-dim hover:bg-[hsl(var(--bg-surface))] transition-colors text-sm text-[hsl(var(--text-secondary))] hover:text-foreground"
          >
            Discord Community
          </a>
          <a
            href="https://github.com/gfargo/coco/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-elevated))] hover:border-terminal-green-dim hover:bg-[hsl(var(--bg-surface))] transition-colors text-sm text-[hsl(var(--text-secondary))] hover:text-foreground"
          >
            GitHub Discussions
          </a>
        </div>
      </div>
    </div>
  )
}
