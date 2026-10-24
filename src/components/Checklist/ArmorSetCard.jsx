import React from 'react';
import { Shield, CheckCheck, RotateCcw, TreePine } from 'lucide-react';
import { ItemCard } from './ItemCard';

/**
 * Tarjeta de set de armadura: agrupa Cabeza/Pecho/Manos/Piernas bajo un mismo
 * conjunto con progreso y botón para marcar o desmarcar el set completo.
 */
export function ArmorSetCard({
  unit,
  itemsCompletados,
  onToggle,
  onToggleGroup,
  onOpenItem,
  quickMark = false,
}) {
  const total = unit.allPieces.length;
  const done = unit.allPieces.filter((p) => itemsCompletados.has(p.id)).length;
  const isComplete = total > 0 && done === total;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleSetAction = (e) => {
    e.stopPropagation();
    const ids = unit.allPieces.map((p) => p.id);
    onToggleGroup(ids, !isComplete, unit.name);
  };

  return (
    <section
      id={`armor-set-${unit.id}`}
      className={`rounded-2xl border p-2 space-y-1.5 transition-colors ${
        isComplete
          ? 'bg-emerald-950/20 border-emerald-500/40'
          : unit.isDlc
          ? 'bg-gradient-to-br from-purple-950/20 to-elden-900/80 border-purple-900/50'
          : 'bg-elden-900/70 border-slate-800/90'
      }`}
    >
      {/* Cabecera del set */}
      <div className="flex items-center gap-2 px-1.5 pt-1">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <Shield
              className={`w-4 h-4 flex-shrink-0 ${isComplete ? 'text-emerald-400' : 'text-elden-gold'}`}
            />
            <h3
              className={`font-serif text-sm font-bold truncate ${
                isComplete ? 'text-emerald-200' : 'text-amber-100'
              }`}
            >
              {unit.name}
            </h3>
            {unit.isDlc && (
              <span className="text-[10px] font-mono px-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-0.5 flex-shrink-0">
                <TreePine className="w-2.5 h-2.5 text-amber-400" /> DLC
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1.5 bg-elden-950 rounded-full border border-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isComplete
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-amber-600 to-amber-300'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className={`text-[11px] font-mono font-bold ${
                isComplete ? 'text-emerald-400' : 'text-slate-300'
              }`}
            >
              {done}/{total}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSetAction}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-serif font-bold transition-all active:scale-95 border ${
            isComplete
              ? 'bg-elden-950 text-slate-400 border-slate-700 hover:text-amber-300 hover:border-amber-500/60'
              : 'bg-amber-400 text-elden-950 border-amber-300 shadow-gold-glow hover:bg-amber-300'
          }`}
          title={isComplete ? 'Desmarcar todas las piezas del set' : 'Marcar todas las piezas del set'}
        >
          {isComplete ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Quitar set</span>
            </>
          ) : (
            <>
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Marcar set</span>
            </>
          )}
        </button>
      </div>

      {/* Piezas del set */}
      <div className="space-y-1.5">
        {unit.visiblePieces.map((piece) => (
          <ItemCard
            key={piece.id}
            item={piece}
            isCompleted={itemsCompletados.has(piece.id)}
            onToggle={onToggle}
            onClick={onOpenItem}
            displayMode="list"
            quickMark={quickMark}
          />
        ))}
      </div>
    </section>
  );
}
