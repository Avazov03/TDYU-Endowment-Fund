/**
 * Hide IA-marked (⚠) menu/footer items sitewide.
 * - Saves inventory to _archive/hidden-ia-items.json (recoverable)
 * - Keeps "Sahifalar" parent visible (holds Alumni/Loyihalar/Grantlar/Tadbirlar)
 * - Adds class tdyu-ia-hide to other marked <li.menu-item>
 * - Ensures tdyu-menu-mark.css is linked
 */
import fs from 'node:fs'
import path from 'node:path'

const cyan = 'public/cyan'
const archiveDir = '_archive'
const KEEP_PARENTS = new Set(['Sahifalar', '⚠ Sahifalar'])

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['wp-content', 'wp-includes', 'wp-json'].includes(e.name)) continue
      walk(p, out)
    } else if (e.name === 'index.html' || e.name.endsWith('.html')) out.push(p)
  }
  return out
}

function stripWarn(label) {
  return label.replace(/^⚠\s*/g, '').replace(/^⚠\s*/g, '').trim()
}

function findLiOpenStart(html, spanIndex) {
  // Walk back to the nearest <li ...> that opens this menu item
  let i = spanIndex
  while (i >= 0) {
    const li = html.lastIndexOf('<li', i)
    if (li < 0) return -1
    const gt = html.indexOf('>', li)
    if (gt > spanIndex) {
      // li tag wraps past span — wrong; continue
      i = li - 1
      continue
    }
    // Ensure this li is a menu-item
    const tag = html.slice(li, gt + 1)
    if (/\bmenu-item\b/.test(tag)) return li
    i = li - 1
  }
  return -1
}

function addHideClass(liOpenTag) {
  if (/\btdyu-ia-hide\b/.test(liOpenTag)) return liOpenTag
  if (/class="/.test(liOpenTag)) {
    return liOpenTag.replace(/class="/, 'class="tdyu-ia-hide ')
  }
  return liOpenTag.replace('<li', '<li class="tdyu-ia-hide"')
}

function unmarkSahifalar(html) {
  // ⚠ Sahifalar → Sahifalar (keep group)
  return html
    .split(
      'menu-item-text" style="color:#dc2626!important;font-weight:700">⚠ Sahifalar</span>',
    )
    .join('menu-item-text">Sahifalar</span>')
    .split('menu-item-text">⚠ Sahifalar</span>')
    .join('menu-item-text">Sahifalar</span>')
}

function processHtml(html, inventory) {
  let h = unmarkSahifalar(html)

  // Collect marked spans
  const re =
    /<span class="menu-item-text"(?: style="color:#dc2626!important;font-weight:700")?>⚠[^<]*<\/span>/g
  const matches = [...h.matchAll(re)]

  // Process from end so indices stay valid
  for (let m = matches.length - 1; m >= 0; m--) {
    const match = matches[m]
    const label = match[0].replace(/<[^>]+>/g, '').trim()
    const clean = stripWarn(label)
    if (KEEP_PARENTS.has(label) || KEEP_PARENTS.has(clean) || clean === 'Sahifalar') {
      inventory.keptParents.add(clean)
      continue
    }

    inventory.hidden.add(label)
    const liStart = findLiOpenStart(h, match.index)
    if (liStart < 0) continue
    const gt = h.indexOf('>', liStart)
    const open = h.slice(liStart, gt + 1)
    const next = addHideClass(open)
    if (next !== open) {
      h = h.slice(0, liStart) + next + h.slice(gt + 1)
      inventory.hideOps++
    }
  }

  // Footer / misc links that show ⚠ but may not be menu-item-text
  // Hide list items whose anchor text starts with ⚠
  h = h.replace(
    /(<li\b[^>]*)(>\s*<a\b[^>]*>\s*⚠[^<]*)/g,
    (full, open, rest) => {
      if (/\btdyu-ia-hide\b/.test(open)) return full
      inventory.hidden.add(rest.replace(/<[^>]+>/g, '').trim().slice(0, 80))
      inventory.hideOps++
      if (/class="/.test(open)) return open.replace(/class="/, 'class="tdyu-ia-hide ') + rest
      return open.replace('<li', '<li class="tdyu-ia-hide"') + rest
    },
  )

  // Ensure CSS link
  if (!h.includes('tdyu-menu-mark.css')) {
    h = h.replace(
      '</head>',
      '<link rel="stylesheet" href="/tdyu-menu-mark.css" />\n</head>',
    )
    inventory.cssInject++
  }

  return h
}

fs.mkdirSync(archiveDir, { recursive: true })

const inventory = {
  keptParents: new Set(),
  hidden: new Set(),
  hideOps: 0,
  cssInject: 0,
  filesTouched: 0,
}

const files = walk(cyan)
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8')
  if (!before.includes('⚠') && before.includes('tdyu-menu-mark.css')) continue
  if (!before.includes('⚠') && !before.includes('</head>')) continue
  const after = processHtml(before, inventory)
  if (after !== before) {
    fs.writeFileSync(file, after)
    inventory.filesTouched++
  }
}

const payload = {
  savedAt: new Date().toISOString(),
  note:
    'These menu/footer items were marked ⚠ (unnecessary for endowment IA) and hidden with CSS class tdyu-ia-hide. To restore: remove tdyu-ia-hide from HTML or delete the hide rules in public/tdyu-menu-mark.css. Sahifalar parent was kept as a navigation group.',
  keptAsVisibleParents: [...inventory.keptParents].sort(),
  hiddenLabels: [...inventory.hidden].sort(),
  stats: {
    filesTouched: inventory.filesTouched,
    hideOps: inventory.hideOps,
    cssInject: inventory.cssInject,
  },
  restoreHint: {
    showAgain: 'Delete or comment out .tdyu-ia-hide{display:none!important} in public/tdyu-menu-mark.css',
    hardRemoveLater: 'Optionally delete the HTML nodes with class tdyu-ia-hide once confirmed unused',
  },
}

fs.writeFileSync(
  path.join(archiveDir, 'hidden-ia-items.json'),
  JSON.stringify(payload, null, 2),
  'utf8',
)

// Human-readable copy
const md = `# Yashirilgan (⚠) menyu bandlari

Saqlangan: ${payload.savedAt}

Sahifa toza ko‘rinsin deb ⚠ bandlar CSS orqali yashirildi (\`.tdyu-ia-hide\`).
HTML o‘chirilmagan — keyin kerak bo‘lsa qayta ko‘rsatish mumkin.

## Ko‘rinadigan qoldirilgan ota-band
${payload.keptAsVisibleParents.map((x) => `- ${x}`).join('\n') || '- (yo‘q)'}

## Yashirilgan yorliqlar
${payload.hiddenLabels.map((x) => `- ${x}`).join('\n')}

## Qayta ko‘rsatish
\`public/tdyu-menu-mark.css\` ichida \`.tdyu-ia-hide { display: none !important; }\` qatorini o‘chiring yoki izohga oling.
`

fs.writeFileSync(path.join(archiveDir, 'HIDDEN-MENUS.md'), md, 'utf8')

console.log('files', inventory.filesTouched, 'hideOps', inventory.hideOps, 'css', inventory.cssInject)
console.log('hidden labels', inventory.hidden.size)
console.log('kept parents', [...inventory.keptParents])
