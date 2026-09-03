import type { Locale } from '@/i18n/routing'

export type BoardMember = {
  id: string
  slug: string
  img: string
  name: string
  nameRu: string
  nameEn: string
  role: string
  roleRu: string
  roleEn: string
  about: string
  aboutRu: string
  aboutEn: string
  quals: string[]
  qualsRu: string[]
  qualsEn: string[]
}

export const BOARD_DETAIL: BoardMember[] = [
  {
    id: 'vasiylik-kengashi',
    slug: 'kathryn-murphy',
    img: '/media/dump/board/e-bl-team-6-min.jpg',
    name: `Vasiylik kengashi`,
    nameRu: `Попечительский совет`,
    nameEn: `Board of Trustees`,
    role: `Mentor`,
    roleRu: `Наставник`,
    roleEn: `Mentor`,
    about: `Vasiylik kengashi TDYU Endowment Fondining uzoq muddatli strategiyasi, investitsiya yo‘nalishlari va ta’lim dasturlariga yo‘naltirilgan mablag‘lardan foydalanish bo‘yicha nazoratni amalga oshiradi. Kengash fond missiyasiga sodiqlik, shaffoflik va barqaror rivojlanishni ta’minlash uchun asosiy qarorlarni ko‘rib chiqadi.`,
    aboutRu: `Попечительский совет осуществляет надзор за долгосрочной стратегией TDYU Endowment Fund, инвестиционными приоритетами и целевым использованием средств на образовательные программы. Совет рассматривает ключевые решения, обеспечивая верность миссии фонда, прозрачность и устойчивое развитие.`,
    aboutEn: `The Board of Trustees oversees the long-term strategy of the TDYU Endowment Fund, investment priorities, and the purposeful use of resources for educational programmes. The board reviews major decisions to uphold the fund’s mission, transparency, and sustainable growth.`,
    quals: [
      `Endowment strategiyasi va boshqaruv nazorati`,
      `Investitsiya siyosati va risklarni baholash`,
      `Ta’lim grantlari va stipendiyalar nazorati`,
      `Moliyaviy hisobotlarning shaffofligi`,
      `Benefisiarlar manfaatlarini himoya qilish`,
      `Uzoq muddatli barqarorlik rejalashtirish`,
    ],
    qualsRu: [
      `Стратегия эндаумента и надзор за управлением`,
      `Инвестиционная политика и оценка рисков`,
      `Контроль образовательных грантов и стипендий`,
      `Прозрачность финансовой отчётности`,
      `Защита интересов бенефициаров`,
      `Планирование долгосрочной устойчивости`,
    ],
    qualsEn: [
      `Endowment strategy and governance oversight`,
      `Investment policy and risk assessment`,
      `Oversight of education grants and scholarships`,
      `Financial reporting transparency`,
      `Protection of beneficiary interests`,
      `Long-term sustainability planning`,
    ],
  },
  {
    id: 'boshqaruv-kengashi',
    slug: 'savannah-nguyen',
    img: '/media/dump/board/e-bl-team-5-min.jpg',
    name: `Boshqaruv kengashi`,
    nameRu: `Правление`,
    nameEn: `Management Board`,
    role: `Maslahatchi`,
    roleRu: `Советник`,
    roleEn: `Adviser`,
    about: `Boshqaruv kengashi TDYU Endowment Fondining kundalik faoliyatini, dasturlar ijrosini va operatsion qarorlarni muvofiqlashtiradi. Kengash vasiylik yo‘riqnomalariga amal qilib, stipendiyalar, loyihalar va donorlar bilan ishlashni tashkil etadi.`,
    aboutRu: `Правление координирует повседневную деятельность TDYU Endowment Fund, исполнение программ и операционные решения. Оно следует указаниям попечителей и организует работу со стипендиями, проектами и донорами.`,
    aboutEn: `The Management Board coordinates the day-to-day work of the TDYU Endowment Fund, programme delivery, and operational decisions. It follows trustee guidance and organises scholarships, projects, and donor engagement.`,
    quals: [
      `Fond operatsiyalarini boshqarish`,
      `Dasturlar rejalashtirish va monitoring`,
      `Donorlar bilan muloqot`,
      `Byudjet ijrosi nazorati`,
      `Hamkorlik va tashqi aloqalar`,
      `Hisobotlar va KPI ko‘rsatkichlari`,
    ],
    qualsRu: [
      `Управление операциями фонда`,
      `Планирование и мониторинг программ`,
      `Взаимодействие с донорами`,
      `Контроль исполнения бюджета`,
      `Партнёрства и внешние связи`,
      `Отчётность и KPI-показатели`,
    ],
    qualsEn: [
      `Fund operations management`,
      `Programme planning and monitoring`,
      `Donor relations`,
      `Budget execution oversight`,
      `Partnerships and external affairs`,
      `Reporting and KPI tracking`,
    ],
  },
  {
    id: 'taftish-komissiyasi',
    slug: 'brooklyn-simmons',
    img: '/media/dump/board/e-bl-team-4-min.jpg',
    name: `Taftish komissiyasi`,
    nameRu: `Ревизионная комиссия`,
    nameEn: `Audit Commission`,
    role: `Yordamchi`,
    roleRu: `Помощник`,
    roleEn: `Assistant`,
    about: `Taftish komissiyasi TDYU Endowment Fondining moliyaviy hujjatlarini, ichki nazorat tartiblarini va mablag‘lardan maqsadli foydalanishni tekshiradi. Komissiya mustaqil xulosalar berib, shaffoflik va moslikni mustahkamlaydi.`,
    aboutRu: `Ревизионная комиссия проверяет финансовую документацию TDYU Endowment Fund, процедуры внутреннего контроля и целевое использование средств. Комиссия даёт независимые заключения и укрепляет прозрачность и соответствие требованиям.`,
    aboutEn: `The Audit Commission reviews the TDYU Endowment Fund’s financial records, internal control procedures, and the intended use of resources. It issues independent findings that strengthen transparency and compliance.`,
    quals: [
      `Ichki audit va moliyaviy tekshiruv`,
      `Moslik va risk nazorati`,
      `Hujjatlar va hisobotlar tahlili`,
      `Mablag‘larning maqsadli sarfi`,
      `Tavsiyalar va tuzatish choralari`,
      `Mustaqil nazorat standartlari`,
    ],
    qualsRu: [
      `Внутренний аудит и финансовая проверка`,
      `Контроль соответствия и рисков`,
      `Анализ документов и отчётности`,
      `Целевое расходование средств`,
      `Рекомендации и корректирующие меры`,
      `Стандарты независимого контроля`,
    ],
    qualsEn: [
      `Internal audit and financial review`,
      `Compliance and risk controls`,
      `Document and reporting analysis`,
      `Purpose-bound use of funds`,
      `Recommendations and corrective actions`,
      `Independent oversight standards`,
    ],
  },
  {
    id: 'vasiylik-azosi',
    slug: 'darlene-robertson',
    img: '/media/dump/board/e-bl-team-3-min.jpg',
    name: `Vasiylik a’zosi`,
    nameRu: `Член попечительского совета`,
    nameEn: `Trustee member`,
    role: `Maslahatchi`,
    roleRu: `Советник`,
    roleEn: `Adviser`,
    about: `Vasiylik a’zosi TDYU Endowment Fondining strategik muhokamalarida ishtirok etadi, investitsiya va ta’lim prioritetlari bo‘yicha maslahat beradi hamda fond manfaatlarini himoya qiladi. A’zo qarorlarning missiyaga mosligini kuzatadi.`,
    aboutRu: `Член попечительского совета участвует в стратегических обсуждениях TDYU Endowment Fund, консультирует по инвестиционным и образовательным приоритетам и защищает интересы фонда. Участник следит за соответствием решений миссии фонда.`,
    aboutEn: `A trustee member takes part in TDYU Endowment Fund strategy discussions, advises on investment and education priorities, and safeguards the fund’s interests. The member helps ensure decisions stay aligned with the mission.`,
    quals: [
      `Strategik boshqaruv tajribasi`,
      `Ta’lim va endowment sohasidagi bilim`,
      `Etika va manfaatlar to‘qnashuvini boshqarish`,
      `Jamoaviy qaror qabul qilish`,
      `Donorlar va benefisiarlar bilan aloqa`,
      `Uzoq muddatli fond siyosati`,
    ],
    qualsRu: [
      `Опыт стратегического управления`,
      `Знания в сфере образования и эндаумента`,
      `Этика и управление конфликтом интересов`,
      `Коллегиальное принятие решений`,
      `Связь с донорами и бенефициарами`,
      `Долгосрочная политика фонда`,
    ],
    qualsEn: [
      `Strategic governance experience`,
      `Education and endowment expertise`,
      `Ethics and conflict-of-interest management`,
      `Collective decision-making`,
      `Engagement with donors and beneficiaries`,
      `Long-term fund policy`,
    ],
  },
  {
    id: 'boshqaruv-azosi',
    slug: 'cameron-williamson',
    img: '/media/dump/board/e-bl-team-2-min.jpg',
    name: `Boshqaruv a’zosi`,
    nameRu: `Член правления`,
    nameEn: `Board member`,
    role: `Tadqiqotchi`,
    roleRu: `Исследователь`,
    roleEn: `Researcher`,
    about: `Boshqaruv a’zosi TDYU Endowment Fondining dasturlarini amalga oshirish, byudjet intizomi va hamkorlik loyihalarini qo‘llab-quvvatlaydi. A’zo operatsion samaradorlikni oshirish va natijalarni o‘lchashga hissa qo‘shadi.`,
    aboutRu: `Член правления поддерживает реализацию программ TDYU Endowment Fund, бюджетную дисциплину и партнёрские проекты. Участник способствует повышению операционной эффективности и измерению результатов.`,
    aboutEn: `A management board member supports TDYU Endowment Fund programme delivery, budget discipline, and partnership projects. The member helps improve operational effectiveness and results measurement.`,
    quals: [
      `Dasturlar muvofiqlashtirish`,
      `Byudjet va resurslarni rejalashtirish`,
      `Loyiha monitoringi`,
      `Hamkorlik va jamoaviy ish`,
      `Natijalar tahlili`,
      `Fond siyosatiga rioya`,
    ],
    qualsRu: [
      `Координация программ`,
      `Планирование бюджета и ресурсов`,
      `Мониторинг проектов`,
      `Партнёрство и командная работа`,
      `Анализ результатов`,
      `Соблюдение политики фонда`,
    ],
    qualsEn: [
      `Programme coordination`,
      `Budget and resource planning`,
      `Project monitoring`,
      `Partnership and teamwork`,
      `Results analysis`,
      `Adherence to fund policy`,
    ],
  },
  {
    id: 'taftish-azosi',
    slug: 'leslie-alexander',
    img: '/media/dump/board/e-bl-team-1-min.jpg',
    name: `Taftish a’zosi`,
    nameRu: `Член ревизионной комиссии`,
    nameEn: `Audit member`,
    role: `Yordamchi o‘qituvchi`,
    roleRu: `Помощник преподавателя`,
    roleEn: `Teaching assistant`,
    about: `Taftish a’zosi TDYU Endowment Fondining ichki nazorat jarayonlarida ishtirok etadi, hisobotlarni ko‘rib chiqadi va mablag‘lardan to‘g‘ri foydalanish bo‘yicha tekshiruvlarga yordam beradi. A’zo mustaqil va aniq baholashni qo‘llab-quvvatlaydi.`,
    aboutRu: `Член ревизионной комиссии участвует во внутреннем контроле TDYU Endowment Fund, рассматривает отчётность и помогает в проверках целевого использования средств. Участник поддерживает независимое и точное оценивание.`,
    aboutEn: `An audit commission member takes part in TDYU Endowment Fund internal control work, reviews reports, and assists with checks on the proper use of funds. The member supports independent and accurate assessment.`,
    quals: [
      `Moliyaviy hujjatlarni tekshirish`,
      `Ichki nazorat tartiblarini bilish`,
      `Xato va nomuvofiqliklarni aniqlash`,
      `Hisobotlar sifatini baholash`,
      `Maxfiylik va mustaqillik`,
      `Taftish tavsiyalarini shakllantirish`,
    ],
    qualsRu: [
      `Проверка финансовой документации`,
      `Знание процедур внутреннего контроля`,
      `Выявление ошибок и несоответствий`,
      `Оценка качества отчётности`,
      `Конфиденциальность и независимость`,
      `Формирование ревизионных рекомендаций`,
    ],
    qualsEn: [
      `Review of financial documentation`,
      `Internal control procedure knowledge`,
      `Detection of errors and non-compliance`,
      `Reporting quality assessment`,
      `Confidentiality and independence`,
      `Drafting audit recommendations`,
    ],
  },
]

export function getBoardMember(slug: string) {
  return BOARD_DETAIL.find((m) => m.slug === slug || m.id === slug)
}

export function localizeBoard(m: BoardMember, locale: Locale) {
  if (locale === 'ru') {
    return { name: m.nameRu, role: m.roleRu, about: m.aboutRu, quals: m.qualsRu }
  }
  if (locale === 'en') {
    return { name: m.nameEn, role: m.roleEn, about: m.aboutEn, quals: m.qualsEn }
  }
  return { name: m.name, role: m.role, about: m.about, quals: m.quals }
}
