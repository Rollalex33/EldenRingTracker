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
  Circle,
  TrendingUp,
  Bookmark,
  Award,
  Search,
  Info,
  Flame,
  Crown,
  Trash2,
} from 'lucide-react';
import { BB_ORIGINS, BB_PRESETS } from '../../data/bloodborneData';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';
import { useTrackerStore } from '../../store/useTrackerStore';
import { getBloodborneItemByName } from '../../utils/bloodborneLinker';
import { calcBBLevel, calcBBPvpRange } from '../../utils/characterCalculators';

const STAT_INFO = {
  vit: { name: 'Vitalidad', desc: 'Determina los Puntos de Salud (PS). Softcap principal: 30 y 50.' },
  res: { name: 'Resistencia', desc: 'Determina la barra verde de energía/estamina. Softcap estricto a 40.' },
  fue: { name: 'Fuerza', desc: 'Requisito y escalado de armas pesadas y contundentes. Softcap: 25 y 50.' },
  hab: { name: 'Habilidad', desc: 'Escalado de armas cortantes y DAÑO VISCERAL por parry. Softcap: 25 y 50.' },
  viv: { name: 'Viveza de Sangre', desc: 'Daño de armas de fuego y armas sangrientas (Chikage, Flecha Simon). Softcap: 25 y 50.' },
  arc: { name: 'Arcano', desc: 'Daño elemental y Herramientas del Cazador (¡Escalan hasta 99!).' },
};

