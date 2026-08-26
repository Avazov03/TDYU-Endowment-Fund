/**
 * Second pass: extract remaining EN leftovers exactly, then patch.
 */
import fs from 'node:fs'

function extractAround(h, needle, n = 2) {
  const out = []
  let from = 0
  while (out.length < n) {
    const i = h.indexOf(needle, from)
    if (i < 0) break
    out.push(h.slice(i, Math.min(h.length, i + 220)).replace(/\s+/g, ' '))
    from = i + needle.length
  }
  return out
}

const files = [
  'public/cyan/tuition-fee/index.html',
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
]

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8')
  console.log('\n##', f)
  for (const n of [
    'Our program',
    'Our Core',
    'Begin your',
    'The Fondga',
    'The Get Your',
    'Duration',
    'Remarks',
    'Frequency',
    'Summa',
    'Annual',
    'One-time',
    'Spring Intake',
    'Fall Intake',
    'Postgraduate',
    'All Intake',
    'April1',
    'Qabul qoidalari',
    'Submit Required',
    'preparing all',
    'Search Keyword',
    'GPA',
    'Bachelor',
    'Tuition',
    'Apply Process',
    'Get Your',
    'Academic Qualifications',
    'English Language',
    'Financial Huquqiy',
  ]) {
    if (!h.includes(n)) continue
    extractAround(h, n, 1).forEach((s) => console.log(' ', s.slice(0, 180)))
  }
}
