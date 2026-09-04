import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { prisma } from '../db.mjs'
import { authRequired } from '../auth.mjs'
import { MAX_IMAGE_BYTES, storedUploadName, assertAllowedImage } from '../upload-security.mjs'
import {
  eventWrite,
  newsWrite,
  personWrite,
  productWrite,
  eventFromImport,
  newsFromImport,
  personFromImport,
  productFromImport,
  parseMoney,
} from '../cms-util.mjs'
import { hideSlug, unhideSlug } from '../cms-overlay.mjs'
import { lastNMonths, sumByMonth } from '../admin-stats.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.join(__dirname, '../../uploads/media')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    try {
      cb(null, storedUploadName(file.originalname))
    } catch (err) {
      cb(err)
    }
  },
})

const imageUpload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_BYTES },
  fileFilter: (_req, file, cb) => {
    try {
      assertAllowedImage({ originalname: file.originalname, mimetype: file.mimetype, size: 0 })
      cb(null, true)
    } catch (err) {
      cb(err)
    }
  },
})

const router = Router()
router.use(authRequired)

function fail(res, err) {
  const msg = err instanceof Error ? err.message : 'Error'
  const code = /required|not allowed|too large|invalid/i.test(msg) ? 400 : 500
  if (code === 500) console.error(err)
  return res.status(code).json({ error: msg })
}

async function uniqueSlug(model, slug, excludeId) {
  let next = slug
  let i = 2
  for (;;) {
    const found = await prisma[model].findUnique({ where: { slug: next } })
    if (!found || found.id === excludeId) return next
    next = `${slug}-${i}`
    i += 1
  }
}

router.get('/media', async (_req, res) => {
  const rows = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  res.json(rows)
})

router.post('/media', imageUpload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file required' })
    assertAllowedImage(req.file)
    const url = `/uploads/media/${req.file.filename}`
    const row = await prisma.mediaAsset.create({
      data: {
        kind: 'image',
        url,
        storedName: req.file.filename,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        alt: req.body?.alt ? String(req.body.alt) : null,
      },
    })
    res.status(201).json(row)
  } catch (err) {
    fail(res, err)
  }
})

router.delete('/media/:id', async (req, res) => {
  const row = await prisma.mediaAsset.findUnique({ where: { id: req.params.id } })
  if (row) {
    const fp = path.join(uploadDir, row.storedName)
    if (fs.existsSync(fp)) fs.unlinkSync(fp)
    await prisma.mediaAsset.delete({ where: { id: row.id } })
  }
  res.json({ ok: true })
})

