import React, { useState, useMemo, useEffect, useRef } from 'react';
import checklistCatalog from '../../data/checklistCatalog.json';
import { useTrackerStore } from '../../store/useTrackerStore';
import { ChecklistHeader } from './ChecklistHeader';
import { CategoryNav } from './CategoryNav';
import { ItemCard } from './ItemCard';
import { ArmorSetCard } from './ArmorSetCard';
import { ItemDetailModal } from './ItemDetailModal';
import { CategoryIcon } from './CategoryIcon';
import {
  ExternalLink,
  Sparkles,
  AlertCircle,
  ArrowDown,
  TreePine,
  Sword,
  Zap,
  RotateCcw,
  ChevronUp,
} from 'lucide-react';
import SettingsModal from '../UI/SettingsModal';
import { EquipLoadModal } from '../Calculator/EquipLoadModal';
import { PlatinumModal } from '../Platinum/PlatinumModal';
import { AppHubMenu } from '../UI/AppHubMenu';
import { BuildPlannerModal } from '../Builds/BuildPlannerModal';
import { RuneCalculatorModal } from '../Calculator/RuneCalculatorModal';
import { ProgressionRouteModal } from '../Progression/ProgressionRouteModal';
import { FloatingQuickHUD } from '../Navigation/FloatingQuickHUD';
import { sortSubcategoriesByGame, sortItems, normalizeStr } from '../../utils/gameOrder';
import { getItemById } from '../../utils/itemLinker';
import { buildArmorUnits } from '../../utils/armorSets';
import { useAppBackHandler } from '../../hooks/useAppBackHandler';

