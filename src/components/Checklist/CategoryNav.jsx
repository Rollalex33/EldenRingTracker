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
    <div className="w-full bg-elden-950/95 border-b border-slate-800 backdrop-blur sticky top-0 z-20 shadow-md">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto px-3 sm:px-4 py-2 sm:py-2.5 custom-scrollbar no-scrollbar">
        {/* Opción para Ver Todas las Categorías */}
        <button
          id="cat-btn-all"
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`flex-shrink-0 flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-serif font-semibold transition-all select-none border relative overflow-hidden group active:scale-95 ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-elden-800 to-elden-850 text-amber-100 border-elden-gold shadow-gold-glow scale-[1.02]'
              : 'bg-elden-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200 hover:bg-elden-850'
          }`}
        >
          <div
            className={`absolute bottom-0 left-0 top-0 opacity-20 transition-all duration-300 pointer-events-none ${
              isFinishedAll
                ? 'bg-emerald-500'
                : activeCategory === 'all'
                ? 'bg-elden-gold'
                : 'bg-slate-500'
            }`}
            style={{ width: `${pctAll}%` }}
          />

          <div
            className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
              activeCategory === 'all'
                ? 'bg-elden-gold/25 text-elden-gold'
                : isFinishedAll
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                : 'bg-elden-950 text-slate-400 group-hover:text-elden-gold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-elden-gold" />
          </div>

          <div className="flex flex-col text-left">
            <span className="tracking-wide text-[11px] sm:text-xs whitespace-nowrap">Todas</span>
            <div className="flex items-center gap-1 text-[10px] font-mono opacity-80">
              <span
                className={
                  isFinishedAll
                    ? 'text-emerald-400 font-bold'
                    : activeCategory === 'all'
                    ? 'text-elden-gold font-bold'
                    : 'text-slate-400'
                }
              >
                {completedAll}/{totalAll}
              </span>
              <span className="text-slate-500">({pctAll}%)</span>
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
              className={`flex-shrink-0 flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-serif font-semibold transition-all select-none border relative overflow-hidden group active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-elden-800 to-elden-850 text-amber-100 border-elden-gold shadow-gold-glow scale-[1.02]'
                  : 'bg-elden-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200 hover:bg-elden-850'
              }`}
            >
              {/* Barra de progreso de fondo */}
              <div
                className={`absolute bottom-0 left-0 top-0 opacity-20 transition-all duration-300 pointer-events-none ${
                  isFinished
                    ? 'bg-emerald-500'
                    : isActive
                    ? 'bg-elden-gold'
                    : 'bg-slate-500'
                }`}
                style={{ width: `${percentage}%` }}
              />

              {/* Icono de Categoría */}
              <div
                className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-elden-gold/25 text-elden-gold'
                    : isFinished
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : 'bg-elden-950 text-slate-400 group-hover:text-elden-gold'
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
                      className="text-[9px] font-mono px-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 hidden sm:inline"
                      title={`${dlcCount} ítems del DLC`}
                    >
                      +{dlcCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono opacity-80">
                  <span
                    className={
                      isFinished
                        ? 'text-emerald-400 font-bold'
                        : isActive
                        ? 'text-elden-gold font-bold'
                        : 'text-slate-400'
                    }
                  >
                    {completedCount}/{totalCount}
                  </span>
                  <span className="text-slate-500">({percentage}%)</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
