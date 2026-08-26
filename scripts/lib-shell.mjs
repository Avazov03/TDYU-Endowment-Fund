/**
 * Extract head/scripts shell; use slim TDYU header/footer chrome.
 */
import fs from 'node:fs'
import path from 'node:path'
import { buildFooter, buildHeader } from './build-chrome.mjs'

export function extractShell(html) {
  const headEnd = html.indexOf('</head>')
  const bodyOpen = html.match(/<body[^>]*>/i)
  if (!bodyOpen || headEnd < 0) throw new Error('Invalid HTML shell')

  const head = html.slice(0, headEnd + '</head>'.length)
  const bodyTag = bodyOpen[0]

  // Scripts near end of original page (theme JS)
  let scripts = ''
  const bodyClose = html.search(/<\/body>/i)
  if (bodyClose > 0) {
    const chunk = html.slice(Math.max(0, bodyClose - 80000), bodyClose)
    const found = [...chunk.matchAll(/<script\b[\s\S]*?<\/script>/gi)].map((m) => m[0])
    // Prefer last ~15 scripts (footer area), avoid duplicating huge inline blocks if possible
    scripts = found.slice(-20).join('\n')
  }

  return { head, bodyTag, scripts }
}

export function writePage({ outPath, title, bodyHtml, shellFrom }) {
  const src = fs.readFileSync(shellFrom, 'utf8')
  const shell = extractShell(src)
  let head = shell.head
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/lang="[^"]*"/i, 'lang="uz"')

  if (!head.includes('tdyu-endowment-sections.css')) {
    head = head.replace(
      '</head>',
      '<link rel="stylesheet" href="/tdyu-endowment-sections.css" />\n<link rel="stylesheet" href="/tdyu-local-fonts.css" />\n</head>',
    )
  }

  const html = `${head}
${shell.bodyTag}
<div id="univet-page" class="univet-page-wrapper">
${buildHeader()}
<main class="tdyu-main">
${bodyHtml}
</main>
${buildFooter()}
</div>
<script defer src="/tdyu-endowment.js"></script>
</body></html>
`

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
}
