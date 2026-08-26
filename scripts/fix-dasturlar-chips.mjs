/**
 * Fix Dasturlar card chips + remaining UI; point Batafsil to stay on all-programs
 * or scholarships where sensible — keep hrefs but rename chips.
 */
import fs from 'node:fs'
import path from 'node:path'

function patchFile(file, pairs) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (n) fs.writeFileSync(file, h)
  return n
}

const chipPairs = [
  ['> O‘quv dasturlari </a>', '> Talaba </a>'],
  ['> Ta’lim rahbariyati </a>', '> Xodim </a>'],
  ['> Jinoyat huquqi </a>', '> Doktorant </a>'],
  ['> Xalqaro huquq </a>', '> Alumni </a>'],
  // also without spaces variants
  ['>O‘quv dasturlari</a>', '>Talaba</a>'],
  ['>Ta’lim rahbariyati</a>', '>Xodim</a>'],
  ['>Jinoyat huquqi</a>', '>Doktorant</a>'],
  ['>Xalqaro huquq</a>', '>Alumni</a>'],
]

const n1 = patchFile('public/cyan/all-programs/index.html', chipPairs)
console.log('chips', n1)

// Fix Dasturlar submenu labels on pages where they drifted
// Map wrong short labels back to numbered program names when they appear as menu-item-text
const menuPairs = [
  // only when these are wrong standalone under programs mega - careful
]

// Sync: on all-programs, find menu items that link to program pages with wrong labels
const h = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
for (const n of ['Stipendiya va grantlar', 'Tanlovlar va musobaqalar', 'Nashrlar va tarjimalar', '01 ·']) {
  const i = h.indexOf(`menu-item-text">${n}`)
  const j = h.indexOf(`menu-item-text">${n}`)
  console.log('menu text', n, i >= 0 || h.includes(`>${n}</span>`))
}

// dump submenu near faculty-areas / programs mega
const k = h.indexOf('faculty-areas')
console.log('faculty-areas context labels:')
const chunk = h.slice(k - 500, k + 2500)
;[...chunk.matchAll(/menu-item-text[^>]*>([^<]+)/g)].forEach((m) => console.log(' ·', m[1].trim()))

// Point broken ../programs/* Batafsil links to # or scholarships/all-programs to avoid 404
// Safer: rewrite program detail hrefs to stay on list with hash, or to apply-now
let h2 = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
const before = h2
h2 = h2.split('href="../programs/').join('href="../scholarships/index.html#')
// that would make ugly URLs like scholarships/index.html#m-ed-in-...
// Better: all batafsil from programs go to scholarships or apply-now
h2 = before
const rewrites = [
  ['href="../programs/m-ed-in-educational-leadership/index.html"', 'href="../scholarships/index.html"'],
  ['href="../programs/b-ed-in-educational-leadership/index.html"', 'href="../scholarships/index.html"'],
  ['href="../programs/m-sc-in-software-engineering/index.html"', 'href="../events/index.html"'],
  ['href="../programs/b-sc-in-software-engineering/index.html"', 'href="../research/index.html"'],
  ['href="../programs/b-ed-in-curriculum-instruction/index.html"', 'href="../all-programs/index.html"'],
  ['href="../programs/llb-in-criminal-justice/index.html"', 'href="../research/index.html"'],
  ['href="../programs/llm-in-international-law/index.html"', 'href="../events/index.html"'],
  ['href="../programs/llb-in-international-law/index.html"', 'href="../scholarships/index.html"'],
]
let n2 = 0
for (const [a, b] of rewrites) {
  if (!h2.includes(a)) continue
  const c = h2.split(a).length - 1
  h2 = h2.split(a).join(b)
  n2 += c
}
fs.writeFileSync('public/cyan/all-programs/index.html', h2)
console.log('href rewrites', n2)

// verify chips
const h3 = fs.readFileSync('public/cyan/all-programs/index.html', 'utf8')
console.log(
  'old chips left',
  ['O‘quv dasturlari', 'Ta’lim rahbariyati', 'Jinoyat huquqi', 'Xalqaro huquq'].filter((x) =>
    h3.includes(`> ${x} </a>`),
  ),
)
