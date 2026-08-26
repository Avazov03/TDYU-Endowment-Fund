import fs from 'node:fs'
import path from 'node:path'

// Tabs only on Hisobotlar
{
  const f = 'public/cyan/tuition-fee/index.html'
  let h = fs.readFileSync(f, 'utf8')
  const pairs = [
    ['Magistratura xarajatlari', 'Yillik hisobot'],
    ['Doktorantura xarajatlari', 'Auditorlik xulosasi'],
    ['name">Xalqaro dasturlar</', 'name">Fond ustavi</'],
    ['>Xalqaro dasturlar</', '>Fond ustavi</'],
  ]
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  fs.writeFileSync(f, h)
  console.log('tuition tabs', n)
}

// Rename leftover menu label Qabul qoidalari → Huquqiy asos (same page)
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html') out.push(p)
  }
  return out
}

let files = 0
let n = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  if (!h.includes('Qabul qoidalari')) continue
  const c = h.split('menu-item-text">Qabul qoidalari</span>').length - 1
  if (!c) continue
  h = h.split('menu-item-text">Qabul qoidalari</span>').join('menu-item-text">Huquqiy asos</span>')
  fs.writeFileSync(file, h)
  files++
  n += c
}
console.log('menu rename files', files, 'n', n)
