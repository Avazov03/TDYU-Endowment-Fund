/**
 * Finish adapting remaining top-bar pages + Xayriya + Shaffoflik.
 * Exact string replaces only.
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
      miss.push(a.slice(0, 80))
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
  miss.slice(0, 20).forEach((m) => console.log('  miss', m))
}

const longCost =
  'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds. Each academic program includes tuition fees, registration charges and essential learning resources ensuring students receive high-quality education and comprehensive academic support Costs may vary based on program type, course load, and mode of study (on-campus, hybrid, or online) We aim to provide exceptional value through modern facilities, expert faculty, and industry aligned curriculum making your investment in education both meaningful and future-focused.'

const shortCost =
  'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds. Each academic program includes tuition fees, registration charges and essential learning resources ensuring'

const costUz =
  'Xayriya mablag‘lari shaffof hisobotlar asosida taqsimlanadi. Har bir badal ta’lim, grant, tadbir yoki infratuzilmaga yo‘naltirilishi mumkin.'

const sharedCards = [
  ['Search Keyword...', 'Qidirish...'],
  ['>Ta’lim va grantlar — 48%</', '>Xayriya</'],
  ['>Magistratura</', '>Grant arizasi</'],
  ['>Xalqaro arizalar</', '>Hamkorlik</'],
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
  [longCost, costUz],
  [shortCost, costUz],
  ['Cost Summary', 'Hisobotlar'],
  ['Programs Cost', 'Mablag‘ taqsimoti'],
]

// ——— Hisobotlar tabs ———
patch('public/cyan/tuition-fee/index.html', [
  ['> Ta’lim va grantlar — 48% </', '> Yillik hisobot </'],
  ['>Ta’lim va grantlar — 48%</', '>Yillik hisobot</'],
  ['> Xalqaro dasturlar </', '> Fond ustavi </'],
  ['>Xalqaro dasturlar</', '>Fond ustavi</'],
])

// ——— Yordam leftover card title ———
patch('public/cyan/how-to-apply/index.html', [
  ['>Ta’lim va grantlar — 48%</', '>Xayriya</'],
])

// ——— Huquqiy leftover card ———
patch('public/cyan/admission-requirements/index.html', [
  ['>Ta’lim va grantlar — 48%</', '>Xayriya</'],
])

// ——— Shaffoflik ———
patch(
  'public/cyan/cost-financial-aid/index.html',
  [
    ...sharedCards,
    ['Shaffoflik &#8211; TDYU Endowment Fund', 'Shaffoflik — TDYU Endowment Fund'],
  ],
  'Shaffoflik — TDYU Endowment Fund',
)

// ——— Xayriya ———
patch(
  'public/cyan/apply-now/index.html',
  [
    ...sharedCards.filter(([a]) => a !== '>Magistratura</' && a !== '>Xalqaro arizalar</'),
    ['Xayriya &#8211; TDYU Endowment Fund', 'Xayriya — TDYU Endowment Fund'],
    ['Huquqiy asos and Deadlines', 'Xayriya tartibi'],
    ['TDYU Overview', 'Fondga xayriya'],
    ['Admissions Huquqiy asos', 'Xayriya shartlari'],
    ['1. Akademik talablar', '1. Xayriya maqsadi'],
    ['2. Required Documents', '2. Kerakli ma’lumotlar'],
    ['3. English Language Proficiency', '3. Homiy turi'],
    ['4. Entrance Exam / Interview', '4. Miqdor va davriylik'],
    ['5. Dasturga oid qo‘shimcha shartlar', '5. E’tirof va maxfiylik'],
    ['6. Financial Huquqiy asos', '6. To‘lov usuli'],
    ['7. Visa Huquqiy asos (Xalqaro arizalar)', '7. Hujjatlar (yuridik shaxslar)'],
    ['Ariza muddatlari', 'Muhim sanalar'],
    ['Personal Information', 'Shaxsiy ma’lumotlar'],
    ['Ta’lim ma’lumotlari', 'Homiy / tashkilot'],
    ['Moliyaviy ma’lumotlar', 'Xayriya miqdori'],
    ['Qo‘shimcha va yuborish', 'Izoh va yuborish'],
    ['Yordam kerakmi?', 'Savol bormi?'],
    ['Your Telefon*', 'Telefon*'],
    ['Secondary School*', 'Tashkilot / ish joyi*'],
    ['GPA*', 'Miqdor (so‘m)*'],
    ['Education Board*', 'Homiy turi*'],
    ['Higher Secondary School*', 'Lavozim*'],
    ['GPA / CGPA*', 'Davriylik*'],
    ['Oila daromadi*', 'Valyuta*'],
    ['Ehtiyoj asosidagi yordam*', 'Ochiq e’tirof*'],
    ['Fayl yuklash *', 'Hujjat yuklash (ixtiyoriy)'],
    ['placeholder="First Name"', 'placeholder="Ism"'],
    ['placeholder="Last Name"', 'placeholder="Familiya"'],
    ['placeholder="Email Address"', 'placeholder="Elektron pochta"'],
    ['placeholder="Type your phone number"', 'placeholder="Telefon"'],
    ['placeholder="dd/mm/yy"', 'placeholder="kk/oo/yyyy"'],
    ['placeholder="Country"', 'placeholder="Mamlakat"'],
    ['placeholder="Type your secondary school name"', 'placeholder="Tashkilot nomi"'],
    ['placeholder="Enter your GPA"', 'placeholder="Masalan: 1 000 000"'],
    ['placeholder="Type higher secondary school name"', 'placeholder="Lavozim"'],
    ['placeholder="Enter your GPA / CGPA"', 'placeholder="Bir martalik / oylik"'],
    ['>Male</', '>Erkak</'],
    ['>Female</', '>Ayol</'],
    ['>Other</', '>Boshqa</'],
    ['Select Board', 'Turini tanlang'],
    ['>ACCSC</', '>Jismoniy shaxs</'],
    ['>ACCET</', '>Yuridik shaxs</'],
    ['>DEAC</', '>Alumni</'],
    ['>NWCCU</', '>Xodim</'],
    ['>NECHE</', '>Talaba</'],
    ['>MSCHE</', '>Xorijiy homiy</'],
    ['less than $7k', 'UZS'],
    ['less than $9k', 'USD'],
    ['>Moliyaviy yordam</', '>E’tirof</'],
    ['Adnations Session', 'Davr'],
    ['Applications Opens', 'Boshlanish'],
    ['Appellation Deadline', 'Yakun'],
    ['Classes Begin', 'Hisobot'],
    ['Spring Intake', 'I chorak'],
    ['Fall Intake', 'III chorak'],
    ['Postgraduate', 'Yillik'],
    ['All Intake', 'Doimiy'],
    ['6 Month Before', '6 oy oldin'],
    ['2 Months Before', '2 oy oldin'],
    ['As Scheduled', 'Reja bo‘yicha'],
    ['April1', '1 aprel'],
    ['Dastur darajasi', 'Yo‘nalish'],
    ['O‘rta yoki oliy ma’lumot to‘g‘risida hujjat.', 'Xayriya maqsadini tanlang: grant, tadbir, nashr yoki infratuzilma.'],
    ['Akademik ko‘rsatkichlar — dastur shartlariga muvofiq.', 'Miqdor ixtiyoriy; har qanday badal qabul qilinadi.'],
    [
      'Magistratura/malaka oshirish: tegishli bakalavr diplomi va akademik ko‘rsatkich.',
      'Korporativ homiylik uchun shartnoma asosida kelishiladi.',
    ],
    ['IELTS/TOEFL yoki teng kuchli til sertifikati', 'Jismoniy shaxs, yuridik shaxs, alumni yoki xalqaro homiy'],
    ['Til sertifikati (agar kerak bo‘lsa)', 'Anonim yoki ochiq e’tirof — tanlovingiz'],
    ['Portfolio yoki oldingi loyiha namunalari (agar kerak)', 'Ism fond hisobotida ko‘rsatilishi mumkin (rozilik bilan)'],
    ['Kasbiy yoki texnik baholash (dastur talabiga ko‘ra)', 'Maxfiylik siyosatiga rioya qilinadi'],
    ['Work experience (MBA, Professional Degrees)', 'Muntazam xayriya uchun eslatma so‘rash mumkin'],
    ['Tadqiqot loyihasi (magistr/PhD)', 'Ma’lumotlar faqat fond maqsadlarida ishlatiladi'],
    ['Valid passport', 'Yuridik shaxs: STIR va rekvizitlar'],
    ['Qabul xati / taklifnoma', 'Shartnoma yoki xat (kerak bo‘lsa)'],
    ['Moliyaviy homiylik hujjatlari', 'To‘lov tasdiqlovchi hujjat'],
    ['Medical clearance (if applicable)', 'Aloqa shaxsi ma’lumotlari'],
    ['To‘ldirilgan ariza shakli', 'Ism, aloqa va xayriya maqsadi'],
    ['Diplom va baholar varaqasi', 'Miqdor va davriylik'],
    ['National ID/Passport', 'Pasport yoki STIR (yuridik)'],
    ['Recent passport-sized photographs', 'Izoh / xabar (ixtiyoriy)'],
    ['Til bilimi tasdiqlovchi hujjat (agar kerak)', 'Elektron pochta orqali tasdiq'],
    ['Tavsiyanomalar (agar talab qilinsa)', 'Kerak bo‘lsa qo‘shimcha hujjat'],
    ['Motivatsion xat', 'Hamkorlik taklifi (ixtiyoriy)'],
    [
      'Ba’zi dasturlar tanlov yoki imtihon talab qilishi mumkin',
      'Bir martalik yoki muntazam xayriya — tanlovingiz',
    ],
    [
      'Tanlangan arizachilar suhbatga chaqirilishi mumkin',
      'Katta miqdorlar uchun fond bilan alohida kelishiladi',
    ],
    ['Ariza yig‘imi (agar belgilangan bo‘lsa)', 'Bank o‘tkazmasi yoki kassa'],
    ['Xarajatlarni qoplash asoslari (grant doirasida)', 'To‘lovdan so‘ng tasdiqnoma yuboriladi'],
    ['+81112522552', '+998 71 233-66-36'],
  ],
  'Xayriya — TDYU Endowment Fund',
)
