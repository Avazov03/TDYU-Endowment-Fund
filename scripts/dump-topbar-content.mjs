/**
 * Dump Hisobotlar / Yordam / Huquqiy asos visible text for exact patching.
 */
import fs from 'node:fs'

const files = [
  'public/cyan/tuition-fee/index.html',
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
]

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8')
  console.log('\n########', f)
  console.log('title', h.match(/<title>([^<]+)/)?.[1])
  console.log(
    'h1',
    [...h.matchAll(/rstb-page-title[^>]*>([^<]+)/g)].map((m) => m[1]),
  )
  const heads = [...h.matchAll(/<(h[2-4]|span)[^>]*class="[^"]*(?:title|sub-text|elementor-heading|elementor-icon-box-title)[^"]*"[^>]*>([\s\S]{0,120}?)<\//g)]
  // simpler: extract common visible phrases
  for (const n of [
    'Get Your',
    'Tuition',
    'Fee',
    'Admission',
    'Apply',
    'Requirement',
    'GPA',
    'Bachelor',
    'Document',
    'Deadline',
    'Financial',
    'Cost',
    'Process',
    'Programs Cost',
    'How to',
    'Submit',
    'First Name',
    'Qabul',
    'Hisobot',
    'Huquqiy',
    'Yordam',
    'Xayriya',
    'Shaffof',
    'Mablag',
    'audit',
    'ustav',
  ]) {
    let from = 0
    let c = 0
    while (c < 2) {
      const i = h.indexOf(n, from)
      if (i < 0) break
      console.log(` [${n}]`, h.slice(Math.max(0, i - 20), i + 70).replace(/\s+/g, ' '))
      from = i + n.length
      c++
    }
  }
}
