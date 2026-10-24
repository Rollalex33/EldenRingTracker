import React, { useState, useRef } from 'react';
import { Modal } from './Modal';
import { useTrackerStore } from '../../store/useTrackerStore';
import {
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  FileJson,
  Database,
  Trash2,
  Info,
} from 'lucide-react';

/**
 * Modal de Configuración y Copia de Seguridad
 * Permite exportar/importar partida en formato JSON y reiniciar el progreso con confirmación
 */
export const SettingsModal = ({ isOpen = true, onClose }) => {
  const {
    itemsCompletados,
    locations,
    questlines,
    exportarProgreso,
    importarProgreso,
    reiniciarProgreso,
  } = useTrackerStore();

  const fileInputRef = useRef(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calcular estadísticas rápidas
  const totalLocations = locations.length;
  const completedLocations = locations.filter((l) => itemsCompletados.has(l.id)).length;
  const totalQuestSteps = questlines.reduce((acc, q) => acc + q.pasos.length, 0);
  const completedQuestSteps = questlines.reduce(
    (acc, q) => acc + q.pasos.filter((p) => itemsCompletados.has(p.pasoId)).length,
    0
  );

  const handleExport = () => {
    try {
      const data = exportarProgreso();
      setFeedback({
        type: 'success',
        message: `¡Progreso exportado con éxito! Se guardaron ${data.totalCompletados} elementos en elden_ring_progress.json`,
      });
      setShowResetConfirm(false);
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'No se pudo generar el archivo de respaldo: ' + err.message,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const res = importarProgreso(text);
        if (res.success) {
          setFeedback({
            type: 'success',
            message: `¡Partida restaurada con éxito! Se importaron ${res.count} registros (Fecha de respaldo: ${res.fechaExportacion}).`,
          });
          setShowResetConfirm(false);
        } else {
          setFeedback({
            type: 'error',
            message: res.error || 'El archivo seleccionado no es válido.',
          });
        }
      } catch (err) {
        setFeedback({
          type: 'error',
          message: 'Error al leer el archivo: ' + err.message,
        });
      }
      // Reset input value to allow selecting same file again
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.onerror = () => {
      setFeedback({
        type: 'error',
        message: 'Error al abrir el archivo en el navegador.',
      });
    };

    reader.readAsText(file);
  };

  const handleReset = () => {
    reiniciarProgreso();
    setShowResetConfirm(false);
    setFeedback({
      type: 'success',
      message: 'Se ha reiniciado todo el progreso de la partida.',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setFeedback(null);
        setShowResetConfirm(false);
        onClose();
      }}
      title="Ajustes y Copia de Seguridad"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5 text-slate-200">
        {/* Banner de Feedback si existe */}
        {feedback && (
          <div
            className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs animate-fade-in ${
              feedback.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/70 border-red-500/50 text-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-relaxed">{feedback.message}</div>
          </div>
        )}

        {/* Resumen de Estado de la Partida */}
        <div className="p-3.5 rounded-xl bg-elden-950/80 border border-elden-border">
          <h3 className="font-serif text-xs font-bold text-elden-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-elden-gold" />
            Estado Actual de la Partida
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 rounded-lg bg-elden-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Marcadores del Mapa</span>
              <strong className="text-white font-mono text-sm">
                {completedLocations} / {totalLocations}
              </strong>
            </div>
            <div className="p-2 rounded-lg bg-elden-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Pasos de Misiones</span>
              <strong className="text-white font-mono text-sm">
                {completedQuestSteps} / {totalQuestSteps}
              </strong>
            </div>
          </div>
        </div>

        {/* Sección: Exportar e Importar Backup */}
        <div className="space-y-3">
          <h3 className="font-serif text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileJson className="w-3.5 h-3.5 text-elden-gold" />
            Gestión de Archivos de Respaldo (JSON)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Tarjeta Exportar */}
            <div className="p-3.5 rounded-xl bg-elden-850 border border-elden-border hover:border-elden-gold/40 transition flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-slate-100 mb-1 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-elden-gold" />
                  Exportar Partida
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Descarga un archivo <code>elden_ring_progress.json</code> con tus hitos y checkboxes.
                </p>
              </div>
              <button
                onClick={handleExport}
                className="w-full py-2 px-3 rounded-lg text-xs font-serif font-bold bg-elden-800 hover:bg-elden-700 text-elden-gold border border-elden-gold/40 hover:border-elden-gold shadow-gold-glow transition flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Partida (JSON)</span>
              </button>
            </div>

            {/* Tarjeta Importar */}
            <div className="p-3.5 rounded-xl bg-elden-850 border border-elden-border hover:border-elden-gold/40 transition flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-slate-100 mb-1 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  Importar Partida
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Restaura tu progreso desde un archivo JSON previamente exportado.
                </p>
              </div>

              {/* Input de archivo oculto */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 rounded-lg text-xs font-serif font-bold bg-elden-800 hover:bg-elden-700 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/50 transition flex items-center justify-center gap-2"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Importar Partida (JSON)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Zona de Peligro: Reinicio Total */}
        <div className="pt-3 border-t border-slate-800">
          <div className="p-3.5 rounded-xl bg-red-950/25 border border-red-500/30 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-serif font-bold text-xs text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                Zona de Peligro
              </h4>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Borra todos los checkboxes de misiones y marcadores completados. Esta acción no se puede deshacer a menos que tengas un backup.
            </p>

            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-serif font-semibold bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/50 transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Reiniciar Todo el Progreso</span>
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500 text-xs space-y-2 animate-fade-in">
                <p className="text-red-100 font-semibold">
                  ¿Estás completamente seguro de borrar todo tu progreso?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold transition text-xs shadow-sm"
                  >
                    Sí, reiniciar partida
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 rounded bg-elden-800 hover:bg-elden-700 text-slate-300 transition text-xs border border-slate-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
