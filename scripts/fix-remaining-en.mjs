import fs from 'node:fs'

const fixes = [
  ['baholanadi solutions”', 'baholanadi.”'],
  ['ochiladi. to lead in an ever-changing world.', 'ochiladi.'],
  [
    'Fond yetakchi. nurture creative thinkers ethical leaders and lifelong learners who contribute positively to society Thr',
    'Fond yetakchi jamoat fondi.',
  ],
  ['Fond yetakchi. goal.', 'Fond yetakchi jamoat fondi.'],
  ['Regular TDYU Students', 'Qo‘llab-quvvatlanganlar'],
  ['Students Enrolled', 'Loyihalar'],
  ['Academic Staff', 'Hamkorlar'],
  ['Global Partners', 'Davlatlar'],
  ['strategiyasilenge.', 'strategiyasi.'],
  [
    'amalga oshiriladito become competent responsibility professionals, responsible leaders, and positive contributors to',
    'amalga oshiriladi.',
  ],
  [
    'bog‘lashl-world applications we prepare students to excel in a rapidly evolving global environment Students ',
    'bog‘lash. ',
  ],
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse back',
    'Mablag‘lar shaffof taqsimlanadi — ta’lim, tadbir va nashrlarga.',
  ],
  ['2024 best 10 university Awards', '2023-yilda tashkil etilgan'],
  [
    'in the skills confidence and perspective to lead in an ever-changing world.',
    '',
  ],
  ['shaffoflikssions challenge.', 'shaffoflik.'],
  [' Value Dunyo', ' Dunyo'],
  ['Tanlov va mukofotlarOur program', 'Tanlov va mukofotlar. Our program'],
]

// After Tanlov fix, also remove the Our program line if still there
fixes.push([
  'Tanlov va mukofotlar. Our program costs are designed to remain transparent competitive and accessible for students from diverse back',
  'Tanlov va mukofotlar. Mablag‘lar shaffof taqsimlanadi.',
])

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  let n = 0
  for (const [a, b] of fixes) {
    if (!h.includes(a)) continue
    n += h.split(a).length - 1
    h = h.split(a).join(b)
  }
  fs.writeFileSync(f, h)
  console.log(rel, n)
}

// verify
for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const h = fs.readFileSync(`public/cyan/${rel}`, 'utf8')
  const checks = [
    'to lead in',
    'nurture creative',
    'l-world',
    'Our program costs',
    'ssions challenge',
    'ochiladiclass',
    'solutions”',
    'Completed secondary',
  ]
  console.log(
    'check',
    rel,
    checks.filter((c) => h.includes(c)),
  )
}
