import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/index.html', 'utf8')
console.log('old logo-cyan', h.includes('logo-cyan.png'))
console.log('old white', h.includes('logo-white1-min.png'))
console.log('old asset', h.includes('Asset-2-11.png'))
console.log('brand hits', [...h.matchAll(/\/brand\/tdyu-[a-z.-]+/g)].map((m) => m[0]))
