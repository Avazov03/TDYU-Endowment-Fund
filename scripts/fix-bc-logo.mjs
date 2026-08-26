import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const pairs = [
  // FAQ tab
  ['> University </span>', '> Fond </span>'],
  ['>University </span>', '>Fond </span>'],

  // CTA leftover
  ['TDYU ga qo‘shiling', 'Xayriya'],
  ["TDYU ga qo'shiling", 'Xayriya'],

  // breadcrumb on archive pages wrongly marked as detail
  // events archive breadcrumb current item
]

let files = 0
let n = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let c = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const k = h.split(a).length - 1
    h = h.split(a).join(b)
    c += k
  }
  if (c) {
    fs.writeFileSync(file, h)
    files++
    n += c
  }
}
console.log('global', files, n)

// Fix events page breadcrumb: ⚠ Tadbir tafsilotlari → Tadbirlar (archive, not detail)
const evFile = 'public/cyan/events/index.html'
let ev = fs.readFileSync(evFile, 'utf8')
const bcStart = ev.indexOf('rstb-breadcrumb')
const bcEnd = ev.indexOf('</div>', bcStart + 50)
const bc = ev.slice(bcStart, bcEnd + 6)
console.log('BC snippet:', bc.replace(/\s+/g, ' ').slice(0, 400))

// In breadcrumb only, replace warning detail label with Tadbirlar
if (bc.includes('Tadbir tafsilotlari')) {
  const fixedBc = bc
    .split('⚠ Tadbir tafsilotlari')
    .join('Tadbirlar')
    .split('Tadbir tafsilotlari')
    .join('Tadbirlar')
  ev = ev.slice(0, bcStart) + fixedBc + ev.slice(bcEnd + 6)
  fs.writeFileSync(evFile, ev)
  console.log('events breadcrumb fixed')
}

// alumni breadcrumb if similar
for (const [file, label] of [
  ['public/cyan/alumni/index.html', 'Alumni'],
  ['public/cyan/research/index.html', 'Loyihalar'],
  ['public/cyan/scholarships/index.html', 'Grantlar'],
]) {
  let h = fs.readFileSync(file, 'utf8')
  const s = h.indexOf('rstb-breadcrumb')
  if (s < 0) continue
  const e = h.indexOf('</div>', s + 50)
  let chunk = h.slice(s, e + 6)
  const before = chunk
  // if breadcrumb shows detail/warning for listing page, fix to section name
  if (chunk.includes('⚠ Tadbir tafsilotlari') || chunk.includes('⚠ Alumni tafsilotlari') || chunk.includes('⚠ Loyiha tafsilotlari')) {
    chunk = chunk
      .split('⚠ Tadbir tafsilotlari')
      .join(label)
      .split('⚠ Alumni tafsilotlari')
      .join(label)
      .split('⚠ Loyiha tafsilotlari')
      .join(label)
    h = h.slice(0, s) + chunk + h.slice(e + 6)
    fs.writeFileSync(file, h)
    console.log('fixed bc', file, label)
  } else {
    console.log('bc ok', file, chunk.includes(label))
  }
}

// logo: find image alts in header
const ev2 = fs.readFileSync(evFile, 'utf8')
const logos = [...ev2.matchAll(/alt="([^"]*univet[^"]*|[^"]*logo[^"]*|[^"]*Univet[^"]*)"/gi)].map((m) => m[1])
console.log('logo alts', [...new Set(logos)].slice(0, 10))
const img = [...ev2.matchAll(/rstb-header[\s\S]{0,3000}/)].slice(0, 1)
const alts = [...(img[0]?.[0] || '').matchAll(/alt="([^"]*)"/g)].map((m) => m[1])
console.log('header alts', alts.slice(0, 15))
