import React, { useState, useMemo } from 'react';
import {
  X,
  Crosshair,
  Sword,
  Shield,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  Award,
} from 'lucide-react';
import { BB_ORIGINS, BB_PRESETS } from '../../data/bloodborneData';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';

const STAT_INFO = {
  vit: { name: 'Vitalidad', desc: 'Determina los Puntos de Salud (PS). Softcap principal: 30 y 50.' },
  res: { name: 'Resistencia', desc: 'Determina la barra verde de energía/estamina. Softcap estricto a 40.' },
  fue: { name: 'Fuerza', desc: 'Requisito y escalado de armas pesadas y contundentes. Softcap: 25 y 50.' },
  hab: { name: 'Habilidad', desc: 'Escalado de armas cortantes y DAÑO VISCERAL por parry. Softcap: 25 y 50.' },
  viv: { name: 'Viveza de Sangre', desc: 'Daño de armas de fuego y armas sangrientas (Chikage, Flecha Simon). Softcap: 25 y 50.' },
  arc: { name: 'Arcano', desc: 'Daño de fuego/rayo/arcano y Herramientas de Cazador. ¡Las herramientas escalan hasta 99!' },
};

export function BloodborneBuildModal({ isOpen, onClose }) {
  const [selectedOrigin, setSelectedOrigin] = useState(BB_ORIGINS[0]);
  const [stats, setStats] = useState(BB_ORIGINS[0].stats);

  const handleSelectOrigin = (origin) => {
    setSelectedOrigin(origin);
    setStats({ ...origin.stats });
  };

  const handleStatChange = (statKey, delta) => {
    const minVal = selectedOrigin.stats[statKey];
    setStats((prev) => {
      const current = prev[statKey];
      const nextVal = Math.min(99, Math.max(minVal, current + delta));
      return { ...prev, [statKey]: nextVal };
    });
  };

  const bloodLevel = useMemo(() => {
    const statSum = Object.values(stats).reduce((a, b) => a + b, 0);
    const originSum = Object.values(selectedOrigin.stats).reduce((a, b) => a + b, 0);
    return selectedOrigin.level + (statSum - originSum);
  }, [stats, selectedOrigin]);

  const pvpRange = useMemo(() => {
    // Rango PvP canónico de invocación y cacería
    const lower = Math.max(1, Math.floor(bloodLevel - 10 - bloodLevel * 0.1));
    const upper = Math.floor(bloodLevel + 10 + bloodLevel * 0.1);
    return `${lower} - ${upper}`;
  }, [bloodLevel]);

  // Armas recomendadas del catálogo según estadísticas
  const recommendedWeapons = useMemo(() => {
    return bloodborneCatalog.items.filter((item) => {
      if (item.category !== 'armas_truco' && item.category !== 'armas_fuego') return false;
      const req = item.requirements || {};
      for (const [k, v] of Object.entries(req)) {
        if ((stats[k] || 0) < v) return false;
      }
      return true;
    });
  }, [stats]);

  if (!isOpen) return null;

  return (
    <div
      id="bb-build-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-build-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#12070c] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <Crosshair className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Taller de Builds del Cazador
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  BLOODBORNE ENGINE
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Simula tu Nivel de Sangre, ajusta atributos con softcaps y calcula compatibilidad de armas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition active:scale-95"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
          {/* 1. Selector de Orígenes y Presets de Build */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-rose-300">
                1. Selecciona tu Origen (Clase Inicial)
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                Base BL: {selectedOrigin.level}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BB_ORIGINS.map((origin) => {
                const isSelected = selectedOrigin.id === origin.id;
                return (
                  <button
                    key={origin.id}
                    type="button"
                    onClick={() => handleSelectOrigin(origin)}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-rose-950/50 border-rose-500 text-rose-200 shadow-[0_0_12px_rgba(225,29,72,0.3)]'
                        : 'bg-[#0d0a0f] border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="font-serif text-xs font-bold truncate">{origin.name}</div>
                    <div className="text-[10px] font-mono text-stone-400 mt-0.5">Nivel {origin.level}</div>
                  </button>
                );
              })}
            </div>

            {/* Presets Meta Populares */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-stone-400 block mb-1.5">
                O carga un Arquetipo Meta Recomendado:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {BB_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setStats({ ...preset.targetStats });
                    }}
                    className="p-2.5 rounded-xl bg-black/40 hover:bg-rose-950/30 border border-stone-800 hover:border-rose-500/50 text-left transition group"
                  >
                    <div className="font-serif text-xs font-bold text-stone-200 group-hover:text-rose-300 truncate">
                      {preset.name}
                    </div>
                    <div className="text-[10px] font-mono text-rose-400 mt-0.5">{preset.archetype}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Monitor de Nivel y Rango Cooperativo / Invasión */}
          <div className="bg-gradient-to-r from-rose-950/30 via-[#0e090f] to-rose-950/20 border border-rose-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                NIVEL DE SANGRE (BLOOD LEVEL)
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-black text-rose-200 mt-0.5">
                BL {bloodLevel}
              </div>
              <p className="text-xs text-stone-400 font-sans mt-1">
                Rango PvP / Coop con Campanas: <strong className="text-rose-300 font-mono">{pvpRange}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStats({ ...selectedOrigin.stats })}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-serif flex items-center gap-1.5 self-start sm:self-auto transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer stats</span>
            </button>
          </div>

          {/* 3. Panel de Asignación de los 6 Atributos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(STAT_INFO).map(([key, info]) => {
              const currentVal = stats[key];
              const minVal = selectedOrigin.stats[key];
              const isSoftcap50 = currentVal >= 50;

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between transition ${
                    isSoftcap50
                      ? 'bg-rose-950/20 border-rose-500/50'
                      : 'bg-[#0d090f] border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-xs font-bold text-rose-200">{info.name}</span>
                    {currentVal >= 50 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        SOFTCAP 50
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 my-1">
                    <button
                      type="button"
                      disabled={currentVal <= minVal}
                      onClick={() => handleStatChange(key, -1)}
                      className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-30 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min={minVal}
                      max="99"
                      value={currentVal}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10) || minVal;
                        setStats((prev) => ({
                          ...prev,
                          [key]: Math.min(99, Math.max(minVal, v)),
                        }));
                      }}
                      className="flex-1 bg-black/60 border border-stone-700 rounded-xl py-1 text-center font-mono font-bold text-lg text-rose-300 focus:outline-none focus:border-rose-400"
                    />
                    <button
                      type="button"
                      disabled={currentVal >= 99}
                      onClick={() => handleStatChange(key, 1)}
                      className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-30 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-stone-400 font-sans mt-2 line-clamp-2">
                    {info.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 4. Armas Compatibles con estos Atributos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs font-serif font-bold text-rose-300 flex items-center gap-1.5">
                <Sword className="w-4 h-4 text-rose-400" />
                <span>Armas que Puedes Blandir Actualmente ({recommendedWeapons.length})</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {recommendedWeapons.map((w) => (
                <div
                  key={w.id}
                  className="p-2.5 rounded-xl bg-[#0b080d] border border-stone-800/80 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-serif text-xs font-bold text-stone-200 truncate">{w.name}</div>
                    <div className="text-[10px] font-mono text-stone-400 truncate">{w.subcategory}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30 flex-shrink-0">
                    Blandible
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Bloodborne Stat & Weapon Scaling Calculator</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default BloodborneBuildModal;
