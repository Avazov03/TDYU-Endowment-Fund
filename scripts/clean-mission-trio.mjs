/**
 * Clean English leftovers after partial paragraph replaces on mission trio.
 */
import fs from 'node:fs'

function cleanFile(rel, extras = []) {
  const file = `public/cyan/${rel}`
  let h = fs.readFileSync(file, 'utf8')
  const before = h

  const pairs = [
    // mangled tails from truncated replaces
    [/\.h initiatives, and innovati[\s\S]{0,200}?(\.|”|")/g, '.”'],
    [/asosi\.lobal institution[\s\S]{0,250}?(\.|”|")/g, 'asosi.'],
    [/bilan\.on from undergraduate[\s\S]{0,300}?(\.|”|")/g, 'bilan.'],
    [/bog‘lash\.ds dedicated[\s\S]{0,300}?(\.|”|")/g, 'bog‘lash.'],
    [/bog'lash\.ds dedicated[\s\S]{0,300}?(\.|”|")/g, "bog'lash."],

    // leftover admission / university blurbs
    [
      /Completed secondary education[\s\S]{0,400}?(?=<)/g,
      'Ustunlar fond dasturlari orqali amalga oshiriladi. ',
    ],
    [
      /Advance your career with streamlined graduate program admissions\./g,
      'Xorijda “O‘zbek huquqi markazlari” va kutubxonalar.',
    ],
    [
      /Join a diverse campus community through a simple application and visa guidance\./g,
      'O‘quv kurslar, yozgi maktablar va tadbirkorlik yo‘nalishlari.',
    ],
    [/Batafsil TSUL brendi/g, 'TSUL brendi — '],
    [/Batafsil Tadbirkorlik/g, 'Tadbirkorlik — '],
    [/Batafsil Alumni xarita/g, ''],
    [/Graduate Dasturlar/g, 'Dasturlar'],

    // VC letter leftovers if any English remains
    [
      /Dear students,[\s\S]{0,800}?(?=<)/g,
      'Hurmatli hamkorlar, Boshqaruv kengashi fondning joriy faoliyatini boshqaradi. Rais: N. Salayev. ',
    ],
    [
      /Every class you attend[\s\S]{0,500}?(?=<)/g,
      '',
    ],
    ...extras,
  ]

  for (const [a, b] of pairs) {
    if (a instanceof RegExp) h = h.replace(a, b)
    else if (h.includes(a)) h = h.split(a).join(b)
  }

  // strip obvious leftover English word clumps inside text nodes (light touch)
  h = h.replace(/\b(initiatives|undergraduate|graduate program|visa guidance|world-class education)\b/gi, '')

  if (h !== before) {
    fs.writeFileSync(file, h)
    console.log('cleaned', rel)
  } else console.log('no change', rel)
}

cleanFile('about-us/index.html', [
  [
    'oshirish.” initiatives',
    'oshirish.”',
  ],
])
cleanFile('mission-value/index.html')
cleanFile('vice-chancellor/index.html', [
  [
    /Hurmatli hamkorlar, Boshqaruv kengashi fondning joriy faoliyatini boshqaradi: byudjet ijrosi, dasturlar va xalqaro loyihalar\. Rais: N\. Salayev\. Har bir qaror kollegiallik va oshkoralik tamoyiliga asoslanadi\.[\s\S]{0,400}?(?=<)/,
    'Hurmatli hamkorlar, Boshqaruv kengashi fondning joriy faoliyatini boshqaradi: byudjet ijrosi, dasturlar va xalqaro loyihalar. Rais: N. Salayev. Har bir qaror kollegiallik va oshkoralik tamoyiliga asoslanadi. ',
  ],
])

console.log('clean done')
