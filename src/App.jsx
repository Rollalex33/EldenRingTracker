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
  Compass,
  Sword,
  Home,
} from 'lucide-react';
import Modal from './components/UI/Modal';
import SettingsModal from './components/UI/SettingsModal';
import { EquipLoadModal } from './components/Calculator/EquipLoadModal';
import { PlatinumModal } from './components/Platinum/PlatinumModal';
import { AppHubMenu } from './components/UI/AppHubMenu';
import { BuildPlannerModal } from './components/Builds/BuildPlannerModal';
import { RuneCalculatorModal } from './components/Calculator/RuneCalculatorModal';
import { ProgressionRouteModal } from './components/Progression/ProgressionRouteModal';
import { FloatingQuickHUD } from './components/Navigation/FloatingQuickHUD';
import { HubHome } from './components/Hub/HubHome';
import { BloodborneHub } from './components/Bloodborne/BloodborneHub';
import { BloodborneCompendium } from './components/Bloodborne/BloodborneCompendium';
import { BloodborneRouteModal } from './components/Bloodborne/BloodborneRouteModal';
import { BloodborneBuildModal } from './components/Bloodborne/BloodborneBuildModal';
import { BloodborneEchoesModal } from './components/Bloodborne/BloodborneEchoesModal';
import { BloodborneChaliceModal } from './components/Bloodborne/BloodborneChaliceModal';
import { BloodborneQuestsModal } from './components/Bloodborne/BloodborneQuestsModal';
import { ItemDetailModal } from './components/Checklist/ItemDetailModal';
import { BloodborneItemDetailModal } from './components/Bloodborne/BloodborneItemDetailModal';
import { useAppBackHandler } from './hooks/useAppBackHandler';

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
  const [isHubMenuOpen, setIsHubMenuOpen] = useState(false);
  const [isBuildPlannerOpen, setIsBuildPlannerOpen] = useState(false);
  const [isRuneCalcOpen, setIsRuneCalcOpen] = useState(false);
  const [isProgressionOpen, setIsProgressionOpen] = useState(false);

  // Estados de Modales para Bloodborne
  const [isBBRouteOpen, setIsBBRouteOpen] = useState(false);
  const [isBBBuildOpen, setIsBBBuildOpen] = useState(false);
  const [isBBEchoesOpen, setIsBBEchoesOpen] = useState(false);
  const [isBBChaliceOpen, setIsBBChaliceOpen] = useState(false);
  const [isBBQuestsOpen, setIsBBQuestsOpen] = useState(false);

  const {
    activeGame,
    setActiveGame,
    itemsCompletados,
    itemsCompletados_bb,
    toggleCompletadoBB,
    questlines,
    selectedQuestlineId,
    locations,
    soloPerdibles,
    viewMode,
    setViewMode,
    modalItemDetalle,
    cerrarModalDetalle,
    modalItemDetalleBB,
    abrirModalDetalleBB,
    cerrarModalDetalleBB,
  } = useTrackerStore();

  const {
    openItemModal,
    closeItemModal,
    safeCloseModal,
    safeNavigateView,
    safeSwitchGame,
    toastMessage,
  } = useAppBackHandler({
    // Modales Bloodborne
    modalItemDetalleBB,
    cerrarModalDetalleBB,
    isBBRouteOpen,
    setIsBBRouteOpen,
    isBBQuestsOpen,
    setIsBBQuestsOpen,
    isBBChaliceOpen,
    setIsBBChaliceOpen,
    isBBEchoesOpen,
    setIsBBEchoesOpen,
    isBBBuildOpen,
    setIsBBBuildOpen,

    // Modales Elden Ring
    modalItemDetalle,
    cerrarModalDetalle,
    isHubMenuOpen,
    setIsHubMenuOpen,
    isBuildPlannerOpen,
    setIsBuildPlannerOpen,
    isRuneCalcOpen,
    setIsRuneCalcOpen,
    isProgressionOpen,
    setIsProgressionOpen,
    isPlatinumOpen,
    setIsPlatinumOpen,
    isEquipLoadOpen,
    setIsEquipLoadOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    isHelpOpen,
    setIsHelpOpen,

    // Vistas y Juego Activo
    viewMode,
    setViewMode,
    activeGame,
    setActiveGame,
  });

  const handleHubNavigate = (target) => {
    setIsHubMenuOpen(false);
    switch (target) {
      case 'checklist':
        safeNavigateView('checklist');
        break;
      case 'map':
        safeNavigateView('map');
        break;
      case 'builds':
        setIsBuildPlannerOpen(true);
        break;
      case 'runes':
        setIsRuneCalcOpen(true);
        break;
      case 'progression':
        setIsProgressionOpen(true);
        break;
      case 'equipload':
        setIsEquipLoadOpen(true);
        break;
      case 'platinum':
        setIsPlatinumOpen(true);
        break;
      case 'guide':
        setIsPanelOpen(true);
        setActiveTab('guide');
        break;
      case 'settings':
        setIsSettingsOpen(true);
        break;
      default:
        break;
    }
  };

  const handleReturnToChecklist = () => {
    safeNavigateView('checklist');
  };

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => safeCloseModal(() => setIsHelpOpen(false));

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => safeCloseModal(() => setIsSettingsOpen(false));

  const openEquipLoad = () => setIsEquipLoadOpen(true);
  const closeEquipLoad = () => safeCloseModal(() => setIsEquipLoadOpen(false));

  const openPlatinum = () => setIsPlatinumOpen(true);
  const closePlatinum = () => safeCloseModal(() => setIsPlatinumOpen(false));

  // VISTA DEDICADA DE BLOODBORNE (Sin mapa, con todas las herramientas góticas)
  if (activeGame === 'bloodborne') {
    if (viewMode === 'checklist') {
      return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#060508]">
          <BloodborneCompendium
            onOpenRoute={() => setIsBBRouteOpen(true)}
            onOpenBuilds={() => setIsBBBuildOpen(true)}
            onOpenEchoes={() => setIsBBEchoesOpen(true)}
            onOpenChalice={() => setIsBBChaliceOpen(true)}
            onOpenQuests={() => setIsBBQuestsOpen(true)}
            onSwitchGame={() => safeSwitchGame('elden')}
          />
          <BloodborneRouteModal
            isOpen={isBBRouteOpen}
            onClose={() => safeCloseModal(() => setIsBBRouteOpen(false))}
            onInspectItem={abrirModalDetalleBB}
          />
          <BloodborneBuildModal
            isOpen={isBBBuildOpen}
            onClose={() => safeCloseModal(() => setIsBBBuildOpen(false))}
          />
          <BloodborneEchoesModal
            isOpen={isBBEchoesOpen}
            onClose={() => safeCloseModal(() => setIsBBEchoesOpen(false))}
          />
          <BloodborneChaliceModal
            isOpen={isBBChaliceOpen}
            onClose={() => safeCloseModal(() => setIsBBChaliceOpen(false))}
          />
          <BloodborneQuestsModal
            isOpen={isBBQuestsOpen}
            onClose={() => safeCloseModal(() => setIsBBQuestsOpen(false))}
            onInspectItem={abrirModalDetalleBB}
          />
          <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />

          {modalItemDetalleBB && (
            <BloodborneItemDetailModal
              item={modalItemDetalleBB}
              isOpen={Boolean(modalItemDetalleBB)}
              onClose={() => safeCloseModal(cerrarModalDetalleBB)}
              isDone={modalItemDetalleBB ? itemsCompletados_bb.has(modalItemDetalleBB.id) : false}
              onToggle={toggleCompletadoBB}
            />
          )}

          {toastMessage && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-stone-900/95 border border-rose-500/60 text-rose-200 text-xs font-serif font-bold shadow-2xl backdrop-blur-md animate-fadeIn pointer-events-none flex items-center gap-2">
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#060508]">
        <BloodborneHub
          onNavigate={(target) => safeNavigateView(target)}
          onOpenRoute={() => setIsBBRouteOpen(true)}
          onOpenBuilds={() => setIsBBBuildOpen(true)}
          onOpenEchoes={() => setIsBBEchoesOpen(true)}
          onOpenChalice={() => setIsBBChaliceOpen(true)}
          onOpenQuests={() => setIsBBQuestsOpen(true)}
          onOpenSettings={openSettings}
          onSwitchGame={() => safeSwitchGame('elden')}
        />
        <BloodborneRouteModal
          isOpen={isBBRouteOpen}
          onClose={() => safeCloseModal(() => setIsBBRouteOpen(false))}
          onInspectItem={abrirModalDetalleBB}
        />
        <BloodborneBuildModal
          isOpen={isBBBuildOpen}
          onClose={() => safeCloseModal(() => setIsBBBuildOpen(false))}
        />
        <BloodborneEchoesModal
          isOpen={isBBEchoesOpen}
          onClose={() => safeCloseModal(() => setIsBBEchoesOpen(false))}
        />
        <BloodborneChaliceModal
          isOpen={isBBChaliceOpen}
          onClose={() => safeCloseModal(() => setIsBBChaliceOpen(false))}
        />
        <BloodborneQuestsModal
          isOpen={isBBQuestsOpen}
          onClose={() => safeCloseModal(() => setIsBBQuestsOpen(false))}
          onInspectItem={abrirModalDetalleBB}
        />
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />

        {modalItemDetalleBB && (
          <BloodborneItemDetailModal
            item={modalItemDetalleBB}
            isOpen={Boolean(modalItemDetalleBB)}
            onClose={() => safeCloseModal(cerrarModalDetalleBB)}
            isDone={modalItemDetalleBB ? itemsCompletados_bb.has(modalItemDetalleBB.id) : false}
            onToggle={toggleCompletadoBB}
          />
        )}

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-stone-900/95 border border-rose-500/60 text-rose-200 text-xs font-serif font-bold shadow-2xl backdrop-blur-md animate-fadeIn pointer-events-none flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Si el usuario está en el Menú Principal (Hub), renderizar la vista de bienvenida
  if (viewMode === 'hub') {
    return (
      <div className="h-screen w-screen overflow-hidden bg-elden-950 flex flex-col">
        <HubHome
          onNavigate={(target) => {
            if (target === 'builds') {
              setIsBuildPlannerOpen(true);
            } else if (target === 'runes') {
              setIsRuneCalcOpen(true);
            } else if (target === 'progression') {
              setIsProgressionOpen(true);
            } else {
              safeNavigateView(target);
            }
          }}
          onOpenSettings={openSettings}
          onOpenPlatinum={openPlatinum}
          onOpenEquipLoad={openEquipLoad}
          onOpenBuilds={() => setIsBuildPlannerOpen(true)}
          onOpenRuneCalc={() => setIsRuneCalcOpen(true)}
          onOpenProgression={() => setIsProgressionOpen(true)}
        />

        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
        <EquipLoadModal isOpen={isEquipLoadOpen} onClose={closeEquipLoad} />
        <PlatinumModal isOpen={isPlatinumOpen} onClose={closePlatinum} onOpenItem={() => { }} />
        <BuildPlannerModal
          isOpen={isBuildPlannerOpen}
          onClose={() => safeCloseModal(() => setIsBuildPlannerOpen(false))}
          onOpenItem={() => { }}
        />
        <RuneCalculatorModal
          isOpen={isRuneCalcOpen}
          onClose={() => safeCloseModal(() => setIsRuneCalcOpen(false))}
        />
        <ProgressionRouteModal
          isOpen={isProgressionOpen}
          onClose={() => safeCloseModal(() => setIsProgressionOpen(false))}
        />

        {modalItemDetalle && (
          <ItemDetailModal
            item={modalItemDetalle}
            onClose={() => safeCloseModal(cerrarModalDetalle)}
          />
        )}

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-elden-900/95 border border-amber-500/60 text-amber-200 text-xs font-serif font-bold shadow-2xl backdrop-blur-md animate-fadeIn pointer-events-none flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Si el usuario está en modo Checklist Compendio, renderizar la vista dedicada
  if (viewMode === 'checklist') {
    return (
      <>
        <ChecklistCompendium />
        {modalItemDetalle && (
          <ItemDetailModal
            item={modalItemDetalle}
            onClose={cerrarModalDetalle}
          />
        )}
      </>
    );
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
        className={`h-full flex flex-col z-40 transition-all duration-300 ease-in-out border-r border-elden-border bg-elden-900 shadow-2xl fixed md:relative inset-y-0 left-0 max-w-[90vw] md:max-w-none ${isPanelOpen
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-serif font-bold transition ${activeTab === 'guide'
                  ? 'bg-elden-gold text-elden-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guía de Quests</span>
              {activeQuest && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'guide'
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-serif font-bold transition ${activeTab === 'filters'
                  ? 'bg-elden-gold text-elden-950 shadow-gold-glow'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros y Mapa</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'filters'
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
          {/* Volver a Inicio / Mesa Redonda */}
          <button
            id="map-view-home-btn"
            onClick={() => setViewMode('hub')}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-serif font-bold border transition backdrop-blur flex items-center gap-1.5 shadow-gold-glow bg-elden-900/95 text-slate-300 hover:text-amber-200 border-slate-700 hover:border-elden-gold/60 active:scale-95"
            title="Volver a la Mesa Redonda (Inicio)"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          {/* Menú Principal Gracia Perdida */}
          <button
            id="map-view-hub-menu-btn"
            onClick={() => setIsHubMenuOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-serif font-bold border transition backdrop-blur flex items-center gap-1.5 shadow-gold-glow bg-gradient-to-r from-amber-500/20 via-elden-900 to-amber-500/20 text-amber-200 border-elden-gold/60 hover:bg-elden-850 hover:text-white active:scale-95"
            title="Menú Principal Gracia Perdida"
          >
            <Compass className="w-4 h-4 text-elden-gold animate-spin-slow" />
            <span className="hidden sm:inline">Menú</span>
          </button>

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

          {/* Botón Constructor de Builds */}
          <button
            id="map-view-builds-btn"
            onClick={() => setIsBuildPlannerOpen(true)}
            className="p-2 sm:px-2.5 sm:py-2 bg-elden-900/90 hover:bg-elden-850 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 rounded-lg shadow-gold-glow backdrop-blur transition flex items-center gap-1.5 text-xs font-serif active:scale-95"
            title="Constructor de Builds & Equipo"
          >
            <Sword className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Builds</span>
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
        onOpenItem={() => { }}
      />

      {/* Menú Principal Gracia Perdida */}
      <AppHubMenu
        isOpen={isHubMenuOpen}
        onClose={() => safeCloseModal(() => setIsHubMenuOpen(false))}
        onNavigate={handleHubNavigate}
      />

      {/* Constructor de Builds & Recomendador de Equipo */}
      <BuildPlannerModal
        isOpen={isBuildPlannerOpen}
        onClose={() => safeCloseModal(() => setIsBuildPlannerOpen(false))}
        onOpenItem={() => { }}
      />

      {/* Calculadora de Runas & Zurrón */}
      <RuneCalculatorModal
        isOpen={isRuneCalcOpen}
        onClose={() => safeCloseModal(() => setIsRuneCalcOpen(false))}
      />

      {/* Ruta Óptima de Progresión */}
      <ProgressionRouteModal
        isOpen={isProgressionOpen}
        onClose={() => safeCloseModal(() => setIsProgressionOpen(false))}
      />

      {/* Dock Rápido Flotante */}
      <FloatingQuickHUD
        onOpenBuilds={() => setIsBuildPlannerOpen(true)}
        onOpenEquipLoad={() => setIsEquipLoadOpen(true)}
        onOpenPlatinum={() => setIsPlatinumOpen(true)}
        onOpenRuneCalc={() => setIsRuneCalcOpen(true)}
        onOpenProgression={() => setIsProgressionOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Modal de Detalle de Ítem Global */}
      {modalItemDetalle && (
        <ItemDetailModal
          item={modalItemDetalle}
          onClose={() => safeCloseModal(cerrarModalDetalle)}
        />
      )}

      {toastMessage && (
        <div
          id="back-exit-toast"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-elden-900/95 border border-amber-500/60 text-amber-200 text-xs font-serif font-bold shadow-2xl backdrop-blur-md animate-fadeIn pointer-events-none flex items-center gap-2"
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
