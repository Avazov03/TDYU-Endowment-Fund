export function slugify(value, fallback = 'item') {
  const s = String(value || '')
    .toLowerCase()
    .replace(/[‘’ʻʼ']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return s || `${fallback}-${Date.now().toString(36)}`
}

export function str(v, d = '') {
  if (v === undefined || v === null) return d
  return String(v)
}

export function bool(v, d = true) {
  if (v === undefined || v === null || v === '') return d
  return v === true || v === 'true' || v === 1 || v === '1'
}

export function int(v, d = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? Math.round(n) : d
}

export function paragraphs(text) {
  return String(text || '')
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function joinLines(arr) {
  if (!Array.isArray(arr)) return str(arr)
  return arr.map((s) => String(s).trim()).filter(Boolean).join('\n')
}

export function eventToPublic(row) {
  return {
    slug: row.slug,
    img: row.coverUrl || '/media/events/e-event-img-1-min.jpg',
    video: row.videoUrl || '',
    date: row.dateUz,
    dateRu: row.dateRu || row.dateUz,
    dateEn: row.dateEn || row.dateUz,
    time: row.time,
    title: row.titleUz,
    titleRu: row.titleRu || row.titleUz,
    titleEn: row.titleEn || row.titleUz,
    loc: row.locUz,
    locRu: row.locRu || row.locUz,
    locEn: row.locEn || row.locUz,
    body: paragraphs(row.bodyUz),
    bodyRu: paragraphs(row.bodyRu || row.bodyUz),
    bodyEn: paragraphs(row.bodyEn || row.bodyUz),
    goals: paragraphs(row.goalsUz),
    goalsRu: paragraphs(row.goalsRu || row.goalsUz),
    goalsEn: paragraphs(row.goalsEn || row.goalsUz),
  }
}

export function newsToPublic(row) {
  return {
    slug: row.slug,
    img: row.coverUrl || '/media/news/e-bl-img1-8-min-1024x614.jpg',
    video: row.videoUrl || '',
    tag: row.tagUz,
    tagRu: row.tagRu || row.tagUz,
    tagEn: row.tagEn || row.tagUz,
    date: row.dateUz,
    dateRu: row.dateRu || row.dateUz,
    dateEn: row.dateEn || row.dateUz,
    title: row.titleUz,
    titleRu: row.titleRu || row.titleUz,
    titleEn: row.titleEn || row.titleUz,
    excerpt: row.excerptUz,
    excerptRu: row.excerptRu || row.excerptUz,
    excerptEn: row.excerptEn || row.excerptUz,
    body: paragraphs(row.bodyUz),
    bodyRu: paragraphs(row.bodyRu || row.bodyUz),
    bodyEn: paragraphs(row.bodyEn || row.bodyUz),
  }
}

export function personToAlumni(row) {
  const lat = row.mapLat
  const lng = row.mapLng
  return {
    slug: row.slug,
    img: row.coverUrl || '/media/alumni/alamni-team-3.jpg',
    name: row.nameUz,
    nameRu: row.nameRu || row.nameUz,
    nameEn: row.nameEn || row.nameUz,
    role: row.roleUz,
    roleRu: row.roleRu || row.roleUz,
    roleEn: row.roleEn || row.roleUz,
    about: row.aboutUz,
    aboutRu: row.aboutRu || row.aboutUz,
    aboutEn: row.aboutEn || row.aboutUz,
    quals: paragraphs(row.qualsUz),
    qualsRu: paragraphs(row.qualsRu || row.qualsUz),
    qualsEn: paragraphs(row.qualsEn || row.qualsUz),
    mapCategory: row.mapCategory || undefined,
    mapLocation:
      lat != null && lng != null && !(lat === 0 && lng === 0)
        ? { lat, lng, label: row.mapLabel || row.countryCode || '', demo: false }
        : undefined,
    countryCode: row.countryCode || undefined,
  }
}

export function personToBoard(row) {
  return {
    id: row.code || row.slug,
    slug: row.slug,
    img: row.coverUrl || '/media/board/e-bl-team-6-min.jpg',
    name: row.nameUz,
    nameRu: row.nameRu || row.nameUz,
    nameEn: row.nameEn || row.nameUz,
    role: row.roleUz,
    roleRu: row.roleRu || row.roleUz,
    roleEn: row.roleEn || row.roleUz,
    about: row.aboutUz,
    aboutRu: row.aboutRu || row.aboutUz,
    aboutEn: row.aboutEn || row.aboutUz,
    quals: paragraphs(row.qualsUz),
    qualsRu: paragraphs(row.qualsRu || row.qualsUz),
    qualsEn: paragraphs(row.qualsEn || row.qualsUz),
  }
}

export function productToPublic(row) {
  return {
    slug: row.slug,
    category: row.category,
    price: row.price,
    compareAt: row.compareAt || 0,
    featured: Boolean(row.featured),
    stock: row.stock,
    image: row.coverUrl || '/media/shop/shop-bloknot.png',
    name: { uz: row.nameUz, ru: row.nameRu || row.nameUz, en: row.nameEn || row.nameUz },
    blurb: { uz: row.blurbUz, ru: row.blurbRu || row.blurbUz, en: row.blurbEn || row.blurbUz },
  }
}

export function eventFromImport(item, index = 0) {
  return {
    slug: slugify(item.slug || item.title, 'event'),
    published: true,
    sortOrder: index,
    coverUrl: item.img || item.coverUrl || null,
    videoUrl: item.video || item.videoUrl || null,
    dateUz: str(item.date),
    dateRu: str(item.dateRu || item.date),
    dateEn: str(item.dateEn || item.date),
    time: str(item.time),
    titleUz: str(item.title),
    titleRu: str(item.titleRu || item.title),
    titleEn: str(item.titleEn || item.title),
    locUz: str(item.loc),
    locRu: str(item.locRu || item.loc),
    locEn: str(item.locEn || item.loc),
    bodyUz: joinLines(item.body),
    bodyRu: joinLines(item.bodyRu || item.body),
    bodyEn: joinLines(item.bodyEn || item.body),
    goalsUz: joinLines(item.goals),
    goalsRu: joinLines(item.goalsRu || item.goals),
    goalsEn: joinLines(item.goalsEn || item.goals),
  }
}

export function newsFromImport(item, index = 0) {
  return {
    slug: slugify(item.slug || item.title, 'news'),
    published: true,
    sortOrder: index,
    coverUrl: item.img || item.coverUrl || null,
    videoUrl: item.video || item.videoUrl || null,
    tagUz: str(item.tag),
    tagRu: str(item.tagRu || item.tag),
    tagEn: str(item.tagEn || item.tag),
    dateUz: str(item.date),
    dateRu: str(item.dateRu || item.date),
    dateEn: str(item.dateEn || item.date),
    titleUz: str(item.title),
    titleRu: str(item.titleRu || item.title),
    titleEn: str(item.titleEn || item.title),
    excerptUz: str(item.excerpt),
    excerptRu: str(item.excerptRu || item.excerpt),
    excerptEn: str(item.excerptEn || item.excerpt),
    bodyUz: joinLines(item.body),
    bodyRu: joinLines(item.bodyRu || item.body),
    bodyEn: joinLines(item.bodyEn || item.body),
    featured: index < 3,
  }
}

export function personFromImport(item, kind, index = 0) {
  const loc = item.mapLocation || {}
  return {
    kind,
    slug: slugify(item.slug || item.name, kind),
    code: item.id ? str(item.id) : null,
    published: true,
    sortOrder: index,
    coverUrl: item.img || item.coverUrl || null,
    nameUz: str(item.name),
    nameRu: str(item.nameRu || item.name),
    nameEn: str(item.nameEn || item.name),
    roleUz: str(item.role),
    roleRu: str(item.roleRu || item.role),
    roleEn: str(item.roleEn || item.role),
    aboutUz: str(item.about),
    aboutRu: str(item.aboutRu || item.about),
    aboutEn: str(item.aboutEn || item.about),
    qualsUz: joinLines(item.quals),
    qualsRu: joinLines(item.qualsRu || item.quals),
    qualsEn: joinLines(item.qualsEn || item.quals),
    countryCode: item.countryCode || null,
    mapLat: loc.lat != null ? Number(loc.lat) : null,
    mapLng: loc.lng != null ? Number(loc.lng) : null,
    mapCategory: item.mapCategory || null,
    mapLabel: loc.label || item.mapLabel || null,
  }
}

export function productFromImport(item, index = 0) {
  return {
    slug: slugify(item.slug || item.name?.uz, 'product'),
    category: str(item.category, 'gifts'),
    price: int(item.price),
    compareAt: int(item.compareAt),
    stock: item.stock != null ? int(item.stock) : 50,
    featured: Boolean(item.featured),
    published: true,
    sortOrder: index,
    coverUrl: item.image || item.coverUrl || null,
    nameUz: str(item.name?.uz || item.nameUz),
    nameRu: str(item.name?.ru || item.nameRu),
    nameEn: str(item.name?.en || item.nameEn),
    blurbUz: str(item.blurb?.uz || item.blurbUz),
    blurbRu: str(item.blurb?.ru || item.blurbRu),
    blurbEn: str(item.blurb?.en || item.blurbEn),
  }
}

export function eventWrite(body, existing) {
  const titleUz = str(body.titleUz || body.title, existing?.titleUz)
  if (!titleUz.trim()) throw new Error('titleUz required')
  const slug = slugify(body.slug || titleUz, 'event')
  return {
    slug,
    published: bool(body.published, existing?.published ?? true),
    sortOrder: int(body.sortOrder, existing?.sortOrder ?? 0),
    coverUrl: body.coverUrl !== undefined ? str(body.coverUrl, '') || null : existing?.coverUrl,
    videoUrl: body.videoUrl !== undefined ? str(body.videoUrl, '') || null : existing?.videoUrl,
    dateUz: str(body.dateUz, existing?.dateUz || ''),
    dateRu: str(body.dateRu, existing?.dateRu || ''),
    dateEn: str(body.dateEn, existing?.dateEn || ''),
    time: str(body.time, existing?.time || ''),
    titleUz,
    titleRu: str(body.titleRu, existing?.titleRu || ''),
    titleEn: str(body.titleEn, existing?.titleEn || ''),
    locUz: str(body.locUz, existing?.locUz || ''),
    locRu: str(body.locRu, existing?.locRu || ''),
    locEn: str(body.locEn, existing?.locEn || ''),
    bodyUz: str(body.bodyUz, existing?.bodyUz || ''),
    bodyRu: str(body.bodyRu, existing?.bodyRu || ''),
    bodyEn: str(body.bodyEn, existing?.bodyEn || ''),
    goalsUz: str(body.goalsUz, existing?.goalsUz || ''),
    goalsRu: str(body.goalsRu, existing?.goalsRu || ''),
    goalsEn: str(body.goalsEn, existing?.goalsEn || ''),
  }
}

export function newsWrite(body, existing) {
  const titleUz = str(body.titleUz || body.title, existing?.titleUz)
  if (!titleUz.trim()) throw new Error('titleUz required')
  return {
    slug: slugify(body.slug || titleUz, 'news'),
    published: bool(body.published, existing?.published ?? true),
    sortOrder: int(body.sortOrder, existing?.sortOrder ?? 0),
    coverUrl: body.coverUrl !== undefined ? str(body.coverUrl, '') || null : existing?.coverUrl,
    videoUrl: body.videoUrl !== undefined ? str(body.videoUrl, '') || null : existing?.videoUrl,
    tagUz: str(body.tagUz, existing?.tagUz || ''),
    tagRu: str(body.tagRu, existing?.tagRu || ''),
    tagEn: str(body.tagEn, existing?.tagEn || ''),
    dateUz: str(body.dateUz, existing?.dateUz || ''),
    dateRu: str(body.dateRu, existing?.dateRu || ''),
    dateEn: str(body.dateEn, existing?.dateEn || ''),
    titleUz,
    titleRu: str(body.titleRu, existing?.titleRu || ''),
    titleEn: str(body.titleEn, existing?.titleEn || ''),
    excerptUz: str(body.excerptUz, existing?.excerptUz || ''),
    excerptRu: str(body.excerptRu, existing?.excerptRu || ''),
    excerptEn: str(body.excerptEn, existing?.excerptEn || ''),
    bodyUz: str(body.bodyUz, existing?.bodyUz || ''),
    bodyRu: str(body.bodyRu, existing?.bodyRu || ''),
    bodyEn: str(body.bodyEn, existing?.bodyEn || ''),
    featured: bool(body.featured, existing?.featured ?? false),
  }
}

export function personWrite(body, kind, existing) {
  const nameUz = str(body.nameUz || body.name, existing?.nameUz)
  if (!nameUz.trim()) throw new Error('nameUz required')
  return {
    kind,
    slug: slugify(body.slug || nameUz, kind),
    code: body.code !== undefined ? str(body.code, '') || null : existing?.code,
    published: bool(body.published, existing?.published ?? true),
    sortOrder: int(body.sortOrder, existing?.sortOrder ?? 0),
    coverUrl: body.coverUrl !== undefined ? str(body.coverUrl, '') || null : existing?.coverUrl,
    nameUz,
    nameRu: str(body.nameRu, existing?.nameRu || ''),
    nameEn: str(body.nameEn, existing?.nameEn || ''),
    roleUz: str(body.roleUz, existing?.roleUz || ''),
    roleRu: str(body.roleRu, existing?.roleRu || ''),
    roleEn: str(body.roleEn, existing?.roleEn || ''),
    aboutUz: str(body.aboutUz, existing?.aboutUz || ''),
    aboutRu: str(body.aboutRu, existing?.aboutRu || ''),
    aboutEn: str(body.aboutEn, existing?.aboutEn || ''),
    qualsUz: str(body.qualsUz, existing?.qualsUz || ''),
    qualsRu: str(body.qualsRu, existing?.qualsRu || ''),
    qualsEn: str(body.qualsEn, existing?.qualsEn || ''),
    countryCode: body.countryCode !== undefined ? str(body.countryCode, '') || null : existing?.countryCode,
    mapLat: body.mapLat !== undefined ? (body.mapLat === '' || body.mapLat == null ? null : Number(body.mapLat)) : existing?.mapLat,
    mapLng: body.mapLng !== undefined ? (body.mapLng === '' || body.mapLng == null ? null : Number(body.mapLng)) : existing?.mapLng,
    mapCategory: body.mapCategory !== undefined ? str(body.mapCategory, '') || null : existing?.mapCategory,
    mapLabel: body.mapLabel !== undefined ? str(body.mapLabel, '') || null : existing?.mapLabel,
  }
}

export function productWrite(body, existing) {
  const nameUz = str(body.nameUz, existing?.nameUz)
  if (!nameUz.trim()) throw new Error('nameUz required')
  return {
    slug: slugify(body.slug || nameUz, 'product'),
    category: str(body.category, existing?.category || 'gifts'),
    price: int(body.price, existing?.price ?? 0),
    compareAt: int(body.compareAt, existing?.compareAt ?? 0),
    stock: int(body.stock, existing?.stock ?? 0),
    featured: bool(body.featured, existing?.featured ?? false),
    published: bool(body.published, existing?.published ?? true),
    sortOrder: int(body.sortOrder, existing?.sortOrder ?? 0),
    coverUrl: body.coverUrl !== undefined ? str(body.coverUrl, '') || null : existing?.coverUrl,
    nameUz,
    nameRu: str(body.nameRu, existing?.nameRu || ''),
    nameEn: str(body.nameEn, existing?.nameEn || ''),
    blurbUz: str(body.blurbUz, existing?.blurbUz || ''),
    blurbRu: str(body.blurbRu, existing?.blurbRu || ''),
    blurbEn: str(body.blurbEn, existing?.blurbEn || ''),
  }
}

export function parseMoney(value) {
  const n = Number(String(value || '').replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : 0
}
