const fs = require('fs');

async function getList(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const html = await res.text();
  const matches = [...html.matchAll(/<li>\s*<label[^>]*>\s*<input[^>]*>\s*([^<]+)<\/label>/g)].map(m => m[1].trim());
  return matches;
}

async function main() {
  const talismans = await getList('https://videochums.com/article/elden-ring-all-talismans-checklist');
  const sorceries = await getList('https://videochums.com/article/elden-ring-all-sorceries-checklist');
  const incantations = await getList('https://videochums.com/article/elden-ring-all-incantations-checklist');
  const ashesOfWar = await getList('https://videochums.com/article/elden-ring-all-ashes-of-war-checklist');

  const data = {
    talismans,
    sorceries,
    incantations,
    ashesOfWar
  };

  fs.writeFileSync('./scratch/videochums_base.json', JSON.stringify(data, null, 2));
  console.log('Saved to scratch/videochums_base.json');
  console.log('Counts:', {
    talismans: talismans.length,
    sorceries: sorceries.length,
    incantations: incantations.length,
    ashesOfWar: ashesOfWar.length
  });
}

main().catch(console.error);
