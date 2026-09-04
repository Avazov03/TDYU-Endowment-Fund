export function overlayList<T>(
  base: T[],
  overlay: T[] | undefined,
  suppressed: string[] | undefined,
  slugOf: (item: T) => string,
): T[] {
  const hide = new Set((suppressed || []).filter(Boolean))
  const fromDb = overlay || []
  const seen = new Set<string>()
  const out: T[] = []
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

export function overlayItem<T>(
  fallback: T | undefined,
  data: { item?: T | null; suppressed?: boolean } | null | undefined,
): T | undefined {
  if (data?.suppressed) return undefined
  if (data?.item) return data.item
  return fallback
}
