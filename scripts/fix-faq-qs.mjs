import fs from 'node:fs'

// Fix FAQ page questions — exact strings
const file = 'public/cyan/faq/index.html'
let h = fs.readFileSync(file, 'utf8')
const pairs = [
  ['Fond nima qiladi?', 'Fond nima qiladi?'],
  [
    'How Does the University Support Student Learning?',
    'Grantlarga kim ariza topshira oladi?',
  ],
  [
    'What Academic Programs Are Available?',
    'Qanday dasturlar moliyalashtiriladi?',
  ],
  [
    'How Can Students Access Academic Advising?',
    'Hisobotlar qayerdan ko‘riladi?',
  ],
  [
    'What Student Clubs and Organizations Are Offered?',
    'Alumni Associationga qanday qo‘shilaman?',
  ],
  [
    'How Does the University Support Career Development?',
    'Xayriya qanday amalga oshiriladi?',
  ],
  ['What Housing Options Are Available?', 'Fond manzili qayerda?'],
  [
    'Are there scholarships available for students?',
    'Talabalar uchun grantlar bormi?',
  ],
]
let n = 0
for (const [a, b] of pairs) {
  if (a === b) continue
  if (!h.includes(a)) continue
  const c = h.split(a).length - 1
  h = h.split(a).join(b)
  n += c
  console.log(c, a.slice(0, 40))
}
fs.writeFileSync(file, h)
console.log('total', n)

// Full Sahifalar submenu from index
const idx = fs.readFileSync('public/cyan/index.html', 'utf8')
const start = idx.indexOf('⚠ Sahifalar')
// find closing of that top-level li roughly by next main sibling after deep nest — just extract 12k
const chunk = idx.slice(start, start + 12000)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('menu labels', labels)
