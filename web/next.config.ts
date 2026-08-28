import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  devIndicators: false,
  async redirects() {
    const aliases: [string, string][] = [
      ['about', 'about-us'],
      ['donate', 'apply-now'],
      ['programs', 'all-programs'],
      ['privacy', 'privacy-policy'],
      ['news', 'blog'],
      ['grants', 'scholarships'],
      ['projects', 'researches'],
      ['governance', 'vice-chancellor'],
      ['reports', 'tuition-fee'],
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
