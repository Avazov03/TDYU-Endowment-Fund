import fs from 'node:fs'

const file = 'public/cyan/index.html'
let h = fs.readFileSync(file, 'utf8')

const map = [
  ['Ta-134/A,  NY 11110, USA', "Saylgoh ko'chasi 35, Yunusobod, Toshkent 100047"],
  ['Mission &amp; Value', 'Missiya va qiymatlar'],
  ['Tuition &amp; Fee', 'Hisobotlar'],
  ['Admission Requirements', 'Qabul talablari'],
  ['Cost &amp; Financial Aid', 'Moliyaviy yordam'],
  ['Faculty Members One', 'Fond organlari'],
  ['Faculty Members Two', 'Boshqaruv'],
  ['Faculty Members 01', 'Fond organlari'],
  ['Faculty Members 02', 'Boshqaruv'],
  ['Research Details', 'Loyiha tafsilotlari'],
  ['Regular Univet Students', 'TDYU talabalari'],
  ['Blog Grid 3 Column', 'Yangiliklar paneli'],
  ['Blog Grid Sidebar', 'Yangiliklar'],
  ['Blog List Sidebar', "Yangiliklar ro'yxati"],
]

for (const [a, b] of map) h = h.split(a).join(b)
fs.writeFileSync(file, h)
console.log('index content patched')
