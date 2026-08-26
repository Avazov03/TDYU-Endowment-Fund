import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html') out.push(p)
  }
  return out
}

// Fix pages where Dasturlar children lost 01–04 numbering
const pairs = [
  // If plain labels appear as menu-item-text (not cards), restore numbers.
  // On all-programs the first child became Stipendiya — need ordered fix by id if possible.
]

// Targeted fix for all-programs: replace the four menu-item-1192x block texts
const file = 'public/cyan/all-programs/index.html'
let h = fs.readFileSync(file, 'utf8')

// dump the four items by menu-item id
for (const id of ['11922', '11923', '11924', '11925', '11926']) {
  const i = h.indexOf(`menu-item-${id}`)
  if (i < 0) {
    console.log('no', id)
    continue
  }
  console.log(id, JSON.stringify(h.slice(i, i + 220)))
}
