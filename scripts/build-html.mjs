import {
  alumniPoints,
  brand,
  governance,
  grants,
  legal,
  mission,
  news,
  officialNames,
  pillars,
  programs,
  projects,
  reports,
  sources,
  spend,
  stats,
  stories,
  support,
} from './content-uz.mjs'

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export function pageHero(title, lead) {
  return `<section class="tdyu-page-hero"><div class="tdyu-wrap">
    <h1>${esc(title)}</h1>
    <p>${esc(lead)}</p>
  </div></section>`
}

export function homeHero() {
  return `<section class="tdyu-hero"><div class="tdyu-hero-inner">
    <span class="tdyu-eyebrow">${esc(brand.name)}</span>
    <h1>Huquqiy <em>ta’lim</em>ning kelajagiga <em>sarmoya</em></h1>
    <p class="tdyu-lead" style="color:rgba(255,255,255,.9)">${esc(brand.org)} maqsadli kapital fondi — bilim, grant va xalqaro imkoniyatlar.</p>
    <div class="tdyu-hero-actions">
      <a class="tdyu-btn tdyu-btn-cyan" href="/cyan/apply-now/index.html#calc">Xayriya qilish</a>
      <a class="tdyu-btn tdyu-btn-ghost" href="/cyan/about-us/index.html">Missiyani o‘qish</a>
    </div>
    <div class="tdyu-names">
      <div class="tdyu-names-title">Rasmiy nomlar</div>
      <div class="tdyu-names-grid">
        ${officialNames
          .map(
            (o) => `<div><span>${esc(o.lang)}</span>${esc(o.name)}</div>`,
          )
          .join('')}
      </div>
    </div>
  </div></section>`
}

export function statsBar() {
  return `<section class="tdyu-stats"><div class="tdyu-wrap tdyu-stats-grid">
    ${stats.map((s) => `<div><div class="tdyu-stat-num">${esc(s.n)}</div><div class="tdyu-stat-lbl">${esc(s.l)}</div></div>`).join('')}
  </div></section>`
}

export function missionBlock({ full = false } = {}) {
  const paras = full ? mission.paragraphs : mission.paragraphs.slice(0, 2)
  return `<section class="tdyu-sec"><div class="tdyu-wrap">
    <div class="tdyu-grid-2">
      <div>
        <span class="tdyu-eyebrow">Missiya</span>
        <h2 class="tdyu-title">${esc(mission.title)}</h2>
        ${paras.map((p) => `<p class="tdyu-lead">${esc(p)}</p>`).join('')}
        ${
          full
            ? ''
            : `<a class="tdyu-btn tdyu-btn-outline" href="/cyan/about-us/index.html">Batafsil</a>`
        }
      </div>
      <div class="tdyu-grid-3" style="grid-template-columns:repeat(2,1fr)">
        ${pillars
          .map(
            (p) => `<div class="tdyu-card"><div class="tdyu-num">${esc(p.n)}</div><h3 style="margin:0 0 8px;font-size:1.05rem;color:var(--tdyu-title)">${esc(p.t)}</h3><p style="margin:0;font-size:14px;line-height:1.55">${esc(p.d)}</p></div>`,
          )
          .join('')}
      </div>
    </div>
  </div></section>`
}

export function programsBlock({ limit } = {}) {
  const list = typeof limit === 'number' ? programs.slice(0, limit) : programs
  return `<section class="tdyu-sec tdyu-sec-cream"><div class="tdyu-wrap">
    <div class="tdyu-head-row">
      <div>
        <span class="tdyu-eyebrow">Dasturlar</span>
        <h2 class="tdyu-title">7 ta asosiy dastur</h2>
      </div>
      <p>Fond faoliyatining asosiy yo‘nalishlari — ta’limdan nashrgacha.</p>
    </div>
    <div class="tdyu-grid-7">
      ${list
        .map(
          (p) => `<article class="tdyu-card"><div class="tdyu-num">${esc(p.n)}</div><h3 style="margin:0 0 8px;color:var(--tdyu-title);font-size:1.1rem">${esc(p.t)}</h3><p style="margin:0;line-height:1.55">${esc(p.d)}</p><span class="tdyu-tag">${esc(p.tag)}</span></article>`,
        )
        .join('')}
    </div>
    ${
      limit
        ? `<div style="margin-top:28px"><a class="tdyu-btn tdyu-btn-primary" href="/cyan/all-programs/index.html">Barcha dasturlar</a></div>`
        : ''
    }
  </div></section>`
}

