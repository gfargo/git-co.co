import { parseVersionFromFilename } from './parse-version'

describe('parseVersionFromFilename', () => {
  it('extracts version from a standard release notes filename', () => {
    expect(parseVersionFromFilename('RELEASE_NOTES_0.41.0.md')).toBe('0.41.0')
  })

  it('extracts version from an older release', () => {
    expect(parseVersionFromFilename('RELEASE_NOTES_0.38.0.md')).toBe('0.38.0')
  })

  it('handles major versions', () => {
    expect(parseVersionFromFilename('RELEASE_NOTES_1.0.0.md')).toBe('1.0.0')
  })

  it('handles large version numbers', () => {
    expect(parseVersionFromFilename('RELEASE_NOTES_12.345.678.md')).toBe('12.345.678')
  })

  it('throws for a filename without the expected pattern', () => {
    expect(() => parseVersionFromFilename('README.md')).toThrow(
      'Cannot parse version from filename'
    )
  })

  it('throws for a filename with pre-release suffix', () => {
    expect(() => parseVersionFromFilename('RELEASE_NOTES_0.41.0-beta.1.md')).toThrow(
      'Cannot parse version from filename'
    )
  })

  it('throws for an empty string', () => {
    expect(() => parseVersionFromFilename('')).toThrow('Cannot parse version from filename')
  })
})
