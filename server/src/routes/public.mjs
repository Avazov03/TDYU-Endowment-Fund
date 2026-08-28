import { Router } from 'express'
import { prisma } from '../db.mjs'

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

export default router
