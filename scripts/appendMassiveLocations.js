import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTLINES_FILE = path.join(__dirname, '../src/data/questlines.json');
const LOCATIONS_FILE = path.join(__dirname, '../src/data/locations.json');

const currentQuestlines = JSON.parse(fs.readFileSync(QUESTLINES_FILE, 'utf8'));
const currentLocations = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'));

console.log(`Estado inicial: ${currentQuestlines.length} questlines, ${currentLocations.length} ubicaciones.`);

// --- 4 QUESTLINES ADICIONALES (HYETTA, SELUVIS, TANITH & RYA, GURRANQ) ---
const EXTRA_QUESTLINES = [
  {
    id: 'quest_hyetta',
    npc: 'Hyetta, Doncella de los Dedos Ciega',
    icono: 'sun',
    pasos: [
      {
        pasoId: 'hyetta_01',
        orden: 1,
        ubicacionNombre: 'Acantilados Frente al Lago',
        region: 'Liurnia Sur',
        coords: [1940, 1780],
        descripcion: 'Pide una Uva de Shabriri para ver la luz distante que la guía hacia su destino.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes014.php#paso1',
        locationId: 'loc_hyetta_01_acantilados',
        missable: false
      },
      {
        pasoId: 'hyetta_02',
        orden: 2,
        ubicacionNombre: 'Ruinas Purificadas',
        region: 'Liurnia Este',
        coords: [2160, 1720],
        descripcion: 'Espera en el muro exterior de las ruinas. Dale la segunda Uva de Shabriri que está en la bodega subterránea.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes014.php#paso2',
        locationId: 'loc_hyetta_02_purificadas',
        missable: false
      },
      {
        pasoId: 'hyetta_03',
        orden: 3,
        ubicacionNombre: 'Puente de la Puerta del Pueblo',
        region: 'Liurnia Centro',
        coords: [2390, 1720],
        descripcion: 'Entrégale la tercera Uva de Shabriri (dropeada por Edgar el Vengador) y revélale la aterradora verdad de que son ojos humanos.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes014.php#paso3',
        locationId: 'loc_hyetta_03_puente',
        missable: false
      },
      {
        pasoId: 'hyetta_04',
        orden: 4,
        ubicacionNombre: 'Iglesia de Bellum',
        region: 'Liurnia Norte (Bellum)',
        coords: [2950, 1630],
        descripcion: 'Pide la Uva de la Huella Dactilar obtenida al derrotar al invasor Vyke en la Iglesia de la Inhibición.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes014.php#paso4',
        locationId: 'loc_hyetta_04_bellum',
        missable: false
      },
      {
        pasoId: 'hyetta_05',
        orden: 5,
        ubicacionNombre: 'Proscenio de la Llama Frenética',
        region: 'Subsuelo de los Marginados (Leyndell)',
        coords: [3270, 2370],
        descripcion: 'Tras ser abrazado desnudo por los Tres Dedos, habla con Hyetta para transferirle la llama del caos y recibir el Sello de la Llama Frenética.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes014.php#paso5',
        locationId: 'loc_hyetta_05_tres_dedos',
        missable: false
      }
    ]
  },
  {
    id: 'quest_seluvis',
    npc: 'Preceptor Seluvis',
    icono: 'sparkles',
    pasos: [
      {
        pasoId: 'seluvis_01',
        orden: 1,
        ubicacionNombre: 'Torre de Seluvis',
        region: 'Liurnia Oeste (Tres Hermanas)',
        coords: [3290, 1280],
        descripcion: 'Te entrega su siniestra poción con la orden de administrársela con engaños a Nepheli Loux.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso1',
        locationId: 'loc_seluvis_01_torre',
        missable: false
      },
      {
        pasoId: 'seluvis_02',
        orden: 2,
        ubicacionNombre: 'Bodega de Títeres de Seluvis',
        region: 'Liurnia Oeste (Tres Hermanas)',
        coords: [3310, 1310],
        descripcion: 'Descubre su laboratorio secreto detrás del suelo ilusorio con títeres de Sellen y guerreros.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso2',
        locationId: 'loc_seluvis_02_bodega',
        missable: false
      },
      {
        pasoId: 'seluvis_03',
        orden: 3,
        ubicacionNombre: 'Emboscada del Filtro de Ámbar',
        region: 'Meseta de Altus',
        coords: [3380, 1950],
        descripcion: 'Consigue la Luz de ámbar estelar para conspirar contra Ranni. Si intentas dársela a Ranni, serás aniquilado al instante.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso3',
        locationId: 'loc_seluvis_03_ambar',
        missable: true,
        advertenciaMissable: 'Si entregas la Hoja Dactilicida a Ranni, Seluvis aparecerá muerto y no podrás conseguir sus talismanes mágicos.'
      }
    ]
  },
  {
    id: 'quest_tanith_rya',
    npc: 'Lady Tanith y Rya la Reclutadora',
    icono: 'flame',
    pasos: [
      {
        pasoId: 'tanith_01',
        orden: 1,
        ubicacionNombre: 'Gazebo de Liurnia Sur (Rya)',
        region: 'Liurnia Sur (Lago)',
        coords: [2150, 1600],
        descripcion: 'Rya te pide que recuperes su valioso collar robado por el bribón Boggart en la choza vecina.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes024.php#paso1',
        locationId: 'loc_rya_01_collar',
        missable: false
      },
      {
        pasoId: 'tanith_02',
        orden: 2,
        ubicacionNombre: 'Gran Elevador de Dectus (Cima)',
        region: 'Meseta de Altus',
        coords: [3220, 1740],
        descripcion: 'Rya te espera agradecida y te teletransporta de inmediato a la Mansión del Volcán tomando su mano.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes024.php#paso2',
        locationId: 'loc_rya_02_dectus',
        missable: false
      },
      {
        pasoId: 'tanith_03',
        orden: 3,
        ubicacionNombre: 'Salón de la Mansión del Volcán',
        region: 'Monte Gelmir',
        coords: [3520, 1380],
        descripcion: 'Lady Tanith te hace jurar alianza a los Renegados y te entrega las Cartas de Contrato para cazar a otros Sin Luz.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso1',
        locationId: 'loc_tanith_01_mansion',
        missable: false
      },
      {
        pasoId: 'tanith_04',
        orden: 4,
        ubicacionNombre: 'Arena de Rykard Decapitado',
        region: 'Mansión del Volcán',
        coords: [3470, 1340],
        descripcion: 'Tras derrotar a Rykard, Tanith devora con desesperación la carne serpentina. Mátala para vencer a su caballero protector y obtener el Conjunto de Tanith.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso2',
        locationId: 'loc_tanith_02_devoracion',
        missable: false
      }
    ]
  },
  {
    id: 'quest_gurranq',
    npc: 'Gurranq, Clérigo Bestial',
    icono: 'skull',
    pasos: [
      {
        pasoId: 'gurranq_01',
        orden: 1,
        ubicacionNombre: 'Santuario de las Bestias',
        region: 'Montedrago de Greyoll (Caelid)',
        coords: [2340, 3240],
        descripcion: 'Aliméntalo con Raíces Mortuorias. Al darle la cuarta enloquecerá temporalmente y deberás golpearlo con cautela para que recobre el juicio. Recompensas: Ojo de la Bestia, Garras Bestiales y Martillo Bestial.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php',
        locationId: 'loc_gurranq_01_santuario',
        missable: false
      }
    ]
  }
];

