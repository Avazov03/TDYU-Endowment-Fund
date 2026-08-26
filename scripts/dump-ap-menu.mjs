import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')

// Find mega menu programs section - look for scholarships under dasturlar
const needles = [
  '01 · Xalqaro stajirovkalar',
  '02 · Stipendiya va grantlar',
  'Nashrlar va tarjimalar',
  'm-ed-in',
  'scholarships',
]
for (const n of needles) {
  const c = h.split(n).length - 1
  console.log(n, c)
}

// Extract all menu-item-text that look like programs
const all = [...h.matchAll(/<span class="menu-item-text"[^>]*>([^<]+)<\/span>/g)].map((m) =>
  m[1].trim(),
)
const progish = all.filter((t) =>
  /stajirov|Stipendiya|Tanlov|Ilmiy|Nashr|Dastur|01 ·|02 ·|03 ·|04 ·/i.test(t),
)
console.log('progish menu', [...new Set(progish)])
