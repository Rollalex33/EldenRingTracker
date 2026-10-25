import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Trophy,
  Award,
  Sword,
  Shield,
  Sparkles,
  Flame,
  Ghost,
  CheckCircle2,
  Circle,
  ExternalLink,
  MapPin,
  Info,
  Layers,
  Crown,
  AlertTriangle,
  BookmarkCheck,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import { getItemById, findLocationForItem } from '../../utils/itemLinker';

export const PLATINUM_CATEGORIES = [
  {
    id: 'armas',
    name: 'Armas Legendarias (9)',
    shortName: 'Armas',
    icon: Sword,
    description: 'Trofeo "Armamentos legendarios" (9 armas míticas)',
    items: [
      { id: 'armas_armas-p283', name: 'Espadón de la Orden Dorada', locationNote: 'Cueva de los desamparados (Sacroníveo)' },
      { id: 'armas_armas-p125', name: 'Espada de la Noche y la Llama', locationNote: 'Mansión Caria (Liurnia)' },
      { id: 'armas_armas-p170', name: 'Espadón de ruinas', locationNote: 'Castillo de la Melena Roja (Caelid)' },
      { id: 'armas_armas-p198', name: 'Espadón de la luna negra', locationNote: 'Final de la questline de Ranni' },
      { id: 'armas_armas-p62', name: 'Espadón de hoja injertada', locationNote: 'Castillo de Morne (Península)' },
      { id: 'armas_armas-p76', name: 'Cetro de devorador', locationNote: 'Bernahl (Colina de la Tempestad o Farum Azula)' },
      { id: 'armas_armas-p258', name: 'Rayo de Gransax', locationNote: 'Leyndell (¡PERDIBLE antes de Farum Azula!)', isMissable: true },
      { id: 'armas_armas-p215', name: 'Espada del ejecutor Marais', locationNote: 'Castillo Sombrío (Altus)' },
      { id: 'armas_armas-p271', name: 'Shotel del eclipse', locationNote: 'Castillo de Sol (Cumbres de los Gigantes)' },
    ],
  },
  {
    id: 'talismanes',
    name: 'Talismanes Legendarios (8)',
    shortName: 'Talismanes',
    icon: Shield,
    description: 'Trofeo "Talismanes legendarios" (8 talismanes mayores)',
    items: [
      { id: 'talismanes_talismanes-p83', name: 'Talismán de escudo grande con blasón de dragón', locationNote: 'Árbol Hierático de Miquella' },
      { id: 'talismanes_talismanes-p3', name: 'Favor del Árbol Áureo +2', locationNote: 'Leyndell, capital de ceniza' },
      { id: 'talismanes_talismanes-p36', name: 'Icono de Radagon', locationNote: 'Academia de Raya Lucaria' },
      { id: 'talismanes_talismanes-p58', name: 'Icono de Godfrey', locationNote: 'Cárcel eterna del linaje dorado (Altus)' },
      { id: 'talismanes_talismanes-p53', name: 'Luna de Nokstella', locationNote: 'Nokstella, Ciudad Eterna' },
      { id: 'talismanes_talismanes-p47', name: 'Marca ulcerada de Radagon', locationNote: 'Fuerte Faroth (Caelid)' },
      { id: 'talismanes_talismanes-p79', name: 'Marca ulcerada de Márika', locationNote: 'Elphael, tutor del Árbol Hierático' },
      { id: 'talismanes_talismanes-p86', name: 'Talismán del antiguo señor', locationNote: 'Ruinas de Farum Azula' },
    ],
  },
  {
    id: 'hechizos',
    name: 'Hechizos & Encantamientos Legendarios (7)',
    shortName: 'Hechizos',
    icon: Flame,
    description: 'Trofeos "Hechizos legendarios" y "Encantamientos legendarios"',
    items: [
      { id: 'hechizos_hechizos-p59', name: 'Cometa Azur', locationNote: 'Monte Gelmir (Hechicero Azur)' },
      { id: 'hechizos_hechizos-p60', name: 'Estrellas de ruina', locationNote: 'Escondrijo de Sellia (Maestro Lusat)' },
      { id: 'hechizos_hechizos-p54', name: 'Luna Negra de Ranni', locationNote: 'Meseta de la Luna (Torre de Chelona)' },
      { id: 'hechizos_hechizos-p67', name: 'Lluvia de estrellas de Goliath', locationNote: 'Cumbres de los Gigantes (Torre de los Herejes)' },
      { id: 'encantamientos_encantamientos-p27', name: 'Llama del dios caído', locationNote: 'Cárcel eterna del ladrón (Liurnia)' },
      { id: 'encantamientos_encantamientos-p51', name: 'Rugido de Greyoll', locationNote: 'Catedral de la Comunión del Dragón (Caelid)' },
      { id: 'encantamientos_encantamientos-p53', name: 'Estrellas de Elden', locationNote: 'Fondo de Raíz Profunda' },
    ],
  },
  {
    id: 'cenizas',
    name: 'Cenizas de Espíritus Legendarias (6)',
    shortName: 'Cenizas',
    icon: Ghost,
    description: 'Trofeo "Cenizas de espíritus legendarias" (6 invocaciones supremas)',
    items: [
      { id: 'cenizas-espiritus_cenizas-espiritus-p39', name: 'Cenizas de lágrima mimética', locationNote: 'Nokron, Ciudad Eterna (Cofre detrás de llave de espada)' },
      { id: 'cenizas-espiritus_cenizas-espiritus-p44', name: 'Tiche, la Cuchillo Negro', locationNote: 'Cárcel eterna de la cabecilla (Meseta de la Luna)' },
      { id: 'cenizas-espiritus_cenizas-espiritus-p8', name: 'Lhutel la decapitada', locationNote: 'Catacumbas de las tumbas (Península del Llanto)' },
      { id: 'cenizas-espiritus_cenizas-espiritus-p47', name: 'Kristoff, Caballero del dragón antiguo', locationNote: 'Tumba del héroe santificado (Altus)' },
      { id: 'cenizas-espiritus_cenizas-espiritus-p34', name: 'Caballero de la Melena Roja Ogha', locationNote: 'Catacumbas de los caídos en combate (Caelid)' },
      { id: 'cenizas-espiritus_cenizas-espiritus-p61', name: 'Caballera Imputrescible Finlay', locationNote: 'Elphael, tutor del Árbol Hierático' },
    ],
  },
];

