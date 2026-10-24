const fs = require('fs');
const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));

// Test script verifying that all items in each category are present
const {
  SPIRIT_ASHES_INVENTORY_ORDER,
  SORCERIES_INVENTORY_ORDER,
  INCANTATIONS_INVENTORY_ORDER,
  TALISMANS_INVENTORY_ORDER,
  ASHES_OF_WAR_INVENTORY_ORDER
} = require('./test_lists_full.cjs');

const tests = [
  { cat: 'cenizas-espiritus', list: SPIRIT_ASHES_INVENTORY_ORDER },
  { cat: 'hechizos', list: SORCERIES_INVENTORY_ORDER },
  { cat: 'encantamientos', list: INCANTATIONS_INVENTORY_ORDER },
  { cat: 'talismanes', list: TALISMANS_INVENTORY_ORDER },
  { cat: 'cenizas-guerra', list: ASHES_OF_WAR_INVENTORY_ORDER }
];

tests.forEach(t => {
  const items = cat.items.filter(i => i.category === t.cat);
  const notFound = items.filter(i => !t.list.includes(i.name));
  console.log(`Category: ${t.cat} | Total catalog: ${items.length} | Defined list: ${t.list.length} | Missing: ${notFound.length}`);
  if (notFound.length > 0) {
    console.log('Missing items:', notFound.map(i => i.name));
  }
});
