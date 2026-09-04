import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const prisma = new PrismaClient()

const defaults = {
  orgName: 'TDYU Endowment Fund',
  email: 'info@tdyu-endowment.uz',
  phone: '+998 71 233-66-36',
  address: "Saylgoh ko'chasi 35-uy, Yunusobod tumani, Toshkent shahri, 100047",
  bankPayee: 'TDYU Endowment Fund',
  bankDetails:
    "Bank o'tkazmasi orqali xayriya. To'lovdan so'ng chekni info@tdyu-endowment.uz ga yuboring.\nQabul qiluvchi: TDYU Endowment Fund\nEmail: info@tdyu-endowment.uz\nManzil: Saylgoh 35, Yunusobod, Toshkent 100047",
  socialFacebook: '',
  socialInstagram: '',
  socialTelegram: '',
  socialYoutube: '',
  siteTagline: 'Toshkent davlat yuridik universiteti endowment fondi',
  workingHours: 'Dush–Jum: 09:00–18:00',
  privacyText:
    "TDYU Endowment Fund shaxsiy ma'lumotlarni faqat murojaat va xayriya jarayonlari uchun qayta ishlaydi. Ma'lumotlar uchinchi shaxslarga berilmaydi.",
}

const contentBlocks = [
  {
    key: 'home.welcome',
    lang: 'uz',
    title: 'Xush kelibsiz',
    body: 'TDYU Endowment Fund — talabalar, tadqiqot va jamiyat rivoji uchun barqaror moliyaviy manba.',
    page: 'home',
  },
  {
    key: 'home.welcome',
    lang: 'ru',
    title: 'Добро пожаловать',
    body: 'TDYU Endowment Fund — устойчивый финансовый ресурс для студентов, исследований и общества.',
    page: 'home',
  },
  {
    key: 'home.welcome',
    lang: 'en',
    title: 'Welcome',
    body: 'TDYU Endowment Fund — a sustainable resource for students, research and community impact.',
    page: 'home',
  },
  {
    key: 'about.mission',
    lang: 'uz',
    title: 'Missiya',
    body: 'Fond TDYU talabalari va ilmiy tashabbuslarini uzoq muddatli endowment modeli orqali qo‘llab-quvvatlaydi.',
    page: 'about',
  },
  {
    key: 'about.mission',
    lang: 'ru',
    title: 'Миссия',
    body: 'Фонд поддерживает студентов и научные инициативы ТГЮУ через долгосрочную endowment-модель.',
    page: 'about',
  },
  {
    key: 'about.mission',
    lang: 'en',
    title: 'Mission',
    body: 'The Fund supports TSUL students and research through a long-term endowment model.',
    page: 'about',
  },
  {
    key: 'donate.howto',
    lang: 'uz',
    title: 'Qanday xayriya qilish',
    body: 'Bank o‘tkazmasini amalga oshiring, so‘ng forma orqali ariza qoldiring yoki chekni emailga yuboring.',
    page: 'donate',
  },
  {
    key: 'donate.howto',
    lang: 'ru',
    title: 'Как пожертвовать',
    body: 'Сделайте банковский перевод, затем оставьте заявку через форму или отправьте чек на email.',
    page: 'donate',
  },
  {
    key: 'donate.howto',
    lang: 'en',
    title: 'How to donate',
    body: 'Make a bank transfer, then submit the form or email your receipt.',
    page: 'donate',
  },
  {
    key: 'grants.intro',
    lang: 'uz',
    title: 'Grantlar',
    body: 'Stipendiya va xalqaro dasturlar uchun arizalar admin panel orqali ko‘rib chiqiladi.',
    page: 'grants',
  },
  {
    key: 'grants.intro',
    lang: 'ru',
    title: 'Гранты',
    body: 'Заявки на стипендии и международные программы рассматриваются через админ-панель.',
    page: 'grants',
  },
  {
    key: 'grants.intro',
    lang: 'en',
    title: 'Grants',
    body: 'Scholarship and international program applications are reviewed in the admin panel.',
    page: 'grants',
  },
  {
    key: 'contact.intro',
    lang: 'uz',
    title: 'Biz bilan bog‘laning',
    body: 'Savol, taklif yoki hamkorlik uchun forma to‘ldiring — jamoa tez orada javob beradi.',
    page: 'contact',
  },
  {
    key: 'contact.intro',
    lang: 'ru',
    title: 'Свяжитесь с нами',
    body: 'Заполните форму для вопросов и сотрудничества — команда ответит в ближайшее время.',
    page: 'contact',
  },
  {
    key: 'contact.intro',
    lang: 'en',
    title: 'Contact us',
    body: 'Submit the form for questions or partnerships — our team will reply soon.',
    page: 'contact',
  },
  { key: 'stats.1', lang: 'uz', title: '31', body: 'Amalga oshirilgan loyihalar', page: 'home' },
  { key: 'stats.2', lang: 'uz', title: '24', body: 'Mutaxassislar soni', page: 'home' },
  { key: 'stats.3', lang: 'uz', title: '400', body: 'Qo‘llab-quvvatlangan tashabbuslar', page: 'home' },
  { key: 'stats.4', lang: 'uz', title: '18', body: 'Yillik tajriba', page: 'home' },
  { key: 'stats.5', lang: 'uz', title: '2023', body: 'Tashkil etilgan', page: 'home' },
  { key: 'stats.1', lang: 'ru', title: '31', body: 'Реализованные проекты', page: 'home' },
  { key: 'stats.2', lang: 'ru', title: '24', body: 'Специалисты', page: 'home' },
  { key: 'stats.3', lang: 'ru', title: '400', body: 'Поддержанные инициативы', page: 'home' },
  { key: 'stats.4', lang: 'ru', title: '18', body: 'Лет опыта', page: 'home' },
  { key: 'stats.5', lang: 'ru', title: '2023', body: 'Год основания', page: 'home' },
  { key: 'stats.1', lang: 'en', title: '31', body: 'Completed projects', page: 'home' },
  { key: 'stats.2', lang: 'en', title: '24', body: 'Specialists', page: 'home' },
  { key: 'stats.3', lang: 'en', title: '400', body: 'Supported initiatives', page: 'home' },
  { key: 'stats.4', lang: 'en', title: '18', body: 'Years of experience', page: 'home' },
  { key: 'stats.5', lang: 'en', title: '2023', body: 'Established', page: 'home' },
]


