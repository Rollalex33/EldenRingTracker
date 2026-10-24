const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const vc = JSON.parse(fs.readFileSync('./scratch/videochums_base.json', 'utf8'));

const baseAshes = cat.items.filter(i => i.category === 'cenizas-guerra' && !i.isDlc);
console.log('VC ashes (91):');
vc.ashesOfWar.forEach((name, i) => console.log((i+1) + ': ' + name));

console.log('\nCatalog ashes names (without Ceniza de Guerra: prefix):');
baseAshes.map(i => i.name.replace(/^Ceniza de Guerra:\s*/, '')).sort().forEach((name, i) => console.log((i+1) + ': ' + name));
