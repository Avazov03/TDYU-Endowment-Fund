/**
 * Audit patched Sahifalar pages for HTML corruption + leftover English.
 */
import fs from 'node:fs'

const pages = [
  'alumni',
  'research',
  'scholarships',
  'events',
  'libraries',
  'faq',
  'gallery',
  'vice-chancellor',
  'about-us',
  'mission-value',
]

const corruptRe =
  /ochiladiclass|class=\s*>|<\s+div|href="\s*"|src="\s*"|>\s*<\s*[a-z]|<\/[a-z]+[A-Z]/

const enWord =
  /\b(Welcome|University|Campus|Student|Students|Faculty|Research|Scholarship|Scholarships|Conference|Summit|Symposium|Forum|Ceremony|Apply|Admission|Deadline|Required|Documents|International|Library|Libraries|Gallery|Alumni Details|Event Details|Explore Our|Grant Types|Merit-Based|Innovation|Specialized|Program-Specific|How do|How can|What is|What Are|Are there|Life at|Our university|class size|housing|clubs|organizations|advising|career|learning materials|software engineer|healthcare|GPA\/grade|All Intake|Frequently Asked|Personal Information|Academic Information|Financial Information|Additional and Submission|Join TDYU|Vice-chancellor|Graduate Programs|Faculty Members|Classrooms|Graduation|Academic Activities|Campus Life)\b/i

for (const p of pages) {
  const file = `public/cyan/${p}/index.html`
  if (!fs.existsSync(file)) {
    console.log('MISSING', p)
    continue
  }
  const h = fs.readFileSync(file, 'utf8')
  const corrupt = h.match(corruptRe)
  const texts = [...h.matchAll(/>([^<]{8,200})</g)].map((m) =>
    m[1].replace(/\s+/g, ' ').trim(),
  )
  const en = [...new Set(texts.filter((t) => enWord.test(t) && !t.startsWith('⚠')))]
  console.log('\n##', p)
  console.log('corrupt:', corrupt ? corrupt[0].slice(0, 60) : 'no')
  console.log('EN count:', en.length)
  en.slice(0, 25).forEach((t) => console.log(' ·', t))
}
