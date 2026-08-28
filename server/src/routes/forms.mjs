import { Router } from 'express'
import { prisma } from '../db.mjs'

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
  const name =
    b.name ||
    [b.firstName, b.lastName].filter(Boolean).join(' ').trim() ||
    b['your-name'] ||
    ''
  const email = b.email || b['your-email'] || ''
  const message = b.message || b['your-message'] || b.xabar || ''
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }
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
  const firstName = b.firstName || b.name || b.Ism || ''
  const email = b.email || ''
  if (!firstName || !email) {
    return res.status(400).json({ error: 'firstName and email are required' })
  }

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
  const name = b.name || [b.firstName, b.lastName].filter(Boolean).join(' ').trim()
  const email = b.email || ''
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' })
  }
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

router.post('/newsletter', async (req, res) => {
  const email = (req.body?.email || '').trim().toLowerCase()
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'valid email required' })
  }
  const row = await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: { email, lang: req.body.lang || 'uz' },
    update: { lang: req.body.lang || 'uz' },
  })
  res.status(201).json({ ok: true, id: row.id })
})

export default router
