/**
 * Deep dump of Aloqa contact content blocks.
 */
import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/contact/index.html', 'utf8')

// icon box titles + descriptions
const boxes = [...h.matchAll(/elementor-icon-box-title[\s\S]{0,80}?>([\s\S]{0,80}?)<\/h3>[\s\S]{0,40}?elementor-icon-box-description">([\s\S]{0,200}?)<\//g)]
console.log('icon boxes:', boxes.length)
boxes.forEach((m, i) => {
  const t = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  const d = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  console.log(i, { t, d })
})

// headings around form
const bi = h.indexOf('Bog‘lanish')
console.log('\nBoglanish area:', h.slice(bi - 100, bi + 800).replace(/\s+/g, ' '))

// page subtitle / hero
const hi = h.indexOf('rstb-page-title')
console.log('\nhero:', h.slice(hi, hi + 600).replace(/\s+/g, ' '))

// consent / privacy
for (const n of [
  'I agree',
  'Privacy',
  'Terms',
  'consent',
  'Maxfiylik',
  'roziman',
  'Qabul',
  'Admission',
  'Address',
  'Submit Now',
  'Email Address',
  'Enter Your',
  'First',
  'Last',
  'Ism',
  'Familiya',
  'Search Keyword',
  'Cyan University',
  'Ta-134',
  'NY ',
  'USA',
  'iframe',
  'google.com/maps',
  'map',
]) {
  if (h.includes(n)) {
    const i = h.indexOf(n)
    console.log(`[${n}]`, h.slice(Math.max(0, i - 30), i + 70).replace(/\s+/g, ' '))
  }
}

// all visible-ish text near contact form placeholders
const ph = [...h.matchAll(/placeholder="([^"]+)"/g)].map((m) => m[1])
console.log('\nplaceholders:', [...new Set(ph)])

const vals = [...h.matchAll(/type="submit"[^>]*value="([^"]+)"/g)].map((m) => m[1])
console.log('submit values:', vals)
