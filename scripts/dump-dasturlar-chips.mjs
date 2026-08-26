import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')

// card department links
for (const n of ['O‘quv dasturlari', "Ta’lim rahbariyati", 'Jinoyat huquqi', 'Xalqaro huquq']) {
  let i = 0
  let c = 0
  while ((i = h.indexOf(n, i)) >= 0 && c < 3) {
    console.log(n, JSON.stringify(h.slice(i - 80, i + 40)))
    i += n.length
    c++
  }
}

// Dasturlar submenu on this page
const i = h.indexOf('>Dasturlar</span>')
const chunk = h.slice(i, i + 5000)
const labels = [...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('\npage menu Dasturlar', labels.slice(0, 15))

// compare with index
const idx = fs.readFileSync('public/cyan/index.html', 'utf8')
const j = idx.indexOf('all-programs/index.html')
const chunk2 = idx.slice(j - 100, j + 2500)
const labels2 = [...chunk2.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
console.log('index menu', labels2.slice(0, 10))
