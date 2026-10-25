import React, { useState, useMemo } from 'react';
import {
  X,
  Coins,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Zap,
} from 'lucide-react';

/**
 * Tabla auténtica y fórmula matemática de costo de runas por nivel en Elden Ring
 */
const LOW_LEVEL_COSTS = [
  0, 673, 689, 706, 723, 740, 757, 775, 793, 811, 829, 847
];

export function getRuneCostForLevel(level) {
  if (level <= 0) return 0;
  if (level < 12) {
    return LOW_LEVEL_COSTS[level] || 0;
  }
  // Fórmula polinómica oficial de FromSoftware para L >= 12:
  const cost = 0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895;
  return Math.floor(cost);
}

export function getTotalRunesBetweenLevels(startLvl, targetLvl) {
  if (targetLvl <= startLvl) return 0;
  let total = 0;
  for (let l = startLvl; l < targetLvl; l++) {
    total += getRuneCostForLevel(l);
  }
  return total;
}

export const GOLDEN_RUNES_DATA = [
  { id: 'gr1', name: 'Runa dorada [1]', value: 200, tier: 'base' },
  { id: 'gr2', name: 'Runa dorada [2]', value: 400, tier: 'base' },
  { id: 'gr3', name: 'Runa dorada [3]', value: 800, tier: 'base' },
  { id: 'gr4', name: 'Runa dorada [4]', value: 1200, tier: 'base' },
  { id: 'gr5', name: 'Runa dorada [5]', value: 1600, tier: 'base' },
  { id: 'gr6', name: 'Runa dorada [6]', value: 2000, tier: 'mid' },
  { id: 'gr7', name: 'Runa dorada [7]', value: 2500, tier: 'mid' },
  { id: 'gr8', name: 'Runa dorada [8]', value: 3000, tier: 'mid' },
  { id: 'gr9', name: 'Runa dorada [9]', value: 3800, tier: 'mid' },
  { id: 'gr10', name: 'Runa dorada [10]', value: 5000, tier: 'high' },
  { id: 'gr11', name: 'Runa dorada [11]', value: 6200, tier: 'high' },
  { id: 'gr12', name: 'Runa dorada [12]', value: 7500, tier: 'high' },
  { id: 'gr13', name: 'Runa dorada [13]', value: 10000, tier: 'high' },
  { id: 'numen', name: 'Runa de numen', value: 12500, tier: 'legend' },
  { id: 'hero1', name: 'Runa de héroe [1]', value: 15000, tier: 'legend' },
  { id: 'hero2', name: 'Runa de héroe [2]', value: 20000, tier: 'legend' },
  { id: 'hero3', name: 'Runa de héroe [3]', value: 25000, tier: 'legend' },
  { id: 'hero4', name: 'Runa de héroe [4]', value: 30000, tier: 'legend' },
  { id: 'hero5', name: 'Runa de héroe [5]', value: 35000, tier: 'legend' },
  { id: 'lord', name: 'Runa de señor', value: 50000, tier: 'legend' },
  { id: 'marika', name: 'Runa de Marika (DLC)', value: 80000, tier: 'dlc' },
];

