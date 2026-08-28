import { expect, type APIRequestContext, type Page } from '@playwright/test'

export const WEB = process.env.E2E_WEB_URL || 'http://127.0.0.1:3000'
export const API = process.env.E2E_API_URL || 'http://127.0.0.1:8787'
export const ADMIN = process.env.E2E_ADMIN_URL || 'http://localhost:5173'
export const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || 'admin@tdyu-endowment.uz'
export const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || 'Admin123!'

export async function waitDumpReady(page: Page) {
  await page.locator('#tdyu-dump-root').waitFor({ state: 'attached', timeout: 30_000 })
  await page.locator('#site-preloader').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {})
  await page.waitForFunction(
    () => Boolean(document.querySelector('script[src*="tdyu-site-form"]')),
    { timeout: 15_000 },
  ).catch(() => {})
  await page.waitForTimeout(1000)
}

export async function expectToast(page: Page, text: string | RegExp) {
  const toast = page.locator('#tdyu-toast, .tdyu-toast')
  await expect(toast).toContainText(text, { timeout: 20_000 })
}

export async function fillContactDump(page: Page, values: { first?: string; last?: string; email?: string; message?: string }) {
  const form = page.locator('form.wpcf7-form').first()
  await form.waitFor({ state: 'visible' })
  if (values.first !== undefined) await form.locator('[name="first-name"]').fill(values.first)
  if (values.last !== undefined) await form.locator('[name="last-name"]').fill(values.last)
  if (values.email !== undefined) await form.locator('[name="your-email"]').fill(values.email)
  if (values.message !== undefined) await form.locator('[name="your-message"]').fill(values.message)
  const consent = form.locator('[name="your-consent"]')
  if (await consent.count()) await consent.check({ force: true })
  return form
}

export async function fillDonateDump(
  page: Page,
  values: { first?: string; last?: string; email?: string; phone?: string },
) {
  const form = page.locator('form.wpcf7-form').filter({ has: page.locator('[name="First-name"]') }).first()
  await form.waitFor({ state: 'visible' })
  await form.scrollIntoViewIfNeeded()
  if (values.first !== undefined) await form.locator('[name="First-name"]').fill(values.first)
  if (values.last !== undefined) await form.locator('[name="Last-name"]').fill(values.last)
  if (values.email !== undefined) await form.locator('[name="your-email"]').fill(values.email)
  if (values.phone !== undefined) await form.locator('[name="your-phone"]').fill(values.phone)
  await form.locator('[name="your-country"]').fill('Uzbekistan')
  await form.locator('[name="secondary-school"]').fill('E2E School')
  await form.locator('[name="gpa"]').fill('4.5')
  await form.locator('[name="hsc-school"]').fill('E2E College')
  await form.locator('[name="cgpa"]').fill('4.2')
  const selects = form.locator('select[name="choose-service"]')
  const selectCount = await selects.count()
  for (let i = 0; i < selectCount; i++) {
    const sel = selects.nth(i)
    const n = await sel.locator('option').count()
    if (n > 1) await sel.selectOption({ index: 1 })
  }
  await form.locator('[name="upload-file"]').setInputFiles({
    name: 'e2e-receipt.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4 E2E'),
  })
  const consent = form.locator('[name="your-consent"]')
  if (await consent.count()) await consent.check({ force: true })
  return form
}

export async function loginAdminUi(page: Page) {
  await page.goto('/admin/login')
  await page.locator('input[type="email"]').fill(ADMIN_EMAIL)
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
  await page.getByRole('button', { name: /kirish/i }).click()
  await page.waitForURL(/\/admin\/?$/)
}

export async function loginAdminApi(request: APIRequestContext) {
  const res = await request.post(`${API}/api/auth/login`, {
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  })
  expect(res.ok(), await res.text()).toBeTruthy()
  const body = (await res.json()) as { token: string }
  expect(body.token).toBeTruthy()
  return body.token
}

