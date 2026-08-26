import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')

const needles = [
  'Search Keyword',
  'Enter keyword',
  'Load More',
  'The Stipendiya',
  'Jinoyat huquqi bo‘yicha',
  'program is designed',
  'Ishtirokchilar',
  'Moliyalashtirish',
  'Dastur yo',
  'Filtrlash',
  'O‘quv dasturlari',
  'PhD',
  'Ta’lim va grantlar — 48%',
]

for (const n of needles) {
  const i = h.indexOf(n)
  if (i < 0) {
    console.log('MISS', n)
    continue
  }
  console.log('\n===', n)
  console.log(JSON.stringify(h.slice(i, i + 220)))
}

// all program card titles + excerpts
const titles = [...h.matchAll(/<(h4)[^>]*class="[^"]*entry-title[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)/g)].map(
  (m) => m[2].trim(),
)
console.log('\ncards', titles)

const paras = [...h.matchAll(/<p>([^<]{40,280})<\/p>/g)].map((m) => m[1])
console.log('\nparas:')
paras.forEach((p, i) => console.log(i, p.slice(0, 160)))

// batafsil hrefs
const hrefs = [...h.matchAll(/href="([^"]+)"[^>]*>\s*Batafsil/g)].map((m) => m[1])
console.log('\nbatafsil', [...new Set(hrefs)])
