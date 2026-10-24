const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const ashes = cat.items.filter(i => i.category === 'cenizas-guerra');
console.log('Total ashes count:', ashes.length);

const baseAshes = ashes.filter(i => !i.isDlc);
const dlcAshes = ashes.filter(i => i.isDlc);
console.log('Base ashes:', baseAshes.length, 'DLC ashes:', dlcAshes.length);
console.log('Base non-ash items:', baseAshes.filter(i => !i.name.startsWith('Ceniza de Guerra')).map(i => i.name));
console.log('DLC non-ash items:', dlcAshes.filter(i => !i.name.startsWith('Ceniza de Guerra')).map(i => i.name));
