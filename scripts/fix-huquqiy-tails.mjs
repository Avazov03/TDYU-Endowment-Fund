import fs from 'node:fs'

const f = 'public/cyan/admission-requirements/index.html'
let h = fs.readFileSync(f, 'utf8')

const tails = [
  ' Each academic program includes tuition fees, registration char',
  'Each academic program includes tuition fees, registration char',
]

for (const t of tails) {
  while (h.includes(t)) {
    const i = h.indexOf(t)
    let end = i + t.length
    while (end < h.length && h[end] !== '<' && end - i < 200) end++
    console.log('rm', JSON.stringify(h.slice(i, end)))
    h = h.slice(0, i) + h.slice(end)
  }
}

// also any remaining "Each academic"
while (h.includes('Each academic')) {
  const i = h.indexOf('Each academic')
  let start = i
  if (h[i - 1] === ' ') start = i - 1
  let end = i
  while (end < h.length && h[end] !== '<' && end - i < 300) end++
  console.log('rm2', JSON.stringify(h.slice(start, end)))
  h = h.slice(0, start) + h.slice(end)
}

fs.writeFileSync(f, h)
console.log('done')
