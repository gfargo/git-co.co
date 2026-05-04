import {
    GithubIcon,
    MessageCircleIcon,
    PackageIcon,
    TerminalIcon
} from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

const productLinks = [
  { href: "/", label: "Homepage" },
  { href: "/workstation", label: "Workstation" },
  { href: "/changelog", label: "Changelog" },
] as const

const resourceLinks = [
  { href: "/docs", label: "Docs", external: false },
  { href: siteConfig.links.github, label: "GitHub", external: true },
  { href: siteConfig.links.npm, label: "npm", external: true },
] as const

const communityLinks = [
  { href: siteConfig.links.discord, label: "Discord", external: true },
  { href: siteConfig.links.discussions, label: "Discussions", external: true },
  { href: siteConfig.links.issues, label: "Issues", external: true },
] as const

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string
  label: string
  external?: boolean
}) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"

  if (external) {
    return (
      <li>
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      </li>
    )
  }

  return (
    <li>
      <Link href={href} className={className}>
        {label}
      </Link>
    </li>
  )
}

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12 md:py-16">
        {/* Top section: logo + columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md font-mono text-sm font-medium text-foreground transition-colors hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <TerminalIcon className="h-4 w-4 text-terminal-green" />
              git-coco
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              AI-powered Git tools for developers who live in the terminal.
            </p>
          </div>

          {/* Product */}
          <FooterColumn title="Product">
            {productLinks.map(({ href, label }) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title="Resources">
            {resourceLinks.map(({ href, label, external }) => (
              <FooterLink
                key={href}
                href={href}
                label={label}
                external={external}
              />
            ))}
          </FooterColumn>

          {/* Community */}
          <FooterColumn title="Community">
            {communityLinks.map(({ href, label, external }) => (
              <FooterLink
                key={href}
                href={href}
                label={label}
                external={external}
              />
            ))}
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Coco. MIT License.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Discord"
            >
              <MessageCircleIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="npm"
            >
              <PackageIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
