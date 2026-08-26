/**
 * Second pass: fix leftovers after first text write.
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

const pairs = [
  ['Dasturlar &amp; Programs', '7 asosiy dastur'],
  ['Dasturlar & Programs', '7 asosiy dastur'],
  ['New digital resources available', 'Yillik hisobot e’lon qilindi'],
  ['Future-Ready Skills &amp; Workforce Transformation..', 'Xorijiy stajirovka dasturlari'],
  ['Future-Ready Skills & Workforce Transformation..', 'Xorijiy stajirovka dasturlari'],
  ['Collage of arts and Sciences', 'Xalqaro tadbirlar — 22%'],
  ['College of arts and Sciences', 'Xalqaro tadbirlar — 22%'],
  ['About TDYU Endowment Fund', 'TDYU Endowment Fund missiyasi'],
  ['Manzil Tour', 'Faoliyat yo‘nalishlari'],
  ['Filter By Reset', 'Dasturlar ro‘yxati'],
  ['Missiya va qiymatlar', 'Missiya'],
  ['All Events', 'Tadbirlar'],
  ['Events Details', 'Tadbir tafsilotlari'],
  ['Faculty Areas', 'Fakultetlar'],
  ['Faculty Details', 'Fakultet tafsilotlari'],
  ['History', 'Tarix'],
  ['Administration', 'Ma’muriyat'],
  ['Campus Map', 'Xarita'],
  ['Libraries', 'Kutubxonalar'],
  ['Gallery', 'Galereya'],
  ['Sahifalar', 'Sahifalar'],
  ['Faq', 'Yordam'],
  ['Top-ranked programs designed for tomorrow’s leaders', 'Fond ustunlari: ta’lim, hamkorlik, tanlov, nashr, brend, tadbirkorlik'],
  ['Top-ranked programs designed for tomorrow\'s leaders', 'Fond ustunlari: ta’lim, hamkorlik, tanlov, nashr, brend, tadbirkorlik'],

  // page heroes / common
  ['Message from Vice Chancellor', 'Boshqaruv organlari'],
  ['How Much Will It Cost You?', 'Mablag‘ qayerga ketadi?'],
  ['Annual Tuition Fees 2025–2026', '2024–2025 mablag‘ taqsimoti'],

  // footer / brand remnants
  ['Univet Library', 'TDYU kutubxonasi'],
  ['Univet', 'TDYU'],

  // fix over-aggressive Home→Bosh in sentences if any
  ['Boshpage', 'Homepage'],
  ['Bosh page', 'Home page'],
]

// Restore EditURI if broken by old translators
const attrFixes = [
  ['TahrirlashURI', 'EditURI'],
]

let total = 0
for (const file of walk(cyan)) {
  let html = fs.readFileSync(file, 'utf8')
  const before = html
  for (const [a, b] of pairs) {
    if (html.includes(a)) {
      const c = html.split(a).length - 1
      html = html.split(a).join(b)
      total += c
    }
  }
  for (const [a, b] of attrFixes) {
    if (html.includes(a)) html = html.split(a).join(b)
  }
  if (html !== before) fs.writeFileSync(file, html)
}

// Stronger home-only notice + stats labels if counters exist
const index = path.join(cyan, 'index.html')
let home = fs.readFileSync(index, 'utf8')
const homeExtra = [
  ['50+', '31'],
  ['Award Winning', 'loyiha'],
]
// don't globally replace 50+ - too risky. Skip.

fs.writeFileSync(index, home)
console.log('Pass2 done. Replacements:', total)

// verify
const h = fs.readFileSync(index, 'utf8')
console.log('hero ok', h.includes('Huquqiy ta'))
console.log('programs heading', h.includes('7 asosiy dastur'))
console.log('jessup', h.includes('Jessup'))
console.log('univet left', (h.match(/Univet/g) || []).length)
console.log('elementor', h.includes('elementor'))
