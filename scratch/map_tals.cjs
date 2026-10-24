const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const vc = JSON.parse(fs.readFileSync('./scratch/videochums_base.json', 'utf8'));

const baseTals = cat.items.filter(i => i.category === 'talismanes' && !i.isDlc);
console.log('VC unique talismans (stripping +1, +2):');
const uniqueVc = [];
vc.talismans.forEach(t => {
  const clean = t.replace(/\s*\+\d+$/, '').trim();
  if (!uniqueVc.includes(clean)) uniqueVc.push(clean);
});
console.log('VC unique count:', uniqueVc.length);
console.log('Catalog count:', baseTals.length);

console.log('Catalog talismans:');
baseTals.map(i => i.name).sort().forEach((name, i) => console.log((i+1) + ': ' + name));
