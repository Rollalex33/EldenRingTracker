import checklistCatalog from '../data/checklistCatalog.json';
import locationsData from '../data/locations.json';

// Índices rápidos en memoria para O(1) lookup
const byExactName = new Map();
const byFileKey = new Map();
const byId = new Map();

// Índice de ubicaciones del mapa por nombre normalizado
const locationByNameMap = new Map();

function normalizeForLookup(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

locationsData.forEach((loc) => {
  const normTitle = normalizeForLookup(loc.titulo);
  if (normTitle) {
    locationByNameMap.set(normTitle, loc);
  }
});

// Ordenados por longitud descendente para emparejar nombres largos primero
const sortedCatalog = [...checklistCatalog.items].sort((a, b) => b.name.length - a.name.length);

checklistCatalog.items.forEach((item) => {
  byExactName.set(item.name.toLowerCase().trim(), item);
  byFileKey.set(item.fileKey, item);
  byId.set(item.id, item);
});

/**
 * Busca un ítem del compendio en una línea de texto dada (por ejemplo en Recompensas o Pasos)
 * @param {string} line - Texto a analizar
 * @returns {object|null} Objeto del catálogo si coincide
 */
export function matchItemInLine(line) {
  if (!line || typeof line !== 'string') return null;

  // 1. Limpieza de viñetas, cantidades y prefijos comunes de guías
  const cleanLine = line
    .replace(/^[-•*–—]\s*/, '')
    .replace(/\s*x\d+$/i, '')
    .replace(/^\d+x\s*/i, '')
    .replace(/^(?:Hechizo|Encantamiento|Cenizas? de guerra|Cenizas? de espíritus?|Arma|Escudo|Talismán|Armadura|Objeto|Espada|Arco|Lanza)\s*:?\s*/i, '')
    .trim()
    .toLowerCase();

  // Coincidencia exacta con el nombre limpio
  if (byExactName.has(cleanLine)) {
    return byExactName.get(cleanLine);
  }

  // 2. Si la línea es corta (menos de 60 chars) y contiene el nombre completo de un ítem
  const lineLower = line.toLowerCase();
  for (const item of sortedCatalog) {
    if (item.name.length < 4) continue;
    const nameLower = item.name.toLowerCase();

    if (lineLower.includes(nameLower)) {
      const idx = lineLower.indexOf(nameLower);
      const prevChar = idx > 0 ? lineLower[idx - 1] : ' ';
      const nextChar = idx + nameLower.length < lineLower.length ? lineLower[idx + nameLower.length] : ' ';

      // Asegurarse de que esté delimitado por signos de puntuación o espacios
      if (/[\s\-,.:;"'([\]•*]/.test(prevChar) && /[\s\-,.:;"'([\]•*]/.test(nextChar)) {
        return item;
      }
    }
  }

  return null;
}

export function getItemByFileKey(fileKey) {
  if (!fileKey) return null;
  return byFileKey.get(fileKey) || byFileKey.get(fileKey.replace('.php', '') + '.php') || null;
}

export function getItemById(id) {
  return byId.get(id) || null;
}

/**
 * Encuentra si un ítem del compendio tiene una ubicación mapeada directamente en el mapa
 * @param {object} item - Ítem del compendio
 * @returns {object|null} Objeto de ubicación en el mapa
 */
export function findLocationForItem(item) {
  if (!item || !item.name) return null;
  const normName = normalizeForLookup(item.name);

  // 1. Coincidencia directa
  if (locationByNameMap.has(normName)) {
    return locationByNameMap.get(normName);
  }

  // 2. Coincidencia parcial para jefes y NPCs
  for (const [key, loc] of locationByNameMap.entries()) {
    if (key.includes(normName) || normName.includes(key)) {
      return loc;
    }
  }

  return null;
}
