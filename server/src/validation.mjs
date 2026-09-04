/** Public form field checks — Express `/api/forms` bilan bir xil qoidalar. */

export function looksLikeEmail(value) {
  const email = String(value || '').trim()
  const at = email.indexOf('@')
  return at > 0 && at < email.length - 1 && !email.includes(' ')
}

export function normalizeContact(body = {}) {
  const name =
    body.name ||
    [body.firstName, body.lastName].filter(Boolean).join(' ').trim() ||
    body['your-name'] ||
    ''
  const email = body.email || body['your-email'] || ''
  const message = body.message || body['your-message'] || body.xabar || ''
  return {
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
  }
}

export function validateContact(body = {}) {
  const { name, email, message } = normalizeContact(body)
  if (!name || !email || !message) {
    return { ok: false, error: 'name, email and message are required' }
  }
  if (!looksLikeEmail(email)) {
    return { ok: false, error: 'invalid email format' }
  }
  return { ok: true, value: { name, email, message } }
}

export function normalizeDonation(body = {}) {
  return {
    firstName: String(body.firstName || body.name || body.Ism || '').trim(),
    email: String(body.email || '').trim(),
  }
}

export function validateDonation(body = {}) {
  const { firstName, email } = normalizeDonation(body)
  if (!firstName || !email) {
    return { ok: false, error: 'firstName and email are required' }
  }
  if (!looksLikeEmail(email)) {
    return { ok: false, error: 'invalid email format' }
  }
  return { ok: true, value: { firstName, email } }
}

export function normalizeGrant(body = {}) {
  const name = body.name || [body.firstName, body.lastName].filter(Boolean).join(' ').trim()
  return {
    name: String(name || '').trim(),
    email: String(body.email || '').trim(),
  }
}

export function validateGrant(body = {}) {
  const { name, email } = normalizeGrant(body)
  if (!name || !email) {
    return { ok: false, error: 'name and email are required' }
  }
  if (!looksLikeEmail(email)) {
    return { ok: false, error: 'invalid email format' }
  }
  return { ok: true, value: { name, email } }
}

export function validateNewsletter(body = {}) {
  const email = String(body.email || '').trim().toLowerCase()
  if (!email || !looksLikeEmail(email)) {
    return { ok: false, error: 'valid email required' }
  }
  return { ok: true, value: { email } }
}

const SHOP_PICKUPS = new Set(['bino-2', 'bino-3'])

export function normalizeShopItems(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 30) return null
  const out = []
  for (const row of items) {
    if (!row || typeof row.slug !== 'string' || !/^[a-z0-9-]{2,40}$/.test(row.slug)) return null
    const qty = Number(row.qty)
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) return null
    const size = typeof row.size === 'string' ? row.size.trim() : ''
    if (size && !/^[A-Z0-9-]{1,8}$/.test(size)) return null
    out.push({ slug: row.slug, qty, size: size || undefined })
  }
  return out
}

export function validateShopOrder(body = {}) {
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').replace(/\s/g, '')
  const pickup = String(body.pickup || '').trim()
  const message = String(body.message || '').trim()
  const requestId = String(body.requestId || '').trim().slice(0, 200)
  const items = normalizeShopItems(body.items)
  if (!name || !email || !phone || !pickup || !message) {
    return { ok: false, error: 'name, email, phone, pickup and message are required' }
  }
  if (!looksLikeEmail(email)) {
    return { ok: false, error: 'invalid email format' }
  }
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15) {
    return { ok: false, error: 'invalid phone' }
  }
  if (!SHOP_PICKUPS.has(pickup)) {
    return { ok: false, error: 'invalid pickup' }
  }
  if (!items) {
    return { ok: false, error: 'invalid items' }
  }
  return { ok: true, value: { name, email, phone, pickup, message, requestId, items } }
}

export function phoneDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

export function phonesMatch(a, b) {
  const da = phoneDigits(a)
  const db = phoneDigits(b)
  if (!da || !db) return false
  if (da === db) return true
  return da.length >= 9 && db.length >= 9 && da.slice(-9) === db.slice(-9)
}

export function validateShopLookup(body = {}) {
  const email = String(body.email || '').trim().toLowerCase()
  const phone = phoneDigits(body.phone)
  if (!email || !looksLikeEmail(email)) {
    return { ok: false, error: 'invalid email format' }
  }
  if (phone.length < 9 || phone.length > 15) {
    return { ok: false, error: 'invalid phone' }
  }
  return { ok: true, value: { email, phone } }
}
