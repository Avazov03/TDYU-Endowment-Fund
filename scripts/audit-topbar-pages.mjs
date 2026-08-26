/**
 * Audit top-bar pages: Hisobotlar, Yordam, Huquqiy asos, Aloqa
 */
import fs from 'node:fs'

const pages = [
  { label: 'Hisobotlar', file: 'public/cyan/tuition-fee/index.html' },
  { label: 'Yordam', file: 'public/cyan/apply-now/index.html' },
  { label: 'Huquqiy asos', file: 'public/cyan/admission-requirements/index.html' },
  { label: 'Aloqa', file: 'public/cyan/contact/index.html' },
]

// Also check where Huquqiy asos actually links
const home = fs.readFileSync('public/cyan/index.html', 'utf8')
for (const label of ['Hisobotlar', 'Yordam', 'Huquqiy asos', 'Huquqiy Asos', 'Aloqa']) {
  const i = home.indexOf(`>${label}<`)
  if (i < 0) {
    const j = home.indexOf(label)
    if (j > 0) console.log('home context', label, home.slice(j - 80, j + 80).replace(/\s+/g, ' '))
  } else {
    console.log('home link', label, home.slice(i - 120, i + 40).replace(/\s+/g, ' '))
  }
}

const en = [
  'Tuition',
  'Fee',
  'Apply Now',
  'Admission',
  'Requirement',
  'First Name',
  'Last Name',
  'Email Address',
  'Submit',
  'University',
  'Univet',
  'Student',
  'Campus',
  'Scholarship',
  'Get Started',
  'Learn More',
  'Welcome',
  'Kentucky',
  'Huston',
  '270-555',
  'How to Apply',
  'Financial Aid',
  'Cost of',
]

for (const p of pages) {
  if (!fs.existsSync(p.file)) {
    console.log('\n##', p.label, 'MISSING', p.file)
    continue
  }
  const h = fs.readFileSync(p.file, 'utf8')
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1]
  const h1 = [...h.matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1])
  const leftovers = en.filter((x) => h.includes(x))
  console.log('\n##', p.label)
  console.log(' file', p.file)
  console.log(' title', title)
  console.log(' h1', h1.slice(0, 3))
  console.log(' polish', h.includes('tdyu-page-polish') || h.includes('tdyu-menu-mark'))
  console.log(' EN leftovers', leftovers.slice(0, 15))
}
