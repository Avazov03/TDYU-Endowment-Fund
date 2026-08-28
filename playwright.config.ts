import { defineConfig, devices } from '@playwright/test'

const WEB = process.env.E2E_WEB_URL || 'http://127.0.0.1:3000'
const API = process.env.E2E_API_URL || 'http://127.0.0.1:8787'
const ADMIN = process.env.E2E_ADMIN_URL || 'http://localhost:5173'

for (const url of [WEB, API, ADMIN]) {
  if (/yuritta\.uz|yuretta\.uz|52\.59\.209\.166/i.test(url)) {
    throw new Error(`E2E must target local dev only, got: ${url}`)
  }
}

const argv = process.argv.join(' ')
const projectScoped = argv.includes('--project=')
const needsVite = !projectScoped || argv.includes('--project=admin')

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: WEB,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'smoke',
      testMatch: /smoke\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'forms',
      testMatch: /forms\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'admin',
      testMatch: /admin\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: ADMIN },
    },
    {
      name: 'i18n',
      testMatch: /i18n\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run server',
      url: `${API}/api/health`,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'npm run dev:next',
      url: WEB,
      reuseExistingServer: true,
      timeout: 180_000,
    },
    ...(needsVite
      ? [
          {
            command: 'npm run dev',
            url: `${ADMIN}/cyan/index.html`,
            reuseExistingServer: true,
            timeout: 120_000,
          },
        ]
      : []),
  ],
})
