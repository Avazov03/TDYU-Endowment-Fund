import type { Locale } from '@/i18n/routing'

export type NewsPost = {
  slug: string
  img: string
  tag: string
  tagRu: string
  tagEn: string
  date: string
  dateRu: string
  dateEn: string
  title: string
  titleRu: string
  titleEn: string
  excerpt: string
  excerptRu: string
  excerptEn: string
  /** Full article paragraphs (dump single body) */
  body: string[]
  bodyRu: string[]
  bodyEn: string[]
}

/** Dump /cyan/blog/ (page 1 + 2) — single pages were not in HTTrack; bodies written for Next singles */
export const NEWS_POSTS: NewsPost[] = [
  {
    slug: 'turk-dunyosi-kongressi',
    img: '/media/dump/news/e-bl-img1-8-min-1024x614.jpg',
    tag: 'Loyihalar',
    tagRu: 'Проекты',
    tagEn: 'Projects',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'II Turk dunyosi yosh akademiklar kongressi',
    titleRu: 'II Конгресс молодых учёных тюркского мира',
    titleEn: 'II Turkic World Young Scholars Congress',
    excerpt: 'TDYUda “Umumiy kelajakni qurish” mavzusida xalqaro kongress muvaffaqiyatli o‘tkazildi.',
    excerptRu: 'В ТГЮУ успешно прошёл международный конгресс на тему «Строим общее будущее».',
    excerptEn: 'An international congress on “Building a shared future” was held successfully at TSUL.',
    body: [
      'Toshkent davlat yuridik universitetida “Umumiy kelajakni qurish” mavzusida II Turk dunyosi yosh akademiklar kongressi bo‘lib o‘tdi. Tadbir TDYU Endowment Fund hamkorligida tashkil etildi.',
      'Kongressda Turk dunyosi mamlakatlaridan yosh tadqiqotchilar, professor-o‘qituvchilar va talabalar ishtirok etdi. Sessiyalarda huquq, ta’lim va xalqaro hamkorlik bo‘yicha ilmiy ma’ruzalar tinglandi.',
      'Fond rahbariyati kongress ishtirokchilarini qo‘llab-quvvatlash, grant va almashinuv dasturlarini kengaytirish muhimligini ta’kidladi. Yakunda birgalikdagi tadqiqot yo‘nalishlari bo‘yicha kelishuvlar imzolandi.',
    ],
    bodyRu: [
      'Во втором конгрессе молодых учёных тюркского мира в ТГЮУ на тему «Строим общее будущее» приняли участие исследователи и преподаватели. Мероприятие прошло при поддержке TDYU Endowment Fund.',
      'На сессиях обсуждались право, образование и международное сотрудничество. Участники представили доклады и обменялись опытом академических проектов.',
      'Руководство фонда подчеркнуло важность грантов и программ обмена. По итогам были намечены совместные исследовательские направления.',
    ],
    bodyEn: [
      'The II Turkic World Young Scholars Congress on “Building a shared future” was held at TSUL with support from the TDYU Endowment Fund.',
      'Young researchers and faculty from Turkic-world countries presented papers on law, education and international cooperation.',
      'Fund leadership highlighted grants and exchange programmes. The congress closed with agreements on joint research themes.',
    ],
  },
  {
    slug: 'koreya-darsligi',
    img: '/media/dump/news/e-bl-img1-10-min-1024x614.jpg',
    tag: "Ta'lim",
    tagRu: 'Образование',
    tagEn: 'Education',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'Koreya iqtisodiy huquqi darsligi nashr etildi',
    titleRu: 'Издан учебник корейского экономического права',
    titleEn: 'Korean economic law textbook published',
    excerpt: 'Koreys tilidan tarjima qilingan darslik universitetga topshirildi.',
    excerptRu: 'Учебник, переведённый с корейского, передан университету.',
    excerptEn: 'A textbook translated from Korean was delivered to the university.',
    body: [
      'Koreya iqtisodiy huquqi bo‘yicha yangi darslik nashr etildi va TDYU kutubxonasi hamda tegishli kafedralarga topshirildi. Nashr fondning ta’lim resurslarini boyitish dasturi doirasida amalga oshirildi.',
      'Darslik koreys tilidan tarjima qilingan bo‘lib, talabalar uchun qiyosiy huquq va xalqaro iqtisodiy munosabatlar bo‘yicha amaliy materiallarni o‘z ichiga oladi.',
      'Universitet va fond hamkorligi keyingi bosqichda qo‘shimcha tarjima va elektron resurslarni rejalashtirmoqda.',
    ],
    bodyRu: [
      'Издан учебник по корейскому экономическому праву; экземпляр передан библиотеке и кафедрам ТГЮУ при поддержке фонда.',
      'Перевод с корейского включает практические материалы по сравнительному праву и международным экономическим отношениям.',
      'Партнёры планируют дальнейшие переводы и цифровые учебные ресурсы.',
    ],
    bodyEn: [
      'A Korean economic law textbook has been published and delivered to TSUL libraries and departments with fund support.',
      'Translated from Korean, it offers comparative law materials for students of international economic relations.',
      'Partners plan further translations and digital learning resources.',
    ],
  },
  {
    slug: 'westminster-dasturi',
    img: '/media/dump/news/e-bl-img1-11-min-1024x614.jpg',
    tag: 'Alumni',
    tagRu: 'Alumni',
    tagEn: 'Alumni',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: "42 o‘qituvchi Westminster dasturini yakunladi",
    titleRu: '42 преподавателя завершили программу Westminster',
    titleEn: '42 teachers completed the Westminster programme',
    excerpt: 'O‘qitish va o‘rganish bo‘yicha malaka oshirish dasturi yakunlandi.',
    excerptRu: 'Завершена программа повышения квалификации по преподаванию и обучению.',
    excerptEn: 'The teaching and learning professional development programme has concluded.',
    body: [
      '42 nafar o‘qituvchi Westminster Teaching & Learning dasturini muvaffaqiyatli yakunladi. Dastur zamonaviy pedagogika, baholash va talabaga yo‘naltirilgan o‘qitish usullariga bag‘ishlangan.',
      'Ishtirokchilar sertifikat oldi va o‘z kafedralarida yangi yondashuvlarni joriy etish rejasini taqdim etdi. Fond dastur xarajatlarining bir qismini qo‘llab-quvvatladi.',
      'Keyingi guruh uchun arizalar ochilishi kutilmoqda — batafsil ma’lumot grantlar sahifasida e’lon qilinadi.',
    ],
    bodyRu: [
      '42 преподавателя успешно завершили программу Westminster Teaching & Learning по современной педагогике и оцениванию.',
      'Участники получили сертификаты и представили планы внедрения новых подходов на кафедрах. Фонд поддержал часть расходов.',
      'Набор следующей группы будет анонсирован на странице грантов.',
    ],
    bodyEn: [
      'Forty-two teachers successfully completed the Westminster Teaching & Learning programme on modern pedagogy and assessment.',
      'Participants received certificates and department implementation plans. The fund co-supported programme costs.',
      'Applications for the next cohort will be announced on the grants page.',
    ],
  },
  {
    slug: 'alumni-tarmog',
    img: '/media/dump/news/e-bl-img1-12-min-1024x614.jpg',
    tag: 'Alumni',
    tagRu: 'Alumni',
    tagEn: 'Alumni',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'Alumni Association: bitiruvchilar tarmog‘i kengaymoqda',
    titleRu: 'Ассоциация выпускников: сеть расширяется',
    titleEn: 'Alumni Association: the graduate network is growing',
    excerpt: 'Dunyo bo‘ylab bitiruvchilar fond faoliyatiga qo‘shilmoqda.',
    excerptRu: 'Выпускники по всему миру присоединяются к деятельности фонда.',
    excerptEn: 'Graduates worldwide are joining the fund’s activities.',
    body: [
      'Alumni Association tarmog‘i kengayib, xorijdagi bitiruvchilar mentorlik, pro bono va xayriya tashabbuslariga qo‘shilmoqda.',
      'Yangi a’zolar uchun onlayn platforma va mintaqaviy klublar ishga tushirilmoqda. Fond bitiruvchilarning professional rivojlanishini qo‘llab-quvvatlaydi.',
      'Qo‘shilish uchun alumni sahifasidagi forma orqali ariza yuborishingiz mumkin.',
    ],
    bodyRu: [
      'Сеть Alumni Association растёт: выпускники за рубежом подключаются к менторству, pro bono и благотворительным инициативам.',
      'Запускаются онлайн-платформа и региональные клубы. Фонд поддерживает профессиональное развитие выпускников.',
      'Подать заявку можно через форму на странице alumni.',
    ],
    bodyEn: [
      'The Alumni Association network is expanding as graduates abroad join mentoring, pro bono and philanthropy initiatives.',
      'An online platform and regional clubs are launching. The fund supports alumni professional development.',
      'Apply via the form on the alumni page.',
    ],
  },
  {
    slug: 'xorijiy-stajirovka',
    img: '/media/dump/news/e-bl-img1-9-min-1024x614.jpg',
    tag: 'Alumni',
    tagRu: 'Alumni',
    tagEn: 'Alumni',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'Xorijiy stajirovka dasturlari e’lon qilindi',
    titleRu: 'Объявлены программы зарубежных стажировок',
    titleEn: 'International internship programmes announced',
    excerpt: 'Eron, Xitoy, Germaniya va Rossiya yo‘nalishlarida amaliyot imkoniyatlari.',
    excerptRu: 'Возможности практики в Иране, Китае, Германии и России.',
    excerptEn: 'Internship opportunities in Iran, China, Germany and Russia.',
    body: [
      'Fond Eron, Xitoy, Germaniya va Rossiya yo‘nalishlarida xorijiy stajirovka dasturlarini e’lon qildi. Nomzodlar talaba va yosh bitiruvchilar orasidan tanlanadi.',
      'Dastur muddati, stipendiya shartlari va til talablari grantlar bo‘limida joylashtirilgan. Arizalar belgilangan muddatgacha qabul qilinadi.',
      'G‘oliblar transport va yashash xarajatlarining bir qismini fond hisobidan qoplaydi.',
    ],
    bodyRu: [
      'Фонд объявил стажировки в Иране, Китае, Германии и России для студентов и молодых выпускников.',
      'Сроки, стипендии и языковые требования опубликованы в разделе грантов.',
      'Победителям частично покрываются транспорт и проживание.',
    ],
    bodyEn: [
      'The fund announced internships in Iran, China, Germany and Russia for students and recent graduates.',
      'Duration, stipend rules and language requirements are on the grants page.',
      'Winners receive partial coverage of travel and living costs.',
    ],
  },
  {
    slug: 'grant-arizalari',
    img: '/media/dump/news/e-bl-img1-7-min-1024x614.jpg',
    tag: "Ta'lim",
    tagRu: 'Образование',
    tagEn: 'Education',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'Grant arizalari: mart–may muddati ochildi',
    titleRu: 'Заявки на гранты: открыт срок март–май',
    titleEn: 'Grant applications: March–May window open',
    excerpt: 'Xalqaro ta’lim va stipendiya grantlari uchun arizalar qabul qilinadi.',
    excerptRu: 'Принимаются заявки на международные образовательные и стипендиальные гранты.',
    excerptEn: 'Applications are open for international education and scholarship grants.',
    body: [
      'Xalqaro ta’lim va stipendiya grantlari uchun mart–may ariza oynasi ochildi. Nomzodlar onlayn forma orqali hujjat topshirishi mumkin.',
      'Baholash mezonlari: akademik natija, motivatsiya va jamiyatga ta’sir. Natijalar komissiya tomonidan e’lon qilinadi.',
      'Savollar uchun aloqa sahifasi yoki info@tdyu-endowment.uz manziliga murojaat qiling.',
    ],
    bodyRu: [
      'Открыто окно подачи заявок на международные образовательные гранты (март–май) через онлайн-форму.',
      'Критерии: академические результаты, мотивация и общественный вклад.',
      'Вопросы — через страницу контактов или info@tdyu-endowment.uz.',
    ],
    bodyEn: [
      'The March–May application window for international education and scholarship grants is open via the online form.',
      'Criteria include academic results, motivation and community impact.',
      'Questions: contact page or info@tdyu-endowment.uz.',
    ],
  },
  {
    slug: 'yillik-hisobot',
    img: '/media/dump/news/e-bl-img1-6-min-1024x614.jpg',
    tag: "Ta'lim",
    tagRu: 'Образование',
    tagEn: 'Education',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'Fond yillik hisoboti va shaffoflik e’lonlari',
    titleRu: 'Годовой отчёт фонда и заявления о прозрачности',
    titleEn: 'Annual fund report and transparency notices',
    excerpt: '2024-yil faoliyat hisoboti va auditorlik xulosasi e’lon qilindi.',
    excerptRu: 'Опубликованы отчёт о деятельности за 2024 год и аудиторское заключение.',
    excerptEn: 'The 2024 activity report and audit opinion have been published.',
    body: [
      '2024-yil faoliyat hisoboti va auditorlik xulosasi shaffoflik sahifasida e’lon qilindi. Hujjatlar xayriya oqimlari, grantlar va boshqaruv xarajatlarini ochiq ko‘rsatadi.',
      'Fond jamoatchilik nazoratini kuchaytirish va donorlar ishonchini saqlashni ustuvor vazifa deb biladi.',
      'PDF versiyani hisobotlar bo‘limidan yuklab olishingiz mumkin.',
    ],
    bodyRu: [
      'Отчёт за 2024 год и аудиторское заключение опубликованы на странице прозрачности.',
      'Документы раскрывают потоки пожертвований, гранты и управленческие расходы.',
      'PDF доступен в разделе отчётов.',
    ],
    bodyEn: [
      'The 2024 activity report and audit opinion are published on the transparency page.',
      'Documents disclose donation flows, grants and governance costs.',
      'Download the PDF from the reports section.',
    ],
  },
  {
    slug: 'tsul-shop',
    img: '/media/dump/news/e-bl-img1-5-min-1024x614.jpg',
    tag: "Ta'lim",
    tagRu: 'Образование',
    tagEn: 'Education',
    date: 'Dekabr 9, 2025',
    dateRu: '9 декабря 2025',
    dateEn: 'December 9, 2025',
    title: 'TSUL SHOP va brend mahsulotlari yangilandi',
    titleRu: 'TSUL SHOP и брендовые товары обновлены',
    titleEn: 'TSUL SHOP and branded products updated',
    excerpt: 'Promo mahsulotlar va yuridik adabiyotlar sotuvi kengaytirildi.',
    excerptRu: 'Расширена продажа промо-товаров и юридической литературы.',
    excerptEn: 'Promo products and legal literature sales have been expanded.',
    body: [
      'TSUL SHOP assortimenti yangilandi: brend mahsulotlar, suvenirlar va yuridik adabiyotlar. Sotuvdan tushgan mablag‘ning bir qismi fond dasturlariga yo‘naltiriladi.',
      'Talabalar va mehmonlar kampusdagi do‘konda yoki onlayn buyurtma orqali xarid qilishi mumkin.',
      'Yangi kolleksiya bahorgi semestrda taqdim etiladi.',
    ],
    bodyRu: [
      'Ассортимент TSUL SHOP обновлён: брендовые товары и юридическая литература; часть выручки направляется на программы фонда.',
      'Покупки доступны в кампусе и онлайн.',
      'Новая коллекция — в весеннем семестре.',
    ],
    bodyEn: [
      'TSUL SHOP assortment is updated with branded goods and legal literature; part of proceeds support fund programmes.',
      'Shop on campus or online.',
      'A new collection launches in the spring semester.',
    ],
  },
  {
    slug: 'ilmiy-nashr-granti',
    img: '/media/dump/news/e-bl-img1-4-min-1024x614.jpg',
    tag: 'Alumni',
    tagRu: 'Alumni',
    tagEn: 'Alumni',
    date: 'Noyabr 6, 2025',
    dateRu: '6 ноября 2025',
    dateEn: 'November 6, 2025',
    title: 'Ilmiy nashr granti — yangi tanlov',
    titleRu: 'Грант на научные публикации — новый конкурс',
    titleEn: 'Research publication grant — new call',
    excerpt: 'Xorijiy nufuzli jurnallarda nashr xarajatlarini qoplash dasturi.',
    excerptRu: 'Программа покрытия расходов на публикации в зарубежных журналах.',
    excerptEn: 'A programme covering publication costs in leading international journals.',
    body: [
      'Ilmiy nashr granti tanlovi ochildi: xorijiy nufuzli jurnallarda chop etish xarajatlarini qoplash. Arizalar tadqiqotchilar va bitiruvchilar uchun.',
      'Tanlov mezonlari — nashr sifati, jurnal indeksi va mavzuning fond ustuvorliklariga mosligi.',
      'Batafsil shartlar grantlar sahifasida.',
    ],
    bodyRu: [
      'Открыт конкурс гранта на покрытие расходов публикаций в зарубежных журналах.',
      'Критерии: качество работы, индекс журнала и соответствие приоритетам фонда.',
      'Условия — на странице грантов.',
    ],
    bodyEn: [
      'A new call covers publication fees in leading international journals for researchers and alumni.',
      'Criteria: quality, journal indexing and alignment with fund priorities.',
      'Full terms are on the grants page.',
    ],
  },
  {
    slug: 'jessup-jamoasi',
    img: '/media/dump/news/e-bl-img1-3-min-1024x614.jpg',
    tag: 'Onlayn',
    tagRu: 'Онлайн',
    tagEn: 'Online',
    date: 'Noyabr 6, 2025',
    dateRu: '6 ноября 2025',
    dateEn: 'November 6, 2025',
    title: 'Philip C. Jessup jamoasi tayyorgarlikni boshladi',
    titleRu: 'Команда Philip C. Jessup начала подготовку',
    titleEn: 'Philip C. Jessup team begins preparation',
    excerpt: '58 nafar talaba va o‘qituvchilar ishtirokidagi xalqaro tanlov.',
    excerptRu: 'Международный конкурс с участием 58 студентов и преподавателей.',
    excerptEn: 'An international competition with 58 students and faculty members.',
    body: [
      'Philip C. Jessup xalqaro sud munozaralari jamoasi tayyorgarlikni boshladi. 58 nafar talaba va murabbiylar onlayn mashg‘ulotlarda ishtirok etmoqda.',
      'Fond jamoa uchun adabiyot, murabbiylik sessiyalari va ishtirok xarajatlarini qo‘llab-quvvatlaydi.',
      'Musobaqa bosqichlari haqida yangiliklar shu bo‘limda e’lon qilinadi.',
    ],
    bodyRu: [
      'Команда Philip C. Jessup начала подготовку; 58 студентов и тренеров участвуют в онлайн-занятиях.',
      'Фонд поддерживает литературу, коучинг и участие.',
      'Новости этапов будут публиковаться в этом разделе.',
    ],
    bodyEn: [
      'The Philip C. Jessup moot team has begun preparation with 58 students and coaches in online sessions.',
      'The fund supports materials, coaching and participation costs.',
      'Round updates will be posted in this news section.',
    ],
  },
  {
    slug: 'hamkorlik-memorandumi',
    img: '/media/dump/news/e-bl-img1-2-min-1024x614.jpg',
    tag: 'TDYU',
    tagRu: 'ТГЮУ',
    tagEn: 'TSUL',
    date: 'Noyabr 6, 2025',
    dateRu: '6 ноября 2025',
    dateEn: 'November 6, 2025',
    title: 'Xalqaro hamkorlik memorandumi imzolandi',
    titleRu: 'Подписан меморандум о международном сотрудничестве',
    titleEn: 'International cooperation memorandum signed',
    excerpt: 'Yangi universitetlar bilan hamkorlik va talaba almashinuvi yo‘llari ochildi.',
    excerptRu: 'Открыты пути сотрудничества и студенческого обмена с новыми вузами.',
    excerptEn: 'New pathways for university partnership and student exchange were opened.',
    body: [
      'TDYU va xorijiy universitetlar o‘rtasida hamkorlik memorandumi imzolandi. Hujjat talaba almashinuvi, qo‘shma tadqiqot va akademik tashriflarni nazarda tutadi.',
      'Fond kelishuv doirasidagi grant va stipendiyalarni muvofiqlashtirishda ishtirok etadi.',
      'Amaliy dasturlar 2026-yil bahoridan boshlanadi.',
    ],
    bodyRu: [
      'Подписан меморандум о сотрудничестве ТГЮУ с зарубежными вузами: обмен, совместные исследования и визиты.',
      'Фонд координирует гранты и стипендии в рамках соглашения.',
      'Практические программы стартуют весной 2026 года.',
    ],
    bodyEn: [
      'A cooperation memorandum was signed between TSUL and partner universities covering exchange, joint research and academic visits.',
      'The fund will coordinate related grants and scholarships.',
      'Programmes begin in spring 2026.',
    ],
  },
  {
    slug: 'yuridik-klinika',
    img: '/media/dump/news/e-bl-img1-1-min-1024x614.jpg',
    tag: 'Loyihalar',
    tagRu: 'Проекты',
    tagEn: 'Projects',
    date: 'Noyabr 4, 2025',
    dateRu: '4 ноября 2025',
    dateEn: 'November 4, 2025',
    title: 'Yuridik klinika: pro bono yordam kengaymoqda',
    titleRu: 'Юридическая клиника: расширяется pro bono помощь',
    titleEn: 'Legal clinic: pro bono support expands',
    excerpt: 'Bitiruvchi va talabalar huquqiy yordam loyihalarida ishtirok etmoqda.',
    excerptRu: 'Выпускники и студенты участвуют в проектах правовой помощи.',
    excerptEn: 'Alumni and students take part in legal aid projects.',
    body: [
      'Yuridik klinika pro bono yo‘nalishini kengaytirmoqda: bitiruvchi va talabalar aholiga bepul huquqiy maslahat beradi.',
      'Fond klinika infratuzilmasi va treninglarini qo‘llab-quvvatlaydi. Yangi volontyorlar uchun ochiq chaqiriq e’lon qilinadi.',
      'Loyiha haqida batafsil — loyihalar bo‘limida.',
    ],
    bodyRu: [
      'Юридическая клиника расширяет pro bono: выпускники и студенты консультируют население бесплатно.',
      'Фонд поддерживает инфраструктуру и тренинги; скоро открытый набор волонтёров.',
      'Подробнее — в разделе проектов.',
    ],
    bodyEn: [
      'The legal clinic is expanding pro bono advice delivered by alumni and students.',
      'The fund supports infrastructure and training; a volunteer call will follow.',
      'More detail is on the projects page.',
    ],
  },
]

