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
