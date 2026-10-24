/**
 * src/utils/armorSets.js
 *
 * Agrupa las piezas sueltas de armadura (Cabeza / Pecho / Manos / Piernas)
 * en sets completos deduciendo el set a partir del nombre de la pieza.
 *
 *   "Yelmo de caballero vagabundo"      -> "caballero vagabundo"
 *   "Armadura de caballero vagabundo"   -> "caballero vagabundo"
 *   "Guanteletes de caballero vagabundo"-> "caballero vagabundo"
 *   "Grebas de caballero vagabundo"     -> "caballero vagabundo"
 *
 * Solo se considera set cuando la clave comparte al menos 2 piezas de
 * subcategorías distintas. El resto se muestra como pieza suelta.
 */

export const ARMOR_PIECE_SUBCATEGORIES = ['Cabeza', 'Pecho', 'Manos', 'Piernas'];

// Orden en el que se muestran las piezas dentro de un set
const PIECE_ORDER = { Cabeza: 0, Pecho: 1, Manos: 2, Piernas: 3 };

// Etiqueta corta por tipo de pieza para mostrar en filas compactas
export const PIECE_LABELS = {
  Cabeza: 'Cabeza',
  Pecho: 'Pecho',
  Manos: 'Manos',
  Piernas: 'Piernas',
};

/** Decodifica entidades HTML básicas que aparecen en algunos nombres del catálogo. */
export function decodeHtmlEntities(str = '') {
  return String(str)
    .replace(/&uuml;/g, 'ü')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Clave de set de una pieza: nombre sin la primera palabra (tipo de pieza),
 * sin "(mod.)", sin dobles espacios y sin acentos.
 */
export function getArmorSetKey(name = '') {
  const clean = decodeHtmlEntities(name)
    .replace(/\(mod\.?\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = clean.split(' ');
  if (parts.length < 2) return null;
  const rest = parts.slice(1).join(' ');
  return stripDiacritics(rest)
    .toLowerCase()
    .split(' ')
    .map((w) => (w.length > 3 ? w.replace(/s$/, '').replace(/[aeo]$/, '') : w))
    .join(' ')
    .trim();
}

/** Nombre legible del set ("caballero vagabundo" -> "Caballero vagabundo"). */
function buildSetDisplayName(pieces) {
  const base = pieces.find((p) => p.subcategory === 'Pecho') || pieces[0];
  const clean = decodeHtmlEntities(base.name)
    .replace(/\(mod\.?\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = clean.split(' ');
  let rest = parts.slice(1);
  // Quitar artículos/preposiciones iniciales ("de", "del", "de la"...)
  while (rest.length > 1 && /^(de|del|la|las|los|el)$/i.test(rest[0])) {
    rest = rest.slice(1);
  }
  const text = rest.join(' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Construye unidades de visualización (sets y piezas sueltas).
 *
 * @param {Array} visibleItems Ítems que pasaron todos los filtros (en orden).
 * @param {Array} allItems     Universo completo de la categoría activa
 *                             (para calcular el progreso real del set).
 * @param {string} sortOrder   Orden activo del listado.
 * @returns {Array} Lista de unidades: ítems sueltos o { isSet: true, ... }.
 */
export function buildArmorUnits(visibleItems, allItems, sortOrder = 'game') {
  // Índice del universo completo por clave de set
  const universe = new Map();
  for (const item of allItems) {
    if (!ARMOR_PIECE_SUBCATEGORIES.includes(item.subcategory)) continue;
    const key = getArmorSetKey(item.name);
    if (!key) continue;
    const bucket = universe.get(`${item.isDlc ? 'dlc' : 'base'}::${key}`) || [];
    bucket.push(item);
    universe.set(`${item.isDlc ? 'dlc' : 'base'}::${key}`, bucket);
  }

  const isRealSet = (bucket) =>
    bucket && new Set(bucket.map((p) => p.subcategory)).size >= 2;

  const units = [];
  const setUnits = new Map();

  for (const item of visibleItems) {
    const key = ARMOR_PIECE_SUBCATEGORIES.includes(item.subcategory)
      ? getArmorSetKey(item.name)
      : null;
    const fullKey = key ? `${item.isDlc ? 'dlc' : 'base'}::${key}` : null;
    const bucket = fullKey ? universe.get(fullKey) : null;

    if (!fullKey || !isRealSet(bucket)) {
      units.push(item);
      continue;
    }

    let unit = setUnits.get(fullKey);
    if (!unit) {
      const allPieces = [...bucket].sort(
        (a, b) => (PIECE_ORDER[a.subcategory] ?? 9) - (PIECE_ORDER[b.subcategory] ?? 9)
      );
      unit = {
        isSet: true,
        id: `armor-set-${fullKey}`,
        name: buildSetDisplayName(allPieces),
        isDlc: Boolean(item.isDlc),
        allPieces,
        visiblePieces: [],
      };
      setUnits.set(fullKey, unit);
      units.push(unit);
    }
    unit.visiblePieces.push(item);
  }

  // Ordenar piezas visibles dentro de cada set según el orden Cabeza→Piernas
  setUnits.forEach((unit) => {
    unit.visiblePieces.sort(
      (a, b) => (PIECE_ORDER[a.subcategory] ?? 9) - (PIECE_ORDER[b.subcategory] ?? 9)
    );
  });

  // Con orden "Por Tipo" o alfabético, ordenar por nombre para localizar rápido.
  if (sortOrder === 'game' || sortOrder === 'alpha') {
    const unitName = (u) =>
      u.isSet ? u.name : buildSetDisplayName([u]) || decodeHtmlEntities(u.name);
    units.sort((a, b) =>
      stripDiacritics(unitName(a)).localeCompare(stripDiacritics(unitName(b)), 'es', {
        sensitivity: 'base',
      })
    );
  }

  return units;
}