router.get('/cms/events', async (_req, res) => {
  res.json(await prisma.cmsEvent.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }))
})
router.post('/cms/events', async (req, res) => {
  try {
    const data = eventWrite(req.body || {}, null)
    data.slug = await uniqueSlug('cmsEvent', data.slug)
    const row = await prisma.cmsEvent.create({ data })
    await unhideSlug('events', row.slug)
    res.status(201).json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.patch('/cms/events/:id', async (req, res) => {
  try {
    const existing = await prisma.cmsEvent.findUnique({ where: { id: req.params.id } })
    if (!existing) return res.status(404).json({ error: 'Not found' })
    const data = eventWrite({ ...existing, ...req.body }, existing)
    data.slug = await uniqueSlug('cmsEvent', data.slug, existing.id)
    const row = await prisma.cmsEvent.update({ where: { id: existing.id }, data })
    if (row.published) await unhideSlug('events', row.slug)
    else await hideSlug('events', row.slug)
    res.json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.delete('/cms/events/:id', async (req, res) => {
  const existing = await prisma.cmsEvent.findUnique({ where: { id: req.params.id } })
  if (existing) {
    await hideSlug('events', existing.slug)
    await prisma.cmsEvent.delete({ where: { id: existing.id } })
  }
  res.json({ ok: true })
})

router.get('/cms/news', async (_req, res) => {
  res.json(await prisma.cmsNews.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }))
})
router.post('/cms/news', async (req, res) => {
  try {
    const data = newsWrite(req.body || {}, null)
    data.slug = await uniqueSlug('cmsNews', data.slug)
    const row = await prisma.cmsNews.create({ data })
    await unhideSlug('news', row.slug)
    res.status(201).json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.patch('/cms/news/:id', async (req, res) => {
  try {
    const existing = await prisma.cmsNews.findUnique({ where: { id: req.params.id } })
    if (!existing) return res.status(404).json({ error: 'Not found' })
    const data = newsWrite({ ...existing, ...req.body }, existing)
    data.slug = await uniqueSlug('cmsNews', data.slug, existing.id)
    const row = await prisma.cmsNews.update({ where: { id: existing.id }, data })
    if (row.published) await unhideSlug('news', row.slug)
    else await hideSlug('news', row.slug)
    res.json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.delete('/cms/news/:id', async (req, res) => {
  const existing = await prisma.cmsNews.findUnique({ where: { id: req.params.id } })
  if (existing) {
    await hideSlug('news', existing.slug)
    await prisma.cmsNews.delete({ where: { id: existing.id } })
  }
  res.json({ ok: true })
})

function peopleKind(req) {
  const kind = String(req.query.kind || req.body?.kind || 'alumni')
  return kind === 'board' ? 'board' : 'alumni'
}

router.get('/cms/people', async (req, res) => {
  const kind = peopleKind(req)
  res.json(await prisma.cmsPerson.findMany({ where: { kind }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }))
})
router.post('/cms/people', async (req, res) => {
  try {
    const kind = peopleKind(req)
    const data = personWrite(req.body || {}, kind, null)
    data.slug = await uniqueSlug('cmsPerson', data.slug)
    const row = await prisma.cmsPerson.create({ data })
    await unhideSlug(kind, row.slug)
    res.status(201).json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.patch('/cms/people/:id', async (req, res) => {
  try {
    const existing = await prisma.cmsPerson.findUnique({ where: { id: req.params.id } })
    if (!existing) return res.status(404).json({ error: 'Not found' })
    const data = personWrite({ ...existing, ...req.body }, existing.kind, existing)
    data.slug = await uniqueSlug('cmsPerson', data.slug, existing.id)
    const row = await prisma.cmsPerson.update({ where: { id: existing.id }, data })
    if (row.published) await unhideSlug(existing.kind, row.slug)
    else await hideSlug(existing.kind, row.slug)
    res.json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.delete('/cms/people/:id', async (req, res) => {
  const existing = await prisma.cmsPerson.findUnique({ where: { id: req.params.id } })
  if (existing) {
    await hideSlug(existing.kind === 'board' ? 'board' : 'alumni', existing.slug)
    await prisma.cmsPerson.delete({ where: { id: existing.id } })
  }
  res.json({ ok: true })
})

router.get('/cms/products', async (_req, res) => {
  res.json(await prisma.shopProduct.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }))
})
router.post('/cms/products', async (req, res) => {
  try {
    const data = productWrite(req.body || {}, null)
    data.slug = await uniqueSlug('shopProduct', data.slug)
    const row = await prisma.shopProduct.create({ data })
    await unhideSlug('shop', row.slug)
    res.status(201).json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.patch('/cms/products/:id', async (req, res) => {
  try {
    const existing = await prisma.shopProduct.findUnique({ where: { id: req.params.id } })
    if (!existing) return res.status(404).json({ error: 'Not found' })
    const data = productWrite({ ...existing, ...req.body }, existing)
    data.slug = await uniqueSlug('shopProduct', data.slug, existing.id)
    const row = await prisma.shopProduct.update({ where: { id: existing.id }, data })
    if (row.published) await unhideSlug('shop', row.slug)
    else await hideSlug('shop', row.slug)
    res.json(row)
  } catch (err) {
    fail(res, err)
  }
})
router.delete('/cms/products/:id', async (req, res) => {
  const existing = await prisma.shopProduct.findUnique({ where: { id: req.params.id } })
  if (existing) {
    await hideSlug('shop', existing.slug)
    await prisma.shopProduct.delete({ where: { id: existing.id } })
  }
  res.json({ ok: true })
})

router.post('/cms/import', async (req, res) => {
  try {
    const type = String(req.body?.type || '')
    const items = Array.isArray(req.body?.items) ? req.body.items : []
    if (!items.length) return res.status(400).json({ error: 'items required' })
    let count = 0
    if (type === 'events') {
      for (let i = 0; i < items.length; i += 1) {
        const data = eventFromImport(items[i], i)
        await prisma.cmsEvent.upsert({ where: { slug: data.slug }, create: data, update: data })
        await unhideSlug('events', data.slug)
        count += 1
      }
    } else if (type === 'news') {
      for (let i = 0; i < items.length; i += 1) {
        const data = newsFromImport(items[i], i)
        await prisma.cmsNews.upsert({ where: { slug: data.slug }, create: data, update: data })
        await unhideSlug('news', data.slug)
        count += 1
      }
    } else if (type === 'alumni' || type === 'board') {
      for (let i = 0; i < items.length; i += 1) {
        const data = personFromImport(items[i], type, i)
        await prisma.cmsPerson.upsert({ where: { slug: data.slug }, create: data, update: data })
        await unhideSlug(type, data.slug)
        count += 1
      }
    } else if (type === 'shop') {
      for (let i = 0; i < items.length; i += 1) {
        const data = productFromImport(items[i], i)
        await prisma.shopProduct.upsert({ where: { slug: data.slug }, create: data, update: data })
        await unhideSlug('shop', data.slug)
        count += 1
      }
    } else {
      return res.status(400).json({ error: 'unknown import type' })
    }
    res.json({ ok: true, count })
  } catch (err) {
    fail(res, err)
  }
})

router.get('/shop-orders', async (req, res) => {
  const status = req.query.status ? String(req.query.status) : undefined
  const q = req.query.q ? String(req.query.q).trim().toLowerCase() : ''
  const rows = await prisma.shopOrder.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 300,
  })
  const filtered = q
    ? rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.id.toLowerCase().includes(q),
      )
    : rows
  res.json(
    filtered.map((r) => ({
      ...r,
      items: (() => {
        try {
          return JSON.parse(r.itemsJson)
        } catch {
          return []
        }
      })(),
    })),
  )
})

router.patch('/shop-orders/:id', async (req, res) => {
  const b = req.body || {}
  const existing = await prisma.shopOrder.findUnique({ where: { id: req.params.id } })
  if (!existing) return res.status(404).json({ error: 'Not found' })
  const nextStatus = b.status !== undefined ? String(b.status) : existing.status
  if (existing.status !== 'cancelled' && nextStatus === 'cancelled') {
    await restoreStock(existing)
  }
  const row = await prisma.shopOrder.update({
    where: { id: existing.id },
    data: {
      status: nextStatus,
      adminNote: b.adminNote !== undefined ? String(b.adminNote) : undefined,
    },
  })
  res.json(row)
})

async function restoreStock(order) {
  let items = []
  try {
    items = JSON.parse(order.itemsJson)
  } catch {
    items = []
  }
  for (const line of items) {
    const slug = String(line.slug || '')
    const qty = Number(line.qty) || 0
    if (!slug || qty < 1) continue
    const product = await prisma.shopProduct.findUnique({ where: { slug } })
    if (!product) continue
    await prisma.shopProduct.update({
      where: { id: product.id },
      data: { stock: product.stock + qty },
    })
  }
}

router.get('/finance', async (_req, res) => {
  const [donations, shopOrders, grants, products] = await Promise.all([
    prisma.donation.findMany({ take: 500, orderBy: { createdAt: 'desc' } }),
    prisma.shopOrder.findMany({ take: 500, orderBy: { createdAt: 'desc' } }),
    prisma.grantApplication.findMany({ take: 500, orderBy: { createdAt: 'desc' } }),
    prisma.shopProduct.findMany(),
  ])

  const donConfirmed = donations.filter((d) => d.status === 'confirmed')
  const donPending = donations.filter((d) => d.status === 'pending')
  const shopOpen = shopOrders.filter((o) => o.status === 'new' || o.status === 'packing' || o.status === 'ready')
  const shopDone = shopOrders.filter((o) => o.status === 'done')
  const lowStock = products.filter((p) => p.published && p.stock <= 5)

  const months = lastNMonths(6)

  res.json({
    donations: {
      pendingCount: donPending.length,
      confirmedCount: donConfirmed.length,
      pendingSum: donPending.reduce((s, d) => s + parseMoney(d.amount), 0),
      confirmedSum: donConfirmed.reduce((s, d) => s + parseMoney(d.amount), 0),
      recent: donations.slice(0, 6),
    },
    shop: {
      openCount: shopOpen.length,
      doneCount: shopDone.length,
      openSum: shopOpen.reduce((s, o) => s + o.total, 0),
      doneSum: shopDone.reduce((s, o) => s + o.total, 0),
      lowStock: lowStock.map((p) => ({ id: p.id, slug: p.slug, nameUz: p.nameUz, stock: p.stock })),
      recent: shopOrders.slice(0, 6),
    },
    grants: {
      new: grants.filter((g) => g.status === 'new').length,
      reviewing: grants.filter((g) => g.status === 'reviewing').length,
      accepted: grants.filter((g) => g.status === 'accepted').length,
      rejected: grants.filter((g) => g.status === 'rejected').length,
    },
    month: {
      labels: months.map((m) => m.label),
      donationSum: sumByMonth(donConfirmed, months, (d) => parseMoney(d.amount)),
      orderSum: sumByMonth(shopDone, months, (o) => o.total),
    },
  })
})

export default router
