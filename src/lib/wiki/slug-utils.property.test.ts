import fc from 'fast-check'
import { deriveSlugFromFilename } from './slug-utils'

/**
 * Feature: www-site-redesign, Property 1: Wiki slug derivation produces valid kebab-case
 *
 * Validates: Requirements 6.2, 6.3
 *
 * Generator strategy: strings matching [A-Z][a-zA-Z0-9&-]+\.md — start with an
 * uppercase letter, followed by one or more alphanumeric chars / ampersands / hyphens,
 * ending with `.md`.
 */

const wikiFilename = fc
  .tuple(
    fc.constantFrom(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')),
    fc
      .array(
        fc.constantFrom(
          ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&-'.split(''),
        ),
        { minLength: 1, maxLength: 60 },
      )
      .map((chars) => chars.join('')),
  )
  .map(([first, rest]) => `${first}${rest}.md`)

describe('Feature: www-site-redesign, Property 1: Wiki slug derivation produces valid kebab-case', () => {
  it('produces entirely lowercase slugs', () => {
    fc.assert(
      fc.property(wikiFilename, (filename) => {
        const slug = deriveSlugFromFilename(filename)
        expect(slug).toBe(slug.toLowerCase())
      }),
      { numRuns: 100 },
    )
  })

  it('contains only alphanumeric characters and hyphens', () => {
    fc.assert(
      fc.property(wikiFilename, (filename) => {
        const slug = deriveSlugFromFilename(filename)
        expect(slug).toMatch(/^[a-z0-9-]*$/)
      }),
      { numRuns: 100 },
    )
  })

  it('does not start or end with a hyphen', () => {
    fc.assert(
      fc.property(wikiFilename, (filename) => {
        const slug = deriveSlugFromFilename(filename)
        if (slug.length > 0) {
          expect(slug[0]).not.toBe('-')
          expect(slug[slug.length - 1]).not.toBe('-')
        }
      }),
      { numRuns: 100 },
    )
  })

  it('contains no consecutive hyphens', () => {
    fc.assert(
      fc.property(wikiFilename, (filename) => {
        const slug = deriveSlugFromFilename(filename)
        expect(slug).not.toMatch(/--/)
      }),
      { numRuns: 100 },
    )
  })

  it('is deterministic — same input always produces same output', () => {
    fc.assert(
      fc.property(wikiFilename, (filename) => {
        const first = deriveSlugFromFilename(filename)
        const second = deriveSlugFromFilename(filename)
        expect(first).toBe(second)
      }),
      { numRuns: 100 },
    )
  })
})