export function projectsBlock({ limit } = {}) {
  const list = typeof limit === 'number' ? projects.slice(0, limit) : projects
  return `<section class="tdyu-sec"><div class="tdyu-wrap">
    <div class="tdyu-head-row">
      <div>
        <span class="tdyu-eyebrow">Loyihalar</span>
        <h2 class="tdyu-title">Amalga oshirilgan ishlar</h2>
      </div>
      <p>Jessup, Westminster, TSUL SHOP va boshqa tashabbuslar.</p>
    </div>
    <div class="tdyu-grid-3">
      ${list
        .map(
          (p) => `<article class="tdyu-card"><span class="tdyu-tag">${esc(p.tag)} · ${esc(p.y)}</span><h3 style="margin:12px 0 8px;color:var(--tdyu-title)">${esc(p.t)}</h3><p style="margin:0;line-height:1.55">${esc(p.d)}</p></article>`,
        )
        .join('')}
    </div>
    ${
      limit
        ? `<div style="margin-top:28px"><a class="tdyu-btn tdyu-btn-outline" href="/cyan/research/index.html">Barcha loyihalar</a></div>`
        : ''
    }
  </div></section>`
}

export function transparencyBlock() {
  return `<section class="tdyu-sec tdyu-sec-cream" id="shaffoflik"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Shaffoflik</span>
    <h2 class="tdyu-title">Mablag‘ qayerga ketadi</h2>
    <div class="tdyu-grid-2">
      <div class="tdyu-card">
        ${spend
          .map(
            (s) => `<div class="tdyu-bar-row"><span>${esc(s.l)}</span><div class="tdyu-bar-track"><div class="tdyu-bar-fill" data-pct="${s.p}"></div></div><strong>${s.p}%</strong></div>`,
          )
          .join('')}
      </div>
      <div>
        <h3 style="color:var(--tdyu-title);margin-top:0">Moliyaviy manbalar</h3>
        <ul style="padding-left:18px;line-height:1.8">
          ${sources.map((s) => `<li>${esc(s)}</li>`).join('')}
        </ul>
        <a class="tdyu-btn tdyu-btn-primary" href="/cyan/tuition-fee/index.html">Hisobotlar va audit</a>
      </div>
    </div>
  </div></section>`
}

export function reportsBlock() {
  return `<section class="tdyu-sec"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Hisobotlar va audit</span>
    <h2 class="tdyu-title">Hujjatlar va yillik hisobotlar</h2>
    <div class="tdyu-grid-2">
      ${reports
        .map(
          (r) => `<article class="tdyu-card"><h3 style="margin:0 0 8px;color:var(--tdyu-title)">${esc(r.t)}</h3><p style="margin:0 0 10px">${esc(r.d)}</p><span class="tdyu-tag">${esc(r.date)}</span></article>`,
        )
        .join('')}
    </div>
  </div></section>`
}

export function governanceBlock() {
  return `<section class="tdyu-sec tdyu-sec-dark"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Boshqaruv</span>
    <h2 class="tdyu-title">Vasiylik · Boshqaruv · Taftish</h2>
    <div class="tdyu-tabs" role="tablist">
      ${governance
        .map(
          (g, i) => `<button type="button" class="tdyu-tab${i === 0 ? ' active' : ''}" data-tab="${esc(g.id)}">${esc(g.label)}</button>`,
        )
        .join('')}
    </div>
    ${governance
      .map(
        (g, i) => `<div class="tdyu-panel${i === 0 ? ' active' : ''}" data-panel="${esc(g.id)}">
        <p class="tdyu-lead">${esc(g.intro)}</p>
        <div class="tdyu-grid-3">
          ${g.powers.map((p) => `<div class="tdyu-card-dark"><p style="margin:0">${esc(p)}</p></div>`).join('')}
        </div>
      </div>`,
      )
      .join('')}
  </div></section>`
}

