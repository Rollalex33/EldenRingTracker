import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sword,
  Shield,
  Sparkles,
  MapPin,
  Flame,
  Award,
  Zap,
  Loader2,
  Info,
  Crosshair,
  Layers,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import { normalizeStr } from '../../utils/gameOrder';

export function BloodborneItemDetailModal({
  item,
  isOpen,
  onClose,
  isDone,
  onToggle,
}) {
  const [activeForm, setActiveForm] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!item || !isOpen) {
      setData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setActiveImageIndex(0);

    const loadGuideData = async () => {
      const fileKey = item.fileKey || `${item.id}.php`;
      const cleanKey = fileKey.replace(/[^a-zA-Z0-9_\-\.]/g, '');

      // 1. Cargar desde la caché estática pregenerada en public/guide-cache
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
      } catch (err) {}

      // 2. Fallback vía API de Vite
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
      } catch (err) {}

      // 3. Fallback con datos directos del ítem
      if (isMounted) {
        setData({
          title: item.name,
          originalUrl: item.url,
          images: item.image ? [item.image] : [],
          lore: item.description || '',
          intro: item.location ? [item.location] : ['Consulta la guía completa de Bloodborne en EliteGuías.'],
          sections: [],
        });
        setLoading(false);
      }
    };

    loadGuideData();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const hasForms = item.form1 || item.form2;
  const currentForm = activeForm === 1 ? item.form1 || item : item.form2 || item;

  // Extraer secciones de la guía
  const sections = data?.sections || [];
  const reqSection = sections.find((s) => s.heading.toLowerCase().includes('requisitos'));
  const bonSection = sections.find((s) => s.heading.toLowerCase().includes('bonificaci'));
  const statSection = sections.find((s) =>
    s.heading.toLowerCase().includes('estadístic') ||
    s.heading.toLowerCase().includes('estadistic') ||
    s.heading.toLowerCase().includes('característic') ||
    s.heading.toLowerCase().includes('ataque especial')
  );
  const locSection = sections.find((s) =>
    s.heading.toLowerCase().includes('localiz') ||
    s.heading.toLowerCase().includes('dónde') ||
    s.heading.toLowerCase().includes('recompensa') ||
    s.heading.toLowerCase().includes('utilidad')
  );
  const otherSections = sections.filter(
    (s) => s !== reqSection && s !== bonSection && s !== statSection && s !== locSection
  );

  const { character_bb, equipItemBB } = useTrackerStore();

  const getEquipSlot = () => {
    if (!item) return null;
    if (item.category === 'armas_truco') return 'trickWeapon1';
    if (item.category === 'armas_fuego') return 'firearm1';
    if (item.category === 'runas') return 'carylRunes';
    if (item.category === 'atuendos') {
      const sub = normalizeStr(item.subcategory || '');
      const nm = normalizeStr(item.name || '');
      if (sub.includes('cabeza') || nm.includes('sombrero') || nm.includes('capucha') || nm.includes('mascara') || nm.includes('casco') || nm.includes('venda')) return 'attireHead';
      if (sub.includes('pecho') || nm.includes('atuendo') || nm.includes('chaqueta') || nm.includes('abrigo') || nm.includes('armadura') || nm.includes('tunica') || nm.includes('haori') || nm.includes('traje')) return 'attireChest';
      if (sub.includes('manos') || nm.includes('guantes') || nm.includes('brazaletes')) return 'attireHands';
      if (sub.includes('piernas') || nm.includes('pantalones') || nm.includes('botas') || nm.includes('faldas') || nm.includes('hakama')) return 'attireLegs';
      return 'attireChest';
    }
    return null;
  };

  const equipSlot = getEquipSlot();
  const equipped = character_bb?.equipped || {};
  const isCurrentlyEquipped = equipSlot && (
    equipSlot === 'carylRunes'
      ? (equipped.carylRunes || []).some((r) => r?.id === item.id)
      : equipped[equipSlot]?.id === item.id
  );

  const images = (data?.images && data.images.length > 0) ? data.images : (item.image ? [item.image] : []);
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] bg-gradient-to-b from-[#160a12] via-[#0d070b] to-[#070407] border border-rose-900/60 rounded-3xl shadow-2xl shadow-rose-950/40 flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gótico */}
        <div className="px-5 py-4 border-b border-rose-950/80 flex items-start justify-between gap-3 bg-black/50">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                {item.categoryName || item.subcategory || item.category}
              </span>
              {item.isDlc || item.expansion === 'dlc' ? (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                  DLC Antiguos Cazadores
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-400 border border-stone-800">
                  Juego Base
                </span>
              )}
              {isDone ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Conseguido
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900/80 text-stone-400 border border-stone-800 flex items-center gap-1">
                  <Circle className="w-3 h-3 text-stone-500" /> Pendiente
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-400 bg-clip-text text-transparent">
              {data?.title || item.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 flex items-center justify-center text-stone-400 hover:text-stone-100 transition active:scale-95 flex-shrink-0"
            title="Cerrar modal (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar text-xs sm:text-sm">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-rose-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm font-serif tracking-wider text-rose-200">
                Consultando manuscritos de Byrgenwerth...
              </p>
            </div>
          ) : (
            <>
              {/* Imagen principal y galería */}
              {currentImage && (
                <div className="bg-black/60 border border-rose-950/60 rounded-2xl p-3 flex flex-col items-center justify-center">
                  <div className="relative max-h-56 flex items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={currentImage}
                      alt={item.name}
                      className="max-h-52 w-auto object-contain rounded-lg drop-shadow-[0_4px_16px_rgba(225,29,72,0.25)] transition hover:scale-105 duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-12 h-12 rounded-xl border overflow-hidden p-0.5 transition ${
                            activeImageIndex === idx
                              ? 'border-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.4)]'
                              : 'border-stone-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Selector de Forma (Truco) si existe */}
              {hasForms && (
                <div className="bg-black/50 border border-rose-950/80 rounded-2xl p-3 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-rose-300/90 font-mono">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Sword className="w-3.5 h-3.5 text-rose-400" />
                      Mecanismo con Truco (Transformación)
                    </span>
                    <span className="text-[11px] text-stone-400">Pulsa L1</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveForm(1)}
                      className={`py-2 px-3 rounded-xl border font-serif text-xs font-bold transition ${
                        activeForm === 1
                          ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                          : 'bg-black/30 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Forma 1: {item.form1?.mode || 'Normal'}
                    </button>
                    <button
                      onClick={() => setActiveForm(2)}
                      className={`py-2 px-3 rounded-xl border font-serif text-xs font-bold transition ${
                        activeForm === 2
                          ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                          : 'bg-black/30 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Forma 2: {item.form2?.mode || 'Transformada'}
                    </button>
                  </div>

                  {currentForm.notes && (
                    <p className="text-xs text-rose-200/90 font-sans italic bg-rose-950/30 p-2.5 rounded-xl border border-rose-900/40">
                      ⚡ {currentForm.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Requisitos y Escalado */}
              {(item.requirements || item.scaling || reqSection || bonSection) && (
                <div className="bg-[#110910] border border-rose-950/60 rounded-2xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-rose-400" />
                      Atributos & Escalado
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    {[
                      { key: 'fue', label: 'FUE', name: 'Fuerza' },
                      { key: 'des', label: 'HAB', name: 'Habilidad' },
                      { key: 'viv', label: 'VIV', name: 'Viveza de Sangre' },
                      { key: 'arc', label: 'ARC', name: 'Arcano' },
                    ].map((st) => {
                      const req = item.requirements?.[st.key];
                      const sc = item.scaling?.[st.key];
                      return (
                        <div
                          key={st.key}
                          className={`p-2 rounded-xl border flex flex-col justify-between ${
                            req || sc
                              ? 'bg-rose-950/40 border-rose-500/50 text-rose-100 shadow-sm'
                              : 'bg-black/40 border-stone-800/80 text-stone-600'
                          }`}
                        >
                          <div className="text-[10px] text-stone-400 font-bold">{st.label}</div>
                          <div className="text-base font-black my-0.5 text-rose-200">
                            {req || '-'}
                          </div>
                          <div className="text-[10px] font-mono text-amber-300 font-bold">
                            {sc ? `Esc: ${sc}` : '-'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Líneas detalladas de requisitos / bonificaciones si existen en la guía */}
                  {reqSection && (
                    <div className="text-xs text-stone-300 font-sans space-y-0.5 pt-1">
                      {reqSection.lines.map((l, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-stone-300">
                          <span className="text-rose-400">•</span>
                          <span>{l}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {bonSection && (
                    <div className="text-xs text-stone-300 font-sans space-y-0.5 pt-1 border-t border-rose-950/40">
                      {bonSection.lines.map((l, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-amber-200">
                          <span className="text-amber-400">✦</span>
                          <span>{l}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Estadísticas detalladas de la guía */}
              {statSection && (
                <div className="bg-black/40 border border-stone-800/80 rounded-2xl p-3.5 space-y-2">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block font-bold">
                    {statSection.heading}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs">
                    {statSection.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 px-2.5 rounded-lg bg-stone-950/70 border border-stone-800/60 text-stone-300 flex items-center justify-between"
                      >
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lore / Descripción en pergamino oscuro */}
              {(data?.lore || item.description) && (
                <div className="bg-gradient-to-br from-rose-950/20 via-black/40 to-black/60 border border-rose-900/40 rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-mono text-amber-400/90 uppercase tracking-wider block font-bold">
                    📜 Manuscrito & Lore
                  </span>
                  <p className="text-stone-300 leading-relaxed font-serif italic text-xs sm:text-sm whitespace-pre-line border-l-2 border-rose-700/60 pl-3">
                    {data?.lore || item.description}
                  </p>
                </div>
              )}

              {/* Ubicación y Dónde Conseguir */}
              <div className="bg-gradient-to-r from-rose-950/30 to-black/50 border border-rose-900/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-serif text-rose-300 font-bold">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 animate-pulse" />
                  <span>Localización & Dónde Conseguir en Yharnam</span>
                </div>
                {locSection ? (
                  <div className="space-y-1.5 font-sans text-xs sm:text-sm text-stone-200">
                    {locSection.lines.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{line}</span>
                      </div>
                    ))}
                  </div>
                ) : data?.intro?.length > 0 ? (
                  <div className="space-y-1.5 font-sans text-xs sm:text-sm text-stone-200">
                    {data.intro.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{line}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-300 font-sans text-xs sm:text-sm leading-relaxed">
                    {item.location || 'Consulta los detalles en EliteGuías.'}
                  </p>
                )}
              </div>

              {/* Otras secciones (Estrategia, drops, etc.) */}
              {otherSections.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-stone-800/70 rounded-2xl p-3.5 space-y-2"
                >
                  <span className="text-[11px] font-mono text-rose-300 uppercase tracking-wider block font-bold">
                    {sec.heading}
                  </span>
                  <div className="space-y-1 text-xs text-stone-300 font-sans leading-relaxed">
                    {sec.lines.map((l, lIdx) => (
                      <p key={lIdx}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer con Toggle de Estado y Equipar */}
        <div className="px-5 py-3.5 border-t border-rose-950/80 bg-black/60 flex flex-wrap items-center justify-between gap-2.5 flex-shrink-0">
          <a
            href={item.url || data?.originalUrl || `https://www.eliteguias.com/guias/b/bb/bloodborne.php`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rose-400/90 hover:text-rose-200 font-serif flex items-center gap-1.5 transition"
          >
            <span>Ver guía en EliteGuías</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            {equipSlot && (
              <button
                type="button"
                onClick={() => equipItemBB(equipSlot, item)}
                disabled={isCurrentlyEquipped}
                className={`px-3 py-2 rounded-xl font-serif text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
                  isCurrentlyEquipped
                    ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40 cursor-default'
                    : 'bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-500/60 shadow-md'
                }`}
              >
                {isCurrentlyEquipped ? <Check className="w-3.5 h-3.5 text-rose-400" /> : <Sword className="w-3.5 h-3.5 text-rose-300" />}
                <span>{isCurrentlyEquipped ? 'Equipado en Cazador' : 'Equipar en Cazador'}</span>
              </button>
            )}

            <button
              onClick={() => {
                onToggle(item.id);
              }}
              className={`px-4 py-2 rounded-xl font-serif text-xs font-bold transition flex items-center gap-2 active:scale-95 shadow-md ${
                isDone
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-rose-600 hover:bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
              }`}
            >
              {isDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Obtenido</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Marcar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodborneItemDetailModal;
