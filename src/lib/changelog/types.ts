/**
 * A single release entry fetched from the GitHub Releases API at build time
 * and stored in `public/changelog.json`.
 */
export interface ChangelogEntry {
  /** Semver version string, e.g. "0.41.0" */
  version: string
  /** ISO date string (may be empty when the prebuild cannot determine a date) */
  date: string
  /** H3 headings extracted from the `## Highlights` section */
  highlights: string[]
  /** First paragraph under `## What's Changed` */
  summary: string
  /** Full markdown content of the release notes file */
  body: string
  /** Link to the GitHub release, e.g. "https://github.com/gfargo/coco/releases/tag/0.41.0" */
  githubUrl: string
  /** `true` when the `## Breaking Changes` section contains real content */
  breakingChanges: boolean
}
