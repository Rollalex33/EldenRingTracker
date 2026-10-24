import React, { useState } from 'react';
import { useTrackerStore } from '../../store/useTrackerStore';
import {
  AlertTriangle,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  ChevronDown,
  Compass,
  Check,
  Flame,
  ShieldAlert,
  Eye,
  Search,
  Users,
} from 'lucide-react';

/**
 * Componente de Guía Paso a Paso de Misiones de NPCs
 * Proporciona selector de Questlines, filtro avanzado "Solo Perdibles",
 * pasos secuenciales con advertencias "missable", checkboxes de completado
 * y sincronización directa con el mapa interactivo.
 */
export const QuestlineGuide = () => {
  const {
    questlines,
    locations,
    selectedQuestlineId,
    setSelectedQuestline,
    pasoSeleccionadoId,
    enfocarUbicacion,
    itemsCompletados,
    toggleCompletado,
    setSelectedLocation,
    soloPerdibles,
    toggleSoloPerdibles,
  } = useTrackerStore();

  const [npcFilter, setNpcFilter] = useState('');

  // Filtrado de NPCs por búsqueda de texto
  const filteredQuestlines = questlines.filter((q) =>
    !npcFilter ||
    q.npc.toLowerCase().includes(npcFilter.toLowerCase()) ||
    q.pasos.some((p) => p.ubicacionNombre.toLowerCase().includes(npcFilter.toLowerCase()))
  );

  // Misión activa actualmente
  const activeQuest =
    questlines.find((q) => q.id === selectedQuestlineId) || questlines[0];

  const pasos = activeQuest ? activeQuest.pasos : [];

  // Conteo de pasos completados en la questline activa
  const pasosCompletados = pasos.filter((p) =>
    itemsCompletados.has(p.pasoId)
  ).length;
  const progresoPorcentaje =
    pasos.length > 0 ? Math.round((pasosCompletados / pasos.length) * 100) : 0;

  // Conteo de pasos perdibles pendientes en la questline activa
  const missablesPendientes = pasos.filter(
    (p) => p.missable && !itemsCompletados.has(p.pasoId)
  ).length;

  // Filtrado de pasos: Si "soloPerdibles" está activo, muestra únicamente pasos con missable: true y NO completados
  const visiblePasos = pasos.filter((paso) => {
    if (!soloPerdibles) return true;
    const isDone = itemsCompletados.has(paso.pasoId);
    return Boolean(paso.missable) && !isDone;
  });

  /**
   * Manejador para el botón "Ver en el mapa"
   */
  const handleVerEnMapa = (paso) => {
    let loc = locations.find((l) => l.id === paso.locationId);
    if (!loc && paso.pasoId) {
      loc = locations.find((l) => l.questlinePasoId === paso.pasoId);
    }

    if (loc && loc.coords) {
      enfocarUbicacion(loc.coords, paso.pasoId);
      setSelectedLocation(loc.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-elden-900 text-slate-200 select-none">
      {/* 1. Encabezado y Selector de Misiones / NPCs */}
      <div className="p-4 border-b border-elden-border bg-elden-950/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-elden-gold" />
            <h2 className="font-serif text-sm uppercase tracking-wider text-elden-gold font-bold">
              Guía de Questlines (EliteGuías)
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-400" />
              {questlines.length} NPCs
            </span>
          </div>
        </div>

        {/* Buscador reactivo para filtrar entre los 20 NPCs */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={npcFilter}
            onChange={(e) => {
              const val = e.target.value;
              setNpcFilter(val);
              if (val) {
                const match = questlines.find((q) =>
                  q.npc.toLowerCase().includes(val.toLowerCase())
                );
                if (match) setSelectedQuestline(match.id);
              }
            }}
            placeholder="Filtrar NPC (ej: Nepheli, Varré, Sellen, Patches...)"
            className="w-full pl-8 pr-7 py-1.5 bg-elden-850 border border-elden-border rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elden-gold transition"
          />
          {npcFilter && (
            <button
              onClick={() => setNpcFilter('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Selector de NPC */}
        <div className="relative">
          <select
            value={selectedQuestlineId}
            onChange={(e) => setSelectedQuestline(e.target.value)}
            className="w-full pl-3 pr-9 py-2 bg-elden-850 border border-elden-gold/40 rounded-lg text-xs font-serif font-semibold text-slate-100 focus:outline-none focus:border-elden-gold focus:ring-1 focus:ring-elden-gold appearance-none cursor-pointer transition shadow-sm"
          >
            {filteredQuestlines.map((quest) => {
              const comp = quest.pasos.filter((p) =>
                itemsCompletados.has(p.pasoId)
              ).length;
              const miss = quest.pasos.filter(
                (p) => p.missable && !itemsCompletados.has(p.pasoId)
              ).length;

              return (
                <option key={quest.id} value={quest.id} className="bg-elden-900 text-slate-100 py-1">
                  {quest.npc} — ({comp}/{quest.pasos.length} hechos
                  {miss > 0 ? ` • ${miss} perdibles` : ''})
                </option>
              );
            })}
          </select>
          <ChevronDown className="w-4 h-4 text-elden-gold pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Pills rápidos de cambio de NPC */}
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {filteredQuestlines.map((quest) => {
            const isSelected = quest.id === activeQuest?.id;
            const comp = quest.pasos.filter((p) =>
              itemsCompletados.has(p.pasoId)
            ).length;
            const hasPendingMissable = quest.pasos.some(
              (p) => p.missable && !itemsCompletados.has(p.pasoId)
            );

            return (
              <button
                key={quest.id}
                onClick={() => setSelectedQuestline(quest.id)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium border transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-elden-gold text-elden-950 border-elden-gold shadow-gold-glow font-bold'
                    : 'bg-elden-800 text-slate-300 border-elden-border hover:border-elden-gold/50'
                }`}
              >
                <span>{quest.npc.split(' ')[0]}</span>
                {hasPendingMissable && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"
                    title="Tiene pasos perdibles pendientes"
                  />
                )}
                <span
                  className={`text-[9px] px-1 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-elden-950/25 text-elden-950 font-mono font-bold'
                      : 'bg-elden-900 text-slate-400 font-mono'
                  }`}
                >
                  {comp}/{quest.pasos.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Barra de progreso de la misión activa */}
        <div className="bg-elden-850 p-2.5 rounded-lg border border-elden-border">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-serif">Progreso de la Quest</span>
            <span className="text-elden-gold font-mono font-bold">
              {pasosCompletados} / {pasos.length} ({progresoPorcentaje}%)
            </span>
          </div>
          <div className="w-full bg-elden-950 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
            <div
              className="bg-gradient-to-r from-elden-gold-dark via-elden-gold to-elden-gold-glow h-full transition-all duration-300 shadow-gold-glow"
              style={{ width: `${progresoPorcentaje}%` }}
            />
          </div>
        </div>

        {/* Switch / Toggle: Filtro "⚠️ Solo mostrar pasos perdibles" */}
        <div className="flex items-center justify-between pt-1">
          <label
            htmlFor="toggle-missables"
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="relative">
              <input
                id="toggle-missables"
                type="checkbox"
                checked={soloPerdibles}
                onChange={toggleSoloPerdibles}
                className="sr-only"
              />
              <div
                className={`w-9 h-5 rounded-full transition duration-200 ease-in-out p-0.5 border ${
                  soloPerdibles
                    ? 'bg-red-950 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                    : 'bg-elden-950 border-slate-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition duration-200 transform ${
                    soloPerdibles
                      ? 'translate-x-4 bg-red-400 shadow-sm'
                      : 'translate-x-0 bg-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <AlertTriangle
                className={`w-3.5 h-3.5 ${
                  soloPerdibles ? 'text-red-400' : 'text-slate-400 group-hover:text-amber-300'
                }`}
              />
              <span
                className={`text-xs font-serif font-medium transition ${
                  soloPerdibles ? 'text-red-200 font-bold' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                Solo pasos perdibles
              </span>
            </div>
          </label>

          {/* Badge informativo de pendientes perdibles */}
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              missablesPendientes > 0
                ? 'bg-red-950/80 text-red-300 border-red-500/40'
                : 'bg-elden-950 text-slate-500 border-slate-800'
            }`}
          >
            {missablesPendientes} pendiente{missablesPendientes === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* 2. Lista Secuencial de Pasos */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar">
        {visiblePasos.map((paso) => {
          const isDone = itemsCompletados.has(paso.pasoId);
          const isSelectedStep = pasoSeleccionadoId === paso.pasoId;
          const location =
            locations.find((l) => l.id === paso.locationId) ||
            locations.find((l) => l.questlinePasoId === paso.pasoId);

          return (
            <div
              key={paso.pasoId}
              id={`paso-${paso.pasoId}`}
              className={`p-3.5 rounded-xl border transition duration-200 ${
                isSelectedStep
                  ? 'bg-elden-800/90 border-elden-gold ring-1 ring-elden-gold shadow-gold-glow-lg'
                  : isDone
                  ? 'bg-elden-950/50 border-emerald-500/25 opacity-75'
                  : 'bg-elden-850 border-elden-border hover:border-slate-600'
              }`}
            >
              {/* Fila superior: Checkbox de completado + Número y Nombre */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  {/* Checkbox interactivo */}
                  <label
                    className="relative flex items-center justify-center cursor-pointer mt-0.5 flex-shrink-0"
                    title={isDone ? 'Marcar paso como pendiente' : 'Marcar paso como completado'}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {
                        toggleCompletado(paso.pasoId);
                        if (location?.id) {
                          toggleCompletado(location.id);
                        }
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500 text-elden-950 shadow-sm'
                          : 'bg-elden-900 border-slate-600 hover:border-elden-gold'
                      }`}
                    >
                      {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </label>

                  {/* Número de paso + Título del paso / ubicación */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="w-5 h-5 rounded-full bg-elden-800 border border-elden-gold/40 flex items-center justify-center text-[10px] font-bold text-elden-gold flex-shrink-0">
                        {paso.orden}
                      </span>
                      <h3
                        className={`font-serif text-xs font-bold leading-tight truncate ${
                          isDone ? 'text-slate-400 line-through' : 'text-slate-100'
                        }`}
                      >
                        {paso.ubicacionNombre}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-elden-900 text-slate-400 border border-slate-700/60 flex items-center gap-1">
                        <Compass className="w-2.5 h-2.5 text-slate-500" />
                        {paso.region}
                      </span>
                      {paso.mapaOrigen === 'underground' && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60">
                          🕳️ Subterráneo
                        </span>
                      )}
                      {paso.mapaOrigen === 'dlc' && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60">
                          🌳 DLC
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Badge de completado */}
                {isDone && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex-shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Hecho
                  </span>
                )}
              </div>

              {/* Indicador de misión "Perdible" (Missable) */}
              {paso.missable && (
                <div className="mb-2.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/50 shadow-sm">
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    Paso Perdible (Missable)
                  </span>

                  {paso.advertenciaMissable && (
                    <div className="mt-1.5 p-2 bg-red-950/40 border-l-2 border-red-500 rounded-r text-[11px] text-red-200 leading-relaxed">
                      <strong className="font-semibold text-red-300">Punto de no retorno:</strong>{' '}
                      {paso.advertenciaMissable}
                    </div>
                  )}
                </div>
              )}

              {/* Descripción del paso */}
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {paso.descripcion}
              </p>

              {/* Barra de acción: Ver en el mapa + Ver en EliteGuías */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={() => handleVerEnMapa(paso)}
                  disabled={!location && !paso.locationId}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-serif font-semibold transition ${
                    isSelectedStep
                      ? 'bg-elden-gold text-elden-950 shadow-gold-glow'
                      : 'bg-elden-800 text-elden-gold hover:bg-elden-700 hover:text-white border border-elden-gold/30'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                  title="Centrar y enfocar en el mapa interactivo"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Ver en el mapa</span>
                </button>

                {paso.eliteguiasUrl && (
                  <a
                    href={paso.eliteguiasUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-elden-gold transition ml-auto"
                    title="Abrir guía oficial de este paso en EliteGuías"
                  >
                    <span>EliteGuías</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {/* Estado Vacío cuando el filtro Solo Perdibles está activo y no hay pasos pendientes */}
        {soloPerdibles && visiblePasos.length === 0 && (
          <div className="p-6 rounded-xl bg-elden-850/80 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-emerald-300">
                ¡Sin pasos perdibles pendientes!
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Has completado todos los pasos críticos con riesgo de perderse para{' '}
                <strong className="text-slate-200">{activeQuest.npc}</strong>.
              </p>
            </div>
            <button
              onClick={toggleSoloPerdibles}
              className="px-3 py-1.5 rounded-lg text-xs font-serif font-semibold bg-elden-800 hover:bg-elden-700 text-elden-gold border border-elden-gold/30 transition"
            >
              Ver todos los pasos
            </button>
          </div>
        )}

        {/* Estado Vacío general */}
        {!soloPerdibles && visiblePasos.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-xs font-serif">
            No se encontraron pasos registrados para esta misión.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestlineGuide;
