import { Router } from 'express'
import { prisma } from '../db.mjs'
import { eventToPublic, newsToPublic, personToAlumni, personToBoard, productToPublic } from '../cms-util.mjs'

const router = Router()

router.get('/announcements', async (req, res) => {
  const lang = String(req.query.lang || 'uz')
  const rows = await prisma.announcement.findMany({
    where: { published: true, lang },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    take: 20,
  })
  res.json(rows)
})

router.get('/settings', async (_req, res) => {
  const rows = await prisma.setting.findMany()
  const map = {}
  for (const r of rows) map[r.key] = r.value
  const allowed = [
    'orgName',
    'email',
    'phone',
    'address',
    'bankPayee',
    'bankDetails',
    'socialFacebook',
    'socialInstagram',
    'socialTelegram',
    'socialYoutube',
    'siteTagline',
    'workingHours',
    'privacyText',
  ]
  const out = {}
  for (const k of allowed) if (map[k] !== undefined) out[k] = map[k]
  res.json(out)
})

router.get('/content', async (req, res) => {
  const lang = String(req.query.lang || 'uz')
  const rows = await prisma.contentBlock.findMany({ where: { lang } })
  const map = {}
  for (const r of rows) {
    map[r.key] = { title: r.title, body: r.body, page: r.page }
  }
  res.json(map)
})

router.get('/documents', async (req, res) => {
  const lang = String(req.query.lang || 'uz')
  const category = req.query.category ? String(req.query.category) : undefined
  const rows = await prisma.document.findMany({
    where: {
      published: true,
      OR: [{ lang }, { lang: 'all' }],
      ...(category ? { category } : {}),
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    take: 50,
  })
  res.json(
    rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      lang: r.lang,
      fileName: r.fileName,
      size: r.size,
      url: `/uploads/${r.storedName}`,
      createdAt: r.createdAt,
    })),
  )
})

async function managedPayload(countFn, listFn) {
  const total = await countFn()
  if (total === 0) return { managed: false, items: [] }
  const items = await listFn()
  return { managed: true, items }
}

router.get('/events', async (_req, res) => {
  res.json(
    await managedPayload(
      () => prisma.cmsEvent.count(),
      async () => {
        const rows = await prisma.cmsEvent.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        })
        return rows.map(eventToPublic)
      },
    ),
  )
})

router.get('/events/:slug', async (req, res) => {
  const total = await prisma.cmsEvent.count()
  if (total === 0) return res.json({ managed: false, item: null })
  const row = await prisma.cmsEvent.findUnique({ where: { slug: String(req.params.slug) } })
  if (!row || !row.published) return res.json({ managed: true, item: null })
  res.json({ managed: true, item: eventToPublic(row) })
})

router.get('/news', async (_req, res) => {
  res.json(
    await managedPayload(
      () => prisma.cmsNews.count(),
      async () => {
        const rows = await prisma.cmsNews.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        })
        return rows.map(newsToPublic)
      },
    ),
  )
})

router.get('/news/:slug', async (req, res) => {
  const total = await prisma.cmsNews.count()
  if (total === 0) return res.json({ managed: false, item: null })
  const row = await prisma.cmsNews.findUnique({ where: { slug: String(req.params.slug) } })
  if (!row || !row.published) return res.json({ managed: true, item: null })
  res.json({ managed: true, item: newsToPublic(row) })
})

router.get('/alumni', async (_req, res) => {
  res.json(
    await managedPayload(
      () => prisma.cmsPerson.count({ where: { kind: 'alumni' } }),
      async () => {
        const rows = await prisma.cmsPerson.findMany({
          where: { kind: 'alumni', published: true },
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        })
        return rows.map(personToAlumni)
      },
    ),
  )
})

router.get('/alumni/:slug', async (req, res) => {
  const total = await prisma.cmsPerson.count({ where: { kind: 'alumni' } })
  if (total === 0) return res.json({ managed: false, item: null })
  const row = await prisma.cmsPerson.findFirst({ where: { slug: String(req.params.slug), kind: 'alumni' } })
  if (!row || !row.published) return res.json({ managed: true, item: null })
  res.json({ managed: true, item: personToAlumni(row) })
})

router.get('/board', async (_req, res) => {
  res.json(
    await managedPayload(
      () => prisma.cmsPerson.count({ where: { kind: 'board' } }),
      async () => {
        const rows = await prisma.cmsPerson.findMany({
          where: { kind: 'board', published: true },
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        })
        return rows.map(personToBoard)
      },
    ),
  )
})

router.get('/board/:slug', async (req, res) => {
  const total = await prisma.cmsPerson.count({ where: { kind: 'board' } })
  if (total === 0) return res.json({ managed: false, item: null })
  const row = await prisma.cmsPerson.findFirst({ where: { slug: String(req.params.slug), kind: 'board' } })
  if (!row || !row.published) return res.json({ managed: true, item: null })
  res.json({ managed: true, item: personToBoard(row) })
})

router.get('/shop/products', async (_req, res) => {
  res.json(
    await managedPayload(
      () => prisma.shopProduct.count(),
      async () => {
        const rows = await prisma.shopProduct.findMany({
          where: { published: true },
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        })
        return rows.map(productToPublic)
      },
    ),
  )
})

router.get('/shop/products/:slug', async (req, res) => {
  const total = await prisma.shopProduct.count()
  if (total === 0) return res.json({ managed: false, item: null })
  const row = await prisma.shopProduct.findUnique({ where: { slug: String(req.params.slug) } })
  if (!row || !row.published) return res.json({ managed: true, item: null })
  res.json({ managed: true, item: productToPublic(row) })
})

export default router
