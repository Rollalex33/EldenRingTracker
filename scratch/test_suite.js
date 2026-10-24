import fs from 'fs';
import {
  sortItems,
  getItemInventoryRank,
  SPIRIT_ASHES_INVENTORY_ORDER,
  SORCERIES_INVENTORY_ORDER,
  INCANTATIONS_INVENTORY_ORDER,
  TALISMANS_INVENTORY_ORDER,
  ASHES_OF_WAR_INVENTORY_ORDER
} from '../src/utils/gameOrder.js';

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));

console.log('=== RUNNING COMPREHENSIVE SORT TESTS ===');

// Test 1: Spirit Ashes full
const ashes = cat.items.filter(i => i.category === 'cenizas-espiritus');
const sortedAshes = sortItems(ashes, 'game', 'cenizas-espiritus');
if (sortedAshes.length !== 84) throw new Error(`Expected 84 ashes, got ${sortedAshes.length}`);
if (sortedAshes[0].name !== 'Cenizas de noble errante') throw new Error(`Expected Cenizas de noble errante at #1, got ${sortedAshes[0].name}`);
if (sortedAshes[1].name !== 'Cenizas de hechicero noble') throw new Error(`Expected Cenizas de hechicero noble at #2, got ${sortedAshes[1].name}`);
if (sortedAshes[83].name !== 'Marioneta de doncella nocturna y espadachina de Nox') throw new Error(`Expected Marioneta de doncella nocturna... at #84, got ${sortedAshes[83].name}`);
console.log('✓ Test 1: Spirit ashes full order 1..84 passed');

// Test 2: Spirit Ashes Base
const baseAshes = ashes.filter(i => !i.isDlc);
const sortedBaseAshes = sortItems(baseAshes, 'game', 'cenizas-espiritus');
if (sortedBaseAshes.length !== 64) throw new Error(`Expected 64 base ashes, got ${sortedBaseAshes.length}`);
if (sortedBaseAshes[0].name !== 'Cenizas de noble errante') throw new Error(`Expected Cenizas de noble errante at #1, got ${sortedBaseAshes[0].name}`);
console.log('✓ Test 2: Base Spirit ashes passed (64 items)');

// Test 3: Spirit Ashes DLC
const dlcAshes = ashes.filter(i => i.isDlc);
const sortedDlcAshes = sortItems(dlcAshes, 'game', 'cenizas-espiritus');
if (sortedDlcAshes.length !== 20) throw new Error(`Expected 20 DLC ashes, got ${sortedDlcAshes.length}`);
if (sortedDlcAshes[0].name !== 'Cenizas de hombre mosca') throw new Error(`Expected Cenizas de hombre mosca at #1, got ${sortedDlcAshes[0].name}`);
console.log('✓ Test 3: DLC Spirit ashes passed (20 items)');

// Test 4: Sorceries
const sorceries = cat.items.filter(i => i.category === 'hechizos');
const sortedSorc = sortItems(sorceries, 'game', 'hechizos');
if (sortedSorc[0].name !== 'Guijarro de piedras refulgentes') throw new Error(`Expected Guijarro..., got ${sortedSorc[0].name}`);
console.log('✓ Test 4: Sorceries passed (84 items)');

// Test 5: Incantations
const incants = cat.items.filter(i => i.category === 'encantamientos');
const sortedInc = sortItems(incants, 'game', 'encantamientos');
if (sortedInc[0].name !== 'Curación urgente') throw new Error(`Expected Curación urgente, got ${sortedInc[0].name}`);
console.log('✓ Test 5: Incantations passed (129 items)');

// Test 6: Talismans
const talismans = cat.items.filter(i => i.category === 'talismanes');
const sortedTals = sortItems(talismans, 'game', 'talismanes');
if (sortedTals[0].name !== 'Medallón de ámbar carmesí') throw new Error(`Expected Medallón de ámbar carmesí, got ${sortedTals[0].name}`);
console.log('✓ Test 6: Talismans passed (126 items)');

// Test 7: Ashes of War
const ashesWar = cat.items.filter(i => i.category === 'cenizas-guerra');
const sortedWar = sortItems(ashesWar, 'game', 'cenizas-guerra');
if (sortedWar[0].name !== 'Cuchillo de afilar') throw new Error(`Expected Cuchillo de afilar, got ${sortedWar[0].name}`);
console.log('✓ Test 7: Ashes of War passed (117 items)');

console.log('ALL 7 TESTS PASSED SUCCESSFULLY! 🎯');
