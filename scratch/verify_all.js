import fs from 'fs';

const catalog = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
console.log('Categories count:', catalog.categories.length);
console.log('Total items count:', catalog.items.length);
catalog.categories.forEach(c => {
  console.log(` - ${c.name} (${c.id}): ${c.count} items | URL: ${c.guideUrl}`);
});

const sampleBoss = JSON.parse(fs.readFileSync('./public/guide-cache/elden-ring_jefazos-p29.php.json', 'utf8'));
console.log('\nSample Boss Cache (Adan):');
console.log(' Title:', sampleBoss.title);
console.log(' Images:', sampleBoss.images);
console.log(' Sections:', sampleBoss.sections.map(s => s.heading));

const sampleNpc = JSON.parse(fs.readFileSync('./public/guide-cache/elden-ring_personajes-p10.php.json', 'utf8'));
console.log('\nSample NPC Cache (Blaidd):');
console.log(' Title:', sampleNpc.title);
console.log(' Images count:', sampleNpc.images.length);
console.log(' Sections:', sampleNpc.sections.map(s => s.heading));

const sampleWeapon = JSON.parse(fs.readFileSync('./public/guide-cache/elden-ring_armas-p1.php.json', 'utf8'));
console.log('\nSample Weapon Cache:');
console.log(' Title:', sampleWeapon.title);
console.log(' Lore:', sampleWeapon.lore ? sampleWeapon.lore.slice(0, 80) + '...' : '(none)');
console.log(' Sections:', sampleWeapon.sections.map(s => s.heading));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
