import React from 'react';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronRight,
  TreePine,
  Sword,
  Sparkles,
} from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';

export function LinkedItemBadge({
  item,
  isCompleted,
  onToggle,
  onSelect,
  display = 'card', // 'card' | 'inline'
}) {
  if (!item) return null;

  if (display === 'inline') {
    return (
      <span className="inline-flex items-center gap-1.5 mx-1 my-0.5 px-2 py-0.5 rounded-lg bg-elden-950 border border-slate-700/80 hover:border-elden-gold/70 transition-all select-none group align-middle">
        {/* Mini icono o imagen */}
        {item.image ? (
          <img
            src={item.image}
            alt=""
            referrerPolicy="no-referrer"
            className="w-4 h-4 object-contain rounded"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <CategoryIcon category={item.category} className="w-3.5 h-3.5 text-elden-gold" />
        )}

        {/* Nombre clickeable */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className={`font-serif text-xs font-semibold hover:text-elden-gold hover:underline transition-colors ${
            isCompleted ? 'text-emerald-300' : 'text-amber-200'
          }`}
        >
          {item.name}
        </button>

        {/* Badge de estado */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(item.id);
          }}
          className={`px-1.5 py-0.2 rounded text-[10px] font-mono flex items-center gap-0.5 transition ${
            isCompleted
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
          }`}
          title={isCompleted ? 'Marcado como conseguido' : 'Pendiente de conseguir'}
        >
          {isCompleted ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Circle className="w-2.5 h-2.5" />}
          <span>{isCompleted ? 'Obtenido' : 'Pendiente'}</span>
        </button>
      </span>
    );
  }

  // Vista Card (para recompensas y listados)
  return (
    <div
      onClick={() => onSelect(item)}
      className={`group relative rounded-xl border p-2.5 sm:p-3 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none ${
        isCompleted
          ? 'bg-gradient-to-r from-emerald-950/30 via-elden-950 to-elden-950 border-emerald-500/40 hover:border-emerald-500/70'
          : item.isDlc
          ? 'bg-gradient-to-r from-purple-950/30 via-elden-900 to-elden-900 border-purple-900/50 hover:border-purple-500/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
          : 'bg-elden-900/90 border-slate-800 hover:border-elden-gold/60 hover:bg-elden-850 hover:shadow-gold-glow'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Imagen en miniatura del ítem vinculado */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-elden-950 border border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-elden-gold/50 shadow-inner">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-0.5 rounded transition-transform group-hover:scale-110"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <CategoryIcon category={item.category} className="w-5 h-5 text-slate-500 group-hover:text-elden-gold" />
          )}
        </div>

        {/* Nombre y metadatos del ítem */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h5
              className={`font-serif text-sm sm:text-base font-bold truncate transition-colors ${
                isCompleted
                  ? 'text-emerald-200/90 line-through decoration-emerald-500/50'
                  : 'text-amber-100 group-hover:text-amber-200'
              }`}
            >
              {item.name}
            </h5>

            {item.isDlc && (
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-0.5 flex-shrink-0">
                <TreePine className="w-2.5 h-2.5 text-amber-400" /> DLC
              </span>
            )}
          </div>

          <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
            <span className="text-elden-gold font-medium">{item.categoryName}</span>
            {item.subcategory && (
              <span>• {item.subcategory}</span>
            )}
          </p>
        </div>
      </div>

      {/* Acciones y estado conseguido */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Botón táctil para marcar / desmarcar este ítem */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(item.id);
          }}
          className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 border active:scale-95 ${
            isCompleted
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60 shadow-sm'
              : 'bg-elden-950 text-slate-400 border-slate-700/80 hover:border-amber-500/70 hover:text-amber-300'
          }`}
          title={isCompleted ? 'Ítem conseguido. Clic para desmarcar.' : 'Ítem pendiente. Clic para marcar.'}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conseguido</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-slate-500" />
              <span>Pendiente</span>
            </>
          )}
        </button>

        {/* Indicador de navegación a modal */}
        <span
          className="p-1 rounded-lg text-slate-500 group-hover:text-elden-gold group-hover:translate-x-0.5 transition"
          title="Ver ficha completa"
        >
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
