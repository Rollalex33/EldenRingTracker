const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const vc = JSON.parse(fs.readFileSync('./scratch/videochums_base.json', 'utf8'));

console.log('--- SORCERIES ---');
console.log('VC count:', vc.sorceries.length);
const catalogSorceries = cat.items.filter(i => i.category === 'hechizos');
console.log('Catalog sorceries count:', catalogSorceries.length, 'Base:', catalogSorceries.filter(i => !i.isDlc).length, 'DLC:', catalogSorceries.filter(i => i.isDlc).length);

console.log('--- INCANTATIONS ---');
console.log('VC count:', vc.incantations.length);
const catalogIncants = cat.items.filter(i => i.category === 'encantamientos');
console.log('Catalog incantations count:', catalogIncants.length, 'Base:', catalogIncants.filter(i => !i.isDlc).length, 'DLC:', catalogIncants.filter(i => i.isDlc).length);

console.log('--- TALISMANS ---');
console.log('VC count:', vc.talismans.length);
const catalogTalismans = cat.items.filter(i => i.category === 'talismanes');
console.log('Catalog talismans count:', catalogTalismans.length, 'Base:', catalogTalismans.filter(i => !i.isDlc).length, 'DLC:', catalogTalismans.filter(i => i.isDlc).length);

console.log('--- ASHES OF WAR ---');
console.log('VC count:', vc.ashesOfWar.length);
const catalogAshes = cat.items.filter(i => i.category === 'cenizas-guerra');
console.log('Catalog ashes count:', catalogAshes.length, 'Base:', catalogAshes.filter(i => !i.isDlc).length, 'DLC:', catalogAshes.filter(i => i.isDlc).length);
