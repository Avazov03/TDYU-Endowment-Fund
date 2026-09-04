import { describe, expect, it } from 'vitest'
import jwt from 'jsonwebtoken'
import { hashPassword, signToken, verifyPassword, verifyToken, authRequired } from './auth.mjs'

function mockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
  return res
}

describe('JWT sign / verify', () => {
  it('token yaratiladi va tekshiriladi', () => {
    const token = signToken({ sub: 'admin-1', email: 'admin@tdyu-endowment.uz' })
    const payload = verifyToken(token)
    expect(payload.sub).toBe('admin-1')
    expect(payload.email).toBe('admin@tdyu-endowment.uz')
  })

  it('buzilgan token — xato', () => {
    expect(() => verifyToken('not.a.jwt')).toThrow()
  })

  it('boshqa secret bilan imzolangan token — xato', () => {
    const foreign = jwt.sign({ sub: 'x' }, 'some-other-secret', { expiresIn: '1h' })
    expect(() => verifyToken(foreign)).toThrow()
  })

  it('muddati o‘tgan token — xato', () => {
    const expired = jwt.sign(
      { sub: 'old', exp: Math.floor(Date.now() / 1000) - 30 },
      process.env.JWT_SECRET,
    )
    expect(() => verifyToken(expired)).toThrow()
  })
})

describe('parol hash', () => {
  it('to‘g‘ri parol mos keladi', async () => {
    const hash = await hashPassword('Admin123!')
    expect(await verifyPassword('Admin123!', hash)).toBe(true)
  })

  it('noto‘g‘ri parol mos kelmaydi', async () => {
    const hash = await hashPassword('Admin123!')
    expect(await verifyPassword('WrongPassword', hash)).toBe(false)
  })
})

describe('authRequired middleware', () => {
  it('Bearer token bilan next chaqiriladi', async () => {
    const { prisma } = await import('./db.mjs')
    const user = await prisma.adminUser.upsert({
      where: { email: 'auth-middleware@example.com' },
      create: {
        email: 'auth-middleware@example.com',
        passwordHash: 'x',
        name: 'Auth Test',
        role: 'admin',
        active: true,
      },
      update: { active: true },
    })
    const token = signToken({ sub: user.id, email: user.email, role: user.role })
    const req = { headers: { authorization: `Bearer ${token}` } }
    const res = mockRes()
    let nextCalls = 0
    await authRequired(req, res, () => {
      nextCalls += 1
    })
    expect(nextCalls).toBe(1)
    expect(req.user.sub).toBe(user.id)
    expect(req.admin.role).toBe('admin')
    expect(res.statusCode).toBe(200)
    await prisma.adminUser.delete({ where: { id: user.id } })
  })

  it('token yo‘q — 401 Unauthorized', () => {
    const req = { headers: {} }
    const res = mockRes()
    let nextCalls = 0
    authRequired(req, res, () => {
      nextCalls += 1
    })
    expect(nextCalls).toBe(0)
    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe('Unauthorized')
  })

  it('yaroqsiz token — 401 Invalid token', () => {
    const req = { headers: { authorization: 'Bearer abc.def.ghi' } }
    const res = mockRes()
    let nextCalls = 0
    authRequired(req, res, () => {
      nextCalls += 1
    })
    expect(nextCalls).toBe(0)
    expect(res.statusCode).toBe(401)
    expect(res.body.error).toBe('Invalid token')
  })
})
