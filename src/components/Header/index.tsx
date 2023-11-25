import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { GithubIcon, PackageIcon, TerminalIcon } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

export const Header: React.FC = () => {
  return (
    <header className="w-full px-4 lg:px-6 h-14 bg-primary text-white flex items-center">
      <div className="flex items-center container">
        <Link
          className="md:flex items-center justify-center gap-2 hidden"
          href="/"
        >
          <TerminalIcon className="drop-shadow" />
          <span className="sr-only">git coco</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#install"
          >
            install
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#faq"
          >
            faq
          </Link>
          <div className="flex gap-3 drop-shadow-sm">
            <TooltipProvider delayDuration={125}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="https://www.npmjs.com/package/git-coco"
                    target="_blank"
                  >
                    <PackageIcon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Npm</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="https://github.com/gfargo/coco/"
                    target="_blank"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Github</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      </div>
    </header>
  )
}
