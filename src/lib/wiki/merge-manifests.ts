import { type WikiPage } from './wiki-manifest'

/**
 * Merges a manual wiki manifest with auto-discovered pages.
 *
 * Manual entries always win — they appear first, unchanged.
 * Auto-discovered pages whose `wikiPath` matches a manual entry are excluded.
 * Non-overlapping auto-discovered pages are appended after all manual entries.
 */
export function mergeManifests(manual: WikiPage[], discovered: WikiPage[]): WikiPage[] {
  const manualPaths = new Set(manual.map((p) => p.wikiPath))

  const newPages = discovered.filter((dp) => !manualPaths.has(dp.wikiPath))

  return [...manual, ...newPages]
}
