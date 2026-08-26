import { brand, nav } from './content-uz.mjs'

/** Slim Cyan-styled header — keeps brand palette without Elementor mega-menu clutter */
export function buildHeader() {
  const items = nav
    .map((item) => {
      const cls = item.cta ? 'tdyu-nav-link tdyu-nav-cta' : 'tdyu-nav-link'
      return `<a class="${cls}" href="${item.href}">${item.label}</a>`
    })
    .join('\n        ')

  return `<header class="rstb-header tdyu-site-header">
  <div class="tdyu-topbar">
    <div class="tdyu-wrap tdyu-topbar-inner">
      <span>${brand.org}</span>
      <span>${brand.address}</span>
    </div>
  </div>
  <div class="tdyu-navbar">
    <div class="tdyu-wrap tdyu-navbar-inner">
      <a class="tdyu-brand" href="/cyan/index.html">
        <img src="/cyan/wp-content/uploads/sites/17/2025/12/Asset-2-11.png" alt="${brand.name}" height="48" />
        <span>
          <strong>${brand.name}</strong>
          <small>${brand.org}</small>
        </span>
      </a>
      <nav class="tdyu-nav" aria-label="Asosiy">
        ${items}
      </nav>
      <button type="button" class="tdyu-nav-toggle" aria-label="Menyu" data-tdyu-nav-toggle>
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`
}

export function buildFooter() {
  const links = nav
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join('')
  return `<footer class="tdyu-site-footer">
  <div class="tdyu-wrap tdyu-footer-grid">
    <div>
      <img src="/cyan/wp-content/uploads/sites/17/2025/12/Asset-2-11.png" alt="${brand.name}" height="44" />
      <p>${brand.name}</p>
      <p>${brand.address}</p>
      <p>Ro‘yxatga oluvchi: ${brand.registrar}</p>
      <p><a href="mailto:info@tdyu-endowment.uz">info@tdyu-endowment.uz</a></p>
    </div>
    <div>
      <h4>Navigatsiya</h4>
      <div class="tdyu-footer-links">${links}</div>
    </div>
    <div>
      <h4>Huquqiy</h4>
      <p>NNO va jamoat fondlari to‘g‘risidagi qonunlar asosida faoliyat.</p>
      <a class="tdyu-btn tdyu-btn-cyan" href="/cyan/apply-now/index.html#calc">Xayriya qilish</a>
    </div>
  </div>
  <div class="tdyu-footer-copy">© ${new Date().getFullYear()} ${brand.name}</div>
</footer>`
}
