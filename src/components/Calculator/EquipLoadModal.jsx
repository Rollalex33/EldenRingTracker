import React, { useState, useMemo } from 'react';
import {
  X,
  Shield,
  Sword,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Plus,
  Trash2,
  Search,
  Scale,
  Zap,
} from 'lucide-react';
import checklistCatalog from '../../data/checklistCatalog.json';

/**
 * Curvas oficiales de Elden Ring para Carga Máxima según Aguante (Endurance)
 */
export function calcMaxEquipLoad(endurance) {
  const end = Math.min(Math.max(Number(endurance) || 1, 1), 99);
  if (end <= 8) return 45.0;
  if (end <= 25) return 45.0 + (end - 8) * (27 / 17);
  if (end <= 60) return 72.0 + (end - 25) * (48 / 35);
  return 120.0 + (end - 60) * (40 / 39);
}

/**
 * Cálculo inverso: Aguante mínimo necesario para una carga máxima objetivo
 */
export function getRequiredEndurance(targetMaxLoad, multiplier = 1.0) {
  const neededRaw = targetMaxLoad / multiplier;
  if (neededRaw <= 45.0) return 8;
  if (neededRaw <= 72.0) return Math.ceil(8 + (neededRaw - 45.0) * (17 / 27));
  if (neededRaw <= 120.0) return Math.ceil(25 + (neededRaw - 72.0) * (35 / 48));
  if (neededRaw <= 160.0) return Math.ceil(60 + (neededRaw - 120.0) * (39 / 40));
  return 99;
}

const TALISMAN_PRESETS = [
  { id: 'greatjar', name: 'Gran tarro arsenal', bonus: 0.19, desc: '+19% carga máxima' },
  { id: 'arsenal1', name: 'Amuleto del arsenal +1', bonus: 0.17, desc: '+17% carga máxima' },
  { id: 'arsenal0', name: 'Amuleto del arsenal', bonus: 0.15, desc: '+15% carga máxima' },
  { id: 'favor2', name: 'Favor del Árbol Áureo +2', bonus: 0.02, desc: '+2% carga máxima' },
  { id: 'favor1', name: 'Favor del Árbol Áureo +1', bonus: 0.018, desc: '+1.8% carga máxima' },
  { id: 'favor0', name: 'Favor del Árbol Áureo', bonus: 0.015, desc: '+1.5% carga máxima' },
];

