/**
 * Restore Dasturlar submenu 01–04 on pages where labels drifted.
 */
import fs from 'node:fs'
import path from 'node:path'

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

// Relative path prefix depends on page depth — handle both
const variants = [
  {
    from: [
      [
        'menu-item-11922"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
        'menu-item-11922"><a href="../all-programs/index.html" class="menu-item-link"><span class="menu-item-text">01 · Xalqaro stajirovkalar</span>',
      ],
      [
        'menu-item-11923"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Tanlovlar va musobaqalar</span>',
        'menu-item-11923"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">02 · Stipendiya va grantlar</span>',
      ],
      [
        'menu-item-11924"><a href="../events/index.html" class="menu-item-link"><span class="menu-item-text">Nashrlar va tarjimalar</span>',
        'menu-item-11924"><a href="../events/index.html" class="menu-item-link"><span class="menu-item-text">03 · Tanlovlar va musobaqalar</span>',
      ],
      [
        'menu-item-11925"><a href="../research/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
        'menu-item-11925"><a href="../research/index.html" class="menu-item-link"><span class="menu-item-text">04 · Ilmiy va ta’limiy loyihalar</span>',
      ],
    ],
  },
]

// Also fix if class includes full class string with menu-item-11922\" 
const pairs = [
  [
    'menu-item-11922"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-11922"><a href="../all-programs/index.html" class="menu-item-link"><span class="menu-item-text">01 · Xalqaro stajirovkalar</span>',
  ],
  [
    'menu-item-11923"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Tanlovlar va musobaqalar</span>',
    'menu-item-11923"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">02 · Stipendiya va grantlar</span>',
  ],
  [
    'menu-item-11924"><a href="../events/index.html" class="menu-item-link"><span class="menu-item-text">Nashrlar va tarjimalar</span>',
    'menu-item-11924"><a href="../events/index.html" class="menu-item-link"><span class="menu-item-text">03 · Tanlovlar va musobaqalar</span>',
  ],
  [
    'menu-item-11925"><a href="../research/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-11925"><a href="../research/index.html" class="menu-item-link"><span class="menu-item-text">04 · Ilmiy va ta’limiy loyihalar</span>',
  ],
  // without ../ (root pages)
  [
    'menu-item-11922"><a href="scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-11922"><a href="all-programs/index.html" class="menu-item-link"><span class="menu-item-text">01 · Xalqaro stajirovkalar</span>',
  ],
  [
    'menu-item-11923"><a href="scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Tanlovlar va musobaqalar</span>',
    'menu-item-11923"><a href="scholarships/index.html" class="menu-item-link"><span class="menu-item-text">02 · Stipendiya va grantlar</span>',
  ],
  [
    'menu-item-11924"><a href="events/index.html" class="menu-item-link"><span class="menu-item-text">Nashrlar va tarjimalar</span>',
    'menu-item-11924"><a href="events/index.html" class="menu-item-link"><span class="menu-item-text">03 · Tanlovlar va musobaqalar</span>',
  ],
  [
    'menu-item-11925"><a href="research/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-11925"><a href="research/index.html" class="menu-item-link"><span class="menu-item-text">04 · Ilmiy va ta’limiy loyihalar</span>',
  ],
]

let files = 0
let total = 0
for (const file of walk('public/cyan')) {
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
    console.log(path.relative('public/cyan', file), n)
  }
}
console.log('files', files, 'total', total)

// verify all-programs
const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
for (const id of ['11922', '11923', '11924', '11925']) {
  const i = h.indexOf(`menu-item-${id}`)
  const m = h.slice(i, i + 200).match(/menu-item-text">([^<]+)/)
  console.log(id, m && m[1])
}
