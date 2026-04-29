export type WikiPage = {
  slug: string
  title: string
  wikiPath: string
  category: string
  order: number
  description?: string
}

export type WikiCategory = {
  name: string
  order: number
  pages: WikiPage[]
}

export const wikiManifest: WikiPage[] = [
  // Getting Started
  {
    slug: "getting-started",
    title: "Getting Started",
    wikiPath: "Getting-Started",
    category: "Getting Started",
    order: 1,
    description: "Installation, setup, and your first AI-generated commit",
  },

  // Configuration
  {
    slug: "configuration",
    title: "Configuration Overview",
    wikiPath: "Config-Overview",
    category: "Configuration",
    order: 1,
    description: "Complete configuration reference with all options",
  },
  {
    slug: "ignoring-files",
    title: "Ignoring Files & Extensions",
    wikiPath: "Ignoring-Files-&-Extensions",
    category: "Configuration",
    order: 2,
    description: "Advanced pattern matching and file filtering",
  },
  {
    slug: "using-ollama",
    title: "Using Ollama",
    wikiPath: "Using-Ollama",
    category: "Configuration",
    order: 3,
    description: "Local AI setup for privacy-focused workflows",
  },

  // Team & Enterprise
  {
    slug: "team-collaboration",
    title: "Team Collaboration",
    wikiPath: "Team-Collaboration",
    category: "Team & Enterprise",
    order: 1,
    description: "Shared configurations and enterprise deployment",
  },

  // Advanced Features
  {
    slug: "advanced-usage",
    title: "Advanced Usage",
    wikiPath: "Advanced-Usage",
    category: "Advanced Features",
    order: 1,
    description: "Custom prompts, automation, and optimization",
  },
  {
    slug: "commit-split",
    title: "Commit Split",
    wikiPath: "Commit-Split",
    category: "Advanced Features",
    order: 2,
    description: "Plan smaller commits from broad staged changes",
  },
  {
    slug: "dynamic-model-routing",
    title: "Dynamic Model Routing",
    wikiPath: "Dynamic-Model-Routing",
    category: "Advanced Features",
    order: 3,
    description: "Route tasks to different AI models",
  },
  {
    slug: "ai-call-audit",
    title: "AI Call Audit",
    wikiPath: "AI-Call-Audit",
    category: "Advanced Features",
    order: 4,
    description: "Inventory and track remote AI call paths",
  },
  {
    slug: "command-reliability-audit",
    title: "Command Reliability Audit",
    wikiPath: "Command-Reliability-Audit",
    category: "Advanced Features",
    order: 5,
    description: "Review command coverage and reliability",
  },
  {
    slug: "documentation-workflow",
    title: "Documentation Workflow",
    wikiPath: "Documentation-Workflow",
    category: "Advanced Features",
    order: 6,
    description: "Maintain wiki documentation locally",
  },

  // Product Roadmap
  {
    slug: "merge-conflict-resolution",
    title: "AI-Assisted Merge Conflict Resolution",
    wikiPath: "AI-Assisted-Merge-Conflict-Resolution",
    category: "Roadmap",
    order: 1,
    description: "Upcoming feature for conflict resolution",
  },
  {
    slug: "commit-range-recomposition",
    title: "AI Commit Range Recomposition",
    wikiPath: "AI-Commit-Range-Recomposition",
    category: "Roadmap",
    order: 2,
    description: "Analyze and reorganize commit ranges",
  },
  {
    slug: "worktree-workspaces",
    title: "Worktree & Parallel Agent Workspaces",
    wikiPath: "Worktree-And-Parallel-Agent-Workspaces",
    category: "Roadmap",
    order: 3,
    description: "Manage local worktrees for parallel workflows",
  },

  // Help & Support
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    wikiPath: "Troubleshooting",
    category: "Help & Support",
    order: 1,
    description: "Common issues, solutions, and debugging",
  },
]

// Category ordering for sidebar
export const categoryOrder: Record<string, number> = {
  "Getting Started": 1,
  Configuration: 2,
  "Team & Enterprise": 3,
  "Advanced Features": 4,
  Roadmap: 5,
  "Help & Support": 6,
}

// Get pages grouped by category
export function getWikiCategories(): WikiCategory[] {
  const categoryMap = new Map<string, WikiPage[]>()

  for (const page of wikiManifest) {
    const existing = categoryMap.get(page.category) || []
    existing.push(page)
    categoryMap.set(page.category, existing)
  }

  const categories: WikiCategory[] = []

  for (const [name, pages] of categoryMap) {
    categories.push({
      name,
      order: categoryOrder[name] || 99,
      pages: pages.sort((a, b) => a.order - b.order),
    })
  }

  return categories.sort((a, b) => a.order - b.order)
}

// Get a page by slug
export function getWikiPage(slug: string): WikiPage | undefined {
  return wikiManifest.find((page) => page.slug === slug)
}

// Get all slugs for static generation
export function getAllWikiSlugs(): string[] {
  return wikiManifest.map((page) => page.slug)
}

// Get next and previous pages for navigation
export function getAdjacentPages(slug: string): {
  prev: WikiPage | null
  next: WikiPage | null
} {
  const index = wikiManifest.findIndex((page) => page.slug === slug)

  return {
    prev: index > 0 ? (wikiManifest[index - 1] ?? null) : null,
    next: index < wikiManifest.length - 1 ? (wikiManifest[index + 1] ?? null) : null,
  }
}
