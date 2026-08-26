import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/blog/index.html', 'utf8')
const i = h.indexOf('post-archive-meta')
console.log(h.slice(i, i + 500).replace(/\s+/g, ' '))
const j = h.indexOf('Yangiliklar grid')
console.log('\nmenu:', h.slice(j - 80, j + 80).replace(/\s+/g, ' '))
const k = h.indexOf('Yangiliklar Standard')
console.log('\nstd:', h.slice(k - 80, k + 80).replace(/\s+/g, ' '))
