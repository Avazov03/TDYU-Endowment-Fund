import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const pairs = [
  ['Stanford University, USA ', 'Stanford Universiteti, AQSH '],
  ['Harvard University, USA ', 'Harvard Universiteti, AQSH '],
  ['Collage of arts  and Sciences', 'Fanlar kolleji'],
  ['Collage of arts and Sciences', 'Fanlar kolleji'],
  ['Xalqaro arizalar Start Your Study Journey Here', 'Xalqaro o‘qish imkoniyatlari'],
  ['Start Your Study Journey Here', 'O‘qish safaringizni boshlang'],
  ['Xalqaro arizalar Tuition ', 'Xalqaro dasturlar '],
  ['Xalqaro arizalar Tuition', 'Xalqaro dasturlar'],
  ['Graduate ', 'Magistratura '],
  ['Admission ', 'Qabul '],
  ['Applying for need-based financial aid*', 'Ehtiyoj asosidagi yordam*'],
  ['>Financial aid</option>', '>Moliyaviy yordam</option>'],
  ['value="Yes">Yes</option>', 'value="Yes">Ha</option>'],
  ['value="No">No</option>', 'value="No">Yo‘q</option>'],
  ['Additional and Submission', 'Qo‘shimcha va yuborish'],
  ['Upload File *', 'Fayl yuklash *'],
  ['Do Your Need Help?', 'Yordam kerakmi?'],
  ['Contact Now', 'Bog‘lanish'],
  ['Email:</h4>', 'Email:</h4>'],
  ['>Email:</h4>', '>Email:</h4>'],
  // better Email heading
  ['>Email:</', '>Email:</'],
]

// Fix Email: headings properly
pairs.push(['Email:</h4>', 'Elektron pochta:</h4>'])
pairs.push(['>Email:<', '>Elektron pochta:<'])

let files = 0
let total = 0
for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  let n = 0
  for (const [a, b] of pairs) {
    if (!a || a === b) continue
    if (!h.includes(a)) continue
    const c = h.split(a).length - 1
    h = h.split(a).join(b)
    n += c
  }
  if (n) {
    fs.writeFileSync(file, h)
    files++
    total += n
  }
}
console.log('files', files, 'n', total)

// tuition Program header leftover
const tf = 'public/cyan/tuition-fee/index.html'
let t = fs.readFileSync(tf, 'utf8')
const i = t.indexOf('Program')
console.log('tuition Program sample', JSON.stringify(t.slice(i - 30, i + 40)))
