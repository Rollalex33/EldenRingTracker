import locationsData from './locations.json';
import questlinesData from './questlines.json';

/**
 * Mock data centralizado para The Lands Between
 * Exporta ubicaciones de marcadores y misiones paso a paso de NPCs
 */
export const locations = locationsData;
export const questlines = questlinesData;

// Índices rápidos O(1) para evitar búsquedas anidadas O(N*M) en render
export const missablePasosSet = new Set();
export const questByPasoId = new Map();

questlinesData.forEach((quest) => {
  quest.pasos.forEach((paso) => {
    questByPasoId.set(paso.pasoId, { quest, paso });
    if (paso.missable) {
      missablePasosSet.add(paso.pasoId);
    }
  });
});

// Categorías disponibles para filtros en el mapa
export const CATEGORIAS_CONFIG = {
  graces: { label: 'Sitios de Gracia', color: '#c5a059', icon: 'Flame' },
  bosses: { label: 'Jefes y Jefazos', color: '#ef4444', icon: 'Skull' },
  dungeons: { label: 'Mazmorras y Cuevas', color: '#f97316', icon: 'Shield' },
  npcs: { label: 'Misiones de NPCs', color: '#10b981', icon: 'User' },
  weapons: { label: 'Armas y Escudos', color: '#3b82f6', icon: 'Sword' },
  spells: { label: 'Hechizos y Magias', color: '#06b6d4', icon: 'Sparkles' },
  ashes: { label: 'Cenizas de Invocación', color: '#a855f7', icon: 'Ghost' },
  key_items: { label: 'Objetos Clave y Talismanes', color: '#eab308', icon: 'Key' },
};

export default {
  locations,
  questlines,
  CATEGORIAS_CONFIG,
};
