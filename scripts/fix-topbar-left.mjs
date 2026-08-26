/**
 * Finish topbar leftovers — exact replaces.
 */
import fs from 'node:fs'

function patch(file, pairs) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  fs.writeFileSync(file, h)
  console.log(file, n)
}

patch('public/cyan/tuition-fee/index.html', [
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds Each academic program includes tuitions fees registration charges and essential learning resources ensuring students for receive education and comprehensive academic support',
    'Fond mablag‘lari shaffof taqsimlanadi: ta’lim va grantlar, xalqaro tadbirlar, ilmiy nashrlar, infratuzilma va boshqaruv xarajatlari.',
  ],
  ['>Duration</th>', '>Davr</th>'],
  ['Duration</th>', 'Davr</th>'],
  ['>Remarks</th>', '>Izoh</th>'],
  ['Remarks</th>', 'Izoh</th>'],
  ['>Frequency</th>', '>Davriylik</th>'],
  ['Frequency</th>', 'Davriylik</th>'],
  ['Summa (USD)</th>', 'Ko‘rsatkich</th>'],
  ['>Annual</td>', '>Yillik</td>'],
  ['Annual</td>', 'Yillik</td>'],
  ['>One-time</td>', '>Bir martalik</td>'],
  ['One-time</td>', 'Bir martalik</td>'],
  ['>Non-refundable</td>', '>Qaytarilmaydi</td>'],
  ['Non-refundable</td>', 'Qaytarilmaydi</td>'],
  ['Ariza yig‘imi', 'Auditorlik'],
  ['Ro‘yxatga olish yig‘imi', 'Ustav yangilanishi'],
  ['Barcha uchun majburiy', 'Yillik majburiy'],
])

patch('public/cyan/how-to-apply/index.html', [
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds. Each academic program includes tuition fees, registration charges and essential learning resources ensuring students for receive education and comprehensive academic support',
    'Fond mablag‘lari shaffof taqsimlanadi: ta’lim va grantlar, xalqaro tadbirlar, ilmiy nashrlar, infratuzilma va boshqaruv xarajatlari.',
  ],
  [
    'The Fondga murojaat qilish begins with preparing all necessary application documents, including academic transcripts, identification, and any required test scores. Once your materials are ready, complete the university’',
    'Fondga murojaat qilish — xayriya, grant arizasi yoki hamkorlik taklifini tayyorlashdan boshlanadi. Kerakli ma’lumotlar tayyor bo‘lgach, ',
  ],
  [
    'preparing all necessary application documents, including academic transcripts, identification, and any required test scores. Once your materials are ready, complete the university’',
    'xayriya, grant yoki hamkorlik uchun kerakli ma’lumotlarni tayyorlang. So‘ngra ',
  ],
])

// Fix truncated hybrid — dump remaining EN sentence tails on how-to-apply
{
  const f = 'public/cyan/how-to-apply/index.html'
  let h = fs.readFileSync(f, 'utf8')
  // common leftover tails after partial replace
  const tails = [
    [
      's online application form carefully.',
      'forma orqali murojaat qiling.',
    ],
    [
      's application portal.',
      'aloqa formasi orqali yuboring.',
    ],
  ]
  for (const [a, b] of tails) {
    if (h.includes(a)) h = h.split(a).join(b)
  }
  // find any remaining English chunks near "application"
  fs.writeFileSync(f, h)
}

patch('public/cyan/admission-requirements/index.html', [
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds. Each academic program includes tuition fees, registration charges and essential learning resources ensuring students for receive education and comprehensive academic support',
    'Fond O‘zbekiston Respublikasi qonunlari asosida faoliyat yuritadi: NNO va jamoat fondlari to‘g‘risidagi qonunlar, ustav va shaffof hisobotlar.',
  ],
  ['Spring Intake</td>', 'Ustav</td>'],
  ['Fall Intake</td>', 'Hisobot</td>'],
  ['Postgraduate</td>', 'Audit</td>'],
  ['All Intake</td>', 'Taftish</td>'],
  ['April1</td>', '2025</td>'],
  ['>Qabul qoidalari</', '>Huquqiy asos</'],
])

// Verify leftovers
for (const f of [
  'public/cyan/tuition-fee/index.html',
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
]) {
  const h = fs.readFileSync(f, 'utf8')
  const bad = [
    'Search Keyword',
    'Get Your',
    'Apply Process',
    'Qabul qoidalari',
    'Our program',
    'Spring Intake',
    'Fall Intake',
    'Academic Qualifications',
    'English Language',
    'Duration</',
    'Remarks</',
    'Non-refundable',
    'The Fondga',
    'application documents',
    '$12',
  ].filter((x) => h.includes(x))
  console.log('left', f, bad)
}
