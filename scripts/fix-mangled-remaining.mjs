import fs from 'node:fs'

function patch(file, pairs) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) {
      console.log('miss', file, a.slice(0, 60))
      continue
    }
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  fs.writeFileSync(file, h)
  console.log(file, n)
}

// Fix mangled labels on Xayriya
patch('public/cyan/apply-now/index.html', [
  ['Higher Tashkilot / ish joyi*', 'Lavozim*'],
  ['GPA / CMiqdor (so‘m)*', 'Davriylik*'],
  ['Ta’lim va grantlar — 48%', 'Xayriya'],
  ['name="First Name"', 'name="Ism"'],
  ['name="Last Name"', 'name="Familiya"'],
  ['First Name', 'Ism'],
  ['Last Name', 'Familiya'],
  ['Your Telefon*', 'Telefon*'],
  ['Secondary School*', 'Tashkilot / ish joyi*'],
])

// Hisobotlar: first tab distinct
{
  const f = 'public/cyan/tuition-fee/index.html'
  let h = fs.readFileSync(f, 'utf8')
  // Only first tab title occurrence with spaces around
  const a = 'e-n-tab-title-text"> Yillik hisobot </'
  const b = 'e-n-tab-title-text"> Mablag‘ taqsimoti </'
  if (h.includes(a)) {
    h = h.replace(a, b) // first only
    fs.writeFileSync(f, h)
    console.log('tuition first tab renamed')
  } else console.log('miss tuition first tab')
}

// Huquqiy leftovers
patch('public/cyan/admission-requirements/index.html', [
  ['Ta’lim va grantlar — 48%', 'Xayriya'],
  ['>Magistratura</', '>Grant arizasi</'],
  ['IELTS/TOEFL yoki teng kuchli til sertifikati', 'Homiy turi va maxfiylik tanlovi'],
  ['IELTS', 'Til'], // if bare leftover
])

// Phone leftover on several pages
for (const f of [
  'public/cyan/tuition-fee/index.html',
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
  'public/cyan/cost-financial-aid/index.html',
  'public/cyan/apply-now/index.html',
]) {
  patch(f, [['+81112522552', '+998 71 233-66-36']])
}
