import { Metadata } from "next"
import { notFound } from "next/navigation"
import { DocsContent, DocsNavigation } from "@/components/docs"
import { fetchWikiPageBySlug, getAllWikiSlugs, getWikiPage } from "@/lib/wiki"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface DocPageProps {
  params: Promise<{ slug: string }>
}

// Returns slugs from the merged manifest (manual + auto-discovered)
export async function generateStaticParams() {
  const slugs = getAllWikiSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Works for both manual and auto-discovered pages — auto-discovered pages
// use a derived title and a generated description fallback
export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getWikiPage(slug)

  if (!page) {
    return { title: "Not Found" }
  }

  const pageUrl = `${siteConfig.url}/docs/${slug}`
  const description =
    page.description ||
    `${page.title} — documentation for Coco, the AI-powered Git toolbelt.`

  return {
    title: page.title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      title: `${page.title} | Coco Documentation`,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1280,
          height: 640,
          alt: `${page.title} - Coco Documentation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | Coco Docs`,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
    },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const result = await fetchWikiPageBySlug(slug)

  if (!result) {
    notFound()
  }

  const { page, content } = result

  const description =
    page.description ||
    `${page.title} — documentation for Coco, the AI-powered Git toolbelt.`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description,
    url: `${siteConfig.url}/docs/${page.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "TechArticle",
      name: "Coco Documentation",
      url: `${siteConfig.url}/docs`,
    },
  }

  return (
    <div className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-6">
        <Link
          href="/docs"
          className="hover:text-terminal-green transition-colors"
        >
          Docs
        </Link>
        <span className="text-[hsl(var(--text-tertiary))]">/</span>
        {page.category && page.category !== "Uncategorized" && (
          <>
            <span className="text-[hsl(var(--text-secondary))]">
              {page.category}
            </span>
            <span className="text-[hsl(var(--text-tertiary))]">/</span>
          </>
        )}
        <span className="text-foreground">{page.title}</span>
      </nav>

      {/* Edit on GitHub link + auto-discovered badge */}
      <div className="flex items-center justify-end gap-3 mb-4">
        {page.isAutoDiscovered && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded border border-[hsl(var(--border-accent))] text-terminal-green bg-[hsl(var(--bg-elevated))]">
            auto-discovered
          </span>
        )}
        <a
          href={`https://github.com/gfargo/coco/wiki/${page.wikiPath}/_edit`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-terminal-green transition-colors"
        >
          Edit on GitHub
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Main Content */}
      <DocsContent content={content} page={page} />

      {/* Previous/Next Navigation */}
      <DocsNavigation currentSlug={slug} />
    </div>
  )
}
