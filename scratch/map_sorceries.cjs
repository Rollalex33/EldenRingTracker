const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const vc = JSON.parse(fs.readFileSync('./scratch/videochums_base.json', 'utf8'));

const baseSorceries = cat.items.filter(i => i.category === 'hechizos' && !i.isDlc);
console.log('VC Sorceries (70):');
vc.sorceries.forEach((name, i) => console.log((i+1) + ': ' + name));

console.log('\nCatalog Sorceries (70):');
baseSorceries.forEach((item, i) => console.log((i+1) + ': ' + item.name));
