import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/vice-chancellor/index.html', 'utf8')
const keys = [
  'Boshqaruv kengashi raisi',
  'N. Salayev',
  'Vasiylik kengashi',
  'Taftish komissiyasi',
  'Fond uchta organ',
  'A’zolar va vakolatlar',
  'Xayriya',
]
for (const k of keys) console.log(h.includes(k) ? 'OK' : 'NO', k)

// sample around raisi
const i = h.indexOf('Boshqaruv kengashi raisi')
console.log('\ncontext:', JSON.stringify(h.slice(i - 40, i + 80)))
const j = h.indexOf('Fond uchta organ')
console.log('intro:', JSON.stringify(h.slice(j, j + 200)))
