import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/index.html', 'utf8')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')

const keys = [
  'Endowment', 'Xayriya', 'Vasiylik', 'Taftish', 'Alumni', 'Grant', 'Missiya',
  '31', 'kalkulyator', 'hisobot', 'shaffof', 'Saylgoh', 'stipendiya',
  'Jessup', 'Westminster', 'Boshqaruv', 'fond',
]
for (const k of keys) {
  const n = (h.match(new RegExp(k, 'gi')) || []).length
  console.log(n, k)
}

const pages = [
  'about-us','mission-value','all-programs','scholarships','alumni','blog',
  'apply-now','contact','research','tuition-fee','vice-chancellor','faq',
]
for (const p of pages) {
  const exists = fs.existsSync(`public/cyan/${p}/index.html`) || (p === '' && fs.existsSync('public/cyan/index.html'))
  console.log(exists ? 'OK' : 'NO', p)
}
