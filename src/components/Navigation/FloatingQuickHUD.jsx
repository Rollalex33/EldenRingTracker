import React, { useState } from 'react';
import {
  Compass,
  Map,
  ListChecks,
  Sword,
  Coins,
  Scale,
  Trophy,
  Route,
  Settings,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';

export function FloatingQuickHUD({
  onOpenBuilds,
  onOpenEquipLoad,
  onOpenPlatinum,
  onOpenRuneCalc,
  onOpenProgression,
  onOpenSettings,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { viewMode, setViewMode, itemsCompletados, setActiveGame } = useTrackerStore();

  const totalDone = itemsCompletados.size;

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[450] flex flex-col items-center pointer-events-auto select-none transition-all duration-300">
      {/* Toggle para minimizar/expandir el Dock */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-1.5 px-3 py-0.5 rounded-full bg-[#08090f]/90 border border-amber-500/30 text-amber-300/80 hover:text-amber-200 text-[10px] font-mono flex items-center gap-1 shadow-lg backdrop-blur-md transition hover:border-amber-500/60 active:scale-95"
        title={isCollapsed ? 'Mostrar Dock Rápido' : 'Ocultar Dock Rápido'}
      >
        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
        <span>GRACIA HUD</span>
        {isCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {/* Dock Flotante Estilo Elden Ring Glassmorphism */}
      {!isCollapsed && (
        <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-[#07080d]/92 border border-amber-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl animate-scaleUp">
          {/* 1. Hub / Mesa Redonda */}
          <button
            onClick={() => setViewMode('hub')}
            className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-serif font-bold transition ${
              viewMode === 'hub'
                ? 'bg-amber-500 text-stone-950 shadow-[0_0_12px_rgba(201,160,80,0.6)]'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
            }`}
            title="Ir a Mesa Redonda (Inicio)"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Inicio</span>
          </button>

          <div className="w-[1px] h-5 bg-stone-800" />

          {/* 2. Compendio */}
          <button
            onClick={() => setViewMode('checklist')}
            className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-serif font-bold transition ${
              viewMode === 'checklist'
                ? 'bg-amber-500 text-stone-950 shadow-[0_0_12px_rgba(201,160,80,0.6)]'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
            }`}
            title="Abrir Compendio de 2,758 Ítems"
          >
            <ListChecks className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Compendio</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/40 text-amber-300 border border-amber-500/30">
              {totalDone}
            </span>
          </button>

          {/* 3. Mapa Interactivo */}
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-serif font-bold transition ${
              viewMode === 'map'
                ? 'bg-sky-500 text-stone-950 shadow-[0_0_12px_rgba(14,165,233,0.6)]'
                : 'text-stone-300 hover:text-sky-300 hover:bg-stone-800/60'
            }`}
            title="Abrir Mapa Interactivo GIS"
          >
            <Map className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Mapa</span>
          </button>

          <div className="w-[1px] h-5 bg-stone-800" />

          {/* 4. Constructor de Builds */}
          <button
            onClick={onOpenBuilds}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl text-stone-300 hover:text-emerald-300 hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/40 flex items-center gap-1.5 text-xs font-serif transition active:scale-95"
            title="Constructor de Builds & Equipo"
          >
            <Sword className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Builds</span>
          </button>

          {/* 5. Calculadora de Runas */}
          <button
            onClick={onOpenRuneCalc}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl text-stone-300 hover:text-yellow-300 hover:bg-yellow-950/40 border border-transparent hover:border-yellow-500/40 flex items-center gap-1.5 text-xs font-serif transition active:scale-95"
            title="Calculadora de Runas & Consumibles"
          >
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="hidden lg:inline">Runas</span>
          </button>

          {/* 6. Ruta de Progresión */}
          <button
            onClick={onOpenProgression}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl text-stone-300 hover:text-amber-300 hover:bg-amber-950/40 border border-transparent hover:border-amber-500/40 flex items-center gap-1.5 text-xs font-serif transition active:scale-95"
            title="Ruta Óptima de Progresión por Zonas"
          >
            <Route className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Ruta</span>
          </button>

          {/* 7. Platino */}
          <button
            onClick={onOpenPlatinum}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl text-stone-300 hover:text-purple-300 hover:bg-purple-950/40 border border-transparent hover:border-purple-500/40 flex items-center gap-1.5 text-xs font-serif transition active:scale-95"
            title="Salón del Platino & Recuerdos"
          >
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="hidden xl:inline">Platino</span>
          </button>

          {/* 8. Calculadora de Carga */}
          <button
            onClick={onOpenEquipLoad}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl text-stone-300 hover:text-amber-200 hover:bg-amber-950/40 border border-transparent hover:border-amber-500/40 flex items-center gap-1.5 text-xs font-serif transition active:scale-95"
            title="Calculadora de Carga & Rodamiento"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">Carga</span>
          </button>

          <div className="w-[1px] h-5 bg-stone-800" />

          {/* Bloodborne */}
          <button
            onClick={() => setActiveGame('bloodborne')}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 hover:text-rose-100 flex items-center gap-1 text-xs font-serif transition active:scale-95 shadow-sm"
            title="Cambiar a Bloodborne (Yharnam)"
          >
            <span>🩸</span>
            <span className="hidden md:inline font-bold">BB</span>
          </button>

          {/* 9. Ajustes */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-xl text-stone-400 hover:text-amber-300 hover:bg-stone-800/60 transition active:scale-95"
            title="Ajustes & Copia de Seguridad JSON"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default FloatingQuickHUD;
