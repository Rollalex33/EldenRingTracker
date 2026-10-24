/**
 * Definiciones de tipos y documentación JSDoc para el Tracker de Elden Ring
 */

/**
 * @typedef {Object} PasoMision
 * @property {string} pasoId - Identificador único del paso (ej: "ranni_01")
 * @property {number} orden - Número correlativo de orden del paso
 * @property {string} ubicacionNombre - Nombre descriptivo del lugar
 * @property {string} region - Región de las Tierras Intermedias
 * @property {string} descripcion - Instrucción detallada del paso
 * @property {string} eliteguiasUrl - Enlace a la sección correspondiente de EliteGuías
 * @property {string} [locationId] - ID de la ubicación asociada en el mapa
 * @property {boolean} missable - Si el paso se pierde por avanzar la historia
 * @property {string} [advertenciaMissable] - Texto de advertencia sobre puntos de no retorno
 */

/**
 * @typedef {Object} Questline
 * @property {string} id - Identificador de la misión (ej: "quest_ranni")
 * @property {string} npc - Nombre del NPC
 * @property {string} icono - Nombre del icono representativo
 * @property {PasoMision[]} pasos - Lista ordenada de pasos
 */

/**
 * @typedef {('graces'|'bosses'|'weapons'|'ashes'|'npcs'|'key_items')} CategoriaUbicacion
 */

/**
 * @typedef {Object} MarcadorUbicacion
 * @property {string} id - Identificador único de la ubicación
 * @property {string} titulo - Nombre o título del punto de interés
 * @property {CategoriaUbicacion} categoria - Categoría del marcador
 * @property {string} region - Región geográfica en el mapa
 * @property {[number, number]} coords - Coordenadas [latitud, longitud] en Leaflet
 * @property {string} descripcion - Resumen del lugar u objeto
 * @property {string} eliteguiasUrl - Enlace a la guía de EliteGuías
 * @property {string} [questlinePasoId] - ID del paso de misión vinculado
 * @property {boolean} importante - Si es un hito de alta relevancia
 */

export const CATEGORIAS = [
  'graces',
  'bosses',
  'weapons',
  'ashes',
  'npcs',
  'key_items',
];
