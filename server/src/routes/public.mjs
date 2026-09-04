import { Router } from 'express'
import { prisma } from '../db.mjs'
import { eventToPublic, newsToPublic, personToAlumni, personToBoard, productToPublic } from '../cms-util.mjs'
import { overlayItemPayload, overlayListPayload } from '../cms-overlay.mjs'

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

router.get('/events', async (_req, res) => {
  const [published, drafts] = await Promise.all([
    prisma.cmsEvent.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.cmsEvent.findMany({ where: { published: false }, select: { slug: true } }),
  ])
  res.json(await overlayListPayload('events', published.map(eventToPublic), drafts.map((r) => r.slug)))
})

router.get('/events/:slug', async (req, res) => {
  const row = await prisma.cmsEvent.findUnique({ where: { slug: String(req.params.slug) } })
  res.json(await overlayItemPayload('events', row, eventToPublic, req.params.slug))
})

router.get('/news', async (_req, res) => {
  const [published, drafts] = await Promise.all([
    prisma.cmsNews.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.cmsNews.findMany({ where: { published: false }, select: { slug: true } }),
  ])
  res.json(await overlayListPayload('news', published.map(newsToPublic), drafts.map((r) => r.slug)))
})

router.get('/news/:slug', async (req, res) => {
  const row = await prisma.cmsNews.findUnique({ where: { slug: String(req.params.slug) } })
  res.json(await overlayItemPayload('news', row, newsToPublic, req.params.slug))
})

router.get('/alumni', async (_req, res) => {
  const [published, drafts] = await Promise.all([
    prisma.cmsPerson.findMany({
      where: { kind: 'alumni', published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.cmsPerson.findMany({ where: { kind: 'alumni', published: false }, select: { slug: true } }),
  ])
  res.json(await overlayListPayload('alumni', published.map(personToAlumni), drafts.map((r) => r.slug)))
})

router.get('/alumni/:slug', async (req, res) => {
  const row = await prisma.cmsPerson.findFirst({ where: { slug: String(req.params.slug), kind: 'alumni' } })
  res.json(await overlayItemPayload('alumni', row, personToAlumni, req.params.slug))
})

router.get('/board', async (_req, res) => {
  const [published, drafts] = await Promise.all([
    prisma.cmsPerson.findMany({
      where: { kind: 'board', published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.cmsPerson.findMany({ where: { kind: 'board', published: false }, select: { slug: true } }),
  ])
  res.json(await overlayListPayload('board', published.map(personToBoard), drafts.map((r) => r.slug)))
})

router.get('/board/:slug', async (req, res) => {
  const row = await prisma.cmsPerson.findFirst({ where: { slug: String(req.params.slug), kind: 'board' } })
  res.json(await overlayItemPayload('board', row, personToBoard, req.params.slug))
})

router.get('/shop/products', async (_req, res) => {
  const [published, drafts] = await Promise.all([
    prisma.shopProduct.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.shopProduct.findMany({ where: { published: false }, select: { slug: true } }),
  ])
  res.json(await overlayListPayload('shop', published.map(productToPublic), drafts.map((r) => r.slug)))
})

router.get('/shop/products/:slug', async (req, res) => {
  const row = await prisma.shopProduct.findUnique({ where: { slug: String(req.params.slug) } })
  res.json(await overlayItemPayload('shop', row, productToPublic, req.params.slug))
})

export default router
