import fs from 'fs';

const catalog = JSON.parse(fs.readFileSync('src/data/checklistCatalog.json', 'utf8'));

// Build byName map
const byName = new Map();
catalog.items.forEach(item => {
  byName.set(item.name.toLowerCase().trim(), item);
});

// Let's inspect 5 sample boss cache files
const bossFiles = fs.readdirSync('public/guide-cache').filter(f => f.startsWith('elden-ring_jefazos')).slice(0, 10);

console.log('Testing 10 bosses rewards:');
for (const file of bossFiles) {
  const data = JSON.parse(fs.readFileSync(`public/guide-cache/${file}`, 'utf8'));
  const rewardSection = data.sections.find(s => s.heading.toLowerCase().includes('recompensa') || s.heading.toLowerCase().includes('recomspensa'));
  if (rewardSection) {
    console.log(`\nBoss: ${data.title}`);
    for (const line of rewardSection.lines) {
      // Clean bullet points
      const cleanLine = line.replace(/^[-•*]\s*/, '').trim().toLowerCase();
      const match = byName.get(cleanLine);
      if (match) {
        console.log(`  ✓ FOUND ITEM: "${line}" -> [${match.category}] ${match.name} (id: ${match.id})`);
      } else {
        console.log(`    Line: "${line}"`);
      }
    }
  }
}
