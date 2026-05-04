import fs from 'fs'
import path from 'path'

import type { ChangelogEntry } from './types'

/**
 * Reads the pre-generated changelog data from `public/changelog.json`.
 *
 * This runs at build time during Next.js static generation (called from
 * server components or `generateStaticParams`). It uses `fs.readFileSync`
 * because the file is a local build artifact, not a runtime fetch target.
 *
 * Returns an empty array when the file is missing or unparseable so the
 * changelog page can render a graceful empty state.
 */
export function getChangelog(): ChangelogEntry[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'changelog.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as ChangelogEntry[]
  } catch {
    return []
  }
}
