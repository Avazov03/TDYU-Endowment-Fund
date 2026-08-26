/**
 * Write endowment titles/copy into existing Cyan HTML — text only, no layout changes.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cyan = path.resolve(__dirname, '../public/cyan')

function walkHtml(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walkHtml(p, out)
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

/** Replace plain text; skip if found inside attribute-looking contexts is hard — use long unique phrases */
function applyMap(html, pairs) {
  let n = 0
  for (const [from, to] of pairs) {
    if (!from || from === to) continue
    const parts = html.split(from)
    if (parts.length > 1) {
      n += parts.length - 1
      html = parts.join(to)
    }
  }
  return { html, n }
}

// ——— Global (all pages): nav + brand + footer ———
const globalPairs = [
  // Brand welcome / labels
  ['Welcome to Univet University', 'TDYU Endowment Fund'],
  ['Welcome to Univet', 'TDYU Endowment Fund'],
  ['UNIVERSITY OF UNIVET', 'TDYU ENDOWMENT FUND'],
  ['University of Univet', 'TDYU Endowment Fund'],
  ['Univet University', 'TDYU Endowment Fund'],
  ['About Univet', 'Missiya'],
  ['Join Univet Now', 'TDYU ga qo‘shiling'],
  ['Why Choose Univet', 'Nima uchun TDYU Endowment'],
  ['Experience the Difference at Univet University', 'Bilim — eng yaxshi sarmoya'],
  ['Experience the Difference at TDYU Endowment Fund', 'Bilim — eng yaxshi sarmoya'],

  // Address / contact
  ['Ta-134/A,  NY 11110, USA', "Saylgoh ko'chasi 35-uy, Yunusobod, Toshkent 100047"],
  ['Ta-134/A, NY 11110, USA', "Saylgoh ko'chasi 35-uy, Yunusobod, Toshkent 100047"],
  ['info@univet.edu', 'info@tdyu-endowment.uz'],
  ['+1 (201) 895-3801', '+998 71 233-66-36'],

  // Top / main nav labels (exact menu-item text)
  ['Tuition &amp; Fee', 'Hisobotlar'],
  ['Tuition & Fee', 'Hisobotlar'],
  ['How to Apply', 'Yordam'],
  ['Requirements', 'Huquqiy asos'],
  ['Admission Requirements', 'Huquqiy asos'],
  ['Bosh sahifa', 'Bosh'],
  ['Home', 'Bosh'],
  ['Mission &amp; Value', 'Missiya'],
  ['Mission & Value', 'Missiya'],
  ['Vice-Chancellor', 'Boshqaruv'],
  ['All Programs', 'Dasturlar'],
  ['Academics', 'Dasturlar'],
  ['Faculty Members One', 'Vasiylik kengashi'],
  ['Faculty Members Two', 'Boshqaruv kengashi'],
  ['Faculty Members 01', 'Vasiylik kengashi'],
  ['Faculty Members 02', 'Boshqaruv kengashi'],
  ['Faculty Members', 'Boshqaruv'],
  ['Fond organlari', 'Vasiylik kengashi'],
  ['Cost &amp; Financial Aid', 'Shaffoflik'],
  ['Cost & Financial Aid', 'Shaffoflik'],
  ['Scholarships', 'Grantlar'],
  ['Apply Now', 'Xayriya'],
  ['Research Details', 'Loyiha tafsilotlari'],
  ['Alumni Details', 'Alumni tafsilotlari'],
  ['Alumni Network', 'Alumni tarmog‘i'],
  ['Our Campus', 'Manzil'],
  ['Useful Links', 'Foydali havolalar'],
  ['Newsletter', 'Axborotnoma'],
  ['Privacy Policy', 'Maxfiylik siyosati'],
  ['I agree to the', 'Men roziman:'],
  ['Designed By RSTheme', 'TDYU Endowment Fund'],
  ['© 2026 Univet.', '© 2026 TDYU.'],
  ['© 2026 TDYU. Designed By TDYU Endowment Fund.', '© 2026 TDYU Endowment Fund.'],

  // Common CTAs
  ['Discover Our Programs', 'Dasturlarni ko‘rish'],
  ['Dicover Our Programs', 'Dasturlarni ko‘rish'],
  ['Read More', 'Batafsil'],
  ['Admission Open', 'Xayriya ochiq'],
  ['Admissions Open Now', 'Xayriya va qo‘llab-quvvatlash'],
  ['Application Form', 'Xayriya / aloqa formasi'],
  ['Enroll now to begin your transformative academic journey with us.', 'Fondni qo‘llab-quvvatlang — bilim va grantlarga sarmoya.'],
  ['Join Our Latest Events', 'Fond tadbirlari'],
  ['Read Our Latest News', 'Fond yangiliklari'],
  ['Journey of Our Graduates', 'Alumni muvaffaqiyat tarixlari'],
  ['Univet Professors', 'Boshqaruv va kengash'],
  ['Regular Univet Students', 'Qo‘llab-quvvatlanganlar'],
  ['Regular TDYU Endowment Fund Students', 'Qo‘llab-quvvatlanganlar'],
]

