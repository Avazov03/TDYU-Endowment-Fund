import type { Locale } from '@/i18n/routing'

export type EventItem = {
  slug: string
  img: string
  video?: string
  date: string
  dateRu: string
  dateEn: string
  time: string
  title: string
  titleRu: string
  titleEn: string
  loc: string
  locRu: string
  locEn: string
  body: string[]
  bodyRu: string[]
  bodyEn: string[]
  goals: string[]
  goalsRu: string[]
  goalsEn: string[]
}

export const EVENTS: EventItem[] = [
  {
    slug: 'philip-c-jessup-moot-court',
    img: '/media/events/e-event-img-1-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Philip C. Jessup Moot Court',
    titleRu: 'Philip C. Jessup Moot Court',
    titleEn: 'Philip C. Jessup Moot Court',
    loc: 'MIOT, USA',
    locRu: 'MIOT, США',
    locEn: 'MIOT, USA',
    body: [
      'Philip C. Jessup — dunyodagi eng yirik xalqaro huquq sud munozarasi. TDYU jamoasi fond ko‘magida milliy va xalqaro bosqichlarga tayyorlanadi.',
      'Tadbirda memorandum yozish, og‘zaki bahs va hakamlar oldida himoya mashqlari o‘tkaziladi; xorijiy ekspertlar master-klass beradi.',
      'Ishtirokchilar xalqaro huquq, dalil taqdimoti va jamoa ishi bo‘yicha amaliy tajriba oladi.',
    ],
    bodyRu: [
      'Philip C. Jessup — крупнейший в мире судебный конкурс по международному праву. Команда ТДЮУ готовится к национальным и международным этапам при поддержке фонда.',
      'На мероприятии проходят практикумы по меморандумам, устным прениям и защите перед судьями; зарубежные эксперты проводят мастер-классы.',
      'Участники получают практику по международному праву, представлению доказательств и командной работе.',
    ],
    bodyEn: [
      'Philip C. Jessup is the world’s largest moot court in public international law. The TSUL team prepares for national and international rounds with fund support.',
      'The event includes memo drafting, oral advocacy drills and practice before judges; visiting experts lead masterclasses.',
      'Participants gain hands-on experience in international law, evidence presentation and teamwork.',
    ],
    goals: [
      'Xalqaro huquq bo‘yicha chuqur tahlil ko‘nikmasini oshirish',
      'Og‘zaki bahs va professional nutq madaniyatini rivojlantirish',
      'Jamoa ichida rollarni taqsimlash va ishonchli himoyani mashq qilish',
      'Xorijiy hakamlar standartlariga moslashish',
      'Milliy va xalqaro bosqichlarga tayyorlanish',
    ],
    goalsRu: [
      'Углубить навыки анализа в международном праве',
      'Развить устные прения и культуру профессиональной речи',
      'Отработать распределение ролей и уверенную защиту в команде',
      'Адаптироваться к стандартам зарубежных судей',
      'Подготовиться к национальным и международным этапам',
    ],
    goalsEn: [
      'Strengthen analytical skills in public international law',
      'Develop oral advocacy and professional speaking culture',
      'Practise role allocation and confident team defence',
      'Adapt to standards expected by international judges',
      'Prepare for national and international competition rounds',
    ],
  },
  {
    slug: 'westminster-teaching-learning',
    img: '/media/events/e-event-img-2-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Westminster Teaching & Learning',
    titleRu: 'Westminster Teaching & Learning',
    titleEn: 'Westminster Teaching & Learning',
    loc: 'ICL, UK',
    locRu: 'ICL, Великобритания',
    locEn: 'ICL, UK',
    body: [
      'Westminster Teaching & Learning dasturi TDYU o‘qituvchilarining pedagogik malakasini oshirishga qaratilgan.',
      'Sessiyalarda talabaga yo‘naltirilgan o‘qitish, baholash, feedback va kurs dizayni bo‘yicha amaliy mashg‘ulotlar o‘tkaziladi.',
      'Dastur yakunida ishtirokchilar Postgraduate Certificate yo‘nalishida sertifikat olishga da’vogar bo‘lishadi.',
    ],
    bodyRu: [
      'Программа Westminster Teaching & Learning повышает педагогическую квалификацию преподавателей ТДЮУ.',
      'На сессиях отрабатывают студентоцентричное обучение, оценивание, обратную связь и дизайн курса.',
      'По итогам участники претендуют на сертификат по направлению Postgraduate Certificate.',
    ],
    bodyEn: [
      'The Westminster Teaching & Learning programme develops TSUL faculty pedagogical skills.',
      'Sessions cover student-centred teaching, assessment, feedback and course design with hands-on workshops.',
      'On completion, participants are eligible for a Postgraduate Certificate pathway.',
    ],
    goals: [
      'Zamonaviy pedagogika usullarini o‘zlashtirish',
      'Baholash va constructive feedback amaliyotini joriy etish',
      'Kurs va modul dizaynini yaxshilash',
      'Talaba faolligini oshiruvchi usullarni qo‘llash',
      'Hamkasblar bilan tajriba almashish',
    ],
    goalsRu: [
      'Освоить современные педагогические методы',
      'Внедрить практику оценивания и конструктивной обратной связи',
      'Улучшить дизайн курсов и модулей',
      'Применять приёмы повышения вовлечённости студентов',
      'Обмениваться опытом с коллегами',
    ],
    goalsEn: [
      'Master modern pedagogy methods',
      'Apply sound assessment and constructive feedback practice',
      'Improve course and module design',
      'Use techniques that raise student engagement',
      'Exchange practice with peer faculty',
    ],
  },
  {
    slug: 'tsul-shop-infrastructure',
    img: '/media/events/e-event-img-3-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'TSUL SHOP infratuzilmasi',
    titleRu: 'Инфраструктура TSUL SHOP',
    titleEn: 'TSUL SHOP infrastructure',
    loc: 'Stanford Universiteti, AQSH',
    locRu: 'Стэнфордский университет, США',
    locEn: 'Stanford University, USA',
    body: [
      'TSUL SHOP infratuzilmasi loyihasi campus ichida brend do‘konlarini ochish, jihozlash va assortimentni kengaytirishga bag‘ishlangan.',
      'Tadbirda logistika, vizual merchandising va fond dasturlariga yo‘naltiriladigan tushumlarni hisobga olish muhokama qilinadi.',
      'Natija — talabalar uchun qulay xizmat, universitet brendining ko‘rinishi va fondning barqaror daromad manbai.',
    ],
    bodyRu: [
      'Проект инфраструктуры TSUL SHOP посвящён открытию, оснащению и расширению ассортимента брендовых магазинов на кампусе.',
      'На мероприятии обсуждают логистику, визуальный мерчандайзинг и учёт выручки, направляемой на программы фонда.',
      'Результат — удобный сервис для студентов, видимость бренда университета и устойчивый источник дохода фонда.',
    ],
    bodyEn: [
      'The TSUL SHOP infrastructure project covers opening, fitting out and expanding branded campus stores.',
      'The event discusses logistics, visual merchandising and accounting for proceeds directed to fund programmes.',
      'Outcomes include convenient student service, stronger university brand presence and a sustainable income stream for the fund.',
    ],
    goals: [
      'Do‘kon infratuzilmasini ishga tushirish rejasini belgilash',
      'Assortiment va brend standartlarini kelishish',
      'Tushumlarni fond dasturlariga yo‘naltirish mexanizmini aniqlash',
      'Talabalar uchun xizmat sifatini oshirish',
      'Hisobotlilik va shaffoflik talablarini mustahkamlash',
    ],
    goalsRu: [
      'Утвердить план запуска инфраструктуры магазинов',
      'Согласовать ассортимент и бренд-стандарты',
      'Определить механизм направления выручки на программы фонда',
      'Повысить качество сервиса для студентов',
      'Укрепить требования к отчётности и прозрачности',
    ],
    goalsEn: [
      'Set a launch plan for store infrastructure',
      'Agree assortment and brand standards',
      'Define how proceeds flow to fund programmes',
      'Improve service quality for students',
      'Reinforce reporting and transparency requirements',
    ],
  },
  {
    slug: 'overseas-internship-programs',
    img: '/media/events/e-event-img-4-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Xorijiy stajirovka dasturlari',
    titleRu: 'Программы зарубежных стажировок',
    titleEn: 'Overseas internship programs',
    loc: 'Harvard Universiteti, AQSH',
    locRu: 'Гарвардский университет, США',
    locEn: 'Harvard University, USA',
    body: [
      'Xorijiy stajirovka dasturlari talabalarni elchixonalar va xalqaro tashkilotlarda amaliyotga tayyorlaydi.',
      'Tadbirda ariza topshirish, viza, madaniy moslashuv va kasbiy etika bo‘yicha maslahatlar beriladi.',
      'Fond qisman transport va yashash xarajatlarini qoplaydi; ishtirokchilar diplomatik va yuridik amaliyot tajribasini oladi.',
    ],
    bodyRu: [
      'Программы зарубежных стажировок готовят студентов к практике в посольствах и международных организациях.',
      'На мероприятии дают консультации по подаче заявок, визам, культурной адаптации и профессиональной этике.',
      'Фонд частично покрывает транспорт и проживание; участники получают опыт дипломатической и юридической практики.',
    ],
    bodyEn: [
      'Overseas internship programmes prepare students for placements in embassies and international organisations.',
      'The event covers applications, visas, cultural adaptation and professional ethics.',
      'The fund partly covers travel and living costs; participants gain diplomatic and legal practice experience.',
    ],
    goals: [
      'Amaliyot joylarini va tanlov mezonlarini tushunish',
      'Ariza va hujjatlar paketini tayyorlash',
      'Xalqaro muhitda kasbiy odobni o‘zlashtirish',
      'Viza va logistika bosqichlarini rejalashtirish',
      'Tajriba hisobotini fondga topshirish tartibini bilish',
    ],
    goalsRu: [
      'Понять места стажировок и критерии отбора',
      'Подготовить пакет заявок и документов',
      'Освоить профессиональный этикет в международной среде',
      'Спланировать визовые и логистические этапы',
      'Знать порядок отчёта о практике для фонда',
    ],
    goalsEn: [
      'Understand placement options and selection criteria',
      'Prepare application and document packages',
      'Adopt professional etiquette in an international setting',
      'Plan visa and logistics steps',
      'Know how to submit an internship report to the fund',
    ],
  },
  {
    slug: 'transformational-leadership-holistic-student-development-forum',
    img: '/media/events/e-event-img-5-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Transformatsion yetakchilik va talaba rivoji forumi',
    titleRu: 'Форум трансформационного лидерства и развития студентов',
    titleEn: 'Transformational Leadership & Holistic Student Development Forum',
    loc: 'Kembrij Universiteti, Buyuk Britaniya',
    locRu: 'Кембриджский университет, Великобритания',
    locEn: 'University of Cambridge, UK',
    body: [
      'Forum talaba yetakchiligi, mentorlik va yaxlit shaxsiy rivojlanish modellarini muhokama qiladi.',
      'Ishtirokchilar soft skills, jamoaviy loyihalar va universitet jamoasiga hissa qo‘shish amaliyotlarini o‘rganadi.',
      'Fond bitiruvchilar va talaba klublari bilan hamkorlikda dastur sifatini oshirishga e’tibor qaratadi.',
    ],
    bodyRu: [
      'Форум обсуждает модели студенческого лидерства, наставничества и целостного личностного развития.',
      'Участники осваивают soft skills, командные проекты и практики вклада в университетское сообщество.',
      'Фонд вместе с выпускниками и студенческими клубами фокусируется на повышении качества программ.',
    ],
    bodyEn: [
      'The forum discusses student leadership, mentoring and holistic personal development models.',
      'Participants explore soft skills, team projects and ways to contribute to the university community.',
      'Together with alumni and student clubs, the fund focuses on raising programme quality.',
    ],
    goals: [
      'Yetakchilik uslublarini amaliyotda sinash',
      'Mentor–talaba munosabatini mustahkamlash',
      'Yaxlit rivojlanish rejasini tuzish',
      'Jamoaviy loyihalarda mas’uliyatni oshirish',
      'Universitet hayotiga faol ishtirokni rag‘batlantirish',
    ],
    goalsRu: [
      'Практически опробовать стили лидерства',
      'Укрепить отношения наставник–студент',
      'Составить план целостного развития',
      'Повысить ответственность в командных проектах',
      'Стимулировать активное участие в жизни университета',
    ],
    goalsEn: [
      'Practise leadership styles in real scenarios',
      'Strengthen mentor–student relationships',
      'Draft a holistic development plan',
      'Raise accountability in team projects',
      'Encourage active participation in university life',
    ],
  },
  {
    slug: 'entrepreneurial-vision-business-innovation-startup-summit',
    img: '/media/events/e-event-img-6-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Tadbirkorlik, innovatsiya va startap sammiti',
    titleRu: 'Саммит предпринимательства, инноваций и стартапов',
    titleEn: 'Entrepreneurial Vision, Business Innovation & Startup Summit',
    loc: 'SFIT, Shveysariya',
    locRu: 'SFIT, Швейцария',
    locEn: 'SFIT, Switzerland',
    body: [
      'Sammit yuridik ta’lim bitiruvchilari uchun tadbirkorlik, innovatsiya va startap ekotizimini ochib beradi.',
      'Panel sessiyalarda biznes-model, IP himoyasi va investorlar bilan muloqot ko‘nikmalari muhokama qilinadi.',
      'Fond istiqbolli tashabbuslarni grant va maslahat bilan qo‘llab-quvvatlash yo‘llarini taqdim etadi.',
    ],
    bodyRu: [
      'Саммит раскрывает экосистему предпринимательства, инноваций и стартапов для выпускников юридического образования.',
      'На панелях обсуждают бизнес-модели, защиту ИС и навыки общения с инвесторами.',
      'Фонд показывает пути поддержки перспективных инициатив грантами и консультациями.',
    ],
    bodyEn: [
      'The summit opens the entrepreneurship, innovation and startup ecosystem for law graduates.',
      'Panels cover business models, IP protection and investor communication skills.',
      'The fund outlines how grants and mentoring can support promising initiatives.',
    ],
    goals: [
      'Biznes g‘oyani aniq ifodalash',
      'Huquqiy xavflarni oldindan baholash',
      'Investor pitch tuzilmasini o‘rganish',
      'IP va shartnomaviy himoyani tushunish',
      'Fond va partnerlar bilan aloqa o‘rnatish',
    ],
    goalsRu: [
      'Чётко сформулировать бизнес-идею',
      'Заранее оценить правовые риски',
      'Изучить структуру investor pitch',
      'Понять защиту ИС и договорные механизмы',
      'Наладить контакт с фондом и партнёрами',
    ],
    goalsEn: [
      'Articulate a clear business idea',
      'Assess legal risks early',
      'Learn investor pitch structure',
      'Understand IP and contractual protection',
      'Build links with the fund and partners',
    ],
  },
  {
    slug: 'education-global-learning-cultural-exchange-conference',
    img: '/media/events/e-event-img-7-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Ta’lim, global o‘qish va madaniy almashinuv konferensiyasi',
    titleRu: 'Конференция по образованию, глобальному обучению и культурному обмену',
    titleEn: 'Education, Global Learning & Cultural Exchange Conference',
    loc: 'NUS, Singapur',
    locRu: 'NUS, Сингапур',
    locEn: 'NUS, Singapore',
    body: [
      'Konferensiya xalqaro ta’lim mobilligi, qo‘shma dasturlar va madaniy almashinuv amaliyotlarini birlashtiradi.',
      'Ishtirokchilar dual diploma, qisqa muddatli almashinuv va online learning formatlarini solishtiradi.',
      'Fond TDYU talabalari uchun global o‘qish imkoniyatlarini kengaytirish strategiyasini muhokama qiladi.',
    ],
    bodyRu: [
      'Конференция объединяет практики международной образовательной мобильности, совместных программ и культурного обмена.',
      'Участники сравнивают двойные дипломы, краткосрочные обмены и форматы онлайн-обучения.',
      'Фонд обсуждает стратегию расширения глобальных возможностей обучения для студентов ТДЮУ.',
    ],
    bodyEn: [
      'The conference brings together international education mobility, joint programmes and cultural exchange practice.',
      'Participants compare dual degrees, short exchanges and online learning formats.',
      'The fund discusses strategies to widen global learning opportunities for TSUL students.',
    ],
    goals: [
      'Mobillik dasturlarini tanlash mezonlarini bilish',
      'Madaniy kompetentsiyani rivojlantirish',
      'Qo‘shma dastur imkoniyatlarini aniqlash',
      'Kredit transfer va akkreditatsiyani tushunish',
      'Xalqaro hamkorlik tarmog‘ini kengaytirish',
    ],
    goalsRu: [
      'Знать критерии выбора программ мобильности',
      'Развивать культурную компетентность',
      'Выявить возможности совместных программ',
      'Понять перевод кредитов и аккредитацию',
      'Расширить сеть международного партнёрства',
    ],
    goalsEn: [
      'Know criteria for choosing mobility programmes',
      'Develop intercultural competence',
      'Identify joint-programme opportunities',
      'Understand credit transfer and accreditation',
      'Expand the international partnership network',
    ],
  },
  {
    slug: 'academic-recognition-student-achievement-ceremony',
    img: '/media/events/e-event-img-8-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Akademik e’tirof va talaba yutuqlari marosimi',
    titleRu: 'Церемония академического признания и студенческих достижений',
    titleEn: 'Academic Recognition & Student Achievement Ceremony',
    loc: 'UCL, Buyuk Britaniya',
    locRu: 'UCL, Великобритания',
    locEn: 'UCL, UK',
    body: [
      'Marosim fond grantlari, tanlov g‘oliblari va ilmiy nashr mualliflarini e’tirof etadi.',
      'Tadbirda stipendiyalar, sertifikatlar va mentorlik imkoniyatlari e’lon qilinadi.',
      'Maqsad — yutuqlarni ochiq nishonlash va keyingi avlod talabalarini rag‘batlantirish.',
    ],
    bodyRu: [
      'Церемония отмечает грантополучателей фонда, победителей конкурсов и авторов научных публикаций.',
      'На мероприятии объявляют стипендии, сертификаты и возможности наставничества.',
      'Цель — открыто отметить достижения и вдохновить следующее поколение студентов.',
    ],
    bodyEn: [
      'The ceremony recognises fund grantees, contest winners and authors of academic publications.',
      'Scholarships, certificates and mentoring opportunities are announced at the event.',
      'The aim is to celebrate achievement openly and inspire the next cohort of students.',
    ],
    goals: [
      'Yutuqlarni shaffof mezonlar asosida e’tirof etish',
      'Grant va stipendiya natijalarini e’lon qilish',
      'Mentorlik bog‘lanishlarini mustahkamlash',
      'Jamoatchilikka fond ishlarini ko‘rsatish',
      'Talabalarni yangi tanlovlarga undash',
    ],
    goalsRu: [
      'Признать достижения по прозрачным критериям',
      'Объявить результаты грантов и стипендий',
      'Укрепить наставнические связи',
      'Показать общественности работу фонда',
      'Мотивировать студентов к новым конкурсам',
    ],
    goalsEn: [
      'Recognise achievement against transparent criteria',
      'Announce grant and scholarship outcomes',
      'Strengthen mentoring connections',
      'Show the fund’s work to the wider community',
      'Encourage students toward new contests',
    ],
  },
  {
    slug: 'community-engagement-social-impact-excellence-summit',
    img: '/media/events/e-event-img-9-min.jpg',
    date: 'Avgust 4, 2025',
    dateRu: '4 августа 2025',
    dateEn: 'August 4, 2025',
    time: '09:00 AM - 03:40 PM',
    title: 'Jamiyat ishtiroki va ijtimoiy ta’sir sammiti',
    titleRu: 'Саммит вовлечения сообщества и социального воздействия',
    titleEn: 'Community Engagement & Social Impact Excellence Summit',
    loc: 'Caltech, AQSH',
    locRu: 'Caltech, США',
    locEn: 'Caltech, USA',
    body: [
      'Sammit fondning jamiyat bilan ishlash, pro bono va ijtimoiy loyihalarini baholashga bag‘ishlangan.',
      'Ishtirokchilar ta’sirni o‘lchash, hisobot va volunteer dasturlarini muhokama qiladi.',
      'Natija — ochiq, o‘lchanadigan va takrorlanadigan ijtimoiy ta’sir amaliyoti.',
    ],
    bodyRu: [
      'Саммит посвящён работе фонда с сообществом, pro bono и оценке социальных проектов.',
      'Участники обсуждают измерение воздействия, отчётность и волонтёрские программы.',
      'Результат — открытая, измеримая и воспроизводимая практика социального воздействия.',
    ],
    bodyEn: [
      'The summit focuses on the fund’s community work, pro bono activity and social-project evaluation.',
      'Participants discuss impact measurement, reporting and volunteer programmes.',
      'The outcome is open, measurable and repeatable social-impact practice.',
    ],
    goals: [
      'Ijtimoiy ta’sir ko‘rsatkichlarini belgilash',
      'Pro bono va volunteer dasturlarini rejalashtirish',
      'Hisobot va shaffoflikni yaxshilash',
      'Mahalliy hamkorlarni jalb qilish',
      'Muvaffaqiyatli loyihalarni masshtablash',
    ],
    goalsRu: [
      'Определить показатели социального воздействия',
      'Спланировать pro bono и волонтёрские программы',
      'Улучшить отчётность и прозрачность',
      'Привлечь местных партнёров',
      'Масштабировать успешные проекты',
    ],
    goalsEn: [
      'Define social-impact indicators',
      'Plan pro bono and volunteer programmes',
      'Improve reporting and transparency',
      'Engage local partners',
      'Scale successful projects',
    ],
  },
]

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug)
}

export function localizeEvent(e: EventItem, locale: Locale) {
  const pick = <T,>(uz: T, ru: T, en: T) => {
    if (locale === 'ru') return (typeof ru === 'string' ? String(ru).trim() : ru) ? ru : uz
    if (locale === 'en') return (typeof en === 'string' ? String(en).trim() : en) ? en : uz
    return uz
  }
  return {
    title: pick(e.title, e.titleRu, e.titleEn),
    loc: pick(e.loc, e.locRu, e.locEn),
    date: pick(e.date, e.dateRu, e.dateEn),
    body: locale === 'ru' ? (e.bodyRu?.length ? e.bodyRu : e.body) : locale === 'en' ? (e.bodyEn?.length ? e.bodyEn : e.body) : e.body,
    time: e.time,
    goals: locale === 'ru' ? (e.goalsRu?.length ? e.goalsRu : e.goals) : locale === 'en' ? (e.goalsEn?.length ? e.goalsEn : e.goals) : e.goals,
  }
}
