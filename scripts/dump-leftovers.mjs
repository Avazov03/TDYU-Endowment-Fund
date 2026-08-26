import fs from 'node:fs'

const needles = [
  'Admission Huquqiy asos',
  'Huquqiy asos',
  'BoshBlog',
  'Advancing Knowledge',
  'For graduate programs',
  'Selected applicants',
  'Additional Huquqiy',
  'Event Details',
  'Faculty Members',
  'Join TDYU',
  'Discover Campus',
  'Graduate Programs',
  'Campus Life',
  'Academic Activities',
  'Classrooms',
  'Graduation Ceremony',
  'Campus life',
  'Academic Faculty',
  '>Faculty<',
  'menu-item-text">Faculty',
]

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

for (const p of pages) {
  const h = fs.readFileSync(`public/cyan/${p}/index.html`, 'utf8')
  console.log('\n####', p)
  for (const n of needles) {
    const i = h.indexOf(n)
    if (i < 0) continue
    console.log(n, '→', JSON.stringify(h.slice(i, i + 160)))
  }
}
