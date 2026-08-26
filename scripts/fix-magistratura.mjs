import fs from 'node:fs'
import path from 'node:path'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

let found = false
for (const f of walk('public/cyan')) {
  const h = fs.readFileSync(f, 'utf8')
  const idx = h.indexOf('Magistratura')
  if (idx >= 0) {
    const snip = h.slice(idx, idx + 50)
    if (snip.includes('Dastur') || /Magistratura\s+\S+/.test(snip)) {
      console.log(path.relative('public/cyan', f))
      console.log(JSON.stringify(snip))
      console.log([...snip].map((c) => c + '(' + c.codePointAt(0).toString(16) + ')').join(' '))
      found = true
      if (found) break
    }
  }
}

// also fix remaining leftovers globally with regex
const fixes = [
  [/Magistratura\s+Dasturlar/g, 'Magistratura dasturlari'],
  [/Page 2/g, '2-sahifa'],
  [/Sports Activities/g, 'Sport mashg‘ulotlari'],
  [/Kampus Organizations/g, 'Kampus tashkilotlari'],
  [/Telefon Number/g, 'Telefon raqami'],
  [/admission@univet\.edu/g, 'admission@tdyu-endowment.uz'],
  [/Dasturlar Cost/g, 'Dasturlar narxi'],
  [/Cost Xulosa/g, 'Narx xulosasi'],
  [/Jami Fast Yil/g, 'Jami birinchi yil'],
  [/Jami Second Yil/g, 'Jami ikkinchi yil'],
  [/Howard Esther/g, 'Esther Howard'],
]

let n = 0
for (const f of walk('public/cyan')) {
  let h = fs.readFileSync(f, 'utf8')
  let o = h
  for (const [re, to] of fixes) o = o.replace(re, to)
  if (o !== h) {
    fs.writeFileSync(f, o)
    n++
  }
}
console.log('fixed files', n)
