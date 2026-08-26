import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const i = h.indexOf('⚠ Sahifalar')
const chunk = h.slice(i, i + 3500)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log(labels)

// fix faq leftovers
const faq = fs.readFileSync('public/cyan/faq/index.html', 'utf8')
const i2 = faq.indexOf('Are there scholarships')
console.log('faq context', JSON.stringify(faq.slice(i2, i2 + 80)))
// find all EN FAQ questions on faq page
const qs = [...faq.matchAll(/e-n-accordion-item-title-text[^>]*>\s*([^<]+)/g)].map((m) =>
  m[1].trim(),
)
console.log('faq qs', qs)
