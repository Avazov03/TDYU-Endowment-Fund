import fs from 'node:fs'
import path from 'node:path'

const homes = [
  'public/cyan/index.html',
  'public/ru/index.html',
  'public/en/index.html',
]
const css = '<link rel="stylesheet" href="/tdyu-home-stats.css" />'
const js = '<script src="/tdyu-home-stats.js" defer></script>'

for (const file of homes) {
  if (!fs.existsSync(file)) continue
  let html = fs.readFileSync(file, 'utf8')
  let changed = false
  if (!html.includes('tdyu-home-stats.css') && html.includes('</head>')) {
    html = html.replace('</head>', `${css}\n</head>`)
    changed = true
  }
  if (!html.includes('tdyu-home-stats.js')) {
    if (html.includes('tdyu-cms.js')) {
      html = html.replace(
        '<script src="/tdyu-cms.js" defer></script>',
        `<script src="/tdyu-cms.js" defer></script>\n${js}`,
      )
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', `${js}\n</head>`)
    }
    changed = true
  }
  if (changed) {
    fs.writeFileSync(file, html)
    console.log('patched', file)
  } else {
    console.log('skip', file)
  }
}
