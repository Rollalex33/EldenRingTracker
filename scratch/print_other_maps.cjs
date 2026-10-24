const fs = require('fs');

const locs = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));

console.log('=== UNDERGROUND (29) ===');
locs.filter(l => l.mapaOrigen === 'underground').forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.id}] (${l.categoria}): "${l.titulo}" -> [${l.coords}]`);
});

console.log('\n=== DLC (25) ===');
locs.filter(l => l.mapaOrigen === 'dlc').forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.id}] (${l.categoria}): "${l.titulo}" -> [${l.coords}]`);
});