export const REMEMBRANCES_DATA = [
  { id: 'objetos_objetos-p202', boss: 'Godrick el Injertado', rewardA: 'Hacha de Godrick', rewardB: 'Dragón injertado' },
  { id: 'objetos_objetos-p295', boss: 'Rennala, Reina de la Luna Llena', rewardA: 'Cetro regio carscrito', rewardB: 'Luna Llena de Rennala' },
  { id: 'objetos_objetos-p355', boss: 'Radahn, Azote de las Estrellas', rewardA: 'Espadón del Azote de las Estrellas', rewardB: 'Gran arco de león' },
  { id: 'objetos_objetos-p389', boss: 'Espíritu ancestral majestuoso', rewardA: 'Hacha con alas de ave', rewardB: 'Cuerno de espíritu ancestral' },
  { id: 'objetos_objetos-p415', boss: 'Astel, Innato del Vacío', rewardA: 'Olas de oscuridad', rewardB: 'Estrellas del bastardo' },
  { id: 'objetos_objetos-p410', boss: 'Fortissax, dragón liche', rewardA: 'Lanza de rayo de Fortissax', rewardB: 'Rayo fulgurante de la muerte' },
  { id: 'objetos_objetos-p488', boss: 'Morgott, el Rey de los Augurios', rewardA: 'Espada maldita de Morgott', rewardB: 'Grillete del rey de los Augurios' },
  { id: 'objetos_objetos-p507', boss: 'Rykard, Señor de la Blasfemia', rewardA: 'Espada blasfema', rewardB: 'Rencor de Rykard' },
  { id: 'objetos_objetos-p520', boss: 'Gigante de fuego', rewardA: 'Trenza del gigante', rewardB: 'Llama del gigante, devórame' },
  { id: 'objetos_objetos-p537', boss: 'Mohg, Señor de la Sangre', rewardA: 'Lanza sagrada de Mohgwyn', rewardB: 'Bendición de sangre' },
  { id: 'objetos_objetos-p542', boss: 'Malenia, la Espada de Miquella', rewardA: 'Mano de Malenia', rewardB: 'Floración de Malenia' },
  { id: 'objetos_objetos-p552', boss: 'Placidusax, el señor dragón', rewardA: 'Hoja pesada de dragón', rewardB: 'Ruina de Placidusax' },
  { id: 'objetos_objetos-p553', boss: 'Maliketh, la Hoja Negra', rewardA: 'Espadón de la Hoja Negra', rewardB: 'Hoja Negra' },
  { id: 'objetos_objetos-p556', boss: 'Hoarah Loux / Godfrey', rewardA: 'Hacha de Godfrey', rewardB: 'Ceniza de Hoarah Loux' },
  { id: 'objetos_objetos-p557', boss: 'Bestia de Elden / Radagon', rewardA: 'Espada de la reliquia sagrada', rewardB: 'Martillo de Marika' },
];

