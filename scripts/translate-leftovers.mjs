import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'

const fixes = [
  ['Facilities Dastur', 'Infratuzilma dasturi'],
  ['Academic Fakultet', 'Akademik fakultet'],
  ['Ariza Process', 'Ariza jarayoni'],
  ['02. Yakunlash the Onlayn Application', '02. Onlayn arizani yakunlash'],
  ['Dicover Our Dasturlar', 'Dasturlarimizni kashf eting'],
  ['Discover Our Dasturlar', 'Dasturlarimizni kashf eting'],
  ['Semestr Examination Schedule', 'Semestr imtihon jadvali'],
  ['Qabul Ochish', 'Qabul ochilishi'],
  ['Achieved 50+ awards for excellence and innovation.', 'Mukammallik va innovatsiya uchun 50+ mukofotga erishildi.'],
  ['Application Form', 'Ariza shakli'],
  ['Top-ranked programs designed for tomorrow’s leaders', 'Kelajak yetakchilari uchun eng yaxshi dasturlar'],
  ["Top-ranked programs designed for tomorrow's leaders", 'Kelajak yetakchilari uchun eng yaxshi dasturlar'],
  ['Talaba life here is a journey of discovery leadership and unforgettable experiences beyond the classroom.', 'Bu yerda talaba hayoti — kashfiyot, yetakchilik va auditoriyadan tashqaridagi unutilmas tajribalar yo‘li.'],
  ['Detailed Plans', 'Batafsil reja'],
  ['Onlayn Kurslar', 'Onlayn kurslar'],
  ['Digital Marketing', 'Raqamli marketing'],
  ['Motion Graphics Trends Every Designer Should Know', 'Har bir dizayner bilishi kerak bo‘lgan motion graphics trendlari'],
  ['Universitet Kutubxonalar', 'Universitet kutubxonalari'],
  ['Academic Library', 'Akademik kutubxona'],
  ['Learning Resources', 'O‘quv resurslari'],
  ['Knowledge Center', 'Bilim markazi'],
  ['Library Collections', 'Kutubxona fondlari'],
  ['Academic Books', 'Akademik kitoblar'],
  ['Special Collections', 'Maxsus kolleksiyalar'],
  ['Ochish Reading Hall', 'O‘qish zali'],
  ['Tadqiqot Focus Areas', 'Tadqiqot yo‘nalishlari'],
  ['For graduate programs: a bachelor’s degree with required CGPA.', 'Magistratura uchun: zarur CGPA bilan bakalavr diplomi.'],
  ["For graduate programs: a bachelor's degree with required CGPA.", 'Magistratura uchun: zarur CGPA bilan bakalavr diplomi.'],
  ['Biomedical Tadqiqot', 'Biomeditsina tadqiqoti'],
  ['Clinical Trials', 'Klinik sinovlar'],
  ['Public Health Tadqiqot', 'Jamoat salomatligi tadqiqoti'],
  ['O‘rganish Our Stipendiya Types', 'Stipendiya turlarini o‘rganing'],
  ['Innovatsiya Stipendiyalar', 'Innovatsiya stipendiyalari'],
  ['Specialized Stipendiyalar', 'Maxsus stipendiyalar'],
  ['Stipendiya Talablar', 'Stipendiya talablari'],
  ['Frequently Asked Questions', 'Ko‘p so‘raladigan savollar'],
  ['How do I apply for university admission?', 'Universitetga qanday ariza topshiraman?'],
  ['What is the average university class size?', 'O‘rtacha guruh hajmi qancha?'],
  ['How can I participate in campus activities?', 'Kampus tadbirlarida qanday ishtirok etaman?'],
  ['How can I contact the admission office?', 'Qabul bo‘limiga qanday murojaat qilaman?'],
  ['Stipendiya Ariza Form', 'Stipendiya ariza shakli'],
  ['Engineering Fakultet', 'Muhandislik fakulteti'],
  ['Business School', 'Biznes maktabi'],
  ['Fieldwork required', 'Dala amaliyoti talab qilinadi'],
  ['Social Sciences', 'Ijtimoiy fanlar'],
  ['Mandatory for all', 'Hammaga majburiy'],
  ['Charged during admission', 'Qabul paytida undiriladi'],
  ['Adjusted with first semester', 'Birinchi semestr bilan hisoblanadi'],
  ['Majburiy for all students', 'Barcha talabalar uchun majburiy'],
  ['Web Designer', 'Veb-dizayner'],
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
  if (o !== h) {
    fs.writeFileSync(file, o)
    n++
  }
}
console.log('translated leftovers in', n, 'files')
