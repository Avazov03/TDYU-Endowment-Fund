import fs from 'node:fs'
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

const pairs = [
  ['First name, aloqa', "Ism, aloqa"],
  ['First name fond hisobotida', 'Ism fond hisobotida'],
]

let n = 0
for (const f of walk('public/cyan')) {
  let h = fs.readFileSync(f, 'utf8')
  let c = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const k = h.split(a).length - 1
    h = h.split(a).join(b)
    c += k
  }
  if (!c) continue
  fs.writeFileSync(f, h)
  n += c
}
console.log('fixed', n)
