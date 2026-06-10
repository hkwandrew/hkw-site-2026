import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const sourceFontPath = path.join(repoRoot, 'public/fonts/AcuminVF.woff2')
const subsetFontPath = path.join(repoRoot, 'public/fonts/AcuminVF-subset.woff2')
const sourceRoots = [
  path.join(repoRoot, 'index.html'),
  path.join(repoRoot, 'src'),
]
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.ts',
  '.tsx',
])
const printableAscii = Array.from({ length: 95 }, (_, index) =>
  String.fromCharCode(32 + index),
).join('')
const commonPunctuation =
  '\u00a0\u00a9\u00ae\u2013\u2014\u2018\u2019\u201c\u201d\u2022\u2026'

const collectTextFiles = async (entryPath) => {
  const entryStat = await stat(entryPath)

  if (entryStat.isFile()) {
    return textExtensions.has(path.extname(entryPath)) ? [entryPath] : []
  }

  if (!entryStat.isDirectory()) return []

  const entries = await readdir(entryPath, { withFileTypes: true })
  const nestedFiles = await Promise.all(
    entries.map((entry) => collectTextFiles(path.join(entryPath, entry.name))),
  )

  return nestedFiles.flat()
}

const getSubsetText = async () => {
  const files = (await Promise.all(sourceRoots.map(collectTextFiles))).flat()
  const sourceText = await Promise.all(
    files.map((filePath) => readFile(filePath, 'utf8')),
  )

  return [...new Set(`${printableAscii}${commonPunctuation}${sourceText.join('')}`)].join('')
}

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`

const main = async () => {
  const sourceBuffer = await readFile(sourceFontPath)
  const subsetText = await getSubsetText()
  const subsetBuffer = await subsetFont(sourceBuffer, subsetText, {
    targetFormat: 'woff2',
    variationAxes: {
      wght: { min: 400, max: 900 },
      wdth: { min: 68, max: 100 },
    },
    preserveNameIds: [1, 2, 4, 6, 16, 17, 25],
  })

  await writeFile(subsetFontPath, subsetBuffer)

  console.log(
    [
      `Wrote ${path.relative(repoRoot, subsetFontPath)}`,
      `Glyph source characters: ${subsetText.length}`,
      `Original: ${formatBytes(sourceBuffer.length)}`,
      `Subset: ${formatBytes(subsetBuffer.length)}`,
    ].join('\n'),
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
