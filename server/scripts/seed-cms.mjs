/**
 * Upsert CMS catalogs from server/prisma/cms-seed.json into SQLite/Postgres.
 * Default: create missing slugs only (does not overwrite admin edits).
 * FORCE_CMS_SEED=1 — upsert all from seed (overwrites matching slugs).
 *
 * Usage: node server/scripts/seed-cms.mjs
 */
import dotenv from 'dotenv'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'
import {
  eventFromImport,
  newsFromImport,
  personFromImport,
  productFromImport,
} from '../src/cms-util.mjs'
import { unhideSlug } from '../src/cms-overlay.mjs'

const here = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(here, '../../.env') })
dotenv.config({ path: join(here, '../.env') })

const prisma = new PrismaClient()
const candidates = [
  join(here, '../prisma/cms-seed.json'),
  join(process.cwd(), 'server/prisma/cms-seed.json'),
  join(process.cwd(), 'prisma/cms-seed.json'),
]

function loadSeed() {
  for (const p of candidates) {
    if (existsSync(p)) {
      return { path: p, data: JSON.parse(readFileSync(p, 'utf8')) }
    }
  }
  throw new Error('cms-seed.json topilmadi')
}

/**
 * Default: create missing slugs only (admin edits saqlanadi).
 * FORCE_CMS_SEED=1: upsert all (overwrite matching slugs).
 */
async function seedType(label, items, { exists, write }) {
  const force = process.env.FORCE_CMS_SEED === '1' || process.env.FORCE_CMS_SEED === 'true'
  let n = 0
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    const slug = typeof item?.slug === 'string' ? item.slug : ''
    if (!slug) continue
    if (!force && (await exists(slug))) continue
    await write(item, i, force)
    n += 1
  }
  console.log(`CMS seed ${label}: ${n}${force ? ' (force)' : ' (missing only)'}`)
  return n
}

async function main() {
  const { path, data } = loadSeed()
  console.log('CMS seed from', path)

  await seedType('news', data.news || [], {
    exists: (slug) => prisma.cmsNews.findUnique({ where: { slug } }).then(Boolean),
    write: async (item, i, force) => {
      const row = newsFromImport(item, i)
      if (force) await prisma.cmsNews.upsert({ where: { slug: row.slug }, create: row, update: row })
      else await prisma.cmsNews.create({ data: row })
      await unhideSlug('news', row.slug)
    },
  })

  await seedType('events', data.events || [], {
    exists: (slug) => prisma.cmsEvent.findUnique({ where: { slug } }).then(Boolean),
    write: async (item, i, force) => {
      const row = eventFromImport(item, i)
      if (force) await prisma.cmsEvent.upsert({ where: { slug: row.slug }, create: row, update: row })
      else await prisma.cmsEvent.create({ data: row })
      await unhideSlug('events', row.slug)
    },
  })

  await seedType('board', data.board || [], {
    exists: (slug) => prisma.cmsPerson.findUnique({ where: { slug } }).then(Boolean),
    write: async (item, i, force) => {
      const row = personFromImport(item, 'board', i)
      if (force) await prisma.cmsPerson.upsert({ where: { slug: row.slug }, create: row, update: row })
      else await prisma.cmsPerson.create({ data: row })
      await unhideSlug('board', row.slug)
    },
  })

  await seedType('alumni', data.alumni || [], {
    exists: (slug) => prisma.cmsPerson.findUnique({ where: { slug } }).then(Boolean),
    write: async (item, i, force) => {
      const row = personFromImport(item, 'alumni', i)
      if (force) await prisma.cmsPerson.upsert({ where: { slug: row.slug }, create: row, update: row })
      else await prisma.cmsPerson.create({ data: row })
      await unhideSlug('alumni', row.slug)
    },
  })

  await seedType('shop', data.shop || [], {
    exists: (slug) => prisma.shopProduct.findUnique({ where: { slug } }).then(Boolean),
    write: async (item, i, force) => {
      const row = productFromImport(item, i)
      if (force) await prisma.shopProduct.upsert({ where: { slug: row.slug }, create: row, update: row })
      else await prisma.shopProduct.create({ data: row })
      await unhideSlug('shop', row.slug)
    },
  })

  console.log('CMS seed OK')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
