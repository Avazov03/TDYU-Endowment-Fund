import path from 'node:path'

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024

export const ALLOWED_UPLOAD_EXT = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx'])

export const ALLOWED_UPLOAD_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
])

export function sanitizeUploadBasename(originalname) {
  const raw = String(originalname || '')
  const base = path.basename(raw.replace(/\\/g, '/'))
  if (!base || base === '.' || base === '..') {
    throw new Error('invalid file name')
  }
  if (base.includes('..') || /[/\\]/.test(base)) {
    throw new Error('path traversal rejected')
  }
  return base.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export function storedUploadName(originalname, now = Date.now()) {
  return `${now}-${sanitizeUploadBasename(originalname)}`
}

export function assertAllowedUpload(file) {
  if (!file) {
    throw new Error('file required')
  }
  const size = Number(file.size || 0)
  if (size > MAX_UPLOAD_BYTES) {
    throw new Error('file too large')
  }
  const ext = path.extname(String(file.originalname || '')).toLowerCase()
  const mime = String(file.mimetype || '').toLowerCase()
  const extOk = ALLOWED_UPLOAD_EXT.has(ext)
  const mimeOk = ALLOWED_UPLOAD_MIME.has(mime)
  if (!extOk && !mimeOk) {
    throw new Error('file type not allowed')
  }
  sanitizeUploadBasename(file.originalname)
  return true
}
