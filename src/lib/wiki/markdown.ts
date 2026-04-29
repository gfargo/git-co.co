import { wikiManifest } from "./wiki-manifest"

/**
 * Transform wiki-style links to internal docs routes.
 * Converts links like [text](https://github.com/gfargo/coco/wiki/Page-Name)
 * to [text](/docs/slug)
 */
export function transformWikiLinks(markdown: string): string {
  // Pattern to match GitHub wiki links
  const wikiLinkPattern =
    /\[([^\]]+)\]\(https:\/\/github\.com\/gfargo\/coco\/wiki\/([^)]+)\)/g

  return markdown.replace(wikiLinkPattern, (match, text: string, wikiPath: string) => {
    // Find the page in our manifest by wikiPath
    const page = wikiManifest.find(
      (p) =>
        p.wikiPath === wikiPath ||
        p.wikiPath === decodeURIComponent(wikiPath) ||
        p.wikiPath.toLowerCase() === wikiPath.toLowerCase()
    )

    if (page) {
      return `[${text}](/docs/${page.slug})`
    }

    // If not found in manifest, keep original link to GitHub wiki
    return match
  })
}

/**
 * Remove emoji prefixes from headings if desired.
 * Can be toggled on/off based on preference.
 */
export function cleanHeadings(markdown: string): string {
  // Remove emoji at the start of headings
  // Matches: ## 🚀 Title -> ## Title
  return markdown.replace(/^(#{1,6})\s*[\u{1F300}-\u{1F9FF}]+\s*/gmu, "$1 ")
}

/**
 * Process markdown content for display on the site.
 */
export function processMarkdown(
  markdown: string,
  options: { transformLinks?: boolean; cleanEmoji?: boolean } = {}
): string {
  const { transformLinks = true, cleanEmoji = false } = options

  let processed = markdown

  if (transformLinks) {
    processed = transformWikiLinks(processed)
  }

  if (cleanEmoji) {
    processed = cleanHeadings(processed)
  }

  return processed
}

/**
 * Extract the first heading from markdown content.
 */
export function extractTitle(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? (match[1]?.trim() ?? null) : null
}

/**
 * Extract a description/excerpt from markdown content.
 * Takes the first paragraph after any headings.
 */
export function extractExcerpt(markdown: string, maxLength = 160): string {
  // Remove headings and find first paragraph
  const lines = markdown.split("\n")
  let excerpt = ""

  for (const line of lines) {
    const trimmed = line.trim()
    // Skip empty lines and headings
    if (!trimmed || trimmed.startsWith("#")) continue
    // Skip code blocks
    if (trimmed.startsWith("```")) continue
    // Skip links that are just images
    if (trimmed.startsWith("![")) continue

    excerpt = trimmed
    break
  }

  if (excerpt.length > maxLength) {
    return excerpt.slice(0, maxLength - 3) + "..."
  }

  return excerpt
}
