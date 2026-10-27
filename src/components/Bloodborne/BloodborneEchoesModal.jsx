import React, { useState, useMemo } from 'react';
import {
  X,
  Coins,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  BB_COLDBLOOD_DATA,
  getBloodEchoCost,
  getTotalEchoesBetween,
} from '../../data/bloodborneData';
import { useTrackerStore } from '../../store/useTrackerStore';

export function BloodborneEchoesModal({ isOpen, onClose }) {
  const { character_bb, updateCharacterBB } = useTrackerStore();

  const currentLevel = character_bb?.level || 10;
  const targetLevel = character_bb?.targetLevel || 50;
  const heldEchoes = character_bb?.heldEchoes || 0;
  const inventory = character_bb?.coldbloodInventory || {};

  const setCurrentLevel = (updater) => {
    const nextVal = typeof updater === 'function' ? updater(currentLevel) : updater;
    updateCharacterBB({ level: nextVal });
  };

  const setTargetLevel = (updater) => {
    const nextVal = typeof updater === 'function' ? updater(targetLevel) : updater;
    updateCharacterBB({ targetLevel: nextVal });
  };

  const setHeldEchoes = (val) => {
    updateCharacterBB({ heldEchoes: Math.max(0, val) });
  };

  const handleUpdateItem = (id, delta) => {
    const count = inventory[id] || 0;
    const nextVal = Math.max(0, count + delta);
    updateCharacterBB({
      coldbloodInventory: { ...inventory, [id]: nextVal },
    });
  };

  const handleClearInventory = () => {
    updateCharacterBB({ coldbloodInventory: {} });
  };

  const totalNeeded = useMemo(() => {
    return getTotalEchoesBetween(currentLevel, targetLevel);
  }, [currentLevel, targetLevel]);

  const totalColdbloodEchoes = useMemo(() => {
    return BB_COLDBLOOD_DATA.reduce((acc, item) => {
      const count = inventory[item.id] || 0;
      return acc + count * item.value;
    }, 0);
  }, [inventory]);

  const grandTotal = heldEchoes + totalColdbloodEchoes;
  const difference = grandTotal - totalNeeded;
  const canAfford = difference >= 0;

  if (!isOpen) return null;

  return (
    <div
      id="bb-echoes-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-echoes-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#12070c] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <Coins className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Calculadora de Ecos & Sangre Fría
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  SUEÑO DEL CAZADOR
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Calcula los Ecos de Sangre exactos para subir a tu nivel objetivo con la Muñeca
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
          {/* 1. Niveles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#0d090f] border border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-xs font-serif font-bold text-rose-200">Nivel Actual (BL)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentLevel((prev) => Math.max(4, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="4"
                  max="544"
                  value={currentLevel}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10) || 4;
                    setCurrentLevel(Math.min(544, Math.max(4, v)));
                    if (v >= targetLevel) setTargetLevel(v + 1);
                  }}
                  className="flex-1 bg-black/60 border border-stone-700 rounded-xl py-1 text-center font-mono font-bold text-lg text-rose-300 focus:outline-none focus:border-rose-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLevel((prev) => {
                      const next = Math.min(543, prev + 1);
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
                Siguiente nivel: <strong className="text-rose-300">{getBloodEchoCost(currentLevel).toLocaleString()}</strong> ecos
              </span>
            </div>

            <div className="bg-[#0d090f] border border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-xs font-serif font-bold text-rose-200">Nivel Objetivo (BL)</span>
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
                  max="544"
                  value={targetLevel}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10) || currentLevel + 1;
                    setTargetLevel(Math.min(544, Math.max(currentLevel + 1, v)));
                  }}
                  className="flex-1 bg-black/60 border border-stone-700 rounded-xl py-1 text-center font-mono font-bold text-lg text-rose-300 focus:outline-none focus:border-rose-400"
                />
                <button
                  type="button"
                  onClick={() => setTargetLevel((prev) => Math.min(544, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Botones Meta */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setTargetLevel(currentLevel + 1)}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono hover:text-rose-300"
                >
                  +1 Nivel
                </button>
                <button
                  type="button"
                  onClick={() => setTargetLevel(120)}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono hover:text-rose-300"
                >
                  Meta BL 120
                </button>
                <button
                  type="button"
                  onClick={() => setTargetLevel(150)}
                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono hover:text-rose-300"
                >
                  Meta BL 150
                </button>
              </div>
            </div>

            <div className="bg-[#0d090f] border border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-2">
              <span className="text-xs font-serif font-bold text-rose-200">Ecos en Mano</span>
              <input
                type="number"
                min="0"
                value={heldEchoes}
                onChange={(e) => setHeldEchoes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full bg-black/60 border border-stone-700 rounded-xl py-1.5 px-3 font-mono font-bold text-lg text-rose-300 focus:outline-none focus:border-rose-400"
              />
              <span className="text-[11px] font-mono text-stone-400">Ecos transportados actualmente</span>
            </div>
          </div>

          {/* 2. Tarjeta Resumen */}
          <div className="bg-gradient-to-r from-rose-950/40 via-[#0d090f] to-rose-950/30 border border-rose-500/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
                ECOS REQUERIDOS ({targetLevel - currentLevel} NIVELES)
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-black text-rose-200">
                {totalNeeded.toLocaleString()} <span className="text-sm font-normal text-stone-400">ecos de sangre</span>
              </div>
              <p className="text-xs text-stone-300 font-sans mt-0.5">
                Disponibles:{' '}
                <strong className="text-rose-300 font-mono">{grandTotal.toLocaleString()}</strong> (
                {heldEchoes.toLocaleString()} en mano + {totalColdbloodEchoes.toLocaleString()} en rocío de sangre)
              </p>
            </div>

            <div
              className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-serif text-xs font-bold ${
                canAfford
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
              }`}
            >
              {canAfford ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>¡Suficiente! Te sobran {difference.toLocaleString()} ecos</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Faltan {Math.abs(difference).toLocaleString()} ecos</span>
                </>
              )}
            </div>
          </div>

          {/* 3. Inventario de Rocío de Sangre Fría */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="font-serif text-sm font-bold text-rose-200">
                Inventario de Rocío de Sangre Fría
              </span>
              <button
                type="button"
                onClick={handleClearInventory}
                className="text-xs text-stone-400 hover:text-rose-300 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Vaciar contador</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {BB_COLDBLOOD_DATA.map((item) => {
                const count = inventory[item.id] || 0;
                const totalVal = count * item.value;
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition ${
                      count > 0 ? 'bg-rose-950/20 border-rose-500/40' : 'bg-[#0b080d] border-stone-800/80'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-xs font-bold text-stone-200 truncate">{item.name}</div>
                      <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                        <span className="text-rose-300 font-semibold">{item.value.toLocaleString()} c/u</span>
                        {count > 0 && <span className="text-emerald-400 font-bold ml-1.5">= {totalVal.toLocaleString()}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateItem(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 active:scale-90"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-xs text-rose-200">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateItem(item.id, 1)}
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

        {/* Pie */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Total en Sangre Fría: <strong className="text-rose-300 font-mono">{totalColdbloodEchoes.toLocaleString()}</strong> ecos</span>
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

export default BloodborneEchoesModal;
