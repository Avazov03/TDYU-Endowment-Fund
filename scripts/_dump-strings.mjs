import fs from 'node:fs'

function dumpAround(file, needle, pad = 40) {
  const h = fs.readFileSync(file, 'utf8')
  let i = 0
  let n = 0
  while ((i = h.indexOf(needle, i)) !== -1 && n < 8) {
    console.log('---', needle, n, '---')
    console.log(JSON.stringify(h.slice(Math.max(0, i - pad), i + needle.length + pad)))
    i += needle.length
    n++
  }
}

const x = 'public/cyan/apply-now/index.html'
for (const n of [
  'Personal Information',
  'First Name',
  'Huquqiy asos and Deadlines',
  'Admissions Huquqiy',
  'English Language',
  'Required Documents',
  'Entrance Exam',
  'Financial Huquqiy',
  'Visa Huquqiy',
  'Akademik talablar',
  'Ariza muddatlari',
  'Yordam kerakmi',
  'Ta’lim ma’lumotlari',
  'Moliyaviy ma’lumotlar',
  'Qo‘shimcha va yuborish',
  'Last Name',
  'Email Address',
  'Type your phone',
  'Country',
  'GPA',
  'secondary school',
  'higher secondary',
  'dd/mm/yy',
  'Submit',
  'Apply',
]) dumpAround(x, n, 30)

console.log('\n==== SHAFF ====')
const s = 'public/cyan/cost-financial-aid/index.html'
for (const n of [
  'Programs Cost',
  'Cost Summary',
  'Our program costs',
  'Magistratura',
  'Xalqaro arizalar',
  'Ta’lim va grantlar',
  'Begin your academic',
  'Search Keyword',
]) dumpAround(s, n, 50)

console.log('\n==== TUITION TABS ====')
dumpAround('public/cyan/tuition-fee/index.html', 'e-n-tab-title-text', 5)
