/**
 * Homepage stats strip — TDYU brand DNA.
 * Inserted RIGHT AFTER the hero (first main page section), not before footer.
 */
;(function () {
  var LANG = (document.body && document.body.getAttribute('data-tdyu-lang')) || 'uz'
  var path = location.pathname || ''
  var isHome =
    /\/(uz|cyan|ru|en)\/?(index\.html)?$/i.test(path) ||
    /\/(uz|cyan|ru|en)\/index\.html$/i.test(path) ||
    path === '/'
  if (!isHome) return
  if (document.getElementById('tdyu-home-stats')) return

  var COPY = {
    uz: [
      { n: '31', l: 'Amalga oshirilgan loyihalar' },
      { n: '24', l: 'Mutaxassislar soni' },
      { n: '400', l: 'Qo‘llab-quvvatlangan tashabbuslar' },
      { n: '18', l: 'Yillik tajriba' },
      { n: '2023', l: 'Tashkil etilgan' },
    ],
    ru: [
      { n: '31', l: 'Реализованные проекты' },
      { n: '24', l: 'Специалисты' },
      { n: '400', l: 'Поддержанные инициативы' },
      { n: '18', l: 'Лет опыта' },
      { n: '2023', l: 'Год основания' },
    ],
    en: [
      { n: '31', l: 'Completed projects' },
      { n: '24', l: 'Specialists' },
      { n: '400', l: 'Supported initiatives' },
      { n: '18', l: 'Years of experience' },
      { n: '2023', l: 'Established' },
    ],
  }

  var items = COPY[LANG] || COPY.uz

  function findHeroSection() {
    var root =
      document.querySelector('#univet-content .elementor') ||
      document.querySelector('main.univet-content-wrapper .elementor') ||
      document.querySelector('main .elementor')
    if (!root) return null
    return root.querySelector(':scope > .e-con.e-parent, :scope > .elementor-element.e-parent')
  }

  function mount(sec) {
    var hero = findHeroSection()
    if (hero && hero.parentNode) {
      if (hero.nextSibling) hero.parentNode.insertBefore(sec, hero.nextSibling)
      else hero.parentNode.appendChild(sec)
      return
    }
    // fallback: after header / start of main
    var main =
      document.querySelector('#univet-content') ||
      document.querySelector('#univet-page') ||
      document.querySelector('#tdyu-dump-root') ||
      document.querySelector('main')
    if (main && main.firstElementChild) {
      var page = main.querySelector('.elementor') || main
      var first = page.querySelector(':scope > .e-parent')
      if (first) {
        first.insertAdjacentElement('afterend', sec)
        return
      }
      page.insertBefore(sec, page.firstChild)
      return
    }
    document.body.appendChild(sec)
  }

  function render(list) {
    var sec = document.createElement('section')
    sec.id = 'tdyu-home-stats'
    sec.className = 'tdyu-home-stats'
    sec.setAttribute('aria-label', 'TDYU Endowment stats')
    sec.innerHTML =
      '<div class="tdyu-home-stats__inner">' +
      list
        .map(function (it, i) {
          return (
            '<div class="tdyu-home-stats__item" style="--i:' +
            i +
            '">' +
            '<div class="tdyu-home-stats__num">' +
            it.n +
            '</div>' +
            '<div class="tdyu-home-stats__label">' +
            it.l +
            '</div>' +
            '</div>'
          )
        })
        .join('') +
      '</div>'

    mount(sec)

    if (!('IntersectionObserver' in window)) {
      sec.classList.add('is-in')
      return
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return
          sec.classList.add('is-in')
          io.disconnect()
        })
      },
      { threshold: 0.2 },
    )
    io.observe(sec)
  }

  function boot() {
    fetch('/api/public/content?lang=' + encodeURIComponent(LANG))
      .then(function (r) {
        return r.ok ? r.json() : {}
      })
      .then(function (map) {
        var fromCms = []
        for (var i = 1; i <= 5; i++) {
          var b = map['stats.' + i]
          if (b && b.body) {
            fromCms.push({ n: (b.title || '').trim() || String(i), l: b.body.trim() })
          }
        }
        render(fromCms.length === 5 ? fromCms : items)
      })
      .catch(function () {
        render(items)
      })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
