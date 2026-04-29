import { wikiManifest, type WikiPage } from "./wiki-manifest"

const WIKI_BASE_URL = "https://raw.githubusercontent.com/wiki/gfargo/coco"

export async function fetchWikiPage(wikiPath: string): Promise<string | null> {
  try {
    const url = `${WIKI_BASE_URL}/${wikiPath}.md`
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch wiki page: ${wikiPath}`, response.status)
      return null
    }

    return response.text()
  } catch (error) {
    console.error(`Error fetching wiki page: ${wikiPath}`, error)
    return null
  }
}

export async function fetchWikiPageBySlug(
  slug: string
): Promise<{ page: WikiPage; content: string } | null> {
  const page = wikiManifest.find((p) => p.slug === slug)

  if (!page) {
    return null
  }

  const content = await fetchWikiPage(page.wikiPath)

  if (!content) {
    return null
  }

  return { page, content }
}

export async function fetchAllWikiPages(): Promise<
  { page: WikiPage; content: string }[]
> {
  const results = await Promise.all(
    wikiManifest.map(async (page) => {
      const content = await fetchWikiPage(page.wikiPath)
      return content ? { page, content } : null
    })
  )

  return results.filter(
    (result): result is { page: WikiPage; content: string } => result !== null
  )
}
