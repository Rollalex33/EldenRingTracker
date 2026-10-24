import fs from 'fs';

const catalog = JSON.parse(fs.readFileSync('src/data/checklistCatalog.json', 'utf8'));

// Build lookup maps
const byName = new Map();
const byFileKey = new Map();

catalog.items.forEach(item => {
  byName.set(item.name.toLowerCase(), item);
  byFileKey.set(item.fileKey, item);
});

console.log('Catalog items loaded:', catalog.items.length);

// Test matching on Adan's rewards
const sampleRewardLines = ["3.800 runas", "Llama del dios caído"];

sampleRewardLines.forEach(line => {
  const match = byName.get(line.trim().toLowerCase());
  if (match) {
    console.log(`Matched "${line}" -> Item: ${match.name} (${match.category}, id=${match.id}, url=${match.url})`);
  } else {
    console.log(`No match for: "${line}"`);
  }
});
