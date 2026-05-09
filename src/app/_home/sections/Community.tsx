"use client"

import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { BugIcon, MessagesSquareIcon } from "lucide-react"
import Link from "next/link"
import { track } from "@vercel/analytics/react"
import { siteConfig } from "@/config/site"

export const CommunitySection = () => {
  const handleLinkClick = (platform: string, type: string) => {
    track("Community Link Click", {
      platform,
      type,
      section: "community"
    })
  }

  return (
    <Section id="community">
      <div className="container px-4 md:px-6">
        <SectionHeader prompt="~/coco $ community" title="Community" />

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-8">
            Drop us a line on Discord or open an issue on GitHub.
            We&apos;re always open to feedback and suggestions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              className="group flex cursor-pointer items-center gap-2 h-10 rounded-md bg-bg-elevated border border-border px-4 py-2 text-sm font-medium text-muted-foreground shadow transition-colors hover:border-terminal-green-dim hover:text-terminal-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href={siteConfig.links.discord}
              onClick={() => handleLinkClick("Discord", "button")}
              aria-label="Join Discord community"
            >
              <DiscordLogoIcon className="h-5 w-5" />
              <span>Discord</span>
            </Link>
            <Link
              className="group flex cursor-pointer items-center gap-2 h-10 rounded-md bg-bg-elevated border border-border px-4 py-2 text-sm font-medium text-muted-foreground shadow transition-colors hover:border-terminal-green-dim hover:text-terminal-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href={siteConfig.links.discussions}
              onClick={() => handleLinkClick("GitHub", "discussions-button")}
              aria-label="View GitHub discussions"
            >
              <MessagesSquareIcon className="h-5 w-5" />
              <span>Discussions</span>
            </Link>
            <Link
              className="group flex cursor-pointer items-center gap-2 h-10 rounded-md bg-bg-elevated border border-border px-4 py-2 text-sm font-medium text-muted-foreground shadow transition-colors hover:border-terminal-green-dim hover:text-terminal-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href={siteConfig.links.issues}
              onClick={() => handleLinkClick("GitHub", "bug-report-button")}
              aria-label="Report a bug on GitHub"
            >
              <BugIcon className="h-5 w-5" />
              <span>Bug Report</span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
