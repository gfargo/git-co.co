import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const CONFIG = {
  schemaUrl: 'https://raw.githubusercontent.com/gfargo/coco/main/schema.json',
  retryAttempts: 3,
  retryDelay: 1000, // ms
  timeout: 10000, // ms
};

// Convert URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function logSuccess(message) {
  console.log('\x1b[32m✓\x1b[0m', message);
}

function logError(message) {
  console.error('\x1b[31m❌\x1b[0m', message);
}

function logInfo(message) {
  console.log('\x1b[36mℹ\x1b[0m', message);
}

function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    logInfo(`Created directory: ${directory}`);
  }
}

function validateSchema(data) {
  try {
    const schema = JSON.parse(data);
    if (!schema || typeof schema !== 'object') {
      throw new Error('Invalid schema format');
    }
    return true;
  } catch (error) {
    throw new Error(`Schema validation failed: ${error.message}`);
  }
}

async function downloadSchema(url, outputPath, attempt = 1) {
  logInfo(`Downloading schema from: ${url}`);
  
  return /** @type {Promise<void>} */(new Promise((resolve, reject) => {
    const tempPath = `${outputPath}.temp`;
    const fileStream = fs.createWriteStream(tempPath);
    let data = '';

    const request = https.get(url, { timeout: CONFIG.timeout }, (response) => {
      const { statusCode, headers } = response;

      if (statusCode !== 200) {
        fileStream.close();
        fs.unlinkSync(tempPath);
        
        if (statusCode === 404) {
          reject(new Error('Schema not found (404)'));
        } else if (statusCode >= 500 && attempt < CONFIG.retryAttempts) {
          logInfo(`Received ${statusCode}, retrying (${attempt}/${CONFIG.retryAttempts})...`);
          setTimeout(() => {
            downloadSchema(url, outputPath, attempt + 1)
              .then(resolve)
              .catch(reject);
          }, CONFIG.retryDelay);
          return;
        } else {
          reject(new Error(`HTTP Error: ${statusCode}`));
        }
        return;
      }

      logInfo(`Content length: ${headers['content-length'] || 'unknown'} bytes`);

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        
        try {
          validateSchema(data);
          fs.renameSync(tempPath, outputPath);
          logSuccess(`Schema downloaded successfully to: ${outputPath}`);
          resolve();
        } catch (error) {
          fs.unlinkSync(tempPath);
          reject(error);
        }
      });
    });

    request.on('timeout', () => {
      request.destroy();
      fileStream.close();
      fs.unlinkSync(tempPath);
      
      if (attempt < CONFIG.retryAttempts) {
        logInfo(`Request timed out, retrying (${attempt}/${CONFIG.retryAttempts})...`);
        setTimeout(() => {
          downloadSchema(url, outputPath, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.retryDelay);
      } else {
        reject(new Error('Request timed out'));
      }
    });

    request.on('error', (error) => {
      fileStream.close();
      fs.unlinkSync(tempPath);
      
      if (attempt < CONFIG.retryAttempts) {
        logInfo(`Network error, retrying (${attempt}/${CONFIG.retryAttempts})...`);
        setTimeout(() => {
          downloadSchema(url, outputPath, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.retryDelay);
      } else {
        reject(error);
      }
    });

    fileStream.on('error', (error) => {
      fileStream.close();
      fs.unlinkSync(tempPath);
      reject(new Error(`File write error: ${error.message}`));
    });
  }));
}

/**
 * Derives a URL-safe kebab-case slug from a wiki filename.
 *
 * Duplicated from src/lib/wiki/slug-utils.ts because prebuild.mjs
 * is plain Node ESM and cannot import TypeScript directly.
 *
 * Steps: strip .md → lowercase → replace non-alphanumeric with hyphens →
 *        collapse consecutive hyphens → trim leading/trailing hyphens
 */
function deriveSlugFromFilename(filename) {
  return filename
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Derives a human-readable title from a wiki filename.
 *
 * Strips the .md extension, splits on hyphens, and joins with spaces.
 * Preserves the original casing from the filename.
 *
 * Example: "Interactive-Log-TUI.md" → "Interactive Log TUI"
 */
function deriveTitleFromFilename(filename) {
  return filename.replace(/\.md$/i, '').split('-').join(' ')
}

/**
 * Scans the .wiki/ directory for markdown files and writes
 * src/lib/wiki/discovered-pages.ts with auto-discovered WikiPage entries.
 *
 * - Missing .wiki/ directory: logs warning, skips (build continues)
 * - Malformed filenames (no .md, empty name): skipped with warnings
 * - Output is sorted alphabetically by slug for deterministic builds
 */
async function discoverWikiPages() {
  console.log('\n\x1b[1m📖 Wiki Auto-Discovery\x1b[0m\n');

  const wikiDir = path.resolve(__dirname, '..', '.wiki');
  const outputPath = path.join(__dirname, 'src', 'lib', 'wiki', 'discovered-pages.ts');

  // Check if .wiki/ directory exists
  if (!fs.existsSync(wikiDir)) {
    logInfo('No .wiki/ directory found — skipping wiki auto-discovery');
    // Write an empty discovered-pages.ts so imports don't break
    ensureDirectoryExists(outputPath);
    fs.writeFileSync(
      outputPath,
      [
        '// This file is auto-generated by prebuild.mjs — do not edit manually.',
        '',
        "import { type WikiPage } from './wiki-manifest'",
        '',
        'export const discoveredPages: WikiPage[] = []',
        '',
      ].join('\n'),
    );
    logInfo('Wrote empty discovered-pages.ts (no .wiki/ directory)');
    return;
  }

  // Read all files in .wiki/
  let files;
  try {
    files = fs.readdirSync(wikiDir);
  } catch (err) {
    logError(`Failed to read .wiki/ directory: ${err.message}`);
    return;
  }

  const pages = [];

  for (const file of files) {
    // Skip non-.md files
    if (!file.endsWith('.md')) {
      continue;
    }

    // Skip files that are just ".md" with no name
    const nameWithoutExt = file.replace(/\.md$/i, '');
    if (!nameWithoutExt || nameWithoutExt.trim() === '') {
      logInfo(`Skipping malformed wiki file: "${file}" (empty name)`);
      continue;
    }

    const slug = deriveSlugFromFilename(file);

    // Skip if slug derivation produced an empty string
    if (!slug) {
      logInfo(`Skipping wiki file: "${file}" (could not derive slug)`);
      continue;
    }

    const title = deriveTitleFromFilename(file);
    const wikiPath = nameWithoutExt;

    pages.push({ slug, title, wikiPath });
  }

  // Sort alphabetically by slug for deterministic output
  pages.sort((a, b) => a.slug.localeCompare(b.slug));

  // Generate the TypeScript file content
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const entries = pages
    .map(
      (p) =>
        `  {\n    slug: '${esc(p.slug)}',\n    title: '${esc(p.title)}',\n    wikiPath: '${esc(p.wikiPath)}',\n    category: 'Uncategorized',\n    order: 100,\n    isAutoDiscovered: true,\n  }`,
    )
    .join(',\n');

  const content = [
    '// This file is auto-generated by prebuild.mjs — do not edit manually.',
    '',
    "import { type WikiPage } from './wiki-manifest'",
    '',
    'export const discoveredPages: WikiPage[] = [',
    entries,
    ']',
    '',
  ].join('\n');

  ensureDirectoryExists(outputPath);
  fs.writeFileSync(outputPath, content);

  logSuccess(`Discovered ${pages.length} wiki pages → ${path.relative(__dirname, outputPath)}`);
}

/**
 * Extracts a semver version string from a release notes filename.
 *
 * Duplicated from src/lib/changelog/parse-version.ts because prebuild.mjs
 * is plain Node ESM and cannot import TypeScript directly.
 *
 * Example: "RELEASE_NOTES_0.41.0.md" → "0.41.0"
 * Returns null if the filename doesn't match the expected pattern.
 */
function parseVersionFromFilename(filename) {
  const match = filename.match(/^RELEASE_NOTES_(\d+\.\d+\.\d+)\.md$/)
  return match ? match[1] : null
}

/**
 * Compares two semver version strings for sorting (descending — newest first).
 *
 * Returns negative if a > b, positive if a < b, zero if equal.
 */
function compareSemverDesc(a, b) {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pb[i] - pa[i]
  }
  return 0
}

/**
 * Extracts the summary from a release notes markdown body.
 *
 * The summary is the first paragraph under `## What's Changed` —
 * all text between that heading and the next `## ` heading, trimmed.
 */
function extractSummary(body) {
  const match = body.match(/(?:^|\n)## What's Changed[ \t]*\n([\s\S]*?)(?=\n## [^#]|$)/)
  if (!match) return ''
  return match[1].trim().split('\n\n')[0].trim()
}

/**
 * Extracts highlight headings from a release notes markdown body.
 *
 * Collects all `### ` headings that appear between `## Highlights`
 * and the next `## ` heading. Only matches `## Highlights` (exactly
 * two `#` at line start), not `### Highlights`.
 */
function extractHighlights(body) {
  const match = body.match(/(?:^|\n)## Highlights[ \t]*\n([\s\S]*?)(?=\n## [^#]|$)/)
  if (!match) return []
  const section = match[1]
  const headings = []
  for (const line of section.split('\n')) {
    const h3 = line.match(/^### (.+)/)
    if (h3) headings.push(h3[1].trim())
  }
  return headings
}

/**
 * Detects whether a release notes body contains actual breaking changes.
 *
 * Returns true if the `## Breaking Changes` section contains content
 * beyond "None known", "None", or similar negations. Only matches
 * `## Breaking Changes` (exactly two `#` at line start).
 */
function hasBreakingChanges(body) {
  const match = body.match(/(?:^|\n)## Breaking Changes[ \t]*\n([\s\S]*?)(?=\n## [^#]|\n\*\*Full Changelog\*\*|$)/)
  if (!match) return false
  const section = match[1].trim()
  if (!section) return false
  // Check if the section is just a "none" variant
  if (/^none(\s+known)?\.?$/i.test(section)) return false
  // Check if the first line is a "none" variant followed by more text
  const firstLine = section.split('\n')[0].trim()
  if (/^none(\s+known)?\.?\s/i.test(firstLine)) return false
  // If the section starts with a list item, there are breaking changes
  if (/^- /.test(section)) return true
  // Otherwise, if it's not a "none" variant, assume there are breaking changes
  return true
}

/**
 * Scans specs/RELEASE_NOTES_*.md files, parses each into a changelog entry,
 * sorts by version (newest first), and writes public/changelog.json.
 *
 * - Missing specs/ directory or no matching files: writes empty array
 * - Unparseable files (bad filename, read errors): skipped with warnings
 */
async function generateChangelog() {
  console.log('\n\x1b[1m📋 Changelog Generation\x1b[0m\n')

  const specsDir = path.resolve(__dirname, '..', 'specs')
  const outputPath = path.join(__dirname, 'public', 'changelog.json')

  // Check if specs/ directory exists
  if (!fs.existsSync(specsDir)) {
    logInfo('No specs/ directory found — writing empty changelog.json')
    ensureDirectoryExists(outputPath)
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2) + '\n')
    logInfo('Wrote empty changelog.json')
    return
  }

  // Read all files in specs/
  let files
  try {
    files = fs.readdirSync(specsDir)
  } catch (err) {
    logError(`Failed to read specs/ directory: ${err.message}`)
    ensureDirectoryExists(outputPath)
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2) + '\n')
    return
  }

  // Filter to RELEASE_NOTES_*.md files
  const releaseFiles = files.filter((f) => /^RELEASE_NOTES_.*\.md$/.test(f))

  if (releaseFiles.length === 0) {
    logInfo('No RELEASE_NOTES_*.md files found — writing empty changelog.json')
    ensureDirectoryExists(outputPath)
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2) + '\n')
    return
  }

  const entries = []

  for (const file of releaseFiles) {
    const version = parseVersionFromFilename(file)
    if (!version) {
      logInfo(`Skipping "${file}" — could not parse version from filename`)
      continue
    }

    let body
    try {
      body = fs.readFileSync(path.join(specsDir, file), 'utf-8')
    } catch (err) {
      logInfo(`Skipping "${file}" — read error: ${err.message}`)
      continue
    }

    const summary = extractSummary(body)
    const highlights = extractHighlights(body)
    const breakingChanges = hasBreakingChanges(body)
    const githubUrl = `https://github.com/gfargo/coco/releases/tag/${version}`

    entries.push({
      version,
      date: '',
      highlights,
      summary,
      body,
      githubUrl,
      breakingChanges,
    })
  }

  // Sort by version descending (newest first)
  entries.sort((a, b) => compareSemverDesc(a.version, b.version))

  ensureDirectoryExists(outputPath)
  fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2) + '\n')

  logSuccess(`Generated changelog with ${entries.length} entries → ${path.relative(__dirname, outputPath)}`)
}

async function main() {
  const outputPath = path.join(__dirname, 'public', 'schema.json');
  
  try {
    // Step 1: Wiki auto-discovery (local operation, fast)
    await discoverWikiPages();

    // Step 2: Changelog generation (local operation, fast)
    await generateChangelog();

    // Step 3: Download schema (network operation)
    console.log('\n\x1b[1m📥 Schema Downloader\x1b[0m\n');
    
    ensureDirectoryExists(outputPath);
    
    await downloadSchema(CONFIG.schemaUrl, outputPath);
    
    console.log('\n\x1b[32m✨ Prebuild completed successfully!\x1b[0m\n');
  } catch (error) {
    logError(`Failed during prebuild: ${error.message}`);
    if (error.stack) {
      console.error('\x1b[90m' + error.stack.split('\n').slice(1).join('\n') + '\x1b[0m');
    }
    process.exit(1);
  }
}

// Execute the script
main().catch((error) => {
  logError('Unexpected error:', error);
  process.exit(1);
});