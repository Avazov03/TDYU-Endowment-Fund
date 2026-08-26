import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
const hrefs = [...h.matchAll(/href="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((x) => /program|llm|llb|m-ed|bachelor|master|phd|faculty/i.test(x))
console.log('hrefs', [...new Set(hrefs)].slice(0, 40))

const left = [
  'The Stipendiya',
  'Jinoyat huquqi bo',
  'Search Keyword',
  'Load More',
  'Show More',
  'Enter keyword',
  'Fizika',
  'results found',
  'program is designed',
]
left.forEach((n) => console.log(n, h.includes(n)))

const idx = fs.readFileSync('public/cyan/index.html', 'utf8')
const i = idx.indexOf('all-programs/index.html')
const chunk = idx.slice(Math.max(0, i - 200), i + 4000)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('menu', labels.slice(0, 25))
