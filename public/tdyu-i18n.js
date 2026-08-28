/**
 * Language switcher: UZ (/cyan) · RU (/ru) · EN (/en)
 * Mounts inside top-bar menu so header flex layout stays intact.
 */
;(function () {
  var LOCALES = [
    { code: 'uz', root: '/cyan', label: "O'Z" },
    { code: 'ru', root: '/ru', label: 'РУ' },
    { code: 'en', root: '/en', label: 'EN' },
  ]

  function detectLocale(pathname) {
    if (pathname.indexOf('/ru/') === 0 || pathname === '/ru') return 'ru'
    if (pathname.indexOf('/en/') === 0 || pathname === '/en') return 'en'
    return 'uz'
  }

  function stripLocale(pathname) {
    var p = pathname || '/'
    if (p.indexOf('/cyan/') === 0) return p.slice('/cyan'.length) || '/'
    if (p === '/cyan') return '/'
    if (p.indexOf('/ru/') === 0) return p.slice('/ru'.length) || '/'
    if (p === '/ru') return '/'
    if (p.indexOf('/en/') === 0) return p.slice('/en'.length) || '/'
    if (p === '/en') return '/'
    return p
  }

  function toLocaleUrl(targetCode) {
    var loc = LOCALES.find(function (l) {
      return l.code === targetCode
    })
    if (!loc) return location.href
    var rest = stripLocale(location.pathname)
    if (rest === '/') rest = '/index.html'
    return loc.root + rest + location.search + location.hash
  }

  function mount() {
    var existing = document.getElementById('tdyu-lang-switcher')
    if (existing) existing.remove()

    var current =
      (document.body && document.body.getAttribute('data-tdyu-lang')) ||
      detectLocale(location.pathname)

    var host = document.createElement('div')
    host.id = 'tdyu-lang-switcher'
    host.className = 'tdyu-lang'
    host.setAttribute('role', 'navigation')
    host.setAttribute('aria-label', 'Language')

    LOCALES.forEach(function (loc, i) {
      if (i) {
        var sep = document.createElement('span')
        sep.className = 'sep'
        sep.textContent = '|'
        host.appendChild(sep)
      }
      var a = document.createElement('a')
      a.href = toLocaleUrl(loc.code)
      a.textContent = loc.label
      a.setAttribute('data-lang', loc.code)
      a.setAttribute('hreflang', loc.code === 'uz' ? 'uz' : loc.code)
      if (loc.code === current) a.classList.add('is-active')
      a.addEventListener('click', function (ev) {
        ev.preventDefault()
        try {
          localStorage.setItem('tdyu-lang', loc.code)
        } catch (e) {}
        window.location.assign(toLocaleUrl(loc.code))
      })
      host.appendChild(a)
    })

    // Insert as last item of top utility menu (keeps brand | links space-between)
    var topMenu =
      document.querySelector('#menu-topbar-menu') ||
      document.querySelector('.elementor-element-2acc95d .primary-menu') ||
      document.querySelector('.elementor-element-ece0dc7 .primary-menu')

    if (topMenu) {
      var li = document.createElement('li')
      li.className = 'menu-item tdyu-lang-item'
      li.appendChild(host)
      topMenu.appendChild(li)
      return
    }

    // Fallback: fixed corner (does not touch header flex)
    host.classList.add('tdyu-lang-fixed')
    document.body.appendChild(host)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount)
  } else {
    mount()
  }
})()
