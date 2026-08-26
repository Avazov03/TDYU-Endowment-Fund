/**
 * Final polish: Yangiliklar submenu leftovers → ⚠
 */
import fs from 'node:fs'
import path from 'node:path'

const pairs = [
  [
    'menu-item-text">Yangiliklar grid</span>',
    'menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Yangiliklar paneli</span>',
  ],
  [
    'menu-item-text">Yangiliklar Standard</span>',
    'menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Yangiliklar ro‘yxat</span>',
  ],
  [
    'menu-item-text">Yangiliklar Grid</span>',
    'menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Yangiliklar paneli</span>',
  ],
  ['>Yangiliklar grid</span>', '>⚠ Yangiliklar paneli</span>'],
  ['>Yangiliklar Standard</span>', '>⚠ Yangiliklar ro‘yxat</span>'],
]

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
  let changed = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    changed += c
  }
  if (changed) {
    fs.writeFileSync(file, h)
    files++
    n += changed
  }
}
console.log('files', files, 'n', n)

// final verify blog
for (const f of ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']) {
  const h = fs.readFileSync(f, 'utf8')
  console.log(
    f,
    'grid leftover',
    h.includes('Yangiliklar grid') || h.includes('Yangiliklar Standard'),
    'EN Learning',
    h.includes('Learning'),
    'polish',
    h.includes('tdyu-page-polish'),
  )
}
