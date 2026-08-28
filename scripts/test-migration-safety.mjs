#!/usr/bin/env node
/**
 * Jadval yozuvlari sonini saqlash va solishtirish (SQLite → Postgres oldidan/keyin).
 * Avtomatik CI da ishlamaydi — faqat qo‘lda:
 *   DATABASE_URL="file:./test.db" npm run test:migration-safety -- snapshot
 *   DATABASE_URL="file:./test.db" npm run test:migration-safety -- verify
 *
 * dev.db ga yozish/o‘qish uchun aniq --allow-dev-db kerak.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const snapshotPath = path.join(root, 'server/prisma/.migration-row-counts.json')

const COUNTERS = [
  ['AdminUser', (p) => p.adminUser.count()],
  ['ContactMessage', (p) => p.contactMessage.count()],
  ['Donation', (p) => p.donation.count()],
  ['GrantApplication', (p) => p.grantApplication.count()],
  ['NewsletterSubscriber', (p) => p.newsletterSubscriber.count()],
  ['Announcement', (p) => p.announcement.count()],
  ['ContentBlock', (p) => p.contentBlock.count()],
  ['Document', (p) => p.document.count()],
  ['Setting', (p) => p.setting.count()],
]

function parseArgs(argv) {
  const allowDevDb = argv.includes('--allow-dev-db')
  const rest = argv.filter((a) => a !== '--allow-dev-db')
  const command = rest[0] || ''
  return { command, allowDevDb }
}

function databaseHint(url) {
  const raw = String(url || '')
  if (raw.startsWith('file:')) return raw
  try {
    const u = new URL(raw)
    return `${u.protocol}//${u.hostname}${u.pathname}`
  } catch {
    return 'unparsed'
  }
}

function assertSafeUrl(url, allowDevDb) {
  if (!url) {
    console.error('DATABASE_URL berilmagan. Masalan: DATABASE_URL="file:./test.db"')
    process.exit(2)
  }
  if (/yuritta|yuretta|52\.59\.209\.166/i.test(url)) {
    console.error('Bu skript production host URL bilan ishlamaydi.')
    process.exit(2)
  }
  if (url.includes('dev.db') && !allowDevDb) {
    console.error('dev.db ga tegilmaydi. test.db ishlating yoki --allow-dev-db qo‘shing.')
    process.exit(2)
  }
}

async function readCounts(prisma) {
  const counts = {}
  for (const [name, fn] of COUNTERS) {
    counts[name] = await fn(prisma)
  }
  return counts
}

function printCounts(counts) {
  const width = Math.max(...Object.keys(counts).map((k) => k.length))
  for (const [name, n] of Object.entries(counts)) {
    console.log(`  ${name.padEnd(width)}  ${n}`)
  }
}

async function main() {
  const { command, allowDevDb } = parseArgs(process.argv.slice(2))
  if (command !== 'snapshot' && command !== 'verify') {
    console.error(`Ishlatish:
  npm run test:migration-safety -- snapshot
  npm run test:migration-safety -- verify
  (ixtiyoriy) --allow-dev-db`)
    process.exit(2)
  }

  const url = process.env.DATABASE_URL || ''
  assertSafeUrl(url, allowDevDb)

  const prisma = new PrismaClient()
  try {
    const counts = await readCounts(prisma)
    if (command === 'snapshot') {
      const payload = {
        takenAt: new Date().toISOString(),
        database: databaseHint(url),
        counts,
      }
      fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
      fs.writeFileSync(snapshotPath, `${JSON.stringify(payload, null, 2)}\n`)
      console.log(`Snapshot yozildi: ${path.relative(root, snapshotPath)}`)
      console.log(`Baza: ${payload.database}`)
      printCounts(counts)
      return
    }

    if (!fs.existsSync(snapshotPath)) {
      console.error(`Snapshot yo‘q: ${path.relative(root, snapshotPath)}\nAvval: npm run test:migration-safety -- snapshot`)
      process.exit(2)
    }
    const prev = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
    const before = prev.counts || {}
    const diffs = []
    const names = new Set([...Object.keys(before), ...Object.keys(counts)])
    for (const name of names) {
      const a = Number(before[name] ?? 0)
      const b = Number(counts[name] ?? 0)
      if (a !== b) diffs.push({ table: name, before: a, after: b, delta: b - a })
    }

    console.log(`Solishtirish: snapshot ${prev.takenAt || '?'} (${prev.database || '?'})`)
    console.log('Hozirgi:')
    printCounts(counts)

    if (diffs.length) {
      console.error('\nYozuvlar soni MOS EMAS:')
      for (const d of diffs) {
        console.error(`  ${d.table}: ${d.before} → ${d.after} (delta ${d.delta > 0 ? '+' : ''}${d.delta})`)
      }
      process.exit(1)
    }
    console.log('\nOK: barcha jadvallarda yozuvlar soni bir xil.')
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
