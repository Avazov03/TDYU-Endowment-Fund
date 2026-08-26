import fs from 'node:fs'

const f = 'public/cyan/how-to-apply/index.html'
let h = fs.readFileSync(f, 'utf8')

const pairs = [
  [
    'Kerakli ma’lumotlar tayyor bo‘lgach, s online application form with accurate personal and academic details.',
    'Kerakli ma’lumotlar tayyor bo‘lgach, Aloqa formasi orqali yuboring.',
  ],
  [
    's online application form with accurate personal and academic details.',
    'Aloqa formasi orqali yuboring.',
  ],
  [
    'online application form with accurate personal and academic details.',
    'Aloqa formasi orqali yuboring.',
  ],
  [
    'with accurate personal, academic, and program details. Double-check al',
    'va yuboring. ',
  ],
  [
    'with accurate personal and academic details.',
    'orqali yuboring.',
  ],
]

let n = 0
for (const [a, b] of pairs) {
  if (!h.includes(a)) continue
  h = h.split(a).join(b)
  n++
}
fs.writeFileSync(f, h)
console.log('n', n)

// leftover EN check on 3 pages
for (const file of [
  'public/cyan/tuition-fee/index.html',
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
]) {
  const x = fs.readFileSync(file, 'utf8')
  const bad = [
    'online application',
    'Our program',
    'Get Your',
    'Apply Process',
    'Spring Intake',
    'Academic Qualifications',
    'English Language',
    'Search Keyword',
    'Non-refundable',
    'Duration</',
    'rstb-page-title">Qabul',
  ].filter((t) => x.includes(t))
  console.log(file.split('/').slice(-2).join('/'), bad)
}
