/**
 * Finish Yangiliklar excerpts + Comments label.
 */
import fs from 'node:fs'

const files = ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']

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

for (const file of files) {
  if (!fs.existsSync(file)) continue
  let h = fs.readFileSync(file, 'utf8')
  let n = 0

  // Comments label
  if (h.includes('Comments </span> (0)')) {
    const c = h.split('Comments </span> (0)').length - 1
    h = h.split('Comments </span> (0)').join('Izohlar </span> (0)')
    n += c
  }
  if (h.includes('Comments </span>')) {
    const c = h.split('Comments </span>').length - 1
    h = h.split('Comments </span>').join('Izohlar </span>')
    n += c
  }

  for (const [title, excerpt] of Object.entries(map)) {
    const from = `>${title}</a></h3><p>Fond yangiliklari va e’lonlari.</p>`
    const to = `>${title}</a></h3><p>${excerpt}</p>`
    if (!h.includes(from)) {
      // try curly apostrophe variants already in title
      continue
    }
    const c = h.split(from).length - 1
    h = h.split(from).join(to)
    n += c
  }

  // any remaining generic excerpts
  if (h.includes('Fond yangiliklari va e’lonlari.')) {
    // leave or replace remaining with generic better text
    const c = h.split('Fond yangiliklari va e’lonlari.').length - 1
    h = h
      .split('Fond yangiliklari va e’lonlari.')
      .join('TDYU Endowment Fund yangiliklari va rasmiy e’lonlar.')
    n += c
  }

  fs.writeFileSync(file, h)
  console.log(file, 'n', n)
  console.log(
    '  leftover Fond yangiliklari',
    h.includes('Fond yangiliklari'),
    'Comments span',
    h.includes('Comments </span>'),
  )
}
