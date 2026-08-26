import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/cost-financial-aid/index.html', 'utf8')
const h3 = [...h.matchAll(/<h3[^>]*>\s*([^<]+)\s*</gi)].map((m) => m[1].trim())
const h4 = [...h.matchAll(/<h4[^>]*>\s*([^<]+)\s*</gi)].map((m) => m[1].trim())
console.log('H3', h3)
console.log('H4', h4)
const ps = [...h.matchAll(/<p[^>]*>([^<]{15,400})<\/p>/gi)].map((m) => m[1].replace(/\s+/g, ' ').trim())
for (const p of ps) console.log('P:', p.slice(0, 220))

const btn = [...h.matchAll(/data-text="([^"]+)"/g)].map((m) => m[1])
console.log('BTN', [...new Set(btn)])
