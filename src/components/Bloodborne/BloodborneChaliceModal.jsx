import React, { useState } from 'react';
import {
  X,
  Flame,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { CHALICE_ROUTE_STEPS, POPULAR_GLYPHS } from '../../data/bloodborneData';

export function BloodborneChaliceModal({ isOpen, onClose }) {
  const [copiedGlyph, setCopiedGlyph] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_chalice_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleStep = (stepNum) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [stepNum]: !prev[stepNum] };
      try {
        localStorage.setItem('bb_chalice_steps', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCopy = (glyph) => {
    navigator.clipboard?.writeText(glyph);
    setCopiedGlyph(glyph);
    setTimeout(() => setCopiedGlyph(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="bb-chalice-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-chalice-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#12070c] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Ruta de Cálices al Platino & Glifos
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  REINA YHARNAM
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                La ruta más corta garantizada para llegar a la Reina Pthumeria sin desviaciones innecesarias
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition active:scale-95"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
          {/* Ruta de 6 pasos al Platino */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-rose-400" />
                <span>Ruta Mínima de Mazmorras de la Raíz al Trofeo de Oro</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {Object.values(completedSteps).filter(Boolean).length} / {CHALICE_ROUTE_STEPS.length} cálices
              </span>
            </div>

            <div className="space-y-3">
              {CHALICE_ROUTE_STEPS.map((s) => {
                const isDone = !!completedSteps[s.step];
                return (
                  <div
                    key={s.step}
                    onClick={() => toggleStep(s.step)}
                    className={`p-4 rounded-2xl border transition cursor-pointer select-none ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : s.step === 5
                        ? 'bg-rose-950/30 border-rose-500/50 shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                        : 'bg-[#0d090f] border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-600 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-serif font-bold text-sm sm:text-base text-stone-100">
                            Paso {s.step}: {s.title}
                          </div>
                          <div className="text-xs text-rose-300/80 font-mono mt-0.5">
                            Jefes: {s.bosses.join(' → ')}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-stone-800 text-stone-400 uppercase">
                        {isDone ? 'Completado' : 'Pendiente'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-sans mt-2.5 pl-8 leading-relaxed">
                      {s.loot}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Glifos Comunitarios Legendarios */}
          <div className="space-y-3">
            <span className="font-serif text-xs font-bold text-rose-300 uppercase tracking-wider block">
              Glifos Legendarios de Mazmorras de la Comunidad
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {POPULAR_GLYPHS.map((g) => (
                <div
                  key={g.glyph}
                  className="p-3.5 rounded-2xl bg-[#0b080d] border border-stone-800 flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-xs font-bold text-stone-100">{g.name}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(g.glyph)}
                        className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-mono flex items-center gap-1 active:scale-90 transition"
                      >
                        {copiedGlyph === g.glyph ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{g.glyph}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 font-sans mt-2 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Ruta verificada de Cálices de Pthumeru y Afligido Loran</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default BloodborneChaliceModal;
