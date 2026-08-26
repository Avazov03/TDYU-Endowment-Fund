import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/vice-chancellor/index.html', 'utf8')

const needles = [
  'Vice-chancellor',
  'Welcome to our university',
  'Campus Life',
  'Academic Activities',
  'Classrooms',
  'Graduation',
  'nazoratitment',
  'teady effort',
  'Join TDYU',
  'Graduate Programs',
  'Faculty Members',
  'Through dedica',
  'inclusivity',
]

for (const n of needles) {
  const i = h.indexOf(n)
  if (i < 0) {
    console.log('MISSING', n)
    continue
  }
  console.log('\n===', n, '===')
  console.log(JSON.stringify(h.slice(i, i + 350)))
}
