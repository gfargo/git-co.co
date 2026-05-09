/**
 * Derives a URL-safe kebab-case slug from a wiki filename.
 *
 * Transformation steps:
 *  1. Strip the `.md` extension
 *  2. Lowercase the entire string
 *  3. Replace every non-alphanumeric character with a hyphen
 *  4. Collapse consecutive hyphens into a single hyphen
 *  5. Trim leading and trailing hyphens
 *
 * @example
 * deriveSlugFromFilename('Coco-UI.md')                    // → 'coco-ui'
 * deriveSlugFromFilename('Ignoring-Files-&-Extensions.md') // → 'ignoring-files-extensions'
 */
export function deriveSlugFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}
