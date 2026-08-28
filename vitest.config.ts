import { defineConfig } from 'vitest/config'

const TEST_DB = 'file:./test.db'

if (TEST_DB.includes('dev.db')) {
  throw new Error('Vitest must not use dev.db')
}

export default defineConfig({
  test: {
    environment: 'node',
    include: ['server/**/*.test.mjs'],
    exclude: ['node_modules', 'web', 'e2e', 'dist'],
    env: {
      DATABASE_URL: TEST_DB,
      JWT_SECRET: 'vitest-local-jwt-secret',
    },
    globalSetup: './server/test/global-setup.mjs',
    setupFiles: ['./server/test/setup.mjs'],
    fileParallelism: false,
    pool: 'forks',
  },
})
