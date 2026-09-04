import { Router } from 'express'
import { prisma } from '../db.mjs'
import { authRequired, requireSuper, hashPassword, publicAdmin } from '../auth.mjs'

const router = Router()
router.use(authRequired)
router.use(requireSuper)

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''))
}

async function superCount() {
  return prisma.adminUser.count({ where: { role: 'super', active: true } })
}

router.get('/staff', async (_req, res) => {
  const rows = await prisma.adminUser.findMany({ orderBy: [{ role: 'asc' }, { createdAt: 'asc' }] })
  res.json(rows.map(publicAdmin))
})

router.post('/staff', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  const name = String(req.body?.name || '').trim() || 'Admin'
  const password = String(req.body?.password || '')
  const role = req.body?.role === 'super' ? 'super' : 'admin'
  if (!looksLikeEmail(email)) return res.status(400).json({ error: 'email required' })
  if (password.length < 8) return res.status(400).json({ error: 'Parol kamida 8 belgi' })
  const exists = await prisma.adminUser.findUnique({ where: { email } })
  if (exists) return res.status(409).json({ error: 'Bu email allaqachon bor' })
  const row = await prisma.adminUser.create({
    data: {
      email,
      name,
      role,
      active: true,
      passwordHash: await hashPassword(password),
    },
  })
  res.status(201).json(publicAdmin(row))
})

router.patch('/staff/:id', async (req, res) => {
  const existing = await prisma.adminUser.findUnique({ where: { id: req.params.id } })
  if (!existing) return res.status(404).json({ error: 'Not found' })
  const b = req.body || {}
  const data = {}
  if (b.name !== undefined) data.name = String(b.name).trim() || existing.name
  if (b.active !== undefined) data.active = Boolean(b.active)
  if (b.role !== undefined) data.role = b.role === 'super' ? 'super' : 'admin'
  if (b.password) {
    if (String(b.password).length < 8) return res.status(400).json({ error: 'Parol kamida 8 belgi' })
    data.passwordHash = await hashPassword(String(b.password))
  }

  const nextRole = data.role || existing.role
  const nextActive = data.active !== undefined ? data.active : existing.active
  if (existing.role === 'super' && (nextRole !== 'super' || nextActive === false)) {
    const n = await superCount()
    if (n <= 1) return res.status(400).json({ error: 'Oxirgi super adminni o‘chirish yoki pasaytirish mumkin emas' })
  }

  const row = await prisma.adminUser.update({ where: { id: existing.id }, data })
  res.json(publicAdmin(row))
})

router.delete('/staff/:id', async (req, res) => {
  if (req.params.id === req.admin.id) {
    return res.status(400).json({ error: 'O‘zingizni o‘chira olmaysiz' })
  }
  const existing = await prisma.adminUser.findUnique({ where: { id: req.params.id } })
  if (!existing) return res.status(404).json({ error: 'Not found' })
  if (existing.role === 'super') {
    const n = await superCount()
    if (n <= 1) return res.status(400).json({ error: 'Oxirgi super adminni o‘chirish mumkin emas' })
  }
  await prisma.adminUser.delete({ where: { id: existing.id } })
  res.json({ ok: true })
})

export default router
