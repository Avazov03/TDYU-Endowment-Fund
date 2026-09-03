import type { Locale } from '@/i18n/routing'

export type ProjectItem = {
  slug: string
  img: string
  date: string
  dateRu: string
  dateEn: string
  year: string
  title: string
  titleRu: string
  titleEn: string
  body: string[]
  bodyRu: string[]
  bodyEn: string[]
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'philip-c-jessup-moot-court',
    img: '/media/projects/acc-16-min.jpg',
    date: 'Noyabr 11, 2024',
    dateRu: '11 ноября 2024',
    dateEn: 'November 11, 2024',
    year: '2024',
    title: 'Philip C. Jessup Moot Court',
    titleRu: 'Philip C. Jessup Moot Court',
    titleEn: 'Philip C. Jessup Moot Court',
    body: [
      'TDYU Endowment Fund Philip C. Jessup xalqaro sud munozaralari jamoasini qo‘llab-quvvatlaydi: 58 nafar talaba va murabbiylar tayyorgarlik, onlayn mashg‘ulotlar va musobaqa bosqichlarida ishtirok etadi.',
      'Fond xorijiy ekspertlar, hakamlar va murabbiylarning ishtirok xarajatlarini qoplash orqali jamoaning xalqaro standartlarga mos tayyorgarligini ta’minlaydi.',
      'Loyiha talabalarning yuridik tahlil, og‘zaki bahs va xalqaro huquq bo‘yicha amaliy ko‘nikmalarini rivojlantirishga qaratilgan.',
    ],
    bodyRu: [
      'TDYU Endowment Fund поддерживает команду Philip C. Jessup: 58 студентов и тренеров участвуют в подготовке, онлайн-занятиях и этапах соревнования.',
      'Фонд покрывает расходы иностранных экспертов, судей и тренеров, чтобы обеспечить подготовку команды по международным стандартам.',
      'Проект развивает у студентов навыки правового анализа, устных прений и практики международного права.',
    ],
    bodyEn: [
      'TDYU Endowment Fund supports the Philip C. Jessup moot team: 58 students and coaches take part in preparation, online sessions and competition rounds.',
      'The fund covers costs for international experts, judges and coaches so the team can prepare to international standards.',
      'The project builds students’ skills in legal analysis, oral advocacy and public international law practice.',
    ],
  },
  {
    slug: 'korea-economic-law-textbook',
    img: '/media/projects/acc-16-min.jpg',
    date: 'Mart 15, 2025',
    dateRu: '15 марта 2025',
    dateEn: 'March 15, 2025',
    year: '2025',
    title: 'Koreya iqtisodiy huquqi darsligi',
    titleRu: 'Учебник по экономическому праву Кореи',
    titleEn: 'Korean economic law textbook',
    body: [
      'Fond Koreya iqtisodiy huquqi bo‘yicha darslikning koreys tilidan o‘zbek tiliga tarjimasi va nashrini moliyalashtirdi.',
      'Nashr etilgan darslik TDYU kutubxonasi va o‘quv jarayoniga topshirildi — talabalar va o‘qituvchilar uchun ochiq manba sifatida.',
      'Loyiha xalqaro huquqiy adabiyotni mahalliy auditoriyaga yetkazish va ilmiy-o‘quv bazani boyitishga xizmat qiladi.',
    ],
    bodyRu: [
      'Фонд профинансировал перевод с корейского и издание учебника по экономическому праву Кореи.',
      'Издание передано библиотеке и учебному процессу ТДЮУ — как открытый ресурс для студентов и преподавателей.',
      'Проект расширяет доступ к международной правовой литературе и укрепляет учебно-научную базу университета.',
    ],
    bodyEn: [
      'The fund financed the translation from Korean and publication of a textbook on Korean economic law.',
      'The published volume was delivered to the TSUL library and curriculum as an open resource for students and faculty.',
      'The project brings international legal literature to a local audience and enriches the academic base.',
    ],
  },
  {
    slug: 'turkic-world-young-scholars-congress',
    img: '/media/projects/acc-16-min.jpg',
    date: 'May 20, 2025',
    dateRu: '20 мая 2025',
    dateEn: 'May 20, 2025',
    year: '2025',
    title: 'II Turk dunyosi yosh akademiklar kongressi',
    titleRu: 'II Конгресс молодых учёных тюркского мира',
    titleEn: 'II Turkic World Young Scholars Congress',
    body: [
      'II Turk dunyosi yosh akademiklar kongressi Turkiya hamkorligida TDYU binosida o‘tkazildi.',
      'Fond tadbirning tashkiliy, mehmonxona va dasturiy xarajatlarini qo‘llab-quvvatlab, yosh tadqiqotchilar uchun platforma yaratdi.',
      'Kongress ilmiy almashinuv, qo‘shma nashrlar va mintaqaviy akademik tarmoqlarni mustahkamlashga qaratilgan.',
    ],
    bodyRu: [
      'II Конгресс молодых учёных тюркского мира прошёл в здании ТДЮУ при партнёрстве с Турцией.',
      'Фонд поддержал организационные, гостиничные и программные расходы, создав площадку для молодых исследователей.',
      'Конгресс укрепляет научный обмен, совместные публикации и региональные академические сети.',
    ],
    bodyEn: [
      'The II Turkic World Young Scholars Congress was held at TSUL in partnership with Türkiye.',
      'The fund supported organisational, hospitality and programme costs, creating a platform for early-career researchers.',
      'The congress strengthens scholarly exchange, joint publications and regional academic networks.',
    ],
  },
  {
    slug: 'westminster-teaching-learning',
    img: '/media/projects/acc-16-min.jpg',
    date: 'Mart 28, 2025',
    dateRu: '28 марта 2025',
    dateEn: 'March 28, 2025',
    year: '2025',
    title: 'Postgraduate Certificate — Westminster Tashkent',
    titleRu: 'Postgraduate Certificate — Westminster Tashkent',
    titleEn: 'Postgraduate Certificate — Westminster Tashkent',
    body: [
      '42 nafar TDYU professor-o‘qituvchisi Westminster Teaching & Learning dasturida Postgraduate Certificate olishdi.',
      'Dastur zamonaviy pedagogika, baholash va talabaga yo‘naltirilgan o‘qitish usullariga bag‘ishlangan; fond o‘qish va sertifikatlash xarajatlarini qo‘lladi.',
      'Natija — o‘quv sifatini oshirish, mentorlik amaliyoti va universitet ichida ilg‘or tajriba almashinuvi.',
    ],
    bodyRu: [
      '42 преподавателя ТДЮУ получили Postgraduate Certificate по программе Westminster Teaching & Learning.',
      'Программа посвящена современной педагогике, оцениванию и студентоцентричному обучению; фонд покрыл обучение и сертификацию.',
      'Результат — рост качества преподавания, практики наставничества и обмен передовым опытом внутри университета.',
    ],
    bodyEn: [
      'Forty-two TSUL faculty members earned a Postgraduate Certificate through the Westminster Teaching & Learning programme.',
      'The programme focuses on modern pedagogy, assessment and student-centred teaching; the fund covered tuition and certification.',
      'Outcomes include stronger teaching quality, mentoring practice and peer exchange of good practice across the university.',
    ],
  },
  {
    slug: 'tsul-shop-infrastructure',
    img: '/media/projects/acc-16-min.jpg',
    date: 'Sentabr 10, 2024',
    dateRu: '10 сентября 2024',
    dateEn: 'September 10, 2024',
    year: '2024',
    title: 'TSUL SHOP — 2 ta savdo do‘koni',
    titleRu: 'TSUL SHOP — 2 торговые точки',
    titleEn: 'TSUL SHOP — 2 retail stores',
    body: [
      'Fond campus ichida ikkita TSUL SHOP savdo nuqtasini ochish va jihozlashni qo‘llab-quvvatladi.',
      'Do‘konlarda 90 turdan ortiq promo mahsulotlar, suvenirlar va yuridik adabiyotlar sotiladi; tushumning bir qismi fond dasturlariga yo‘naltiriladi.',
      'Loyiha brendni mustahkamlaydi, talabalar uchun qulay xizmat yaratadi va fondning barqaror daromad manbalarini kengaytiradi.',
    ],
    bodyRu: [
      'Фонд поддержал открытие и оснащение двух торговых точек TSUL SHOP на кампусе.',
      'В магазинах продаётся более 90 видов промо-продукции, сувениров и юридической литературы; часть выручки направляется на программы фонда.',
      'Проект усиливает бренд, создаёт удобный сервис для студентов и расширяет устойчивые источники дохода фонда.',
    ],
    bodyEn: [
      'The fund supported opening and fitting out two TSUL SHOP outlets on campus.',
      'The stores offer 90+ promotional products, souvenirs and legal literature; part of proceeds fund programmes.',
      'The project strengthens the brand, serves students conveniently and widens the fund’s sustainable income streams.',
    ],
  },
  {
    slug: 'overseas-internship-programs',
    img: '/media/projects/acc-16-min.jpg',
    date: 'Iyul 5, 2025',
    dateRu: '5 июля 2025',
    dateEn: 'July 5, 2025',
    year: '2024–2025',
    title: 'Xorijiy stajirovka dasturlari',
    titleRu: 'Программы зарубежных стажировок',
    titleEn: 'Overseas internship programs',
    body: [
      'Fond talabalarning Eron, Xitoy, Germaniya va Rossiya elchixonalarida amaliyot o‘tashini qo‘llab-quvvatlaydi.',
      'Dastur transport, viza va yashash bo‘yicha qisman yordam beradi; ishtirokchilar diplomatik va yuridik amaliyot tajribasini oladi.',
      'Maqsad — xalqaro muhitda kasbiy ko‘nikmalarni mustahkamlash va bitiruvchilarning bandlik imkoniyatlarini kengaytirish.',
    ],
    bodyRu: [
      'Фонд поддерживает стажировки студентов в посольствах Ирана, Китая, Германии и России.',
      'Программа частично покрывает транспорт, визу и проживание; участники получают опыт дипломатической и юридической практики.',
      'Цель — укрепить профессиональные навыки в международной среде и расширить карьерные возможности выпускников.',
    ],
    bodyEn: [
      'The fund supports student internships at the embassies of Iran, China, Germany and Russia.',
      'The programme partly covers travel, visa and living costs; participants gain diplomatic and legal practice experience.',
      'The aim is to strengthen professional skills in an international setting and widen graduates’ employment prospects.',
    ],
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}

export function localizeProject(p: ProjectItem, locale: Locale) {
  if (locale === 'ru') {
    return { title: p.titleRu, date: p.dateRu, body: p.bodyRu }
  }
  if (locale === 'en') {
    return { title: p.titleEn, date: p.dateEn, body: p.bodyEn }
  }
  return { title: p.title, date: p.date, body: p.body }
}
