import type { Locale } from '@/i18n/routing'

export type ProgramDirection = '01' | '02' | '03' | '04' | '05' | '06' | '07'
export type ProgramAudience = 'talaba' | 'xodim' | 'doktorant' | 'alumni' | 'hamkor'
export type ProgramFunding = 'full' | 'partial' | 'donate'

export type Program = {
  id: ProgramDirection
  direction: ProgramDirection
  audiences: ProgramAudience[]
  funding: ProgramFunding[]
  img: string
  relatedHref: string
  relatedLabel: { uz: string; ru: string; en: string }
  uz: { t: string; d: string; tags: string[]; body: string[] }
  ru: { t: string; d: string; tags: string[]; body: string[] }
  en: { t: string; d: string; tags: string[]; body: string[] }
}

/** Dump all-programs (7888) — 7 dastur; batafsil `/programs/[id]` */
export const PROGRAMS: Program[] = [
  {
    id: '01',
    direction: '01',
    audiences: ['talaba', 'xodim', 'doktorant'],
    funding: ['full', 'partial'],
    img: '/media/dump/programs/acc-1-min.jpg',
    relatedHref: '/grants',
    relatedLabel: { uz: 'Grantlarga o‘tish', ru: 'К грантам', en: 'Go to grants' },
    uz: {
      t: 'Xalqaro stajirovkalar va malaka oshirish',
      d: 'Dunyo yetakchi universitetlari va xalqaro tashkilotlarda tahsil, stajirovka va malaka oshirish.',
      tags: ['01 - Xalqaro stajirovka', 'Talaba'],
      body: [
        'Dastur talaba, xodim va doktorantlarga yetakchi xorijiy universitet va tashkilotlarda stajirovka, qisqa kurs va malaka oshirish imkonini beradi.',
        'Nomzodlar akademikk natija, til darajasi va motivatsiya asosida tanlanadi. Fond transport, yashash yoki dastur to‘lovining bir qismini qoplayishi mumkin.',
        'Ariza muddati ochilganda grantlar sahifasi va yangiliklar bo‘limida e’lon qilinadi.',
      ],
    },
    ru: {
      t: 'Международные стажировки и повышение квалификации',
      d: 'Обучение, стажировки и повышение квалификации в ведущих университетах и организациях.',
      tags: ['01 - Стажировка', 'Студент'],
      body: [
        'Программа даёт студентам, сотрудникам и докторантам доступ к стажировкам и краткосрочным курсам в ведущих зарубежных вузах и организациях.',
        'Отбор — по академическим результатам, языку и мотивации. Фонд может покрыть часть транспортных и прожиточных расходов.',
        'Сроки подачи объявляются на странице грантов и в новостях.',
      ],
    },
    en: {
      t: 'International internships and professional development',
      d: 'Study, internships and training at leading universities and organisations.',
      tags: ['01 - Internship', 'Student'],
      body: [
        'The programme offers students, staff and doctoral candidates internships and short courses at leading universities and organisations abroad.',
        'Selection is based on academic results, language level and motivation. The fund may cover part of travel or living costs.',
        'Application windows are announced on the grants page and in news.',
      ],
    },
  },
  {
    id: '02',
    direction: '02',
    audiences: ['talaba', 'xodim', 'alumni'],
    funding: ['full', 'partial', 'donate'],
    img: '/media/dump/programs/acc-2-min.jpg',
    relatedHref: '/grants',
    relatedLabel: { uz: 'Grant arizasi', ru: 'Заявка на грант', en: 'Grant application' },
    uz: {
      t: 'Stipendiya va grantlar',
      d: 'Iqtidorli va ehtiyojmand talaba, xodimlar uchun stipendiya va grantlar.',
      tags: ['02 - Stipendiya va grant', 'Talaba'],
      body: [
        'Fond iqtidorli va ehtiyojmand talaba hamda xodimlarga stipendiya va maqsadli grantlar ajratadi.',
        'Yo‘nalishlar: ta’lim, ilmiy nashr, stajirovka va ijtimoiy loyihalar. Shartlar ochiq tanlov orqali e’lon qilinadi.',
        'Ariza topshirish uchun grantlar sahifasidagi forma va hujjatlar ro‘yxatidan foydalaning.',
      ],
    },
    ru: {
      t: 'Стипендии и гранты',
      d: 'Стипендии и гранты для талантливых и нуждающихся студентов и сотрудников.',
      tags: ['02 - Стипендии и гранты', 'Студент'],
      body: [
        'Фонд выделяет стипендии и целевые гранты талантливым и нуждающимся студентам и сотрудникам.',
        'Направления: образование, публикации, стажировки и социальные проекты.',
        'Подавайте заявку через форму на странице грантов.',
      ],
    },
    en: {
      t: 'Scholarships and grants',
      d: 'Scholarships and grants for talented and in-need students and staff.',
      tags: ['02 - Scholarships', 'Student'],
      body: [
        'The fund awards scholarships and targeted grants to talented and in-need students and staff.',
        'Focus areas include education, publications, internships and social projects.',
        'Apply via the form on the grants page.',
      ],
    },
  },
  {
    id: '03',
    direction: '03',
    audiences: ['talaba', 'doktorant'],
    funding: ['partial', 'donate'],
    img: '/media/dump/programs/acc-3-min.jpg',
    relatedHref: '/events',
    relatedLabel: { uz: 'Tadbirlar', ru: 'Мероприятия', en: 'Events' },
    uz: {
      t: 'Tanlovlar va musobaqalar',
      d: 'Intellektual, huquqiy, sport va ma’rifiy tanlovlarda ishtirokni qo‘llab-quvvatlash.',
      tags: ['03 - Tanlovlar', 'Talaba'],
      body: [
        'Dastur Jessup, debat, sport va ma’rifiy tanlovlarda ishtirok xarajatlarini qo‘llab-quvvatlaydi.',
        'Jamoa murabbiyligi, adabiyot va sayohat xarajatlarining bir qismi fond hisobidan qoplanishi mumkin.',
        'Yaqin tanlovlar tadbirlar va yangiliklar sahifalarida e’lon qilinadi.',
      ],
    },
    ru: {
      t: 'Конкурсы и соревнования',
      d: 'Поддержка участия в интеллектуальных, правовых, спортивных и просветительских конкурсах.',
      tags: ['03 - Конкурсы', 'Студент'],
      body: [
        'Программа поддерживает участие в Jessup, дебатах, спортивных и просветительских конкурсах.',
        'Фонд может покрыть часть расходов на коучинг, литературу и поездки.',
        'Ближайшие конкурсы публикуются в событиях и новостях.',
      ],
    },
    en: {
      t: 'Contests and competitions',
      d: 'Support for intellectual, legal, sports and educational contests.',
      tags: ['03 - Contests', 'Student'],
      body: [
        'The programme supports participation in Jessup, debates, sports and educational contests.',
        'The fund may cover part of coaching, materials and travel costs.',
        'Upcoming contests are listed under events and news.',
      ],
    },
  },
  {
    id: '04',
    direction: '04',
    audiences: ['xodim', 'doktorant', 'talaba'],
    funding: ['full', 'partial'],
    img: '/media/dump/programs/acc-4-min.jpg',
    relatedHref: '/projects',
    relatedLabel: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' },
    uz: {
      t: 'Ilmiy va ta’limiy loyihalar',
      d: 'Konferensiyalar, forumlar, kongresslar; xorijiy mutaxassislar; tarjima va nashr.',
      tags: ['04 - Ilmiy loyihalar', 'Tadqiqotchi'],
      body: [
        'Ilmiy konferensiya, kongress va qo‘shma tadqiqotlarni qo‘llab-quvvatlash dasturi.',
        'Xorijiy mutaxassislar tashrifi, tarjima va nashr xarajatlari fond ustuvorliklariga mos hollarda qoplanadi.',
        'Amaldagi loyihalar ro‘yxati loyihalar sahifasida.',
      ],
    },
    ru: {
      t: 'Научные и образовательные проекты',
      d: 'Конференции, форумы, конгрессы; иностранные специалисты; перевод и издание.',
      tags: ['04 - Научные проекты', 'Исследователь'],
      body: [
        'Программа поддержки научных конференций, конгрессов и совместных исследований.',
        'Визиты экспертов, переводы и публикации финансируются при соответствии приоритетам фонда.',
        'Актуальные проекты — на странице проектов.',
      ],
    },
    en: {
      t: 'Research and education projects',
      d: 'Conferences, forums, congresses; visiting experts; translation and publishing.',
      tags: ['04 - Research', 'Researcher'],
      body: [
        'Support for academic conferences, congresses and joint research.',
        'Expert visits, translation and publishing may be funded when aligned with fund priorities.',
        'Current projects are listed on the projects page.',
      ],
    },
  },
  {
    id: '05',
    direction: '05',
    audiences: ['hamkor', 'alumni', 'xodim'],
    funding: ['partial', 'donate'],
    img: '/media/dump/programs/acc-5-min.jpg',
    relatedHref: '/events',
    relatedLabel: { uz: 'Tadbirlar', ru: 'Мероприятия', en: 'Events' },
    uz: {
      t: 'Xalqaro tadbirlar va mehmonlar',
      d: 'Xorijiy delegatsiyalar, protokol va diplomatiya xizmatlari.',
      tags: ['05 - Xalqaro tadbirlar', 'Alumni'],
      body: [
        'Xorijiy delegatsiya, forum va protokol tadbirlarini tashkil etishni qo‘llab-quvvatlash.',
        'Alumni va hamkor tashkilotlar tadbirlarni birgalikda o‘tkazishi mumkin.',
        'Kalendar tadbirlar sahifasida yangilanadi.',
      ],
    },
    ru: {
      t: 'Международные мероприятия и гости',
      d: 'Иностранные делегации, протокол и дипломатические услуги.',
      tags: ['05 - Мероприятия', 'Alumni'],
      body: [
        'Поддержка организации иностранных делегаций, форумов и протокольных мероприятий.',
        'Alumni и партнёры могут проводить события совместно с фондом.',
        'Календарь обновляется на странице мероприятий.',
      ],
    },
    en: {
      t: 'International events and guests',
      d: 'Foreign delegations, protocol and diplomacy services.',
      tags: ['05 - Events', 'Alumni'],
      body: [
        'Support for foreign delegations, forums and protocol events.',
        'Alumni and partners may co-host events with the fund.',
        'The calendar is updated on the events page.',
      ],
    },
  },
  {
    id: '06',
    direction: '06',
    audiences: ['hamkor', 'alumni'],
    funding: ['donate', 'partial'],
    img: '/media/dump/programs/acc-6-min.jpg',
    relatedHref: '/projects',
    relatedLabel: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' },
    uz: {
      t: 'Infratuzilma va TSUL brendi',
      d: '“O‘zbek huquqiy markazlari”, auditoriyalar, kutubxonalar, moddiy-texnik baza.',
      tags: ['06 - Infratuzilma', 'Alumni'],
      body: [
        'Auditoriya, kutubxona va huquqiy markazlar infratuzilmasini rivojlantirish.',
        'Xayriya va hamkorlik orqali moddiy-texnik baza yangilanadi.',
        'Loyiha hisobotlari shaffoflik sahifasida e’lon qilinadi.',
      ],
    },
    ru: {
      t: 'Инфраструктура и бренд TSUL',
      d: 'Центры узбекского права, аудитории, библиотеки, материально-техническая база.',
      tags: ['06 - Инфраструктура', 'Alumni'],
      body: [
        'Развитие аудиторий, библиотек и правовых центров.',
        'База обновляется за счёт пожертвований и партнёрств.',
        'Отчёты публикуются на странице прозрачности.',
      ],
    },
    en: {
      t: 'Infrastructure and TSUL brand',
      d: 'Uzbek law centres, classrooms, libraries and facilities.',
      tags: ['06 - Infrastructure', 'Alumni'],
      body: [
        'Development of classrooms, libraries and law centres.',
        'Facilities are upgraded through donations and partnerships.',
        'Reports are published on the transparency page.',
      ],
    },
  },
  {
    id: '07',
    direction: '07',
    audiences: ['xodim', 'doktorant', 'alumni'],
    funding: ['partial', 'donate'],
    img: '/media/programs/p7.jpg',
    relatedHref: '/projects',
    relatedLabel: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' },
    uz: {
      t: 'Nashrlar va tarjimalar',
      d: 'Huquqiy darsliklar tarjimasi, xorijiy nashrlar va kutubxonaga adabiyot taqdimi.',
      tags: ['07 - Nashrlar', 'Tarjima'],
      body: [
        'Huquqiy darslik tarjimasi, xorijiy jurnal nashrlari va kutubxona to‘ldirish dasturi.',
        'Tadqiqotchilar nashr xarajatlarini qoplash uchun alohida grantga ariza berishi mumkin.',
        'Yangi nashrlar yangiliklar sahifasida e’lon qilinadi.',
      ],
    },
    ru: {
      t: 'Издания и переводы',
      d: 'Перевод правовых учебников, зарубежные издания и литература для библиотек.',
      tags: ['07 - Издания', 'Перевод'],
      body: [
        'Программа перевода учебников, зарубежных публикаций и пополнения библиотек.',
        'Исследователи могут подать заявку на покрытие расходов на публикацию.',
        'Новые издания анонсируются в новостях.',
      ],
    },
    en: {
      t: 'Publications and translations',
      d: 'Legal textbook translation, international publishing and books for libraries.',
      tags: ['07 - Publications', 'Translation'],
      body: [
        'Support for textbook translation, international publishing and library acquisitions.',
        'Researchers may apply for publication-cost grants.',
        'New releases are announced in news.',
      ],
    },
  },
]

export function getProgram(id: string) {
  return PROGRAMS.find((p) => p.id === id)
}

export function localizeProgram(p: Program, locale: Locale) {
  return locale === 'ru' ? p.ru : locale === 'en' ? p.en : p.uz
}
