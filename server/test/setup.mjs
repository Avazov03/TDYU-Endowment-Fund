const url = process.env.DATABASE_URL || ''
if (!url || url.includes('dev.db')) {
  throw new Error(`Unit tests must use isolated test.db, got DATABASE_URL=${url}`)
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'vitest-local-jwt-secret'
}
