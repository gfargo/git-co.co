import fs from 'fs'

import { getChangelog } from './index'
import type { ChangelogEntry } from './types'

jest.mock('fs')
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: (...segments: string[]) => segments.join('/'),
}))

const mockedFs = fs as jest.Mocked<typeof fs>

const sampleEntries: ChangelogEntry[] = [
  {
    version: '0.41.0',
    date: '',
    highlights: ['Instant TUI mount', 'Disk cache'],
    summary: 'Boot-perf overhaul of coco ui.',
    body: '## What\'s Changed\n\nBoot-perf overhaul of coco ui.',
    githubUrl: 'https://github.com/gfargo/coco/releases/tag/0.41.0',
    breakingChanges: false,
  },
  {
    version: '0.40.0',
    date: '2024-06-01',
    highlights: [],
    summary: 'Status view overhaul.',
    body: '## What\'s Changed\n\nStatus view overhaul.',
    githubUrl: 'https://github.com/gfargo/coco/releases/tag/0.40.0',
    breakingChanges: true,
  },
]

beforeEach(() => {
  jest.resetAllMocks()
})

describe('getChangelog', () => {
  it('returns parsed entries from changelog.json', () => {
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(sampleEntries))

    const result = getChangelog()

    expect(result).toEqual(sampleEntries)
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining('changelog.json'),
      'utf-8',
    )
  })

  it('returns an empty array when the file does not exist', () => {
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory')
    })

    const result = getChangelog()

    expect(result).toEqual([])
  })

  it('returns an empty array when the file contains invalid JSON', () => {
    mockedFs.readFileSync.mockReturnValue('not valid json {{{')

    const result = getChangelog()

    expect(result).toEqual([])
  })

  it('returns an empty array for an empty JSON array', () => {
    mockedFs.readFileSync.mockReturnValue('[]')

    const result = getChangelog()

    expect(result).toEqual([])
  })

  it('preserves all fields from the JSON entries', () => {
    const entry: ChangelogEntry = {
      version: '1.0.0',
      date: '2025-01-15',
      highlights: ['Feature A', 'Feature B', 'Feature C'],
      summary: 'Major release with three features.',
      body: '# Release 1.0.0\n\nFull body here.',
      githubUrl: 'https://github.com/gfargo/coco/releases/tag/1.0.0',
      breakingChanges: true,
    }
    mockedFs.readFileSync.mockReturnValue(JSON.stringify([entry]))

    const result = getChangelog()

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(entry)
    expect(result[0]?.version).toBe('1.0.0')
    expect(result[0]?.date).toBe('2025-01-15')
    expect(result[0]?.highlights).toEqual(['Feature A', 'Feature B', 'Feature C'])
    expect(result[0]?.summary).toBe('Major release with three features.')
    expect(result[0]?.githubUrl).toBe('https://github.com/gfargo/coco/releases/tag/1.0.0')
    expect(result[0]?.breakingChanges).toBe(true)
  })
})
