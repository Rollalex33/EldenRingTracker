import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { locations, questlines } from '../data/mockData';

/**
 * Zustand Store con middleware de persistencia en LocalStorage ('elden-ring-tracker-state')
 * Gestiona ítems completados con Set (serializado a Array para almacenamiento),
 * sincronización bidireccional mapa <-> guía, backup JSON y filtro de pasos perdibles.
 */
export const useTrackerStore = create(
  persist(
    (set, get) => ({
      // Estado base de completado y filtros
      activeGame: 'elden', // 'elden' | 'bloodborne'
      itemsCompletados: new Set(),
      itemsCompletados_bb: new Set(),
      filtrosActivos: ['graces', 'bosses', 'dungeons', 'npcs', 'weapons', 'spells', 'ashes', 'key_items'],
      busqueda: '',
      soloPerdibles: false, // Filtro avanzado para contenido perdible
      mapaActivo: 'surface', // 'surface' | 'underground' | 'dlc'

      // Colecciones de datos precargadas
      locations: locations,
      questlines: questlines,

      // Modo de visualización inicial: 'hub' | 'checklist' | 'map'
      viewMode: 'hub',

      // Estado de la Checklist de EliteGuías
      categoriaActivaChecklist: 'jefazos',
      subcategoriaChecklist: 'all',
      expansionFilterChecklist: 'all', // 'all' | 'base' | 'dlc'
      displayModeChecklist: 'grid', // 'grid' | 'list'
      busquedaChecklist: '',
      filtroEstadoChecklist: 'all', // 'all' | 'pending' | 'completed'
      sortOrderChecklist: 'game', // 'game' | 'alpha'
      quickMarkChecklist: false, // Tocar la fila alterna el estado sin abrir el modal
      agruparSetsChecklist: true, // Agrupar armaduras por set
      modalItemDetalle: null,

      // Estados de navegación e interacción
      selectedLocationId: null,
      selectedQuestlineId: 'quest_ranni',
      mapCenter: [2200, 2400],
      mapZoom: -1,

      // Sincronización bidireccional Guía <-> Mapa
      pasoSeleccionadoId: null,
      coordenadasEnfocadas: null,

      // Acción: cambiar mapa activo (Superficie / Subterráneo / DLC)
      setMapaActivo: (mapa) => {
        const centers = {
          surface: [2200, 2400],
          underground: [2500, 2500],
          dlc: [2500, 2500],
        };
        set({
          mapaActivo: mapa,
          mapCenter: centers[mapa] || [2500, 2500],
          coordenadasEnfocadas: null,
        });
      },

      // Acción: enfocar ubicación y vincular paso (con auto-detección de mapa)
      enfocarUbicacion: (coords, pasoId = null) => {
        let targetLocation = null;

        if (pasoId) {
          targetLocation = get().locations.find(
            (l) => l.questlinePasoId === pasoId || l.id === pasoId
          );
        } else if (coords) {
          targetLocation = get().locations.find(
            (l) => l.coords[0] === coords[0] && l.coords[1] === coords[1]
          );
        }

        const updates = {
          coordenadasEnfocadas: coords ? [...coords] : null,
          pasoSeleccionadoId: pasoId,
          mapCenter: coords || get().mapCenter,
          mapZoom: 0,
        };

        if (targetLocation) {
          updates.selectedLocationId = targetLocation.id;
          // Si el punto pertenece a otra capa (ej: Nokron subterráneo), cambiar de mapa automáticamente
          const mapaOrigen = targetLocation.mapaOrigen || 'surface';
          if (mapaOrigen !== get().mapaActivo) {
            updates.mapaActivo = mapaOrigen;
          }
        }

        set(updates);
      },

      setPasoSeleccionadoId: (pasoId) => set({ pasoSeleccionadoId: pasoId }),

      // Toggle para el filtro "Solo Perdibles"
      setSoloPerdibles: (value) =>
        set((state) => ({
          soloPerdibles: typeof value === 'boolean' ? value : !state.soloPerdibles,
        })),

      toggleSoloPerdibles: () =>
        set((state) => ({ soloPerdibles: !state.soloPerdibles })),

      // Toggle de grupos rápidos de filtros (para la barra flotante)
      toggleGrupoFiltro: (grupo) =>
        set((state) => {
          let targets = [grupo];
          if (grupo === 'weapons_spells' || grupo === 'weapons') {
            targets = ['weapons', 'spells'];
          } else if (grupo === 'items') {
            targets = ['ashes', 'key_items'];
          }

          const allActive = targets.every((c) => state.filtrosActivos.includes(c));
          const nuevosFiltros = allActive
            ? state.filtrosActivos.filter((c) => !targets.includes(c))
            : Array.from(new Set([...state.filtrosActivos, ...targets]));
          return { filtrosActivos: nuevosFiltros };
        }),

      // Acciones de Checklist
      setViewMode: (mode) => set({ viewMode: mode }),
      setCategoriaActivaChecklist: (categoria) =>
        set({ categoriaActivaChecklist: categoria, subcategoriaChecklist: 'all' }),
      setSubcategoriaChecklist: (subcategoria) =>
        set({ subcategoriaChecklist: subcategoria }),
      setExpansionFilterChecklist: (expansion) =>
        set({ expansionFilterChecklist: expansion, subcategoriaChecklist: 'all' }),
      setDisplayModeChecklist: (mode) =>
        set({ displayModeChecklist: mode }),
      setBusquedaChecklist: (busqueda) => set({ busquedaChecklist: busqueda }),
      setFiltroEstadoChecklist: (filtro) => set({ filtroEstadoChecklist: filtro }),
      setSortOrderChecklist: (order) => set({ sortOrderChecklist: order }),
      setQuickMarkChecklist: (value) => set({ quickMarkChecklist: Boolean(value) }),
      setAgruparSetsChecklist: (value) => set({ agruparSetsChecklist: Boolean(value) }),
      setModalItemDetalle: (item) => set({ modalItemDetalle: item }),

      marcarGrupoItems: (itemIds, marcar = true) =>
        set((state) => {
          const nextSet = new Set(state.itemsCompletados);
          for (const id of itemIds) {
            if (marcar) nextSet.add(id);
            else nextSet.delete(id);
          }
          return { itemsCompletados: nextSet };
        }),

      setActiveGame: (game) => set({ activeGame: game, viewMode: 'hub' }),

      marcarGrupoItemsBB: (itemIds, marcar = true) =>
        set((state) => {
          const nextSet = new Set(state.itemsCompletados_bb);
          for (const id of itemIds) {
            if (marcar) nextSet.add(id);
            else nextSet.delete(id);
          }
          return { itemsCompletados_bb: nextSet };
        }),

      toggleCompletadoBB: (id) =>
        set((state) => {
          const nextSet = new Set(state.itemsCompletados_bb);
          if (nextSet.has(id)) {
            nextSet.delete(id);
          } else {
            nextSet.add(id);
          }
          return { itemsCompletados_bb: nextSet };
        }),

      // Acciones de completado
      toggleCompletado: (id) =>
        set((state) => {
          const nextSet = new Set(state.itemsCompletados);
          if (nextSet.has(id)) {
            nextSet.delete(id);
          } else {
            nextSet.add(id);
          }
          return { itemsCompletados: nextSet };
        }),

      setFiltro: (categoria) =>
        set((state) => {
          const yaActivo = state.filtrosActivos.includes(categoria);
          const nuevosFiltros = yaActivo
            ? state.filtrosActivos.filter((c) => c !== categoria)
            : [...state.filtrosActivos, categoria];
          return { filtrosActivos: nuevosFiltros };
        }),

      setBusqueda: (busqueda) => set({ busqueda }),

      setSelectedLocation: (id) => {
        const loc = get().locations.find((l) => l.id === id);
        if (loc) {
          const updates = {
            selectedLocationId: id,
            mapCenter: loc.coords,
            mapZoom: 0,
            coordenadasEnfocadas: [...loc.coords],
          };
          const mapaOrigen = loc.mapaOrigen || 'surface';
          if (mapaOrigen !== get().mapaActivo) {
            updates.mapaActivo = mapaOrigen;
          }

          if (loc.questlinePasoId) {
            updates.pasoSeleccionadoId = loc.questlinePasoId;
            const matchingQuest = get().questlines.find((q) =>
              q.pasos.some((p) => p.pasoId === loc.questlinePasoId)
            );
            if (matchingQuest) {
              updates.selectedQuestlineId = matchingQuest.id;
            }
          }

          set(updates);
        } else {
          set({ selectedLocationId: null });
        }
      },

      setSelectedQuestline: (id) => set({ selectedQuestlineId: id }),

      setMapCenter: (coords, zoom = 0) => set({ mapCenter: coords, mapZoom: zoom }),

      resetFiltros: () =>
        set({
          filtrosActivos: ['graces', 'bosses', 'dungeons', 'npcs', 'weapons', 'spells', 'ashes', 'key_items'],
          busqueda: '',
        }),

      // ==========================================
      // FUNCIONES DE BACKUP (IMPORT / EXPORT / RESET)
      // ==========================================

      /**
       * Exporta el estado actual a un archivo descargable elden_ring_progress.json
       */
      exportarProgreso: () => {
        const state = get();
        const exportData = {
          app: 'Elden Ring Interactive Tracker',
          version: '1.0',
          fechaExportacion: new Date().toISOString(),
          fechaLegible: new Date().toLocaleString(),
          totalCompletados: state.itemsCompletados.size,
          itemsCompletados: Array.from(state.itemsCompletados),
          filtrosActivos: state.filtrosActivos,
          selectedQuestlineId: state.selectedQuestlineId,
          soloPerdibles: state.soloPerdibles,
        };

        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'elden_ring_progress.json';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);

        return exportData;
      },

      /**
       * Valida e importa un archivo JSON restaurando el progreso y marcas
       * @param {string|object} jsonInput - Cadena JSON o objeto ya parseado
       */
      importarProgreso: (jsonInput) => {
        try {
          const data =
            typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;

          if (!data || typeof data !== 'object') {
            throw new Error('El archivo no contiene un JSON válido.');
          }

          // Extraer arreglo de IDs completados soportando diferentes formatos
          let itemsList = [];
          if (Array.isArray(data.itemsCompletados)) {
            itemsList = data.itemsCompletados;
          } else if (Array.isArray(data)) {
            itemsList = data;
          } else if (Array.isArray(data.items)) {
            itemsList = data.items;
          } else {
            throw new Error(
              'Formato inválido: el archivo debe incluir la propiedad "itemsCompletados".'
            );
          }

          const newSet = new Set(
            itemsList.filter((item) => typeof item === 'string' && item.trim().length > 0)
          );

          const updates = {
            itemsCompletados: newSet,
          };

          if (Array.isArray(data.filtrosActivos) && data.filtrosActivos.length > 0) {
            updates.filtrosActivos = data.filtrosActivos;
          }
          if (data.selectedQuestlineId) {
            updates.selectedQuestlineId = data.selectedQuestlineId;
          }
          if (typeof data.soloPerdibles === 'boolean') {
            updates.soloPerdibles = data.soloPerdibles;
          }

          set(updates);

          return {
            success: true,
            count: newSet.size,
            fechaExportacion: data.fechaLegible || data.fechaExportacion || 'Desconocida',
          };
        } catch (error) {
          console.error('Error al importar progreso:', error);
          return {
            success: false,
            error: error.message || 'Error desconocido al importar el archivo JSON.',
          };
        }
      },

      /**
       * Reinicia completamente el progreso en el store y localStorage
       */
      reiniciarProgreso: () => {
        set({
          itemsCompletados: new Set(),
          pasoSeleccionadoId: null,
          coordenadasEnfocadas: null,
          soloPerdibles: false,
        });

        try {
          localStorage.removeItem('elden-ring-tracker-state');
          localStorage.removeItem('elden_ring_tracker_completed_v1');
        } catch (e) {
          console.error('Error al limpiar localStorage:', e);
        }
      },

      // Métodos de consulta y helpers
      getPasosByQuestline: (questId) => {
        const quest = get().questlines.find((q) => q.id === questId);
        return quest ? quest.pasos : [];
      },

      getLocationByPasoId: (pasoId) => {
        return (
          get().locations.find(
            (loc) => loc.questlinePasoId === pasoId || loc.id === pasoId
          ) || null
        );
      },

      getQuestlineByPasoId: (pasoId) => {
        return (
          get().questlines.find((q) => q.pasos.some((p) => p.pasoId === pasoId)) ||
          null
        );
      },

      isCompletado: (id) => get().itemsCompletados.has(id),
    }),
    {
      name: 'elden-ring-tracker-state',
      storage: createJSONStorage(() => localStorage),
      // Serializar Set a Array para almacenar limpiamente en localStorage
      partialize: (state) => ({
        activeGame: state.activeGame || 'elden',
        itemsCompletados: Array.from(state.itemsCompletados),
        itemsCompletados_bb: Array.from(state.itemsCompletados_bb || []),
        filtrosActivos: state.filtrosActivos,
        selectedQuestlineId: state.selectedQuestlineId,
        soloPerdibles: state.soloPerdibles,
        mapaActivo: state.mapaActivo,
        viewMode: state.viewMode,
        categoriaActivaChecklist: state.categoriaActivaChecklist,
        expansionFilterChecklist: state.expansionFilterChecklist,
        displayModeChecklist: state.displayModeChecklist,
        sortOrderChecklist: state.sortOrderChecklist,
        quickMarkChecklist: state.quickMarkChecklist,
        agruparSetsChecklist: state.agruparSetsChecklist,
      }),
      // De-serializar Array a Set al rehidratar sin romper reactividad
      merge: (persistedState, currentState) => {
        let itemsSet = new Set();
        if (persistedState?.itemsCompletados) {
          itemsSet = new Set(
            Array.isArray(persistedState.itemsCompletados)
              ? persistedState.itemsCompletados
              : []
          );
        } else {
          // Migración de respaldo desde versión anterior si existe
          try {
            const legacyRaw = localStorage.getItem('elden_ring_tracker_completed_v1');
            if (legacyRaw) {
              const legacyParsed = JSON.parse(legacyRaw);
              if (Array.isArray(legacyParsed)) {
                itemsSet = new Set(legacyParsed);
              }
            }
          } catch (e) {}
        }

        const itemsSetBB = new Set(
          Array.isArray(persistedState?.itemsCompletados_bb)
            ? persistedState.itemsCompletados_bb
            : []
        );

        return {
          ...currentState,
          ...persistedState,
          activeGame: persistedState?.activeGame || 'elden',
          itemsCompletados: itemsSet,
          itemsCompletados_bb: itemsSetBB,
          soloPerdibles: Boolean(persistedState?.soloPerdibles),
          mapaActivo: persistedState?.mapaActivo || 'surface',
          viewMode: 'hub',
          categoriaActivaChecklist: persistedState?.categoriaActivaChecklist || 'jefazos',
          expansionFilterChecklist: persistedState?.expansionFilterChecklist || 'all',
          displayModeChecklist: persistedState?.displayModeChecklist || 'grid',
          sortOrderChecklist: persistedState?.sortOrderChecklist || 'game',
          quickMarkChecklist: Boolean(persistedState?.quickMarkChecklist),
          agruparSetsChecklist: persistedState?.agruparSetsChecklist ?? true,
        };
      },
    }
  )
);

export default useTrackerStore;
