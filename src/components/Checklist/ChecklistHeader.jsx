import React, { useState } from 'react';
import {
  Search,
  X,
  ExternalLink,
  Sparkles,
  Map,
  CheckCircle2,
  TreePine,
  Sword,
  LayoutGrid,
  List,
  CheckCheck,
  RotateCcw,
  Settings,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  ArrowDownAZ,
  Zap,
  Shield,
  ChevronsDown,
  ChevronsUp,
} from 'lucide-react';

export function ChecklistHeader({
  totalCompleted,
  totalItems,
  baseCompleted,
  baseTotal,
  dlcCompleted,
  dlcTotal,
  expansionFilter,
  onExpansionFilterChange,
  displayMode,
  onDisplayModeChange,
  sortOrder = 'game',
  onSortOrderChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onSwitchViewMode,
  onOpenSettings,
  onCheckAllVisible,
  onUncheckAllVisible,
  visibleCount,
  activeTotalCount,
  activePendingCount,
  activeCompletedCount,
  // Nuevas props
  isCollapsed = false,
  onToggleCollapse,
  quickMark = false,
  onToggleQuickMark,
  agruparSets = true,
  onToggleAgruparSets,
  isArmorCategory = false,
}) {
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const globalPct = totalItems > 0 ? ((totalCompleted / totalItems) * 100).toFixed(1) : '0';
  const basePct = baseTotal > 0 ? ((baseCompleted / baseTotal) * 100).toFixed(1) : '0';
  const dlcPct = dlcTotal > 0 ? ((dlcCompleted / dlcTotal) * 100).toFixed(1) : '0';

  return (
    <header className={`bg-elden-950 border-b border-slate-800/90 transition-all ${isCollapsed ? 'p-2 sm:p-2.5 space-y-2' : 'p-3 sm:p-5 space-y-3 sm:space-y-4'}`}>
      {!isCollapsed ? (
        <>
          {/* 1. Barra Superior Compacta para Móvil y Escritorio */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-950 to-elden-900 border border-elden-gold/50 text-elden-gold font-bold flex items-center gap-1 shadow-gold-glow">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-elden-gold" />
                  <span className="truncate">Compendio 100%</span>
                </span>

                <a
                  id="header-eliteguias-link"
                  href="https://www.eliteguias.com/guias/e/er/elden-ring.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-elden-gold border border-slate-800 transition flex items-center gap-1"
                  title="Abrir la guía oficial de Elden Ring en EliteGuías"
                >
                  <span>EliteGuías</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <h1 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-amber-100 tracking-wide drop-shadow truncate mt-0.5">
                Elden Ring Checklist
              </h1>
            </div>

            {/* Acciones principales compactas (Iconos táctiles en móvil) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {onToggleCollapse && (
                <button
                  id="header-collapse-toggle-btn"
                  onClick={onToggleCollapse}
                  className="px-2.5 py-1.5 rounded-xl bg-elden-850 hover:bg-elden-800 text-slate-300 hover:text-elden-gold border border-slate-700/80 transition flex items-center gap-1.5 text-xs font-serif font-bold shadow-sm"
                  title="Colapsar cabecera para ganar más espacio en pantalla"
                >
                  <ChevronsUp className="w-3.5 h-3.5 text-elden-gold" />
                  <span className="text-[11px] text-amber-200">Compactar</span>
                </button>
              )}

              <button
                id="switch-view-button"
                onClick={() => onSwitchViewMode(viewMode === 'checklist' ? 'map' : 'checklist')}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-elden-850 hover:bg-elden-800 text-slate-200 hover:text-elden-gold border border-slate-700/80 transition flex items-center gap-1.5 text-xs font-serif font-bold shadow-sm"
                title="Alternar entre Checklist y Mapa"
              >
                <Map className="w-3.5 h-3.5 text-elden-gold" />
                <span className="hidden sm:inline">
                  {viewMode === 'checklist' ? 'Ver Mapa' : 'Volver a Checklist'}
                </span>
              </button>

              <button
                id="open-settings-button"
                onClick={onOpenSettings}
                className="p-1.5 sm:p-2 rounded-xl bg-elden-850 hover:bg-elden-800 text-slate-400 hover:text-elden-gold border border-slate-700/80 transition"
                title="Ajustes y Copia de Seguridad"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Barra de Progreso Compacta / Adaptable */}
          {/* Vista Móvil Compacta (Single Card con mini pills) */}
          <div className="block md:hidden bg-elden-900/90 border border-slate-800/90 rounded-xl p-2.5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-elden-gold" />
                <span className="font-serif font-bold text-slate-200">
                  {totalCompleted} / {totalItems} ítems
                </span>
              </div>
              <span className="font-mono font-bold text-elden-gold">{globalPct}%</span>
            </div>

            {/* Mini barra dorada */}
            <div className="w-full h-1.5 bg-elden-950 rounded-full border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-elden-gold to-amber-300 rounded-full transition-all duration-300"
                style={{ width: `${globalPct}%` }}
              />
            </div>

            {/* Píldoras rápidas para Juego Base y DLC en móvil */}
            <div className="flex items-center justify-between gap-1.5 pt-0.5 text-[11px] font-mono">
              <button
                onClick={() => onExpansionFilterChange('base')}
                className={`flex-1 py-1 px-1.5 rounded-lg border text-center transition flex items-center justify-center gap-1 ${
                  expansionFilter === 'base'
                    ? 'bg-amber-950/60 border-amber-500/70 text-amber-300 font-bold'
                    : 'bg-elden-950/80 border-slate-800/80 text-slate-400'
                }`}
              >
                <Sword className="w-2.5 h-2.5 text-slate-400" />
                <span>Base: {baseCompleted}/{baseTotal}</span>
              </button>

              <button
                onClick={() => onExpansionFilterChange('dlc')}
                className={`flex-1 py-1 px-1.5 rounded-lg border text-center transition flex items-center justify-center gap-1 ${
                  expansionFilter === 'dlc'
                    ? 'bg-purple-950/80 border-purple-500 text-purple-200 font-bold'
                    : 'bg-elden-950/80 border-purple-900/40 text-purple-300'
                }`}
              >
                <TreePine className="w-2.5 h-2.5 text-amber-400" />
                <span>DLC: {dlcCompleted}/{dlcTotal}</span>
              </button>

              <button
                onClick={() => setShowDetailedStats(!showDetailedStats)}
                className="p-1 rounded-lg bg-elden-950 text-slate-500 hover:text-slate-300 border border-slate-800"
                title="Expandir detalles"
              >
                {showDetailedStats ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Vista de Tarjetas de Progreso en Escritorio O si se expande en móvil */}
          <div className={`${showDetailedStats ? 'grid' : 'hidden md:grid'} grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3`}>
            {/* Total General */}
            <div className="bg-elden-900/80 border border-slate-800 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-serif text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-elden-gold" /> Progreso Total
                </span>
                <span className="font-mono font-bold text-elden-gold">{globalPct}%</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-slate-200 mb-1.5">
                {totalCompleted} / {totalItems} ítems
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-elden-950 rounded-full border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${globalPct}%` }}
                />
              </div>
            </div>

            {/* Juego Base */}
            <div
              onClick={() => onExpansionFilterChange('base')}
              className={`border rounded-xl p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer transition-all ${
                expansionFilter === 'base'
                  ? 'bg-elden-850 border-amber-500/70 shadow-gold-glow'
                  : 'bg-elden-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-serif text-slate-300 flex items-center gap-1">
                  <Sword className="w-3.5 h-3.5 text-slate-400" /> Juego Base
                </span>
                <span className="font-mono font-bold text-amber-200">{basePct}%</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-slate-200 mb-1.5">
                {baseCompleted} / {baseTotal} ítems
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-elden-950 rounded-full border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-500 to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${basePct}%` }}
                />
              </div>
            </div>

            {/* DLC Shadow of the Erdtree */}
            <div
              onClick={() => onExpansionFilterChange('dlc')}
              className={`border rounded-xl p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer transition-all ${
                expansionFilter === 'dlc'
                  ? 'bg-purple-950/50 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'bg-gradient-to-br from-purple-950/20 to-elden-900/80 border-purple-900/40 hover:border-purple-600/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-serif text-purple-200 font-semibold flex items-center gap-1 truncate">
                  <TreePine className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>DLC Shadow of the Erdtree</span>
                </span>
                <span className="font-mono font-bold text-purple-300">{dlcPct}%</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-purple-100 mb-1.5">
                {dlcCompleted} / {dlcTotal} ítems
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-elden-950 rounded-full border border-purple-900/50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${dlcPct}%` }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Barra Ultra-Compacta cuando está colapsado */
        <div className="flex items-center justify-between gap-1.5 py-0.5 overflow-x-auto no-scrollbar">
          {/* Lado izquierdo: Botón Expandir + Progreso + Expansión (Todos/Base/DLC) */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onToggleCollapse && (
              <button
                id="header-expand-toggle-btn"
                onClick={onToggleCollapse}
                className="px-2.5 py-1.5 rounded-xl bg-elden-900 hover:bg-elden-850 text-elden-gold border border-elden-gold/50 hover:border-elden-gold transition flex items-center gap-1 text-xs font-serif font-bold shadow-gold-glow flex-shrink-0"
                title="Expandir cabecera para ver progreso detallado"
              >
                <ChevronsDown className="w-3.5 h-3.5" />
                <span className="text-[11px]">Expandir</span>
              </button>
            )}

            {/* Badge de Progreso */}
            <div
              className="flex items-center gap-1 bg-elden-900 border border-slate-800 rounded-xl px-2 py-1 text-xs font-mono flex-shrink-0"
              title={`Progreso global: ${totalCompleted} de ${totalItems} (${globalPct}%)`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-elden-gold flex-shrink-0" />
              <span className="font-bold text-amber-200">{totalCompleted}/{totalItems}</span>
              <span className="text-slate-500 text-[10px]">({globalPct}%)</span>
            </div>

            {/* Selector de expansión compacto */}
            <div className="flex items-center bg-elden-900 p-0.5 rounded-xl border border-slate-800 text-[11px] font-mono flex-shrink-0">
              <button
                id="mini-expansion-all-btn"
                onClick={() => onExpansionFilterChange('all')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  expansionFilter === 'all'
                    ? 'bg-elden-gold text-elden-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todos
              </button>
              <button
                id="mini-expansion-base-btn"
                onClick={() => onExpansionFilterChange('base')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  expansionFilter === 'base'
                    ? 'bg-amber-400 text-elden-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Base
              </button>
              <button
                id="mini-expansion-dlc-btn"
                onClick={() => onExpansionFilterChange('dlc')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  expansionFilter === 'dlc'
                    ? 'bg-purple-600 text-white font-bold shadow-sm'
                    : 'text-purple-300 hover:text-purple-100'
                }`}
              >
                DLC
              </button>
            </div>
          </div>

          {/* Lado derecho: Selector de Ordenamiento + Herramientas */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
            {/* Selector de Orden Avanzado (Ahora también disponible en modo compacto) */}
            <div className="flex items-center p-0.5 bg-elden-900 rounded-xl border border-slate-800 flex-shrink-0">
              <div className="relative flex items-center">
                <select
                  id="sort-order-select-collapsed"
                  value={sortOrder}
                  onChange={(e) => onSortOrderChange && onSortOrderChange(e.target.value)}
                  className="appearance-none bg-elden-850 hover:bg-elden-800 text-elden-gold border border-slate-700/80 rounded-lg pl-2 pr-6 py-1 text-xs font-serif font-bold transition focus:outline-none focus:border-elden-gold cursor-pointer shadow-sm"
                  title="Cambiar orden de la lista"
                >
                  <option value="game">🎮 Por Tipo</option>
                  <option value="atk_desc">⚔️ Ataque</option>
                  <option value="weight_asc">⚖️ Ligero</option>
                  <option value="weight_desc">⚖️ Pesado</option>
                  <option value="alpha">🔤 A-Z</option>
                </select>
                <ChevronDown className="w-3 h-3 text-elden-gold pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Marcado Rápido */}
            <button
              onClick={onToggleQuickMark}
              className={`p-1.5 sm:px-2 sm:py-1 rounded-xl border text-xs font-serif font-bold transition flex items-center gap-1 ${
                quickMark
                  ? 'bg-amber-400 text-elden-950 border-amber-300 shadow-gold-glow'
                  : 'bg-elden-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Modo Marcado Rápido: un toque en la fila marca o desmarca"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Rápido</span>
            </button>

            {isArmorCategory && (
              <button
                onClick={onToggleAgruparSets}
                className={`p-1.5 sm:px-2 sm:py-1 rounded-xl border text-xs font-serif font-bold transition flex items-center gap-1 ${
                  agruparSets
                    ? 'bg-elden-gold text-elden-950 border-elden-gold shadow-gold-glow'
                    : 'bg-elden-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
                title="Agrupar piezas por conjunto de armadura"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Sets</span>
              </button>
            )}

            {/* Vista Grid/List */}
            <button
              onClick={() => onDisplayModeChange(displayMode === 'grid' ? 'list' : 'grid')}
              className="p-1.5 rounded-xl bg-elden-900 text-slate-400 hover:text-elden-gold border border-slate-800 transition"
              title={displayMode === 'grid' ? 'Cambiar a lista compacta' : 'Cambiar a cuadrícula'}
            >
              {displayMode === 'grid' ? <List className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
            </button>

            {/* Mapa */}
            <button
              id="switch-view-button-mini"
              onClick={() => onSwitchViewMode(viewMode === 'checklist' ? 'map' : 'checklist')}
              className="p-1.5 rounded-xl bg-elden-900 text-slate-400 hover:text-elden-gold border border-slate-800 transition"
              title="Alternar al mapa"
            >
              <Map className="w-3.5 h-3.5 text-elden-gold" />
            </button>

            {/* Ajustes */}
            <button
              id="open-settings-button-mini"
              onClick={onOpenSettings}
              className="p-1.5 rounded-xl bg-elden-900 text-slate-400 hover:text-elden-gold border border-slate-800 transition"
              title="Ajustes y copia de seguridad"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Selector de Expansión en Móvil/Escritorio (Segmented control) - Solo en modo expandido */}
      {!isCollapsed && (
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center w-full sm:w-auto p-1 bg-elden-900 rounded-xl border border-slate-800 text-xs font-serif font-bold">
            <button
              id="expansion-all-btn"
              onClick={() => onExpansionFilterChange('all')}
              className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1 text-[11px] sm:text-xs ${
                expansionFilter === 'all'
                  ? 'bg-elden-gold text-elden-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Todos</span>
              <span className="opacity-70 text-[10px] hidden sm:inline">({totalItems})</span>
            </button>

            <button
              id="expansion-base-btn"
              onClick={() => onExpansionFilterChange('base')}
              className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1 text-[11px] sm:text-xs ${
                expansionFilter === 'base'
                  ? 'bg-amber-400 text-elden-950 font-bold shadow-gold-glow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sword className="w-3 h-3" />
              <span>Base</span>
              <span className="opacity-70 text-[10px] hidden sm:inline">({baseTotal})</span>
            </button>

            <button
              id="expansion-dlc-btn"
              onClick={() => onExpansionFilterChange('dlc')}
              className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1 text-[11px] sm:text-xs ${
                expansionFilter === 'dlc'
                  ? 'bg-gradient-to-r from-purple-700 to-amber-500 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-purple-300 hover:text-purple-100'
              }`}
            >
              <TreePine className="w-3 h-3 text-amber-400" />
              <span>DLC Erdtree</span>
              <span className="opacity-70 text-[10px] hidden sm:inline">({dlcTotal})</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 ml-auto flex-wrap">
            {/* Marcado Rápido */}
            <button
              onClick={onToggleQuickMark}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-serif font-bold transition flex items-center gap-1 ${
                quickMark
                  ? 'bg-amber-400 text-elden-950 border-amber-300 shadow-gold-glow'
                  : 'bg-elden-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Modo Marcado Rápido: un toque en la fila marca o desmarca de inmediato sin abrir la guía"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Marcar</span> <span>Rápido</span>
            </button>

            {/* Agrupar Sets */}
            {isArmorCategory && (
              <button
                onClick={onToggleAgruparSets}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-serif font-bold transition flex items-center gap-1 ${
                  agruparSets
                    ? 'bg-elden-gold text-elden-950 border-elden-gold shadow-gold-glow'
                    : 'bg-elden-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
                title="Agrupar piezas por conjunto de armadura con botón de marcar set completo"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Sets</span>
              </button>
            )}

            {/* Selector de Orden Avanzado */}
            <div className="flex items-center gap-1 p-1 bg-elden-900 rounded-xl border border-slate-800">
              <div className="relative flex items-center">
                <select
                  id="sort-order-select"
                  value={sortOrder}
                  onChange={(e) => onSortOrderChange && onSortOrderChange(e.target.value)}
                  className="appearance-none bg-elden-850 hover:bg-elden-800 text-elden-gold border border-slate-700/80 rounded-lg pl-2.5 pr-7 py-1 text-xs font-serif font-bold transition focus:outline-none focus:border-elden-gold focus:ring-1 focus:ring-elden-gold/50 cursor-pointer shadow-sm"
                  title="Cambiar orden de la lista"
                >
                  <option value="game">🎮 Por Tipo (Juego)</option>
                  <option value="atk_desc">⚔️ Mayor Ataque</option>
                  <option value="weight_asc">⚖️ Menor Peso (Ligero)</option>
                  <option value="weight_desc">⚖️ Mayor Peso (Pesado)</option>
                  <option value="alpha">🔤 Alfabético (A-Z)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-elden-gold pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Selector de Modo de Vista: Tarjetas vs Lista */}
            <div className="flex items-center gap-1 p-1 bg-elden-900 rounded-xl border border-slate-800">
              <button
                id="view-grid-btn"
                onClick={() => onDisplayModeChange('grid')}
                className={`p-1.5 rounded-lg transition ${
                  displayMode === 'grid'
                    ? 'bg-elden-800 text-elden-gold border border-slate-700'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Vista de cuadrícula con fotos"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="view-list-btn"
                onClick={() => onDisplayModeChange('list')}
                className={`p-1.5 rounded-lg transition ${
                  displayMode === 'list'
                    ? 'bg-elden-800 text-elden-gold border border-slate-700'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Vista de lista compacta para móvil"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Buscador y Filtros de Estado */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
        {/* Buscador de ancho completo en móvil */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="checklist-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar ítem o jefe..."
            className="w-full bg-elden-900 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elden-gold focus:ring-1 focus:ring-elden-gold transition"
          />
          {searchQuery && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onSearchChange('');
                const input = document.getElementById('checklist-search-input');
                if (input) input.focus({ preventScroll: true });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 p-1"
              title="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros de estado y acciones masivas */}
        <div className="flex items-center justify-between sm:justify-start gap-1.5 flex-wrap">
          <div className="flex bg-elden-900 p-0.5 sm:p-1 rounded-xl border border-slate-800 text-[10px] sm:text-xs font-serif font-bold">
            <button
              id="filter-all-btn"
              type="button"
              onClick={() => onStatusFilterChange('all')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1 ${
                statusFilter === 'all'
                  ? 'bg-elden-gold text-elden-950 shadow-gold-glow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Todos</span>
              {activeTotalCount !== undefined && (
                <span className="text-[10px] opacity-75 font-mono">({activeTotalCount})</span>
              )}
            </button>

            <button
              id="filter-pending-btn"
              type="button"
              onClick={() => onStatusFilterChange('pending')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1 ${
                statusFilter === 'pending'
                  ? 'bg-amber-400 text-elden-950 shadow-gold-glow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Pendientes</span>
              {activePendingCount !== undefined && (
                <span className="text-[10px] opacity-75 font-mono">({activePendingCount})</span>
              )}
            </button>

            <button
              id="filter-completed-btn"
              type="button"
              onClick={() => onStatusFilterChange('completed')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                statusFilter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] font-bold'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
              title="Mostrar únicamente los ítems conseguidos (los que ya tienes)"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Ya los tengo</span>
              {activeCompletedCount !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1 rounded font-bold ${
                    statusFilter === 'completed'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {activeCompletedCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="check-all-visible-btn"
              type="button"
              onClick={onCheckAllVisible}
              className="p-1.5 sm:p-2 rounded-xl bg-elden-900 hover:bg-elden-850 text-slate-400 hover:text-emerald-400 border border-slate-800 transition"
              title={`Marcar todos los visibles (${visibleCount})`}
            >
              <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              id="uncheck-all-visible-btn"
              type="button"
              onClick={onUncheckAllVisible}
              className="p-1.5 sm:p-2 rounded-xl bg-elden-900 hover:bg-elden-850 text-slate-400 hover:text-amber-400 border border-slate-800 transition"
              title={`Desmarcar todos los visibles (${visibleCount})`}
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