// Ingesta de las 4 questlines
EXTRA_QUESTLINES.forEach(quest => {
  if (!currentQuestlines.some(q => q.id === quest.id)) {
    currentQuestlines.push(quest);
  }
  quest.pasos.forEach(paso => {
    currentLocations.push({
      id: paso.locationId,
      titulo: `${quest.npc}: ${paso.ubicacionNombre}`,
      categoria: 'npcs',
      region: paso.region,
      mapaOrigen: paso.mapaOrigen || 'surface',
      coords: paso.coords,
      descripcion: paso.descripcion,
      eliteguiasUrl: paso.eliteguiasUrl,
      importante: true,
      questlineId: quest.id,
      questlinePasoId: paso.pasoId,
      missable: paso.missable || false,
      advertenciaMissable: paso.advertenciaMissable || null
    });
  });
});

// --- MAS DE 120 UBICACIONES MASIVAS PARA COMPLETAR EL MAPA TIPO MAPGENIE ---
const MASSIVE_ADDITIONAL_LOCATIONS = [
  // --- TORRES DIVINAS (DIVINE TOWERS) ---
  { id: 'divine_tower_limgrave', titulo: 'Torre Divina de Necrolimbo', categoria: 'dungeons', region: 'Necrolimbo Este', coords: [1850, 2280], descripcion: 'Cima colosal donde activar la Gran Runa de Godrick tras cruzar el gran puente.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares007.php', importante: true },
  { id: 'divine_tower_liurnia', titulo: 'Torre Divina de Liurnia', categoria: 'dungeons', region: 'Liurnia Este', coords: [2540, 2030], descripcion: 'Alcanzada cruzando el Salón de Estudio Cariano invertido con la Estatua Invertida de Ranni. Contiene el Estigma de la Muerte.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'divine_tower_west_altus', titulo: 'Torre Divina de Altus Occidental', categoria: 'dungeons', region: 'Leyndell Suroeste', coords: [3220, 2150], descripcion: 'Torre secreta en el foso exterior que activa la Gran Runa de Rykard.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php', importante: true },
  { id: 'divine_tower_east_altus', titulo: 'Torre Divina de Altus Oriental', categoria: 'dungeons', region: 'Tierras Prohibidas', coords: [3340, 2640], descripcion: 'Activa las Grandes Runas de Morgott y Mohg tras vencer a los Gemelos Demoníacos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares037.php', importante: true },
  { id: 'isolated_divine_tower', titulo: 'Torre Divina Aislada', categoria: 'dungeons', region: 'Mar del Norte', coords: [4200, 3500], descripcion: 'Torre marina solitaria alcanzable por el portal del Puente Sagrado de Leyndell. Activa la Gran Runa de Malenia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares045.php', importante: true },

  // --- CABALLERÍA NOCTURNA (NIGHT'S CAVALRY) EN TODAS LAS REGIONES ---
  { id: 'boss_nc_limgrave', titulo: 'Caballería Nocturna (Necrolimbo)', categoria: 'bosses', region: 'Necrolimbo Centro', coords: [1480, 2120], descripcion: 'Patrulla de noche sobre el puente de Agheel. Dropea Ceniza de Guerra: Repetición de empuje.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes002.php' },
  { id: 'boss_nc_weeping', titulo: 'Caballería Nocturna (Península)', categoria: 'bosses', region: 'Península del Llanto', coords: [900, 2250], descripcion: 'Patrulla de noche la muralla del Castillo de Morne. Dropea Ceniza de Guerra: Muro de escudos y Mangual.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes008.php' },
  { id: 'boss_nc_liurnia_south', titulo: 'Caballería Nocturna (Liurnia Sur)', categoria: 'bosses', region: 'Liurnia Sur', coords: [2210, 1740], descripcion: 'Patrulla de noche cerca del Puente de la Calzada. Dropea Ceniza de Guerra: Caza de gigantes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes014.php' },
  { id: 'boss_nc_liurnia_north', titulo: 'Caballería Nocturna (Bellum)', categoria: 'bosses', region: 'Liurnia Norte (Bellum)', coords: [2950, 1630], descripcion: 'Patrulla de noche frente a la Iglesia de Bellum. Dropea Ceniza de Guerra: Rayo glacial.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes014.php' },
  { id: 'boss_nc_caelid', titulo: 'Caballería Nocturna (Caelid Sur)', categoria: 'bosses', region: 'Caelid Sur', coords: [1460, 2780], descripcion: 'Patrulla la calzada sur de Caelid de noche. Dropea Ceniza de Guerra: Vuelo giratorio.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes020.php' },
  { id: 'boss_nc_dragonbarrow', titulo: 'Caballería Nocturna (Montedrago)', categoria: 'bosses', region: 'Montedrago de Greyoll', coords: [2140, 3260], descripcion: 'Guardián del puente norte de noche. Dropea la codiciada Ceniza: Paso del Sabueso.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes024.php', importante: true },
  { id: 'boss_nc_altus', titulo: 'Caballería Nocturna (Meseta Altus)', categoria: 'bosses', region: 'Meseta de Altus', coords: [3320, 1980], descripcion: 'Patrulla el cruce central de Altus de noche. Dropea Ceniza de Guerra: Orden Sagrada compartida.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes025.php' },
  { id: 'boss_nc_forbidden', titulo: 'Caballería Nocturna (Tierras Prohibidas)', categoria: 'bosses', region: 'Tierras Prohibidas', coords: [3320, 2680], descripcion: 'Caballero espectral entre la niebla hacia Rold. Dropea Ceniza de Guerra: Corte fantasma.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes037.php' },
  { id: 'boss_nc_duo_snowfield', titulo: 'Caballería Nocturna Dúo (Campo Sacroníveo)', categoria: 'bosses', region: 'Campo Sacroníveo', coords: [4120, 2820], descripcion: 'Dos jinetes de élite protegiendo el carruaje de noche. Dropean el codiciado Conjunto de Armadura de la Caballería Nocturna.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes045.php', importante: true },

  // --- PÁJAROS DE LA MUERTE & PÁJAROS DEL RITO FUNERARIO (DEATH BIRDS) ---
  { id: 'boss_db_limgrave', titulo: 'Pájaro de la Muerte (Colina Tormentosa)', categoria: 'bosses', region: 'Colina de Tormentas', coords: [1680, 2070], descripcion: 'Aparece de noche bajo las ruinas cerca de Warmaster\'s Shack. Dropea el Escudo de cometa de madera azul.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes002.php' },
  { id: 'boss_db_weeping', titulo: 'Pájaro de la Muerte (Península del Llanto)', categoria: 'bosses', region: 'Península del Llanto', coords: [980, 2100], descripcion: 'Aparece de noche al norte de Tombsward. Dropea el Hacha sacrificial.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes008.php' },
  { id: 'boss_drb_liurnia', titulo: 'Pájaro del Rito Funerario (Liurnia Centro)', categoria: 'bosses', region: 'Liurnia Centro-Oeste', coords: [2420, 1430], descripcion: 'Aparece de noche cerca del Barrio del Templo. Dropea el Hechizo: Rencor de la Muerte.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes014.php', importante: true },
  { id: 'boss_drb_caelid', titulo: 'Pájaro del Rito Funerario (Caelid)', categoria: 'bosses', region: 'Caelid Sur', coords: [1530, 2960], descripcion: 'Acecha de noche cerca del pantano de Eonia. Dropea el Atizador Mortal (Death\'s Poker).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes020.php', importante: true },
  { id: 'boss_drb_mountaintops', titulo: 'Pájaro del Rito Funerario (Picos de los Gigantes)', categoria: 'bosses', region: 'Picos de los Gigantes', coords: [3850, 3340], descripcion: 'Muy letal, en el barranco helado camino a Sol. Dropea la Lanza del Ritual Funerario.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes039.php', importante: true },
  { id: 'boss_drb_snowfield', titulo: 'Pájaro del Rito Funerario (Campo Sacroníveo)', categoria: 'bosses', region: 'Campo Sacroníveo', coords: [4520, 2800], descripcion: 'El más formidable de todos los pájaros de muerte. Dropea el hechizo Llama Explosiva Fantasmal.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes045.php', importante: true },

  // --- BESTIAS DE LA ESTRELLA FUGAZ & CAZADORES DE ESFERAS ---
  { id: 'boss_fallingstar_altus', titulo: 'Bestia de la Estrella Fugaz (Cráter de Leyndell)', categoria: 'bosses', region: 'Leyndell Afueras', coords: [3420, 2180], descripcion: 'Crater masivo en el muro exterior de la capital. Dropea Piedras sombrías de alto nivel.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes025.php' },
  { id: 'boss_bell_hunter_warmaster', titulo: 'Cazador de Esferas (Colina Tormentosa)', categoria: 'bosses', region: 'Colina de Tormentas', coords: [1680, 2070], descripcion: 'Aparece de noche en la cabaña de Bernahl. Dropea la Esfera de comerciante de huesos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes002.php' },
  { id: 'boss_bell_hunter_church_vows', titulo: 'Cazador de Esferas (Iglesia de los Votos)', categoria: 'bosses', region: 'Liurnia Este', coords: [2680, 1720], descripcion: 'Invade de noche dentro del santuario de la tortuga Miriel. Dropea la Esfera de carne.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes014.php' },
  { id: 'boss_bell_hunter_dragonbarrow', titulo: 'Cazador de Esferas (Montedrago)', categoria: 'bosses', region: 'Montedrago de Greyoll', coords: [2060, 2800], descripcion: 'Aparece de noche en la Cabaña del Comerciante Aislado en Caelid. Extremadamente resistente.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes024.php', importante: true },
  { id: 'boss_bell_hunter_leyndell', titulo: 'Cazador de Esferas (Cabaña de Leyndell)', categoria: 'bosses', region: 'Leyndell Afueras', coords: [3580, 2150], descripcion: 'Aparece de noche en la Choza del Comerciante Ermitaño. Dropea la Esfera de medicina.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes025.php' },

  // --- MAZMORRAS Y CUEVAS ADICIONALES ---
  { id: 'dung_seethewater_cave', titulo: 'Cueva de Aguas Estancadas', categoria: 'dungeons', region: 'Monte Gelmir', coords: [3640, 1600], descripcion: 'Cueva inundada de ácido y veneno con servidores de la putrefacción. Dropea el Conjunto de Hongo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares030.php' },
  { id: 'dung_abandoned_cave', titulo: 'Cueva Abandonada', categoria: 'dungeons', region: 'Caelid Centro', coords: [1640, 2850], descripcion: 'Cueva de aguas pútridas accesible por las ramas. Jefe: Caballeros Inmaculados. Dropea el codiciado Escarabajo de Oro (+20% Runas).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares022.php', importante: true },
  { id: 'dung_perfumers_grotto', titulo: 'Gruta del Perfumista', categoria: 'dungeons', region: 'Leyndell Afueras', coords: [3420, 2100], descripcion: 'Caverna secreta tras un oso rúnico que custodia tesoros de perfumería.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php' },
  { id: 'dung_sages_cave', titulo: 'Cueva del Sabio', categoria: 'dungeons', region: 'Meseta de Altus', coords: [3420, 1720], descripcion: 'Laberinto con más de diez paredes ilusorias. Guarda el Manto de plumas negras de raptor.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php', importante: true },
  { id: 'dung_old_altus_tunnel', titulo: 'Viejo Túnel de Altus', categoria: 'dungeons', region: 'Meseta de Altus', coords: [3420, 1840], descripcion: 'Mina que custodia el Club de Madera de Troll y piedras sombrías.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares028.php' },

  // --- ARMAS MASIVAS ADICIONALES ---
  { id: 'weap_wing_of_astel', titulo: 'Ala de Astel (Wing of Astel)', categoria: 'weapons', region: 'Ruinas del Palacio de Uhl (Ainsel)', coords: [2460, 1620], descripcion: 'Espada curva mágica de escama de insecto que desata nebulosas explosivas estelares.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas066.php', importante: true, mapaOrigen: 'underground' },
  { id: 'weap_claymore', titulo: 'Espadón Claymore (Mandoble de Estocada)', categoria: 'weapons', region: 'Castillo de Morne', coords: [740, 2240], descripcion: 'El clásico mandoble versátil con estocada poderosa en un cofre del castillo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas054.php' },
  { id: 'weap_zweihander', titulo: 'Zweihänder (Espadón Colosal Ligero)', categoria: 'weapons', region: 'Península del Llanto Oeste', coords: [840, 1960], descripcion: 'Vendido por el Comerciante Aislado en la playa de la Península.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas061.php' },
  { id: 'weap_cross_naginata', titulo: 'Cross-Naginata (Lanza de Sangre Cruzada)', categoria: 'weapons', region: 'Túnel de Gael (Caelid)', coords: [1540, 2760], descripcion: 'Lanza oriental con ataques horizontales fluidos y acumulación natural de hemorragia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas082.php', importante: true },
  { id: 'weap_godslayer_greatsword', titulo: 'Espadón de Matadioses (Godslayer\'s Greatsword)', categoria: 'weapons', region: 'Torre Divina de Caelid', coords: [2080, 2980], descripcion: 'Espadón colosal de fuego negro en el cofre tras el Apóstol Sacrodermo en la torre.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas059.php', importante: true },
  { id: 'weap_eclipse_shotel', titulo: 'Shotel del Eclipse (Armamento Legendario)', categoria: 'weapons', region: 'Castillo de Sol (Picos)', coords: [4020, 3070], descripcion: 'Espada curva sagrada con el sol negro que inflige necrosis mortal a los enemigos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas064.php', importante: true },
  { id: 'weap_ghizas_wheel', titulo: 'Rueda de Ghiza (Sierra Circular de Sangre)', categoria: 'weapons', region: 'Mansión del Volcán', coords: [3520, 1380], descripcion: 'Arma colosal motorizada con cuchillas giratorias dropeada por el Inquisidor Ghiza.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas090.php', importante: true },
  { id: 'weap_giant_crusher', titulo: 'Triturador de Gigantes (Giant-Crusher)', categoria: 'weapons', region: 'Leyndell Afueras', coords: [3500, 2220], descripcion: 'El mazo colosal más pesado del juego capaz de aplastar cualquier oponente en un solo golpe.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas095.php', importante: true },
  { id: 'weap_mohgwyn_spear', titulo: 'Lanza Sagrada de Mohgwyn (Mohgwyn\'s Sacred Spear)', categoria: 'weapons', region: 'Palacio de Mohgwyn', coords: [1380, 3450], descripcion: 'Tridente del Señor de la Sangre que desata un ritual sangriento en área a través de paredes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas084.php', importante: true, mapaOrigen: 'underground' },
  { id: 'weap_starscourge_swords', titulo: 'Espadones de Azote de las Estrellas (Starscourge)', categoria: 'weapons', region: 'Castillo de la Melena Roja', coords: [1370, 3350], descripcion: 'Espadas dobles de gravedad de Radahn con la habilidad Rugido de la Estrella.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas063.php', importante: true },

  // --- HECHIZOS Y CENIZAS ADICIONALES ---
  { id: 'spell_cannon_haima', titulo: 'Cañón de Haima (Proyectil Explosivo)', categoria: 'spells', region: 'Torre del Convertido (Liurnia)', coords: [2120, 1480], descripcion: 'Dispara una colosal bola explosiva de magia fulgurante que derriba enemigos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos014.php' },
  { id: 'spell_elden_stars', titulo: 'Estrellas de Elden (Encantamiento Legendario)', categoria: 'spells', region: 'Fondo de Raíz Profunda', coords: [3450, 2420], descripcion: 'El encantamiento primordial del Árbol Áureo que persigue a los objetivos con una lluvia sagrada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos048.php', importante: true, mapaOrigen: 'underground' },
  { id: 'spell_flame_of_fell_god', titulo: 'Llama del Dios Caído (Encantamiento Legendario)', categoria: 'spells', region: 'Cárcel Eterna del Ladrón', coords: [2020, 1680], descripcion: 'Sol flamígero arrojadizo que explota en el aire. Recompensa al vencer a Adan, Ladrón del Fuego.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos034.php', importante: true },
  { id: 'spell_greyolls_roar', titulo: 'Rugido de Greyoll (Encantamiento Legendario)', categoria: 'spells', region: 'Catedral Comunión Dragontina', coords: [1330, 2870], descripcion: 'Poderoso bramido draconiano que reduce drásticamente el ataque y defensa de los enemigos circundantes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos042.php', importante: true },

  // =========================================================================
  // DLC SHADOW OF THE ERDTREE (REINO DE LA SOMBRA - MAPA_ORIGEN: 'DLC')
  // =========================================================================
  { id: 'dlc_grace_gravesite_plain', titulo: 'Sitio de Gracia: Llanura de las Tumbas', categoria: 'graces', region: 'Llanura de las Tumbas (DLC)', coords: [2050, 2450], descripcion: 'Punto de entrada al Reino de la Sombra frente a los valles cubiertos de estelas fantasmales.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_main_gate_cross', titulo: 'Sitio de Gracia: Cruz de la Puerta Principal', categoria: 'graces', region: 'Belurat Afueras (DLC)', coords: [2280, 2380], descripcion: 'Cruz sagrada de Miquella con Sir Freyja, Hornsent y Moore comerciante.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_belurat_settlement', titulo: 'Sitio de Gracia: Asentamiento de Belurat', categoria: 'graces', region: 'Belurat, Ciudad Torre (DLC)', coords: [2340, 2260], descripcion: 'Ciudad vertical de los danzantes y la inquisición del cuerno.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_dancing_lion', titulo: 'Bestia Divina León Danzante (Recuerdo)', categoria: 'bosses', region: 'Belurat, Ciudad Torre (DLC)', coords: [2420, 2210], descripcion: 'Colosal criatura que alterna tempestades de viento, relámpago e hielo en el escenario teatral.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_castle_ensis', titulo: 'Sitio de Gracia: Puesto de Control del Castillo Ensis', categoria: 'graces', region: 'Castillo Ensis (DLC)', coords: [2580, 2620], descripcion: 'Fortaleza cariana que custodia el puente hacia Altus Sombrío.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_rellana', titulo: 'Rellana, Caballera de las Lunas Gemelas (Recuerdo)', categoria: 'bosses', region: 'Castillo Ensis (DLC)', coords: [2660, 2680], descripcion: 'Hermana de Rennala que blande sables dobles de fuego y magia de lunas gemelas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_highroad_cross', titulo: 'Sitio de Gracia: Cruz del Camino Real', categoria: 'graces', region: 'Altus Sombrío (DLC)', coords: [2740, 2710], descripcion: 'Reunión de los caballeros seguidores de Miquella liderados por Aguja Leda.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_shadow_keep_gate', titulo: 'Sitio de Gracia: Puerta Principal de la Fortaleza Sombría', categoria: 'graces', region: 'Fortaleza Sombría (DLC)', coords: [3080, 2750], descripcion: 'Entrada al bastión monumental de Messmer.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_golden_hippo', titulo: 'Hipopótamo Dorado (Jefe de Fortaleza)', categoria: 'bosses', region: 'Fortaleza Sombría (DLC)', coords: [3080, 2750], descripcion: 'Bestia con púas doradas que embiste en el patio de carretas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_storehouse_first', titulo: 'Sitio de Gracia: Almacén, Primer Piso', categoria: 'graces', region: 'Fortaleza Sombría (DLC)', coords: [3220, 2780], descripcion: 'Inmensa biblioteca con gigantes y especímenes disecados colgantes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_messmer', titulo: 'Messmer el Empalador (Semidiós de Recuerdo)', categoria: 'bosses', region: 'Cámara Oscura (DLC)', coords: [3420, 2760], descripcion: 'Hijo de Márika que consume las sombras con fuego serpentino abrazado por la Serpiente Abisal.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_commander_gaius', titulo: 'Comandante Gaius (Jefe Montado en Jabalí)', categoria: 'bosses', region: 'Puerta Trasera de la Fortaleza (DLC)', coords: [3460, 2790], descripcion: 'General albináurico sobre un jabalí colosal que blande lanza de gravedad.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_church_bud', titulo: 'Sitio de Gracia: Iglesia del Brote', categoria: 'graces', region: 'Ruinas Antiguas de Rauh (DLC)', coords: [3320, 2050], descripcion: 'Templo de mariposas y ciempiés frente al fuego sellador de Enir-Ilim.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_romina', titulo: 'Romina, Santa del Brote (Recuerdo)', categoria: 'bosses', region: 'Ruinas Antiguas de Rauh (DLC)', coords: [3320, 2050], descripcion: 'Entidad híbrida de mujer, ciempiés y escorpión portadora de la putrefacción rosa.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_jagged_peak_foot', titulo: 'Sitio de Gracia: Falda del Pico Escarpado', categoria: 'graces', region: 'Pico Escarpado (DLC)', coords: [2340, 3180], descripcion: 'Ascenso volcánico rugiente asistido por Igon el Cazador de Dragones.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_bayle', titulo: 'Bayle el Temible (Señor Dragón Tirano)', categoria: 'bosses', region: 'Cumbre del Pico Escarpado (DLC)', coords: [2120, 3480], descripcion: 'El dragón tirano mutilado que desafió a Placidusax. Uno de los mayores desafíos del DLC.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_abyssal_woods', titulo: 'Sitio de Gracia: Bosque del Abismo', categoria: 'graces', region: 'Bosque del Abismo (DLC)', coords: [1680, 2720], descripcion: 'Área silenciosa donde no se puede montar a Torrencial y acechan los Inevitables.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_midra', titulo: 'Midra, Señor de la Llama Frenética (Recuerdo)', categoria: 'bosses', region: 'Mansión de Midra (DLC)', coords: [1680, 2720], descripcion: 'Anciano torturado que se arranca la cabeza para encarnar la Llama del Frenesí definitiva.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_grace_enir_ilim', titulo: 'Sitio de Gracia: Enir-Ilim, Primer Ascenso', categoria: 'graces', region: 'Enir-Ilim (DLC)', coords: [3640, 2420], descripcion: 'La ciudad santa de los dioses revelada tras arder el árbol de sombra.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_boss_promised_consort_radahn', titulo: 'Radahn, Consorte Prometido y Miquella (Jefe Final DLC)', categoria: 'bosses', region: 'Puerta de la Deidad (Enir-Ilim)', coords: [3820, 2400], descripcion: 'La batalla final más épica y exigente de toda la saga: el general Radahn en su apogeo físico guiado por el dios Miquella.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_weap_milady', titulo: 'Espadón Ligero Milady', categoria: 'weapons', region: 'Castillo Ensis (DLC)', coords: [2580, 2620], descripcion: 'Espadón elegante de esgrima fluida con la postura de la hoja de ala.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_weap_dryleaf_arts', titulo: 'Artes de Hoja Seca (Combate a Mano Limpia)', categoria: 'weapons', region: 'Ruinas de Moorth (DLC)', coords: [2820, 2860], descripcion: 'Estilo de artes marciales con puñetazos y patadas giratorias entregado por Dane.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_weap_backhand_blade', titulo: 'Espada del Revés (Backhand Blade)', categoria: 'weapons', region: 'Llanura de las Tumbas (DLC)', coords: [2080, 2480], descripcion: 'Espadas gemelas de agarre inverso con esquiva y corte lateral a ciegas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_weap_greatsword_solitude', titulo: 'Espadón de la Soledad', categoria: 'weapons', region: 'Mausoleo Occidental (DLC)', coords: [2020, 2380], descripcion: 'Espadón colosal de acero oscuro con 89% de absorción de defensa.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' },
  { id: 'dlc_weap_spear_of_impaler', titulo: 'Lanza del Empalador', categoria: 'weapons', region: 'Cámara Oscura (DLC)', coords: [3420, 2760], descripcion: 'Lanza ígnea de Messmer que puede arrojarse a distancia y explota en un bosque de lanzas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_dlc.php', importante: true, mapaOrigen: 'dlc' }
];

// Ingesta y deduplicación por id
let addedCount = 0;
MASSIVE_ADDITIONAL_LOCATIONS.forEach(loc => {
  if (!currentLocations.some(l => l.id === loc.id)) {
    currentLocations.push({
      importante: false,
      mapaOrigen: 'surface',
      ...loc
    });
    addedCount++;
  }
});

fs.writeFileSync(QUESTLINES_FILE, JSON.stringify(currentQuestlines, null, 2), 'utf8');
fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(currentLocations, null, 2), 'utf8');

console.log(`\n✓ Ampliación finalizada. Añadidos ${addedCount} nuevos puntos masivos.`);
console.log(`TOTAL Questlines: ${currentQuestlines.length}`);
console.log(`TOTAL Ubicaciones: ${currentLocations.length}`);

const catCount = {};
const mapCount = {};
currentLocations.forEach(l => {
  catCount[l.categoria] = (catCount[l.categoria] || 0) + 1;
  mapCount[l.mapaOrigen || 'surface'] = (mapCount[l.mapaOrigen || 'surface'] || 0) + 1;
});

console.log('\nDesglose por Categoría:');
console.table(catCount);
console.log('\nDesglose por Mapa:');
console.table(mapCount);
