import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  BB_PROGRESSION_ROUTE,
  BB_UPGRADE_SYSTEM_GUIDE,
  BB_NPC_QUESTLINES,
  BB_DECISIONS_AND_VARIATIONS,
  BB_ENDINGS_GUIDE,
  BB_MOON_PHASES,
} from '../src/data/bloodborneRouteData.js';
import { getBloodborneItemByName } from '../src/utils/bloodborneLinker.js';

describe('Bloodborne Progression Route & Guides Data Integrity', () => {
  it('should define all 18 progression zones in logical order with required schema', () => {
    expect(BB_PROGRESSION_ROUTE.length).toBe(18);

    const ids = new Set();
    BB_PROGRESSION_ROUTE.forEach((zone, idx) => {
      expect(zone.id).toBeDefined();
      expect(ids.has(zone.id)).toBe(false);
      ids.add(zone.id);

      expect(zone.order).toBe(idx + 1);
      expect(zone.title).toBeTruthy();
      expect(zone.recommendedBL).toBeTruthy();
      expect(zone.weaponUpgrade).toBeTruthy();
      expect(Array.isArray(zone.lamps)).toBe(true);
      expect(zone.lamps.length).toBeGreaterThan(0);
      expect(Array.isArray(zone.bosses)).toBe(true);
      expect(Array.isArray(zone.milestones)).toBe(true);
      expect(zone.milestones.length).toBeGreaterThan(0);
      expect(Array.isArray(zone.upgradeMaterials)).toBe(true);
      expect(Array.isArray(zone.keyItems)).toBe(true);
      expect(Array.isArray(zone.guideFileKeys)).toBe(true);
      expect(zone.guideFileKeys.length).toBeGreaterThan(0);
    });
  });

  it('should have cached offline JSON files for all guideFileKeys references in public/guide-cache', () => {
    const guideDir = path.resolve(process.cwd(), 'public', 'guide-cache');
    expect(fs.existsSync(guideDir)).toBe(true);

    BB_PROGRESSION_ROUTE.forEach((zone) => {
      zone.guideFileKeys.forEach((key) => {
        const filePath = path.join(guideDir, `${key}.json`);
        expect(fs.existsSync(filePath), `Cache file missing: ${key}.json`).toBe(true);

        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        expect(content.title).toBeTruthy();
        expect(Array.isArray(content.sections) || Array.isArray(content.intro)).toBe(true);
      });
    });
  });

  it('should ensure milestones across all 18 zones have unique IDs for persistence', () => {
    const milestoneIds = new Set();
    let totalMilestones = 0;

    BB_PROGRESSION_ROUTE.forEach((zone) => {
      zone.milestones.forEach((m) => {
        totalMilestones++;
        expect(milestoneIds.has(m.id), `Duplicate milestone ID: ${m.id}`).toBe(false);
        milestoneIds.add(m.id);
        expect(m.label).toBeTruthy();
        expect(typeof m.missable).toBe('boolean');
      });
    });

    expect(totalMilestones).toBeGreaterThan(60);
  });
});

describe('Bloodborne Upgrade System & Workshop Guide', () => {
  it('should verify exact upgrade material requirements (+1 to +10)', () => {
    const tiers = BB_UPGRADE_SYSTEM_GUIDE.weaponTiers;
    expect(tiers.length).toBe(4);

    // Fragmentos (+1 a +3) = 16
    const tier1 = tiers[0];
    expect(tier1.materialName).toContain('Fragmento de piedra de sangre');
    expect(tier1.requiredCount).toContain('16');

    // Fragmentos gemelos (+4 a +6) = 16
    const tier2 = tiers[1];
    expect(tier2.materialName).toContain('Fragmentos gemelos de piedra de sangre');
    expect(tier2.requiredCount).toContain('16');

    // Bloques (+7 a +9) = 16
    const tier3 = tiers[2];
    expect(tier3.materialName).toContain('Bloque de piedra de sangre');
    expect(tier3.requiredCount).toContain('16');

    // Roca de sangre (+10) = 1
    const tier4 = tiers[3];
    expect(tier4.materialName).toContain('Roca de sangre');
    expect(tier4.requiredCount).toContain('1');
    expect(tier4.fixedSources.length).toBe(4);
  });

  it('should document exactly 47 fixed Blood Stone Chunks across all locations', () => {
    const breakdown = BB_UPGRADE_SYSTEM_GUIDE.chunkLocationsBreakdown;
    expect(breakdown.length).toBeGreaterThan(0);

    const calculatedSum = breakdown.reduce((sum, loc) => sum + loc.count, 0);
    // 39 en el juego base + 8 en DLC = 47 bloques fijos
    expect(calculatedSum).toBe(47);
  });

  it('should document Blood Rock locations including Nightmare of Mensis, DLC and Chalices', () => {
    const tier4 = BB_UPGRADE_SYSTEM_GUIDE.weaponTiers[3];
    const sources = tier4.fixedSources;
    expect(sources.length).toBe(4);

    const mensis = sources.find((s) => s.zone.includes('Mensis'));
    expect(mensis).toBeDefined();

    const dlc = sources.find((s) => s.zone.includes('DLC') || s.zone.includes('Aldea Pesquera'));
    expect(dlc).toBeDefined();

    const chalices = sources.find((s) => s.zone.includes('Cáliz'));
    expect(chalices).toBeDefined();
    expect(chalices.detail).toContain('jrwffkyp');
    expect(chalices.detail).toContain('6gn7kd3v');
    expect(chalices.detail).toContain('wbgypzky');
  });

  it('should define essential Workshop Tools with correct unlock locations', () => {
    const tools = BB_UPGRADE_SYSTEM_GUIDE.workshopTools;
    expect(tools.length).toBeGreaterThanOrEqual(4);

    const gemTool = tools.find((t) => t.name.includes('gemas sangrientas'));
    expect(gemTool).toBeDefined();
    expect(gemTool.howToGet).toContain('Gascoigne');

    const runeTool = tools.find((t) => t.name.includes('runas'));
    expect(runeTool).toBeDefined();
    expect(runeTool.howToGet).toContain('Hemwick');
  });
});

