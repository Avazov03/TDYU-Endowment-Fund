/**
 * Rename red Sahifalar submenu labels to Uzbek (keep ⚠ mark style).
 * Exact string only, across cyan pages that still show English menu labels.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'
const pairs = [
  ['>Libraries</span>', '>Kutubxonalar</span>'],
  ['>⚠ Libraries</span>', '>⚠ Kutubxonalar</span>'],
  ['style="color:#dc2626!important;font-weight:700">Libraries</span>', 'style="color:#dc2626!important;font-weight:700">Kutubxonalar</span>'],
  ['style="color:#dc2626!important;font-weight:700">⚠ Libraries</span>', 'style="color:#dc2626!important;font-weight:700">⚠ Kutubxonalar</span>'],
  ['>Faq</span>', '>Savol-javob</span>'],
  ['>⚠ Faq</span>', '>⚠ Savol-javob</span>'],
  ['style="color:#dc2626!important;font-weight:700">Faq</span>', 'style="color:#dc2626!important;font-weight:700">Savol-javob</span>'],
  ['style="color:#dc2626!important;font-weight:700">⚠ Faq</span>', 'style="color:#dc2626!important;font-weight:700">⚠ Savol-javob</span>'],
  ['>Gallery</span>', '>Galereya</span>'],
  ['>⚠ Gallery</span>', '>⚠ Galereya</span>'],
  ['style="color:#dc2626!important;font-weight:700">Gallery</span>', 'style="color:#dc2626!important;font-weight:700">Galereya</span>'],
  ['style="color:#dc2626!important;font-weight:700">⚠ Gallery</span>', 'style="color:#dc2626!important;font-weight:700">⚠ Galereya</span>'],
]

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

let files = 0
let total = 0
for (const file of walk(root)) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
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
console.log('files', files, 'replacements', total)
