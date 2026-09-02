import { expect, test } from '@playwright/test'

const locales = [
  { code: 'uz', marker: /Bosh|Missiya|Aloqa|Xayriya/ },
  { code: 'ru', marker: /Главная|Миссия|Контакт|Пожертв/ },
  { code: 'en', marker: /Home|Mission|Contact|Donate/ },
] as const

test.describe('i18n — UZ / RU / EN', () => {
  test('uchta tilda asosiy sahifalar ochiladi va matn bo‘sh emas', async ({ page }) => {
    for (const loc of locales) {
      for (const slug of ['', '/contact', '/donate']) {
        const path = `/${loc.code}${slug}`
        const res = await page.goto(path, { waitUntil: 'domcontentloaded' })
        expect(res?.ok(), `${path} HTTP ${res?.status()}`).toBeTruthy()
        await expect(page.locator('html')).toHaveAttribute('lang', loc.code)
        const text = (await page.locator('.live-root').innerText()).replace(/\s+/g, ' ').trim()
        expect(text.length, `${path} matni bo‘sh`).toBeGreaterThan(80)
        expect(text, `${path} tarjima kaliti ochiq qolgan`).not.toMatch(/\{\{|nav\.|forms\.|undefined/)
        expect(text, `${path} til belgisi`).toMatch(loc.marker)
      }
    }
  })

  test('til almashtirgich UZ/RU/EN ko‘rinadi', async ({ page }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' })
    const switcher = page.getByRole('navigation', { name: 'Language' })
    await expect(switcher).toBeVisible()
    await expect(switcher).toContainText(/O'Z|O‘Z/i)
    await expect(switcher).toContainText(/РУ/)
    await expect(switcher).toContainText(/EN/)
  })

  test('RU va EN matnlari UZ dan farq qiladi', async ({ page }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' })
    const uz = await page.locator('.live-root').innerText()

    await page.goto('/ru', { waitUntil: 'domcontentloaded' })
    const ru = await page.locator('.live-root').innerText()

    await page.goto('/en', { waitUntil: 'domcontentloaded' })
    const en = await page.locator('.live-root').innerText()

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
