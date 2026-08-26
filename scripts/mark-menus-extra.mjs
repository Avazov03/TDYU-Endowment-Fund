import fs from 'node:fs'
import path from 'node:path'

const cyan = 'public/cyan'
function walk(d, a = []) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n)
    if (fs.statSync(p).isDirectory()) walk(p, a)
    else if (n.endsWith('.html')) a.push(p)
  }
  return a
}

const RED_STYLE = 'color:#dc2626!important;font-weight:700'
const RED_MARK = '⚠ '
const labels = [
  'Graduate  Programs',
  'Graduate Programs',
  'TDYU kutubxonasi',
  'Magistratura dasturlari',
  'Campus Events',
  'Univet Library',
  'Fond tadbirlari', // footer leftover link name if in menu
]

let n = 0
for (const f of walk(cyan)) {
  let h = fs.readFileSync(f, 'utf8')
  let ch = false
  for (const label of labels) {
    const plain = `menu-item-text">${label}</span>`
    const styled = `menu-item-text" style="${RED_STYLE}">${RED_MARK}${label}</span>`
    if (h.includes(plain)) {
      n += h.split(plain).length - 1
      h = h.split(plain).join(styled)
      ch = true
    }
  }
  if (ch) fs.writeFileSync(f, h)
}
console.log('extra red', n)
