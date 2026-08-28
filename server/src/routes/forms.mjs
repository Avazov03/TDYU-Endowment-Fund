import { Router } from 'express'
import { prisma } from '../db.mjs'
import { validateContact, validateDonation, validateGrant, validateNewsletter } from '../validation.mjs'

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
