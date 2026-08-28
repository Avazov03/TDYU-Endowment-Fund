import fs from 'node:fs'
import path from 'node:path'
import type { Locale } from '@/i18n/routing'

export type DumpScript = { src?: string; content?: string }

export type DumpDoc = {
  title: string
  bodyClass: string
  lang: string
  bodyHtml: string
  stylesheets: string[]
  inlineStyles: string[]
  scripts: DumpScript[]
}

const LOCALE_ROOT: Record<Locale, string> = {
  uz: 'cyan',
  ru: 'ru',
  en: 'en',
}

export function dumpRoot(locale: Locale) {
  return LOCALE_ROOT[locale]
}

function publicDir() {
  return path.join(process.cwd(), 'public')
}

const PAGE_ALIAS: Record<string, string> = {
  about: 'about-us',
  donate: 'apply-now',
  programs: 'all-programs',
  privacy: 'privacy-policy',
  news: 'blog',
  grants: 'scholarships',
  projects: 'researches',
  governance: 'vice-chancellor',
  reports: 'tuition-fee',
  transparency: 'cost-financial-aid',
  legal: 'admission-requirements',
  support: 'how-to-apply',
  mission: 'mission-value',
  'blog-grid-3-column': 'blog',
  'blog-standard': 'blog',
  'blog-list': 'blog',
}

const CATEGORY_ALIAS: Record<string, string> = {
  alumni: 'alumni',
  educations: 'all-programs',
  education: 'all-programs',
  online: 'blog',
  research: 'researches',
  university: 'about-us',
}

function normalizeSlug(slug: string[]) {
  const parts = slug.filter(Boolean)
  if (parts.at(-1) === 'index.html') parts.pop()
  else if (parts.length && /\.html$/i.test(parts.at(-1)!)) {
    parts[parts.length - 1] = parts[parts.length - 1]!.replace(/\.html$/i, '')
  }
  return parts
}

function resolveDumpSlug(slug: string[]) {
  const parts = normalizeSlug(slug)
  if (!parts.length) return parts
  const key = parts.join('/')
  if (PAGE_ALIAS[key]) return PAGE_ALIAS[key].split('/')
  if (PAGE_ALIAS[parts[0]!]) return [PAGE_ALIAS[parts[0]!], ...parts.slice(1)]
  if (parts[0] === 'category' && parts[1] && CATEGORY_ALIAS[parts[1]]) {
    return [CATEGORY_ALIAS[parts[1]]]
  }
  return parts
}

export function dumpFilePath(locale: Locale, slug: string[]) {
  const root = dumpRoot(locale)
  const parts = resolveDumpSlug(slug)
  if (parts.length === 0) return path.join(publicDir(), root, 'index.html')
  return path.join(publicDir(), root, ...parts, 'index.html')
}

export function loadDump(locale: Locale, slug: string[]): DumpDoc | null {
  const file = dumpFilePath(locale, slug)
  if (!fs.existsSync(file)) return null
  const html = fs.readFileSync(file, 'utf8')
  const dumpDir = resolveDumpSlug(slug).join('/')
  const head = html.slice(0, html.search(/<body/i))
  const bodyOpen = html.match(/<body([^>]*)>/i)?.[1] ?? ''
  const bodyClass = /class=["']([^"']*)["']/i.exec(bodyOpen)?.[1] ?? ''
  const lang = /data-tdyu-lang=["']([^"']*)["']/i.exec(bodyOpen)?.[1] ?? locale
  const bodyInner = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? ''
  const title = fixMojibake(head.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? 'TDYU Endowment Fund')

  const stylesheets = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /rel=["']stylesheet["']/i.test(tag))
    .map((tag) => tag.match(/href=["']([^"']+)["']/i)?.[1])
    .filter((href): href is string => Boolean(href))
    .map((href) => rewriteUrl(href, locale, dumpDir))

  const inlineStyles = [...head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) =>
    rewriteCssUrls(m[1], locale, dumpDir),
  )

  const scripts: DumpScript[] = []
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1]
    const content = m[2]
    const src = attrs.match(/src=["']([^"']+)["']/i)?.[1]
    if (src) {
      if (/tdyu-i18n\.js/i.test(src)) continue
      scripts.push({ src: rewriteUrl(src, locale, dumpDir) })
    } else if (content.trim()) {
      scripts.push({ content: rewriteCssUrls(content, locale, dumpDir) })
    }
  }

  return {
    title,
    bodyClass,
    lang,
    bodyHtml: rewriteHtml(stripScripts(fixMojibake(bodyInner)), locale, dumpDir),
    stylesheets: [...new Set(stylesheets)],
    inlineStyles,
    scripts,
  }
}

function stripScripts(html: string) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '')
}

/** UTF-8 bytes (’ — “) mis-read as Windows-1252 then saved as UTF-8: taвЂ™lim → ta'lim */
export function fixMojibake(html: string) {
  const pairs: [string, string][] = [
    ['вЂ™', "'"],
    ['вЂ', "'"],
    ['вЂњ', '"'],
    ['вЂќ', '"'],
    ['вЂ“', '–'],
    ['вЂ”', '—'],
    ['вЂ¦', '…'],
    ['вЂ«', '«'],
    ['вЂ»', '»'],
    ['В·', '·'],
    ['В©', '©'],
    ['â€™', "'"],
    ['â€˜', "'"],
    ['â€œ', '"'],
    ['â€�', '"'],
    ['â€“', '–'],
    ['â€”', '—'],
    ['â€¦', '…'],
  ]
  let out = html
  for (const [from, to] of pairs) out = out.split(from).join(to)
  return out
}

