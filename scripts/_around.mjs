import fs from 'node:fs'

function around(file, needle) {
  const h = fs.readFileSync(file, 'utf8')
  let i = 0
  let n = 0
  while ((i = h.indexOf(needle, i)) !== -1 && n < 5) {
    const chunk = h.slice(Math.max(0, i - 60), i + needle.length + 60)
    const text = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    console.log(n, text.slice(0, 180))
    console.log('RAW', JSON.stringify(chunk.slice(0, 120)))
    i += needle.length
    n++
  }
}

around('public/cyan/admission-requirements/index.html', 'Magistratura')
around('public/cyan/apply-now/index.html', 'Higher Secondary')
around('public/cyan/apply-now/index.html', 'Your Telefon')
around('public/cyan/apply-now/index.html', 'First Name')
