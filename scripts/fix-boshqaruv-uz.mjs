/**
 * Fix remaining English on Boshqaruv (vice-chancellor) — exact string only.
 */
import fs from 'node:fs'

const file = 'public/cyan/vice-chancellor/index.html'
let h = fs.readFileSync(file, 'utf8')

const pairs = [
  ['<p>Vice-chancellor</p>', '<p>Boshqaruv kengashi raisi</p>'],
  ['Vice-chancellor', 'Boshqaruv kengashi raisi'],

  [
    'Welcome to our university, a place where knowledge, innovation, and values come together to shape future leaders. We are committed to academic excellence, research-driven learning, and the holistic development of our students. Through dedica you to join us in our journey toward excellence, integrity, and lifelong learning.',
    'Fond uchta organ orqali boshqariladi: Vasiylik kengashi (oliy qarorlar), Boshqaruv kengashi (joriy faoliyat) va Taftish komissiyasi (moliyaviy nazorat). Maqsad — shaffoflik, kollegiallik va samaradorlik.',
  ],

  [
    'asoslanadi.teady effort, because small steps taken daily create remarkable futures. Use knowledge with integrity, respect diversity, and serve society with compassion.',
    'asoslanadi.',
  ],
  [
    'asoslanadi.teady effort, because small steps taken daily create remarkable futures. Use knowledge with integrity, respect diversity, and serve society with compassion.',
    'asoslanadi.',
  ],

  [
    'moliyaviy nazoratitment to excellence inclusivity ga',
    'moliyaviy nazorat.',
  ],
  ['nazoratitment to excellence inclusivity ga', '.'],
  ['inclusivity ga', ''],

  ['Campus Life ', 'Vasiylik kengashi '],
  ['Academic Activities ', 'Boshqaruv kengashi '],
  ['Classrooms &amp; Labs ', 'Taftish komissiyasi '],
  ['Graduation Ceremony ', 'A’zolar va vakolatlar '],

  ['Join TDYU Now ', 'Xayriya '],
  ['Faculty Members 01', 'Vasiylik kengashi'],
  ['Faculty Members 02', 'Boshqaruv kengashi'],
  ['Graduate Programs', 'Dasturlar'],
  ['menu-item-text">Faculty</span>', 'menu-item-text">Boshqaruv</span>'],
  ['menu-item-text">Programs</span>', 'menu-item-text">Dasturlar</span>'],
]

let n = 0
for (const [a, b] of pairs) {
  if (!h.includes(a)) continue
  const c = h.split(a).length - 1
  h = h.split(a).join(b)
  n += c
  console.log('OK', c, a.slice(0, 60))
}

// leftover English fragments after Salayev quote if any
const extras = [
  'teady effort, because small steps taken daily create remarkable futures. Use knowledge with integrity, respect diversity, and serve society with compassion.',
  'Through dedica you to join us in our journey toward excellence, integrity, and lifelong learning.',
  'to excellence inclusivity ga',
]
for (const a of extras) {
  if (h.includes(a)) {
    h = h.split(a).join('')
    console.log('RM', a.slice(0, 40))
    n++
  }
}

fs.writeFileSync(file, h)
console.log('total', n)

// verify
const left = [
  'Welcome to our university',
  'Vice-chancellor',
  'Campus Life',
  'Academic Activities',
  'Classrooms',
  'Graduation Ceremony',
  'nazoratitment',
  'teady effort',
  'inclusivity',
]
console.log(
  'still left:',
  left.filter((x) => h.includes(x)),
)
