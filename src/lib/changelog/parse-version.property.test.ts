import fc from 'fast-check'
import { parseVersionFromFilename } from './parse-version'

/**
 * Feature: www-site-redesign, Property 3: Changelog version extraction round-trip
 *
 * Validates: Requirements 4.2
 *
 * Generator strategy: three non-negative integers (major, minor, patch) joined
 * with dots to form a valid semver string. Construct the filename
 * `RELEASE_NOTES_{major}.{minor}.{patch}.md`, parse back with
 * `parseVersionFromFilename`, and assert equality with the original version.
 */

const semverVersion = fc
  .tuple(fc.nat({ max: 999 }), fc.nat({ max: 999 }), fc.nat({ max: 999 }))
  .map(([major, minor, patch]) => `${major}.${minor}.${patch}`)

describe('Feature: www-site-redesign, Property 3: Changelog version extraction round-trip', () => {
  it('round-trips: constructing a filename from a version and parsing it back yields the original version', () => {
    fc.assert(
      fc.property(semverVersion, (version) => {
        const filename = `RELEASE_NOTES_${version}.md`
        const parsed = parseVersionFromFilename(filename)
        expect(parsed).toBe(version)
      }),
      { numRuns: 100 },
    )
  })
})
