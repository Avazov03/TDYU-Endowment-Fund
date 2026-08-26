/**
 * Safe exact-string patch for Sahifalar keep pages:
 * Alumni, Loyihalar (research), Grantlar (scholarships), Tadbirlar (events).
 * Never regex across HTML / never [\s\S] eaters.
 */
import fs from 'node:fs'
import path from 'node:path'

function patch(file, pairs, title) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  const missing = []
  for (const [from, to] of pairs) {
    if (!from || from === to) continue
    if (!h.includes(from)) {
      missing.push(from.slice(0, 72))
      continue
    }
    const c = h.split(from).length - 1
    h = h.split(from).join(to)
    n += c
  }
  if (title) h = h.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  if (!h.includes('tdyu-page-polish.css')) {
    h = h.replace('</head>', '<link rel="stylesheet" href="/tdyu-page-polish.css" />\n</head>')
  }
  if (!h.includes('tdyu-hide-preloader') && h.includes('site-preloader')) {
    h = h.replace(
      '</head>',
      `<style id="tdyu-hide-preloader">#site-preloader{display:none!important;}</style>\n</head>`,
    )
  }
  fs.writeFileSync(file, h)
  console.log(path.basename(path.dirname(file)), 'ok', n, 'miss', missing.length)
  missing.slice(0, 10).forEach((m) => console.log('  miss:', m))
}

const common = [
  [
    'Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions.',
    'TDYU Endowment Fund — bitiruvchilar, grantlar va xalqaro loyihalar orqali bilimga sarmoya kiritadi.',
  ],
  ['Search', 'Qidirish'],
  ['Categories', 'Bo‘limlar'],
  ['Recent Posts', 'So‘nggi yangiliklar'],
]

// ——— ALUMNI ———
patch(
  'public/cyan/alumni/index.html',
  [
    ...common,
    ['Alumni &#8211; TDYU Endowment Fund', 'Alumni — TDYU Endowment Fund'],
    ['Esther Howard', 'Aziz Karimov'],
    ['Jerome Bell', 'Nilufar Rashidova'],
    ['Arlene McCoy', 'Zulfiya Ergasheva'],
    ['David Thomas', 'TDYU Alumni'],
    ['Margaret Johnson', 'TDYU bitiruvchisi'],
    [
      'Develops effective learning materials and systems.',
      'Senior Associate, Clifford Chance · London. TDYU xalqaro huquq poydevori.',
    ],
    [
      'Organizes professional and academic training programs.',
      'Legal Counsel, UN Office · Jeneva. Fond stipendiyasi bilan tahsil oldi.',
    ],
    [
      'Conducts research on teaching and learning practices.',
      'Professor, Heidelberg Universiteti · Germaniya.',
    ],
    [
      'A passionate software engineer creating innovative digital solutions and developing.',
      'Davlat xizmati va yuridik amaliyotdagi bitiruvchilar tarmog‘i.',
    ],
    [
      'Drives research projects that contribute to scientific progress, healthcare improvement.',
      'Xalqaro stajirovka va akademik martaba yo‘lidagi bitiruvchilar.',
    ],
  ],
  'Alumni — TDYU Endowment Fund',
)

// ——— LOYIHALAR (research) ———
patch(
  'public/cyan/research/index.html',
  [
    ...common,
    ['Research &#8211; TDYU Endowment Fund', 'Loyihalar — TDYU Endowment Fund'],
    ['By 4 Researchers', '2024–2025'],
    [
      'Minimum GPA/grade requirements as set by the university.',
      'Loyiha fond maqsadlariga mos, oshkora va hisobotli bo‘lishi shart.',
    ],
    [
      'TDYU, student life goes beyond academics offering vibrant activities cultural events clubs and opportunities that personal.',
      'Fond qo‘llab-quvvatlagan loyihalar: tanlovlar, nashrlar, kongresslar, stajirovkalar va infratuzilma.',
    ],
  ],
  'Loyihalar — TDYU Endowment Fund',
)

