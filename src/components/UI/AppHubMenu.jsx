import React, { useEffect } from 'react';
import {
  X,
  Map,
  ListChecks,
  BookOpen,
  Sword,
  Scale,
  Trophy,
  Settings,
  HelpCircle,
  Sparkles,
  Compass,
  Crown,
  ChevronRight,
  ShieldAlert,
  Coins,
  Route,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import checklistCatalog from '../../data/checklistCatalog.json';
import { PLATINUM_CATEGORIES } from '../Platinum/PlatinumModal';

export function AppHubMenu({ isOpen, onClose, onNavigate }) {
  const {
    itemsCompletados,
    mapaActivo,
    questlines,
    selectedQuestlineId,
    viewMode,
  } = useTrackerStore();

  // Cerrar al pulsar Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Estadísticas rápidas
  const totalCatalog = checklistCatalog.totalItems || 2758;
  const completedCatalog = itemsCompletados.size;
  const catalogPct = Math.round((completedCatalog / totalCatalog) * 100);

  let platinumTotal = 0;
  let platinumDone = 0;
  PLATINUM_CATEGORIES.forEach((cat) => {
    cat.items.forEach((it) => {
      platinumTotal++;
      if (itemsCompletados.has(it.id)) platinumDone++;
    });
  });

  const activeQuest = questlines.find((q) => q.id === selectedQuestlineId) || questlines[0];

  const menuSections = [
    {
      id: 'hub',
      title: 'Mesa Redonda (Menú Inicial)',
      subtitle: 'Portal de bienvenida con todas las herramientas',
      desc: 'Pantalla principal de inicio con estadísticas globales, accesos rápidos y panel de aventurero.',
      icon: Compass,
      badge: 'Inicio',
      badgeColor: 'bg-amber-950/80 text-amber-200 border-amber-500/40',
      action: () => {
        onNavigate('hub');
        onClose();
      },
    },
    {
      id: 'checklist',
      title: 'Compendio de Coleccionables',
      subtitle: `${completedCatalog} de ${totalCatalog} ítems (${catalogPct}%)`,
      desc: 'Checklist completa de 2,758 ítems oficiales de EliteGuías (armas, hechizos, jefes, talismanes).',
      icon: ListChecks,
      badge: 'Principal',
      badgeColor: 'bg-elden-gold/20 text-elden-gold border-elden-gold/40',
      action: () => {
        onNavigate('checklist');
        onClose();
      },
    },
    {
      id: 'map',
      title: 'Mapa Interactivo',
      subtitle: `Capa actual: ${mapaActivo === 'surface' ? 'Superficie' : mapaActivo === 'underground' ? 'Subterráneo' : 'DLC Erdtree'}`,
      desc: 'Mapa cartográfico interactivo de alta resolución con 437 marcadores geolocalizados y sincronización fluida.',
      icon: Map,
      badge: 'GIS Planar',
      badgeColor: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
      action: () => {
        onNavigate('map');
        onClose();
      },
    },
    {
      id: 'builds',
      title: 'Constructor de Builds & Equipo',
      subtitle: 'Optimizador de Estadísticas y Recomendador',
      desc: 'Configura tus atributos, selecciona tu clase inicial y descubre qué armas, hechizos y talismanes puedes blandir.',
      icon: Sword,
      badge: 'Nuevo',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 animate-pulse',
      action: () => {
        onNavigate('builds');
        onClose();
      },
    },
    {
      id: 'runes',
      title: 'Calculadora de Runas & Zurrón',
      subtitle: 'Fórmula Oficial FromSoftware & Inventario',
      desc: 'Calcula el coste de runas para subir de nivel y calcula el valor de tus Runas Doradas [1]-[13] y de Señor.',
      icon: Coins,
      badge: 'Runas',
      badgeColor: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40',
      action: () => {
        onNavigate('runes');
        onClose();
      },
    },
    {
      id: 'progression',
      title: 'Ruta Óptima de Progresión',
      subtitle: '18 Regiones, Niveles & Mejoras de Armas',
      desc: 'Ruta cronológica completa con nivel recomendado (+0 a +25), mejoras sombrías y checklist de hitos regionales.',
      icon: Route,
      badge: '18 Regiones',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      action: () => {
        onNavigate('progression');
        onClose();
      },
    },
    {
      id: 'equipload',
      title: 'Calculadora de Carga & Rodamiento',
      subtitle: 'Elimina el Fat Roll y optimiza tu Aguante',
      desc: 'Curvas auténticas de carga máxima, tiers de esquiva (Ligero/Medio/Pesado) y simulador de armadura.',
      icon: Scale,
      badge: 'Herramienta',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      action: () => {
        onNavigate('equipload');
        onClose();
      },
    },
    {
      id: 'platinum',
      title: 'Salón del Platino & Recuerdos',
      subtitle: `${platinumDone} de ${platinumTotal} trofeos legendarios`,
      desc: 'Las 9 armas, 8 talismanes, 7 hechizos y 6 cenizas legendarias, más los 15 recuerdos y 7 mausoleos errantes.',
      icon: Trophy,
      badge: '100% Trofeos',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      action: () => {
        onNavigate('platinum');
        onClose();
      },
    },
    {
      id: 'guide',
      title: 'Guía de Misiones & NPCs',
      subtitle: `Questline: ${activeQuest?.nombre || 'Ranni'}`,
      desc: 'Recorrido cronológico de todas las historias secundarias, con detección de pasos bloqueables o perdibles.',
      icon: BookOpen,
      badge: 'Quests',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      action: () => {
        onNavigate('guide');
        onClose();
      },
    },
    {
      id: 'settings',
      title: 'Ajustes & Copia de Seguridad',
      subtitle: 'Respaldo JSON de tu partida',
      desc: 'Exporta tu progreso en archivo JSON o importa una partida previa para no perder nunca tus marcas.',
      icon: Settings,
      badge: 'Backup',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      action: () => {
        onNavigate('settings');
        onClose();
      },
    },
  ];

  return (
    <div
      id="app-hub-menu-overlay"
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'app-hub-menu-overlay') onClose();
      }}
    >
      <div className="bg-[#08090e] border border-amber-500/40 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-black/80 overflow-hidden relative transform transition-all animate-scaleUp text-slate-100">
        {/* Cabecera del Menú Principal */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-gradient-to-r from-[#050608] via-[#090a10] to-[#050608] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-black to-stone-900 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(201,160,80,0.25)]">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-decorative font-black tracking-wider gold-gradient-text drop-shadow">
                  GRACIA PERDIDA
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/35">
                  MENÚ PRINCIPAL
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                Centro de navegación integral de las Tierras Intermedias & Shadow of the Erdtree
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition active:scale-95"
            title="Cerrar menú (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Estado del Jugador */}
        <div className="bg-black/60 border-b border-stone-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar text-xs font-mono">
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="flex items-center gap-1.5 text-stone-300">
              <ListChecks className="w-4 h-4 text-amber-400" />
              <span>Compendio:</span>
              <strong className="text-amber-300">{completedCatalog}/{totalCatalog}</strong>
            </span>

            <span className="flex items-center gap-1.5 text-stone-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Platino:</span>
              <strong className="text-amber-300">{platinumDone}/{platinumTotal}</strong>
            </span>

            <span className="hidden sm:flex items-center gap-1.5 text-stone-300">
              <Map className="w-4 h-4 text-sky-400" />
              <span>Mapa:</span>
              <strong className="text-sky-300 capitalize">{mapaActivo}</strong>
            </span>
          </div>

          <span className="text-stone-500 text-[11px] hidden md:inline">
            Presiona <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">Esc</kbd> o toca fuera para salir
          </span>
        </div>

        {/* Grid de Secciones del Menú */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {menuSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  onClick={sec.action}
                  className="group relative rounded-2xl border border-stone-800/80 bg-gradient-to-br from-[#0c0d14] via-[#090a10] to-[#06070a] p-4 sm:p-5 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(201,160,80,0.18)] cursor-pointer transition-all duration-300 select-none flex flex-col justify-between overflow-hidden"
                >
                  {/* Resplandor decorativo de fondo */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-500/10 blur-xl pointer-events-none group-hover:bg-amber-400/20 transition-all" />

                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-black/60 border border-stone-800 group-hover:border-amber-500/50 flex items-center justify-center text-amber-400 shadow-inner transition-colors">
                          <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-sm sm:text-base text-stone-100 group-hover:text-amber-200 transition-colors">
                            {sec.title}
                          </h3>
                          <span className="text-[11px] font-mono text-stone-400 block">
                            {sec.subtitle}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${sec.badgeColor}`}>
                        {sec.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-sans leading-relaxed mt-1">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 mt-3 flex items-center justify-between text-xs font-serif text-stone-400 group-hover:text-amber-300 transition-colors">
                    <span>Acceder al módulo</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie del Menú */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#050608] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Elden Ring Companion & Guide Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
export default AppHubMenu;
