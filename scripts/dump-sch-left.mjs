import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/scholarships/index.html', 'utf8')
let i = h.indexOf('We actively')
console.log('We actively count', h.split('We actively').length - 1)
while (i >= 0) {
  const e = Math.min(
    ...[h.indexOf('</p>', i), h.indexOf('</div>', i)].filter((x) => x > 0),
  )
  console.log(JSON.stringify(h.slice(i, e)))
  i = h.indexOf('We actively', i + 10)
}
i = 0
let c = 0
while ((i = h.indexOf('First Name', i)) >= 0 && c < 8) {
  console.log('FN', JSON.stringify(h.slice(i - 20, i + 40)))
  i += 10
  c++
}
