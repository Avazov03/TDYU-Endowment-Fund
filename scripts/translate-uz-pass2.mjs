import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'

/** Eng uzunidan boshlab — buzilgan va qolgan matnlar */
const fixes = [
  // Broken mixes
  ['Xalqaro Talabalar Boshlash Your Study Journey Here', 'Xalqaro talabalar: o‘qish yo‘lingizni shu yerdan boshlang'],
  ['The Future of Cybersecurity: Talaba Innovatsiyas in Digital Defense', 'Kiberxavfsizlik kelajagi: raqamli himoyada talaba innovatsiyalari'],
  ['Integrative Tadqiqot in Applied Science and Engineering Innovatsiya', 'Amaliy fan va muhandislik innovatsiyasida integrativ tadqiqot'],
  ['Transformative Applied Science and Engineering Tadqiqot Projects', 'Amaliy fan va muhandislikdagi transformatsion tadqiqot loyihalari'],
  ['Innovative Tadqiqot and Breakthroughs: Talabalar', 'Innovatsion tadqiqot va yutuqlar: talabalar'],
  ['Talabalar Boshlash Your Study Journey Here', 'Talabalar: o‘qish yo‘lingizni shu yerdan boshlang'],
  ['Talabalar Boshlash', 'Talabalar boshlashi'],
  ['Talabalar Innovatsiyas', 'talaba innovatsiyalari'],
  ['Innovatsiyas in', 'innovatsiyalari'],
  ['Talabalar Innovatsiyalari', 'talaba innovatsiyalari'],
  ['Haqida Our Universitet', 'Universitetimiz haqida'],
  ['Life at Our Universitet', 'Universitetimizdagi hayot'],
  ['Experience the Difference at TDYU Universitet', 'TDYU universitetidagi farqni his eting'],
  ['Welcome to the TDYU Universitet Kutubxonalar', 'TDYU universitet kutubxonalariga xush kelibsiz'],
  ['Xabar from Vice Chancellor', 'Rektor murojaati'],
  ['Get Your Qabul Process', 'Qabul jarayonini boshlang'],
  ['Program Daraja', 'Dastur darajasi'],
  ['All Bitiruvchilar', 'Barcha bitiruvchilar'],
  ['Our Bitiruvchilar', 'Bizning bitiruvchilar'],
  ['Talabalar and Muddatlar', 'Talabalar va muddatlar'],
  ['Talabalar and', 'Talabalar va'],
  ['and Muddatlar', 'va muddatlar'],
  ['The Power of Onlayn Learning Flexibility Meets Opportunity', 'Onlayn ta’lim kuchi: moslashuvchanlik imkoniyat bilan uchrashadi'],
  ['Building Yetakchilik, Skills and TDYU Dasturlar', 'Yetakchilik, ko‘nikmalar va TDYU dasturlari'],
  ['Learning Maximizing Your Academic Experience', 'Akademik tajribangizni maksimal darajaga yetkazish'],
  ['Emailingiz address will not be published.', 'Email manzilingiz e’lon qilinmaydi.'],
  ['Majburiy fields are marked', 'Majburiy maydonlar belgilangan'],
  ['Saqlash my name, email, and website in this browser for the next time I comment.', 'Keyingi izoh uchun ism, email va saytni brauzerda saqlash.'],
  ['Saqlash my name &amp; email into browser for the next time comment', 'Keyingi izoh uchun ism va emailni brauzerda saqlash'],
  ['Fitness, and a healthy', 'Fitnes va sog‘lom'],
  ['Clubs and Organizations', 'Klublar va tashkilotlar'],
  ['Additional and Submission', 'Qo‘shimcha va topshirish'],
  ['Program-Wise', 'Dastur bo‘yicha'],
  ['Our Professors', 'Bizning professorlar'],
  ['The TDYU Mission', 'TDYU missiyasi'],
  ['A hub for information.', 'Ma’lumot markazi.'],
  ['How Much Will It Cost You?', 'Sizga qancha turadi?'],
  ['of our students successfully graduate and begin their career development.', 'talabalarimiz muvaffaqiyatli bitirib, karyerasini boshlaydi.'],

  // Remaining English sentences
  ['Excellence and global standards.', 'Mukammallik va global standartlar.'],
  ['Strengthening health awareness and responsible healthcare leadership', 'Sog‘liq ongini mustahkamlash va mas’uliyatli sog‘liqni saqlash yetakchiligi'],
  ['Promoting academic learning and professional healthcare practice.', 'Akademik ta’lim va professional tibbiy amaliyotni rivojlantirish.'],
  ['Modern medical practices and sustainable healthcare solutions.', 'Zamonaviy tibbiy amaliyotlar va barqaror sog‘liqni saqlash yechimlari.'],
  ['Business &amp; Economic Excellence Advancement Program', 'Biznes va iqtisodiy mukammallikni rivojlantirish dasturi'],
  ['Business & Economic Excellence Advancement Program', 'Biznes va iqtisodiy mukammallikni rivojlantirish dasturi'],
  ['Minimum GPA/grade requirements as set by the', 'Universitet belgilagan minimal GPA / baho talablari'],
  ['Our Case Studies', 'Bizning amaliy misollar'],
  ['The page you are looking for does not exist or has been moved', 'Siz izlagan sahifa mavjud emas yoki ko‘chirilgan'],
  ['faculty members are leaders their respective fields dedicated to delivering world-class', 'professor-o‘qituvchilar o‘z sohalarida yetakchi bo‘lib, jahon darajasidagi ta’lim berishga bag‘ishlangan'],
  ['Applicants must submit academic transcripts certificates and proof English language', 'Arizachilar akademik transkript, sertifikatlar va ingliz tili darajasi tasdig‘ini topshirishi shart'],
  ['Collage of arts and Sciences', 'San’at va fanlar kolleji'],
  ['Begin your academic journey with flexible entry requirements and application.', 'Moslashuvchan kirish talablari va ariza bilan akademik yo‘lingizni boshlang.'],
  ['Advance your career with streamlined graduate program admissions.', 'Soddalashtirilgan magistratura qabuli bilan karyerangizni rivojlantiring.'],
  ['Selected applicants may be invited for an admission interview', 'Tanlangan arizachilar suhbatga taklif etilishi mumkin'],
  ['We actively support research at every level from undergraduate exploration inquiry.', 'Biz bakalavrdan boshlab har darajadagi tadqiqotlarni faol qo‘llab-quvvatlaymiz.'],
  ['Offer letter from the university', 'Universitetdan taklifnoma'],
  ['Develops effective learning materials and systems.', 'Samarali o‘quv materiallari va tizimlarini ishlab chiqadi.'],
  ['Organizes professional and academic training programs.', 'Kasbiy va akademik malaka oshirish dasturlarini tashkil etadi.'],
  ['Conducts research on teaching and learning practices.', 'O‘qitish va o‘rganish amaliyoti bo‘yicha tadqiqot olib boradi.'],
  ['A passionate software engineer creating innovative digital solutions and developing.', 'Innovatsion raqamli yechimlar yaratuvchi dasturiy injiner.'],
  ['Drives research projects that contribute to scientific progress, healthcare improvement.', 'Ilmiy taraqqiyot va sog‘liqni saqlashni yaxshilashga hissa qo‘shadigan tadqiqotlarni boshqaradi.'],
  ['Develops scalable software systems with expertise in coding problem-solving.', 'Dasturlash va muammoni yechishda tajriba bilan kengaytiriladigan tizimlar yaratadi.'],
  ['Access to this page is forbidden.', 'Ushbu sahifaga kirish taqiqlangan.'],
  ['TDYU provides transparent, competitive tuition fees and flexible payment.', 'TDYU shaffof, raqobatbardosh o‘qish to‘lovlari va moslashuvchan to‘lov imkoniyatini taqdim etadi.'],
  ['Smarter Thinking for Smarter Business Solutions', 'Aqlli biznes yechimlari uchun aqlli fikrlash'],

  // Common leftovers
  ['and', 'va'], // DANGEROUS - too broad! Remove this
]

// Remove dangerous bare 'and'
const safeFixes = fixes.filter(([a]) => a !== 'and')

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) walk(f, files)
    else if (/\.html?$/i.test(e.name)) files.push(f)
  }
  return files
}

function withProtected(html, fn) {
  const blocks = []
  const masked = html.replace(/<(script|style)(\b[^>]*)>[\s\S]*?<\/\1>/gi, (m) => {
    blocks.push(m)
    return `@@B${blocks.length - 1}@@`
  })
  let out = fn(masked)
  return out.replace(/@@B(\d+)@@/g, (_, i) => blocks[Number(i)])
}

let n = 0
for (const file of walk(root)) {
  const raw = fs.readFileSync(file, 'utf8')
  const next = withProtected(raw, (t) => {
    let o = t
    for (const [a, b] of safeFixes) {
      if (o.includes(a)) o = o.split(a).join(b)
    }
    return o
  })
  if (next !== raw) {
    fs.writeFileSync(file, next)
    n++
  }
}
console.log(`Pass2: ${n} files updated`)
