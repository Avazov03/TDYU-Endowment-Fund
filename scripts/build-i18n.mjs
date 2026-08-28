/**
 * Build RU/EN HTML mirrors from public/cyan (UZ source).
 * Shares wp-content/wp-includes via absolute /cyan/... asset paths.
 */
import fs from 'node:fs'
import path from 'node:path'
import { applyMap, mapFor } from './i18n/phrases.mjs'

const SRC = 'public/cyan'
const LANGS = [
  { code: 'ru', dir: 'public/ru', htmlLang: 'ru', label: 'Рус' },
  { code: 'en', dir: 'public/en', htmlLang: 'en', label: 'EN' },
]

const SKIP_DIRS = new Set(['wp-content', 'wp-includes', 'wp-json'])

const SWITCHER_CSS = '<link rel="stylesheet" href="/tdyu-i18n.css" />'
const SWITCHER_JS = '<script src="/tdyu-i18n.js" defer></script>'
const SITE_CSS = '<link rel="stylesheet" href="/tdyu-site-fix.css" />'
const SITE_JS = '<script src="/tdyu-site-fix.js" defer></script>'

function walkHtml(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walkHtml(p, out)
    } else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
}

function rewriteLocaleLinks(html, fromPrefix, toPrefix) {
  // Absolute page links: /cyan/about-us/... → /ru/about-us/...
  // Keep /cyan/wp-content and /cyan/wp-includes as shared assets.
  let out = html
  out = out.replace(
    new RegExp(`${fromPrefix}/(?!wp-content|wp-includes|wp-json)`, 'g'),
    `${toPrefix}/`,
  )
  // lang attribute
  return out
}

function injectChrome(html, lang) {
  let out = html
  if (!out.includes('tdyu-i18n.css')) {
    out = out.replace('</head>', `${SWITCHER_CSS}\n${SWITCHER_JS}\n</head>`)
  }
  if (!out.includes('tdyu-site-fix.css')) {
    out = out.replace('</head>', `${SITE_CSS}\n${SITE_JS}\n</head>`)
  }
  // ensure html lang
  out = out.replace(/<html\b([^>]*)lang="[^"]*"/i, `<html$1lang="${lang}"`)
  if (!/<html\b[^>]*lang=/i.test(out)) {
    out = out.replace(/<html\b/i, `<html lang="${lang}"`)
  }
  // mark body with data-lang for switcher
  if (!out.includes('data-tdyu-lang=')) {
    out = out.replace(/<body\b([^>]*)>/i, `<body$1 data-tdyu-lang="${lang}">`)
  } else {
    out = out.replace(/data-tdyu-lang="[^"]*"/, `data-tdyu-lang="${lang}"`)
  }
  // locale-aware privacy absolute links
  out = out.replace(/\/cyan\/privacy-policy\//g, `/${lang === 'uz' ? 'cyan' : lang}/privacy-policy/`)
  out = out.replace(/\/cyan\/contact\//g, `/${lang === 'uz' ? 'cyan' : lang}/contact/`)
  return out
}

function buildLocale({ code, dir, htmlLang }) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })

  const map = mapFor(code)
  const files = walkHtml(SRC)
  let n = 0
  for (const src of files) {
    const rel = path.relative(SRC, src)
    // skip weird template junk
    if (rel.includes('${') || rel.includes('revslider')) continue
    let html = fs.readFileSync(src, 'utf8')
    html = applyMap(html, map)
    html = rewriteLocaleLinks(html, '/cyan', `/${code}`)
    html = injectChrome(html, htmlLang)
    const dest = path.join(dir, rel)
    ensureDir(dest)
    fs.writeFileSync(dest, html)
    n++
  }
  console.log(code, 'pages', n)
}

function patchUzSwitcher() {
  const files = walkHtml(SRC)
  let n = 0
  for (const src of files) {
    const rel = path.relative(SRC, src)
    if (rel.includes('${') || rel.includes('revslider')) continue
    let html = fs.readFileSync(src, 'utf8')
    const before = html
    html = injectChrome(html, 'uz')
    if (html === before) continue
    fs.writeFileSync(src, html)
    n++
  }
  console.log('uz switcher injected', n)
}

for (const lang of LANGS) buildLocale(lang)
patchUzSwitcher()
console.log('done')
