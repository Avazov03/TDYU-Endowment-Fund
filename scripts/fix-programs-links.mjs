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

let files = 0
let hits = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  const before = h
  // Any programs/.../index.html → all-programs
  h = h.replace(/(?:\.\.\/)*programs\/[^"'#\s]+\/index\.html/g, (m) => {
    hits++
    const depth = (m.match(/\.\.\//g) || []).length
    return '../'.repeat(depth) + 'all-programs/index.html'
  })
  // Dasturlar parent # → all-programs when it's the programs menu
  // (leave generic # alone)
  if (h === before) continue
  fs.writeFileSync(file, h)
  files++
}
console.log('files', files, 'program links', hits)

// also re-fix leftover EN announcement if still present
let n = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  if (!h.includes('New digital resources available')) continue
  h = h.split('New digital resources available').join('Yangi raqamli resurslar mavjud')
  fs.writeFileSync(file, h)
  n++
}
console.log('announcement fixed files', n)
