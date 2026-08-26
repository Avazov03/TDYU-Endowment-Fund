/**
 * Extract visible EN leftovers from Yangiliklar pages (exact snippets).
 */
import fs from 'node:fs'

const needles = [
  'Learning Maximizing',
  'Building Leadership',
  'Comments',
  'Blog',
  'Univet',
  'University',
  'Educations',
  'Research',
  'Business',
  'Consulting',
  'Services',
  'Read More',
  'Leave a',
  'Search Keyword',
  'Recent Posts',
  'Categories',
  'Posts pagination',
  'January',
  'February',
  'March',
  'April',
  'May ',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'By ',
  'Posted',
  'page-title',
]

for (const f of ['public/cyan/blog/index.html', 'public/cyan/blog/page/2/index.html']) {
  const h = fs.readFileSync(f, 'utf8')
  console.log('\n##', f)
  for (const n of needles) {
    let from = 0
    let c = 0
    while (c < 3) {
      const i = h.indexOf(n, from)
      if (i < 0) break
      const snip = h.slice(Math.max(0, i - 40), i + n.length + 60).replace(/\s+/g, ' ')
      console.log(`  [${n}]`, snip)
      from = i + n.length
      c++
    }
  }

  // breadcrumb area
  const bi = h.indexOf('page-title')
  if (bi > 0) console.log(' page-title area:', h.slice(bi, bi + 400).replace(/\s+/g, ' '))
}
