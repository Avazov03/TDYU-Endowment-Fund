import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/cost-financial-aid/index.html', 'utf8')
let i = 0
while ((i = h.indexOf('Our program costs', i)) !== -1) {
  let end = i
  while (end < h.length && h[end] !== '<') end++
  console.log(JSON.stringify(h.slice(i, end)))
  console.log('---')
  i = end
}
