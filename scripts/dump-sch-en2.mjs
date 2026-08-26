/**
 * Fix remaining English on Grantlar (scholarships) — exact only.
 */
import fs from 'node:fs'

const file = 'public/cyan/scholarships/index.html'
let h = fs.readFileSync(file, 'utf8')

const pairs = [
  [
    'Guided by a vision of academic excellence, we bring together talented faculty, dedicated scholars, and c',
    'Maqsad — iqtidorli kadrlarni xalqaro imkoniyatlar bilan qo‘llab-quvvatlash. ',
  ],
  // if truncated mid-word in source, try fuller common paragraphs
  [
    'We actively support research at every level, from undergraduate exploration to advanced doctoral inquiry, ensuring opportunities for hands-on learning, discovery and leadership. Through publications,',
    'Grantlar ochiq tanlov asosida beriladi; natijalar shaffof hisobotlarda e’lon qilinadi. ',
  ],
  [
    'We actively support research at every level, from undergraduate exploration to advanced doctoral inquiry ensuring opportunities for hands-on learning, discovery and leadership. Through publications, c',
    'Ariza topshirishdan oldin dastur shartlari va kerakli hujjatlar bilan tanishing. ',
  ],
  ['Amount:', 'Miqdor:'],
  ['Additional Fees:', 'Qo‘shimcha:'],
  [
    'Academic fee (per year $300-$500) Full-Time Tuition (Per semesters): $300',
    'To‘liq yoki qisman moliyalashtirish — dastur shartlariga ko‘ra',
  ],
  [
    'Academic fee (per year $300-$500)Full-Time Tuition (Per semesters): $300',
    'To‘liq yoki qisman moliyalashtirish — dastur shartlariga ko‘ra',
  ],
  ['Technology fee ($250 per semester) ', ''],
  ['Technology fee ($250 per semester)', ''],
  ['1. Academic Qualifications', '1. Akademik talablar'],
  ['3. English Language Proficiency', '3. Til bilimi'],
  ['4. Entrance Exam / Interview', '4. Tanlov / suhbat'],
  ['6. Financial Huquqiy asos', '6. Moliyaviy asoslar'],
  [
    'Applicants must submit academic transcripts certificates and proof English language proficiency Some programs may require entrance exams interviews, or portfolio submissions Meeting the minimum requir',
    'Ha. Fond stipendiyalar va grantlar dasturlarini ochiq e’lon qiladi. Ariza muddatlari va shartlar Grantlar sahifasida ko‘rsatiladi.',
  ],
  ['First Name', 'Ism'],
  ['Last Name', 'Familiya'],
  ['Email Address', 'Elektron pochta'],
  ['Type your phone number', 'Telefon raqami'],
  ['Select Gender', 'Jinsni tanlang'],
  ['Male', 'Erkak'],
  ['Female', 'Ayol'],
  ['Other', 'Boshqa'],
  ['Country', 'Mamlakat'],
  ['Type your secondary school name', 'Maktab / kollej nomi'],
  ['Enter your GPA', 'GPA kiriting'],
  ['Select Board', 'Kengashni tanlang'],
  ['Type higher secondary school name', 'Oliy o‘quv yurti nomi'],
  ['Enter your GPA / CGPA', 'GPA / CGPA'],
  ['Household Income', 'Oila daromadi'],
  ['Financial aid', 'Moliyaviy yordam'],
  ['less than $7k', '7 ming $ dan kam'],
  ['less than $9k', '9 ming $ dan kam'],
  ['Your Email', 'Elektron pochta'],
  ['Your Phone Number', 'Telefon'],
  ['Date of Birth', 'Tug‘ilgan sana'],
  ['Gender', 'Jins'],
  ['Country Name', 'Mamlakat'],
  ['Secondary School', 'O‘rta ta’lim'],
  ['Higher Secondary School', 'Oliy ta’lim'],
  ['Education Board', 'Ta’lim kengashi'],
  ['GPA / CGPA', 'GPA / CGPA'],
  ['Applying for need-based financial aid', 'Ehtiyoj asosidagi yordam'],
  ['Upload File', 'Fayl yuklash'],
  ['Do Your Need Help?', 'Yordam kerakmi?'],
  ['Contact Now', 'Bog‘lanish'],
  ['Yes', 'Ha'],
  ['No', 'Yo‘q'],
]

// Careful: Male/Female/Other/Yes/No/Country are too short and dangerous globally.
// Restrict short ones to placeholder= or option contexts only via longer strings.

const safe = [
  [
    'Fond iqtidorli talaba, xodim va tadqiqotchilar uchun ochiq grant dasturlarini moliyalashtiradi. Guided by a vision of academic excellence, we bring together talented faculty, dedicated scholars, and c',
    'Fond iqtidorli talaba, xodim va tadqiqotchilar uchun ochiq grant dasturlarini moliyalashtiradi.',
  ],
]

// Dump long EN paras first if safe pairs miss
const needles = [
  'Guided by a vision',
  'We actively support research',
  'Applicants must submit',
  'Academic fee',
  'Technology fee',
  'Do Your Need Help',
  'Contact Now',
  'First Name',
  'Academic Qualifications',
  'English Language',
  'Entrance Exam',
  'Financial Huquqiy',
]
for (const n of needles) {
  const i = h.indexOf(n)
  if (i >= 0) console.log('HAS', n, JSON.stringify(h.slice(i, i + 160)))
}
