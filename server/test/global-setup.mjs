import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const TEST_DB = 'file:./test.db'

export default function globalSetup() {
  if (TEST_DB.includes('dev.db') || process.env.DATABASE_URL?.includes('dev.db')) {
    throw new Error('Refusing to reset/push against dev.db')
  }
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')
  execSync('npx prisma db push --schema server/prisma/schema.prisma --skip-generate', {
    cwd: root,
    env: { ...process.env, DATABASE_URL: TEST_DB },
    stdio: 'inherit',
  })
}
