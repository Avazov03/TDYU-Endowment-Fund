import fs from 'node:fs'

const nbsp = '\u00a0'

const pairsTuition = [
  [
    `Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds Each academic program includes tuitions${nbsp} fees registration charges and essential learning resources ensuring students for receive education and comprehensive academic support`,
    'Fond mablag‘lari shaffof taqsimlanadi: ta’lim va grantlar, xalqaro tadbirlar, ilmiy nashrlar, infratuzilma va boshqaruv xarajatlari.',
  ],
]

const short = [
  [
    'Our program costs are designed to remain transparent competitive and accessible for students from diverse backgrounds.',
    'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.',
  ],
  [
    'Our program costs are designed to remain transparent, competitive and accessible for students from diverse backgrounds.',
    'Fond mablag‘lari shaffof hisobotlar asosida taqsimlanadi.',
  ],
]

function apply(file, pairs) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!h.includes(a)) {
      console.log(file, 'miss', a.slice(0, 60))
      continue
    }
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  fs.writeFileSync(file, h)
  console.log(file, 'n', n, 'Our program left', h.includes('Our program'))
}

apply('public/cyan/tuition-fee/index.html', pairsTuition)
apply('public/cyan/how-to-apply/index.html', short)
apply('public/cyan/admission-requirements/index.html', short)

// Also dump remaining EN-ish visible for how-to-apply body
{
  const h = fs.readFileSync('public/cyan/how-to-apply/index.html', 'utf8')
  const i = h.indexOf('Fondga murojaat qilish —')
  console.log('yordam para', JSON.stringify(h.slice(i, i + 500).replace(/\s+/g, ' ')))
}