export function EquipLoadModal({ isOpen, onClose }) {
  const [endurance, setEndurance] = useState(25);
  const [selectedTalismans, setSelectedTalismans] = useState([]);
  const [manualWeight, setManualWeight] = useState(38.5);
  const [useSlotsMode, setUseSlotsMode] = useState(false);

  // Slots de equipamiento
  const [equippedSlots, setEquippedSlots] = useState({
    rh1: null,
    rh2: null,
    lh1: null,
    lh2: null,
    head: null,
    chest: null,
    arms: null,
    legs: null,
  });

  const [activeSlotSearch, setActiveSlotSearch] = useState(null);
  const [slotSearchQuery, setSlotSearchQuery] = useState('');

  // Multiplicador de talismanes
  const talismanMultiplier = useMemo(() => {
    let mult = 1.0;
    selectedTalismans.forEach((talId) => {
      const preset = TALISMAN_PRESETS.find((p) => p.id === talId);
      if (preset) mult += preset.bonus;
    });
    return mult;
  }, [selectedTalismans]);

  // Carga máxima real
  const baseMaxLoad = useMemo(() => calcMaxEquipLoad(endurance), [endurance]);
  const finalMaxLoad = useMemo(
    () => baseMaxLoad * talismanMultiplier,
    [baseMaxLoad, talismanMultiplier]
  );

  // Peso actual equipado
  const currentWeight = useMemo(() => {
    if (!useSlotsMode) return Number(manualWeight) || 0;
    let sum = 0;
    Object.values(equippedSlots).forEach((item) => {
      if (item && item.weight) sum += item.weight;
    });
    return sum;
  }, [useSlotsMode, manualWeight, equippedSlots]);

  // Porcentaje de carga y categoría de rodamiento
  const equipPercentage = useMemo(() => {
    if (finalMaxLoad <= 0) return 0;
    return (currentWeight / finalMaxLoad) * 100;
  }, [currentWeight, finalMaxLoad]);

  const rollTier = useMemo(() => {
    if (equipPercentage > 100.0) {
      return {
        id: 'overloaded',
        name: 'Sobrecargado',
        color: 'text-rose-400',
        bg: 'bg-rose-950/80 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
        badge: 'bg-rose-900 text-rose-200 border-rose-500/50',
        description: 'No puedes rodar ni esprintar. La velocidad y el salto son lentos.',
        iframes: '0 frames (Sin rodar)',
        penalty: 'Consumo de stamina +20%',
      };
    }
    if (equipPercentage > 70.0) {
      return {
        id: 'heavy',
        name: 'Pesado (Fat Roll)',
        color: 'text-amber-400',
        bg: 'bg-amber-950/70 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]',
        badge: 'bg-amber-900 text-amber-200 border-amber-500/50',
        description: '¡Fat Roll! Animación de esquiva lenta, vulnerable y fácil de castigar.',
        iframes: '12 frames invulnerabilidad (16 frames recuperación lenta)',
        penalty: 'Recuperación de stamina -20%',
      };
    }
    if (equipPercentage >= 30.0) {
      return {
        id: 'medium',
        name: 'Medio (Recomendado)',
        color: 'text-elden-gold',
        bg: 'bg-elden-900/95 border-elden-gold/60 shadow-gold-glow',
        badge: 'bg-elden-950 text-elden-gold border-elden-gold/50',
        description: 'Rodamiento estándar equilibrado. Ideal para el 95% de situaciones de combate.',
        iframes: '13 frames invulnerabilidad',
        penalty: 'Sin penalizaciones',
      };
    }
    return {
      id: 'light',
      name: 'Ligero (Fast Roll)',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/80 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      badge: 'bg-emerald-900 text-emerald-200 border-emerald-500/50',
      description: 'Rodamiento súper rápido y de gran distancia. Máxima movilidad.',
      iframes: '13 frames invulnerabilidad (+15% distancia recorrida)',
      penalty: 'Sin penalizaciones',
    };
  }, [equipPercentage]);

  // Cálculos de optimización de Aguante
  const neededEndForMedium = useMemo(() => {
    // Para rodamiento medio: peso / maxLoad <= 0.70 => maxLoad >= peso / 0.70
    const targetMax = currentWeight / 0.70;
    return getRequiredEndurance(targetMax, talismanMultiplier);
  }, [currentWeight, talismanMultiplier]);

  const neededEndForLight = useMemo(() => {
    // Para rodamiento ligero: peso / maxLoad <= 0.299 => maxLoad >= peso / 0.299
    const targetMax = currentWeight / 0.299;
    return getRequiredEndurance(targetMax, talismanMultiplier);
  }, [currentWeight, talismanMultiplier]);

  // Peso a retirar para bajar de tier
  const weightToMedium = useMemo(() => {
    const maxWeightAllowed = finalMaxLoad * 0.70;
    return Math.max(0, currentWeight - maxWeightAllowed);
  }, [currentWeight, finalMaxLoad]);

  // Ítems para búsqueda en ranuras
  const slotCandidates = useMemo(() => {
    if (!activeSlotSearch) return [];
    const q = slotSearchQuery.toLowerCase().trim();

    return checklistCatalog.items
      .filter((it) => {
        if (!it.weight) return false;
        if (activeSlotSearch.startsWith('rh') || activeSlotSearch.startsWith('lh')) {
          if (it.category !== 'armas' && it.category !== 'escudos') return false;
        } else {
          if (it.category !== 'armaduras') return false;
        }
        if (!q) return true;
        return it.name.toLowerCase().includes(q) || (it.subcategory && it.subcategory.toLowerCase().includes(q));
      })
      .slice(0, 25);
  }, [activeSlotSearch, slotSearchQuery]);

  const handleToggleTalisman = (id) => {
    setSelectedTalismans((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSetSlotItem = (slotKey, item) => {
    setEquippedSlots((prev) => ({ ...prev, [slotKey]: item }));
    setActiveSlotSearch(null);
    setSlotSearchQuery('');
  };

  const handleRemoveSlotItem = (slotKey, e) => {
    e.stopPropagation();
    setEquippedSlots((prev) => ({ ...prev, [slotKey]: null }));
  };

  if (!isOpen) return null;

  return (
    <div
      id="equip-load-modal-overlay"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'equip-load-modal-overlay') onClose();
      }}
    >
      <div className="bg-elden-900 border border-elden-gold/40 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl shadow-elden-gold/10 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera del Modal */}
        <div className="p-4 sm:p-5 border-b border-elden-border bg-gradient-to-r from-elden-950 via-elden-900 to-elden-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-elden-950 border border-elden-gold/40 flex items-center justify-center text-elden-gold shadow-gold-glow">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
                Calculadora de Carga y Rodamiento
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Optimiza tu Aguante, elimina el Fat Roll y alcanza la esquiva perfecta
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-elden-800 hover:bg-elden-750 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          {/* 1. Medidor Principal del Rodamiento (Visual Gauge) */}
          <div className={`rounded-2xl p-4 sm:p-5 border transition-all ${rollTier.bg}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border uppercase tracking-wider ${rollTier.badge}`}>
                    {rollTier.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Ratio: <strong className="text-slate-100">{equipPercentage.toFixed(1)}%</strong>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-serif">
                  {rollTier.description}
                </p>
              </div>

              {/* Botón rápido para saltar el Fat Roll */}
              {rollTier.id === 'heavy' && (
                <button
                  type="button"
                  onClick={() => setEndurance(Math.min(99, neededEndForMedium))}
                  className="px-3 py-1.5 rounded-xl bg-elden-gold text-elden-950 font-serif text-xs font-bold hover:bg-amber-300 transition flex items-center gap-1.5 shadow-gold-glow active:scale-95 flex-shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Subir Aguante a {neededEndForMedium}</span>
                </button>
              )}
            </div>

            {/* Barra de Progreso con zonas demarcadas */}
            <div className="relative pt-3 pb-1">
              <div className="w-full h-3.5 bg-elden-950 rounded-full border border-slate-800 overflow-hidden relative p-0.5">
                {/* Zonas de Fondo */}
                <div className="absolute inset-y-0 left-0 w-[30%] bg-emerald-950/40 border-r border-slate-700/50" />
                <div className="absolute inset-y-0 left-[30%] w-[40%] bg-amber-950/30 border-r border-slate-700/50" />
                <div className="absolute inset-y-0 left-[70%] w-[30%] bg-rose-950/40" />

                {/* Relleno de Carga actual */}
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    equipPercentage > 100
                      ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]'
                      : equipPercentage > 70
                      ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                      : equipPercentage >= 30
                      ? 'bg-elden-gold shadow-gold-glow'
                      : 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                  }`}
                  style={{ width: `${Math.min(100, equipPercentage)}%` }}
                />
              </div>

              {/* Marcas de porcentaje guía */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5 px-0.5">
                <span>0% (Ligero)</span>
                <span className="text-amber-300/80">30% (Medio)</span>
                <span className="text-rose-400/80">70% (Fat Roll)</span>
                <span className="text-rose-500 font-bold">100% (Sobrecarga)</span>
              </div>
            </div>

            {/* Fila de estadísticas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 mt-3 text-xs font-mono">
              <div className="bg-elden-950/70 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">PESO EQUIPADO</span>
                <span className="font-bold text-amber-200 text-sm">⚖️ {currentWeight.toFixed(1)}</span>
              </div>
              <div className="bg-elden-950/70 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CARGA MÁXIMA</span>
                <span className="font-bold text-slate-100 text-sm">{finalMaxLoad.toFixed(1)}</span>
              </div>
              <div className="bg-elden-950/70 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">I-FRAMES ESQUIVA</span>
                <span className="font-bold text-emerald-300 text-xs truncate">{rollTier.iframes}</span>
              </div>
              <div className="bg-elden-950/70 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">PENALIZACIÓN</span>
                <span className="font-bold text-slate-300 text-xs truncate">{rollTier.penalty}</span>
              </div>
            </div>
          </div>

          {/* 2. Control de Aguante (Endurance Slider) */}
          <div className="bg-elden-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif font-bold text-amber-100">
                  Nivel de Aguante (Endurance)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  (Base: {baseMaxLoad.toFixed(1)} carga)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEndurance((prev) => Math.max(1, prev - 1))}
                  className="w-7 h-7 rounded-lg bg-elden-850 hover:bg-elden-800 text-slate-300 font-mono font-bold flex items-center justify-center border border-slate-700"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-base text-elden-gold">
                  {endurance}
                </span>
                <button
                  type="button"
                  onClick={() => setEndurance((prev) => Math.min(99, prev + 1))}
                  className="w-7 h-7 rounded-lg bg-elden-850 hover:bg-elden-800 text-slate-300 font-mono font-bold flex items-center justify-center border border-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="99"
              value={endurance}
              onChange={(e) => setEndurance(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-elden-900 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Nivel 1</span>
              <span>Softcap 1: 25</span>
              <span>Softcap 2: 60</span>
              <span>Nivel 99</span>
            </div>
          </div>

          {/* 3. Talismanes de Carga Máxima */}
          <div className="bg-elden-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-elden-gold" />
              <span>Talismanes de Aumento de Carga</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TALISMAN_PRESETS.map((tal) => {
                const isActive = selectedTalismans.includes(tal.id);
                return (
                  <button
                    key={tal.id}
                    type="button"
                    onClick={() => handleToggleTalisman(tal.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between gap-2 text-xs ${
                      isActive
                        ? 'bg-elden-850 border-elden-gold text-amber-200 shadow-gold-glow'
                        : 'bg-elden-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold">{tal.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{tal.desc}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isActive
                          ? 'bg-elden-gold text-elden-950 border-elden-gold'
                          : 'border-slate-700'
                      }`}
                    >
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Selector de Modo: Manual vs Ranuras de Equipo */}
          <div className="bg-elden-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-sm font-serif font-bold text-amber-100">
                Configuración del Peso
              </h3>

              <div className="flex bg-elden-900 p-0.5 rounded-xl border border-slate-800 text-xs font-serif font-bold">
                <button
                  type="button"
                  onClick={() => setUseSlotsMode(false)}
                  className={`px-3 py-1 rounded-lg transition ${
                    !useSlotsMode
                      ? 'bg-elden-gold text-elden-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Slider Manual
                </button>
                <button
                  type="button"
                  onClick={() => setUseSlotsMode(true)}
                  className={`px-3 py-1 rounded-lg transition ${
                    useSlotsMode
                      ? 'bg-elden-gold text-elden-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Ranuras de Armadura & Armas
                </button>
              </div>
            </div>

            {!useSlotsMode ? (
              /* Modo Manual */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Peso Total Equipado:</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="150"
                      value={manualWeight}
                      onChange={(e) => setManualWeight(parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 bg-elden-900 border border-slate-700 rounded-lg text-right font-mono font-bold text-amber-200 focus:outline-none focus:border-elden-gold"
                    />
                    <span className="text-xs font-mono text-slate-400">kg</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={manualWeight}
                  onChange={(e) => setManualWeight(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-elden-900 rounded-lg cursor-pointer"
                />

                {/* Presets rápidos de peso */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Desnudo (0.0)', val: 0.0 },
                    { label: 'Ligero (15.0)', val: 15.0 },
                    { label: 'Caballero (38.5)', val: 38.5 },
                    { label: 'Tanque Havel / Radahn (55.0)', val: 55.0 },
                    { label: 'Doble Colosal (78.0)', val: 78.0 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setManualWeight(p.val)}
                      className="px-2.5 py-1 rounded-lg bg-elden-900 hover:bg-elden-850 text-slate-300 hover:text-elden-gold border border-slate-800 text-xs font-mono transition"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Modo Ranuras de Armadura y Armas */
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-sans">
                  Toca una ranura para buscar y equipar un arma o pieza de armadura real del juego con su peso oficial:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'rh1', label: 'Mano Der. 1', cat: 'armas', icon: Sword },
                    { key: 'lh1', label: 'Mano Izq. 1', cat: 'escudos', icon: Shield },
                    { key: 'head', label: 'Cabeza (Yelmo)', cat: 'armaduras', icon: Shield },
                    { key: 'chest', label: 'Torso (Peto)', cat: 'armaduras', icon: Shield },
                    { key: 'arms', label: 'Brazos', cat: 'armaduras', icon: Shield },
                    { key: 'legs', label: 'Piernas (Grebas)', cat: 'armaduras', icon: Shield },
                    { key: 'rh2', label: 'Mano Der. 2', cat: 'armas', icon: Sword },
                    { key: 'lh2', label: 'Mano Izq. 2', cat: 'armas', icon: Shield },
                  ].map((slot) => {
                    const item = equippedSlots[slot.key];
                    const Icon = slot.icon;
                    return (
                      <div
                        key={slot.key}
                        onClick={() => {
                          setActiveSlotSearch(slot.key);
                          setSlotSearchQuery('');
                        }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition relative group ${
                          item
                            ? 'bg-elden-850/90 border-elden-gold/50 shadow-sm'
                            : 'bg-elden-900/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>{slot.label}</span>
                          {item && (
                            <button
                              type="button"
                              onClick={(e) => handleRemoveSlotItem(slot.key, e)}
                              className="text-slate-500 hover:text-rose-400 p-0.5"
                              title="Desequipar"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {item ? (
                          <div>
                            <div className="font-serif text-xs font-bold text-amber-200 truncate">
                              {item.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                              ⚖️ {item.weight?.toFixed(1)}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-400 py-1">
                            <Plus className="w-3.5 h-3.5 text-elden-gold/60" />
                            <span className="font-serif text-[11px]">Equipar</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Buscador emergente para la ranura activa */}
                {activeSlotSearch && (
                  <div className="p-3 bg-elden-900 border border-elden-gold/40 rounded-xl space-y-2 mt-2">
                    <div className="flex items-center justify-between text-xs font-serif font-bold text-amber-200">
                      <span>Seleccionar para {activeSlotSearch.toUpperCase()}</span>
                      <button
                        type="button"
                        onClick={() => setActiveSlotSearch(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={slotSearchQuery}
                        onChange={(e) => setSlotSearchQuery(e.target.value)}
                        placeholder="Buscar por nombre (ej: Espadón, Radahn, Carian)..."
                        className="w-full pl-8 pr-3 py-1.5 bg-elden-950 border border-slate-700 rounded-lg text-xs font-sans text-slate-100 focus:outline-none focus:border-elden-gold"
                        autoFocus
                      />
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar pr-1">
                      {slotCandidates.map((cand) => (
                        <div
                          key={cand.id}
                          onClick={() => handleSetSlotItem(activeSlotSearch, cand)}
                          className="p-2 rounded-lg bg-elden-950/80 hover:bg-elden-800 border border-slate-800 hover:border-elden-gold/40 cursor-pointer flex items-center justify-between text-xs transition"
                        >
                          <div className="truncate pr-2">
                            <span className="font-serif font-bold text-slate-200 block truncate">
                              {cand.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {cand.subcategory || cand.categoryName}
                            </span>
                          </div>
                          <span className="font-mono text-amber-300 font-bold flex-shrink-0">
                            ⚖️ {cand.weight?.toFixed(1)}
                          </span>
                        </div>
                      ))}
                      {slotCandidates.length === 0 && (
                        <p className="text-center text-xs text-slate-500 py-3">
                          No se encontraron piezas con peso registrado.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. Recomendaciones de Optimización */}
          <div className="bg-elden-950/90 border border-elden-gold/30 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-elden-gold" />
              <span>Resumen de Optimización de Build</span>
            </h3>

            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-elden-gold font-serif font-bold">• Rodamiento Medio (≤70%):</span>
                <span>
                  Requiere al menos <strong>{neededEndForMedium} de Aguante</strong> con tu equipamiento actual.
                  {endurance < neededEndForMedium && (
                    <span className="text-amber-400 font-semibold block sm:inline sm:ml-1">
                      (Te faltan {neededEndForMedium - endurance} puntos para evitar el Fat Roll o debes retirar {weightToMedium.toFixed(1)} de peso).
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-emerald-400 font-serif font-bold">• Rodamiento Ligero (≤30%):</span>
                <span>
                  Requiere <strong>{neededEndForLight > 99 ? '+99 (Inalcanzable solo con Aguante)' : `${neededEndForLight} de Aguante`}</strong>.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-elden-950 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              setEndurance(25);
              setSelectedTalismans([]);
              setManualWeight(38.5);
              setEquippedSlots({
                rh1: null, rh2: null, lh1: null, lh2: null,
                head: null, chest: null, arms: null, legs: null,
              });
            }}
            className="px-3 py-1.5 rounded-xl bg-elden-900 hover:bg-elden-850 text-slate-400 hover:text-slate-200 text-xs font-serif flex items-center gap-1.5 border border-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetear</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-elden-gold hover:bg-amber-300 text-elden-950 font-serif font-bold text-xs shadow-gold-glow transition active:scale-95"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
export default EquipLoadModal;
