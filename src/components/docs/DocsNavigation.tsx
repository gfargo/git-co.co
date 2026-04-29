import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAdjacentPages } from "@/lib/wiki"
import { cn } from "@/lib/utils"

interface DocsNavigationProps {
  currentSlug: string
  className?: string
}

export function DocsNavigation({ currentSlug, className }: DocsNavigationProps) {
  const { prev, next } = getAdjacentPages(currentSlug)

  if (!prev && !next) return null

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-4 pt-8 mt-8 border-t",
        className
      )}
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col items-start gap-1 p-4 rounded-lg border hover:border-oxley-300 hover:bg-muted/50 transition-colors flex-1"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-oxley-600">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
          <span className="font-medium text-foreground group-hover:text-oxley-700">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end gap-1 p-4 rounded-lg border hover:border-oxley-300 hover:bg-muted/50 transition-colors flex-1 text-right"
        >
          <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-oxley-600">
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="font-medium text-foreground group-hover:text-oxley-700">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
