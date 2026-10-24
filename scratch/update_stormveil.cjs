const fs = require('fs');
const filePath = 'c:/Users/TERREGO-56/EldenRingTraker/scripts/recalibratePrecisionCoords.cjs';
let content = fs.readFileSync(filePath, 'utf8');

const oldLines = [
  " boss_margit : [1670 1880] \,
 " grace_margit : [1670 1880] \,
  " grace_stormveil_cliffside : [1710 1850] \,
 " grace_rampart_tower : [1750 1840] \,
  " grace_liftside_chamber : [1770 1850] \,
 " grace_secluded_cell : [1790 1830] \,
  " boss_godrick : [1800 1830] \,
 " loc_nepheli_01_velo : [1775 1855] \,
  " loc_nepheli_04_trono : [1810 1830] \,
 " loc_kenneth_03_trono : [1810 1830] \,
  " loc_rogier_01_castillo : [1750 1845] \,
 " loc_rogier_02_cara : [1730 1840] \,
  " seed_stormveil_courtyard : [1780 1840] \,
 " spell_black_flame : [1750 1840] \
].join('\n');

const newLines = [
  " boss_margit : [1660 1750] \,
 " grace_margit : [1665 1755] \,
  " grace_stormveil_cliffside : [1715 1690] \,
 " grace_rampart_tower : [1760 1715] \,
  " grace_liftside_chamber : [1770 1745] \,
 " grace_secluded_cell : [1805 1735] \,
  " boss_godrick : [1815 1740] \,
 " loc_nepheli_01_velo : [1775 1765] \,
  " loc_nepheli_04_trono : [1835 1740] \,
 " loc_kenneth_03_trono : [1835 1740] \,
  " loc_rogier_01_castillo : [1755 1740] \,
 " loc_rogier_02_cara : [1730 1735] \,
  " seed_stormveil_courtyard : [1765 1760] \,
 " spell_black_flame : [1755 1750] \
].join('\n');

const normalizedContent = content.replace(/\r\n/g, '\n');
if (!normalizedContent.includes(oldLines)) {
  console.error('Target block not found!');
  process.exit(1);
}

const updatedContent = normalizedContent.replace(oldLines, newLines);
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated recalibratePrecisionCoords.cjs!');
