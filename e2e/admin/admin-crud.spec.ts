import { expect, test } from '@playwright/test'
import { ADMIN_EMAIL, ADMIN_PASSWORD, API, loginAdminApi, loginAdminUi } from '../helpers'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'

const stamp = () => Date.now()

test.describe('admin — login', () => {
  test('noto‘g‘ri parol xato ko‘rsatadi', async ({ page }) => {
    await page.goto('/admin/login')
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL)
    await page.locator('input[type="password"]').fill('WrongPassword!99')
    await page.getByRole('button', { name: /kirish/i }).click()
    await expect(page.locator('.error')).toContainText(/invalid|failed|parol|credentials/i)
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('to‘g‘ri hisob dashboardga olib kiradi', async ({ page }) => {
    await loginAdminUi(page)
    await expect(page.locator('h1').first()).toBeVisible()
  })
})

test.describe('admin — yangilik CRUD', () => {
  test('e’lon qo‘shiladi; bo‘sh sarlavha yuborilmaydi', async ({ page }) => {
    await loginAdminUi(page)
    await page.getByRole('link', { name: 'Yangiliklar' }).click()
    await expect(page).toHaveURL(/\/admin\/announcements/)
    await expect(page.getByRole('heading', { name: /Yangiliklar/i })).toBeVisible()

    await page.locator('form.form-grid button[type="submit"]').click()
    const titleInput = page.locator('form.form-grid input').first()
    const valid = await titleInput.evaluate((el: HTMLInputElement) => el.checkValidity())
    expect(valid, 'bo‘sh sarlavha HTML5 validatsiyadan o‘tmasligi kerak').toBe(false)

    const title = `E2E yangilik ${stamp()}`
    await titleInput.fill(title)
    await page.locator('form.form-grid textarea').first().fill('Playwright orqali qo‘shilgan namuna matn.')
    await page.locator('form.form-grid button[type="submit"]').click()
    await expect(page.locator('.success')).toContainText(/Yaratildi/i)
    await expect(page.locator('table')).toContainText(title)
  })
})

test.describe('admin — hujjat yuklash', () => {
  test('faylsiz yuklash xato; PDF bilan muvaffaqiyatli', async ({ page }) => {
    await loginAdminUi(page)
    await page.getByRole('link', { name: 'Hujjatlar' }).click()
    await expect(page).toHaveURL(/\/admin\/documents/)
    await expect(page.getByRole('heading', { name: 'Hujjatlar', exact: true })).toBeVisible()

    const fileInput = page.locator('input[type="file"]')
    await fileInput.evaluate((el: HTMLInputElement) => el.removeAttribute('required'))
    await page.getByRole('button', { name: /^Yuklash$/ }).click()
    await expect(page.locator('.error')).toContainText(/Fayl tanlang/i)

    const tmp = path.join(os.tmpdir(), `tdyu-e2e-${stamp()}.pdf`)
    fs.writeFileSync(tmp, '%PDF-1.4 E2E test file')
    const title = `E2E hujjat ${stamp()}`
    await page.locator('form.form-grid input').first().fill(title)
    await fileInput.setInputFiles(tmp)
    await page.getByRole('button', { name: /^Yuklash$/ }).click()
    await expect(page.locator('.success')).toContainText(/yuklandi/i)
    await expect(page.locator('table')).toContainText(title)
    fs.unlinkSync(tmp)
  })
})

test.describe('admin — status va ruxsat', () => {
  test('xayriya statusi o‘zgaradi', async ({ page, request }) => {
    const email = `e2e.status.${stamp()}@example.com`
    const create = await request.post(`${API}/api/forms/donation`, {
      data: {
        firstName: 'E2E Status',
        email,
        amount: '250000',
        currency: 'UZS',
      },
    })
    expect(create.status()).toBe(201)

    await loginAdminUi(page)
    await page.getByRole('link', { name: 'Xayriya', exact: true }).click()
    await expect(page).toHaveURL(/\/admin\/donations/)
    await page.locator('input.search').fill(email)
    await expect(page.getByText(email)).toBeVisible()
    await page.getByRole('button', { name: /Boshqarish/i }).click()
    await page.locator('label:has-text("Status") select').selectOption('confirmed')
    await page.getByRole('button', { name: /^Saqlash$/ }).click()
    await expect(page.locator('table')).toContainText('Tasdiqlangan')
  })

  test('tokensiz admin API 401 qaytaradi', async ({ request }) => {
    const res = await request.get(`${API}/api/admin/stats`)
    expect(res.status()).toBe(401)
  })

  test('JWT bilan stats olinadi', async ({ request }) => {
    const token = await loginAdminApi(request)
    const res = await request.get(`${API}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    expect(res.status()).toBe(200)
    const body = (await res.json()) as { contactsNew: number }
    expect(typeof body.contactsNew).toBe('number')
  })
})
