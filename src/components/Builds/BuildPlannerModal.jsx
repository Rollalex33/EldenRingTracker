import React, { useState, useMemo } from 'react';
import {
  X,
  Sword,
  Shield,
  Sparkles,
  Flame,
  Zap,
  CheckCircle2,
  Circle,
  ExternalLink,
  MapPin,
  Info,
  RotateCcw,
  Sliders,
  ChevronRight,
  TrendingUp,
  Award,
  Search,
  Filter,
  Ghost,
  Layers,
  Crown,
  Scale,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import checklistCatalog from '../../data/checklistCatalog.json';
import itemRequirements from '../../data/itemRequirements.json';
import { calcMaxEquipLoad } from '../Calculator/EquipLoadModal';
import { getItemById, findLocationForItem } from '../../utils/itemLinker';

export const STARTING_CLASSES = [
  { id: 'vagabond', name: 'Vagabundo', level: 9, desc: 'Caballero con armadura pesada y alto vigor/fuerza.', stats: { vig: 15, mte: 10, agu: 11, fue: 14, des: 13, int: 9, fe: 9, arc: 7 } },
  { id: 'samurai', name: 'Samurái', level: 9, desc: 'Especialista en katanas, destreza y arco largo.', stats: { vig: 12, mte: 11, agu: 13, fue: 12, des: 15, int: 9, fe: 8, arc: 8 } },
  { id: 'hero', name: 'Héroe', level: 7, desc: 'Bárbaro de fuerza bruta y alto aguante.', stats: { vig: 14, mte: 9, agu: 12, fue: 16, des: 9, int: 7, fe: 8, arc: 11 } },
  { id: 'warrior', name: 'Guerrero', level: 8, desc: 'Espadachín ágil con espadas duales y destreza pura.', stats: { vig: 11, mte: 12, agu: 11, fue: 10, des: 16, int: 10, fe: 8, arc: 9 } },
  { id: 'astrologer', name: 'Astrólogo', level: 6, desc: 'Erudito con catalizador y magia de piedras refulgentes.', stats: { vig: 9, mte: 15, agu: 9, fue: 8, des: 12, int: 16, fe: 7, arc: 9 } },
  { id: 'prophet', name: 'Profeta', level: 7, desc: 'Fiel devoto de encantamientos y fuego sagrado.', stats: { vig: 10, mte: 14, agu: 8, fue: 11, des: 10, int: 7, fe: 16, arc: 10 } },
  { id: 'confessor', name: 'Confesor', level: 10, desc: 'Híbrido de espada, escudo y magia de fe.', stats: { vig: 10, mte: 13, agu: 10, fue: 12, des: 12, int: 9, fe: 14, arc: 9 } },
  { id: 'bandit', name: 'Bandido', level: 5, desc: 'Asesino de sigilo con arco corto y alto arcano.', stats: { vig: 10, mte: 11, agu: 10, fue: 9, des: 13, int: 9, fe: 8, arc: 14 } },
  { id: 'prisoner', name: 'Prisionero', level: 9, desc: 'Hechicero espadachín con magia caria y estoque.', stats: { vig: 11, mte: 12, agu: 11, fue: 11, des: 14, int: 14, fe: 6, arc: 9 } },
  { id: 'wretch', name: 'Miserable', level: 1, desc: 'Tabula rasa nivel 1 con 10 en todas las estadísticas.', stats: { vig: 10, mte: 10, agu: 10, fue: 10, des: 10, int: 10, fe: 10, arc: 10 } },
];

export const BUILD_PRESETS = [
  {
    id: 'guts_str',
    name: 'Fuerza Colosal (Guts)',
    archetype: 'Fuerza Pura',
    desc: 'Espadón colosal, saltos devastadores y daño de postura máximo.',
    primaryStat: 'fue',
    targetStats: { vig: 60, mte: 15, agu: 36, fue: 66, des: 18, int: 9, fe: 15, arc: 7 },
    suggestedWeapons: ['armas_armas-p62', 'armas_armas-p170', 'armas_armas-p44'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p46'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p34', 'cenizas-espiritus_cenizas-espiritus-p47'],
    suggestedTalismans: ['talismanes_talismanes-p84', 'talismanes_talismanes-p83'],
    suggestedArmor: 'Set de caballero o armadura pesada (evitando fat roll)',
  },
  {
    id: 'rivers_bleed',
    name: 'Ríos de Sangre & Hemorragia',
    archetype: 'Destreza / Arcano',
    desc: 'Cortes rápidos con acumulación de sangre brutal que desgarran la vida porcentualmente.',
    primaryStat: 'arc',
    targetStats: { vig: 55, mte: 20, agu: 25, fue: 18, des: 50, int: 9, fe: 15, arc: 50 },
    suggestedWeapons: ['armas_armas-p276', 'armas_armas-p157'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p79', 'cenizas-guerra_cenizas-guerra-p55'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p44'],
    suggestedTalismans: ['talismanes_talismanes-p73', 'talismanes_talismanes-p22'],
    suggestedArmor: 'Máscara blanca (+10% daño con sangre) + peto ligero',
  },
  {
    id: 'moonlight_sorc',
    name: 'Archimago de la Luna Negra',
    archetype: 'Inteligencia Pura',
    desc: 'Lanzas celestiales, Cometa Azur de un solo golpe y filo de hielo lunar.',
    primaryStat: 'int',
    targetStats: { vig: 50, mte: 35, agu: 20, fue: 16, des: 14, int: 75, fe: 9, arc: 9 },
    suggestedWeapons: ['armas_armas-p198', 'hechizos_hechizos-p59', 'hechizos_hechizos-p54'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p55'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p8'],
    suggestedTalismans: ['talismanes_talismanes-p36', 'talismanes_talismanes-p53', 'talismanes_talismanes-p58'],
    suggestedArmor: 'Sombrero de bruja de las nieves / corona de reina',
  },
  {
    id: 'blasphemous_faith',
    name: 'Paladín Blasfemo & Fuego',
    archetype: 'Fe / Fuerza',
    desc: 'Regeneración vampírica constante con Hoja Blasfema y encantamientos divinos.',
    primaryStat: 'fe',
    targetStats: { vig: 55, mte: 24, agu: 28, fue: 35, des: 16, int: 9, fe: 60, arc: 9 },
    suggestedWeapons: ['armas_armas-p268', 'armas_armas-p125', 'encantamientos_encantamientos-p51'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p46'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p61', 'cenizas-espiritus_cenizas-espiritus-p44'],
    suggestedTalismans: ['talismanes_talismanes-p84', 'talismanes_talismanes-p58', 'talismanes_talismanes-p83'],
    suggestedArmor: 'Armadura dorada o crisol',
  },
];

// Fórmulas oficiales de HP, FP y Stamina
function calcHP(vig) {
  const v = Math.min(Math.max(Number(vig) || 1, 1), 99);
  if (v <= 25) return Math.round(300 + (v - 1) * (500 / 24));
  if (v <= 40) return Math.round(800 + (v - 25) * (650 / 15));
  if (v <= 60) return Math.round(1450 + (v - 40) * (450 / 20));
  return Math.round(1900 + (v - 60) * (200 / 39));
}

function calcFP(mte) {
  const m = Math.min(Math.max(Number(mte) || 1, 1), 99);
  if (m <= 15) return Math.round(50 + (m - 1) * (45 / 14));
  if (m <= 35) return Math.round(95 + (m - 15) * (105 / 20));
  if (m <= 60) return Math.round(200 + (m - 35) * (150 / 25));
  return Math.round(350 + (m - 60) * (100 / 39));
}

function calcStamina(agu) {
  const a = Math.min(Math.max(Number(agu) || 1, 1), 99);
  if (a <= 15) return Math.round(80 + (a - 1) * (25 / 14));
  if (a <= 30) return Math.round(105 + (a - 15) * (25 / 15));
  if (a <= 50) return Math.round(130 + (a - 30) * (25 / 20));
  return Math.round(155 + (a - 50) * (15 / 49));
}

export function BuildPlannerModal({ isOpen, onClose, onOpenItem }) {
  const { itemsCompletados, toggleCompletado, setMapaActivo, enfocarUbicacion, setSelectedLocation, setViewMode } = useTrackerStore();

  const [selectedClassId, setSelectedClassId] = useState('vagabond');
  const baseClass = useMemo(
    () => STARTING_CLASSES.find((c) => c.id === selectedClassId) || STARTING_CLASSES[0],
    [selectedClassId]
  );

  // Estadísticas asignadas
  const [stats, setStats] = useState({ ...baseClass.stats });
  const [activeTab, setActiveTab] = useState('armas'); // 'armas' | 'hechizos' | 'talismanes' | 'cenizas' | 'armaduras'
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUsable, setOnlyUsable] = useState(true);

  // Cuando cambia la clase base, ajustar los mínimos
  const handleSelectClass = (classId) => {
    const newClass = STARTING_CLASSES.find((c) => c.id === classId) || STARTING_CLASSES[0];
    setSelectedClassId(classId);
    setStats((prev) => {
      const updated = { ...prev };
      Object.keys(newClass.stats).forEach((k) => {
        updated[k] = Math.max(newClass.stats[k], updated[k] || newClass.stats[k]);
      });
      return updated;
    });
  };

  const applyPreset = (preset) => {
    setStats((prev) => {
      const merged = { ...prev };
      Object.keys(preset.targetStats).forEach((k) => {
        merged[k] = Math.max(baseClass.stats[k], preset.targetStats[k]);
      });
      return merged;
    });
  };

  const handleStatChange = (statKey, delta) => {
    setStats((prev) => {
      const current = prev[statKey] || baseClass.stats[statKey];
      const minVal = baseClass.stats[statKey];
      const newVal = Math.min(99, Math.max(minVal, current + delta));
      return { ...prev, [statKey]: newVal };
    });
  };

  // Cálculo del Nivel de Personaje
  const characterLevel = useMemo(() => {
    let baseSum = 0;
    let currentSum = 0;
    Object.keys(baseClass.stats).forEach((k) => {
      baseSum += baseClass.stats[k];
      currentSum += stats[k] || baseClass.stats[k];
    });
    return baseClass.level + (currentSum - baseSum);
  }, [baseClass, stats]);

  // Derivadas
  const hp = useMemo(() => calcHP(stats.vig), [stats.vig]);
  const fp = useMemo(() => calcFP(stats.mte), [stats.mte]);
  const stamina = useMemo(() => calcStamina(stats.agu), [stats.agu]);
  const maxEquipLoad = useMemo(() => calcMaxEquipLoad(stats.agu), [stats.agu]);

  // Stat dominante del jugador para ponderar sinergia
  const highestStat = useMemo(() => {
    const candidates = [
      { key: 'fue', val: stats.fue },
      { key: 'des', val: stats.des },
      { key: 'int', val: stats.int },
      { key: 'fe', val: stats.fe },
      { key: 'arc', val: stats.arc },
    ];
    candidates.sort((a, b) => b.val - a.val);
    return candidates[0];
  }, [stats]);

  // Motor de Recomendación por Categoría Activa
  const recommendedItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return checklistCatalog.items
      .filter((it) => {
        // Filtrar según pestaña activa
        if (activeTab === 'armas') {
          if (it.category !== 'armas') return false;
        } else if (activeTab === 'hechizos') {
          if (it.category !== 'hechizos' && it.category !== 'encantamientos') return false;
        } else if (activeTab === 'talismanes') {
          if (it.category !== 'talismanes') return false;
        } else if (activeTab === 'cenizas') {
          if (it.category !== 'cenizas-guerra' && it.category !== 'cenizas-espiritus') return false;
        } else if (activeTab === 'armaduras') {
          if (it.category !== 'armaduras' && it.category !== 'escudos') return false;
        }

        if (q && !it.name.toLowerCase().includes(q) && !(it.subcategory && it.subcategory.toLowerCase().includes(q))) {
          return false;
        }

        // Si está activo "Solo lo que cumplo requisitos", chequear armas y hechizos
        if (onlyUsable && (it.category === 'armas' || it.category === 'hechizos' || it.category === 'encantamientos')) {
          const req = itemRequirements[it.id];
          if (req) {
            if (req.str && req.str > stats.fue) return false;
            if (req.dex && req.dex > stats.des) return false;
            if (req.int && req.int > stats.int) return false;
            if (req.fth && req.fth > stats.fe) return false;
            if (req.arc && req.arc > stats.arc) return false;
          }
        }

        // Si es armadura y queremos evitar fat roll
        if (activeTab === 'armaduras' && it.weight) {
          // Peso recomendado de una pieza individual menor al 30% de la carga máxima
          if (it.weight > maxEquipLoad * 0.35) return false;
        }

        return true;
      })
      .map((it) => {
        const req = itemRequirements[it.id] || {};
        let score = (it.attackPower || 50);

        // Bonificaciones de afinidad
        if (highestStat.key === 'int' && (req.int || 0) > 15) score += 150;
        if (highestStat.key === 'fe' && (req.fth || 0) > 15) score += 150;
        if (highestStat.key === 'fue' && (req.str || 0) > 20) score += 120;
        if (highestStat.key === 'des' && (req.dex || 0) > 20) score += 120;
        if (highestStat.key === 'arc' && (req.arc || 0) > 14) score += 140;

        // Bonificar cenizas estelares
        if (it.name.includes('Garra de león') || it.name.includes('Seppuku') || it.name.includes('Paso del sabueso')) score += 200;
        if (it.name.includes('Tiche') || it.name.includes('lágrima mimética')) score += 200;

        // Bonificar talismanes clave de daño
        if (it.name.includes('Alexander') || it.name.includes('Sangre') || it.name.includes('Godfrey') || it.name.includes('Radagon')) score += 180;

        return { item: it, req, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 45);
  }, [stats, activeTab, searchQuery, onlyUsable, highestStat, maxEquipLoad]);

  const handleGoToMap = (item) => {
    const loc = findLocationForItem(item);
    if (!loc) return;
    setMapaActivo(loc.mapaOrigen || 'surface');
    enfocarUbicacion(loc.coords, loc.questlinePasoId || null);
    setSelectedLocation(loc.id);
    setViewMode('map');
    onClose();
  };

  if (!isOpen) return null;

  const STAT_LABELS = [
    { key: 'vig', name: 'Vigor', desc: 'Aumenta tus Puntos de Salud (HP)', softcaps: 'Softcap: 40 y 60' },
    { key: 'mte', name: 'Mente', desc: 'Aumenta tus Puntos de Magia (FP)', softcaps: 'Softcap: 50 y 60' },
    { key: 'agu', name: 'Aguante', desc: 'Aumenta tu Resistencia y Carga Máxima', softcaps: 'Softcap: 30 y 50' },
    { key: 'fue', name: 'Fuerza', desc: 'Requisito para armas pesadas y colosales', softcaps: 'Softcap: 55 y 80' },
    { key: 'des', name: 'Destreza', desc: 'Requisito para armas ágiles y velocidad de conjuro', softcaps: 'Softcap: 55 y 80' },
    { key: 'int', name: 'Inteligencia', desc: 'Poder de hechizos y armas mágicas', softcaps: 'Softcap: 60 y 80' },
    { key: 'fe', name: 'Fe', desc: 'Poder de encantamientos sagrados y fuego', softcaps: 'Softcap: 60 y 80' },
    { key: 'arc', name: 'Arcano', desc: 'Aumenta acumulación de sangrado, veneno y hallazgo', softcaps: 'Softcap: 50 y 80' },
  ];

  return (
    <div
      id="build-planner-overlay"
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'build-planner-overlay') onClose();
      }}
    >
      <div className="bg-elden-900 border border-elden-gold/50 rounded-2xl sm:rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl shadow-elden-gold/15 overflow-hidden relative transform transition-all animate-scaleUp text-slate-100">
        {/* Cabecera del Constructor */}
        <div className="p-4 sm:p-5 border-b border-elden-border bg-gradient-to-r from-elden-950 via-elden-900 to-elden-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 via-elden-950 to-elden-950 border border-elden-gold/60 flex items-center justify-center text-elden-gold shadow-gold-glow flex-shrink-0">
              <Sword className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-decorative font-bold gold-gradient-text tracking-wide">
                  Constructor de Builds & Equipo
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-elden-gold/20 text-elden-gold border border-elden-gold/40 font-bold">
                  PLANIFICADOR NIVEL {characterLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Asigna tus atributos, consulta estadísticas reales y recibe sugerencias de armas, magias, talismanes y cenizas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setStats({ ...baseClass.stats })}
              className="px-2.5 py-1.5 rounded-xl bg-elden-850 hover:bg-elden-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-serif flex items-center gap-1.5 transition active:scale-95"
              title="Restablecer a estadísticas base de la clase"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-elden-800 hover:bg-elden-750 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cuerpo scrolleable de dos columnas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-5">
          {/* Fila 1: Selector de Clase Inicial & Presets Rápidos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Selector de Clase Inicial */}
            <div className="bg-elden-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2 lg:col-span-1">
              <div className="flex items-center justify-between text-xs font-serif font-bold text-amber-200">
                <span>Clase Inicial</span>
                <span className="text-[10px] font-mono text-slate-400">Nivel base: {baseClass.level}</span>
              </div>
              <select
                value={selectedClassId}
                onChange={(e) => handleSelectClass(e.target.value)}
                className="w-full bg-elden-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-serif font-bold text-amber-100 focus:outline-none focus:border-elden-gold cursor-pointer"
              >
                {STARTING_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} (Nvl. {cls.level})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 italic">
                {baseClass.desc}
              </p>
            </div>

            {/* Presets de Arquetipos Populares */}
            <div className="bg-elden-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2 lg:col-span-2">
              <span className="text-xs font-serif font-bold text-amber-200 block">
                Arquetipos y Metas Populares (Presets)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {BUILD_PRESETS.map((pst) => (
                  <button
                    key={pst.id}
                    type="button"
                    onClick={() => applyPreset(pst)}
                    className="p-2 rounded-xl bg-elden-900/90 hover:bg-elden-850 border border-slate-800 hover:border-elden-gold/60 text-left transition flex flex-col justify-between group"
                  >
                    <span className="text-[11px] font-serif font-bold text-amber-200 group-hover:text-amber-100 truncate block">
                      {pst.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 truncate block mt-0.5">
                      {pst.archetype}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fila 2: Panel de Estadísticas Primarias y Derivadas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Columna Izquierda: Los 8 Atributos (7 columnas en desktop) */}
            <div className="lg:col-span-7 bg-elden-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-serif font-bold text-amber-100">
                  Asignación de Atributos
                </span>
                <span className="text-xs font-mono text-elden-gold font-bold">
                  Nivel de Personaje: {characterLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STAT_LABELS.map((stat) => {
                  const currentVal = stats[stat.key];
                  const minVal = baseClass.stats[stat.key];

                  return (
                    <div
                      key={stat.key}
                      className="p-2.5 rounded-xl bg-elden-900/70 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-serif font-bold text-amber-200 truncate">
                            {stat.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            (Base: {minVal})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block truncate">
                          {stat.softcaps}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          disabled={currentVal <= minVal}
                          onClick={() => handleStatChange(stat.key, -1)}
                          className="w-6 h-6 rounded-md bg-elden-850 hover:bg-elden-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-mono text-xs font-bold border border-slate-700 flex items-center justify-center active:scale-95"
                        >
                          -
                        </button>

                        <span className="w-8 text-center font-mono font-bold text-sm text-slate-100">
                          {currentVal}
                        </span>

                        <button
                          type="button"
                          disabled={currentVal >= 99}
                          onClick={() => handleStatChange(stat.key, 1)}
                          className="w-6 h-6 rounded-md bg-elden-850 hover:bg-elden-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-mono text-xs font-bold border border-slate-700 flex items-center justify-center active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Estadísticas Derivadas (5 columnas en desktop) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-elden-950 via-elden-900 to-elden-950 border border-elden-gold/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-runic">
              <div>
                <span className="text-xs font-serif font-bold text-amber-200 block mb-3">
                  Estadísticas Derivadas del Personaje
                </span>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-elden-950/80 border border-rose-900/40">
                    <span className="text-xs font-mono text-rose-300 flex items-center gap-1.5">
                      <span>❤️</span> Puntos de Salud (HP)
                    </span>
                    <span className="text-sm font-mono font-bold text-rose-200">{hp}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-elden-950/80 border border-sky-900/40">
                    <span className="text-xs font-mono text-sky-300 flex items-center gap-1.5">
                      <span>💙</span> Puntos de Magia (FP)
                    </span>
                    <span className="text-sm font-mono font-bold text-sky-200">{fp}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-elden-950/80 border border-emerald-900/40">
                    <span className="text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                      <span>🟢</span> Resistencia (Stamina)
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-200">{stamina}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-elden-950/80 border border-amber-900/40">
                    <span className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                      <span>⚖️</span> Carga Máxima de Equipo
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-200">{maxEquipLoad.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Sugerencia de Distribución */}
              <div className="p-3 rounded-xl bg-elden-950 border border-slate-800 text-xs font-sans text-slate-300">
                <span className="text-elden-gold font-serif font-bold block mb-1">
                  💡 Atributo Principal Detectado: <strong className="text-amber-200 uppercase">{highestStat.key} ({highestStat.val})</strong>
                </span>
                <span>
                  El motor filtra abajo las mejores armas, hechizos, talismanes y cenizas que explotan tu escalado en <strong>{highestStat.key.toUpperCase()}</strong>.
                </span>
              </div>
            </div>
          </div>

          {/* Fila 3: Motor de Sugerencias de Equipo Completo */}
          <div className="bg-elden-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-elden-gold" />
                  <span>Sugerencias de Equipamiento, Magias & Cenizas</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Elementos del compendio que encajan con tu arquetipo y estadísticas actuales:
                </p>
              </div>

              {/* Interruptor "Solo lo que puedo blandir" */}
              <button
                type="button"
                onClick={() => setOnlyUsable(!onlyUsable)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-serif font-bold transition flex items-center gap-1.5 active:scale-95 ${
                  onlyUsable
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                    : 'bg-elden-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solo lo que cumplo requisitos</span>
              </button>
            </div>

            {/* Selector de Pestañas de Sugerencia: Armas, Magias, Talismanes, Cenizas, Armaduras */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'armas', label: '⚔️ Armas Compatibles' },
                { id: 'hechizos', label: '🔮 Hechizos & Encantamientos' },
                { id: 'talismanes', label: '📿 Talismanes Sinérgicos' },
                { id: 'cenizas', label: '👻 Cenizas (Guerra & Espíritus)' },
                { id: 'armaduras', label: '🛡️ Armaduras & Escudos' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold border transition flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-elden-850 via-elden-800 to-elden-850 text-amber-100 border-elden-gold shadow-gold-glow'
                      : 'bg-elden-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Buscador Rápido dentro de la pestaña */}
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar dentro de ${activeTab}...`}
                className="w-full pl-8 pr-3 py-1.5 bg-elden-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-elden-gold font-sans"
              />
            </div>

            {/* Lista de Resultados Recomendados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto custom-scrollbar pr-1">
              {recommendedItems.map(({ item, req }) => {
                const isCompleted = itemsCompletados.has(item.id);
                const location = findLocationForItem(item);

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition select-none ${
                      isCompleted
                        ? 'bg-elden-950/60 border-emerald-500/30 opacity-80'
                        : 'bg-elden-900/80 border-slate-800 hover:border-elden-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-elden-950 border border-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-contain p-0.5"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <Sword className="w-4 h-4 text-elden-gold/60" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-xs font-bold text-amber-100 truncate">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mt-0.5">
                          <span>{item.subcategory || item.categoryName}</span>
                          {item.weight != null && <span>⚖️ {item.weight.toFixed(1)}</span>}
                          {item.attackPower != null && <span>⚔️ {item.attackPower}</span>}
                        </div>

                        {/* Requisitos resumidos */}
                        {Object.keys(req).length > 0 && (
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-300/80 mt-0.5">
                            {req.str && <span>Fue: {req.str}</span>}
                            {req.dex && <span>Des: {req.dex}</span>}
                            {req.int && <span>Int: {req.int}</span>}
                            {req.fth && <span>Fe: {req.fth}</span>}
                            {req.arc && <span>Arc: {req.arc}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Acciones: Marcar + Guía + Mapa */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {location && (
                        <button
                          type="button"
                          onClick={() => handleGoToMap(item)}
                          className="p-1.5 rounded-lg bg-elden-950 text-elden-gold border border-elden-gold/40 hover:bg-elden-850 transition"
                          title="Ver ubicación en mapa"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenItem(item);
                        }}
                        className="p-1.5 rounded-lg bg-elden-950 text-slate-400 hover:text-elden-gold border border-slate-700 transition"
                        title="Ver detalles en guía"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCompletado(item.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-sm'
                            : 'bg-elden-950 text-slate-500 border-slate-700 hover:text-white'
                        }`}
                        title={isCompleted ? 'Desmarcar' : 'Marcar como conseguido'}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}

              {recommendedItems.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-slate-400">
                  No se encontraron ítems compatibles con tus filtros actuales.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-elden-950 flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Planifica tus niveles y objetivos antes de gastar tus Runas en la Gracia
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
export default BuildPlannerModal;
