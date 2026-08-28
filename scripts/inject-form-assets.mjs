import fs from 'node:fs'
import path from 'node:path'

const roots = ['public/cyan', 'public/ru', 'public/en']
const cssTag = '<link rel="stylesheet" href="/tdyu-site-form.css" />'
const jsTag = '<script src="/tdyu-site-form.js" defer></script>'
let cssN = 0
let jsN = 0

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (ent.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf8')
      let changed = false
      if (!html.includes('tdyu-site-form.css') && html.includes('</head>')) {
        html = html.replace('</head>', `${cssTag}\n</head>`)
        cssN++
        changed = true
      }
      if (!html.includes('tdyu-site-form.js')) {
        if (html.includes('tdyu-cms.js')) {
          html = html.replace(
            '<script src="/tdyu-cms.js" defer></script>',
            `${jsTag}\n<script src="/tdyu-cms.js" defer></script>`,
          )
          jsN++
          changed = true
        } else if (html.includes('</head>')) {
          html = html.replace('</head>', `${jsTag}\n</head>`)
          jsN++
          changed = true
        }
      }
      if (changed) fs.writeFileSync(p, html)
    }
  }
}

for (const root of roots) {
  if (fs.existsSync(root)) walk(root)
}
console.log({ cssN, jsN })
