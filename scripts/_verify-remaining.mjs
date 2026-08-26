import fs from 'node:fs'

function check(file, needles) {
  const h = fs.readFileSync(file, 'utf8')
  console.log('\n===', file)
  for (const t of needles) {
    if (h.includes(t)) console.log('STILL', t)
  }
  const tabs = [...h.matchAll(/e-n-tab-title-text">\s*([^<]+)\s*</g)].map((x) => x[1].trim())
  if (tabs.length) console.log('tabs', tabs)
  const title = (h.match(/<title>([^<]+)/) || [])[1]
  console.log('title', title)
}

const en = [
  'Our program costs',
  'First Name',
  'Last Name',
  'Email Address',
  'Type your',
  'Enter your GPA',
  'Search Keyword',
  'Required Documents',
  'English Language',
  'Entrance Exam',
  'Financial Huquqiy',
  'Visa Huquqiy',
  'Personal Information',
  'Admissions',
  'Programs Cost',
  'Cost Summary',
  'Spring Intake',
  'Fall Intake',
  'Postgraduate',
  'Valid passport',
  'IELTS',
  'Work experience',
  'Medical clearance',
  'National ID',
  'passport-sized',
  'less than $',
  'Select Board',
  'Higher Secondary',
  'GPA / CGPA',
  'Secondary School',
  'Your Telefon',
  'Xalqaro dasturlar',
  'Ta’lim va grantlar — 48%',
  'Magistratura',
  'Begin your academic',
  'Advance your career',
  'Join a diverse',
  '+81112522552',
  'Adnations',
  'Appellation',
  'Classes Begin',
  'Applications Opens',
]

check('public/cyan/tuition-fee/index.html', en)
check('public/cyan/how-to-apply/index.html', en)
check('public/cyan/admission-requirements/index.html', en)
check('public/cyan/cost-financial-aid/index.html', en)
check('public/cyan/apply-now/index.html', en)

// dump remaining labels on apply-now
const h = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
const labels = [...new Set([...h.matchAll(/<label>([^<]+)<\/label>/gi)].map((m) => m[1]))]
console.log('\nlabels', labels)
const ph = [...new Set([...h.matchAll(/placeholder="([^"]+)"/gi)].map((m) => m[1]))]
console.log('ph', ph)
