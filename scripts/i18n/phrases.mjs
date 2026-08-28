/**
 * UZ (source) → RU / EN phrase map.
 * Longer phrases first at apply time.
 */
import { phrasesExtra } from './phrases-extra.mjs'
import { phrasesFinal } from './phrases-final.mjs'
import { phrasesMissing } from './phrases-missing.mjs'

export const phrases = [
  // —— Brand / official ——
  [
    "Toshkent davlat yuridik universitetining maqsadli kapital (Endowment Fund) jamoat fondi",
    "Общественный фонд целевого капитала (Endowment Fund) ТГЮУ",
    "Targeted Capital Public Fund (Endowment Fund) of Tashkent State University of Law",
  ],
  [
    "Toshkent davlat yuridik universiteti",
    "Ташкентский государственный юридический университет",
    "Tashkent State University of Law",
  ],
  [
    "Saylgoh ko'chasi 35-uy, Yunusobod tumani, Toshkent shahri, 100047",
    "ул. Сайилгох 35, Юнусабадский район, г. Ташкент, 100047",
    "35 Saylgoh Street, Yunusobod District, Tashkent 100047",
  ],
  [
    "O'zbekiston Respublikasi Adliya vazirligi",
    "Министерство юстиции Республики Узбекистан",
    "Ministry of Justice of the Republic of Uzbekistan",
  ],

  // —— Nav / chrome ——
  ["Huquqiy asos", "Правовая основа", "Legal basis"],
  ["Hisobotlar", "Отчёты", "Reports"],
  ["Yordam", "Помощь", "Support"],
  ["Aloqa", "Контакты", "Contact"],
  ["Bosh", "Главная", "Home"],
  ["Missiya", "Миссия", "Mission"],
  ["6 ustun", "6 столпов", "6 pillars"],
  ["Boshqaruv", "Управление", "Governance"],
  ["Sahifalar", "Страницы", "Pages"],
  ["Alumni", "Alumni", "Alumni"],
  ["Loyihalar", "Проекты", "Projects"],
  ["Grantlar", "Гранты", "Grants"],
  ["Tadbirlar", "Мероприятия", "Events"],
  ["Dasturlar", "Программы", "Programs"],
  ["Shaffoflik", "Прозрачность", "Transparency"],
  ["Xayriya", "Пожертвование", "Donate"],
  ["Yangiliklar", "Новости", "News"],
  ["Vasiylik kengashi", "Попечительский совет", "Board of Trustees"],
  ["01 · Xalqaro stajirovkalar", "01 · Международные стажировки", "01 · International internships"],
  ["02 · Stipendiya va grantlar", "02 · Стипендии и гранты", "02 · Scholarships & grants"],
  ["03 · Tanlovlar va musobaqalar", "03 · Конкурсы и соревнования", "03 · Contests & competitions"],
  ["04 · Ilmiy va ta’limiy loyihalar", "04 · Научные и образовательные проекты", "04 · Research & education projects"],
  ["04 · Ilmiy va ta'limiy loyihalar", "04 · Научные и образовательные проекты", "04 · Research & education projects"],

  // —— Mission / pillars ——
  ["Bilim — eng yaxshi sarmoya", "Знание — лучшая инвестиция", "Knowledge is the best investment"],
  [
    "TDYU Endowment Fund O'zbekiston Respublikasining \"Nodavlat notijorat tashkilotlari to'g'risida\"gi va \"Jamoat fondlari to'g'risida\"gi Qonunlari asosida faoliyat yurituvchi, a'zoligi bo'lmagan jamoat fondidir.",
    "TDYU Endowment Fund — общественный фонд без членства, действующий на основании законов Республики Узбекистан «О негосударственных некоммерческих организациях» и «Об общественных фондах».",
    "TDYU Endowment Fund is a non-membership public fund operating under the laws of Uzbekistan on non-governmental non-profit organizations and public funds.",
  ],
  [
    "Fond maqsadi — TDYU va Adliya vazirligi tizimidagi ta'lim muassasalari xodimlari, professor-o'qituvchilari va talabalarini dunyoning yetakchi oliy ta'lim muassasalarida malaka oshirish, grantlar va stipendiyalar ajratish hamda xalqaro nufuzini oshirish.",
    "Цель фонда — поддержка повышения квалификации сотрудников, преподавателей и студентов ТГЮУ и учреждений системы Министерства юстиции в ведущих вузах мира, выделение грантов и стипендий, а также укрепление международного авторитета.",
    "The Fund’s purpose is to support professional development of TSUL and Ministry of Justice staff, faculty and students at leading universities worldwide, award grants and scholarships, and strengthen international standing.",
  ],
  [
    "Fond faoliyati oshkoralik, kollegiallik, o'zaro hurmat, teng huquqlilik va ixtiyoriylik tamoyillariga asoslanadi.",
    "Деятельность фонда основана на принципах открытости, коллегиальности, взаимного уважения, равноправия и добровольности.",
    "The Fund’s work is based on transparency, collegiality, mutual respect, equality and voluntary participation.",
  ],
  ["Xalqaro ta'lim", "Международное образование", "International education"],
  ["Dunyo yetakchi universitetlarida malaka oshirish va stipendiyalar", "Повышение квалификации и стипендии в ведущих университетах мира", "Professional development and scholarships at world-leading universities"],
  ["Xalqaro hamkorlik", "Международное сотрудничество", "International cooperation"],
  ["Global ilmiy tashkilotlar va oliy ta'lim muassasalari bilan aloqalar", "Связи с глобальными научными организациями и вузами", "Links with global research bodies and higher education institutions"],
  ["Tanlov va mukofotlar", "Конкурсы и награды", "Contests and awards"],
  ["Milliy va xalqaro musobaqalarda ishtirokni qo'llab-quvvatlash", "Поддержка участия в национальных и международных соревнованиях", "Supporting participation in national and international competitions"],
  ["Ilmiy nashrlar", "Научные публикации", "Academic publications"],
  ["Xorijiy nufuzli jurnallarda maqolalar va darsliklar nashr ettirish", "Публикация статей и учебников в авторитетных зарубежных журналах", "Publishing articles and textbooks in reputable international journals"],
  ["TSUL brendi", "Бренд ТГЮУ", "TSUL brand"],
  [`"O'zbek huquqi markazlari" va kutubxonalarni xorijda tashkil etish`, "Создание «Центров узбекского права» и библиотек за рубежом", "Establishing “Uzbek Law Centers” and libraries abroad"],
  ["Tadbirkorlik", "Предпринимательство", "Entrepreneurship"],
  ["O'quv kurslar, yozgi maktablar va boshqa qonuniy faoliyatlar", "Учебные курсы, летние школы и иная законная деятельность", "Training courses, summer schools and other lawful activities"],

  // —— Stats ——
  ["Amalga oshirilgan loyihalar", "Реализованные проекты", "Completed projects"],
  ["Davlatlar bo'ylab alumni", "Выпускники по странам", "Alumni across countries"],
  ["Qo'llab-quvvatlangan", "Поддержано", "Supported"],
  ["Xalqaro hamkor", "Международные партнёры", "International partners"],
  ["Tashkil etilgan", "Основан", "Established"],

  // —— Programs ——
  ["Xalqaro stajirovkalar va malaka oshirish", "Международные стажировки и повышение квалификации", "International internships & professional development"],
  ["Dunyo yetakchi universitetlari va xalqaro tashkilotlarda tahsil, stajirovka va malaka oshirishni moliyalash", "Финансирование обучения, стажировок и повышения квалификации в ведущих вузах и международных организациях", "Funding study, internships and training at leading universities and international organizations"],
  ["Stipendiya va grantlar", "Стипендии и гранты", "Scholarships and grants"],
  ["Iqtidorli va ehtiyojmand talabalar, o'quvchilar hamda xodimlar uchun stipendiyalar va grantlar", "Стипендии и гранты для талантливых и нуждающихся студентов, учащихся и сотрудников", "Scholarships and grants for talented and needy students, pupils and staff"],
  ["Tanlovlar va musobaqalar", "Конкурсы и соревнования", "Contests and competitions"],
  ["Intellektual, huquqiy, sport va ma'rifiy tanlovlarda ishtirokni qo'llab-quvvatlash", "Поддержка участия в интеллектуальных, правовых, спортивных и просветительских конкурсах", "Supporting intellectual, legal, sports and educational contests"],
  ["Ilmiy va ta'limiy loyihalar", "Научные и образовательные проекты", "Research and education projects"],
  ["Konferensiyalar, forumlar, kongreslar; xorijiy mutaxassislar; tarjima va nashr", "Конференции, форумы, конгрессы; иностранные специалисты; перевод и издание", "Conferences, forums, congresses; foreign experts; translation and publishing"],
  ["Xalqaro tadbirlar va mehmonlar", "Международные мероприятия и гости", "International events and guests"],
  ["Xorijiy delegatsiyalarni kutib olish; protokol va diplomatiya xizmatlari", "Приём иностранных делегаций; протокол и дипломатические услуги", "Hosting foreign delegations; protocol and diplomacy services"],
  ["Infratuzilma va TSUL brendi", "Инфраструктура и бренд ТГЮУ", "Infrastructure and TSUL brand"],
  ["Nashrlar va tarjimalar", "Издания и переводы", "Publications and translations"],
  ["Huquqiy darsliklar tarjimasi; xorijiy nashrlar; kutubxonalarga adabiyot taqdimi", "Перевод юридических учебников; зарубежные издания; передача литературы в библиотеки", "Translation of legal textbooks; foreign publications; books for libraries"],
  ["Talaba · Xodim · Doktorant", "Студент · Сотрудник · Докторант", "Student · Staff · Doctoral"],
  ["Moliyaviy yordam", "Финансовая поддержка", "Financial support"],
  ["Milliy · Xalqaro", "Национальный · Международный", "National · International"],
  ["Ilmiy tadqiqot", "Научное исследование", "Research"],
  ["Protokol · Diplomatiya", "Протокол · Дипломатия", "Protocol · Diplomacy"],
  ["Xalqaro nufuz", "Международный авторитет", "International standing"],
  ["Ilmiy nashriyot", "Научное издательство", "Academic publishing"],

  // —— Projects ——
  ["Xalqaro tanlov", "Международный конкурс", "International contest"],
  ["58 nafar talaba va o'qituvchilar ishtiroki, xorijiy ekspert xarajatlarini qoplash", "Участие 58 студентов и преподавателей, покрытие расходов зарубежных экспертов", "58 students and faculty participated; foreign expert costs covered"],
  ["Nashriyot", "Издательство", "Publishing"],
  ["Koreya iqtisodiy huquqi darsligi", "Учебник корейского экономического права", "Korean economic law textbook"],
  ["Koreys tilidan tarjima qilinib nashr etildi va universitetga topshirildi", "Переведён с корейского, издан и передан университету", "Translated from Korean, published and delivered to the university"],
  ["Kongress", "Конгресс", "Congress"],
  ["II Turk dunyosi yosh akademiklar kongressi", "II Конгресс молодых учёных тюркского мира", "II Turkic World Young Academics Congress"],
  ["Turkiya bilan hamkorlikda TDYUda o'tkazildi", "Проведён в ТГЮУ совместно с Турцией", "Held at TSUL in cooperation with Türkiye"],
  ["Ta'lim dasturi", "Образовательная программа", "Education program"],
  ["42 nafar professor-o'qituvchi Teaching & Learning dasturida tahsil oldi", "42 преподавателя прошли программу Teaching & Learning", "42 faculty completed the Teaching & Learning program"],
  ["Infratuzilma", "Инфраструктура", "Infrastructure"],
  ["90 turdan ortiq promo mahsulotlar va yuridik adabiyotlar sotuvi", "Продажа более 90 видов промо-товаров и юридической литературы", "Sales of 90+ promo products and legal literature"],
  ["Amaliyot", "Практика", "Internship"],
  ["Xorijiy stajirovka dasturlari", "Программы зарубежных стажировок", "Overseas internship programs"],
  ["Eron, Xitoy, Germaniya va Rossiya elchixonalarida amaliyot", "Практика в посольствах Ирана, Китая, Германии и России", "Internships at embassies of Iran, China, Germany and Russia"],

  // —— Spend / sources ——
  ["Ta'lim va grantlar", "Образование и гранты", "Education and grants"],
  ["Xalqaro tadbirlar", "Международные мероприятия", "International events"],
  ["Boshqaruv xarajatlari", "Управленческие расходы", "Administrative costs"],
  ["Muassislar tomonidan muntazam pul va boshqa tushumlar", "Регулярные денежные и иные поступления от учредителей", "Regular cash and other contributions from founders"],
  ["Yuridik va jismoniy shaxslarning ixtiyoriy xayriya mablag'lari", "Добровольные пожертвования юридических и физических лиц", "Voluntary donations from legal entities and individuals"],
  ["TDYU bitiruvchilari (Alumni Association) xayriyalari", "Пожертвования выпускников ТГЮУ (Alumni Association)", "Donations from TSUL alumni (Alumni Association)"],
  ["Xalqaro tashkilotlar va moliya institutlarining grantlari", "Гранты международных организаций и финансовых институтов", "Grants from international organizations and financial institutions"],
  ["Fondning tadbirkorlik faoliyatidan olinadigan daromadlar", "Доходы от предпринимательской деятельности фонда", "Income from the Fund’s entrepreneurial activities"],

  // —— Reports ——
  ["2024 Yillik faoliyat hisoboti", "Годовой отчёт о деятельности за 2024 год", "2024 Annual activity report"],
  ["31 ta loyiha, mablag'lar taqsimoti, asosiy ko'rsatkichlar", "31 проект, распределение средств, ключевые показатели", "31 projects, fund allocation, key indicators"],
  ["2024 Auditorlik xulosasi", "Аудиторское заключение за 2024 год", "2024 Audit opinion"],
  ["Mustaqil auditorlik tashkiloti xulosasi va moliyaviy yillik balans", "Заключение независимого аудитора и годовой финансовый баланс", "Independent auditor opinion and annual financial balance"],
  ["Fond ustavi (2025 yangi tahrir)", "Устав фонда (новая редакция 2025)", "Fund charter (2025 revised edition)"],
  ["Adliya vazirligida qayta ro'yxatdan o'tkazilgan", "Перерегистрирован в Министерстве юстиции", "Re-registered with the Ministry of Justice"],
  ["Taftish komissiyasi xulosasi", "Заключение ревизионной комиссии", "Audit commission conclusion"],
  ["Moliyaviy-xo'jalik faoliyati tekshiruvi natijalari", "Результаты проверки финансово-хозяйственной деятельности", "Results of the financial and economic activity review"],
  ["Yanvar 2025 · UZ / RU / EN", "Январь 2025 · UZ / RU / EN", "January 2025 · UZ / RU / EN"],
  ["Mart 2025", "Март 2025", "March 2025"],
  ["2025 · Rasmiy hujjat", "2025 · Официальный документ", "2025 · Official document"],

  // —— Governance ——
  ["Vasiylik Kengashi", "Попечительский совет", "Board of Trustees"],
  ["Vasiylik kengashi — Fondning oliy boshqaruv organi. 5 a'zo, vakolat muddati 5 yil.", "Попечительский совет — высший орган управления Фонда. 5 членов, срок полномочий 5 лет.", "The Board of Trustees is the Fund’s highest governing body. 5 members, 5-year term."],
  ["Ustavga o'zgartirishlarni tasdiqlash", "Утверждение изменений устава", "Approve charter amendments"],
  ["Boshqaruv va Taftish tarkibini shakllantirish", "Формирование состава Правления и Ревизионной комиссии", "Form Management and Audit Commission membership"],
  ["Byudjet va yillik hisobotni tasdiqlash", "Утверждение бюджета и годового отчёта", "Approve budget and annual report"],
  ["Qayta tashkil etish va tugatish qarorlari", "Решения о реорганизации и ликвидации", "Reorganization and liquidation decisions"],
  ["Auditorlik tashkilotini tanlash", "Выбор аудиторской организации", "Select the audit firm"],
  ["Boshqaruv Kengashi", "Правление", "Management Board"],
  ["Boshqaruv kengashi — joriy faoliyatni boshqaradi. Rais: N. Salayev.", "Правление управляет текущей деятельностью. Председатель: Н. Салаев.", "The Management Board runs day-to-day operations. Chair: N. Salayev."],
  ["Joriy faoliyatni umumiy boshqarish", "Общее руководство текущей деятельностью", "Overall management of current activities"],
  ["Byudjet doirasida mablag'larni sarflash", "Расходование средств в рамках бюджета", "Spend funds within the budget"],
  ["Xodimlarni rag'batlantirish", "Поощрение сотрудников", "Staff incentives"],
  ["Filial va vakolatxonalar", "Филиалы и представительства", "Branches and representative offices"],
  ["Ramziy belgini tasdiqlash", "Утверждение символики", "Approve the emblem"],
  ["Taftish Komissiyasi", "Ревизионная комиссия", "Audit Commission"],
  ["Moliyaviy faoliyat va mablag'lardan to'g'ri foydalanishni nazorat qiladi. Kamida 3 kishi.", "Контролирует финансовую деятельность и правильное использование средств. Не менее 3 человек.", "Oversees financial activity and proper use of funds. At least 3 members."],
  ["Hisobotlar ishonchliligini baholash", "Оценка достоверности отчётности", "Assess reliability of reports"],
  ["Buxgalteriya buzilishlari haqida ma’lumot", "Информация о нарушениях бухучёта", "Information on accounting irregularities"],
  ["Buxgalteriya buzilishlari haqida ma'lumot", "Информация о нарушениях бухучёта", "Information on accounting irregularities"],
  ["Qoidabuzarliklarni bartaraf etish tavsiyalari", "Рекомендации по устранению нарушений", "Recommendations to remedy violations"],
  ["Samaradorlikni oshirish takliflari", "Предложения по повышению эффективности", "Proposals to improve efficiency"],

  // —— Stories ——
  [
    "TDYU menga xalqaro huquq sohasida faoliyat uchun poydevor berdi. London ofisida ishlash orzuyim amalga oshdi.",
    "ТГЮУ дал мне основу для работы в сфере международного права. Мечта работать в лондонском офисе сбылась.",
    "TSUL gave me the foundation for a career in international law. My dream of working in a London office came true.",
  ],
  [
    "Fond stipendiyasi tufayli Jeneva universitetida tahsil oldim. Bugun BMT tizimida O'zbekistonni namoyish etaman.",
    "Благодаря стипендии Фонда я учился в Университете Женевы. Сегодня представляю Узбекистан в системе ООН.",
    "Thanks to a Fund scholarship I studied at the University of Geneva. Today I represent Uzbekistan in the UN system.",
  ],
  [
    "TDYU va Endowment Fund qo'llab-quvvatlovi bilan Germaniyada professor bo'lish orzum haqiqatga aylandi.",
    "При поддержке ТГЮУ и Endowment Fund мечта стать профессором в Германии стала реальностью.",
    "With support from TSUL and the Endowment Fund, my dream of becoming a professor in Germany came true.",
  ],

  // —— Grants ——
  ["Asosiy dastur", "Основная программа", "Core program"],
  ["Xalqaro ta'lim granti", "Грант на международное образование", "International education grant"],
  ["Magistratura, doktorantura yoki malaka oshirish uchun to‘liq moliyalashtirish.", "Полное финансирование магистратуры, докторантуры или повышения квалификации.", "Full funding for master’s, doctoral or professional development study."],
  ["Magistratura, doktorantura yoki malaka oshirish uchun to'liq moliyalashtirish.", "Полное финансирование магистратуры, докторантуры или повышения квалификации.", "Full funding for master’s, doctoral or professional development study."],
  ["1 yilgacha", "До 1 года", "Up to 1 year"],
  ["Yiliga 5 grant", "5 грантов в год", "5 grants per year"],
  ["Ariza: mart–may", "Заявки: март–май", "Apply: March–May"],
  ["Tanlov stipendiyasi", "Конкурсная стипендия", "Competition scholarship"],
  ["Milliy va xalqaro huquqiy musobaqalar ishtirokchilari uchun.", "Для участников национальных и международных правовых соревнований.", "For participants in national and international legal competitions."],
  ["Har musobaqa", "Каждое соревнование", "Per competition"],
  ["Doim ochiq", "Всегда открыто", "Always open"],
  ["Ilmiy nashr granti", "Грант на научную публикацию", "Academic publication grant"],
  ["Xorijiy nufuzli nashrlarda maqola chop etish xarajatlarini qoplash.", "Покрытие расходов на публикацию статей в авторитетных зарубежных изданиях.", "Covering costs of publishing in reputable international outlets."],
  ["Tarjima bilan", "С переводом", "With translation"],
  ["Yil davomida", "В течение года", "Year-round"],

  // —— News ——
  ["Xalqaro kongress", "Международный конгресс", "International congress"],
  ["II Turk dunyosi yosh akademiklar kongressi muvaffaqiyatli o‘tkazildi", "II Конгресс молодых учёных тюркского мира успешно проведён", "II Turkic World Young Academics Congress held successfully"],
  ["II Turk dunyosi yosh akademiklar kongressi muvaffaqiyatli o'tkazildi", "II Конгресс молодых учёных тюркского мира успешно проведён", "II Turkic World Young Academics Congress held successfully"],
  [
    "2025-yil 14-fevralda TDYUda “Umumiy kelajakni qurish” mavzusida xalqaro kongress bo‘lib o‘tdi.",
    "14 февраля 2025 года в ТГЮУ прошёл международный конгресс на тему «Строим общее будущее».",
    "On 14 February 2025, TSUL hosted an international congress on “Building a Shared Future”.",
  ],
  ["Koreya iqtisodiy huquqi darsligi nashr etildi", "Издан учебник корейского экономического права", "Korean economic law textbook published"],
  ["Koreys tilidan tarjima qilingan darslik universitetga topshirildi.", "Учебник, переведённый с корейского, передан университету.", "The textbook translated from Korean was delivered to the university."],
  ["42 o‘qituvchi Westminster dasturini yakunladi", "42 преподавателя завершили программу Westminster", "42 teachers completed the Westminster program"],
  ["42 o'qituvchi Westminster dasturini yakunladi", "42 преподавателя завершили программу Westminster", "42 teachers completed the Westminster program"],
  ["Postgraduate Certificate in Teaching and Learning yakunlandi.", "Программа Postgraduate Certificate in Teaching and Learning завершена.", "The Postgraduate Certificate in Teaching and Learning was completed."],
  ["14 fevral 2025", "14 февраля 2025", "14 February 2025"],
  ["Fevral 2025", "Февраль 2025", "February 2025"],

  // —— Support ——
  ["Xayriya badali", "Благотворительный взнос", "Charitable donation"],
  ["Bir martalik yoki muntazam xayriya. Har qanday miqdor hisobga olinadi.", "Разовое или регулярное пожертвование. Учитывается любая сумма.", "One-time or recurring donation. Any amount counts."],
  ["Xayriya qilish", "Сделать пожертвование", "Donate"],
  ["Alumni aloqasi", "Связь с выпускниками", "Alumni connection"],
  ["Bitiruvchi sifatida ro‘yxatdan o‘ting va Alumni Associationga qo‘shiling.", "Зарегистрируйтесь как выпускник и вступите в Alumni Association.", "Register as a graduate and join the Alumni Association."],
  ["Bitiruvchi sifatida ro'yxatdan o'ting va Alumni Associationga qo'shiling.", "Зарегистрируйтесь как выпускник и вступите в Alumni Association.", "Register as a graduate and join the Alumni Association."],
  ["Alumni bo‘lish", "Стать Alumni", "Become Alumni"],
  ["Alumni bo'lish", "Стать Alumni", "Become Alumni"],
  ["Korporativ homiylik", "Корпоративное спонсорство", "Corporate sponsorship"],
  ["Yuridik shaxslar uchun xayriya; brend fond faoliyatida e’tirof etiladi.", "Пожертвования от юридических лиц; бренд отмечается в деятельности фонда.", "Donations from legal entities; brand recognition in Fund activities."],
  ["Yuridik shaxslar uchun xayriya; brend fond faoliyatida e'tirof etiladi.", "Пожертвования от юридических лиц; бренд отмечается в деятельности фонда.", "Donations from legal entities; brand recognition in Fund activities."],
  ["Homiylik", "Спонсорство", "Sponsorship"],
  ["Grant va hamkorlik", "Грант и партнёрство", "Grant and partnership"],
  ["Xalqaro tashkilotlar uchun grant va uzoq muddatli hamkorlik.", "Гранты и долгосрочное партнёрство для международных организаций.", "Grants and long-term partnership for international organizations."],
  ["Hamkorlik", "Партнёрство", "Partnership"],

  // —— Legal ——
  ["O'zbekiston Respublikasi Konstitutsiyasi", "Конституция Республики Узбекистан", "Constitution of the Republic of Uzbekistan"],
  ["Fuqarolik jamiyati, uyushma erkinligi va mulkiy huquqlar asoslari", "Основы гражданского общества, свободы объединений и имущественных прав", "Foundations of civil society, freedom of association and property rights"],
  [`"Nodavlat notijorat tashkilotlari to'g'risida"gi Qonun`, "Закон «О негосударственных некоммерческих организациях»", "Law on Non-Governmental Non-Profit Organizations"],
  ["NNO tashkil etish, ro'yxatdan o'tkazish va faoliyat tartibi", "Порядок создания, регистрации и деятельности ННО", "Establishment, registration and operation of NGOs"],
  [`"Jamoat fondlari to'g'risida"gi Qonun`, "Закон «Об общественных фондах»", "Law on Public Funds"],
  ["Jamoat fondlarining huquqiy holati, boshqaruvi va nazorati", "Правовой статус, управление и контроль общественных фондов", "Legal status, governance and oversight of public funds"],

  // —— Alumni locations ——
  ["Yuristlar", "Юристы", "Lawyers"],
  ["Xalqaro tashkilotlar", "Международные организации", "International organizations"],
  ["Akademiya", "Академия", "Academia"],
  ["Davlat xizmati", "Государственная служба", "Public service"],
  ["Xalqaro amaliyot", "Международная практика", "International practice"],
  ["Stajirovka dasturi", "Программа стажировок", "Internship program"],
  ["TDYU bitiruvchilari", "Выпускники ТГЮУ", "TSUL graduates"],
  ["Toshkent", "Ташкент", "Tashkent"],
  ["Jeneva", "Женева", "Geneva"],

  // —— UI / forms ——
  ["Ijtimoiy tarmoqlar", "Социальные сети", "Social networks"],
  ["Qidirish...", "Поиск...", "Search..."],
  ["Elektron pochta", "Электронная почта", "Email"],
  ["Ism", "Имя", "First name"],
  ["Familiya", "Фамилия", "Last name"],
  ["Mamlakat", "Страна", "Country"],
  ["Shahar", "Город", "City"],
  ["Pochta indeksi", "Почтовый индекс", "Zip code"],
  ["Manzil", "Адрес", "Address"],
  ["Xabar", "Сообщение", "Message"],
  ["Yuborish", "Отправить", "Submit"],
  ["Aloqa formasi", "Контактная форма", "Contact form"],
  ["Yaqinlashayotgan tadbirlar", "Предстоящие мероприятия", "Upcoming events"],
  ["Barcha tadbirlar", "Все мероприятия", "All events"],
  ["Batafsil reja", "Подробный план", "Detailed plan"],
  ["Onlayn kurslar", "Онлайн-курсы", "Online courses"],
  ["Raqamli marketing", "Цифровой маркетинг", "Digital marketing"],
  ["Katta o‘qituvchi", "Старший преподаватель", "Senior lecturer"],
  ["Katta o'qituvchi", "Старший преподаватель", "Senior lecturer"],
  ["Yordamchi o‘qituvchi", "Помощник преподавателя", "Teaching assistant"],
  ["Yordamchi o'qituvchi", "Помощник преподавателя", "Teaching assistant"],
  ["Mentor", "Наставник", "Mentor"],
  ["Dasturchi", "Разработчик", "Developer"],
  ["Dizayner", "Дизайнер", "Designer"],
  ["Xarajat (USD)", "Расходы (USD)", "Costs (USD)"],
  ["Ro‘yxatdan o‘tish (bir martalik)", "Регистрация (разово)", "Enrollment (one-time)"],
  ["Ro'yxatdan o'tish (bir martalik)", "Регистрация (разово)", "Enrollment (one-time)"],
  ["Orientatsiya (bir martalik)", "Ориентация (разово)", "Orientation (one-time)"],
  ["O‘qish to‘lovi", "Плата за обучение", "Tuition"],
  ["O'qish to'lovi", "Плата за обучение", "Tuition"],
  ["Ovqatlanish", "Питание", "Meals"],
  ["1-yil jami", "Итого 1-й год", "Year 1 total"],
  ["2-yil jami", "Итого 2-й год", "Year 2 total"],
  ["Reja bo‘yicha", "По расписанию", "As scheduled"],
  ["Reja bo'yicha", "По расписанию", "As scheduled"],
  ["Magistratura", "Магистратура", "Postgraduate"],
  [
    "O‘qitish va o‘rganish bo‘yicha malaka oshirish dasturi yakunlandi.",
    "Программа повышения квалификации по преподаванию и обучению завершена.",
    "The teaching and learning professional development program was completed.",
  ],
  [
    "“TDYU Endowment Fundda talabalar — e’tibor markazida. Ularning hikoyalari missiyamizni aks ettiradi: qo‘llab-quvvatlash, ilhomlantirish va tayyorlash.”",
    "«В TDYU Endowment Fund студенты — в центре внимания. Их истории отражают нашу миссию: поддерживать, вдохновлять и готовить.»",
    "“At TDYU Endowment Fund, students are at the heart of everything. Their stories reflect our mission: support, inspire and prepare.”",
  ],
  [
    "“Fond dasturlari amaliyotga yo‘naltirilgan. Grant va stajirovkalar orqali haqiqiy tajriba orttirdim.”",
    "«Программы Фонда ориентированы на практику. Благодаря грантам и стажировкам я получил реальный опыт.»",
    "“The Fund’s programs are practice-oriented. Through grants and internships I gained real experience.”",
  ],
  ["Batafsil", "Подробнее", "Learn more"],
  ["Ko‘proq o‘qish", "Читать далее", "Read more"],
  ["Ko'proq o'qish", "Читать далее", "Read more"],
  ["Barcha yangiliklar", "Все новости", "All news"],
  ["Bog‘lanish", "Связаться", "Get in touch"],
  ["Bog'lanish", "Связаться", "Get in touch"],
  ["Telefon", "Телефон", "Phone"],
  ["Email", "Email", "Email"],
  ["Haqida", "О фонде", "About"],
  ["Asosiy yo'nalishlar", "Основные направления", "Core directions"],
  ["Asosiy dastur", "Основная программа", "Core program"],
]

const allPhrases = [...phrases, ...phrasesExtra, ...phrasesFinal, ...phrasesMissing]

/** Unify apostrophe / okina variants so UZ curly quotes match dict keys. */
export function canonApostrophe(s) {
  return s.replace(/[\u2018\u2019\u201B\u2032\u02BB\u02BC\uA78Cʻʼ`]/g, "'")
}

export function mapFor(lang) {
  const idx = lang === 'ru' ? 1 : lang === 'en' ? 2 : 0
  const out = new Map()
  for (const row of allPhrases) {
    const uz = canonApostrophe(row[0])
    const t = row[idx]
    if (uz && t && uz !== t) out.set(uz, t)
  }
  return out
}

export function applyMap(html, map) {
  // Normalize source apostrophes so dictionary keys match
  let out = canonApostrophe(html)
  const keys = [...map.keys()].sort((a, b) => b.length - a.length)
  for (const k of keys) {
    const v = map.get(k)
    if (!out.includes(k)) continue
    out = out.split(k).join(v)
  }
  return out
}
