import { Section } from "@/components/Section"
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { BugIcon, CircleDotIcon, MessagesSquareIcon } from "lucide-react"
import Link from "next/link"

export const CommunitySection = () => {
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
            <Link href="https://discord.gg/KGu9nE9Ejx">
              <DiscordLogoIcon className="inline h-5 w-5 mx-1" />
            </Link>{" "}
            or open an issue on{" "}
            <Link href="https://github.com/gfargo/coco">
              <GitHubLogoIcon className="inline h-5 w-5 mx-1" />
            </Link>
            <br />
            We&apos;re always open to feedback and suggestions!
          </p>

          <div className="flex flex-row gap-4">
            <Link
              className="flex cursor-pointer h-9 items-center justify-center rounded-md bg-[#f5f8f7] px-4 py-2 text-sm font-medium text-secondary shadow transition-colors hover:bg-[#f5f8f7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="https://discord.gg/KGu9nE9Ejx"
            >
              <DiscordLogoIcon className="h-5 w-5" />
            </Link>
            <Link
              className="flex cursor-pointer h-9 items-center justify-center rounded-md bg-[#f5f8f7] px-4 py-2 text-sm font-medium text-secondary shadow transition-colors hover:bg-[#f5f8f7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="https://github.com/gfargo/coco/discussions"
            >
              <MessagesSquareIcon className="h-5 w-5" />
            </Link>
            <Link
              className="flex cursor-pointer h-9 items-center justify-center rounded-md bg-[#f5f8f7] px-4 py-2 text-sm font-medium text-secondary shadow transition-colors hover:bg-[#f5f8f7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="https://github.com/gfargo/coco/issues/new"
            >
              <BugIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
