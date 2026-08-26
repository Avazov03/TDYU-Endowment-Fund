import fs from 'node:fs'

for (const f of ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']) {
  const h = fs.readFileSync(f, 'utf8')
  const titles = [...h.matchAll(/rel="bookmark">([^<]+)</g)].map((m) => m[1])
  const excerpts = [...h.matchAll(/<\/h3><p>([^<]*)<\/p>/g)].map((m) => m[1])
  console.log('\n===', f)
  console.log('titles:', [...new Set(titles)])
  console.log('excerpts:', [...new Set(excerpts)])
  for (const en of [
    'Comments',
    'Search Keyword',
    'Recent Posts',
    'Categories',
    'Posts',
    'Read More',
    'Leave a',
    'University of',
    'Univet',
    'Learning Maximizing',
    'Blog',
    'Archive',
  ]) {
    if (h.includes(en)) console.log(' EN leftover:', en)
  }
}
