import { GithubIcon, PackageIcon, TerminalIcon } from "lucide-react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="w-full px-4 lg:px-6 h-14 bg-primary text-white flex items-center">
      <div className="flex items-center container drop-shadow">
        <Link className="flex items-center justify-center gap-2" href="/">
          <TerminalIcon />
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
          <div className="flex gap-4">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="https://github.com/gfargo/coco/"
            >
              <GithubIcon className="w-5 h-5" />
            </Link>
            
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="https://www.npmjs.com/package/git-coco"
            >
              <PackageIcon className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
