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

const pairs = [
  [
    'menu-item-12024"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-12024"><a href="../all-programs/index.html" class="menu-item-link"><span class="menu-item-text">01 · Xalqaro stajirovkalar</span>',
  ],
  [
    'menu-item-12025"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Tanlovlar va musobaqalar</span>',
    'menu-item-12025"><a href="../scholarships/index.html" class="menu-item-link"><span class="menu-item-text">02 · Stipendiya va grantlar</span>',
  ],
  [
    'menu-item-12026"><a href="../events/index.html" class="menu-item-link"><span class="menu-item-text">Nashrlar va tarjimalar</span>',
    'menu-item-12026"><a href="../events/index.html" class="menu-item-link"><span class="menu-item-text">03 · Tanlovlar va musobaqalar</span>',
  ],
  [
    'menu-item-12027"><a href="../research/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-12027"><a href="../research/index.html" class="menu-item-link"><span class="menu-item-text">04 · Ilmiy va ta’limiy loyihalar</span>',
  ],
  // root-relative
  [
    'menu-item-12024"><a href="scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-12024"><a href="all-programs/index.html" class="menu-item-link"><span class="menu-item-text">01 · Xalqaro stajirovkalar</span>',
  ],
  [
    'menu-item-12025"><a href="scholarships/index.html" class="menu-item-link"><span class="menu-item-text">Tanlovlar va musobaqalar</span>',
    'menu-item-12025"><a href="scholarships/index.html" class="menu-item-link"><span class="menu-item-text">02 · Stipendiya va grantlar</span>',
  ],
  [
    'menu-item-12026"><a href="events/index.html" class="menu-item-link"><span class="menu-item-text">Nashrlar va tarjimalar</span>',
    'menu-item-12026"><a href="events/index.html" class="menu-item-link"><span class="menu-item-text">03 · Tanlovlar va musobaqalar</span>',
  ],
  [
    'menu-item-12027"><a href="research/index.html" class="menu-item-link"><span class="menu-item-text">Stipendiya va grantlar</span>',
    'menu-item-12027"><a href="research/index.html" class="menu-item-link"><span class="menu-item-text">04 · Ilmiy va ta’limiy loyihalar</span>',
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
  }
}
console.log('files', files, 'n', total)

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
console.log(
  'plain left',
  (h.match(/menu-item-text">Stipendiya va grantlar</g) || []).length,
  (h.match(/menu-item-text">Nashrlar va tarjimalar</g) || []).length,
)
console.log('01 count', (h.match(/01 · Xalqaro stajirovkalar/g) || []).length)
