import React from 'react';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Info,
  Sparkles,
  TreePine,
  Sword,
  Check,
} from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';
import { useSwipeToggle } from '../../hooks/useSwipeToggle';
import { decodeHtmlEntities } from '../../utils/armorSets';

/**
 * Hook para gestionar el toggle del checkbox del ítem con máxima fiabilidad en móvil y PC,
 * manteniendo el foco en el buscador de forma no bloqueante si el usuario está buscando.
 */
function useCheckboxToggle(onToggle, itemId) {
  const handleMouseDown = (e) => {
    // En escritorio con ratón, evita que el input pierda el foco al hacer click
    const searchInput = document.getElementById('checklist-search-input');
    if (searchInput && (document.activeElement === searchInput || searchInput.value.trim().length > 0)) {
      e.preventDefault();
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    // Ejecutar toggle inmediatamente sin bloqueos
    onToggle(itemId);

    // Si el buscador tiene texto o está activo, restaurar foco suavemente tras el ciclo de render
    const searchInput = document.getElementById('checklist-search-input');
    if (searchInput && searchInput.value.trim().length > 0) {
      setTimeout(() => {
        if (document.activeElement !== searchInput) {
          searchInput.focus({ preventScroll: true });
        }
      }, 50);
    }
  };

  return {
    onMouseDown: handleMouseDown,
    onClick: handleClick,
  };
}

export function ItemCard({
  item,
  isCompleted,
  onToggle,
  onClick,
  displayMode = 'grid',
  quickMark = false,
}) {
  const isDlc = Boolean(item.isDlc);
  const displayName = decodeHtmlEntities(item.name);
  const toggleGuards = useCheckboxToggle(onToggle, item.id);
  const swipe = useSwipeToggle(() => onToggle(item.id));

  // En modo "marcar rápido" tocar cualquier parte de la tarjeta alterna el estado
  const handleCardClick = () => {
    if (quickMark) {
      onToggle(item.id);
    } else {
      onClick(item);
    }
  };

  // Modo compacto (Lista): fila ~56px optimizada para marcar rápido con el pulgar
  if (displayMode === 'list') {
    return (
      <div
        id={`item-card-${item.id}`}
        onClick={handleCardClick}
        {...swipe.handlers}
        style={{
          touchAction: 'pan-y',
          transform: swipe.dx > 0 ? `translateX(${swipe.dx}px)` : undefined,
          transition: swipe.dx > 0 ? 'none' : 'transform 0.2s ease-out',
        }}
        className={`group relative rounded-xl border pl-2 pr-1.5 py-1.5 min-h-[56px] transition-colors duration-200 cursor-pointer flex items-center gap-2.5 select-none ${
          swipe.armed
            ? 'bg-emerald-950/70 border-emerald-400'
            : isCompleted
            ? 'bg-elden-950/60 border-emerald-500/30 opacity-70 hover:opacity-100'
            : isDlc
            ? 'bg-gradient-to-r from-purple-950/20 via-elden-900/90 to-elden-900/90 border-purple-900/40 hover:border-purple-500/70'
            : 'bg-elden-900/90 border-slate-800/90 hover:border-elden-gold/60 hover:bg-elden-850'
        } ${quickMark ? 'active:bg-elden-800' : ''}`}
      >
        {/* Miniatura */}
        <div className="relative w-10 h-10 rounded-lg bg-black/40 border border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-0.5"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <CategoryIcon category={item.category} className="w-5 h-5 text-slate-500" />
          )}
        </div>

        {/* Nombre + meta en una segunda línea */}
        <div className="min-w-0 flex-1">
          <div
            className={`font-serif text-[13px] sm:text-sm leading-tight font-semibold line-clamp-2 ${
              isCompleted
                ? 'text-slate-400 line-through decoration-emerald-500/50'
                : 'text-amber-100 group-hover:text-amber-200'
            }`}
          >
            {displayName}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono text-slate-500 min-w-0">
            {isDlc && (
              <span className="px-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-0.5 flex-shrink-0">
                <TreePine className="w-2.5 h-2.5 text-amber-400" /> DLC
              </span>
            )}
            {item.subcategory && <span className="truncate">{item.subcategory}</span>}
            {item.weight != null && (
              <span className="text-amber-200/80 flex-shrink-0" title={`Peso: ${item.weight.toFixed(1)}`}>
                ⚖️ {item.weight.toFixed(1)}
              </span>
            )}
            {item.attackPower != null && (
              <span className="text-rose-300/80 flex-shrink-0" title={`Potencia de ataque: ${item.attackPower}`}>
                ⚔️ {item.attackPower}
              </span>
            )}
          </div>
        </div>

        {/* Acciones: info (icono) + link (solo escritorio) + checkbox grande a la derecha */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(item);
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-elden-gold hover:bg-elden-800 transition active:scale-90"
            title="Ver guía"
          >
            <Info className="w-4 h-4" />
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-slate-500 hover:text-elden-gold hover:bg-elden-800 transition"
            title="Abrir en EliteGuías"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            id={`toggle-${item.id}`}
            type="button"
            {...toggleGuards}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all flex-shrink-0 active:scale-90 ${
              isCompleted
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-400'
                : 'bg-elden-950 border border-slate-600 text-slate-500 group-hover:border-elden-gold/70'
            }`}
            title={isCompleted ? 'Desmarcar' : 'Marcar como conseguido'}
          >
            {isCompleted ? (
              <Check className="w-5 h-5" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-slate-600 group-hover:border-elden-gold/70" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // Modo Grid (Tarjetas visuales con miniatura e información rica)
  return (
    <div
      id={`item-card-${item.id}`}
      onClick={handleCardClick}
      className={`group relative rounded-2xl border p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none overflow-hidden ${
        isCompleted
          ? 'bg-elden-950/50 border-emerald-500/30 opacity-75 hover:opacity-100 hover:border-emerald-500/60 shadow-sm'
          : isDlc
          ? 'bg-gradient-to-br from-purple-950/25 via-elden-900/95 to-elden-900 border-purple-900/50 hover:border-purple-400/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]'
          : 'bg-gradient-to-br from-elden-900/95 via-elden-900 to-elden-950 border-slate-800/90 hover:border-elden-gold/60 hover:shadow-gold-glow hover:-translate-y-0.5'
      }`}
    >
      {/* Resplandor decorativo de fondo */}
      <div
        className={`absolute -right-10 -bottom-10 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity ${
          isCompleted
            ? 'bg-emerald-500/10'
            : isDlc
            ? 'bg-purple-600/15 group-hover:bg-purple-500/25'
            : 'bg-amber-500/10 group-hover:bg-amber-400/20'
        }`}
      />

      {/* Franja indicadora superior */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 transition-all ${
          isCompleted
            ? 'bg-emerald-500'
            : isDlc
            ? 'bg-gradient-to-r from-purple-600 to-amber-500 opacity-60 group-hover:opacity-100'
            : 'bg-transparent group-hover:bg-gradient-to-r group-hover:from-elden-gold group-hover:to-amber-500'
        }`}
      />

      {/* Cabecera de la tarjeta: Badges y Enlace Guía */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          {/* Badge DLC vs Base */}
          {isDlc ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-500/50 text-purple-300 shadow-sm flex items-center gap-1">
              <TreePine className="w-3 h-3 text-amber-400" />
              <span>DLC Erdtree</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-900/90 border border-slate-800 text-slate-400 flex items-center gap-1">
              <Sword className="w-2.5 h-2.5 text-slate-500" />
              <span>Juego Base</span>
            </span>
          )}

          {/* Subcategoría */}
          {item.subcategory && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-elden-950/80 border border-slate-800/80 text-slate-300 truncate max-w-[150px]">
              {item.subcategory}
            </span>
          )}

          {/* Estadísticas de Peso y Potencia de Ataque */}
          {item.weight != null && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-elden-950/90 border border-amber-500/30 text-amber-200/90 flex items-center gap-1 font-semibold flex-shrink-0" title={`Peso: ${item.weight.toFixed(1)}`}>
              <span>⚖️</span> {item.weight.toFixed(1)}
            </span>
          )}

          {item.attackPower != null && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-elden-950/90 border border-rose-500/30 text-rose-300/90 flex items-center gap-1 font-semibold flex-shrink-0" title={`Potencia de ataque físico base: ${item.attackPower}`}>
              <span>⚔️</span> {item.attackPower}
            </span>
          )}
        </div>

        {/* Enlace directo a EliteGuías */}
        <a
          id={`link-guide-${item.id}`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1 rounded-lg text-slate-500 hover:text-elden-gold hover:bg-elden-800 transition flex-shrink-0"
          title="Ver página oficial en EliteGuías"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Cuerpo Principal: Imagen + Nombre */}
      <div className="flex items-center gap-3.5 my-1">
        {/* Contenedor de Miniatura / Imagen real del juego */}
        <div className="relative w-14 h-14 rounded-xl bg-elden-950 border border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-elden-gold/50 shadow-inner transition-colors">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-1 rounded-lg transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <CategoryIcon
              category={item.category}
              className="w-6 h-6 text-slate-500 group-hover:text-elden-gold transition-colors"
            />
          )}

          {/* Insignia de completado en la imagen */}
          {isCompleted && (
            <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[1px] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow" />
            </div>
          )}
        </div>

        {/* Título del Ítem */}
        <div className="min-w-0 flex-1">
          <h3
            className={`font-serif text-base font-bold leading-snug line-clamp-2 transition-colors ${
              isCompleted
                ? 'text-slate-400 line-through decoration-emerald-500/50'
                : 'text-amber-100 group-hover:text-amber-200'
            }`}
          >
            {displayName}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {item.categoryName}
          </p>
        </div>
      </div>

      {/* Barra de acción inferior de la tarjeta */}
      <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {/* Botón de Checkbox grande y táctil (con guardia anti-cierre de teclado en Android) */}
        <button
          id={`toggle-${item.id}`}
          type="button"
          {...toggleGuards}
          className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-serif font-bold transition-all active:scale-95 ${
            isCompleted
              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/60 shadow-sm hover:bg-emerald-900/60'
              : 'bg-elden-950 text-slate-400 border border-slate-700/80 hover:border-elden-gold/70 hover:text-elden-gold hover:bg-elden-850'
          }`}
          title={isCompleted ? 'Marcar como pendiente' : 'Marcar como conseguido'}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conseguido</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-slate-500 group-hover:text-elden-gold" />
              <span>Marcar</span>
            </>
          )}
        </button>

        {/* Botón para abrir el Modal de la Guía */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(item);
          }}
          className="text-xs text-slate-400 group-hover:text-elden-gold flex items-center gap-1 font-serif px-2.5 py-2 sm:py-1.5 rounded-xl bg-elden-950/60 border border-slate-800 group-hover:border-elden-gold/40 hover:bg-elden-800 transition active:scale-95"
        >
          <Info className="w-3.5 h-3.5 text-elden-gold" />
          <span>Ver Guía</span>
        </button>
      </div>
    </div>
  );
}
