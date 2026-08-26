/**
 * Extract exact long English fragments for safe replace.
 */
import fs from 'node:fs'

const files = [
  'public/cyan/alumni/index.html',
  'public/cyan/research/index.html',
  'public/cyan/scholarships/index.html',
  'public/cyan/events/index.html',
]

const needles = [
  'Education goes beyond',
  'Develops effective',
  'Organizes professional',
  'Conducts research',
  'A passionate software',
  'Drives research projects',
  'Grant Opportunities',
  'Explore Our Grant',
  'Merit-Based',
  'Innovation Grant',
  'Specialized Grant',
  'Program-Specific',
  'Student Activity Fee',
  'Are there scholarships',
  'How do I apply',
  'What is the average',
  'How can I participate',
  'Grant Apply Form',
  'International Students',
  'University-approved English',
  'Proof of ability',
  'Minimum GPA',
  'By 4 Researchers',
  'student life goes beyond',
  'Innovative Research',
  'Transformational Leadership',
  'Academic , Recognition',
  'Event Details',
  'Life at Our',
  'Welcome to the TDYU',
]

for (const file of files) {
  const h = fs.readFileSync(file, 'utf8')
  console.log('\n####', file)
  for (const n of needles) {
    const i = h.indexOf(n)
    if (i < 0) continue
    console.log(JSON.stringify(h.slice(i, i + 220)))
  }
}
