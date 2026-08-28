import { Router } from 'express'
import { prisma } from '../db.mjs'
import { verifyPassword, signToken, authRequired } from '../auth.mjs'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }
  const user = await prisma.adminUser.findUnique({ where: { email: String(email).toLowerCase() } })
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = signToken({ sub: user.id, email: user.email, name: user.name })
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  })
})

router.get('/me', authRequired, async (req, res) => {
  const user = await prisma.adminUser.findUnique({ where: { id: req.user.sub } })
  if (!user) return res.status(401).json({ error: 'Unauthorized' })
  res.json({ id: user.id, email: user.email, name: user.name })
})

export default router
