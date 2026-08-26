import fs from 'node:fs'
const h = fs.readFileSync('public/cyan/index.html', 'utf8')
const i = h.indexOf('cyan-left-side-1-min')
console.log('idx', i)
console.log(h.slice(i - 500, i + 400).replace(/></g, '>\n<'))

// also search for files that might be circular logo
import {execSync} from 'node:child_process'
const out = execSync('rg -l "cyan-m-logo|m-logo|Asset-2-11|logo-cyan" public/cyan/wp-content/uploads 2>nul || echo none', {encoding:'utf8'})
console.log(out)
