import React, { useState } from 'react';
import {
  X,
  Compass,
  MapPin,
  CheckCircle2,
  Circle,
  Skull,
  Shield,
  Award,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Flame,
} from 'lucide-react';

export const PROGRESSION_ZONES = [
  {
    id: 'limgrave_west',
    title: '1. Necrolimbo Occidental & Colina Tormentosa',
    recommendedLevel: '1 - 15',
    weaponNormal: '+0 / +1',
    weaponSomber: '+0',
    type: 'early',
    summary: 'Zona inicial. Explora la Iglesia de Elleh, Catacumbas y Campamento de las Ruinas.',
    keyBosses: ['Jinete Nocturno', 'Centinela Agreste (Opcional)', 'Dragón Volador Agheel', 'Margit el Augurio Caído'],
    goldenSeeds: 2,
    sacredTears: 1,
    milestones: [
      { id: 'lim_w_1', label: 'Conseguir Corcel Espectral (Torrentera) de Melina' },
      { id: 'lim_w_2', label: 'Campana de Invocación y Cenizas de Lobos Solitarios de Renna/Ranni' },
      { id: 'lim_w_3', label: 'Frasco de Médica Milagrosa en Tercera Iglesia de Marika' },
      { id: 'lim_w_4', label: 'Derrotar a Margit el Augurio Caído' },
    ],
  },
  {
    id: 'weeping_peninsula',
    title: '2. Península del Llanto (Sur de Necrolimbo)',
    recommendedLevel: '20 - 30',
    weaponNormal: '+2 / +3',
    weaponSomber: '+1',
    type: 'early',
    summary: 'Crucial para mejorar frascos curativos temprano (3 Lágrimas Sagradas).',
    keyBosses: ['Bastardo Leonino (Castillo de Morne)', 'Avatar del Árbol Áureo Menor'],
    goldenSeeds: 1,
    sacredTears: 3,
    milestones: [
      { id: 'weep_1', label: 'Recoger 3 Lágrimas Sagradas en las iglesias de la península' },
      { id: 'weep_2', label: 'Completar Castillo de Morne y obtener Espadón de Hoja Injertada' },
      { id: 'weep_3', label: 'Comenzar misión de Irina y Edgar' },
    ],
  },
  {
    id: 'stormveil_castle',
    title: '3. Castillo de Velo Tormentoso',
    recommendedLevel: '30 - 40',
    weaponNormal: '+3 / +4',
    weaponSomber: '+1 / +2',
    type: 'dungeon',
    summary: 'Primera Mazmorra de Legado. Culmina con la primera Gran Runa del juego.',
    keyBosses: ['Caballero del Crisol (Foso)', 'Godrick el Injertado'],
    goldenSeeds: 2,
    sacredTears: 0,
    milestones: [
      { id: 'storm_1', label: 'Conocer a Rogier el Hechicero en la capilla' },
      { id: 'storm_2', label: 'Reclutar a Nepheli Loux antes del foso del jefe' },
      { id: 'storm_3', label: 'Derrotar a Godrick el Injertado y reclamar la Gran Runa de Godrick' },
      { id: 'storm_4', label: 'Activar Gran Runa de Godrick en la Torre Sagrada de Necrolimbo' },
    ],
  },
  {
    id: 'liurnia_lakes',
    title: '4. Liurnia de los Lagos (Sur, Este y Oeste)',
    recommendedLevel: '40 - 50',
    weaponNormal: '+4 / +6',
    weaponSomber: '+2',
    type: 'mid',
    summary: 'Vasta región acuática llena de hechiceros, torres mágicas y acceso a la academia.',
    keyBosses: ['Caballero Sabueso Darriwil', 'Dragón de Piedra Refulgente Smarag', 'Alabardero de la Guardia'],
    goldenSeeds: 2,
    sacredTears: 3,
    milestones: [
      { id: 'liur_1', label: 'Obtener Llave de Piedra Refulgente de la Academia tras Smarag' },
      { id: 'liur_2', label: 'Conocer a Rya y comprar Collares de Boggart el de los Mariscos' },
      { id: 'liur_3', label: 'Encontrar a Latenna la Albinaúrica en la Cueva de Cristal' },
      { id: 'liur_4', label: 'Iglesia de los Votos: Conocer a Miriel (Tortuga Papa) y expiación' },
    ],
  },
  {
    id: 'raya_lucaria',
    title: '5. Academia de Raya Lucaria',
    recommendedLevel: '50 - 60',
    weaponNormal: '+6 / +8',
    weaponSomber: '+3',
    type: 'dungeon',
    summary: 'Segunda Mazmorra de Legado. Desbloquea la habilidad de renacer (respec stats).',
    keyBosses: ['Lobo Rojo de Radagon', 'Rennala, Reina de la Luna Llena'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'raya_1', label: 'Obtener Amuleto de Hechicero y Llave de Repuesto para Thops' },
      { id: 'raya_2', label: 'Derrotar al Lobo Rojo de Radagon' },
      { id: 'raya_3', label: 'Derrotar a Rennala y desbloquear Respec (Renacimiento con Lágrimas Larvarias)' },
    ],
  },
  {
    id: 'caria_manor',
    title: '6. Mansión de Caria & Las Tres Hermanas',
    recommendedLevel: '55 - 65',
    weaponNormal: '+7 / +9',
    weaponSomber: '+3 / +4',
    type: 'quest',
    summary: 'Territorio de la familia real cariana. Puerta de inicio a la misión estelar de Ranni.',
    keyBosses: ['Loretta, Caballera Real'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'caria_1', label: 'Derrotar a la Caballera Real Loretta y Espadón Lunar' },
      { id: 'caria_2', label: 'Hablar con la Princesa Ranni en su torre y jurarle lealtad' },
      { id: 'caria_3', label: 'Reunirse con Blaidd, Iji y Seluvis' },
    ],
  },
  {
    id: 'siofra_river',
    title: '7. Río Siofra & Río Ainsel (Secciones Iniciales)',
    recommendedLevel: '50 - 60',
    weaponNormal: '+7 / +9',
    weaponSomber: '+3 / +4',
    type: 'underground',
    summary: 'Maravilloso cosmos subterráneo bajo el Necrolimbo y Liurnia.',
    keyBosses: ['Espíritu Ancestral', 'Soldado Draconiano de Nokstella'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'siof_1', label: 'Encender los 8 pilares de fuego en Río Siofra' },
      { id: 'siof_2', label: 'Derrotar al Espíritu Ancestral' },
      { id: 'siof_3', label: 'Conseguir Talismán Gran Jarra en Caelid Norte vía pozo de Siofra' },
    ],
  },
  {
    id: 'caelid_south',
    title: '8. Caelid Sur & Castillo de la Melena Roja',
    recommendedLevel: '60 - 70',
    weaponNormal: '+10 / +12',
    weaponSomber: '+4 / +5',
    type: 'mid',
    summary: 'Tierra podrida de escarlata. Alberga el legendario Festival de la Guerra.',
    keyBosses: ['Comandante O’Neil', 'Dragón Ekzykes', 'Radahn el Azote de las Estrellas'],
    goldenSeeds: 2,
    sacredTears: 1,
    milestones: [
      { id: 'cael_1', label: 'Completar misión de Gowry y Millicent con la Aguja Inmaculada' },
      { id: 'cael_2', label: 'Iniciar el Festival de la Melena Roja' },
      { id: 'cael_3', label: 'Derrotar al General Radahn (caída de la estrella hacia Nokron)' },
      { id: 'cael_4', label: 'Reclamar y activar la Gran Runa de Radahn en la Torre Divina de Caelid' },
    ],
  },
  {
    id: 'nokron_deeproot',
    title: '9. Nokron Ciudad Eterna & Fondo de Raíz Profunda',
    recommendedLevel: '70 - 80',
    weaponNormal: '+12 / +14',
    weaponSomber: '+5 / +6',
    type: 'underground',
    summary: 'Acceso por el cráter abierto tras Radahn. Continuación de Ranni y Fia.',
    keyBosses: ['Lágrima Mimética', 'Dúo de Gárgolas Denodadas', 'Campeones de Fia', 'Dragón Lich Fortissax'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'nokr_1', label: 'Obtener Ceniza de Invocación de Lágrima Mimética (+10 indestructible)' },
      { id: 'nokr_2', label: 'Conseguir la Hoja Dactilicida y entregar a Ranni' },
      { id: 'nokr_3', label: 'Viajar en el ataúd de piedra a Fondo de Raíz Profunda' },
      { id: 'nokr_4', label: 'Completar final del Príncipe de la Muerte con Fia y Fortissax' },
    ],
  },
  {
    id: 'altus_plateau',
    title: '10. Meseta de Altus & Monte Gelmir',
    recommendedLevel: '70 - 85',
    weaponNormal: '+14 / +16',
    weaponSomber: '+6 / +7',
    type: 'mid',
    summary: 'Campos dorados en el corazón de las Tierras Intermedias.',
    keyBosses: ['Dragón de Magma Makar', 'Dragón Antiguo Lansseax', 'Elemer de la Zarza'],
    goldenSeeds: 4,
    sacredTears: 2,
    milestones: [
      { id: 'altus_1', label: 'Llegar mediante el Gran Elevador de Dectus o Precipicio en Ruinas' },
      { id: 'altus_2', label: 'Completar Castillo Sombrío y obtener Prótesis de Valquiria para Millicent' },
      { id: 'altus_3', label: 'Reunirse con Boc, Corhyn y Máscara Dorada' },
    ],
  },
  {
    id: 'volcano_manor',
    title: '11. Mansión del Volcán',
    recommendedLevel: '80 - 90',
    weaponNormal: '+15 / +18',
    weaponSomber: '+7',
    type: 'dungeon',
    summary: 'Cueva de rebeldes herejes liderados por Tanith y devorados por Rykard.',
    keyBosses: ['Noble Sacrodermo', 'Rykard, Señor de la Blasfemia'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'volc_1', label: 'Cumplir los contratos de asesinato de Tanith (Istvan, Rileigh, Tragoth)' },
      { id: 'volc_2', label: 'Descubrir la ciudad sumergida en lava tras la pared ilusoria' },
      { id: 'volc_3', label: 'Blandir el Cazador de Serpientes y derrotar a Rykard' },
      { id: 'volc_4', label: 'Obtener la Gran Runa de Rykard y Espada Blasfema' },
    ],
  },
  {
    id: 'leyndell_capital',
    title: '12. Leyndell, Capital Real del Reino',
    recommendedLevel: '80 - 100',
    weaponNormal: '+17 / +20',
    weaponSomber: '+7 / +8',
    type: 'dungeon',
    summary: 'La cumbre dorada. Otorga paso a los pies del Gran Árbol Áureo.',
    keyBosses: ['Godfrey, Primer Señor del Círculo (Sombra)', 'Morgott, el Rey de los Augurios'],
    goldenSeeds: 3,
    sacredTears: 1,
    milestones: [
      { id: 'leyn_1', label: 'Conseguir Rayo de Gransax en la lanza gigante (¡PERDIBLE!)' },
      { id: 'leyn_2', label: 'Derrotar a Godfrey Dorado y obtener ranura de talismán extra' },
      { id: 'leyn_3', label: 'Derrotar a Morgott y desbloquear el paso al este' },
      { id: 'leyn_4', label: 'Recibir el Medallón de Rold de Melina' },
    ],
  },
  {
    id: 'mountaintops',
    title: '13. Cumbres de los Gigantes & Forja de los Gigantes',
    recommendedLevel: '90 - 110',
    weaponNormal: '+18 / +21',
    weaponSomber: '+8 / +9',
    type: 'late',
    summary: 'Picos nevados congelados donde reside la llama capaz de arder el Árbol.',
    keyBosses: ['Comandante Niall (Castillo de Sol)', 'Gigante de Fuego'],
    goldenSeeds: 2,
    sacredTears: 2,
    milestones: [
      { id: 'mount_1', label: 'Superar Castillo de Sol y obtener Mitad Izquierda del Medallón Secreto de Haligtree' },
      { id: 'mount_2', label: 'Derrotar al Gigante de Fuego' },
      { id: 'mount_3', label: 'Punto de No Retorno Parcial: Forja de los Gigantes (ignición del Árbol Áureo)' },
    ],
  },
  {
    id: 'mohgwyn_palace',
    title: '14. Palacio de Mohgwyn',
    recommendedLevel: '100 - 120',
    weaponNormal: '+20 / +24',
    weaponSomber: '+9 / +10',
    type: 'late',
    summary: 'El reino de la sangre subterráneo. Zona reina para farmear runas.',
    keyBosses: ['Mohg, Señor de la Sangre'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'mohg_1', label: 'Acceder mediante la Medalla de Varre o portal del Campo Sacroníveo' },
      { id: 'mohg_2', label: 'Granja de runas en el acantilado del pájaro y albináuricos' },
      { id: 'mohg_3', label: 'Derrotar a Mohg para desbloquear la entrada al DLC Shadow of the Erdtree' },
    ],
  },
  {
    id: 'haligtree_elphael',
    title: '15. Campo Sacroníveo & Árbol Hierático de Miquella / Elphael',
    recommendedLevel: '120 - 150',
    weaponNormal: '+25',
    weaponSomber: '+10',
    type: 'endgame',
    summary: 'La zona secreta más desafiante del juego base. Alberga a Malenia.',
    keyBosses: ['Loretta del Árbol Hierático', 'Malenia, la Espada de Miquella'],
    goldenSeeds: 2,
    sacredTears: 0,
    milestones: [
      { id: 'hali_1', label: 'Resolver el acertijo de velas de Ordina, Ciudad Litúrgica' },
      { id: 'hali_2', label: 'Cruzar las ramas de Haligtree y fortaleza de Elphael' },
      { id: 'hali_3', label: 'Derrotar a Malenia y obtener su Floración / Espada' },
      { id: 'hali_4', label: 'Aguja de Miquella: Curar la Llama Frenética si se desea' },
    ],
  },
  {
    id: 'farum_azula',
    title: '16. Farum Azula Desmoronada',
    recommendedLevel: '120 - 150',
    weaponNormal: '+25',
    weaponSomber: '+10',
    type: 'endgame',
    summary: 'Santuario suspendido en un vórtice temporal eterno.',
    keyBosses: ['Dúo Sacrodermo', 'Placidusax el Señor Dragón (Secreto)', 'Maliketh la Espada Negra'],
    goldenSeeds: 1,
    sacredTears: 0,
    milestones: [
      { id: 'farum_1', label: 'Derrotar al Dúo Sacrodermo y obtener Esfera de Piedras de Forja' },
      { id: 'farum_2', label: 'Derrotar a Maliketh y desatar la Runa de la Muerte (Leyndell cambia a ceniza)' },
    ],
  },
  {
    id: 'leyndell_ashen',
    title: '17. Leyndell, Capital de la Ceniza & Trono del Círculo',
    recommendedLevel: '130 - 150',
    weaponNormal: '+25',
    weaponSomber: '+10',
    type: 'endgame',
    summary: 'El clímax final del juego base. Conviértete en Señor del Círculo.',
    keyBosses: ['Gideon Ofnir el Omnisciente', 'Godfrey / Hoarah Loux', 'Radagon de la Orden Dorada', 'Bestia del Círculo'],
    goldenSeeds: 0,
    sacredTears: 0,
    milestones: [
      { id: 'ash_1', label: 'Superar al Sir Gideon Ofnir' },
      { id: 'ash_2', label: 'Vencer a Hoarah Loux, Guerrero en combate honorable' },
      { id: 'ash_3', label: 'Derrotar a Radagon y la Bestia del Círculo' },
      { id: 'ash_4', label: 'Escoger tu Desenlace / Final (Ranni, Fia, Orden Dorada, Llama Frenética)' },
    ],
  },
  {
    id: 'shadow_realm',
    title: '18. Reino de las Sombras (DLC Shadow of the Erdtree)',
    recommendedLevel: '150+',
    weaponNormal: '+25 (Fragmentos del Árbol 1 - 20)',
    weaponSomber: '+10 (Cenizas de Espíritu Venerado 1 - 10)',
    type: 'dlc',
    summary: 'La expansión colosal de Miquella y Messmer con sistema de bendiciones único.',
    keyBosses: ['Bestia Divina León Danzante', 'Rellana Caballera de Luna Gemela', 'Messmer el Empalador', 'Romina Santa del Brote', 'Radahn, Consorte Prometido'],
    goldenSeeds: 0,
    sacredTears: 0,
    milestones: [
      { id: 'dlc_1', label: 'Tocar el brazo marchito de Miquella en el Capullo de Mohgwyn' },
      { id: 'dlc_2', label: 'Reunir Fragmentos del Árbol Sombrío (Escala de daño hasta +105%)' },
      { id: 'dlc_3', label: 'Derrotar a Messmer en la Fortaleza Sombría' },
      { id: 'dlc_4', label: 'Quemar el Árbol Sellado y conquistar Enir-Ilim' },
    ],
  },
];

