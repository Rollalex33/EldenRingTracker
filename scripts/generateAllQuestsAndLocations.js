import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTLINES_FILE = path.join(__dirname, '../src/data/questlines.json');
const LOCATIONS_FILE = path.join(__dirname, '../src/data/locations.json');

// Catálogo completo de las 20 Questlines de EliteGuías para Elden Ring
const ALL_QUESTLINES = [
  {
    id: 'quest_ranni',
    npc: 'Ranni la Bruja',
    icono: 'witch-hat',
    pasos: [
      {
        pasoId: 'ranni_01',
        orden: 1,
        ubicacionNombre: 'Iglesia de Elleh',
        region: 'Necrolimbo',
        coords: [1320, 2320],
        descripcion: 'Habla con Renna (Ranni) de noche en las ruinas de la Iglesia de Elleh para recibir la Campana de invocación de espíritus y las Cenizas de lobo solitario.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso1',
        locationId: 'loc_iglesia_elleh',
        missable: true,
        advertenciaMissable: 'Si avanzas hacia la Mesa Redonda sin hablar con ella aquí, desaparecerá de la iglesia y tendrás que comprar la campana en las Doncellas Gemelas.'
      },
      {
        pasoId: 'ranni_02',
        orden: 2,
        ubicacionNombre: 'Torre de Ranni (Tres Hermanas)',
        region: 'Liurnia',
        coords: [2700, 1300],
        descripcion: 'Tras superar la Mansión Cariana y derrotar a Loretta, sube a la cima de su torre para jurarle lealtad y entrar a su servicio. Presentará a Iji, Blaidd y Seluvis.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso2',
        locationId: 'loc_torre_ranni',
        missable: false
      },
      {
        pasoId: 'ranni_03',
        orden: 3,
        ubicacionNombre: 'Nokron, Ciudad Eterna',
        region: 'Río Siofra (Subterráneo)',
        coords: [1400, 3350],
        descripcion: 'Derrota a Radahn en Caelid para que caiga una estrella en Necrolimbo. Desciende a Nokron y recupera la Hoja Dactilicida del cofre bajo el cadáver gigante.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso3',
        locationId: 'loc_nokron_hoja',
        missable: false
      },
      {
        pasoId: 'ranni_04',
        orden: 4,
        ubicacionNombre: 'Cuenca de la Cascada de Nokstella',
        region: 'Curso del Río Ainsel',
        coords: [2400, 1600],
        descripcion: 'Recoge la Miniatura de Ranni junto a la Gracia y descansa repetidamente en el Sitio de Gracia para hablarle hasta que te pida derrotar a la Sombra Nefasta.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso4',
        locationId: 'loc_ainsel_miniatura',
        missable: false
      },
      {
        pasoId: 'ranni_05',
        orden: 5,
        ubicacionNombre: 'Catedral de Manus Celes',
        region: 'Altar del Claro de Luna',
        coords: [1700, 1150],
        descripcion: 'Derrota a Astel, asciende en ascensor a la meseta sur de Liurnia. En la caverna bajo la catedral, coloca el Anillo de la Luna Negra en su dedo para sellar el pacto y obtener el Espadón de la Luna Llena.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso5',
        locationId: 'loc_catedral_manus_celes',
        missable: false
      }
    ]
  },
  {
    id: 'quest_blaidd',
    npc: 'Blaidd el Semilobo',
    icono: 'wolf',
    pasos: [
      {
        pasoId: 'blaidd_01',
        orden: 1,
        ubicacionNombre: 'Ruinas del Bosque Neblinoso',
        region: 'Necrolimbo',
        coords: [1350, 2850],
        descripcion: 'Escucha los aullidos en la torre. Habla con Kalé en la Iglesia de Elleh para aprender el gesto "Chasquido de dedos" y úsalo bajo la torre para hacer descender a Blaidd.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso1',
        locationId: 'loc_ruinas_bosque_neblinoso',
        missable: true,
        advertenciaMissable: 'Si activas el Festival de Radahn antes de conocerlo aquí, se saltará este diálogo inicial y aparecerá directamente en el Castillo de la Melena Roja.'
      },
      {
        pasoId: 'blaidd_02',
        orden: 2,
        ubicacionNombre: 'Cárcel Eterna del Sabueso Aislado',
        region: 'Necrolimbo',
        coords: [1050, 2500],
        descripcion: 'Invoca a Blaidd dentro de la Cárcel Eterna para derrotar al Caballero Sabueso Darriwil. Habla con él afuera para recibir una Piedra de forja sombría [2].',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso2',
        locationId: 'loc_carcel_darriwil',
        missable: false
      },
      {
        pasoId: 'blaidd_03',
        orden: 3,
        ubicacionNombre: 'Pozo del Río Siofra',
        region: 'Río Siofra (Subterráneo)',
        coords: [1300, 3200],
        descripcion: 'Encuentra a Blaidd junto al acantilado cerca del templo de los cuernos ceremoniales en el Río Siofra para planear la entrada a Nokron.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso3',
        locationId: 'loc_siofra_blaidd',
        missable: false
      },
      {
        pasoId: 'blaidd_04',
        orden: 4,
        ubicacionNombre: 'Castillo de la Melena Roja (Festival)',
        region: 'Caelid',
        coords: [1150, 3950],
        descripcion: 'Habla con Blaidd en el patio del castillo antes del combate y convócalo durante la batalla contra el Azote de las Estrellas Radahn.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso4',
        locationId: 'loc_castillo_melena_roja_blaidd',
        missable: false
      },
      {
        pasoId: 'blaidd_05',
        orden: 5,
        ubicacionNombre: 'Cárcel Eterna de Darriwil (Rescate)',
        region: 'Necrolimbo',
        coords: [1050, 2500],
        descripcion: 'Iji encerró a Blaidd en la Cárcel Eterna temiendo su destino. Acércate a la prisión y habla con él a través del sello mágico para liberarlo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso5',
        locationId: 'loc_carcel_darriwil_rescate',
        missable: true,
        advertenciaMissable: 'Paso opcional con diálogo enriquecido antes del desenlace de Ranni; si completas el pacto sin visitarlo, escapará solo.'
      },
      {
        pasoId: 'blaidd_06',
        orden: 6,
        ubicacionNombre: 'Torre de Ranni (Duelo Final)',
        region: 'Liurnia',
        coords: [2700, 1300],
        descripcion: 'Tras completar el juramento con Ranni, regresa a su torre. Blaidd, enloquecido por los Dos Dedos, te atacará. Derrótalo para obtener el Espadón regio y su Set de armadura.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso6',
        locationId: 'loc_torre_ranni_duelo',
        missable: false
      }
    ]
  },
  {
    id: 'quest_alexander',
    npc: 'Alexander, Puño de Hierro',
    icono: 'jar',
    pasos: [
      {
        pasoId: 'alexander_01',
        orden: 1,
        ubicacionNombre: 'Colina al norte del Lago Agheel',
        region: 'Necrolimbo',
        coords: [1450, 2450],
        descripcion: 'Encuentra al tarro gigante atrapado en el suelo y golpéalo por detrás con un arma contundente o pesada para liberarlo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes003.php#paso1',
        locationId: 'loc_alexander_agheel',
        missable: false
      },
      {
        pasoId: 'alexander_02',
        orden: 2,
        ubicacionNombre: 'Galería de Gael',
        region: 'Caelid',
        coords: [1500, 3150],
        descripcion: 'Encuéntralo en una sala trasera de la Galería de Gael en el límite entre Necrolimbo y Caelid camino al Festival.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes003.php#paso2',
        locationId: 'loc_galeria_gael_alexander',
        missable: false
      },
      {
        pasoId: 'alexander_03',
        orden: 3,
        ubicacionNombre: 'Castillo de la Melena Roja (Festival)',
        region: 'Caelid',
        coords: [1150, 3950],
        descripcion: 'Habla con él en el patio del festival y utiliza su señal de invocación dorada en la arena contra Radahn. Habla con él tras la victoria.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes003.php#paso3',
        locationId: 'loc_alexander_radahn',
        missable: false
      },
      {
        pasoId: 'alexander_04',
        orden: 4,
        ubicacionNombre: 'Cabaña del Artista en Liurnia',
        region: 'Liurnia',
        coords: [1900, 1900],
        descripcion: 'Alexander vuelve a atascarse al sur de la Cabaña del Artista. Para sacarlo sin romperlo debes arrojarle una Vasija de aceite antes de golpearlo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes003.php#paso4',
        locationId: 'loc_alexander_liurnia_hoyo',
        missable: true,
        advertenciaMissable: 'Golpearlo sin usar la Vasija de aceite puede requerir más impactos y si continúas a Altus sin ayudarlo se moverá directamente a Gelmir.'
      },
      {
        pasoId: 'alexander_05',
        orden: 5,
        ubicacionNombre: 'Lago de Lava en Monte Gelmir',
        region: 'Monte Gelmir',
        coords: [3250, 1550],
        descripcion: 'Tras derrotar al Dragón de Magma cerca del Fuerte Laiedd, habla con Alexander sumergido en la lava para recibir el Yelmo de tarro.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes003.php#paso5',
        locationId: 'loc_alexander_gelmir_lava',
        missable: false
      },
      {
        pasoId: 'alexander_06',
        orden: 6,
        ubicacionNombre: 'Ruinas de Farum Azula',
        region: 'Farum Azula',
        coords: [2800, 4700],
        descripcion: 'Supera el Templo del dragón y rétalo a un duelo honorable en las plataformas suspendidas. Tras vencerlo, obtendrás el Fragmento de Alexander.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes003.php#paso6',
        locationId: 'loc_alexander_farum_azula',
        missable: false
      }
    ]
  },
  {
    id: 'quest_millicent',
    npc: 'Millicent',
    icono: 'sparkles',
    pasos: [
      {
        pasoId: 'millicent_01',
        orden: 1,
        ubicacionNombre: 'Choza de Gowry',
        region: 'Caelid',
        coords: [1600, 3700],
        descripcion: 'Habla con el sabio Gowry al este de Sellia. Derrota al Comandante O\'Neil en el Pantano de Aeonia para conseguir la Aguja de oro puro y llévasela para que la repare.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso1',
        locationId: 'loc_choza_gowry',
        missable: false
      },
      {
        pasoId: 'millicent_02',
        orden: 2,
        ubicacionNombre: 'Iglesia de la Plaga',
        region: 'Caelid',
        coords: [1650, 3850],
        descripcion: 'Entrega la aguja reparada a Millicent para curar su podredumbre roja. Descansa en la Gracia, agota sus diálogos y recibe el Talismán de la espada de la reliquia.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso2',
        locationId: 'loc_iglesia_plaga_millicent',
        missable: true,
        advertenciaMissable: 'Si activas el Elevador de Dectus o la Meseta de Altus sin entregar la aguja, puede bloquearse el progreso de esta misión.'
      },
      {
        pasoId: 'millicent_03',
        orden: 3,
        ubicacionNombre: 'Choza de Gowry (Visita)',
        region: 'Caelid',
        coords: [1600, 3700],
        descripcion: 'Visita de nuevo la Choza de Gowry para encontrar a Millicent reflexionando antes de partir en su viaje hacia el norte en busca de su destino.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso3',
        locationId: 'loc_choza_gowry_despedida',
        missable: false
      },
      {
        pasoId: 'millicent_04',
        orden: 4,
        ubicacionNombre: 'Colina del Árbol Áureo',
        region: 'Meseta de Altus',
        coords: [2950, 2250],
        descripcion: 'Encuentra a Millicent cerca de la Gracia Colina del Árbol Áureo. Ve al Castillo Sombrío al norte para recuperar la Prótesis de la valquiria y entrégasela.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso4',
        locationId: 'loc_altus_millicent_protesis',
        missable: true,
        advertenciaMissable: 'Debes entregar la prótesis antes de avanzar hacia la Forja de los Gigantes para que pueda ser invocada contra los jefes posteriores.'
      },
      {
        pasoId: 'millicent_05',
        orden: 5,
        ubicacionNombre: 'Colina de los Molinos de Viento (Domula)',
        region: 'Meseta de Altus',
        coords: [3550, 2500],
        descripcion: 'Derrota al Apóstol Sacrodermo en la cima de Domula. Tras descansar en la Gracia del Molino, habla con Millicent para que agradezca tu apoyo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso5',
        locationId: 'loc_molinos_viento_millicent',
        missable: false
      },
      {
        pasoId: 'millicent_06',
        orden: 6,
        ubicacionNombre: 'Ruinas del Valle Nevado',
        region: 'Picos de los Gigantes',
        coords: [3800, 3600],
        descripcion: 'Habla con Millicent en la Gracia Ruinas Antiguas del Valle Nevado. Te revelará información sobre Malenia y el Árbol Hierático de Miquella.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso6',
        locationId: 'loc_picos_millicent',
        missable: false
      },
      {
        pasoId: 'millicent_07',
        orden: 7,
        ubicacionNombre: 'Elphael, tutor del Árbol Hierático',
        region: 'Árbol Hierático de Miquella',
        coords: [4550, 3050],
        descripcion: 'Drena la podredumbre derrotando al Espíritu del árbol ulcerado. Elige la señal dorada en el suelo para luchar JUNTO a Millicent contra sus 4 hermanas. Recibe la Insignia con espada alada podrida y la Aguja de oro puro.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso7',
        locationId: 'loc_elphael_millicent_duelo',
        missable: true,
        advertenciaMissable: 'Atención: No caigas ni saltes sobre Millicent tras la victoria, un solo punto de daño la matará permanentemente sin completar el final pacífico.'
      }
    ]
  },
  {
    id: 'quest_yura',
    npc: 'Yura, Cazador de Dedos Sangrientos',
    icono: 'sword',
    pasos: [
      {
        pasoId: 'yura_01',
        orden: 1,
        ubicacionNombre: 'Bajo el viaducto del Lago Agheel',
        region: 'Necrolimbo',
        coords: [1280, 2500],
        descripcion: 'Encuentra a Yura bajo los arcos de piedra al sur del lago. Te advertirá severamente que no perturbes al Dragón Volador Agheel en las aguas.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso1',
        locationId: 'loc_yura_lago_agheel',
        missable: false
      },
      {
        pasoId: 'yura_02',
        orden: 2,
        ubicacionNombre: 'Cueva de Aguaponiente (Río de Necrolimbo)',
        region: 'Necrolimbo',
        coords: [1400, 2520],
        descripcion: 'Avanza hacia el norte por el cauce del río hasta sufrir la invasión de Nerijus, Dedo Sangriento. Resiste hasta que Yura sea invocado para asistirte. Recompensa: Daga Reduvia.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso2',
        locationId: 'loc_cueva_aguaponiente_yura',
        missable: false
      },
      {
        pasoId: 'yura_03',
        orden: 3,
        ubicacionNombre: 'Puerta Principal de Raya Lucaria',
        region: 'Liurnia',
        coords: [2250, 1550],
        descripcion: 'Examina la señal roja de invocación en el puente roto al norte de la academia para entrar al mundo de Yura y derrotar al Asesino de Cuervos. Recompensa: Talismán Raposa de plumas.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso3',
        locationId: 'loc_puerta_lucaria_yura',
        missable: true,
        advertenciaMissable: 'Si derrotas a Maliketh en Farum Azula antes de acudir a esta señal, Yura avanzará automáticamente perdiendo este combate y recompensas intermedias.'
      },
      {
        pasoId: 'yura_04',
        orden: 4,
        ubicacionNombre: 'Segunda Iglesia de Marika',
        region: 'Meseta de Altus',
        coords: [2950, 2150],
        descripcion: 'Encuentra a Yura mortalmente herido en el suelo de la iglesia. Te entregará su katana Nagakiba antes de expirar. Derrota de inmediato a la invasora Eleonora para obtener su Hoja Mellada y la Lágrima de cristal purificadora.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso4',
        locationId: 'loc_segunda_iglesia_marika_yura',
        missable: true,
        advertenciaMissable: 'La invasión de Eleonora otorga la Lágrima de cristal purificadora, objeto crítico para contrarrestar la maldición de sangre del Señor de la Sangre Mohg.'
      },
      {
        pasoId: 'yura_05',
        orden: 5,
        ubicacionNombre: 'Primera Gracia de las Ruinas de Zamor',
        region: 'Picos de los Gigantes',
        coords: [3550, 3350],
        descripcion: 'El cuerpo de Yura ha sido poseído por Shabriri. Te propondrá abrazar la Llama del Frenesí bajo Leyndell. Puedes atacarlo y derrotarlo allí mismo para obtener el Set de armadura de Ronin completo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso5',
        locationId: 'loc_zamor_shabriri',
        missable: false
      }
    ]
  },
  {
    id: 'quest_varre',
    npc: 'Varré Rostro Blanco',
    icono: 'mask',
    pasos: [
      {
        pasoId: 'varre_01',
        orden: 1,
        ubicacionNombre: 'El Primer Paso',
        region: 'Necrolimbo',
        coords: [1250, 2350],
        descripcion: 'Habla con Varré al salir de la Cripta del Conocimiento. Te indicará el camino de la Gracia hacia Godrick en Velo Tormentoso.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso1',
        locationId: 'loc_varre_primer_paso',
        missable: false
      },
      {
        pasoId: 'varre_02',
        orden: 2,
        ubicacionNombre: 'Iglesia de la Rosa',
        region: 'Liurnia',
        coords: [1850, 1450],
        descripcion: 'Tras derrotar a Godrick, viaja a la Iglesia de la Rosa en Liurnia. Te entregará 5 Dedos Sangrientos purulentos para invadir a otros jugadores al menos 3 veces.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso2',
        locationId: 'loc_varre_iglesia_rosa',
        missable: false
      },
      {
        pasoId: 'varre_03',
        orden: 3,
        ubicacionNombre: 'Capilla de la Anticipación (Sangre de Doncella)',
        region: 'Liurnia',
        coords: [2650, 1850],
        descripcion: 'Empapa el paño sagrado "Favor del Señor de la Sangre" en la sangre del cadáver de una doncella (en la Capilla de la Anticipación o la Iglesia de la Inhibición).',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso3',
        locationId: 'loc_varre_doncella',
        missable: true,
        advertenciaMissable: 'Completar este rito es indispensable para recibir la Medalla que desbloquea el acceso anticipado al Palacio de Mohgwyn.'
      },
      {
        pasoId: 'varre_04',
        orden: 4,
        ubicacionNombre: 'Iglesia de la Rosa (Iniciación)',
        region: 'Liurnia',
        coords: [1850, 1450],
        descripcion: 'Regresa con el paño ensangrentado. Varré te amputará un dedo y te otorgará el Dedo ensangrentado reutilizable y la Medalla de caballero de sangre pura.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso4',
        locationId: 'loc_varre_medalla',
        missable: false
      },
      {
        pasoId: 'varre_05',
        orden: 5,
        ubicacionNombre: 'Mausoleo de la Dinastía Mohgwyn',
        region: 'Río Siofra (Subterráneo)',
        coords: [900, 3200],
        descripcion: 'Usa la medalla para viajar al palacio subterráneo. Antes del combate con Mohg, invade el mundo de Varré a través de su señal roja en el suelo para derrotarlo y conseguir el Ramo de rosas de Varré.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes027.php#paso5',
        locationId: 'loc_varre_invasion_final',
        missable: true,
        advertenciaMissable: 'Cuidado: Si derrotas a Mohg, Señor de la Sangre antes de invadir a Varré, su señal roja desaparecerá para siempre.'
      }
    ]
  },
  {
    id: 'quest_nepheli',
    npc: 'Nepheli Loux',
    icono: 'axe',
    pasos: [
      {
        pasoId: 'nepheli_01',
        orden: 1,
        ubicacionNombre: 'Castillo de Velo Tormentoso',
        region: 'Necrolimbo',
        coords: [1700, 2100],
        descripcion: 'Habla con Nepheli en una habitación cerca del patio con el troll antes de Godrick. Podrás convocarla como aliada de oro para la batalla contra el semidiós.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso1',
        locationId: 'loc_nepheli_velo_tormentoso',
        missable: true,
        advertenciaMissable: 'Debes hablar con ella antes de vencer a Godrick para poder invocarla y progresar su diálogo inicial de forma óptima.'
      },
      {
        pasoId: 'nepheli_02',
        orden: 2,
        ubicacionNombre: 'Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Aparece frente al estudio de Sir Gideon Ofnir. Habla con ella para recibir el Amuleto de campeón.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso2',
        locationId: 'loc_nepheli_mesa_redonda',
        missable: false
      },
      {
        pasoId: 'nepheli_03',
        orden: 3,
        ubicacionNombre: 'Aldea de los Albanáuricos',
        region: 'Liurnia',
        coords: [1550, 1250],
        descripcion: 'Encuéntrala bajo el puente rocoso antes de subir a la aldea masacrada. Convócala para derrotar al Asesino de presagios en la colina.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso3',
        locationId: 'loc_nepheli_albanauricos',
        missable: false
      },
      {
        pasoId: 'nepheli_04',
        orden: 4,
        ubicacionNombre: 'Sótano de la Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2480, 2480],
        descripcion: 'Desheredada por Gideon, se encuentra deprimida en las escaleras del herrero Hewg. ¡NO le des la poción de Seluvis si quieres su final como Señora de Limgrave!',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso4',
        locationId: 'loc_nepheli_desesperacion',
        missable: true,
        advertenciaMissable: 'Peligro: Entregarle la Poción de Seluvis la transformará en una marioneta inerte bloqueando todo su destino.'
      },
      {
        pasoId: 'nepheli_05',
        orden: 5,
        ubicacionNombre: 'Capilla de la Anticipación (Cenizas del Halcón)',
        region: 'Liurnia',
        coords: [2200, 1150],
        descripcion: 'Viaja a la Capilla de la Anticipación mediante el teletransportador de Los Cuatro Campanarios. Consigue las Cenizas del Rey Halcón Tormentoso y dáselas a Nepheli.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso5',
        locationId: 'loc_nepheli_cenizas_halcon',
        missable: false
      },
      {
        pasoId: 'nepheli_06',
        orden: 6,
        ubicacionNombre: 'Salón del Trono de Velo Tormentoso',
        region: 'Necrolimbo',
        coords: [1750, 2120],
        descripcion: 'Tras derrotar a Morgott en Leyndell y avanzar la misión de Kenneth Haight, Nepheli asume el trono como soberana de Necrolimbo y te regala una Piedra de forja de dragón antiguo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso6',
        locationId: 'loc_nepheli_trono_final',
        missable: false
      }
    ]
  },
  {
    id: 'quest_sellen',
    npc: 'Hechicera Sellen',
    icono: 'sparkles',
    pasos: [
      {
        pasoId: 'sellen_01',
        orden: 1,
        ubicacionNombre: 'Ruinas de la Posta',
        region: 'Necrolimbo',
        coords: [1380, 2650],
        descripcion: 'En el sótano tras vencer al Cabeza de calabaza loco. Acéptala como tu maestra para aprender hechizos de la escuela de Raya Lucaria.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso1',
        locationId: 'loc_sellen_ruinas_posta',
        missable: false
      },
      {
        pasoId: 'sellen_02',
        orden: 2,
        ubicacionNombre: 'Cuerpo del Maestro Azur',
        region: 'Monte Gelmir',
        coords: [3300, 1500],
        descripcion: 'Encuentra al Maestro Azur petrificado cerca de la Choza del Ermitaño en Monte Gelmir para recibir el Cometa Azur. Muéstrale el hechizo a Sellen.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso2',
        locationId: 'loc_sellen_cometa_azur',
        missable: false
      },
      {
        pasoId: 'sellen_03',
        orden: 3,
        ubicacionNombre: 'Escondrijo de Sellia (Maestro Lusat)',
        region: 'Caelid',
        coords: [1750, 3800],
        descripcion: 'Usa la Llave selladora que te dio Sellen en la cueva secreta tras el cementerio de Sellia para encontrar al Maestro Lusat y recibir Ruina de estrellas.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso3',
        locationId: 'loc_sellen_lusat',
        missable: true,
        advertenciaMissable: 'Paso necesario para desbloquear el duelo decisivo en la Gran Biblioteca de Raya Lucaria.'
      },
      {
        pasoId: 'sellen_04',
        orden: 4,
        ubicacionNombre: 'Ruinas de la Perdición de la Bruja',
        region: 'Península del Llanto',
        coords: [850, 2350],
        descripcion: 'Encuentra el verdadero cuerpo encadenado de Sellen en el sótano. Extrae con cuidado su Corazón primordial para evitar su muerte.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso4',
        locationId: 'loc_sellen_perdicion_bruja',
        missable: false
      },
      {
        pasoId: 'sellen_05',
        orden: 5,
        ubicacionNombre: 'Laboratorio Secreto de Seluvis',
        region: 'Liurnia',
        coords: [2750, 1250],
        descripcion: 'Introduce el corazón de Sellen en la marioneta que aguarda tras la pared ilusoria en las ruinas entre las torres de Ranni y Renna.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso5',
        locationId: 'loc_sellen_marioneta',
        missable: false
      },
      {
        pasoId: 'sellen_06',
        orden: 6,
        ubicacionNombre: 'Gran Biblioteca de Raya Lucaria',
        region: 'Liurnia',
        coords: [2100, 1500],
        descripcion: 'En la entrada de la biblioteca tras derrotar a Rennala, elige la señal dorada para defender a Sellen contra Jerren el cazador de brujas. Otorga la Corona de bruja y el Kris rutilante.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso6',
        locationId: 'loc_sellen_biblioteca_final',
        missable: true,
        advertenciaMissable: 'Si eliges la señal roja, lucharás contra Sellen y perderás los conjuntos de armadura de Azur y Lusat.'
      }
    ]
  },
  {
    id: 'quest_fia',
    npc: 'Fia, Doncella de la Muerte',
    icono: 'ghost',
    pasos: [
      {
        pasoId: 'fia_01',
        orden: 1,
        ubicacionNombre: 'Dormitorio de la Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Acepta su cálido abrazo para recibir la Bendición del baldaquino. Habla con ella en secreto varias veces para forjar confianza.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php#paso1',
        locationId: 'loc_fia_abrazo',
        missable: false
      },
      {
        pasoId: 'fia_02',
        orden: 2,
        ubicacionNombre: 'Mesa Redonda (La Daga Desgastada)',
        region: 'Mesa Redonda',
        coords: [2520, 2500],
        descripcion: 'Fia te confía una daga desgastada para que busques a su legítimo dueño. Entrégasela a D, Cazador de los Muertos. Tras reiniciar, Fia asesina a D y escapa.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php#paso2',
        locationId: 'loc_fia_daga_muerte',
        missable: true,
        advertenciaMissable: 'Al entregar la daga, D morirá irreversiblemente y Fia abandonará la Mesa Redonda hacia las profundidades del mundo.'
      },
      {
        pasoId: 'fia_03',
        orden: 3,
        ubicacionNombre: 'Trono del Príncipe de la Muerte',
        region: 'Fondo de Raíz Profunda (Subterráneo)',
        coords: [2050, 2800],
        descripcion: 'Desciende a Fondo de Raíz Profunda y derrota a los Campeones de Fia en las raíces gigantes. Pide ser abrazado de nuevo en lugar de atacarla.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php#paso3',
        locationId: 'loc_fia_campeones',
        missable: false
      },
      {
        pasoId: 'fia_04',
        orden: 4,
        ubicacionNombre: 'Sueño Mortal: Dragón Liche Fortissax',
        region: 'Fondo de Raíz Profunda (Subterráneo)',
        coords: [2050, 2800],
        descripcion: 'Entrégale el Sello maldito de la Muerte (conseguido en la Torre Sagrada de Liurnia). Toca a Fia dormida para entrar en su sueño y abatir a Fortissax. Obtendrás la Runa de Reparación del Príncipe de la Muerte.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php#paso4',
        locationId: 'loc_fia_fortissax_final',
        missable: false
      }
    ]
  },
  {
    id: 'quest_corhyn',
    npc: 'Hermano Corhyn y Máscara Dorada',
    icono: 'sun',
    pasos: [
      {
        pasoId: 'corhyn_01',
        orden: 1,
        ubicacionNombre: 'Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Corhyn instruye en encantamientos de la Orden Dorada. Tras llegar a la Meseta de Altus, decide marcharse en busca de Máscara Dorada.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso1',
        locationId: 'loc_corhyn_mesa_redonda',
        missable: false
      },
      {
        pasoId: 'corhyn_02',
        orden: 2,
        ubicacionNombre: 'Cruce de Caminos de Altus',
        region: 'Meseta de Altus',
        coords: [2850, 2300],
        descripcion: 'Encuentra a Corhyn en el camino al norte del Cruce de caminos de Altus. Dile que aún no has avistado a su venerado maestro.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso2',
        locationId: 'loc_corhyn_camino_altus',
        missable: false
      },
      {
        pasoId: 'corhyn_03',
        orden: 3,
        ubicacionNombre: 'Gran Puente del Bosque (Máscara Dorada)',
        region: 'Meseta de Altus',
        coords: [3150, 2450],
        descripcion: 'Encuentra a Máscara Dorada meditando al final del puente roto norte. Vuelve con Corhyn y guíalo hacia él para que se convierta en su escriba.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso3',
        locationId: 'loc_corhyn_puente_bosque',
        missable: false
      },
      {
        pasoId: 'corhyn_04',
        orden: 4,
        ubicacionNombre: 'Coliseo de Leyndell (El Enigma de Radagon)',
        region: 'Leyndell, Capital Real',
        coords: [2850, 2800],
        descripcion: 'Ambos debaten junto al coliseo. Lanza el encantamiento "Ley de la Regresión" ante la estatua de Radagon para revelar que "Radagon es Márika" y comunícaselo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso4',
        locationId: 'loc_corhyn_enigma_radagon',
        missable: true,
        advertenciaMissable: 'Obligatorio: Requiere 37 de Inteligencia para lanzar el encantamiento. Debe resolverse antes de derrotar a Maliketh en Farum Azula.'
      },
      {
        pasoId: 'corhyn_05',
        orden: 5,
        ubicacionNombre: 'Ruinas de los Astrónomos',
        region: 'Picos de los Gigantes',
        coords: [3700, 3450],
        descripcion: 'Encuéntralos en el puente sobre el valle helado debatiendo sobre los defectos intrínsecos de los dioses.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso5',
        locationId: 'loc_corhyn_astronomos',
        missable: false
      },
      {
        pasoId: 'corhyn_06',
        orden: 6,
        ubicacionNombre: 'Leyndell, Capital de Ceniza',
        region: 'Leyndell, Capital Real',
        coords: [2750, 2900],
        descripcion: 'Tras quemar el Árbol Áureo y batir a Maliketh, recoge la Runa de Reparación de la Orden Perfecta del cadáver de Máscara Dorada al pie del acantilado.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso6',
        locationId: 'loc_corhyn_runa_final',
        missable: false
      }
    ]
  },
  {
    id: 'quest_dungeater',
    npc: 'El Zampaheces',
    icono: 'skull',
    pasos: [
      {
        pasoId: 'dungeater_01',
        orden: 1,
        ubicacionNombre: 'Mesa Redonda (Sala Roja)',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Aparece como espectro inmundo tras alcanzar la Meseta de Altus. Te amenaza con contaminarte a ti y a tus descendientes.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes028.php#paso1',
        locationId: 'loc_dungeater_mesa_redonda',
        missable: false
      },
      {
        pasoId: 'dungeater_02',
        orden: 2,
        ubicacionNombre: 'Entrega de Maldición del Semillero',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Consigue tu primera Maldición del semillero (en Leyndell o Mansión del Volcán) y enséñasela. Te entregará la Llave de la celda de las cloacas.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes028.php#paso2',
        locationId: 'loc_dungeater_semillero_entrega',
        missable: false
      },
      {
        pasoId: 'dungeater_03',
        orden: 3,
        ubicacionNombre: 'Prisión de las Cloacas de Leyndell',
        region: 'Leyndell, Capital Real',
        coords: [2700, 2750],
        descripcion: 'Desciende a los Subterráneos de los marginados y libera su cuerpo físico atrapado en una celda custodiada por flores venenosas.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes028.php#paso3',
        locationId: 'loc_dungeater_cloacas_liberacion',
        missable: true,
        advertenciaMissable: 'Dile que salga de su prisión; si lo atacas y matas en la celda perderás su Runa de desenlace.'
      },
      {
        pasoId: 'dungeater_04',
        orden: 4,
        ubicacionNombre: 'Foso Exterior de Leyndell',
        region: 'Meseta de Altus',
        coords: [2800, 2600],
        descripcion: 'Derrota al invasor Zampaheces en el estanque exterior de la capital. Recompensa: Espada de Milos.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes028.php#paso4',
        locationId: 'loc_dungeater_foso_invasion',
        missable: false
      },
      {
        pasoId: 'dungeater_05',
        orden: 5,
        ubicacionNombre: 'Silla de las Cloacas (Consumación)',
        region: 'Leyndell, Capital Real',
        coords: [2700, 2750],
        descripcion: 'Regresa a su celda y aliméntalo con 5 Maldiciones del semillero. Obtendrás la Runa de Reparación de la Maldición de la Desesperación y su armadura de presagio.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes028.php#paso5',
        locationId: 'loc_dungeater_runa_final',
        missable: false
      }
    ]
  },
  {
    id: 'quest_boc',
    npc: 'Boc el Costurero',
    icono: 'needle',
    pasos: [
      {
        pasoId: 'boc_01',
        orden: 1,
        ubicacionNombre: 'Árbol parlante al sur de Agheel',
        region: 'Necrolimbo',
        coords: [1300, 2400],
        descripcion: 'Rueda o golpea el árbol sospechoso que te llama a gritos para deshacer la maldición que convirtió a Boc en arbusto.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso1',
        locationId: 'loc_boc_arbol',
        missable: false
      },
      {
        pasoId: 'boc_02',
        orden: 2,
        ubicacionNombre: 'Cueva del Litoral',
        region: 'Necrolimbo',
        coords: [1200, 2200],
        descripcion: 'Encuéntralo malherido en la entrada de la cueva costera. Vence a los Jefes semihumanos y recupérale su Aguja e hilo de coser.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso2',
        locationId: 'loc_boc_cueva_litoral',
        missable: false
      },
      {
        pasoId: 'boc_03',
        orden: 3,
        ubicacionNombre: 'Acantilados frente al Lago',
        region: 'Liurnia',
        coords: [1500, 2100],
        descripcion: 'Aparece descansando junto a la Gracia tras derrotar a Godrick. Se compromete como tu sastre personal modificando atuendos gratis.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso3',
        locationId: 'loc_boc_liurnia_gracia',
        missable: false
      },
      {
        pasoId: 'boc_04',
        orden: 4,
        ubicacionNombre: 'Puerta Este de Leyndell (Eres Bello)',
        region: 'Leyndell, Capital Real',
        coords: [2900, 2650],
        descripcion: 'Boc llora por su fealdad y pide una Lágrima larvaria para renacer con Rennala. ¡NO SE LA DES o morirá! Usa la Cabeza parlante "Eres bello" frente a él para salvar su vida.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso4',
        locationId: 'loc_boc_eres_bello_final',
        missable: true,
        advertenciaMissable: 'Cuidado mortal: Entregarle la Lágrima larvaria causará que renazca como humano mudo y muera trágicamente poco después en la academia.'
      }
    ]
  },
  {
    id: 'quest_patches',
    npc: 'Parches (Patches)',
    icono: 'shield',
    pasos: [
      {
        pasoId: 'patches_01',
        orden: 1,
        ubicacionNombre: 'Cueva de Aguasnegras',
        region: 'Necrolimbo',
        coords: [1350, 2550],
        descripcion: 'Abre su cofre trampa en la cueva. Lucha contra él y detén tus ataques cuando se rinda al 50% de vida para perdonarlo y abrir su tienda.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso1',
        locationId: 'loc_patches_aguasnegras',
        missable: false
      },
      {
        pasoId: 'patches_02',
        orden: 2,
        ubicacionNombre: 'Isla Pintoresca',
        region: 'Liurnia',
        coords: [1750, 1600],
        descripcion: 'Descansa en el humedal de Liurnia. Te revelará el rumor del mecanismo de la Doncella de Hierro en Raya Lucaria que absorbe al jugador hasta el volcán.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso2',
        locationId: 'loc_patches_isla_pintoresca',
        missable: false
      },
      {
        pasoId: 'patches_03',
        orden: 3,
        ubicacionNombre: 'Barranco del Monte Gelmir',
        region: 'Monte Gelmir',
        coords: [3150, 1750],
        descripcion: 'Sigue el sendero de piedras brillantes hasta el borde del precipicio para que Parches te dé su clásico empujón de bienvenida.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso3',
        locationId: 'loc_patches_empujon_gelmir',
        missable: false
      },
      {
        pasoId: 'patches_04',
        orden: 4,
        ubicacionNombre: 'Mansión del Volcán',
        region: 'Monte Gelmir',
        coords: [3350, 1600],
        descripcion: 'Únete a la Mansión del Volcán y habla con Parches en el pasillo para recibir una carta de encargo para cazar al Gran Tragasangres Tragoth. Recompensa: Armadura de toro.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso4',
        locationId: 'loc_patches_mansion_volcan',
        missable: true,
        advertenciaMissable: 'Debes completar su encargo antes de derrotar a Rykard, Señor de la Blasfemia, o la mansión quedará desierta.'
      },
      {
        pasoId: 'patches_05',
        orden: 5,
        ubicacionNombre: 'Castillo Sombrío',
        region: 'Meseta de Altus',
        coords: [3300, 2350],
        descripcion: 'En el pasillo exterior antes del salón del jefe, Parches herido te encomienda entregarle las Castañuelas de bailarina a Lady Tanith.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso5',
        locationId: 'loc_patches_castillo_sombrio',
        missable: false
      }
    ]
  },
  {
    id: 'quest_hyetta',
    npc: 'Hyetta (La Doncella Ciega)',
    icono: 'eye',
    pasos: [
      {
        pasoId: 'hyetta_01',
        orden: 1,
        ubicacionNombre: 'Acantilados frente al Lago',
        region: 'Liurnia',
        coords: [1500, 2100],
        descripcion: 'Habla con la doncella ciega que busca la luz distante. Entrégale tu primera Uva Shabiri para reconfortarla.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso1',
        locationId: 'loc_hyetta_primera_uva',
        missable: false
      },
      {
        pasoId: 'hyetta_02',
        orden: 2,
        ubicacionNombre: 'Ruinas Purificadas',
        region: 'Liurnia',
        coords: [1700, 1850],
        descripcion: 'Encuentra la segunda Uva Shabiri rompiendo el suelo de tablones en las ruinas y entrégasela a Hyetta en el lado oeste.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso2',
        locationId: 'loc_hyetta_segunda_uva',
        missable: false
      },
      {
        pasoId: 'hyetta_03',
        orden: 3,
        ubicacionNombre: 'Puente de la Puerta de la Academia',
        region: 'Liurnia',
        coords: [2050, 1700],
        descripcion: 'Dale la tercera uva obtenida de Edgar el Vengador y revélale la espantosa verdad: que las uvas son en realidad globos oculares humanos.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso3',
        locationId: 'loc_hyetta_revelacion',
        missable: false
      },
      {
        pasoId: 'hyetta_04',
        orden: 4,
        ubicacionNombre: 'Iglesia de Bellum / Inhibición',
        region: 'Liurnia',
        coords: [2650, 1850],
        descripcion: 'Derrota al invasor Vyke, Dedo Fétido cerca de la Iglesia de la Inhibición para arrebatarle la Uva Dactilar y dársela a Hyetta.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso4',
        locationId: 'loc_hyetta_uva_dactilar',
        missable: true,
        advertenciaMissable: 'La invasión de Vyke puede no ocurrir si el jefe de zona ha sido derrotado prematuramente.'
      },
      {
        pasoId: 'hyetta_05',
        orden: 5,
        ubicacionNombre: 'Santuario de la Llama Frenética',
        region: 'Leyndell, Capital Real',
        coords: [2600, 2850],
        descripcion: 'Desciende a la fosa más profunda de las cloacas de Leyndell. Despójate de toda armadura para recibir la marca de los Tres Dedos. Tócale los ojos a Hyetta para nombrarla sacerdotisa y obtener el Sello de la Llama Frenética.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso5',
        locationId: 'loc_hyetta_tres_dedos_final',
        missable: false
      }
    ]
  },
  {
    id: 'quest_irina',
    npc: 'Irina y Edgar',
    icono: 'letter',
    pasos: [
      {
        pasoId: 'irina_01',
        orden: 1,
        ubicacionNombre: 'Puente del Sacrificio',
        region: 'Península del Llanto',
        coords: [950, 2550],
        descripcion: 'Irina, sentada junto al camino tras cruzar el puente custodiado por balistas, te suplica que lleves una carta a su padre Edgar en Morne.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso1',
        locationId: 'loc_irina_puente_sacrificio',
        missable: false
      },
      {
        pasoId: 'irina_02',
        orden: 2,
        ubicacionNombre: 'Almenas del Castillo de Morne',
        region: 'Península del Llanto',
        coords: [500, 2580],
        descripcion: 'Entrega la carta a Edgar en lo alto de la torre del castillo. Se niega a irse hasta recuperar la Gran Espada con Injertos del rebelde Leonino.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso2',
        locationId: 'loc_edgar_castillo_morne',
        missable: false
      },
      {
        pasoId: 'irina_03',
        orden: 3,
        ubicacionNombre: 'Playa de Morne (Bastardo Leonino)',
        region: 'Península del Llanto',
        coords: [420, 2550],
        descripcion: 'Vence al Bastardo Leonino en la costa sur y regresa con Edgar para que cumpla su juramento y decida volver con su hija.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso3',
        locationId: 'loc_edgar_leonino_victoria',
        missable: false
      },
      {
        pasoId: 'irina_04',
        orden: 4,
        ubicacionNombre: 'Tragedia en el Puente del Sacrificio',
        region: 'Península del Llanto',
        coords: [950, 2550],
        descripcion: 'Irina yace asesinada por los semihumanos. Edgar, destrozado sobre su cuerpo inerte, jura una sangrienta venganza contra todos los responsables.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso4',
        locationId: 'loc_irina_asesinato',
        missable: true,
        advertenciaMissable: 'Este evento detona la transformación de Edgar en invasor Dedo Sangriento en Liurnia.'
      },
      {
        pasoId: 'irina_05',
        orden: 5,
        ubicacionNombre: 'Choza del Vengador',
        region: 'Liurnia',
        coords: [1950, 1200],
        descripcion: 'Edgar, enloquecido por el dolor, te invade como "Edgar el Vengador" entre pilas de cadáveres. Al vencerlo obtendrás su Alabarda de caballero desterrado +8 y una Uva Shabiri.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso5',
        locationId: 'loc_edgar_vengador_invasion',
        missable: false
      }
    ]
  },
  {
    id: 'quest_diallos',
    npc: 'Diallos Hoslow',
    icono: 'whip',
    pasos: [
      {
        pasoId: 'diallos_01',
        orden: 1,
        ubicacionNombre: 'Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Diallos presume de su linaje noble y te pide avisarle si encuentras a su fiel sirvienta Lanya.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso1',
        locationId: 'loc_diallos_mesa_redonda',
        missable: false
      },
      {
        pasoId: 'diallos_02',
        orden: 2,
        ubicacionNombre: 'Pueblo de la Puerta de la Academia',
        region: 'Liurnia',
        coords: [1850, 1650],
        descripcion: 'Diallos llora desconsolado sobre el cuerpo sin vida de Lanya, asesinada por los renegados rebeldes de la Mansión del Volcán.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso2',
        locationId: 'loc_diallos_lanya_muerte',
        missable: false
      },
      {
        pasoId: 'diallos_03',
        orden: 3,
        ubicacionNombre: 'Salón de la Mansión del Volcán',
        region: 'Monte Gelmir',
        coords: [3350, 1600],
        descripcion: 'Tras jurar venganza, irónicamente es seducido por Tanith y se une a los recusantes, sintiéndose confundido e indigno de su armadura.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso3',
        locationId: 'loc_diallos_mansion_volcan',
        missable: false
      },
      {
        pasoId: 'diallos_04',
        orden: 4,
        ubicacionNombre: 'Pueblo de Tarroburgo (El Nuevo Potentado)',
        region: 'Liurnia',
        coords: [1850, 2050],
        descripcion: 'Diallos abandona la mansión y encuentra su verdadera vocación cuidando con ternura a los tarritos huérfanos de Tarroburgo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso4',
        locationId: 'loc_diallos_tarroburgo',
        missable: true,
        advertenciaMissable: 'Requiere avanzar en paralelo los diálogos con el pequeño Jar Bairn en Tarroburgo.'
      },
      {
        pasoId: 'diallos_05',
        orden: 5,
        ubicacionNombre: 'Heroísmo en Tarroburgo',
        region: 'Liurnia',
        coords: [1850, 2050],
        descripcion: 'Diallos combate heroicamente contra los cazadores furtivos para salvar a los tarros. En su último suspiro confirma que murió como un auténtico guerrero. Otorga la Máscara de Diallos y el Látigo con pétalos de Hoslow.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso5',
        locationId: 'loc_diallos_defensa_final',
        missable: false
      }
    ]
  },
  {
    id: 'quest_latenna',
    npc: 'Latenna la Albanáurica',
    icono: 'bow',
    pasos: [
      {
        pasoId: 'latenna_01',
        orden: 1,
        ubicacionNombre: 'Cabaña del Lobo Durmiente',
        region: 'Liurnia',
        coords: [1600, 1500],
        descripcion: 'Cruza la Cueva de Cristal del Humedal para encontrar a Latenna llorando junto a su fiel lobo Lobo muerto.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes017.php#paso1',
        locationId: 'loc_latenna_cabana_lobo',
        missable: false
      },
      {
        pasoId: 'latenna_02',
        orden: 2,
        ubicacionNombre: 'El Medallón Secreto de Albus',
        region: 'Liurnia',
        coords: [1600, 1500],
        descripcion: 'Enséñale la mitad secreta del medallón entregada por el anciano Albus en la Aldea de los Albanáuricos. Aceptará transformarse en ceniza de invocación para guiarte a su tierra prometida.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes017.php#paso2',
        locationId: 'loc_latenna_ceniza_pacto',
        missable: false
      },
      {
        pasoId: 'latenna_03',
        orden: 3,
        ubicacionNombre: 'Iglesia de la Apostasía',
        region: 'Campo Sacroníveo',
        coords: [4100, 2800],
        descripcion: 'En el extremo norte de las nieves sagradas, invócala frente a Phillia, la hermana albanáurica durmiente gigante, para transferir la gota primordial y recibir una valiosa Piedra de forja de dragón sombrío.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes017.php#paso3',
        locationId: 'loc_latenna_apostasia_final',
        missable: true,
        advertenciaMissable: 'Solo podrás invocarla situándote exactamente sobre la silueta interactiva ante la estatua gigante.'
      }
    ]
  },
  {
    id: 'quest_rogier',
    npc: 'Rogier el Hechicero',
    icono: 'sword',
    pasos: [
      {
        pasoId: 'rogier_01',
        orden: 1,
        ubicacionNombre: 'Capilla de Velo Tormentoso',
        region: 'Necrolimbo',
        coords: [1650, 2150],
        descripcion: 'Encuentra a Rogier en el interior de la capilla del castillo. Ofrece apoyo mágico y te vende cenizas de guerra.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes024.php#paso1',
        locationId: 'loc_rogier_capilla_velo',
        missable: false
      },
      {
        pasoId: 'rogier_02',
        orden: 2,
        ubicacionNombre: 'Balcón de la Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Tras derrotar a Godrick el Injertado, Rogier descansa con sus piernas lisiadas en el balcón y te obsequia su Estoque de Rogier +8.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes024.php#paso2',
        locationId: 'loc_rogier_balcon_mesa',
        missable: false
      },
      {
        pasoId: 'rogier_03',
        orden: 3,
        ubicacionNombre: 'Cripta de Godwyn en Velo Tormentoso',
        region: 'Necrolimbo',
        coords: [1550, 2100],
        descripcion: 'Desciende al foso bajo el castillo donde yace el rostro monstruoso de Godwyn y activa el charco de sangre donde Rogier fue maldecido con espinas mortales.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes024.php#paso3',
        locationId: 'loc_rogier_cripta_sangre',
        missable: true,
        advertenciaMissable: 'Observar su mancha de sangre desbloquea los diálogos críticos sobre la Noche de los Cuchillos Negros.'
      },
      {
        pasoId: 'rogier_04',
        orden: 4,
        ubicacionNombre: 'La Carta de Rogier sobre D',
        region: 'Mesa Redonda',
        coords: [2500, 2500],
        descripcion: 'Antes de sucumbir a su enfermedad letal, Rogier te entrega una carta secreta revelando la existencia del hermano gemelo de D en el Acueducto de Siofra. Deja su Set de viajero y Esfera tras morir.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes024.php#paso4',
        locationId: 'loc_rogier_carta_muerte',
        missable: false
      }
    ]
  },
  {
    id: 'quest_kenneth',
    npc: 'Kenneth Haight',
    icono: 'crown',
    pasos: [
      {
        pasoId: 'kenneth_01',
        orden: 1,
        ubicacionNombre: 'Ruinas Elevadas de Necrolimbo Este',
        region: 'Necrolimbo',
        coords: [1300, 2750],
        descripcion: 'El autoproclamado legítimo gobernante de Limgrave te pide limpiar su fortaleza ancestral del caballero de Godrick infundido de sangre.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes015.php#paso1',
        locationId: 'loc_kenneth_pedestal_camino',
        missable: false
      },
      {
        pasoId: 'kenneth_02',
        orden: 2,
        ubicacionNombre: 'Almenas de Fuerte Haight',
        region: 'Necrolimbo',
        coords: [1150, 2950],
        descripcion: 'Elimina a los invasores y habla con Kenneth en la cima del fuerte para recibir la Daga de acero de Erd y jurarle lealtad como caballero.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes015.php#paso2',
        locationId: 'loc_kenneth_fuerte_recuperado',
        missable: false
      },
      {
        pasoId: 'kenneth_03',
        orden: 3,
        ubicacionNombre: 'Trigésima Corte en Velo Tormentoso',
        region: 'Necrolimbo',
        coords: [1750, 2120],
        descripcion: 'Reconoce a Nepheli Loux como la verdadera reina de Limgrave y se instala a su lado en el salón del trono para liderar la reconstrucción de las tierras.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes015.php#paso3',
        locationId: 'loc_kenneth_trono_limgrave',
        missable: false
      }
    ]
  },
  {
    id: 'quest_seluvis',
    npc: 'Preceptor Seluvis',
    icono: 'hat',
    pasos: [
      {
        pasoId: 'seluvis_01',
        orden: 1,
        ubicacionNombre: 'Torre de Seluvis (Tres Hermanas)',
        region: 'Liurnia',
        coords: [2650, 1250],
        descripcion: 'El arrogante preceptor de Ranni te confía una poción que anula la voluntad para dársela a Nepheli Loux.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso1',
        locationId: 'loc_seluvis_torre_tres_hermanas',
        missable: false
      },
      {
        pasoId: 'seluvis_02',
        orden: 2,
        ubicacionNombre: 'Sótano de Marionetas de Seluvis',
        region: 'Liurnia',
        coords: [2750, 1250],
        descripcion: 'Rompe el suelo ilusorio en las ruinas entre su torre y la de Ranni para descubrir su almacén clandestino de marionetas humanas y confrontarlo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso2',
        locationId: 'loc_seluvis_laboratorio_secreto',
        missable: false
      },
      {
        pasoId: 'seluvis_03',
        orden: 3,
        ubicacionNombre: 'El Brebaje del Ámbar Traicionero',
        region: 'Meseta de Altus',
        coords: [3000, 2400],
        descripcion: 'Consigue el Fragmento de luz estelar de ámbar cerca del Cruce de caminos de Altus para preparar una poción capaz de someter a la misma Ranni. ¡CUIDADO! Si intentas dársela a Ranni, romperás tu pacto con ella.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso3',
        locationId: 'loc_seluvis_ambar_luz_estelar',
        missable: true,
        advertenciaMissable: 'Atención extrema: Intentar envenenar a Ranni con este brebaje enfurecerá a la bruja y bloqueará su línea de misiones a menos que te absuelvas en la Iglesia de los Juramentos.'
      },
      {
        pasoId: 'seluvis_04',
        orden: 4,
        ubicacionNombre: 'Cadáver de Seluvis en su Torre',
        region: 'Liurnia',
        coords: [2650, 1250],
        descripcion: 'Tras entregarle la Hoja Dactilicida a Ranni, Seluvis es hallado muerto en su torre como una muñeca desechada. Recoge su Set de preceptor y Amuleto de escorpión mágico.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes026.php#paso4',
        locationId: 'loc_seluvis_muerte_final',
        missable: false
      }
    ]
  }
];

