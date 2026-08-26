import fs from 'node:fs'
import path from 'node:path'

const root = 'public/cyan'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

const re = />([^<>{}]{3,120})</g
const counts = new Map()

for (const file of walk(root)) {
  let h = fs.readFileSync(file, 'utf8')
  h = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  let m
  while ((m = re.exec(h))) {
    const t = m[1].replace(/\s+/g, ' ').trim()
    // English letter words present, few Uzbek markers
    const letters = (t.match(/[A-Za-z]/g) || []).join(' ')
    if (letters.length < 6) continue
    if (!/[A-Za-z]{4,}/.test(t)) continue
    if (/^(svg|path|http|www|wp-|menu-|elementor|function|var |const )/i.test(t)) continue
    if (/\.(png|jpg|js|css|html|svg|woff)/i.test(t)) continue
    // has common English function words or Capitalized English phrase
    if (
      /\b(the|and|for|with|your|our|from|this|that|are|was|have|will|can|all|new|more|about|page|post|view|click|here|now|best|students|university|program|course|apply|learn|read|join|meet|find|get|see|book|call|send|start|open|close|next|back|home|blog|news|event|faculty|campus|tuition|admission|welcome|explore|discover|follow|contact|search|submit|download|register|login|password|email|phone|address|required|optional|success|error|loading|previous|details|overview|description)\b/i.test(
        t,
      ) ||
      /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,6}$/.test(t)
    ) {
      // skip person names-ish if 2 tokens both capitalized short
      if (/^(Dr|Prof|Mr|Ms)\b/.test(t)) continue
      counts.set(t, (counts.get(t) || 0) + 1)
    }
  }
}

;[...counts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 100)
  .forEach(([t, c]) => console.log(`${c}\t${t}`))
