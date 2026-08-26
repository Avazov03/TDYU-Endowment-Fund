import fs from 'node:fs'

const more = [
  [
    'ochiladiitment to excellence inclusivity gain the skills confidence and perspective',
    'ochiladi.',
  ],
  [
    'ochiladi solutions. At the heart of TDYU Endowment Fund.',
    'ochiladi.',
  ],
  [
    'Completed secondary education (HSC/A-Level/Equivalent).',
    'Ilmiy nashrlar va tarjimalar.',
  ],
  [
    'Minimum GPA/grade requirements as set by the university.',
    'Xorijiy jurnallarda chop etishni qo‘llab-quvvatlash.',
  ],
  [
    'For graduate programs: a bachelor’s degree with required CGPA.',
    'TSUL brendi va tadbirkorlik yo‘nalishlari.',
  ],
  // leftover fragments
  ['unity to excellence inclusivity gain the skills confidence and perspective', ''],
  [' At the heart of TDYU Endowment Fund.', ''],
  ['At the heart of TDYU Endowment Fund.', ''],
]

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  for (const [a, b] of more) {
    if (h.includes(a)) h = h.split(a).join(b)
  }
  fs.writeFileSync(f, h)
}

// Final audit
for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const h = fs.readFileSync(`public/cyan/${rel}`, 'utf8')
  let body = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  const texts = [...body.matchAll(/>([^<]{20,200})</g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
  const en = texts.filter(
    (t) =>
      !/[{};]|wp-|elementor|sourceURL|var |function/.test(t) &&
      /\b(the|and|with|students|university|education|program|admission|career|graduate|minimum|completed)\b/i.test(t),
  )
  console.log(rel, 'EN', [...new Set(en)].slice(0, 8))
  console.log('  corrupt', ['ochiladiclass', 'asosi.lobal'].filter((b) => h.includes(b)))
}
