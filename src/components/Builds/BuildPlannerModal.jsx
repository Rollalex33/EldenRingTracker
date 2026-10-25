import React, { useState, useMemo, useEffect } from 'react';
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
  Save,
  Trash2,
  Share2,
  Check,
  Plus,
  Bookmark,
  AlertTriangle,
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
    affinity: 'Pesada',
    targetStats: { vig: 60, mte: 15, agu: 36, fue: 66, des: 18, int: 9, fe: 15, arc: 7 },
    mainWeaponId: 'armas_armas-p62', // Espadón
    suggestedWeapons: ['armas_armas-p62', 'armas_armas-p170', 'armas_armas-p44'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p46'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p34', 'cenizas-espiritus_cenizas-espiritus-p47'],
    suggestedTalismans: ['talismanes_talismanes-p84', 'talismanes_talismanes-p83'],
  },
  {
    id: 'rivers_bleed',
    name: 'Ríos de Sangre & Hemorragia',
    archetype: 'Destreza / Arcano',
    desc: 'Cortes rápidos con acumulación de sangre brutal que desgarran la vida porcentualmente.',
    primaryStat: 'arc',
    affinity: 'Sangre',
    targetStats: { vig: 55, mte: 20, agu: 25, fue: 18, des: 50, int: 9, fe: 15, arc: 50 },
    mainWeaponId: 'armas_armas-p276', // Ríos de sangre
    suggestedWeapons: ['armas_armas-p276', 'armas_armas-p157'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p79', 'cenizas-guerra_cenizas-guerra-p55'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p44'],
    suggestedTalismans: ['talismanes_talismanes-p73', 'talismanes_talismanes-p22'],
  },
  {
    id: 'moonlight_sorc',
    name: 'Archimago de la Luna Negra',
    archetype: 'Inteligencia Pura',
    desc: 'Lanzas celestiales, Cometa Azur de un solo golpe y filo de hielo lunar.',
    primaryStat: 'int',
    affinity: 'Mágica',
    targetStats: { vig: 50, mte: 35, agu: 20, fue: 16, des: 14, int: 75, fe: 9, arc: 9 },
    mainWeaponId: 'armas_armas-p198', // Espadón de la luna llena
    suggestedWeapons: ['armas_armas-p198', 'hechizos_hechizos-p59', 'hechizos_hechizos-p54'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p55'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p8'],
    suggestedTalismans: ['talismanes_talismanes-p36', 'talismanes_talismanes-p53', 'talismanes_talismanes-p58'],
  },
  {
    id: 'blasphemous_faith',
    name: 'Paladín Blasfemo & Fuego',
    archetype: 'Fe / Fuerza',
    desc: 'Regeneración vampírica constante con Hoja Blasfema y fuego de los gigantes.',
    primaryStat: 'fe',
    affinity: 'Sagrada',
    targetStats: { vig: 55, mte: 24, agu: 28, fue: 35, des: 16, int: 9, fe: 60, arc: 9 },
    mainWeaponId: 'armas_armas-p268', // Hoja blasfema
    suggestedWeapons: ['armas_armas-p268', 'armas_armas-p125', 'encantamientos_encantamientos-p51'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p46'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p61', 'cenizas-espiritus_cenizas-espiritus-p44'],
    suggestedTalismans: ['talismanes_talismanes-p84', 'talismanes_talismanes-p58', 'talismanes_talismanes-p83'],
  },
  {
    id: 'gransax_bolt',
    name: 'Rayo Francotirador de Gransax',
    archetype: 'Destreza Pura',
    desc: 'Lanza proyectiles de rayo rojo de larguísimo alcance con daño de perforación masivo.',
    primaryStat: 'des',
    affinity: 'Rayo',
    targetStats: { vig: 55, mte: 20, agu: 25, fue: 20, des: 70, int: 9, fe: 15, arc: 9 },
    mainWeaponId: 'armas_armas-p253', // Rayo de Gransax
    suggestedWeapons: ['armas_armas-p253'],
    suggestedAshesWar: ['cenizas-guerra_cenizas-guerra-p55'],
    suggestedSpirits: ['cenizas-espiritus_cenizas-espiritus-p44'],
    suggestedTalismans: ['talismanes_talismanes-p84', 'talismanes_talismanes-p83'],
  },
];

