import type { Locale } from '@/i18n/routing'

export type ShopCategory = 'stationery' | 'drinkware' | 'apparel' | 'bags' | 'accessories' | 'gifts'

export type ShopProduct = {
  slug: string
  category: ShopCategory
  price: number
  compareAt: number
  featured?: boolean
  stock?: number
  image: string
  name: Record<Locale, string>
  blurb: Record<Locale, string>
}

export const SHOP_CATEGORIES: { id: ShopCategory | 'all'; uz: string; ru: string; en: string }[] = [
  { id: 'all', uz: 'Barchasi', ru: 'Все', en: 'All' },
  { id: 'stationery', uz: 'Yozuv', ru: 'Канцелярия', en: 'Stationery' },
  { id: 'drinkware', uz: 'Ichimlik idishlari', ru: 'Посуда', en: 'Drinkware' },
  { id: 'apparel', uz: 'Kiyim', ru: 'Одежда', en: 'Apparel' },
  { id: 'bags', uz: 'Sumkalar', ru: 'Сумки', en: 'Bags' },
  { id: 'accessories', uz: 'Aksessuar', ru: 'Аксессуары', en: 'Accessories' },
  { id: 'gifts', uz: 'Sovg‘alar', ru: 'Подарки', en: 'Gifts' },
]

export const SHOP_PICKUPS = [
  { id: 'bino-2', uz: '2-bino orqa hovli', ru: '2-й корпус, задний двор', en: 'Building 2, back courtyard' },
  { id: 'bino-3', uz: '3-bino (ODO)', ru: '3-й корпус (ODO)', en: 'Building 3 (ODO)' },
] as const

