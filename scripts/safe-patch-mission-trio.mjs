/**
 * Safe text-only patch for Missiya / 6 ustun / Boshqaruv.
 * ONLY exact string replaces — never regex across HTML.
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
      missing.push(from.slice(0, 70))
      continue
    }
    const c = h.split(from).length - 1
    h = h.split(from).join(to)
    n += c
  }
  if (title) h = h.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  // ensure polish css
  if (!h.includes('tdyu-page-polish.css')) {
    h = h.replace('</head>', '<link rel="stylesheet" href="/tdyu-page-polish.css" />\n</head>')
  }
  if (!h.includes('tdyu-menu-mark.css')) {
    h = h.replace('</head>', '<link rel="stylesheet" href="/tdyu-menu-mark.css" />\n</head>')
  }
  fs.writeFileSync(file, h)
  console.log(path.basename(path.dirname(file)) || file, 'ok', n, 'missing', missing.length)
  if (missing.length) missing.slice(0, 8).forEach((m) => console.log('  miss:', m))
}

const common = [
  ['Univet University', 'TDYU Endowment Fund'],
  ['Univet', 'TDYU'],
  ['info@univet.dom', 'info@tdyu-endowment.uz'],
  ['info@univet.edu', 'info@tdyu-endowment.uz'],
  ['+81112522552', '+998 71 233-66-36'],
  ['+1 (201) 895-3801', '+998 71 233-66-36'],
  ['Ta-134/A, NY 11110, USA', "Saylgoh ko'chasi 35-uy, Yunusobod, Toshkent 100047"],
  ['Ta-134/A,  NY 11110, USA', "Saylgoh ko'chasi 35-uy, Yunusobod, Toshkent 100047"],
  ['Our Campus', 'Manzil'],
  ['Useful Links', 'Foydali havolalar'],
  ['Newsletter', 'Axborotnoma'],
  ['Alumni Network', 'Alumni'],
  ['TDYU Library', 'TDYU kutubxonasi'],
  ['Faculty Areas', 'Fakultetlar'],
  ['Graduate Programs', 'Dasturlar'],
  ['Campus Events', 'Tadbirlar'],
  ['How to Apply', 'Yordam'],
  ['Bosh sahifa', 'Bosh'],
  ['Privacy Policy', 'Maxfiylik siyosati'],
  ['I agree to the', 'Men roziman:'],
  ['Follow Us:', 'Bizni kuzating:'],
  ['Search Keyword...', 'Qidirish...'],
  ['Your email address', 'Elektron pochta'],
]

// ABOUT-US / Missiya
patch(
  'public/cyan/about-us/index.html',
  [
    ...common,
    ['About Univet University', 'Bilim — eng yaxshi sarmoya'],
    ['About TDYU Endowment Fund University', 'Bilim — eng yaxshi sarmoya'],
    ['About TDYU Endowment Fund', 'Bilim — eng yaxshi sarmoya'],
    ['About Univet', 'Missiya'],
    ['Univet Inside', 'Fond haqida'],
    ['TDYU Inside', 'Fond haqida'],
    ['Our Vision', 'Asosiy yo‘nalishlar'],
    ['Our Campus Tour', 'TSUL brendi va tadbirkorlik'],
    ['Student Feedback', 'Bizning tamoyillarimiz'],
    ['Who We Are', 'Fond nima uchun mavjud'],
    ['Mission &amp; Value', '6 ustun'],
    ['Mission & Value', '6 ustun'],
    ['Vice-Chancellor', 'Boshqaruv'],
    ['Kathryn Murphy', 'TDYU Endowment Fund'],
    ['Abdur Rashid', 'Aziz Karimov'],
    ['Brish Jhonson', 'Nilufar Rashidova'],
    ['Henry Allen', 'Zulfiya Ergasheva'],
    ['Alen Walker', 'TDYU Alumni'],
    ['Founder &amp; CEO', 'Alumni'],
    ['Founder & CEO', 'Alumni'],
    // card titles — use heading wrappers when possible to avoid menu clashes
    ['>Affordability</h4>', '>Xalqaro ta’lim</h4>'],
    ['>Academics</h4>', '>Xalqaro hamkorlik</h4>'],
    ['>Student Life</h4>', '>Tanlov va nashrlar</h4>'],
    ['AffordabilityUnivet provides', 'Xalqaro ta’limTDYU provides'],
    ['AffordabilityTDYU provides', 'Xalqaro ta’limTDYU provides'],
    ['Academics At Univet', 'Xalqaro hamkorlik At TDYU'],
    ['Academics At TDYU', 'Xalqaro hamkorlik At TDYU'],
    ['Student Life Univet,', 'Tanlov va nashrlar TDYU,'],
    ['Student Life TDYU,', 'Tanlov va nashrlar TDYU,'],
    [
      'At Univet, education goes beyond textbooks and classrooms We believe in empowering students to explore their passions challenge conventions and discover their potential through meaningful experiences Our distinguished faculty members are leaders their respective fields dedicated to delivering world-class education that integrates theory with practical support application',
      'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU xodimlari va talabalari uchun xalqaro malaka oshirish, grant va stipendiya, universitet nufuzini oshirish',
    ],
    [
      'At TDYU, education goes beyond textbooks and classrooms We believe in empowering students to explore their passions challenge conventions and discover their potential through meaningful experiences Our distinguished faculty members are leaders their respective fields dedicated to delivering world-class education that integrates theory with practical support application',
      'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU xodimlari va talabalari uchun xalqaro malaka oshirish, grant va stipendiya, universitet nufuzini oshirish',
    ],
    [
      'Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge',
      'Huquqiy ta’limning kelajagiga sarmoya. Bilim, grant va xalqaro imkoniyatlar',
    ],
    [
      '“Our diverse community welcomes students from across the globe fostering cultural exchange and mutual understanding Through international collaborations research initiatives, and innovation hubs we provide opportunities',
      '“Fond faoliyati oshkoralik, kollegiallik, teng huquqlilik va ixtiyoriylik tamoyillariga asoslanadi. Har bir dastur shu mezonlar bilan baholanadi',
    ],
    [
      'Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding Through international collaborations research initiatives, and innovation hubs we provide opportunities',
      'Xalqaro hamkorlik va ilmiy aloqalar orqali TDYU jamoasiga yangi imkoniyatlar ochiladi',
    ],
    [
      'Our vision is to create a world where education empowers every individual to achieve their fullest potential. We strive to be a leading global',
      'Oshkoralik, kollegiallik, o‘zaro hurmat, teng huquqlilik va ixtiyoriylik — faoliyatimiz asosi. Fond yetakchi',
    ],
    [
      'Univet provides transparent, competitive tuition fees and flexible payment.',
      'Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar.',
    ],
    [
      'TDYU provides transparent, competitive tuition fees and flexible payment.',
      'Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar.',
    ],
    [
      'At Univet, we offer world-class academic programs expert faculty guidance',
      'Global ilmiy tashkilotlar va oliy ta’lim muassasalari bilan aloqalar',
    ],
    [
      'At TDYU, we offer world-class academic programs expert faculty guidance',
      'Global ilmiy tashkilotlar va oliy ta’lim muassasalari bilan aloqalar',
    ],
    [
      'Univet, student goes beyond academics offering vibrant activities cultural events.',
      'Milliy va xalqaro tanlovlar, ilmiy nashrlar va tarjimalar.',
    ],
    [
      'TDYU, student goes beyond academics offering vibrant activities cultural events.',
      'Milliy va xalqaro tanlovlar, ilmiy nashrlar va tarjimalar.',
    ],
    [
      '“At Univet University, our students are at the heart of everything IS we Their stories reflect our mission empower Univet University, our students inspire and prepare”',
      '“Oshkoralik va kollegiallik — fondning asosiy tamoyillari. Har bir loyiha shu mezonlar bilan baholanadi.”',
    ],
    [
      '“At TDYU Endowment Fund, our students are at the heart of everything IS we Their stories reflect our mission empower TDYU Endowment Fund, our students inspire and prepare”',
      '“Oshkoralik va kollegiallik — fondning asosiy tamoyillari. Har bir loyiha shu mezonlar bilan baholanadi.”',
    ],
    [
      '“The Computer Science program Univet is world-class We work on real projects not just theory. The labs mentors and research opportunities gave me the”',
      '“Fond stipendiyasi tufayli xalqaro tajriba oldim. Bu mening karyeram uchun muhim burilish bo‘ldi.”',
    ],
    [
      '“The Computer Science program TDYU is world-class We work on real projects not just theory. The labs mentors and research opportunities gave me the”',
      '“Fond stipendiyasi tufayli xalqaro tajriba oldim. Bu mening karyeram uchun muhim burilish bo‘ldi.”',
    ],
  ],
  'Missiya — TDYU Endowment Fund',
)

// MISSION-VALUE / 6 ustun
patch(
  'public/cyan/mission-value/index.html',
  [
    ...common,
    ['Mission &amp; Value', '6 ustun'],
    ['Mission & Value', '6 ustun'],
    ['The Univet Mission', 'Fondning 6 ustuni'],
    ['The TDYU Mission', 'Fondning 6 ustuni'],
    ['>Mission</h4>', '>Xalqaro ta’lim</h4>'],
    ['>Overview</h4>', '>Xalqaro hamkorlik</h4>'],
    ['>Application Now</h4>', '>Tanlov va mukofotlar</h4>'],
    ['>Undergraduate</h4>', '>Ilmiy nashrlar</h4>'],
    ['>Graduate</h4>', '>TSUL brendi</h4>'],
    ['>International Students</h4>', '>Tadbirkorlik</h4>'],
    ['Admission Now', 'Batafsil'],
    ['Application Now', 'Batafsil'],
    [
      'of our students successfully graduate and begin their career development.',
      'ta ustun — ta’lim, hamkorlik, tanlov, nashr, brend va tadbirkorlik.',
    ],
    [
      'Univet is committed to delivering university-based education that blends academic excellence with practical knowledge, and ethical values. Our mission is to empower students with industry-relevant skills, innovative thin',
      'Fond oltita ustun asosida ishlaydi: xalqaro ta’lim, hamkorlik, tanlovlar, ilmiy nashrlar, TSUL brendi va tadbirkorlik. Har bir yo‘nalish yillik dasturlar orqali amalga oshiriladi',
    ],
    [
      'TDYU is committed to delivering university-based education that blends academic excellence with practical knowledge, and ethical values. Our mission is to empower students with industry-relevant skills, innovative thin',
      'Fond oltita ustun asosida ishlaydi: xalqaro ta’lim, hamkorlik, tanlovlar, ilmiy nashrlar, TSUL brendi va tadbirkorlik. Har bir yo‘nalish yillik dasturlar orqali amalga oshiriladi',
    ],
    [
      'Through extensive research industry collaboration and global academic standards ensuring that THE students receive a forward-thinking and career-focused education from undergraduate foundations to advanced graduate and p',
      'Ustunlar shaffof byudjet va hisobotlar bilan moliyalashtiriladi — ta’limdan nashrgacha',
    ],
    [
      'Our university curriculum is designed to deliver a balanced future-focused learning experience that empowers students with both academic knowledge and practical competencies Each program is structured to combine foundati',
      'Maqsad — TDYU jamoasini dunyoning yetakchi maktablari va tashkilotlari bilan bog‘lash',
    ],
    [
      'Conventions and discover their potential through meaningful Our face support experiences Our distinguished faculty members are leaders their and respective fields dedicated to delivering world-class education that integr',
      'Dunyo yetakchi universitetlarida malaka oshirish, grant va stipendiyalar',
    ],
    [
      'Completed secondary education (HSC/A-Level/Equivalent). Minimum GPA/grade requirements as set by the university. For graduate programs: a bachelor’s degree with required CGPA. Value Conventions and discover their potenti',
      'Milliy va xalqaro musobaqalarda ishtirokni qo‘llab-quvvatlash. Ilmiy nashrlar va tarjimalar',
    ],
    [
      'Completed secondary education (HSC/A-Level/Equivalent). Minimum GPA/grade requirements as set by the university. For graduate programs: a bachelor’s degree with required CGPA. Application NowOur program costs are designe',
      'Xorijiy nufuzli jurnallarda maqolalar; “O‘zbek huquqi markazlari” va kutubxonalar',
    ],
    [
      'Begin your academic journey with flexible entry requirements and application.',
      'Dunyo universitetlarida malaka oshirish va stipendiyalar.',
    ],
    [
      'GraduateAdvance your career with streamlined graduate program admissions.',
      'TSUL brendi — xorijda markazlar va kutubxonalar.',
    ],
    [
      'International StudentsJoin a diverse campus community through a simple application and visa guidance.',
      'Tadbirkorlik — o‘quv kurslar, yozgi maktablar va qonuniy faoliyat.',
    ],
    [
      'Education goes beyond textbooks and classrooms. We believe in empowering students to explore their',
      'Huquqiy ta’limning kelajagiga sarmoya. Oltita ustun — fond strategiyasi',
    ],
  ],
  '6 ustun — TDYU Endowment Fund',
)

// VICE-CHANCELLOR / Boshqaruv
patch(
  'public/cyan/vice-chancellor/index.html',
  [
    ...common,
    ['Message from Vice Chancellor', 'Boshqaruv'],
    ['Message from Vice-Chancellor', 'Boshqaruv'],
    ['Vice-Chancellor', 'Boshqaruv'],
    ['Vice Chancellor', 'Boshqaruv kengashi raisi'],
    ['Jackson David', 'N. Salayev'],
    ['Life at Our University', 'Vasiylik · Boshqaruv · Taftish'],
    [
      'Dear students, your journey is not measured only by grades or certificates, but by curiosity, discipline, and courage. Every class you attend, every question you ask, and every failure you face is shaping your character.',
      'Hurmatli hamkorlar, Boshqaruv kengashi fondning joriy faoliyatini boshqaradi: byudjet ijrosi, dasturlar va xalqaro loyihalar. Rais: N. Salayev. Har bir qaror kollegiallik va oshkoralik tamoyiliga asoslanadi.',
    ],
    [
      'Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding Through international collaborations research initiatives, and innovation hubs we provide opportunities',
      'Vasiylik kengashi — oliy organ; Boshqaruv kengashi — joriy ishlar; Taftish komissiyasi — moliyaviy nazorat',
    ],
    [
      'Thank you for visiting our website. Together, we will shape the future of TDYU and contribute to the well-being of mankind.',
      'Saytimizga tashrif buyurganingiz uchun rahmat. Birgalikda huquqiy ta’lim kelajagiga sarmoya qilamiz.',
    ],
    [
      'Education goes beyond textbooks and classrooms. We believe in empowering students to explore',
      'Huquqiy ta’limning kelajagiga sarmoya. Kollegial boshqaruv va shaffoflik',
    ],
    ['Explore life at our university through images and memories.', 'Uchta organ — bir maqsad: shaffof va samarali fond.'],
  ],
  'Boshqaruv — TDYU Endowment Fund',
)

// Menu: mission-value → 6 ustun (exact href-safe)
let menuN = 0
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  const before = h
  h = h.replace(
    /(href="[^"]*mission-value[^"]*")([^>]*>\s*<span class="menu-item-text")(?: style="[^"]*")?>(?:⚠ )?Missiya(<\/span>)/gi,
    '$1$2>6 ustun$3',
  )
  h = h.replace(
    /(href="[^"]*mission-value[^"]*")([^>]*>\s*<span class="menu-item-text")(?: style="[^"]*")?>(?:⚠ )?6 ustun(<\/span>)/gi,
    '$1$2>6 ustun$3',
  )
  // Mission & Value leftovers in menus
  h = h.replace(/menu-item-text">Mission &amp; Value<\/span>/g, 'menu-item-text">6 ustun</span>')
  h = h.replace(/menu-item-text">Mission & Value<\/span>/g, 'menu-item-text">6 ustun</span>')
  if (h !== before) {
    menuN++
    fs.writeFileSync(file, h)
  }
}
console.log('menu files touched', menuN)

// Re-mark red items on these 3 pages only (restored from dist lost marks)
import { createRequire } from 'node:module'
// inline minimal red paint for known junk labels on the three pages
const RED = [
  'Tarix',
  'Ma’muriyat',
  "Ma'muriyat",
  'Xarita',
  'History',
  'Administration',
  'Campus Map',
  'Sahifalar',
  'Research Details',
  'Events Details',
  'Alumni Details',
  'Faq',
  'Gallery',
  'Libraries',
  'Faculty Areas',
  'Fakultetlar',
]
const RED_STYLE = 'color:#dc2626!important;font-weight:700'
for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const f = `public/cyan/${rel}`
  let h = fs.readFileSync(f, 'utf8')
  for (const label of RED) {
    const plain = `menu-item-text">${label}</span>`
    const styled = `menu-item-text" style="${RED_STYLE}">⚠ ${label}</span>`
    if (h.includes(plain)) h = h.split(plain).join(styled)
  }
  fs.writeFileSync(f, h)
}

// Verify no HTML corruption
for (const rel of ['about-us/index.html', 'mission-value/index.html', 'vice-chancellor/index.html']) {
  const h = fs.readFileSync(`public/cyan/${rel}`, 'utf8')
  const bad = ['ochiladiclass', 'asosi.lobal', 'ochiladicontainer', 'bilan.true']
  console.log(
    rel,
    'corrupt?',
    bad.filter((b) => h.includes(b)),
    'elementor',
    h.includes('elementor'),
  )
}
