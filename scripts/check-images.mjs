import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/cyan')

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

const missing = new Map()
let total = 0
let ok = 0
const localhostBroken = new Map()

const attrRe =
  /\b(?:src|srcset|data-src|data-lazy-src|data-bg|poster|href)=["']([^"']+)["']/gi

function checkUrl(raw, fileDir) {
  // srcset can have multiple
  const parts = raw.split(',').map((p) => p.trim().split(/\s+/)[0]).filter(Boolean)
  for (let u of parts) {
    if (!u || u.startsWith('data:') || u.startsWith('#') || u.startsWith('mailto:')) continue
    if (/^https?:\/\//i.test(u) || u.startsWith('//')) {
      if (/localhost\/cyan\//i.test(u)) {
        const local = u.replace(/^https?:\/\/localhost\/cyan\//i, '').split('?')[0]
        const abs = path.join(root, local)
        total++
        if (!fs.existsSync(abs)) {
          localhostBroken.set(u, (localhostBroken.get(u) || 0) + 1)
        } else ok++
      }
      continue
    }
    total++
    const abs = path.normalize(path.join(fileDir, u.split('?')[0]))
    if (fs.existsSync(abs)) ok++
    else missing.set(path.relative(root, abs).replace(/\\/g, '/'), (missing.get(path.relative(root, abs).replace(/\\/g, '/')) || 0) + 1)
  }
}

for (const file of walk(root)) {
  const html = fs.readFileSync(file, 'utf8')
  const dir = path.dirname(file)
  let m
  attrRe.lastIndex = 0
  while ((m = attrRe.exec(html))) {
    const val = m[1]
    // only media-like
    if (!/\.(png|jpe?g|webp|gif|svg|avif|ico|mp4|webm)(\?|$)/i.test(val) && !/uploads\//i.test(val)) {
      // still check localhost image urls in srcset without extension weirdness
      if (!/localhost\/cyan\/wp-content\/uploads/i.test(val)) continue
    }
    checkUrl(val, dir)
  }
  // url(...) in inline style
  const styleRe = /url\((['"]?)([^'")]+)\1\)/gi
  while ((m = styleRe.exec(html))) {
    const val = m[2]
    if (/\.(png|jpe?g|webp|gif|svg)/i.test(val) || /uploads\//i.test(val)) checkUrl(val, dir)
  }
}

console.log(JSON.stringify({ total, ok, missingUnique: missing.size, localhostBrokenUnique: localhostBroken.size }, null, 2))
console.log('\n--- TOP MISSING LOCAL ---')
;[...missing.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([k, v]) => console.log(v, k))
console.log('\n--- TOP LOCALHOST BROKEN ---')
;[...localhostBroken.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([k, v]) => console.log(v, k.slice(0, 140)))
