import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'
const fixes = [
  ['Magistratura Dasturlar', 'Magistratura dasturlari'],
  ['Kampus Administrative Direktory', 'Kampus ma’muriy katalogi'],
  ['Administrative Management Center', 'Ma’muriy boshqaruv markazi'],
  ['Administrative Resources Office', 'Ma’muriy resurslar idorasi'],
  ['Administrative Services Unit', 'Ma’muriy xizmatlar bo‘limi'],
  ['Worldwide Operations Unit', 'Jahon operatsiyalari bo‘limi'],
  ['Talabalar Enrolled', 'Ro‘yxatdan o‘tgan talabalar'],
  ['Academic Staff', 'Akademik xodimlar'],
  ['Global Hamkorlar', 'Global hamkorlar'],
  ['At TDYU, we offer world-class academic programs expert faculty guidance', 'TDYUda jahon darajasidagi akademik dasturlar va malakali professorlar rahbarligi mavjud'],
  ['Talaba Life', 'Talaba hayoti'],
  ['Bitiruvchilar Muvaffaqiyat Stories', 'Bitiruvchilar muvaffaqiyat hikoyalari'],
  ['Bitiruvchilar Photo Galereya', 'Bitiruvchilar foto galereyasi'],
  ['Bitiruvchilar Yangiliklar', 'Bitiruvchilar yangiliklari'],
  ['All Professor-o‘qituvchilar – TDYU Endowment Fund', 'Barcha professor-o‘qituvchilar – TDYU Endowment Fund'],
  ['All Professor-o‘qituvchilar', 'Barcha professor-o‘qituvchilar'],
  ['Filtr By', 'Filtrlash'],
  ['The LLB in Criminal Justice program provides a strong foundation in criminal law, legal procedures, and criminology....', 'Jinoyat huquqi bo‘yicha LLB dasturi jinoyat huquqi, protsessual huquq va kriminologiya asoslarini beradi...'],
  ['Exploring the Future of Ta’lim in the Digital Age', 'Raqamli davrda ta’lim kelajagini o‘rganish'],
  ['He Yakunlash Guide Kampus Opportunities Growth', 'Kampus imkoniyatlari va o‘sish bo‘yicha to‘liq qo‘llanma'],
  ['Talaba Affairs', 'Talabalar ishlari'],
  ['Active Talaba Clubs', 'Faol talaba klublari'],
  ['Cultural Tadbirlar', 'Madaniy tadbirlar'],
  ['Enrich campus life', 'Kampus hayotini boyitish'],
  ['Comparative Legal Systems', 'Qiyosiy huquqiy tizimlar'],
  ['Corporate Governance', 'Korporativ boshqaruv'],
  ['Operating Systems', 'Operatsion tizimlar'],
  ['Computer Networks', 'Kompyuter tarmoqlari'],
  ['Advanced Tadqiqot Labs', 'Ilg‘or tadqiqot laboratoriyalari'],
  ['Xalqaro Public Law', 'Xalqaro ommaviy huquq'],
]

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

fixes.sort((a, b) => b[0].length - a[0].length)
let n = 0
for (const file of walk(root)) {
  let h = fs.readFileSync(file, 'utf8')
  let o = h
  for (const [a, b] of fixes) if (o.includes(a)) o = o.split(a).join(b)
  o = o.replace(/Join TDYU Yo.qw/g, 'TDYU ga qo‘shiling')
  o = o.replace(/TDYU ga qo‘shiling Yo.qw/g, 'TDYU ga qo‘shiling')
  if (o !== h) {
    fs.writeFileSync(file, o)
    n++
  }
}
console.log('extra translate', n)
