import { expect, type APIRequestContext, type Page } from '@playwright/test'

export const WEB = process.env.E2E_WEB_URL || 'http://127.0.0.1:3000'
export const API = process.env.E2E_API_URL || 'http://127.0.0.1:8787'
export const ADMIN = process.env.E2E_ADMIN_URL || 'http://127.0.0.1:3000'
export const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || 'admin@tdyu-endowment.uz'
export const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || 'Admin123!'

export async function expectFormOk(page: Page, text: string | RegExp) {
  await expect(page.getByText(text)).toBeVisible({ timeout: 20_000 })
}

export async function fillContact(page: Page, values: { name?: string; email?: string; message?: string }) {
  const form = page.locator('#contact-form')
  await form.waitFor({ state: 'visible' })
  if (values.name !== undefined) {
    await form.locator('[name="name"]').fill(values.name)
    const last = form.locator('[name="lastName"]')
    if (await last.count()) await last.fill('E2E')
  }
  if (values.email !== undefined) await form.locator('[name="email"]').fill(values.email)
  if (values.message !== undefined) await form.locator('[name="message"]').fill(values.message)
  const consent = form.locator('[name="consent"]')
  if (await consent.count()) await consent.check()
  return form
}

export async function fillDonate(
  page: Page,
  values: { first?: string; last?: string; email?: string; phone?: string },
) {
  const form = page.locator('#calc')
  await form.waitFor({ state: 'visible' })
  await form.scrollIntoViewIfNeeded()
  if (values.first !== undefined) await form.locator('[name="firstName"]').fill(values.first)
  if (values.last !== undefined) await form.locator('[name="lastName"]').fill(values.last)
  if (values.email !== undefined) await form.locator('[name="email"]').fill(values.email)
  if (values.phone !== undefined) await form.locator('[name="phone"]').fill(values.phone)
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
