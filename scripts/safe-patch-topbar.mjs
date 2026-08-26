/**
 * Adapt Hisobotlar / Yordam / Huquqiy asos — exact string replaces only.
 */
import fs from 'node:fs'

function patch(file, pairs, title) {
  if (!fs.existsSync(file)) {
    console.log('MISS', file)
    return
  }
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  const miss = []
  for (const [a, b] of pairs) {
    if (!a || a === b) continue
    if (!h.includes(a)) {
      miss.push(a.slice(0, 70))
      continue
    }
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (!h.includes('tdyu-page-polish.css')) {
    h = h.replace('</head>', '<link rel="stylesheet" href="/tdyu-page-polish.css" />\n</head>')
  }
  if (!h.includes('tdyu-hide-preloader') && h.includes('site-preloader')) {
    h = h.replace(
      '</head>',
      `<style id="tdyu-hide-preloader">#site-preloader{display:none!important;}</style>\n</head>`,
    )
  }
  if (title) {
    h = h.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  }
  fs.writeFileSync(file, h)
  console.log(file, 'n', n, 'miss', miss.length)
  miss.slice(0, 12).forEach((m) => console.log('  miss', m))
}

const shared = [
  ['Search Keyword...', 'Qidirish...'],
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds Each academic program includes tuitions fees registration charges and essential learning resources ensuring students for receive education and comprehensive academic support',
    'Fond mablag‘lari shaffof taqsimlanadi: ta’lim va grantlar, xalqaro tadbirlar, ilmiy nashrlar, infratuzilma va boshqaruv xarajatlari.',
  ],
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds. Each academic program includes tuitions fees registration charges and essential learning resources ensuring students for receive education and comprehensive academic support',
    'Fond mablag‘lari shaffof taqsimlanadi: ta’lim va grantlar, xalqaro tadbirlar, ilmiy nashrlar, infratuzilma va boshqaruv xarajatlari.',
  ],
  [
    'Our program costs are designed to remain transparent, competitive and accessible for students from diverse backgrounds. ',
    'Fond mablag‘lari shaffof va ochiq hisobotlar asosida taqsimlanadi. ',
  ],
  [
    'Our Core Courses provide the essential foundation every student needs to thrive academically and professionally These courses strengthen critical thinking communicat, quantitative reasoning, and digital literacy skills relevant across all disciplines Each academic program includes tuition fees registration charges and essential learning resources ensuring students receive high-quality education and comprehensive academic support',
    'Yillik hisobot, auditorlik xulosasi va ustav — fond faoliyatining asosiy hujjatlari. Mablag‘lar taqsimoti ochiq e’lon qilinadi.',
  ],
  [
    'Begin your academic journey with flexible entry requirements and application.',
    'Xayriya, grant yoki hamkorlik orqali fondni qo‘llab-quvvatlang.',
  ],
  [
    'Advance your career with streamlined graduate program admissions.',
    'Alumni, xodim va talabalar uchun ochiq dasturlar va grantlar.',
  ],
  [
    'Join a diverse campus community through a simple application and visa guidance.',
    'Savol va takliflar uchun info@tdyu-endowment.uz manziliga yozing.',
  ],
]

