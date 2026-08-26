import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
console.log('warn Sahifalar', h.includes('⚠ Sahifalar'))
console.log('Sahifalar count', (h.match(/>Sahifalar</g) || []).length)
console.log('hide count', (h.match(/tdyu-ia-hide/g) || []).length)
console.log('css', h.includes('tdyu-menu-mark.css'))
console.log(
  'warn leftovers',
  [...new Set(h.match(/⚠[^<]{0,50}/g) || [])].sort(),
)

function contextAround(needle, n = 2) {
  let from = 0
  let c = 0
  while (c < n) {
    const i = h.indexOf(needle, from)
    if (i < 0) break
    console.log('\n##', needle, c)
    console.log(h.slice(Math.max(0, i - 140), i + needle.length + 40).replace(/\s+/g, ' '))
    from = i + needle.length
    c++
  }
}

contextAround('menu-item-text">Yangiliklar</span>')
contextAround('menu-item-text">Dasturlar</span>')
contextAround('menu-item-text">Sahifalar</span>')
contextAround('⚠ Yangiliklar</span>')
contextAround('⚠ Dasturlar</span>')
