/**
 * TDYU CMS runtime: content blocks, documents, contact settings on public pages.
 */
;(function () {
  var API = '/api/public'
  var LANG = (document.body && document.body.getAttribute('data-tdyu-lang')) || 'uz'
  var path = location.pathname || ''

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function pageKind() {
    if (/apply-now/i.test(path)) return 'donate'
    if (/scholarship/i.test(path)) return 'grants'
    if (/contact/i.test(path)) return 'contact'
    if (/about-us|mission/i.test(path)) return 'about'
    if (/tuition-fee|cost-financial|admission-requirements/i.test(path)) return 'docs'
    if (/privacy/i.test(path)) return 'privacy'
    if (/index\.html$/i.test(path) || /\/(uz|cyan|ru|en)\/?$/i.test(path) || path === '/') return 'home'
    return 'other'
  }

  function ensurePanel(id, title) {
    var el = document.getElementById(id)
    if (el) return el
    el = document.createElement('section')
    el.id = id
    el.className = 'tdyu-cms-panel'
    el.innerHTML = '<div class="tdyu-cms-inner"><h3 class="tdyu-cms-title"></h3><div class="tdyu-cms-body"></div></div>'
    if (title) el.querySelector('.tdyu-cms-title').textContent = title
    var host =
      document.querySelector('.elementor-location-single main, main, .elementor') ||
      document.body
    var form = document.querySelector('form.wpcf7-form')
    if (form && form.parentNode) form.parentNode.insertBefore(el, form)
    else host.appendChild(el)
    return el
  }

  function applyContent(map) {
    var kind = pageKind()
    var keyMap = {
      home: 'home.welcome',
      about: 'about.mission',
      donate: 'donate.howto',
      grants: 'grants.intro',
      contact: 'contact.intro',
    }
    var key = keyMap[kind]
    if (!key || !map[key]) return
    var block = map[key]
    var panel = ensurePanel('tdyu-cms-content', block.title || '')
    panel.querySelector('.tdyu-cms-title').textContent = block.title || ''
    panel.querySelector('.tdyu-cms-body').innerHTML = esc(block.body).replace(/\n/g, '<br>')
  }

  function applyDocs(docs) {
    if (pageKind() !== 'docs' && pageKind() !== 'about') return
    if (!docs || !docs.length) return
    var panel = ensurePanel('tdyu-cms-docs', LANG === 'ru' ? 'Документы' : LANG === 'en' ? 'Documents' : 'Hujjatlar')
    var body = panel.querySelector('.tdyu-cms-body')
    body.innerHTML =
      '<ul class="tdyu-doc-list">' +
      docs
        .map(function (d) {
          return (
            '<li><a href="' +
            esc(d.url) +
            '" target="_blank" rel="noopener">' +
            esc(d.title) +
            '</a>' +
            (d.description ? '<span>' + esc(d.description) + '</span>' : '') +
            '</li>'
          )
        })
        .join('') +
      '</ul>'
  }

  function applySettings(s) {
    if (!s) return
    if (pageKind() === 'privacy' && s.privacyText) {
      var panel = ensurePanel(
        'tdyu-cms-privacy',
        LANG === 'ru' ? 'Конфиденциальность' : LANG === 'en' ? 'Privacy' : 'Maxfiylik',
      )
      panel.querySelector('.tdyu-cms-body').innerHTML = esc(s.privacyText).replace(/\n/g, '<br>')
    }
    // optional contact meta strip
    if (pageKind() === 'contact' && (s.email || s.phone || s.address)) {
      var meta = document.getElementById('tdyu-cms-contact-meta')
      if (!meta) {
        meta = document.createElement('div')
        meta.id = 'tdyu-cms-contact-meta'
        meta.className = 'tdyu-cms-meta'
        var form = document.querySelector('form.wpcf7-form')
        if (form && form.parentNode) form.parentNode.insertBefore(meta, form)
      }
      meta.innerHTML =
        (s.email ? '<div><strong>Email:</strong> ' + esc(s.email) + '</div>' : '') +
        (s.phone ? '<div><strong>Tel:</strong> ' + esc(s.phone) + '</div>' : '') +
        (s.workingHours ? '<div><strong>Vaqt:</strong> ' + esc(s.workingHours) + '</div>' : '') +
        (s.address ? '<div><strong>Manzil:</strong> ' + esc(s.address) + '</div>' : '')
    }
  }

  function injectStyle() {
    if (document.getElementById('tdyu-cms-style')) return
    var style = document.createElement('style')
    style.id = 'tdyu-cms-style'
    style.textContent =
      '.tdyu-cms-panel{margin:24px 0;padding:20px 22px;border:1px solid rgba(12,87,118,.12);border-radius:12px;background:linear-gradient(180deg,#fff,#f7fbfd)}' +
      '.tdyu-cms-title{margin:0 0 8px;color:#0C5776;font-size:1.25rem}' +
      '.tdyu-cms-body{color:#1a3a48;line-height:1.55;font-size:15px}' +
      '.tdyu-doc-list{list-style:none;margin:0;padding:0;display:grid;gap:10px}' +
      '.tdyu-doc-list li{display:grid;gap:2px}' +
      '.tdyu-doc-list a{color:#00ADE2;font-weight:600;text-decoration:none}' +
      '.tdyu-doc-list span{color:#5a7580;font-size:13px}' +
      '.tdyu-cms-meta{display:grid;gap:6px;margin:0 0 16px;padding:14px 16px;border-radius:10px;background:#0C5776;color:#fff;font-size:14px}'
    document.head.appendChild(style)
  }

  function boot() {
    injectStyle()
    Promise.all([
      fetch(API + '/content?lang=' + encodeURIComponent(LANG)).then(function (r) {
        return r.ok ? r.json() : {}
      }),
      fetch(API + '/documents?lang=' + encodeURIComponent(LANG)).then(function (r) {
        return r.ok ? r.json() : []
      }),
      fetch(API + '/settings').then(function (r) {
        return r.ok ? r.json() : {}
      }),
    ])
      .then(function (pack) {
        applyContent(pack[0] || {})
        applyDocs(pack[1] || [])
        applySettings(pack[2] || {})
      })
      .catch(function () {})
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
