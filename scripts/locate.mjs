import fs from 'node:fs'
import path from 'path'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

for (const file of walk('public/cyan')) {
  const h = fs.readFileSync(file, 'utf8')
  for (const needle of ['Collage of arts', 'Building Yet', 'Skills and TDYU']) {
    const i = h.indexOf(needle)
    if (i >= 0) {
      console.log(path.relative('public/cyan', file))
      console.log(JSON.stringify(h.slice(i, i + 90)))
    }
  }
}
