import { Metadata } from "next"
import Link from "next/link"
import { getWikiCategories } from "@/lib/wiki"
import { ArrowRight, Book, Settings, Users, Wrench, Map, HelpCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Comprehensive documentation for Coco, the AI-powered git assistant. Learn about installation, configuration, team collaboration, and advanced features.",
  alternates: {
    canonical: `${siteConfig.url}/docs`,
  },
  openGraph: {
    title: "Documentation | Coco",
    description:
      "Comprehensive documentation for Coco, the AI-powered git assistant. Learn about installation, configuration, team collaboration, and advanced features.",
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
}

export default function DocsPage() {
  const categories = getWikiCategories()

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Learn how to use Coco to generate intelligent commit messages, create
          changelogs, and automate your git workflow with AI.
        </p>
      </div>

      {/* Quick Start Card */}
      <Link
        href="/docs/getting-started"
        className="group block p-6 rounded-lg border-2 border-oxley-200 bg-oxley-50/50 hover:border-oxley-400 hover:bg-oxley-100/50 transition-colors dark:border-oxley-800 dark:bg-oxley-950/30 dark:hover:border-oxley-600"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-oxley-700 dark:text-oxley-300">
              Quick Start Guide
            </h2>
            <p className="text-muted-foreground">
              New to Coco? Start here for a complete walkthrough from
              installation to your first AI-generated commit.
            </p>
          </div>
          <ArrowRight className="h-6 w-6 text-oxley-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Category Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = categoryIcons[category.name] || Book
          return (
            <div
              key={category.name}
              className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-oxley-100 dark:bg-oxley-900">
                  <Icon className="h-5 w-5 text-oxley-600 dark:text-oxley-400" />
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/docs/${page.slug}`}
                      className="group flex items-center text-muted-foreground hover:text-oxley-600 dark:hover:text-oxley-400 transition-colors"
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
      <div className="pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/gfargo/coco"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md border hover:bg-muted transition-colors text-sm"
          >
            GitHub Repository
          </a>
          <a
            href="https://discord.gg/KGu9nE9Ejx"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md border hover:bg-muted transition-colors text-sm"
          >
            Discord Community
          </a>
          <a
            href="https://github.com/gfargo/coco/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md border hover:bg-muted transition-colors text-sm"
          >
            GitHub Discussions
          </a>
        </div>
      </div>
    </div>
  )
}
