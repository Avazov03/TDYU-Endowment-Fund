import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/events/index.html', 'utf8')
console.log('BoshBlog', h.includes('BoshBlog'))
console.log('Fond qollab', h.includes('Fond qo‘llab-quvvatlagan tadbir') || h.includes("Fond qo'llab-quvvatlagan tadbir"))
console.log('Admission Huquqiy', h.includes('Admission Huquqiy'))
console.log('Qabul', h.includes('Qabul qoidalari'))
console.log('Archives', h.includes('Archives: Events'))
console.log('Graduate Programs', h.includes('Graduate Programs'))
console.log('Qidirish Keyword', h.includes('Qidirish Keyword'))
console.log('Your email', h.includes('Your email address'))
console.log('Enter your keywords', h.includes('Enter your keywords'))
console.log('Educations', h.includes('Educations'))
console.log('Faculty plain', (h.match(/>Faculty</g) || []).length)
console.log('menu Faculty', (h.match(/menu-item-text">Faculty</g) || []).length)
console.log('⚠ Graduate', h.includes('Graduate Programs'))

// find Faculty contexts
let i = 0
while ((i = h.indexOf('Faculty', i)) >= 0) {
  console.log('Faculty@', JSON.stringify(h.slice(i - 30, i + 40)))
  i += 7
  if (i > 500000) break
}
