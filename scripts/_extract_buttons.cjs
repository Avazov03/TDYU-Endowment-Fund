const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

for (const rel of [
  'public/cyan/how-to-apply/index.html',
  'public/cyan/admission-requirements/index.html',
  'public/cyan/tuition-fee/index.html',
]) {
  const raw = fs.readFileSync(path.join(root, rel), 'utf8');
  const html = raw.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  console.log('\n====', rel, '====');
  // rs-button / a.btn labels
  const btns = [...html.matchAll(/<(?:a|button)\b[^>]*class="[^"]*(?:btn|rs-button|elementor-button)[^"]*"[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  console.log('BUTTONS/CTAs:', [...new Set(btns)]);

  // sub-text spans
  const subs = [...html.matchAll(/class="sub-text[^"]*"[^>]*>\s*([^<]+)/gi)].map(m => m[1].trim());
  console.log('SUB-TEXT:', [...new Set(subs)]);

  // breadcrumb current
  const crumbs = [...html.matchAll(/breadcrumb[\s\S]{0,800}/gi)].slice(0,1).map(m => {
    return [...m[0].matchAll(/>([^<]{2,80})</g)].map(x => x[1].trim()).filter(t => t && !/^[\s\/|>]+$/.test(t));
  });
  console.log('CRUMB SAMPLE:', crumbs[0]?.filter(t => /[A-Za-zА-Яа-яЎўҚқҒғҲҳ‘’']/.test(t)).slice(0,20));
}
