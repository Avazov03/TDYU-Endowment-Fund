/**
 * Perfect Yangiliklar (blog) for TDYU Endowment — exact replaces only.
 */
import fs from 'node:fs'
import path from 'node:path'

function patch(file, pairs) {
  if (!fs.existsSync(file)) return { n: 0, miss: [] }
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  const miss = []
  for (const [a, b] of pairs) {
    if (!a || a === b) continue
    if (!h.includes(a)) {
      miss.push(a.slice(0, 60))
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
  // title
  h = h.replace(/<title>[\s\S]*?<\/title>/i, '<title>Yangiliklar — TDYU Endowment Fund</title>')
  fs.writeFileSync(file, h)
  return { n, miss }
}

const pairs = [
  // UI
  ['Search Keyword...', 'Qidirish...'],
  ['>Categories</h4>', '>Bo‘limlar</h4>'],
  ['>Recent Posts</h4>', '>So‘nggi yangiliklar</h4>'],
  ['Posts pagination', 'Sahifalar'],
  ['Comments (0)', 'Izohlar (0)'],
  ['Comments (', 'Izohlar ('],

  // menu layout demos → ⚠
  ['Yangiliklar Grid 3 Column', '⚠ Yangiliklar paneli'],
  ['Yangiliklar Grid Sidebar', '⚠ Yangiliklar yon panel'],
  ['Yangiliklar List Sidebar', '⚠ Yangiliklar ro‘yxat'],
  ['Yangiliklar Details', '⚠ Yangilik tafsilotlari'],
  ['>Blog Grid 3 Column</span>', '>⚠ Yangiliklar paneli</span>'],
  ['>Blog Grid Sidebar</span>', '>⚠ Yangiliklar yon panel</span>'],
  ['>Blog List Sidebar</span>', '>⚠ Yangiliklar ro‘yxat</span>'],

  // article titles → endowment news
  [
    'Alumni Success Stories From Campus to Global Impact',
    'Alumni Association: bitiruvchilar tarmog‘i kengaymoqda',
  ],
  ['Xalqaro o‘qish imkoniyatlari', 'Xorijiy stajirovka dasturlari e’lon qilindi'],
  ['Zamonaviy ta’lim innovatsiyalari', 'Grant arizalari: mart–may muddati ochildi'],
  ['Raqamli davrda ta’lim kelajagi', 'Fond yillik hisoboti va shaffoflik e’lonlari'],
  ['Onlayn ta’lim imkoniyatlari', 'TSUL SHOP va brend mahsulotlari yangilandi'],
  ['Innovatsion tadqiqotlar', 'Ilmiy nashr granti — yangi tanlov'],
  ['Kampus imkoniyatlari bo‘yicha qo‘llanma', 'Philip C. Jessup jamoasi tayyorgarlikni boshladi'],

  // unique excerpts (replace generic after titles are set — apply per-article by pairing nearby is hard;
  // replace the generic string with better default, then specific title+excerpt combos if possible)
]

// After title replaces, set unique excerpts by replacing first N occurrences carefully.
// Safer: replace title then immediately following excerpt pattern if unique enough.

const excerptPairs = [
  [
    'II Turk dunyosi yosh akademiklar kongressi</a></h3><div class="entry-content"><p>Fond yangiliklari va e’lonlari.</p>',
    'II Turk dunyosi yosh akademiklar kongressi</a></h3><div class="entry-content"><p>TDYUda “Umumiy kelajakni qurish” mavzusida xalqaro kongress muvaffaqiyatli o‘tkazildi.</p>',
  ],
]

function improveExcerpts(file) {
  let h = fs.readFileSync(file, 'utf8')
  // Map each known title to its excerpt — find title then next <p>...</p>
  const map = {
    'II Turk dunyosi yosh akademiklar kongressi':
      'TDYUda “Umumiy kelajakni qurish” mavzusida xalqaro kongress muvaffaqiyatli o‘tkazildi.',
    'Koreya iqtisodiy huquqi darsligi nashr etildi':
      'Koreys tilidan tarjima qilingan darslik universitetga topshirildi.',
    '42 o‘qituvchi Westminster dasturini yakunladi':
      'Postgraduate Certificate in Teaching and Learning dasturi yakunlandi.',
    'Alumni Association: bitiruvchilar tarmog‘i kengaymoqda':
      'Dunyo bo‘ylab bitiruvchilar fond faoliyatiga qo‘shilmoqda.',
    'Xorijiy stajirovka dasturlari e’lon qilindi':
      'Eron, Xitoy, Germaniya va Rossiya yo‘nalishlarida amaliyot imkoniyatlari.',
    'Grant arizalari: mart–may muddati ochildi':
      'Xalqaro ta’lim va stipendiya grantlari uchun arizalar qabul qilinadi.',
    'Fond yillik hisoboti va shaffoflik e’lonlari':
      '2024-yil faoliyat hisoboti va auditorlik xulosasi e’lon qilindi.',
    'TSUL SHOP va brend mahsulotlari yangilandi':
      'Promo mahsulotlar va yuridik adabiyotlar sotuvi kengaytirildi.',
    'Ilmiy nashr granti — yangi tanlov':
      'Xorijiy nufuzli jurnallarda nashr xarajatlarini qoplash dasturi.',
    'Philip C. Jessup jamoasi tayyorgarlikni boshladi':
      '58 nafar talaba va o‘qituvchilar ishtirokidagi xalqaro tanlov.',
  }

  let n = 0
  for (const [title, excerpt] of Object.entries(map)) {
    const idx = h.indexOf(title)
    if (idx < 0) continue
    // find next Fond yangiliklari OR any short p after title
    const window = h.slice(idx, idx + 800)
    const m = window.match(/<p>(Fond yangiliklari va e’lonlari\.|[^<]{10,200})<\/p>/)
    if (!m) continue
    if (m[1] === excerpt) continue
    const from = m[0]
    const to = `<p>${excerpt}</p>`
    // replace only the first occurrence after this title
    const abs = idx + window.indexOf(from)
    h = h.slice(0, abs) + to + h.slice(abs + from.length)
    n++
  }
  fs.writeFileSync(file, h)
  return n
}

const files = ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']

for (const f of files) {
  const r = patch(f, pairs)
  console.log(path.relative('public/cyan', f), 'ok', r.n, 'miss', r.miss.length)
  r.miss.slice(0, 8).forEach((m) => console.log('  miss', m))
  const e = improveExcerpts(f)
  console.log('  excerpts', e)
}

// Mark Yangiliklar submenu demos red across all pages
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const menuPairs = [
  ['Yangiliklar Grid 3 Column', '⚠ Yangiliklar paneli'],
  ['Yangiliklar Grid Sidebar', '⚠ Yangiliklar yon panel'],
  ['Yangiliklar List Sidebar', '⚠ Yangiliklar ro‘yxat'],
  ['Yangiliklar Details', '⚠ Yangilik tafsilotlari'],
  [
    'menu-item-text">Yangiliklar Grid 3 Column</span>',
    'menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Yangiliklar paneli</span>',
  ],
]

let mf = 0
let mn = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of menuPairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (n) {
    fs.writeFileSync(file, h)
    mf++
    mn += n
  }
}
console.log('menu files', mf, 'n', mn)