export function ChecklistCompendium() {
  const {
    itemsCompletados,
    toggleCompletado,
    marcarGrupoItems,
    categoriaActivaChecklist,
    setCategoriaActivaChecklist,
    subcategoriaChecklist,
    setSubcategoriaChecklist,
    expansionFilterChecklist,
    setExpansionFilterChecklist,
    displayModeChecklist,
    setDisplayModeChecklist,
    busquedaChecklist,
    setBusquedaChecklist,
    filtroEstadoChecklist,
    setFiltroEstadoChecklist,
    sortOrderChecklist,
    setSortOrderChecklist,
    quickMarkChecklist,
    setQuickMarkChecklist,
    agruparSetsChecklist,
    setAgruparSetsChecklist,
    viewMode,
    setViewMode,
  } = useTrackerStore();

  const [activeItemForModal, setActiveItemForModal] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEquipLoadOpen, setIsEquipLoadOpen] = useState(false);
  const [isPlatinumOpen, setIsPlatinumOpen] = useState(false);
  const [isHubMenuOpen, setIsHubMenuOpen] = useState(false);
  const [isBuildPlannerOpen, setIsBuildPlannerOpen] = useState(false);
  const [isRuneCalcOpen, setIsRuneCalcOpen] = useState(false);
  const [isProgressionOpen, setIsProgressionOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(100);

  const handleHubNavigate = (target) => {
    setIsHubMenuOpen(false);
    switch (target) {
      case 'hub':
        setViewMode('hub');
        break;
      case 'checklist':
        setViewMode('checklist');
        break;
      case 'map':
        setViewMode('map');
        break;
      case 'builds':
        setIsBuildPlannerOpen(true);
        break;
      case 'runes':
        setIsRuneCalcOpen(true);
        break;
      case 'progression':
        setIsProgressionOpen(true);
        break;
      case 'equipload':
        setIsEquipLoadOpen(true);
        break;
      case 'platinum':
        setIsPlatinumOpen(true);
        break;
      case 'guide':
        setViewMode('map');
        break;
      case 'settings':
        setIsSettingsOpen(true);
        break;
      default:
        break;
    }
  };
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(() => {
    try {
      return localStorage.getItem('er_header_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleHeaderCollapse = () => {
    setIsHeaderCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('er_header_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [undoToast, setUndoToast] = useState(null);

  const sentinelRef = useRef(null);
  const mainScrollRef = useRef(null);
  const undoTimerRef = useRef(null);
  const lastScrollTopRef = useRef(0);

  const {
    openItemModal,
    closeItemModal,
    openSettings,
    closeSettings,
    toastMessage,
  } = useAppBackHandler({
    activeItemForModal,
    setActiveItemForModal,
    isSettingsOpen,
    setIsSettingsOpen,
  });

  // Sistema de notificación con opción "Deshacer"
  const triggerUndoToast = (msg, undoFn) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoToast({ message: msg, undo: undoFn });
    undoTimerRef.current = setTimeout(() => {
      setUndoToast(null);
    }, 4500);
  };

  const handleToggleWithUndo = (itemId) => {
    const wasDone = itemsCompletados.has(itemId);
    toggleCompletado(itemId);
    const itemObj = getItemById(itemId);
    const name = itemObj ? itemObj.name : 'Ítem';
    triggerUndoToast(
      wasDone ? `Pendiente: ${name}` : `Conseguido: ${name}`,
      () => toggleCompletado(itemId)
    );
  };

  const handleGroupToggleWithUndo = (itemIds, marcar, groupName) => {
    marcarGrupoItems(itemIds, marcar);
    triggerUndoToast(
      marcar ? `Set completado: ${groupName}` : `Set desmarcado: ${groupName}`,
      () => marcarGrupoItems(itemIds, !marcar)
    );
  };

  // Indexar ítems por categoría
  const itemsByCategory = useMemo(() => {
    const map = {};
    checklistCatalog.categories.forEach((cat) => {
      map[cat.id] = [];
    });
    checklistCatalog.items.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, []);

  // Estadísticas globales de Juego Base vs DLC
  const { baseTotal, baseCompleted, dlcTotal, dlcCompleted } = useMemo(() => {
    let bTot = 0, bComp = 0, dTot = 0, dComp = 0;
    checklistCatalog.items.forEach((item) => {
      const done = itemsCompletados.has(item.id);
      if (item.isDlc) {
        dTot++;
        if (done) dComp++;
      } else {
        bTot++;
        if (done) bComp++;
      }
    });
    return { baseTotal: bTot, baseCompleted: bComp, dlcTotal: dTot, dlcCompleted: dComp };
  }, [itemsCompletados]);

  const currentCategoryConfig = useMemo(() => {
    if (categoriaActivaChecklist === 'all') {
      return {
        id: 'all',
        name: 'Todas las Categorías',
        guideUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
      };
    }
    return (
      checklistCatalog.categories.find(
        (c) => c.id === categoriaActivaChecklist
      ) || checklistCatalog.categories[0]
    );
  }, [categoriaActivaChecklist]);

  // Ítems de la categoría activa respetando el filtro de Expansión
  const activeCategoryItems = useMemo(() => {
    const raw =
      categoriaActivaChecklist === 'all'
        ? checklistCatalog.items
        : itemsByCategory[categoriaActivaChecklist] || [];
    if (expansionFilterChecklist === 'base') return raw.filter((i) => !i.isDlc);
    if (expansionFilterChecklist === 'dlc') return raw.filter((i) => i.isDlc);
    return raw;
  }, [itemsByCategory, categoriaActivaChecklist, expansionFilterChecklist]);

  const catTotal = activeCategoryItems.length;
  const catCompleted = useMemo(() => {
    return activeCategoryItems.filter((i) => itemsCompletados.has(i.id)).length;
  }, [activeCategoryItems, itemsCompletados]);

  // Subcategorías disponibles en la selección activa ordenadas según el juego
  const subcategories = useMemo(() => {
    if (categoriaActivaChecklist === 'all') return [];
    const subs = new Set();
    activeCategoryItems.forEach((i) => {
      if (i.subcategory) subs.add(i.subcategory);
    });
    return sortSubcategoriesByGame(Array.from(subs), categoriaActivaChecklist);
  }, [activeCategoryItems, categoriaActivaChecklist]);

  // Sanear subcategoría si no existe o ya no es válida en la selección actual
  useEffect(() => {
    if (subcategoriaChecklist !== 'all') {
      if (subcategories.length === 0 || !subcategories.includes(subcategoriaChecklist)) {
        setSubcategoriaChecklist('all');
      }
    }
  }, [subcategories, subcategoriaChecklist, setSubcategoriaChecklist]);

  // Resetear paginación/límite al cambiar cualquier filtro
  useEffect(() => {
    setDisplayLimit(100);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [
    categoriaActivaChecklist,
    subcategoriaChecklist,
    expansionFilterChecklist,
    filtroEstadoChecklist,
    busquedaChecklist,
    sortOrderChecklist,
    agruparSetsChecklist,
  ]);

  // Ítems del contexto activo (respetando búsqueda con acentos ignorados y subcategoría)
  const contextItems = useMemo(() => {
    const rawQuery = busquedaChecklist.trim();
    const query = normalizeStr(rawQuery);

    return activeCategoryItems.filter((item) => {
      // 1. Filtro de búsqueda (insensible a mayúsculas y acentos)
      if (query) {
        const matchName = normalizeStr(item.name).includes(query);
        const matchSub = normalizeStr(item.subcategory || '').includes(query);
        if (!matchName && !matchSub) return false;
      }

      // 2. Filtro de subcategoría
      if (!query && subcategoriaChecklist !== 'all') {
        if (subcategories.includes(subcategoriaChecklist)) {
          if (item.subcategory !== subcategoriaChecklist) return false;
        }
      }

      return true;
    });
  }, [activeCategoryItems, busquedaChecklist, subcategoriaChecklist, subcategories]);

  // Estadísticas del contexto actual para los botones de estado
  const totalContextCount = contextItems.length;
  const completedContextCount = contextItems.filter((i) => itemsCompletados.has(i.id)).length;
  const pendingContextCount = totalContextCount - completedContextCount;

  // Filtrado final de ítems (estado Conseguido vs Pendiente) y ordenamiento canónico
  const filteredItems = useMemo(() => {
    const filtered = contextItems.filter((item) => {
      const isDone = itemsCompletados.has(item.id);
      if (filtroEstadoChecklist === 'pending' && isDone) return false;
      if (filtroEstadoChecklist === 'completed' && !isDone) return false;
      return true;
    });

    return sortItems(filtered, sortOrderChecklist, categoriaActivaChecklist);
  }, [
    contextItems,
    filtroEstadoChecklist,
    itemsCompletados,
    sortOrderChecklist,
    categoriaActivaChecklist,
  ]);

  // Agrupación de armaduras por Sets completos
  const isArmorCategory = categoriaActivaChecklist === 'armaduras';
  const shouldGroupArmorSets = isArmorCategory && agruparSetsChecklist;

  const displayUnits = useMemo(() => {
    if (!shouldGroupArmorSets) {
      return filteredItems;
    }
    return buildArmorUnits(filteredItems, activeCategoryItems, sortOrderChecklist);
  }, [shouldGroupArmorSets, filteredItems, activeCategoryItems, sortOrderChecklist]);

  // Acciones en lote
  const handleCheckAllVisible = () => {
    const visibleIds = filteredItems.map((i) => i.id);
    marcarGrupoItems(visibleIds, true);
    triggerUndoToast(`Marcados ${visibleIds.length} ítems`, () => {
      marcarGrupoItems(visibleIds, false);
    });
  };

  const handleUncheckAllVisible = () => {
    const visibleIds = filteredItems.map((i) => i.id);
    marcarGrupoItems(visibleIds, false);
    triggerUndoToast(`Desmarcados ${visibleIds.length} ítems`, () => {
      marcarGrupoItems(visibleIds, true);
    });
  };

  const visibleUnitsSlice = useMemo(() => {
    return displayUnits.slice(0, displayLimit);
  }, [displayUnits, displayLimit]);

  const hasMore = displayUnits.length > displayLimit;

  // Carga automática continua mediante IntersectionObserver
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDisplayLimit((prev) => Math.min(prev + 80, displayUnits.length));
        }
      },
      {
        root: mainScrollRef.current,
        rootMargin: '600px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, visibleUnitsSlice.length, displayUnits.length]);

  // Listener de respaldo en scroll (carga infinita y botón de volver arriba)
  const handleMainScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (hasMore && scrollHeight - scrollTop - clientHeight < 800) {
      setDisplayLimit((prev) => Math.min(prev + 80, displayUnits.length));
    }
    setShowScrollTop(scrollTop > 400);
    lastScrollTopRef.current = scrollTop;
  };

  // Función para saltar suavemente al siguiente ítem pendiente
  const handleJumpToNextPending = () => {
    let targetId = null;

    if (shouldGroupArmorSets) {
      for (const unit of displayUnits) {
        if (unit.isSet) {
          const pending = unit.visiblePieces.find((p) => !itemsCompletados.has(p.id));
          if (pending) {
            targetId = pending.id;
            break;
          }
        } else if (!itemsCompletados.has(unit.id)) {
          targetId = unit.id;
          break;
        }
      }
    } else {
      const pending = filteredItems.find((i) => !itemsCompletados.has(i.id));
      if (pending) targetId = pending.id;
    }

    if (!targetId) return;

    // Asegurarse de que el elemento esté dentro de la porción renderizada
    const unitIndex = displayUnits.findIndex((u) =>
      u.isSet ? u.visiblePieces.some((p) => p.id === targetId) : u.id === targetId
    );

    if (unitIndex >= displayLimit) {
      setDisplayLimit(unitIndex + 40);
    }

    setTimeout(() => {
      const el = document.getElementById(`item-card-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-elden-950');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-elden-950');
        }, 1500);
      }
    }, 60);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-elden-950 text-slate-100 overflow-hidden font-sans relative">
      {/* Cabecera Principal con Soporte Colapsable y Marcado Rápido */}
      <ChecklistHeader
        totalCompleted={itemsCompletados.size}
        totalItems={checklistCatalog.totalItems}
        baseCompleted={baseCompleted}
        baseTotal={baseTotal}
        dlcCompleted={dlcCompleted}
        dlcTotal={dlcTotal}
        expansionFilter={expansionFilterChecklist}
        onExpansionFilterChange={(exp) => {
          setExpansionFilterChecklist(exp);
          setSubcategoriaChecklist('all');
          setDisplayLimit(100);
        }}
        displayMode={displayModeChecklist}
        onDisplayModeChange={setDisplayModeChecklist}
        sortOrder={sortOrderChecklist}
        onSortOrderChange={setSortOrderChecklist}
        searchQuery={busquedaChecklist}
        onSearchChange={setBusquedaChecklist}
        statusFilter={filtroEstadoChecklist}
        onStatusFilterChange={setFiltroEstadoChecklist}
        viewMode={viewMode}
        onSwitchViewMode={setViewMode}
        onOpenSettings={openSettings}
        onCheckAllVisible={handleCheckAllVisible}
        onUncheckAllVisible={handleUncheckAllVisible}
        visibleCount={filteredItems.length}
        activeTotalCount={totalContextCount}
        activePendingCount={pendingContextCount}
        activeCompletedCount={completedContextCount}
        isCollapsed={isHeaderCollapsed}
        onToggleCollapse={handleToggleHeaderCollapse}
        quickMark={quickMarkChecklist}
        onToggleQuickMark={() => setQuickMarkChecklist(!quickMarkChecklist)}
        agruparSets={agruparSetsChecklist}
        onToggleAgruparSets={() => setAgruparSetsChecklist(!agruparSetsChecklist)}
        isArmorCategory={isArmorCategory}
        onOpenEquipLoad={() => setIsEquipLoadOpen(true)}
        onOpenPlatinum={() => setIsPlatinumOpen(true)}
        onOpenMenu={() => setIsHubMenuOpen(true)}
        onOpenBuilds={() => setIsBuildPlannerOpen(true)}
        onGoHome={() => setViewMode('hub')}
      />

      {/* Navegación por las 11 Categorías */}
      <CategoryNav
        categories={checklistCatalog.categories}
        activeCategory={categoriaActivaChecklist}
        onSelectCategory={(id) => {
          setCategoriaActivaChecklist(id);
          setSubcategoriaChecklist('all');
          setDisplayLimit(100);
        }}
        itemsCompletados={itemsCompletados}
        itemsByCategory={itemsByCategory}
        expansionFilter={expansionFilterChecklist}
      />

      {/* Barra de Subcategorías y Resumen Compacto */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#07080c]/90 border-b border-stone-800/80 flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 min-w-0 py-0.5">
          {subcategories.length > 1 ? (
            <>
              <button
                id="subcat-all-btn"
                onClick={() => {
                  setSubcategoriaChecklist('all');
                  setDisplayLimit(60);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono transition whitespace-nowrap border flex-shrink-0 active:scale-95 ${
                  subcategoriaChecklist === 'all'
                    ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-[0_0_10px_rgba(201,160,80,0.3)]'
                    : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                Todas ({catTotal})
              </button>
              {subcategories.map((sub) => {
                const countSub = activeCategoryItems.filter((i) => i.subcategory === sub).length;
                return (
                  <button
                    key={sub}
                    onClick={() => {
                      setSubcategoriaChecklist(sub);
                      setDisplayLimit(60);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono transition whitespace-nowrap border flex-shrink-0 active:scale-95 ${
                      subcategoriaChecklist === sub
                        ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-[0_0_10px_rgba(201,160,80,0.3)]'
                        : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {sub} ({countSub})
                  </button>
                );
              })}
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-serif text-stone-400 truncate">
              <CategoryIcon
                category={currentCategoryConfig.id}
                className="w-3.5 h-3.5 text-amber-400 flex-shrink-0"
              />
              <span className="truncate">
                {expansionFilterChecklist === 'dlc'
                  ? `DLC: ${currentCategoryConfig.name}`
                  : expansionFilterChecklist === 'base'
                  ? `Juego Base: ${currentCategoryConfig.name}`
                  : currentCategoryConfig.name}
              </span>
            </div>
          )}
        </div>

        {/* Resumen compacto a la derecha */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs flex-shrink-0 pl-1 border-l border-stone-800/80">
          <span className="font-mono text-stone-300">
            <strong className="text-amber-300">{catCompleted}</strong>/{catTotal}
          </span>

          <a
            id={`guide-cat-link-${currentCategoryConfig.id}`}
            href={currentCategoryConfig.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 transition p-1"
            title={`Abrir sección oficial de ${currentCategoryConfig.name} en EliteGuías`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Contenedor Principal de Ítems */}
      <main
        ref={mainScrollRef}
        onScroll={handleMainScroll}
        className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4 custom-scrollbar overscroll-contain"
      >
        {filteredItems.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-500 text-center px-4">
            <AlertCircle className="w-8 h-8 text-amber-500/70" />
            <p className="font-serif text-sm max-w-sm">
              {filtroEstadoChecklist === 'completed'
                ? 'Aún no has marcado ningún ítem como conseguido con los filtros actuales.'
                : 'No se encontraron ítems con los filtros o búsqueda actuales.'}
            </p>
            {(busquedaChecklist ||
              subcategoriaChecklist !== 'all' ||
              expansionFilterChecklist !== 'all' ||
              filtroEstadoChecklist !== 'all') && (
              <button
                onClick={() => {
                  setBusquedaChecklist('');
                  setSubcategoriaChecklist('all');
                  setExpansionFilterChecklist('all');
                  setFiltroEstadoChecklist('all');
                }}
                className="text-xs text-elden-gold hover:underline font-mono"
              >
                Restablecer todos los filtros
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {displayModeChecklist === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {visibleUnitsSlice.map((unit) => {
                  if (unit.isSet) {
                    return (
                      <ArmorSetCard
                        key={unit.id}
                        unit={unit}
                        itemsCompletados={itemsCompletados}
                        onToggle={handleToggleWithUndo}
                        onToggleGroup={handleGroupToggleWithUndo}
                        onOpenItem={(it) => openItemModal(it)}
                        quickMark={quickMarkChecklist}
                      />
                    );
                  }
                  return (
                    <ItemCard
                      key={unit.id}
                      item={unit}
                      isCompleted={itemsCompletados.has(unit.id)}
                      onToggle={handleToggleWithUndo}
                      onClick={(it) => openItemModal(it)}
                      displayMode="grid"
                      quickMark={quickMarkChecklist}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {visibleUnitsSlice.map((unit) => {
                  if (unit.isSet) {
                    return (
                      <div key={unit.id} className="md:col-span-2">
                        <ArmorSetCard
                          unit={unit}
                          itemsCompletados={itemsCompletados}
                          onToggle={handleToggleWithUndo}
                          onToggleGroup={handleGroupToggleWithUndo}
                          onOpenItem={(it) => openItemModal(it)}
                          quickMark={quickMarkChecklist}
                        />
                      </div>
                    );
                  }
                  return (
                    <ItemCard
                      key={unit.id}
                      item={unit}
                      isCompleted={itemsCompletados.has(unit.id)}
                      onToggle={handleToggleWithUndo}
                      onClick={(it) => openItemModal(it)}
                      displayMode="list"
                      quickMark={quickMarkChecklist}
                    />
                  );
                })}
              </div>
            )}

            {/* Controles de carga continua */}
            {hasMore && (
              <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <div ref={sentinelRef} className="h-2 w-full pointer-events-none" />
                <button
                  id="load-more-items-btn"
                  type="button"
                  onClick={() => setDisplayLimit((prev) => Math.min(prev + 80, displayUnits.length))}
                  className="px-5 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-amber-300 border border-amber-500/40 hover:border-amber-400 transition font-serif text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(201,160,80,0.2)] active:scale-95"
                >
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  <span>
                    Cargar más ({visibleUnitsSlice.length} de {displayUnits.length})
                  </span>
                </button>
                <button
                  id="load-all-items-btn"
                  type="button"
                  onClick={() => setDisplayLimit(displayUnits.length)}
                  className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-stone-900 text-stone-300 hover:text-amber-200 border border-stone-800 hover:border-stone-700 transition font-serif text-xs font-bold active:scale-95"
                  title="Mostrar la totalidad de los ítems"
                >
                  Ver todos ({displayUnits.length})
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Botones Flotantes: Saltar al Siguiente Pendiente & Ir Arriba */}
      {pendingContextCount > 0 && (
        <button
          id="jump-next-pending-btn"
          type="button"
          onClick={handleJumpToNextPending}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-serif font-bold text-xs shadow-[0_0_16px_rgba(201,160,80,0.35)] border border-amber-200 flex items-center gap-1.5 active:scale-90 transition-all hover:brightness-110"
          title="Saltar a la siguiente armadura o ítem pendiente en la pantalla"
        >
          <Zap className="w-4 h-4 fill-current text-stone-950" />
          <span className="hidden xs:inline">Próximo Pendiente</span>
        </button>
      )}

      {showScrollTop && (
        <button
          type="button"
          onClick={() => mainScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 sm:bottom-22 sm:right-8 z-40 p-2.5 rounded-full bg-stone-900/90 text-stone-300 hover:text-amber-300 border border-stone-800 shadow-xl backdrop-blur active:scale-90 transition-all hover:bg-stone-800"
          title="Volver arriba"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {undoToast && (
        <div
          id="undo-action-toast"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[210] px-4 py-2.5 rounded-2xl bg-stone-900/95 border border-amber-500/50 text-stone-100 text-xs font-serif font-bold shadow-2xl backdrop-blur-md animate-fadeIn flex items-center gap-3"
        >
          <span className="truncate max-w-[200px] sm:max-w-xs text-amber-300">
            {undoToast.message}
          </span>
          <button
            type="button"
            onClick={() => {
              undoToast.undo();
              setUndoToast(null);
            }}
            className="px-2.5 py-1 rounded-lg bg-amber-400 text-stone-950 font-mono text-[11px] font-bold hover:bg-amber-300 transition flex items-center gap-1 active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Deshacer</span>
          </button>
        </div>
      )}

      {/* Modal de Detalle con la información de la guía */}
      {activeItemForModal && (
        <ItemDetailModal
          item={activeItemForModal}
          onClose={closeItemModal}
        />
      )}

      {/* Modal de Ajustes / Backup */}
      {isSettingsOpen && (
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      )}

      {/* Modal de Calculadora de Carga y Rodamiento */}
      <EquipLoadModal
        isOpen={isEquipLoadOpen}
        onClose={() => setIsEquipLoadOpen(false)}
      />

      {/* Modal del Salón del Platino y Recuerdos */}
      <PlatinumModal
        isOpen={isPlatinumOpen}
        onClose={() => setIsPlatinumOpen(false)}
        onOpenItem={(it) => openItemModal(it)}
      />

      {/* Menú Principal Gracia Perdida */}
      <AppHubMenu
        isOpen={isHubMenuOpen}
        onClose={() => setIsHubMenuOpen(false)}
        onNavigate={handleHubNavigate}
      />

      {/* Constructor de Builds & Recomendador de Equipo */}
      <BuildPlannerModal
        isOpen={isBuildPlannerOpen}
        onClose={() => setIsBuildPlannerOpen(false)}
        onOpenItem={(it) => openItemModal(it)}
      />

      {/* Calculadora de Runas & Zurrón */}
      <RuneCalculatorModal
        isOpen={isRuneCalcOpen}
        onClose={() => setIsRuneCalcOpen(false)}
      />

      {/* Ruta Óptima de Progresión */}
      <ProgressionRouteModal
        isOpen={isProgressionOpen}
        onClose={() => setIsProgressionOpen(false)}
      />

      {/* Dock Rápido Flotante */}
      <FloatingQuickHUD
        onOpenBuilds={() => setIsBuildPlannerOpen(true)}
        onOpenEquipLoad={() => setIsEquipLoadOpen(true)}
        onOpenPlatinum={() => setIsPlatinumOpen(true)}
        onOpenRuneCalc={() => setIsRuneCalcOpen(true)}
        onOpenProgression={() => setIsProgressionOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Toast de navegación atrás (Android double-tap exit prevention) */}
      {toastMessage && (
        <div
          id="back-exit-toast"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-4 py-2.5 rounded-full bg-elden-900/95 border border-amber-500/60 text-amber-200 text-xs font-serif font-bold shadow-2xl backdrop-blur-md animate-fadeIn pointer-events-none flex items-center gap-2"
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
