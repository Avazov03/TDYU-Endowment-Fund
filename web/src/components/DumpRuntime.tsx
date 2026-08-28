'use client'

import { useEffect } from 'react'
import type { Locale } from '@/i18n/routing'
import type { DumpScript } from '@/lib/dump'

let bootPromise: Promise<void> | null = null

export function DumpRuntime({
  bodyClass,
  locale,
  scripts,
}: {
  bodyClass: string
  locale: Locale
  scripts: DumpScript[]
}) {
  useEffect(() => {
    document.body.className = bodyClass
    document.body.setAttribute('data-tdyu-lang', locale)
    document.documentElement.lang = locale
    revealLazyBackgrounds()
    swapYoutubeVideos()

    bootPromise = (async () => {
      for (const s of scripts) await loadScript(s)
    })()

    const t = window.setTimeout(hidePreloader, 2500)
    void bootPromise.then(() => {
      hidePreloader()
      revealLazyBackgrounds()
      mountLang(locale)
      bindDumpNav()
      swapPlaceholderSeals()
      swapYoutubeVideos()
    })

    return () => window.clearTimeout(t)
  }, [bodyClass, locale, scripts])

  return null
}

function bindDumpNav() {
  if ((window as Window & { __tdyuDumpNav2?: boolean }).__tdyuDumpNav2) return
  ;(window as Window & { __tdyuDumpNav2?: boolean }).__tdyuDumpNav2 = true
  document.addEventListener(
    'click',
    (ev) => {
      if (ev.button !== 0) return
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return
      const t = ev.target as HTMLElement | null
      const a = t?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || !a.href) return
      if (a.target && a.target !== '_self') return
      const raw = a.getAttribute('href') || ''
      if (raw.startsWith('#') || raw.startsWith('javascript:') || raw.startsWith('mailto:') || raw.startsWith('tel:')) {
        return
      }
      if (
        a.classList.contains('popup-videos') ||
        /youtube\.com|youtu\.be|\/watch\?v=/i.test(raw) ||
        /youtube\.com|youtu\.be/i.test(a.href)
      ) {
        return
      }
      if (!a.href.startsWith(location.origin)) return
      ev.preventDefault()
      location.assign(a.href)
    },
    true,
  )
}

function revealLazyBackgrounds() {
  document.querySelectorAll('.e-con.e-parent').forEach((el) => {
    el.classList.add('e-lazyloaded')
  })
}

function hidePreloader() {
  const el = document.getElementById('site-preloader')
  if (el) {
    el.style.display = 'none'
    el.remove()
  }
}

function swapYoutubeVideos() {
  const map: Record<string, string> = {
    LpdRAyIGg8I: 'v-Z3jc0-LhU',
    LXvZA4bmUU4: 'KIgz0XGDJZw',
  }
  const run = () => {
    document.querySelectorAll('a.popup-videos, a[href*="youtube"], a[href*="youtu.be"], a[href*="watch?v="], iframe[src*="youtube"]').forEach((el) => {
      const attr = el.tagName === 'IFRAME' ? 'src' : 'href'
      let v = el.getAttribute(attr) || ''
      const idMatch = v.match(/[?&]v=([A-Za-z0-9_-]+)/) || v.match(/youtu\.be\/([A-Za-z0-9_-]+)/)
      if (idMatch && !/youtube\.com|youtu\.be/i.test(v)) {
        v = `https://www.youtube.com/watch?v=${idMatch[1]}`
      }
      Object.entries(map).forEach(([from, to]) => {
        if (v.includes(from)) v = v.split(from).join(to)
      })
      el.setAttribute(attr, v)
    })
  }
  run()
}

function swapPlaceholderSeals() {
  const re = /(?:cyan-m-logo1|marquee-logo|cyan-left-img1-min|mission-1|m-g-icon1)\.png/i
  const seal = '/brand/tdyu-official-seal.png'
  const run = () => {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || img.src
      if (re.test(src)) img.setAttribute('src', seal)
    })
  }
  run()
  const root = document.getElementById('tdyu-dump-root') || document.body
  const obs = new MutationObserver(run)
  obs.observe(root, { subtree: true, childList: true })
  window.setTimeout(() => obs.disconnect(), 8000)
}

function loadScript(s: DumpScript) {
  return new Promise<void>((resolve) => {
    const el = document.createElement('script')
    if (s.src) {
      const src = s.src.replace(/"/g, '')
      const overlay = /tdyu-(home-stats|site-form|site-fix|cms)\.js/i.test(src)
      const existing = document.querySelector(`script[src="${src}"]`)
      if (existing && !overlay) {
        resolve()
        return
      }
      if (existing && overlay) existing.remove()
      el.src = src
      el.async = false
      el.onload = () => resolve()
      el.onerror = () => resolve()
    } else {
      el.text = s.content || ''
      queueMicrotask(() => resolve())
    }
    document.body.appendChild(el)
  })
}

function mountLang(locale: Locale) {
  document.getElementById('tdyu-lang-switcher')?.remove()
  const host = document.createElement('div')
  host.id = 'tdyu-lang-switcher'
  host.className = 'tdyu-lang'
  host.setAttribute('role', 'navigation')
  host.setAttribute('aria-label', 'Language')

  const rest = location.pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, '') || '/'
  const items: { code: Locale; label: string }[] = [
    { code: 'uz', label: "O'Z" },
    { code: 'ru', label: 'РУ' },
    { code: 'en', label: 'EN' },
  ]

  items.forEach((loc, i) => {
    if (i) {
      const sep = document.createElement('span')
      sep.className = 'sep'
      sep.textContent = '|'
      host.appendChild(sep)
    }
    const a = document.createElement('a')
    a.href = `/${loc.code}${rest === '/' ? '' : rest}${location.search}${location.hash}`
    a.textContent = loc.label
    a.setAttribute('hreflang', loc.code)
    if (loc.code === locale) a.classList.add('is-active')
    host.appendChild(a)
  })

  document.getElementById('tdyu-lang-switcher-mobile')?.remove()
  document.querySelectorAll('#menu-main-menu > .tdyu-lang-item, #menu-mobile-menu > .tdyu-lang-item').forEach((el) => el.remove())

  const topMenu =
    document.querySelector('#menu-topbar-menu') ||
    document.querySelector('.elementor-element-2acc95d .primary-menu') ||
    document.querySelector('.elementor-element-ece0dc7 .primary-menu')
  if (topMenu) {
    const li = document.createElement('li')
    li.className = 'menu-item tdyu-lang-item'
    li.appendChild(host)
    topMenu.appendChild(li)
  } else {
    host.classList.add('tdyu-lang-fixed')
    document.body.appendChild(host)
  }
}
