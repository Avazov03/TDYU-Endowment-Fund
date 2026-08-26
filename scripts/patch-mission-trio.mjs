/**
 * Align Missiya / 6 ustun / Boshqaruv page copy to endowment DNA.
 * Text-only + menu label for mission-value. No layout rebuild.
 */
import fs from 'node:fs'
import path from 'node:path'

function apply(html, pairs) {
  let n = 0
  for (const [from, to] of pairs) {
    if (!from || from === to || !html.includes(from)) continue
    const c = html.split(from).length - 1
    html = html.split(from).join(to)
    n += c
  }
  return { html, n }
}

function patchFile(rel, pairs) {
  const file = path.join('public/cyan', rel)
  let html = fs.readFileSync(file, 'utf8')
  const { html: next, n } = apply(html, pairs)
  // title
  let out = next
  if (rel.startsWith('about-us')) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, '<title>Missiya — TDYU Endowment Fund</title>')
  } else if (rel.startsWith('mission-value')) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, '<title>6 ustun — TDYU Endowment Fund</title>')
  } else if (rel.startsWith('vice-chancellor')) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, '<title>Boshqaruv — TDYU Endowment Fund</title>')
  }
  fs.writeFileSync(file, out)
  console.log(rel, 'replacements', n)
}

const shared = [
  ['info@univet.dom', 'info@tdyu-endowment.uz'],
  ['+81112522552', '+998 71 233-66-36'],
  ['Education goes beyond textbooks and classrooms', 'Huquqiy ta’limning kelajagiga sarmoya'],
  ['Faculty', 'Boshqaruv'],
  ['Programs', 'Dasturlar'],
  ['Others', 'Boshqalar'],
]

// ——— MISSIYA (about-us) ———
patchFile('about-us/index.html', [
  ...shared,
  ['TDYU Endowment Fund missiyasi', 'Bilim — eng yaxshi sarmoya'],
  ['About TDYU Endowment Fund', 'Bilim — eng yaxshi sarmoya'],
  ['Nima uchun fond mavjud', 'Fond nima uchun mavjud'],
  ['- Vasiylik kengashi', '— TDYU Endowment Fund'],
  ['6 ustun', 'Asosiy yo‘nalishlar'],
  ['Ta’lim va grantlar', 'Xalqaro ta’lim'],
  ['Xalqaro imkoniyatlar', 'Tanlov va nashrlar'],
  ['TSUL brendi va tadbirkorlik', 'TSUL brendi · Tadbirkorlik'],
  ['Muvaffaqiyat tarixlari', 'Bizning tamoyillarimiz'],
  [
    '“Our diverse community welcomes students from across the globe fostering cultural exchange and mutual understanding Through international collaborations researc',
    '“TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: xalqaro malaka oshirish, grant va stipendiya, TDYU nufuzini oshirish.',
  ],
  [
    'TDYU provides transparent, competitive tuition fees and flexible payment.',
    'Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar.',
  ],
  [
    'Our vision is to create a world where education empowers every individual to achieve their fullest potential. We strive to be a leading g',
    'Oshkoralik, kollegiallik, o‘zaro hurmat, teng huquqlilik va ixtiyoriylik — faoliyatimiz asosi.',
  ],
  // leftover English fragments common on about pages
  [
    'Founded in 1985, TDYU Endowment Fund stands beacon excellence in higher education our mission is to create a community of learners dedicated research innovation.',
    'Fond O‘zbekiston Respublikasining NNO va jamoat fondlari to‘g‘risidagi qonunlari asosida faoliyat yuritadi.',
  ],
  [
    'At TDYU Endowment Fund, we offer world-class academic programs, expert faculty guidance, and innovative learning opportunities.',
    'Global hamkorlik, tanlovlar, ilmiy nashrlar va TSUL brendini xalqaro miqyosda mustahkamlash.',
  ],
  ['Univet Inside', 'Fond ichida'],
  ['Our Vision', '6 ustun'],
  ['Student Life', 'Xalqaro imkoniyatlar'],
  ['Our Campus Tour', 'Faoliyat'],
  ['Student Feedback', 'Tamoyillar'],
  ['Read More', 'Batafsil'],
  ['Dicover Our Programs', 'Dasturlarni ko‘rish'],
  ['Discover Our Programs', 'Dasturlarni ko‘rish'],
])

