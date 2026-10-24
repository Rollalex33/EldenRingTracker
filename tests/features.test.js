import { describe, it, expect } from 'vitest';
import { calcMaxEquipLoad, getRequiredEndurance } from '../src/components/Calculator/EquipLoadModal.jsx';
import { PLATINUM_CATEGORIES, REMEMBRANCES_DATA, WALKING_MAUSOLEUMS } from '../src/components/Platinum/PlatinumModal.jsx';
import checklistCatalog from '../src/data/checklistCatalog.json';

describe('Equip Load & Fat Roll Calculator', () => {
  it('should calculate authentic Max Equip Load curve based on Endurance', () => {
    // Nivel 8 (base de Wretch)
    expect(calcMaxEquipLoad(8)).toBeCloseTo(45.0, 1);
    expect(calcMaxEquipLoad(1)).toBeCloseTo(45.0, 1);

    // Softcap 1: Nivel 25 (debe ser 72.0)
    expect(calcMaxEquipLoad(25)).toBeCloseTo(72.0, 1);

    // Softcap 2: Nivel 60 (debe ser 120.0)
    expect(calcMaxEquipLoad(60)).toBeCloseTo(120.0, 1);

    // Hardcap: Nivel 99 (debe ser 160.0)
    expect(calcMaxEquipLoad(99)).toBeCloseTo(160.0, 1);

    // Nivel intermedio (40)
    expect(calcMaxEquipLoad(40)).toBeGreaterThan(72.0);
    expect(calcMaxEquipLoad(40)).toBeLessThan(120.0);
  });

  it('should calculate required Endurance inversely to reach target equip loads', () => {
    expect(getRequiredEndurance(45.0)).toBe(8);
    expect(getRequiredEndurance(72.0)).toBe(25);
    expect(getRequiredEndurance(120.0)).toBe(60);
    expect(getRequiredEndurance(160.0)).toBe(99);

    // Con talismán de carga +19% (Gran Tarro Arsenal)
    const endWithTalisman = getRequiredEndurance(72.0, 1.19);
    expect(endWithTalisman).toBeLessThan(25);
  });
});

describe('Platinum & Remembrances Tracker', () => {
  it('should contain all 4 legendary categories totaling 30 collectibles', () => {
    expect(PLATINUM_CATEGORIES.length).toBe(4);

    const totalCollectibles = PLATINUM_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
    expect(totalCollectibles).toBe(30);

    const armaments = PLATINUM_CATEGORIES.find((c) => c.id === 'armas');
    expect(armaments.items.length).toBe(9);

    const talismans = PLATINUM_CATEGORIES.find((c) => c.id === 'talismanes');
    expect(talismans.items.length).toBe(8);

    const spells = PLATINUM_CATEGORIES.find((c) => c.id === 'hechizos');
    expect(spells.items.length).toBe(7);

    const ashes = PLATINUM_CATEGORIES.find((c) => c.id === 'cenizas');
    expect(ashes.items.length).toBe(6);
  });

  it('should have all legendary items existing in the checklist catalog', () => {
    const catalogIds = new Set(checklistCatalog.items.map((i) => i.id));

    PLATINUM_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        expect(catalogIds.has(item.id)).toBe(true);
      });
    });
  });

  it('should contain 15 boss remembrances with both exchange options', () => {
    expect(REMEMBRANCES_DATA.length).toBe(15);
    REMEMBRANCES_DATA.forEach((rem) => {
      expect(rem.boss).toBeTypeOf('string');
      expect(rem.rewardA).toBeTypeOf('string');
      expect(rem.rewardB).toBeTypeOf('string');
    });
  });

  it('should contain 7 walking mausoleums across the Lands Between', () => {
    expect(WALKING_MAUSOLEUMS.length).toBe(7);
    const withBell = WALKING_MAUSOLEUMS.filter((m) => m.hasBell);
    const withoutBell = WALKING_MAUSOLEUMS.filter((m) => !m.hasBell);

    expect(withBell.length).toBe(5);
    expect(withoutBell.length).toBe(2);
  });
});
