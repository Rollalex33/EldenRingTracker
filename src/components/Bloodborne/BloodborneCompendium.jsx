import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sword,
  Crosshair,
  Sparkles,
  Eye,
  Skull,
  Flame,
  Shield,
  ShieldAlert,
  Award,
  Users,
  Package,
  Hammer,
  Key,
  Gem,
  Flag,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  RotateCcw,
  Compass,
  Info,
  ExternalLink,
  ChevronRight,
  Layers,
  MapPin,
  Zap,
  LayoutGrid,
  List,
  CheckCheck,
  ChevronUp,
  X,
  ArrowDownAZ,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';
import { BloodborneItemDetailModal } from './BloodborneItemDetailModal';
import { normalizeStr } from '../../utils/gameOrder';

const CATEGORY_ICONS = {
  all: Layers,
  armas_truco: Sword,
  armas_fuego: Crosshair,
  atuendos: Shield,
  escudos: ShieldAlert,
  herramientas: Sparkles,
  runas_caryll: Eye,
  juramentos: Flag,
  jefazos: Skull,
  personajes: Users,
  objetos: Package,
  materiales: Hammer,
  llaves: Key,
  calices: Flame,
  gemas: Gem,
  cordones: Award,
};

export function BloodborneCompendium({
  onOpenRoute,
  onOpenBuilds,
  onOpenEchoes,
  onOpenChalice,
  onOpenQuests,
  onSwitchGame,
}) {
  const {
    itemsCompletados_bb,
    toggleCompletadoBB,
    marcarGrupoItemsBB,
    setViewMode,
  } = useTrackerStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expansionFilter, setExpansionFilter] = useState('all'); // 'all' | 'base' | 'dlc'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' | 'list'
  const [sortOrder, setSortOrder] = useState('default'); // 'default' | 'alpha' | 'alpha-desc' | 'pending-first'
  const [quickMark, setQuickMark] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(80);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [undoToast, setUndoToast] = useState(null);

  const mainScrollRef = useRef(null);
  const undoTimerRef = useRef(null);

  const totalCatalog = bloodborneCatalog.items.length;
  const completedCount = bloodborneCatalog.items.filter((i) => itemsCompletados_bb.has(i.id)).length;
  const progressPct = ((completedCount / (totalCatalog || 1)) * 100).toFixed(1);

  // Estadísticas globales de Juego Base vs DLC
  const { baseTotal, baseCompleted, dlcTotal, dlcCompleted } = useMemo(() => {
    let bTot = 0, bComp = 0, dTot = 0, dComp = 0;
    bloodborneCatalog.items.forEach((item) => {
      const done = itemsCompletados_bb.has(item.id);
      if (item.isDlc || item.expansion === 'dlc') {
        dTot++;
        if (done) dComp++;
      } else {
        bTot++;
        if (done) bComp++;
      }
    });
    return { baseTotal: bTot, baseCompleted: bComp, dlcTotal: dTot, dlcCompleted: dComp };
  }, [itemsCompletados_bb]);

  const basePct = baseTotal > 0 ? ((baseCompleted / baseTotal) * 100).toFixed(1) : '0';
  const dlcPct = dlcTotal > 0 ? ((dlcCompleted / dlcTotal) * 100).toFixed(1) : '0';

  // Subcategorías disponibles en la categoría activa
  const availableSubcategories = useMemo(() => {
    if (activeCategory === 'all') return [];
    const subs = new Set();
    bloodborneCatalog.items
      .filter((i) => i.category === activeCategory)
      .forEach((i) => {
        if (i.subcategory) subs.add(i.subcategory);
      });
    return Array.from(subs);
  }, [activeCategory]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveSubcategory('all');
  };

  // Toast con opción Deshacer
  const triggerUndoToast = (msg, undoFn) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoToast({ message: msg, undo: undoFn });
    undoTimerRef.current = setTimeout(() => {
      setUndoToast(null);
    }, 4500);
  };

  const handleToggleWithUndo = (itemId) => {
    const wasDone = itemsCompletados_bb.has(itemId);
    toggleCompletadoBB(itemId);
    const itemObj = bloodborneCatalog.items.find((i) => i.id === itemId);
    const name = itemObj ? itemObj.name : 'Ítem';
    triggerUndoToast(
      wasDone ? `Pendiente: ${name}` : `Conseguido: ${name}`,
      () => toggleCompletadoBB(itemId)
    );
  };

  // Filtrado y búsqueda normalizada
  const contextItems = useMemo(() => {
    const q = normalizeStr(searchQuery);

    return bloodborneCatalog.items.filter((item) => {
      // Filtro de categoría
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      // Filtro de subcategoría
      if (activeCategory !== 'all' && activeSubcategory !== 'all' && item.subcategory !== activeSubcategory) {
        return false;
      }

      // Filtro de expansión
      if (expansionFilter === 'base' && (item.isDlc || item.expansion === 'dlc')) return false;
      if (expansionFilter === 'dlc' && !(item.isDlc || item.expansion === 'dlc')) return false;

      // Filtro de búsqueda multidimensional insensible a acentos
      if (q) {
        const matchName = normalizeStr(item.name).includes(q);
        const matchDesc = normalizeStr(item.description || '').includes(q);
        const matchLoc = normalizeStr(item.location || '').includes(q);
        const matchSub = normalizeStr(item.subcategory || '').includes(q);
        const matchStats = normalizeStr(item.stats || '').includes(q);
        if (!matchName && !matchDesc && !matchLoc && !matchSub && !matchStats) return false;
      }

      return true;
    });
  }, [activeCategory, activeSubcategory, expansionFilter, searchQuery]);

  // Contadores reactivos para los botones de estado
  const contextTotal = contextItems.length;
  const contextCompleted = contextItems.filter((i) => itemsCompletados_bb.has(i.id)).length;
  const contextPending = contextTotal - contextCompleted;

  // Filtrado final de estado y ordenación
  const filteredItems = useMemo(() => {
    const filtered = contextItems.filter((item) => {
      const isDone = itemsCompletados_bb.has(item.id);
      if (statusFilter === 'pending' && isDone) return false;
      if (statusFilter === 'completed' && !isDone) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'alpha') {
        return a.name.localeCompare(b.name, 'es');
      }
      if (sortOrder === 'alpha-desc') {
        return b.name.localeCompare(a.name, 'es');
      }
      if (sortOrder === 'pending-first') {
        const aDone = itemsCompletados_bb.has(a.id) ? 1 : 0;
        const bDone = itemsCompletados_bb.has(b.id) ? 1 : 0;
        if (aDone !== bDone) return aDone - bDone;
        return a.name.localeCompare(b.name, 'es');
      }
      return 0; // default order
    });
  }, [contextItems, statusFilter, sortOrder, itemsCompletados_bb]);

  // Reset de paginación al cambiar filtros
  useEffect(() => {
    setDisplayLimit(80);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeCategory, activeSubcategory, expansionFilter, statusFilter, searchQuery, sortOrder]);

  // Acciones en lote
  const handleCheckAllVisible = () => {
    const visibleIds = filteredItems.map((i) => i.id);
    marcarGrupoItemsBB(visibleIds, true);
    triggerUndoToast(`Marcados ${visibleIds.length} ítems`, () => {
      marcarGrupoItemsBB(visibleIds, false);
    });
  };

  const handleUncheckAllVisible = () => {
    const visibleIds = filteredItems.map((i) => i.id);
    marcarGrupoItemsBB(visibleIds, false);
    triggerUndoToast(`Desmarcados ${visibleIds.length} ítems`, () => {
      marcarGrupoItemsBB(visibleIds, true);
    });
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 600 && displayLimit < filteredItems.length) {
      setDisplayLimit((prev) => Math.min(prev + 60, filteredItems.length));
    }
    setShowScrollTop(scrollTop > 400);
  };

  const scrollToTop = () => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const visibleItems = filteredItems.slice(0, displayLimit);

  return (
    <div className="h-full w-full bg-[#060508] text-slate-100 flex flex-col overflow-hidden font-sans select-none">
      {/* 1. Header Superior Gótico con Barra de Progreso y Estadísticas */}
      <header className="px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#14080e] to-[#070508] flex flex-col gap-2.5 flex-shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setViewMode('hub')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:scale-105 active:scale-95 transition flex-shrink-0"
              title="Volver al Sueño del Cazador (Hub)"
            >
              <Compass className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 border border-rose-500/60 text-rose-300 font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                  <Sparkles className="w-2.5 h-2.5 text-rose-400 animate-pulse" />
                  <span>COMPENDIO 100% CAZADOR</span>
                </span>
                <button
                  type="button"
                  onClick={onOpenRoute}
                  className="text-[10px] sm:text-[11px] font-serif px-2.5 py-0.5 rounded-full bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/50 hover:border-rose-400 transition flex items-center gap-1 active:scale-95 shadow-sm"
                  title="Abrir Ruta Óptima de Zonas y Objetos +10"
                >
                  <Compass className="w-3 h-3 text-rose-400" />
                  <span>Ruta de Zonas</span>
                </button>
                <a
                  href="https://www.eliteguias.com/guias/b/bb/bloodborne.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-serif px-2 py-0.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-rose-300 border border-stone-800 hover:border-rose-500/40 transition flex items-center gap-1"
                >
                  <span>EliteGuías</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-xs text-stone-400 font-sans mt-0.5 hidden sm:block truncate">
                {completedCount} de {totalCatalog} reliquias y cacerías obtenidas ({progressPct}%)
              </p>
            </div>
          </div>

          {/* Switcher a Elden Ring */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onSwitchGame}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-serif text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
              title="Cambiar a Elden Ring"
            >
              <span>Ir a Elden Ring ✦</span>
            </button>
          </div>
        </div>

        {/* Barra de Progreso Global con desglose Base vs DLC */}
        <div className="space-y-1.5 bg-black/40 border border-rose-950/60 rounded-xl p-2 sm:px-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span className="flex items-center gap-2">
              <span className="text-rose-300 font-bold">Progreso Total:</span>
              <span className="text-stone-200">{completedCount}/{totalCatalog} ({progressPct}%)</span>
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-stone-400">
                Base: <strong className="text-rose-300">{baseCompleted}/{baseTotal}</strong> ({basePct}%)
              </span>
              <span>•</span>
              <span className="text-stone-400">
                DLC: <strong className="text-amber-300">{dlcCompleted}/{dlcTotal}</strong> ({dlcPct}%)
              </span>
            </div>
          </div>
          <div className="w-full h-1.5 sm:h-2 bg-stone-900 rounded-full overflow-hidden flex border border-stone-800">
            <div
              className="h-full bg-gradient-to-r from-rose-800 via-rose-600 to-rose-500 transition-all duration-500 shadow-[0_0_8px_rgba(225,29,72,0.6)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </header>

      {/* 2. Barra de Categorías con Scroll Horizontal */}
      <div className="bg-[#09080c] border-b border-rose-950/60 px-3 sm:px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {/* Pestaña: Todas las Categorías */}
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-3 py-1.5 rounded-xl font-serif text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border flex-shrink-0 active:scale-95 ${activeCategory === 'all'
              ? 'bg-rose-600 text-stone-950 border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.5)]'
              : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-rose-500/40'
            }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Todas ({totalCatalog})</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${activeCategory === 'all' ? 'bg-black/30 text-stone-950 font-bold' : 'bg-black/40 text-stone-400'
              }`}
          >
            {completedCount}
          </span>
        </button>

        {bloodborneCatalog.categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || Sword;
          const isSelected = activeCategory === cat.id;
          const catTotal = bloodborneCatalog.items.filter((i) => i.category === cat.id).length;
          const catDone = bloodborneCatalog.items.filter((i) => i.category === cat.id && itemsCompletados_bb.has(i.id)).length;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-serif text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border flex-shrink-0 active:scale-95 ${isSelected
                  ? 'bg-rose-600 text-stone-950 border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-rose-500/40'
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-stone-950 font-bold' : 'bg-black/40 text-stone-400'
                  }`}
              >
                {catDone}/{catTotal}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2b. Barra de Subcategorías (si la categoría activa tiene más de 1) */}
      {availableSubcategories.length > 1 && (
        <div className="bg-black/40 border-b border-stone-900 px-3 sm:px-6 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 text-xs">
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Filtrar:
          </span>
          <button
            onClick={() => setActiveSubcategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-serif transition whitespace-nowrap border ${activeSubcategory === 'all'
                ? 'bg-rose-950/80 border-rose-500/60 text-rose-200 font-bold'
                : 'bg-transparent border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
          >
            Todas ({bloodborneCatalog.items.filter((i) => i.category === activeCategory).length})
          </button>
          {availableSubcategories.map((sub) => {
            const count = bloodborneCatalog.items.filter(
              (i) => i.category === activeCategory && i.subcategory === sub
            ).length;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-2.5 py-1 rounded-lg text-xs font-serif transition whitespace-nowrap border ${activeSubcategory === sub
                    ? 'bg-rose-950/80 border-rose-500/60 text-rose-200 font-bold'
                    : 'bg-transparent border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
              >
                {sub} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Barra de Controles, Búsqueda, Filtros y Acciones en Lote */}
      <div className="bg-black/50 border-b border-stone-800/80 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 flex-shrink-0">
        {/* Buscador inteligente */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar arma, atuendo, jefe, ubicación, stats o lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d090f] border border-stone-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-rose-200 placeholder-stone-500 focus:outline-none focus:border-rose-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filtros de Expansión, Estado, Orden y Vista */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Expansión: Todo / Base / DLC */}
          <div className="flex rounded-xl bg-[#0d090f] border border-stone-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setExpansionFilter('all')}
              className={`px-2 py-1 rounded-lg transition ${expansionFilter === 'all'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              Todo
            </button>
            <button
              onClick={() => setExpansionFilter('base')}
              className={`px-2 py-1 rounded-lg transition ${expansionFilter === 'base'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              Base
            </button>
            <button
              onClick={() => setExpansionFilter('dlc')}
              className={`px-2 py-1 rounded-lg transition ${expansionFilter === 'dlc'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              DLC
            </button>
          </div>

          {/* Estado: Todos / Pendientes / Conseguidos con contadores */}
          <div className="flex rounded-xl bg-[#0d090f] border border-stone-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-1 rounded-lg transition ${statusFilter === 'all'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              Todos ({contextTotal})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2 py-1 rounded-lg transition ${statusFilter === 'pending'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              Pendientes ({contextPending})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2 py-1 rounded-lg transition ${statusFilter === 'completed'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              Hechos ({contextCompleted})
            </button>
          </div>

          {/* Ordenación */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-[#0d090f] border border-stone-800 rounded-xl px-2.5 py-1 text-xs text-stone-300 font-serif focus:outline-none focus:border-rose-500"
          >
            <option value="default">Orden Guía</option>
            <option value="alpha">A - Z</option>
            <option value="alpha-desc">Z - A</option>
            <option value="pending-first">Pendientes primero</option>
          </select>

          {/* Alternador de Modo de Vista: Grid vs List */}
          <div className="flex rounded-xl bg-[#0d090f] border border-stone-800 p-0.5 text-stone-400">
            <button
              onClick={() => setDisplayMode('grid')}
              className={`p-1 rounded-lg transition ${displayMode === 'grid' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' : 'hover:text-stone-200'
                }`}
              title="Vista en Cuadrícula"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDisplayMode('list')}
              className={`p-1 rounded-lg transition ${displayMode === 'list' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' : 'hover:text-stone-200'
                }`}
              title="Vista Compacta en Lista"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle de Modo Marcar Rápido */}
          <button
            onClick={() => setQuickMark(!quickMark)}
            className={`px-2 py-1 rounded-xl border text-xs font-serif transition flex items-center gap-1.5 ${quickMark
                ? 'bg-rose-950 border-rose-500 text-rose-200 font-bold shadow-[0_0_8px_rgba(225,29,72,0.3)]'
                : 'bg-[#0d090f] border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            title={quickMark ? 'Modo rápido activado (tocar tarjeta marca ítem)' : 'Modo normal (tocar tarjeta abre ficha)'}
          >
            <Zap className={`w-3 h-3 ${quickMark ? 'text-rose-400 fill-rose-400' : 'text-stone-500'}`} />
            <span className="hidden sm:inline">Rápido</span>
          </button>

          {/* Acciones en lote */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleCheckAllVisible}
              className="p-1.5 rounded-xl bg-[#0d090f] hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-emerald-400 transition"
              title="Marcar todos los ítems visibles como conseguidos"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleUncheckAllVisible}
              className="p-1.5 rounded-xl bg-[#0d090f] hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-rose-400 transition"
              title="Desmarcar todos los ítems visibles"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Lista Principal de Ítems */}
      <main
        ref={mainScrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 custom-scrollbar space-y-2.5 relative"
      >
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-serif text-sm">
            <Package className="w-10 h-10 mx-auto text-stone-700 mb-2" />
            No se encontraron ítems con los filtros y búsqueda seleccionados.
          </div>
        ) : displayMode === 'grid' ? (
          /* MODO GRID (CUADRÍCULA) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleItems.map((item) => {
              const isDone = itemsCompletados_bb.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (quickMark) {
                      handleToggleWithUndo(item.id);
                    } else {
                      setSelectedItemForModal(item);
                    }
                  }}
                  className={`group relative p-3 sm:p-3.5 rounded-2xl border transition duration-200 cursor-pointer select-none flex flex-col justify-between hover:scale-[1.01] active:scale-[0.99] shadow-sm ${isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-[#0d090f] border-stone-800/80 hover:border-rose-500/50 hover:bg-[#130a11] text-stone-300'
                    }`}
                >
                  <div>
                    {/* Fila superior: Checkbox + Thumbnail + Nombre + DLC badge */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        {/* Checkbox botón independiente */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWithUndo(item.id);
                          }}
                          className="mt-0.5 p-1 -m-1 rounded-lg hover:bg-stone-800/80 transition flex-shrink-0"
                          title={isDone ? 'Marcar como pendiente' : 'Marcar como conseguido'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-scaleUp" />
                          ) : (
                            <Circle className="w-5 h-5 text-stone-600 hover:text-rose-400 transition" />
                          )}
                        </button>

                        {/* Thumbnail miniatura del ítem */}
                        {item.image && (
                          <div className="w-11 h-11 rounded-xl bg-black/60 border border-stone-800 p-0.5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-contain rounded-lg"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3
                            className={`font-serif font-bold text-sm tracking-wide truncate ${isDone ? 'line-through text-stone-400' : 'text-stone-100 group-hover:text-rose-200'
                              }`}
                          >
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            <span className="text-[10px] font-mono text-stone-400">
                              {item.subcategory || item.category}
                            </span>
                            {item.requirements && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">
                                {Object.entries(item.requirements)
                                  .map(([k, v]) => `${k.toUpperCase()} ${v}`)
                                  .join(' ')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.expansion === 'dlc' || item.isDlc ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 flex-shrink-0 font-bold">
                          DLC
                        </span>
                      ) : null}
                    </div>

                    {/* Descripción o Lore breve */}
                    {item.description && (
                      <p className="text-xs text-stone-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Stats resumidos */}
                    {item.stats && (
                      <div className="mt-2 text-[10px] font-mono text-stone-400 bg-black/40 px-2 py-1 rounded-lg border border-stone-900 truncate">
                        {item.stats}
                      </div>
                    )}
                  </div>

                  {/* Fila inferior con Ubicación y Hint de Ficha */}
                  <div className="pt-2 border-t border-stone-800/60 mt-2.5 flex items-center justify-between text-[11px] font-mono text-stone-400 gap-2">
                    <span className="truncate max-w-[200px] text-stone-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400/80 flex-shrink-0" />
                      <span className="truncate">{item.location || 'Consultar guía'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemForModal(item);
                      }}
                      className="text-rose-400/90 hover:text-rose-200 font-serif font-bold text-[11px] flex items-center gap-0.5 flex-shrink-0"
                    >
                      <span>Ver ficha</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* MODO LISTA COMPACTA (FILAS RÁPIDAS ~56px) */
          <div className="space-y-1.5">
            {visibleItems.map((item) => {
              const isDone = itemsCompletados_bb.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (quickMark) {
                      handleToggleWithUndo(item.id);
                    } else {
                      setSelectedItemForModal(item);
                    }
                  }}
                  className={`group relative rounded-xl border px-3 py-2 transition duration-150 cursor-pointer select-none flex items-center justify-between gap-3 ${isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-[#0d090f] border-stone-800/80 hover:border-rose-500/50 hover:bg-[#130a11] text-stone-300'
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Checkbox botón */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWithUndo(item.id);
                      }}
                      className="p-1 -m-1 rounded-lg hover:bg-stone-800/80 transition flex-shrink-0"
                      title={isDone ? 'Marcar como pendiente' : 'Marcar como conseguido'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-600 hover:text-rose-400 transition" />
                      )}
                    </button>

                    {/* Thumbnail miniatura */}
                    {item.image && (
                      <div className="w-9 h-9 rounded-lg bg-black/60 border border-stone-800 p-0.5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-contain rounded-md"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-serif font-bold text-xs sm:text-sm tracking-wide truncate ${isDone ? 'line-through text-stone-400' : 'text-stone-100 group-hover:text-rose-200'
                            }`}
                        >
                          {item.name}
                        </span>
                        {item.expansion === 'dlc' || item.isDlc ? (
                          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30 flex-shrink-0 font-bold">
                            DLC
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 truncate">
                        <span>{item.subcategory || item.category}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <span className="truncate text-stone-400">{item.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Requisitos y Botón de ficha */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.requirements && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30 hidden sm:inline-block">
                        {Object.entries(item.requirements)
                          .map(([k, v]) => `${k.toUpperCase()} ${v}`)
                          .join(' ')}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemForModal(item);
                      }}
                      className="px-2 py-1 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 text-stone-300 hover:text-rose-300 font-serif text-[11px] font-bold transition flex items-center gap-1"
                    >
                      <span>Ficha</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Indicador de más ítems al fondo */}
        {filteredItems.length > displayLimit && (
          <div className="text-center py-4">
            <button
              onClick={() => setDisplayLimit((prev) => Math.min(prev + 80, filteredItems.length))}
              className="px-4 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-300 font-serif text-xs transition"
            >
              Cargar más ({filteredItems.length - displayLimit} restantes)...
            </button>
          </div>
        )}
      </main>

      {/* Botón flotante Volver Arriba */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-14 right-5 z-40 w-9 h-9 rounded-full bg-rose-600 hover:bg-rose-500 text-stone-950 shadow-lg shadow-rose-950/50 flex items-center justify-center transition active:scale-90"
          title="Volver arriba"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Toast con opción Deshacer */}
      {undoToast && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 bg-[#160a12] border border-rose-500/80 text-stone-100 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <span className="text-xs font-serif text-rose-200">{undoToast.message}</span>
          <button
            onClick={() => {
              undoToast.undo();
              setUndoToast(null);
            }}
            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-stone-950 font-serif text-xs font-bold transition active:scale-95"
          >
            Deshacer
          </button>
        </div>
      )}

      {/* 5. Dock Inferior Específico de Bloodborne */}
      <footer className="px-4 py-2 border-t border-rose-950/80 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif flex-shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenRoute}
            className="hover:text-rose-300 transition text-rose-300 font-bold"
          >
            🗺️ Ruta & Mejoras +10
          </button>
          <span>•</span>
          <button
            onClick={onOpenQuests}
            className="hover:text-rose-300 transition"
          >
            🩸 Misiones de NPCs
          </button>
          <span>•</span>
          <button
            onClick={onOpenBuilds}
            className="hover:text-rose-300 transition"
          >
            ⚔️ Taller de Builds
          </button>
          <span>•</span>
          <button
            onClick={onOpenEchoes}
            className="hover:text-rose-300 transition"
          >
            🪙 Ecos de Sangre
          </button>
          <span>•</span>
          <button
            onClick={onOpenChalice}
            className="hover:text-rose-300 transition"
          >
            🕯️ Mazmorras Cáliz
          </button>
        </div>

        <div className="text-[11px] font-mono text-rose-400/80 hidden sm:block">
          {filteredItems.length} ítems en vista
        </div>
      </footer>

      {/* 6. Modal de Detalle Completo del Ítem (Estilo Byrgenwerth / EliteGuías) */}
      <BloodborneItemDetailModal
        item={selectedItemForModal}
        isOpen={Boolean(selectedItemForModal)}
        onClose={() => setSelectedItemForModal(null)}
        isDone={selectedItemForModal ? itemsCompletados_bb.has(selectedItemForModal.id) : false}
        onToggle={toggleCompletadoBB}
      />
    </div>
  );
}

export default BloodborneCompendium;
