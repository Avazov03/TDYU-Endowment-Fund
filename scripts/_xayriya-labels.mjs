import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
const labels = [...h.matchAll(/<label>([^<]+)<\/label>/gi)].map((m) => m[1])
console.log('LABELS:')
;[...new Set(labels)].forEach((l) => console.log(' -', l))

const ph = [...h.matchAll(/placeholder="([^"]+)"/gi)].map((m) => m[1])
console.log('\nPLACEHOLDERS:')
;[...new Set(ph)].forEach((l) => console.log(' -', l))

// h6 titles
const h6 = [...h.matchAll(/<h6[^>]*>\s*([^<]+)\s*</gi)].map((m) => m[1].trim())
console.log('\nH6:')
h6.forEach((l) => console.log(' -', l))

const h3 = [...h.matchAll(/<h3[^>]*>\s*([^<]+)\s*</gi)].map((m) => m[1].trim())
console.log('\nH3:')
h3.forEach((l) => console.log(' -', l))

const h4 = [...h.matchAll(/<h4[^>]*>\s*([^<]+)\s*</gi)].map((m) => m[1].trim())
console.log('\nH4:')
h4.forEach((l) => console.log(' -', l))

const h5 = [...h.matchAll(/<h5[^>]*>\s*([^<]+)\s*</gi)].map((m) => m[1].trim())
console.log('\nH5:')
h5.forEach((l) => console.log(' -', l))

// EN-looking paragraphs (contain many latin words)
const ps = [...h.matchAll(/<p[^>]*>([^<]{15,400})<\/p>/gi)].map((m) => m[1].replace(/\s+/g, ' ').trim())
console.log('\nP with EN:')
for (const p of ps) {
  if (/[A-Za-z]{5,}/.test(p) && /(the|and|your|with|for|are|application|student|tuition|document|exam)/i.test(p)) {
    console.log(' -', p.slice(0, 200))
  }
}
