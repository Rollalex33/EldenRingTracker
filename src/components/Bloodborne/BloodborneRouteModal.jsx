import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  MapPin,
  CheckCircle2,
  Circle,
  Skull,
  Shield,
  Award,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Flame,
  Hammer,
  Moon,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Info,
  Loader2,
  Package,
  Layers,
} from 'lucide-react';
import {
  BB_PROGRESSION_ROUTE,
  BB_UPGRADE_SYSTEM_GUIDE,
  BB_MOON_PHASES,
} from '../../data/bloodborneRouteData';
import { getBloodborneItemByName } from '../../utils/bloodborneLinker';

export function BloodborneRouteModal({ isOpen, onClose, onInspectItem }) {
  const [activeTab, setActiveTab] = useState('route'); // 'route' | 'upgrades' | 'phases'
  const [expandedZoneId, setExpandedZoneId] = useState('bb_zone_1');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'base' | 'optional' | 'dlc'
  const [expandedGuideKey, setExpandedGuideKey] = useState(null);
  const [guideContent, setGuideContent] = useState({}); // { [fileKey]: json }
  const [loadingGuide, setLoadingGuide] = useState(false);

  // Progreso interactivo persistente de hitos de ruta
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_route_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Progreso interactivo de bloques de sangre recogidos
  const [collectedChunks, setCollectedChunks] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_collected_chunks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleMilestone = (id) => {
    setCompletedMilestones((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('bb_route_milestones', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleChunkZone = (zoneName) => {
    setCollectedChunks((prev) => {
      const next = { ...prev, [zoneName]: !prev[zoneName] };
      try {
        localStorage.setItem('bb_collected_chunks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Cargar guía de EliteGuías cacheada si el usuario expande el lector
  const handleToggleGuideReader = async (fileKey) => {
    if (expandedGuideKey === fileKey) {
      setExpandedGuideKey(null);
      return;
    }

    setExpandedGuideKey(fileKey);
    if (!guideContent[fileKey]) {
      setLoadingGuide(true);
      try {
        const res = await fetch(`./guide-cache/${fileKey}.json`);
        if (res.ok) {
          const json = await res.json();
          setGuideContent((prev) => ({ ...prev, [fileKey]: json }));
        }
      } catch (e) {
        console.warn('Error loading zone guide cache:', e);
      } finally {
        setLoadingGuide(false);
      }
    }
  };

  const filteredZones = BB_PROGRESSION_ROUTE.filter((zone) => {
    if (filterType === 'all') return true;
    if (filterType === 'base') return zone.type === 'base';
    if (filterType === 'optional') return zone.type === 'optional';
    if (filterType === 'dlc') return zone.type === 'dlc';
    return true;
  });

  // Estadísticas globales de ruta
  const allMilestonesCount = BB_PROGRESSION_ROUTE.reduce((acc, z) => acc + z.milestones.length, 0);
  const doneMilestonesCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressionPct = Math.round((doneMilestonesCount / (allMilestonesCount || 1)) * 100);

  if (!isOpen) return null;

  return (
    <div
      id="bb-route-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-route-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera Principal */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#150810] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Ruta Óptima de Progresión & Guía de Zonas
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  GUÍA 18 REGIONES
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Recorrido canónico de Yharnam, niveles recomendados, objetos de mejora (+1 a +10) y fases lunares
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

        {/* Pestañas Principales */}
        <div className="bg-black/60 border-b border-stone-800 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            onClick={() => setActiveTab('route')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'route'
                ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ruta de Zonas & Recorrido (18)</span>
          </button>

          <button
            onClick={() => setActiveTab('upgrades')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'upgrades'
                ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>Objetos de Mejora (+1 a +10) & Taller</span>
          </button>

          <button
            onClick={() => setActiveTab('phases')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'phases'
                ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Fases Lunares & Puntos de No Retorno</span>
          </button>
        </div>

        {/* CONTENIDO DE LA PESTAÑA 1: RUTA DE ZONAS */}
        {activeTab === 'route' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Barra de Progreso y Filtros Rápidos */}
            <div className="bg-black/40 border-b border-stone-800/80 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-stone-300">
                  Hitos de Cacería: <strong className="text-rose-300">{doneMilestonesCount}</strong> / {allMilestonesCount} ({progressionPct}%)
                </div>
                <div className="w-32 bg-stone-900 rounded-full h-2 border border-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-rose-300 transition-all duration-300 shadow-[0_0_8px_rgba(225,29,72,0.5)]"
                    style={{ width: `${progressionPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-lg font-serif transition ${
                    filterType === 'all'
                      ? 'bg-rose-950 border border-rose-500/60 text-rose-200 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  Todas (18)
                </button>
                <button
                  onClick={() => setFilterType('base')}
                  className={`px-2.5 py-1 rounded-lg font-serif transition ${
                    filterType === 'base'
                      ? 'bg-rose-950 border border-rose-500/60 text-rose-200 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  Historia Principal
                </button>
                <button
                  onClick={() => setFilterType('optional')}
                  className={`px-2.5 py-1 rounded-lg font-serif transition ${
                    filterType === 'optional'
                      ? 'bg-rose-950 border border-rose-500/60 text-rose-200 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  Zonas Secretas
                </button>
                <button
                  onClick={() => setFilterType('dlc')}
                  className={`px-2.5 py-1 rounded-lg font-serif transition ${
                    filterType === 'dlc'
                      ? 'bg-rose-950 border border-rose-500/60 text-rose-200 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  The Old Hunters (DLC)
                </button>
              </div>
            </div>

            {/* Lista Desplegable de las 18 Zonas */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-3">
              {filteredZones.map((zone) => {
                const isExpanded = expandedZoneId === zone.id;
                const completedCount = zone.milestones.filter((m) => completedMilestones[m.id]).length;
                const isZoneComplete = completedCount === zone.milestones.length && zone.milestones.length > 0;

                return (
                  <div
                    key={zone.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isZoneComplete
                        ? 'bg-[#080d0a] border-emerald-500/40'
                        : isExpanded
                        ? 'bg-[#10080e] border-rose-500/50 shadow-[0_0_15px_rgba(225,29,72,0.15)]'
                        : 'bg-[#0a080c] border-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    {/* Encabezado de la Zona */}
                    <div
                      onClick={() => setExpandedZoneId(isExpanded ? null : zone.id)}
                      className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button type="button" className="text-stone-400 hover:text-rose-300 transition">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-rose-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-stone-500" />
                          )}
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif font-bold text-sm sm:text-base text-stone-100">
                              {zone.title}
                            </h3>
                            {zone.type === 'dlc' && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                                DLC THE OLD HUNTERS
                              </span>
                            )}
                            {zone.type === 'optional' && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                                ZONA SECRETA
                              </span>
                            )}
                            {isZoneComplete && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> ZONA COMPLETADA
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mt-1 flex-wrap">
                            <span className="text-rose-300 font-bold">BL Recomendado: {zone.recommendedBL}</span>
                            <span>•</span>
                            <span>Arma sugerida: <strong className="text-stone-200">{zone.weaponUpgrade}</strong></span>
                            <span>•</span>
                            <span className="text-stone-400 flex items-center gap-1">
                              <Moon className="w-3 h-3 text-amber-400/80" /> {zone.moonPhase}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 hidden sm:block">
                        <div className="text-xs font-mono text-stone-300">
                          {completedCount} / {zone.milestones.length} hitos
                        </div>
                        <div className="text-[10px] font-serif text-stone-500 mt-0.5">
                          {zone.bosses.length} jefes
                        </div>
                      </div>
                    </div>

                    {/* Detalle Desplegable de la Zona */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-stone-800/80 space-y-4 text-xs font-sans">
                        <p className="text-stone-300 italic leading-relaxed pt-2">{zone.summary}</p>

                        {/* Cómo acceder & Lámparas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800/80">
                            <span className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider block mb-1">
                              Acceso a la Región
                            </span>
                            <p className="text-stone-300 text-xs">{zone.howToAccess}</p>
                          </div>

                          <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800/80">
                            <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider block mb-1">
                              Lámparas de Checkpoint ({zone.lamps.length})
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {zone.lamps.map((lamp, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[11px] text-stone-300 font-mono"
                                >
                                  🕯️ {lamp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Objetos de Mejora y Taller en esta zona */}
                        {zone.upgradeMaterials?.length > 0 && (
                          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                            <div className="flex items-center gap-1.5 font-serif font-bold text-rose-200 text-xs">
                              <Hammer className="w-3.5 h-3.5 text-rose-400" />
                              <span>Objetos de Mejora (+1 a +10) en esta Región</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {zone.upgradeMaterials.map((mat, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 rounded-lg bg-black/50 border border-rose-950/60 text-stone-300"
                                >
                                  <div className="flex items-center justify-between font-mono text-xs font-bold text-rose-300">
                                    <span>{mat.name}</span>
                                    <span>x{mat.count}</span>
                                  </div>
                                  <p className="text-[11px] text-stone-400 mt-1">{mat.detail}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Jefazos Notables */}
                        {zone.bosses?.length > 0 && (
                          <div className="bg-black/40 rounded-xl p-3 border border-stone-800/60 space-y-2">
                            <div className="flex items-center gap-1.5 font-serif font-bold text-rose-300 text-xs">
                              <Skull className="w-3.5 h-3.5 text-rose-400" />
                              <span>Encuentros de Jefes & Estrategia</span>
                            </div>
                            <div className="space-y-2">
                              {zone.bosses.map((boss, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-xl bg-[#0e0a10] border border-stone-800/90 space-y-1"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-serif font-bold text-stone-100 text-xs">
                                      {boss.name}
                                    </span>
                                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                                      {boss.type}
                                    </span>
                                  </div>
                                  <div className="text-[11px] font-mono text-stone-400">
                                    <strong className="text-amber-300/90">Debilidad:</strong> {boss.weakness}
                                  </div>
                                  <div className="text-[11px] font-mono text-rose-300/80">
                                    <strong className="text-rose-400">Recompensa:</strong> {boss.reward}
                                  </div>
                                  {boss.notes && (
                                    <p className="text-[11px] text-stone-400 font-sans italic pt-0.5">
                                      💡 {boss.notes}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Eventos de NPCs y Advertencias de Perdibles */}
                        {zone.npcEvents?.length > 0 && (
                          <div className="p-3 rounded-xl bg-[#14080e] border border-rose-900/60 space-y-2">
                            <div className="flex items-center gap-1.5 font-serif font-bold text-rose-200 text-xs">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                              <span>Decisiones, Eventos de NPCs y Advertencias de Perdibles</span>
                            </div>
                            <div className="space-y-1.5">
                              {zone.npcEvents.map((evt, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-lg bg-black/50 border border-stone-800 text-xs space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <strong className="font-serif text-rose-300">{evt.npc}</strong>
                                    {evt.missable && (
                                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold">
                                        ¡PERDIBLE!
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-stone-300">{evt.action}</p>
                                  {evt.warning && (
                                    <div className="text-[11px] font-mono text-amber-300/90 font-bold">
                                      ⚠️ {evt.warning}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Objetos y Reliquias Clave (Clickables para Inspeccionar) */}
                        {zone.keyItems?.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono uppercase text-stone-400 font-bold block">
                              Reliquias y Tesoros Notables (Toca para inspeccionar en el compendio):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {zone.keyItems.map((k, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    const it = getBloodborneItemByName(k.name);
                                    if (it && onInspectItem) onInspectItem(it);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-rose-950 text-stone-200 hover:text-rose-200 border border-stone-800 hover:border-rose-500/50 text-xs font-serif transition flex items-center gap-1.5"
                                  title="Ver ficha completa en el Compendio"
                                >
                                  <Package className="w-3 h-3 text-rose-400" />
                                  <span>{k.name}</span>
                                  {k.type && (
                                    <span className="text-[9px] font-mono text-stone-500">
                                      ({k.type})
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Checklist de Hitos Interactivos de la Zona */}
                        <div className="space-y-2 pt-2 border-t border-stone-800/80">
                          <div className="font-serif font-bold text-stone-200 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-rose-400" />
                              <span>Hitos Recomendados de la Zona</span>
                            </span>
                            <span className="text-[10px] font-mono text-stone-400">
                              {completedCount} / {zone.milestones.length} hechos
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {zone.milestones.map((m) => {
                              const isDone = !!completedMilestones[m.id];
                              return (
                                <div
                                  key={m.id}
                                  onClick={() => toggleMilestone(m.id)}
                                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition select-none ${
                                    isDone
                                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                                      : 'bg-[#08070b] border-stone-800/80 hover:border-rose-500/40 text-stone-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    {isDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-stone-600 flex-shrink-0" />
                                    )}
                                    <span className={`text-xs truncate ${isDone ? 'line-through text-stone-400' : ''}`}>
                                      {m.label}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {m.missable && (
                                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-500/30">
                                        Perdible
                                      </span>
                                    )}
                                    <span className="text-[10px] font-mono text-stone-500 uppercase">
                                      {isDone ? 'Hecho' : 'Pendiente'}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botón Lector del Recorrido Completo de EliteGuías */}
                        {zone.guideFileKeys?.length > 0 && (
                          <div className="pt-3 border-t border-stone-800/80">
                            <div className="flex items-center gap-2 flex-wrap">
                              {zone.guideFileKeys.map((fk) => (
                                <button
                                  key={fk}
                                  type="button"
                                  onClick={() => handleToggleGuideReader(fk)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 border ${
                                    expandedGuideKey === fk
                                      ? 'bg-rose-600 text-stone-950 border-rose-400'
                                      : 'bg-stone-900 text-rose-300 border-stone-700 hover:border-rose-500'
                                  }`}
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>
                                    {expandedGuideKey === fk
                                      ? 'Ocultar Guía Paso a Paso'
                                      : `Leer Recorrido Completo EliteGuías (${fk.replace('bloodborne-', '').replace('.php', '')})`}
                                  </span>
                                </button>
                              ))}

                              <a
                                href={`https://www.eliteguias.com/guias/b/bb/${zone.guideFileKeys[0]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-serif text-stone-400 hover:text-rose-300 flex items-center gap-1 ml-auto"
                              >
                                <span>Abrir en web</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            {/* Panel Lector Desplegable de EliteGuías */}
                            {expandedGuideKey && zone.guideFileKeys.includes(expandedGuideKey) && (
                              <div className="mt-3 p-4 rounded-2xl bg-black/80 border border-rose-900/60 space-y-3 animate-fadeIn text-xs text-stone-200">
                                {loadingGuide && !guideContent[expandedGuideKey] ? (
                                  <div className="py-8 flex flex-col items-center justify-center gap-2 text-rose-400 font-serif">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Cargando manuscritos de EliteGuías...</span>
                                  </div>
                                ) : guideContent[expandedGuideKey] ? (
                                  <div className="space-y-3 font-sans leading-relaxed">
                                    <h4 className="font-serif font-bold text-sm text-rose-200 border-b border-rose-950 pb-1">
                                      {guideContent[expandedGuideKey].title}
                                    </h4>

                                    {/* Galería de imágenes de la guía */}
                                    {guideContent[expandedGuideKey].images?.length > 0 && (
                                      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                        {guideContent[expandedGuideKey].images.map((img, iIdx) => (
                                          <img
                                            key={iIdx}
                                            src={img}
                                            alt=""
                                            className="h-32 w-auto object-cover rounded-xl border border-stone-800"
                                            loading="lazy"
                                          />
                                        ))}
                                      </div>
                                    )}

                                    {/* Párrafos del recorrido */}
                                    <div className="space-y-2">
                                      {guideContent[expandedGuideKey].intro?.map((p, pIdx) => (
                                        <p key={pIdx} className="text-stone-300">
                                          {p}
                                        </p>
                                      ))}
                                    </div>

                                    {/* Secciones adicionales si las hay */}
                                    {guideContent[expandedGuideKey].sections?.map((sec, sIdx) => (
                                      <div key={sIdx} className="pt-2 border-t border-stone-800/80">
                                        <h5 className="font-serif font-bold text-xs text-rose-300 mb-1">
                                          {sec.heading}
                                        </h5>
                                        <div className="space-y-1 text-stone-300">
                                          {sec.lines.map((l, lIdx) => (
                                            <p key={lIdx}>{l}</p>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-stone-400">Guía no disponible temporalmente en caché.</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTENIDO DE LA PESTAÑA 2: OBJETOS DE MEJORA (+1 A +10) */}
        {activeTab === 'upgrades' && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
            {/* Los 4 Tiers de Refuerzo */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-rose-100 flex items-center gap-2">
                    <Hammer className="w-4 h-4 text-rose-400" />
                    <span>Fórmula de Refuerzo de Armas (+1 a +10 Máximo)</span>
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    Cada arma requiere exactamente 16 fragmentos, 16 fragmentos gemelos, 16 bloques y 1 roca de sangre.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BB_UPGRADE_SYSTEM_GUIDE.weaponTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#0d090f] border border-rose-950/80 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-rose-200">{tier.level}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                          {tier.materialName}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-amber-300 mt-1">{tier.requiredCount}</div>
                      <p className="text-xs text-stone-300 font-sans mt-2 leading-relaxed">{tier.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-800/80 mt-2 space-y-1 text-[11px] font-sans">
                      {tier.earlySources && (
                        <div className="text-stone-300">
                          <strong className="text-rose-400">Cómo conseguir temprano:</strong> {tier.earlySources}
                        </div>
                      )}
                      {tier.farmingLocation && (
                        <div className="text-stone-300">
                          <strong className="text-amber-400">Dónde farmear:</strong> {tier.farmingLocation}
                        </div>
                      )}
                      {tier.shopUnlock && (
                        <div className="text-stone-400">
                          <strong className="text-stone-300">Desbloqueo en tienda:</strong> {tier.shopUnlock}
                        </div>
                      )}
                      {tier.fixedSources && (
                        <div className="space-y-1 pt-1">
                          <strong className="text-rose-300 block">Fuentes Fijas Garantizadas:</strong>
                          {tier.fixedSources.map((fs, fIdx) => (
                            <div key={fIdx} className="pl-2 border-l border-rose-500/50 text-stone-300">
                              <span className="font-bold text-rose-200">{fs.zone}:</span> {fs.detail}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist de los 47 Bloques de Piedra de Sangre */}
            <div className="p-4 rounded-2xl bg-[#0b080d] border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-rose-400" />
                  <span>Desglose de los 47 Bloques de Piedra de Sangre (+7 a +9) por Región</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  {Object.values(collectedChunks).filter(Boolean).length} / {BB_UPGRADE_SYSTEM_GUIDE.chunkLocationsBreakdown.length} zonas despejadas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BB_UPGRADE_SYSTEM_GUIDE.chunkLocationsBreakdown.map((chk, idx) => {
                  const isDone = !!collectedChunks[chk.zone];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleChunkZone(chk.zone)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition select-none ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                          : 'bg-black/40 border-stone-800/80 hover:border-rose-500/40 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-600 flex-shrink-0" />
                        )}
                        <div>
                          <span className={`font-serif text-xs font-bold ${isDone ? 'line-through text-stone-400' : 'text-stone-100'}`}>
                            {chk.zone}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400 block">{chk.note}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 font-mono text-xs font-bold border border-rose-500/30 flex-shrink-0">
                        {chk.count} bloques
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Herramientas Clave del Taller */}
            <div className="space-y-3">
              <span className="font-serif font-bold text-xs text-rose-300 uppercase tracking-wider block">
                Herramientas Esenciales del Taller de Gehrman
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BB_UPGRADE_SYSTEM_GUIDE.workshopTools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0d090f] border border-stone-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-xs text-rose-200">{tool.name}</h4>
                      <span className="text-[10px] font-mono text-amber-300">{tool.zone}</span>
                    </div>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed">{tool.desc}</p>
                    <div className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/60">
                      Ubicación: {tool.howToGet}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENIDO DE LA PESTAÑA 3: FASES LUNARES & PUNTOS DE NO RETORNO */}
        {activeTab === 'phases' && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4">
            <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-xs font-sans text-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <p>
                <strong>El paso del tiempo en Bloodborne se rige por Fases Lunares estrictas.</strong> Derrotar a ciertos jefes principales altera el cielo, el comportamiento de los NPCs y bloquea misiones de forma permanente si no se completaron antes del avance.
              </p>
            </div>

            <div className="space-y-3.5">
              {BB_MOON_PHASES.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0d090f] border border-stone-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-300 font-mono font-bold text-xs">
                        {idx + 1}
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-rose-100">
                        {phase.phase}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black/60 border border-stone-700 text-amber-300 self-start sm:self-auto">
                      Activador: {phase.trigger}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {phase.worldState}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-stone-800/80 space-y-1.5">
                    <span className="font-serif font-bold text-xs text-rose-300 block">
                      Tareas Obligatorias ANTES de que termine esta fase:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-300">
                      {phase.keyTasks.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pie de Página */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif flex-shrink-0">
          <span>Ruta y Guía Oficial Bloodborne · Sincronizada con EliteGuías</span>
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

export default BloodborneRouteModal;

