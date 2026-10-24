import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { EldenMap } from './components/Map/EldenMap';
import { QuestlineGuide } from './components/Guide';
import { ChecklistCompendium } from './components/Checklist/ChecklistCompendium';
import { useTrackerStore } from './store/useTrackerStore';
import {
  BookOpen,
  Filter,
  HelpCircle,
  Sparkles,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ListChecks,
  Trophy,
  Scale,
} from 'lucide-react';
import Modal from './components/UI/Modal';
import SettingsModal from './components/UI/SettingsModal';
import { EquipLoadModal } from './components/Calculator/EquipLoadModal';
import { PlatinumModal } from './components/Platinum/PlatinumModal';

/**
 * Layout Principal con Split-Screen UI y Modo Checklist Compendio
 */
export function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'filters'
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEquipLoadOpen, setIsEquipLoadOpen] = useState(false);
  const [isPlatinumOpen, setIsPlatinumOpen] = useState(false);

  const {
    itemsCompletados,
    questlines,
    selectedQuestlineId,
    locations,
    soloPerdibles,
    viewMode,
    setViewMode,
  } = useTrackerStore();

  const isHelpRef = useRef(isHelpOpen);
  isHelpRef.current = isHelpOpen;
  const isSettingsRef = useRef(isSettingsOpen);
  isSettingsRef.current = isSettingsOpen;
  const isEquipLoadRef = useRef(isEquipLoadOpen);
  isEquipLoadRef.current = isEquipLoadOpen;
  const isPlatinumRef = useRef(isPlatinumOpen);
  isPlatinumRef.current = isPlatinumOpen;

  // Interceptar navegación atrás cuando se está en la vista de Mapa
  useEffect(() => {
    if (viewMode !== 'map') return;

    if (window.history.state?.erApp !== 'map') {
      window.history.pushState({ erApp: 'map' }, '');
    }

    const handleMapPop = () => {
      if (isHelpRef.current) {
        setIsHelpOpen(false);
        return;
      }
      if (isSettingsRef.current) {
        setIsSettingsOpen(false);
        return;
      }
      if (isEquipLoadRef.current) {
        setIsEquipLoadOpen(false);
        return;
      }
      if (isPlatinumRef.current) {
        setIsPlatinumOpen(false);
        return;
      }
      setViewMode('checklist');
    };

    window.addEventListener('popstate', handleMapPop);
    return () => window.removeEventListener('popstate', handleMapPop);
  }, [viewMode, setViewMode]);

  const handleReturnToChecklist = () => {
    if (window.history.state?.erApp === 'map') {
      window.history.back();
    } else {
      setViewMode('checklist');
    }
  };

  const openHelp = () => {
    setIsHelpOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'modal-help' }, '');
    }
  };
  const closeHelp = () => {
    setIsHelpOpen(false);
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal-help') {
      window.history.back();
    }
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'modal-settings' }, '');
    }
  };
  const closeSettings = () => {
    setIsSettingsOpen(false);
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal-settings') {
      window.history.back();
    }
  };

  const openEquipLoad = () => {
    setIsEquipLoadOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'modal-equipload' }, '');
    }
  };
  const closeEquipLoad = () => {
    setIsEquipLoadOpen(false);
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal-equipload') {
      window.history.back();
    }
  };

  const openPlatinum = () => {
    setIsPlatinumOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'modal-platinum' }, '');
    }
  };
  const closePlatinum = () => {
    setIsPlatinumOpen(false);
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal-platinum') {
      window.history.back();
    }
  };

  // Si el usuario está en modo Checklist Compendio, renderizar la vista dedicada
  if (viewMode === 'checklist') {
    return <ChecklistCompendium />;
  }

  // Contadores para badges en las pestañas
  const activeQuest =
    questlines.find((q) => q.id === selectedQuestlineId) || questlines[0];
  const activeQuestPasosDone = activeQuest
    ? activeQuest.pasos.filter((p) => itemsCompletados.has(p.pasoId)).length
    : 0;

  return (
    <div className="flex h-screen w-screen bg-elden-950 overflow-hidden font-sans text-slate-100 bg-grace-atmosphere relative">
      {/* Backdrop en pantallas pequeñas para cerrar el panel al tocar fuera */}
      {isPanelOpen && (
        <div
          onClick={() => setIsPanelOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-35 md:hidden transition-opacity"
        />
      )}

      {/* 1. Panel Izquierdo / Desplegable (Split-Screen Sidebar) */}
      <aside
        className={`h-full flex flex-col z-40 transition-all duration-300 ease-in-out border-r border-elden-border bg-elden-900 shadow-2xl fixed md:relative inset-y-0 left-0 max-w-[90vw] md:max-w-none ${
          isPanelOpen
            ? 'w-full sm:w-[420px] md:w-[460px] lg:w-[480px] opacity-100 translate-x-0'
            : 'w-0 sm:w-0 overflow-hidden opacity-0 -translate-x-full md:translate-x-0 pointer-events-none'
        }`}
      >
        {/* Barra superior de navegación por pestañas dentro del Panel */}
        <div className="px-3 pt-3 pb-2 bg-elden-950 border-b border-elden-border flex items-center justify-between gap-2">
          {/* Selector de pestañas: Guía vs Filtros */}
          <div className="flex bg-elden-900 p-1 rounded-lg border border-slate-800 flex-1 max-w-[340px]">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-serif font-bold transition ${
                activeTab === 'guide'
                  ? 'bg-elden-gold text-elden-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guía de Quests</span>
              {activeQuest && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === 'guide'
                      ? 'bg-elden-950/20 text-elden-950'
                      : 'bg-elden-800 text-slate-400'
                  }`}
                >
                  {activeQuestPasosDone}/{activeQuest.pasos.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('filters')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-serif font-bold transition ${
                activeTab === 'filters'
                  ? 'bg-elden-gold text-elden-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros y Mapa</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'filters'
                    ? 'bg-elden-950/20 text-elden-950'
                    : 'bg-elden-800 text-slate-400'
                }`}
              >
                {locations.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Botón rápido de Ajustes / Backup en el header del panel */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded-lg bg-elden-850 hover:bg-elden-800 text-slate-400 hover:text-elden-gold border border-slate-700/60 transition"
              title="Ajustes y Copia de Seguridad"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Botón para colapsar el panel izquierdo */}
            <button
              onClick={() => setIsPanelOpen(false)}
              className="p-1.5 rounded-lg bg-elden-850 hover:bg-elden-800 text-slate-400 hover:text-elden-gold border border-slate-700/60 transition"
              title="Ocultar panel lateral (Modo Mapa Completo)"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido dinámico del panel izquierdo según la pestaña activa */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'guide' ? <QuestlineGuide /> : <Sidebar />}
        </div>
      </aside>

      {/* 2. Panel Principal: Mapa Leaflet abarcando todo el espacio restante */}
      <main className="flex-1 relative h-full min-w-0 bg-elden-950">
        <EldenMap
          isPanelOpen={isPanelOpen}
          onOpenPanel={() => setIsPanelOpen(true)}
        />

        {/* Controles flotantes en la esquina superior derecha */}
        <div className="absolute top-4 right-4 z-[500] flex items-center gap-1.5 sm:gap-2">
          {/* Botón para ir al Compendio / Checklist */}
          <button
            id="map-view-to-checklist-btn"
            onClick={handleReturnToChecklist}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-serif font-bold border transition backdrop-blur flex items-center gap-1.5 sm:gap-2 shadow-gold-glow bg-elden-900/95 text-amber-200 border-elden-gold hover:bg-elden-850 hover:text-white"
            title="Ir al Checklist de EliteGuías (2,758 ítems)"
          >
            <ListChecks className="w-4 h-4 text-elden-gold" />
            <span className="hidden sm:inline">Checklist Guía</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-elden-950/40 text-elden-gold border border-elden-gold/30">
              {itemsCompletados.size}
            </span>
          </button>

          {/* Botón rápido para alternar pestañas si el panel está abierto, o abrirlo directamente */}
          <button
            onClick={() => {
              if (!isPanelOpen) {
                setIsPanelOpen(true);
                setActiveTab('guide');
              } else {
                setActiveTab(activeTab === 'guide' ? 'filters' : 'guide');
              }
            }}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-serif font-bold border transition backdrop-blur flex items-center gap-1.5 sm:gap-2 shadow-gold-glow bg-elden-900/90 text-slate-200 border-elden-gold/40 hover:bg-elden-800 hover:text-white"
            title={activeTab === 'guide' ? 'Cambiar a Filtros' : 'Cambiar a Guía'}
          >
            {activeTab === 'guide' ? (
              <>
                <Filter className="w-3.5 h-3.5 text-elden-gold" />
                <span className="hidden md:inline">Ver Filtros</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-elden-gold" />
                <span className="hidden md:inline">Ver Guía</span>
              </>
            )}
          </button>

          {/* Botón de Platino */}
          <button
            onClick={openPlatinum}
            className="p-2 sm:px-2.5 sm:py-2 bg-elden-900/90 hover:bg-elden-850 text-amber-300 hover:text-white border border-amber-500/40 hover:border-elden-gold rounded-lg shadow-gold-glow backdrop-blur transition flex items-center gap-1.5 text-xs font-serif active:scale-95"
            title="Salón del Platino & Rastreador de Recuerdos"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Platino</span>
          </button>

          {/* Botón de Carga de Equipo / Fat Roll */}
          <button
            onClick={openEquipLoad}
            className="p-2 sm:px-2.5 sm:py-2 bg-elden-900/90 hover:bg-elden-850 text-slate-300 hover:text-elden-gold border border-elden-gold/30 rounded-lg shadow-gold-glow backdrop-blur transition flex items-center gap-1.5 text-xs font-serif active:scale-95"
            title="Calculadora de Carga de Equipo y Rodamiento (Fat Roll)"
          >
            <Scale className="w-4 h-4 text-elden-gold" />
            <span className="hidden sm:inline">Carga</span>
          </button>

          {/* Botón de Ajustes y Backup (JSON) */}
          <button
            onClick={openSettings}
            className="p-2 sm:px-2.5 sm:py-2 bg-elden-900/90 hover:bg-elden-850 text-slate-300 hover:text-elden-gold border border-elden-gold/30 rounded-lg shadow-gold-glow backdrop-blur transition flex items-center gap-1.5 text-xs font-serif"
            title="Ajustes y Copia de Seguridad (JSON)"
          >
            <Settings className="w-4 h-4 text-elden-gold" />
            <span className="hidden sm:inline">Ajustes</span>
          </button>

          {/* Botón de Ayuda e Información */}
          <button
            onClick={openHelp}
            className="p-2 sm:px-2.5 sm:py-2 bg-elden-900/90 hover:bg-elden-800 text-slate-300 hover:text-elden-gold border border-elden-gold/30 rounded-lg shadow-gold-glow backdrop-blur transition flex items-center gap-1.5 text-xs font-serif"
            title="Información y ayuda"
          >
            <HelpCircle className="w-4 h-4 text-elden-gold" />
            <span className="hidden sm:inline">Ayuda</span>
          </button>
        </div>
      </main>

      {/* Modal de Configuración y Backup (JSON) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={closeSettings}
      />

      {/* Modal Informativo */}
      <Modal
        isOpen={isHelpOpen}
        onClose={closeHelp}
        title="Acerca del Elden Ring Interactive Tracker"
      >
        <div className="space-y-3 leading-relaxed text-slate-200">
          <p>
            Bienvenido al <strong>Interactive Tracker de Elden Ring</strong> con interfaz Split-Screen y sincronización bidireccional entre la guía oficial de <em>EliteGuías</em> y el mapa interactivo de <em>The Lands Between</em>.
          </p>

          <div className="bg-elden-950 p-3 rounded-lg border border-elden-border space-y-2 text-xs">
            <h4 className="font-serif font-bold text-elden-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Funcionalidades clave:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
              <li>
                <strong>Sincronización Bidireccional:</strong> Pulsa <em>"Ver en el mapa"</em> en cualquier paso para que la cámara del mapa ejecute un vuelo suave (<code>flyTo</code>) hacia las coordenadas exactas.
              </li>
              <li>
                <strong>Filtro "Solo Perdibles":</strong> Activa el switch para aislar únicamente los pasos con riesgo de bloqueo que aún no has completado.
              </li>
              <li>
                <strong>Copia de Seguridad JSON:</strong> Exporta o importa tu partida en cualquier momento desde el menú de Ajustes ⚙️.
              </li>
              <li>
                <strong>Persistencia Automática:</strong> Almacenamiento continuo en <code>localStorage</code> gracias al middleware de Zustand.
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      {/* Modal de Calculadora de Carga de Equipo y Rodamiento */}
      <EquipLoadModal
        isOpen={isEquipLoadOpen}
        onClose={closeEquipLoad}
      />

      {/* Modal del Salón del Platino y Recuerdos */}
      <PlatinumModal
        isOpen={isPlatinumOpen}
        onClose={closePlatinum}
        onOpenItem={() => {}}
      />
    </div>
  );
}

export default App;
