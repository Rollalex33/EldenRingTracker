const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const vc = JSON.parse(fs.readFileSync('./scratch/videochums_base.json', 'utf8'));

const baseIncants = cat.items.filter(i => i.category === 'encantamientos' && !i.isDlc);
console.log('VC Incantations (101):');
vc.incantations.forEach((name, i) => console.log((i+1) + ': ' + name));

console.log('\nCatalog Incantations (101):');
baseIncants.map(i => i.name).sort().forEach((name, i) => console.log((i+1) + ': ' + name));