const homePairs = [
  ['Empowering Minds Inspiring Futures', 'Huquqiy ta’limning kelajagiga sarmoya'],
  ['Empowering Minds<br>Inspiring Futures', 'Huquqiy ta’limning kelajagiga sarmoya'],
  ['Notice', 'E’lonlar'],
  ['New digital resources available', 'Yillik hisobot e’lon qilindi'],
  ['National Education Conference', 'II Turk dunyosi yosh akademiklar kongressi'],
  ['Semester Examination Schedule', 'Grant arizalari qabul qilinmoqda'],

  ['Academics &amp; Programs', '7 asosiy dastur'],
  ['Academics & Programs', '7 asosiy dastur'],

  // Program cards → endowment programs (reuse repeated cards)
  ['B.Sc. in CSE', 'Xalqaro stajirovkalar'],
  ['M.Sc. in CSE', 'Stipendiya va grantlar'],
  ['B.Sc. in ME', 'Tanlovlar va musobaqalar'],
  ['Master of Laws (LLM)', 'Ilmiy va ta’limiy loyihalar'],

  ['Founded in 1985, Univet University stands beacon excellence in higher education our mission is to create a community of learners dedicated research innovation.',
    'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU xodimlari va talabalari uchun grant, stipendiya va xalqaro imkoniyatlar.'],
  ['Founded in 1985, TDYU Endowment Fund stands beacon excellence in higher education our mission is to create a community of learners dedicated research innovation.',
    'TDYU Endowment Fund — a’zoligi bo‘lmagan jamoat fondi. Maqsad: TDYU xodimlari va talabalari uchun grant, stipendiya va xalqaro imkoniyatlar.'],

  ['50+ Award Winning', '31 loyiha'],
  ['Achieved 50+ awards for excellence and innovation.', 'Amalga oshirilgan loyihalar va xalqaro tashabbuslar.'],

  ['Affordability', 'Ta’lim va grantlar'],
  ['Univet provides transparent, competitive tuition fees and flexible payment options, ensuring high-quality education.',
    'Mablag‘ning ~48% ta’lim, stipendiya va grantlarga yo‘naltiriladi.'],
  ['TDYU Endowment Fund provides transparent, competitive tuition fees and flexible payment options, ensuring high-quality education.',
    'Mablag‘ning ~48% ta’lim, stipendiya va grantlarga yo‘naltiriladi.'],
  ['At Univet, we offer world-class academic programs, expert faculty guidance, and innovative learning opportunities.',
    'Xalqaro tadbirlar, ilmiy nashrlar va infratuzilma — shaffof hisobotlar bilan.'],
  ['At TDYU Endowment Fund, we offer world-class academic programs, expert faculty guidance, and innovative learning opportunities.',
    'Xalqaro tadbirlar, ilmiy nashrlar va infratuzilma — shaffof hisobotlar bilan.'],
  ['Inspiring Student Life', 'Alumni tarmog‘i'],

  ['Academic Excellence &amp; Intellectual Development..', 'Philip C. Jessup Moot Court'],
  ['Academic Excellence & Intellectual Development..', 'Philip C. Jessup Moot Court'],
  ['Innovative Research &amp; Scientific Advancement..', 'Westminster Teaching & Learning'],
  ['Innovative Research & Scientific Advancement..', 'Westminster Teaching & Learning'],
  ['Digital Transformation, Technology &amp; Future..', 'TSUL SHOP infratuzilmasi'],
  ['Digital Transformation, Technology & Future..', 'TSUL SHOP infratuzilmasi'],
  ['Future-Ready Skills & Workforce Transformation..', 'Xorijiy stajirovka dasturlari'],

  ['Tuition Fee Univet', 'Mablag‘ qayerga ketadi'],
  ['Tuition Fee TDYU Endowment Fund', 'Mablag‘ qayerga ketadi'],
  ['Univet offers transparent, affordable tuition fees with flexible payment plans, ensuring quality education is accessible to all aspiring students.',
    'Ta’lim 48% · Tadbirlar 22% · Nashrlar 16% · Infratuzilma 9% · Boshqaruv 5%.'],
  ['TDYU Endowment Fund offers transparent, affordable tuition fees with flexible payment plans, ensuring quality education is accessible to all aspiring students.',
    'Ta’lim 48% · Tadbirlar 22% · Nashrlar 16% · Infratuzilma 9% · Boshqaruv 5%.'],

  ['Undergraduate', 'Ta’lim va grantlar — 48%'],
  ['Collage of arts and Sciences', 'Xalqaro tadbirlar — 22%'],
  ['College of arts and Sciences', 'Xalqaro tadbirlar — 22%'],
  ['School of Business', 'Ilmiy nashrlar — 16%'],

  ['Univet Scholars Making Remarkable Research', 'II Turk dunyosi yosh akademiklar kongressi'],
  ['TDYU Endowment Fund Scholars Making Remarkable Research', 'II Turk dunyosi yosh akademiklar kongressi'],
  ['Advancing Knowledge Through Student Research', 'Koreya iqtisodiy huquqi darsligi nashr etildi'],
  ['The Future of Science and Technology on Campus', '42 o‘qituvchi Westminster dasturini yakunladi'],

  ['Top-ranked programs designed for tomorrow’s leaders', 'Fond ustunlari: ta’lim, hamkorlik, tanlov, nashr, brend, tadbirkorlik'],
  ['Discover Campus Life', 'Alumni xarita'],
]