export function BloodborneBuildModal({ isOpen, onClose }) {
  const {
    character_bb,
    updateCharacterBB,
    equipItemBB,
    unequipItemBB,
    itemsCompletados_bb,
    toggleCompletadoBB,
    abrirModalDetalleBB,
  } = useTrackerStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [weaponFilter, setWeaponFilter] = useState('all'); // 'all' | 'armas_truco' | 'armas_fuego'
  const [activePreset, setActivePreset] = useState(null);

  const selectedOrigin = useMemo(() => {
    return BB_ORIGINS.find((o) => o.id === character_bb.origin) || BB_ORIGINS[0];
  }, [character_bb.origin]);

  const stats = character_bb.stats || selectedOrigin.stats;
  const equipped = character_bb.equipped || {};

  const bloodLevel = useMemo(() => {
    return calcBBLevel(selectedOrigin.id, stats);
  }, [selectedOrigin.id, stats]);

  const pvpRange = useMemo(() => {
    return calcBBPvpRange(bloodLevel);
  }, [bloodLevel]);

  const handleSelectOrigin = (origin) => {
    updateCharacterBB({
      origin: origin.id,
      stats: { ...origin.stats },
      level: origin.level,
    });
  };

  const handleStatChange = (statKey, delta) => {
    const minVal = selectedOrigin.stats[statKey] || 1;
    const current = stats[statKey] || minVal;
    const nextVal = Math.min(99, Math.max(minVal, current + delta));
    const nextStats = { ...stats, [statKey]: nextVal };
    const nextLvl = calcBBLevel(selectedOrigin.id, nextStats);
    updateCharacterBB({
      stats: nextStats,
      level: nextLvl,
    });
  };

  const handleApplyPreset = (preset) => {
    setActivePreset(preset);
    const newStats = { ...stats };
    Object.keys(preset.targetStats).forEach((k) => {
      newStats[k] = Math.max(selectedOrigin.stats[k] || 1, preset.targetStats[k]);
    });
    const nextLvl = calcBBLevel(selectedOrigin.id, newStats);
    updateCharacterBB({
      stats: newStats,
      level: nextLvl,
    });
  };

  // Inspeccionar ítem al hacer clic en un nombre o recomendación
  const handleInspectByName = (name) => {
    const item = getBloodborneItemByName(name);
    if (item) {
      abrirModalDetalleBB(item);
    }
  };

  // Armas recomendadas del catálogo según estadísticas
  const recommendedWeapons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return bloodborneCatalog.items.filter((item) => {
      if (item.category !== 'armas_truco' && item.category !== 'armas_fuego') return false;
      if (weaponFilter !== 'all' && item.category !== weaponFilter) return false;
      if (q && !item.name.toLowerCase().includes(q)) return false;

      const req = item.requirements || {};
      for (const [k, v] of Object.entries(req)) {
        if ((stats[k] || 0) < v) return false;
      }
      return true;
    });
  }, [stats, weaponFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      id="bb-build-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-build-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#12070c] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <Crosshair className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Taller de Builds del Cazador
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  PERSISTENTE · BL {bloodLevel}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Tus estadísticas y equipamiento se guardan automáticamente en tu perfil permanente.
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
                Base BL: {selectedOrigin.level} · Origen: <strong className="text-rose-300">{selectedOrigin.name}</strong>
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

            {/* Presets Meta Populares con Sinergias Clickables */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-stone-400 block mb-1.5">
                Arquetipos Meta Populares (Toca un preset para aplicar o un ítem para inspeccionar):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {BB_PRESETS.map((preset) => {
                  const isCur = activePreset?.id === preset.id;
                  return (
                    <div
                      key={preset.id}
                      className={`p-3 rounded-2xl border flex flex-col justify-between transition ${
                        isCur
                          ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.25)]'
                          : 'bg-black/40 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-serif text-xs font-bold text-stone-200 truncate">
                            {preset.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleApplyPreset(preset)}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900 transition flex-shrink-0"
                          >
                            Aplicar
                          </button>
                        </div>
                        <div className="text-[10px] font-mono text-rose-400 mt-0.5 truncate">{preset.archetype}</div>
                        <p className="text-[10px] text-stone-400 font-sans mt-1.5 line-clamp-2 leading-relaxed">
                          {preset.desc}
                        </p>
                      </div>

                      {/* Items recomendados clickables */}
                      <div className="mt-3 pt-2 border-t border-stone-800/80 space-y-1">
                        <div className="text-[9px] font-mono text-stone-400 uppercase font-bold">Equipo sugerido:</div>
                        <div className="flex flex-wrap gap-1">
                          {preset.mainWeapon && (
                            <button
                              type="button"
                              onClick={() => handleInspectByName(preset.mainWeapon.split('/')[0].trim())}
                              className="text-[9px] font-serif px-1.5 py-0.5 rounded bg-stone-900 hover:bg-rose-950 text-rose-300 border border-stone-800 hover:border-rose-500/40 transition flex items-center gap-1"
                              title="Inspeccionar en compendio"
                            >
                              <Sword className="w-2.5 h-2.5 text-rose-400" />
                              <span className="truncate max-w-[120px]">{preset.mainWeapon}</span>
                            </button>
                          )}
                          {preset.sideWeapon && (
                            <button
                              type="button"
                              onClick={() => handleInspectByName(preset.sideWeapon.split('/')[0].trim())}
                              className="text-[9px] font-serif px-1.5 py-0.5 rounded bg-stone-900 hover:bg-amber-950 text-amber-300 border border-stone-800 hover:border-amber-500/40 transition flex items-center gap-1"
                              title="Inspeccionar en compendio"
                            >
                              <Crosshair className="w-2.5 h-2.5 text-amber-400" />
                              <span className="truncate max-w-[120px]">{preset.sideWeapon}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Monitor de Nivel y Rango Cooperativo / Invasión */}
          <div className="bg-gradient-to-r from-rose-950/30 via-[#0e090f] to-rose-950/20 border border-rose-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                NIVEL DE SANGRE PERSISTENTE (BLOOD LEVEL)
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
              onClick={() => {
                updateCharacterBB({
                  stats: { ...selectedOrigin.stats },
                  level: selectedOrigin.level,
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-serif flex items-center gap-1.5 self-start sm:self-auto transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer stats al origen</span>
            </button>
          </div>

          {/* 3. Panel de Asignación de los 6 Atributos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(STAT_INFO).map(([key, info]) => {
              const currentVal = stats[key] || 1;
              const minVal = selectedOrigin.stats[key] || 1;
              const isSoftcap50 = currentVal >= 50;

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between transition ${
                    isSoftcap50
                      ? 'bg-rose-950/20 border-rose-500/50 shadow-inner'
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
                        const nextVal = Math.min(99, Math.max(minVal, v));
                        const nextStats = { ...stats, [key]: nextVal };
                        updateCharacterBB({
                          stats: nextStats,
                          level: calcBBLevel(selectedOrigin.id, nextStats),
                        });
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

          {/* 4. Banco de Trabajo: Equipamiento Activo del Cazador */}
          <div className="bg-[#0b080d] border border-rose-950/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
              <span className="text-xs font-serif font-bold text-rose-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-rose-400" />
                <span>Equipo Activo del Cazador (Persistente)</span>
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                Toca cualquier casilla para inspeccionar o desequipar
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Arma Truco 1 */}
              <div className="p-2.5 rounded-xl bg-black/50 border border-stone-800 flex flex-col justify-between min-h-[70px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">Arma Truco 1</span>
                  {equipped.trickWeapon1 && (
                    <button
                      onClick={() => unequipItemBB('trickWeapon1')}
                      className="text-stone-500 hover:text-rose-400 transition"
                      title="Desequipar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {equipped.trickWeapon1 ? (
                  <div
                    onClick={() => abrirModalDetalleBB(equipped.trickWeapon1)}
                    className="cursor-pointer group mt-1"
                  >
                    <div className="font-serif text-xs font-bold text-rose-200 group-hover:text-rose-300 truncate">
                      {equipped.trickWeapon1.name}
                    </div>
                    <div className="text-[9px] font-mono text-stone-400">Inspeccionar ✦</div>
                  </div>
                ) : (
                  <span className="text-xs text-stone-600 italic">Vacío</span>
                )}
              </div>

              {/* Arma Truco 2 */}
              <div className="p-2.5 rounded-xl bg-black/50 border border-stone-800 flex flex-col justify-between min-h-[70px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">Arma Truco 2</span>
                  {equipped.trickWeapon2 && (
                    <button
                      onClick={() => unequipItemBB('trickWeapon2')}
                      className="text-stone-500 hover:text-rose-400 transition"
                      title="Desequipar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {equipped.trickWeapon2 ? (
                  <div
                    onClick={() => abrirModalDetalleBB(equipped.trickWeapon2)}
                    className="cursor-pointer group mt-1"
                  >
                    <div className="font-serif text-xs font-bold text-rose-200 group-hover:text-rose-300 truncate">
                      {equipped.trickWeapon2.name}
                    </div>
                    <div className="text-[9px] font-mono text-stone-400">Inspeccionar ✦</div>
                  </div>
                ) : (
                  <span className="text-xs text-stone-600 italic">Vacío</span>
                )}
              </div>

              {/* Arma Fuego 1 */}
              <div className="p-2.5 rounded-xl bg-black/50 border border-stone-800 flex flex-col justify-between min-h-[70px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Arma de Fuego 1</span>
                  {equipped.firearm1 && (
                    <button
                      onClick={() => unequipItemBB('firearm1')}
                      className="text-stone-500 hover:text-rose-400 transition"
                      title="Desequipar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {equipped.firearm1 ? (
                  <div
                    onClick={() => abrirModalDetalleBB(equipped.firearm1)}
                    className="cursor-pointer group mt-1"
                  >
                    <div className="font-serif text-xs font-bold text-amber-200 group-hover:text-amber-300 truncate">
                      {equipped.firearm1.name}
                    </div>
                    <div className="text-[9px] font-mono text-stone-400">Inspeccionar ✦</div>
                  </div>
                ) : (
                  <span className="text-xs text-stone-600 italic">Vacío</span>
                )}
              </div>

              {/* Arma Fuego 2 */}
              <div className="p-2.5 rounded-xl bg-black/50 border border-stone-800 flex flex-col justify-between min-h-[70px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Arma de Fuego 2</span>
                  {equipped.firearm2 && (
                    <button
                      onClick={() => unequipItemBB('firearm2')}
                      className="text-stone-500 hover:text-rose-400 transition"
                      title="Desequipar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {equipped.firearm2 ? (
                  <div
                    onClick={() => abrirModalDetalleBB(equipped.firearm2)}
                    className="cursor-pointer group mt-1"
                  >
                    <div className="font-serif text-xs font-bold text-amber-200 group-hover:text-amber-300 truncate">
                      {equipped.firearm2.name}
                    </div>
                    <div className="text-[9px] font-mono text-stone-400">Inspeccionar ✦</div>
                  </div>
                ) : (
                  <span className="text-xs text-stone-600 italic">Vacío</span>
                )}
              </div>
            </div>

            {/* Fila de Atuendo */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-stone-800/60">
              {[
                { slot: 'attireHead', label: 'Cabeza' },
                { slot: 'attireChest', label: 'Pecho' },
                { slot: 'attireHands', label: 'Guantes' },
                { slot: 'attireLegs', label: 'Piernas' },
              ].map(({ slot, label }) => {
                const item = equipped[slot];
                return (
                  <div key={slot} className="p-2 rounded-xl bg-black/40 border border-stone-850 flex flex-col justify-between min-h-[55px]">
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                      <span>{label}</span>
                      {item && (
                        <button onClick={() => unequipItemBB(slot)} className="text-stone-500 hover:text-rose-400">
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    {item ? (
                      <div onClick={() => abrirModalDetalleBB(item)} className="cursor-pointer group truncate mt-0.5">
                        <span className="text-xs font-serif font-bold text-stone-200 group-hover:text-rose-300 truncate block">
                          {item.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-stone-600 italic">Vacío</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Armas Compatibles con estos Atributos (Clickables para Inspeccionar o Equipar) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
              <span className="text-xs font-serif font-bold text-rose-300 flex items-center gap-1.5">
                <Sword className="w-4 h-4 text-rose-400" />
                <span>Armas que Puedes Blandir Actualmente ({recommendedWeapons.length})</span>
              </span>

              {/* Filtros rápidos */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar arma compatible..."
                    className="bg-black/60 border border-stone-800 rounded-lg pl-6 pr-2 py-1 text-xs text-stone-200 focus:outline-none focus:border-rose-500 placeholder-stone-600"
                  />
                  <Search className="w-3 h-3 text-stone-500 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-800 text-[10px] font-mono">
                  <button
                    onClick={() => setWeaponFilter('all')}
                    className={`px-2 py-0.5 rounded ${weaponFilter === 'all' ? 'bg-rose-950 text-rose-200 font-bold' : 'text-stone-400'}`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setWeaponFilter('armas_truco')}
                    className={`px-2 py-0.5 rounded ${weaponFilter === 'armas_truco' ? 'bg-rose-950 text-rose-200 font-bold' : 'text-stone-400'}`}
                  >
                    Truco
                  </button>
                  <button
                    onClick={() => setWeaponFilter('armas_fuego')}
                    className={`px-2 py-0.5 rounded ${weaponFilter === 'armas_fuego' ? 'bg-rose-950 text-rose-200 font-bold' : 'text-stone-400'}`}
                  >
                    Fuego
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {recommendedWeapons.map((w) => {
                const isCompleted = itemsCompletados_bb.has(w.id);
                const isTrick = w.category === 'armas_truco';

                return (
                  <div
                    key={w.id}
                    className="p-2.5 rounded-xl bg-[#0b080d] border border-stone-800/80 hover:border-rose-500/50 flex items-center justify-between gap-2 transition group"
                  >
                    <div
                      onClick={() => abrirModalDetalleBB(w)}
                      className="min-w-0 flex-1 cursor-pointer"
                      title="Haz clic para ver la guía completa, lore y stats"
                    >
                      <div className="font-serif text-xs font-bold text-stone-200 group-hover:text-rose-300 truncate flex items-center gap-1.5">
                        <span>{w.name}</span>
                        <Info className="w-3 h-3 text-stone-500 group-hover:text-rose-400 flex-shrink-0" />
                      </div>
                      <div className="text-[10px] font-mono text-stone-400 truncate">{w.subcategory}</div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Botón Equipar */}
                      <button
                        type="button"
                        onClick={() => {
                          if (isTrick) {
                            equipItemBB('trickWeapon1', w);
                          } else {
                            equipItemBB('firearm1', w);
                          }
                        }}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-stone-900 hover:bg-rose-950 text-stone-300 hover:text-rose-200 border border-stone-700 hover:border-rose-500 transition active:scale-95"
                        title="Equipar en tu build activa"
                      >
                        Equipar
                      </button>

                      {/* Botón Marcar / Desmarcar */}
                      <button
                        type="button"
                        onClick={() => toggleCompletadoBB(w.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border transition ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                            : 'bg-stone-900 text-stone-500 border-stone-800 hover:text-white'
                        }`}
                        title={isCompleted ? 'Desmarcar' : 'Marcar como conseguido'}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pie */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Bloodborne Persistent Build Engine · Sincronizado</span>
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
