import path from 'node:path'

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024

export const ALLOWED_UPLOAD_EXT = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx'])
export const ALLOWED_IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

export const ALLOWED_UPLOAD_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
])

export const ALLOWED_IMAGE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

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

function assertFileShape(file, { maxBytes, exts, mimes, emptyOk = false }) {
  if (!file) {
    throw new Error('file required')
  }
  const size = Number(file.size || 0)
  if (size > maxBytes) {
    throw new Error('file too large')
  }
  const ext = path.extname(String(file.originalname || '')).toLowerCase()
  const mime = String(file.mimetype || '').toLowerCase()
  const extOk = exts.has(ext)
  const mimeOk = mimes.has(mime)
  if (!extOk && !mimeOk) {
    throw new Error('file type not allowed')
  }
  if (!emptyOk && size === 0 && file.size !== 0) {
    // multer fileFilter often sees size 0 before write; allow that path
  }
  sanitizeUploadBasename(file.originalname)
  return true
}

export function assertAllowedUpload(file) {
  return assertFileShape(file, {
    maxBytes: MAX_UPLOAD_BYTES,
    exts: ALLOWED_UPLOAD_EXT,
    mimes: ALLOWED_UPLOAD_MIME,
  })
}

export function assertAllowedImage(file) {
  return assertFileShape(file, {
    maxBytes: MAX_IMAGE_BYTES,
    exts: ALLOWED_IMAGE_EXT,
    mimes: ALLOWED_IMAGE_MIME,
  })
}
