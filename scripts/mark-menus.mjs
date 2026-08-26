/**
 * Align Cyan menus to endowment IA.
 * Useful items → rename. Unnecessary → red (style) so user can spot & remove later.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cyan = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/cyan')

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

/** Exact menu-item-text renames (useful) */
const RENAME = [
  // top / core
  ['Bosh sahifa', 'Bosh'],
  ['Home', 'Bosh'],

  // Missiya branch
  ['Tarix', null], // mark red below
  ['Ma’muriyat', null],
  ["Ma'muriyat", null],
  ['Xarita', null],
  ['Missiya va qiymatlar', '6 ustun'],
  ['Mission &amp; Value', '6 ustun'],
  ['Mission & Value', '6 ustun'],

  // Sahifalar mega → keep structure, rename parent to less confusing? keep & red parent
  ['Sahifalar', null],

  ['Loyiha tafsilotlari', null], // template detail
  ['Tadbir tafsilotlari', null],
  ['Alumni tafsilotlari', null],
  ['Kutubxonalar', null],
  ['Galereya', null],
  ['Yordam (FAQ)', 'Yordam'],
  ['Faq', null],
  ['FAQ', null],

  // Dasturlar branch — demo faculties/programs
  ['Fakultetlar', null],
  ['Fakultet tafsilotlari', null],
  ['A’zo tafsilotlari', null],
  ["A'zo tafsilotlari", null],
  ['Azo tafsilotlari', null],
  ['Member Details', null],
  ['M.Ed. in Educational Leadership', '01 · Xalqaro stajirovkalar'],
  ['B.Ed. in Educational Leadership', '02 · Stipendiya va grantlar'],
  ['M.Sc. in Software Engineering', '03 · Tanlovlar va musobaqalar'],
  ['B.Sc. in Software Engineering', '04 · Ilmiy va ta’limiy loyihalar'],
  ['M.Ed. in Curriculum', null],

  // admissions leftovers in mega
  ['Qabul talablari', null],
  ['Huquqiy asos', 'Huquqiy asos'], // keep useful (top bar)
  ['Shaffoflik', 'Shaffoflik'], // keep under Hisobotlar area
  ['Moliyaviy yordam', 'Shaffoflik'],

  // news layout variants
  ['Yangiliklar paneli', null],
  ["Yangiliklar ro'yxati", null],
  ['Yangiliklar ro‘yxati', null],
  ['Yangilik tafsilotlari', null],
  ['Blog Details', null],
  ['Blog grid', null],
  ['Blog Standard', null],
  ['Blog Grid', null],

  // english leftovers
  ['Event Details', null],
  ['Faculty', null],
  ['Others', null],
  ['Graduate Programs', null],
  ['Campus Events', null],
  ['Libraries', null],
  ['Gallery', null],
  ['History', null],
  ['Administration', null],
  ['Campus Map', null],
  ['Faculty Areas', null],
  ['Faculty Details', null],
  ['Research Details', null],
  ['Alumni Details', null],
  ['All Events', null],
  ['Events Details', null],
  ['How to Apply', 'Yordam'],
  ['Requirements', null],
  ['Apply Now', 'Xayriya'],
  ['Tuition &amp; Fee', 'Hisobotlar'],
  ['Tuition & Fee', 'Hisobotlar'],
  ['Cost &amp; Financial Aid', 'Shaffoflik'],
  ['Scholarships', 'Grantlar'],
  ['All Programs', 'Dasturlar'],
  ['Academics', 'Dasturlar'],
  ['Vice-Chancellor', 'Boshqaruv'],
  ['About Us', 'Missiya'],
  ['Contact', 'Aloqa'],
  ['Contact Us', 'Aloqa'],

  // keep / normalize useful
  ['Grantlar va stipendiyalar', 'Grantlar'],
  ['Hisobotlar va shaffoflik', 'Hisobotlar'],
  ['Yordam va xayriya', 'Yordam'],
  ['TDYU ga qo‘shiling', 'Xayriya'],
  ['TDYU ga qo\'shiling', 'Xayriya'],
  ['Join Univet Now', 'Xayriya'],
  ['Discover Campus Life', 'Alumni'],
  ['Alumni xarita', 'Alumni xarita'],
  ['Alumni Network', 'Alumni'],
  ['Alumni tarmog‘i', 'Alumni'],
  ['Fond organlari', 'Vasiylik kengashi'],
  ['Faculty Members One', 'Vasiylik kengashi'],
  ['Faculty Members Two', 'Boshqaruv kengashi'],
  ['Vasiylik · Boshqaruv · Taftish', 'Boshqaruv'],
]

