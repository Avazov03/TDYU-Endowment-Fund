/**
 * Fix leftovers + mangled strings on patched pages (exact replace only).
 */
import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const globalPairs = [
  // mangled / bad partials
  ['Admission Huquqiy asos', 'Qabul qoidalari'],
  ['Additional Huquqiy asos (Program-Specific)', 'Dasturga oid qo‘shimcha shartlar'],
  ['Additional Huquqiy asos', 'Qo‘shimcha shartlar'],
  ['National ID/Passportgrams)', 'Pasport yoki ID'],
  ['National ID/Passportgrams', 'Pasport yoki ID'],
  ['info@univet.dom', 'info@tdyu-endowment.uz'],
  ['info@univet.edu', 'info@tdyu-endowment.uz'],

  // menu leftovers
  ['>Event Details</span>', '>⚠ Tadbir tafsilotlari</span>'],
  ['>Faculty Members 01</span>', '>Vasiylik kengashi</span>'],
  ['>Faculty Members 02</span>', '>Boshqaruv kengashi</span>'],
  ['>Faculty</span>', '>Boshqaruv</span>'],
  ['>Graduate Programs</span>', '>Dasturlar</span>'],
  ['Join TDYU Now ', 'Xayriya '],
  ['Discover Campus Life', 'Alumni'],
  ['>University</span>', '>TDYU</span>'],

  // common EN body
  [
    'For graduate programs: a recognized bachelor’s degree with required CGPA.',
    'Magistratura/malaka oshirish: tegishli bakalavr diplomi va akademik ko‘rsatkich.',
  ],
  [
    'For graduate programs: a  bachelor’s degree with required CGPA.',
    'Magistratura/malaka oshirish: tegishli bakalavr diplomi va akademik ko‘rsatkich.',
  ],
  [
    'For graduate programs: a bachelor’s degree with required CGPA.',
    'Magistratura/malaka oshirish: tegishli bakalavr diplomi va akademik ko‘rsatkich.',
  ],
  [
    'Selected applicants may be invited for an admission interview',
    'Tanlangan arizachilar suhbatga chaqirilishi mumkin',
  ],
  [
    'Completed secondary education (HSC/A-Level/Equivalent).',
    'O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.',
  ],
  ['TOEFL, IELTS, PTE, or equivalent test score', 'IELTS/TOEFL yoki teng kuchli til sertifikati'],
  [
    'Portfolio (Architecture, Design, Fine Arts)',
    'Portfolio yoki oldingi loyiha namunalari (agar kerak)',
  ],
  [
    'Coding/technical assessment (Computer Science, IT)',
    'Kasbiy yoki texnik baholash (dastur talabiga ko‘ra)',
  ],
  [
    'Clinical/experience: Nursing, medicine, or psychology programs may require documented hours of practice or shadowing.',
    'Amalyot/stajirovka tajribasi — dastur shartlariga muvofiq.',
  ],
  ['Completed application form', 'To‘ldirilgan ariza shakli'],
  ['Academic transcripts &amp; certificates', 'Diplom va baholar varaqasi'],
  [
    'Some programs require an entrance exam or aptitude test',
    'Ba’zi dasturlar tanlov yoki imtihon talab qilishi mumkin',
  ],
  ['Payment of application fee', 'Ariza yig‘imi (agar belgilangan bo‘lsa)'],

  [
    'TDYU Endowment Fund. It was founded in 1966, and TDYU Endowment Fund has grown into one of the leading institutions of higher education.',
    'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
  ],

  // gallery / faq tabs
  ['Campus Life ', 'Fond tadbirlari '],
  ['Campus life ', 'Fond haqida '],
  ['Academic Activities ', 'Grant marosimlari '],
  ['Classrooms &amp; Labs ', 'Xalqaro uchrashuvlar '],
  ['Graduation Ceremony ', 'Alumni uchrashuvlari '],
  ['Academic Faculty ', 'Boshqaruv '],
  ['>Programs </span>', '>Dasturlar </span>'],
]

const eventMangle =
  'BoshBlog TDYU Endowment Fund — bitiruvchilar, grantlar va xalqaro loyihalar orqali bilimga sarmoya kiritadi. Advancing Knowledge, Innovation, and Scholarly Leadership The Philip C. Jessup Moot Court.'
const eventFix =
  'Fond qo‘llab-quvvatlagan tadbir: xalqaro tanlov, kongress, nashr taqdimoti yoki alumni uchrashuvi.'

let files = 0
let total = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  const pairs = [...globalPairs]
  if (h.includes(eventMangle)) pairs.unshift([eventMangle, eventFix])
  // also shorter fragment if partially present
  if (h.includes('BoshBlog TDYU Endowment Fund')) {
    pairs.unshift([
      'BoshBlog TDYU Endowment Fund — bitiruvchilar, grantlar va xalqaro loyihalar orqali bilimga sarmoya kiritadi. Advancing Knowledge, Innovation, and Scholarly Leadership The Philip C. Jessup Moot Court.',
      eventFix,
    ])
  }
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (n) {
    fs.writeFileSync(file, h)
    files++
    total += n
  }
}
console.log('files', files, 'replacements', total)
