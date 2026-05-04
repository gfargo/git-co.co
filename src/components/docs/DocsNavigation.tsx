import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAdjacentPages } from "@/lib/wiki"
import { cn } from "@/lib/utils"

interface DocsNavigationProps {
  currentSlug: string
  className?: string
}

export function DocsNavigation({
  currentSlug,
  className,
}: DocsNavigationProps) {
  const { prev, next } = getAdjacentPages(currentSlug)

  if (!prev && !next) return null

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-4 pt-8 mt-8 border-t border-[hsl(var(--border-default))]",
        className
      )}
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col items-start gap-1 p-4 rounded-lg border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-secondary))] hover:border-terminal-green-dim hover:bg-[hsl(var(--bg-elevated))] transition-colors flex-1"
        >
          <span className="flex items-center gap-1 text-sm font-mono text-[hsl(var(--text-tertiary))] group-hover:text-terminal-green">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
          <span className="font-medium text-foreground group-hover:text-terminal-green-bright transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end gap-1 p-4 rounded-lg border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-secondary))] hover:border-terminal-green-dim hover:bg-[hsl(var(--bg-elevated))] transition-colors flex-1 text-right"
        >
          <span className="flex items-center gap-1 text-sm font-mono text-[hsl(var(--text-tertiary))] group-hover:text-terminal-green">
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="font-medium text-foreground group-hover:text-terminal-green-bright transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
