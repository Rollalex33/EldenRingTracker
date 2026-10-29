import React from 'react';
import {
  Sword,
  Crosshair,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Settings,
  ChevronRight,
  Coins,
  Crown,
  Eye,
  RotateCcw,
  Compass,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';

export function BloodborneHub({
  onNavigate,
  onOpenRoute,
  onOpenBuilds,
  onOpenEchoes,
  onOpenChalice,
  onOpenQuests,
  onOpenSettings,
  onSwitchGame,
}) {
  const { itemsCompletados_bb } = useTrackerStore();

  const totalCatalog = bloodborneCatalog.items.length;
  const completedCount = bloodborneCatalog.items.filter((i) => itemsCompletados_bb.has(i.id)).length;
  const catalogPct = Math.round((completedCount / (totalCatalog || 1)) * 100);

  const getHunterRank = () => {
    if (completedCount >= 400) {
      return { title: 'Gran Ser Trascendido', desc: 'Has ascendido más allá del plano cósmico de la Pesadilla.', color: 'text-purple-300' };
    }
    if (completedCount >= 250) {
      return { title: 'Cazador de Cazadores', desc: 'Portador de la Insignia de Cuervo y ejecutor de la sangre embriagada.', color: 'text-rose-400' };
    }
    if (completedCount >= 100) {
      return { title: 'Verdugo de la Iglesia', desc: 'Guerrero devoto consagrado al Taller de la Sanación.', color: 'text-rose-300' };
    }
    if (completedCount >= 30) {
      return { title: 'Cazador del Taller', desc: 'Armado con el arsenal de Gehrman en las calles de Yharnam.', color: 'text-rose-200' };
    }
    return { title: 'Cazador Iniciado', desc: 'Despertado en la camilla de la clínica por la transfusión de sangre.', color: 'text-stone-300' };
  };

  const hunterRank = getHunterRank();

  const modules = [
    {
      id: 'route',
      title: 'Ruta Óptima de Zonas & Mejoras +10',
      tagline: '18 Zonas, Fases Lunares & Objetos +10',
      desc: 'Ruta paso a paso ordenada por Nivel de Sangre (BL), lámparas, debilidades de jefes, los 47 bloques de sangre del juego base y lectura directa de EliteGuías.',
      icon: Compass,
      badge: '18 Zonas & DLC',
      badgeStyle: 'bg-rose-950 text-rose-300 border-rose-500/40',
      actionLabel: 'Ver Ruta y Mejoras',
      onClick: () => onOpenRoute(),
    },
    {
      id: 'compendium',
      title: 'Compendio de Yharnam',
      tagline: 'Compendio 100% de 457 Ítems, Atuendos, Cálices & Guía',
      desc: 'Rastrea las 26 armas con truco, 14 de fuego, 123 atuendos, herramientas, cálices, runas, gemas, jefes y personajes de la guía oficial.',
      icon: Sword,
      badge: `${completedCount} / ${totalCatalog} (${catalogPct}%)`,
      badgeStyle: 'bg-rose-950 text-rose-300 border-rose-500/40',
      actionLabel: 'Abrir Compendio',
      onClick: () => onNavigate('checklist'),
    },
    {
      id: 'quests',
      title: 'Historias de NPCs, Decisiones & Finales',
      tagline: '19 Personajes, Dilemas Éticos & 3 Finales',
      desc: 'Rastrea las misiones de los 19 NPCs de EliteGuías, consecuencias de salvar refugiados (Capilla vs Clínica), 4 cordones umbilicales y los 3 finales del Cazador.',
      icon: BookOpen,
      badge: '19 NPCs & 3 Finales',
      badgeStyle: 'bg-purple-950 text-purple-300 border-purple-500/40',
      actionLabel: 'Ver Historias y Secretos',
      onClick: () => onOpenQuests(),
    },
    {
      id: 'builds',
      title: 'Taller de Builds del Cazador',
      tagline: 'Atributos, Orígenes & Softcaps 25/50',
      desc: 'Calcula tu Nivel de Sangre (BL), optimiza Vitalidad, Habilidad y Viveza de Sangre, y descubre armas que puedes blandir.',
      icon: Crosshair,
      badge: 'Build Engine',
      badgeStyle: 'bg-rose-950 text-rose-300 border-rose-500/40',
      actionLabel: 'Configurar Build',
      onClick: () => onOpenBuilds(),
    },
    {
      id: 'echoes',
      title: 'Calculadora de Ecos & Sangre Fría',
      tagline: 'Fórmula Oficial FromSoftware & Zurrón',
      desc: 'Calcula cuántos Ecos de Sangre necesitas para subir de nivel con la Muñeca y haz inventario de tu Rocío de Sangre Fría [1]-[14].',
      icon: Coins,
      badge: 'Fórmula Exacta',
      badgeStyle: 'bg-amber-950 text-amber-300 border-amber-500/40',
      actionLabel: 'Calcular Ecos',
      onClick: () => onOpenEchoes(),
    },
    {
      id: 'chalice',
      title: 'Ruta de Cálices al Platino & Glifos',
      tagline: 'Camino Mínimo a Reina Yharnam de Pthumeru',
      desc: 'La ruta exacta sin pérdidas hacia el cáliz de Ihyll para el Trofeo de Oro, con glifos comunitarios legendarios (cummmfpk, gemas 27.2%).',
      icon: Flame,
      badge: 'Trofeo de Oro',
      badgeStyle: 'bg-rose-950 text-rose-300 border-rose-500/40',
      actionLabel: 'Ver Mazmorras del Cáliz',
      onClick: () => onOpenChalice(),
    },
    {
      id: 'settings',
      title: 'Ajustes & Respaldo JSON',
      tagline: 'Guarda o Restaura tu Progreso',
      desc: 'Exporta tus marcas en un archivo JSON o importa una partida guardada previamente para no perder nunca tus registros.',
      icon: Settings,
      badge: 'Backup',
      badgeStyle: 'bg-stone-800 text-stone-300 border-stone-700',
      actionLabel: 'Ajustes',
      onClick: () => onOpenSettings(),
    },
  ];

  return (
    <div className="h-full w-full bg-[#060508] text-slate-100 overflow-y-auto custom-scrollbar font-sans pb-20">
      {/* 1. Hero Header Gótico */}
      <header className="relative border-b border-rose-950/80 bg-gradient-to-r from-[#040306] via-[#10060d] to-[#040306] px-4 sm:px-8 py-8 sm:py-12 overflow-hidden shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-serif uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950 border border-rose-500/50 text-rose-300 font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>EL SUEÑO DEL CAZADOR · BLOODBORNE ENGINE</span>
              </span>

              {/* Botón para regresar a Elden Ring */}
              <button
                onClick={onSwitchGame}
                className="text-xs font-serif px-3 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
              >
                <span>Cambiar a Elden Ring ✦</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-wider bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent drop-shadow">
              BLOODBORNE TRACKER
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-2xl leading-relaxed">
              Tu guía integral para el 100% de Yharnam y el DLC <em>The Old Hunters</em>. Todas las herramientas góticas sincronizadas en un único taller sin interrupciones.
            </p>

            {/* Rango del Cazador */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-900/40 to-stone-900 border border-rose-500/50 flex items-center justify-center text-rose-300">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-stone-200">
                  Rango del Cazador: <span className={hunterRank.color}>{hunterRank.title}</span>
                </div>
                <div className="text-[11px] text-stone-400 font-sans">
                  {hunterRank.desc}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Progreso */}
          <div className="bg-[#0b080d] border border-rose-500/40 rounded-3xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-2xl min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-rose-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-rose-400" /> PROGRESO DE CACERÍA
              </span>
              <span className="font-serif font-black text-base text-rose-300">{catalogPct}%</span>
            </div>

            <div className="w-full h-2.5 bg-stone-900 rounded-full border border-stone-800 overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-rose-300 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.5)] transition-all duration-500"
                style={{ width: `${catalogPct}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-stone-300 flex items-center justify-between pt-1">
              <span>Completados:</span>
              <strong className="text-rose-300">{completedCount} / {totalCatalog} ítems</strong>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Grid de Módulos */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-rose-100 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-rose-400" />
              <span>Herramientas del Taller de Yharnam</span>
            </h2>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              Accede a cualquier utilidad sin mapa, diseñada con las matemáticas auténticas de Bloodborne
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={m.onClick}
                className="group relative rounded-3xl border border-rose-950/60 hover:border-rose-500/60 bg-gradient-to-br from-[#0c080e] via-[#09060b] to-[#060408] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl border border-rose-500/40 bg-rose-950/20 text-rose-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${m.badgeStyle}`}>
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 group-hover:text-rose-200 transition-colors">
                      {m.title}
                    </h3>
                    <span className="text-[11px] font-mono text-rose-400/80 block mt-0.5">
                      {m.tagline}
                    </span>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed mt-2.5">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80 mt-5 flex items-center justify-between text-xs font-serif font-bold">
                  <span className="text-stone-400 group-hover:text-rose-200 transition-colors">
                    {m.actionLabel}
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-stone-900 group-hover:bg-rose-600 group-hover:text-stone-950 text-stone-400 flex items-center justify-center transition-all">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default BloodborneHub;
