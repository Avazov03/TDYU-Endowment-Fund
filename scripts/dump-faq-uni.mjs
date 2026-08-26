import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/faq/index.html', 'utf8')
let i = 0
while ((i = h.indexOf('University', i)) >= 0) {
  console.log(JSON.stringify(h.slice(i - 40, i + 50)))
  i += 10
}
