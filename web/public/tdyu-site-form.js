/**
 * TDYU site runtime: API forms, demo payment (Humo/Uzcard/Visa), search, CMS helpers.
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
        'To‘lovdan so‘ng chekni info@tdyu-endowment.uz ga yuboring.<br>Qabul qiluvchi: <strong>TDYU Endowment Fund</strong>',
      demoTitle: 'Demo onlayn to‘lov',
      demoHint: 'Bu DEMO — real pul yechilmaydi. Humo / Uzcard / Visa oqimini ko‘rish uchun.',
      demoPay: 'Demo to‘lov',
      demoBank: 'Faqat bank arizasi',
      demoMethod: 'To‘lov usuli',
      demoCard: 'Karta raqami (demo)',
      demoExpiry: 'Amal qilish',
      demoCvv: 'CVV',
      demoAmount: 'Summa (UZS)',
      demoSuccess: 'Demo to‘lov muvaffaqiyatli',
      demoFail: 'Demo to‘lov rad etildi',
      demoProcessing: 'To‘lov qayta ishlanmoqda…',
      demoOkBtn: 'Muvaffaqiyatli demo',
      demoFailBtn: 'Muvaffaqiyatsiz demo',
      demoClose: 'Yopish',
      demoName: 'Ism',
      demoEmail: 'Email',
    },
    ru: {
      formOk: 'Обращение отправлено',
      formHint: 'Спасибо! Заявка появится в админ-панели.',
      formErr: 'Заполните обязательные поля.',
      formFail: 'Не удалось отправить. Попробуйте позже или напишите: ',
      searchTitle: 'Поиск по сайту',
      searchEmpty: 'Ничего не найдено.',
      searchClose: 'Закрыть',
      bankTitle: 'Пожертвование через банк',
      bankBody: 'После оплаты отправьте чек на info@tdyu-endowment.uz.',
      demoTitle: 'Демо онлайн-оплата',
      demoHint: 'Это DEMO — реальные деньги не списываются.',
      demoPay: 'Демо оплата',
      demoBank: 'Только банковская заявка',
      demoMethod: 'Способ оплаты',
      demoCard: 'Номер карты (демо)',
      demoExpiry: 'Срок',
      demoCvv: 'CVV',
      demoAmount: 'Сумма (UZS)',
      demoSuccess: 'Демо оплата успешна',
      demoFail: 'Демо оплата отклонена',
      demoProcessing: 'Обработка платежа…',
      demoOkBtn: 'Успешное демо',
      demoFailBtn: 'Неуспешное демо',
      demoClose: 'Закрыть',
      demoName: 'Имя',
      demoEmail: 'Email',
    },
    en: {
      formOk: 'Request submitted',
      formHint: 'Thank you! It will appear in the admin panel.',
      formErr: 'Please fill in the required fields.',
      formFail: 'Could not submit. Try again later or email: ',
      searchTitle: 'Search the site',
      searchEmpty: 'No results.',
      searchClose: 'Close',
      bankTitle: 'Donate by bank transfer',
      bankBody: 'After payment, email the receipt to info@tdyu-endowment.uz.',
      demoTitle: 'Demo online payment',
      demoHint: 'This is DEMO — no real money is charged. Preview Humo / Uzcard / Visa flow.',
      demoPay: 'Demo payment',
      demoBank: 'Bank application only',
      demoMethod: 'Payment method',
      demoCard: 'Card number (demo)',
      demoExpiry: 'Expiry',
      demoCvv: 'CVV',
      demoAmount: 'Amount (UZS)',
      demoSuccess: 'Demo payment successful',
      demoFail: 'Demo payment declined',
      demoProcessing: 'Processing payment…',
      demoOkBtn: 'Successful demo',
      demoFailBtn: 'Failed demo',
      demoClose: 'Close',
      demoName: 'Name',
      demoEmail: 'Email',
    },
  }
  var t = I18N[LANG] || I18N.uz

  var PAGES = [
    { u: '/index.html', title: { uz: 'Bosh', ru: 'Главная', en: 'Home' }, k: 'home' },
    { u: '/apply-now/index.html', title: { uz: 'Xayriya', ru: 'Пожертвование', en: 'Donate' }, k: 'donate' },
    { u: '/contact/index.html', title: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' }, k: 'contact' },
    { u: '/scholarships/index.html', title: { uz: 'Grantlar', ru: 'Гранты', en: 'Grants' }, k: 'grant' },
    { u: '/blog/index.html', title: { uz: 'Yangiliklar', ru: 'Новости', en: 'News' }, k: 'news' },
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

  function formType(form) {
    var id = (form.getAttribute('id') || '') + ' ' + (form.getAttribute('aria-label') || '')
    var action = form.getAttribute('action') || ''
    var path = location.pathname
    if (/apply-now|xayriya|donate|2888/i.test(id + action + path) && !/scholarship|grant/i.test(path))
      return 'donation'
    if (/scholarship|grantlar|grant/i.test(path)) return 'grant'
    if (/317|newsletter|axborot|subscribe/i.test(id + action + form.className)) return 'newsletter'
    if (/contact|aloqa|10156/i.test(id + action + path)) return 'contact'
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
        if (raw[arguments[i]]) return raw[arguments[i]]
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
    var base = { lang: LANG, page: location.href }
    if (type === 'newsletter') return Object.assign(base, { email: m.email })
    if (type === 'donation') {
      return Object.assign(
        base,
        {
          firstName: m.firstName || m.name || 'Donor',
          lastName: m.lastName || '',
          email: m.email,
          phone: m.phone,
          amount: m.amount,
          currency: m.currency,
          note: m.note || m.message,
        },
        m.raw,
      )
    }
    if (type === 'grant') {
      return Object.assign(
        base,
        {
          name: m.name || [m.firstName, m.lastName].filter(Boolean).join(' '),
          email: m.email,
          phone: m.phone,
          program: m.program,
          message: m.message,
        },
        m.raw,
      )
    }
    return Object.assign(
      base,
      {
        name: m.name || [m.firstName, m.lastName].filter(Boolean).join(' ') || 'Visitor',
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message:
          m.message ||
          Object.keys(m.raw)
            .map(function (k) {
              return k + ': ' + m.raw[k]
            })
            .join('\n'),
      },
      m.raw,
    )
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
          // On donate page, prefer demo payment modal instead of plain submit
          if (type === 'donation' && /apply-now/i.test(location.pathname)) {
            openDemoPay(form)
            return
          }
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

  function openDemoPay(form) {
    var m = fieldMap(form)
    var overlay = document.getElementById('tdyu-demo-pay')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = 'tdyu-demo-pay'
      overlay.className = 'tdyu-demo-pay'
      document.body.appendChild(overlay)
    }
    overlay.innerHTML =
      '<div class="tdyu-demo-card" role="dialog" aria-modal="true">' +
      '<button type="button" class="tdyu-demo-x" data-close="1" aria-label="' +
      t.demoClose +
      '">×</button>' +
      '<div class="tdyu-demo-badge">DEMO</div>' +
      '<h3>' +
      t.demoTitle +
      '</h3>' +
      '<p class="tdyu-demo-hint">' +
      t.demoHint +
      '</p>' +
      '<label>' +
      t.demoName +
      '<input id="tdyu-dp-name" value="' +
      escAttr(m.firstName || m.name || '') +
      '" /></label>' +
      '<label>' +
      t.demoEmail +
      '<input id="tdyu-dp-email" type="email" value="' +
      escAttr(m.email || '') +
      '" /></label>' +
      '<label>' +
      t.demoAmount +
      '<input id="tdyu-dp-amount" value="' +
      escAttr(m.amount || '100000') +
      '" /></label>' +
      '<div class="tdyu-demo-methods" role="radiogroup" aria-label="' +
      t.demoMethod +
      '">' +
      methodBtn('humo', 'Humo', true) +
      methodBtn('uzcard', 'Uzcard', false) +
      methodBtn('visa', 'Visa', false) +
      '</div>' +
      '<label>' +
      t.demoCard +
      '<input id="tdyu-dp-card" inputmode="numeric" placeholder="8600 **** **** ****" maxlength="19" /></label>' +
      '<div class="tdyu-demo-row">' +
      '<label>' +
      t.demoExpiry +
      '<input id="tdyu-dp-exp" placeholder="12/28" maxlength="5" /></label>' +
      '<label>' +
      t.demoCvv +
      '<input id="tdyu-dp-cvv" placeholder="***" maxlength="3" /></label>' +
      '</div>' +
      '<div class="tdyu-demo-actions">' +
      '<button type="button" class="tdyu-demo-primary" id="tdyu-dp-ok">' +
      t.demoOkBtn +
      '</button>' +
      '<button type="button" class="tdyu-demo-ghost" id="tdyu-dp-fail">' +
      t.demoFailBtn +
      '</button>' +
      '</div>' +
      '<button type="button" class="tdyu-demo-link" id="tdyu-dp-bank">' +
      t.demoBank +
      '</button>' +
      '<div class="tdyu-demo-status" id="tdyu-dp-status" hidden></div>' +
      '</div>'

    overlay.classList.add('is-on')
    var method = 'humo'
    overlay.querySelectorAll('[data-method]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        method = btn.getAttribute('data-method')
        overlay.querySelectorAll('[data-method]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn)
        })
        var card = overlay.querySelector('#tdyu-dp-card')
        card.placeholder = method === 'visa' ? '4*** **** **** ****' : '8600 **** **** ****'
      })
    })
    overlay.querySelector('[data-close]').onclick = closeDemoPay
    overlay.onclick = function (e) {
      if (e.target === overlay) closeDemoPay()
    }
    overlay.querySelector('#tdyu-dp-ok').onclick = function () {
      runDemo(form, method, true)
    }
    overlay.querySelector('#tdyu-dp-fail').onclick = function () {
      runDemo(form, method, false)
    }
    overlay.querySelector('#tdyu-dp-bank').onclick = function () {
      closeDemoPay()
      submitBankOnly(form)
    }
  }

  function methodBtn(id, label, active) {
    return (
      '<button type="button" class="tdyu-method' +
      (active ? ' is-active' : '') +
      '" data-method="' +
      id +
      '"><span class="tdyu-method-logo">' +
      label.charAt(0) +
      '</span>' +
      label +
      '</button>'
    )
  }

  function escAttr(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
  }

  function closeDemoPay() {
    var overlay = document.getElementById('tdyu-demo-pay')
    if (overlay) overlay.classList.remove('is-on')
  }

  function runDemo(form, method, success) {
    var status = document.getElementById('tdyu-dp-status')
    var name = (document.getElementById('tdyu-dp-name') || {}).value || 'Donor'
    var email = (document.getElementById('tdyu-dp-email') || {}).value || ''
    var amount = (document.getElementById('tdyu-dp-amount') || {}).value || '0'
    var card = (document.getElementById('tdyu-dp-card') || {}).value || ''
    if (!email || !email.includes('@')) {
      toast(t.formErr, '')
      return
    }
    status.hidden = false
    status.className = 'tdyu-demo-status is-busy'
    status.textContent = t.demoProcessing

    setTimeout(function () {
      var payload = Object.assign(buildPayload(form, 'donation'), {
        firstName: name,
        email: email,
        amount: amount,
        currency: 'UZS',
        paymentMethod: method,
        paymentDemo: true,
        paymentStatus: success ? 'success' : 'failed',
        cardLast4: String(card).replace(/\D/g, '').slice(-4) || '0000',
        note: (buildPayload(form, 'donation').note || '') + ' [DEMO ' + method.toUpperCase() + ']',
      })
      postForm('donation', payload)
        .then(function () {
          status.className = 'tdyu-demo-status ' + (success ? 'is-ok' : 'is-fail')
          status.textContent = success ? t.demoSuccess : t.demoFail
          toast(success ? t.demoSuccess : t.demoFail, t.formHint)
          if (success) form.reset()
          setTimeout(closeDemoPay, 1400)
        })
        .catch(function () {
          status.className = 'tdyu-demo-status is-fail'
          status.textContent = t.formFail + MAIL
        })
    }, 1100)
  }

  function submitBankOnly(form) {
    if (!requiredOk(form)) {
      toast(t.formErr, '')
      return
    }
    var payload = Object.assign(buildPayload(form, 'donation'), {
      paymentMethod: 'bank',
      paymentDemo: false,
      paymentStatus: 'pending',
    })
    form.classList.add('tdyu-form-busy')
    postForm('donation', payload)
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
      body = String(settings.bankDetails)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
    }
    box.innerHTML =
      '<h4>' +
      t.bankTitle +
      '</h4><div>' +
      body +
      '</div>' +
      '<p class="tdyu-demo-inline">' +
      t.demoHint +
      '</p>' +
      '<button type="button" class="tdyu-demo-launch" id="tdyu-open-demo">' +
      t.demoPay +
      '</button>'
    form.parentNode.insertBefore(box, form)
    box.querySelector('#tdyu-open-demo').addEventListener('click', function () {
      openDemoPay(form)
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
        '<button type="button" class="tdyu-search-close">×</button>' +
        '<h3>' +
        t.searchTitle +
        '</h3>' +
        '<input type="search" id="tdyu-search-input" />' +
        '<ul class="tdyu-search-results" id="tdyu-search-results"></ul></div>'
      document.body.appendChild(panel)
      panel.addEventListener('click', function (e) {
        if (e.target === panel) panel.classList.remove('is-on')
      })
      panel.querySelector('.tdyu-search-close').onclick = function () {
        panel.classList.remove('is-on')
      }
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
    list.innerHTML = hits.length
      ? hits
          .map(function (p) {
            return '<li><a href="' + ROOT + p.u + '">' + (p.title[LANG] || p.title.uz) + '</a></li>'
          })
          .join('')
      : '<li class="tdyu-search-empty">' + t.searchEmpty + '</li>'
  }

  function wireSearch() {
    document.querySelectorAll('form[role="search"]').forEach(function (form) {
      form.addEventListener(
        'submit',
        function (ev) {
          ev.preventDefault()
          var input = form.querySelector('input[type="search"], input[name="s"], input[type="text"]')
          openSearch(input ? input.value : '')
        },
        true,
      )
    })
  }

  function boot() {
    wireForms()
    wireSearch()
    fetch(API + '/public/settings')
      .then(function (r) {
        return r.ok ? r.json() : {}
      })
      .then(injectBankBox)
      .catch(function () {
        injectBankBox({})
      })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
