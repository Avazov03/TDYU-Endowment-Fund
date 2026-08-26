import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
console.log('size', h.length)
console.log('has main', h.includes('tdyu-main'))
console.log('has hero', h.includes('tdyu-hero'))
console.log('has css', h.includes('tdyu-endowment-sections'))
console.log('has js', h.includes('tdyu-endowment.js'))
console.log('Missiya count', (h.match(/Missiya/g) || []).length)
console.log('Xayriya count', (h.match(/Xayriya/g) || []).length)
console.log('Saylgoh', h.includes('Saylgoh'))
console.log('31 loyiha', h.includes('31'))
console.log('Jessup', h.includes('Jessup'))

const i = h.indexOf('<main')
console.log('main snippet:\n', h.slice(i, i + 500))

const labels = [...h.matchAll(/menu-item-text">([^<]+)/g)].map((m) => m[1])
console.log('unique nav labels', [...new Set(labels)])

const pages = [
  'about-us',
  'all-programs',
  'vice-chancellor',
  'alumni',
  'tuition-fee',
  'scholarships',
  'apply-now',
  'blog',
  'contact',
]
for (const p of pages) {
  const html = fs.readFileSync(`public/cyan/${p}/index.html`, 'utf8')
  console.log(p, 'main?', html.includes('tdyu-main'), 'size', html.length)
}