const aboutPairs = [
  ['About Univet University', 'TDYU Endowment Fund missiyasi'],
  ['About TDYU Endowment Fund University', 'TDYU Endowment Fund missiyasi'],
  ['Univet Inside', 'Fond ichida'],
  ['Our Vision', '6 ustun (pillar)'],
  ['Student Life', 'Xalqaro imkoniyatlar'],
  ['Our Campus Tour', 'Faoliyat yo‘nalishlari'],
  ['Student Feedback', 'Alumni hikoyalari'],
]

const programsPairs = [
  ['All Programs', '7 dastur'],
  ['Filter By Reset', 'Dasturlar'],
  ['Faculties', 'Yo‘nalishlar'],
  ['Departments', 'Toifalar'],
  ['Program Level', 'Dastur turi'],
  ['B.Ed. in Curriculum &amp; Instruction', 'Xalqaro stajirovkalar va malaka oshirish'],
  ['B.Ed. in Curriculum & Instruction', 'Xalqaro stajirovkalar va malaka oshirish'],
  ['M.Ed. in Educational Leadership', 'Stipendiya va grantlar'],
  ['B.Ed. in Educational Leadership', 'Tanlovlar va musobaqalar'],
  ['LLB in Criminal Justice', 'Ilmiy va ta’limiy loyihalar'],
  ['LLM in International Law', 'Xalqaro tadbirlar va mehmonlar'],
  ['LLB in International Law', 'Infratuzilma va TSUL brendi'],
  ['M.Sc. in Software Engineering', 'Nashrlar va tarjimalar'],
  ['B.Sc. in Software Engineering', 'Stipendiya va grantlar'],
]

const researchPairs = [
  ['Research Highlights', 'Amalga oshirilgan loyihalar'],
  ['Integrative Research in Applied Science and Engineering Innovation', 'Philip C. Jessup Moot Court'],
  ['Transformative Applied Science and Engineering Research Projects', 'Koreya iqtisodiy huquqi darsligi'],
  ['Research Innovation, Academic Inquiry &amp; Global Impact', 'II Turk dunyosi yosh akademiklar kongressi'],
  ['Research Innovation, Academic Inquiry & Global Impact', 'II Turk dunyosi yosh akademiklar kongressi'],
  ['Research Focus Areas', 'Loyiha yo‘nalishlari'],
  ['1. Science &amp; Technology', '1. Xalqaro tanlovlar'],
  ['1. Science & Technology', '1. Xalqaro tanlovlar'],
  ['2. Health &amp; Medicine', '2. Ta’lim dasturlari'],
  ['2. Health & Medicine', '2. Ta’lim dasturlari'],
  ['3. Engineering &amp; Innovation', '3. Infratuzilma'],
  ['3. Engineering & Innovation', '3. Infratuzilma'],
  ['4. Business &amp; Economics', '4. Amaliyot va stajirovka'],
  ['4. Business & Economics', '4. Amaliyot va stajirovka'],
  ['Biomedical Research', 'Westminster Teaching & Learning'],
  ['Clinical Trials', 'TSUL SHOP'],
  ['Public Health Research', 'Xorijiy stajirovka dasturlari'],
]