export function alumniMapBlock() {
  return `<section class="tdyu-sec tdyu-sec-dark" id="alumni-map"><div class="tdyu-wrap">
    <div class="tdyu-head-row">
      <div>
        <span class="tdyu-eyebrow">Alumni xarita</span>
        <h2 class="tdyu-title">Dunyo bo‘ylab bitiruvchilar</h2>
      </div>
      <p>24 davlat — filtrlash orqali ko‘ring.</p>
    </div>
    <div class="tdyu-map-box">
      <div class="tdyu-map-filters">
        <button type="button" class="active" data-filter="all">Hammasi</button>
        <button type="button" data-filter="law">Yuristlar</button>
        <button type="button" data-filter="intl">Xalqaro</button>
        <button type="button" data-filter="academia">Akademiya</button>
        <button type="button" data-filter="govt">Davlat</button>
      </div>
      <div class="tdyu-map-points">
        ${alumniPoints
          .map(
            (p) => `<div class="tdyu-map-point" data-f="${esc(p.f)}"><strong>${esc(p.c)}</strong>${esc(p.t)} · ${esc(p.n)}</div>`,
          )
          .join('')}
      </div>
    </div>
  </div></section>`
}

export function storiesBlock() {
  return `<section class="tdyu-sec"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Hikoyalar</span>
    <h2 class="tdyu-title">Muvaffaqiyat tarixlari</h2>
    <div class="tdyu-grid-3">
      ${stories
        .map(
          (s) => `<blockquote class="tdyu-card"><div class="tdyu-num">${esc(s.i)}</div><p style="font-style:italic;line-height:1.65">“${esc(s.q)}”</p><strong style="color:var(--tdyu-title)">${esc(s.n)}</strong><div style="font-size:13px;margin-top:4px">${esc(s.r)}</div></blockquote>`,
        )
        .join('')}
    </div>
  </div></section>`
}

