/**
 * Dump Aloqa (contact) page structure and EN leftovers.
 */
import fs from 'node:fs'

const f = 'public/cyan/contact/index.html'
const h = fs.readFileSync(f, 'utf8')

console.log('title:', h.match(/<title>([^<]*)<\/title>/)?.[1])
console.log('h1:', [...h.matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1]))
console.log(
  'h2/h3/h4 sample:',
  [...h.matchAll(/<h([2-4])[^>]*>([\s\S]{0,120}?)<\/h\1>/g)]
    .slice(0, 40)
    .map((m) => `h${m[1]}: ${m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}`),
)

const needles = [
  'Contact',
  'Get in Touch',
  'Send Message',
  'Your Name',
  'Your Email',
  'Your Phone',
  'Your Message',
  'Subject',
  'Submit',
  'Address',
  'Phone',
  'Email',
  'USA',
  'NY ',
  'Univet',
  'University',
  'Follow',
  'Find Us',
  'Location',
  'Office',
  'Hours',
  'Monday',
  'Call Us',
  'Write',
  'Message',
  'placeholder=',
  'Saylgoh',
  'info@',
  'Aloqa',
  'Manzil',
  'Telefon',
  'pochta',
]
for (const n of needles) {
  let from = 0
  let c = 0
  while (c < 2) {
    const i = h.indexOf(n, from)
    if (i < 0) break
    console.log(`[${n}]`, h.slice(Math.max(0, i - 35), i + n.length + 55).replace(/\s+/g, ' '))
    from = i + n.length
    c++
  }
}

// form fields
const forms = [...h.matchAll(/<(input|textarea|label|button)[^>]{0,300}>/gi)].slice(0, 40)
console.log('\nform-ish tags:', forms.length)
forms.forEach((m) => console.log(m[0].replace(/\s+/g, ' ').slice(0, 200)))
