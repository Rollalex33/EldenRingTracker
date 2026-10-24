const fs = require('fs');

const locs = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));
const scriptContent = fs.readFileSync('scripts/recalibratePrecisionCoords.cjs', 'utf8');

locs.filter(l => l.mapaOrigen === 'surface' || !l.mapaOrigen).forEach(l => {
  if (!scriptContent.includes(`'${l.id}'`)) {
    console.log('Uncalibrated surface loc:', l.id, '->', l.titulo, l.coords);
  }
});
