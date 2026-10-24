const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const {
  SPIRIT_ASHES_INVENTORY_ORDER,
  SORCERIES_INVENTORY_ORDER,
  INCANTATIONS_INVENTORY_ORDER,
  TALISMANS_INVENTORY_ORDER,
  ASHES_OF_WAR_INVENTORY_ORDER
} = require('./test_lists_full.cjs');

function getItemInventoryRank(item) {
  if (!item || !item.category) return -1;
  if (item.category === 'cenizas-espiritus') {
    return SPIRIT_ASHES_INVENTORY_ORDER.indexOf(item.name);
  }
  if (item.category === 'hechizos') {
    return SORCERIES_INVENTORY_ORDER.indexOf(item.name);
  }
  if (item.category === 'encantamientos') {
    return INCANTATIONS_INVENTORY_ORDER.indexOf(item.name);
  }
  if (item.category === 'talismanes') {
    return TALISMANS_INVENTORY_ORDER.indexOf(item.name);
  }
  if (item.category === 'cenizas-guerra') {
    return ASHES_OF_WAR_INVENTORY_ORDER.indexOf(item.name);
  }
  return -1;
}

function sortItems(items, sortOrder = 'game') {
  if (sortOrder === 'alpha') {
    return [...items].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }
  return [...items].sort((a, b) => {
    const rankA = getItemInventoryRank(a);
    const rankB = getItemInventoryRank(b);
    if (rankA !== -1 && rankB !== -1) {
      return rankA - rankB;
    }
    return a.name.localeCompare(b.name, 'es');
  });
}

// 1. All Spirit Ashes
const allAshes = cat.items.filter(i => i.category === 'cenizas-espiritus');
const sortedAll = sortItems(allAshes);
console.log('All Spirit Ashes (84):');
console.log('First 3:', sortedAll.slice(0, 3).map(i => i.name));
console.log('Last 3:', sortedAll.slice(-3).map(i => i.name));

// 2. Base Spirit Ashes
const baseAshes = allAshes.filter(i => !i.isDlc);
const sortedBase = sortItems(baseAshes);
console.log('\nBase Spirit Ashes (51):');
console.log('First 3:', sortedBase.slice(0, 3).map(i => i.name));
console.log('Last 3:', sortedBase.slice(-3).map(i => i.name));

// 3. DLC Spirit Ashes
const dlcAshes = allAshes.filter(i => i.isDlc);
const sortedDlc = sortItems(dlcAshes);
console.log('\nDLC Spirit Ashes (33):');
console.log('First 3:', sortedDlc.slice(0, 3).map(i => i.name));
console.log('Last 3:', sortedDlc.slice(-3).map(i => i.name));

// 4. Search 'diablillo'
const searchDiablillo = allAshes.filter(i => i.name.toLowerCase().includes('diablillo'));
const sortedDiablillo = sortItems(searchDiablillo);
console.log('\nSearch "diablillo":', sortedDiablillo.map(i => i.name));
