import { Metadata } from "next"
import { ExternalLinkIcon } from "lucide-react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { TerminalAtmosphere } from "@/components/TerminalAtmosphere"
import { siteConfig } from "@/config/site"
import { getChangelog } from "@/lib/changelog"
import { ChangelogSearch } from "./ChangelogSearch"

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

export function generateMetadata(): Metadata {
  const title = "Changelog — Release History"
  const description =
    "Release history and highlights for coco, the AI-powered Git toolbelt. See what changed in every version — new features, fixes, and improvements."

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}/changelog`,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1280,
          height: 640,
          alt: "Coco Changelog — Release History",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Page Component (Server Component)                                  */
/* ------------------------------------------------------------------ */

export default function ChangelogPage() {
  const changelog = getChangelog()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Header />
      <main className="w-full flex-1 pb-2 overflow-hidden">
        {/* ============================================================ */}
        {/*  HERO                                                        */}
        {/* ============================================================ */}
        <Section id="changelog-hero" className="relative overflow-hidden md:py-20 lg:py-28">
          <TerminalAtmosphere variant="page" />

          <div className="container relative z-10">
            <SectionHeader
              prompt="~/coco $ changelog"
              title="Changelog"
              subtitle="Release history and highlights. See what changed in every version."
            />
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  RELEASE ENTRIES                                             */}
        {/* ============================================================ */}
        <Section id="releases" variant="elevated" className="py-10 md:py-16 lg:py-20">
          <div className="container">
            {changelog.length === 0 ? (
              <EmptyState />
            ) : (
              <ChangelogSearch entries={changelog} />
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                        */
/* ------------------------------------------------------------------ */

function EmptyState() {
  return (
    <div className="mx-auto max-w-lg rounded-lg border border-border bg-bg-elevated p-8 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        No releases found.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Check back soon, or view releases directly on GitHub.
      </p>
      <a
        href="https://github.com/gfargo/coco/releases"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        View releases on GitHub
        <ExternalLinkIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
