import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 bg-brand text-white drop-shadow">
      <nav className="mx-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xl hover:text-secondary transition-all"
          href="https://github.com/gfargo/coco/"
        >
          <GitHubLogoIcon className="w-8 h-8" />
        </Link>
      </nav>
    </footer>
  )
}
