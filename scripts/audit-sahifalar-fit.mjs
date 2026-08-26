/**
 * Audit Sahifalar menu pages for endowment fit + leftover EN + corruption.
 */
import fs from 'node:fs'

const pages = [
  { key: 'Alumni', file: 'public/cyan/alumni/index.html', keep: true, expect: ['Alumni', 'Aziz', 'Nilufar', 'Zulfiya', 'bitiruv'] },
  { key: 'Loyihalar', file: 'public/cyan/research/index.html', keep: true, expect: ['Loyiha', 'Jessup', 'Westminster', 'TSUL'] },
  { key: 'Grantlar', file: 'public/cyan/scholarships/index.html', keep: true, expect: ['Grant', 'stipendiya', 'ariza'] },
  { key: 'Tadbirlar', file: 'public/cyan/events/index.html', keep: true, expect: ['Tadbir', 'kongress', 'Jessup'] },
  { key: 'Kutubxonalar', file: 'public/cyan/libraries/index.html', keep: false, expect: ['kutubxona', 'TSUL', 'brendi'] },
  { key: 'Savol-javob', file: 'public/cyan/faq/index.html', keep: false, expect: ['Fond', 'grant', 'xayriya'] },
  { key: 'Galereya', file: 'public/cyan/gallery/index.html', keep: false, expect: ['galereya', 'tadbir', 'Fond'] },
]

const enRe =
  /\b(Welcome|University of|Campus Life|Student Life|Faculty of|How do I apply|What is the|Are there scholarships|Academic fee|Tuition|First Name|Join TDYU|Vice-chancellor|Graduate Programs|Libraries|Gallery|Faq)\b/i

for (const p of pages) {
  const h = fs.readFileSync(p.file, 'utf8')
  const title = (h.match(/<title>([^<]+)/) || [])[1] || ''
  const corrupt = /ochiladiclass|class=\s*>/.test(h)
  const texts = [...h.matchAll(/>([^<]{10,160})</g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
  const en = [...new Set(texts.filter((t) => enRe.test(t) && !t.startsWith('⚠')))]
  const found = p.expect.filter((e) => new RegExp(e, 'i').test(h))
  const missing = p.expect.filter((e) => !new RegExp(e, 'i').test(h))
  console.log('\n##', p.key, p.keep ? '[QOLADI]' : '[⚠ DEMO]')
  console.log('title:', title.replace(/&#8211;/g, '–'))
  console.log('corrupt:', corrupt)
  console.log('expect OK:', found.join(', ') || '—')
  if (missing.length) console.log('expect MISS:', missing.join(', '))
  console.log('EN leftovers:', en.length ? en.slice(0, 8).join(' | ') : 'none')
}

// menu structure on index
const idx = fs.readFileSync('public/cyan/index.html', 'utf8')
const start = idx.indexOf('⚠ Sahifalar')
const chunk = idx.slice(start, start + 14000)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('\n## Menyu (Sahifalar ostida)')
labels.slice(0, 20).forEach((l) => console.log(' ·', l))
