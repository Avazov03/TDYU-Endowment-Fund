import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { prisma } from '../db.mjs'
import { authRequired, hashPassword, verifyPassword } from '../auth.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.join(__dirname, '../../uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${Date.now()}-${safe}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
})

const router = Router()
router.use(authRequired)

router.get('/stats', async (_req, res) => {
  const [contactsNew, donationsPending, grantsNew, subscribers, announcements, documents, contentBlocks] =
    await Promise.all([
      prisma.contactMessage.count({ where: { status: 'new' } }),
      prisma.donation.count({ where: { status: 'pending' } }),
      prisma.grantApplication.count({ where: { status: 'new' } }),
      prisma.newsletterSubscriber.count(),
      prisma.announcement.count({ where: { published: true } }),
      prisma.document.count({ where: { published: true } }),
      prisma.contentBlock.count(),
    ])
  res.json({
    contactsNew,
    donationsPending,
    grantsNew,
    subscribers,
    announcements,
    documents,
    contentBlocks,
  })
})

router.get('/contacts', async (req, res) => {
  const status = req.query.status
  const rows = await prisma.contactMessage.findMany({
    where: status ? { status: String(status) } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 200,
  })
  res.json(rows)
})

router.get('/contacts/:id', async (req, res) => {
  const row = await prisma.contactMessage.findUnique({ where: { id: req.params.id } })
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

router.patch('/contacts/:id', async (req, res) => {
  const { status, adminNote } = req.body || {}
  const row = await prisma.contactMessage.update({
    where: { id: req.params.id },
    data: {
      status: status !== undefined ? String(status) : undefined,
      adminNote: adminNote !== undefined ? String(adminNote) : undefined,
    },
  })
  res.json(row)
})

router.delete('/contacts/:id', async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

router.get('/donations', async (req, res) => {
  const status = req.query.status
  const rows = await prisma.donation.findMany({
    where: status ? { status: String(status) } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 200,
  })
  res.json(rows)
})

router.get('/donations/:id', async (req, res) => {
  const row = await prisma.donation.findUnique({ where: { id: req.params.id } })
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

router.patch('/donations/:id', async (req, res) => {
  const { status, adminNote } = req.body || {}
  const row = await prisma.donation.update({
    where: { id: req.params.id },
    data: {
      status: status !== undefined ? String(status) : undefined,
      adminNote: adminNote !== undefined ? String(adminNote) : undefined,
    },
  })
  res.json(row)
})

router.delete('/donations/:id', async (req, res) => {
  await prisma.donation.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

router.get('/grants', async (req, res) => {
  const status = req.query.status
  const rows = await prisma.grantApplication.findMany({
    where: status ? { status: String(status) } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 200,
  })
  res.json(rows)
})

router.get('/grants/:id', async (req, res) => {
  const row = await prisma.grantApplication.findUnique({ where: { id: req.params.id } })
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

router.patch('/grants/:id', async (req, res) => {
  const { status, adminNote } = req.body || {}
  const row = await prisma.grantApplication.update({
    where: { id: req.params.id },
    data: {
      status: status !== undefined ? String(status) : undefined,
      adminNote: adminNote !== undefined ? String(adminNote) : undefined,
    },
  })
  res.json(row)
})

router.delete('/grants/:id', async (req, res) => {
  await prisma.grantApplication.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

router.get('/subscribers', async (_req, res) => {
  const rows = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(rows)
})

router.delete('/subscribers/:id', async (req, res) => {
  await prisma.newsletterSubscriber.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

router.get('/subscribers.csv', async (_req, res) => {
  const rows = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })
  const lines = ['email,lang,createdAt', ...rows.map((r) => `${r.email},${r.lang},${r.createdAt.toISOString()}`)]
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="subscribers.csv"')
  res.send(lines.join('\n'))
})

router.get('/announcements', async (_req, res) => {
  const rows = await prisma.announcement.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
  res.json(rows)
})

router.post('/announcements', async (req, res) => {
  const { title, excerpt, dateLabel, lang, published, sortOrder } = req.body || {}
  if (!title) return res.status(400).json({ error: 'title required' })
  const row = await prisma.announcement.create({
    data: {
      title: String(title),
      excerpt: excerpt ? String(excerpt) : null,
      dateLabel: dateLabel ? String(dateLabel) : null,
      lang: lang || 'uz',
      published: published !== false,
      sortOrder: Number(sortOrder) || 0,
    },
  })
  res.status(201).json(row)
})

router.patch('/announcements/:id', async (req, res) => {
  const b = req.body || {}
  const row = await prisma.announcement.update({
    where: { id: req.params.id },
    data: {
      title: b.title !== undefined ? String(b.title) : undefined,
      excerpt: b.excerpt !== undefined ? String(b.excerpt) : undefined,
      dateLabel: b.dateLabel !== undefined ? String(b.dateLabel) : undefined,
      lang: b.lang !== undefined ? String(b.lang) : undefined,
      published: b.published !== undefined ? Boolean(b.published) : undefined,
      sortOrder: b.sortOrder !== undefined ? Number(b.sortOrder) : undefined,
    },
  })
  res.json(row)
})

router.delete('/announcements/:id', async (req, res) => {
  await prisma.announcement.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

router.get('/content', async (req, res) => {
  const lang = req.query.lang ? String(req.query.lang) : undefined
  const rows = await prisma.contentBlock.findMany({
    where: lang ? { lang } : undefined,
    orderBy: [{ key: 'asc' }, { lang: 'asc' }],
  })
  res.json(rows)
})

router.post('/content', async (req, res) => {
  const { key, lang, title, body, page } = req.body || {}
  if (!key || !body) return res.status(400).json({ error: 'key and body required' })
  const row = await prisma.contentBlock.upsert({
    where: { key_lang: { key: String(key), lang: lang || 'uz' } },
    create: {
      key: String(key),
      lang: lang || 'uz',
      title: title ? String(title) : null,
      body: String(body),
      page: page ? String(page) : null,
    },
    update: {
      title: title !== undefined ? String(title) : undefined,
      body: String(body),
      page: page !== undefined ? String(page) : undefined,
    },
  })
  res.status(201).json(row)
})

router.patch('/content/:id', async (req, res) => {
  const b = req.body || {}
  const row = await prisma.contentBlock.update({
    where: { id: req.params.id },
    data: {
      title: b.title !== undefined ? String(b.title) : undefined,
      body: b.body !== undefined ? String(b.body) : undefined,
      page: b.page !== undefined ? String(b.page) : undefined,
      lang: b.lang !== undefined ? String(b.lang) : undefined,
      key: b.key !== undefined ? String(b.key) : undefined,
    },
  })
  res.json(row)
})

router.delete('/content/:id', async (req, res) => {
  await prisma.contentBlock.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

router.get('/documents', async (_req, res) => {
  const rows = await prisma.document.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
  res.json(rows)
})

router.post('/documents', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file required' })
  const { title, description, category, lang, published } = req.body || {}
  const row = await prisma.document.create({
    data: {
      title: title ? String(title) : req.file.originalname,
      description: description ? String(description) : null,
      category: category ? String(category) : 'report',
      lang: lang || 'uz',
      fileName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      published: published !== 'false' && published !== false,
    },
  })
  res.status(201).json(row)
})

router.patch('/documents/:id', async (req, res) => {
  const b = req.body || {}
  const row = await prisma.document.update({
    where: { id: req.params.id },
    data: {
      title: b.title !== undefined ? String(b.title) : undefined,
      description: b.description !== undefined ? String(b.description) : undefined,
      category: b.category !== undefined ? String(b.category) : undefined,
      lang: b.lang !== undefined ? String(b.lang) : undefined,
      published: b.published !== undefined ? Boolean(b.published) : undefined,
      sortOrder: b.sortOrder !== undefined ? Number(b.sortOrder) : undefined,
    },
  })
  res.json(row)
})

router.delete('/documents/:id', async (req, res) => {
  const row = await prisma.document.findUnique({ where: { id: req.params.id } })
  if (row) {
    const fp = path.join(uploadDir, row.storedName)
    if (fs.existsSync(fp)) fs.unlinkSync(fp)
    await prisma.document.delete({ where: { id: req.params.id } })
  }
  res.json({ ok: true })
})

router.get('/settings', async (_req, res) => {
  const rows = await prisma.setting.findMany()
  const map = {}
  for (const r of rows) map[r.key] = r.value
  res.json(map)
})

router.put('/settings', async (req, res) => {
  const body = req.body || {}
  const keys = Object.keys(body)
  for (const key of keys) {
    await prisma.setting.upsert({
      where: { key },
      create: { key, value: String(body[key] ?? '') },
      update: { value: String(body[key] ?? '') },
    })
  }
  const rows = await prisma.setting.findMany()
  const map = {}
  for (const r of rows) map[r.key] = r.value
  res.json(map)
})

router.post('/account/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword || String(newPassword).length < 8) {
    return res.status(400).json({ error: 'Yangi parol kamida 8 belgi bo‘lishi kerak' })
  }
  const user = await prisma.adminUser.findUnique({ where: { id: req.user.sub } })
  if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
    return res.status(401).json({ error: 'Joriy parol noto‘g‘ri' })
  }
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(String(newPassword)) },
  })
  res.json({ ok: true })
})

export default router