const announcements = [
  {
    title: 'Yangi raqamli resurslar mavjud',
    excerpt: 'Fond kutubxonasi va raqamli materiallar yangilandi.',
    dateLabel: 'Dekabr 1, 2025',
    lang: 'uz',
    sortOrder: 1,
  },
  {
    title: 'II Turk dunyosi yosh akademiklar kongressi',
    excerpt: 'TDYUda xalqaro kongress muvaffaqiyatli o‘tkazildi.',
    dateLabel: 'Dekabr 1, 2025',
    lang: 'uz',
    sortOrder: 2,
  },
  {
    title: 'Grant arizalari qabul qilinmoqda',
    excerpt: 'Xalqaro ta’lim va stipendiya grantlari uchun arizalar ochiq.',
    dateLabel: 'Dekabr 1, 2025',
    lang: 'uz',
    sortOrder: 3,
  },
  {
    title: 'New digital resources available',
    excerpt: 'Fund library and digital materials updated.',
    dateLabel: 'December 1, 2025',
    lang: 'en',
    sortOrder: 1,
  },
  {
    title: 'II Turkic World Young Academics Congress',
    excerpt: 'International congress held successfully at TSUL.',
    dateLabel: 'December 1, 2025',
    lang: 'en',
    sortOrder: 2,
  },
  {
    title: 'Grant applications are being accepted',
    excerpt: 'Applications open for international education grants.',
    dateLabel: 'December 1, 2025',
    lang: 'en',
    sortOrder: 3,
  },
  {
    title: 'Доступны новые цифровые ресурсы',
    excerpt: 'Обновлены библиотека и цифровые материалы фонда.',
    dateLabel: '1 декабря 2025',
    lang: 'ru',
    sortOrder: 1,
  },
  {
    title: 'II Конгресс молодых учёных тюркского мира',
    excerpt: 'Международный конгресс успешно проведён в ТГЮУ.',
    dateLabel: '1 декабря 2025',
    lang: 'ru',
    sortOrder: 2,
  },
  {
    title: 'Приём заявок на гранты открыт',
    excerpt: 'Открыты заявки на гранты международного образования.',
    dateLabel: '1 декабря 2025',
    lang: 'ru',
    sortOrder: 3,
  },
]

async function main() {
  const demoEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const demoPassword = process.env.ADMIN_PASSWORD || ''
  const demoName = process.env.ADMIN_NAME || 'TDYU Admin'
  if (demoEmail && demoPassword) {
    const hash = await bcrypt.hash(demoPassword, 10)
    await prisma.adminUser.upsert({
      where: { email: demoEmail },
      create: { email: demoEmail, passwordHash: hash, name: demoName, role: 'admin' },
      update: { passwordHash: hash, name: demoName },
    })
    console.log('Seed: operator admin', demoEmail)
  }

  const superEmail = (process.env.SUPER_ADMIN_EMAIL || '').trim().toLowerCase()
  const superPassword = process.env.SUPER_ADMIN_PASSWORD || ''
  const superName = process.env.SUPER_ADMIN_NAME || 'Super admin'
  if (superEmail && superPassword) {
    if (superPassword.length < 8) {
      throw new Error('SUPER_ADMIN_PASSWORD kamida 8 belgi bo‘lishi kerak')
    }
    const hash = await bcrypt.hash(superPassword, 10)
    await prisma.adminUser.upsert({
      where: { email: superEmail },
      create: { email: superEmail, passwordHash: hash, name: superName, role: 'super', active: true },
      update: { passwordHash: hash, name: superName, role: 'super', active: true },
    })
    console.log('Seed: super admin', superEmail)
  }

  if (!demoEmail && !superEmail) {
    console.warn('Seed: ADMIN_EMAIL / SUPER_ADMIN_EMAIL berilmagan — admin yaratilmadi')
  }

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.setting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    })
  }

  const count = await prisma.announcement.count()
  if (count === 0) {
    await prisma.announcement.createMany({ data: announcements })
  }

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key_lang: { key: block.key, lang: block.lang } },
      create: block,
      update: { title: block.title, body: block.body, page: block.page },
    })
  }

  console.log('Seed OK')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
