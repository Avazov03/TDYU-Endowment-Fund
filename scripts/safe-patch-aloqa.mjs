/**
 * Perfect Aloqa (contact) for TDYU Endowment — exact replaces only.
 */
import fs from 'node:fs'

const file = 'public/cyan/contact/index.html'
let h = fs.readFileSync(file, 'utf8')

const pairs = [
  // Title
  ['Aloqa &#8211; TDYU Endowment Fund', 'Aloqa — TDYU Endowment Fund'],
  ['Aloqa – TDYU Endowment Fund', 'Aloqa — TDYU Endowment Fund'],

  // Search
  ['Search Keyword...', 'Qidirish...'],

  // Contact cards — titles
  ['Qo‘llab-quvvatlash (email)', 'Elektron pochta'],
  ['> Address </span>', '> Manzil </span>'],
  ['> Qabul </span>', '> Hamkorlik </span>'],

  // Contact cards — emails
  [
    '<a href="mailto:infoexmple@TDYU.edu">infoexmple@TDYU.edu </a><br> <a href="mailto:info@TDYU.edu">info@TDYU.edu </a>',
    '<a href="mailto:info@tdyu-endowment.uz">info@tdyu-endowment.uz</a>',
  ],
  ['mailto:infoexmple@TDYU.edu', 'mailto:info@tdyu-endowment.uz'],
  ['infoexmple@TDYU.edu', 'info@tdyu-endowment.uz'],
  ['mailto:info@TDYU.edu', 'mailto:info@tdyu-endowment.uz'],
  ['info@TDYU.edu', 'info@tdyu-endowment.uz'],

  // Contact cards — phones
  [
    '<a href="tel:+12705550117">(+1) 270-555-0117</a><br> <a href="index.html">(209) 555-0104</a>',
    '<a href="tel:+998712336636">+998 71 233-66-36</a>',
  ],
  [
    '<a href="tel:1270--555-0117">(+1) 270-555-0117</a>',
    '<a href="tel:+998712336636">+998 71 233-66-36</a>',
  ],
  ['(+1) 270-555-0117', '+998 71 233-66-36'],
  ['(209) 555-0104', '+998 71 233-66-36'],
  ['tel:+12705550117', 'tel:+998712336636'],
  ['tel:1270--555-0117', 'tel:+998712336636'],

  // Address
  [
    '4517 Huston Ave. Kuchu, Kentucky 39495',
    "Saylgoh ko'chasi 35-uy, Yunusobod, Toshkent 100047",
  ],

  // Form
  ['placeholder="Email Address"', 'placeholder="Elektron pochta*"'],
  ['placeholder="Enter Your Message... *"', 'placeholder="Xabaringiz...*"'],
  ['value="Submit Now"', 'value="Yuborish"'],
  [
    'Keyingi safar uchun ism va emailni saqlash',
    'Maxfiylik siyosatiga roziman',
  ],

  // Form heading polish
  ['>Bog‘lanish</h2>', '>Bizga yozing</h2>'],

  // Map → Toshkent / TDYU area (Saylgoh / Yunusobod)
  [
    'https://maps.google.com/maps?q=stamford%20bridge%20chelsea&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near',
    'https://maps.google.com/maps?q=Toshkent%20davlat%20yuridik%20universiteti%20Saylgoh%2035&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near',
  ],
  ['title="stamford bridge chelsea"', 'title="TDYU — Saylgoh 35, Toshkent"'],
  ['aria-label="stamford bridge chelsea"', 'aria-label="TDYU — Saylgoh 35, Toshkent"'],

  // Header phone leftover if present
  ['+81112522552', '+998 71 233-66-36'],
  ['tel:+81112522552', 'tel:+998712336636'],
]

let n = 0
const miss = []
for (const [a, b] of pairs) {
  if (!a || a === b) continue
  if (!h.includes(a)) {
    miss.push(a.slice(0, 70))
    continue
  }
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
h = h.replace(/<title>[\s\S]*?<\/title>/i, '<title>Aloqa — TDYU Endowment Fund</title>')

fs.writeFileSync(file, h)
console.log('replacements', n, 'miss', miss.length)
miss.slice(0, 20).forEach((m) => console.log(' miss', m))

// verify leftovers
const bad = [
  'infoexmple',
  'info@TDYU.edu',
  '270-555',
  '555-0104',
  'Huston',
  'Kentucky',
  'Address',
  'Submit Now',
  'Email Address',
  'Enter Your Message',
  'Search Keyword',
  'stamford',
  '81112522552',
  '> Qabul </span>',
].filter((x) => h.includes(x))
console.log('leftovers', bad)
