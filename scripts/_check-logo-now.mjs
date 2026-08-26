import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const m = h.match(/\/brand\/tdyu-logo[a-z.-]*/g) || []
console.log('index logos', m)

// force svg everywhere still on png
import path from 'node:path'
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}
let n = 0
for (const f of walk('public/cyan')) {
  let x = fs.readFileSync(f, 'utf8')
  if (!x.includes('/brand/tdyu-logo.png')) continue
  x = x.split('/brand/tdyu-logo.png').join('/brand/tdyu-logo.svg')
  fs.writeFileSync(f, x)
  n++
}
console.log('forced svg files', n)
