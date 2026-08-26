import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/contact/index.html', 'utf8')

const needles = [
  'infoexmple@TDYU.edu',
  'info@TDYU.edu',
  '(+1) 270-555-0117',
  '(209) 555-0104',
  '4517 Huston',
  'Address',
  'Qabul',
  'mailto:',
  'tel:',
  'stamford',
  'Keyingi safar',
  'Bog‘lanish',
  'elementor-icon-box-description',
]

for (const n of needles) {
  let from = 0
  let c = 0
  while (c < 4) {
    const i = h.indexOf(n, from)
    if (i < 0) break
    console.log(`\n--- ${n} #${c + 1} ---`)
    console.log(h.slice(Math.max(0, i - 80), i + n.length + 120).replace(/\s+/g, ' '))
    from = i + n.length
    c++
  }
}
