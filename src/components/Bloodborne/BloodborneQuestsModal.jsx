import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Award,
  Eye,
  AlertTriangle,
  Users,
  CheckCircle2,
  Circle,
  Search,
  ChevronRight,
  Shield,
  ExternalLink,
  Flame,
  Scale,
  Sparkles,
  Package,
} from 'lucide-react';
import {
  BB_NPC_QUESTLINES,
  BB_DECISIONS_AND_VARIATIONS,
  BB_ENDINGS_GUIDE,
} from '../../data/bloodborneRouteData';
import { REFUGEE_CHOICES, INSIGHT_THRESHOLDS } from '../../data/bloodborneData';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';
import { getBloodborneItemByName } from '../../utils/bloodborneLinker';

export function BloodborneQuestsModal({ isOpen, onClose, onInspectItem }) {
  const [activeTab, setActiveTab] = useState('npcs'); // 'npcs' | 'decisions' | 'refugees' | 'endings' | 'insight'
  const [selectedNpcId, setSelectedNpcId] = useState('bb_npc_eileen');
  const [npcFilter, setNpcFilter] = useState('');
  const [soloPerdibles, setSoloPerdibles] = useState(false);

  // Progreso de pasos de NPCs interactivos y persistentes
  const [npcStepsDone, setNpcStepsDone] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_npc_quest_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Progreso de los 4 Tercios de Cordón
  const [cordsDone, setCordsDone] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_umbilical_cords');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleNpcStep = (stepId) => {
    setNpcStepsDone((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      try {
        localStorage.setItem('bb_npc_quest_steps', JSON.stringify(next));
      } catch { }
      return next;
    });
  };

  const toggleCord = (id) => {
    setCordsDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('bb_umbilical_cords', JSON.stringify(next));
      } catch { }
      return next;
    });
  };

  const cordItems = bloodborneCatalog.items.filter((i) => i.category === 'cordones');
  const cordsCount = Object.values(cordsDone).filter(Boolean).length;

  // Filtrado de NPCs
  const filteredNpcs = BB_NPC_QUESTLINES.filter((npc) => {
    if (!npcFilter) return true;
    const q = npcFilter.toLowerCase();
    return (
      npc.name.toLowerCase().includes(q) ||
      npc.role.toLowerCase().includes(q) ||
      npc.steps.some((s) => s.title.toLowerCase().includes(q) || s.zone.toLowerCase().includes(q))
    );
  });

  const activeNpc =
    BB_NPC_QUESTLINES.find((n) => n.id === selectedNpcId) || filteredNpcs[0] || BB_NPC_QUESTLINES[0];

  const visibleSteps = activeNpc
    ? activeNpc.steps.filter((s) => {
      if (!soloPerdibles) return true;
      return Boolean(s.missable) && !npcStepsDone[s.id];
    })
    : [];

  const completedNpcStepsCount = activeNpc
    ? activeNpc.steps.filter((s) => npcStepsDone[s.id]).length
    : 0;

  if (!isOpen) return null;

  return (
    <div
      id="bb-quests-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-quests-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera Principal */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#150810] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <Users className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Personajes, Decisiones & Finales
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  GUÍA 19 NPCS
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Rutas de personajes paso a paso, variaciones de diálogo, consecuencias y los 3 finales de Yharnam
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

        {/* Pestañas de Navegación */}
        <div className="bg-black/60 border-b border-stone-800 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            onClick={() => setActiveTab('npcs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'npcs'
              ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
              : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
              }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Misiones de NPCs ({BB_NPC_QUESTLINES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'decisions'
              ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
              : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
              }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Decisiones & Variaciones ({BB_DECISIONS_AND_VARIATIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('refugees')}
        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'refugees'
            ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
            : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
          }`}
                    >
        <Shield className="w-3.5 h-3.5" />
        <span>Refugio: Capilla vs Clínica</span>
      </button>

      <button
        onClick={() => setActiveTab('endings')}
        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'endings'
            ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
            : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
          }`}
      >
        <Award className="w-3.5 h-3.5" />
        <span>Cordones ({cordsCount}/4) & 3 Finales</span>
      </button>

                    <button
        onClick={() => setActiveTab('insight')}
        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'insight'
            ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
            : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
                      }`}
                    >
      <Eye className="w-3.5 h-3.5" />
      <span>Lucidez & Juramentos</span>
    </button>
        </div >

    {/* PESTAÑA 1: MISIONES DE NPCS PASO A PASO */ }
  {
    activeTab === 'npcs' && (
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
        {/* Barra lateral de selección de NPC */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-stone-800 bg-[#060508] p-3 flex flex-col gap-2 flex-shrink-0">
          {/* Buscador de NPC */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={npcFilter}
              onChange={(e) => setNpcFilter(e.target.value)}
              placeholder="Filtrar NPC (Eileen, Alfred, Viola...)"
              className="w-full pl-8 pr-2.5 py-1.5 bg-[#0e0a10] border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-rose-500 placeholder-stone-600 font-sans"
            />
          </div>

          {/* Selector de NPCs con scroll */}
          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1 max-h-48 md:max-h-none">
            {filteredNpcs.map((npc) => {
              const isSelected = activeNpc?.id === npc.id;
              const stepsDone = npc.steps.filter((s) => npcStepsDone[s.id]).length;
              const hasMissablePending = npc.steps.some(
                (s) => s.missable && !npcStepsDone[s.id]
              );

              return (
                < button
                  key={npc.id}
                  type="button"
                  onClick={() => setSelectedNpcId(npc.id)}
                  className={`w-full p-2 rounded-xl text-left transition flex items-center justify-between gap-2 text-xs select-none ${isSelected
                    ? 'bg-rose-950/80 border border-rose-500/60 text-rose-100 shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                    : 'bg-black/30 border border-stone-900 hover:border-stone-800 text-stone-300'
                    }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-serif font-bold truncate flex items-center gap-1.5">
                      <span className="truncate">{npc.name.split('(')[0].trim()}</span>
                      {hasMissablePending && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0"
                          title="Tiene pasos perdibles pendientes"
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 truncate block">
                      {npc.role}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full flex-shrink-0 ${isSelected
                        ? 'bg-rose-500 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400'
                      }`}
                  >
                    {stepsDone}/{npc.steps.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Principal del NPC Activo */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4">
          {activeNpc && (
            <>
              {/* Encabezado del Personaje */}
              <div className="p-4 rounded-2xl bg-[#0e0a10] border border-rose-950/80 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-rose-100">
                        {activeNpc.name}
                      </h3>
                      {activeNpc.expansion === 'dlc' ? (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                          DLC THE OLD HUNTERS
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                          JUEGO BASE
                        </span>
                      )}
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                        Dificultad: {activeNpc.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-rose-300/80 font-mono mt-0.5">{activeNpc.role}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Switch solo perdibles */}
                    <button
                      type="button"
                      onClick={() => setSoloPerdibles(!soloPerdibles)}
                      className={`px-2.5 py-1 rounded-xl border text-xs font-serif transition flex items-center gap-1.5 ${soloPerdibles
                        ? 'bg-red-950 border-red-500 text-red-200 font-bold shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                    >
                      <AlertTriangle className={`w-3.5 h-3.5 ${soloPerdibles ? 'text-red-400' : 'text-stone-500'}`} />
                      <span>Solo perdibles</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-stone-300 font-sans leading-relaxed pt-1">
                  {activeNpc.summary}
                </p>

                {/* Barra de progreso de la misión */}
                <div className="pt-2 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-xs mb-1 font-mono">
                    <span className="text-stone-400">Progreso de la Quest</span>
                    <span className="text-rose-300 font-bold">
                      {completedNpcStepsCount} / {activeNpc.steps.length} pasos (
                      {Math.round((completedNpcStepsCount / (activeNpc.steps.length || 1)) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                    <div
                      className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-rose-300 transition-all duration-300"
                      style={{
                        width: `${(completedNpcStepsCount / (activeNpc.steps.length || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Decisiones y Variaciones del NPC (si existen) */}
              {activeNpc.decisions?.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#14080e] border border-rose-900/60 space-y-2.5">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-rose-200">
                    <Scale className="w-4 h-4 text-rose-400" />
                    <span>⚖️ Decisiones y Variaciones de esta Misión</span>
                  </div>

                  <div className="space-y-2">
                    {activeNpc.decisions.map((dec, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-xl bg-black/50 border border-stone-800 text-xs space-y-2"
                      >
                        <h4 className="font-serif font-bold text-stone-200">{dec.title}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {dec.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className="p-2.5 rounded-lg bg-[#0d090f] border border-rose-950/60 space-y-1"
                            >
                              <span className="font-serif font-bold text-rose-300 block">
                                {opt.choice}
                              </span>
                              <p className="text-stone-300 leading-relaxed text-[11px]">
                                {opt.consequence}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pasos Secuenciales */}
              <div className="space-y-2.5">
                <span className="font-serif font-bold text-xs text-stone-300 uppercase tracking-wider block">
                  Pasos Secuenciales de la Cacería ({visibleSteps.length})
                </span>

                {visibleSteps.map((step) => {
                  const isDone = !!npcStepsDone[step.id];

                  return (
                    <div
                      key={step.id}
                      className={`p-3.5 rounded-2xl border transition select-none ${isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-[#0d090f] border-stone-800/80 hover:border-stone-700 text-stone-300'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          onClick={() => toggleNpcStep(step.id)}
                          className="flex items-start gap-2.5 flex-1 cursor-pointer"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="w-5 h-5 rounded-full bg-rose-950 border border-rose-500/40 flex items-center justify-center text-[10px] font-bold text-rose-300">
                                {step.order}
                              </span>
                              <h4
                                className={`font-serif font-bold text-xs sm:text-sm ${isDone ? 'line-through text-stone-400' : 'text-stone-100'
                                  }`}
                              >
                                {step.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-1">
                              <span>📍 {step.zone}</span>
                              <span>•</span>
                              <span>🌙 Fase: {step.moonPhase}</span>
                            </div>
                          </div>
                        </div>

                        {step.missable && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold flex-shrink-0">
                            ¡Paso Perdible!
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-300 font-sans mt-2.5 pl-7 leading-relaxed">
                        {step.description}
                      </p>

                      {step.missableWarning && (
                        <div className="mt-2 ml-7 p-2 rounded-lg bg-red-950/40 border-l-2 border-red-500 text-[11px] text-red-200">
                          <strong>Punto de no retorno:</strong> {step.missableWarning}
                        </div>
                      )}

                      {/* Recompensas del paso */}
                      {step.rewards?.length > 0 && (
                        <div className="mt-2.5 ml-7 pt-2 border-t border-stone-800/60 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono text-stone-400">Recompensas:</span>
                          {step.rewards.map((r, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[10px] font-serif px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-rose-300"
                            >
                              ✦ {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Todas las Recompensas del Personaje */}
              {activeNpc.allRewards?.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#0b080d] border border-stone-800 space-y-2">
                  <span className="font-serif font-bold text-xs text-rose-300 uppercase tracking-wider block">
                    🎁 Todas las Recompensas Obtenibles de {activeNpc.name.split('(')[0].trim()}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNpc.allRewards.map((rew, rIdx) => (
                      <button
                        key={rIdx}
                        type="button"
                        onClick={() => {
                          const it = getBloodborneItemByName(rew);
                          if (it && onInspectItem) onInspectItem(it);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-rose-950 text-stone-200 hover:text-rose-200 border border-stone-800 hover:border-rose-500/50 text-xs font-serif transition flex items-center gap-1"
                        title="Ver en el Compendio"
                      >
                        <Package className="w-3 h-3 text-rose-400" />
                        <span>{rew}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  {/* PESTAÑA 2: MATRIZ CONSOLIDADA DE DECISIONES & VARIACIONES */ }
  {
    activeTab === 'decisions' && (
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4">
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-xs font-sans text-rose-200">
          Bloodborne castiga severamente las decisiones apresuradas. Esta tabla consolida los mayores dilemas del juego con sus consecuencias exactas, para que elijas la ruta que mejor complementa tu build y tus trofeos.
        </div>

        <div className="space-y-3.5">
          {BB_DECISIONS_AND_VARIATIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0d090f] border border-stone-800 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-800 pb-2">
                <h3 className="font-serif font-bold text-sm text-rose-200">{item.title}</h3>
                <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
                  <span>📍 {item.zone}</span>
                  <span>•</span>
                  <span>👤 {item.npc}</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-sans italic">{item.dilemma}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {item.choices.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl bg-black/50 border border-rose-950/60 space-y-1.5 text-xs font-sans"
                  >
                    <span className="font-serif font-bold text-rose-300 block">
                      Opción: {c.name}
                    </span>
                    <div className="text-stone-300">
                      <strong className="text-amber-300/90 font-mono text-[11px]">Recompensa:</strong> {c.reward}
                    </div>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      <strong className="text-stone-300">Impacto:</strong> {c.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  {/* PESTAÑA 3: REFUGIADOS (CAPILLA VS CLÍNICA) */ }
  {
    activeTab === 'refugees' && (
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4">
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-xs font-sans text-rose-200">
          Existen 6 supervivientes en Yharnam a los que puedes indicar un refugio seguro. La Capilla de Oedon protege sus vidas (con precauciones), mientras que la Clínica de Iosefka los convierte en sujetos de experimentos celestiales.
        </div>

        <div className="space-y-3">
          {REFUGEE_CHOICES.map((r, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0d090f] border border-stone-800 space-y-2 text-xs font-sans"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-rose-200">{r.name}</h3>
                <span className="text-[10px] font-mono text-stone-400">{r.location}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800/80">
                  <span className="font-serif font-bold text-emerald-300 block mb-1">
                    Si lo envías a la Capilla de Oedon:
                  </span>
                  <p className="text-stone-300 leading-relaxed">{r.oedonReward}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800/80">
                  <span className="font-serif font-bold text-sky-300 block mb-1">
                    Si lo envías a la Clínica de Iosefka:
                  </span>
                  <p className="text-stone-300 leading-relaxed">{r.iosefkaReward}</p>
                </div>
              </div>

              {r.warning && (
                <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 font-serif text-[11px]">
                  {r.warning}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  {/* PESTAÑA 4: 4 TERCIOS DE CORDÓN & 3 FINALES */ }
  {
    activeTab === 'endings' && (
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
        {/* Los 4 Tercios de Cordón */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <span className="font-serif font-bold text-sm text-rose-200 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-rose-400" />
              <span>Los 4 Tercios de Cordón Umbilical ({cordsCount} / 4 Conseguidos)</span>
            </span>
            <span className="text-xs font-mono text-amber-300">
              ¡Solo necesitas 3 de los 4 para el Final Secreto!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cordItems.map((cord) => {
              const isDone = !!cordsDone[cord.id];
              return (
                <div
                  key={cord.id}
                  onClick={() => toggleCord(cord.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer select-none flex flex-col justify-between ${isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-[#0d090f] border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-600 flex-shrink-0" />
                        )}
                        <span className="font-serif font-bold text-xs sm:text-sm text-stone-100">
                          {cord.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase text-stone-400">
                        {isDone ? 'Conseguido' : 'Pendiente'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-sans mt-2 pl-6 leading-relaxed">
                      {cord.description}
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-rose-300/80 mt-2 pl-6 pt-1 border-t border-stone-800/60">
                    Ubicación: {cord.location}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guía de los 3 Finales */}
        <div className="space-y-3">
          <span className="font-serif font-bold text-sm text-rose-200 uppercase tracking-wider block">
            Los 3 Desenlaces Oficiales de Yharnam
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BB_ENDINGS_GUIDE.endings.map((end) => (
              <div
                key={end.id}
                className="p-4 rounded-2xl bg-[#0d090f] border border-stone-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif font-bold text-xs text-rose-200">{end.title}</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                      {end.trophy}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-amber-300/90 mt-1.5">
                    <strong>Elección:</strong> {end.choice}
                  </div>
                  <p className="text-xs text-stone-300 font-sans mt-2 leading-relaxed">
                    {end.outcome}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 text-[11px] font-sans space-y-1">
                  <div className="text-emerald-300 font-bold">{end.rewards}</div>
                  <div className="text-stone-400 italic">💡 {end.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Truco del Backup para sacar los 3 finales en 1 partida */}
        <div className="p-4 rounded-2xl bg-black/60 border border-rose-950/80 space-y-2 text-xs">
          <span className="font-serif font-bold text-rose-300 block">
            💾 Truco de Platino: Obtener los 3 Finales en una Sola Partida
          </span>
          <div className="space-y-1 text-stone-300 font-sans leading-relaxed">
            {BB_ENDINGS_GUIDE.backupTrick.map((step, sIdx) => (
              <p key={sIdx}>{step}</p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  {/* PESTAÑA 5: LUCIDEZ & JURAMENTOS */ }
  {
    activeTab === 'insight' && (
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4">
        <div className="p-3.5 rounded-2xl bg-[#0d090f] border border-stone-800 text-xs font-sans text-stone-300">
          La <strong>Lucidez</strong> representa el conocimiento cósmico sobrenatural de tu mente. A mayor lucidez, mayor es tu percepción de los Grandes Seres, pero menor es tu resistencia contra el FRENESÍ y menor la barra de Bestialidad acumulable.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {INSIGHT_THRESHOLDS.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#0b080d] border border-stone-800 flex items-start gap-3"
            >
              <div className="px-2 py-1 rounded bg-rose-950/80 border border-rose-500/40 font-mono text-xs font-bold text-rose-300 flex-shrink-0">
                {item.level} {typeof item.level === 'number' ? 'Lucidez' : ''}
              </div>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                {item.effect}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  {/* Pie */ }
  <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif flex-shrink-0">
    <span>Bloodborne Questlines, Eldritch Secrets & Covenants</span>
    <button
      onClick={onClose}
      className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition"
    >
      Cerrar
    </button>
  </div>
                    </div >
                  </div >
                  );
}

export default BloodborneQuestsModal;
