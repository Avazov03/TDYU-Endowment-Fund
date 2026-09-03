import type { Locale } from '@/i18n/routing'

export const brand = {
  name: 'TDYU Endowment Fund',
  email: 'info@tdyu-endowment.uz',
  phone: '+998 71 233-66-36',
  phoneHref: 'tel:+998712336636',
  registrar: {
    uz: "O'zbekiston Respublikasi Adliya vazirligi",
    ru: 'Министерство юстиции Республики Узбекистан',
    en: 'Ministry of Justice of the Republic of Uzbekistan',
  },
  org: {
    uz: 'Toshkent davlat yuridik universiteti',
    ru: 'Ташкентский государственный юридический университет',
    en: 'Tashkent State University of Law',
  },
  address: {
    uz: "Saylgoh ko'chasi 35-uy, Yunusobod tumani, Toshkent shahri, 100047",
    ru: 'ул. Сайилгох 35, Юнусабад, Ташкент, 100047',
    en: '35 Saylgoh Street, Yunusobod, Tashkent 100047',
  },
}

export const officialNames = [
  { lang: "O'zbek (lotin)", name: "Toshkent davlat yuridik universitetining maqsadli kapital (Endowment Fund) jamoat fondi" },
  { lang: 'Ўзбек (кирилл)', name: 'Тошкент давлат юридик университети мақсадли капитал (Endowment Fund) жамоат фонди' },
  { lang: 'Русский', name: 'Общественный фонд целевого капитала (Endowment Fund) ТГЮУ' },
  { lang: 'English', name: 'Targeted Capital Public Fund (Endowment Fund) of Tashkent State University of Law' },
]

