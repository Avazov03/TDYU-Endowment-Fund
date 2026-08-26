import fs from 'node:fs'
import path from 'node:path'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

const map = [
  [/Collage of arts\s+and Sciences/g, 'San’at va fanlar kolleji'],
  [/Building Yetakchilik,\s*Skills and\s+TDYU Dasturlar/g, 'Yetakchilik, ko‘nikmalar va TDYU dasturlari'],
  [/Full-Vaqt/g, 'Kunduzgi'],
  [/Part-Vaqt/g, 'Sirtqi'],
]

let n = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let o = h
  for (const [re, to] of map) o = o.replace(re, to)
  if (o !== h) {
    fs.writeFileSync(file, o)
    n++
  }
}
console.log('fixed', n)
