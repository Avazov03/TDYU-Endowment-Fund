import { Router } from 'express'
import { prisma } from '../db.mjs'
import { validateContact, validateDonation, validateGrant, validateNewsletter, validateShopOrder, validateShopLookup, phonesMatch } from '../validation.mjs'

const shopHits = new Map()
const SHOP_WINDOW_MS = 60 * 60 * 1000
const SHOP_MAX = 8

function clientIp(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  return xf || req.socket?.remoteAddress || 'unknown'
}

function shopRateLimited(ip) {
  const now = Date.now()
  const recent = (shopHits.get(ip) || []).filter((t) => now - t < SHOP_WINDOW_MS)
  if (recent.length >= SHOP_MAX) {
    shopHits.set(ip, recent)
    return true
  }
  recent.push(now)
  shopHits.set(ip, recent)
  return false
}

const router = Router()

function pick(obj, keys) {
  const out = {}
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') out[k] = obj[k]
  }
  return out
}

function flattenPayload(body) {
  const known = new Set([
    'name',
    'firstName',
    'lastName',
    'email',
    'phone',
    'message',
    'subject',
    'amount',
    'currency',
    'donorType',
    'frequency',
    'note',
    'program',
    'lang',
    'page',
    'type',
    'paymentMethod',
    'paymentDemo',
    'paymentStatus',
    'cardLast4',
  ])
  const extra = {}
  for (const [k, v] of Object.entries(body || {})) {
    if (!known.has(k) && v !== undefined && v !== null && String(v).trim()) {
      extra[k] = v
    }
  }
  return Object.keys(extra).length ? JSON.stringify(extra) : null
}

router.post('/contact', async (req, res) => {
  const b = req.body || {}
  const check = validateContact(b)
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }
  const { name, email, message } = check.value
  const row = await prisma.contactMessage.create({
    data: {
      name: String(name),
      email: String(email),
      phone: b.phone ? String(b.phone) : null,
      subject: b.subject ? String(b.subject) : null,
      message: String(message),
      lang: b.lang || 'uz',
      page: b.page || null,
      payload: flattenPayload(b),
    },
  })
  res.status(201).json({ ok: true, id: row.id })
})

router.post('/donation', async (req, res) => {
  const b = req.body || {}
  const check = validateDonation(b)
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }
  const firstName = check.value.firstName
  const email = check.value.email

  const paymentMethod = b.paymentMethod ? String(b.paymentMethod) : 'bank'
  const paymentDemo = Boolean(b.paymentDemo)
  const paymentStatus = b.paymentStatus ? String(b.paymentStatus) : paymentMethod === 'bank' ? 'pending' : 'pending'
  // Demo success => auto-confirm; failed => cancelled; bank => pending
  let status = 'pending'
  if (paymentDemo && paymentStatus === 'success') status = 'confirmed'
  if (paymentDemo && paymentStatus === 'failed') status = 'cancelled'

  const row = await prisma.donation.create({
    data: {
      firstName: String(firstName),
      lastName: b.lastName ? String(b.lastName) : null,
      email: String(email),
      phone: b.phone ? String(b.phone) : null,
      amount: b.amount ? String(b.amount) : null,
      currency: b.currency ? String(b.currency) : 'UZS',
      donorType: b.donorType ? String(b.donorType) : null,
      frequency: b.frequency ? String(b.frequency) : null,
      note: b.note || b.message ? String(b.note || b.message) : null,
      lang: b.lang || 'uz',
      payload: flattenPayload(b),
      paymentMethod,
      paymentDemo,
      paymentStatus,
      cardLast4: b.cardLast4 ? String(b.cardLast4).slice(-4) : null,
      status,
      adminNote: paymentDemo
        ? `DEMO ${paymentMethod.toUpperCase()} · ${paymentStatus}${b.cardLast4 ? ` · ****${String(b.cardLast4).slice(-4)}` : ''}`
        : null,
    },
  })
  res.status(201).json({ ok: true, id: row.id, status: row.status, paymentMethod: row.paymentMethod })
})

router.post('/grant', async (req, res) => {
  const b = req.body || {}
  const check = validateGrant(b)
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }
  const { name, email } = check.value
  const row = await prisma.grantApplication.create({
    data: {
      name: String(name),
      email: String(email),
      phone: b.phone ? String(b.phone) : null,
      program: b.program ? String(b.program) : null,
      message: b.message ? String(b.message) : null,
      lang: b.lang || 'uz',
      payload: flattenPayload(b),
    },
  })
  res.status(201).json({ ok: true, id: row.id })
})

