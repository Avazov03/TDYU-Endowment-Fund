/**
 * Under Sahifalar, rename FAQ link label Yordam → ⚠ Savol-javob
 * (main nav already has Yordam for apply-now; FAQ is separate)
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

const from =
  'href="../faq/index.html" class="menu-item-link"><span class="menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Yordam</span>'
const to =
  'href="../faq/index.html" class="menu-item-link"><span class="menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Savol-javob</span>'
const from2 =
  'href="faq/index.html" class="menu-item-link"><span class="menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Yordam</span>'
const to2 =
  'href="faq/index.html" class="menu-item-link"><span class="menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Savol-javob</span>'
const from3 =
  'href="../faq/index.html" class="menu-item-link"><span class="menu-item-text">Yordam</span>'
const to3 =
  'href="../faq/index.html" class="menu-item-link"><span class="menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Savol-javob</span>'
const from4 =
  'href="faq/index.html" class="menu-item-link"><span class="menu-item-text">Yordam</span>'
const to4 =
  'href="faq/index.html" class="menu-item-link"><span class="menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Savol-javob</span>'

let files = 0
let n = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let c = 0
  for (const [a, b] of [
    [from, to],
    [from2, to2],
    [from3, to3],
    [from4, to4],
  ]) {
    if (!h.includes(a)) continue
    const k = h.split(a).length - 1
    h = h.split(a).join(b)
    c += k
  }
  if (c) {
    fs.writeFileSync(file, h)
    files++
    n += c
  }
}
console.log('files', files, 'n', n)