export function ProgressionRouteModal({ isOpen, onClose }) {
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('er_progression_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [expandedZoneId, setExpandedZoneId] = useState('limgrave_west');
  const [filterType, setFilterType] = useState('all');

  const toggleMilestone = (id) => {
    setCompletedMilestones((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('er_progression_milestones', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const filteredZones = PROGRESSION_ZONES.filter((zone) => {
    if (filterType === 'all') return true;
    if (filterType === 'base') return zone.type !== 'dlc';
    if (filterType === 'dlc') return zone.type === 'dlc';
    if (filterType === 'dungeon') return zone.type === 'dungeon';
    return true;
  });

  // Estadísticas globales de ruta
  const allMilestonesCount = PROGRESSION_ZONES.reduce((acc, z) => acc + z.milestones.length, 0);
  const doneMilestonesCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressionPct = Math.round((doneMilestonesCount / allMilestonesCount) * 100);

  if (!isOpen) return null;

  return (
    <div
      id="progression-modal-overlay"
      className="fixed inset-0 z-[130] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target.id === 'progression-modal-overlay') onClose();
      }}
    >
      <div className="bg-[#090a10] border border-amber-500/40 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl shadow-black overflow-hidden relative transform transition-all animate-scaleUp text-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-gradient-to-r from-[#06070a] via-[#0c0d14] to-[#06070a] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 via-black to-stone-900 border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(201,160,80,0.3)]">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-decorative font-bold gold-gradient-text tracking-wide">
                  Ruta Óptima de Progresión
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  GUÍA 18 REGIONES
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Nivel recomendado, mejoras de armas y recorrido por fases sin perder eventos ni atascarte
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition active:scale-95"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso global y filtros */}
        <div className="bg-black/60 border-b border-stone-800/80 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-stone-300">
              Hitos alcanzados: <strong className="text-amber-300">{doneMilestonesCount}</strong> / {allMilestonesCount} ({progressionPct}%)
            </div>
            <div className="w-32 bg-stone-900 rounded-full h-2 border border-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
                style={{ width: `${progressionPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition ${
                filterType === 'all'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Todas (18)
            </button>
            <button
              onClick={() => setFilterType('dungeon')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition ${
                filterType === 'dungeon'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Mazmorras de Legado
            </button>
            <button
              onClick={() => setFilterType('dlc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition ${
                filterType === 'dlc'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              Shadow of the Erdtree (DLC)
            </button>
          </div>
        </div>

        {/* Lista interactiva de zonas */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-3">
          {filteredZones.map((zone) => {
            const isExpanded = expandedZoneId === zone.id;
            const completedCount = zone.milestones.filter((m) => completedMilestones[m.id]).length;
            const isZoneComplete = completedCount === zone.milestones.length && zone.milestones.length > 0;

            return (
              <div
                key={zone.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isZoneComplete
                    ? 'bg-[#080c09] border-emerald-500/40'
                    : isExpanded
                    ? 'bg-[#0e0f17] border-amber-500/50 shadow-[0_0_15px_rgba(201,160,80,0.15)]'
                    : 'bg-[#0a0b10] border-stone-800/80 hover:border-stone-700'
                }`}
              >
                {/* Cabecera de la zona */}
                <div
                  onClick={() => setExpandedZoneId(isExpanded ? null : zone.id)}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      className="text-stone-400 hover:text-amber-300 transition"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-amber-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-stone-500" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-sm sm:text-base text-stone-100">
                          {zone.title}
                        </h3>
                        {zone.type === 'dlc' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            DLC EXPANSION
                          </span>
                        )}
                        {isZoneComplete && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> ZONA COMPLETADA
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mt-1 flex-wrap">
                        <span className="text-amber-300 font-bold">
                          Nivel: {zone.recommendedLevel}
                        </span>
                        <span>•</span>
                        <span>Normal: {zone.weaponNormal}</span>
                        <span>•</span>
                        <span>Sombría: {zone.weaponSomber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <div className="text-xs font-mono text-stone-300">
                      {completedCount} / {zone.milestones.length} hitos
                    </div>
                    {zone.sacredTears > 0 && (
                      <div className="text-[10px] font-serif text-amber-400 mt-0.5">
                        +{zone.sacredTears} Lágrimas Sagradas
                      </div>
                    )}
                  </div>
                </div>

                {/* Detalle desplegable de la zona */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-stone-800/80 space-y-4 text-xs font-sans">
                    <p className="text-stone-300 italic">{zone.summary}</p>

                    {/* Jefes clave */}
                    <div className="bg-black/40 rounded-xl p-3 border border-stone-800/60">
                      <div className="flex items-center gap-1.5 font-serif font-bold text-amber-300 mb-2">
                        <Skull className="w-3.5 h-3.5" />
                        <span>Jefes Notables & Encuentros Clave</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {zone.keyBosses.map((boss, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-800 text-stone-300 font-serif text-xs"
                          >
                            {boss}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Checklist de hitos */}
                    <div className="space-y-2">
                      <div className="font-serif font-bold text-stone-200 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Hitos Recomendados de la Región</span>
                      </div>
                      <div className="space-y-1.5">
                        {zone.milestones.map((m) => {
                          const isDone = !!completedMilestones[m.id];
                          return (
                            <div
                              key={m.id}
                              onClick={() => toggleMilestone(m.id)}
                              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition select-none ${
                                isDone
                                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                                  : 'bg-[#08090e] border-stone-800/80 hover:border-amber-500/40 text-stone-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-stone-600 flex-shrink-0" />
                                )}
                                <span className={isDone ? 'line-through text-stone-400' : ''}>
                                  {m.label}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-stone-500 uppercase">
                                {isDone ? 'Hecho' : 'Pendiente'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-[#06070a] flex items-center justify-between text-xs text-stone-400 font-serif">
          <span>Progresión basada en el diseño de nivel oficial de FromSoftware</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressionRouteModal;
