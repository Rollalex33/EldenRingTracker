import React, { useState } from 'react';
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
} from 'lucide-react';

export function BloodborneItemDetailModal({
  item,
  isOpen,
  onClose,
  isDone,
  onToggle,
}) {
  const [activeForm, setActiveForm] = useState(1);

  if (!isOpen || !item) return null;

  const hasForms = item.form1 || item.form2;
  const currentForm = activeForm === 1 ? item.form1 || item : item.form2 || item;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] bg-gradient-to-b from-[#140a10] via-[#0d070b] to-[#070407] border border-rose-900/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-rose-950/70 flex items-start justify-between gap-3 bg-black/40">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                {item.subcategory || item.category}
              </span>
              {item.expansion === 'dlc' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                  DLC Antiguos Cazadores
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-400 bg-clip-text text-transparent mt-1">
              {item.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 flex items-center justify-center text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar text-xs sm:text-sm">
          {/* Selector de Forma (Truco) */}
          {hasForms && (
            <div className="bg-black/50 border border-rose-950/80 rounded-2xl p-2.5 space-y-2">
              <div className="flex items-center justify-between text-xs text-rose-300/80 font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sword className="w-3.5 h-3.5 text-rose-400" />
                  Mecanismo de Transformación con Truco
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
                <p className="text-xs text-rose-200/90 font-sans italic bg-rose-950/20 p-2 rounded-lg border border-rose-900/40">
                  ⚡ {currentForm.notes}
                </p>
              )}
            </div>
          )}

          {/* Requisitos y Escalado */}
          {item.requirements && Object.keys(item.requirements).length > 0 && (
            <div className="bg-[#120910] border border-stone-800/80 rounded-2xl p-3">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                Requisitos de Atributos
              </span>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                {['fue', 'des', 'viv', 'arc'].map((stat) => {
                  const req = item.requirements[stat];
                  const labels = { fue: 'FUE', des: 'HAB', viv: 'VIV', arc: 'ARC' };
                  return (
                    <div
                      key={stat}
                      className={`p-1.5 rounded-xl border ${
                        req
                          ? 'bg-rose-950/40 border-rose-500/40 text-rose-200 font-bold'
                          : 'bg-black/30 border-stone-800 text-stone-600'
                      }`}
                    >
                      <div className="text-[10px] text-stone-400">{labels[stat]}</div>
                      <div className="text-sm">{req || '-'}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Piezas si es un set */}
          {item.pieces && (
            <div className="bg-[#120910] border border-stone-800/80 rounded-2xl p-3 space-y-1.5">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
                Piezas del Atuendo ({item.pieces.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {item.pieces.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-black/40 border border-stone-800 text-xs text-stone-300 flex items-center gap-2"
                  >
                    <Shield className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lore / Descripción */}
          <div className="bg-black/30 border border-stone-800/60 rounded-2xl p-3.5 space-y-1.5">
            <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
              Descripción & Lore
            </span>
            <p className="text-stone-300 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>

          {/* Ubicación detallada */}
          <div className="bg-gradient-to-r from-rose-950/30 to-black/40 border border-rose-900/50 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-serif text-rose-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span>Dónde conseguir en Yharnam</span>
            </div>
            <p className="text-stone-200 font-sans leading-relaxed text-xs sm:text-sm">
              {item.location}
            </p>
          </div>
        </div>

        {/* Footer con Toggle de Estado */}
        <div className="px-5 py-3.5 border-t border-rose-950/70 bg-black/50 flex items-center justify-between gap-3">
          <a
            href={`https://www.eliteguias.com/guias/b/bb/bloodborne.php`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rose-400/80 hover:text-rose-200 font-serif flex items-center gap-1 transition"
          >
            <span>Ver guía en EliteGuías</span>
            <ExternalLink className="w-3 h-3" />
          </a>

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
                <span>Obtenido (Desmarcar)</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Marcar como Conseguido</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default BloodborneItemDetailModal;
