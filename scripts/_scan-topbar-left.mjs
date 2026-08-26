import fs from 'node:fs'

const tuition = fs.readFileSync('public/cyan/tuition-fee/index.html', 'utf8')
const tabs = [...tuition.matchAll(/e-n-tab-title-text">\s*([^<]+)\s*</g)].map((x) => x[1].trim())
console.log('tuition tabs:', tabs)

const yordam = fs.readFileSync('public/cyan/how-to-apply/index.html', 'utf8')
console.log('yordam Qabul:', yordam.includes('Qabul'))
for (const t of ['supporting', 'tuition fees', 'First Name', 'Each academic', 'high-quality']) {
  if (yordam.includes(t)) console.log('yordam still:', t)
}

const huquq = fs.readFileSync('public/cyan/admission-requirements/index.html', 'utf8')
console.log('huquq title has Huquqiy:', huquq.includes('Huquqiy asos'))
for (const t of ['Admission', 'GPA', 'transcript', 'English', 'Requirements']) {
  if (huquq.includes(t)) console.log('huquq still:', t)
}

const xayriya = fs.readFileSync('public/cyan/apply-now/index.html', 'utf8')
console.log('xayriya title snippet:', (xayriya.match(/<title>[^<]+/) || [])[0])
for (const t of ['Apply Now', 'First Name', 'Tuition', 'Application', 'Submit']) {
  if (xayriya.includes(t)) console.log('xayriya still:', t)
}

const shaff = fs.readFileSync('public/cyan/cost-financial-aid/index.html', 'utf8')
console.log('shaff title snippet:', (shaff.match(/<title>[^<]+/) || [])[0])
for (const t of ['Financial', 'Tuition', 'Cost', 'Aid', 'Scholarship']) {
  if (shaff.includes(t)) console.log('shaff still:', t)
}
