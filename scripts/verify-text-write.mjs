import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const checks = [
  'Huquqiy ta',
  '7 asosiy dastur',
  '31 loyiha',
  'Philip C. Jessup',
  'Mablag‘ qayerga ketadi',
  'Saylgoh',
  'tdyu-main',
  'elementor',
  'Empowering Minds',
  'Univet University',
  'B.Sc. in CSE',
]
for (const c of checks) console.log(c, '→', h.includes(c))

// sample headings
const hs = [...h.matchAll(/<(h[12])[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map((m) => m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(Boolean)
console.log('H1/H2 sample:', [...new Set(hs)].slice(0, 20))

const menus = [...h.matchAll(/menu-item-text">([^<]+)/g)].map((m) => m[1])
console.log('Menu sample:', [...new Set(menus)].slice(0, 25))

// broken attr check
console.log('broken EditURI?', h.includes('TahrirlashURI') || h.includes('EditURI'))
console.log('size', h.length)
