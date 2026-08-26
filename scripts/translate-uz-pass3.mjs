import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'

const fixes = [
  // Broken mixes
  ["Join TDYU Yo‘qw", 'TDYU ga qo‘shiling'],
  ['Join TDYU Yo‘qw', 'TDYU ga qo‘shiling'],
  ['Welcome to TDYU Universitet', 'TDYU universitetiga xush kelibsiz'],
  ['Magistratura Dasturlar', 'Magistratura dasturlari'],
  ['Advanced Tadqiqot Labs', 'Ilg‘or tadqiqot laboratoriyalari'],
  ['Xalqaro Public Law', 'Xalqaro ommaviy huquq'],
  ['Barchasini ko‘rish Post', 'Barcha maqolalar'],
  ['Ro‘yxatdan o‘tish for Tadbir', 'Tadbirga ro‘yxatdan o‘tish'],
  ['Tadqiqot skills, and practical laboratory experience', 'Tadqiqot ko‘nikmalari va amaliy laboratoriya tajribasi'],
  ['Tadqiqot Kafedralar', 'Tadqiqot kafedralari'],
  ['Accredited Fakultetlar', 'Akkreditatsiyadan o‘tgan fakultetlar'],
  ['Tadqiqot Highlights', 'Tadqiqot yangiliklari'],
  ['View Full Tadqiqot', 'To‘liq tadqiqotni ko‘rish'],
  ['Tadqiqot Excellence Mukofots', 'Tadqiqot mukammalligi mukofotlari'],
  ['Tadqiqot Excellence Mukofot', 'Tadqiqot mukammalligi mukofoti'],
  ['Young Tadqiqoter Mukofot', 'Yosh tadqiqotchi mukofoti'],
  ['Lifetime Yutuq Mukofot', 'Umrbod yutuq mukofoti'],
  ['View Tafsilotlar', 'Tafsilotlarni ko‘rish'],
  ['Tadqiqot Assistant', 'Tadqiqot assistenti'],
  ["Oops! Yo‘qthing Was Found", 'Afsus! Hech narsa topilmadi'],
  ['Oops! Yo‘qthing Was Found', 'Afsus! Hech narsa topilmadi'],
  ['Ta’lim goes beyond textbooks and classrooms We believe in empowering students', 'Ta’lim darslik va auditoriyadan nariga o‘tadi. Biz talabalarni kuchaytirishga ishonamiz'],
  ['Xalqaro Talabalar', 'Xalqaro talabalar'],
  ['How Does the Universitet Qo‘llab-quvvatlash Talaba Learning?', 'Universitet talaba ta’limini qanday qo‘llab-quvvatlaydi?'],
  ['What Academic Dasturlar Are Mavjud?', 'Qanday akademik dasturlar mavjud?'],
  ['How Can Talabalar Access Academic Advising?', 'Talabalar akademik maslahatga qanday murojaat qiladi?'],
  ['What Talaba Klublar va tashkilotlar Are Offered?', 'Qanday talaba klublari va tashkilotlar mavjud?'],
  ['How Does the Universitet Qo‘llab-quvvatlash Career Development?', 'Universitet karyera rivojini qanday qo‘llab-quvvatlaydi?'],
  ['What Housing Options Are Mavjud?', 'Qanday turar joy imkoniyatlari mavjud?'],
  ['2024 best 10 university Mukofots', '2024-yil eng yaxshi 10 universitet mukofotlari'],
  ['Talaba Tadqiqoters Develop Smart Traffic Management System', 'Talaba tadqiqotchilari aqlli transport boshqaruv tizimini ishlab chiqdi'],
  ['5. Additional Talablar (Program-Specific)', '5. Qo‘shimcha talablar (dasturga xos)'],
  ['Ariza Muddatlar', 'Ariza muddatlari'],
  ['Applications Ochishs', 'Arizalar ochilishi'],
  ['Appellation Muddat', 'Ariza muddati'],
  ['Upcoming Tadbirlar', 'Yaqinlashayotgan tadbirlar'],
  ['Join Our So‘nggi Tadbirlar', 'So‘nggi tadbirlarimizga qo‘shiling'],
  ['View Ko‘proq Tadbirlar', 'Ko‘proq tadbirlarni ko‘rish'],
  ['Arizaing for need-based financial aid*', 'Ehtiyojga asoslangan moliyaviy yordamga ariza*'],
  ['O‘rganish life at our university through images and memories.', 'Rasmlar va xotiralar orqali universitetimiz hayotini o‘rganing.'],
  ['Bitiruv Marosim', 'Bitiruv marosimi'],
  ['Frequently Aloqaed Offices', 'Tez-tez murojaat qilinadigan idoralar'],
  ['Xalqaro Services Office', 'Xalqaro xizmatlar idorasi'],
  ['Universitet Administrative Direktory', 'Universitet ma’muriy katalogi'],
  ['Xalqaro Affairs Office', 'Xalqaro aloqalar idorasi'],
  ['Xalqaro Dasturlar Office', 'Xalqaro dasturlar idorasi'],
  ['Qabul Talablar', 'Qabul talablari'],

  // Remaining English
  ['Comparative Legal Systems', 'Qiyosiy huquqiy tizimlar'],
  ['Corporate Governance', 'Korporativ boshqaruv'],
  ['Operating Systems', 'Operatsion tizimlar'],
  ['Computer Networks', 'Kompyuter tarmoqlari'],
  ['Quality teaching that nurtures every learner.', 'Har bir o‘quvchini rivojlantiradigan sifatli ta’lim.'],
  ['Advanced master’s and doctoral.', 'Ilg‘or magistratura va doktorantura.'],
  ['Academic Advisor', 'Akademik maslahatchi'],
  ['Primary Outcomes', 'Asosiy natijalar'],
  ['Secondary Outcomes', 'Qo‘shimcha natijalar'],
  ['Spring Intake', 'Bahorgi qabul'],
  ['Fall Intake', 'Kuzgi qabul'],
  ['Academic Assistant', 'Akademik assistent'],
  ['Are there scholarships available for students?', 'Talabalar uchun stipendiyalar bormi?'],
  ['Instructional Designer', 'O‘quv dizayneri'],
  ['Select Board', 'Kengashni tanlang'],
  ['Proof of ability to cover tuition and living costs (for international students)', 'O‘qish va yashash xarajatlarini qoplash imkoniyati tasdig‘i (xalqaro talabalar uchun)'],
  ['Adnations Session', 'Qabul sessiyasi'],
  ['Classes Begin', 'Darslar boshlanishi'],
  ['All Intake', 'Barcha qabul muddatlari'],
  ['As Scheduled', 'Jadval bo‘yicha'],
  ['Training Coordinator', 'Trening koordinatori'],
  ['For graduate programs: a bachelor’s degree with required CGPA.', 'Magistratura uchun: zarur CGPA bilan bakalavr diplomi.'],
  ['Proof of English proficiency (if required)', 'Ingliz tili darajasi tasdig‘i (agar talab qilinsa)'],
  ['Recommendation letters (for graduate admissions)', 'Tavsiyanomalar (magistratura qabulida)'],
  ['For graduate programs: a recognized bachelor’s', 'Magistratura uchun: tan olingan bakalavr'],
  ['Personal Information', 'Shaxsiy ma’lumotlar'],
  ['Your Email*', 'Emailingiz*'],
  ['Your Phone Number*', 'Telefon raqamingiz*'],
  ['Select Gender', 'Jinsni tanlang'],
  ['Academic Information', 'Akademik ma’lumotlar'],
  ['Financial Information', 'Moliyaviy ma’lumotlar'],
  ['Household Income', 'Oilaviy daromad'],
  ['Assistant Professor', 'Dotsent'],
  ['Academic Activities', 'Akademik faoliyat'],
  ['TDYU provides transparent, competitive tuition fees and flexible payment options, ensuring high-quality education.', 'TDYU shaffof, raqobatbardosh o‘qish to‘lovlari va moslashuvchan to‘lov imkoniyatlarini taqdim etadi.'],
  ['At TDYU, we offer world-class academic programs, expert faculty guidance, and innovative learning opportunities.', 'TDYUda jahon darajasidagi akademik dasturlar, malakali professorlar rahbarligi va innovatsion o‘qish imkoniyatlari mavjud.'],
  ['Health Sciences', 'Sog‘liqni saqlash fanlari'],
  ['Phone', 'Telefon'],
  ['Email', 'Elektron pochta'],
  ['Program', 'Dastur'],
]

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

// longest first
fixes.sort((a, b) => b[0].length - a[0].length)

let n = 0
for (const file of walk(root)) {
  const raw = fs.readFileSync(file, 'utf8')
  const next = withProtected(raw, (t) => {
    let o = t
    for (const [a, b] of fixes) {
      if (o.includes(a)) o = o.split(a).join(b)
    }
    return o
  })
  if (next !== raw) {
    fs.writeFileSync(file, next)
    n++
  }
}
console.log(`Translate pass3: ${n} files`)
