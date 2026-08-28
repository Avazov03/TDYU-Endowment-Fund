/**
 * TDYU site runtime: API forms, client search, donate helpers, announcements.
 */
;(function () {
  var MAIL = 'info@tdyu-endowment.uz'
  var API = '/api'
  var ROOT = (function () {
    var p = location.pathname || ''
    if (p.indexOf('/uz/') === 0 || p === '/uz') return '/uz'
    if (p.indexOf('/ru/') === 0 || p === '/ru') return '/ru'
    if (p.indexOf('/en/') === 0 || p === '/en') return '/en'
    if (p.indexOf('/cyan/') === 0 || p === '/cyan') return '/cyan'
    return '/cyan'
  })()
  var LANG = (document.body && document.body.getAttribute('data-tdyu-lang')) || 'uz'

  ;(function patchWpFilterAjax() {
    function patch(jq) {
      if (!jq || jq.__tdyuFilterPatch) return
      jq.__tdyuFilterPatch = true
      jq.ajaxPrefilter(function (opts, _orig, xhr) {
        var data = opts && opts.data
        var s = typeof data === 'string' ? data : data && data.action ? String(data.action) : JSON.stringify(data || '')
        if (s.indexOf('rs_academic_filter') !== -1) xhr.abort()
      })
    }
    patch(window.jQuery)
    var n = 0
    var id = setInterval(function () {
      patch(window.jQuery)
      if (++n > 80) clearInterval(id)
    }, 50)
  })()

  var I18N = {
    uz: {
      formOk: 'Murojaat yuborildi',
      formHint: 'Rahmat! Admin paneldan ko‘rib chiqiladi.',
      formErr: 'Iltimos, majburiy maydonlarni to‘ldiring.',
      formFail: 'Yuborib bo‘lmadi. Keyinroq urinib ko‘ring yoki email yozing: ',
      searchTitle: 'Saytdan qidirish',
      searchEmpty: 'Natija topilmadi. Boshqa kalit so‘z yozing.',
      searchClose: 'Yopish',
      bankTitle: 'Bank orqali xayriya',
      bankBody:
        'To‘lovdan so‘ng chekni info@tdyu-endowment.uz ga yuboring.<br>Qabul qiluvchi: <strong>TDYU Endowment Fund</strong><br>Email: <code>info@tdyu-endowment.uz</code><br>Manzil: Saylgoh 35, Yunusobod, Toshkent 100047',
    },
    ru: {
      formOk: 'Обращение отправлено',
      formHint: 'Спасибо! Заявка появится в админ-панели.',
      formErr: 'Заполните обязательные поля.',
      formFail: 'Не удалось отправить. Попробуйте позже или напишите: ',
      searchTitle: 'Поиск по сайту',
      searchEmpty: 'Ничего не найдено. Попробуйте другой запрос.',
      searchClose: 'Закрыть',
      bankTitle: 'Пожертвование через банк',
      bankBody:
        'После оплаты отправьте чек на info@tdyu-endowment.uz.<br>Получатель: <strong>TDYU Endowment Fund</strong><br>Email: <code>info@tdyu-endowment.uz</code><br>Адрес: Сайилгох 35, Юнусабад, Ташкент 100047',
    },
    en: {
      formOk: 'Request submitted',
      formHint: 'Thank you! It will appear in the admin panel.',
      formErr: 'Please fill in the required fields.',
      formFail: 'Could not submit. Try again later or email: ',
      searchTitle: 'Search the site',
      searchEmpty: 'No results. Try another keyword.',
      searchClose: 'Close',
      bankTitle: 'Donate by bank transfer',
      bankBody:
        'After payment, email the receipt to info@tdyu-endowment.uz.<br>Payee: <strong>TDYU Endowment Fund</strong><br>Email: <code>info@tdyu-endowment.uz</code><br>Address: 35 Saylgoh St, Yunusobod, Tashkent 100047',
    },
  }
  var t = I18N[LANG] || I18N.uz

  var PAGES = [
    { u: '', title: { uz: 'Bosh', ru: 'Главная', en: 'Home' }, k: 'home bosh endowment' },
    { u: '/about-us', title: { uz: 'Missiya', ru: 'Миссия', en: 'Mission' }, k: 'missiya mission fond haqida' },
    { u: '/mission-value', title: { uz: '6 ustun', ru: '6 столпов', en: '6 pillars' }, k: 'ustun pillars strategy' },
    { u: '/vice-chancellor', title: { uz: 'Boshqaruv', ru: 'Управление', en: 'Governance' }, k: 'boshqaruv vasiylik taftish' },
    { u: '/alumni', title: { uz: 'Alumni', ru: 'Alumni', en: 'Alumni' }, k: 'alumni bitiruvchi' },
    { u: '/researches', title: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' }, k: 'loyiha project jessup research' },
    { u: '/scholarships', title: { uz: 'Grantlar', ru: 'Гранты', en: 'Grants' }, k: 'grant stipendiya scholarship' },
    { u: '/events', title: { uz: 'Tadbirlar', ru: 'Мероприятия', en: 'Events' }, k: 'tadbir event kongress' },
    { u: '/all-programs', title: { uz: 'Dasturlar', ru: 'Программы', en: 'Programs' }, k: 'dastur program stajirovka nashr' },
    { u: '/tuition-fee', title: { uz: 'Hisobotlar', ru: 'Отчёты', en: 'Reports' }, k: 'hisobot report audit' },
    { u: '/how-to-apply', title: { uz: 'Yordam', ru: 'Помощь', en: 'Support' }, k: 'yordam how apply faq' },
    { u: '/faq', title: { uz: 'FAQ', ru: 'FAQ', en: 'FAQ' }, k: 'faq savol javob yordam' },
    { u: '/admission-requirements', title: { uz: 'Huquqiy asos', ru: 'Правовая основа', en: 'Legal basis' }, k: 'huquqiy qonun legal' },
    { u: '/cost-financial-aid', title: { uz: 'Shaffoflik', ru: 'Прозрачность', en: 'Transparency' }, k: 'shaffoflik transparency' },
    { u: '/apply-now', title: { uz: 'Xayriya', ru: 'Пожертвование', en: 'Donate' }, k: 'xayriya donate donation' },
    { u: '/blog', title: { uz: 'Yangiliklar', ru: 'Новости', en: 'News' }, k: 'yangilik news blog' },
    { u: '/contact', title: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' }, k: 'aloqa contact email' },
    { u: '/privacy-policy', title: { uz: 'Maxfiylik siyosati', ru: 'Политика конфиденциальности', en: 'Privacy policy' }, k: 'maxfiylik privacy' },
    { u: '/libraries', title: { uz: 'Nashrlar', ru: 'Издания', en: 'Publications' }, k: 'nashr publication tarjima kutubxona' },
  ]

  function toast(title, msg) {
    var el = document.getElementById('tdyu-toast')
    if (!el) {
      el = document.createElement('div')
      el.id = 'tdyu-toast'
      el.className = 'tdyu-toast'
      document.body.appendChild(el)
    }
    el.innerHTML = '<strong>' + title + '</strong>' + (msg || '')
    el.classList.add('is-on')
    clearTimeout(toast._t)
    toast._t = setTimeout(function () {
      el.classList.remove('is-on')
    }, 6500)
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function formType(form) {
    var id = (form.getAttribute('id') || '') + ' ' + (form.getAttribute('aria-label') || '')
    var action = form.getAttribute('action') || ''
    var path = location.pathname
    if (/apply-now|xayriya|donate|2888/i.test(id + action + path) && !/scholarship|grant/i.test(path))
      return 'donation'
    if (/scholarship|grantlar|grant/i.test(path)) return 'grant'
    if (/317|newsletter|axborot|subscribe/i.test(id + action + form.className)) return 'newsletter'
    if (/contact|aloqa|10156/i.test(id + action + path)) return 'contact'
    // newsletter often only has email
    var inputs = form.querySelectorAll('input, textarea, select')
    if (inputs.length <= 2 && form.querySelector('input[type="email"]')) return 'newsletter'
    return 'contact'
  }

  function fieldMap(form) {
    var fd = new FormData(form)
    var raw = {}
    fd.forEach(function (val, key) {
      if (!key || key.indexOf('_wpcf7') === 0) return
      raw[key] = String(val || '').trim()
    })
    function first() {
      for (var i = 0; i < arguments.length; i++) {
        var k = arguments[i]
        if (raw[k]) return raw[k]
      }
      return ''
    }
    return {
      raw: raw,
      name: first('your-name', 'name', 'Name', 'ism', 'Ism', 'full-name', 'fullname'),
      firstName: first('first-name', 'firstName', 'firstname', 'ism'),
      lastName: first('last-name', 'lastName', 'lastname', 'familiya'),
      email: first('your-email', 'email', 'Email', 'e-mail'),
      phone: first('your-phone', 'phone', 'tel', 'Telefon', 'telefon'),
      message: first('your-message', 'message', 'xabar', 'Message', 'motivation', 'comments'),
      subject: first('your-subject', 'subject'),
      amount: first('amount', 'donation-amount', 'miqdor', 'sum'),
      currency: first('currency', 'valyuta') || 'UZS',
      program: first('program', 'dastur', 'course'),
      note: first('note', 'izoh', 'comments'),
    }
  }

  function requiredOk(form) {
    var ok = true
    form.querySelectorAll('.tdyu-invalid').forEach(function (el) {
      el.classList.remove('tdyu-invalid')
    })
    form.querySelectorAll('[required], .wpcf7-validates-as-required').forEach(function (el) {
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (el.type === 'checkbox' && !el.checked) ok = false
        return
      }
      if (!String(el.value || '').trim()) {
        ok = false
        el.classList.add('tdyu-invalid')
      }
    })
    var consent = form.querySelector(
      'input[type="checkbox"][name*="acceptance"], input[type="checkbox"][name*="consent"]',
    )
    if (consent && !consent.checked) ok = false
    return ok
  }

  function buildPayload(form, type) {
    var m = fieldMap(form)
    var base = {
      lang: LANG,
      page: location.href,
    }
    if (type === 'newsletter') {
      return Object.assign(base, { email: m.email })
    }
    if (type === 'donation') {
      return Object.assign(base, {
        firstName: m.firstName || m.name || 'Donor',
        lastName: m.lastName || '',
        email: m.email,
        phone: m.phone,
        amount: m.amount,
        currency: m.currency,
        note: m.note || m.message,
      }, m.raw)
    }
    if (type === 'grant') {
      return Object.assign(base, {
        name: m.name || [m.firstName, m.lastName].filter(Boolean).join(' '),
        email: m.email,
        phone: m.phone,
        program: m.program,
        message: m.message,
      }, m.raw)
    }
    return Object.assign(base, {
      name: m.name || [m.firstName, m.lastName].filter(Boolean).join(' ') || 'Visitor',
      email: m.email,
      phone: m.phone,
      subject: m.subject,
      message: m.message || Object.keys(m.raw)
        .map(function (k) {
          return k + ': ' + m.raw[k]
        })
        .join('\n'),
    }, m.raw)
  }

  function postForm(type, payload) {
    return fetch(API + '/forms/' + type, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error((data && data.error) || res.statusText)
        return data
      })
    })
  }

  function wireForms() {
    document.querySelectorAll('form.wpcf7-form, form[action*="wpcf7"]').forEach(function (form) {
      form.addEventListener(
        'submit',
        function (ev) {
          ev.preventDefault()
          ev.stopPropagation()
          if (!requiredOk(form)) {
            toast(t.formErr, '')
            return
          }
          var type = formType(form)
          var payload = buildPayload(form, type)
          if (!payload.email) {
            toast(t.formErr, '')
            return
          }
          form.classList.add('tdyu-form-busy')
          postForm(type, payload)
            .then(function () {
              toast(t.formOk, t.formHint)
              form.reset()
            })
            .catch(function () {
              toast(t.formFail, MAIL)
            })
            .finally(function () {
              form.classList.remove('tdyu-form-busy')
            })
        },
        true,
      )
    })
  }

  function openSearch(prefill) {
    var panel = document.getElementById('tdyu-search-panel')
    if (!panel) {
      panel = document.createElement('div')
      panel.id = 'tdyu-search-panel'
      panel.className = 'tdyu-search-panel'
      panel.innerHTML =
        '<div class="tdyu-search-card" role="dialog" aria-modal="true">' +
        '<button type="button" class="tdyu-search-close" aria-label="' +
        t.searchClose +
        '">×</button>' +
        '<h3>' +
        t.searchTitle +
        '</h3>' +
        '<input type="search" id="tdyu-search-input" placeholder="' +
        t.searchTitle +
        '..." autocomplete="off" />' +
        '<ul class="tdyu-search-results" id="tdyu-search-results"></ul>' +
        '</div>'
      document.body.appendChild(panel)
      panel.addEventListener('click', function (e) {
        if (e.target === panel) closeSearch()
      })
      panel.querySelector('.tdyu-search-close').addEventListener('click', closeSearch)
      panel.querySelector('#tdyu-search-input').addEventListener('input', function () {
        renderSearch(this.value)
      })
    }
    panel.classList.add('is-on')
    var input = panel.querySelector('#tdyu-search-input')
    input.value = prefill || ''
    renderSearch(input.value)
    setTimeout(function () {
      input.focus()
    }, 30)
  }

  function closeSearch() {
    var panel = document.getElementById('tdyu-search-panel')
    if (panel) panel.classList.remove('is-on')
  }

  function renderSearch(q) {
    var list = document.getElementById('tdyu-search-results')
    if (!list) return
    var query = String(q || '')
      .trim()
      .toLowerCase()
    var hits = PAGES.filter(function (p) {
      if (!query) return true
      var title = (p.title[LANG] || p.title.uz || '').toLowerCase()
      return title.indexOf(query) >= 0 || p.k.indexOf(query) >= 0
    })
    if (!hits.length) {
      list.innerHTML = '<li class="tdyu-search-empty">' + t.searchEmpty + '</li>'
      return
    }
    list.innerHTML = hits
      .map(function (p) {
        var title = p.title[LANG] || p.title.uz
        return (
          '<li><a href="' +
          ROOT +
          p.u +
          '">' +
          title +
          '<span class="meta">' +
          ROOT +
          p.u +
          '</span></a></li>'
        )
      })
      .join('')
  }

  function isSiteSearchForm(form) {
    if (!form || form.closest('.rs-academic-filter-area')) return false
    if (form.querySelector('.filter-search-input')) return false
    return Boolean(
      form.getAttribute('role') === 'search' ||
        form.querySelector('input[type="search"], input[name="s"], .search-field'),
    )
  }

  function wireSearch() {
    document.querySelectorAll('form').forEach(function (form) {
      if (!isSiteSearchForm(form)) return
      form.addEventListener(
        'submit',
        function (ev) {
          ev.preventDefault()
          ev.stopPropagation()
          var input = form.querySelector('input[type="search"], input[name="s"], .search-field, input[type="text"]')
          openSearch(input ? input.value : '')
        },
        true,
      )
    })
    document.querySelectorAll('.search-btn, .submit-btn, .search-toggle, .nav-search, .header-search').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        var form = btn.closest('form')
        if (form && !isSiteSearchForm(form)) return
        if (form && form.querySelector('input')) {
          ev.preventDefault()
          ev.stopPropagation()
          var input = form.querySelector('input[type="search"], input[name="s"], .search-field, input[type="text"]')
          openSearch(input ? input.value : '')
        }
      })
    })
  }

  function labelText(input) {
    var lab = input.closest('label')
    if (lab) {
      return String(lab.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
    }
    return String(input.value || '').toLowerCase()
  }

  function selectedLabels(root, name) {
    var out = []
    root.querySelectorAll('input[name="' + name + '"]:checked').forEach(function (el) {
      out.push(labelText(el))
    })
    return out
  }

  function itemMatches(item, groups, q) {
    var hay = String(item.textContent || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
    if (q && hay.indexOf(q) === -1) return false
    for (var i = 0; i < groups.length; i++) {
      var labels = groups[i]
      if (!labels.length) continue
      var ok = false
      for (var j = 0; j < labels.length; j++) {
        if (labels[j] && hay.indexOf(labels[j]) !== -1) {
          ok = true
          break
        }
      }
      if (!ok) return false
    }
    return true
  }

  var FILTER_ITEMS_HTML = null
  function snapshotFilterItems() {
    document.querySelectorAll('.rs-academic-filter-area .filter-items-wrapper').forEach(function (w) {
      if (w.querySelector('.filter-item') && !FILTER_ITEMS_HTML) FILTER_ITEMS_HTML = w.innerHTML
      if (FILTER_ITEMS_HTML && !w.querySelector('.filter-item')) w.innerHTML = FILTER_ITEMS_HTML
    })
    document.querySelectorAll('.rs-academic-filter-area').forEach(ensureSeventhProgram)
  }

  function ensureSeventhProgram(wrap) {
    if (!wrap) return
    var list = wrap.querySelector('.filter-items-wrapper')
    if (!list) return
    var blob = String(list.textContent || '')
    if (/Nashrlar va tarjima|Publications and translations|Издания и переводы/i.test(blob)) return
    var copy = {
      uz: {
        t: 'Nashrlar va tarjimalar',
        d: 'Huquqiy darsliklar tarjimasi, xorijiy nashrlar va kutubxonalarga adabiyot taqdimi.',
        m: '07 · Nashrlar',
        cta: 'Batafsil',
      },
      ru: {
        t: 'Издания и переводы',
        d: 'Перевод правовых учебников, зарубежные издания и литература для библиотек.',
        m: '07 · Издания',
        cta: 'Подробнее',
      },
      en: {
        t: 'Publications and translations',
        d: 'Legal textbook translation, international publishing, and books for libraries.',
        m: '07 · Publications',
        cta: 'Learn more',
      },
    }
    var c = copy[LANG] || copy.uz
    var card = document.createElement('div')
    card.className = 'filter-item tdyu-injected-program'
    card.innerHTML =
      '<div class="item-content"><h4 class="item-title"><a href="' +
      ROOT +
      '/libraries">' +
      c.t +
      '</a></h4><ul class="item-meta"><li>' +
      c.m +
      '</li><li>Tarjima</li></ul><p class="item-desc">' +
      c.d +
      '</p><a class="rs-button style-default" href="' +
      ROOT +
      '/libraries"><span class="button-text">' +
      c.cta +
      '</span></a></div>'
    list.appendChild(card)
  }

  function wireAcademicFilters() {
    document.querySelectorAll('.rs-academic-filter-area').forEach(function (area) {
      if (area.getAttribute('data-tdyu-filter') === '1') return
      snapshotFilterItems()
      area.removeAttribute('data-config')
      var clone = area.cloneNode(true)
      if (area.parentNode) area.parentNode.replaceChild(clone, area)
      area = clone
      area.setAttribute('data-tdyu-filter', '1')
      ensureSeventhProgram(area)
      var apply = function () {
        var q = String((area.querySelector('.filter-search-input') || {}).value || '')
          .trim()
          .toLowerCase()
        var items = area.querySelectorAll('.filter-item')
        var groups = ['faculties', 'departments', 'levels'].map(function (name) {
          var labels = selectedLabels(area, name)
          if (!labels.length) return []
          var tagged = false
          items.forEach(function (item) {
            var hay = String(item.textContent || '').toLowerCase()
            labels.forEach(function (l) {
              if (l && hay.indexOf(l) !== -1) tagged = true
            })
          })
          return tagged ? labels : []
        })
        var n = 0
        items.forEach(function (item) {
          var show = itemMatches(item, groups, q)
          item.classList.toggle('is-filtered-out', !show)
          if (show) n++
        })
        var count = area.querySelector('.result-count')
        if (count) count.textContent = String(n)
        var empty = area.querySelector('.tdyu-filter-empty')
        if (!empty) {
          empty = document.createElement('p')
          empty.className = 'tdyu-filter-empty'
          empty.textContent =
            LANG === 'ru' ? 'Ничего не найдено.' : LANG === 'en' ? 'No matching programs.' : 'Mos dastur topilmadi.'
          var wrap = area.querySelector('.filter-items-wrapper')
          if (wrap) wrap.appendChild(empty)
        }
        empty.hidden = n > 0
      }
      area.addEventListener('change', function (e) {
        if (e.target && e.target.matches && e.target.matches('input[type="checkbox"]')) apply()
      })
      var search = area.querySelector('.filter-search-input')
      if (search) search.addEventListener('input', apply)
      area.querySelectorAll('.filter-reset-btn, .sidebar-title span').forEach(function (btn) {
        btn.addEventListener('click', function (ev) {
          ev.preventDefault()
          area.querySelectorAll('input[type="checkbox"]').forEach(function (el) {
            el.checked = false
          })
          if (search) search.value = ''
          apply()
        })
      })
      area.querySelectorAll('.criteria-show-more').forEach(function (btn) {
        var box = btn.closest('.filter-criteria')
        if (box) {
          box.querySelectorAll('.criteria-item').forEach(function (li) {
            if (li.style.display === 'none') li.setAttribute('data-tdyu-extra', '1')
          })
        }
        btn.addEventListener('click', function () {
          if (!box) return
          var open = box.classList.toggle('is-expanded')
          box.querySelectorAll('[data-tdyu-extra="1"]').forEach(function (li) {
            li.style.display = open ? '' : 'none'
          })
          var show = btn.getAttribute('data-show-text') || btn.textContent
          var hide = btn.getAttribute('data-hide-text') || show
          btn.textContent = open ? hide : show
        })
      })
      var toggle = area.querySelector('.filter-toggle-btn')
      if (toggle) {
        toggle.addEventListener('click', function () {
          area.classList.toggle('is-sidebar-open')
        })
      }
      var overlay = area.querySelector('.filter-sidebar-overly, .filter-sidebar-overlay')
      if (overlay) {
        overlay.addEventListener('click', function () {
          area.classList.remove('is-sidebar-open')
        })
      }
      apply()
    })
  }

  function injectBankBox(settings) {
    if (!/apply-now/i.test(location.pathname)) return
    if (document.querySelector('.tdyu-bank-box')) return
    var form = document.querySelector('form.wpcf7-form, form[action*="wpcf7"]')
    if (!form) return
    var box = document.createElement('div')
    box.className = 'tdyu-bank-box'
    var body = t.bankBody
    if (settings && settings.bankDetails) {
      body = escapeHtml(settings.bankDetails).replace(/\n/g, '<br>')
      if (settings.bankPayee) {
        body =
          '<strong>' +
          escapeHtml(settings.bankPayee) +
          '</strong><br>' +
          body
      }
    }
    box.innerHTML = '<h4>' + t.bankTitle + '</h4><div>' + body + '</div>'
    form.parentNode.insertBefore(box, form)
  }

  function loadSettings() {
    return fetch(API + '/public/settings')
      .then(function (r) {
        return r.ok ? r.json() : {}
      })
      .catch(function () {
        return {}
      })
  }

  function hydrateAnnouncements() {
    var host = document.querySelector('.rs-notice-widget .notice-items')
    if (!host) return
    fetch(API + '/public/announcements?lang=' + encodeURIComponent(LANG))
      .then(function (r) {
        return r.ok ? r.json() : []
      })
      .then(function (rows) {
        if (!rows || !rows.length) return
        var clean = rows.filter(function (a) {
          var t = String((a && a.title) || '') + ' ' + String((a && a.excerpt) || '')
          return !/E2E\s*yangilik|Playwright orqali/i.test(t)
        })
        if (!clean.length) return
        host.innerHTML = clean
          .slice(0, 6)
          .map(function (a) {
            return (
              '<div class="notice-item"><h5 class="notice-title">' +
              escapeHtml(a.title) +
              '</h5>' +
              (a.dateLabel
                ? '<span class="notice-date">' + escapeHtml(a.dateLabel) + '</span>'
                : '') +
              (a.excerpt ? '<p class="notice-excerpt">' + escapeHtml(a.excerpt) + '</p>' : '') +
              '</div>'
            )
          })
          .join('')
      })
      .catch(function () {})
  }

  function fixPrivacyLinks() {
    document.querySelectorAll('a').forEach(function (a) {
      var txt = (a.textContent || '').trim()
      if (
        /maxfiylik|privacy|конфиденциаль/i.test(txt) &&
        (a.getAttribute('href') === '#' || !a.getAttribute('href'))
      ) {
        a.setAttribute('href', ROOT + '/privacy-policy/index.html')
      }
    })
  }

  function revealLazyBackgrounds() {
    document.querySelectorAll('.e-con.e-parent').forEach(function (el) {
      el.classList.add('e-lazyloaded')
    })
  }

  function swapYoutubeVideos() {
    var map = {
      LpdRAyIGg8I: 'v-Z3jc0-LhU',
      LXvZA4bmUU4: 'KIgz0XGDJZw',
    }
    document.querySelectorAll('a.popup-videos, a[href*="youtube"], a[href*="youtu.be"], a[href*="watch?v="], iframe[src*="youtube"]').forEach(function (el) {
      var attr = el.tagName === 'IFRAME' ? 'src' : 'href'
      var v = el.getAttribute(attr) || ''
      var idMatch = v.match(/[?&]v=([A-Za-z0-9_-]+)/) || v.match(/youtu\.be\/([A-Za-z0-9_-]+)/)
      if (idMatch && !/youtube\.com|youtu\.be/i.test(v)) {
        v = 'https://www.youtube.com/watch?v=' + idMatch[1]
      }
      Object.keys(map).forEach(function (from) {
        if (v.indexOf(from) !== -1) v = v.split(from).join(map[from])
      })
      el.setAttribute(attr, v)
    })
  }

  document.addEventListener(
    'click',
    function (e) {
      var t = e.target
      var a = t && t.closest ? t.closest('a[href]') : null
      if (!a) return
      var href = a.getAttribute('href') || ''
      var cls = a.className || ''
      if (cls.indexOf('popup-videos') === -1 && href.indexOf('watch?v=') === -1 && href.indexOf('youtube') === -1) {
        return
      }
      swapYoutubeVideos()
    },
    true,
  )

  function fixFacultySocialIcons() {
    var labels = {
      uz: { share: 'Ulashish', facebook: 'Facebook', x: 'X (Twitter)', instagram: 'Instagram', linkedin: 'LinkedIn' },
      ru: { share: 'Поделиться', facebook: 'Facebook', x: 'X (Twitter)', instagram: 'Instagram', linkedin: 'LinkedIn' },
      en: { share: 'Share', facebook: 'Facebook', x: 'X (Twitter)', instagram: 'Instagram', linkedin: 'LinkedIn' },
    }
    var L = labels[LANG] || labels.uz
    var icons = [
      ['ri-share-line', L.share, 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z'],
      ['ri-facebook-fill', L.facebook, 'M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v8h3v-8h3l1-3h-4V9c0-.6.4-1 1-1z'],
      ['ri-twitter-x-fill', L.x, 'M17.75 3h3.1l-6.76 7.73L22 21h-6.17l-4.82-6.3L5.3 21H2.17l7.24-8.27L2 3h6.33l4.36 5.8L17.75 3zm-1.08 16.2h1.72L7.4 4.7H5.55l11.12 14.5z'],
      ['ri-instagram-line', L.instagram, 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm10.2 1.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 8.2A3.8 3.8 0 1 1 12 15.8 3.8 3.8 0 0 1 12 8.2zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z'],
      ['ri-linkedin-fill', L.linkedin, 'M6.5 9H4v12h2.5V9zM5.25 3A1.75 1.75 0 1 0 5.25 6.5 1.75 1.75 0 0 0 5.25 3zM20 21h-2.5v-6.35c0-1.51-.03-3.45-2.1-3.45-2.1 0-2.42 1.64-2.42 3.34V21H10.5V9h2.4v1.64h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.01 1.67 3.01 3.84V21z'],
    ]
    document.querySelectorAll('.faculty-member .social-icon').forEach(function (el) {
      var ic = el.querySelector('i')
      if (!ic) return
      var cls = ic.className || ''
      var hit = icons.filter(function (row) {
        return cls.indexOf(row[0]) !== -1
      })[0]
      if (!hit) return
      ic.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="#0C5776" d="' +
        hit[2] +
        '"></path></svg>'
      el.setAttribute('aria-label', hit[1])
      el.setAttribute('title', hit[1])
      if ((el.getAttribute('href') || '') === '#') {
        el.addEventListener('click', function (e) {
          e.preventDefault()
        })
      }
    })
  }

  function nestedTabIndex(el) {
    if (!el) return ''
    return el.getAttribute('data-tab-index') || el.getAttribute('data-tab') || ''
  }

  function activateNestedTab(root, index) {
    if (!root || !index) return
    root.classList.add('e-activated')
    root.querySelectorAll('.e-n-tab-title').forEach(function (btn) {
      var on = String(nestedTabIndex(btn)) === String(index)
      btn.classList.toggle('e-active', on)
      btn.setAttribute('aria-selected', on ? 'true' : 'false')
      btn.tabIndex = on ? 0 : -1
    })
    var content = root.querySelector('.e-n-tabs-content')
    if (!content) return
    var panels = []
    for (var i = 0; i < content.children.length; i++) panels.push(content.children[i])
    panels.forEach(function (panel) {
      var on = String(nestedTabIndex(panel)) === String(index)
      panel.classList.toggle('e-active', on)
      panel.hidden = !on
      panel.setAttribute('aria-hidden', on ? 'false' : 'true')
    })
  }

  function accordionAllowsMultiple(acc) {
    var widget = acc && acc.closest('[data-widget_type*="accordion"], .elementor-widget-n-accordion')
    var raw = widget && widget.getAttribute('data-settings')
    if (!raw) return false
    try {
      var s = JSON.parse(raw)
      return s.max_items_expended === 'multiple' || s.max_items_expanded === 'multiple'
    } catch (err) {
      return false
    }
  }

  function setNestedAccordionItem(details, open) {
    if (!details) return
    details.open = !!open
    var summary = details.querySelector('summary, .e-n-accordion-item-title')
    if (summary) summary.setAttribute('aria-expanded', open ? 'true' : 'false')
  }

  function wireElementorWidgets() {
    if (window.__tdyuElWidgets) return
    window.__tdyuElWidgets = true

    document.addEventListener(
      'keydown',
      function (e) {
        var t = e.target
        if (!t || !t.closest) return
        var title = t.closest('.e-n-tab-title')
        if (!title) return
        var root = title.closest('.e-n-tabs')
        if (!root) return
        var titles = []
        root.querySelectorAll('.e-n-tabs-heading .e-n-tab-title').forEach(function (btn) {
          if (titles.indexOf(btn) === -1) titles.push(btn)
        })
        if (!titles.length) {
          root.querySelectorAll('.e-n-tab-title').forEach(function (btn) {
            if (titles.indexOf(btn) === -1) titles.push(btn)
          })
        }
        var cur = titles.indexOf(title)
        if (cur < 0) cur = 0
        var next = cur
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (cur + 1) % titles.length
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (cur - 1 + titles.length) % titles.length
        else if (e.key === 'Home') next = 0
        else if (e.key === 'End') next = titles.length - 1
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          activateNestedTab(root, nestedTabIndex(title))
          return
        } else return
        e.preventDefault()
        titles[next].focus()
        activateNestedTab(root, nestedTabIndex(titles[next]))
      },
      true,
    )

    document.addEventListener(
      'click',
      function (e) {
        var t = e.target
        if (!t || !t.closest) return
        var nestedAccTitle = t.closest('.e-n-accordion-item-title, .e-n-accordion-item summary')
        if (nestedAccTitle) {
          var details = nestedAccTitle.closest('details')
          var acc = nestedAccTitle.closest('.e-n-accordion')
          if (details && acc) {
            e.preventDefault()
            var willOpen = !details.open
            if (willOpen && !accordionAllowsMultiple(acc)) {
              acc.querySelectorAll('details').forEach(function (other) {
                setNestedAccordionItem(other, other === details)
              })
            } else {
              setNestedAccordionItem(details, willOpen)
            }
          }
          return
        }
        var nestedTitle = t.closest('.e-n-tab-title')
        if (nestedTitle) {
          var nestedRoot = nestedTitle.closest('.e-n-tabs')
          var idx = nestedTabIndex(nestedTitle)
          if (nestedRoot && idx) {
            e.preventDefault()
            activateNestedTab(nestedRoot, idx)
          }
          return
        }
        var tabTitle = t.closest(
          '.elementor-tab-title, .elementor-tab-desktop-title, .elementor-tab-mobile-title',
        )
        if (tabTitle && !tabTitle.classList.contains('e-n-tab-title')) {
          var tabs = tabTitle.closest('.elementor-tabs')
          var tabId = tabTitle.getAttribute('data-tab')
          if (tabs && tabId) {
            e.preventDefault()
            tabs.querySelectorAll('.elementor-tab-title, .elementor-tab-desktop-title, .elementor-tab-mobile-title').forEach(function (el) {
              var on = el.getAttribute('data-tab') === tabId
              el.classList.toggle('elementor-active', on)
              el.setAttribute('aria-selected', on ? 'true' : 'false')
              el.setAttribute('aria-expanded', on ? 'true' : 'false')
            })
            tabs.querySelectorAll('.elementor-tab-content').forEach(function (el) {
              var on = el.getAttribute('data-tab') === tabId
              el.classList.toggle('elementor-active', on)
              el.hidden = !on
              el.style.display = on ? '' : 'none'
            })
          }
          return
        }
        var accTitle = t.closest('.elementor-accordion-title, .elementor-toggle-title')
        if (accTitle) {
          var item = accTitle.closest('.elementor-accordion-item, .elementor-toggle-item')
          if (!item) return
          e.preventDefault()
          var open = !accTitle.classList.contains('elementor-active')
          var group = accTitle.closest('.elementor-accordion, .elementor-toggle')
          if (group && group.classList.contains('elementor-accordion')) {
            group.querySelectorAll('.elementor-accordion-item').forEach(function (other) {
              var title = other.querySelector('.elementor-accordion-title')
              var body = other.querySelector('.elementor-tab-content, .elementor-accordion-content')
              var on = open && other === item
              if (title) {
                title.classList.toggle('elementor-active', on)
                title.setAttribute('aria-expanded', on ? 'true' : 'false')
              }
              if (body) {
                body.classList.toggle('elementor-active', on)
                body.hidden = !on
                body.style.display = on ? '' : 'none'
              }
            })
          } else {
            var body = item.querySelector('.elementor-tab-content, .elementor-toggle-content')
            accTitle.classList.toggle('elementor-active', open)
            accTitle.setAttribute('aria-expanded', open ? 'true' : 'false')
            if (body) {
              body.classList.toggle('elementor-active', open)
              body.hidden = !open
              body.style.display = open ? '' : 'none'
            }
          }
        }
      },
      true,
    )

    document.querySelectorAll('.e-n-tabs').forEach(function (root) {
      var current = root.querySelector('.e-n-tab-title[aria-selected="true"]')
      activateNestedTab(root, current ? current.getAttribute('data-tab-index') : '1')
    })
  }

  function wireMotion() {
    if (window.__tdyuMotion) return
    window.__tdyuMotion = true
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    var nodes = document.querySelectorAll('[data-aos], [data-aos-once]')
    function show(el) {
      el.classList.add('aos-animate')
    }
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(show)
      return
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          show(entry.target)
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach(function (el) {
      io.observe(el)
    })
  }

  function boot() {
    revealLazyBackgrounds()
    swapYoutubeVideos()
    wireForms()
    wireSearch()
    wireElementorWidgets()
    wireMotion()
    snapshotFilterItems()
    wireAcademicFilters()
    setTimeout(function () {
      snapshotFilterItems()
      wireAcademicFilters()
    }, 200)
    setTimeout(function () {
      snapshotFilterItems()
      wireAcademicFilters()
    }, 800)
    fixPrivacyLinks()
    fixFacultySocialIcons()
    hydrateAnnouncements()
    loadSettings().then(function (settings) {
      injectBankBox(settings)
    })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
