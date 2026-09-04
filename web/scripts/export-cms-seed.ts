/**
 * One-shot: dump web/src/content catalogs → server/prisma/cms-seed.json
 * Run from repo: npx --yes tsx web/scripts/export-cms-seed.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { NEWS_POSTS } from '../src/content/news'
import { EVENTS } from '../src/content/events'
import { BOARD_DETAIL } from '../src/content/board'
import { ALUMNI_PEOPLE } from '../src/content/alumni'
import { SHOP_PRODUCTS } from '../src/content/shop'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const out = join(root, 'server', 'prisma', 'cms-seed.json')

function alumniCountry(p: (typeof ALUMNI_PEOPLE)[number]) {
  if (p.slug === 'jerome-bell') return 'uz'
  const label = p.mapLocation?.label
  if (label === 'UK') return 'gb'
  if (label === 'USA') return 'us'
  if (label === 'Germany') return 'de'
  if (label === 'Japan') return 'jp'
  if (label === 'Australia') return 'au'
  return 'uz'
}

const payload = {
  exportedAt: new Date().toISOString(),
  news: NEWS_POSTS,
  events: EVENTS,
  board: BOARD_DETAIL,
  alumni: ALUMNI_PEOPLE.map((p) => ({ ...p, countryCode: alumniCountry(p) })),
  shop: SHOP_PRODUCTS,
}

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(payload), 'utf8')
console.log(
  'Wrote',
  out,
  `news=${payload.news.length} events=${payload.events.length} board=${payload.board.length} alumni=${payload.alumni.length} shop=${payload.shop.length}`,
)
