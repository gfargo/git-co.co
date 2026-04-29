"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getWikiCategories, type WikiCategory } from "@/lib/wiki"
import { ChevronRight, Book, Menu, X } from "lucide-react"
import { useState } from "react"

interface DocsSidebarProps {
  className?: string
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname()
  const categories = getWikiCategories()

  return (
    <nav className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2 px-2">
        <Book className="h-5 w-5 text-oxley-500" />
        <Link href="/docs" className="font-semibold text-foreground">
          Documentation
        </Link>
      </div>
      <div className="space-y-4">
        {categories.map((category) => (
          <SidebarCategory
            key={category.name}
            category={category}
            currentPath={pathname}
          />
        ))}
      </div>
    </nav>
  )
}

function SidebarCategory({
  category,
  currentPath,
}: {
  category: WikiCategory
  currentPath: string
}) {
  const hasActivePage = category.pages.some(
    (page) => `/docs/${page.slug}` === currentPath
  )

  return (
    <div className="space-y-1">
      <h4 className="px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {category.name}
      </h4>
      <ul className="space-y-0.5">
        {category.pages.map((page) => {
          const isActive = `/docs/${page.slug}` === currentPath
          return (
            <li key={page.slug}>
              <Link
                href={`/docs/${page.slug}`}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-oxley-100 text-oxley-700 font-medium dark:bg-oxley-900 dark:text-oxley-100"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {isActive && (
                  <ChevronRight className="h-3 w-3 shrink-0" />
                )}
                <span className={cn(!isActive && "ml-5")}>{page.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Mobile sidebar with toggle
export function MobileDocsSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-oxley-500 text-white p-3 rounded-full shadow-lg hover:bg-oxley-600 transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Documentation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <DocsSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
