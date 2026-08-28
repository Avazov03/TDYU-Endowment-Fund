/**
 * Clean remaining English on UZ home and shared chrome.
 */
import fs from 'node:fs'
import path from 'node:path'

const pairs = [
  ['Search Keyword...', 'Qidirish...'],
  ['placeholder="First Name"', 'placeholder="Ism"'],
  ['placeholder="Last Name"', 'placeholder="Familiya"'],
  ['placeholder="Email Address"', 'placeholder="Elektron pochta"'],
  ['placeholder="Country"', 'placeholder="Mamlakat"'],
  ['placeholder="City"', 'placeholder="Shahar"'],
  ['placeholder="Zip Code"', 'placeholder="Pochta indeksi"'],
  ['placeholder="Address"', 'placeholder="Manzil"'],
  ['placeholder="Message"', 'placeholder="Xabar"'],
  ['value="submit"', 'value="Yuborish"'],
  ['aria-label="Contact form"', 'aria-label="Aloqa formasi"'],
  ['Support Teacher', 'Mentor'],
  ['Teaching Assistant (TA)', 'Yordamchi o‘qituvchi'],
  ['Upcoming Events', 'Yaqinlashayotgan tadbirlar'],
  ['View More Events', 'Barcha tadbirlar'],
  ['Detailed Plans', 'Batafsil reja'],
  ['Online Courses', 'Onlayn kurslar'],
  ['Web Developer', 'Dasturchi'],
  ['Web Designer', 'Dizayner'],
  ['Senior Lecturer', 'Katta o‘qituvchi'],
  ['Digital Marketing', 'Raqamli marketing'],
  ['Costs USD', 'Xarajat (USD)'],
  ['Enrollment Fee (Onetime fee)', 'Ro‘yxatdan o‘tish (bir martalik)'],
  ['Orientations Fee (Onetime fee)', 'Orientatsiya (bir martalik)'],
  ['>Tuition</', '>O‘qish to‘lovi</'],
  ['Breakfast Fee', 'Ovqatlanish'],
  ['Activity Fee', 'Tadbirlar'],
  ['Total Fast Year', '1-yil jami'],
  ['Total Second Year', '2-yil jami'],
  ['As Scheduled', 'Reja bo‘yicha'],
  ['>Postgraduate</', '>Magistratura</'],
  ['Postgraduate Certificate in Teaching and Learning dasturi yakunlandi.', 'O‘qitish va o‘rganish bo‘yicha malaka oshirish dasturi yakunlandi.'],
  ['Social Link', 'Ijtimoiy tarmoqlar'],
  [
    '“At TDYU Endowment Fund, our students are at the heart of everything IS we Their stories reflect our mission empower inspire and prepare”',
    '“TDYU Endowment Fundda talabalar — e’tibor markazida. Ularning hikoyalari missiyamizni aks ettiradi: qo‘llab-quvvatlash, ilhomlantirish va tayyorlash.”',
  ],
  [
    '“The Computer Science program TDYU is world-class We work on real projects not just theory. The labs research opportunities gave me the”',
    '“Fond dasturlari amaliyotga yo‘naltirilgan. Grant va stajirovkalar orqali haqiqiy tajriba orttirdim.”',
  ],
]

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

let files = 0
let hits = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!a || !h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  // lang attribute
  if (h.includes('lang="en-US"')) {
    h = h.replace(/lang="en-US"/g, 'lang="uz"')
    n++
  }
  if (!n) continue
  fs.writeFileSync(file, h)
  files++
  hits += n
}
console.log('files', files, 'hits', hits)
