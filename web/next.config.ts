import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  devIndicators: false,
  async redirects() {
    const aliases: [string, string][] = [
      ['about', 'about-us'],
      ['mission', 'about-us'],
      ['apply-now', 'donate'],
      ['scholarships', 'grants'],
      ['all-programs', 'programs'],
      ['blog', 'news'],
      ['blog-grid-3-column', 'news'],
      ['all-events', 'events'],
      ['all-alumni', 'alumni'],
      ['all-faculty-members', 'board'],
      ['blog-standard', 'news'],
      ['blog-list', 'news'],
      ['privacy-policy', 'privacy'],
      ['tuition-fee', 'reports'],
      ['vice-chancellor', 'governance'],
      ['cost-financial-aid', 'transparency'],
      ['admission-requirements', 'legal'],
      ['how-to-apply', 'support'],
      ['researches', 'projects'],
      ['research', 'projects'],
      ['contact-us', 'contact'],
      ['category/alumni', 'alumni'],
      ['category/educations', 'programs'],
      ['category/education', 'programs'],
      ['category/online', 'news'],
      ['category/research', 'projects'],
      ['category/university', 'about-us'],
    ]
    return aliases.flatMap(([from, to]) =>
      ['uz', 'ru', 'en'].map((locale) => ({
        source: `/${locale}/${from}`,
        destination: `/${locale}/${to}`,
        permanent: false,
      })),
    )
  },
  async rewrites() {
    const api = process.env.API_ORIGIN || 'http://127.0.0.1:8787'
    return [
      { source: '/api/:path*', destination: `${api}/api/:path*` },
      { source: '/uploads/:path*', destination: `${api}/uploads/:path*` },
    ]
  },
}

export default withNextIntl(nextConfig)
