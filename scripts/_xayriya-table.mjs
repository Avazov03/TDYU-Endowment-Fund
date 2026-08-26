import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
const th = [...h.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((m) =>
  m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
)
console.log('TH:', th)
const td = [...h.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(Boolean)
console.log('TD sample:', [...new Set(td)].slice(0, 40))

// option texts
const opts = [...h.matchAll(/<option[^>]*>([^<]*)<\/option>/gi)].map((m) => m[1].trim()).filter(Boolean)
console.log('OPTS:', [...new Set(opts)].slice(0, 50))

// leftover hybrid phrases
for (const t of [
  'Valid passport',
  'IELTS',
  'Adnations',
  'Applications Opens',
  'less than',
  'Our program costs',
  'high-quality',
  'To‘ldirilgan ariza',
]) {
  const i = h.indexOf(t)
  if (i >= 0) console.log(t, '=>', JSON.stringify(h.slice(i, i + 80)))
}
