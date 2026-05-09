import { deriveSlugFromFilename } from './slug-utils'

describe('deriveSlugFromFilename', () => {
  it('converts a simple wiki filename to kebab-case', () => {
    expect(deriveSlugFromFilename('Coco-UI.md')).toBe('coco-ui')
  })

  it('handles multi-word filenames', () => {
    expect(deriveSlugFromFilename('Getting-Started.md')).toBe('getting-started')
  })

  it('strips ampersands and collapses resulting hyphens', () => {
    expect(deriveSlugFromFilename('Ignoring-Files-&-Extensions.md')).toBe(
      'ignoring-files-extensions'
    )
  })

  it('lowercases mixed-case acronyms', () => {
    expect(deriveSlugFromFilename('Interactive-Log-TUI.md')).toBe('interactive-log-tui')
  })

  it('handles leading uppercase segments', () => {
    expect(deriveSlugFromFilename('TUI-Navigation.md')).toBe('tui-navigation')
  })

  it('handles filenames without .md extension gracefully', () => {
    expect(deriveSlugFromFilename('Some-Page')).toBe('some-page')
  })

  it('handles filenames with only .md', () => {
    expect(deriveSlugFromFilename('.md')).toBe('')
  })

  it('returns empty string for empty input', () => {
    expect(deriveSlugFromFilename('')).toBe('')
  })

  it('collapses multiple consecutive special characters', () => {
    expect(deriveSlugFromFilename('A--B---C.md')).toBe('a-b-c')
  })

  it('trims leading and trailing hyphens from special-char-heavy names', () => {
    expect(deriveSlugFromFilename('-Leading.md')).toBe('leading')
    expect(deriveSlugFromFilename('Trailing-.md')).toBe('trailing')
  })
})
