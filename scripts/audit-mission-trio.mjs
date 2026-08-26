import fs from 'node:fs'

function check(rel) {
  const h = fs.readFileSync(`public/cyan/${rel}`, 'utf8')
  const issues = []

  // HTML corruption signs
  if (/\w+\.true"/.test(h)) issues.push('attr corruption .true"')
  if (/bilan\.true/.test(h)) issues.push('bilan.true')
  if (/class="[^"]*\s{2,}/.test(h) && h.includes('oshirish."')) {
    /* skip */
  }
  // broken tags from bad replace
  const brokenClose = (h.match(/<\/[a-z]+[^>]*>/gi) || []).filter((t) => t.includes(' '))
  // unclosed style from paint
  if ((h.match(/style="color:#dc2626/g) || []).length) {
    /* ok */
  }

  // English visible candidates (outside script/style)
  let body = h.replace(/<script[\s\S]*?<\/script>/gi, '')
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '')
  body = body.replace(/<!--[\s\S]*?-->/g, '')

  const texts = [...body.matchAll(/>([^<]{15,220})</g)]
    .map((m) => m[1].replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  const english = []
  for (const t of texts) {
    if (/[{};]|var |function|wp-|elementor|sourceURL/.test(t)) continue
    const letters = (t.match(/[A-Za-z]/g) || []).length
    const cyrOrUz = (t.match(/[А-Яа-яЎўҚқҒғҲҳʼ‘’]/g) || []).length
    const latUz = (t.match(/[oʻgʻʻ]/gi) || []).length
    if (letters > 20 && cyrOrUz < 2) {
      // has common English words
      if (
        /\b(the|and|with|from|your|our|students|university|education|program|research|admission|career|welcome|about|campus|faculty|apply|read more|follow|designed|privacy)\b/i.test(
          t,
        )
      ) {
        english.push(t.slice(0, 160))
      }
    }
  }

  // structure
  const headers = (h.match(/<header/gi) || []).length
  const footers = (h.match(/<footer/gi) || []).length
  const elementor = h.includes('elementor')

  console.log('\n##', rel)
  console.log('elementor', elementor, 'header', headers, 'footer', footers, 'size', h.length)
  if (issues.length) console.log('ISSUES', issues)
  console.log('EN leftovers', [...new Set(english)].length)
  ;[...new Set(english)].slice(0, 25).forEach((t) => console.log(' -', t))
}

for (const p of [
  'about-us/index.html',
  'mission-value/index.html',
  'vice-chancellor/index.html',
]) {
  check(p)
}