// Generar colección completa de ubicaciones sincronizadas con coordenadas [y, x]
const ALL_LOCATIONS = [];

// Agregar hitos legendarios clave no pertenecientes a misiones directas
ALL_LOCATIONS.push(
  // --- SITIOS DE GRACIA (GRACES) ---
  {
    id: 'loc_primer_paso',
    titulo: 'Sitio de Gracia: El Primer Paso',
    categoria: 'graces',
    region: 'Necrolimbo',
    coords: [1250, 2350],
    descripcion: 'Punto de partida de la aventura al emerger de la Cripta del Conocimiento.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php',
    importante: true
  },
  {
    id: 'loc_gracia_iglesia_elleh',
    titulo: 'Sitio de Gracia: Iglesia de Elleh',
    categoria: 'graces',
    region: 'Necrolimbo',
    coords: [1320, 2380],
    descripcion: 'Ruinas de la iglesia donde aguarda el mercader Kalé y el yunque de refuerzo de armas.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares002.php',
    importante: true
  },
  {
    id: 'loc_gracia_puerta_academia',
    titulo: 'Sitio de Gracia: Puerta Sur de Raya Lucaria',
    categoria: 'graces',
    region: 'Liurnia',
    coords: [2100, 1680],
    descripcion: 'Punto de acceso sellado a la gran academia mágica, custodiado por el sello de piedra fulgurante.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares015.php',
    importante: true
  },
  {
    id: 'loc_gracia_elevador_dectus',
    titulo: 'Sitio de Gracia: Gran Elevador de Dectus',
    categoria: 'graces',
    region: 'Liurnia Norte',
    coords: [2750, 2050],
    descripcion: 'Paso colosal que conecta Liurnia con la Meseta de Altus mediante el Medallón de Dectus.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares022.php',
    importante: true
  },
  {
    id: 'loc_gracia_altus_cruce',
    titulo: 'Sitio de Gracia: Cruce de la Calzada de Altus',
    categoria: 'graces',
    region: 'Meseta Altus',
    coords: [3050, 2400],
    descripcion: 'Cruce estratégico de caminos en la Meseta Altus con dirección a la capital o al Monte Gelmir.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares028.php',
    importante: false
  },
  {
    id: 'loc_gracia_leyndell_muralla',
    titulo: 'Sitio de Gracia: Muralla Oriental de la Capital',
    categoria: 'graces',
    region: 'Leyndell, Capital Real',
    coords: [3050, 2800],
    descripcion: 'Vistas panorámicas hacia los tejados dorados y la arquitectura imperial de la capital de las Tierras Intermedias.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares035.php',
    importante: true
  },
  {
    id: 'loc_gracia_elevador_rold',
    titulo: 'Sitio de Gracia: Gran Elevador de Rold',
    categoria: 'graces',
    region: 'Picos de los Gigantes',
    coords: [3300, 3400],
    descripcion: 'Ascensor que comunica Leyndell con las cumbres heladas de los Gigantes y el Campo Sacroníveo.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares042.php',
    importante: true
  },
  {
    id: 'loc_gracia_campo_sacroniveo',
    titulo: 'Sitio de Gracia: Campo Sacroníveo Interior',
    categoria: 'graces',
    region: 'Campo Sacroníveo',
    coords: [3950, 2950],
    descripcion: 'Región de ventiscas permanentes y ceguera de nieve, camino secreto hacia el Árbol Hierático.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php',
    importante: true
  },

  // --- JEFES PRINCIPALES Y RECUERDOS (BOSSES) ---
  {
    id: 'loc_margit',
    titulo: 'Margit, el Augurio Caído',
    categoria: 'bosses',
    region: 'Colina de Tormentas',
    coords: [1650, 2200],
    descripcion: 'El implacable protector de las puertas del Castillo de Velo Tormentoso. Otorga una Bolsa para talismán.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes001.php',
    importante: true
  },
  {
    id: 'loc_godrick',
    titulo: 'Godrick el Injertado',
    categoria: 'bosses',
    region: 'Castillo de Velo Tormentoso',
    coords: [1700, 2180],
    descripcion: 'Semidiós señor de Necrolimbo que injerta miembros para reclamar fuerza. Otorga la Gran Runa de Godrick.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes005.php',
    importante: true
  },
  {
    id: 'loc_rennala',
    titulo: 'Rennala, Reina de la Luna Llena',
    categoria: 'bosses',
    region: 'Gran Academia de Raya Lucaria',
    coords: [2320, 1600],
    descripcion: 'Maestra de la academia cariana que permite el Renacimiento (respec de atributos). Otorga la Gran Runa de los Nonatos.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes012.php',
    importante: true
  },
  {
    id: 'loc_radahn',
    titulo: 'General Radahn, Azote de las Estrellas',
    categoria: 'bosses',
    region: 'Castillo de la Melena Roja (Caelid)',
    coords: [1220, 3950],
    descripcion: 'El semidiós más poderoso en fuerza física que sostiene las estrellas del cosmos en los cielos de Caelid.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes020.php',
    importante: true
  },
  {
    id: 'loc_rykard',
    titulo: 'Rykard, Señor de la Blasfemia',
    categoria: 'bosses',
    region: 'Mansión del Volcán',
    coords: [3050, 1620],
    descripcion: 'Famoso líder rebelde devorado por la gran Serpiente Devoradora de Dioses en las profundidades del Monte Gelmir.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes028.php',
    importante: true
  },
  {
    id: 'loc_morgott',
    titulo: 'Morgott, Rey de los Augurios',
    categoria: 'bosses',
    region: 'Leyndell (Trono de Elden)',
    coords: [3000, 2900],
    descripcion: 'El último de todos los reyes, defensor leal del Árbol Áureo ante las raíces del Trono.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes034.php',
    importante: true
  },
  {
    id: 'loc_gigante_fuego',
    titulo: 'Gigante de Fuego',
    categoria: 'bosses',
    region: 'Picos de los Gigantes (Forja)',
    coords: [3650, 3950],
    descripcion: 'El último guardián superviviente de la llama primordial de los gigantes en la Forja de las Cumbres.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes040.php',
    importante: true
  },
  {
    id: 'loc_malenia',
    titulo: 'Malenia, Espada de Miquella',
    categoria: 'bosses',
    region: 'Elphael, tutor del Árbol Hierático',
    coords: [4750, 3100],
    descripcion: 'La diosa de la putrefacción roja que nunca conoció la derrota en combate singular.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes050.php',
    importante: true
  },
  {
    id: 'loc_maliketh',
    titulo: 'Maliketh, la Espada Negra',
    categoria: 'bosses',
    region: 'Farum Azula en Ruinas',
    coords: [2820, 4750],
    descripcion: 'La sombra de la Reina Márika y portador de la Runa de la Muerte Destinada.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes045.php',
    importante: true
  },
  {
    id: 'loc_mohg',
    titulo: 'Mohg, Señor de la Sangre',
    categoria: 'bosses',
    region: 'Palacio de Mohgwyn',
    coords: [1350, 3150],
    descripcion: 'Gobernante del mausoleo subterráneo que secuestró a Miquella para fundar la Dinastía Mohgwyn.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes048.php',
    importante: true
  },

  // --- ARMAS LEGENDARIAS (WEAPONS) ---
  {
    id: 'loc_espada_noche_llama',
    titulo: 'Espada de la Noche y la Llama',
    categoria: 'weapons',
    region: 'Mansión Cariana',
    coords: [2600, 1400],
    descripcion: 'Espada recta legendaria guardada en un cofre sellado en los tejados de la mansión.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas045.php',
    importante: true
  },
  {
    id: 'loc_velo_luna',
    titulo: 'Velo de Luna (Moonveil Katana)',
    categoria: 'weapons',
    region: 'Galería de Gael (Caelid)',
    coords: [1650, 3150],
    descripcion: 'Katana de piedra fulgurante obtenida derrotando al Dragón de Magma en la mina fronteriza.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas072.php',
    importante: true
  },
  {
    id: 'loc_rios_sangre',
    titulo: 'Ríos de Sangre (Rivers of Blood)',
    categoria: 'weapons',
    region: 'Iglesia del Reposo (Picos)',
    coords: [3600, 3850],
    descripcion: 'Katana maldita de Okina el invasor con la letal habilidad Danza de cadáveres.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas088.php',
    importante: true
  },
  {
    id: 'loc_espadon_orden_dorada',
    titulo: 'Espadón de la Orden Dorada',
    categoria: 'weapons',
    region: 'Cueva del Olvido (Campo Sacroníveo)',
    coords: [4100, 3300],
    descripcion: 'Espada legendaria forjada por Radagon de la Orden Dorada.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas055.php',
    importante: true
  },
  {
    id: 'loc_espadon_ruinas',
    titulo: 'Espadón de Ruinas',
    categoria: 'weapons',
    region: 'Castillo de la Melena Roja',
    coords: [1200, 3920],
    descripcion: 'Armamento legendario tallado a partir de meteorito caído del cielo.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas060.php',
    importante: true
  },

  // --- CENIZAS DE INVOCACIÓN (ASHES) ---
  {
    id: 'loc_lagrima_mimetica',
    titulo: 'Ceniza de Lágrima Mimética',
    categoria: 'ashes',
    region: 'Nokron, Ciudad Eterna',
    coords: [1450, 3450],
    descripcion: 'La invocación legendaria más poderosa del juego, encerrada tras un muro de niebla en Nokron.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus032.php',
    importante: true
  },
  {
    id: 'loc_lhutel_acefala',
    titulo: 'Ceniza de Lhutel la Acéfala',
    categoria: 'ashes',
    region: 'Catacumbas de las Tumbas (Península)',
    coords: [900, 2450],
    descripcion: 'Ceniza legendaria de la caballera sin cabeza que se teletransporta arrojando lanzas espectrales.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus012.php',
    importante: true
  },
  {
    id: 'loc_tiche_cuchillo_negro',
    titulo: 'Ceniza de Tiche, Cuchillo Negro',
    categoria: 'ashes',
    region: 'Cárcel Eterna del Caudillo (Liurnia Sur)',
    coords: [2000, 1250],
    descripcion: 'Asesina letal del Cuchillo Negro imbuida con la llama destructiva de la Muerte Destinada.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus040.php',
    importante: true
  },
  {
    id: 'loc_finlay_caballero',
    titulo: 'Ceniza de Finlay, Caballero Imputrescible',
    categoria: 'ashes',
    region: 'Elphael, tutor del Árbol Hierático',
    coords: [4650, 3180],
    descripcion: 'Heroica caballera que transportó a Malenia durmiente desde Caelid hasta las raíces del Árbol.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus052.php',
    importante: true
  },

  // --- OBJETOS CLAVE (KEY ITEMS) ---
  {
    id: 'loc_medallon_dectus_izq',
    titulo: 'Medallón de Dectus (Izquierda)',
    categoria: 'key_items',
    region: 'Fuerte Haight',
    coords: [1150, 2950],
    descripcion: 'Mitad izquierda del medallón requerida para activar el Gran Elevador de Dectus hacia Altus.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos_clave015.php',
    importante: true
  },
  {
    id: 'loc_medallon_dectus_der',
    titulo: 'Medallón de Dectus (Derecha)',
    categoria: 'key_items',
    region: 'Fuerte Faroth (Dragonbarrow)',
    coords: [1650, 3850],
    descripcion: 'Mitad derecha guardada en lo alto del cofre del peligroso Fuerte Faroth en Dragonbarrow.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos_clave016.php',
    importante: true
  },
  {
    id: 'loc_medallon_arbol_der',
    titulo: 'Medallón Secreto del Árbol Hierático (Derecha)',
    categoria: 'key_items',
    region: 'Aldea de los Albanáuricos',
    coords: [1750, 1450],
    descripcion: 'Entregado por el sabio Albus disfrazado de vasija en la aldea pantanosa de Liurnia.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos_clave025.php',
    importante: true
  },
  {
    id: 'loc_medallon_arbol_izq',
    titulo: 'Medallón Secreto del Árbol Hierático (Izquierda)',
    categoria: 'key_items',
    region: 'Castillo de Sol (Picos)',
    coords: [4050, 3650],
    descripcion: 'Obtenido en lo más alto de la torre tras derrotar al Comandante Niall.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos_clave026.php',
    importante: true
  },
  {
    id: 'loc_medallon_rold',
    titulo: 'Medallón de Rold',
    categoria: 'key_items',
    region: 'Leyndell (Cámara del Trono)',
    coords: [3020, 2980],
    descripcion: 'Entregado por Melina tras derrotar a Morgott para abrir paso hacia las tierras nevadas.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos_clave030.php',
    importante: true
  },

  // --- HITOS DEL DLC SHADOW OF THE ERDTREE (REINO DE LA SOMBRA) ---
  {
    id: 'loc_dlc_gracia_tumbas',
    titulo: 'Sitio de Gracia: Llanura de las Tumbas',
    categoria: 'graces',
    region: 'Llanura de las Tumbas (DLC)',
    coords: [1450, 2800],
    mapaOrigen: 'dlc',
    descripcion: 'Primer punto de descanso al acceder al Reino de la Sombra a través del capullo de Miquella.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring-p100.php',
    importante: true
  },
  {
    id: 'loc_dlc_jefe_belurat',
    titulo: 'Bestia Divina León Danzante',
    categoria: 'bosses',
    region: 'Asentamiento de la Torre de Belurat (DLC)',
    coords: [2100, 1750],
    mapaOrigen: 'dlc',
    descripcion: 'Poderosa bestia legendaria invocada por los sacerdotes cornudos que manipula tormentas de rayos, hielo y viento.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php',
    importante: true
  },
  {
    id: 'loc_dlc_jefe_messmer',
    titulo: 'Messmer el Empalador',
    categoria: 'bosses',
    region: 'Castillo de la Sombra (DLC)',
    coords: [3450, 3200],
    mapaOrigen: 'dlc',
    descripcion: 'Hijo oculto de la Reina Márika, señor del fuego serpentino y azote implacable del Reino de la Sombra.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php',
    importante: true
  },
  {
    id: 'loc_dlc_jefe_romina',
    titulo: 'Romina, Santa del Brote',
    categoria: 'bosses',
    region: 'Antiguas Ruinas de Rauh (DLC)',
    coords: [3300, 1500],
    mapaOrigen: 'dlc',
    descripcion: 'Entidad sagrada fusionada con ciempiés y escorpiones que custodia la entrada al árbol sellado.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php',
    importante: true
  },
  {
    id: 'loc_dlc_jefe_rellana',
    titulo: 'Rellana, Caballera de la Luna Gemela',
    categoria: 'bosses',
    region: 'Castillo de Ensis (DLC)',
    coords: [2500, 2700],
    mapaOrigen: 'dlc',
    descripcion: 'Hermana de Rennala que renunció a su linaje cariano para blandir espadas de fuego y hechicería junto a Messmer.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php',
    importante: true
  },
  {
    id: 'loc_dlc_gracia_scadu_altus',
    titulo: 'Sitio de Gracia: Cruce de Scadu Altus',
    categoria: 'graces',
    region: 'Altus de la Sombra (DLC)',
    coords: [2850, 2950],
    mapaOrigen: 'dlc',
    descripcion: 'Cruce neurálgico en la meseta de la sombra donde se encuentran los seguidores de Miquella.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring-p105.php',
    importante: true
  },
  {
    id: 'loc_dlc_arma_milady',
    titulo: 'Espada Ligera: Milady',
    categoria: 'weapons',
    region: 'Castillo de Ensis (DLC)',
    coords: [2550, 2800],
    mapaOrigen: 'dlc',
    descripcion: 'Espada ligera de estocada elegante y velocidad mortal guardada en una torre del castillo.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  },
  {
    id: 'loc_dlc_item_fragmento_arbol',
    titulo: 'Fragmento de Árbol Sombrío',
    categoria: 'key_items',
    region: 'Llanura de las Tumbas (DLC)',
    coords: [1600, 2900],
    mapaOrigen: 'dlc',
    descripcion: 'Fragmento bendito del Scadutree que incrementa permanentemente el ataque y defensa en el Reino de la Sombra.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  },
  {
    id: 'loc_dlc_item_ceniza_reverenciada',
    titulo: 'Ceniza de Espíritu Reverenciada',
    categoria: 'key_items',
    region: 'Asentamiento de Belurat (DLC)',
    coords: [2050, 1850],
    mapaOrigen: 'dlc',
    descripcion: 'Ceniza sagrada para potenciar a las invocaciones de espíritus y a Torrentera en el DLC.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  },
  {
    id: 'loc_dlc_npc_leda',
    titulo: 'Leda, Caballera de la Aguja',
    categoria: 'npcs',
    region: 'Llanura de las Tumbas (DLC)',
    coords: [1500, 2850],
    mapaOrigen: 'dlc',
    descripcion: 'Devota líder de los seguidores de Miquella el Bondadoso que rastrea sus cruces sagrados.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  },
  {
    id: 'loc_dlc_npc_ansbach',
    titulo: 'Sir Ansbach',
    categoria: 'npcs',
    region: 'Castillo de la Sombra (DLC)',
    coords: [3350, 3100],
    mapaOrigen: 'dlc',
    descripcion: 'Erudito y antiguo comandante de los Caballeros de Sangre Pura de Mohg que investiga el plan de Miquella.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  },
  {
    id: 'loc_dlc_npc_thiollier',
    titulo: 'Thiollier',
    categoria: 'npcs',
    region: 'Llanura de las Tumbas (DLC)',
    coords: [1350, 2900],
    mapaOrigen: 'dlc',
    descripcion: 'Tímido herbolario y envenenador devoto de Santa Trina.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  },
  {
    id: 'loc_dlc_npc_igon',
    titulo: 'Igon, Cazador de Dragones',
    categoria: 'npcs',
    region: 'Pico Escarpado (DLC)',
    coords: [1800, 3400],
    mapaOrigen: 'dlc',
    descripcion: 'Guerrero herido cuya furia ciega contra el temible dragón Bayle el Temible inspira uno de los mejores diálogos del juego.',
    eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/elden-ring.php',
    importante: true
  }
);

// Función clasificadora de capas de mapas: surface | underground | dlc
function getMapaOrigen(region, id = '', pasoId = '') {
  const text = `${region} ${id} ${pasoId}`.toLowerCase();
  if (
    text.includes('subterráneo') ||
    text.includes('subterraneo') ||
    text.includes('siofra') ||
    text.includes('ainsel') ||
    text.includes('nokron') ||
    text.includes('nokstella') ||
    text.includes('mohgwyn') ||
    text.includes('putrefacción') ||
    text.includes('putrefaccion') ||
    text.includes('raíz profunda') ||
    text.includes('raiz profunda') ||
    id === 'loc_mohg' ||
    id === 'loc_lagrima_mimetica'
  ) {
    return 'underground';
  }
  if (
    text.includes('dlc') ||
    text.includes('sombra') ||
    text.includes('gravesite') ||
    text.includes('belurat') ||
    text.includes('rauh') ||
    text.includes('scadutree') ||
    text.includes('messmer') ||
    text.includes('ensis') ||
    text.includes('tumbas')
  ) {
    return 'dlc';
  }
  return 'surface';
}

// Coordenadas optimizadas para los puntos del mapa subterráneo
const UNDERGROUND_COORDS = {
  'loc_nokron_hoja': [3000, 3300],
  'loc_lagrima_mimetica': [3150, 3400],
  'loc_ainsel_miniatura': [1300, 2600],
  'loc_siofra_blaidd': [2400, 3600],
  'loc_mohg': [1750, 4200],
  'loc_varre_invasion_final': [1750, 4200],
  'loc_fia_campeones': [900, 3900],
  'loc_fia_fortissax_final': [950, 4000],
};

// Asignar mapaOrigen y validar coordenadas a las ubicaciones base
ALL_LOCATIONS.forEach(loc => {
  if (!loc.mapaOrigen) {
    loc.mapaOrigen = getMapaOrigen(loc.region, loc.id);
  }
  if (loc.mapaOrigen === 'underground' && UNDERGROUND_COORDS[loc.id]) {
    loc.coords = UNDERGROUND_COORDS[loc.id];
  }
});

// Mapear cada paso de las 20 misiones en marcadores exactos
const seenLocationIds = new Set(ALL_LOCATIONS.map(l => l.id));

ALL_QUESTLINES.forEach(quest => {
  quest.pasos.forEach(paso => {
    const mapaOrigen = getMapaOrigen(paso.region, paso.locationId, paso.pasoId);
    paso.mapaOrigen = mapaOrigen;

    let coords = paso.coords;
    if (mapaOrigen === 'underground' && UNDERGROUND_COORDS[paso.locationId]) {
      coords = UNDERGROUND_COORDS[paso.locationId];
      paso.coords = coords;
    }

    if (!seenLocationIds.has(paso.locationId)) {
      seenLocationIds.add(paso.locationId);
      ALL_LOCATIONS.push({
        id: paso.locationId,
        titulo: `${paso.ubicacionNombre} (${quest.npc})`,
        categoria: paso.pasoId.includes('duelo') || paso.pasoId.includes('invasion') || paso.pasoId.includes('fortissax')
          ? 'bosses'
          : 'npcs',
        region: paso.region,
        coords: coords,
        mapaOrigen: mapaOrigen,
        descripcion: paso.descripcion,
        eliteguiasUrl: paso.eliteguiasUrl,
        questlinePasoId: paso.pasoId,
        importante: paso.missable || paso.orden === 1 || paso.orden === quest.pasos.length
      });
    }
  });
});

// Guardar los archivos actualizados
fs.writeFileSync(QUESTLINES_FILE, JSON.stringify(ALL_QUESTLINES, null, 2), 'utf-8');
fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(ALL_LOCATIONS, null, 2), 'utf-8');

console.log('✅ BASE DE DATOS GENERADA CON ÉXITO:');
console.log(`- Misiones completas registradas: ${ALL_QUESTLINES.length}`);
console.log(`- Pasos de historia totales: ${ALL_QUESTLINES.reduce((acc, q) => acc + q.pasos.length, 0)}`);
console.log(`- Marcadores geolocalizados en el mapa: ${ALL_LOCATIONS.length}`);
const statsMapas = {};
ALL_LOCATIONS.forEach(l => { statsMapas[l.mapaOrigen] = (statsMapas[l.mapaOrigen] || 0) + 1; });
console.log('- Distribución por mapa:', statsMapas);

