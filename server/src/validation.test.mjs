import { describe, expect, it } from 'vitest'
import {
  looksLikeEmail,
  validateContact,
  validateDonation,
  validateGrant,
  validateNewsletter,
  validateShopOrder,
  validateShopLookup,
} from '../src/validation.mjs'

describe('validateContact', () => {
  it('to‘g‘ri maydonlar bilan o‘tadi', () => {
    const r = validateContact({
      name: 'Ali Valiyev',
      email: 'ali@example.com',
      message: 'Salom, fond haqida savol.',
    })
    expect(r.ok).toBe(true)
    expect(r.value.email).toBe('ali@example.com')
  })

  it('bo‘sh message — xato', () => {
    const r = validateContact({ name: 'Ali', email: 'ali@example.com', message: '' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/required/i)
  })

  it('noto‘g‘ri email format — xato', () => {
    const r = validateContact({ name: 'Ali', email: 'not-an-email', message: 'xabar' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/email/i)
  })
})

describe('validateDonation', () => {
  it('to‘g‘ri firstName va email bilan o‘tadi', () => {
    const r = validateDonation({ firstName: 'Nodira', email: 'n@tdyu.uz' })
    expect(r.ok).toBe(true)
    expect(r.value.firstName).toBe('Nodira')
  })

  it('bo‘sh firstName — xato', () => {
    const r = validateDonation({ firstName: '  ', email: 'n@tdyu.uz' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/firstName/i)
  })

  it('email ichida bo‘shliq — xato', () => {
    const r = validateDonation({ firstName: 'Nodira', email: 'a @b.com' })
    expect(r.ok).toBe(false)
    expect(looksLikeEmail('a @b.com')).toBe(false)
  })
})

describe('validateGrant', () => {
  it('ism va email bilan o‘tadi', () => {
    const r = validateGrant({ name: 'Kamola', email: 'k@example.org' })
    expect(r.ok).toBe(true)
  })

  it('email yo‘q — xato', () => {
    const r = validateGrant({ name: 'Kamola', email: '' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/required/i)
  })

  it('@ siz email — xato', () => {
    const r = validateGrant({ name: 'Kamola', email: 'kamola.example.org' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/email/i)
  })
})

describe('validateNewsletter', () => {
  it('email lower-case qilinadi', () => {
    const r = validateNewsletter({ email: 'News@Example.COM' })
    expect(r.ok).toBe(true)
    expect(r.value.email).toBe('news@example.com')
  })

  it('bo‘sh email — xato', () => {
    const r = validateNewsletter({ email: '   ' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/email/i)
  })

  it('faqat @ — xato', () => {
    const r = validateNewsletter({ email: '@' })
    expect(r.ok).toBe(false)
  })
})

describe('validateShopOrder', () => {
  const okBody = {
    name: 'Ali Valiyev',
    email: 'ali@example.com',
    phone: '+998901234567',
    pickup: 'bino-2',
    message: 'TSUL SHOP buyurtma\nBloknot × 1',
    items: [{ slug: 'bloknot', qty: 1 }],
  }

  it('to‘g‘ri buyurtma bilan o‘tadi', () => {
    const r = validateShopOrder(okBody)
    expect(r.ok).toBe(true)
    expect(r.value.pickup).toBe('bino-2')
    expect(r.value.items).toEqual([{ slug: 'bloknot', qty: 1 }])
  })

  it('telefon juda qisqa — xato', () => {
    const r = validateShopOrder({ ...okBody, phone: '123' })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/phone/i)
  })

  it('bo‘sh savat — xato', () => {
    const r = validateShopOrder({ ...okBody, items: [] })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/items/i)
  })

  it('qidiruv email+telefon bilan o‘tadi', () => {
    const r = validateShopLookup({ email: 'Ali@Example.com', phone: '90 111 22 33' })
    expect(r.ok).toBe(true)
    expect(r.value.email).toBe('ali@example.com')
    expect(r.value.phone).toBe('901112233')
  })

  it('o‘lcham bilan o‘tadi', () => {
    const r = validateShopOrder({
      ...okBody,
      items: [{ slug: 'polo-futbolka', qty: 2, size: 'M' }],
    })
    expect(r.ok).toBe(true)
    expect(r.value.items[0].size).toBe('M')
  })
})
