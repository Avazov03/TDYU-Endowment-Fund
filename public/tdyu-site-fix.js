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
    { u: '/index.html', title: { uz: 'Bosh', ru: 'Главная', en: 'Home' }, k: 'home bosh endowment' },
    { u: '/about-us/index.html', title: { uz: 'Missiya', ru: 'Миссия', en: 'Mission' }, k: 'missiya mission fond haqida' },
    { u: '/mission-value/index.html', title: { uz: '6 ustun', ru: '6 столпов', en: '6 pillars' }, k: 'ustun pillars strategy' },
    { u: '/vice-chancellor/index.html', title: { uz: 'Boshqaruv', ru: 'Управление', en: 'Governance' }, k: 'boshqaruv vasiylik taftish' },
    { u: '/alumni/index.html', title: { uz: 'Alumni', ru: 'Alumni', en: 'Alumni' }, k: 'alumni bitiruvchi' },
    { u: '/research/index.html', title: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' }, k: 'loyiha project jessup' },
    { u: '/scholarships/index.html', title: { uz: 'Grantlar', ru: 'Гранты', en: 'Grants' }, k: 'grant stipendiya scholarship' },
    { u: '/events/index.html', title: { uz: 'Tadbirlar', ru: 'Мероприятия', en: 'Events' }, k: 'tadbir event kongress' },
    { u: '/all-programs/index.html', title: { uz: 'Dasturlar', ru: 'Программы', en: 'Programs' }, k: 'dastur program stajirovka' },
    { u: '/tuition-fee/index.html', title: { uz: 'Hisobotlar', ru: 'Отчёты', en: 'Reports' }, k: 'hisobot report audit' },
    { u: '/how-to-apply/index.html', title: { uz: 'Yordam', ru: 'Помощь', en: 'Support' }, k: 'yordam how apply' },
    { u: '/admission-requirements/index.html', title: { uz: 'Huquqiy asos', ru: 'Правовая основа', en: 'Legal basis' }, k: 'huquqiy qonun legal' },
    { u: '/cost-financial-aid/index.html', title: { uz: 'Shaffoflik', ru: 'Прозрачность', en: 'Transparency' }, k: 'shaffoflik transparency' },
    { u: '/apply-now/index.html', title: { uz: 'Xayriya', ru: 'Пожертвование', en: 'Donate' }, k: 'xayriya donate donation' },
    { u: '/blog/index.html', title: { uz: 'Yangiliklar', ru: 'Новости', en: 'News' }, k: 'yangilik news blog' },
    { u: '/contact/index.html', title: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' }, k: 'aloqa contact email' },
    { u: '/privacy-policy/index.html', title: { uz: 'Maxfiylik siyosati', ru: 'Политика конфиденциальности', en: 'Privacy policy' }, k: 'maxfiylik privacy' },
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

  function wireSearch() {
    document.querySelectorAll('form[role="search"]').forEach(function (form) {
      form.addEventListener(
        'submit',
        function (ev) {
          ev.preventDefault()
          ev.stopPropagation()
          var input = form.querySelector('input[type="search"], input[name="s"], input[type="text"]')
          openSearch(input ? input.value : '')
        },
        true,
      )
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
        host.innerHTML = rows
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

  function boot() {
    revealLazyBackgrounds()
    wireForms()
    wireSearch()
    fixPrivacyLinks()
    hydrateAnnouncements()
    loadSettings().then(function (settings) {
      injectBankBox(settings)
    })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
