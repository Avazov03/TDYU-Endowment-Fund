import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { validateContact, validateNewsletter } from './validation.mjs'

const prisma = new PrismaClient()

describe('Prisma test.db (dev.db emas)', () => {
  beforeAll(async () => {
    expect(process.env.DATABASE_URL).toContain('test.db')
    expect(process.env.DATABASE_URL).not.toContain('dev.db')
    await prisma.contactMessage.deleteMany()
    await prisma.newsletterSubscriber.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('validatsiyadan o‘tgan murojaat yoziladi', async () => {
    const check = validateContact({
      name: 'Unit Tester',
      email: 'unit.contact@example.com',
      message: 'test.db ga yoziladi',
    })
    expect(check.ok).toBe(true)
    const row = await prisma.contactMessage.create({
      data: {
        name: check.value.name,
        email: check.value.email,
        message: check.value.message,
        lang: 'uz',
      },
    })
    expect(row.id).toBeTruthy()
    const count = await prisma.contactMessage.count({ where: { email: 'unit.contact@example.com' } })
    expect(count).toBe(1)
  })

  it('yaroqsiz payload bazaga yozilmaydi', async () => {
    const check = validateContact({ name: '', email: 'x@y.com', message: 'hi' })
    expect(check.ok).toBe(false)
    const before = await prisma.contactMessage.count()
    if (check.ok) {
      await prisma.contactMessage.create({
        data: { name: 'x', email: 'x@y.com', message: 'hi' },
      })
    }
    const after = await prisma.contactMessage.count()
    expect(after).toBe(before)
  })

  it('newsletter unique email qayta yozilmaydi (upsert)', async () => {
    const email = 'unit.news@example.com'
    const a = validateNewsletter({ email })
    const b = validateNewsletter({ email: 'UNIT.NEWS@example.com' })
    expect(a.ok && b.ok).toBe(true)
    await prisma.newsletterSubscriber.upsert({
      where: { email: a.value.email },
      create: { email: a.value.email, lang: 'uz' },
      update: { lang: 'en' },
    })
    await prisma.newsletterSubscriber.upsert({
      where: { email: b.value.email },
      create: { email: b.value.email, lang: 'ru' },
      update: { lang: 'ru' },
    })
    const rows = await prisma.newsletterSubscriber.findMany({ where: { email: a.value.email } })
    expect(rows).toHaveLength(1)
    expect(rows[0].lang).toBe('ru')
  })
})
