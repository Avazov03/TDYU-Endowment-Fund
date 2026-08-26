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

const pairs = [
  ['> Program</th>', '> Dastur</th>'],
  ['>Program</th>', '>Dastur</th>'],
  ['Qo‘llab-quvvatlash email', 'Qo‘llab-quvvatlash (email)'],
  ['Support Email', 'Qo‘llab-quvvatlash'],
]

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
    n += c
  }
}
console.log('n', n)

// final visible EN on priority pages — stricter
const enWord =
  /\b(Welcome|About Our|More About|Apply Today|View All|Read More|Learn More|Get Started|Contact Now|Do Your|First Name|Last Name|Select Gender|Household|Financial aid|Upload File|Academic Qualifications|Tuition Fee|Technology fee|Student Activity|Faculty of|Department of|International Students|Start Your|Graduate Tuition|Doctoral|Amount \(USD\)|Mandatory for|Application Fee|Designed By)\b/i

for (const p of [
  'index',
  'alumni',
  'research',
  'scholarships',
  'events',
  'about-us',
  'mission-value',
  'vice-chancellor',
  'all-programs',
  'apply-now',
  'tuition-fee',
  'contact',
  'blog',
]) {
  const file = p === 'index' ? 'public/cyan/index.html' : `public/cyan/${p}/index.html`
  const h = fs.readFileSync(file, 'utf8')
  const texts = [...new Set(
    [...h.matchAll(/>([^<]{8,180})</g)]
      .map((m) => m[1].replace(/\s+/g, ' ').trim())
      .filter((t) => enWord.test(t)),
  )]
  if (texts.length) {
    console.log('\n', p)
    texts.slice(0, 12).forEach((t) => console.log(' ·', t))
  }
}
console.log('\ndone')
