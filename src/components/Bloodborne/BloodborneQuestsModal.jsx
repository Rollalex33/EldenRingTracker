import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Award,
  Eye,
  AlertTriangle,
  Users,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { REFUGEE_CHOICES, INSIGHT_THRESHOLDS } from '../../data/bloodborneData';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';

export function BloodborneQuestsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('cords'); // 'cords' | 'refugees' | 'insight'
  const [cordsDone, setCordsDone] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_umbilical_cords');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const cordItems = bloodborneCatalog.items.filter((i) => i.category === 'cordones');

  const toggleCord = (id) => {
    setCordsDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('bb_umbilical_cords', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const cordsCount = Object.values(cordsDone).filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div
      id="bb-quests-modal-overlay"
      className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'bb-quests-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#09080c] border border-rose-500/40 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl shadow-rose-950/50 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#12070c] to-[#070508] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <BookOpen className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-black tracking-wide bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  Secretos, Cordones & Refugiados
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold">
                  GUÍA DE HISTORIAS
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Consigue el Final Verdadero consumiendo 3 Cordones y protege a los supervivientes de Yharnam
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

        {/* Selector de Pestañas */}
        <div className="bg-black/60 border-b border-stone-800 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('cords')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 ${
              activeTab === 'cords'
                ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>4 Tercios de Cordón ({cordsCount}/4)</span>
          </button>

          <button
            onClick={() => setActiveTab('refugees')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 ${
              activeTab === 'refugees'
                ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Refugio: Capilla vs Clínica</span>
          </button>

          <button
            onClick={() => setActiveTab('insight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition flex items-center gap-1.5 ${
              activeTab === 'insight'
                ? 'bg-rose-500 text-stone-950 shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                : 'text-stone-300 hover:text-rose-200 hover:bg-stone-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Efectos de la Lucidez (0 - 99)</span>
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4">
          {activeTab === 'cords' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-xs font-sans text-rose-200 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Para desbloquear el combate contra la Presencia Lunar y el Final Secreto:</strong> Debes consumir (usar en tu inventario) <strong>al menos 3</strong> de estos cordones antes de responder a Gehrman en el jardín del Sueño del Cazador.
                </p>
              </div>

              <div className="space-y-3">
                {cordItems.map((cord) => {
                  const isDone = !!cordsDone[cord.id];
                  return (
                    <div
                      key={cord.id}
                      onClick={() => toggleCord(cord.id)}
                      className={`p-4 rounded-2xl border transition cursor-pointer select-none ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                          : 'bg-[#0d090f] border-stone-800 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone-600 flex-shrink-0" />
                          )}
                          <span className="font-serif font-bold text-sm text-stone-100">
                            {cord.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase text-stone-400">
                          {isDone ? 'Conseguido' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 font-sans mt-2 pl-6 leading-relaxed">
                        {cord.description}
                      </p>
                      <div className="text-[11px] font-mono text-rose-300/80 mt-1 pl-6">
                        Ubicación: {cord.location}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'refugees' && (
            <div className="space-y-3">
              {REFUGEE_CHOICES.map((r, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0d090f] border border-stone-800 space-y-2 text-xs font-sans"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-sm text-rose-200">{r.name}</h3>
                    <span className="text-[10px] font-mono text-stone-400">{r.location}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800/80">
                      <span className="font-serif font-bold text-emerald-300 block mb-1">
                        Si lo envías a la Capilla de Oedon:
                      </span>
                      <p className="text-stone-300">{r.oedonReward}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-stone-800/80">
                      <span className="font-serif font-bold text-sky-300 block mb-1">
                        Si lo envías a la Clínica de Iosefka:
                      </span>
                      <p className="text-stone-300">{r.iosefkaReward}</p>
                    </div>
                  </div>

                  {r.warning && (
                    <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 font-serif text-[11px]">
                      {r.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'insight' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#0d090f] border border-stone-800 text-xs font-sans text-stone-300">
                La <strong>Lucidez</strong> representa el conocimiento sobrenatural y los ojos que tu mente posee.
                Afecta directamente el mundo del juego y la percepción de criaturas del plano astral.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INSIGHT_THRESHOLDS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0b080d] border border-stone-800 flex items-start gap-3"
                  >
                    <div className="px-2 py-1 rounded bg-rose-950/80 border border-rose-500/40 font-mono text-xs font-bold text-rose-300 flex-shrink-0">
                      {item.level} {typeof item.level === 'number' ? 'Lucidez' : ''}
                    </div>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed">
                      {item.effect}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pie */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Bloodborne Questlines & Eldritch Secrets</span>
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

export default BloodborneQuestsModal;
