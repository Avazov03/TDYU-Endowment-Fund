import fs from 'node:fs'

const events = fs.readFileSync('public/cyan/events/index.html', 'utf8')
const i = events.indexOf('BoshBlog')
console.log('BoshBlog full:', JSON.stringify(events.slice(i - 120, i + 450)))

const sch = fs.readFileSync('public/cyan/scholarships/index.html', 'utf8')
for (const n of [
  'For graduate programs',
  'Selected applicants',
  'Additional Huquqiy',
  'bachelor',
  'CGPA',
  'admission interview',
  'Program-Specific',
  'Our university',
  'committed',
]) {
  const j = sch.indexOf(n)
  if (j >= 0) console.log('\nSCH', n, JSON.stringify(sch.slice(j, j + 200)))
}

const res = fs.readFileSync('public/cyan/research/index.html', 'utf8')
for (const n of ['For graduate programs', 'Selected applicants', 'bachelor']) {
  const j = res.indexOf(n)
  if (j >= 0) console.log('\nRES', n, JSON.stringify(res.slice(j, j + 200)))
}

const faq = fs.readFileSync('public/cyan/faq/index.html', 'utf8')
for (const n of ['Campus life', 'Academic Faculty', 'Student Life', 'Programs']) {
  const j = faq.indexOf(n)
  if (j >= 0) console.log('\nFAQ', n, JSON.stringify(faq.slice(j, j + 120)))
}
