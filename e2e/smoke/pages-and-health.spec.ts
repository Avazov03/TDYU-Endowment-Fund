import { expect, test } from '@playwright/test'
import { API, waitDumpReady } from '../helpers'

test.describe('smoke — pages + health', () => {
  test('asosiy sahifalar ochiladi', async ({ page }) => {
    const paths = ['/uz', '/uz/contact', '/uz/apply-now', '/uz/about-us']
    for (const path of paths) {
      const res = await page.goto(path, { waitUntil: 'domcontentloaded' })
      expect(res?.ok(), `${path} HTTP ${res?.status()}`).toBeTruthy()
      await waitDumpReady(page)
      const text = await page.locator('#tdyu-dump-root').innerText()
      expect(text.replace(/\s+/g, ' ').trim().length, `${path} bo‘sh`).toBeGreaterThan(80)
    }
  })

  test('mavjud bo‘lmagan sahifa 404 qaytaradi', async ({ page }) => {
    const res = await page.goto('/uz/this-page-does-not-exist-tdyu-e2e', { waitUntil: 'domcontentloaded' })
    expect(res?.status(), 'kutilgan 404').toBe(404)
  })

  test('GET /api/health Express da ishlaydi', async ({ request }) => {
    const res = await request.get(`${API}/api/health`)
    expect(res.status()).toBe(200)
    const body = (await res.json()) as { ok: boolean; service: string }
    expect(body.ok).toBe(true)
    expect(body.service).toBe('tdyu-endowment-api')
  })

  test('GET /api/health Next rewrite orqali ishlaydi', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/api/health`)
    expect(res.status()).toBe(200)
    const body = (await res.json()) as { ok: boolean }
    expect(body.ok).toBe(true)
  })

  test('noto‘g‘ri API yo‘li xato qaytaradi', async ({ request }) => {
    const res = await request.get(`${API}/api/this-route-does-not-exist`)
    expect(res.status()).toBeGreaterThanOrEqual(400)
  })
})
