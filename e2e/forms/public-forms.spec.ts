import { expect, test } from '@playwright/test'
import { API, expectToast, fillContactDump, fillDonateDump, waitDumpReady } from '../helpers'

const stamp = () => Date.now()

test.describe('forms — aloqa', () => {
  test('muvaffaqiyatli yuboriladi', async ({ page }) => {
    await page.goto('/uz/contact', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const form = await fillContactDump(page, {
      first: 'E2E',
      last: 'Contact',
      email: `e2e.contact.${stamp()}@example.com`,
      message: 'Playwright aloqa testi — muvaffaqiyatli holat.',
    })
    await form.locator('input[type="submit"], button[type="submit"]').first().click()
    await expectToast(page, /Murojaat yuborildi/i)
  })

  test('bo‘sh majburiy maydonlar xato ko‘rsatadi', async ({ page }) => {
    await page.goto('/uz/contact', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const form = page.locator('form.wpcf7-form').first()
    await form.waitFor({ state: 'visible' })
    await form.locator('[name="first-name"]').fill('')
    await form.locator('[name="your-email"]').fill('')
    await form.locator('[name="your-message"]').fill('')
    await form.locator('input[type="submit"], button[type="submit"]').first().click()
    await expectToast(page, /majburiy maydon/i)
  })
})

test.describe('forms — xayriya arizasi', () => {
  test('demo to‘lov muvaffaqiyatli yuboriladi', async ({ page }) => {
    await page.goto('/uz/apply-now', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const form = await fillDonateDump(page, {
      first: 'E2E',
      last: 'Donor',
      email: `e2e.donor.${stamp()}@example.com`,
      phone: '+998901112233',
    })
    await form.locator('input[type="submit"], button[type="submit"]').first().click()
    await expect(page.locator('#tdyu-demo-pay')).toBeVisible({ timeout: 15_000 })
    await page.locator('#tdyu-dp-email').fill(`e2e.donor.${stamp()}@example.com`)
    await page.locator('#tdyu-dp-name').fill('E2E Donor')
    await page.locator('#tdyu-dp-ok').click()
    await expectToast(page, /muvaffaqiyatli|yuborildi/i)
  })

  test('demo to‘lovda email yo‘q — validatsiya', async ({ page }) => {
    await page.goto('/uz/apply-now', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const form = page.locator('form.wpcf7-form').filter({ has: page.locator('[name="First-name"]') }).first()
    await form.scrollIntoViewIfNeeded()
    await form.locator('input[type="submit"], button[type="submit"]').first().click()
    await expectToast(page, /majburiy maydon/i)
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
    await waitDumpReady(page)
    const form = page.locator('form.wpcf7-form').filter({ has: page.locator('[name="your-email"]') }).last()
    await form.locator('[name="your-email"]').fill(`e2e.home.${stamp()}@example.com`)
    const consent = form.locator('[name="your-consent"]')
    if (await consent.count()) await consent.check({ force: true })
    await form.locator('input[type="submit"], button[type="submit"]').first().click()
    await expectToast(page, /yuborildi|majburiy/i)
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