export function RuneCalculatorModal({ isOpen, onClose }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(25);
  const [heldRunes, setHeldRunes] = useState(0);
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('er_rune_inventory');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUpdateItemCount = (id, delta) => {
    setInventory((prev) => {
      const current = prev[id] || 0;
      const nextVal = Math.max(0, current + delta);
      const updated = { ...prev, [id]: nextVal };
      try {
        localStorage.setItem('er_rune_inventory', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSetExactItemCount = (id, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setInventory((prev) => {
      const updated = { ...prev, [id]: num };
      try {
        localStorage.setItem('er_rune_inventory', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearInventory = () => {
    setInventory({});
    try {
      localStorage.removeItem('er_rune_inventory');
    } catch {}
  };

  // Cálculo de runas totales necesarias
  const totalRunesNeeded = useMemo(() => {
    return getTotalRunesBetweenLevels(currentLevel, targetLevel);
  }, [currentLevel, targetLevel]);

  // Total de runas en consumibles del inventario
  const totalInventoryRunes = useMemo(() => {
    return GOLDEN_RUNES_DATA.reduce((acc, item) => {
      const count = inventory[item.id] || 0;
      return acc + count * item.value;
    }, 0);
  }, [inventory]);

  const grandTotalAvailable = heldRunes + totalInventoryRunes;
  const difference = grandTotalAvailable - totalRunesNeeded;
  const canAfford = difference >= 0;

  // Cuántos niveles se pueden subir inmediatamente con las runas totales
  const affordableLevels = useMemo(() => {
    let budget = grandTotalAvailable;
    let lvl = currentLevel;
    let levelsGained = 0;
    while (lvl < 713) {
      const nextCost = getRuneCostForLevel(lvl);
      if (budget >= nextCost) {
        budget -= nextCost;
        lvl++;
        levelsGained++;
      } else {
        break;
      }
    }
    return { levelsGained, finalLevel: lvl, leftover: budget };
  }, [grandTotalAvailable, currentLevel]);

  if (!isOpen) return null;

  return (
    <div
      id="rune-calc-modal-overlay"
      className="fixed inset-0 z-[130] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'rune-calc-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#090a10] border border-amber-500/40 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl shadow-black overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-gradient-to-r from-[#06070a] via-[#0c0d14] to-[#06070a] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 via-black to-stone-900 border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(201,160,80,0.3)]">
              <Coins className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-decorative font-bold gold-gradient-text tracking-wide">
                  Calculadora de Runas & Consumibles
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  FÓRMULA EXACTA
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Planifica tus niveles y calcula si tus Runas Doradas son suficientes para subir
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

        {/* Contenido scrolleable */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
          {/* 1. Selector de Nivel Actual y Nivel Objetivo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Nivel Actual */}
            <div className="bg-[#0e0f17] border border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-xs font-serif font-bold text-amber-200">Nivel Actual</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentLevel((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="712"
                  value={currentLevel}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10) || 1;
                    setCurrentLevel(Math.min(712, Math.max(1, v)));
                    if (v >= targetLevel) setTargetLevel(Math.min(713, v + 1));
                  }}
                  className="flex-1 bg-black/60 border border-stone-700 rounded-xl py-1 text-center font-mono font-bold text-lg text-amber-300 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLevel((prev) => {
                      const next = Math.min(712, prev + 1);
                      if (next >= targetLevel) setTargetLevel(next + 1);
                      return next;
                    });
                  }}
                  className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                Siguiente nivel: <strong className="text-amber-300">{getRuneCostForLevel(currentLevel).toLocaleString()}</strong> runas
              </span>
            </div>

            {/* Nivel Objetivo */}
            <div className="bg-[#0e0f17] border border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-xs font-serif font-bold text-amber-200">Nivel Objetivo</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTargetLevel((prev) => Math.max(currentLevel + 1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min={currentLevel + 1}
                  max="713"
                  value={targetLevel}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10) || currentLevel + 1;
                    setTargetLevel(Math.min(713, Math.max(currentLevel + 1, v)));
                  }}
                  className="flex-1 bg-black/60 border border-stone-700 rounded-xl py-1 text-center font-mono font-bold text-lg text-amber-300 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setTargetLevel((prev) => Math.min(713, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Botones de atajo meta */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setTargetLevel(currentLevel + 1)}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono hover:text-amber-300"
                >
                  +1 Nivel
                </button>
                <button
                  type="button"
                  onClick={() => setTargetLevel(125)}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono hover:text-amber-300"
                >
                  Meta 125
                </button>
                <button
                  type="button"
                  onClick={() => setTargetLevel(150)}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono hover:text-amber-300"
                >
                  Meta 150
                </button>
              </div>
            </div>

            {/* Runas en Mano (Monedero Activo) */}
            <div className="bg-[#0e0f17] border border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-xs font-serif font-bold text-amber-200">Runas Actuales en Mano</span>
              <input
                type="number"
                min="0"
                value={heldRunes}
                onChange={(e) => setHeldRunes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                placeholder="0"
                className="w-full bg-black/60 border border-stone-700 rounded-xl py-1.5 px-3 font-mono font-bold text-lg text-amber-300 focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] font-mono text-stone-400">
                Runas que llevas sin gastar
              </span>
            </div>
          </div>

          {/* 2. Tarjeta Resumen de la Ecuación */}
          <div className="bg-gradient-to-r from-amber-950/40 via-[#0e0f17] to-amber-950/30 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_20px_rgba(201,160,80,0.15)]">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> REQUERIMIENTO TOTAL ({targetLevel - currentLevel} niveles)
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-black gold-gradient-text">
                {totalRunesNeeded.toLocaleString()} <span className="text-base font-normal text-stone-400">runas</span>
              </div>
              <p className="text-xs text-stone-300 font-sans">
                Disponibles:{' '}
                <strong className="text-amber-300 font-mono">{grandTotalAvailable.toLocaleString()}</strong> (
                {heldRunes.toLocaleString()} en mano + {totalInventoryRunes.toLocaleString()} en inventario)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div
                className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-serif text-xs font-bold ${
                  canAfford
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : 'bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                }`}
              >
                {canAfford ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>¡Suficiente! Sobran {difference.toLocaleString()}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Faltan {Math.abs(difference).toLocaleString()} runas</span>
                  </>
                )}
              </div>

              {affordableLevels.levelsGained > 0 && (
                <div className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Subirías hoy a Nvl. {affordableLevels.finalLevel}</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. Inventario de Runas Doradas & Consumibles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif text-sm font-bold text-amber-200">
                  Inventario de Runas Doradas en tu Zurrón
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClearInventory}
                className="text-xs text-stone-400 hover:text-amber-300 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Vaciar contador</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {GOLDEN_RUNES_DATA.map((item) => {
                const count = inventory[item.id] || 0;
                const totalItemRunes = count * item.value;
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition ${
                      count > 0
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : 'bg-[#0b0c12] border-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-xs font-bold text-stone-200 truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400 flex items-center gap-2 mt-0.5">
                        <span className="text-amber-300 font-semibold">{item.value.toLocaleString()} c/u</span>
                        {count > 0 && (
                          <span className="text-emerald-400 font-bold">
                            = {totalItemRunes.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateItemCount(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={count || ''}
                        placeholder="0"
                        onChange={(e) => handleSetExactItemCount(item.id, e.target.value)}
                        className="w-12 py-1 text-center font-mono font-bold text-xs bg-black/60 border border-stone-700 rounded-lg text-amber-200 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateItemCount(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#06070a] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Total en consumibles: <strong className="text-amber-300 font-mono">{totalInventoryRunes.toLocaleString()}</strong> runas</span>
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

export default RuneCalculatorModal;
