/**
 * Dump blog page/2 article blocks + EN leftovers for perfecting Yangiliklar.
 */
import fs from 'node:fs'

const files = ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8')
  console.log('\n########', f)

  // breadcrumb / page title area
  for (const needle of [
    'breadcrumb',
    'page-title',
    'rs-breadcrumbs',
    'Blog',
    'Yangiliklar',
    'Bo‘limlar',
    'Categories',
    'Recent',
    'So‘nggi',
    'Qidirish',
    'Search',
    'Educations',
    'University',
    'Research',
    'Batafsil',
    'Read More',
    'Comments Feed',
    'tag-business',
  ]) {
    const i = h.indexOf(needle)
    if (i >= 0) console.log('found', needle, 'at', i)
  }

  // extract articles: post-title ... read-more
  let idx = 0
  let n = 0
  while (n < 12) {
    const a = h.indexOf('class="post-title"', idx)
    if (a < 0) break
    const chunk = h.slice(a, a + 900)
    const title = chunk.match(/rel="bookmark">([^<]+)/)?.[1]
    const excerpt = chunk.match(/<\/h3><p>([^<]*)<\/p>/)?.[1]
    const cat = chunk.match(/category[^>]*>[\s\S]*?<a[^>]*>([^<]+)/)?.[1]
    // also categories in post-meta
    const cats = [...chunk.matchAll(/\/category\/[^"]+"[^>]*>([^<]+)/g)].map((m) => m[1])
    console.log(`#${n + 1}`, { title, excerpt, cats })
    idx = a + 20
    n++
  }

  // sidebar recent posts titles
  const rp = h.indexOf('So‘nggi yangiliklar')
  const rp2 = h.indexOf('Recent Posts')
  console.log('sidebar heading idx', rp, rp2)
  if (rp > 0 || rp2 > 0) {
    const start = Math.max(rp, rp2)
    const side = h.slice(start, start + 2500)
    const recentTitles = [...side.matchAll(/rel="bookmark">([^<]+)|title="([^"]+)"/g)].map(
      (m) => m[1] || m[2],
    )
    console.log('recent-ish', [...new Set(recentTitles)].slice(0, 15))
  }

  // category widget links
  const catBlock = h.match(/Bo‘limlar<\/h4>[\s\S]{0,2000}|Categories<\/h4>[\s\S]{0,2000}/)
  if (catBlock) {
    const names = [...catBlock[0].matchAll(/>([A-Za-z‘’'\- ]+)<\/a>/g)].map((m) => m[1].trim())
    console.log('category names sample', names.slice(0, 20))
  }
}
