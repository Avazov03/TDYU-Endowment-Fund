import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')

// filter labels
const labels = [...h.matchAll(/id="(?:faculty|department|program-level)-[^"]+"\s*\n\s*>\s*([^<\n]+)/g)].map(
  (m) => m[1].trim(),
)
console.log('filters', labels)

// Total / Reset
for (const n of ['Total', 'Reset', 'filter-result', 'Showing']) {
  const i = h.indexOf(n)
  if (i >= 0) console.log(n, JSON.stringify(h.slice(i, i + 100)))
}

// all program titles in list
const titles = [
  ...h.matchAll(/class="title"[^>]*>\s*<a[^>]*>([^<]+)/g),
  ...h.matchAll(/class="entry-title"[^>]*>\s*<a[^>]*>([^<]+)/g),
  ...h.matchAll(/<h4[^>]*>\s*<a[^>]*>([^<]+)/g),
].map((m) => m[1].trim())
console.log('titles', [...new Set(titles)])

// excerpts ending with ...
const excerpts = [...h.matchAll(/>([^<]{30,220}\.\.\.)<\/p>/g)].map((m) => m[1])
console.log('excerpts:')
excerpts.forEach((e) => console.log('·', e))

// programs folder pages
try {
  const dirs = fs.readdirSync('public/cyan/programs', { withFileTypes: true }).filter((d) => d.isDirectory())
  console.log(
    'program pages',
    dirs.map((d) => d.name),
  )
} catch (e) {
  console.log('no programs dir')
}
