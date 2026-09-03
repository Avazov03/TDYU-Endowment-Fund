import type { Locale } from '@/i18n/routing'

export type AlumniPerson = {
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
  /**
   * Map uchun metadata (demo/placeholder bo‘lishi mumkin).
   * Real loyihada bu maydonlar backend/DBdan keladi.
   */
  mapCategory?: AlumniMapCategoryId
  mapLocation?: {
    lat: number
    lng: number
    label?: string
    demo?: boolean
  }
}

export type AlumniMapCategoryId = 'law' | 'state' | 'academia' | 'international'

export const ALUMNI_PEOPLE: AlumniPerson[] = [
  {
    slug: 'esther-howard',
    img: '/media/alumni/alamni-team-3.jpg',
    name: `Esther Howard`,
    nameRu: `Esther Howard`,
    nameEn: `Esther Howard`,
    role: `O‘quv dasturlari dizayneri`,
    roleRu: `Дизайнер учебных программ`,
    roleEn: `Instructional Designer`,
    about: `Esther Howard — TDYU bitiruvchisi. U endowment fondi qo‘llab-quvvatlagan ta’lim dasturlarida ishtirok etgan va hozir o‘quv materiallarini ishlab chiqish orqali talabalarga yordam beradi. Esther bitiruvchilar tarmog‘ida mentorlik va tajriba almashishni rivojlantiradi.`,
    aboutRu: `Esther Howard — выпускница TDYU. Она участвовала в образовательных программах при поддержке эндаумент-фонда и сейчас помогает студентам, разрабатывая учебные материалы. Esther развивает менторство и обмен опытом в сети выпускников.`,
    aboutEn: `Esther Howard is a TDYU graduate. She took part in educational programmes backed by the endowment fund and now supports students by designing learning materials. Esther advances mentoring and peer exchange across the alumni network.`,
    mapCategory: 'academia',
    mapLocation: { lat: 51.5074, lng: -0.1278, label: 'UK', demo: true },
    quals: [
      `TDYU bitiruvchisi`,
      `O‘quv dasturlari dizayni`,
      `Endowment stipendiyasi ishtirokchisi`,
      `Mentorlik va mentoring sessiyalari`,
      `Talabalar uchun treninglar`,
      `Bitiruvchilar jamiyati faoli`,
    ],
    qualsRu: [
      `Выпускница TDYU`,
      `Дизайн учебных программ`,
      `Участница стипендиальной программы эндаумента`,
      `Менторство и mentoring-сессии`,
      `Тренинги для студентов`,
      `Активистка сообщества выпускников`,
    ],
    qualsEn: [
      `TDYU graduate`,
      `Instructional programme design`,
      `Endowment scholarship participant`,
      `Mentoring and coaching sessions`,
      `Student training workshops`,
      `Alumni community contributor`,
    ],
  },
  {
    slug: 'jerome-bell',
    img: '/media/alumni/alamni-team-2.jpg',
    name: `Jerome Bell`,
    nameRu: `Jerome Bell`,
    nameEn: `Jerome Bell`,
    role: `Trening koordinatori`,
    roleRu: `Координатор обучения`,
    roleEn: `Training Coordinator`,
    about: `Jerome Bell TDYU Endowment Fondining bitiruvchilar tashabbuslarida faol. U kasbiy rivojlanish treninglarini muvofiqlashtiradi va yosh mutaxassislarni amaliyot va ishga joylashishda qo‘llab-quvvatlaydi.`,
    aboutRu: `Jerome Bell активен в выпускнических инициативах TDYU Endowment Fund. Он координирует тренинги по профессиональному развитию и поддерживает молодых специалистов в практике и трудоустройстве.`,
    aboutEn: `Jerome Bell is active in TDYU Endowment Fund alumni initiatives. He coordinates professional development trainings and supports early-career specialists with internships and employability pathways.`,
    mapCategory: 'international',
    mapLocation: { lat: 41.2995, lng: 69.2401, label: 'Uzbekistan', demo: true },
    quals: [
      `TDYU bitiruvchisi`,
      `Kasbiy treninglar koordinatsiyasi`,
      `Amaliyot dasturlari`,
      `Bitiruvchilar networking`,
      `Loyiha boshqaruvi asoslari`,
      `Fond tadbirlarida ishtirok`,
    ],
    qualsRu: [
      `Выпускник TDYU`,
      `Координация профессиональных тренингов`,
      `Программы практики`,
      `Нетворкинг выпускников`,
      `Основы проектного управления`,
      `Участие в мероприятиях фонда`,
    ],
    qualsEn: [
      `TDYU graduate`,
      `Professional training coordination`,
      `Internship programmes`,
      `Alumni networking`,
      `Project management fundamentals`,
      `Fund event participation`,
    ],
  },
  {
    slug: 'arlene-mccoy',
    img: '/media/alumni/alamni-team-1.jpg',
    name: `Arlene McCoy`,
    nameRu: `Arlene McCoy`,
    nameEn: `Arlene McCoy`,
    role: `Ta’lim tadqiqotchisi`,
    roleRu: `Исследователь образования`,
    roleEn: `Education Researcher`,
    about: `Arlene McCoy TDYU da o‘qigan va endowment dasturlari ta’sirini o‘rganishga qiziqadi. U bitiruvchilar natijalarini tahlil qilib, fondning ta’lim yo‘nalishlarini yaxshilashga hissa qo‘shadi.`,
    aboutRu: `Arlene McCoy училась в TDYU и интересуется изучением влияния эндаумент-программ. Она анализирует результаты выпускников и помогает улучшать образовательные направления фонда.`,
    aboutEn: `Arlene McCoy studied at TDYU and focuses on the impact of endowment-backed programmes. She analyses alumni outcomes and helps strengthen the fund’s education priorities.`,
    mapCategory: 'academia',
    mapLocation: { lat: 40.7128, lng: -74.006, label: 'USA', demo: true },
    quals: [
      `TDYU bitiruvchisi`,
      `Ta’lim natijalarini tadqiq etish`,
      `Ma’lumotlar tahlili`,
      `Stipendiya dasturlari monitoringi`,
      `Hisobot va tavsiyalar`,
      `Ilmiy-amaliy seminarlar`,
    ],
    qualsRu: [
      `Выпускница TDYU`,
      `Исследование образовательных результатов`,
      `Анализ данных`,
      `Мониторинг стипендиальных программ`,
      `Отчёты и рекомендации`,
      `Научно-практические семинары`,
    ],
    qualsEn: [
      `TDYU graduate`,
      `Education outcomes research`,
      `Data analysis`,
      `Scholarship programme monitoring`,
      `Reporting and recommendations`,
      `Applied research seminars`,
    ],
  },
  {
    slug: 'david-thomas',
    img: '/media/alumni/e-viva-img3-min.jpg',
    name: `David Thomas`,
    nameRu: `David Thomas`,
    nameEn: `David Thomas`,
    role: `Media bakalavri, 2022`,
    roleRu: `Бакалавр медиа, 2022`,
    roleEn: `BA Media, 2022`,
    about: `David Thomas 2022-yilda TDYU media yo‘nalishini tugatgan. U endowment fondi yordamida o‘qigan va hozir bitiruvchilar hikoyalarini yoritib, fondning ochiq kommunikatsiyasiga hissa qo‘shadi.`,
    aboutRu: `David Thomas окончил медиа-направление TDYU в 2022 году. Он учился при поддержке эндаумент-фонда и сейчас освещает истории выпускников, поддерживая открытые коммуникации фонда.`,
    aboutEn: `David Thomas graduated from TDYU’s media track in 2022. Supported by the endowment fund during his studies, he now shares alumni stories and strengthens the fund’s public communications.`,
    mapCategory: 'international',
    mapLocation: { lat: 52.52, lng: 13.405, label: 'Germany', demo: true },
    quals: [
      `TDYU, media bakalavriati (2022)`,
      `Endowment qo‘llab-quvvatlash oluvchisi`,
      `Kontent va media loyihalari`,
      `Bitiruvchilar hikoyalari`,
      `Ijtimoiy tarmoqlar kommunikatsiyasi`,
      `Volontyorlik tadbirlari`,
    ],
    qualsRu: [
      `TDYU, бакалавриат по медиа (2022)`,
      `Получатель поддержки эндаумента`,
      `Контент и медиапроекты`,
      `Истории выпускников`,
      `Коммуникации в соцсетях`,
      `Волонтёрские мероприятия`,
    ],
    qualsEn: [
      `TDYU, BA Media (2022)`,
      `Endowment support recipient`,
      `Content and media projects`,
      `Alumni storytelling`,
      `Social media communications`,
      `Volunteer events`,
    ],
  },
  {
    slug: 'margaret-johnson',
    img: '/media/alumni/e-viva-img2-min.jpg',
    name: `Margaret Johnson`,
    nameRu: `Margaret Johnson`,
    nameEn: `Margaret Johnson`,
    role: `Biotexnologiya magistri, 2019`,
    roleRu: `Магистр биотехнологии, 2019`,
    roleEn: `MSc Biotechnology, 2019`,
    about: `Margaret Johnson 2019-yilda TDYU da biotexnologiya magistraturasini tugatgan. Endowment dasturlari orqali olingan imkoniyatlar unga tadqiqot va mentorlikda davom etishga yordam berdi; u yosh talabalarni STEM yo‘nalishlariga rag‘batlantiradi.`,
    aboutRu: `Margaret Johnson окончила магистратуру по биотехнологии в TDYU в 2019 году. Возможности эндаумент-программ помогли ей продолжить исследования и менторство; она вдохновляет студентов на STEM-направление.`,
    aboutEn: `Margaret Johnson completed an MSc in Biotechnology at TDYU in 2019. Endowment programme opportunities helped her continue in research and mentoring; she encourages students toward STEM pathways.`,
    mapCategory: 'academia',
    mapLocation: { lat: 35.6895, lng: 139.6917, label: 'Japan', demo: true },
    quals: [
      `TDYU, biotexnologiya magistraturasi (2019)`,
      `Ilmiy tadqiqot tajribasi`,
      `STEM mentorlik`,
      `Endowment stipendiyasi`,
      `Laboratoriya amaliyoti`,
      `Bitiruvchilar mentorlik dasturi`,
    ],
    qualsRu: [
      `TDYU, магистратура по биотехнологии (2019)`,
      `Опыт научных исследований`,
      `STEM-менторство`,
      `Стипендия эндаумента`,
      `Лабораторная практика`,
      `Менторская программа выпускников`,
    ],
    qualsEn: [
      `TDYU, MSc Biotechnology (2019)`,
      `Research experience`,
      `STEM mentoring`,
      `Endowment scholarship`,
      `Laboratory practice`,
      `Alumni mentoring programme`,
    ],
  },
  {
    slug: 'leslie-alexander',
    img: '/media/alumni/e-viva-img1-min.jpg',
    name: `Leslie Alexander`,
    nameRu: `Leslie Alexander`,
    nameEn: `Leslie Alexander`,
    role: `Informatika bakalavri, 2018`,
    roleRu: `Бакалавр информатики, 2018`,
    roleEn: `BSc Computer Science, 2018`,
    about: `Leslie Alexander 2018-yilda TDYU informatika bakalavriatini tugatgan. U endowment fondi bitiruvchilar tarmog‘ida faol bo‘lib, texnologiya sohasidagi tajribasini talabalar va yosh mutaxassislar bilan baham ko‘radi.`,
    aboutRu: `Leslie Alexander окончил бакалавриат по информатике в TDYU в 2018 году. Он активен в сети выпускников эндаумент-фонда и делится опытом в сфере технологий со студентами и молодыми специалистами.`,
    aboutEn: `Leslie Alexander earned a BSc in Computer Science at TDYU in 2018. Active in the endowment fund’s alumni network, he shares technology-sector experience with students and early-career professionals.`,
    mapCategory: 'international',
    mapLocation: { lat: -33.8688, lng: 151.2093, label: 'Australia', demo: true },
    quals: [
      `TDYU, informatika bakalavriati (2018)`,
      `Dasturiy ta’minot va IT loyihalar`,
      `Bitiruvchilar mentorligi`,
      `Karyera yo‘riqnomasi sessiyalari`,
      `Texnologiya jamiyati ishtiroki`,
      `Fond tadbirlarida ko‘ngilli`,
    ],
    qualsRu: [
      `TDYU, бакалавриат по информатике (2018)`,
      `ПО и IT-проекты`,
      `Менторство выпускников`,
      `Сессии карьерного ориентирования`,
      `Участие в технологическом сообществе`,
      `Волонтёр на мероприятиях фонда`,
    ],
    qualsEn: [
      `TDYU, BSc Computer Science (2018)`,
      `Software and IT projects`,
      `Alumni mentoring`,
      `Career guidance sessions`,
      `Tech community involvement`,
      `Volunteer at fund events`,
    ],
  },
]

export function getAlumni(slug: string) {
  return ALUMNI_PEOPLE.find((p) => p.slug === slug)
}

export function localizeAlumni(p: AlumniPerson, locale: Locale) {
  if (locale === 'ru') {
    return { name: p.nameRu, role: p.roleRu, about: p.aboutRu, quals: p.qualsRu }
  }
  if (locale === 'en') {
    return { name: p.nameEn, role: p.roleEn, about: p.aboutEn, quals: p.qualsEn }
  }
  return { name: p.name, role: p.role, about: p.about, quals: p.quals }
}
