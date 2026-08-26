import fs from 'node:fs'

const events = fs.readFileSync('public/cyan/events/index.html', 'utf8')
const alumni = fs.readFileSync('public/cyan/alumni/index.html', 'utf8')
const sch = fs.readFileSync('public/cyan/scholarships/index.html', 'utf8')

console.log('=== EVENTS titles near img alt / links ===')
for (const m of events.matchAll(/alt="([^"]{10,120})"/g)) {
  if (/Conference|Forum|Ceremony|Summit|Symposium|Leadership|Research|Academic|Event|Student/i.test(m[1]))
    console.log('alt:', m[1])
}
for (const m of events.matchAll(/<h[23][^>]*>[\s\S]*?<\/h[23]>/g)) {
  const t = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (t.length > 5) console.log('h:', t.slice(0, 120))
}
for (const m of events.matchAll(/href="[^"]*events\/[^"]+"[^>]*>[\s\S]{0,80}/g)) {
  const t = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (t.length > 15) console.log('link:', t.slice(0, 140))
}

console.log('\n=== ALUMNI near names ===')
for (const name of ['Esther Howard', 'Jerome Bell', 'Arlene McCoy', 'David Thomas', 'Margaret Johnson']) {
  const i = alumni.indexOf(name)
  console.log(name, JSON.stringify(alumni.slice(i, i + 200)))
}

console.log('\n=== SCH breadcrumbs / hero ===')
const i = sch.indexOf('Grant Opportunities')
console.log(JSON.stringify(sch.slice(i - 80, i + 400)))
const j = sch.indexOf('Frequently Asked')
console.log('FAQ block', JSON.stringify(sch.slice(j, j + 80)))
// find accordion answer bodies briefly
for (const q of ['Are there scholarships', 'How do I apply', 'What is the average', 'How can I participate', 'How can I contact']) {
  const k = sch.indexOf(q)
  console.log('\nQ', q)
  console.log(JSON.stringify(sch.slice(k, k + 500).replace(/\s+/g, ' ')).slice(0, 350))
}
