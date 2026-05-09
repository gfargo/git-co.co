/**
 * Extracts a semver version string from a release-notes filename.
 *
 * Expects the pattern `RELEASE_NOTES_X.Y.Z.md` where X, Y, and Z are
 * non-negative integers. Returns the `X.Y.Z` portion.
 *
 * @example
 * parseVersionFromFilename('RELEASE_NOTES_0.41.0.md') // → '0.41.0'
 * parseVersionFromFilename('RELEASE_NOTES_0.38.0.md') // → '0.38.0'
 *
 * @throws {Error} If the filename does not match the expected pattern.
 */
export function parseVersionFromFilename(filename: string): string {
  const match = filename.match(/^RELEASE_NOTES_(\d+\.\d+\.\d+)\.md$/)
  if (!match?.[1]) {
    throw new Error(`Cannot parse version from filename: ${filename}`)
  }
  return match[1]
}
