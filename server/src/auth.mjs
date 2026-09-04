import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })
dotenv.config({ path: path.join(__dirname, '../../.env') })

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export function signToken(payload, options = { expiresIn: '7d' }) {
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyToken(token) {
  if (!token) {
    const err = new Error('Unauthorized')
    err.code = 'NO_TOKEN'
    throw err
  }
  return jwt.verify(token, JWT_SECRET)
}

export async function authRequired(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    req.user = verifyToken(token)
    const admin = await prisma.adminUser.findUnique({ where: { id: req.user.sub } })
    if (!admin || !admin.active) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.admin = { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireSuper(req, res, next) {
  if (req.admin?.role !== 'super') {
    return res.status(403).json({ error: 'Super admin required' })
  }
  next()
}

const loginHits = new Map()
const LOGIN_WINDOW_MS = 15 * 60 * 1000
const LOGIN_MAX = 8

export function loginRateLimited(ip) {
  const now = Date.now()
  const recent = (loginHits.get(ip) || []).filter((t) => now - t < LOGIN_WINDOW_MS)
  if (recent.length >= LOGIN_MAX) {
    loginHits.set(ip, recent)
    return true
  }
  recent.push(now)
  loginHits.set(ip, recent)
  return false
}

export function publicAdmin(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
  }
}
