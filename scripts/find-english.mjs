import fs from 'node:fs'
import path from 'node:path'

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f, a)
    else if (/\.html?$/i.test(e.name)) a.push(f)
  }
  return a
}

const re = />([A-Za-z][A-Za-z0-9 ,.'&:;!?\-/]{4,100})</g
const counts = new Map()
const skipName =
  /circle_|clouds_|Dr\.|Prof\.|Leslie|Henry|Sofia|Richard|Abdur|Brish|Alen|Whitman|Roberts|Anderson|Collin|Martinez|Foster|Allen|Walker|Rashid|Jhonson|Alexander|info@/

for (const file of walk('public/cyan')) {
  let h = fs.readFileSync(file, 'utf8')
  h = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  let m
  while ((m = re.exec(h))) {
    const t = m[1].replace(/\s+/g, ' ').trim()
    if (skipName.test(t)) continue
    if (
      /\b(the|and|for|with|your|our|from|this|that|are|was|have|will|can|all|new|more|about|page|post|view|click|here|now|best|students|university|program|course|apply|learn|read|join|meet|find|get|see|book|call|send|start|open|close|next|back|home|blog|news|event|faculty|campus|tuition|admission)\b/i.test(
        t,
      )
    ) {
      counts.set(t, (counts.get(t) || 0) + 1)
    }
  }
}

;[...counts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 80)
  .forEach(([t, c]) => console.log(`${c}\t${t}`))
