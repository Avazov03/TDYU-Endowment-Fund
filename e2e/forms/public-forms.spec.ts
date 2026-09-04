import { expect, test } from '@playwright/test'
import { API, expectFormOk, fillContact, fillDonate } from '../helpers'

const stamp = () => Date.now()

test.describe('forms — aloqa', () => {
  test('muvaffaqiyatli yuboriladi', async ({ page }) => {
    await page.goto('/uz/contact', { waitUntil: 'domcontentloaded' })
    const form = await fillContact(page, {
      name: 'E2E Contact',
      email: `e2e.contact.${stamp()}@example.com`,
      message: 'Playwright aloqa testi — muvaffaqiyatli holat.',
    })
    await form.locator('button[type="submit"]').click()
    await expectFormOk(page, /Murojaat yuborildi/i)
  })

  test('bo‘sh majburiy maydonlar xato ko‘rsatadi', async ({ page }) => {
    await page.goto('/uz/contact', { waitUntil: 'domcontentloaded' })
    const form = page.locator('#contact-form')
    await form.waitFor({ state: 'visible' })
    await form.locator('button[type="submit"]').click()
    const valid = await form.locator('[name="name"]').evaluate((el: HTMLInputElement) => el.checkValidity())
    expect(valid).toBe(false)
  })
})

test.describe('forms — xayriya arizasi', () => {
  test('bank arizasi muvaffaqiyatli yuboriladi', async ({ page }) => {
    await page.goto('/uz/donate', { waitUntil: 'domcontentloaded' })
    const form = await fillDonate(page, {
      first: 'E2E',
      last: 'Donor',
      email: `e2e.donor.${stamp()}@example.com`,
      phone: '+998901112233',
    })
    await form.locator('button[type="submit"]').click()
    await expectFormOk(page, /Xayriya arizasi yuborildi/i)
  })

  test('email yo‘q — HTML validatsiya', async ({ page }) => {
    await page.goto('/uz/donate', { waitUntil: 'domcontentloaded' })
    const form = page.locator('#calc')
    await form.waitFor({ state: 'visible' })
    await form.locator('[name="firstName"]').fill('E2E')
    await form.locator('button[type="submit"]').click()
    const valid = await form.locator('[name="email"]').evaluate((el: HTMLInputElement) => el.checkValidity())
    expect(valid).toBe(false)
  })
})

test.describe('forms — obuna (newsletter)', () => {
  test('to‘g‘ri email API orqali qabul qilinadi', async ({ request }) => {
    const email = `e2e.news.${stamp()}@example.com`
    const res = await request.post(`${API}/api/forms/newsletter`, {
      data: { email, lang: 'uz' },
    })
    expect(res.status(), await res.text()).toBe(201)
    const body = (await res.json()) as { ok: boolean; id: string }
    expect(body.ok).toBe(true)
    expect(body.id).toBeTruthy()
  })

  test('noto‘g‘ri email 400 qaytaradi', async ({ request }) => {
    const res = await request.post(`${API}/api/forms/newsletter`, {
      data: { email: 'not-an-email', lang: 'uz' },
    })
    expect(res.status()).toBe(400)
    const body = (await res.json()) as { error: string }
    expect(body.error).toMatch(/email/i)
  })

  test('sahifadagi obuna formasi yuboriladi', async ({ page }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' })
    const form = page.locator('footer form').first()
    await form.locator('[name="email"]').fill(`e2e.home.${stamp()}@example.com`)
    const consent = form.locator('[name="consent"]')
    if (await consent.count()) await consent.check()
    await form.locator('button[type="submit"]').click()
    await expectFormOk(page, /Obuna qilindi/i)
  })
})

test.describe('forms — API validatsiya', () => {
  test('aloqa: message yo‘q — 400', async ({ request }) => {
    const res = await request.post(`${API}/api/forms/contact`, {
      data: { name: 'E2E', email: 'e2e@example.com' },
    })
    expect(res.status()).toBe(400)
  })

  test('xayriya: firstName yo‘q — 400', async ({ request }) => {
    const res = await request.post(`${API}/api/forms/donation`, {
      data: { email: 'e2e@example.com', amount: '100000' },
    })
    expect(res.status()).toBe(400)
  })
})
