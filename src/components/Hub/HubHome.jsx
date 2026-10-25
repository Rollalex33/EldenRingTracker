import React from 'react';
import {
  Map,
  ListChecks,
  Sword,
  Scale,
  Trophy,
  BookOpen,
  Settings,
  Sparkles,
  Compass,
  ExternalLink,
  ChevronRight,
  Coins,
  Route,
  Award,
  Crown,
  Flame,
  Shield,
  Zap,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import checklistCatalog from '../../data/checklistCatalog.json';
import { PLATINUM_CATEGORIES } from '../Platinum/PlatinumModal';

export function HubHome({
  onNavigate,
  onOpenSettings,
  onOpenPlatinum,
  onOpenEquipLoad,
  onOpenBuilds,
  onOpenRuneCalc,
  onOpenProgression,
}) {
  const {
    itemsCompletados,
    mapaActivo,
    questlines,
    selectedQuestlineId,
  } = useTrackerStore();

  const totalCatalog = checklistCatalog.totalItems || 2758;
  const completedCatalog = itemsCompletados.size;
  const catalogPct = ((completedCatalog / totalCatalog) * 100).toFixed(1);

  // Progreso Base vs DLC
  let baseTotal = 0;
  let baseDone = 0;
  let dlcTotal = 0;
  let dlcDone = 0;

  checklistCatalog.items.forEach((it) => {
    if (it.expansion === 'dlc') {
      dlcTotal++;
      if (itemsCompletados.has(it.id)) dlcDone++;
    } else {
      baseTotal++;
      if (itemsCompletados.has(it.id)) baseDone++;
    }
  });

  // Progreso de Platino
  let platinumTotal = 0;
  let platinumDone = 0;
  PLATINUM_CATEGORIES.forEach((cat) => {
    cat.items.forEach((it) => {
      platinumTotal++;
      if (itemsCompletados.has(it.id)) platinumDone++;
    });
  });
  const platinumPct = Math.round((platinumDone / (platinumTotal || 1)) * 100);

  // Título Dinámico del Jugador
  const getTarnishedTitle = () => {
    if (completedCatalog >= 2000 || platinumDone >= 30) {
      return { title: 'Señor del Círculo (Elden Lord)', desc: 'Has dominado cada rincón de The Lands Between', color: 'text-amber-300' };
    }
    if (completedCatalog >= 1000 || platinumDone >= 20) {
      return { title: 'Portador de Grandes Runas', desc: 'Tu poder hace temblar a los semidioses', color: 'text-yellow-400' };
    }
    if (completedCatalog >= 500 || platinumDone >= 10) {
      return { title: 'Campeón del Árbol Áureo', desc: 'Un guerrero temido a lo largo del continente', color: 'text-emerald-400' };
    }
    if (completedCatalog >= 150) {
      return { title: 'Guerrero Veterano', desc: 'Has forjado tu sendero con sangre y acero', color: 'text-sky-400' };
    }
    return { title: 'Sinluz Recién Llegado', desc: 'Guiado por la Gracia hacia tu destino divino', color: 'text-stone-300' };
  };

  const tarnishedRank = getTarnishedTitle();
  const activeQuest = questlines.find((q) => q.id === selectedQuestlineId) || questlines[0];

  const tools = [
    {
      id: 'checklist',
      title: 'Compendio de Coleccionables',
      tagline: '2,758 Ítems Oficiales de EliteGuías',
      desc: 'Checklist exhaustiva de armas, armaduras, hechizos, talismanes, cenizas y jefes con filtros por expansión (Juego Base & DLC) y marcado instantáneo.',
      icon: ListChecks,
      badge: `${completedCatalog} / ${totalCatalog} (${catalogPct}%)`,
      badgeStyle: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      actionLabel: 'Abrir Compendio',
      onClick: () => onNavigate('checklist'),
      highlight: true,
      accentBorder: 'border-amber-500/50 hover:border-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
    },
    {
      id: 'map',
      title: 'Mapa Interactivo GIS',
      tagline: 'Superficie, Subterráneo y DLC Erdtree',
      desc: 'Explora The Lands Between, el Reino de las Sombras y el Mundo Subterráneo con 437 marcadores sincronizados, navegación flyTo y zoom continental.',
      icon: Map,
      badge: '437 Marcadores',
      badgeStyle: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
      actionLabel: 'Explorar Mapa',
      onClick: () => onNavigate('map'),
      accentBorder: 'border-sky-500/40 hover:border-sky-400',
      iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/40',
    },
    {
      id: 'builds',
      title: 'Constructor de Builds & Equipo',
      tagline: 'Optimizador de Atributos, Armas, Magias y Cenizas',
      desc: 'Configura tus 8 atributos, elige entre 10 clases iniciales, calcula HP/FP/Stamina con softcaps reales y recibe sugerencias de armas y talismanes compatibles.',
      icon: Sword,
      badge: 'Build Engine',
      badgeStyle: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      actionLabel: 'Diseñar Build',
      onClick: () => onOpenBuilds(),
      highlight: true,
      accentBorder: 'border-emerald-500/50 hover:border-emerald-400',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
    },
    {
      id: 'runes',
      title: 'Calculadora de Runas & Zurrón',
      tagline: 'Fórmula Oficial FromSoftware & Bolsa Dorada',
      desc: 'Calcula exactamente cuántas runas necesitas para alcanzar tu nivel objetivo. Cuenta tus Runas Doradas [1]-[13], de Héroe y Señor para saber si ya puedes subir de nivel.',
      icon: Coins,
      badge: 'Nuevo & Exclusivo',
      badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse',
      actionLabel: 'Calcular Runas',
      onClick: () => onOpenRuneCalc(),
      highlight: true,
      accentBorder: 'border-amber-400/60 hover:border-amber-300',
      iconBg: 'bg-amber-500/15 text-amber-300 border-amber-500/50',
    },
    {
      id: 'progression',
      title: 'Ruta Óptima de Progresión',
      tagline: '18 Regiones con Niveles & Mejoras de Armas',
      desc: 'Guía cronológica región por región con nivel recomendado (+0 a +25), mejoras sombrías (+1 a +10), jefes clave y checklist de hitos sin atascarte ni saltarte eventos.',
      icon: Route,
      badge: '18 Regiones',
      badgeStyle: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40',
      actionLabel: 'Ver Ruta Óptima',
      onClick: () => onOpenProgression(),
      highlight: true,
      accentBorder: 'border-yellow-500/50 hover:border-yellow-400',
      iconBg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/40',
    },
    {
      id: 'equipload',
      title: 'Calculadora de Carga & Rodamiento',
      tagline: 'Elimina el Fat Roll & Optimiza tu Aguante',
      desc: 'Simula el peso total de tu armamento y armaduras. Calcula el Aguante exacto para mantener rodamiento medio o ligero, con soporte para talismanes de carga.',
      icon: Scale,
      badge: 'Fórmulas Auténticas',
      badgeStyle: 'bg-amber-950/80 text-amber-200 border-amber-600/40',
      actionLabel: 'Calcular Carga',
      onClick: () => onOpenEquipLoad(),
      accentBorder: 'border-amber-600/40 hover:border-amber-400',
      iconBg: 'bg-amber-600/10 text-amber-300 border-amber-600/40',
    },
    {
      id: 'platinum',
      title: 'Salón del Platino & Recuerdos',
      tagline: 'Las 30 Reliquias Legendarias del 100%',
      desc: 'Rastrea las 9 armas, 8 talismanes, 7 hechizos y 6 cenizas legendarias requeridas para el Trofeo de Platino, más los 15 Recuerdos de Jefes y 7 Mausoleos Errantes.',
      icon: Trophy,
      badge: `${platinumDone} / ${platinumTotal} (${platinumPct}%)`,
      badgeStyle: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      actionLabel: 'Ver Salón del Platino',
      onClick: () => onOpenPlatinum(),
      accentBorder: 'border-purple-500/40 hover:border-purple-400',
      iconBg: 'bg-purple-500/10 text-purple-300 border-purple-500/40',
    },
    {
      id: 'guide',
      title: 'Guía de Misiones & NPCs',
      tagline: 'Recorridos Cronológicos sin Pasos Perdibles',
      desc: `Guía detallada de las historias secundarias de personajes principales (${activeQuest?.nombre || 'Ranni'}, Millicent, Alexander, etc.) con detección de bifurcaciones críticas.`,
      icon: BookOpen,
      badge: 'Quests Guiadas',
      badgeStyle: 'bg-stone-800 text-stone-300 border-stone-700',
      actionLabel: 'Ver Misiones',
      onClick: () => {
        onNavigate('map');
      },
      accentBorder: 'border-stone-700 hover:border-stone-500',
      iconBg: 'bg-stone-800 text-stone-300 border-stone-700',
    },
    {
      id: 'settings',
      title: 'Ajustes & Copia de Seguridad',
      tagline: 'Protege tu Progreso con Copias JSON',
      desc: 'Exporta toda tu partida a un archivo JSON que puedes restaurar en cualquier momento o sincronizar entre distintos dispositivos sin perder tus marcas.',
      icon: Settings,
      badge: 'Seguridad JSON',
      badgeStyle: 'bg-stone-800 text-stone-300 border-stone-700',
      actionLabel: 'Gestionar Datos',
      onClick: () => onOpenSettings(),
      accentBorder: 'border-stone-700 hover:border-stone-500',
      iconBg: 'bg-stone-800 text-stone-300 border-stone-700',
    },
  ];

  return (
    <div className="h-full w-full bg-[#06070a] text-slate-100 overflow-y-auto custom-scrollbar font-sans pb-20">
      {/* 1. Hero Header Atmosférico */}
      <header className="relative border-b border-stone-800/80 bg-gradient-to-r from-[#040508] via-[#090a10] to-[#040508] px-4 sm:px-8 py-8 sm:py-12 overflow-hidden shadow-2xl">
        {/* Resplandor áureo decorativo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-serif uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-500/50 text-amber-300 font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(201,160,80,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>LA MESA REDONDA · SANTUARIO DE GUÍAS</span>
              </span>

              <a
                href="https://www.eliteguias.com/guias/e/er/elden-ring.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-serif px-3 py-1 rounded-full bg-black/60 hover:bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 transition flex items-center gap-1"
              >
                <span>EliteGuías Oficial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-decorative font-black tracking-wider gold-gradient-text drop-shadow-lg">
              ELDEN RING TRACKER
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-2xl leading-relaxed">
              Tu centro integral de herramientas para el 100% de <em>The Lands Between</em> y <em>Shadow of the Erdtree</em>.
              Selecciona una herramienta para comenzar tu viaje sin perder ningún coleccionable.
            </p>

            {/* Tarjeta de Rango del Sinluz */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-stone-900 border border-amber-500/50 flex items-center justify-center text-amber-300">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-stone-200">
                  Rango del Sinluz: <span className={tarnishedRank.color}>{tarnishedRank.title}</span>
                </div>
                <div className="text-[11px] text-stone-400 font-sans">
                  {tarnishedRank.desc}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Resumen Rápido de Progreso Global */}
          <div className="bg-[#0a0b12] border border-amber-500/40 rounded-3xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-2xl min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-amber-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> PROGRESO TOTAL
              </span>
              <span className="font-serif font-black text-base gold-gradient-text">{catalogPct}%</span>
            </div>

            <div className="w-full h-2.5 bg-stone-900 rounded-full border border-stone-800 overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_10px_rgba(201,160,80,0.5)] transition-all duration-500"
                style={{ width: `${catalogPct}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono">
              <div className="bg-[#06070a] p-2.5 rounded-xl border border-stone-800">
                <span className="text-stone-400 block text-[10px]">Juego Base</span>
                <strong className="text-amber-200">{baseDone}/{baseTotal}</strong>
              </div>
              <div className="bg-[#06070a] p-2.5 rounded-xl border border-stone-800">
                <span className="text-purple-300 block text-[10px]">DLC Erdtree</span>
                <strong className="text-purple-200">{dlcDone}/{dlcTotal}</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Grid de Herramientas y Módulos */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-decorative font-bold text-amber-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Módulos y Herramientas del Aventurero</span>
            </h2>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              Elige cualquiera de las utilidades integradas diseñadas para dominar cada aspecto del juego
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={tool.onClick}
                className={`group relative rounded-3xl border bg-gradient-to-br from-[#0c0d15] via-[#090a10] to-[#06070a] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden ${tool.accentBorder} ${
                  tool.highlight ? 'hover:scale-[1.01]' : 'hover:scale-[1.01]'
                }`}
              >
                {/* Fondo sutil dinámico */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-amber-500/5 blur-2xl pointer-events-none group-hover:bg-amber-400/15 transition-all" />

                <div className="space-y-4">
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${tool.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${tool.badgeStyle}`}>
                      {tool.badge}
                    </span>
                  </div>

                  {/* Títulos y Descripción */}
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-[11px] font-mono text-amber-400/80 block mt-0.5">
                      {tool.tagline}
                    </span>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed mt-2.5">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                {/* Botón de Acción en la Tarjeta */}
                <div className="pt-4 border-t border-stone-800/80 mt-5 flex items-center justify-between text-xs font-serif font-bold">
                  <span className="text-stone-400 group-hover:text-amber-200 transition-colors">
                    {tool.actionLabel}
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-stone-900 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-400 flex items-center justify-center transition-all">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3. Footer con Atribuciones */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-stone-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Elden Ring Companion & Guide Engine</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenSettings()}
            className="hover:text-amber-300 transition flex items-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Ajustes & Respaldo</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default HubHome;