const copy = {
  uz: {
    stats: [
      { n: '31', l: 'Amalga oshirilgan loyihalar' },
      { n: '24', l: "Davlatlar bo'ylab alumni" },
      { n: '400+', l: "Qo'llab-quvvatlangan" },
      { n: '18', l: 'Xalqaro hamkor' },
      { n: '2023', l: 'Tashkil etilgan' },
    ],
    mission: {
      eyebrow: 'Missiya',
      title: 'Bilim — eng yaxshi sarmoya',
      paragraphs: [
        `TDYU Endowment Fund O'zbekiston Respublikasining "Nodavlat notijorat tashkilotlari to'g'risida"gi va "Jamoat fondlari to'g'risida"gi Qonunlari asosida faoliyat yurituvchi, a'zoligi bo'lmagan jamoat fondidir.`,
        `Fond maqsadi — TDYU va Adliya vazirligi tizimidagi ta'lim muassasalari xodimlari, professor-o'qituvchilari va talabalarini dunyoning yetakchi oliy ta'lim muassasalarida malaka oshirish, grantlar va stipendiyalar ajratish hamda xalqaro nufuzini oshirish.`,
        `Fond faoliyati oshkoralik, kollegiallik, o'zaro hurmat, teng huquqlilik va ixtiyoriylik tamoyillariga asoslanadi.`,
      ],
    },
    pillars: [
      { n: '01', t: "Xalqaro ta'lim", d: 'Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar' },
      { n: '02', t: 'Xalqaro hamkorlik', d: "Global ilmiy tashkilotlar va oliy ta'lim muassasalari bilan aloqalar" },
      { n: '03', t: 'Tanlov va mukofotlar', d: "Milliy va xalqaro musobaqalarda ishtirokni qo'llab-quvvatlash" },
      { n: '04', t: 'Ilmiy nashrlar', d: 'Xorijiy nufuzli jurnallarda maqolalar va darsliklar nashr ettirish' },
      { n: '05', t: 'TSUL brendi', d: `"O'zbek huquqi markazlari" va kutubxonalarni xorijda tashkil etish` },
      { n: '06', t: 'Tadbirkorlik', d: "O'quv kurslar, yozgi maktablar va boshqa qonuniy faoliyatlar" },
    ],
    programsEyebrow: 'Dasturlar',
    programsTitle: '7 ta asosiy dastur',
    programsLead: 'Fond faoliyatining asosiy yo‘nalishlari — ta’limdan nashrgacha.',
    programs: [
      { n: '01', t: 'Xalqaro stajirovkalar va malaka oshirish', d: "Dunyo yetakchi universitetlari va xalqaro tashkilotlarda tahsil, stajirovka va malaka oshirishni moliyalash", tag: 'Talaba · Xodim · Doktorant' },
      { n: '02', t: 'Stipendiya va grantlar', d: "Iqtidorli va ehtiyojmand talabalar, o'quvchilar hamda xodimlar uchun stipendiyalar va grantlar", tag: 'Moliyaviy yordam' },
      { n: '03', t: 'Tanlovlar va musobaqalar', d: "Intellektual, huquqiy, sport va ma'rifiy tanlovlarda ishtirokni qo'llab-quvvatlash", tag: 'Milliy · Xalqaro' },
      { n: '04', t: "Ilmiy va ta'limiy loyihalar", d: 'Konferensiyalar, forumlar, kongreslar; xorijiy mutaxassislar; tarjima va nashr', tag: 'Ilmiy tadqiqot' },
      { n: '05', t: 'Xalqaro tadbirlar va mehmonlar', d: 'Xorijiy delegatsiyalarni kutib olish; protokol va diplomatiya xizmatlari', tag: 'Protokol · Diplomatiya' },
      { n: '06', t: 'Infratuzilma va TSUL brendi', d: `"O'zbek huquqi markazlari", auditoriyalar, kutubxonalar; moddiy-texnik baza`, tag: 'Xalqaro nufuz' },
      { n: '07', t: 'Nashrlar va tarjimalar', d: "Huquqiy darsliklar tarjimasi; xorijiy nashrlar; kutubxonalarga adabiyot taqdimi", tag: 'Ilmiy nashriyot' },
    ],
    projectsEyebrow: 'Loyihalar',
    projectsTitle: 'Amalga oshirilgan ishlar',
    projectsLead: 'Jessup, Westminster, TSUL SHOP va boshqa tashabbuslar.',
    projects: [
      { tag: 'Xalqaro tanlov', t: 'Philip C. Jessup Moot Court', d: "58 nafar talaba va o'qituvchilar ishtiroki, xorijiy ekspert xarajatlarini qoplash", y: '2024' },
      { tag: 'Nashriyot', t: 'Koreya iqtisodiy huquqi darsligi', d: 'Koreys tilidan tarjima qilinib nashr etildi va universitetga topshirildi', y: '2025' },
      { tag: 'Kongress', t: 'II Turk dunyosi yosh akademiklar kongressi', d: "Turkiya bilan hamkorlikda TDYUda o'tkazildi", y: '2025' },
      { tag: "Ta'lim dasturi", t: 'Postgraduate Certificate — Westminster Tashkent', d: "42 nafar professor-o'qituvchi Teaching & Learning dasturida tahsil oldi", y: '2025' },
      { tag: 'Infratuzilma', t: "TSUL SHOP — 2 ta savdo do'koni", d: '90 turdan ortiq promo mahsulotlar va yuridik adabiyotlar sotuvi', y: '2024' },
      { tag: 'Amaliyot', t: 'Xorijiy stajirovka dasturlari', d: 'Eron, Xitoy, Germaniya va Rossiya elchixonalarida amaliyot', y: '2024–2025' },
    ],
    spendEyebrow: 'Shaffoflik',
    spendTitle: 'Mablag‘ qayerga ketadi',
    sourcesTitle: 'Moliyaviy manbalar',
    spend: [
      { l: "Ta'lim va grantlar", p: 48 },
      { l: 'Xalqaro tadbirlar', p: 22 },
      { l: 'Ilmiy nashrlar', p: 16 },
      { l: 'Infratuzilma', p: 9 },
      { l: 'Boshqaruv xarajatlari', p: 5 },
    ],
    sources: [
      'Muassislar tomonidan muntazam pul va boshqa tushumlar',
      "Yuridik va jismoniy shaxslarning ixtiyoriy xayriya mablag'lari",
      'TDYU bitiruvchilari (Alumni Association) xayriyalari',
      'Xalqaro tashkilotlar va moliya institutlarining grantlari',
      "Fondning tadbirkorlik faoliyatidan olinadigan daromadlar",
    ],
    reportsEyebrow: 'Hisobotlar va audit',
    reportsTitle: 'Hujjatlar va yillik hisobotlar',
    reports: [
      { t: '2024 Yillik faoliyat hisoboti', d: "31 ta loyiha, mablag'lar taqsimoti, asosiy ko'rsatkichlar", date: 'Yanvar 2025 · UZ / RU / EN' },
      { t: '2024 Auditorlik xulosasi', d: 'Mustaqil auditorlik tashkiloti xulosasi va moliyaviy yillik balans', date: 'Mart 2025' },
      { t: 'Fond ustavi (2025 yangi tahrir)', d: "Adliya vazirligida qayta ro'yxatdan o'tkazilgan", date: '2025 · Rasmiy hujjat' },
      { t: 'Taftish komissiyasi xulosasi', d: "Moliyaviy-xo'jalik faoliyati tekshiruvi natijalari", date: '2024' },
    ],
    govEyebrow: 'Boshqaruv',
    govTitle: 'Vasiylik · Boshqaruv · Taftish',
    governance: [
      {
        id: 'vk',
        label: 'Vasiylik Kengashi',
        intro: "Vasiylik kengashi — Fondning oliy boshqaruv organi. 5 a'zo, vakolat muddati 5 yil.",
        powers: [
          "Ustavga o'zgartirishlarni tasdiqlash",
          'Boshqaruv va Taftish tarkibini shakllantirish',
          'Byudjet va yillik hisobotni tasdiqlash',
          "Qayta tashkil etish va tugatish qarorlari",
          'Auditorlik tashkilotini tanlash',
        ],
      },
      {
        id: 'bk',
        label: 'Boshqaruv Kengashi',
        intro: 'Boshqaruv kengashi — joriy faoliyatni boshqaradi. Rais: N. Salayev.',
        powers: [
          'Joriy faoliyatni umumiy boshqarish',
          "Byudjet doirasida mablag'larni sarflash",
          "Xodimlarni rag'batlantirish",
          'Filial va vakolatxonalar',
          'Ramziy belgini tasdiqlash',
        ],
      },
      {
        id: 'tk',
        label: 'Taftish Komissiyasi',
        intro: "Moliyaviy faoliyat va mablag'lardan to'g'ri foydalanishni nazorat qiladi. Kamida 3 kishi.",
        powers: [
          'Hisobotlar ishonchliligini baholash',
          'Buxgalteriya buzilishlari haqida ma’lumot',
          'Qoidabuzarliklarni bartaraf etish tavsiyalari',
          'Samaradorlikni oshirish takliflari',
        ],
      },
    ],
    alumniEyebrow: 'Alumni xarita',
    alumniTitle: 'Dunyo bo‘ylab bitiruvchilar',
    alumniLead: '24 davlat — filtrlash orqali ko‘ring.',
    mapAll: 'Hammasi',
    mapLaw: 'Yuristlar',
    mapIntl: 'Xalqaro',
    mapAcademia: 'Akademiya',
    mapGovt: 'Davlat',
    alumniPoints: [
      { f: 'law', c: 'London', t: 'Yuristlar', n: 'Aziz Karimov' },
      { f: 'intl', c: 'Jeneva', t: 'Xalqaro tashkilotlar', n: 'Nilufar Rashidova' },
      { f: 'academia', c: 'Heidelberg', t: 'Akademiya', n: 'Zulfiya Ergasheva' },
      { f: 'govt', c: 'Toshkent', t: 'Davlat xizmati', n: 'TDYU bitiruvchilari' },
      { f: 'law', c: 'Seoul', t: 'Yuristlar', n: 'Xalqaro amaliyot' },
      { f: 'law', c: 'Berlin', t: 'Yuristlar', n: 'Stajirovka dasturi' },
    ],
    storiesEyebrow: 'Hikoyalar',
    storiesTitle: 'Muvaffaqiyat tarixlari',
    stories: [
      { i: 'AK', q: 'TDYU menga xalqaro huquq sohasida faoliyat uchun poydevor berdi. London ofisida ishlash orzuyim amalga oshdi.', n: 'Aziz Karimov', r: 'Senior Associate, Clifford Chance · London' },
      { i: 'NR', q: "Fond stipendiyasi tufayli Jeneva universitetida tahsil oldim. Bugun BMT tizimida O'zbekistonni namoyish etaman.", n: 'Nilufar Rashidova', r: 'Legal Counsel, UN Office · Jeneva' },
      { i: 'ZE', q: "TDYU va Endowment Fund qo'llab-quvvatlovi bilan Germaniyada professor bo'lish orzum haqiqatga aylandi.", n: 'Zulfiya Ergasheva', r: 'Professor, Heidelberg Universiteti · Germaniya' },
    ],
    grantsEyebrow: 'Grantlar',
    grantsTitle: 'Moliyaviy dasturlar',
    grantApply: 'Ariza topshirish',
    grants: [
      { b: 'Asosiy dastur', t: "Xalqaro ta'lim granti", d: 'Magistratura, doktorantura yoki malaka oshirish uchun to‘liq moliyalashtirish.', m: ['1 yilgacha', 'Yiliga 5 grant', 'Ariza: mart–may'] },
      { b: '', t: 'Tanlov stipendiyasi', d: 'Milliy va xalqaro huquqiy musobaqalar ishtirokchilari uchun.', m: ['Har musobaqa', 'Doim ochiq'] },
      { b: '', t: 'Ilmiy nashr granti', d: 'Xorijiy nufuzli nashrlarda maqola chop etish xarajatlarini qoplash.', m: ['Tarjima bilan', 'Yil davomida'] },
    ],
    newsEyebrow: 'Yangiliklar',
    newsTitle: 'Fond tadbirlari va e’lonlar',
    news: [
      { tag: 'Xalqaro kongress', t: 'II Turk dunyosi yosh akademiklar kongressi muvaffaqiyatli o‘tkazildi', d: '2025-yil 14-fevralda TDYUda “Umumiy kelajakni qurish” mavzusida xalqaro kongress bo‘lib o‘tdi.', date: '14 fevral 2025' },
      { tag: 'Nashriyot', t: 'Koreya iqtisodiy huquqi darsligi nashr etildi', d: 'Koreys tilidan tarjima qilingan darslik universitetga topshirildi.', date: 'Fevral 2025' },
      { tag: "Ta'lim", t: '42 o‘qituvchi Westminster dasturini yakunladi', d: 'Postgraduate Certificate in Teaching and Learning yakunlandi.', date: 'Mart 2025' },
    ],
    supportEyebrow: 'Yordam yo‘llari',
    supportTitle: 'Qanday qo‘llab-quvvatlash mumkin',
    support: [
      { t: 'Xayriya badali', d: 'Bir martalik yoki muntazam xayriya. Har qanday miqdor hisobga olinadi.', cta: 'Xayriya qilish', href: '/donate#calc' },
      { t: 'Alumni aloqasi', d: 'Bitiruvchi sifatida ro‘yxatdan o‘ting va Alumni Associationga qo‘shiling.', cta: 'Alumni bo‘lish', href: '/alumni#register' },
      { t: 'Korporativ homiylik', d: 'Yuridik shaxslar uchun xayriya; brend fond faoliyatida e’tirof etiladi.', cta: 'Homiylik', href: '/contact' },
      { t: 'Grant va hamkorlik', d: 'Xalqaro tashkilotlar uchun grant va uzoq muddatli hamkorlik.', cta: 'Hamkorlik', href: '/contact' },
    ],
    legalEyebrow: 'Huquqiy asos',
    legalTitle: 'Qonunlar va rekvizitlar',
    legal: [
      { t: "O'zbekiston Respublikasi Konstitutsiyasi", d: 'Fuqarolik jamiyati, uyushma erkinligi va mulkiy huquqlar asoslari' },
      { t: `"Nodavlat notijorat tashkilotlari to'g'risida"gi Qonun`, d: "NNO tashkil etish, ro'yxatdan o'tkazish va faoliyat tartibi" },
      { t: `"Jamoat fondlari to'g'risida"gi Qonun`, d: 'Jamoat fondlarining huquqiy holati, boshqaruvi va nazorati' },
    ],
    alumniRegEyebrow: 'Alumni',
    alumniRegTitle: 'Alumni Associationga qo‘shiling',
  },
  ru: {
    stats: [
      { n: '31', l: 'Реализованные проекты' },
      { n: '24', l: 'Страны alumni' },
      { n: '400+', l: 'Поддержано' },
      { n: '18', l: 'Международные партнёры' },
      { n: '2023', l: 'Год основания' },
    ],
    mission: {
      eyebrow: 'Миссия',
      title: 'Знание — лучшая инвестиция',
      paragraphs: [
        'TDYU Endowment Fund — общественный фонд без членства, действующий на основе законов Республики Узбекистан «О негосударственных некоммерческих организациях» и «Об общественных фондах».',
        'Цель фонда — повышение квалификации сотрудников, преподавателей и студентов ТГЮУ и системы Министерства юстиции в ведущих вузах мира, выделение грантов и стипендий, укрепление международного авторитета.',
        'Деятельность фонда основана на принципах открытости, коллегиальности, взаимного уважения, равноправия и добровольности.',
      ],
    },
    pillars: [
      { n: '01', t: 'Международное образование', d: 'Повышение квалификации и стипендии в ведущих университетах мира' },
      { n: '02', t: 'Международное сотрудничество', d: 'Связи с глобальными научными организациями и вузами' },
      { n: '03', t: 'Конкурсы и награды', d: 'Поддержка участия в национальных и международных соревнованиях' },
      { n: '04', t: 'Научные издания', d: 'Публикация статей и учебников в авторитетных зарубежных журналах' },
      { n: '05', t: 'Бренд TSUL', d: 'Центры узбекского права и библиотеки за рубежом' },
      { n: '06', t: 'Предпринимательство', d: 'Учебные курсы, летние школы и иная законная деятельность' },
    ],
    programsEyebrow: 'Программы',
    programsTitle: '7 основных программ',
    programsLead: 'Ключевые направления фонда — от образования до издательства.',
    programs: [
      { n: '01', t: 'Международные стажировки и повышение квалификации', d: 'Финансирование учёбы, стажировок и повышения квалификации в ведущих вузах и организациях', tag: 'Студент · Сотрудник · Докторант' },
      { n: '02', t: 'Стипендии и гранты', d: 'Стипендии и гранты для талантливых и нуждающихся студентов и сотрудников', tag: 'Финансовая помощь' },
      { n: '03', t: 'Конкурсы и соревнования', d: 'Поддержка участия в интеллектуальных, правовых, спортивных и просветительских конкурсах', tag: 'Национальные · Международные' },
      { n: '04', t: 'Научные и образовательные проекты', d: 'Конференции, форумы, конгрессы; иностранные специалисты; перевод и издание', tag: 'Научные исследования' },
      { n: '05', t: 'Международные мероприятия и гости', d: 'Приём иностранных делегаций; протокол и дипломатия', tag: 'Протокол · Дипломатия' },
      { n: '06', t: 'Инфраструктура и бренд TSUL', d: 'Центры узбекского права, аудитории, библиотеки; материально-техническая база', tag: 'Международный авторитет' },
      { n: '07', t: 'Издания и переводы', d: 'Перевод правовых учебников; зарубежные издания; литература для библиотек', tag: 'Научное издательство' },
    ],
    projectsEyebrow: 'Проекты',
    projectsTitle: 'Реализованные работы',
    projectsLead: 'Jessup, Westminster, TSUL SHOP и другие инициативы.',
    projects: [
      { tag: 'Международный конкурс', t: 'Philip C. Jessup Moot Court', d: 'Участие 58 студентов и преподавателей, покрытие расходов иностранных экспертов', y: '2024' },
      { tag: 'Издательство', t: 'Учебник корейского экономического права', d: 'Переведён с корейского, издан и передан университету', y: '2025' },
      { tag: 'Конгресс', t: 'II Конгресс молодых академиков тюркского мира', d: 'Проведён в ТГЮУ совместно с Турцией', y: '2025' },
      { tag: 'Образование', t: 'Postgraduate Certificate — Westminster Tashkent', d: '42 преподавателя прошли программу Teaching & Learning', y: '2025' },
      { tag: 'Инфраструктура', t: 'TSUL SHOP — 2 магазина', d: 'Более 90 видов промо-продукции и юридической литературы', y: '2024' },
      { tag: 'Практика', t: 'Зарубежные стажировки', d: 'Практика в посольствах Ирана, Китая, Германии и России', y: '2024–2025' },
    ],
    spendEyebrow: 'Прозрачность',
    spendTitle: 'Куда направляются средства',
    sourcesTitle: 'Источники финансирования',
    spend: [
      { l: 'Образование и гранты', p: 48 },
      { l: 'Международные мероприятия', p: 22 },
      { l: 'Научные издания', p: 16 },
      { l: 'Инфраструктура', p: 9 },
      { l: 'Управленческие расходы', p: 5 },
    ],
    sources: [
      'Регулярные поступления от учредителей',
      'Добровольные пожертвования юридических и физических лиц',
      'Пожертвования выпускников TDYU (Alumni Association)',
      'Гранты международных организаций и финансовых институтов',
      'Доходы от предпринимательской деятельности фонда',
    ],
    reportsEyebrow: 'Отчёты и аудит',
    reportsTitle: 'Документы и годовые отчёты',
    reports: [
      { t: 'Годовой отчёт за 2024', d: '31 проект, распределение средств, ключевые показатели', date: 'Январь 2025 · UZ / RU / EN' },
      { t: 'Аудиторское заключение 2024', d: 'Заключение независимой аудиторской организации и годовой баланс', date: 'Март 2025' },
      { t: 'Устав фонда (новая редакция 2025)', d: 'Перерегистрирован в Министерстве юстиции', date: '2025 · Официальный документ' },
      { t: 'Заключение ревизионной комиссии', d: 'Результаты проверки финансово-хозяйственной деятельности', date: '2024' },
    ],
    govEyebrow: 'Управление',
    govTitle: 'Попечители · Правление · Ревизия',
    governance: [
      {
        id: 'vk',
        label: 'Попечительский совет',
        intro: 'Высший орган управления фонда. 5 членов, срок полномочий 5 лет.',
        powers: [
          'Утверждение изменений устава',
          'Формирование Правления и Ревизионной комиссии',
          'Утверждение бюджета и годового отчёта',
          'Решения о реорганизации и ликвидации',
          'Выбор аудиторской организации',
        ],
      },
      {
        id: 'bk',
        label: 'Правление',
        intro: 'Осуществляет текущее управление. Председатель: Н. Салаев.',
        powers: [
          'Общее руководство текущей деятельностью',
          'Расходование средств в рамках бюджета',
          'Поощрение сотрудников',
          'Филиалы и представительства',
          'Утверждение символики',
        ],
      },
      {
        id: 'tk',
        label: 'Ревизионная комиссия',
        intro: 'Контролирует финансовую деятельность и целевое использование средств. Не менее 3 человек.',
        powers: [
          'Оценка достоверности отчётов',
          'Информация о нарушениях бухучёта',
          'Рекомендации по устранению нарушений',
          'Предложения по повышению эффективности',
        ],
      },
    ],
    alumniEyebrow: 'Карта alumni',
    alumniTitle: 'Выпускники по всему миру',
    alumniLead: '24 страны — смотрите через фильтры.',
    mapAll: 'Все',
    mapLaw: 'Юристы',
    mapIntl: 'Международные',
    mapAcademia: 'Академия',
    mapGovt: 'Госсектор',
    alumniPoints: [
      { f: 'law', c: 'Лондон', t: 'Юристы', n: 'Aziz Karimov' },
      { f: 'intl', c: 'Женева', t: 'Международные организации', n: 'Nilufar Rashidova' },
      { f: 'academia', c: 'Гейдельберг', t: 'Академия', n: 'Zulfiya Ergasheva' },
      { f: 'govt', c: 'Ташкент', t: 'Государственная служба', n: 'Выпускники ТГЮУ' },
      { f: 'law', c: 'Сеул', t: 'Юристы', n: 'Международная практика' },
      { f: 'law', c: 'Берлин', t: 'Юристы', n: 'Программа стажировок' },
    ],
    storiesEyebrow: 'Истории',
    storiesTitle: 'Истории успеха',
    stories: [
      { i: 'AK', q: 'ТГЮУ дал мне основу для работы в международном праве. Мечта работать в лондонском офисе сбылась.', n: 'Aziz Karimov', r: 'Senior Associate, Clifford Chance · Лондон' },
      { i: 'NR', q: 'Благодаря стипендии фонда я училась в Женеве. Сегодня представляю Узбекистан в системе ООН.', n: 'Nilufar Rashidova', r: 'Legal Counsel, UN Office · Женева' },
      { i: 'ZE', q: 'При поддержке ТГЮУ и Endowment Fund мечта стать профессором в Германии стала реальностью.', n: 'Zulfiya Ergasheva', r: 'Professor, Гейдельбергский университет · Германия' },
    ],
    grantsEyebrow: 'Гранты',
    grantsTitle: 'Финансовые программы',
    grantApply: 'Подать заявку',
    grants: [
      { b: 'Основная программа', t: 'Грант на международное образование', d: 'Полное финансирование магистратуры, докторантуры или повышения квалификации.', m: ['До 1 года', '5 грантов в год', 'Заявки: март–май'] },
      { b: '', t: 'Конкурсная стипендия', d: 'Для участников национальных и международных правовых соревнований.', m: ['На каждый конкурс', 'Постоянно открыто'] },
      { b: '', t: 'Грант на научную публикацию', d: 'Покрытие расходов на статьи в авторитетных зарубежных изданиях.', m: ['С переводом', 'В течение года'] },
    ],
    newsEyebrow: 'Новости',
    newsTitle: 'Мероприятия фонда и объявления',
    news: [
      { tag: 'Международный конгресс', t: 'II Конгресс молодых академиков тюркского мира успешно проведён', d: '14 февраля 2025 года в ТГЮУ прошёл международный конгресс «Строим общее будущее».', date: '14 февраля 2025' },
      { tag: 'Издательство', t: 'Издан учебник корейского экономического права', d: 'Переведённый с корейского учебник передан университету.', date: 'Февраль 2025' },
      { tag: 'Образование', t: '42 преподавателя завершили программу Westminster', d: 'Завершён Postgraduate Certificate in Teaching and Learning.', date: 'Март 2025' },
    ],
    supportEyebrow: 'Способы поддержки',
    supportTitle: 'Как можно помочь',
    support: [
      { t: 'Пожертвование', d: 'Разовое или регулярное. Учитывается любая сумма.', cta: 'Пожертвовать', href: '/donate#calc' },
      { t: 'Связь alumni', d: 'Зарегистрируйтесь как выпускник и вступите в Alumni Association.', cta: 'Стать alumni', href: '/alumni#register' },
      { t: 'Корпоративное спонсорство', d: 'Пожертвования юридических лиц; бренд отмечается в деятельности фонда.', cta: 'Спонсорство', href: '/contact' },
      { t: 'Грант и партнёрство', d: 'Гранты и долгосрочное сотрудничество для международных организаций.', cta: 'Партнёрство', href: '/contact' },
    ],
    legalEyebrow: 'Правовая основа',
    legalTitle: 'Законы и реквизиты',
    legal: [
      { t: 'Конституция Республики Узбекистан', d: 'Основы гражданского общества, свободы ассоциаций и имущественных прав' },
      { t: 'Закон «О негосударственных некоммерческих организациях»', d: 'Порядок создания, регистрации и деятельности ННО' },
      { t: 'Закон «Об общественных фондах»', d: 'Правовой статус, управление и контроль общественных фондов' },
    ],
    alumniRegEyebrow: 'Alumni',
    alumniRegTitle: 'Присоединяйтесь к Alumni Association',
  },
  en: {
    stats: [
      { n: '31', l: 'Completed projects' },
      { n: '24', l: 'Countries with alumni' },
      { n: '400+', l: 'People supported' },
      { n: '18', l: 'International partners' },
      { n: '2023', l: 'Established' },
    ],
    mission: {
      eyebrow: 'Mission',
      title: 'Knowledge is the best investment',
      paragraphs: [
        'TDYU Endowment Fund is a public fund without membership, operating under the laws of the Republic of Uzbekistan “On Non-Governmental Non-Profit Organisations” and “On Public Funds”.',
        'The fund’s purpose is to support professional development of TSUL and Ministry of Justice staff, faculty and students at leading universities worldwide, to award grants and scholarships, and to strengthen international standing.',
        'The fund operates on principles of transparency, collegiality, mutual respect, equality and voluntary participation.',
      ],
    },
    pillars: [
      { n: '01', t: 'International education', d: 'Training and scholarships at leading universities worldwide' },
      { n: '02', t: 'International cooperation', d: 'Links with global academic organisations and universities' },
      { n: '03', t: 'Contests and awards', d: 'Support for national and international competitions' },
      { n: '04', t: 'Academic publishing', d: 'Articles and textbooks in respected international journals' },
      { n: '05', t: 'TSUL brand', d: 'Uzbek law centres and libraries abroad' },
      { n: '06', t: 'Enterprise', d: 'Courses, summer schools and other lawful activities' },
    ],
    programsEyebrow: 'Programs',
    programsTitle: '7 core programs',
    programsLead: 'The fund’s main directions — from education to publishing.',
    programs: [
      { n: '01', t: 'International internships and training', d: 'Funding study, internships and professional development at leading universities and organisations', tag: 'Student · Staff · Doctoral' },
      { n: '02', t: 'Scholarships and grants', d: 'Scholarships and grants for talented and in-need students and staff', tag: 'Financial aid' },
      { n: '03', t: 'Contests and competitions', d: 'Support for intellectual, legal, sports and educational contests', tag: 'National · International' },
      { n: '04', t: 'Research and education projects', d: 'Conferences, forums, congresses; visiting experts; translation and publishing', tag: 'Research' },
      { n: '05', t: 'International events and guests', d: 'Hosting foreign delegations; protocol and diplomacy services', tag: 'Protocol · Diplomacy' },
      { n: '06', t: 'Infrastructure and TSUL brand', d: 'Uzbek law centres, classrooms, libraries; facilities', tag: 'International standing' },
      { n: '07', t: 'Publications and translations', d: 'Legal textbook translation; international publishing; books for libraries', tag: 'Academic press' },
    ],
    projectsEyebrow: 'Projects',
    projectsTitle: 'Completed work',
    projectsLead: 'Jessup, Westminster, TSUL SHOP and other initiatives.',
    projects: [
      { tag: 'International contest', t: 'Philip C. Jessup Moot Court', d: '58 students and faculty; covering costs of international experts', y: '2024' },
      { tag: 'Publishing', t: 'Korean economic law textbook', d: 'Translated from Korean, published and delivered to the university', y: '2025' },
      { tag: 'Congress', t: 'II Turkic World Young Academics Congress', d: 'Held at TSUL in cooperation with Türkiye', y: '2025' },
      { tag: 'Education', t: 'Postgraduate Certificate — Westminster Tashkent', d: '42 faculty completed the Teaching & Learning programme', y: '2025' },
      { tag: 'Infrastructure', t: 'TSUL SHOP — 2 stores', d: '90+ promotional products and legal literature', y: '2024' },
      { tag: 'Internship', t: 'Overseas internship programmes', d: 'Placements at the embassies of Iran, China, Germany and Russia', y: '2024–2025' },
    ],
    spendEyebrow: 'Transparency',
    spendTitle: 'Where funds go',
    sourcesTitle: 'Funding sources',
    spend: [
      { l: 'Education and grants', p: 48 },
      { l: 'International events', p: 22 },
      { l: 'Academic publishing', p: 16 },
      { l: 'Infrastructure', p: 9 },
      { l: 'Administration', p: 5 },
    ],
    sources: [
      'Regular contributions from founders',
      'Voluntary donations from legal entities and individuals',
      'Donations from TSUL graduates (Alumni Association)',
      'Grants from international organisations and financial institutions',
      'Income from the fund’s lawful enterprise activity',
    ],
    reportsEyebrow: 'Reports and audit',
    reportsTitle: 'Documents and annual reports',
    reports: [
      { t: '2024 Annual activity report', d: '31 projects, allocation of funds, key indicators', date: 'January 2025 · UZ / RU / EN' },
      { t: '2024 Audit opinion', d: 'Independent auditor opinion and annual financial statement', date: 'March 2025' },
      { t: 'Fund charter (2025 revision)', d: 'Re-registered with the Ministry of Justice', date: '2025 · Official document' },
      { t: 'Audit commission opinion', d: 'Results of the financial and operational review', date: '2024' },
    ],
    govEyebrow: 'Governance',
    govTitle: 'Trustees · Management · Audit',
    governance: [
      {
        id: 'vk',
        label: 'Board of Trustees',
        intro: 'The fund’s highest governing body. 5 members, 5-year term.',
        powers: [
          'Approve charter amendments',
          'Form the Management Board and Audit Commission',
          'Approve the budget and annual report',
          'Decisions on reorganisation and liquidation',
          'Select the audit firm',
        ],
      },
      {
        id: 'bk',
        label: 'Management Board',
        intro: 'Manages day-to-day operations. Chair: N. Salayev.',
        powers: [
          'Overall management of current activity',
          'Spending within the approved budget',
          'Staff incentives',
          'Branches and representative offices',
          'Approve the emblem',
        ],
      },
      {
        id: 'tk',
        label: 'Audit Commission',
        intro: 'Oversees finances and proper use of funds. At least 3 members.',
        powers: [
          'Assess reliability of reports',
          'Report accounting irregularities',
          'Recommend corrective action',
          'Propose efficiency improvements',
        ],
      },
    ],
    alumniEyebrow: 'Alumni map',
    alumniTitle: 'Graduates around the world',
    alumniLead: '24 countries — filter to explore.',
    mapAll: 'All',
    mapLaw: 'Lawyers',
    mapIntl: 'International',
    mapAcademia: 'Academia',
    mapGovt: 'Public sector',
    alumniPoints: [
      { f: 'law', c: 'London', t: 'Lawyers', n: 'Aziz Karimov' },
      { f: 'intl', c: 'Geneva', t: 'International organisations', n: 'Nilufar Rashidova' },
      { f: 'academia', c: 'Heidelberg', t: 'Academia', n: 'Zulfiya Ergasheva' },
      { f: 'govt', c: 'Tashkent', t: 'Public service', n: 'TSUL graduates' },
      { f: 'law', c: 'Seoul', t: 'Lawyers', n: 'International practice' },
      { f: 'law', c: 'Berlin', t: 'Lawyers', n: 'Internship programme' },
    ],
    storiesEyebrow: 'Stories',
    storiesTitle: 'Success stories',
    stories: [
      { i: 'AK', q: 'TSUL gave me a foundation for a career in international law. Working in a London office became reality.', n: 'Aziz Karimov', r: 'Senior Associate, Clifford Chance · London' },
      { i: 'NR', q: 'A fund scholarship let me study in Geneva. Today I represent Uzbekistan in the UN system.', n: 'Nilufar Rashidova', r: 'Legal Counsel, UN Office · Geneva' },
      { i: 'ZE', q: 'With support from TSUL and the Endowment Fund, becoming a professor in Germany came true.', n: 'Zulfiya Ergasheva', r: 'Professor, Heidelberg University · Germany' },
    ],
    grantsEyebrow: 'Grants',
    grantsTitle: 'Funding programs',
    grantApply: 'Apply',
    grants: [
      { b: 'Core program', t: 'International education grant', d: 'Full funding for a master’s, doctorate or professional training.', m: ['Up to 1 year', '5 grants per year', 'Apply: March–May'] },
      { b: '', t: 'Contest scholarship', d: 'For participants in national and international legal competitions.', m: ['Per contest', 'Always open'] },
      { b: '', t: 'Academic publishing grant', d: 'Covers costs of publishing in respected international outlets.', m: ['Includes translation', 'Year-round'] },
    ],
    newsEyebrow: 'News',
    newsTitle: 'Fund events and announcements',
    news: [
      { tag: 'International congress', t: 'II Turkic World Young Academics Congress held successfully', d: 'On 14 February 2025 TSUL hosted the international congress “Building a shared future”.', date: '14 February 2025' },
      { tag: 'Publishing', t: 'Korean economic law textbook published', d: 'The textbook translated from Korean was delivered to the university.', date: 'February 2025' },
      { tag: 'Education', t: '42 faculty completed the Westminster programme', d: 'Postgraduate Certificate in Teaching and Learning concluded.', date: 'March 2025' },
    ],
    supportEyebrow: 'Ways to help',
    supportTitle: 'How you can support',
    support: [
      { t: 'Donation', d: 'One-off or regular. Any amount counts.', cta: 'Donate', href: '/donate#calc' },
      { t: 'Alumni network', d: 'Register as a graduate and join the Alumni Association.', cta: 'Become alumni', href: '/alumni#register' },
      { t: 'Corporate sponsorship', d: 'Donations from organisations; the brand is recognised in fund activity.', cta: 'Sponsor', href: '/contact' },
      { t: 'Grants and partnership', d: 'Grants and long-term cooperation for international organisations.', cta: 'Partner', href: '/contact' },
    ],
    legalEyebrow: 'Legal basis',
    legalTitle: 'Laws and details',
    legal: [
      { t: 'Constitution of the Republic of Uzbekistan', d: 'Foundations of civil society, freedom of association and property rights' },
      { t: 'Law “On Non-Governmental Non-Profit Organisations”', d: 'Establishment, registration and operation of NGOs' },
      { t: 'Law “On Public Funds”', d: 'Legal status, governance and oversight of public funds' },
    ],
    alumniRegEyebrow: 'Alumni',
    alumniRegTitle: 'Join the Alumni Association',
  },
} as const

