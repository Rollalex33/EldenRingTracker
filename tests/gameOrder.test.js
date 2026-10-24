import { describe, it, expect } from 'vitest';
import {
  normalizeStr,
  getGuidePageNum,
  getSubcategoryGameRank,
  getItemInventoryRank,
  sortSubcategoriesByGame,
  sortItems,
  CANONICAL_CATEGORIES_ORDER,
  WEAPON_TYPES_CANONICAL,
  SPIRIT_ASHES_INVENTORY_ORDER,
} from '../src/utils/gameOrder.js';

describe('gameOrder utils', () => {
  describe('normalizeStr', () => {
    it('should strip accents, trim and convert to lowercase', () => {
      expect(normalizeStr('  Éspadón  ')).toBe('espadon');
      expect(normalizeStr('CÉSTUS')).toBe('cestus');
      expect(normalizeStr('')).toBe('');
      expect(normalizeStr(null)).toBe('');
      expect(normalizeStr(undefined)).toBe('');
    });
  });

  describe('getGuidePageNum', () => {
    it('should extract numeric page from fileKey', () => {
      expect(getGuidePageNum({ fileKey: 'er_armas-p42.php' })).toBe(42);
      expect(getGuidePageNum({ fileKey: 'er_jefazos-p105.php' })).toBe(105);
      expect(getGuidePageNum({ fileKey: 'sin_numero.php' })).toBe(99999);
      expect(getGuidePageNum(null)).toBe(99999);
      expect(getGuidePageNum({})).toBe(99999);
    });
  });

  describe('getSubcategoryGameRank', () => {
    it('should return correct canonical index for weapons', () => {
      expect(getSubcategoryGameRank('armas', 'dagas')).toBe(0);
      expect(getSubcategoryGameRank('armas', 'espadas rectas')).toBe(1);
      expect(getSubcategoryGameRank('armas', 'espadon')).toBe(2);
      expect(getSubcategoryGameRank('armas', 'antorcha')).toBe(WEAPON_TYPES_CANONICAL.indexOf('antorchas'));
      expect(getSubcategoryGameRank('armas', 'desconocido')).toBe(900);
    });

    it('should handle missing or invalid subcategories', () => {
      expect(getSubcategoryGameRank('armas', null)).toBe(999);
      expect(getSubcategoryGameRank('armas', '')).toBe(999);
    });

    it('should rank shield and armor subcategories correctly', () => {
      expect(getSubcategoryGameRank('escudos', 'pequeños')).toBe(0);
      expect(getSubcategoryGameRank('escudos', 'medianos')).toBe(1);
      expect(getSubcategoryGameRank('armaduras', 'cabeza')).toBe(0);
      expect(getSubcategoryGameRank('armaduras', 'piernas')).toBe(3);
    });
  });

  describe('getItemInventoryRank', () => {
    it('should return index in official inventory order for supported categories', () => {
      const ashItem = { category: 'cenizas-espiritus', name: 'Cenizas de noble errante' };
      expect(getItemInventoryRank(ashItem)).toBe(0);

      const invalidItem = { category: 'cenizas-espiritus', name: 'Item Inexistente' };
      expect(getItemInventoryRank(invalidItem)).toBe(-1);

      const unrankedCategory = { category: 'jefazos', name: 'Margit' };
      expect(getItemInventoryRank(unrankedCategory)).toBe(-1);
    });
  });

  describe('sortSubcategoriesByGame', () => {
    it('should sort subcategories by canonical game rank', () => {
      const subcats = ['antorchas', 'dagas', 'espadones', 'espadas rectas'];
      const sorted = sortSubcategoriesByGame(subcats, 'armas');
      expect(sorted).toEqual(['dagas', 'espadas rectas', 'espadones', 'antorchas']);
    });
  });

  describe('sortItems', () => {
    const mockItems = [
      { id: '1', name: 'Zweihänder', category: 'armas', subcategory: 'espadas colosales', attackPower: 141, weight: 15.5, fileKey: 'er_armas-p10.php', isDlc: false },
      { id: '2', name: 'Daga de bandido', category: 'armas', subcategory: 'dagas', attackPower: 75, weight: 1.5, fileKey: 'er_armas-p2.php', isDlc: false },
      { id: '3', name: 'Espada recta noble', category: 'armas', subcategory: 'espadas rectas', attackPower: 101, weight: 3.5, fileKey: 'er_armas-p5.php', isDlc: false },
      { id: '4', name: 'Daga sombría', category: 'armas', subcategory: 'dagas', attackPower: 90, weight: 2.0, fileKey: 'er_armas-p1.php', isDlc: true },
    ];

    it('should return empty array for empty items list', () => {
      expect(sortItems([])).toEqual([]);
      expect(sortItems(null)).toEqual([]);
    });

    it('should sort alphabetically with "alpha"', () => {
      const sorted = sortItems(mockItems, 'alpha');
      expect(sorted.map((i) => i.name)).toEqual([
        'Daga de bandido',
        'Daga sombría',
        'Espada recta noble',
        'Zweihänder',
      ]);
    });

    it('should sort by attack descending with "atk_desc"', () => {
      const sorted = sortItems(mockItems, 'atk_desc');
      expect(sorted[0].name).toBe('Zweihänder');
      expect(sorted[sorted.length - 1].name).toBe('Daga de bandido');
    });

    it('should sort by weight ascending with "weight_asc"', () => {
      const sorted = sortItems(mockItems, 'weight_asc');
      expect(sorted[0].name).toBe('Daga de bandido');
      expect(sorted[sorted.length - 1].name).toBe('Zweihänder');
    });

    it('should sort by weight descending with "weight_desc"', () => {
      const sorted = sortItems(mockItems, 'weight_desc');
      expect(sorted[0].name).toBe('Zweihänder');
      expect(sorted[sorted.length - 1].name).toBe('Daga de bandido');
    });

    it('should sort canonically with "game" (weapon type then base/DLC then page)', () => {
      const sorted = sortItems(mockItems, 'game');
      // Dagas (base first: Daga de bandido, then dlc: Daga sombría)
      // then espadas rectas
      // then espadas colosales
      expect(sorted.map((i) => i.name)).toEqual([
        'Daga de bandido',
        'Daga sombría',
        'Espada recta noble',
        'Zweihänder',
      ]);
    });
  });
});