router.post('/shop-order', async (req, res) => {
  const ip = clientIp(req)
  if (shopRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' })
  }
  const check = validateShopOrder(req.body || {})
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }
  const { name, email, phone, pickup, message, requestId, items } = check.value
  if (requestId) {
    const existingOrder = await prisma.shopOrder.findUnique({ where: { requestId } }).catch(() => null)
    if (existingOrder) {
      return res.status(201).json({ ok: true, id: existingOrder.id, duplicate: true })
    }
    const existing = await prisma.contactMessage.findFirst({
      where: { page: 'shop', payload: { contains: requestId } },
    })
    if (existing) {
      return res.status(201).json({ ok: true, id: existing.id, duplicate: true })
    }
  }

  const catalogCount = await prisma.shopProduct.count()
  let total = Number(req.body.total) || 0
  if (catalogCount > 0) {
    total = 0
    for (const line of items) {
      const product = await prisma.shopProduct.findUnique({ where: { slug: line.slug } })
      if (!product || !product.published) {
        return res.status(400).json({ error: `unknown product: ${line.slug}` })
      }
      if (product.stock < line.qty) {
        return res.status(409).json({ error: `out of stock: ${line.slug}` })
      }
      total += product.price * line.qty
    }
    for (const line of items) {
      const product = await prisma.shopProduct.findUnique({ where: { slug: line.slug } })
      await prisma.shopProduct.update({
        where: { id: product.id },
        data: { stock: product.stock - line.qty },
      })
    }
  }

  const order = await prisma.shopOrder.create({
    data: {
      name,
      email: String(email).trim().toLowerCase(),
      phone,
      pickup,
      message,
      lang: req.body.lang || 'uz',
      total,
      itemsJson: JSON.stringify(items),
      requestId: requestId || null,
      status: 'new',
    },
  })

  await prisma.contactMessage.create({
    data: {
      name,
      email: String(email).trim().toLowerCase(),
      phone,
      subject: 'TSUL SHOP buyurtma',
      message,
      lang: req.body.lang || 'uz',
      page: 'shop',
      payload: flattenPayload({ ...req.body, pickup, requestId, items, total, shopOrderId: order.id }),
    },
  })
  res.status(201).json({ ok: true, id: order.id })
})

router.post('/shop-orders-lookup', async (req, res) => {
  const ip = clientIp(req)
  if (shopRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' })
  }
  const check = validateShopLookup(req.body || {})
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }
  const { email, phone } = check.value
  const shopRows = await prisma.shopOrder.findMany({
    where: { email },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  const fromShop = shopRows
    .filter((row) => phonesMatch(row.phone, phone))
    .map((row) => {
      let items = []
      try {
        items = JSON.parse(row.itemsJson)
      } catch {
        items = []
      }
      return {
        id: row.id,
        createdAt: row.createdAt,
        status: row.status,
        pickup: row.pickup,
        total: row.total,
        items,
        message: row.message,
      }
    })
  if (fromShop.length) {
    return res.json({ ok: true, orders: fromShop })
  }
  const rows = await prisma.contactMessage.findMany({
    where: { page: 'shop' },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  const orders = rows
    .filter((row) => String(row.email || '').trim().toLowerCase() === email && phonesMatch(row.phone, phone))
    .map((row) => {
    let extra = {}
    try {
      extra = row.payload ? JSON.parse(row.payload) : {}
    } catch {
      extra = {}
    }
    return {
      id: row.id,
      createdAt: row.createdAt,
      status: row.status,
      pickup: extra.pickup || null,
      total: extra.total ?? null,
      items: Array.isArray(extra.items) ? extra.items : [],
      message: row.message,
    }
  })
  res.json({ ok: true, orders })
})

router.post('/newsletter', async (req, res) => {
  const check = validateNewsletter(req.body || {})
  if (!check.ok) {
    return res.status(400).json({ error: check.error })
  }
  const email = check.value.email
  const row = await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: { email, lang: req.body.lang || 'uz' },
    update: { lang: req.body.lang || 'uz' },
  })
  res.status(201).json({ ok: true, id: row.id })
})

export default router