export type ShopPickupId = (typeof SHOP_PICKUPS)[number]['id']

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: 'bloknot',
    category: 'stationery',
    price: 10_000,
    compareAt: 12_000,
    image: '/media/shop/shop-bloknot.png',
    name: { uz: 'Bloknot', ru: 'Блокнот', en: 'Notebook' },
    blurb: {
      uz: 'Navy muqovali universitet bloknoti — dars va yig‘ilishlar uchun.',
      ru: 'Университетский блокнот в тёмно-синей обложке — для учёбы и встреч.',
      en: 'Navy university notebook for lectures and meetings.',
    },
  },
  {
    slug: 'kundalik',
    category: 'stationery',
    price: 52_000,
    compareAt: 65_000,
    image: '/media/shop/shop-kundalik.png',
    name: { uz: 'Kundalik', ru: 'Ежедневник', en: 'Planner' },
    blurb: {
      uz: 'Qattiq muqovali kundalik, reja va qaydlar uchun.',
      ru: 'Ежедневник в твёрдой обложке для планов и заметок.',
      en: 'Hardcover planner for notes and schedules.',
    },
  },
  {
    slug: 'fleshka-16gb',
    category: 'accessories',
    price: 110_000,
    compareAt: 120_000,
    image: '/media/shop/shop-fleshka.png',
    name: { uz: 'Fleshka 16 GB', ru: 'Флешка 16 ГБ', en: 'USB flash 16 GB' },
    blurb: {
      uz: 'Metall korpusli 16 GB fleshka — fayllar va taqdimotlar uchun.',
      ru: 'Металлическая флешка 16 ГБ — для файлов и презентаций.',
      en: 'Metal 16 GB flash drive for files and presentations.',
    },
  },
  {
    slug: 'shaker',
    category: 'drinkware',
    price: 65_000,
    compareAt: 80_000,
    image: '/media/shop/shop-shaker.png',
    name: { uz: 'Shaker', ru: 'Шейкер', en: 'Shaker' },
    blurb: {
      uz: 'Sport va kundalik suv uchun navy shaker.',
      ru: 'Тёмно-синий шейкер для спорта и повседневного использования.',
      en: 'Navy shaker bottle for sport and daily use.',
    },
  },
  {
    slug: 'krujka',
    category: 'drinkware',
    price: 45_000,
    compareAt: 60_000,
    image: '/media/shop/shop-krujka.png',
    name: { uz: 'Krujka', ru: 'Кружка', en: 'Mug' },
    blurb: {
      uz: 'Keramika krujka — ofis va uy uchun brend suvenir.',
      ru: 'Керамическая кружка — сувенир для офиса и дома.',
      en: 'Ceramic mug — branded souvenir for office and home.',
    },
  },
  {
    slug: 'sovga-toplami',
    category: 'gifts',
    price: 175_000,
    compareAt: 210_000,
    featured: true,
    image: '/media/shop/shop-sovga.png',
    name: { uz: 'Sovg‘a to‘plami', ru: 'Подарочный набор', en: 'Gift set' },
    blurb: {
      uz: 'Quti ichida ruchkalar, bloknot va fleshka — rasmiy sovg‘a.',
      ru: 'Набор в коробке: ручки, блокнот и флешка — официальный подарок.',
      en: 'Boxed set with pens, notebook and flash drive.',
    },
  },
  {
    slug: 'metall-brelok',
    category: 'accessories',
    price: 26_000,
    compareAt: 35_000,
    image: '/media/shop/shop-brelok-metall.png',
    name: { uz: 'Metall brelok', ru: 'Металлический брелок', en: 'Metal keychain' },
    blurb: {
      uz: 'Yengil metall brelok — kalit va sumka uchun.',
      ru: 'Лёгкий металлический брелок для ключей и сумки.',
      en: 'Light metal keychain for keys or a bag.',
    },
  },
  {
    slug: 'teri-brelok',
    category: 'accessories',
    price: 26_000,
    compareAt: 35_000,
    image: '/media/shop/shop-brelok-teri.png',
    name: { uz: 'Teri brelok', ru: 'Кожаный брелок', en: 'Leather keychain' },
    blurb: {
      uz: 'Teri va metall kombinatsiyasi — ixcham suvenir.',
      ru: 'Комбинация кожи и металла — компактный сувенир.',
      en: 'Leather and metal souvenir keychain.',
    },
  },
  {
    slug: 'konvert',
    category: 'stationery',
    price: 8_000,
    compareAt: 10_000,
    image: '/media/shop/shop-konvert.png',
    name: { uz: 'Konvert', ru: 'Конверт', en: 'Envelope' },
    blurb: {
      uz: 'Brend konvert — hujjat va taklifnomalar uchun.',
      ru: 'Брендированный конверт для документов и приглашений.',
      en: 'Branded envelope for documents and invitations.',
    },
  },
  {
    slug: 'kovrik',
    category: 'accessories',
    price: 22_000,
    compareAt: 30_000,
    image: '/media/shop/shop-kovrik.png',
    name: { uz: 'Kovrik', ru: 'Коврик', en: 'Mouse pad' },
    blurb: {
      uz: 'Ish stoli uchun navy sichqoncha kovrigi.',
      ru: 'Тёмно-синий коврик для мыши на рабочий стол.',
      en: 'Navy desk mouse pad.',
    },
  },
  {
    slug: 'magnit',
    category: 'accessories',
    price: 18_000,
    compareAt: 22_000,
    image: '/media/shop/shop-magnit.png',
    name: { uz: 'Magnit', ru: 'Магнит', en: 'Magnet' },
    blurb: {
      uz: 'Yumaloq muzlatgich magniti — kichik esdalik.',
      ru: 'Круглый магнит на холодильник — маленький сувенир.',
      en: 'Round fridge magnet souvenir.',
    },
  },
  {
    slug: 'oddiy-futbolka',
    category: 'apparel',
    price: 45_000,
    compareAt: 60_000,
    image: '/media/shop/shop-futbolka.png',
    name: { uz: 'Oddiy futbolka', ru: 'Футболка', en: 'T-shirt' },
    blurb: {
      uz: 'Navy futbolka — kundalik kiyim va tadbirlar uchun.',
      ru: 'Тёмно-синяя футболка для повседневной носки и мероприятий.',
      en: 'Navy t-shirt for daily wear and events.',
    },
  },
  {
    slug: 'polo-futbolka',
    category: 'apparel',
    price: 65_000,
    compareAt: 80_000,
    featured: true,
    image: '/media/shop/shop-polo.png',
    name: { uz: 'Polo futbolka', ru: 'Футболка поло', en: 'Polo shirt' },
    blurb: {
      uz: 'Oq hoshiyali polo — rasmiyroq kundalik uslub.',
      ru: 'Поло с белой отделкой — более официальный повседневный стиль.',
      en: 'Polo with white trim for a smarter everyday look.',
    },
  },
  {
    slug: 'polo-vishivka',
    category: 'apparel',
    price: 70_000,
    compareAt: 90_000,
    image: '/media/shop/shop-polo-vishivka.png',
    name: { uz: 'Polo vishivka', ru: 'Поло с вышивкой', en: 'Embroidered polo' },
    blurb: {
      uz: 'Oq polo, ko‘krakda kashta gerb.',
      ru: 'Белое поло с вышитым гербом на груди.',
      en: 'White polo with embroidered crest.',
    },
  },
  {
    slug: 'panama',
    category: 'apparel',
    price: 45_000,
    compareAt: 55_000,
    image: '/media/shop/shop-panama.png',
    name: { uz: 'Panama', ru: 'Панама', en: 'Bucket hat' },
    blurb: {
      uz: 'Navy panama — yozgi campus uchun.',
      ru: 'Тёмно-синяя панама для летнего кампуса.',
      en: 'Navy bucket hat for campus in summer.',
    },
  },
  {
    slug: 'nimcha',
    category: 'apparel',
    price: 155_000,
    compareAt: 185_000,
    image: '/media/shop/shop-nimcha.png',
    name: { uz: 'Nimcha (jilet)', ru: 'Жилет', en: 'Vest' },
    blurb: {
      uz: 'Ish va tadbirlar uchun navy jilet.',
      ru: 'Тёмно-синий жилет для работы и мероприятий.',
      en: 'Navy vest for work and events.',
    },
  },
  {
    slug: 'ryukzak-material',
    category: 'bags',
    price: 190_000,
    compareAt: 220_000,
    image: '/media/shop/shop-ryukzak.png',
    name: { uz: 'Ryukzak (material)', ru: 'Рюкзак (ткань)', en: 'Backpack (fabric)' },
    blurb: {
      uz: 'Mato ryukzak — kitob va noutbuk uchun.',
      ru: 'Тканевый рюкзак для книг и ноутбука.',
      en: 'Fabric backpack for books and a laptop.',
    },
  },
  {
    slug: 'ryukzak-charm',
    category: 'bags',
    price: 200_000,
    compareAt: 220_000,
    image: '/media/shop/shop-ryukzak-charm.png',
    name: { uz: 'Ryukzak (charm)', ru: 'Рюкзак (кожа)', en: 'Backpack (leather)' },
    blurb: {
      uz: 'Charm ryukzak — mustahkam kundalik sumka.',
      ru: 'Кожаный рюкзак — прочная повседневная сумка.',
      en: 'Leather backpack for daily campus use.',
    },
  },
  {
    slug: 'shopper-halta',
    category: 'bags',
    price: 20_000,
    compareAt: 30_000,
    image: '/media/shop/shop-shopper.png',
    name: { uz: 'Shopper halta', ru: 'Шоппер', en: 'Tote bag' },
    blurb: {
      uz: 'Yengil shopper — xarid va kitoblar uchun.',
      ru: 'Лёгкий шоппер для покупок и книг.',
      en: 'Light tote for shopping and books.',
    },
  },
  {
    slug: 'shopper-ryukzak',
    category: 'bags',
    price: 22_000,
    compareAt: 30_000,
    image: '/media/shop/shop-shopper-ryukzak.png',
    name: { uz: 'Shopper ryukzak', ru: 'Шоппер-рюкзак', en: 'Shopper backpack' },
    blurb: {
      uz: 'Ikkita tasma bilan shopper-ryukzak.',
      ru: 'Шоппер-рюкзак с двумя лямками.',
      en: 'Shopper backpack with two straps.',
    },
  },
  {
    slug: 'kichik-shopper',
    category: 'bags',
    price: 22_000,
    compareAt: 30_000,
    image: '/media/shop/shop-shopper-kichik.png',
    name: { uz: 'Kichik shopper', ru: 'Малый шоппер', en: 'Small shopper' },
    blurb: {
      uz: 'Ixcham shopper — kundalik mayda narsalar uchun.',
      ru: 'Компактный шоппер для повседневных мелочей.',
      en: 'Compact shopper for everyday small items.',
    },
  },
  {
    slug: 'galstuk',
    category: 'apparel',
    price: 195_000,
    compareAt: 220_000,
    image: '/media/shop/shop-galstuk.png',
    name: { uz: 'Galstuk', ru: 'Галстук', en: 'Tie' },
    blurb: {
      uz: 'Navy ipak uslubidagi galstuk — rasmiy tadbirlar uchun.',
      ru: 'Тёмно-синий галстук для официальных мероприятий.',
      en: 'Navy tie for formal events.',
    },
  },
  {
    slug: 'termos',
    category: 'drinkware',
    price: 65_000,
    compareAt: 80_000,
    image: '/media/shop/shop-termos.png',
    name: { uz: 'Termos', ru: 'Термос', en: 'Thermos' },
    blurb: {
      uz: 'Issiq-sovuq ichimlik uchun vakuum termos.',
      ru: 'Вакуумный термос для горячих и холодных напитков.',
      en: 'Vacuum flask for hot and cold drinks.',
    },
  },
  {
    slug: 'termokrujka',
    category: 'drinkware',
    price: 65_000,
    compareAt: 80_000,
    image: '/media/shop/shop-termokrujka.png',
    name: { uz: 'Termokrujka', ru: 'Термокружка', en: 'Travel mug' },
    blurb: {
      uz: 'Qopqoqli termokrujka — yo‘l va auditoriya uchun.',
      ru: 'Термокружка с крышкой — в дорогу и на пары.',
      en: 'Lidded travel mug for campus and commute.',
    },
  },
  {
    slug: 'kurtka',
    category: 'apparel',
    price: 505_000,
    compareAt: 580_000,
    featured: true,
    image: '/media/shop/shop-kurtka.png',
    name: { uz: 'Kurtka', ru: 'Куртка', en: 'Jacket' },
    blurb: {
      uz: 'Navy kurtka — kuz-qish campus kiyimi.',
      ru: 'Тёмно-синяя куртка для кампуса осенью и зимой.',
      en: 'Navy jacket for autumn and winter on campus.',
    },
  },
  {
    slug: 'kepka-qalin',
    category: 'apparel',
    price: 40_000,
    compareAt: 50_000,
    image: '/media/shop/shop-kepka-qalin.png',
    name: { uz: 'Kepka (qalin material)', ru: 'Кепка (плотная)', en: 'Cap (thick)' },
    blurb: {
      uz: 'Qalin materialli beysbol kepkasi.',
      ru: 'Бейсболка из плотного материала.',
      en: 'Structured baseball cap in thick fabric.',
    },
  },
  {
    slug: 'kepka-yupqa',
    category: 'apparel',
    price: 35_000,
    compareAt: 45_000,
    image: '/media/shop/shop-kepka-yupqa.png',
    name: { uz: 'Kepka (yupqa material)', ru: 'Кепка (лёгкая)', en: 'Cap (light)' },
    blurb: {
      uz: 'Yengil yupqa kepka — issiq kunlar uchun.',
      ru: 'Лёгкая кепка для тёплой погоды.',
      en: 'Lightweight cap for warm days.',
    },
  },
  {
    slug: 'logotipli-soat',
    category: 'accessories',
    price: 550_000,
    compareAt: 620_000,
    featured: true,
    image: '/media/shop/shop-soat.png',
    name: { uz: 'Logotipli soat', ru: 'Часы с логотипом', en: 'Branded watch' },
    blurb: {
      uz: 'Charm tasmalı brend soat — rasmiy sovg‘a.',
      ru: 'Часы с кожаным ремешком — официальный подарок.',
      en: 'Leather-strap branded watch as a formal gift.',
    },
  },
]