// ——— GRANTLAR ———
patch(
  'public/cyan/scholarships/index.html',
  [
    ...common,
    ['Grant Opportunities at TDYU Endowment Fund', 'Grant va stipendiya dasturlari'],
    [
      'Our university is committed to advancing knowledge through innovative, interdisciplinary, and impactful research.',
      'Fond iqtidorli talaba, xodim va tadqiqotchilar uchun ochiq grant dasturlarini moliyalashtiradi.',
    ],
    ['Explore Our Grant Types', 'Grant turlari'],
    ['Merit-Based Grantlar ', 'Xalqaro ta’lim granti '],
    ['Innovation Grantlar ', 'Tanlov stipendiyasi '],
    ['Specialized Grantlar ', 'Ilmiy nashr granti '],
    ['Program-Specific Grantlar ', 'Stipendiya dasturi '],
    ['Student Activity Fee (per year$400-$500)', 'Yiliga ochiq · ariza: mart–may'],
    ['Grant Huquqiy asos', 'Ariza shartlari'],
    ['Apply Deadlines', 'Ariza muddatlari'],
    ['Frequently Asked Questions', 'Ko‘p so‘raladigan savollar'],
    ['Grant Apply Form', 'Grant ariza formasi'],
    ['Personal Information', 'Shaxsiy ma’lumotlar'],
    ['Academic Information', 'Ta’lim ma’lumotlari'],
    ['Financial Information', 'Moliyaviy ma’lumotlar'],
    ['Additional and Submission', 'Qo‘shimcha va yuborish'],
    ['International Students', 'Xalqaro arizalar'],
    ['All Intake', 'Yil davomida'],
    ['6 Month Before', '6 oy oldin'],
    ['Required Documents', 'Kerakli hujjatlar'],
    ['Deadline', 'Muddat'],
    [
      'University-approved English placement test (if applicable)',
      'Til sertifikati yoki dastur talabiga mos hujjat (agar kerak bo‘lsa)',
    ],
    [
      'Proof of ability to cover tuition and living costs (for international students)',
      'Dastur va safar xarajatlarini qoplash asoslari (grant doirasida)',
    ],
    [
      'Minimum GPA/grade requirements as set by the university.',
      'Akademik ko‘rsatkichlar va motivatsion xat — dastur shartlariga muvofiq.',
    ],
    [
      'Are there scholarships available for students?',
      'Talabalar uchun grantlar bormi?',
    ],
    [
      'How do I apply for university admission?',
      'Grantga qanday ariza topshiriladi?',
    ],
    [
      'What is the average university class size?',
      'Yiliga nechta grant ajratiladi?',
    ],
    [
      'How can I participate in campus activities?',
      'Kimlar ariza topshira oladi?',
    ],
    [
      'How can I contact the admission office?',
      'Aloqa uchun qayerga murojaat qilaman?',
    ],
    // demo degree names → endowment program labels where they appear as cards
    ['LLM in International Law', 'Xalqaro stajirovka'],
    ['LLB in International Law', 'Stipendiya va grant'],
    ['B.Sc. in Data Science', 'Tanlov va musobaqa'],
    ['Bachelor of Public Health', 'Ilmiy loyiha'],
    ['B.Sc. in Nursing', 'Xalqaro tadbir'],
    ['Master of Public Health', 'Infratuzilma'],
    ['BSS in Political Science', 'Nashr va tarjima'],
    ['BSS in Sociology', 'Alumni qo‘llab-quvvatlash'],
    ['B.Sc. in Physics', 'Malaka oshirish'],
    ['M.Sc. in Mathematics', 'Xorijiy delegatsiya'],
    ['B.Sc. in Mathematics', 'Protokol xizmati'],
    ['BA in Tarix', 'TSUL brendi'],
  ],
  'Grantlar — TDYU Endowment Fund',
)

// ——— TADBIRLAR ———
patch(
  'public/cyan/events/index.html',
  [
    ...common,
    ['Events &#8211; TDYU Endowment Fund', 'Tadbirlar — TDYU Endowment Fund'],
    [
      'Academic Excellence &amp; Intellectual Development Summit 2025',
      'II Turk dunyosi yosh akademiklar kongressi',
    ],
    [
      'Innovative Research &amp; Scientific Advancement Conference',
      'Philip C. Jessup Moot Court — tayyorgarlik',
    ],
    [
      'Digital Transformation, Technology &amp; Future Innovation Symposium',
      'Westminster Teaching &amp; Learning yakunlash',
    ],
    [
      'Future-Ready Skills &amp; Workforce Transformation Summit',
      'Xorijiy stajirovka dasturlari taqdimoti',
    ],
    [
      'Transformational Leadership &amp; Holistic Student Development Forum',
      'Koreya iqtisodiy huquqi darsligi taqdimoti',
    ],
    [
      'Entrepreneurial Vision, Business Innovation &amp; Startup Summit',
      'TSUL SHOP ochilish tadbiri',
    ],
    [
      'Education, Global Learning &amp; Cultural Exchange Conference',
      'Xalqaro hamkorlik forumi',
    ],
    [
      'Academic , Recognition &amp; Student Achievement Ceremony',
      'Grant va stipendiya topshirish marosimi',
    ],
    [
      'Community Engagement &amp; Social Impact Excellence Summit',
      'Alumni Association uchrashuvi',
    ],
  ],
  'Tadbirlar — TDYU Endowment Fund',
)

// Light Uzbek labels for red demo pages (keep ⚠ via existing mark CSS / text)
patch(
  'public/cyan/libraries/index.html',
  [
    ...common,
    ['Welcome to the TDYU Endowment Fund Kutubxonalar', 'TSUL brendi: xorijiy kutubxonalar (reja)'],
    ['University Kutubxonalar', 'Xorijiy kutubxonalar'],
    ['Academic Library', 'Huquqiy kutubxona'],
    ['Library Collections', 'Fond to‘plamlari'],
    [
      'We actively support research at every level from undergraduate exploration inquiry.',
      'Ustav bo‘yicha: “O‘zbek huquqi markazlari” va kutubxonalarni xorijda tashkil etish.',
    ],
    [
      'Alumni Success Stories From Campus to Global Impact',
      'Kampusdan global ta’sirgacha — alumni hikoyalari',
    ],
  ],
  'Kutubxonalar — TDYU Endowment Fund',
)

patch(
  'public/cyan/faq/index.html',
  [
    ...common,
    ['Yordam (Yordam (FAQ))', 'Savol-javob'],
    ['What Is Campus Life Like?', 'Fond nima qiladi?'],
    ['How Do I Apply?', 'Grantga qanday ariza beriladi?'],
    ['How can I donate?', 'Qanday xayriya qilinadi?'],
    ['Where is the campus located?', 'Fond manzili qayerda?'],
  ],
  'Savol-javob — TDYU Endowment Fund',
)

patch(
  'public/cyan/gallery/index.html',
  [
    ...common,
    ['Life at Our University', 'Fond tadbirlari galereyasi'],
    [
      'Explore life at our university through images and memories.',
      'Kongress, grant marosimlari va xalqaro tadbirlardan suratlar.',
    ],
  ],
  'Galereya — TDYU Endowment Fund',
)

console.log('done')
