import { describe, expect, it } from 'vitest'
import {
  MAX_UPLOAD_BYTES,
  assertAllowedUpload,
  sanitizeUploadBasename,
  storedUploadName,
} from './upload-security.mjs'

describe('sanitizeUploadBasename / path traversal', () => {
  it('oddiy nomni saqlaydi', () => {
    expect(sanitizeUploadBasename('hisobot-2026.pdf')).toBe('hisobot-2026.pdf')
  })

  it('katalog prefiksini olib tashlaydi', () => {
    expect(sanitizeUploadBasename('../../etc/passwd.pdf')).toBe('passwd.pdf')
  })

  it('bo‘sh yoki `.` nomni rad etadi', () => {
    expect(() => sanitizeUploadBasename('')).toThrow(/invalid file name/i)
    expect(() => sanitizeUploadBasename('.')).toThrow(/invalid file name/i)
  })
})

describe('assertAllowedUpload', () => {
  it('PDF faylni qabul qiladi', () => {
    expect(
      assertAllowedUpload({
        originalname: 'report.pdf',
        mimetype: 'application/pdf',
        size: 1024,
      }),
    ).toBe(true)
  })

  it('fayl yo‘q — xato', () => {
    expect(() => assertAllowedUpload(null)).toThrow(/file required/i)
  })

  it('hajm limitidan oshsa — xato', () => {
    expect(() =>
      assertAllowedUpload({
        originalname: 'big.pdf',
        mimetype: 'application/pdf',
        size: MAX_UPLOAD_BYTES + 1,
      }),
    ).toThrow(/too large/i)
  })

  it('exe turi — xato', () => {
    expect(() =>
      assertAllowedUpload({
        originalname: 'malware.exe',
        mimetype: 'application/x-msdownload',
        size: 100,
      }),
    ).toThrow(/type not allowed/i)
  })
})

describe('storedUploadName', () => {
  it('timestamp prefiks qo‘shadi', () => {
    expect(storedUploadName('a.pdf', 1700000000000)).toBe('1700000000000-a.pdf')
  })
})