export function getShopProduct(slug: string) {
  return SHOP_PRODUCTS.find((p) => p.slug === slug)
}

export function productSizes(product: ShopProduct): readonly string[] {
  if (product.category !== 'apparel') return []
  if (product.slug === 'galstuk') return []
  if (product.slug === 'panama' || product.slug.startsWith('kepka')) return ['S', 'M', 'L']
  return ['S', 'M', 'L', 'XL']
}

export function relatedProducts(slug: string, limit = 4) {
  const current = getShopProduct(slug)
  if (!current) return []
  const same = SHOP_PRODUCTS.filter((p) => p.slug !== slug && p.category === current.category)
  const rest = SHOP_PRODUCTS.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...same, ...rest].slice(0, limit)
}

export function formatSom(n: number, locale: Locale) {
  const formatted = new Intl.NumberFormat('uz-UZ').format(n).replace(/,/g, ' ')
  if (locale === 'en') return `${formatted} UZS`
  if (locale === 'ru') return `${formatted} сум`
  return `${formatted} so‘m`
}

export function categoryLabel(id: ShopCategory | 'all', locale: Locale) {
  const row = SHOP_CATEGORIES.find((c) => c.id === id)
  if (!row) return id
  return locale === 'ru' ? row.ru : locale === 'en' ? row.en : row.uz
}

export function pickupLabel(id: string, locale: Locale) {
  const row = SHOP_PICKUPS.find((p) => p.id === id)
  if (!row) return id
  return locale === 'ru' ? row.ru : locale === 'en' ? row.en : row.uz
}
