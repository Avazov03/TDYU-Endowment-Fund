import { Router } from 'express'
import { prisma } from '../db.mjs'
import { verifyPassword, signToken, authRequired, hashPassword, loginRateLimited, publicAdmin } from '../auth.mjs'

const router = Router()

function clientIp(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  return xf || req.socket?.remoteAddress || 'unknown'
}

router.post('/login', async (req, res) => {
  const ip = clientIp(req)
  if (loginRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many login attempts. Try later.' })
  }
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }
  const user = await prisma.adminUser.findUnique({ where: { email: String(email).trim().toLowerCase() } })
  if (!user || !user.active || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = signToken({ sub: user.id, email: user.email, name: user.name, role: user.role })
  res.json({
    token,
    user: publicAdmin(user),
  })
})

router.get('/me', authRequired, async (req, res) => {
  const user = await prisma.adminUser.findUnique({ where: { id: req.user.sub } })
  if (!user || !user.active) return res.status(401).json({ error: 'Unauthorized' })
  res.json(publicAdmin(user))
})

export default router
