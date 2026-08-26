import fs from 'node:fs'

const f = 'public/cyan/how-to-apply/index.html'
let h = fs.readFileSync(f, 'utf8')

const pairs = [
  [
    'Xayriya, grant arizasi, alumni ro‘yxati yoki hamkorlik taklifidan birini tanlang. supporting documents before starting your application.',
    'Xayriya, grant arizasi, alumni ro‘yxati yoki hamkorlik taklifidan birini tanlang.',
  ],
  [
    ' supporting documents before starting your application.',
    '',
  ],
  [
    'Ism, aloqa va murojaat mazmunini aniq yozing. Kerak bo‘lsa qo‘shimcha izoh qo‘shing.l information before submission.',
    'Ism, aloqa va murojaat mazmunini aniq yozing. Kerak bo‘lsa qo‘shimcha izoh qo‘shing.',
  ],
  ['l information before submission.', ''],
  [
    'Kerakli hujjatlarni biriktiring yoki xayriya miqdorini ko‘rsating; so‘ngra yuboring.r portfolio items (if required).',
    'Kerakli hujjatlarni biriktiring yoki xayriya miqdorini ko‘rsating; so‘ngra yuboring.',
  ],
  ['r portfolio items (if required).', ''],
  [
    'Fond murojaatingizni ko‘rib chiqadi va email orqali javob beradi.sion, or additional steps (like interviews).',
    'Fond murojaatingizni ko‘rib chiqadi va email orqali javob beradi.',
  ],
  ['sion, or additional steps (like interviews).', ''],
  [
    'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi. Each academic program includes tuition fees, registration charges and essential learning resources ensuring students receive high-quality educ',
    'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.',
  ],
]

// Also catch longer tuition leftover if present
const i = h.indexOf('Each academic program includes tuition')
if (i >= 0) {
  let end = i
  while (end < h.length && h[end] !== '<' && end < i + 300) end++
  const chunk = h.slice(i, end)
  pairs.push([chunk, ''])
  console.log('tuition chunk', JSON.stringify(chunk.slice(0, 120)))
}

let n = 0
for (const [a, b] of pairs) {
  if (!a || !h.includes(a)) continue
  h = h.split(a).join(b)
  n++
}
fs.writeFileSync(f, h)
console.log('fixed', n)

// verify
const x = fs.readFileSync(f, 'utf8')
for (const t of [
  'supporting documents',
  'before submission',
  'portfolio items',
  'like interviews',
  'Each academic',
  'tuition fees',
]) {
  if (x.includes(t)) console.log('still', t)
}
