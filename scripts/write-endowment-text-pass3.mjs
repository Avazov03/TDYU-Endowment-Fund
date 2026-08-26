/**
 * Page-specific longer copy (still text-only). Careful unique phrases only.
 */
import fs from 'node:fs'
import path from 'node:path'

const cyan = 'public/cyan'

function patch(rel, pairs) {
  const file = path.join(cyan, rel)
  if (!fs.existsSync(file)) return console.log('skip', rel)
  let html = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!a || !html.includes(a)) continue
    const c = html.split(a).length - 1
    html = html.split(a).join(b)
    n += c
  }
  fs.writeFileSync(file, html)
  console.log(rel, n)
}

patch('about-us/index.html', [
  ['Fond ichida', 'Nima uchun fond mavjud'],
  ['6 ustun (pillar)', '6 ustun'],
  ['Faoliyat yo‘nalishlari', 'TSUL brendi va tadbirkorlik'],
  ['Alumni hikoyalari', 'Muvaffaqiyat tarixlari'],
])

patch('all-programs/index.html', [
  ['Dasturlar ro‘yxati', '7 asosiy dastur'],
  ['Yo‘nalishlar', 'Dastur yo‘nalishlari'],
  ['Toifalar', 'Ishtirokchilar'],
  ['Dastur turi', 'Moliyalashtirish'],
])

patch('tuition-fee/index.html', [
  ['Mablag‘ qayerga ketadi?', 'Mablag‘ qayerga ketadi'],
  ['2024–2025 mablag‘ taqsimoti', 'Yillik hisobot · audit · ustav'],
  ['How Much Will It Cost You?', 'Mablag‘ qayerga ketadi'],
])

patch('vice-chancellor/index.html', [
  ['N. Salayev — Boshqaruv kengashi raisi', 'N. Salayev'],
  ['Kollegial boshqaruv', 'Vasiylik, Boshqaruv va Taftish kengashlari'],
])

patch('contact/index.html', [
  ['Get In Touch', 'Aloqa — Saylgoh ko‘chasi 35'],
  ['Contact Us', 'Aloqa — Saylgoh ko‘chasi 35'],
])

patch('index.html', [
  ['Member Details', 'A’zo tafsilotlari'],
])

patch('research/index.html', [
  ['Amalga oshirilgan loyihalar', 'Loyihalar — Jessup, Westminster, TSUL SHOP'],
])

console.log('page copy done')
