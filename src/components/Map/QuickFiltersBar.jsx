import React, { useState } from 'react';
import { useTrackerStore } from '../../store/useTrackerStore';
import {
  Flame,
  Skull,
  User,
  Sword,
  Sparkles,
  Map as MapIcon,
  ChevronDown,
  Layers,
  Check,
  Compass,
  Key,
} from 'lucide-react';

/**
 * Mapas disponibles en el tracker
 */
export const MAPAS_CONFIG = {
  surface: {
    id: 'surface',
    nombre: 'Superficie',
    subtitulo: 'The Lands Between',
    icono: '🗺️',
    color: '#c5a059',
  },
  underground: {
    id: 'underground',
    nombre: 'Subterráneo',
    subtitulo: 'Siofra, Ainsel & Nokron',
    icono: '🕳️',
    color: '#38bdf8',
  },
  dlc: {
    id: 'dlc',
    nombre: 'DLC Reino de la Sombra',
    subtitulo: 'Shadow of the Erdtree',
    icono: '🌳',
    color: '#fbbf24',
  },
};

/**
 * Barra Flotante de Filtros Rápidos y Selector de Mapas
 * Ubicada en la esquina superior derecha del mapa.
 */
export const QuickFiltersBar = ({ visibleCount = 0, totalMapCount = 0 }) => {
  const {
    mapaActivo,
    setMapaActivo,
    filtrosActivos,
    toggleGrupoFiltro,
  } = useTrackerStore();

  const [isMapDropdownOpen, setIsMapDropdownOpen] = useState(false);

  // Estados activos para cada grupo de la barra rápida
  const isGracesActive = filtrosActivos.includes('graces');
  const isBossesActive = filtrosActivos.includes('bosses');
  const isDungeonsActive = filtrosActivos.includes('dungeons');
  const isNpcsActive = filtrosActivos.includes('npcs');
  const isWeaponsActive = ['weapons', 'spells'].some((c) =>
    filtrosActivos.includes(c)
  );
  const isItemsActive = ['ashes', 'key_items'].some((c) =>
    filtrosActivos.includes(c)
  );

  const activeMapData = MAPAS_CONFIG[mapaActivo] || MAPAS_CONFIG.surface;

  return (
    <div className="absolute top-16 right-4 z-[450] flex flex-col md:flex-row items-end md:items-center gap-2 select-none">
      {/* 1. Selector Desplegable de Capas / Mapas */}
      <div className="relative">
        <button
          onClick={() => setIsMapDropdownOpen(!isMapDropdownOpen)}
          className="bg-elden-900/95 hover:bg-elden-850 text-slate-100 border border-elden-gold/50 hover:border-elden-gold px-3 py-1.5 rounded-xl shadow-gold-glow backdrop-blur-md flex items-center gap-2 text-xs font-serif transition-all duration-200"
          title="Cambiar capa de mapa activa"
        >
          <span className="text-base leading-none">{activeMapData.icono}</span>
          <div className="text-left">
            <div className="font-bold text-elden-gold-light flex items-center gap-1">
              <span>{activeMapData.nombre}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-elden-gold transition-transform duration-200 ${
                  isMapDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
            <div className="text-[10px] text-slate-400 font-sans truncate max-w-[120px]">
              {activeMapData.subtitulo}
            </div>
          </div>
        </button>

        {/* Menú flotante de mapas */}
        {isMapDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-[490]"
              onClick={() => setIsMapDropdownOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-64 bg-elden-950/98 border border-elden-gold/60 rounded-xl shadow-2xl backdrop-blur-xl p-1.5 z-[500] space-y-1 animate-fadeIn">
              <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-elden-gold/80 border-b border-slate-800">
                Seleccionar Territorio
              </div>
              {Object.values(MAPAS_CONFIG).map((mapa) => {
                const isSelected = mapa.id === mapaActivo;
                return (
                  <button
                    key={mapa.id}
                    onClick={() => {
                      setMapaActivo(mapa.id);
                      setIsMapDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-2 rounded-lg text-left transition flex items-center justify-between gap-2 text-xs ${
                      isSelected
                        ? 'bg-elden-gold/20 text-elden-gold-light border border-elden-gold/50 shadow-sm font-semibold'
                        : 'text-slate-300 hover:bg-elden-850/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">{mapa.icono}</span>
                      <div>
                        <div className="font-serif">{mapa.nombre}</div>
                        <div className="text-[10px] text-slate-400 font-sans">
                          {mapa.subtitulo}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-elden-gold shadow-gold-glow" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 2. Barra de Toggles Rápidos por Categoría */}
      <div className="bg-elden-900/95 backdrop-blur-md border border-elden-gold/40 rounded-xl shadow-gold-glow p-1 flex items-center gap-1 text-xs flex-wrap md:flex-nowrap">
        {/* Toggle 🟡 Gracias */}
        <button
          onClick={() => toggleGrupoFiltro('graces')}
          className={`px-2 py-1 rounded-lg font-serif transition-all flex items-center gap-1.5 border text-xs ${
            isGracesActive
              ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.3)] font-bold'
              : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 opacity-60'
          }`}
          title="Alternar Sitios de Gracia"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
          <span>Gracias</span>
        </button>

        {/* Toggle 🔴 Jefes */}
        <button
          onClick={() => toggleGrupoFiltro('bosses')}
          className={`px-2 py-1 rounded-lg font-serif transition-all flex items-center gap-1.5 border text-xs ${
            isBossesActive
              ? 'bg-red-500/20 text-red-200 border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.3)] font-bold'
              : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 opacity-60'
          }`}
          title="Alternar Jefes y Recuerdos"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
          <span>Jefes</span>
        </button>

        {/* Toggle 🏰 Mazmorras */}
        <button
          onClick={() => toggleGrupoFiltro('dungeons')}
          className={`px-2 py-1 rounded-lg font-serif transition-all flex items-center gap-1.5 border text-xs ${
            isDungeonsActive
              ? 'bg-orange-500/20 text-orange-200 border-orange-500/60 shadow-[0_0_10px_rgba(249,115,22,0.3)] font-bold'
              : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 opacity-60'
          }`}
          title="Alternar Mazmorras, Catacumbas y Cuevas"
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316]" />
          <span>Mazmorras</span>
        </button>

        {/* Toggle 🟢 NPCs */}
        <button
          onClick={() => toggleGrupoFiltro('npcs')}
          className={`px-2 py-1 rounded-lg font-serif transition-all flex items-center gap-1.5 border text-xs ${
            isNpcsActive
              ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.3)] font-bold'
              : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 opacity-60'
          }`}
          title="Alternar Misiones de NPCs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
          <span>NPCs</span>
        </button>

        {/* Toggle ⚔️ Armas y Magia */}
        <button
          onClick={() => toggleGrupoFiltro('weapons')}
          className={`px-2 py-1 rounded-lg font-serif transition-all flex items-center gap-1.5 border text-xs ${
            isWeaponsActive
              ? 'bg-sky-500/20 text-sky-200 border-sky-500/60 shadow-[0_0_10px_rgba(56,189,248,0.3)] font-bold'
              : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 opacity-60'
          }`}
          title="Alternar Armas y Hechizos"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          <span>Armas & Magia</span>
        </button>

        {/* Toggle 🟣 Cenizas y Objetos */}
        <button
          onClick={() => toggleGrupoFiltro('items')}
          className={`px-2 py-1 rounded-lg font-serif transition-all flex items-center gap-1.5 border text-xs ${
            isItemsActive
              ? 'bg-purple-500/20 text-purple-200 border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-bold'
              : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 opacity-60'
          }`}
          title="Alternar Cenizas de Invocación y Objetos Clave"
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
          <span>Objetos</span>
        </button>

        {/* Separador y Conteo Activo */}
        <div className="h-4 w-[1px] bg-slate-700 mx-1" />
        <div className="px-2 py-0.5 text-[11px] font-mono text-slate-300 flex items-center gap-1">
          <span className="text-elden-gold font-bold">{visibleCount}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">{totalMapCount}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickFiltersBar;
