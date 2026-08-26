/**
 * Remove clipped Xayriya subtitle under heading.
 */
import fs from 'node:fs'

const file = 'public/cyan/index.html'
let h = fs.readFileSync(file, 'utf8')

const from =
  '<div class="descripti"><p>Fondni qo‘llab-quvvatlang — bilim va grantlarga sarmoya.</p></div>'
const alt =
  '<div class="descripti"><p>Fondni qo\'llab-quvvatlang — bilim va grantlarga sarmoya.</p></div>'

if (h.includes(from)) {
  h = h.split(from).join('')
  console.log('removed descripti block')
} else if (h.includes(alt)) {
  h = h.split(alt).join('')
  console.log('removed alt apostrophe')
} else if (h.includes('Fondni qo‘llab-quvvatlang — bilim va grantlarga sarmoya.')) {
  h = h.split('Fondni qo‘llab-quvvatlang — bilim va grantlarga sarmoya.').join('')
  console.log('removed text only')
} else {
  console.log('not found')
}

fs.writeFileSync(file, h)
console.log('left', h.includes('Fondni qo‘llab-quvvatlang'))
