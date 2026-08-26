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

const re = /\b(?:src|srcset|data-src|data-lazy-src|poster)=["']([^"']+)["']/gi

function checkOne(u) {
  const parts = u.split(',').map((p) => p.trim().split(/\s+/)[0]).filter(Boolean)
  for (let url of parts) {
    if (!url || url.startsWith('data:') || url.startsWith('#') || url.startsWith('mailto:')) continue
    if (!/\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(url) && !/uploads\//i.test(url)) continue
    if (/^https?:\/\//i.test(url) || url.startsWith('//')) {
      if (/localhost/i.test(url)) missing.set('LOCALHOST:' + url, (missing.get('LOCALHOST:' + url) || 0) + 1)
      continue
    }
    total++
    let abs
    if (url.startsWith('/cyan/')) abs = path.join(root, url.slice('/cyan/'.length).split('?')[0])
    else continue // skip other relatives for this audit (homepage-relative ok separately)
    if (fs.existsSync(abs)) ok++
    else missing.set(url, (missing.get(url) || 0) + 1)
  }
}

for (const file of walk(root)) {
  const html = fs.readFileSync(file, 'utf8')
  let m
  re.lastIndex = 0
  while ((m = re.exec(html))) checkOne(m[1])
}

console.log(JSON.stringify({ total, ok, missing: missing.size }, null, 2))
;[...missing.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 25)
  .forEach(([k, v]) => console.log(v, k.slice(0, 140)))
