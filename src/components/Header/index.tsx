"use client"

import { GithubIcon, MenuIcon, PackageIcon, TerminalIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "../ui/tooltip"
import { TrackedLink } from "../TrackedLink"
import { siteConfig } from "@/config/site"

interface NavLink {
  href: string
  label: string
  matchHash?: boolean
}

const navLinks: NavLink[] = [
  { href: "/docs", label: "docs" },
  { href: "/#features", label: "features", matchHash: true },
  { href: "/workstation", label: "workstation" },
  { href: "/changelog", label: "changelog" },
  { href: "/#install", label: "install", matchHash: true },
]

export const Header: React.FC = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = useCallback(
    (href: string, matchHash?: boolean) => {
      if (matchHash) return false
      if (href === "/") return pathname === "/"
      return pathname.startsWith(href)
    },
    [pathname]
  )

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <Link
          className="flex items-center gap-2 rounded-md font-mono text-sm font-medium text-foreground transition-colors hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href="/"
        >
          <TerminalIcon className="h-4 w-4 text-terminal-green" />
          <span className="hidden sm:inline">git-coco</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label, matchHash }) => (
            <Link
              key={href}
              className={`rounded-md px-3 py-1.5 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive(href, matchHash)
                  ? "text-terminal-green"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              href={href}
            >
              {label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-1 border-l border-border pl-3">
            <TooltipProvider delayDuration={125}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TrackedLink
                    eventName="NPM Link"
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href={siteConfig.links.npm}
                    target="_blank"
                  >
                    <PackageIcon className="h-4 w-4" />
                    <span className="sr-only">npm</span>
                  </TrackedLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>npm</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TrackedLink
                    eventName="GitHub Link"
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href={siteConfig.links.github}
                    target="_blank"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </TrackedLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="ml-auto rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <nav
            className="relative z-10 border-b border-border bg-background px-6 pb-6 pt-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label, matchHash }) => (
                <Link
                  key={href}
                  className={`rounded-md px-3 py-2.5 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive(href, matchHash)
                      ? "bg-bg-elevated text-terminal-green"
                      : "text-muted-foreground hover:bg-bg-elevated hover:text-foreground"
                  }`}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <TrackedLink
                eventName="NPM Link"
                className="flex items-center gap-2 rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href={siteConfig.links.npm}
                target="_blank"
                onClick={() => setMobileOpen(false)}
              >
                <PackageIcon className="h-4 w-4" />
                npm
              </TrackedLink>
              <TrackedLink
                eventName="GitHub Link"
                className="flex items-center gap-2 rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href={siteConfig.links.github}
                target="_blank"
                onClick={() => setMobileOpen(false)}
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </TrackedLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
