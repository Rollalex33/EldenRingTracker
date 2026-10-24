import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DATA_FILES = {
  catalog: path.resolve(rootDir, 'src/data/checklistCatalog.json'),
  locations: path.resolve(rootDir, 'src/data/locations.json'),
  questlines: path.resolve(rootDir, 'src/data/questlines.json'),
};

const autoFix = process.argv.includes('--fix');

function getFileChecksum(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function verifyAndCleanData() {
  console.log('=== BATCH AUTOMATIZADO: VERIFICACIÓN Y LIMPIEZA DE DATOS ===\n');
  if (autoFix) {
    console.log('[MODO] Auto-fix activado (--fix)\n');
  }

  let hasErrors = false;
  const checksums = {};

  // 1. Checksums iniciales
  for (const [key, filePath] of Object.entries(DATA_FILES)) {
    if (!fs.existsSync(filePath)) {
      console.error(`[ERROR] Archivo no encontrado: ${filePath}`);
      hasErrors = true;
      continue;
    }
    checksums[key] = getFileChecksum(filePath);
    console.log(`[CHECKSUM] ${key.padEnd(12)}: ${checksums[key].slice(0, 16)}... (${path.basename(filePath)})`);
  }

  // 2. Verificación y limpieza de Catálogo
  console.log('\n--- Verificando src/data/checklistCatalog.json ---');
  const catalog = JSON.parse(fs.readFileSync(DATA_FILES.catalog, 'utf8'));
  const catalogItemIds = new Set();
  const duplicateItems = [];
  let catalogModified = false;

  for (let i = 0; i < catalog.items.length; i++) {
    const item = catalog.items[i];
    if (catalogItemIds.has(item.id)) {
      duplicateItems.push({ index: i, item });
    } else {
      catalogItemIds.add(item.id);
    }
  }

  if (duplicateItems.length > 0) {
    console.warn(`[WARN] Se encontraron ${duplicateItems.length} IDs duplicados en el catálogo:`);
    for (const dup of duplicateItems) {
      console.warn(`  - ID: ${dup.item.id} | Ítem: "${dup.item.name}" (DLC: ${dup.item.isDlc})`);
      if (autoFix) {
        let newId = dup.item.isDlc ? `${dup.item.id}-dlc` : `${dup.item.id}-${dup.index}`;
        let counter = 2;
        while (catalogItemIds.has(newId)) {
          newId = `${dup.item.id}-${counter++}`;
        }
        dup.item.id = newId;
        catalogItemIds.add(newId);
        catalogModified = true;
        console.log(`    ↳ [CORREGIDO] Nuevo ID único: ${newId}`);
      }
    }

    if (!autoFix) {
      hasErrors = true;
    } else if (catalogModified) {
      fs.writeFileSync(DATA_FILES.catalog, JSON.stringify(catalog, null, 2), 'utf8');
      checksums.catalog = getFileChecksum(DATA_FILES.catalog);
      console.log(`[CHECKSUM ACTUALIZADO] catalog: ${checksums.catalog.slice(0, 16)}...`);
    }
  } else {
    console.log('✓ No se encontraron IDs duplicados en catálogo');
  }

  console.log(`✓ Catálogo: ${catalog.items.length} ítems en ${catalog.categories.length} categorías`);

  // 3. Verificación de Locations
  console.log('\n--- Verificando src/data/locations.json ---');
  const locations = JSON.parse(fs.readFileSync(DATA_FILES.locations, 'utf8'));
  const locationIds = new Set();
  let duplicateLocIds = 0;
  let invalidCoords = 0;

  for (const loc of locations) {
    if (locationIds.has(loc.id)) {
      console.error(`[ERROR] ID duplicado en ubicaciones: ${loc.id}`);
      duplicateLocIds++;
      hasErrors = true;
    }
    locationIds.add(loc.id);

    if (
      !Array.isArray(loc.coords) ||
      loc.coords.length !== 2 ||
      typeof loc.coords[0] !== 'number' ||
      typeof loc.coords[1] !== 'number' ||
      !Number.isFinite(loc.coords[0]) ||
      !Number.isFinite(loc.coords[1])
    ) {
      console.error(`[ERROR] Coordenadas inválidas en ubicación ${loc.id}:`, loc.coords);
      invalidCoords++;
      hasErrors = true;
    }
  }

  console.log(`✓ Ubicaciones: ${locations.length} marcadores`);
  if (duplicateLocIds === 0) console.log('✓ IDs de ubicaciones 100% únicos');
  if (invalidCoords === 0) console.log('✓ Coordenadas numéricas válidas');

  // 4. Verificación de Questlines
  console.log('\n--- Verificando src/data/questlines.json ---');
  const questlines = JSON.parse(fs.readFileSync(DATA_FILES.questlines, 'utf8'));
  const questIds = new Set();
  let totalPasos = 0;
  let unlinkedLocationIds = 0;

  for (const quest of questlines) {
    if (questIds.has(quest.id)) {
      console.error(`[ERROR] ID duplicado en misiones: ${quest.id}`);
      hasErrors = true;
    }
    questIds.add(quest.id);

    if (Array.isArray(quest.pasos)) {
      totalPasos += quest.pasos.length;
      for (const paso of quest.pasos) {
        if (paso.locationId && !locationIds.has(paso.locationId)) {
          console.warn(`[WARN] Paso ${paso.pasoId} referencia locationId inexistente: ${paso.locationId}`);
          unlinkedLocationIds++;
        }
      }
    }
  }

  console.log(`✓ Misiones: ${questlines.length} questlines con ${totalPasos} pasos`);
  if (unlinkedLocationIds === 0) {
    console.log('✓ Todos los pasos enlazan correctamente con locations.json');
  }

  console.log('\n=============================================');
  if (hasErrors) {
    console.error('❌ FALLÓ LA VERIFICACIÓN (Ejecuta con --fix para reparar automáticamente)');
    process.exit(1);
  } else {
    console.log('✅ ESTADO: LIMPIO Y VERIFICADO CON ÉXITO');
    process.exit(0);
  }
}

verifyAndCleanData();