export const WALKING_MAUSOLEUMS = [
  { id: 'maus_weeping', name: 'Península del Llanto', region: 'Necrolimbo', hasBell: true, note: 'Todos los Recuerdos' },
  { id: 'maus_liurnia_east', name: 'Raya Lucaria Este', region: 'Liurnia', hasBell: true, note: 'Todos los Recuerdos' },
  { id: 'maus_liurnia_compound1', name: 'Complejo de Mausoleos (Norte 1)', region: 'Liurnia', hasBell: false, note: 'Solo recuerdos sin Semidiós' },
  { id: 'maus_liurnia_compound2', name: 'Complejo de Mausoleos (Norte 2)', region: 'Liurnia', hasBell: false, note: 'Solo recuerdos sin Semidiós' },
  { id: 'maus_deeproot', name: 'Fondo de Raíz Profunda', region: 'Subterráneo', hasBell: true, note: 'Todos los Recuerdos' },
  { id: 'maus_mountaintops', name: 'Castillo de Sol (Cumbres)', region: 'Cumbres', hasBell: true, note: 'Todos los Recuerdos' },
  { id: 'maus_snowfield', name: 'Campo Sacroníveo Noroeste', region: 'Sacroníveo', hasBell: true, note: 'Todos los Recuerdos' },
];

