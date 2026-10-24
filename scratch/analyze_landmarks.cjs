const fs = require('fs');

const locs = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));
const quests = JSON.parse(fs.readFileSync('src/data/questlines.json', 'utf8'));

console.log('Total locations:', locs.length);
console.log('Surface locations:', locs.filter(l => l.mapaOrigen === 'surface' || !l.mapaOrigen).length);

// Let's print out all unique titles or IDs of surface locations to categorize them
const categories = {};
locs.forEach(l => {
  const cat = l.categoria || 'other';
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push({ id: l.id, titulo: l.titulo, coords: l.coords, region: l.region });
});

for (const [cat, items] of Object.entries(categories)) {
  console.log(`\n=== CATEGORY: ${cat} (${items.length} items) ===`);
  items.slice(0, 5).forEach(i => console.log(`  ${i.id}: [${i.coords}] - ${i.titulo} (${i.region})`));
}