/** Labels that must be red (unnecessary for endowment IA) */
const RED = new Set([
  'Tarix',
  'Ma’muriyat',
  "Ma'muriyat",
  'Xarita',
  'Sahifalar',
  'Loyiha tafsilotlari',
  'Tadbir tafsilotlari',
  'Alumni tafsilotlari',
  'Kutubxonalar',
  'Galereya',
  'Faq',
  'FAQ',
  'Fakultetlar',
  'Fakultet tafsilotlari',
  'A’zo tafsilotlari',
  "A'zo tafsilotlari",
  'Azo tafsilotlari',
  'Member Details',
  'Qabul talablari',
  'Yangiliklar paneli',
  "Yangiliklar ro'yxati",
  'Yangiliklar ro‘yxati',
  'Yangilik tafsilotlari',
  'Blog Details',
  'Blog grid',
  'Blog Standard',
  'Blog Grid',
  'Event Details',
  'Faculty',
  'Others',
  'Graduate Programs',
  'Magistratura dasturlari',
  'Campus Events',
  'Libraries',
  'Gallery',
  'History',
  'Administration',
  'Campus Map',
  'Faculty Areas',
  'Faculty Details',
  'Research Details',
  'Alumni Details',
  'All Events',
  'Events Details',
  'Requirements',
  'B.Ed. in Curriculum &amp; Instruction',
  'B.Ed. in Curriculum & Instruction',
  'LLB in Criminal Justice',
  'LLM in International Law',
  'LLB in International Law',
  'Filter By Reset',
  // After rename, demo program English leftovers if any remain:
  'M.Ed. in Educational Leadership',
  'B.Ed. in Educational Leadership',
  'M.Sc. in Software Engineering',
  'B.Sc. in Software Engineering',
])

const RED_STYLE = 'color:#dc2626!important;font-weight:700'
const RED_MARK = '⚠ '

function paintRed(html, label) {
  // menu-item-text">LABEL</span>  → add style on span + warning prefix once
  const plain = `menu-item-text">${label}</span>`
  const already = `menu-item-text" style="${RED_STYLE}">${RED_MARK}${label}</span>`
  const styled = `menu-item-text" style="${RED_STYLE}">${RED_MARK}${label}</span>`

  if (html.includes(already)) return { html, n: 0 }
  if (!html.includes(plain)) {
    // maybe already has other attrs on span - try regex
    const re = new RegExp(
      `(<span class="menu-item-text")([^>]*)(>${escapeRe(label)}</span>)`,
      'g',
    )
    let n = 0
    const next = html.replace(re, (full, a, attrs, c) => {
      if (attrs.includes('dc2626') || full.includes(RED_MARK)) return full
      n++
      return `${a} style="${RED_STYLE}"${attrs}>${RED_MARK}${label}</span>`
    })
    return { html: next, n }
  }
  const n = html.split(plain).length - 1
  return { html: html.split(plain).join(styled), n }
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renameLabel(html, from, to) {
  if (!from || from === to) return { html, n: 0 }
  const plain = `menu-item-text">${from}</span>`
  if (!html.includes(plain)) return { html, n: 0 }
  const n = html.split(plain).length - 1
  return { html: html.split(plain).join(`menu-item-text">${to}</span>`), n }
}

// Also paint red for labels that appear in mega-menu column titles etc. outside menu-item-text
function paintRedLoose(html, label) {
  // only menu-item-text path is safe
  return paintRed(html, label)
}

let renamed = 0
let redded = 0
const files = walk(cyan)

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8')
  const before = html

  // 1) renames (null means skip rename, will red later)
  for (const [from, to] of RENAME) {
    if (to == null) continue
    const r = renameLabel(html, from, to)
    html = r.html
    renamed += r.n
  }

  // 2) paint current unnecessary labels red
  // Build list: RED set + any remaining demo program titles after rename miss
  const toRed = [
    ...RED,
    // parents that are just theme chrome
    'Sahifalar',
    // if rename already happened, also red the NEW demo names? No — those are useful 01-04
  ]

  for (const label of toRed) {
    const r = paintRed(html, label)
    html = r.html
    redded += r.n
  }

  // 3) After renaming M.Ed→01 etc, ensure leftover English program names in menus are red
  for (const label of [
    'B.Ed. in Curriculum &amp; Instruction',
    'B.Ed. in Curriculum & Instruction',
    'LLB in Criminal Justice',
    'LLM in International Law',
    'LLB in International Law',
    'B.Sc. in CSE',
    'M.Sc. in CSE',
    'B.Sc. in ME',
    'Master of Laws (LLM)',
  ]) {
    const r = paintRed(html, label)
    html = r.html
    redded += r.n
  }

  if (html !== before) fs.writeFileSync(file, html)
}

// Inject a tiny helper CSS once into index + note in public
const cssPath = path.resolve(cyan, '../tdyu-menu-mark.css')
fs.writeFileSync(
  cssPath,
  `/* Unnecessary menu items marked for removal */\n.menu-item-text[style*="dc2626"]{color:#dc2626!important;font-weight:700!important}\n`,
)

// Ensure CSS linked on main pages (head)
for (const rel of ['index.html', 'about-us/index.html', 'all-programs/index.html']) {
  const f = path.join(cyan, rel)
  if (!fs.existsSync(f)) continue
  let html = fs.readFileSync(f, 'utf8')
  if (!html.includes('tdyu-menu-mark.css')) {
    html = html.replace(
      '</head>',
      '<link rel="stylesheet" href="/tdyu-menu-mark.css" />\n</head>',
    )
    fs.writeFileSync(f, html)
  }
}

console.log('Renamed menu texts:', renamed)
console.log('Painted red:', redded)
console.log('Done.')
