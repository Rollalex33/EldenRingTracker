import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Circle,
  Sparkles,
  MapPin,
  BookOpen,
  Loader2,
  Info,
  ArrowLeft,
  TreePine,
  Sword,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import { matchItemInLine } from '../../utils/itemLinker';
import { LinkedItemBadge } from './LinkedItemBadge';

export function ItemDetailModal({ item, onClose }) {
  const { isCompletado, toggleCompletado } = useTrackerStore();

  // Soporte de navegación histórica dentro del modal
  const [history, setHistory] = useState([]);
  const [currentItem, setCurrentItem] = useState(item);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Si la prop item externa cambia, resetear historial
  useEffect(() => {
    setCurrentItem(item);
    setHistory([]);
  }, [item]);

  const completed = currentItem ? isCompletado(currentItem.id) : false;

  // Cargar detalles del ítem activo (pre-cacheados o vía API)
  useEffect(() => {
    if (!currentItem) return;

    let isMounted = true;
    setLoading(true);
    setActiveImageIndex(0);

    const loadDetail = async () => {
      const fileKey = currentItem.fileKey || `${currentItem.id}.php`;
      const cleanKey = fileKey.replace(/[^a-zA-Z0-9_\-\.]/g, '');

      // 1. Intentar cargar desde el caché estático pre-generado
      try {
        const cacheRes = await fetch(
          `./guide-cache/${cleanKey.endsWith('.php') ? cleanKey : cleanKey + '.php'}.json`
        );
        if (cacheRes.ok) {
          const json = await cacheRes.json();
          if (isMounted) {
            setData(json);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Fallback a API dinámica
      }

      // 2. Intentar cargar vía la API de Vite dev server
      try {
        const apiRes = await fetch(`/api/guide-detail?file=${cleanKey}`);
        if (apiRes.ok) {
          const json = await apiRes.json();
          if (isMounted) {
            setData(json);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Fallback
      }

      if (isMounted) {
        setData({
          title: currentItem.name,
          originalUrl: currentItem.url,
          images: currentItem.image ? [currentItem.image] : [],
          lore: '',
          intro: [`Consulta la guía de ${currentItem.name} directamente en EliteGuías.`],
          sections: [
            {
              heading: 'Información en la Guía',
              lines: [
                `Categoría: ${currentItem.categoryName}`,
                `Subtipo: ${currentItem.subcategory || 'General'}`,
                'Pulsa el botón oficial de EliteGuías para consultar todos los requisitos, localización y consejos.',
              ],
              images: [],
            },
          ],
        });
        setLoading(false);
      }
    };

    loadDetail();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (historyRef.current.length > 0) {
          handleBack();
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentItem]);

  const historyRef = useRef(history);
  historyRef.current = history;
  const isClosingRef = useRef(false);

  const handleClose = () => {
    isClosingRef.current = true;
    onClose(history.length);
  };

  // Navegar a un ítem vinculado dentro del modal
  const handleNavigateToItem = (targetItem) => {
    if (!targetItem || targetItem.id === currentItem.id) return;
    setHistory((prev) => [...prev, currentItem]);
    setCurrentItem(targetItem);
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'modal-item-sub', id: targetItem.id }, '');
    }
  };

  // Retroceder en el historial del modal
  const handleBack = () => {
    if (history.length === 0) return;
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal-item-sub') {
      window.history.back();
    } else {
      const prevItem = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentItem(prevItem);
    }
  };

  // Interceptar botón atrás si hay historial dentro del modal
  useEffect(() => {
    const handleModalPop = (e) => {
      if (!isClosingRef.current && historyRef.current.length > 0) {
        e.stopImmediatePropagation();
        const prevItem = historyRef.current[historyRef.current.length - 1];
        setHistory((prev) => prev.slice(0, -1));
        setCurrentItem(prevItem);
      }
    };

    window.addEventListener('popstate', handleModalPop, true);
    return () => window.removeEventListener('popstate', handleModalPop, true);
  }, []);

  if (!currentItem) return null;

  const currentImage = data?.images?.[activeImageIndex] || data?.images?.[0] || currentItem.image;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'modal-overlay') handleClose();
      }}
    >
      <div className="bg-elden-900 border-t sm:border border-elden-gold/40 rounded-t-3xl sm:rounded-2xl w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl shadow-elden-gold/10 overflow-hidden relative transform transition-all animate-scaleUp">
        {/* Barra superior de agarre en móvil */}
        <div className="w-12 h-1 bg-slate-700/80 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Cabecera del Modal */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-elden-950 via-elden-900 to-elden-950 flex flex-col gap-2">
          {/* Botón de volver si hay historial de navegación */}
          {history.length > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-serif font-bold text-elden-gold hover:text-amber-300 transition px-2.5 py-1 rounded-lg bg-elden-950 border border-elden-gold/40 w-fit active:scale-95 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a {history[history.length - 1].name}</span>
            </button>
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {currentItem.isDlc ? (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/50 text-purple-300 font-bold flex items-center gap-1 shadow-sm">
                    <TreePine className="w-3 h-3 text-amber-400" /> DLC Shadow of the Erdtree
                  </span>
                ) : (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1">
                    <Sword className="w-3 h-3 text-slate-500" /> Juego Base
                  </span>
                )}

                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-elden-800 border border-slate-700 text-elden-gold font-medium">
                  {currentItem.categoryName}
                </span>

                {currentItem.subcategory && currentItem.subcategory !== currentItem.categoryName && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
                    {currentItem.subcategory}
                  </span>
                )}

                {currentItem.weight != null && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-elden-950/90 border border-amber-500/40 text-amber-200 font-semibold flex items-center gap-1">
                    <span>⚖️ Peso:</span> {currentItem.weight.toFixed(1)}
                  </span>
                )}

                {currentItem.attackPower != null && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-elden-950/90 border border-rose-500/40 text-rose-300 font-semibold flex items-center gap-1">
                    <span>⚔️ Daño físico:</span> {currentItem.attackPower}
                  </span>
                )}

                {completed ? (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Conseguido
                  </span>
                ) : (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/60 text-slate-400 flex items-center gap-1">
                    <Circle className="w-3 h-3" /> Pendiente
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-wide drop-shadow truncate">
                {currentItem.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Botón toggle rápido */}
              <button
                id={`modal-toggle-${currentItem.id}`}
                onClick={() => toggleCompletado(currentItem.id)}
                className={`px-3 py-1.5 rounded-lg font-serif text-xs font-semibold flex items-center gap-1.5 transition border active:scale-95 ${
                  completed
                    ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500/60 hover:bg-emerald-800/60'
                    : 'bg-elden-800 text-slate-300 border-slate-700 hover:text-elden-gold hover:border-elden-gold/50'
                }`}
                title={completed ? 'Marcar como pendiente' : 'Marcar como completado'}
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline">Conseguido</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span className="hidden sm:inline">Marcar</span>
                  </>
                )}
              </button>

              {/* Botón cerrar */}
              <button
                id="modal-close-button"
                onClick={handleClose}
                className="p-1.5 rounded-lg bg-elden-800 hover:bg-elden-750 text-slate-400 hover:text-white border border-slate-700 transition"
                title="Cerrar modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar text-slate-200">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-elden-gold">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm font-serif tracking-wider text-slate-300">
                Consultando pergaminos de EliteGuías...
              </p>
            </div>
          ) : (
            <>
              {/* Galería de imágenes e ilustración */}
              {currentImage && (
                <div className="bg-elden-950/70 border border-slate-800 rounded-xl p-3 flex flex-col items-center">
                  <div className="relative group max-h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={currentImage}
                      alt={currentItem.name}
                      referrerPolicy="no-referrer"
                      className="max-h-[260px] w-auto object-contain rounded-lg shadow-lg border border-slate-700/50 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Miniaturas si hay más de una imagen */}
                  {data?.images && data.images.length > 1 && (
                    <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full pb-1 no-scrollbar">
                      {data.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition ${
                            activeImageIndex === idx
                              ? 'border-elden-gold shadow-gold-glow scale-105'
                              : 'border-slate-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Lore / Descripción dentro del juego */}
              {data?.lore && (
                <div className="relative p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-elden-950 to-amber-950/20 border-l-4 border-elden-gold border border-slate-800/80 shadow-inner">
                  <p className="text-xs uppercase tracking-widest font-mono text-elden-gold/80 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-elden-gold" /> Descripción en el juego
                  </p>
                  <p className="font-serif italic text-sm sm:text-base text-amber-200/90 whitespace-pre-line leading-relaxed">
                    {data.lore}
                  </p>
                </div>
              )}

              {/* Introducción / Localización rápida */}
              {data?.intro && data.intro.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-elden-gold" /> Localización y Obtención
                  </h3>
                  <div className="space-y-2 text-sm sm:text-[15px] leading-relaxed text-slate-300">
                    {data.intro.map((p, idx) => {
                      const matchedInIntro = matchItemInLine(p);
                      return (
                        <div
                          key={idx}
                          className="bg-elden-950/50 p-2.5 rounded-lg border border-slate-800/70 space-y-2"
                        >
                          <p>{p}</p>
                          {matchedInIntro && (
                            <LinkedItemBadge
                              item={matchedInIntro}
                              isCompleted={isCompletado(matchedInIntro.id)}
                              onToggle={toggleCompletado}
                              onSelect={handleNavigateToItem}
                              display="card"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Secciones detalladas (Efectos, Estadísticas, Recompensas con Ítems Vinculados) */}
              {data?.sections && data.sections.length > 0 && (
                <div className="space-y-4 pt-1">
                  {data.sections.map((section, sIdx) => {
                    const isReward =
                      section.heading.toLowerCase().includes('recompensa') ||
                      section.heading.toLowerCase().includes('recomspensa');

                    const displayHeading = isReward ? 'Recompensas' : section.heading;

                    return (
                      <div
                        key={sIdx}
                        className="bg-elden-950/70 border border-slate-800 rounded-xl p-4 shadow-sm"
                      >
                        <h4 className="text-sm sm:text-base font-serif font-bold text-elden-gold mb-2.5 flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                          <BookOpen className="w-4 h-4 text-elden-gold" />
                          <span>{displayHeading}</span>
                        </h4>

                        {/* Líneas de la sección con detección de ítems vinculados */}
                        <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
                          {section.lines?.map((line, lIdx) => {
                            const matchedItem = matchItemInLine(line);

                            // Si es un ítem del compendio (ej. "Llama del dios caído", "Gran Runa", armas, etc.)
                            if (matchedItem) {
                              return (
                                <LinkedItemBadge
                                  key={lIdx}
                                  item={matchedItem}
                                  isCompleted={isCompletado(matchedItem.id)}
                                  onToggle={toggleCompletado}
                                  onSelect={handleNavigateToItem}
                                  display="card"
                                />
                              );
                            }

                            // Línea de texto estándar
                            const isBullet = line.startsWith('-') || line.startsWith('•');
                            return (
                              <p
                                key={lIdx}
                                className={
                                  isBullet
                                    ? 'pl-3 border-l-2 border-amber-600/40 text-slate-200 font-mono text-[13px] py-0.5'
                                    : 'py-0.5'
                                }
                              >
                                {line}
                              </p>
                            );
                          })}
                        </div>

                        {/* Imágenes dentro de la sección */}
                        {section.images && section.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800/60">
                            {section.images.map((secImg, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={secImg}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="w-full h-auto max-h-48 object-cover rounded-lg border border-slate-700/60"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Pie del modal con botón directo a la guía original y toggle */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-elden-950 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center justify-between sm:justify-start gap-2 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-elden-gold" />
              <span>
                Guía oficial: <strong className="text-slate-300">EliteGuías</strong>
              </span>
            </div>

            {/* En móvil: botón rápido de toggle también en el footer */}
            <button
              onClick={() => toggleCompletado(currentItem.id)}
              className={`sm:hidden px-3 py-1.5 rounded-lg font-serif text-xs font-semibold flex items-center gap-1.5 transition border ${
                completed
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                  : 'bg-elden-900 text-slate-300 border-slate-700'
              }`}
            >
              {completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{completed ? 'Conseguido' : 'Marcar'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              id={`modal-source-link-${currentItem.id}`}
              href={currentItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-4 py-2 sm:py-1.5 rounded-xl sm:rounded-lg bg-elden-gold text-elden-950 font-serif font-bold hover:bg-amber-300 transition flex items-center justify-center gap-1.5 shadow-gold-glow"
            >
              <span>Ver en EliteGuías</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