// ——— Hisobotlar ———
patch(
  'public/cyan/tuition-fee/index.html',
  [
    ...shared,
    ['Hisobotlar &#8211; TDYU Endowment Fund', 'Hisobotlar — TDYU Endowment Fund'],
    ['>Duration</', '>Davr</'],
    ['Annual Hisobotlar (USD)', 'Yo‘nalish / foiz'],
    ['>Remarks</', '>Izoh</'],
    ['>Summa (USD)</', '>Ko‘rsatkich</'],
    ['>Frequency</', '>Davriylik</'],
    ['>Annual</', '>Yillik</'],
    ['>One-time</', '>Bir martalik</'],
    ['>Non-refundable</', '>Qaytarilmaydi</'],
    ['Document processing assistance', 'Hujjatlar va shaffoflik'],
    ['4 Years', 'Doimiy'],
    ['1.5–2 Years', 'Yillik'],
    ['2 Years', 'Yillik'],
    ['3–5 Years', 'Davriy'],
    ['Workshops, seminars included', 'Grant va stipendiya'],
    ['Includes software access', 'Moliyaviy yordam'],
    ['Lab & technology fees included', 'Infratuzilma'],
    ['Additional workshop fees', 'Tadbirlar'],
    ['Clinical training included', 'Amaliyot'],
    ['Weekend & evening classes available', 'Ochiq hisobot'],
    ['High-performance computing access', 'Ilmiy nashr'],
    ['Fieldwork required', 'Loyiha'],
    ['Project-based modules', 'Loyiha moduli'],
    ['Dissertation mentoring included', 'Ilmiy mentorlik'],
    ['BBA – Business Ma’muriyat', 'Ta’lim va grantlar'],
    ['BSc – Accounting & Finance', 'Xalqaro tadbirlar'],
    ['BSc – Computer Science', 'Ilmiy nashrlar'],
    ['BSc – Information Technology', 'Infratuzilma'],
    ['BSc – Electrical Engineering (EEE)', 'Boshqaruv xarajatlari'],
    ['Arts & Humanities', 'Huquqiy nashrlar'],
    ['BA – English', 'Tarjima dasturi'],
    ['Health Sciences', 'Alumni dasturi'],
    ['BSc – Nursing', 'Stipendiya'],
    ['Business School', 'Korporativ homiylik'],
    ['MPA – Public Ma’muriyat', 'Xalqaro hamkorlik'],
    ['Computing & IT', 'Raqamli resurslar'],
    ['MSc – Computer Science', 'IT loyihalar'],
    ['Computer Science & IT', 'Texnik qo‘llab-quvvatlash'],
    ['MSc – Data Science & AI', 'Tadqiqot granti'],
    ['Engineering', 'Infratuzilma loyihalari'],
    ['MEng – Engineering Management', 'Loyiha boshqaruvi'],
    ['Social Sciences', 'Ijtimoiy dasturlar'],
    ['MA – International Relations', 'Xalqaro aloqalar'],
    ['PhD – Science & Engineering', 'Doktorant grantlari'],
    ['PhD – Computer Science', 'Ilmiy stipendiyalar'],
    ['PhD – Health Sciences', 'Malaka oshirish'],
    ['PhD – Social Sciences', 'Tadqiqot qo‘llab-quvvati'],
    ['PhD – Busines', 'Tadbirkorlik dasturi'],
    // dollar amounts → endowment-ish labels (keep table structure)
    ['$12,000', '48%'],
    ['$12,500', '22%'],
    ['$14,500', '16%'],
    ['$13,800', '9%'],
    ['$16,000', '5%'],
    ['$10,500', '—'],
    ['$15,000', '2024'],
    ['$18,000', '2025'],
    ['$16,800', 'UZ/RU/EN'],
    ['$17,500', 'Rasmiy'],
    ['$18,200', 'Audit'],
    ['$16,200', 'Ustav'],
    ['$17,200', 'Taftish'],
    ['$14,800', 'Balans'],
    ['$20,000', 'Hisobot'],
    ['$21,500', 'Xulosa'],
    ['$19,800', 'Yillik'],
    ['$18,500', 'Ochiq'],
    ['$19,000', 'PDF'],
    ['$2,000', 'Grant'],
    ['$75–$100', '—'],
    ['$300', '—'],
    ['$500–$1,000', '—'],
    ['$150', '—'],
    ['$500–$750', '—'],
    ['$200', '—'],
    ['$120', '—'],
  ],
  'Hisobotlar — TDYU Endowment Fund',
)

