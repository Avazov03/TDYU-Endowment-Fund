/**
 * Adapt Dasturlar (all-programs) to endowment 7 programs — exact replace only.
 */
import fs from 'node:fs'

const file = 'public/cyan/all-programs/index.html'
let h = fs.readFileSync(file, 'utf8')

const pairs = [
  // UI
  ['Search Keyword...', 'Qidirish...'],
  ['placeholder="Enter keyword"', 'placeholder="Kalit so‘z..."'],
  ['Enter keyword"', 'Kalit so‘z..."'],
  ['Load More ', 'Ko‘proq '],
  [' Reset ', ' Tozalash '],
  ['Show More', 'Ko‘proq'],
  ['Show Less', 'Kamroq'],
  [' Total <span class="result-count">28</span> results found ', ' Jami <span class="result-count">28</span> ta dastur '],
  ['results found', 'ta dastur'],

  // bad card blurbs
  [
    'The Stipendiya va grantlar program is designed to prepare educators to become effective leaders, administrators, and...',
    'Iqtidorli va ehtiyojmand talaba, xodimlar uchun stipendiya va grantlar.',
  ],
  [
    'Jinoyat huquqi bo‘yicha LLB dasturi jinoyat huquqi, protsessual huquq va kriminologiya bo‘yicha mustahkam asos beradi....',
    'Konferensiyalar, forumlar, kongresslar; xorijiy mutaxassislar; tarjima va nashr.',
  ],
  [
    'Xalqaro huquq bo‘yicha chuqurlashtirilgan bilim va amaliyot.',
    'Xorijiy delegatsiyalar, protokol va diplomatiya xizmatlari.',
  ],
  [
    'Xalqaro shartnomalar, inson huquqlari va global adolat.',
    '“O‘zbek huquqi markazlari”, auditoriyalar, kutubxonalar; moddiy-texnik baza.',
  ],
  [
    'Xalqaro stajirovka va malaka oshirish — yetakchi universitetlarda tahsil va amaliyot.',
    'Dunyo yetakchi universitetlari va xalqaro tashkilotlarda tahsil, stajirovka va malaka oshirish.',
  ],
  [
    'Tanlovlar va musobaqalar — milliy va xalqaro ishtirokni qo‘llab-quvvatlash.',
    'Intellektual, huquqiy, sport va ma’rifiy tanlovlarda ishtirokni qo‘llab-quvvatlash.',
  ],

  // Ishtirokchilar filters (was university departments)
  ['> O‘quv dasturlari </label>', '> Talaba </label>'],
  ['> Ta’lim rahbariyati </label>', '> Xodim / o‘qituvchi </label>'],
  ['> Jinoyat huquqi </label>', '> Doktorant </label>'],
  ['> Xalqaro huquq </label>', '> Alumni </label>'],
  ['> Ma’lumotlar fanlari </label>', '> Hamkor tashkilot </label>'],
  ['> Dasturiy injiniring </label>', '> Tadqiqotchi </label>'],
  ['> Sog‘liqni saqlash </label>', '> Delegatsiya </label>'],
  ['> Jamoat salomatligi </label>', '> Nashriyot </label>'],
  // hide remaining demo departments by renaming to secondary endowment tags
  ['> Siyosatshunoslik </label>', '> Protokol </label>'],
  ['> Sotsiologiya </label>', '> Infratuzilma </label>'],
  ['> Fizika </label>', '> Kutubxona </label>'],
  ['> Matematika </label>', '> Tarjima </label>'],
  ['> Tarix </label>', '> Kongress </label>'],
  ['> Ingliz tili </label>', '> Stajirovka </label>'],
  ['> Moliya </label>', '> Grant </label>'],
  ['> Biznes boshqaruvi </label>', '> Stipendiya </label>'],
  ['> Mexanika </label>', '> Tanlov </label>'],
  ['> Kompyuter injiniringi </label>', '> Loyiha </label>'],

  // Moliyalashtirish filters
  ['> Magistratura </label>', '> To‘liq moliyalashtirish </label>'],
  ['> PhD </label>', '> Qisman moliyalashtirish </label>'],
  ['> Ta’lim va grantlar — 48% </label>', '> Xayriya hisobidan </label>'],

  // card meta chips that still show old department names on cards
  // (same strings appear in list items under cards)
]

let n = 0
const miss = []
for (const [a, b] of pairs) {
  if (!h.includes(a)) {
    miss.push(a.slice(0, 70))
    continue
  }
  const c = h.split(a).length - 1
  h = h.split(a).join(b)
  n += c
}

// Also replace department chip text on cards (without leading > space pattern)
const chipPairs = [
  ['>O‘quv dasturlari<', '>Talaba<'],
  ['>Ta’lim rahbariyati<', '>Xodim / o‘qituvchi<'],
  ['>Jinoyat huquqi<', '>Doktorant<'],
  ['>Xalqaro huquq<', '>Alumni<'],
]
for (const [a, b] of chipPairs) {
  if (!h.includes(a)) continue
  const c = h.split(a).length - 1
  h = h.split(a).join(b)
  n += c
}

if (!h.includes('tdyu-page-polish.css')) {
  h = h.replace('</head>', '<link rel="stylesheet" href="/tdyu-page-polish.css" />\n</head>')
}
if (!h.includes('tdyu-hide-preloader') && h.includes('site-preloader')) {
  h = h.replace(
    '</head>',
    `<style id="tdyu-hide-preloader">#site-preloader{display:none!important;}</style>\n</head>`,
  )
}

fs.writeFileSync(file, h)
console.log('replacements', n, 'miss', miss.length)
miss.slice(0, 12).forEach((m) => console.log(' miss', m))
