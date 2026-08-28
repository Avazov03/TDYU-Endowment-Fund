import { expect, test } from '@playwright/test'
import { waitDumpReady } from '../helpers'

const locales = [
  { code: 'uz', marker: /Bosh|Missiya|Aloqa|Xayriya/ },
  { code: 'ru', marker: /Главная|Миссия|Контакт|Пожертв/ },
  { code: 'en', marker: /Home|Mission|Contact|Donate/ },
] as const

test.describe('i18n — UZ / RU / EN', () => {
  test('uchta tilda asosiy sahifalar ochiladi va matn bo‘sh emas', async ({ page }) => {
    for (const loc of locales) {
      for (const slug of ['', '/contact', '/apply-now']) {
        const path = `/${loc.code}${slug}`
        const res = await page.goto(path, { waitUntil: 'domcontentloaded' })
        expect(res?.ok(), `${path} HTTP ${res?.status()}`).toBeTruthy()
        await expect(page.locator('html')).toHaveAttribute('lang', loc.code)
        await waitDumpReady(page)
        const text = (await page.locator('#tdyu-dump-root').innerText()).replace(/\s+/g, ' ').trim()
        expect(text.length, `${path} dump matni bo‘sh`).toBeGreaterThan(80)
        expect(text, `${path} tarjima kaliti ochiq qolgan`).not.toMatch(/\{\{|nav\.|forms\.|undefined/)
      }
    }
  })

  test('til almashtirgich UZ/RU/EN ko‘rinadi', async ({ page }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const switcher = page.locator('#tdyu-lang-switcher, .tdyu-lang').first()
    await expect(switcher).toBeVisible()
    await expect(switcher).toContainText(/O'Z|O‘Z/i)
    await expect(switcher).toContainText(/РУ/)
    await expect(switcher).toContainText(/EN/)
  })

  test('RU va EN dump matnlari UZ dan farq qiladi', async ({ page }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const uz = await page.locator('#tdyu-dump-root').innerText()

    await page.goto('/ru', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const ru = await page.locator('#tdyu-dump-root').innerText()

    await page.goto('/en', { waitUntil: 'domcontentloaded' })
    await waitDumpReady(page)
    const en = await page.locator('#tdyu-dump-root').innerText()

    expect(ru).not.toEqual(uz)
    expect(en).not.toEqual(uz)
    expect(ru).toMatch(/[А-Яа-яЁё]/)
    expect(en).toMatch(/[A-Za-z]{4,}/)
  })

  test('qo‘llab-quvvatlanmagan locale asosiy tilga yo‘naltiriladi yoki 404', async ({ page }) => {
    const res = await page.goto('/xx', { waitUntil: 'domcontentloaded' })
    const status = res?.status() ?? 0
    const url = page.url()
    const okRedirect = /\/(uz|ru|en)(\/|$)/.test(url)
    const notFound = status === 404
    expect(okRedirect || notFound, `kutilmagan /xx natija: ${status} ${url}`).toBeTruthy()
  })
})
