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
    <aside className={`w-full h-full bg-elden-900 flex flex-col z-20 select-none ${className}`}>
      {/* Header con marca Elden Ring */}
      <div className="p-4 border-b border-elden-border bg-elden-950/80">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-elden-gold animate-pulse" />
            <h1 className="font-serif text-base font-bold tracking-wider text-elden-gold uppercase">
              Elden Ring Tracker
            </h1>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-elden-800 text-elden-gold-light border border-elden-gold/30">
            v0.1
          </span>
        </div>
        <p className="text-xs text-slate-400 font-serif">
          The Lands Between & Guía EliteGuías
        </p>

        {/* Barra de progreso global */}
        <div className="mt-3 bg-elden-850 p-2.5 rounded-lg border border-elden-border">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Progreso del Mapa</span>
            <span className="text-elden-gold font-bold">
              {completados} / {totalItems} ({porcentaje}%)
            </span>
          </div>
          <div className="w-full bg-elden-950 rounded-full h-2 overflow-hidden border border-slate-700/50">
            <div
              className="bg-gradient-to-r from-elden-gold-dark via-elden-gold to-elden-gold-glow h-full transition-all duration-300 shadow-gold-glow"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>
      </div>

      {/* Buscador interactivo */}
      <div className="p-3 border-b border-elden-border bg-elden-850">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar lugares, jefes, gracias..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-elden-950 border border-elden-border rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elden-gold transition"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Chips de categorías */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
          <span className="flex items-center gap-1">
            <Filter className="w-3 h-3 text-elden-gold" />
            Filtros por categoría
          </span>
          <button
            onClick={resetFiltros}
            className="text-elden-gold hover:underline flex items-center gap-0.5 text-[10px]"
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
                className={`text-[11px] px-2 py-1 rounded-md border transition flex items-center gap-1 ${
                  isActive
                    ? 'bg-elden-800 text-slate-100 border-elden-gold/60 shadow-sm'
                    : 'bg-elden-950/60 text-slate-500 border-slate-800 opacity-60 hover:opacity-100'
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
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
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
                  : 'bg-elden-950 border-slate-700'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition transform ${
                  soloPerdibles ? 'translate-x-3 bg-red-400' : 'translate-x-0 bg-slate-500'
                }`}
              />
            </div>
            <span
              className={`font-serif transition ${
                soloPerdibles
                  ? 'text-red-300 font-bold'
                  : 'text-slate-400 group-hover:text-slate-200'
              }`}
            >
              ⚠️ Solo perdibles pendientes
            </span>
          </label>
        </div>
      </div>

      {/* Lista de Ubicaciones */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 py-0.5">
          <span>Ubicaciones coincidentes ({filteredLocations.length})</span>
          {onToggleGuide && (
            <button
              onClick={onToggleGuide}
              className="text-xs text-elden-gold hover:text-white lg:hidden font-medium"
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
              className={`p-2.5 rounded-lg border transition cursor-pointer ${
                isSelected
                  ? 'bg-elden-800 border-elden-gold shadow-gold-glow'
                  : 'bg-elden-850 border-elden-border hover:border-slate-600'
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
                        isDone ? 'text-slate-400 line-through' : 'text-slate-100'
                      }`}
                    >
                      {loc.titulo}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <p className="text-[10px] text-slate-400">{loc.region}</p>
                      {loc.mapaOrigen === 'underground' && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60">
                          🕳️ Subterráneo
                        </span>
                      )}
                      {loc.mapaOrigen === 'dlc' && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60">
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
                  className="p-1 text-slate-400 hover:text-white transition"
                  title={isDone ? 'Marcar pendiente' : 'Marcar completado'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredLocations.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-xs">
            No se encontraron ubicaciones con los filtros actuales.
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
