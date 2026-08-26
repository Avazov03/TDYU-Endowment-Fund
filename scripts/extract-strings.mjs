import fs from 'node:fs'
import path from 'node:path'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

const files = walk('public/cyan')
const re = />([A-Za-z][^<>{}]{2,90})</g
const counts = new Map()

for (const file of files) {
  let h = fs.readFileSync(file, 'utf8')
  h = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  let m
  while ((m = re.exec(h))) {
    const t = m[1].replace(/\s+/g, ' ').trim()
    if (!/[A-Za-z]{3}/.test(t)) continue
    if (/^(http|www|wp-|menu-|elementor|svg|path|function|var |const |class |id=)/i.test(t)) continue
    if (/\.(png|jpg|js|css|html|svg|woff)/i.test(t)) continue
    if (/^[A-Z0-9._-]+$/i.test(t) && t.includes('.')) continue
    counts.set(t, (counts.get(t) || 0) + 1)
  }
}

;[...counts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 150)
  .forEach(([t, c]) => console.log(`${c}\t${t}`))
