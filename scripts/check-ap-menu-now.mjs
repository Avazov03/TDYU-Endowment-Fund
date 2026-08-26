import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
const menu = [...h.matchAll(/menu-item-text[^>]*>([^<]+)/g)].map((m) => m[1].trim())
const prog = menu.filter((t) => /Stipendiya|Tanlov|Nashr|stajirov|Ilmiy|01 ·|02 ·|03 ·|04 ·|Dastur/i.test(t))
console.log([...new Set(prog)])

// count 01
console.log('01 count', (h.match(/01 · Xalqaro stajirovkalar/g) || []).length)
console.log('plain Stipendiya menu', (h.match(/menu-item-text">Stipendiya va grantlar</g) || []).length)
