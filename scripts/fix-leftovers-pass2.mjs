/**
 * Second pass: remaining EN UI strings (exact only).
 */
import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const pairs = [
  ['Qidirish Keyword...', 'Qidirish...'],
  ['Search Keyword...', 'Qidirish...'],
  ['Enter your keywords..', 'Kalit so‘z...'],
  ['Your email address', 'Elektron pochta'],
  ['Archives: Events', 'Tadbirlar arxivi'],
  ['Archives: Alumni', 'Alumni arxivi'],
  ['>Educations</a>', '>Ta’lim</a>'],
  ['>Online</a>', '>Onlayn</a>'],
  ['>University</a>', '>TDYU</a>'],
  ['>⚠ Faculty</span>', '>⚠ Fakultetlar</span>'],
  ['>Faculty </span>', '>Boshqaruv </span>'],
  ['svg>Faculty </span>', 'svg>Boshqaruv </span>'],
  ['>⚠ Graduate Programs</span>', '>⚠ Dasturlar (eski)</span>'],
  ['Graduate Programs', 'Dasturlar'],
  ['TDYU ga qo‘shiling', 'Xayriya'],
  ['TDYU ga qo\'shiling', 'Xayriya'],
  ['Blog Grid 3 Column', '⚠ Yangiliklar paneli'],
  ['Blog Grid Sidebar', '⚠ Yangiliklar yon panel'],
  ['Blog List Sidebar', '⚠ Yangiliklar ro‘yxat'],
  ['December ', ''], // too dangerous - skip
  ['Phone:', 'Telefon:'],
  ['Email:', 'Email:'],
  ['submit', 'Yuborish'], // too dangerous globally
]

// Safer specific pairs only
const safe = [
  ['Qidirish Keyword...', 'Qidirish...'],
  ['placeholder="Enter your keywords.."', 'placeholder="Kalit so‘z..."'],
  ['placeholder="Your email address"', 'placeholder="Elektron pochta"'],
  ['Archives: Events', 'Tadbirlar arxivi'],
  ['Archives: Alumni', 'Alumni arxivi'],
  ['>Educations</a>', '>Ta’lim</a>'],
  ['>Online</a>', '>Onlayn</a>'],
  ['category/university/index.html">University</a>', 'category/university/index.html">TDYU</a>'],
  ['>⚠ Faculty</span>', '>⚠ Fakultetlar</span>'],
  ['>Faculty </span>', '>Boshqaruv </span>'],
  ['>⚠ Graduate Programs</span>', '>⚠ Dasturlar</span>'],
  ['menu-item-text">Graduate Programs</span>', 'menu-item-text">Dasturlar</span>'],
  ['>TDYU ga qo‘shiling</span>', '>Xayriya</span>'],
  ['Blog Grid 3 Column', '⚠ Yangiliklar paneli'],
  ['Blog Grid Sidebar', '⚠ Yangiliklar yon panel'],
  ['Blog List Sidebar', '⚠ Yangiliklar ro‘yxat'],
  ['name="Phone:"', 'name="Telefon:"'],
  ['>Phone:</', '>Telefon:</'],
  ['Phone:</h4>', 'Telefon:</h4>'],
  ['Phone:</span>', 'Telefon:</span>'],
  ['>Phone<', '>Telefon<'],
]

let files = 0
let total = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of safe) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (n) {
    fs.writeFileSync(file, h)
    files++
    total += n
  }
}
console.log('files', files, 'n', total)
