import fs from 'node:fs'

const h = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
// Get text after each h6 until next heading-ish
const re = /<(h[346]|h5)[^>]*>\s*([^<]+)\s*<\/\1>[\s\S]{0,800}/gi
let m
let n = 0
while ((m = re.exec(h)) && n < 25) {
  const title = m[2].trim()
  const chunk = m[0]
  // strip tags for preview
  const text = chunk
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 280)
  console.log('\n##', title)
  console.log(text)
  n++
}
