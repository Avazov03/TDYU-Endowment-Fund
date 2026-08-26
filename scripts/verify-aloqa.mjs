import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/contact/index.html', 'utf8')
const i = h.indexOf('Hamkorlik')
console.log(h.slice(i, i + 450).replace(/\s+/g, ' '))
const j = h.indexOf('Bizga yozing')
console.log('\nform h2:', h.slice(j - 50, j + 80).replace(/\s+/g, ' '))
// any US leftovers
for (const n of ['270', 'Kentucky', 'Huston', 'TDYU.edu', 'Submit', 'stamford', 'Chelsea', 'USA', 'NY']) {
  if (h.includes(n)) {
    const k = h.indexOf(n)
    console.log('still', n, h.slice(k - 25, k + 40).replace(/\s+/g, ' '))
  }
}
