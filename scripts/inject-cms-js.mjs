import fs from 'node:fs'
import path from 'node:path'

const roots = ['public/cyan', 'public/ru', 'public/en']
const needle = '<script src="/tdyu-site-fix.js" defer></script>'
const inject = `${needle}\n<script src="/tdyu-cms.js" defer></script>`
let n = 0

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (ent.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8')
      if (html.includes('tdyu-cms.js')) continue
      if (!html.includes('tdyu-site-fix.js')) continue
      if (!html.includes(needle)) continue
      fs.writeFileSync(p, html.replace(needle, inject))
      n++
    }
  }
}

for (const root of roots) {
  if (fs.existsSync(root)) walk(root)
}
console.log('injected', n)