// ——— 6 USTUN (mission-value) ———
patchFile('mission-value/index.html', [
  ...shared,
  // page hero — only H1
  ['<h1>Missiya</h1>', '<h1>6 ustun</h1>'],
  ['>Missiya</h1>', '>6 ustun</h1>'],
  ['The TDYU Mission', 'Fondning 6 ustuni'],
  ['>Mission</h4>', '>Xalqaro ta’lim</h4>'],
  ['>Overview</h4>', '>Xalqaro hamkorlik</h4>'],
  ['>Application Now</h4>', '>Tanlov va mukofotlar</h4>'],
  ['Ta’lim va grantlar — 48%', 'Ilmiy nashrlar'],
  ['>Graduate</h4>', '>TSUL brendi</h4>'],
  ['>International Students</h4>', '>Tadbirkorlik</h4>'],
  [
    'of our students successfully graduate and begin their career development.',
    'ustun — xalqaro ta’lim, hamkorlik, tanlov, nashr, brend va tadbirkorlik.',
  ],
  [
    'Through extensive research industry collaboration and global academic standards ensuring that THE students receive a forward-thinking and career-focused educati',
    'Har bir ustun fond byudjeti va yillik dasturlar orqali amalga oshiriladi — shaffof hisobotlar bilan.',
  ],
  [
    'Conventions and discover their potential through meaningful Our face support experiences Our distinguished faculty members are leaders their and respective fiel',
    'Maqsad — TDYU jamoasini dunyoning yetakchi maktablari va tashkilotlari bilan bog‘lash.',
  ],
  [
    'Begin your academic journey with flexible entry requirements and application.',
    'Dunyo universitetlarida malaka oshirish va stipendiyalar.',
  ],
  [
    'Admission Now Graduate Advance your career with streamlined graduate program admissions.',
    'Xorijda “O‘zbek huquqi markazlari” va kutubxonalar tarmog‘i.',
  ],
  [
    'Admission Now International Students Join a diverse campus community through a simple application and visa guidance.',
    'O‘quv kurslar, yozgi maktablar va qonuniy tadbirkorlik yo‘nalishlari.',
  ],
  ['Admission Now', 'Batafsil'],
  ['Application Now', 'Tanlov va mukofotlar'],
  ['Apply Now', 'Dasturlarni ko‘rish'],
  ['Mission &amp; Value', '6 ustun'],
  ['Mission & Value', '6 ustun'],
])

// ——— BOSHQARUV (vice-chancellor) ———
patchFile('vice-chancellor/index.html', [
  ...shared,
  ['Boshqaruv organlari', 'Boshqaruv'],
  ['Vasiylik · Boshqaruv · Taftish', 'Vasiylik · Boshqaruv · Taftish kengashlari'],
  ['Vasiylik, Boshqaruv va Taftish kengashlari', 'Vasiylik · Boshqaruv · Taftish kengashlari'],
  [
    'Dear students, your journey is not measured only by grades or certificates, but by curiosity, discipline, and courage. Every class you attend, every question yo',
    'Hurmatli hamkorlar, Boshqaruv kengashi fondning joriy faoliyatini boshqaradi: byudjet ijrosi, dasturlar va xalqaro loyihalar. Rais: N. Salayev. Har bir qaror kollegiallik va oshkoralik tamoyiliga asoslanadi.',
  ],
  [
    'Explore life at our university through images and memories.',
    'Vasiylik — oliy organ; Boshqaruv — joriy ishlar; Taftish — moliyaviy nazorat.',
  ],
  ['Life at Our University', 'Uchta boshqaruv organi'],
  ['Message from Vice Chancellor', 'Boshqaruv kengashi raisidan'],
  ['Message from Vice-Chancellor', 'Boshqaruv kengashi raisidan'],
  ['Jackson David', 'N. Salayev'],
  ['Vice Chancellor', 'Boshqaruv kengashi raisi'],
  ['Vice-Chancellor', 'Boshqaruv'],
])

// Menu: mission-value links → "6 ustun"
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

let menuN = 0
for (const file of walk('public/cyan')) {
  let html = fs.readFileSync(file, 'utf8')
  const before = html
  // relative and absolute href variants
  html = html.replace(
    /(href="[^"]*mission-value[^"]*")([^>]*>\s*<span class="menu-item-text")(?: style="[^"]*")?>(?:⚠ )?Missiya(<\/span>)/gi,
    '$1$2>6 ustun$3',
  )
  // breadcrumb / page links with mission-value
  html = html.replace(
    /(href="[^"]*mission-value[^"]*"[^>]*>)(?:⚠ )?Missiya(<\/a>)/gi,
    '$16 ustun$2',
  )
  if (html !== before) {
    const c = (before.match(/mission-value[\s\S]{0,180}Missiya/gi) || []).length
    menuN += c
    fs.writeFileSync(file, html)
  }
}
console.log('Menu mission-value → 6 ustun touches ~', menuN)

// Light DNA-aligned polish CSS (only softens foreign leftover look, keeps Cyan palette)
const css = `/* TDYU page copy polish — Cyan DNA */
.prelements-heading .title-inner .title,
.prelements-heading h1,
.prelements-heading h2,
.prelements-heading h3 {
  /* keep theme fonts; ensure long Uzbek titles wrap cleanly */
  overflow-wrap: anywhere;
}
`
fs.writeFileSync('public/tdyu-page-polish.css', css)

for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = path.join('public/cyan', rel)
  let html = fs.readFileSync(f, 'utf8')
  if (!html.includes('tdyu-page-polish.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="/tdyu-page-polish.css" />\n</head>')
    fs.writeFileSync(f, html)
  }
}

console.log('Done.')
