const fs = require('fs');

const locs = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));

const out = [];
locs.filter(l => l.mapaOrigen === 'surface' || !l.mapaOrigen).forEach((l, idx) => {
  out.push(`${idx + 1}. [${l.id}] (${l.categoria}): "${l.titulo}" -> [${l.coords}]`);
});
fs.writeFileSync('scratch/all_surface_locs.txt', out.join('\n'), 'utf8');
console.log('Written utf8, count:', out.length);
