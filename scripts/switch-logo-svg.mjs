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
  // Prefer crisp transparent SVG in header/footer light contexts
  ['/brand/tdyu-logo.png', '/brand/tdyu-logo.svg'],
  // Keep mark PNG for favicon, but use SVG in preloader if desired:
  // preloaders can stay PNG after transparency fix
]

let n = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let c = false
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    // Don't replace favicon/mark - only logo.png
    h = h.split(a).join(b)
    c = true
  }
  if (c) {
    fs.writeFileSync(file, h)
    n++
  }
}
console.log('files', n)

// CSS: ensure transparent logos blend cleanly
const cssPath = 'public/tdyu-brand-overrides.css'
let css = fs.readFileSync(cssPath, 'utf8')
if (!css.includes('logo transparent blend')) {
  css += `
/* logo transparent blend */
.rstb-site-logo img,
.loader-icon img {
  background: transparent !important;
  mix-blend-mode: normal;
}
`
  fs.writeFileSync(cssPath, css)
  console.log('css ok')
}
