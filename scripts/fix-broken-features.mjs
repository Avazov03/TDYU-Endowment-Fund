/**
 * Fix broken nav/links/privacy/contact field types across cyan HTML.
 */
import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const pairs = [
  // Broken nav → working pages
  ['team-member-2/index.html', 'vice-chancellor/index.html'],
  ['../team-member-2/index.html', '../vice-chancellor/index.html'],
  ['../../team-member-2/index.html', '../../vice-chancellor/index.html'],
  // Program submenu 404s → all-programs
  ['programs/m-ed-master-of-education-in-instructional-design-and-technology/index.html', 'all-programs/index.html#01'],
  ['programs/b-ed-bachelor-of-education-in-elementary-education/index.html', 'all-programs/index.html#02'],
  ['programs/m-sc-master-of-science-in-data-science-and-analytics/index.html', 'all-programs/index.html#03'],
  ['programs/b-sc-bachelor-of-science-in-computer-science/index.html', 'all-programs/index.html#04'],
  ['../programs/m-ed-master-of-education-in-instructional-design-and-technology/index.html', '../all-programs/index.html#01'],
  ['../programs/b-ed-bachelor-of-education-in-elementary-education/index.html', '../all-programs/index.html#02'],
  ['../programs/m-sc-master-of-science-in-data-science-and-analytics/index.html', '../all-programs/index.html#03'],
  ['../programs/b-sc-bachelor-of-science-in-computer-science/index.html', '../all-programs/index.html#04'],
  // Alumni mega often pointed to campus-life
  ['campus-life/index.html', 'alumni/index.html'],
  ['../campus-life/index.html', '../alumni/index.html'],
  // Privacy
  ['href="#">Maxfiylik siyosati', 'href="/cyan/privacy-policy/index.html">Maxfiylik siyosati'],
  ['href="#"> Maxfiylik siyosati', 'href="/cyan/privacy-policy/index.html"> Maxfiylik siyosati'],
]

// Relative-safe privacy: also patch bare # privacy after relative paths vary
function fixPrivacy(html) {
  return html.replace(
    /href="#"(?=[^>]*>[\s]*Maxfiylik siyosati)/gi,
    'href="/cyan/privacy-policy/index.html"',
  )
}

function fixContactLastName(html) {
  // Familiya field wrongly typed as email
  return html
    .replace(
      /(name="last-name"[^>]*type=")email(")/gi,
      '$1text$2',
    )
    .replace(
      /(type=")email("[^>]*name="last-name")/gi,
      '$1text$2',
    )
    .replace(/wpcf7-form-control wpcf7-email([^"]*")([^>]*name="last-name")/gi, 'wpcf7-form-control wpcf7-text$1$2')
}

function fixSocial(html) {
  // Point dead social icons to contact (until real profiles exist)
  return html.replace(
    /(<div class="social-wrapper">[\s\S]*?<\/div><\/div>)/g,
    (block) =>
      block.replace(/href="#"/g, 'href="/cyan/contact/index.html"'),
  )
}

const SITE_CSS = '<link rel="stylesheet" href="/tdyu-site-fix.css" />'
const SITE_JS = '<script src="/tdyu-site-fix.js" defer></script>'

function injectSiteFix(html) {
  let out = html
  if (!out.includes('tdyu-site-fix.css')) {
    out = out.replace('</head>', `${SITE_CSS}\n${SITE_JS}\n</head>`)
  }
  return out
}

let files = 0
let hits = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  const before = h
  for (const [a, b] of pairs) {
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    hits += c
  }
  h = fixPrivacy(h)
  h = fixContactLastName(h)
  h = fixSocial(h)
  h = injectSiteFix(h)
  if (h === before && h.includes('tdyu-site-fix.js')) continue
  if (h === before) continue
  fs.writeFileSync(file, h)
  files++
}
console.log('patched files', files, 'pair hits', hits)
