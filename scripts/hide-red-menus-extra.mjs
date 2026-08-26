/**
 * Hide leftover demo menu labels that never got ⚠ (Others, bare Yangiliklar→blog-grid).
 */
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

function findLiOpenStart(html, spanIndex) {
  let i = spanIndex
  while (i >= 0) {
    const li = html.lastIndexOf('<li', i)
    if (li < 0) return -1
    const gt = html.indexOf('>', li)
    if (gt > spanIndex) {
      i = li - 1
      continue
    }
    const tag = html.slice(li, gt + 1)
    if (/\bmenu-item\b/.test(tag)) return li
    i = li - 1
  }
  return -1
}

function addHide(liOpen) {
  if (/\btdyu-ia-hide\b/.test(liOpen)) return liOpen
  if (/class="/.test(liOpen)) return liOpen.replace(/class="/, 'class="tdyu-ia-hide ')
  return liOpen.replace('<li', '<li class="tdyu-ia-hide"')
}

const patterns = [
  /<span class="menu-item-text"[^>]*>Others<\/span>/g,
  /<span class="menu-item-text"[^>]*>⚠ Others<\/span>/g,
  // layout demo under Yangiliklar that lost the warn prefix
  /href="[^"]*blog-grid\/index\.html"[^>]*>\s*<span class="menu-item-text">Yangiliklar<\/span>/g,
  /href="[^"]*blog-grid-sidebar\/index\.html"[^>]*>\s*<span class="menu-item-text">Yangiliklar<\/span>/g,
  /href="[^"]*blog-list-sidebar\/index\.html"[^>]*>\s*<span class="menu-item-text">Yangiliklar<\/span>/g,
  /href="[^"]*blog-details\/index\.html"[^>]*>\s*<span class="menu-item-text">Yangiliklar<\/span>/g,
]

let files = 0
let ops = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const re of patterns) {
    const matches = [...h.matchAll(re)]
    for (let m = matches.length - 1; m >= 0; m--) {
      const match = matches[m]
      const liStart = findLiOpenStart(h, match.index)
      if (liStart < 0) continue
      const gt = h.indexOf('>', liStart)
      const open = h.slice(liStart, gt + 1)
      const next = addHide(open)
      if (next === open) continue
      h = h.slice(0, liStart) + next + h.slice(gt + 1)
      ops++
      changed = true
    }
  }
  if (changed) {
    fs.writeFileSync(file, h)
    files++
  }
}
console.log('files', files, 'ops', ops)