function rewriteCssUrls(css: string, locale: Locale, dumpDir: string) {
  return css.replace(/url\((['"]?)([^'")]+)\1\)/g, (_, q, u) => `url(${q}${rewriteUrl(u, locale, dumpDir)}${q})`)
}

const SEAL = '/brand/tdyu-official-seal.png'
const SEAL_FILE =
  /(?:cyan-m-logo1|marquee-logo|cyan-left-img1-min|mission-1|m-g-icon1)\.png/i

function rewriteSealHtml(html: string) {
  return html.replace(new RegExp(`[^"'()\\s]*${SEAL_FILE.source}`, 'gi'), SEAL)
}

function rewriteHtml(html: string, locale: Locale, dumpDir: string) {
  let out = rewriteYoutubeHtml(html)
  out = out.replace(/(href|src|action)=(["'])([^"']*)\2/gi, (_, attr, q, u) => {
    return `${attr}=${q}${rewriteUrl(u, locale, dumpDir)}${q}`
  })
  out = out.replace(/srcset=(["'])([^"']*)\1/gi, (_, q, set) => {
    const next = set
      .split(',')
      .map((part: string) => {
        const bits = part.trim().split(/\s+/)
        if (!bits[0]) return part
        bits[0] = rewriteUrl(bits[0], locale, dumpDir)
        return bits.join(' ')
      })
      .join(', ')
    return `srcset=${q}${next}${q}`
  })
  out = rewriteCssUrls(out, locale, dumpDir)
  return rewriteSealHtml(out)
}

/** Univet template placeholders → official TSUL (@tsulofficial) videos. */
const YT_SWAP: Record<string, string> = {
  LpdRAyIGg8I: 'v-Z3jc0-LhU', // Welcome to TSUL
  LXvZA4bmUU4: 'KIgz0XGDJZw', // TDYU haqida xorijiy talabalar
}

function rewriteYoutubeHtml(html: string) {
  let out = html
  for (const [from, to] of Object.entries(YT_SWAP)) {
    out = out.split(from).join(to)
  }
  return out
}

export function rewriteUrl(raw: string, locale: Locale, dumpDir: string) {
  let url = String(raw).trim()
  if (
    !url ||
    url.startsWith('#') ||
    url.startsWith('data:') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('javascript:')
  ) {
    return raw
  }

  url = url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, '')
  url = url.replace(/^https?:\/\/univet\.rstheme\.com/i, '')

  // Keep YouTube / other third-party URLs. Otherwise `new URL(full, dummy)`
  // turns https://www.youtube.com/watch?v=… into a local /uz/watch page.
  if (/^https?:\/\//i.test(url)) {
    return url
  }

  let pathname = url
  let hash = ''
  let search = ''
  const hashI = pathname.indexOf('#')
  if (hashI >= 0) {
    hash = pathname.slice(hashI)
    pathname = pathname.slice(0, hashI)
  }
  const qI = pathname.indexOf('?')
  if (qI >= 0) {
    search = pathname.slice(qI)
    pathname = pathname.slice(0, qI)
  }

  const root = dumpRoot(locale)

  if (pathname.startsWith('/brand/tdyu-mark.png')) {
    return '/brand/tdyu-mark.svg'
  }

  if (SEAL_FILE.test(pathname)) {
    return SEAL
  }

  if (
    pathname.startsWith('/tdyu') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/api')
  ) {
    return pathname + search + hash
  }

  if (!pathname.startsWith('/')) {
    const base = `/${root}/${dumpDir ? `${dumpDir}/` : ''}`
    try {
      pathname = new URL(pathname, `https://dummy.local${base}`).pathname
    } catch {
      pathname = `/${root}/${pathname}`
    }
  }

  const isAsset =
    /\.(css|js|mjs|png|jpe?g|webp|gif|svg|woff2?|ttf|eot|json|mp4|webm|ico|map)(\?|$)/i.test(pathname) ||
    pathname.includes('/wp-content/') ||
    pathname.includes('/wp-includes/') ||
    pathname.includes('/siteground-optimizer')

  if (isAsset) {
    if (pathname.startsWith('/wp-')) pathname = `/${root}${pathname}`
    return pathname + search + hash
  }

  let page = pathname
  for (const r of ['cyan', 'ru', 'en']) {
    if (page === `/${r}` || page.startsWith(`/${r}/`)) {
      page = page.slice(r.length + 1) || '/'
      break
    }
  }
  page = page.replace(/\/index\.html$/i, '').replace(/\.html$/i, '')
  if (!page.startsWith('/')) page = `/${page}`

  const cat = page.match(/^\/category\/([^/]+)/i)
  if (cat && CATEGORY_ALIAS[cat[1]]) {
    page = `/${CATEGORY_ALIAS[cat[1]]}`
  } else {
    const first = page.replace(/^\//, '').split('/')[0]
    if (first && PAGE_ALIAS[first]) {
      page = `/${PAGE_ALIAS[first]}${page.slice(first.length + 1)}`
    }
  }

  if (page === '/') return `/${locale}${hash}`
  return `/${locale}${page}${search}${hash}`
}