export const NEWS_CATEGORIES = [
  { key: 'Alumni', uz: 'Alumni', ru: 'Alumni', en: 'Alumni', count: 4 },
  { key: "Ta'lim", uz: "Ta'lim", ru: 'Образование', en: 'Education', count: 4 },
  { key: 'Onlayn', uz: 'Onlayn', ru: 'Онлайн', en: 'Online', count: 1 },
  { key: 'Loyihalar', uz: 'Loyihalar', ru: 'Проекты', en: 'Projects', count: 2 },
  { key: 'TDYU', uz: 'TDYU', ru: 'ТГЮУ', en: 'TSUL', count: 1 },
] as const

export const NEWS_PER_PAGE = 10

export function getNewsPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug)
}

export function getAdjacentNews(slug: string): { prev: NewsPost | null; next: NewsPost | null } {
  const i = NEWS_POSTS.findIndex((p) => p.slug === slug)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? NEWS_POSTS[i - 1]! : null,
    next: i < NEWS_POSTS.length - 1 ? NEWS_POSTS[i + 1]! : null,
  }
}

export function localizePost(p: NewsPost, locale: Locale) {
  if (locale === 'ru') {
    return { tag: p.tagRu, date: p.dateRu, title: p.titleRu, excerpt: p.excerptRu, body: p.bodyRu }
  }
  if (locale === 'en') {
    return { tag: p.tagEn, date: p.dateEn, title: p.titleEn, excerpt: p.excerptEn, body: p.bodyEn }
  }
  return { tag: p.tag, date: p.date, title: p.title, excerpt: p.excerpt, body: p.body }
}
