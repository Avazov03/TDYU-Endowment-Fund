import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
const start = h.indexOf('Our program costs are designed')
let end = start
while (end < h.length && h[end] !== '<') end++
console.log(JSON.stringify(h.slice(start, end)))
console.log('len', end - start)

const h2 = fs.readFileSync('public/cyan/cost-financial-aid/index.html', 'utf8')
const s2 = h2.indexOf('Our program costs are designed')
let e2 = s2
while (e2 < h2.length && h2[e2] !== '<') e2++
console.log('\nSHAFF:', JSON.stringify(h2.slice(s2, e2)))
