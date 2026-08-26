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
  ['Archives: <span>Events</span>', 'Tadbirlar arxivi'],
  ['Archives: <span>Alumni</span>', 'Alumni arxivi'],
  ['Archives: <span>Research</span>', 'Loyihalar arxivi'],
  ['placeholder="Enter your keyword"', 'placeholder="Kalit so‘z..."'],
  ['Enter your keyword"', 'Kalit so‘z..."'],
  ['Graduate  Programs', 'Dasturlar'],
  ['>Event Details</span>', '>⚠ Tadbir tafsilotlari</span>'],
  ['Event Details</span>', '⚠ Tadbir tafsilotlari</span>'],
  // scholarships leftover headings that may remain
  ['LLM in International Law', 'Xalqaro stajirovka'],
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
console.log('files', files, 'n', n)

// verify events
const h = fs.readFileSync('public/cyan/events/index.html', 'utf8')
for (const x of [
  'BoshBlog',
  'Archives:',
  'Enter your',
  'Qidirish Keyword',
  'Your email',
  'Admission Huquqiy',
  'Event Details',
  'Graduate  Programs',
  'Educations',
  'Faculty',
]) {
  console.log(x, h.includes(x))
}
