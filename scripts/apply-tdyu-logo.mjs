/**
 * Swap Univet logos for TDYU Endowment brand assets across cyan HTML.
 */
import fs from 'node:fs'
import path from 'node:path'

const pairs = [
  // Header / light logos
  [
    '/cyan/wp-content/uploads/sites/17/2025/11/logo-cyan.png',
    '/brand/tdyu-logo.png',
  ],
  // Footer / dark logos
  [
    '/cyan/wp-content/uploads/sites/17/2025/11/logo-white1-min.png',
    '/brand/tdyu-logo-white.svg',
  ],
  // Preloader
  [
    '/cyan/wp-content/uploads/sites/17/2025/12/Asset-2-11.png',
    '/brand/tdyu-mark.png',
  ],
  // Favicons
  [
    '/cyan/wp-content/uploads/sites/17/2025/12/cropped-Asset-2-11-32x32.png',
    '/brand/tdyu-mark.png',
  ],
  [
    '/cyan/wp-content/uploads/sites/17/2025/12/cropped-Asset-2-11-192x192.png',
    '/brand/tdyu-mark.png',
  ],
  [
    '/cyan/wp-content/uploads/sites/17/2025/12/cropped-Asset-2-11-180x180.png',
    '/brand/tdyu-mark.png',
  ],
]

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html' || e.name.endsWith('.html')) out.push(p)
  }
  return out
}

let files = 0
let hits = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    hits += c
    changed = true
  }
  if (!changed) continue
  fs.writeFileSync(file, h)
  files++
}
console.log('files', files, 'hits', hits)

// Brand CSS for sizing
const cssPath = 'public/tdyu-brand-overrides.css'
let css = fs.readFileSync(cssPath, 'utf8')
const block = `
/* TDYU logo sizing */
.rstb-site-logo img,
.loader-icon img {
  height: 52px !important;
  width: auto !important;
  max-width: 240px !important;
  object-fit: contain !important;
}
.loader-icon img {
  height: 72px !important;
  max-width: 120px !important;
}
header .rstb-site-logo img {
  height: 48px !important;
}
`

if (!css.includes('TDYU logo sizing')) {
  css += block
  fs.writeFileSync(cssPath, css)
  console.log('css updated')
}
