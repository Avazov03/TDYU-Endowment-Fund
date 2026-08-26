/**
 * Fix Huquqiy asos list items to match legal section headings.
 */
import fs from 'node:fs'

const f = 'public/cyan/admission-requirements/index.html'
let h = fs.readFileSync(f, 'utf8')

const pairs = [
  [
    'O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.',
    'Fuqarolik jamiyati va uyushma erkinligi kafolatlari.',
  ],
  [
    'Akademik ko‘rsatkichlar — dastur shartlariga muvofiq.',
    'Mulkiy huquqlar va ixtiyoriy birlashish asoslari.',
  ],
  [
    'Korporativ homiylik uchun shartnoma asosida kelishiladi.',
    'Fond faoliyati Konstitutsiya doirasida amalga oshiriladi.',
  ],
  ['Homiy turi va maxfiylik tanlovi', 'Jamoat fondining huquqiy holati'],
  ['Til sertifikati (agar kerak bo‘lsa)', 'Boshqaruv va nazorat tartibi'],
  [
    'Portfolio yoki oldingi loyiha namunalari (agar kerak)',
    'Vasiylik kengashi tarkibi va vakolatlari',
  ],
  [
    'Kasbiy yoki texnik baholash (dastur talabiga ko‘ra)',
    'Boshqaruv kengashi majburiyatlari',
  ],
  ['Tadqiqot loyihasi (magistr/PhD)', 'Ichki reglament va qarorlar'],
  ['Qabul xati / taklifnoma', 'Yillik hisobot e’lon qilish'],
  ['Moliyaviy homiylik hujjatlari', 'Byudjet va xarajatlar ochiqligi'],
  ['To‘ldirilgan ariza shakli', 'NNO sifatida ro‘yxatdan o‘tish'],
  ['Diplom va baholar varaqasi', 'Faoliyat maqsadlari va cheklovlar'],
  ['Til bilimi tasdiqlovchi hujjat (agar kerak)', 'Hisobot topshirish majburiyati'],
  ['Tavsiyanomalar (agar talab qilinsa)', 'Davlat nazorati tartibi'],
  ['Motivatsion xat', 'Moliyaviy shaffoflik talablari'],
  [
    'Ba’zi dasturlar tanlov yoki imtihon talab qilishi mumkin',
    'Fond ustavi — asosiy ichki hujjat',
  ],
  [
    'Tanlangan arizachilar suhbatga chaqirilishi mumkin',
    'Ustav o‘zgarishlari belgilangan tartibda qabul qilinadi',
  ],
  [
    'Ariza yig‘imi (agar belgilangan bo‘lsa)',
    'Mustaqil audit va ichki nazorat',
  ],
  [
    'Xarajatlarni qoplash asoslari (grant doirasida)',
    'Mablag‘lar maqsadli sarflanishi',
  ],
]

let n = 0
for (const [a, b] of pairs) {
  if (!h.includes(a)) {
    console.log('miss', a.slice(0, 50))
    continue
  }
  h = h.split(a).join(b)
  n++
}
fs.writeFileSync(f, h)
console.log('n', n)
