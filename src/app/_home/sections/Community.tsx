"use client"

import { Section } from "@/components/Section"
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { BugIcon, CircleDotIcon, MessagesSquareIcon } from "lucide-react"
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
    <Section
      id="community"
      className="text-white md:pb-12 lg:pb-12 bg-gradient-to-t from-primary to-[#3d6455] "
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-6 gap-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center drop-shadow-sm">
            community
          </h2>
          <p className=" md:text-xl text-center max-w-lg font-extralight">
            Drop us a line on{" "}
            <Link
              href={siteConfig.links.discord}
              onClick={() => handleLinkClick("Discord", "inline-text")}
            >
              <DiscordLogoIcon className="inline h-5 w-5 mx-1" />
            </Link>{" "}
            or open an issue on{" "}
            <Link
              href={siteConfig.links.github}
              onClick={() => handleLinkClick("GitHub", "inline-text")}
            >
              <GitHubLogoIcon className="inline h-5 w-5 mx-1" />
            </Link>
            <br />
            We&apos;re always open to feedback and suggestions!
          </p>

          <div className="flex flex-row gap-4">
            <Link
              className="flex cursor-pointer h-9 items-center justify-center rounded-md bg-[#f5f8f7] px-4 py-2 text-sm font-medium text-secondary shadow transition-colors hover:bg-[#f5f8f7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href={siteConfig.links.discord}
              onClick={() => handleLinkClick("Discord", "button")}
              aria-label="Join Discord community"
            >
              <DiscordLogoIcon className="h-5 w-5" />
            </Link>
            <Link
              className="flex cursor-pointer h-9 items-center justify-center rounded-md bg-[#f5f8f7] px-4 py-2 text-sm font-medium text-secondary shadow transition-colors hover:bg-[#f5f8f7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href={siteConfig.links.discussions}
              onClick={() => handleLinkClick("GitHub", "discussions-button")}
              aria-label="View GitHub discussions"
            >
              <MessagesSquareIcon className="h-5 w-5" />
            </Link>
            <Link
              className="flex cursor-pointer h-9 items-center justify-center rounded-md bg-[#f5f8f7] px-4 py-2 text-sm font-medium text-secondary shadow transition-colors hover:bg-[#f5f8f7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href={siteConfig.links.issues}
              onClick={() => handleLinkClick("GitHub", "bug-report-button")}
              aria-label="Report a bug on GitHub"
            >
              <BugIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