export function grantsBlock() {
  return `<section class="tdyu-sec tdyu-sec-cream" id="grantlar"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Grantlar</span>
    <h2 class="tdyu-title">Moliyaviy dasturlar</h2>
    <div class="tdyu-grid-3">
      ${grants
        .map(
          (g) => `<article class="tdyu-card">${g.b ? `<span class="tdyu-tag">${esc(g.b)}</span>` : ''}<h3 style="margin:12px 0 8px;color:var(--tdyu-title)">${esc(g.t)}</h3><p>${esc(g.d)}</p><ul style="padding-left:18px;margin:0">${g.m.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></article>`,
        )
        .join('')}
    </div>
    <div class="tdyu-card" style="margin-top:24px">
      <h3 style="margin-top:0;color:var(--tdyu-title)">Ariza topshirish</h3>
      <form class="tdyu-form" onsubmit="event.preventDefault();alert('Ariza qabul qilindi (demo).');">
        <div><label>Ism familiya</label><input required name="name" /></div>
        <div><label>Email</label><input required type="email" name="email" /></div>
        <div class="full"><label>Dastur</label>
          <select name="program"><option>Xalqaro ta’lim granti</option><option>Tanlov stipendiyasi</option><option>Ilmiy nashr granti</option></select>
        </div>
        <div class="full"><label>Motivatsiya</label><textarea rows="4" name="note"></textarea></div>
        <div class="full"><button class="tdyu-btn tdyu-btn-primary" type="submit">Ariza yuborish</button></div>
      </form>
    </div>
  </div></section>`
}

export function newsBlock({ limit } = {}) {
  const list = typeof limit === 'number' ? news.slice(0, limit) : news
  return `<section class="tdyu-sec"><div class="tdyu-wrap">
    <div class="tdyu-head-row">
      <div>
        <span class="tdyu-eyebrow">Yangiliklar</span>
        <h2 class="tdyu-title">Fond tadbirlari va e’lonlar</h2>
      </div>
      ${limit ? `<a class="tdyu-btn tdyu-btn-outline" href="/cyan/blog/index.html">Barcha yangiliklar</a>` : ''}
    </div>
    <div class="tdyu-grid-3">
      ${list
        .map(
          (n) => `<article class="tdyu-card"><span class="tdyu-tag">${esc(n.tag)}</span><h3 style="margin:12px 0 8px;color:var(--tdyu-title)">${esc(n.t)}</h3><p>${esc(n.d)}</p><div style="font-size:13px;opacity:.7">${esc(n.date)}</div></article>`,
        )
        .join('')}
    </div>
  </div></section>`
}

export function supportBlock() {
  return `<section class="tdyu-sec tdyu-sec-cream" id="yordam"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Yordam yo‘llari</span>
    <h2 class="tdyu-title">Qanday qo‘llab-quvvatlash mumkin</h2>
    <div class="tdyu-grid-4">
      ${support
        .map(
          (s) => `<article class="tdyu-card"><h3 style="margin:0 0 8px;color:var(--tdyu-title)">${esc(s.t)}</h3><p>${esc(s.d)}</p><a class="tdyu-btn tdyu-btn-primary" href="${esc(s.href)}">${esc(s.cta)}</a></article>`,
        )
        .join('')}
    </div>
  </div></section>`
}

export function donateCalc() {
  return `<section class="tdyu-sec" id="calc"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Xayriya</span>
    <h2 class="tdyu-title">Xayriya kalkulyatori</h2>
    <div class="tdyu-grid-2">
      <div class="tdyu-card">
        <label style="font-weight:600;display:block;margin-bottom:8px">Summani tanlang (so‘m)</label>
        <div class="tdyu-amount" id="tdyu-amounts">
          ${[100000, 500000, 1000000, 5000000]
            .map(
              (a, i) => `<button type="button" data-amount="${a}" class="${i === 1 ? 'active' : ''}">${a.toLocaleString('uz-UZ')}</button>`,
            )
            .join('')}
        </div>
        <input class="tdyu-input" id="tdyu-custom-amount" type="number" min="10000" step="10000" placeholder="Boshqa summa" value="500000" />
        <div class="tdyu-impact" id="tdyu-impact">Tanlangan summa: <strong>500 000 so‘m</strong> — stipendiyaga yordam.</div>
        <a class="tdyu-btn tdyu-btn-cyan" href="mailto:info@tdyu-endowment.uz?subject=Xayriya">Xayriyani tasdiqlash</a>
      </div>
      <div>
        <h3 style="color:var(--tdyu-title);margin-top:0">Ta’sir</h3>
        <ul style="line-height:1.8;padding-left:18px">
          <li>100 000 — o‘quv materiallari</li>
          <li>500 000 — tadbir ishtiroki</li>
          <li>1 000 000 — qisman stipendiya</li>
          <li>5 000 000+ — xalqaro stajirovka</li>
        </ul>
      </div>
    </div>
  </div></section>`
}

export function legalBlock() {
  return `<section class="tdyu-sec tdyu-sec-cream" id="huquqiy"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Huquqiy asos</span>
    <h2 class="tdyu-title">Qonunlar va rekvizitlar</h2>
    <div class="tdyu-grid-3">
      ${legal
        .map(
          (l) => `<article class="tdyu-card"><h3 style="margin:0 0 8px;color:var(--tdyu-title);font-size:1.05rem">${esc(l.t)}</h3><p style="margin:0">${esc(l.d)}</p></article>`,
        )
        .join('')}
    </div>
    <div class="tdyu-card" style="margin-top:20px">
      <p style="margin:0 0 6px"><strong>${esc(brand.name)}</strong></p>
      <p style="margin:0 0 6px">${esc(brand.address)}</p>
      <p style="margin:0 0 6px">Ro‘yxatga oluvchi: ${esc(brand.registrar)}</p>
      <p style="margin:0">Aloqa: <a href="mailto:info@tdyu-endowment.uz">info@tdyu-endowment.uz</a></p>
    </div>
  </div></section>`
}

export function alumniRegister() {
  return `<section class="tdyu-sec" id="register"><div class="tdyu-wrap">
    <span class="tdyu-eyebrow">Alumni</span>
    <h2 class="tdyu-title">Alumni Associationga qo‘shiling</h2>
    <div class="tdyu-card">
      <form class="tdyu-form" onsubmit="event.preventDefault();alert('Ro‘yxatdan o‘tish qabul qilindi (demo).');">
        <div><label>Ism familiya</label><input required /></div>
        <div><label>Email</label><input type="email" required /></div>
        <div><label>Bitirgan yil</label><input type="number" min="1990" max="2030" /></div>
        <div><label>Davlat / shahar</label><input /></div>
        <div class="full"><button class="tdyu-btn tdyu-btn-primary" type="submit">Ro‘yxatdan o‘tish</button></div>
      </form>
    </div>
  </div></section>`
}
