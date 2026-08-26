/**
 * Finish Yangiliklar page/2 + menu label sync + Comments Feed meta.
 * Exact string replaces only.
 */
import fs from 'node:fs'

const pairsCommon = [
  ['Comments Feed', 'Izohlar tasması'],
  // fix typo if I used wrong char - use proper Uzbek
]

// Fix the typo in pairs - use proper: Izohlar tasmasi
const common = [
  ['&raquo; Comments Feed"', '&raquo; Izohlar tasmasi"'],
  ['⚠ Blog grid', '⚠ Yangiliklar paneli'],
  ['⚠ Blog Standard', '⚠ Yangiliklar ro‘yxat'],
  ['⚠ Blog Sidebar', '⚠ Yangiliklar yon panel'],
  ['⚠ Blog Details', '⚠ Yangilik tafsilotlari'],
  ['>Blog grid</span>', '>⚠ Yangiliklar paneli</span>'],
  ['>Blog Standard</span>', '>⚠ Yangiliklar ro‘yxat</span>'],
]

const page2 = [
  [
    'Learning Maximizing Your Academic Experience',
    'Xalqaro hamkorlik memorandumi imzolandi',
  ],
  [
    'Building Leadership, Skills and  TDYU Programs',
    'Yuridik klinika: pro bono yordam kengaymoqda',
  ],
  [
    'Building Leadership, Skills and TDYU Programs',
    'Yuridik klinika: pro bono yordam kengaymoqda',
  ],
  [
    '>Xalqaro hamkorlik memorandumi imzolandi</a></h3><p>TDYU Endowment Fund yangiliklari va rasmiy e’lonlar.</p>',
    '>Xalqaro hamkorlik memorandumi imzolandi</a></h3><p>Yangi universitetlar bilan hamkorlik va talaba almashinuvi yo‘llari ochildi.</p>',
  ],
  [
    '>Yuridik klinika: pro bono yordam kengaymoqda</a></h3><p>TDYU Endowment Fund yangiliklari va rasmiy e’lonlar.</p>',
    '>Yuridik klinika: pro bono yordam kengaymoqda</a></h3><p>Bitiruvchi va talabalar huquqiy yordam loyihalarida ishtirok etmoqda.</p>',
  ],
]

function apply(file, pairs) {
  if (!fs.existsSync(file)) return { n: 0, miss: [] }
  let h = fs.readFileSync(file, 'utf8')
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
  fs.writeFileSync(file, h)
  return { n, miss }
}

const f1 = 'public/cyan/blog/index.html'
const f2 = 'public/cyan/blog/page/2/index.html'

console.log('blog', apply(f1, common))
console.log('page2', apply(f2, [...common, ...page2]))

// verify
for (const f of [f1, f2]) {
  const h = fs.readFileSync(f, 'utf8')
  const bad = [
    'Learning Maximizing',
    'Building Leadership',
    'Comments Feed',
    '⚠ Blog',
    'Search Keyword',
    'Recent Posts',
    'Categories</h4>',
    'Comments </span>',
    'Fond yangiliklari',
    'TDYU Endowment Fund yangiliklari va rasmiy',
  ].filter((x) => h.includes(x))
  console.log(f, 'leftovers', bad)
}
