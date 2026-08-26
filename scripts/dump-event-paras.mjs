import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/events/index.html', 'utf8')
const paras = [...h.matchAll(/<p>([^<]{30,400})<\/p>/g)].map((m) => m[1])
console.log('event paras:')
paras.forEach((p, i) => console.log(i, p.slice(0, 200)))

const sch = fs.readFileSync('public/cyan/scholarships/index.html', 'utf8')
const lists = [...sch.matchAll(/elementor-icon-list-text[^>]*>\s*([^<]+)/g)].map((m) =>
  m[1].trim(),
)
console.log('\nsch list items unique:')
;[...new Set(lists)].filter((t) => /[A-Za-z]{4}/.test(t)).slice(0, 40).forEach((t) => console.log('·', t))

const res = fs.readFileSync('public/cyan/research/index.html', 'utf8')
const lists2 = [...res.matchAll(/elementor-icon-list-text[^>]*>\s*([^<]+)/g)].map((m) =>
  m[1].trim(),
)
console.log('\nres list:')
;[...new Set(lists2)].filter((t) => /[A-Za-z]{4}/.test(t)).forEach((t) => console.log('·', t))
