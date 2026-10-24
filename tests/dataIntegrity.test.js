import { describe, it, expect } from 'vitest';
import locations from '../src/data/locations.json';
import questlines from '../src/data/questlines.json';
import checklistCatalog from '../src/data/checklistCatalog.json';

describe('checklistCatalog.json integrity', () => {
  it('should have valid items and categories arrays', () => {
    expect(Array.isArray(checklistCatalog.items)).toBe(true);
    expect(checklistCatalog.items.length).toBeGreaterThan(2700);
    expect(Array.isArray(checklistCatalog.categories)).toBe(true);
    expect(checklistCatalog.categories.length).toBe(11);
  });

  it('should contain unique IDs for every catalog item', () => {
    const ids = checklistCatalog.items.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe('locations.json integrity', () => {
  it('should have valid items array with more than 400 locations', () => {
    expect(Array.isArray(locations)).toBe(true);
    expect(locations.length).toBeGreaterThan(400);
  });

  it('should contain unique IDs for every location', () => {
    const ids = locations.map((loc) => loc.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid coordinates [lat, lng] as numbers', () => {
    locations.forEach((loc) => {
      expect(Array.isArray(loc.coords)).toBe(true);
      expect(loc.coords).toHaveLength(2);
      expect(typeof loc.coords[0]).toBe('number');
      expect(typeof loc.coords[1]).toBe('number');
      expect(Number.isFinite(loc.coords[0])).toBe(true);
      expect(Number.isFinite(loc.coords[1])).toBe(true);
    });
  });

  it('should have required metadata properties', () => {
    const validOrigins = ['surface', 'underground', 'dlc'];
    locations.forEach((loc) => {
      expect(loc.id).toBeTypeOf('string');
      expect(loc.titulo).toBeTypeOf('string');
      expect(loc.titulo.length).toBeGreaterThan(0);
      expect(loc.region).toBeTypeOf('string');
      if (loc.mapaOrigen) {
        expect(validOrigins).toContain(loc.mapaOrigen);
      }
    });
  });
});

describe('questlines.json integrity', () => {
  it('should contain valid questlines array', () => {
    expect(Array.isArray(questlines)).toBe(true);
    expect(questlines.length).toBeGreaterThanOrEqual(20);
  });

  it('should contain unique quest IDs and NPC names', () => {
    const ids = questlines.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);

    questlines.forEach((q) => {
      expect(q.id).toBeTypeOf('string');
      expect(q.npc).toBeTypeOf('string');
      expect(Array.isArray(q.pasos)).toBe(true);
      expect(q.pasos.length).toBeGreaterThan(0);
    });
  });

  it('should have valid pasos with sequential order and valid coordinates', () => {
    const allPasoIds = [];

    questlines.forEach((quest) => {
      quest.pasos.forEach((paso, index) => {
        expect(paso.pasoId).toBeTypeOf('string');
        allPasoIds.push(paso.pasoId);
        expect(paso.orden).toBe(index + 1);
        expect(paso.ubicacionNombre).toBeTypeOf('string');
        expect(paso.descripcion).toBeTypeOf('string');

        if (paso.coords) {
          expect(Array.isArray(paso.coords)).toBe(true);
          expect(paso.coords).toHaveLength(2);
          expect(typeof paso.coords[0]).toBe('number');
          expect(typeof paso.coords[1]).toBe('number');
        }
      });
    });

    expect(new Set(allPasoIds).size).toBe(allPasoIds.length);
  });

  it('should properly link questline pasos with location IDs', () => {
    const locationIdSet = new Set(locations.map((l) => l.id));

    questlines.forEach((quest) => {
      quest.pasos.forEach((paso) => {
        if (paso.locationId) {
          expect(locationIdSet.has(paso.locationId)).toBe(true);
        }
      });
    });
  });
});
