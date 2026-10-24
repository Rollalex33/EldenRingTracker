import checklistCatalog from '../data/checklistCatalog.json';

// Índices rápidos en memoria para O(1) lookup
const byExactName = new Map();
const byFileKey = new Map();
const byId = new Map();

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
