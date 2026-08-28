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
  ['New digital resources available', 'Yangi raqamli resurslar mavjud'],
  ['Others', 'Boshqalar'],
]

let hits = 0
for (const f of walk('public/cyan')) {
  let h = fs.readFileSync(f, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    // only replace visible Others menu label carefully
    if (a === 'Others') {
      const before = h
      h = h.replace(/>Others</g, '>Boshqalar<')
      if (h !== before) n++
      continue
    }
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (!n) continue
  fs.writeFileSync(f, h)
  hits += n
}
console.log('fixed', hits)
