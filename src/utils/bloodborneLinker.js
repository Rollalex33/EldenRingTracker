import bloodborneCatalog from '../data/bloodborneCatalog.json';
import { normalizeStr } from './gameOrder';

// Índices rápidos en memoria para O(1) lookup
const byExactName = new Map();
const byNormalizedName = new Map();
const byFileKey = new Map();
const byId = new Map();

bloodborneCatalog.items.forEach((item) => {
  byExactName.set(item.name.toLowerCase().trim(), item);
  byNormalizedName.set(normalizeStr(item.name), item);
  byFileKey.set(item.fileKey, item);
  byId.set(item.id, item);
});

// Ordenados por longitud descendente para emparejar nombres largos primero
const sortedCatalog = [...bloodborneCatalog.items].sort((a, b) => b.name.length - a.name.length);

/**
 * Obtiene un ítem por su ID
 */
export function getBloodborneItemById(id) {
  if (!id) return null;
  return byId.get(id) || null;
}

/**
 * Obtiene un ítem por su nombre exacto o normalizado
 */
export function getBloodborneItemByName(name) {
  if (!name) return null;
  const clean = name.toLowerCase().trim();
  if (byExactName.has(clean)) return byExactName.get(clean);

  const norm = normalizeStr(name);
  if (byNormalizedName.has(norm)) return byNormalizedName.get(norm);

  // Búsqueda flexible parcial
  for (const item of sortedCatalog) {
    const itemNorm = normalizeStr(item.name);
    if (itemNorm.includes(norm) || norm.includes(itemNorm)) {
      return item;
    }
  }

  return null;
}

/**
 * Obtiene un ítem por su clave de archivo de EliteGuías (ej. 'bloodborne_armas-p1.php')
 */
export function getBloodborneItemByFileKey(fileKey) {
  if (!fileKey) return null;
  const clean = fileKey.replace(/[^a-zA-Z0-9_\-\.]/g, '');
  const withPhp = clean.endsWith('.php') ? clean : clean + '.php';
  return byFileKey.get(withPhp) || null;
}

export default {
  getBloodborneItemById,
  getBloodborneItemByName,
  getBloodborneItemByFileKey,
};
