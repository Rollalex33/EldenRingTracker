import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTrackerStore } from '../../store/useTrackerStore';
import { CATEGORIAS_CONFIG, questByPasoId } from '../../data/mockData';
import { QuickFiltersBar, MAPAS_CONFIG } from './QuickFiltersBar';
import {
  Check,
  CheckCircle2,
  Circle,
  ExternalLink,
  MapPin,
  Sparkles,
  Compass,
  Scroll,
  Crosshair,
  Copy,
  X,
  Map as MapIcon,
  Layers,
  PanelLeftOpen,
} from 'lucide-react';

/**
 * Dimensiones exactas del mapa plano de alta resolución (5000 x 5000 px)
 * Proyección: L.CRS.Simple (sistema de coordenadas plano [y, x] donde [0,0] es Sudoeste y [5000,5000] es Noreste)
 */
const MAP_BOUNDS = [
  [0, 0],
  [5000, 5000],
];

const MAP_MAX_BOUNDS = [
  [-800, -800],
  [5800, 5800],
];

// Rutas a las imágenes de los 3 mapas oficiales / temáticos de Elden Ring
const MAP_IMAGES = {
  surface: './elden_ring_map.jpg',
  underground: './elden_ring_underground.jpg',
  dlc: './elden_ring_dlc.jpg',
};

/**
 * Generador de SVG vectorial por categoría para dar identidad visual única
 */
const getCategorySvg = (categoria, color, size) => {
  switch (categoria) {
    case 'graces':
      // Gracia / Llama dorada resplandeciente
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
          <circle cx="12" cy="13" r="1.5" fill="${color}" />
        </svg>
      `;
    case 'bosses':
      // Calavera amenazante de jefe de recuerdo
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="11" r="1.5" fill="${color}"/>
          <circle cx="15" cy="11" r="1.5" fill="${color}"/>
          <path d="M8 18v2h8v-2"/>
          <path d="m12.5 14-.5-.8-.5.8"/>
          <path d="M16 18a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 18"/>
        </svg>
      `;
    case 'npcs':
      // Busto / Silueta de NPC con corona dorada
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 20a6 6 0 0 0-12 0"/>
          <circle cx="12" cy="10" r="4"/>
          <circle cx="12" cy="3" r="1" fill="${color}"/>
        </svg>
      `;
    case 'weapons':
      // Espadas cruzadas de armamento legendario
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
          <line x1="13" y1="19" x2="19" y2="13"/>
          <line x1="16" y1="16" x2="20" y2="20"/>
          <line x1="19" y1="21" x2="21" y2="19"/>
        </svg>
      `;
    case 'ashes':
      // Ceniza espiritual / Espectro fantasmal
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 10h.01"/>
          <path d="M15 10h.01"/>
          <path d="M12 2a8 8 0 0 0-8 8v11l3-2.5 2.5 2 2.5-2 2.5 2 2.5-2L20 21V10a8 8 0 0 0-8-8z"/>
        </svg>
      `;
    case 'dungeons':
      // Mazmorra / Fortaleza / Catacumba
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21h18"/>
          <path d="M5 21V7l7-4 7 4v14"/>
          <path d="M9 21v-5a3 3 0 0 1 6 0v5"/>
          <path d="M9 10h.01"/>
          <path d="M15 10h.01"/>
        </svg>
      `;
    case 'spells':
      // Hechizo / Magia de astrología / Estrella de glintstone
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
    case 'key_items':
    default:
      // Objeto clave / Llave ornamental
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21 2-2 2m-1.5 1.5L13 10m-3 3-2 2a4 4 0 1 1-4-4l2-2"/>
          <circle cx="7.5" cy="16.5" r="1.5" fill="${color}"/>
          <path d="m15.5 4.5 4 4"/>
        </svg>
      `;
  }
};

/**
 * Generador de iconos vectorizados temáticos adaptados a la estética Dark Fantasy de Elden Ring
 */
const createCustomIcon = (categoria, isCompleted, isFocused, importante = false) => {
  const config = CATEGORIAS_CONFIG[categoria] || { color: '#c5a059', label: 'Punto' };
  const baseColor = isCompleted ? '#20bf6b' : config.color;
  const borderColor = isFocused ? '#ffd700' : isCompleted ? '#20bf6b' : '#c5a059';
  const size = isFocused ? 42 : importante ? 35 : 30;
  const iconInnerSize = isFocused ? 20 : importante ? 17 : 15;
  const opacity = isCompleted ? '0.7' : '1';

  const glow = isFocused
    ? '0 0 20px rgba(255, 215, 0, 0.95), 0 0 35px rgba(197, 160, 89, 0.7)'
    : isCompleted
    ? '0 0 8px rgba(32, 191, 107, 0.5)'
    : `0 0 12px ${config.color}99`;

  const pulseAnimation = isFocused ? 'animation: pulse 1.5s infinite;' : '';

  const checkBadge = isCompleted
    ? `<div style="
        position: absolute;
        bottom: -3px;
        right: -3px;
        width: 13px;
        height: 13px;
        background: #10b981;
        border: 1.5px solid #0d1117;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 6px #10b981;
      ">
        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>`
    : '';

  const html = `
    <div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 35% 35%, #1b222d 0%, #080b10 100%);
      border: ${isFocused ? '3px' : '2px'} solid ${borderColor};
      border-radius: 50%;
      box-shadow: ${glow};
      opacity: ${opacity};
      cursor: pointer;
      transform: ${isFocused ? 'scale(1.2)' : 'scale(1)'};
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      ${pulseAnimation}
    ">
      ${getCategorySvg(categoria, baseColor, iconInnerSize)}
      ${checkBadge}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'elden-thematic-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
  });
};

