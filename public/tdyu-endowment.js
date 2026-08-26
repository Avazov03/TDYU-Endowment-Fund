/* TDYU endowment interactivity */
(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
  }

  onReady(function () {
    document.querySelectorAll('[data-tdyu-nav-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var header = btn.closest('.tdyu-site-header')
        if (header) header.classList.toggle('is-open')
      })
    })

    document.querySelectorAll('.tdyu-tabs').forEach(function (tabs) {
      tabs.addEventListener('click', function (e) {
        var btn = e.target.closest('.tdyu-tab')
        if (!btn) return
        var id = btn.getAttribute('data-tab')
        var root = tabs.parentElement
        root.querySelectorAll('.tdyu-tab').forEach(function (b) {
          b.classList.toggle('active', b === btn)
        })
        root.querySelectorAll('.tdyu-panel').forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-panel') === id)
        })
      })
    })

    document.querySelectorAll('.tdyu-map-box').forEach(function (box) {
      var filters = box.querySelector('.tdyu-map-filters')
      if (!filters) return
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-filter]')
        if (!btn) return
        var f = btn.getAttribute('data-filter')
        filters.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('active', b === btn)
        })
        box.querySelectorAll('.tdyu-map-point').forEach(function (p) {
          var pf = p.getAttribute('data-f')
          var show = f === 'all' || pf === f
          p.style.display = show ? '' : 'none'
        })
      })
    })

    function fillBars() {
      document.querySelectorAll('.tdyu-bar-fill[data-pct]').forEach(function (el) {
        el.style.width = el.getAttribute('data-pct') + '%'
      })
    }
    fillBars()

    var amounts = document.getElementById('tdyu-amounts')
    var input = document.getElementById('tdyu-custom-amount')
    var impact = document.getElementById('tdyu-impact')
    if (amounts && input && impact) {
      function impactText(n) {
        var msg =
          n >= 5000000
            ? 'xalqaro stajirovka uchun muhim hissa'
            : n >= 1000000
              ? 'qisman stipendiya'
              : n >= 500000
                ? 'tadbir ishtirokiga yordam'
                : 'o‘quv materiallariga hissa'
        return (
          'Tanlangan summa: <strong>' +
          Number(n).toLocaleString('uz-UZ') +
          ' so‘m</strong> — ' +
          msg +
          '.'
        )
      }
      function setAmount(n, syncButtons) {
        input.value = n
        impact.innerHTML = impactText(n)
        if (syncButtons) {
          amounts.querySelectorAll('button').forEach(function (b) {
            b.classList.toggle('active', Number(b.getAttribute('data-amount')) === Number(n))
          })
        }
      }
      amounts.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-amount]')
        if (!btn) return
        setAmount(btn.getAttribute('data-amount'), true)
      })
      input.addEventListener('input', function () {
        var n = Number(input.value || 0)
        impact.innerHTML = impactText(n)
        amounts.querySelectorAll('button').forEach(function (b) {
          b.classList.remove('active')
        })
      })
    }
  })
})()
