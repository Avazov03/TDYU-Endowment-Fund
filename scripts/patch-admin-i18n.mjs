import fs from 'node:fs'

const p = 'web/src/admin/kit/i18n/translations.ts'
let s = fs.readFileSync(p, 'utf8')

const once = (from, to) => {
  if (!s.includes(from)) {
    console.warn('miss', from.slice(0, 80))
    return false
  }
  s = s.replace(from, to)
  return true
}

const all = (from, to) => {
  if (!s.includes(from)) {
    console.warn('miss-all', from.slice(0, 80))
    return
  }
  s = s.split(from).join(to)
}

const pairs = [
  ['"nav.yurist": "Юрист"', '"nav.yurist": "Фонд"'],
  ['"nav.analytics": "Аналитика"', '"nav.analytics": "Подписчики"'],
  ['"nav.marketing": "Маркетинг"', '"nav.marketing": "Контент сайта"'],
  ['"nav.crm": "CRM"', '"nav.crm": "Совет"'],
  ['"nav.stocks": "Акции"', '"nav.stocks": "Настройки"'],
  ['"nav.saas": "SaaS"', '"nav.saas": "Аккаунт"'],
  ['"nav.ai": "AI"', '"nav.ai": "Выпускники"'],
  ['"nav.sales": "Продажи"', '"nav.sales": "Заказы"'],
  ['"nav.apiKeys": "API-ключи"', '"nav.apiKeys": "Медиа"'],
  ['"nav.integrations": "Интеграции"', '"nav.integrations": "Админы"'],
  ['"nav.chat": "Чат"', '"nav.chat": "Обращения"'],
  ['"nav.tickets": "Консультации"', '"nav.tickets": "Inbox"'],
  ['"nav.ticketList": "Очередь"', '"nav.ticketList": "Обращения"'],
  ['"nav.ticketReply": "Переписка"', '"nav.ticketReply": "Пожертвования"'],
  ['"nav.map": "Карта"', '"nav.map": "Карта alumni"'],
  ['"nav.aiQuestions": "AI-вопросы"', '"nav.aiQuestions": "Обращения"'],
  ['"nav.users": "Пользователи"', '"nav.users": "Пожертвования"'],
  ['"nav.specialists": "Специалисты"', '"nav.specialists": "Гранты"'],
  ['"nav.templates": "Шаблоны"', '"nav.templates": "События"'],
  ['"nav.notices": "Новости"', '"nav.notices": "Статьи"'],
  ['"nav.ratings": "Оценки"', '"nav.ratings": "Товары"'],
  ['"nav.yurist": "Yurist"', '"nav.yurist": "Fund"'],
  ['"nav.analytics": "Analytics"', '"nav.analytics": "Subscribers"'],
  ['"nav.marketing": "Marketing"', '"nav.marketing": "Site content"'],
  ['"nav.crm": "CRM"', '"nav.crm": "Board"'],
  ['"nav.stocks": "Stocks"', '"nav.stocks": "Settings"'],
  ['"nav.saas": "SaaS"', '"nav.saas": "Account"'],
  ['"nav.ai": "AI"', '"nav.ai": "Alumni"'],
  ['"nav.sales": "Sales"', '"nav.sales": "Orders"'],
  ['"nav.apiKeys": "API Keys"', '"nav.apiKeys": "Media"'],
  ['"nav.integrations": "Integrations"', '"nav.integrations": "Admins"'],
  ['"nav.chat": "Chat"', '"nav.chat": "Contacts"'],
  ['"nav.tickets": "Consultations"', '"nav.tickets": "Inbox"'],
  ['"nav.ticketList": "Queue"', '"nav.ticketList": "Contacts"'],
  ['"nav.ticketReply": "Thread"', '"nav.ticketReply": "Donations"'],
  ['"nav.map": "Map"', '"nav.map": "Alumni map"'],
  ['"nav.aiQuestions": "AI Questions"', '"nav.aiQuestions": "Contacts"'],
  ['"nav.users": "Users"', '"nav.users": "Donations"'],
  ['"nav.specialists": "Specialists"', '"nav.specialists": "Grants"'],
  ['"nav.templates": "Templates"', '"nav.templates": "Events"'],
  ['"nav.notices": "News"', '"nav.notices": "Articles"'],
  ['"nav.ratings": "Ratings"', '"nav.ratings": "Products"'],
  ['"login.code": "Код администратора"', '"login.code": "Пароль"'],
  ['"login.placeholder": "Введите код"', '"login.placeholder": "••••••••"'],
  ['"login.home": "На главную"', '"login.home": "На сайт"'],
  ['"login.error": "Неверный код администратора. Попробуйте снова."', '"login.error": "Неверный email или пароль"'],
  ['"dash.metaDesc": "Контроль вопросов, пользователей, гео и консультаций"', '"dash.metaDesc": "Обращения, пожертвования, гранты, магазин и каталог"'],
  ['"dash.users": "Пользователи"', '"dash.users": "Новые обращения"'],
  ['"dash.questions": "AI-вопросы"', '"dash.questions": "Ожидающие пожертвования"'],
  ['"dash.monthly": "Вопросы по месяцам"', '"dash.monthly": "Обращения по месяцам"'],
  ['"dash.monthlySales": "Продажи по месяцам"', '"dash.monthlySales": "Динамика по месяцам"'],
  ['"dash.quality": "Качество ответов"', '"dash.quality": "Открытые задачи"'],
  ['"dash.qualityHint": "Доля успешных ответов ИИ"', '"dash.qualityHint": "Доля записей в очереди"'],
  ['"dash.recent": "Последние вопросы"', '"dash.recent": "Последние обращения"'],
  ['"dash.recentOrders": "Последние заказы"', '"dash.recentOrders": "Последние обращения"'],
  ['"dash.geoTitle": "Откуда заходили"', '"dash.geoTitle": "Состояние каталога"'],
  ['"dash.geoDemo": "Демография клиентов"', '"dash.geoDemo": "Каталог сайта"'],
  ['"dash.geoEmpty": "Геоданных пока нет"', '"dash.geoEmpty": "CMS-записей пока нет"'],
  ['"dash.noQuestions": "Вопросов пока нет"', '"dash.noQuestions": "Обращений пока нет"'],
  ['"login.code": "Admin code"', '"login.code": "Password"'],
  ['"login.placeholder": "Enter code"', '"login.placeholder": "••••••••"'],
  ['"login.home": "Home"', '"login.home": "Back to site"'],
  ['"login.error": "Invalid admin code. Please try again."', '"login.error": "Invalid email or password"'],
  ['"dash.metaDesc": "Control questions, users, geo, and consultations"', '"dash.metaDesc": "Contacts, donations, grants, shop, and catalog"'],
  ['"dash.users": "Users"', '"dash.users": "New contacts"'],
  ['"dash.questions": "AI questions"', '"dash.questions": "Pending donations"'],
  ['"dash.monthly": "Monthly questions"', '"dash.monthly": "Monthly contacts"'],
  ['"dash.monthlySales": "Monthly Sales"', '"dash.monthlySales": "Monthly activity"'],
  ['"dash.quality": "Answer quality"', '"dash.quality": "Open work"'],
  ['"dash.qualityHint": "Share of successful AI answers"', '"dash.qualityHint": "Share of items awaiting action"'],
  ['"dash.recent": "Recent questions"', '"dash.recent": "Recent contacts"'],
  ['"dash.recentOrders": "Recent Orders"', '"dash.recentOrders": "Recent contacts"'],
  ['"dash.geoTitle": "Where they came from"', '"dash.geoTitle": "Catalog status"'],
  ['"dash.geoDemo": "Customers Demographic"', '"dash.geoDemo": "Site catalog"'],
  ['"dash.geoEmpty": "No geo data yet"', '"dash.geoEmpty": "No CMS items yet"'],
  ['"dash.noQuestions": "No questions yet"', '"dash.noQuestions": "No contacts yet"'],
]

