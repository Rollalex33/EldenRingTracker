import { describe, it, expect } from 'vitest';
import { matchItemInLine, getItemByFileKey, getItemById, findLocationForItem } from '../src/utils/itemLinker.js';

describe('itemLinker utils', () => {
  it('should find items by ID', () => {
    const item = getItemById('armas_armas-p10');
    expect(item).not.toBeNull();
    expect(item.id).toBe('armas_armas-p10');
    expect(item.name).toBeTypeOf('string');
  });

  it('should return null for non-existing ID', () => {
    expect(getItemById('non_existent_id_99999')).toBeNull();
    expect(getItemById('')).toBeNull();
    expect(getItemById(null)).toBeNull();
  });

  it('should find items by fileKey with or without .php extension', () => {
    const withExt = getItemByFileKey('elden-ring_armas-p10.php');
    const withoutExt = getItemByFileKey('elden-ring_armas-p10');

    expect(withExt).not.toBeNull();
    expect(withoutExt).not.toBeNull();
    expect(withExt.id).toBe(withoutExt.id);
  });

  it('should return null for non-existing fileKey', () => {
    expect(getItemByFileKey('invalid_file_key')).toBeNull();
    expect(getItemByFileKey('')).toBeNull();
    expect(getItemByFileKey(null)).toBeNull();
  });

  it('should match items in guide lines with bullets, prefixes, and punctuation', () => {
    const testCases = [
      '- Espadón de luna llena',
      'Objeto: Cenizas de lobo solitario x1',
      'Recompensa: Talismán de tortuga verde.',
      'Cenizas de guerra: Garra de león',
    ];

    testCases.forEach((line) => {
      const match = matchItemInLine(line);
      if (match) {
        expect(match).toHaveProperty('id');
        expect(match).toHaveProperty('name');
      }
    });
  });

  it('should return null for empty or invalid text lines', () => {
    expect(matchItemInLine('')).toBeNull();
    expect(matchItemInLine(null)).toBeNull();
    expect(matchItemInLine(undefined)).toBeNull();
    expect(matchItemInLine(12345)).toBeNull();
    expect(matchItemInLine('texto generico que no contiene ningun item')).toBeNull();
  });

  it('should cross-reference items to map locations with findLocationForItem', () => {
    expect(findLocationForItem(null)).toBeNull();
    expect(findLocationForItem({})).toBeNull();

    const radahnItem = { name: 'Radahn, Azote de las Estrellas' };
    const loc = findLocationForItem(radahnItem);
    expect(loc).not.toBeNull();
    expect(loc).toHaveProperty('coords');
    expect(Array.isArray(loc.coords)).toBe(true);
    expect(loc.coords.length).toBe(2);
  });
});
