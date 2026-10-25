import React, { useMemo } from 'react';
import { CategoryIcon } from './CategoryIcon';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { CANONICAL_CATEGORIES_ORDER } from '../../utils/gameOrder';

export function CategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
  itemsCompletados,
  itemsByCategory,
  expansionFilter = 'all',
}) {
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const idxA = CANONICAL_CATEGORIES_ORDER.indexOf(a.id);
      const idxB = CANONICAL_CATEGORIES_ORDER.indexOf(b.id);
      const posA = idxA === -1 ? 999 : idxA;
      const posB = idxB === -1 ? 999 : idxB;
      return posA - posB;
    });
  }, [categories]);
  const allItemsList = useMemo(() => {
    let all = [];
    Object.values(itemsByCategory).forEach((arr) => {
      all.push(...arr);
    });
    if (expansionFilter === 'base') {
      return all.filter((i) => !i.isDlc);
    } else if (expansionFilter === 'dlc') {
      return all.filter((i) => i.isDlc);
    }
    return all;
  }, [itemsByCategory, expansionFilter]);

  const totalAll = allItemsList.length;
  const completedAll = allItemsList.filter((i) => itemsCompletados.has(i.id)).length;
  const isFinishedAll = totalAll > 0 && completedAll === totalAll;
  const pctAll = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;

  return (
    <nav className="w-full bg-[#07080c]/95 border-b border-amber-500/20 backdrop-blur-md sticky top-0 z-20 shadow-lg shadow-black/60">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto px-3 sm:px-4 py-2 sm:py-2.5 custom-scrollbar no-scrollbar">
        {/* Opción para Ver Todas las Categorías */}
        <button
          id="cat-btn-all"
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-serif font-bold transition-all select-none border relative overflow-hidden group active:scale-95 ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/70 text-amber-200 border-amber-400/80 shadow-[0_0_15px_rgba(201,160,80,0.25)] ring-1 ring-amber-400/30'
              : 'bg-stone-950/80 text-stone-300 border-stone-800/80 hover:border-amber-500/40 hover:text-amber-100 hover:bg-stone-900/90'
          }`}
        >
          <div
            className={`absolute bottom-0 left-0 top-0 opacity-15 transition-all duration-300 pointer-events-none ${
              isFinishedAll
                ? 'bg-emerald-500'
                : activeCategory === 'all'
                ? 'bg-amber-400'
                : 'bg-stone-500'
            }`}
            style={{ width: `${pctAll}%` }}
          />

          <div
            className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
              activeCategory === 'all'
                ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                : isFinishedAll
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                : 'bg-stone-900 text-stone-400 group-hover:text-amber-300 border border-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>

          <div className="flex flex-col text-left">
            <span className="tracking-wider text-[11px] sm:text-xs uppercase whitespace-nowrap">Todas</span>
            <div className="flex items-center gap-1 text-[10px] font-mono opacity-90">
              <span
                className={
                  isFinishedAll
                    ? 'text-emerald-400 font-bold'
                    : activeCategory === 'all'
                    ? 'text-amber-300 font-bold'
                    : 'text-stone-400'
                }
              >
                {completedAll}/{totalAll}
              </span>
              <span className="text-stone-500">({pctAll}%)</span>
            </div>
          </div>
        </button>
        {sortedCategories.map((cat) => {
          let catItems = itemsByCategory[cat.id] || [];
          if (expansionFilter === 'base') {
            catItems = catItems.filter((i) => !i.isDlc);
          } else if (expansionFilter === 'dlc') {
            catItems = catItems.filter((i) => i.isDlc);
          }

          const totalCount = catItems.length;
          const completedCount = catItems.filter((i) =>
            itemsCompletados.has(i.id)
          ).length;
          const isFinished = totalCount > 0 && completedCount === totalCount;
          const isActive = activeCategory === cat.id;
          const percentage =
            totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          // Contar ítems del DLC
          const dlcCount = (itemsByCategory[cat.id] || []).filter((i) => i.isDlc).length;

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-serif font-bold transition-all select-none border relative overflow-hidden group active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/70 text-amber-200 border-amber-400/80 shadow-[0_0_15px_rgba(201,160,80,0.25)] ring-1 ring-amber-400/30'
                  : isFinished
                  ? 'bg-stone-950/90 text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                  : 'bg-stone-950/80 text-stone-300 border-stone-800/80 hover:border-amber-500/40 hover:text-amber-100 hover:bg-stone-900/90'
              }`}
            >
              {/* Barra de progreso de fondo */}
              <div
                className={`absolute bottom-0 left-0 top-0 opacity-15 transition-all duration-300 pointer-events-none ${
                  isFinished
                    ? 'bg-emerald-500'
                    : isActive
                    ? 'bg-amber-400'
                    : 'bg-stone-500'
                }`}
                style={{ width: `${percentage}%` }}
              />

              {/* Icono de Categoría */}
              <div
                className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                    : isFinished
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                    : 'bg-stone-900 text-stone-400 group-hover:text-amber-300 border border-stone-800'
                }`}
              >
                <CategoryIcon category={cat.id} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Nombre y Estadísticas */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="tracking-wide text-[11px] sm:text-xs whitespace-nowrap">{cat.name}</span>
                  {isFinished && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  )}
                  {expansionFilter === 'all' && dlcCount > 0 && (
                    <span
                      className="text-[9px] font-mono px-1 rounded bg-purple-950/90 border border-purple-500/50 text-purple-300 hidden sm:inline"
                      title={`${dlcCount} ítems del DLC`}
                    >
                      +{dlcCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono opacity-90">
                  <span
                    className={
                      isFinished
                        ? 'text-emerald-400 font-bold'
                        : isActive
                        ? 'text-amber-300 font-bold'
                        : 'text-stone-400'
                    }
                  >
                    {completedCount}/{totalCount}
                  </span>
                  <span className="text-stone-500">({percentage}%)</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