for (const [a, b] of pairs) once(a, b)

// Identical RU/EN leftovers after first pass
once('"nav.crm": "CRM"', '"nav.crm": "Board"')
once('"nav.saas": "SaaS"', '"nav.saas": "Account"')
once('"nav.ai": "AI"', '"nav.ai": "Alumni"')

if (!s.includes('"nav.announcements": "Новости"')) {
  once('"nav.notices": "Статьи",\n  "nav.ratings": "Товары"', '"nav.notices": "Статьи",\n  "nav.announcements": "Новости",\n  "nav.ratings": "Товары"')
}
if (!s.includes('"nav.announcements": "Announcements"')) {
  once('"nav.notices": "Articles",\n  "nav.ratings": "Products"', '"nav.notices": "Articles",\n  "nav.announcements": "Announcements",\n  "nav.ratings": "Products"')
}

once(
  '"widget.title": "#1 Tailwind CSS Dashboard",\n  "widget.desc": "Админ-шаблон с 400+ UI-компонентами и страницами.",\n  "widget.buy": "Купить тариф"',
  '"widget.title": "TDYU Endowment",\n  "widget.desc": "Откройте публичный сайт — изменения видны сразу.",\n  "widget.buy": "Открыть сайт"',
)
once(
  '"widget.title": "#1 Tailwind CSS Dashboard",\n  "widget.desc": "Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.",\n  "widget.buy": "Purchase Plan"',
  '"widget.title": "TDYU Endowment",\n  "widget.desc": "Open the public site — changes appear immediately.",\n  "widget.buy": "Open site"',
)

fs.writeFileSync(p, s)
console.log('ok announcements', {
  uz: s.includes('"nav.announcements": "Yangiliklar"'),
  ru: s.includes('"nav.announcements": "Новости"'),
  en: s.includes('"nav.announcements": "Announcements"'),
})
