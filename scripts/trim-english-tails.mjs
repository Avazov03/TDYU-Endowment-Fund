/**
 * Remove leftover English tails after partial replaces (exact substrings only).
 */
import fs from 'node:fs'

const tails = [
  // common hero / welcome
  [
    'Welcome to TDYU Endowment Fund. It was founded in 1966, and TDYU Endowment Fund has grown into one of the leading institutions of higher education.',
    'TDYU Endowment Fund — Toshkent davlat yuridik universiteti maqsadli kapital jamoat fondi.',
  ],
  ['Welcome to TDYU Endowment Fund', 'TDYU Endowment Fund'],
  ['Admission Requirements', 'Huquqiy asos'],
  ['About TDYU', 'Missiya'],
  ['Manzil Tour', 'TSUL brendi'],
  ['Graduate Programs', 'Dasturlar'],
  ['Scholarships', 'Grantlar'],
  ['All Events', 'Tadbirlar'],
  ['Vice-Chancellor', 'Boshqaruv'],
  ['Academics', 'Dasturlar'],

  // english tails glued after Uzbek (exact)
  [
    ' for students to engage with global challenges and contribute to sustainable solutions. At the heart of TDYU Endowment Fund lies a comm',
    '',
  ],
  [
    ' for students to engage with global challenges and contribute to sustainable',
    '',
  ],
  [
    ' institution recognized for academic excellence innovation, and social responsibility Our goal is to',
    '.',
  ],
  [
    ' institution recognized for academic excellence innovation, and social responsibility Our',
    '.',
  ],
  [' conventions', ''],
  [' their pa', ''],
  [' Believe in s', ''],
  [' passions chal', ''],
  ['king, and global awareness preparing them ', ''],
  ['rofessional pathways, our programs emphasize THE innovation creativity', ''],
  ['onal coursework specialized major subjects hands-on learning and interdisciplinary opportunities By integrating theory research and rea', ''],
  ['ates theory with practical support application With.', '.'],
  [
    'Completed secondary education (HSC/A-Level/Equivalent). Minimum GPA/grade requirements as set by the university. For graduate programs: a bachelor’s degree with required CGPA. Value ',
    '',
  ],
  [
    'Completed secondary education (HSC/A-Level/Equivalent). Minimum GPA/grade requirements as set by the university. For graduate programs: a bachelor’s degree with required CGPA. Tanlov va mukofotlarOur program costs are de',
    'Tanlov va mukofotlar — milliy va xalqaro musobaqalarni qo‘llab-quvvatlash. ',
  ],
  [
    'Completed secondary education (HSC/A-Level/Equivalent). Minimum GPA/grade requirements as set by the university. For graduate programs: a bachelor’s degree with required CGPA. ',
    '',
  ],
  ['Batafsil TSUL brendiAdvance your career with streamlined graduate program admissions.', 'TSUL brendi — xorijda markazlar va kutubxonalar.'],
  ['Batafsil TadbirkorlikJoin a diverse campus community through a simple application and visa guidance.', 'Tadbirkorlik — o‘quv kurslar va yozgi maktablar.'],
  ['Advance your career with streamlined graduate program admissions.', 'Xorijda markazlar va kutubxonalar.'],
  ['Join a diverse campus community through a simple application and visa guidance.', 'O‘quv kurslar va yozgi maktablar.'],
  ['ta’limdan nashrgacharofessional', 'ta’limdan nashrgacha. '],
  ['amalga oshiriladiking, and global awareness preparing them', 'amalga oshiriladi.'],
  ['baholanadi for students', 'baholanadi.'],
  ['ochiladi for students', 'ochiladi.'],
  ['nazorat for students', 'nazorat.'],
  ['asoslanadi. Believe in s', 'asoslanadi.'],
  ['shaffoflik their pa', 'shaffoflik.'],
  ['strategiyasi passions chal', 'strategiyasi.'],
  ['imkoniyatlar conven', 'imkoniyatlar.'],
]

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  let n = 0
  for (const [a, b] of tails) {
    if (!h.includes(a)) continue
    n += h.split(a).length - 1
    h = h.split(a).join(b)
  }
  // paint remaining English menu labels red on these pages
  for (const label of [
    'History',
    'Administration',
    'Campus Map',
    'Research Details',
    'Events Details',
    'Libraries',
    'Alumni Details',
    'Faq',
    'Gallery',
    'Sahifalar',
  ]) {
    const plain = `menu-item-text">${label}</span>`
    const styled = `menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ ${label}</span>`
    if (h.includes(plain)) h = h.split(plain).join(styled)
  }
  fs.writeFileSync(f, h)
  console.log(rel, 'tail fixes', n)
  // corruption check
  const bad = ['ochiladiclass', 'asosi.lobal', 'ochiladicontainer']
  console.log('  corrupt', bad.filter((b) => h.includes(b)))
}
