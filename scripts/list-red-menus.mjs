/**
 * Inventory of currently marked (⚠ / red) menu labels — sample from home + contact.
 */
import fs from 'node:fs'

const files = [
  'public/cyan/index.html',
  'public/cyan/contact/index.html',
  'public/cyan/about-us/index.html',
]
const labels = new Set()
for (const f of files) {
  if (!fs.existsSync(f)) continue
  const h = fs.readFileSync(f, 'utf8')
  for (const m of h.matchAll(/menu-item-text[^>]*>(⚠[^<]+)</g)) labels.add(m[1].trim())
  for (const m of h.matchAll(/menu-item-text" style="color:#dc2626[^>]*>([^<]+)</g))
    labels.add(m[1].trim())
  // footer
  for (const m of h.matchAll(/>(⚠ [^<]+)</g)) labels.add(m[1].trim())
}
console.log([...labels].sort().join('\n'))