export function getContent(locale: Locale) {
  return copy[locale]
}

export function impactText(locale: Locale, n: number) {
  const msg =
    locale === 'ru'
      ? n >= 5000000
        ? 'важный вклад в международную стажировку'
        : n >= 1000000
          ? 'частичная стипендия'
          : n >= 500000
            ? 'помощь в участии в мероприятии'
            : 'вклад в учебные материалы'
      : locale === 'en'
        ? n >= 5000000
          ? 'a meaningful contribution to an international internship'
          : n >= 1000000
            ? 'a partial scholarship'
            : n >= 500000
              ? 'support for event participation'
              : 'a contribution to learning materials'
        : n >= 5000000
          ? 'xalqaro stajirovka uchun muhim hissa'
          : n >= 1000000
            ? 'qisman stipendiya'
            : n >= 500000
              ? 'tadbir ishtirokiga yordam'
              : 'o‘quv materiallariga hissa'
  const formatted = n.toLocaleString(locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'uz-UZ')
  const unit = locale === 'en' ? 'UZS' : locale === 'ru' ? 'сум' : 'so‘m'
  const prefix =
    locale === 'ru' ? 'Выбранная сумма' : locale === 'en' ? 'Selected amount' : 'Tanlangan summa'
  return { formatted, unit, msg, prefix }
}
