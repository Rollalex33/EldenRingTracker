import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useAppBackHandler
 *
 * Hook universal para interceptar la navegación hacia atrás de Android y del navegador
 * (botón Atrás físico/virtual y gesto de deslizar del borde).
 *
 * Evita que el usuario salga involuntariamente de la aplicación web:
 * 1. Si un modal de ítem está abierto: el botón atrás cierra el modal.
 * 2. Si un modal de funcionalidad (Ruta, Builds, Misiones, Ajustes...) está abierto: lo cierra.
 * 3. Si hay una búsqueda activa: la limpia.
 * 4. Si está en una subvista (Checklist o Mapa): regresa a la vista anterior o al Hub.
 * 5. Si está en Bloodborne Hub: regresa a Elden Ring Hub.
 * 6. Si está en el nivel raíz (Elden Ring Hub sin modales): muestra aviso "Presiona atrás de nuevo para salir",
 *    permitiendo salir solo si se pulsa dos veces en 2 segundos.
 */
export function useAppBackHandler(options = {}) {
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);
  const lastBackPressRef = useRef(0);
  const isExitingRef = useRef(false);
  const isProgrammaticBackRef = useRef(false);

  // Mantener referencias actualizadas para que popstate acceda siempre a los estados más recientes sin recrear listeners
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 2000);
  }, []);

  // 1. Inicializar el estado de historial para que siempre exista un buffer protector
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.history.state || !window.history.state.erApp) {
      window.history.replaceState({ erApp: 'root' }, '');
      window.history.pushState({ erApp: 'main' }, '');
    }

    const handlePopState = () => {
      if (isExitingRef.current) return;

      if (isProgrammaticBackRef.current) {
        isProgrammaticBackRef.current = false;
        return;
      }

      const opts = optionsRef.current;

      // 1. Modales de detalle de ítem (máxima prioridad)
      if (opts.modalItemDetalleBB) {
        if (opts.cerrarModalDetalleBB) opts.cerrarModalDetalleBB();
        return;
      }
      if (opts.activeItemForModal) {
        if (opts.setActiveItemForModal) opts.setActiveItemForModal(null);
        return;
      }
      if (opts.modalItemDetalle) {
        if (opts.cerrarModalDetalle) opts.cerrarModalDetalle();
        return;
      }

      // 2. Modales de Bloodborne
      if (opts.isBBRouteOpen) {
        if (opts.setIsBBRouteOpen) opts.setIsBBRouteOpen(false);
        return;
      }
      if (opts.isBBQuestsOpen) {
        if (opts.setIsBBQuestsOpen) opts.setIsBBQuestsOpen(false);
        return;
      }
      if (opts.isBBChaliceOpen) {
        if (opts.setIsBBChaliceOpen) opts.setIsBBChaliceOpen(false);
        return;
      }
      if (opts.isBBEchoesOpen) {
        if (opts.setIsBBEchoesOpen) opts.setIsBBEchoesOpen(false);
        return;
      }
      if (opts.isBBBuildOpen) {
        if (opts.setIsBBBuildOpen) opts.setIsBBBuildOpen(false);
        return;
      }

      // 3. Modales de Elden Ring
      if (opts.isHubMenuOpen) {
        if (opts.setIsHubMenuOpen) opts.setIsHubMenuOpen(false);
        return;
      }
      if (opts.isBuildPlannerOpen) {
        if (opts.setIsBuildPlannerOpen) opts.setIsBuildPlannerOpen(false);
        return;
      }
      if (opts.isRuneCalcOpen) {
        if (opts.setIsRuneCalcOpen) opts.setIsRuneCalcOpen(false);
        return;
      }
      if (opts.isProgressionOpen) {
        if (opts.setIsProgressionOpen) opts.setIsProgressionOpen(false);
        return;
      }
      if (opts.isPlatinumOpen) {
        if (opts.setIsPlatinumOpen) opts.setIsPlatinumOpen(false);
        return;
      }
      if (opts.isEquipLoadOpen) {
        if (opts.setIsEquipLoadOpen) opts.setIsEquipLoadOpen(false);
        return;
      }
      if (opts.isSettingsOpen) {
        if (opts.setIsSettingsOpen) opts.setIsSettingsOpen(false);
        return;
      }
      if (opts.isHelpOpen) {
        if (opts.setIsHelpOpen) opts.setIsHelpOpen(false);
        return;
      }

      // 4. Si hay búsqueda activa en checklist: limpiar la búsqueda antes de retroceder de vista
      if (opts.busquedaChecklist && opts.busquedaChecklist.trim() !== '') {
        if (opts.setBusquedaChecklist) opts.setBusquedaChecklist('');
        window.history.pushState({ erApp: 'main' }, '');
        return;
      }

      // 5. Callback explícito de retorno al Hub (para ChecklistCompendium)
      if (opts.onBackToHub) {
        opts.onBackToHub();
        return;
      }

      // 6. Subvistas en App.jsx
      if (opts.activeGame === 'bloodborne') {
        if (opts.viewMode === 'checklist') {
          if (opts.setViewMode) opts.setViewMode('hub');
          return;
        }
        if (opts.viewMode === 'hub') {
          if (opts.setActiveGame) opts.setActiveGame('elden');
          return;
        }
      } else {
        if (opts.viewMode === 'map') {
          if (opts.setViewMode) opts.setViewMode('checklist');
          return;
        }
        if (opts.viewMode === 'checklist') {
          if (opts.setViewMode) opts.setViewMode('hub');
          return;
        }
      }

      // 7. Nivel raíz absoluto (Elden Ring Hub sin modales): doble toque para salir
      const now = Date.now();
      if (now - lastBackPressRef.current < 2000) {
        isExitingRef.current = true;
        window.history.back();
      } else {
        lastBackPressRef.current = now;
        showToast('Presiona atrás de nuevo para salir');
        window.history.pushState({ erApp: 'main' }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [showToast]);

  // 2. Auto-push de historial cada vez que se abre un modal
  const prevModalCountRef = useRef(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const opts = optionsRef.current;
    const count = [
      opts.modalItemDetalleBB,
      opts.modalItemDetalle,
      opts.activeItemForModal,
      opts.isBBRouteOpen,
      opts.isBBQuestsOpen,
      opts.isBBChaliceOpen,
      opts.isBBEchoesOpen,
      opts.isBBBuildOpen,
      opts.isHubMenuOpen,
      opts.isBuildPlannerOpen,
      opts.isRuneCalcOpen,
      opts.isProgressionOpen,
      opts.isPlatinumOpen,
      opts.isEquipLoadOpen,
      opts.isSettingsOpen,
      opts.isHelpOpen,
    ].filter(Boolean).length;

    if (count > prevModalCountRef.current) {
      window.history.pushState({ erApp: 'modal', depth: count }, '');
    }
    prevModalCountRef.current = count;
  });

  // Funciones auxiliares para abrir/cerrar programáticamente sin romper el stack de historial
  const openItemModal = useCallback((item) => {
    if (optionsRef.current.setActiveItemForModal) {
      optionsRef.current.setActiveItemForModal(item);
    } else if (optionsRef.current.abrirModalDetalleBB) {
      optionsRef.current.abrirModalDetalleBB(item);
    } else if (optionsRef.current.abrirModalDetalle) {
      optionsRef.current.abrirModalDetalle(item);
    }
  }, []);

  const closeItemModal = useCallback(() => {
    if (optionsRef.current.setActiveItemForModal) {
      optionsRef.current.setActiveItemForModal(null);
    }
    if (optionsRef.current.cerrarModalDetalleBB) {
      optionsRef.current.cerrarModalDetalleBB();
    }
    if (optionsRef.current.cerrarModalDetalle) {
      optionsRef.current.cerrarModalDetalle();
    }
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal') {
      isProgrammaticBackRef.current = true;
      window.history.back();
    }
  }, []);

  const safeCloseModal = useCallback((closeFn) => {
    if (closeFn) closeFn();
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal') {
      isProgrammaticBackRef.current = true;
      window.history.back();
    }
  }, []);

  const safeNavigateView = useCallback((targetView) => {
    if (targetView === optionsRef.current.viewMode) return;
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'view', view: targetView }, '');
    }
    if (optionsRef.current.setViewMode) {
      optionsRef.current.setViewMode(targetView);
    }
  }, []);

  const safeSwitchGame = useCallback((targetGame) => {
    if (targetGame === optionsRef.current.activeGame) return;
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'game', game: targetGame }, '');
    }
    if (optionsRef.current.setActiveGame) {
      optionsRef.current.setActiveGame(targetGame);
    }
  }, []);

  const openSettings = useCallback(() => {
    if (optionsRef.current.setIsSettingsOpen) {
      optionsRef.current.setIsSettingsOpen(true);
    }
  }, []);

  const closeSettings = useCallback(() => {
    if (optionsRef.current.setIsSettingsOpen) {
      optionsRef.current.setIsSettingsOpen(false);
    }
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal') {
      isProgrammaticBackRef.current = true;
      window.history.back();
    }
  }, []);

  return {
    openItemModal,
    closeItemModal,
    openSettings,
    closeSettings,
    safeCloseModal,
    safeNavigateView,
    safeSwitchGame,
    toastMessage,
  };
}

export default useAppBackHandler;
