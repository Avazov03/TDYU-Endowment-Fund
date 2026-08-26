import fs from 'node:fs'

const pairs = [
  [
    'TDYU Endowment Fund. It was founded in 1966, and TDYU Endowment Fund has grown into one of the leading institutions of higher education.',
    'TDYU Endowment Fund — Toshkent davlat yuridik universiteti maqsadli kapital jamoat fondi.',
  ],
  [
    'Huquqiy ta’limning kelajagiga sarmoya. We believe in empowering students to explore their passions challenge conventions.',
    'Huquqiy ta’limning kelajagiga sarmoya. Bilim, grant va xalqaro imkoniyatlar.',
  ],
  [
    'At TDYU, we offer world-class academic programs expert faculty guidance',
    'Fond grant, stipendiya va xalqaro stajirovkalar orqali jamoani qo‘llab-quvvatlaydi',
  ],
  [
    'TDYU, student goes beyond academics offering vibrant activities cultural events.',
    'Fond faoliyati ta’lim, tadbir, nashr va infratuzilmani qamrab oladi.',
  ],
  [
    'Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding Through international collaborations research , and innovation hubs we provide oppor',
    'Xalqaro hamkorlik va ilmiy aloqalar orqali TDYU jamoasiga yangi imkoniyatlar ochiladi.',
  ],
  [
    '“At TDYU Endowment Fund, our students are at the heart of everything IS we Their stories reflect our mission empower TDYU Endowment Fund, our students inspire and prepare”',
    '“Oshkoralik va kollegiallik — fondning asosiy tamoyillari. Har bir loyiha shu mezonlar bilan baholanadi.”',
  ],
  [
    '“The Computer Science program TDYU is world-class We work on real projects not just theory. The labs mentors and research opportunities gave me the”',
    '“Fond stipendiyasi tufayli xalqaro tajriba oldim. Bu mening karyeram uchun muhim burilish bo‘ldi.”',
  ],
  [
    'Thank you for visiting our website. Together, we will shape the future of TDYU and contribute to the well-being of mankind.',
    'Saytimizga tashrif buyurganingiz uchun rahmat. Birgalikda huquqiy ta’lim kelajagiga sarmoya qilamiz.',
  ],
  [
    'Har bir ustun fond byudjeti va yillik dasturlar orqali amalga oshiriladi — shaffof hisobotlar bilan.true"',
    'Har bir ustun fond byudjeti va yillik dasturlar orqali amalga oshiriladi — shaffof hisobotlar bilan."',
  ],
]

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (h.includes(a)) {
      n += h.split(a).length - 1
      h = h.split(a).join(b)
    }
  }
  // fix accidental attribute corruption if any
  h = h.replace(/bilan\.true"/g, 'bilan."')
  h = h.replace(/hisobotlar bilan\.true"/g, 'hisobotlar bilan."')
  fs.writeFileSync(f, h)
  console.log(rel, n)
}
