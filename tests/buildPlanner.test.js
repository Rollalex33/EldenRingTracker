import { describe, it, expect } from 'vitest';
import { STARTING_CLASSES, BUILD_PRESETS } from '../src/components/Builds/BuildPlannerModal.jsx';
import itemRequirements from '../src/data/itemRequirements.json';

describe('Build Planner & Recommender Engine', () => {
  it('should have all 10 authentic Elden Ring starting classes', () => {
    expect(STARTING_CLASSES.length).toBe(10);

    const classIds = STARTING_CLASSES.map((c) => c.id);
    expect(classIds).toContain('vagabond');
    expect(classIds).toContain('samurai');
    expect(classIds).toContain('hero');
    expect(classIds).toContain('warrior');
    expect(classIds).toContain('astrologer');
    expect(classIds).toContain('prophet');
    expect(classIds).toContain('confessor');
    expect(classIds).toContain('bandit');
    expect(classIds).toContain('prisoner');
    expect(classIds).toContain('wretch');
  });

  it('should verify Wretch class is Level 1 with 10 in all stats', () => {
    const wretch = STARTING_CLASSES.find((c) => c.id === 'wretch');
    expect(wretch).toBeDefined();
    expect(wretch.level).toBe(1);
    Object.values(wretch.stats).forEach((val) => {
      expect(val).toBe(10);
    });
  });

  it('should verify all starting classes follow FromSoftware level formula', () => {
    // Level = 1 + (Sum(stats) - 80)
    STARTING_CLASSES.forEach((cls) => {
      const statSum = Object.values(cls.stats).reduce((a, b) => a + b, 0);
      const computedLevel = statSum - 79;
      expect(cls.level).toBe(computedLevel);
    });
  });

  it('should include popular meta build archetypes', () => {
    expect(BUILD_PRESETS.length).toBeGreaterThanOrEqual(4);
    const presetIds = BUILD_PRESETS.map((p) => p.id);
    expect(presetIds).toContain('guts_str');
    expect(presetIds).toContain('rivers_bleed');
    expect(presetIds).toContain('moonlight_sorc');
    expect(presetIds).toContain('blasphemous_faith');

    BUILD_PRESETS.forEach((preset) => {
      expect(preset.name).toBeTypeOf('string');
      expect(preset.targetStats).toBeDefined();
      expect(preset.targetStats.vig).toBeGreaterThanOrEqual(40); // Endgame softcap
    });
  });

  it('should have itemRequirements.json mapped with valid numeric stats', () => {
    const itemKeys = Object.keys(itemRequirements);
    expect(itemKeys.length).toBeGreaterThan(500);

    // Test specific well-known weapons
    // Colmillo de sabueso: armas_armas-p44 (Req: Fue 18, Des 17)
    const bloodhound = itemRequirements['armas_armas-p44'];
    expect(bloodhound).toBeDefined();
    expect(bloodhound.str).toBe(18);
    expect(bloodhound.dex).toBe(17);

    // Hoja blasfema: armas_armas-p268 (Req: Fue 22, Des 15, Fe 21)
    const blasphemous = itemRequirements['armas_armas-p268'];
    expect(blasphemous).toBeDefined();
    expect(blasphemous.str).toBe(22);
    expect(blasphemous.dex).toBe(15);
    expect(blasphemous.fth).toBe(21);

    // Espadón de la luna llena: armas_armas-p198 (Req: Fue 16, Des 11, Int 38)
    const moonlight = itemRequirements['armas_armas-p198'];
    expect(moonlight).toBeDefined();
    expect(moonlight.str).toBe(16);
    expect(moonlight.int).toBe(38);
  });
});
