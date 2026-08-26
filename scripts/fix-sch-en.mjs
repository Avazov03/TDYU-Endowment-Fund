/**
 * Scholarships leftover EN cleanup — exact strings only.
 */
import fs from 'node:fs'

const file = 'public/cyan/scholarships/index.html'
let h = fs.readFileSync(file, 'utf8')

const pairs = [
  [
    'Guided by a vision of academic excellence, we bring together talented faculty, dedicated scholars, and curious students to explore ideas that shape the future. Our research culture encourages creativity, collaboration, and critical thinking empowering individuals to address complex global challenges in science, technology, health, business, and the social sciences. With state-of-the-art laboratories, modern research centers, and strong industry partnerships, we provide the resources needed to transform theories into real-world solutions.',
    'Ariza ochiq; tanlov mezonlari — akademik natija, motivatsiya va fond maqsadlariga moslik.',
  ],
  [
    'We actively support research at every level, from undergraduate exploration to advanced doctoral inquiry, ensuring opportunities for hands-on learning, discovery and leadership. Through publications, conferences, and global collaborations, our researchers contribute to international academic.',
    'Har bir grant turi uchun alohida shartlar va muddatlar belgilangan.',
  ],
  [
    'We actively support research at every level, from undergraduate exploration to advanced doctoral inquiry ensuring opportunities for hands-on learning, discovery and leadership. Through publications, conferences, and global collaborations, our researchers contribute to international academic.',
    'Formani to‘ldiring va kerakli hujjatlarni yuklang. Savollar bo‘lsa — aloqa qiling.',
  ],
  [
    'Applicants must submit academic transcripts certificates and proof English language proficiency Some programs may require entrance exams interviews, or portfolio submissions Meeting the minimum requirements does not guarantee admission as selection is based on academic performance eligibility',
    'Ha. Fond stipendiyalar va grantlar dasturlarini ochiq e’lon qiladi. Ariza muddatlari Grantlar sahifasida ko‘rsatiladi.',
  ],
  [
    'Academic fee (per year $300-$500)<br />Full-Time Tuition (Per semesters): $300',
    'To‘liq yoki qisman moliyalashtirish — dastur shartlariga ko‘ra',
  ],
  [
    'Technology fee ($250 per semester)<br />Yiliga ochiq · ariza: mart–may',
    'Yiliga ochiq · ariza: mart–may',
  ],
  ['Amount:', 'Miqdor:'],
  ['Additional Fees:', 'Qo‘shimcha:'],
  ['1. Academic Qualifications', '1. Akademik talablar'],
  ['3. English Language Proficiency', '3. Til bilimi'],
  ['4. Entrance Exam / Interview', '4. Tanlov / suhbat'],
  ['6. Financial Huquqiy asos', '6. Moliyaviy asoslar'],
  ['Do Your Need Help?', 'Yordam kerakmi?'],
  ['Contact Now', 'Bog‘lanish'],
  ['placeholder="First Name"', 'placeholder="Ism"'],
  ['placeholder="Last Name"', 'placeholder="Familiya"'],
  ['placeholder="Email Address"', 'placeholder="Elektron pochta"'],
  ['placeholder="Type your phone number"', 'placeholder="Telefon raqami"'],
  ['placeholder="Country"', 'placeholder="Mamlakat"'],
  ['placeholder="Type your secondary school name"', 'placeholder="Maktab / kollej nomi"'],
  ['placeholder="Enter your GPA"', 'placeholder="GPA"'],
  ['placeholder="Type higher secondary school name"', 'placeholder="Oliy o‘quv yurti"'],
  ['placeholder="Enter your GPA / CGPA"', 'placeholder="GPA / CGPA"'],
  ['>Select Gender<', '>Jinsni tanlang<'],
  ['>Male<', '>Erkak<'],
  ['>Female<', '>Ayol<'],
  ['>Other<', '>Boshqa<'],
  ['>Select Board<', '>Tanlang<'],
  ['>Household Income<', '>Oila daromadi<'],
  ['>Financial aid<', '>Moliyaviy yordam<'],
  ['>less than $7k<', '>7 ming $ dan kam<'],
  ['>less than $9k<', '>9 ming $ dan kam<'],
  ['>Yes<', '>Ha<'],
  ['>No<', '>Yo‘q<'],
  ['<label>First Name*</label>', '<label>Ism*</label>'],
  ['<label>Last Name*</label>', '<label>Familiya*</label>'],
  ['<label>Your Email*</label>', '<label>Elektron pochta*</label>'],
  ['<label>Your Phone Number*</label>', '<label>Telefon*</label>'],
  ['<label>Date of Birth*</label>', '<label>Tug‘ilgan sana*</label>'],
  ['<label>Gender*</label>', '<label>Jins*</label>'],
  ['<label>Country Name*</label>', '<label>Mamlakat*</label>'],
  ['<label>Secondary School*</label>', '<label>O‘rta ta’lim*</label>'],
  ['<label>GPA*</label>', '<label>GPA*</label>'],
  ['<label>Education Board*</label>', '<label>Ta’lim kengashi*</label>'],
  ['<label>Higher Secondary School*</label>', '<label>Oliy ta’lim*</label>'],
  ['<label>GPA / CGPA*</label>', '<label>GPA / CGPA*</label>'],
  [
    '<label>Household Income*</label>',
    '<label>Oila daromadi*</label>',
  ],
  [
    '<label>Applying for need-based financial aid*</label>',
    '<label>Ehtiyoj asosidagi yordam*</label>',
  ],
  ['<label>Upload File *</label>', '<label>Fayl yuklash *</label>'],
]

let n = 0
const miss = []
for (const [a, b] of pairs) {
  if (!h.includes(a)) {
    miss.push(a.slice(0, 60))
    continue
  }
  const c = h.split(a).length - 1
  h = h.split(a).join(b)
  n += c
}
fs.writeFileSync(file, h)
console.log('ok', n, 'miss', miss.length)
miss.slice(0, 15).forEach((m) => console.log(' miss', m))

// remaining EN check
const left = [
  'Guided by',
  'We actively',
  'Applicants must',
  'Academic fee',
  'Technology fee',
  'First Name',
  'Do Your Need',
  'Contact Now',
  'Academic Qualifications',
  'English Language',
  'Entrance Exam',
  'Financial Huquqiy',
  'Amount:',
]
console.log(
  'still:',
  left.filter((x) => h.includes(x)),
)
