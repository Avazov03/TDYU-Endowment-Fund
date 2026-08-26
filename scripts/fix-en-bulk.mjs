/**
 * Bulk leftover English → Uzbek (exact string only, all cyan index.html).
 */
import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const pairs = [
  // common chrome
  ['Quick Contact:', 'Tezkor aloqa:'],
  ['Follow Us:', 'Bizni kuzating:'],
  ['Follow Us', 'Bizni kuzating'],
  ['>Email:</', '>Email:</'],
  ['Email:</h4>', 'Email:</h4>'],
  ['>Email:<', '>Email:<'],
  [
    'Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions.',
    'TDYU Endowment Fund — bilim, grant va xalqaro imkoniyatlarga sarmoya.',
  ],

  // homepage / programs snippets
  ['About Our University', 'Fond haqida'],
  ['More About Us', 'Batafsil'],
  ['Our Professors', 'Jamoa'],
  ['View All Professors', 'Barchasini ko‘rish'],
  ['Academic Advisor', 'Maslahatchi'],
  ['Academic Assistant', 'Yordamchi'],
  ['Research Assistant', 'Tadqiqotchi'],
  ['Apply Today Now', 'Xayriya qilish'],
  ['View All Post', 'Barcha yangiliklar'],
  ['Students Feedback', 'Alumni fikrlari'],
  ['Tuition Fee', 'Hisobotlar'],
  ['Program-Wise', 'Dasturlar bo‘yicha'],
  ['>Graduate<', '>Magistratura<'],
  ['Filter By', 'Filtrlash'],
  ['Explore More', 'Ko‘proq'],
  ['Get in Touch', 'Bog‘lanish'],
  ['Support Email', 'Qo‘llab-quvvatlash email'],
  ['Phone Number', 'Telefon'],
  ['>Admission<', '>Qabul<'],
  ['admission@univet.edu', 'info@tdyu-endowment.uz'],
  ['Save my name &amp; email into browser for the next time comment', 'Keyingi safar uchun ism va emailni saqlash'],
  ['Facilities Program', 'Infratuzilma dasturi'],
  ['Digital materials to enhance.', 'Raqamli materiallar.'],
  ['A hub for information.', 'Ma’lumot markazi.'],
  ['Academic Books', 'Ilmiy kitoblar'],
  [
    'Develops scalable software systems with expertise in coding problem-solving.',
    'Xalqaro amaliyot va raqamli huquq yo‘nalishidagi bitiruvchi.',
  ],
  [
    'Advance your legal expertise with an internationally recognized.',
    'Xalqaro tan olingan huquqiy malaka oshirish.',
  ],
  [
    'Explore the world of coding data and innovation with a degree.',
    'Ma’lumotlar va innovatsiya — grant dasturlari orqali.',
  ],
  [
    'Explore advanced knowledge and discovery through guide research.',
    'Ilmiy tadqiqot va nashrlarni qo‘llab-quvvatlash.',
  ],
  [
    'B.Sc. in Mechanical Engineering provides strong theoretical',
    'Amaliy loyihalar va infratuzilma dasturlari',
  ],
  [
    'Student life here is a journey of discovery leadership and unforgettable experiences beyond the classroom.',
    'Fond bitiruvchilar va talabalarga xalqaro imkoniyatlar ochadi.',
  ],
  [
    '“we believe that every business is uniquids our approach never one size fits all. We tailor our strategies to fit your goals is and industry”',
    '“Har bir xayriya va grant — aniq maqsadga yo‘naltirilgan. Shaffoflik asosiy tamoyilimiz.”',
  ],
  ['Collage of arts and Sciences', 'Fanlar va san’at'],
  ['Full-Time Tuition (Per semester): $300', 'Dastur moliyalashtirish: dastur shartlariga ko‘ra'],
  ['Full-Time Tuition (Per semesters): $300', 'Dastur moliyalashtirish: dastur shartlariga ko‘ra'],
  ['Technology fee: $250 per Semester', 'Qo‘shimcha xarajatlar: dasturga qarab'],
  ['Student Activity Fee: $99 per Semester', 'Tadbir/loyiha xarajatlari: dasturga qarab'],

  // faculties → endowment program labels (all-programs)
  ['Faculty of Education', '01 · Xalqaro stajirovka'],
  ['Faculty of Law', '02 · Stipendiya va grant'],
  ['IT Faculty', '03 · Tanlovlar'],
  ['Faculty of Health Sciences', '04 · Ilmiy loyihalar'],
  ['Faculty of Social Sciences', '05 · Xalqaro tadbirlar'],
  ['Faculty of Science', '06 · Infratuzilma'],
  ['Faculty of Arts &amp; Humanities', '07 · Nashrlar'],
  ['Faculty of Business &amp; Management', 'Alumni qo‘llab-quvvatlash'],
  ['Faculty of Engineering', 'Malaka oshirish'],
  ['Department of Curriculum &amp; Instruction', 'O‘quv dasturlari'],
  ['Department of Educational Leadership', 'Ta’lim rahbariyati'],
  ['Department of Criminal Justice', 'Jinoyat huquqi'],
  ['Department of International Law', 'Xalqaro huquq'],
  ['Department of Data Science', 'Ma’lumotlar fanlari'],
  ['Department of Software Engineering', 'Dasturiy injiniring'],
  ['Department of Nursing', 'Sog‘liqni saqlash'],
  ['Department of Public Health', 'Jamoat salomatligi'],
  ['Department of Political Science', 'Siyosatshunoslik'],
  ['Department of Sociology', 'Sotsiologiya'],
  ['Department of Physics', 'Fizika'],
  ['Department of Mathematics', 'Matematika'],
  ['Department of Tarix', 'Tarix'],
  ['Department of English Studies', 'Ingliz tili'],
  ['Department of Finance', 'Moliya'],
  ['Department of Business Ma’muriyat', 'Biznes boshqaruvi'],
  ['Department of Mechanical Engineering', 'Mexanika'],
  ['Department of Computer Engineering', 'Kompyuter injiniringi'],

  // mangled program blurbs
  [
    'The Xalqaro stajirovkalar va malaka oshirish program is designed to develop skilled educators capable of designing effective...',
    'Xalqaro stajirovka va malaka oshirish — yetakchi universitetlarda tahsil va amaliyot.',
  ],
  [
    'The Tanlovlar va musobaqalar program prepares aspiring teachers and future school leaders with the skills to...',
    'Tanlovlar va musobaqalar — milliy va xalqaro ishtirokni qo‘llab-quvvatlash.',
  ],
  [
    'The LL.M. in International Law program equips students with advanced knowledge of international legal systems, human rights,...',
    'Xalqaro huquq bo‘yicha chuqurlashtirilgan bilim va amaliyot.',
  ],
  [
    'Explore international laws, treaties, human rights, and global justice. Prepare for careers in diplomacy, international courts, and...',
    'Xalqaro shartnomalar, inson huquqlari va global adolat.',
  ],

  // apply / scholarships deadlines table headers
  ['Apply Deadlines', 'Ariza muddatlari'],
  ['Program Level', 'Dastur darajasi'],
  ['International Students', 'Xalqaro arizalar'],
  ['Academic Information', 'Ta’lim ma’lumotlari'],
  ['Financial Information', 'Moliyaviy ma’lumotlar'],
  ['1. Academic Qualifications', '1. Akademik talablar'],
  [
    'Minimum GPA/grade requirements as set by the university.',
    'Akademik ko‘rsatkichlar — dastur shartlariga muvofiq.',
  ],
  [
    'University-approved English placement test (if applicable)',
    'Til sertifikati (agar kerak bo‘lsa)',
  ],
  ['Research proposal (Master’s/PhD)', 'Tadqiqot loyihasi (magistr/PhD)'],
  ['Offer letter from the university', 'Qabul xati / taklifnoma'],
  ['Financial sponsorship documents', 'Moliyaviy homiylik hujjatlari'],
  [
    'Proof of English proficiency (if required)',
    'Til bilimi tasdiqlovchi hujjat (agar kerak)',
  ],
  [
    'Recommendation letters (for graduate admissions)',
    'Tavsiyanomalar (agar talab qilinsa)',
  ],
  [
    'Statement of Purpose/Personal Essay (selected programs)',
    'Motivatsion xat',
  ],
  [
    'Proof of ability to cover tuition and living costs (for international students)',
    'Xarajatlarni qoplash asoslari (grant doirasida)',
  ],
  ['First Name*', 'Ism*'],
  ['Last Name*', 'Familiya*'],
  ['Your Email*', 'Elektron pochta*'],
  ['Your Phone Number*', 'Telefon*'],
  ['Date of Birth*', 'Tug‘ilgan sana*'],
  ['Gender*', 'Jins*'],
  ['Select Gender', 'Jinsni tanlang'],
  ['Country Name*', 'Mamlakat*'],
  ['Household Income*', 'Oila daromadi*'],
  ['Household Income', 'Oila daromadi'],

  // blog titles
  [
    'Smarter Thinking for Smarter Business Solutions The is ipsum dolor sit amet consectetur adipiscing elit. Fusce eleifend porta arcu the In hac habitasse the is platea augue thelorem turpoi dictumst....',
    'Fond yangiliklari va e’lonlari.',
  ],
  ['International Students Start Your Study Journey Here', 'Xalqaro o‘qish imkoniyatlari'],
  ['Future-Ready Learning University Innovations', 'Zamonaviy ta’lim innovatsiyalari'],
  ['Exploring the Future of Education in the Digital Age', 'Raqamli davrda ta’lim kelajagi'],
  ['The Power of Online Learning Flexibility Meets Opportunity', 'Onlayn ta’lim imkoniyatlari'],
  ['Innovative Research and Breakthroughs: Students', 'Innovatsion tadqiqotlar'],
  ['He Complete Guide Campus Opportunities Growth', 'Kampus imkoniyatlari bo‘yicha qo‘llanma'],
  ['>Search<', '>Qidirish<'],

  // tuition / hisobotlar
  ['Ta’lim va grantlar — 48% Tuition', 'Ta’lim va grantlar — 48%'],
  ['Graduate Tuition', 'Magistratura xarajatlari'],
  ['Doctoral (PhD) Tuition', 'Doktorantura xarajatlari'],
  ['International Students Tuition', 'Xalqaro arizalar'],
  ['Faculty / School', 'Yo‘nalish'],
  ['>Program<', '>Dastur<'],
  ['Annual Tuition Fee (USD)', 'Yillik summa (USD)'],
  ['Faculty of Computer Science', 'Kompyuter fanlari'],
  ['School of Computing', 'Hisoblash maktabi'],
  ['Institute of Computing', 'Hisoblash instituti'],
  ['Engineering Faculty', 'Muhandislik'],
  ['MBA – Master of Business Ma’muriyat', 'MBA — biznes boshqaruvi'],
  ['Faculty of Business', 'Biznes'],
  ['Research lab access included', 'Tadqiqot laboratoriyasi kiradi'],
  ['MPH – Master of Public Health', 'MPH — jamoat salomatligi'],
  ['Research supervision included', 'Ilmiy rahbarlik kiradi'],
  ['Lab access + research grants available', 'Laboratoriya + tadqiqot grantlari'],
  ['Includes clinical research support', 'Klinik tadqiqot qo‘llab-quvvatlash'],
  ['Fee Category', 'To‘lov turi'],
  ['Amount (USD)', 'Summa (USD)'],
  ['International Student Fee', 'Xalqaro ariza yig‘imi'],
  ['Mandatory for all', 'Barcha uchun majburiy'],
  ['Application Fee', 'Ariza yig‘imi'],
  ['Admission / Enrollment Fee', 'Ro‘yxatga olish yig‘imi'],
  ['Charged during admission', 'Qabul paytida'],
  ['Tuition Deposit', 'Oldindan to‘lov'],
  ['Adjusted with first semester', 'Birinchi semestr bilan hisoblanadi'],
  ['Visa Processing Support Fee', 'Viza yordami yig‘imi'],
  ['Health Insurance Fee', 'Sug‘urta yig‘imi'],
  ['Required for all students', 'Barcha talabalar uchun'],
  ['Student Services Fee', 'Talaba xizmatlari'],
  ['Campus services &amp; activities', 'Kampus xizmatlari va tadbirlar'],
  ['Library &amp; IT Access Fee', 'Kutubxona va IT'],
  ['Library, Wi-Fi, digital access', 'Kutubxona, Wi-Fi, raqamli kirish'],

  // months (optional but visible)
  ['December ', 'Dekabr '],
  ['November ', 'Noyabr '],
  ['October ', 'Oktabr '],
  ['September ', 'Sentabr '],
  ['August ', 'Avgust '],
  ['July ', 'Iyul '],
  ['June ', 'Iyun '],
  ['April ', 'Aprel '],
  ['March ', 'Mart '],
  ['January ', 'Yanvar '],
  ['February ', 'Fevral '],
]

let files = 0
let total = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!a || a === b) continue
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (n) {
    fs.writeFileSync(file, h)
    files++
    total += n
  }
}
console.log('files', files, 'replacements', total)
