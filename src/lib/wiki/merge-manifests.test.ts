import { mergeManifests } from './merge-manifests'
import { type WikiPage } from './wiki-manifest'

const manual: WikiPage[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    wikiPath: 'Getting-Started',
    category: 'Getting Started',
    order: 1,
    description: 'Installation guide',
  },
  {
    slug: 'configuration',
    title: 'Configuration Overview',
    wikiPath: 'Config-Overview',
    category: 'Configuration',
    order: 1,
  },
]

const discovered: WikiPage[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    wikiPath: 'Getting-Started',
    category: 'Uncategorized',
    order: 100,
    isAutoDiscovered: true,
  },
  {
    slug: 'coco-ui',
    title: 'Coco UI',
    wikiPath: 'Coco-UI',
    category: 'Uncategorized',
    order: 100,
    isAutoDiscovered: true,
  },
  {
    slug: 'tui-navigation',
    title: 'TUI Navigation',
    wikiPath: 'TUI-Navigation',
    category: 'Uncategorized',
    order: 100,
    isAutoDiscovered: true,
  },
]

describe('mergeManifests', () => {
  it('returns all manual entries unchanged', () => {
    const result = mergeManifests(manual, discovered)

    expect(result[0]).toEqual(manual[0])
    expect(result[1]).toEqual(manual[1])
  })

  it('appends auto-discovered pages that have no matching wikiPath', () => {
    const result = mergeManifests(manual, discovered)

    const slugs = result.map((p) => p.slug)
    expect(slugs).toContain('coco-ui')
    expect(slugs).toContain('tui-navigation')
  })

  it('excludes auto-discovered pages whose wikiPath matches a manual entry', () => {
    const result = mergeManifests(manual, discovered)

    const discoveredInResult = result.filter((p) => p.isAutoDiscovered)
    const discoveredPaths = discoveredInResult.map((p) => p.wikiPath)
    expect(discoveredPaths).not.toContain('Getting-Started')
  })

  it('produces no duplicate wikiPaths', () => {
    const result = mergeManifests(manual, discovered)

    const paths = result.map((p) => p.wikiPath)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('total count equals manual + non-overlapping discovered', () => {
    const result = mergeManifests(manual, discovered)

    // 2 manual + 2 non-overlapping discovered (Coco-UI, TUI-Navigation)
    expect(result).toHaveLength(4)
  })

  it('places manual entries before auto-discovered entries', () => {
    const result = mergeManifests(manual, discovered)

    const manualSlugs = manual.map((p) => p.slug)
    const firstManualIdx = result.findIndex((p) => manualSlugs.includes(p.slug))
    const firstDiscoveredIdx = result.findIndex((p) => p.isAutoDiscovered)

    expect(firstManualIdx).toBeLessThan(firstDiscoveredIdx)
  })

  it('returns only manual entries when discovered is empty', () => {
    const result = mergeManifests(manual, [])
    expect(result).toEqual(manual)
  })

  it('returns only discovered entries when manual is empty', () => {
    const result = mergeManifests([], discovered)
    expect(result).toEqual(discovered)
  })

  it('returns empty array when both inputs are empty', () => {
    const result = mergeManifests([], [])
    expect(result).toEqual([])
  })

  it('preserves isAutoDiscovered flag on appended pages', () => {
    const result = mergeManifests(manual, discovered)

    const cocoUi = result.find((p) => p.slug === 'coco-ui')
    expect(cocoUi?.isAutoDiscovered).toBe(true)
  })
})
