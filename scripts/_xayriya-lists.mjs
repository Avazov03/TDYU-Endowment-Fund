import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
const items = [...h.matchAll(/elementor-icon-list-text[^>]*>([^<]+)</gi)].map((m) => m[1].trim())
console.log([...new Set(items)])

// full tuition leftover paragraph(s)
let i = 0
while ((i = h.indexOf('Our program costs', i)) !== -1) {
  let end = i
  while (end < h.length && h[end] !== '<' && end < i + 500) end++
  console.log('\nPARA:', JSON.stringify(h.slice(i, end)))
  i = end
}
