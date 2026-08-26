import fs from 'node:fs'

const pages = [
  ['Hisobotlar', 'public/cyan/tuition-fee/index.html'],
  ['Yordam (top bar)', 'public/cyan/how-to-apply/index.html'],
  ['Yordam/Xayriya (apply)', 'public/cyan/apply-now/index.html'],
  ['Huquqiy asos', 'public/cyan/admission-requirements/index.html'],
  ['Aloqa', 'public/cyan/contact/index.html'],
  ['Shaffoflik?', 'public/cyan/cost-financial-aid/index.html'],
]

for (const [label, file] of pages) {
  if (!fs.existsSync(file)) {
    console.log('\n', label, 'MISSING')
    continue
  }
  const h = fs.readFileSync(file, 'utf8')
  const title = h.match(/<title>([^<]+)/)?.[1]
  const h1 = [...h.matchAll(/rstb-page-title[^>]*>([^<]+)/g)].map((m) => m[1])
  const headings = [...h.matchAll(/<(h2|h3)[^>]*>([\s\S]{0,80}?)<\/\1>/g)]
    .slice(0, 8)
    .map((m) => m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
  const sampleEn = [
    'Tuition',
    'Apply',
    'Admission',
    'GPA',
    'Bachelor',
    'First Name',
    'Kentucky',
    'How to',
    'Financial',
    'Requirement',
    'Document',
    'Deadline',
  ].filter((x) => h.includes(x))
  console.log('\n==', label)
  console.log(title)
  console.log('h1', h1)
  console.log('h2/h3', headings)
  console.log('EN', sampleEn)
}
