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

export async function generateStaticParams() {
  const slugs = getAllWikiSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getWikiPage(slug)

  if (!page) {
    return { title: "Not Found" }
  }

  const pageUrl = `${siteConfig.url}/docs/${slug}`
  const description = page.description || `Documentation for ${page.title} in Coco, the AI-powered git assistant.`

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": page.title,
    "description": page.description || `Documentation for ${page.title}`,
    "url": `${siteConfig.url}/docs/${page.slug}`,
    "author": {
      "@type": "Person",
      "name": siteConfig.author.name,
      "url": siteConfig.author.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
    },
    "isPartOf": {
      "@type": "TechArticle",
      "name": "Coco Documentation",
      "url": `${siteConfig.url}/docs`,
    },
  }

  return (
    <div className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-foreground">{page.title}</span>
      </nav>

      {/* Edit on GitHub link */}
      <div className="flex justify-end mb-4">
        <a
          href={`https://github.com/gfargo/coco/wiki/${page.wikiPath}/_edit`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
