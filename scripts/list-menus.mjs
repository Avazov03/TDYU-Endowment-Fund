import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')

// Top bar links (often shorter menu)
const topLabels = []
const mainLabels = []

// Collect sequences: after each menu-item-text, note if next is submenu
const parts = h.split('menu-item-text">')
for (let i = 1; i < parts.length; i++) {
  const label = parts[i].split('<')[0]
  mainLabels.push(label)
}

// Print unique in order of first appearance (header area only = first N before footer)
// Footer usually after <footer
const footerAt = h.indexOf('<footer')
const headPart = h.slice(0, footerAt > 0 ? footerAt : h.length)
const headLabels = []
const seen = new Set()
for (const p of headPart.split('menu-item-text">').slice(1)) {
  const label = p.split('<')[0]
  if (!seen.has(label)) {
    seen.add(label)
    headLabels.push(label)
  }
}

console.log('=== HEADER menulari (birinchi uchrashuv tartibida) ===')
headLabels.forEach((l, i) => console.log(`${i + 1}. ${l}`))

// Reconstruct hierarchy from one complete menu widget by counting submenu
// Find elementor nav widget content
const navBlocks = [...headPart.matchAll(/elementor-nav-menu[\s\S]{0,200}<ul[\s\S]*?<\/ul>/gi)]
console.log('\nnav-like blocks', navBlocks.length)

// Dump ordered labels with indentation heuristic from class has-children
const re =
  /<li\b([^>]*class="([^"]*)"[^>]*)>[\s\S]*?<span class="menu-item-text">([^<]+)<\/span>/gi
let m
const items = []
while ((m = re.exec(headPart))) {
  const cls = m[2]
  const label = m[3]
  items.push({
    label,
    hasChildren: cls.includes('menu-item-has-children'),
    cls,
  })
}

console.log('\n=== HEADER li tartibi (birinchi 80) ===')
items.slice(0, 80).forEach((it, i) => {
  console.log(`${i + 1}. ${it.hasChildren ? '[+]' : '   '} ${it.label}`)
})