export function PlatinumModal({ isOpen, onClose, onOpenItem }) {
  const { itemsCompletados, toggleCompletado, setMapaActivo, enfocarUbicacion, setSelectedLocation, setViewMode } = useTrackerStore();
  const [activeTab, setActiveTab] = useState('armas'); // 'armas' | 'talismanes' | 'hechizos' | 'cenizas' | 'remembrances'

  // Persistencia local de mausoleos usados
  const [usedMausoleums, setUsedMausoleums] = useState(() => {
    try {
      const saved = localStorage.getItem('er_used_mausoleums');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleMausoleum = (id) => {
    setUsedMausoleums((prev) => {
      const next = prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id];
      try {
        localStorage.setItem('er_used_mausoleums', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Cálculo global de platino (30 ítems legendarios: 9 + 8 + 7 + 6)
  const platinumStats = useMemo(() => {
    let totalLeg = 0;
    let compLeg = 0;

    PLATINUM_CATEGORIES.forEach((cat) => {
      cat.items.forEach((it) => {
        totalLeg++;
        if (itemsCompletados.has(it.id)) compLeg++;
      });
    });

    const pct = totalLeg > 0 ? Math.round((compLeg / totalLeg) * 100) : 0;
    return { total: totalLeg, completed: compLeg, pct };
  }, [itemsCompletados]);

  // Manejo de vuelo al mapa
  const handleGoToMap = (itemObj) => {
    const loc = findLocationForItem(itemObj);
    if (!loc) return;
    setMapaActivo(loc.mapaOrigen || 'surface');
    enfocarUbicacion(loc.coords, loc.questlinePasoId || null);
    setSelectedLocation(loc.id);
    setViewMode('map');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="platinum-modal-overlay"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'platinum-modal-overlay') onClose();
      }}
    >
      <div className="bg-elden-900 border border-elden-gold/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-elden-gold/15 overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Cabecera del Modal */}
        <div className="p-4 sm:p-5 border-b border-elden-border bg-gradient-to-r from-elden-950 via-elden-900 to-elden-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 via-elden-950 to-elden-950 border border-elden-gold/50 flex items-center justify-center text-elden-gold shadow-gold-glow flex-shrink-0">
              <Trophy className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-decorative font-bold gold-gradient-text tracking-wide">
                  Salón del Platino & Recuerdos
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-elden-gold/20 text-elden-gold border border-elden-gold/40 font-bold">
                  100% TROFEOS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Rastreador de los 30 coleccionables legendarios y los 15 Recuerdos de Jefes Mayores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Medidor circular de Platino */}
            <div className="flex items-center gap-2 bg-elden-950 px-3 py-1.5 rounded-xl border border-elden-gold/30 shadow-inner">
              <Award className="w-4 h-4 text-elden-gold" />
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-400">PROGRESO PLATINO</div>
                <div className="text-xs font-bold text-amber-200">
                  {platinumStats.completed}/{platinumStats.total} ({platinumStats.pct}%)
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-elden-800 hover:bg-elden-750 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación por Categorías Legendarias */}
        <div className="bg-elden-950/90 border-b border-slate-800/80 px-3 sm:px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {PLATINUM_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const completedCount = cat.items.filter((it) => itemsCompletados.has(it.id)).length;
            const totalCount = cat.items.length;
            const isAllDone = completedCount === totalCount;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition border relative ${
                  isActive
                    ? 'bg-elden-850 text-amber-100 border-elden-gold shadow-gold-glow'
                    : isAllDone
                    ? 'bg-elden-900/60 text-emerald-300 border-emerald-500/40'
                    : 'bg-elden-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-elden-gold' : isAllDone ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{cat.shortName}</span>
                <span className={`text-[10px] font-mono px-1.5 rounded-md ${isAllDone ? 'bg-emerald-950 text-emerald-400' : 'bg-elden-950 text-slate-400'}`}>
                  {completedCount}/{totalCount}
                </span>
              </button>
            );
          })}

          {/* Pestaña Recuerdos de Jefes & Mausoleos */}
          <button
            type="button"
            onClick={() => setActiveTab('remembrances')}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition border relative ${
              activeTab === 'remembrances'
                ? 'bg-elden-850 text-amber-100 border-elden-gold shadow-gold-glow'
                : 'bg-elden-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Recuerdos & Mausoleos</span>
            <span className="text-[10px] font-mono px-1.5 rounded-md bg-elden-950 text-amber-300">
              15 Jefes
            </span>
          </button>
        </div>

        {/* Contenido scrolleable según pestaña activa */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {activeTab !== 'remembrances' ? (
            /* Vista de Coleccionables Legendarios */
            (() => {
              const currentCat = PLATINUM_CATEGORIES.find((c) => c.id === activeTab);
              if (!currentCat) return null;

              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <p className="text-xs text-slate-400 font-sans">
                      {currentCat.description}
                    </p>
                    <span className="text-xs font-mono text-amber-200">
                      {currentCat.items.filter((it) => itemsCompletados.has(it.id)).length} de {currentCat.items.length} conseguidos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentCat.items.map((itemMeta) => {
                      const isCompleted = itemsCompletados.has(itemMeta.id);
                      const catalogItem = getItemById(itemMeta.id);
                      const location = findLocationForItem(catalogItem || itemMeta);

                      return (
                        <div
                          key={itemMeta.id}
                          className={`rounded-xl border p-3.5 transition flex flex-col justify-between gap-3 relative select-none ${
                            isCompleted
                              ? 'bg-elden-950/70 border-emerald-500/40 shadow-sm'
                              : 'bg-gradient-to-br from-elden-850/80 via-elden-900 to-elden-950 border-slate-800 hover:border-elden-gold/50 shadow-md'
                          }`}
                        >
                          {/* Franja superior de aviso si es perdible */}
                          {itemMeta.isMissable && !isCompleted && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[10px] font-mono font-bold w-fit">
                              <AlertTriangle className="w-3 h-3 text-rose-400" />
                              <span>¡MUY PERDIBLE! Consíguelo antes de quemar Leyndell</span>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            {/* Miniatura si existe en el compendio */}
                            <div className="w-12 h-12 rounded-lg bg-elden-950 border border-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {catalogItem?.image ? (
                                <img
                                  src={catalogItem.image}
                                  alt=""
                                  className="w-full h-full object-contain p-0.5"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              ) : (
                                <Sparkles className="w-5 h-5 text-elden-gold/70" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4
                                className={`font-serif text-sm font-bold leading-tight ${
                                  isCompleted
                                    ? 'text-slate-400 line-through decoration-emerald-500/60'
                                    : 'text-amber-100'
                                }`}
                              >
                                {catalogItem?.name || itemMeta.name}
                              </h4>
                              <p className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                                <span className="text-amber-300/80">📍</span>
                                <span>{itemMeta.locationNote}</span>
                              </p>
                            </div>
                          </div>

                          {/* Barra de Acciones: Marcar + Guía + Mapa */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => toggleCompletado(itemMeta.id)}
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold transition border active:scale-95 ${
                                isCompleted
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                                  : 'bg-elden-950 text-slate-300 border-slate-700 hover:border-elden-gold hover:text-amber-200'
                              }`}
                            >
                              {isCompleted ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Conseguido</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Marcar</span>
                                </>
                              )}
                            </button>

                            <div className="flex items-center gap-1.5">
                              {location && (
                                <button
                                  type="button"
                                  onClick={() => handleGoToMap(catalogItem || itemMeta)}
                                  className="px-2 py-1.5 rounded-lg bg-elden-950 text-elden-gold border border-elden-gold/50 hover:border-elden-gold hover:bg-elden-800 text-[11px] font-serif font-bold transition flex items-center gap-1 shadow-gold-glow active:scale-95"
                                  title={`Ver en el mapa`}
                                >
                                  <MapPin className="w-3 h-3 text-elden-gold animate-pulse" />
                                  <span>Mapa</span>
                                </button>
                              )}

                              {catalogItem && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onOpenItem(catalogItem);
                                  }}
                                  className="px-2 py-1.5 rounded-lg bg-elden-950 text-slate-300 hover:text-elden-gold border border-slate-700 hover:border-elden-gold/50 text-[11px] font-serif transition flex items-center gap-1"
                                >
                                  <Info className="w-3 h-3 text-elden-gold" />
                                  <span>Guía</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : (
            /* Vista de Recuerdos de Jefes & Mausoleos Errantes */
            <div className="space-y-6">
              {/* Sección 1: Mausoleos Errantes Usados (7 en total) */}
              <div className="bg-elden-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-elden-gold" />
                      <span>Rastreador de los 7 Mausoleos Errantes (Duplicaciones)</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Solo puedes duplicar 1 recuerdo por mausoleo cada ciclo de juego. Marca los que ya hayas utilizado:
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-200 bg-elden-900 px-2.5 py-1 rounded-lg border border-slate-700">
                    {usedMausoleums.length}/7 Usados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                  {WALKING_MAUSOLEUMS.map((m) => {
                    const isUsed = usedMausoleums.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleMausoleum(m.id)}
                        className={`p-2.5 rounded-xl border text-left transition flex items-start justify-between gap-2 text-xs ${
                          isUsed
                            ? 'bg-rose-950/50 border-rose-500/50 text-slate-300 line-through'
                            : 'bg-elden-900/60 border-slate-800 text-slate-200 hover:border-elden-gold/50'
                        }`}
                      >
                        <div>
                          <div className="font-serif font-bold text-amber-200">{m.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{m.region} • {m.hasBell ? '🔔 Con Campana' : '🚫 Sin Campana'}</div>
                          <div className="text-[10px] text-slate-500 italic mt-0.5">{m.note}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border flex-shrink-0 ${
                            isUsed
                              ? 'bg-rose-900 text-rose-200 border-rose-500'
                              : 'border-slate-700 bg-elden-950'
                          }`}
                        >
                          {isUsed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 text-slate-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sección 2: Los 15 Recuerdos de Jefes Mayores */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>Los 15 Recuerdos de los Semidioses & Jefes Mayores</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Recompensas canjeables con Enia en la Mesa Redonda
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {REMEMBRANCES_DATA.map((rem) => {
                    const isDone = itemsCompletados.has(rem.id);
                    const catItem = getItemById(rem.id);

                    return (
                      <div
                        key={rem.id}
                        className={`rounded-xl border p-3.5 transition flex flex-col justify-between gap-2.5 ${
                          isDone
                            ? 'bg-elden-950/70 border-emerald-500/40'
                            : 'bg-elden-900/80 border-slate-800 hover:border-elden-gold/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-mono text-amber-300 font-bold">
                              {rem.boss}
                            </div>
                            <div className="font-serif text-sm font-bold text-slate-100">
                              {catItem?.name || rem.id}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleCompletado(rem.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-serif font-bold border transition ${
                              isDone
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                                : 'bg-elden-950 text-slate-400 border-slate-700 hover:text-white'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                            <span>{isDone ? 'Conseguido' : 'Marcar'}</span>
                          </button>
                        </div>

                        {/* Recompensas de Enia */}
                        <div className="bg-elden-950 p-2 rounded-lg border border-slate-800 text-[11px] font-sans space-y-1">
                          <span className="text-[10px] font-mono text-slate-500 block uppercase">Canje de Enia (Elige 1 o duplica):</span>
                          <div className="flex items-center justify-between text-slate-300">
                            <span>1. {rem.rewardA}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span>2. {rem.rewardB}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-elden-950 flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Sincronizado automáticamente con tu progreso global de EliteGuías
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-elden-gold hover:bg-amber-300 text-elden-950 font-serif font-bold text-xs shadow-gold-glow transition active:scale-95 ml-auto"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
export default PlatinumModal;
