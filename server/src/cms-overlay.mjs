import { prisma } from './db.mjs'

export function hiddenKey(collection) {
  return `cms.hidden.${collection}`
}

export async function getHiddenSlugs(collection) {
  const row = await prisma.setting.findUnique({ where: { key: hiddenKey(collection) } })
  if (!row?.value) return []
  try {
    const arr = JSON.parse(row.value)
    return Array.isArray(arr) ? arr.map(String).filter(Boolean) : []
  } catch {
    return []
  }
}

async function writeHidden(collection, slugs) {
  const key = hiddenKey(collection)
  await prisma.setting.upsert({
    where: { key },
    create: { key, value: JSON.stringify(slugs) },
    update: { value: JSON.stringify(slugs) },
  })
}

export async function hideSlug(collection, slug) {
  const value = String(slug || '').trim()
  if (!value) return
  const cur = await getHiddenSlugs(collection)
  if (cur.includes(value)) return
  await writeHidden(collection, [...cur, value])
}

export async function unhideSlug(collection, slug) {
  const value = String(slug || '').trim()
  if (!value) return
  const cur = await getHiddenSlugs(collection)
  const next = cur.filter((s) => s !== value)
  if (next.length === cur.length) return
  await writeHidden(collection, next)
}

export async function overlayListPayload(collection, publishedItems, unpublishedSlugs) {
  const hidden = await getHiddenSlugs(collection)
  const suppressed = [...new Set([...hidden, ...(unpublishedSlugs || [])])]
  return { items: publishedItems, suppressed }
}

export async function overlayItemPayload(collection, row, mapFn, requestSlug) {
  const slug = String((row?.slug || requestSlug || '')).trim()
  const hidden = slug ? (await getHiddenSlugs(collection)).includes(slug) : false
  if (row && !row.published) return { item: null, suppressed: true }
  if (!row && hidden) return { item: null, suppressed: true }
  if (row && row.published) return { item: mapFn(row), suppressed: false }
  return { item: null, suppressed: false }
}

export function mergeOverlayList(base, overlay, suppressed, slugOf) {
  const hide = new Set((suppressed || []).filter(Boolean))
  const fromDb = overlay || []
  const seen = new Set()
  const out = []
  for (const item of fromDb) {
    const slug = slugOf(item)
    if (!slug || hide.has(slug) || seen.has(slug)) continue
    out.push(item)
    seen.add(slug)
  }
  for (const item of base) {
    const slug = slugOf(item)
    if (!slug || hide.has(slug) || seen.has(slug)) continue
    out.push(item)
    seen.add(slug)
  }
  return out
}