const govPairs = [
  ['Message from Vice Chancellor', 'Boshqaruv organlari'],
  ['Message from Vice-Chancellor', 'Boshqaruv organlari'],
  ['Jackson David', 'N. Salayev — Boshqaruv kengashi raisi'],
  ['Life at Our University', 'Vasiylik · Boshqaruv · Taftish'],
]

const tuitionPairs = [
  ['How Much Will It Cost You?', 'Mablag‘ qayerga ketadi?'],
  ['Annual Tuition Fees 2025–2026', '2024–2025 mablag‘ taqsimoti'],
  ['Annual Tuition Fees 2025-2026', '2024–2025 mablag‘ taqsimoti'],
]

const scholarshipPairs = [
  ['Scholarships', 'Grantlar'],
  ['Scholarship', 'Grant'],
]

const alumniPairs = [
  ['Alumni', 'Alumni'],
  ['Our Alumni', 'Dunyo bo‘ylab bitiruvchilar'],
]

const applyPairs = [
  ['Apply Now', 'Yordam va xayriya'],
  ['Start Your Application', 'Xayriya kalkulyatori / ariza'],
]

const blogPairs = [
  ['Blog', 'Yangiliklar'],
  ['Latest News', 'Fond tadbirlari va e’lonlar'],
]

const contactPairs = [
  ['Contact', 'Aloqa'],
  ['Get In Touch', 'Biz bilan bog‘laning'],
  ['Contact Us', 'Aloqa'],
]

const pageMaps = [
  ['index.html', homePairs],
  ['about-us/index.html', aboutPairs],
  ['mission-value/index.html', aboutPairs],
  ['all-programs/index.html', programsPairs],
  ['research/index.html', researchPairs],
  ['researches/index.html', researchPairs],
  ['vice-chancellor/index.html', govPairs],
  ['faculty-members/index.html', govPairs],
  ['tuition-fee/index.html', tuitionPairs],
  ['cost-financial-aid/index.html', tuitionPairs],
  ['scholarships/index.html', scholarshipPairs],
  ['alumni/index.html', alumniPairs],
  ['all-alumni/index.html', alumniPairs],
  ['apply-now/index.html', applyPairs],
  ['blog/index.html', blogPairs],
  ['contact/index.html', contactPairs],
  ['faq/index.html', [['Faq', 'Yordam (FAQ)'], ['FAQ', 'Yordam (FAQ)']]],
]

// Story / people name swaps on home (testimonials → endowment stories)
const peoplePairs = [
  ['Alen Walker', 'Aziz Karimov'],
  ['Daniel Carter', 'Nilufar Rashidova'],
  ['Jack Turner', 'Zulfiya Ergasheva'],
  ['Abdur Rashid', 'Aziz Karimov'],
  ['Brish Jhonson', 'Nilufar Rashidova'],
  ['Marry Jaen', 'Zulfiya Ergasheva'],
  ['Henry Allen', 'TDYU Alumni'],
  ['Kathryn Murphy', 'Vasiylik kengashi'],
  ['Savannah Nguyen', 'Boshqaruv kengashi'],
  ['Brooklyn Simmons', 'Taftish komissiyasi'],
  ['Darlene Robertson', 'Vasiylik a’zosi'],
  ['Cameron Williamson', 'Boshqaruv a’zosi'],
  ['Leslie Alexander', 'Taftish a’zosi'],
  ['Howard Esther', 'TDYU Endowment'],
]

let total = 0
const files = walkHtml(cyan)

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8')
  const before = html
  let count = 0

  ;({ html, n: count } = applyMap(html, globalPairs))
  let sub = 0
  ;({ html, n: sub } = applyMap(html, peoplePairs))
  count += sub

  const rel = path.relative(cyan, file).replaceAll('\\', '/')
  for (const [page, pairs] of pageMaps) {
    if (rel === page || rel.endsWith('/' + page)) {
      let n2 = 0
      ;({ html, n: n2 } = applyMap(html, pairs))
      count += n2
    }
  }

  // Page titles
  if (html.includes('<title>') && html.includes('Univet')) {
    html = html.replace(/<title>[^<]*Univet[^<]*<\/title>/gi, '<title>TDYU Endowment Fund</title>')
  }

  if (html !== before) {
    fs.writeFileSync(file, html)
    total += count
    if (count > 0) console.log(rel, count)
  }
}

console.log('Done. Replacements:', total)
