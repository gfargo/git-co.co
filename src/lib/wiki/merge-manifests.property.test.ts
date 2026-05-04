import fc from 'fast-check'
import { mergeManifests } from './merge-manifests'
import { type WikiPage } from './wiki-manifest'

/**
 * Feature: www-site-redesign, Property 2: Manifest merge preserves manual entries and assigns defaults to auto-discovered pages
 *
 * Validates: Requirements 6.4, 6.5
 *
 * Generator strategy: produce two arrays of WikiPage objects — manual and discovered —
 * where each array has unique wikiPath values internally. Some discovered pages share
 * wikiPath values with manual entries (overlapping) and some do not (non-overlapping).
 * Manual pages never set isAutoDiscovered; discovered pages always set it to true.
 */

const wikiPathChar = fc.constantFrom(
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'.split(''),
)

const wikiPath = fc
  .array(wikiPathChar, { minLength: 1, maxLength: 30 })
  .map((chars) => chars.join(''))

const wikiPageFields = fc.record({
  slug: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
  title: fc.string({ minLength: 1, maxLength: 40 }).filter((s) => s.trim().length > 0),
  category: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
  order: fc.nat({ max: 1000 }),
  description: fc.option(fc.string({ minLength: 1, maxLength: 60 }), { nil: undefined }),
})

/**
 * Generate a pair of (manual, discovered) WikiPage arrays where:
 * - manual pages have unique wikiPath values
 * - discovered pages have unique wikiPath values with isAutoDiscovered: true
 * - some discovered wikiPaths overlap with manual entries, some don't
 */
const manifestPair = fc
  .uniqueArray(wikiPath, { minLength: 0, maxLength: 10, comparator: (a, b) => a === b })
  .chain((allPaths) => {
    // Split paths into three groups: manual-only, shared (overlap), discovered-only
    const splitPoint1 = Math.floor(allPaths.length / 3)
    const splitPoint2 = Math.floor((allPaths.length * 2) / 3)
    const manualOnlyPaths = allPaths.slice(0, splitPoint1)
    const sharedPaths = allPaths.slice(splitPoint1, splitPoint2)
    const discoveredOnlyPaths = allPaths.slice(splitPoint2)

    const manualPaths = [...manualOnlyPaths, ...sharedPaths]
    const discoveredPaths = [...sharedPaths, ...discoveredOnlyPaths]

    const manualPages =
      manualPaths.length > 0
        ? fc
            .tuple(...manualPaths.map((wp) => wikiPageFields.map((f) => ({ ...f, wikiPath: wp }))))
            .map((pages) => pages as WikiPage[])
        : fc.constant([] as WikiPage[])

    const discoveredPages =
      discoveredPaths.length > 0
        ? fc
            .tuple(
              ...discoveredPaths.map((wp) =>
                wikiPageFields.map((f) => ({ ...f, wikiPath: wp, isAutoDiscovered: true as const })),
              ),
            )
            .map((pages) => pages as WikiPage[])
        : fc.constant([] as WikiPage[])

    return fc.tuple(manualPages, discoveredPages)
  })
  .map(([manual, discovered]) => ({ manual, discovered }))

describe('Feature: www-site-redesign, Property 2: Manifest merge preserves manual entries and assigns defaults to auto-discovered pages', () => {
  it('(a) every manual entry appears exactly once with all original fields unchanged', () => {
    fc.assert(
      fc.property(manifestPair, ({ manual, discovered }) => {
        const result = mergeManifests(manual, discovered)

        for (const manualPage of manual) {
          const matches = result.filter((p) => p.wikiPath === manualPage.wikiPath)
          expect(matches).toHaveLength(1)
          expect(matches[0]).toEqual(manualPage)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('(b) every auto-discovered page whose wikiPath does not match any manual entry appears exactly once', () => {
    fc.assert(
      fc.property(manifestPair, ({ manual, discovered }) => {
        const result = mergeManifests(manual, discovered)
        const manualPathSet = new Set(manual.map((p) => p.wikiPath))

        const nonOverlapping = discovered.filter((dp) => !manualPathSet.has(dp.wikiPath))
        for (const page of nonOverlapping) {
          const matches = result.filter((p) => p.wikiPath === page.wikiPath)
          expect(matches).toHaveLength(1)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('(c) no auto-discovered page whose wikiPath matches a manual entry appears in the output', () => {
    fc.assert(
      fc.property(manifestPair, ({ manual, discovered }) => {
        const result = mergeManifests(manual, discovered)
        const manualPathSet = new Set(manual.map((p) => p.wikiPath))

        const overlapping = discovered.filter((dp) => manualPathSet.has(dp.wikiPath))
        for (const page of overlapping) {
          const discoveredInResult = result.filter(
            (p) => p.wikiPath === page.wikiPath && p.isAutoDiscovered === true,
          )
          expect(discoveredInResult).toHaveLength(0)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('(d) total count equals manual entries + non-overlapping discovered entries', () => {
    fc.assert(
      fc.property(manifestPair, ({ manual, discovered }) => {
        const result = mergeManifests(manual, discovered)
        const manualPathSet = new Set(manual.map((p) => p.wikiPath))

        const nonOverlappingCount = discovered.filter(
          (dp) => !manualPathSet.has(dp.wikiPath),
        ).length

        expect(result).toHaveLength(manual.length + nonOverlappingCount)
      }),
      { numRuns: 100 },
    )
  })
})
