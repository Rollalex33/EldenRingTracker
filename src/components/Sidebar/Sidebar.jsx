import React from 'react';
import { useTrackerStore } from '../../store/useTrackerStore';
import { CATEGORIAS_CONFIG, missablePasosSet } from '../../data/mockData';
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  MapPin,
  Flame,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const Sidebar = ({ onToggleGuide, showGuide, className = '' }) => {
  const {
    locations,
    filtrosActivos,
    setFiltro,
    busqueda,
    setBusqueda,
    itemsCompletados,
    toggleCompletado,
    setSelectedLocation,
    selectedLocationId,
    resetFiltros,
    enfocarUbicacion,
    soloPerdibles,
    toggleSoloPerdibles,
  } = useTrackerStore();

  // Filtrado de ubicaciones con soporte opcional de filtro de perdibles
  const filteredLocations = locations.filter((loc) => {
    const matchCat = filtrosActivos.includes(loc.categoria);
    const matchSearch =
      !busqueda ||
      loc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      loc.region.toLowerCase().includes(busqueda.toLowerCase()) ||
      loc.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    if (soloPerdibles) {
      if (!loc.questlinePasoId) return false;
      const isDone =
        itemsCompletados.has(loc.id) || itemsCompletados.has(loc.questlinePasoId);
      const isMissable = missablePasosSet.has(loc.questlinePasoId);
      return matchCat && matchSearch && isMissable && !isDone;
    }

    return matchCat && matchSearch;
  });

  const totalItems = locations.length;
  const completados = locations.filter((l) => itemsCompletados.has(l.id)).length;
  const porcentaje = totalItems > 0 ? Math.round((completados / totalItems) * 100) : 0;

  return (
    <aside className={`w-full h-full bg-[#08090d] border-r border-stone-800/80 flex flex-col z-20 select-none ${className}`}>
      {/* Header con marca Elden Ring */}
      <div className="p-4 border-b border-stone-800/80 bg-[#050609]/90">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <h1 className="font-serif text-base font-bold tracking-wider text-amber-200 uppercase">
              Elden Ring Tracker
            </h1>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">
            v0.1
          </span>
        </div>
        <p className="text-xs text-stone-400 font-serif">
          The Lands Between & Guía EliteGuías
        </p>

        {/* Barra de progreso global */}
        <div className="mt-3 bg-[#0c0d13] p-2.5 rounded-xl border border-stone-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-stone-300 font-medium">Progreso del Mapa</span>
            <span className="text-amber-300 font-bold font-mono">
              {completados} / {totalItems} ({porcentaje}%)
            </span>
          </div>
          <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-stone-800">
            <div
              className="bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 h-full transition-all duration-300 shadow-[0_0_8px_rgba(201,160,80,0.4)]"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>
      </div>

      {/* Buscador interactivo */}
      <div className="p-3 border-b border-stone-800/80 bg-[#090a0f]">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar lugares, jefes, gracias..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-black/50 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Chips de categorías */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-400 mb-1.5">
          <span className="flex items-center gap-1 font-serif">
            <Filter className="w-3 h-3 text-amber-400" />
            Filtros por categoría
          </span>
          <button
            onClick={resetFiltros}
            className="text-amber-400 hover:underline flex items-center gap-0.5 text-[10px]"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Reiniciar
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.entries(CATEGORIAS_CONFIG).map(([key, config]) => {
            const isActive = filtrosActivos.includes(key);
            return (
              <button
                key={key}
                onClick={() => setFiltro(key)}
                className={`text-[11px] px-2 py-1 rounded-lg border transition flex items-center gap-1 active:scale-95 ${
                  isActive
                    ? 'bg-amber-950/40 text-amber-200 border-amber-500/50 shadow-sm'
                    : 'bg-black/40 text-stone-500 border-stone-800 opacity-60 hover:opacity-100 hover:text-stone-300'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Switch de Filtro de Perdibles */}
        <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] group">
            <input
              type="checkbox"
              checked={soloPerdibles}
              onChange={toggleSoloPerdibles}
              className="sr-only"
            />
            <div
              className={`w-7 h-4 rounded-full transition p-0.5 border ${
                soloPerdibles
                  ? 'bg-red-950 border-red-500 shadow-sm'
                  : 'bg-black/50 border-stone-700'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition transform ${
                  soloPerdibles ? 'translate-x-3 bg-red-400' : 'translate-x-0 bg-stone-500'
                }`}
              />
            </div>
            <span
              className={`font-serif transition ${
                soloPerdibles
                  ? 'text-red-300 font-bold'
                  : 'text-stone-400 group-hover:text-stone-200'
              }`}
            >
              ⚠️ Solo perdibles pendientes
            </span>
          </label>
        </div>
      </div>

      {/* Lista de Ubicaciones */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        <div className="flex items-center justify-between text-xs text-stone-400 px-1 py-0.5">
          <span>Ubicaciones ({filteredLocations.length})</span>
          {onToggleGuide && (
            <button
              onClick={onToggleGuide}
              className="text-xs text-amber-400 hover:text-amber-200 lg:hidden font-medium"
            >
              {showGuide ? 'Ver Mapa' : 'Ver Guía'}
            </button>
          )}
        </div>

        {filteredLocations.map((loc) => {
          const isDone = itemsCompletados.has(loc.id);
          const isSelected = selectedLocationId === loc.id;
          const config = CATEGORIAS_CONFIG[loc.categoria];

          return (
            <div
              key={loc.id}
              onClick={() => {
                setSelectedLocation(loc.id);
                enfocarUbicacion(loc.coords, loc.questlinePasoId || null);
              }}
              className={`p-2.5 rounded-xl border transition cursor-pointer active:scale-[0.99] ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-400 shadow-[0_0_15px_rgba(201,160,80,0.2)]'
                  : 'bg-[#0c0d13] border-stone-800/80 hover:border-stone-700 hover:bg-[#10121a]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: config?.color || '#c5a059' }}
                  />
                  <div>
                    <h4
                      className={`text-xs font-serif font-bold ${
                        isDone ? 'text-stone-500 line-through' : 'text-stone-200'
                      }`}
                    >
                      {loc.titulo}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <p className="text-[10px] text-stone-400">{loc.region}</p>
                      {loc.mapaOrigen === 'underground' && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60">
                          🕳️ Subterráneo
                        </span>
                      )}
                      {loc.mapaOrigen === 'dlc' && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                          🌳 DLC
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompletado(loc.id);
                  }}
                  className="p-1 text-stone-400 hover:text-white transition active:scale-90"
                  title={isDone ? 'Marcar pendiente' : 'Marcar completado'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-600 hover:text-stone-400" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredLocations.length === 0 && (
          <div className="text-center py-8 text-stone-500 text-xs">
            No se encontraron ubicaciones con los filtros actuales.
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
