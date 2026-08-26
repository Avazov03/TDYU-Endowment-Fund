import fs from 'node:fs'

const checks = {
  'public/cyan/index.html': [
    'Stanford',
    'Harvard',
    'Collage',
    'arts and',
  ],
  'public/cyan/blog/index.html': ['Xalqaro arizalar Start', 'Start Your Study'],
  'public/cyan/tuition-fee/index.html': ['Xalqaro arizalar Tuition', 'Tuition', '>Program<'],
  'public/cyan/apply-now/index.html': [
    'Applying for need',
    'Financial aid',
    'Additional and Submission',
    'Upload File',
    'Do Your Need',
    'Contact Now',
  ],
  'public/cyan/all-programs/index.html': ['Graduate'],
  'public/cyan/contact/index.html': ['Admission'],
}

for (const [file, needles] of Object.entries(checks)) {
  const h = fs.readFileSync(file, 'utf8')
  console.log('\n##', file)
  for (const n of needles) {
    const i = h.indexOf(n)
    if (i < 0) {
      console.log('MISS', n)
      continue
    }
    console.log(n, '→', JSON.stringify(h.slice(i, i + 120)))
  }
}