// ——— Yordam ———
patch(
  'public/cyan/how-to-apply/index.html',
  [
    ...shared,
    ['Yordam &#8211; TDYU Endowment Fund', 'Yordam — TDYU Endowment Fund'],
    ['Get Your Qabul Process', 'Fondga murojaat qilish'],
    [
      'The Get Your Qabul Process begins with preparing all necessary application documents, including academic transcripts, id',
      'Fondni qo‘llab-quvvatlash yoki grant/stipendiya uchun murojaat qilish oddiy bosqichlardan iborat',
    ],
    ['Apply Process', 'Murojaat'],
    ['01. Step University Application Process', '01. Maqsadni tanlang'],
    ['02. Complete the Online Application', '02. Ma’lumotlarni to‘ldiring'],
    ['3. Submit Required Fees &amp; Materials', '03. Hujjat yoki xayriyani yuboring'],
    ['3. Submit Required Fees & Materials', '03. Hujjat yoki xayriyani yuboring'],
    ['4. Receive Qabul Decision', '04. Javobni kuting'],
    [
      'Collect all required materials, including academic transcripts, identification papers, test scores (if needed), and any ',
      'Xayriya, grant arizasi, alumni ro‘yxati yoki hamkorlik taklifidan birini tanlang. ',
    ],
    [
      'Fill out the university’s online application form with accurate personal, academic, and program details. Double-check al',
      'Ism, aloqa va murojaat mazmunini aniq yozing. Kerak bo‘lsa qo‘shimcha izoh qo‘shing.',
    ],
    [
      'Upload all documents, pay the application fee, and submit additional materials such as recommendation letters, essays, o',
      'Kerakli hujjatlarni biriktiring yoki xayriya miqdorini ko‘rsating; so‘ngra yuboring.',
    ],
    [
      'After reviewing your application, the university will notify you via email or portal about acceptance, conditional admis',
      'Fond murojaatingizni ko‘rib chiqadi va email orqali javob beradi.',
    ],
    ['>Magistratura</', '>Grant arizasi</'],
    ['>Xalqaro arizalar</', '>Hamkorlik</'],
  ],
  'Yordam — TDYU Endowment Fund',
)

// ——— Huquqiy asos ———
patch(
  'public/cyan/admission-requirements/index.html',
  [
    ...shared,
    ['Qabul qoidalari &#8211; TDYU Endowment Fund', 'Huquqiy asos — TDYU Endowment Fund'],
    ['Qabul qoidalari – TDYU Endowment Fund', 'Huquqiy asos — TDYU Endowment Fund'],
    ['>Qabul qoidalari</h1>', '>Huquqiy asos</h1>'],
    ['rstb-page-title">Qabul qoidalari</h1>', 'rstb-page-title">Huquqiy asos</h1>'],
    ['>Qabul qoidalari</span>', '>Huquqiy asos</span>'],
    ['Huquqiy asos and Deadlines', 'Huquqiy asos va hujjatlar'],
    ['Admissions Huquqiy asos', 'Fondning huquqiy asosi'],
    ['>Ariza muddatlari</', '>Asosiy hujjatlar</'],
    ['1. Akademik talablar', '1. Konstitutsiya asoslari'],
    ['2. Academic Qualifications', '2. NNO to‘g‘risidagi Qonun'],
    ['3. English Language Proficiency', '3. Jamoat fondlari to‘g‘risidagi Qonun'],
    ['4. Entrance Exam / Interview', '4. Fond ustavi'],
    ['5. Dasturga oid qo‘shimcha shartlar', '5. Boshqaruv tartibi'],
    ['6. Financial Huquqiy asos', '6. Moliyaviy nazorat'],
    ['7. Visa Huquqiy asos (Xalqaro arizalar)', '7. Shaffoflik va hisobotlar'],
    ['Adnations Session', 'Hujjat turi'],
    ['Applications Opens', 'Holat'],
    ['Appellation Deadline', 'Yangilanish'],
    ['Classes Begin', 'Izoh'],
    ['>Spring Intake</', '>Ustav</'],
    ['>Fall Intake</', '>Hisobot</'],
    ['>Postgraduate</', '>Audit</'],
    ['>All Intake</', '>Taftish</'],
    ['6 Month Before', 'Amalda'],
    ['2 Months Before', 'Yillik'],
    ['As Scheduled', 'Reja bo‘yicha'],
    ['>April1</', '>2025</'],
    ['Work experience (MBA, Professional Degrees)', 'Vasiylik kengashi vakolatlari'],
    ['Valid passport', 'Adliya vazirligida ro‘yxat'],
    ['Medical clearance (if applicable)', 'Auditorlik xulosasi'],
    ['National ID/Passport', 'Rasmiy nomlar (4 til)'],
    ['Recent passport-sized photographs', 'Yillik faoliyat hisoboti'],
    ['>Magistratura</', '>Ustav</'],
    ['>Xalqaro arizalar</', '>Qonunlar</'],
  ],
  'Huquqiy asos — TDYU Endowment Fund',
)

console.log('done')
