import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const logos = [...h.matchAll(/src="([^"]*(?:logo|Asset-2|univet)[^"]*)"/gi)].map((m) => m[1])
console.log([...new Set(logos)])

// also rstb-site-logo blocks
let i = 0
while ((i = h.indexOf('rstb-site-logo', i)) !== -1 && i < h.length) {
  console.log('---', JSON.stringify(h.slice(i, i + 220)))
  i += 20
  if (i > 500000) break
}