describe('Bloodborne NPCs, Decisions & Endings', () => {
  it('should contain all 19 NPC questlines matching EliteGuías p1-p19 with steps and rewards', () => {
    expect(BB_NPC_QUESTLINES.length).toBe(19);

    BB_NPC_QUESTLINES.forEach((npc) => {
      expect(npc.id).toBeTruthy();
      expect(npc.name).toBeTruthy();
      expect(npc.role).toBeTruthy();
      expect(Array.isArray(npc.steps)).toBe(true);
      expect(npc.steps.length).toBeGreaterThan(0);
      expect(npc.summary).toBeTruthy();

      npc.steps.forEach((step) => {
        expect(step.id).toBeTruthy();
        expect(step.zone).toBeTruthy();
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
        expect(typeof step.missable).toBe('boolean');
      });
    });
  });

  it('should document 7 major branching decisions and ethical dilemmas', () => {
    expect(BB_DECISIONS_AND_VARIATIONS.length).toBe(7);

    const djura = BB_DECISIONS_AND_VARIATIONS.find((d) => d.npc.includes('Djura'));
    expect(djura).toBeDefined();
    expect(djura.choices.length).toBeGreaterThanOrEqual(2);

    const alfred = BB_DECISIONS_AND_VARIATIONS.find((d) => d.npc.includes('Alfred'));
    expect(alfred).toBeDefined();

    const beggar = BB_DECISIONS_AND_VARIATIONS.find((d) => d.npc.includes('Mendigo'));
    expect(beggar).toBeDefined();
  });

  it('should define all 3 endings and requirements for the secret ending', () => {
    expect(BB_ENDINGS_GUIDE.endings.length).toBe(3);

    const secretEnding = BB_ENDINGS_GUIDE.endings.find((e) => e.id === 'end_3');
    expect(secretEnding).toBeDefined();
    expect(secretEnding.title).toContain('Inicio de la Infancia');
    expect(secretEnding.trophy).toContain('Oro');
    expect(secretEnding.outcome).toContain('Presencia Lunar');

    // Truco de respaldo para ver los 3 finales en una partida
    expect(BB_ENDINGS_GUIDE.backupTrick.length).toBeGreaterThan(0);
  });

  it('should outline all 4 Moon Phases with triggers and points of no return', () => {
    expect(BB_MOON_PHASES.length).toBe(4);

    const bloodMoon = BB_MOON_PHASES.find((p) => p.phase.includes('Luna Roja'));
    expect(bloodMoon).toBeDefined();
    expect(bloodMoon.trigger).toContain('Rom');
    expect(bloodMoon.worldState).toBeTruthy();
    expect(bloodMoon.keyTasks.length).toBeGreaterThan(0);
  });

  it('should link NPC and Route item names correctly to Bloodborne Catalog', () => {
    const sawCleaver = getBloodborneItemByName('Cuchilla dentada');
    expect(sawCleaver).not.toBeNull();
    expect(sawCleaver.category).toBe('armas_truco');

    const ludwigHolyBlade = getBloodborneItemByName('Espada sagrada de Ludwig');
    expect(ludwigHolyBlade).not.toBeNull();
    expect(ludwigHolyBlade.category).toBe('armas_truco');

    const eileenBadge = getBloodborneItemByName('Insignia de cazador de cuervos');
    expect(eileenBadge).not.toBeNull();

    const carylHunter = getBloodborneItemByName('Cazador');
    expect(carylHunter).not.toBeNull();
  });
});