export const WEAPON_AFFINITIES = [
  { id: 'standard', name: 'Estándar', desc: 'Escalado base del arma balanceado.' },
  { id: 'heavy', name: 'Pesada', desc: 'Máximo escalado en Fuerza (Fue). Reduce los demás.' },
  { id: 'keen', name: 'Afilada', desc: 'Máximo escalado en Destreza (Des).' },
  { id: 'quality', name: 'Calidad', desc: 'Escalado híbrido idéntico en Fuerza y Destreza.' },
  { id: 'magic', name: 'Mágica', desc: 'Añade daño mágico y escalado en Inteligencia (Int).' },
  { id: 'fire', name: 'Fuego', desc: 'Añade daño ígneo con escalado en Fuerza.' },
  { id: 'flame', name: 'Fuego Sagrado', desc: 'Añade daño ígneo con escalado en Fe.' },
  { id: 'lightning', name: 'Rayo', desc: 'Añade daño eléctrico con escalado en Destreza.' },
  { id: 'sacred', name: 'Sagrada', desc: 'Añade daño sagrado y escalado en Fe.' },
  { id: 'poison', name: 'Veneno', desc: 'Añade acumulación de veneno e incrementa Arcano.' },
  { id: 'blood', name: 'Sangre', desc: 'Añade acumulación de hemorragia masiva y escalado en Arcano.' },
  { id: 'cold', name: 'Frío', desc: 'Añade congelación y escalado híbrido Int/Des.' },
  { id: 'occult', name: 'Oculto', desc: 'Máximo escalado físico puro basado en Arcano.' },
];

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

  // Loadout Activo de la Build
  const [buildName, setBuildName] = useState('Mi Build Personalizada');
  const [mainWeapon, setMainWeapon] = useState(null);
  const [offhandWeapon, setOffhandWeapon] = useState(null);
  const [selectedAffinity, setSelectedAffinity] = useState('standard');
  const [equippedTalismans, setEquippedTalismans] = useState([null, null, null, null]);
  const [equippedArmor, setEquippedArmor] = useState(null);

  // Pestaña y filtros del recomendador
  const [activeTab, setActiveTab] = useState('armas');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUsable, setOnlyUsable] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  // Builds Guardadas en LocalStorage
  const [savedBuilds, setSavedBuilds] = useState(() => {
    try {
      const stored = localStorage.getItem('er_saved_builds');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

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
    setBuildName(preset.name);
    if (preset.mainWeaponId) {
      const w = getItemById(preset.mainWeaponId);
      if (w) setMainWeapon(w);
    }
    if (preset.affinity) {
      const aff = WEAPON_AFFINITIES.find((a) => a.name.toLowerCase() === preset.affinity.toLowerCase());
      if (aff) setSelectedAffinity(aff.id);
    }
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
  const rawMaxEquipLoad = useMemo(() => calcMaxEquipLoad(stats.agu), [stats.agu]);

  // Modificador de Carga por Talismanes Equipados
  const talismanLoadMultiplier = useMemo(() => {
    let mult = 1.0;
    equippedTalismans.forEach((t) => {
      if (!t) return;
      const n = t.name.toLowerCase();
      if (n.includes('gran tarro')) mult *= 1.19;
      else if (n.includes('arsenal')) mult *= 1.15;
      else if (n.includes('árbol áureo') && n.includes('+2')) mult *= 1.08;
      else if (n.includes('árbol áureo')) mult *= 1.05;
    });
    return mult;
  }, [equippedTalismans]);

  const maxEquipLoad = rawMaxEquipLoad * talismanLoadMultiplier;

  // Peso actual del equipo equipado
  const currentEquippedWeight = useMemo(() => {
    let w = 0;
    if (mainWeapon?.weight) w += mainWeapon.weight;
    if (offhandWeapon?.weight) w += offhandWeapon.weight;
    if (equippedArmor?.weight) w += equippedArmor.weight;
    return w;
  }, [mainWeapon, offhandWeapon, equippedArmor]);

  const equipRatio = maxEquipLoad > 0 ? (currentEquippedWeight / maxEquipLoad) * 100 : 0;

  const rollTier = useMemo(() => {
    if (equipRatio <= 29.99) return { name: 'Ligero', color: 'text-emerald-400', badge: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300', desc: 'Fast Roll: 13 i-frames y máxima distancia' };
    if (equipRatio <= 69.99) return { name: 'Medio', color: 'text-amber-300', badge: 'bg-amber-950/80 border-amber-500/40 text-amber-200', desc: 'Medium Roll: 12 i-frames estándar' };
    if (equipRatio <= 100) return { name: 'Pesado (Fat Roll)', color: 'text-rose-400', badge: 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse', desc: '¡Fat Roll! Penalización grave de frames y estamina' };
    return { name: 'Sobrecarga', color: 'text-purple-400', badge: 'bg-purple-950 border-purple-500 text-purple-300', desc: '¡No puedes rodar ni correr!' };
  }, [equipRatio]);

  // Stat dominante del jugador para ponderar sinergia
  const highestStat = useMemo(() => {
    const candidates = [
      { key: 'fue', name: 'Fuerza', val: stats.fue },
      { key: 'des', name: 'Destreza', val: stats.des },
      { key: 'int', name: 'Inteligencia', val: stats.int },
      { key: 'fe', name: 'Fe', val: stats.fe },
      { key: 'arc', name: 'Arcano', val: stats.arc },
    ];
    candidates.sort((a, b) => b.val - a.val);
    return candidates[0];
  }, [stats]);

  // Motor de Recomendación por Categoría Activa
  const recommendedItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return checklistCatalog.items
      .filter((it) => {
        if (activeTab === 'armas') {
          if (it.category !== 'armas') return false;
        } else if (activeTab === 'escudos') {
          if (it.category !== 'escudos') return false;
        } else if (activeTab === 'hechizos') {
          if (it.category !== 'hechizos' && it.category !== 'encantamientos') return false;
        } else if (activeTab === 'talismanes') {
          if (it.category !== 'talismanes') return false;
        } else if (activeTab === 'cenizas') {
          if (it.category !== 'cenizas-guerra' && it.category !== 'cenizas-espiritus') return false;
        } else if (activeTab === 'armaduras') {
          if (it.category !== 'armaduras') return false;
        }

        if (q && !it.name.toLowerCase().includes(q) && !(it.subcategory && it.subcategory.toLowerCase().includes(q))) {
          return false;
        }

        const req = itemRequirements[it.id];
        if (onlyUsable && (it.category === 'armas' || it.category === 'escudos' || it.category === 'hechizos' || it.category === 'encantamientos')) {
          if (req) {
            if (req.str && req.str > stats.fue) return false;
            if (req.dex && req.dex > stats.des) return false;
            if (req.int && req.int > stats.int) return false;
            if (req.fth && req.fth > stats.fe) return false;
            if (req.arc && req.arc > stats.arc) return false;
          }
        }

        return true;
      })
      .map((it) => {
        const req = itemRequirements[it.id] || {};
        let score = (it.attackPower || 40);

        if (highestStat.key === 'int' && (req.int || 0) > 15) score += 180;
        if (highestStat.key === 'fe' && (req.fth || 0) > 15) score += 180;
        if (highestStat.key === 'fue' && (req.str || 0) > 20) score += 160;
        if (highestStat.key === 'des' && (req.dex || 0) > 20) score += 160;
        if (highestStat.key === 'arc' && (req.arc || 0) > 14) score += 170;

        if (it.name.includes('Garra de león') || it.name.includes('Seppuku') || it.name.includes('Paso del sabueso') || it.name.includes('Gigante')) score += 200;
        if (it.name.includes('Tiche') || it.name.includes('lágrima mimética')) score += 200;
        if (it.name.includes('Alexander') || it.name.includes('Sangre') || it.name.includes('Godfrey') || it.name.includes('Radagon') || it.name.includes('Tortuga')) score += 190;

        const meetsReq = !(
          (req.str && req.str > stats.fue) ||
          (req.dex && req.dex > stats.des) ||
          (req.int && req.int > stats.int) ||
          (req.fth && req.fth > stats.fe) ||
          (req.arc && req.arc > stats.arc)
        );

        return { item: it, req, score, meetsReq };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
  }, [stats, activeTab, searchQuery, onlyUsable, highestStat]);

  const handleEquipItem = (item) => {
    if (activeTab === 'armas') {
      setMainWeapon(item);
    } else if (activeTab === 'escudos') {
      setOffhandWeapon(item);
    } else if (activeTab === 'talismanes') {
      setEquippedTalismans((prev) => {
        const next = [...prev];
        const emptyIdx = next.findIndex((t) => t === null);
        if (emptyIdx !== -1) {
          next[emptyIdx] = item;
        } else {
          next[0] = item;
        }
        return next;
      });
    } else if (activeTab === 'armaduras') {
      setEquippedArmor(item);
    }
  };

  const handleSaveBuild = () => {
    const newBuild = {
      id: `build_${Date.now()}`,
      name: buildName || 'Build Sin Título',
      classId: selectedClassId,
      stats: { ...stats },
      level: characterLevel,
      mainWeaponId: mainWeapon?.id || null,
      offhandWeaponId: offhandWeapon?.id || null,
      affinity: selectedAffinity,
      talismans: equippedTalismans.map((t) => t?.id || null),
      armorId: equippedArmor?.id || null,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newBuild, ...savedBuilds.filter((b) => b.name !== newBuild.name)];
    setSavedBuilds(updated);
    try {
      localStorage.setItem('er_saved_builds', JSON.stringify(updated));
    } catch {}
  };

  const handleLoadBuild = (saved) => {
    setSelectedClassId(saved.classId || 'vagabond');
    setStats({ ...saved.stats });
    setBuildName(saved.name);
    setSelectedAffinity(saved.affinity || 'standard');
    if (saved.mainWeaponId) setMainWeapon(getItemById(saved.mainWeaponId));
    if (saved.offhandWeaponId) setOffhandWeapon(getItemById(saved.offhandWeaponId));
    if (saved.armorId) setEquippedArmor(getItemById(saved.armorId));
    if (Array.isArray(saved.talismans)) {
      setEquippedTalismans(saved.talismans.map((tid) => (tid ? getItemById(tid) : null)));
    }
  };

  const handleDeleteBuild = (id, e) => {
    e.stopPropagation();
    const updated = savedBuilds.filter((b) => b.id !== id);
    setSavedBuilds(updated);
    try {
      localStorage.setItem('er_saved_builds', JSON.stringify(updated));
    } catch {}
  };

  const handleCopyBuild = () => {
    const text = [
      `⚔️ ELDEN RING BUILD: ${buildName} (Nvl. ${characterLevel})`,
      `Clase: ${baseClass.name}`,
      `Atributos: VIG ${stats.vig} | MTE ${stats.mte} | AGU ${stats.agu} | FUE ${stats.fue} | DES ${stats.des} | INT ${stats.int} | FE ${stats.fe} | ARC ${stats.arc}`,
      `Derivadas: HP ${hp} | FP ${fp} | Stamina ${stamina} | Carga ${currentEquippedWeight.toFixed(1)}/${maxEquipLoad.toFixed(1)} (${rollTier.name})`,
      mainWeapon ? `Arma Ppal: ${mainWeapon.name} (Afinidad: ${selectedAffinity})` : null,
      offhandWeapon ? `Mano Izq: ${offhandWeapon.name}` : null,
      `Talismanes: ${equippedTalismans.filter(Boolean).map((t) => t.name).join(', ') || 'Ninguno'}`,
      equippedArmor ? `Armadura: ${equippedArmor.name}` : null,
    ].filter(Boolean).join('\n');

    navigator.clipboard?.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

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
    { key: 'vig', name: 'Vigor', desc: 'Puntos de Salud (HP)', softcaps: 'Softcaps: 40 y 60' },
    { key: 'mte', name: 'Mente', desc: 'Puntos de Magia (FP)', softcaps: 'Softcaps: 35 y 60' },
    { key: 'agu', name: 'Aguante', desc: 'Stamina y Carga Máx', softcaps: 'Softcaps: 30 y 50' },
    { key: 'fue', name: 'Fuerza', desc: 'Armas pesadas', softcaps: 'Softcaps: 55 y 80' },
    { key: 'des', name: 'Destreza', desc: 'Armas ágiles y velocidad conjuro', softcaps: 'Softcaps: 55 y 80' },
    { key: 'int', name: 'Inteligencia', desc: 'Hechicerías y armas mágicas', softcaps: 'Softcaps: 60 y 80' },
    { key: 'fe', name: 'Fe', desc: 'Encantamientos y daño sagrado/fuego', softcaps: 'Softcaps: 60 y 80' },
    { key: 'arc', name: 'Arcano', desc: 'Hemorragia, veneno y hallazgo', softcaps: 'Softcaps: 50 y 80' },
  ];

  return (
    <div
      id="build-planner-overlay"
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'build-planner-overlay') onClose();
      }}
    >
      <div className="bg-elden-900 border border-elden-gold/50 rounded-2xl sm:rounded-3xl w-full max-w-6xl max-h-[96vh] flex flex-col shadow-2xl shadow-elden-gold/15 overflow-hidden relative transform transition-all animate-scaleUp text-slate-100">
        {/* Cabecera del Constructor */}
        <div className="p-3.5 sm:p-5 border-b border-elden-border bg-gradient-to-r from-elden-950 via-elden-900 to-elden-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-elden-950 to-elden-950 border border-elden-gold/60 flex items-center justify-center text-elden-gold shadow-gold-glow flex-shrink-0">
              <Sword className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  className="bg-transparent border-b border-dashed border-elden-gold/60 text-lg sm:text-xl font-decorative font-bold gold-gradient-text tracking-wide focus:outline-none focus:border-elden-gold"
                  title="Haz clic para renombrar tu build"
                />
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-elden-gold/20 text-elden-gold border border-elden-gold/40 font-bold">
                  NIVEL {characterLevel}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${rollTier.badge}`}>
                  {rollTier.name} ({equipRatio.toFixed(1)}%)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Optimizador de Atributos, Armamento Activo, Fórmulas de Esquiva y Recomendador de Sinergias
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              onClick={handleCopyBuild}
              className="px-2.5 py-1.5 rounded-xl bg-elden-850 hover:bg-elden-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-serif flex items-center gap-1.5 transition active:scale-95"
              title="Copiar resumen de la build para Discord / Notas"
            >
              {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-elden-gold" />}
              <span className="hidden sm:inline">{copySuccess ? 'Copiada' : 'Compartir'}</span>
            </button>

            <button
              onClick={handleSaveBuild}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 via-elden-gold to-amber-500 text-elden-950 font-serif font-bold text-xs shadow-gold-glow flex items-center gap-1.5 transition active:scale-95"
              title="Guardar build actual en tu navegador"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>

            <button
              onClick={() => setStats({ ...baseClass.stats })}
              className="px-2.5 py-1.5 rounded-xl bg-elden-850 hover:bg-elden-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-serif flex items-center gap-1.5 transition active:scale-95"
              title="Restablecer atributos a la clase inicial"
            >
              <RotateCcw className="w-3.5 h-3.5" />
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

        {/* Cuerpo scrolleable */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 custom-scrollbar space-y-4">
          {/* Fila 1: Selector de Clase Inicial + Presets Populares + Builds Guardadas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Selector de Clase */}
            <div className="lg:col-span-3 bg-elden-950/80 border border-slate-800 rounded-2xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-serif font-bold text-amber-200">
                <span>Clase Inicial</span>
                <span className="text-[10px] font-mono text-slate-400">Nvl: {baseClass.level}</span>
              </div>
              <select
                value={selectedClassId}
                onChange={(e) => handleSelectClass(e.target.value)}
                className="w-full bg-elden-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-serif font-bold text-amber-100 focus:outline-none focus:border-elden-gold cursor-pointer"
              >
                {STARTING_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} (Nvl. {cls.level})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 italic truncate">
                {baseClass.desc}
              </p>
            </div>

            {/* Presets de Arquetipos Populares */}
            <div className="lg:col-span-6 bg-elden-950/80 border border-slate-800 rounded-2xl p-3 space-y-1.5">
              <span className="text-xs font-serif font-bold text-amber-200 block">
                Presets de Metas Populares
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {BUILD_PRESETS.map((pst) => (
                  <button
                    key={pst.id}
                    type="button"
                    onClick={() => applyPreset(pst)}
                    className="p-1.5 rounded-xl bg-elden-900/90 hover:bg-elden-850 border border-slate-800 hover:border-elden-gold/60 text-left transition flex flex-col justify-between group"
                  >
                    <span className="text-[11px] font-serif font-bold text-amber-200 group-hover:text-amber-100 truncate block">
                      {pst.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 truncate block">
                      {pst.archetype}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Builds Guardadas por el Usuario */}
            <div className="lg:col-span-3 bg-elden-950/80 border border-slate-800 rounded-2xl p-3 space-y-1.5">
              <span className="text-xs font-serif font-bold text-amber-200 flex items-center justify-between">
                <span>Mis Builds Guardadas</span>
                <span className="text-[10px] font-mono text-slate-400">({savedBuilds.length})</span>
              </span>
              {savedBuilds.length > 0 ? (
                <div className="space-y-1 max-h-20 overflow-y-auto custom-scrollbar">
                  {savedBuilds.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleLoadBuild(b)}
                      className="px-2 py-1 rounded-lg bg-elden-900 hover:bg-elden-850 border border-slate-800 hover:border-elden-gold/50 flex items-center justify-between gap-1 text-[11px] cursor-pointer"
                    >
                      <span className="truncate text-slate-200 font-serif">{b.name} (Nvl. {b.level})</span>
                      <button
                        onClick={(e) => handleDeleteBuild(b.id, e)}
                        className="text-slate-500 hover:text-rose-400 p-0.5"
                        title="Eliminar build"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 italic py-2 text-center">
                  Guarda tu primera build con el botón de arriba
                </div>
              )}
            </div>
          </div>

          {/* Fila 2: Asignación de Atributos & Banco de Trabajo Activo (Loadout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Columna Izquierda: Los 8 Atributos (6 columnas) */}
            <div className="lg:col-span-6 bg-elden-950/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-xs font-serif font-bold text-amber-100">
                  Asignación de Atributos
                </span>
                <span className="text-xs font-mono text-elden-gold font-bold">
                  Nivel: {characterLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STAT_LABELS.map((stat) => {
                  const currentVal = stats[stat.key];
                  const minVal = baseClass.stats[stat.key];

                  return (
                    <div
                      key={stat.key}
                      className="p-2 rounded-xl bg-elden-900/70 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-serif font-bold text-amber-200 truncate">
                            {stat.name}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">
                            ({minVal})
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 block truncate">
                          {stat.softcaps}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          disabled={currentVal <= minVal}
                          onClick={() => handleStatChange(stat.key, -1)}
                          className="w-5 h-5 rounded bg-elden-850 hover:bg-elden-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-mono text-xs font-bold border border-slate-700 flex items-center justify-center active:scale-95"
                        >
                          -
                        </button>

                        <span className="w-7 text-center font-mono font-bold text-xs text-slate-100">
                          {currentVal}
                        </span>

                        <button
                          type="button"
                          disabled={currentVal >= 99}
                          onClick={() => handleStatChange(stat.key, 1)}
                          className="w-5 h-5 rounded bg-elden-850 hover:bg-elden-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-mono text-xs font-bold border border-slate-700 flex items-center justify-center active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estadísticas Derivadas Resumidas */}
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-mono text-xs">
                <div className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/50">
                  <span className="text-[9px] text-rose-300 block">HP</span>
                  <strong className="text-rose-200 font-bold">{hp}</strong>
                </div>
                <div className="p-1.5 rounded-lg bg-sky-950/40 border border-sky-900/50">
                  <span className="text-[9px] text-sky-300 block">FP</span>
                  <strong className="text-sky-200 font-bold">{fp}</strong>
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50">
                  <span className="text-[9px] text-emerald-300 block">Stamina</span>
                  <strong className="text-emerald-200 font-bold">{stamina}</strong>
                </div>
                <div className="p-1.5 rounded-lg bg-amber-950/40 border border-amber-900/50">
                  <span className="text-[9px] text-amber-300 block">Carga Máx</span>
                  <strong className="text-amber-200 font-bold">{maxEquipLoad.toFixed(1)}</strong>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Banco de Trabajo / Equipamiento Activo (6 columnas) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-elden-950 via-elden-900 to-elden-950 border border-elden-gold/40 rounded-2xl p-3.5 space-y-3 shadow-runic">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-xs font-serif font-bold text-amber-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-elden-gold" />
                  <span>Banco de Trabajo & Equipamiento Activo</span>
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${rollTier.badge}`}>
                  {rollTier.name}
                </span>
              </div>

              {/* Medidor de Carga y Rodamiento */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    Peso: <strong className="text-slate-200">{currentEquippedWeight.toFixed(1)}</strong> / {maxEquipLoad.toFixed(1)}
                  </span>
                  <span className={`font-bold ${rollTier.color}`}>{equipRatio.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-elden-950 rounded-full border border-slate-800 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      equipRatio > 70
                        ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                        : equipRatio > 30
                        ? 'bg-gradient-to-r from-amber-600 to-amber-300 shadow-gold-glow'
                        : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                    }`}
                    style={{ width: `${Math.min(100, equipRatio)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-sans block">{rollTier.desc}</span>
              </div>

              {/* Ranuras de Equipo Activo */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Arma Principal + Afinidad */}
                <div className="p-2 rounded-xl bg-elden-950/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-serif text-amber-300/80 mb-1">
                      <span>Arma Ppal.</span>
                      {mainWeapon && (
                        <button onClick={() => setMainWeapon(null)} className="text-slate-500 hover:text-rose-400">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    {mainWeapon ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-amber-100 truncate text-[11px]">{mainWeapon.name}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">Haz clic en un arma abajo</span>
                    )}
                  </div>

                  {/* Selector de Afinidad de Ceniza de Guerra */}
                  <div className="mt-2 pt-1 border-t border-slate-800/80">
                    <span className="text-[9px] text-slate-400 block mb-0.5">Afinidad:</span>
                    <select
                      value={selectedAffinity}
                      onChange={(e) => setSelectedAffinity(e.target.value)}
                      className="w-full bg-elden-900 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-amber-200 focus:outline-none cursor-pointer"
                    >
                      {WEAPON_AFFINITIES.map((aff) => (
                        <option key={aff.id} value={aff.id}>
                          {aff.name} ({aff.desc.slice(0, 24)}...)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mano Izquierda / Escudo / Catalizador */}
                <div className="p-2 rounded-xl bg-elden-950/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-serif text-amber-300/80 mb-1">
                      <span>Mano Izq. / Escudo</span>
                      {offhandWeapon && (
                        <button onClick={() => setOffhandWeapon(null)} className="text-slate-500 hover:text-rose-400">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    {offhandWeapon ? (
                      <span className="font-serif font-bold text-amber-100 truncate block text-[11px]">{offhandWeapon.name}</span>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">Haz clic en un escudo abajo</span>
                    )}
                  </div>

                  {/* Armadura recomendada equipada */}
                  <div className="mt-2 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                      <span>Armadura:</span>
                      {equippedArmor && (
                        <button onClick={() => setEquippedArmor(null)} className="text-slate-500 hover:text-rose-400">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-amber-100 truncate block font-serif">
                      {equippedArmor ? equippedArmor.name : 'Ninguna (Ligero)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Ranuras de Talismanes */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-serif font-bold text-amber-200 block">
                  4 Ranuras de Talismanes Activos
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {equippedTalismans.map((tal, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded-lg bg-elden-950/90 border border-slate-800 flex items-center justify-between gap-1 text-[10px]"
                    >
                      <span className="truncate text-amber-100 font-serif">
                        {tal ? tal.name : `Talisman ${idx + 1}`}
                      </span>
                      {tal && (
                        <button
                          onClick={() => {
                            setEquippedTalismans((prev) => {
                              const next = [...prev];
                              next[idx] = null;
                              return next;
                            });
                          }}
                          className="text-slate-500 hover:text-rose-400 flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fila 3: Recomendador Inteligente por Pestañas */}
          <div className="bg-elden-950/90 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div>
                <h3 className="text-xs font-serif font-bold text-amber-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-elden-gold" />
                  <span>Sugerencias de Equipamiento compatibles con tu arquetipo</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Atributo primario: <strong className="text-amber-200 uppercase">{highestStat.name} ({highestStat.val})</strong> · Toca un ítem para equiparlo en tu loadout
                </p>
              </div>

              {/* Interruptor Solo Usables */}
              <button
                type="button"
                onClick={() => setOnlyUsable(!onlyUsable)}
                className={`px-2.5 py-1 rounded-xl border text-xs font-serif font-bold transition flex items-center gap-1.5 active:scale-95 ${
                  onlyUsable
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-sm'
                    : 'bg-elden-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solo lo que cumplo requisitos</span>
              </button>
            </div>

            {/* Pestañas de Categoría */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
              {[
                { id: 'armas', label: '⚔️ Armas Compatibles' },
                { id: 'escudos', label: '🛡️ Escudos & Sellos' },
                { id: 'hechizos', label: '🔮 Hechizos & Magias' },
                { id: 'talismanes', label: '📿 Talismanes Sinérgicos' },
                { id: 'cenizas', label: '👻 Cenizas (Guerra & Espíritus)' },
                { id: 'armaduras', label: '🛡️ Armaduras Recomendadas' },
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

            {/* Buscador dentro de la pestaña */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-80 overflow-y-auto custom-scrollbar pr-1">
              {recommendedItems.map(({ item, req, meetsReq }) => {
                const isCompleted = itemsCompletados.has(item.id);
                const location = findLocationForItem(item);

                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition select-none ${
                      isCompleted
                        ? 'bg-elden-950/60 border-emerald-500/30'
                        : 'bg-elden-900/80 border-slate-800 hover:border-elden-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-elden-950 border border-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
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

                        {/* Requisitos con color según si se cumplen */}
                        {Object.keys(req).length > 0 && (
                          <div className="flex items-center gap-1.5 text-[9px] font-mono mt-0.5 flex-wrap">
                            {req.str && (
                              <span className={req.str > stats.fue ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                                Fue: {req.str}
                              </span>
                            )}
                            {req.dex && (
                              <span className={req.dex > stats.des ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                                Des: {req.dex}
                              </span>
                            )}
                            {req.int && (
                              <span className={req.int > stats.int ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                                Int: {req.int}
                              </span>
                            )}
                            {req.fth && (
                              <span className={req.fth > stats.fe ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                                Fe: {req.fth}
                              </span>
                            )}
                            {req.arc && (
                              <span className={req.arc > stats.arc ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                                Arc: {req.arc}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Acciones: Equipar + Mapa + Guía + Marcar */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEquipItem(item)}
                        className="px-2 py-1 rounded-lg bg-elden-850 hover:bg-elden-gold hover:text-elden-950 text-elden-gold border border-elden-gold/40 text-[10px] font-serif font-bold transition active:scale-95"
                        title="Equipar en tu Loadout"
                      >
                        Equipar
                      </button>

                      {location && (
                        <button
                          type="button"
                          onClick={() => handleGoToMap(item)}
                          className="p-1 rounded-lg bg-elden-950 text-elden-gold border border-elden-gold/40 hover:bg-elden-850 transition"
                          title="Ver en mapa"
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
                        className="p-1 rounded-lg bg-elden-950 text-slate-400 hover:text-white border border-slate-700 transition"
                        title="Ver guía"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCompletado(item.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border transition ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-400'
                            : 'bg-elden-950 text-slate-500 border-slate-700 hover:text-white'
                        }`}
                        title={isCompleted ? 'Desmarcar' : 'Marcar como conseguido'}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}

              {recommendedItems.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-slate-400">
                  No se encontraron ítems compatibles con tus filtros y estadísticas actuales.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-elden-950 flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Configura y comparte tus builds antes de forjar tus armas con el Maestro Smithing Hewg
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