/**
 * Icono de retícula para el Picker de Coordenadas de desarrollador
 */
const createPickerIcon = () => {
  const html = `
    <div style="
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(245, 158, 11, 0.25);
      border: 2px dashed #f59e0b;
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.9);
      animation: pulse 1.5s infinite ease-in-out;
    ">
      <div style="
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #f59e0b;
        box-shadow: 0 0 8px #f59e0b;
      "></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'elden-picker-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

/**
 * Controlador para vuelo suave de cámara (flyTo) usando el hook useMap()
 */
function MapCameraFocusController({ zoomTarget = 0 }) {
  const map = useMap();
  const coordenadasEnfocadas = useTrackerStore((state) => state.coordenadasEnfocadas);

  useEffect(() => {
    if (
      coordenadasEnfocadas &&
      Array.isArray(coordenadasEnfocadas) &&
      coordenadasEnfocadas.length === 2
    ) {
      map.flyTo(coordenadasEnfocadas, zoomTarget, { duration: 1.5 });
    }
  }, [coordenadasEnfocadas, map, zoomTarget]);

  return null;
}

/**
 * Observador para reposicionar suavemente la vista al cambiar de mapa activo
 */
function MapLayerWatcher({ activeMap }) {
  const map = useMap();

  useEffect(() => {
    const centers = {
      surface: [2200, 2400],
      underground: [2500, 2500],
      dlc: [2500, 2500],
    };
    const center = centers[activeMap] || [2500, 2500];
    map.flyTo(center, -1, { duration: 1.2 });
  }, [activeMap, map]);

  return null;
}

/**
 * Subcomponente para capturar coordenadas reales de Elden Ring al hacer clic
 */
function CoordinatePickerListener({ isPicking, onCoordPicked }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    if (isPicking) {
      container.style.cursor = 'crosshair';
    } else {
      container.style.cursor = '';
    }
    return () => {
      container.style.cursor = '';
    };
  }, [isPicking, map]);

  useMapEvents({
    click(e) {
      if (!isPicking) return;
      // En CRS.Simple: lat = Y, lng = X
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      onCoordPicked([y, x]);
    },
  });

  return null;
}

export const EldenMap = ({ isPanelOpen = true, onOpenPanel }) => {
  const {
    locations,
    filtrosActivos,
    busqueda,
    itemsCompletados,
    toggleCompletado,
    selectedLocationId,
    pasoSeleccionadoId,
    enfocarUbicacion,
    setSelectedLocation,
    mapaActivo,
    setMapaActivo,
    soloPerdibles,
  } = useTrackerStore();

  const activeMapConfig = MAPAS_CONFIG[mapaActivo] || MAPAS_CONFIG.surface;

  // Herramienta de desarrollador para captura de coordenadas
  const isDev = Boolean(import.meta.env?.DEV || process.env.NODE_ENV === 'development');
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [pickedCoord, setPickedCoord] = useState(null);
  const [copyNotification, setCopyNotification] = useState(null);

  // Filtrar primero los marcadores que pertenecen al mapa seleccionado (Superficie / Subterráneo / DLC)
  const locationsOnCurrentMap = locations.filter((loc) => {
    const locMapa = loc.mapaOrigen || 'surface';
    return locMapa === mapaActivo;
  });

  // Filtrado reactivo de marcadores según categorías activas y búsqueda
  const visibleLocations = locationsOnCurrentMap.filter((loc) => {
    const matchCategoria = filtrosActivos.includes(loc.categoria);
    const matchBusqueda =
      !busqueda ||
      loc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      loc.region.toLowerCase().includes(busqueda.toLowerCase()) ||
      loc.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  // Helper para vincular datos de quest si el marcador pertenece a un paso (O(1))
  const getQuestInfoForLocation = (loc) => {
    if (!loc.questlinePasoId) return null;
    return questByPasoId.get(loc.questlinePasoId) || null;
  };

  const handleCoordPicked = (coords) => {
    setPickedCoord(coords);
    const textToCopy = `[${coords[0]}, ${coords[1]}]`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopyNotification(`Coordenadas capturadas: ${textToCopy} (¡Copiadas!)`);
    setTimeout(() => {
      setCopyNotification(null);
    }, 3500);
  };

  const generateJsonTemplate = (coords) => {
    return JSON.stringify(
      {
        id: `loc_${mapaActivo}_nuevo_${Date.now().toString().slice(-4)}`,
        titulo: 'Nuevo Punto de Interés',
        categoria: 'npcs',
        region: activeMapConfig.nombre,
        mapaOrigen: mapaActivo,
        coords: coords,
        descripcion: 'Descripción del hito o paso de misión.',
        eliteguiasUrl: '',
        importante: false,
      },
      null,
      2
    );
  };

  const copyJsonSnippet = (coords) => {
    const snippet = generateJsonTemplate(coords);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(snippet);
    }
    setCopyNotification('¡Snippet JSON copiado al portapapeles!');
    setTimeout(() => {
      setCopyNotification(null);
    }, 3500);
  };

  return (
    <div className="relative w-full h-full bg-elden-950 overflow-hidden select-none">
      {/* Overlay superior izquierdo: Botón de reapertura de panel (si está colapsado) + Territorio y Contadores */}
      <div className="absolute top-4 left-4 z-[500] flex items-center gap-2">
        {!isPanelOpen && onOpenPanel && (
          <button
            onClick={onOpenPanel}
            className="px-3 py-2 bg-elden-900/95 hover:bg-elden-850 text-elden-gold border border-elden-gold/50 rounded-lg shadow-gold-glow backdrop-blur flex items-center gap-2 text-xs font-serif font-bold transition active:scale-95"
            title="Abrir Guía y Filtros"
          >
            <PanelLeftOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Guía & Filtros</span>
            {soloPerdibles && (
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            )}
          </button>
        )}

        <div className="bg-elden-900/90 backdrop-blur-md border border-elden-gold/40 px-3 py-2 rounded-lg shadow-gold-glow flex items-center gap-2.5 text-xs">
          <span className="flex items-center gap-1.5 text-elden-gold font-serif font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-elden-gold" />
            <span className="hidden sm:inline">{activeMapConfig.nombre}</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300">
            Marcadores: <strong className="text-white font-mono">{visibleLocations.length}</strong>
            <span className="text-slate-500 font-mono">/{locationsOnCurrentMap.length}</span>
          </span>

          {/* Herramienta Dev: Picker de Coordenadas */}
          {isDev && (
            <>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => {
                  setIsPickerActive(!isPickerActive);
                  if (isPickerActive) setPickedCoord(null);
                }}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition flex items-center gap-1.5 border ${
                  isPickerActive
                    ? 'bg-amber-500 text-elden-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse'
                    : 'bg-elden-800/90 text-amber-300 border-amber-500/40 hover:bg-elden-700'
                }`}
                title="Activar modo captura de coordenadas haciendo clic en el mapa de Elden Ring"
              >
                <Crosshair className="w-3 h-3 text-amber-400" />
                <span>Picker Coords {isPickerActive ? 'ON' : 'OFF'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Barra Flotante Superior Derecha: Selector de Mapas + Toggles Rápidos de Filtro */}
      <QuickFiltersBar
        visibleCount={visibleLocations.length}
        totalMapCount={locationsOnCurrentMap.length}
      />

      {/* Banner flotante de instrucción cuando el Picker está activo */}
      {isPickerActive && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[500] bg-amber-950/90 border border-amber-500/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-gold-glow text-xs text-amber-200 flex items-center gap-2 animate-fadeIn">
          <Crosshair className="w-4 h-4 text-amber-400 animate-spin" />
          <span>
            <strong>Modo Picker Activo ({activeMapConfig.nombre}):</strong> Haz clic en cualquier lugar para capturar sus coordenadas.
          </span>
          <button
            onClick={() => setIsPickerActive(false)}
            className="p-1 text-amber-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Toast de confirmación de copiado */}
      {copyNotification && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-[500] bg-emerald-950/95 border border-emerald-500/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-gold-glow text-xs text-emerald-200 flex items-center gap-2 animate-fadeIn font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyNotification}</span>
        </div>
      )}

      {/* Indicador inferior izquierdo: Territorio oficial de Elden Ring */}
      <div className="absolute bottom-4 left-4 z-[500] bg-elden-900/90 backdrop-blur-md border border-elden-gold/40 px-3 py-1.5 rounded-lg shadow-gold-glow flex items-center gap-2 text-xs font-serif">
        <MapIcon className="w-3.5 h-3.5 text-elden-gold" />
        <span className="text-slate-200">{activeMapConfig.nombre} ({activeMapConfig.subtitulo})</span>
        <span className="text-slate-600">|</span>
        <span className="text-elden-gold-light font-mono text-[11px]">CRS.Simple (5000 x 5000 px)</span>
      </div>

      {/* Contenedor del Mapa con proyección plana L.CRS.Simple sobre el mapa real del juego */}
      <MapContainer
        center={[2200, 2400]}
        zoom={-1}
        minZoom={-2}
        maxZoom={2}
        maxBounds={MAP_MAX_BOUNDS}
        maxBoundsViscosity={0.9}
        crs={L.CRS.Simple}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#07090c' }}
      >
        {/* Capa de imagen correspondiente al mapa activo (Superficie / Subterráneo / DLC) */}
        <ImageOverlay
          key={mapaActivo}
          url={MAP_IMAGES[mapaActivo] || MAP_IMAGES.surface}
          bounds={MAP_BOUNDS}
          attribution="&copy; FromSoftware / Bandai Namco | Elden Ring Interactive Map"
        />

        {/* Observador para cambiar de región al cambiar de mapa */}
        <MapLayerWatcher activeMap={mapaActivo} />

        {/* Controlador de movimiento suave de cámara */}
        <MapCameraFocusController zoomTarget={0} />

        {/* Listener para el Picker de Coordenadas de desarrollador */}
        <CoordinatePickerListener
          isPicking={isPickerActive}
          onCoordPicked={handleCoordPicked}
        />

        {/* Pin temporal del Coordinate Picker */}
        {pickedCoord && (
          <Marker position={pickedCoord} icon={createPickerIcon()}>
            <Popup className="elden-popup">
              <div className="p-3.5 bg-elden-900 text-slate-100 border border-amber-500/50 rounded-xl min-w-[260px] max-w-[320px] shadow-2xl space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Crosshair className="w-3 h-3" />
                    Coordinate Picker (The Lands Between)
                  </span>
                  <button
                    onClick={() => setPickedCoord(null)}
                    className="p-0.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-0.5">Coordenadas del mapa plano:</span>
                  <code className="text-xs font-mono font-bold text-amber-300 bg-elden-950 px-2 py-1 rounded border border-amber-500/30 block">
                    [{pickedCoord[0]}, {pickedCoord[1]}]
                  </code>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCoordPicked(pickedCoord)}
                    className="flex-1 py-1.5 px-2 bg-elden-800 hover:bg-elden-700 text-amber-300 border border-amber-500/40 rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Copy className="w-3 h-3" />
                    Copiar [y, x]
                  </button>
                  <button
                    onClick={() => copyJsonSnippet(pickedCoord)}
                    className="py-1.5 px-2 bg-amber-500 hover:bg-amber-400 text-elden-950 rounded text-xs font-serif font-bold transition shadow-sm"
                    title="Copiar plantilla JSON lista para locations.json"
                  >
                    Snippet JSON
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores reactivos geolocalizados en el mapa de Elden Ring */}
        {visibleLocations.map((loc) => {
          const isLocCompleted = itemsCompletados.has(loc.id);
          const isPasoCompleted = loc.questlinePasoId
            ? itemsCompletados.has(loc.questlinePasoId)
            : false;
          const isCompleted = isLocCompleted || isPasoCompleted;

          const isFocused =
            selectedLocationId === loc.id ||
            (loc.questlinePasoId && pasoSeleccionadoId === loc.questlinePasoId);

          const config =
            CATEGORIAS_CONFIG[loc.categoria] || { label: loc.categoria, color: '#c5a059' };
          const questInfo = getQuestInfoForLocation(loc);

          return (
            <Marker
              key={loc.id}
              position={loc.coords}
              icon={createCustomIcon(loc.categoria, isCompleted, isFocused, loc.importante)}
              eventHandlers={{
                click: () => {
                  if (!isPickerActive) {
                    enfocarUbicacion(loc.coords, loc.questlinePasoId || null);
                    setSelectedLocation(loc.id);
                  }
                },
              }}
            >
              <Popup className="elden-popup">
                <div className="p-3.5 bg-elden-900 text-slate-100 border border-elden-gold/40 rounded-xl min-w-[260px] max-w-[320px] shadow-2xl">
                  {/* Encabezado: Categoría + Región */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${config.color}25`,
                        color: config.color,
                        border: `1px solid ${config.color}60`,
                      }}
                    >
                      {config.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-serif flex items-center gap-1">
                      <Compass className="w-3 h-3 text-slate-500" />
                      {loc.region}
                    </span>
                  </div>

                  {/* Título de la ubicación */}
                  <h3 className="font-serif font-bold text-sm text-elden-gold mb-1 leading-snug">
                    {loc.titulo}
                  </h3>

                  {/* Vínculo con Questline si existe */}
                  {questInfo && (
                    <div className="mb-2 p-1.5 rounded bg-elden-950/80 border border-elden-gold/30 flex items-center gap-1.5 text-[11px] text-elden-gold-light">
                      <Scroll className="w-3 h-3 text-elden-gold flex-shrink-0" />
                      <span>
                        Misión: <strong>{questInfo.quest.npc}</strong> (Paso {questInfo.paso.orden})
                      </span>
                    </div>
                  )}

                  {/* Descripción breve */}
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {loc.descripcion}
                  </p>

                  {/* Botones de acción: Marcar completado + Enlace a EliteGuías */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                    <button
                      onClick={() => {
                        toggleCompletado(loc.id);
                        if (loc.questlinePasoId) {
                          toggleCompletado(loc.questlinePasoId);
                        }
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/50 shadow-sm'
                          : 'bg-elden-800 text-elden-gold border border-elden-gold/40 hover:bg-elden-700 hover:text-white shadow-gold-glow'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Completado</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-elden-gold" />
                          <span>Marcar Hecho</span>
                        </>
                      )}
                    </button>

                    {loc.eliteguiasUrl && (
                      <a
                        href={loc.eliteguiasUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ver detalles en EliteGuías"
                        className="px-2.5 py-1.5 bg-elden-800 hover:bg-elden-700 border border-slate-600 hover:border-elden-gold/60 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                      >
                        <span>Guía</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EldenMap;
