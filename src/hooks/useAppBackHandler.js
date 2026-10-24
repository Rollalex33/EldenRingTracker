import { useEffect, useRef, useState, useCallback } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';

/**
 * useAppBackHandler
 *
 * Hook para interceptar la navegación hacia atrás de Android y del navegador (botón Atrás / gesto de deslizar).
 * Evita que el usuario salga involuntariamente de la aplicación web:
 * 1. Si un modal de ítem está abierto: el botón atrás cierra el modal.
 * 2. Si el modal de ajustes está abierto: cierra el modal de ajustes.
 * 3. Si hay una búsqueda activa: limpia la búsqueda.
 * 4. Si está en la raíz: muestra aviso "Presiona atrás de nuevo para salir de la web" y solo sale si se pulsa dos veces en 2.5 segundos.
 */
export function useAppBackHandler({
  activeItemForModal,
  setActiveItemForModal,
  isSettingsOpen,
  setIsSettingsOpen,
}) {
  const {
    busquedaChecklist,
    setBusquedaChecklist,
  } = useTrackerStore();

  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);
  const lastBackPressRef = useRef(0);
  const isExitingRef = useRef(false);
  const isProgrammaticBackRef = useRef(false);

  // Mantener referencias actualizadas para los event listeners de popstate
  const activeItemRef = useRef(activeItemForModal);
  activeItemRef.current = activeItemForModal;

  const isSettingsRef = useRef(isSettingsOpen);
  isSettingsRef.current = isSettingsOpen;

  const busquedaRef = useRef(busquedaChecklist);
  busquedaRef.current = busquedaChecklist;

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 2500);
  }, []);

  // Inicializar el historial para atrapar el botón atrás de forma segura
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Asegurar que exista un estado base para atrapar el gesto 'Atrás'
    if (!window.history.state || !window.history.state.erApp) {
      window.history.replaceState({ erApp: 'root' }, '');
      window.history.pushState({ erApp: 'main' }, '');
    }

    const handlePopState = (event) => {
      // Si el usuario ya confirmó que desea salir con doble toque, no interceptar
      if (isExitingRef.current) return;

      // Si el retroceso fue disparado programáticamente desde la UI (botón X o backdrop), consumir y omitir
      if (isProgrammaticBackRef.current) {
        isProgrammaticBackRef.current = false;
        return;
      }

      // 1. Si el modal de ítem está abierto: cerrarlo
      if (activeItemRef.current) {
        setActiveItemForModal(null);
        return;
      }

      // 2. Si el modal de ajustes está abierto: cerrarlo
      if (isSettingsRef.current) {
        setIsSettingsOpen(false);
        return;
      }

      // 3. Si hay búsqueda activa: limpiar la búsqueda
      if (busquedaRef.current && busquedaRef.current.trim() !== '') {
        setBusquedaChecklist('');
        window.history.pushState({ erApp: 'main' }, '');
        return;
      }

      // 4. En el nivel raíz: doble pulsación requerida para salir
      const now = Date.now();
      if (now - lastBackPressRef.current < 2500) {
        // Segunda pulsación rápida: permitir salida del sitio
        isExitingRef.current = true;
        window.history.back();
      } else {
        lastBackPressRef.current = now;
        showToast('Presiona atrás de nuevo para salir de la web');
        // Restaurar estado en historial para que el próximo toque funcione
        window.history.pushState({ erApp: 'main' }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [
    setActiveItemForModal,
    setIsSettingsOpen,
    setBusquedaChecklist,
    showToast,
  ]);

  // Al abrir el modal de ítem manualmente, registrar entrada en historial
  const openItemModal = useCallback(
    (item) => {
      setActiveItemForModal(item);
      if (typeof window !== 'undefined') {
        window.history.pushState({ erApp: 'modal-item', id: item.id }, '');
      }
    },
    [setActiveItemForModal]
  );

  // Al cerrar el modal de ítem manualmente (botón X o backdrop)
  const closeItemModal = useCallback(
    (subSteps = 0) => {
      setActiveItemForModal(null);
      if (typeof window !== 'undefined' && window.history.state?.erApp?.startsWith('modal-item')) {
        isProgrammaticBackRef.current = true;
        const totalSteps = 1 + (typeof subSteps === 'number' ? subSteps : 0);
        if (totalSteps > 1) {
          window.history.go(-totalSteps);
        } else {
          window.history.back();
        }
      }
    },
    [setActiveItemForModal]
  );

  // Al abrir ajustes manualmente
  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ erApp: 'modal-settings' }, '');
    }
  }, [setIsSettingsOpen]);

  // Al cerrar ajustes manualmente
  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
    if (typeof window !== 'undefined' && window.history.state?.erApp === 'modal-settings') {
      isProgrammaticBackRef.current = true;
      window.history.back();
    }
  }, [setIsSettingsOpen]);

  return {
    openItemModal,
    closeItemModal,
    openSettings,
    closeSettings,
    toastMessage,
  };
}

export default useAppBackHandler;
