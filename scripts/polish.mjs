import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/cyan')
const logo = '/cyan/wp-content/uploads/sites/17/2025/12/Asset-2-11.png'

function walk(dir, exts, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) walk(f, exts, files)
    else if (exts.test(e.name)) files.push(f)
  }
  return files
}

const textFixes = [
  [/Magistratura Dasturlar/g, 'Magistratura dasturlari'],
  [/Kampus Administrative Direktory/g, 'Kampus ma’muriy katalogi'],
  [/Administrative Management Center/g, 'Ma’muriy boshqaruv markazi'],
  [/Administrative Resources Office/g, 'Ma’muriy resurslar idorasi'],
  [/Administrative Services Unit/g, 'Ma’muriy xizmatlar bo‘limi'],
  [/Worldwide Operations Unit/g, 'Jahon operatsiyalari bo‘limi'],
  [/Talabalar Enrolled/g, 'Ro‘yxatdan o‘tgan talabalar'],
  [/Academic Staff/g, 'Akademik xodimlar'],
  [/Global Hamkorlar/g, 'Global hamkorlar'],
  [/At TDYU, we offer world-class academic programs expert faculty guidance/g, 'TDYUda jahon darajasidagi akademik dasturlar va malakali professorlar rahbarligi mavjud'],
  [/Talaba Life/g, 'Talaba hayoti'],
  [/Bitiruvchilar Muvaffaqiyat Stories/g, 'Bitiruvchilar muvaffaqiyat hikoyalari'],
  [/Bitiruvchilar Photo Galereya/g, 'Bitiruvchilar foto galereyasi'],
  [/Bitiruvchilar Yangiliklar/g, 'Bitiruvchilar yangiliklari'],
  [/All Professor-o‘qituvchilar – TDYU Endowment Fund/g, 'Barcha professor-o‘qituvchilar – TDYU Endowment Fund'],
  [/All Professor-o‘qituvchilar/g, 'Barcha professor-o‘qituvchilar'],
  [/Filtr By/g, 'Filtrlash'],
  [/The LLB in Criminal Justice program provides a strong foundation in criminal law, legal procedures, and criminology\.\.\./g, 'Jinoyat huquqi bo‘yicha LLB dasturi jinoyat huquqi, protsessual huquq va kriminologiya bo‘yicha mustahkam asos beradi...'],
  [/Exploring the Future of Ta’lim in the Digital Age/g, 'Raqamli davrda ta’lim kelajagini o‘rganish'],
  [/He Yakunlash Guide Kampus Opportunities Growth/g, 'Kampus imkoniyatlari va o‘sish bo‘yicha to‘liq qo‘llanma'],
  [/Talaba Affairs/g, 'Talabalar ishlari'],
  [/Active Talaba Clubs/g, 'Faol talaba klublari'],
  [/Cultural Tadbirlar/g, 'Madaniy tadbirlar'],
  [/Enrich campus life/g, 'Kampus hayotini boyitish'],
  [/Join TDYU Yo.qw/g, 'TDYU ga qo‘shiling'],
]

function withProtected(html, fn) {
  const blocks = []
  const masked = html.replace(/<(script|style)(\b[^>]*)>[\s\S]*?<\/\1>/gi, (m) => {
    blocks.push(m)
    return `@@B${blocks.length - 1}@@`
  })
  let out = fn(masked)
  return out.replace(/@@B(\d+)@@/g, (_, i) => blocks[Number(i)])
}

let n = 0
for (const file of [...walk(root, /\.html?$/i), ...walk(root, /\.css$/i)]) {
  let raw = fs.readFileSync(file, 'utf8')
  let next = raw

  // Fix broken avatar / logo paths
  next = next.replace(/https?:\/\/localhost\/wp-content\/uploads\/[^"'\\\s]*Asset-2-11\.png/gi, logo)
  next = next.replace(/\/cyan\/wp-content\/uploads\/sites\/17\/2025\/12\/sites\/17\/2025\/12\/Asset-2-11\.png/g, logo)
  next = next.replace(/\/cyan\/wp-content\/uploads\/2025\/12\/sites\/17\/2025\/12\/Asset-2-11\.png/g, logo)
  next = next.replace(/cropped-avatar[^"'\\\s]*/g, 'sites/17/2025/12/Asset-2-11.png')
  // clean any resulting double sites
  next = next.replace(/\/cyan\/wp-content\/uploads\/sites\/17\/sites\/17\//g, '/cyan/wp-content/uploads/sites/17/')
  next = next.replace(/\/cyan\/wp-content\/uploads\/sites\/17\/2025\/12\/sites\/17\//g, '/cyan/wp-content/uploads/sites/17/')
  next = next.replace(/\/cyan\/(?:\/cyan\/)+/g, '/cyan/')

  next = withProtected(next, (t) => {
    let o = t
    for (const [re, to] of textFixes) o = o.replace(re, to)
    // special Join TDYU broken string with any apostrophe
    o = o.replace(/Join TDYU Yo.qw/g, 'TDYU ga qo‘shiling')
    return o
  })

  if (next !== raw) {
    fs.writeFileSync(file, next)
    n++
  }
}
console.log('Final polish:', n)
