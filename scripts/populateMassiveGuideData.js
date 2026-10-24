import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTLINES_FILE = path.join(__dirname, '../src/data/questlines.json');
const LOCATIONS_FILE = path.join(__dirname, '../src/data/locations.json');

console.log('Iniciando generador masivo y geográficamente calibrado de Elden Ring...');

// --- 1. LAS 20 QUESTLINES DE ELITEGUÍAS (99 PASOS CON COORDENADAS CALIBRADAS) ---
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
        region: 'Necrolimbo Centro',
        coords: [1440, 2090],
        descripcion: 'Habla con Renna (Ranni) de noche en las ruinas de la Iglesia de Elleh para recibir la Campana de invocación de espíritus y las Cenizas de lobo solitario.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso1',
        locationId: 'loc_ranni_01_elleh',
        missable: true,
        advertenciaMissable: 'Si avanzas hacia la Mesa Redonda sin hablar con ella aquí, desaparecerá de la iglesia y tendrás que comprar la campana en las Doncellas Gemelas.'
      },
      {
        pasoId: 'ranni_02',
        orden: 2,
        ubicacionNombre: 'Torre de Ranni (Tres Hermanas)',
        region: 'Liurnia Oeste (Caria)',
        coords: [3350, 1270],
        descripcion: 'Tras superar la Mansión Cariana y derrotar a Loretta, sube a la cima de su torre para jurarle lealtad y entrar a su servicio. Conocerás a Iji, Blaidd y Seluvis.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso2',
        locationId: 'loc_ranni_02_torre',
        missable: false
      },
      {
        pasoId: 'ranni_03',
        orden: 3,
        ubicacionNombre: 'Nokron, Ciudad Eterna',
        region: 'Río Siofra (Subterráneo)',
        coords: [1420, 2900],
        descripcion: 'Derrota a Radahn en Caelid para que caiga una estrella en Necrolimbo. Desciende al cráter y recupera la Hoja Dactilicida del cofre sagrado en Nokron.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso3',
        locationId: 'loc_ranni_03_nokron',
        missable: false,
        mapaOrigen: 'underground'
      },
      {
        pasoId: 'ranni_04',
        orden: 4,
        ubicacionNombre: 'Cuenca de la Cascada de Nokstella',
        region: 'Curso del Río Ainsel',
        coords: [2420, 1580],
        descripcion: 'Recoge la Miniatura de Ranni junto a la Gracia y descansa repetidamente en el Sitio de Gracia para hablarle hasta que te encomiende aniquilar a la Sombra Nefasta.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso4',
        locationId: 'loc_ranni_04_nokstella',
        missable: false,
        mapaOrigen: 'underground'
      },
      {
        pasoId: 'ranni_05',
        orden: 5,
        ubicacionNombre: 'Catedral de Manus Celes',
        region: 'Altar del Claro de Luna (Liurnia)',
        coords: [2060, 1220],
        descripcion: 'Derrota a Astel, asciende a la meseta sur de Liurnia. En la caverna bajo la catedral, coloca el Anillo de la Luna Negra en su dedo para culminar el pacto y recibir el legendario Espadón de la Luna Negra.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes021.php#paso5',
        locationId: 'loc_ranni_05_manus_celes',
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
        region: 'Necrolimbo Este',
        coords: [1400, 2550],
        descripcion: 'Escucha los aullidos en la torre. Habla con Kalé en la Iglesia de Elleh para aprender el gesto "Chasquido de dedos" y úsalo bajo la torre para que Blaidd baje a hablar.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso1',
        locationId: 'loc_blaidd_01_bosque',
        missable: true,
        advertenciaMissable: 'Si activas el Festival de Radahn antes de conocerlo aquí, se saltará este paso y aparecerá directamente en el Castillo de la Melena Roja.'
      },
      {
        pasoId: 'blaidd_02',
        orden: 2,
        ubicacionNombre: 'Cárcel Eterna del Sabueso Aislado',
        region: 'Necrolimbo Sur',
        coords: [1260, 2240],
        descripcion: 'Entra a la cárcel eterna para invocar a Blaidd en la pelea contra el Caballero Sabueso Darriwil. Tras vencerlo, habla con Blaidd para recibir una Piedra de forja sombría [2].',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso2',
        locationId: 'loc_blaidd_02_carcel',
        missable: false
      },
      {
        pasoId: 'blaidd_03',
        orden: 3,
        ubicacionNombre: 'Río Siofra (Pilar del Acantilado)',
        region: 'Río Siofra (Subterráneo)',
        coords: [1460, 2880],
        descripcion: 'Reúnete con Blaidd en el borde del acantilado de Siofra al este de la Gracia Orilla del Río Siofra. Te sugerirá hablar con Seluvis para averiguar cómo llegar a Nokron.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso3',
        locationId: 'loc_blaidd_03_siofra',
        missable: false,
        mapaOrigen: 'underground'
      },
      {
        pasoId: 'blaidd_04',
        orden: 4,
        ubicacionNombre: 'Castillo de la Melena Roja',
        region: 'Caelid Sur',
        coords: [1350, 3270],
        descripcion: 'Lucha codo con codo con Blaidd en el glorioso Festival de Radahn. Habla con él tras derrotar al general de las estrellas junto a la Gracia del desierto.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso4',
        locationId: 'loc_blaidd_04_radahn',
        missable: false
      },
      {
        pasoId: 'blaidd_05',
        orden: 5,
        ubicacionNombre: 'Torre de Ranni (Final)',
        region: 'Liurnia Oeste (Caria)',
        coords: [3350, 1270],
        descripcion: 'Tras completar la misión de Ranni, regresa a la Torre de Ranni. Blaidd ha enloquecido por la pérdida de su ama; véncelo para obtener su Espadón regio y el Conjunto completo de Blaidd.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes008.php#paso5',
        locationId: 'loc_blaidd_05_duelo',
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
        ubicacionNombre: 'Ruinas de la Posta (Bodega)',
        region: 'Necrolimbo Este',
        coords: [1420, 2330],
        descripcion: 'Derrota al Cabeza de Calabaza Loco en la cripta subterránea para acceder a la celda de Sellen y convertirte en su fiel discípulo de la hechicería fulgurante.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes023.php#paso1',
        locationId: 'loc_sellen_01_posta',
        missable: false
      },
      {
        pasoId: 'sellen_02',
        orden: 2,
        ubicacionNombre: 'Cabaña del Ermitaño (Monte Gelmir)',
        region: 'Monte Gelmir',
        coords: [3520, 1470],
        descripcion: 'Encuentra al petrificado Hechicero Primigenio Azur para recibir el hechizo legendario "Cometa Azur". Muéstraselo a Sellen en las Ruinas de la Posta para avanzar su misión.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes023.php#paso2',
        locationId: 'loc_sellen_02_azur',
        missable: false
      },
      {
        pasoId: 'sellen_03',
        orden: 3,
        ubicacionNombre: 'Escondite de Sellia (Maestro Lusat)',
        region: 'Montedrago de Greyoll (Caelid)',
        coords: [1810, 3240],
        descripcion: 'Usa el Rompesellos de Sellia detrás de la pared ilusoria en el cementerio de Sellia para liberar al Maestro Lusat y conseguir "Estrellas del Colapso".',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes023.php#paso3',
        locationId: 'loc_sellen_03_lusat',
        missable: false
      },
      {
        pasoId: 'sellen_04',
        orden: 4,
        ubicacionNombre: 'Ruinas de la Perdición de la Bruja',
        region: 'Península del Llanto Oeste',
        coords: [860, 2040],
        descripcion: 'Desciende a la cripta de la Península del Llanto para encontrar el cuerpo encadenado de Sellen y extraer su Piedra refulgente de alma primaria.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes023.php#paso4',
        locationId: 'loc_sellen_04_cuerpo',
        missable: false
      },
      {
        pasoId: 'sellen_05',
        orden: 5,
        ubicacionNombre: 'Laboratorio Secreto de Seluvis',
        region: 'Liurnia Oeste (Tres Hermanas)',
        coords: [3310, 1310],
        descripcion: 'Entre la Torre de Ranni y de Renna, rompe el suelo ilusorio en las ruinas para trasplantar la piedra de alma en el títere réplica de Sellen.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes023.php#paso5',
        locationId: 'loc_sellen_05_titere',
        missable: false
      },
      {
        pasoId: 'sellen_06',
        orden: 6,
        ubicacionNombre: 'Gran Biblioteca de Raya Lucaria',
        region: 'Academia de Raya Lucaria',
        coords: [2670, 1410],
        descripcion: 'Afuera de la biblioteca, elige el símbolo dorado para defender a Sellen contra Jerren. Sellen tomará la academia y te recompensará con la Daga de cristal y su máscara de erudito.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes023.php#paso6',
        locationId: 'loc_sellen_06_biblioteca',
        missable: true,
        advertenciaMissable: '¡Decisión irreversible! Si eliges el signo rojo ayudarás a Jerren y perderás los conjuntos de armadura de Azur y Lusat.'
      }
    ]
  },
  {
    id: 'quest_alexander',
    npc: 'Alexander el Tarro Guerrero',
    icono: 'shield',
    pasos: [
      {
        pasoId: 'alexander_01',
        orden: 1,
        ubicacionNombre: 'Colina de Tormentas Norte',
        region: 'Necrolimbo Norte',
        coords: [1660, 2240],
        descripcion: 'Golpea a Alexander por detrás con un ataque contundente para desatascarlo de la tierra. Recibirás el gesto Deleite y un Frasco de carne exaltada.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes002.php#paso1',
        locationId: 'loc_alexander_01_colina',
        missable: false
      },
      {
        pasoId: 'alexander_02',
        orden: 2,
        ubicacionNombre: 'Túnel de Gael',
        region: 'Caelid Frontera Oeste',
        coords: [1540, 2760],
        descripcion: 'Habla con él tras la puerta cerrada en el Túnel de Gael camino hacia las tierras rojas de Caelid.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes002.php#paso2',
        locationId: 'loc_alexander_02_gael',
        missable: false
      },
      {
        pasoId: 'alexander_03',
        orden: 3,
        ubicacionNombre: 'Plaza del Festival de Radahn',
        region: 'Castillo de la Melena Roja',
        coords: [1350, 3270],
        descripcion: 'Participa en el combate contra Radahn invocando a Alexander. Tras la victoria, habla con él mientras recoge restos de guerreros para fortalecerse.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes002.php#paso3',
        locationId: 'loc_alexander_03_radahn',
        missable: false
      },
      {
        pasoId: 'alexander_04',
        orden: 4,
        ubicacionNombre: 'Sur del Salón de Estudio Cariano',
        region: 'Liurnia Este',
        coords: [2440, 1760],
        descripcion: 'Alexander vuelve a atascarse. Arrójale una Vasija de aceite para lubricarlo antes de golpearlo por la espalda.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes002.php#paso4',
        locationId: 'loc_alexander_04_aceite',
        missable: false
      },
      {
        pasoId: 'alexander_05',
        orden: 5,
        ubicacionNombre: 'Lago de Lava de Monte Gelmir',
        region: 'Monte Gelmir',
        coords: [3550, 1440],
        descripcion: 'Tras aniquilar al Dragón de Magma cerca del Fuerte Laiedd, habla con Alexander sumergido en la lava para recibir el Yelmo de tarro.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes002.php#paso5',
        locationId: 'loc_alexander_05_lava',
        missable: false
      },
      {
        pasoId: 'alexander_06',
        orden: 6,
        ubicacionNombre: 'Farum Azula en Ruinas',
        region: 'Farum Azula',
        coords: [2850, 4550],
        descripcion: 'Duelo a muerte final sobre los restos de las ruinas flotantes. Concédele su último deseo de batalla para recibir el valioso Fragmento de Alexander (+15% daño de habilidades).',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes002.php#paso6',
        locationId: 'loc_alexander_06_farum',
        missable: false
      }
    ]
  },
  {
    id: 'quest_millicent',
    npc: 'Millicent de la Prótesis',
    icono: 'flower',
    pasos: [
      {
        pasoId: 'millicent_01',
        orden: 1,
        ubicacionNombre: 'Choza de Gowry',
        region: 'Caelid Centro',
        coords: [1630, 3160],
        descripcion: 'Habla con Gowry para iniciar la búsqueda de la Aguja de oro puro derrotando al Comandante O\'Neil en el Pantano de Eonia.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso1',
        locationId: 'loc_millicent_01_gowry',
        missable: false
      },
      {
        pasoId: 'millicent_02',
        orden: 2,
        ubicacionNombre: 'Iglesia de la Plaga',
        region: 'Caelid Este (Sellia)',
        coords: [1690, 3240],
        descripcion: 'Entrega la aguja reparada a Millicent para curar su putrefacción roja. Te recompensará con el Talismán de la espada con alas.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso2',
        locationId: 'loc_millicent_02_plaga',
        missable: false
      },
      {
        pasoId: 'millicent_03',
        orden: 3,
        ubicacionNombre: 'Colina Mirador del Árbol Áureo',
        region: 'Meseta de Altus',
        coords: [3320, 1780],
        descripcion: 'Consigue la Prótesis de valquiria en el Castillo Sombrío y entrégasela en la colina para que pueda empuñar su espada nuevamente.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso3',
        locationId: 'loc_millicent_03_altus',
        missable: false
      },
      {
        pasoId: 'millicent_04',
        orden: 4,
        ubicacionNombre: 'Aldea del Molino (Dominula)',
        region: 'Meseta de Altus Norte',
        coords: [3720, 2030],
        descripcion: 'Derrota al Apóstol Sacrodermo en la cima de los molinos. Descansa en la Gracia y habla con Millicent.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso4',
        locationId: 'loc_millicent_04_dominula',
        missable: false
      },
      {
        pasoId: 'millicent_05',
        orden: 5,
        ubicacionNombre: 'Ruinas del Valle de las Nieves Antiguo',
        region: 'Picos de los Gigantes',
        coords: [3640, 2970],
        descripcion: 'Habla con ella junto a la Gracia del valle helado sobre el castillo de Sol y el relicario de Miquella.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso5',
        locationId: 'loc_millicent_05_picos',
        missable: false
      },
      {
        pasoId: 'millicent_06',
        orden: 6,
        ubicacionNombre: 'Sala de Rezos de Elphael',
        region: 'Árbol Hierático de Miquella',
        coords: [4830, 3090],
        descripcion: 'Reúnete con ella en la fortaleza de Elphael antes de descender al pozo de putrefacción.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso6',
        locationId: 'loc_millicent_06_elphael',
        missable: false
      },
      {
        pasoId: 'millicent_07',
        orden: 7,
        ubicacionNombre: 'Canal de Drenaje (Duelo de Hermanas)',
        region: 'Árbol Hierático de Miquella',
        coords: [4880, 3120],
        descripcion: 'Derrota al Espíritu del árbol ulcerado en la charca de podredumbre. Usa el signo dorado para ayudarla contra sus cuatro hermanas y obtener la Insignia de espada alada podrida y la Aguja de Miquella.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes018.php#paso7',
        locationId: 'loc_millicent_07_drenaje',
        missable: true,
        advertenciaMissable: 'Si pisas a Millicent cuando está exhausta en el suelo después de la batalla, morirá de un solo impacto.'
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
        region: 'Necrolimbo Centro',
        coords: [1370, 2090],
        descripcion: 'Te da la bienvenida a las Tierras Intermedias advirtiéndote de tu condición de "Sin luz sin doncella".',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso1',
        locationId: 'loc_varre_01_primer_paso',
        missable: false
      },
      {
        pasoId: 'varre_02',
        orden: 2,
        ubicacionNombre: 'Iglesia de la Rosa',
        region: 'Liurnia Centro-Oeste',
        coords: [2230, 1420],
        descripcion: 'Te otorga 5 Dedos purulentos sangrientos para realizar 3 invasiones multijugador (o invadir al Magnus en Altus).',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso2',
        locationId: 'loc_varre_02_iglesia_rosa',
        missable: false
      },
      {
        pasoId: 'varre_03',
        orden: 3,
        ubicacionNombre: 'Iglesia de la Inhibición',
        region: 'Liurnia Noreste',
        coords: [3110, 1790],
        descripcion: 'Empapa el Favor del Señor de la Sangre con la sangre de la doncella muerta en la Iglesia de la Inhibición.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso3',
        locationId: 'loc_varre_03_sangre',
        missable: false
      },
      {
        pasoId: 'varre_04',
        orden: 4,
        ubicacionNombre: 'Entrada del Mausoleo de la Dinastía',
        region: 'Palacio de Mohgwyn (Subterráneo)',
        coords: [1340, 3420],
        descripcion: 'Invade el mundo de Varré a través de su signo rojo en el pasillo del mausoleo antes de derrotar a Mohg para conseguir su Ramo de Varré y conjunto.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes029.php#paso4',
        locationId: 'loc_varre_04_invasion',
        missable: true,
        advertenciaMissable: 'Si matas a Mohg, Señor de la Sangre antes de invadir a Varré, su signo desaparecerá.',
        mapaOrigen: 'underground'
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
        ubicacionNombre: 'Castillo de Velo Tormentoso (Aposento)',
        region: 'Castillo de Velo Tormentoso',
        coords: [1820, 1890],
        descripcion: 'Habla con Nepheli para que esté disponible como invocación contra Godrick el Injertado.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso1',
        locationId: 'loc_nepheli_01_velo',
        missable: false
      },
      {
        pasoId: 'nepheli_02',
        orden: 2,
        ubicacionNombre: 'Aldea de los Albináuricos',
        region: 'Liurnia Suroeste',
        coords: [2130, 1370],
        descripcion: 'Bajo el puente de piedra de la aldea en ruinas, te ayuda a ajusticiar al Asesino de Augurios.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso2',
        locationId: 'loc_nepheli_02_aldea',
        missable: false
      },
      {
        pasoId: 'nepheli_03',
        orden: 3,
        ubicacionNombre: 'Mesa Redonda (Sótano)',
        region: 'Mesa Redonda',
        coords: [2000, 2000],
        descripcion: 'Desanimada tras ser repudiada por Sir Gideon. Entrégale el Rey de los halcones de las tormentas de la Capilla de la Espera.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso3',
        locationId: 'loc_nepheli_03_mesa',
        missable: true,
        advertenciaMissable: '¡Peligro crítico! NUNCA le des la poción de Seluvis o se convertirá en un títere inanimado arruinando su trono.'
      },
      {
        pasoId: 'nepheli_04',
        orden: 4,
        ubicacionNombre: 'Sala del Trono de Godrick',
        region: 'Castillo de Velo Tormentoso',
        coords: [1850, 1860],
        descripcion: 'Coronada como legítima Señora Soberana de Necrolimbo junto a Kenneth Haight. Te obsequia una Piedra de forja de dragón antiguo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php#paso4',
        locationId: 'loc_nepheli_04_trono',
        missable: false
      }
    ]
  },
  {
    id: 'quest_fia',
    npc: 'Fia, Compañera del Lecho de Muerte',
    icono: 'moon',
    pasos: [
      {
        pasoId: 'fia_01',
        orden: 1,
        ubicacionNombre: 'Habitación de Fia',
        region: 'Mesa Redonda',
        coords: [2000, 2000],
        descripcion: 'Acepta sus abrazos para recibir la Bendición del baldaquino. Te entregará la Daga mellada que pertenece a D.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes012.php#paso1',
        locationId: 'loc_fia_01_mesa',
        missable: false
      },
      {
        pasoId: 'fia_02',
        orden: 2,
        ubicacionNombre: 'Trono del Príncipe de la Muerte',
        region: 'Fondo de Raíz Profunda (Subterráneo)',
        coords: [3520, 2460],
        descripcion: 'Supera a los Campeones de Fia. Entrégale el Estigma de la Muerte y derrota al Dragón Liche Fortissax en su sueño para reclamar la Runa restauradora del Príncipe de la Muerte.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes012.php#paso2',
        locationId: 'loc_fia_02_fortissax',
        missable: false,
        mapaOrigen: 'underground'
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
        ubicacionNombre: 'Ruinas de la Costa (Paso Bajo el Puente)',
        region: 'Necrolimbo Sur',
        coords: [1350, 2140],
        descripcion: 'Te advierte sobre el temible Dragón Volador Agheel que anida en el lago.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes030.php#paso1',
        locationId: 'loc_yura_01_ruinas',
        missable: false
      },
      {
        pasoId: 'yura_02',
        orden: 2,
        ubicacionNombre: 'Río de Aguamarga (Murkwater)',
        region: 'Necrolimbo Centro',
        coords: [1470, 2230],
        descripcion: 'Acude en tu auxilio cuando te invade Nerijus, Dedo Sangriento. Dropea la Daga Reduvia.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes030.php#paso2',
        locationId: 'loc_yura_02_nerijus',
        missable: false
      },
      {
        pasoId: 'yura_03',
        orden: 3,
        ubicacionNombre: 'Puerta Principal de la Academia',
        region: 'Liurnia Norte',
        coords: [2620, 1450],
        descripcion: 'Ayúdalo cruzando el puente sellado al norte para derrotar al Asesino de Cuervos.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes030.php#paso3',
        locationId: 'loc_yura_03_raya',
        missable: false
      },
      {
        pasoId: 'yura_04',
        orden: 4,
        ubicacionNombre: 'Segunda Iglesia de Márika',
        region: 'Meseta de Altus',
        coords: [3380, 1880],
        descripcion: 'Yura yace mortalmente herido por Eleonora. Recoge su katana Nagakiba y derrota a la invasora violeta.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes030.php#paso4',
        locationId: 'loc_yura_04_eleonora',
        missable: false
      },
      {
        pasoId: 'yura_05',
        orden: 5,
        ubicacionNombre: 'Ruinas de Zamor (Shabriri)',
        region: 'Picos de los Gigantes',
        coords: [3450, 2870],
        descripcion: 'Su cuerpo ha sido poseído por Shabriri. Puedes escucharlo para conocer la Llama Frenética o derrotarlo para obtener el Conjunto de Ronin.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes030.php#paso5',
        locationId: 'loc_yura_05_shabriri',
        missable: false
      }
    ]
  },
  {
    id: 'quest_corhyn_goldmask',
    npc: 'Hermano Corhyn y Máscara Dorada',
    icono: 'sun',
    pasos: [
      {
        pasoId: 'corhyn_01',
        orden: 1,
        ubicacionNombre: 'Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2000, 2000],
        descripcion: 'Maestro de encantamientos de la Orden Dorada.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso1',
        locationId: 'loc_corhyn_01_mesa',
        missable: false
      },
      {
        pasoId: 'corhyn_02',
        orden: 2,
        ubicacionNombre: 'Cruce del Camino de Altus',
        region: 'Meseta de Altus',
        coords: [3440, 1960],
        descripcion: 'Inicia su peregrinación en busca del ilustre erudito Máscara Dorada.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso2',
        locationId: 'loc_corhyn_02_camino',
        missable: false
      },
      {
        pasoId: 'corhyn_03',
        orden: 3,
        ubicacionNombre: 'Gran Puente del Bosque',
        region: 'Meseta de Altus',
        coords: [3480, 1980],
        descripcion: 'Máscara Dorada contempla el árbol sagrado inmóvil en el extremo roto del puente.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso3',
        locationId: 'loc_corhyn_03_puente',
        missable: false
      },
      {
        pasoId: 'corhyn_04',
        orden: 4,
        ubicacionNombre: 'Estatua de Radagon en Leyndell',
        region: 'Leyndell, Capital Real',
        coords: [3260, 2410],
        descripcion: 'Lanza el encantamiento "Ley de regresión" frente al mensaje en el suelo para revelar el colosal secreto: "Radagon es Márika".',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso4',
        locationId: 'loc_corhyn_04_estatua',
        missable: true,
        advertenciaMissable: '¡Crítico! Debes resolver el acertijo antes de derrotar a Maliketh en Farum Azula.'
      },
      {
        pasoId: 'corhyn_05',
        orden: 5,
        ubicacionNombre: 'Leyndell, Capital de Ceniza',
        region: 'Leyndell de Ceniza',
        coords: [3210, 2450],
        descripcion: 'Encuentra el cadáver de Máscara Dorada en la base del acantilado para reclamar la Runa restauradora del Orden Perfecto.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes009.php#paso5',
        locationId: 'loc_corhyn_05_runa',
        missable: false
      }
    ]
  },
  {
    id: 'quest_boc',
    npc: 'Boc el Costurero',
    icono: 'scissors',
    pasos: [
      {
        pasoId: 'boc_01',
        orden: 1,
        ubicacionNombre: 'Árbol Ilusorio de Agheel Norte',
        region: 'Necrolimbo Centro',
        coords: [1510, 2160],
        descripcion: 'Golpea el arbusto que habla para romper el hechizo que transformó al desdichado Boc.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes007.php#paso1',
        locationId: 'loc_boc_01_arbusto',
        missable: false
      },
      {
        pasoId: 'boc_02',
        orden: 2,
        ubicacionNombre: 'Cueva Litoral (Entrada)',
        region: 'Necrolimbo Costa Suroeste',
        coords: [1320, 1940],
        descripcion: 'Derrota a los Jefes Semihumanos para devolverle la Aguja de coser de su amada madre.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes007.php#paso2',
        locationId: 'loc_boc_02_costa',
        missable: false
      },
      {
        pasoId: 'boc_03',
        orden: 3,
        ubicacionNombre: 'Muralla de la Capital Este',
        region: 'Leyndell, Capital Real',
        coords: [3370, 2400],
        descripcion: 'Boc desea ser hermoso. Usa el Parlavisco "Eres hermoso" frente a él para salvar su vida con amor.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes007.php#paso3',
        locationId: 'loc_boc_03_leyndell',
        missable: true,
        advertenciaMissable: '¡Si le entregas una Lágrima Larval morirá trágicamente en la Academia de Raya Lucaria!'
      }
    ]
  },
  {
    id: 'quest_patches',
    npc: 'Patches la Hiena',
    icono: 'smile',
    pasos: [
      {
        pasoId: 'patches_01',
        orden: 1,
        ubicacionNombre: 'Cueva de Aguamarga (Murkwater)',
        region: 'Necrolimbo Centro',
        coords: [1480, 2240],
        descripcion: 'Abre su cofre y perdónale la vida cuando se rinda para abrir su tienda y comprar el Grillete de Margit.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso1',
        locationId: 'loc_patches_01_cueva',
        missable: false
      },
      {
        pasoId: 'patches_02',
        orden: 2,
        ubicacionNombre: 'Isla Pintoresca',
        region: 'Liurnia Sur (Lago)',
        coords: [2240, 1560],
        descripcion: 'Te aconseja ser devorado por la Doncella de Hierro en la base de la academia para llegar a Monte Gelmir.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso2',
        locationId: 'loc_patches_02_liurnia',
        missable: false
      },
      {
        pasoId: 'patches_03',
        orden: 3,
        ubicacionNombre: 'Mansión del Volcán',
        region: 'Monte Gelmir',
        coords: [3520, 1380],
        descripcion: 'Te entrega la carta de encargo para cazar al Gran Tragasangre Tragoth y recibir la colosal Armadura de Toro de Cabra.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso3',
        locationId: 'loc_patches_03_mansion',
        missable: false
      },
      {
        pasoId: 'patches_04',
        orden: 4,
        ubicacionNombre: 'Castillo Sombrío',
        region: 'Meseta de Altus Norte',
        coords: [3690, 1860],
        descripcion: 'Casi agonizante frente al puente del salón del jefe, te entrega las Castañuelas de bailarina para Tanith.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes020.php#paso4',
        locationId: 'loc_patches_04_sombrio',
        missable: false
      }
    ]
  },
  {
    id: 'quest_roderika',
    npc: 'Roderika de los Espíritus',
    icono: 'sparkles',
    pasos: [
      {
        pasoId: 'roderika_01',
        orden: 1,
        ubicacionNombre: 'Choza de la Colina Tormentosa',
        region: 'Colina de Tormentas',
        coords: [1660, 1990],
        descripcion: 'Consigue la Ceniza de medusa espiritual y el Recuerdo de crisálidas en el castillo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso1',
        locationId: 'loc_roderika_01_choza',
        missable: false
      },
      {
        pasoId: 'roderika_02',
        orden: 2,
        ubicacionNombre: 'Mesa Redonda (Sintonizadora)',
        region: 'Mesa Redonda',
        coords: [2000, 2000],
        descripcion: 'Convence al Maestro Herrero Hewg de enseñarle el arte milenario de la sintonización de espíritus.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes022.php#paso2',
        locationId: 'loc_roderika_02_mesa',
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
        ubicacionNombre: 'Estructura Elevada de Necrolimbo Este',
        region: 'Necrolimbo Este',
        coords: [1360, 2520],
        descripcion: 'El heredero legítimo de Haight pide limpiar el fuerte tomado por caballeros renegados.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes017.php#paso1',
        locationId: 'loc_kenneth_01_repisa',
        missable: false
      },
      {
        pasoId: 'kenneth_02',
        orden: 2,
        ubicacionNombre: 'Fuerte Haight',
        region: 'Necrolimbo Sureste',
        coords: [1260, 2670],
        descripcion: 'Purifica la fortaleza y recibe la Daga de acero de Erd. Júrane lealtad.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes017.php#paso2',
        locationId: 'loc_kenneth_02_fuerte',
        missable: false
      },
      {
        pasoId: 'kenneth_03',
        orden: 3,
        ubicacionNombre: 'Trono de Velo Tormentoso',
        region: 'Castillo de Velo Tormentoso',
        coords: [1850, 1860],
        descripcion: 'Rinde pleitesía a Nepheli Loux como reina de Necrolimbo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes017.php#paso3',
        locationId: 'loc_kenneth_03_trono',
        missable: false
      }
    ]
  },
  {
    id: 'quest_latenna',
    npc: 'Latenna la Albináurica',
    icono: 'bow',
    pasos: [
      {
        pasoId: 'latenna_01',
        orden: 1,
        ubicacionNombre: 'Choza del Lobo Durmiente',
        region: 'Liurnia Sur',
        coords: [2040, 1600],
        descripcion: 'Cruza la Cueva de Cristal del Lago. Muéstrale la mitad del Medallón Secreto del Árbol Hierático que te dio Albus para que se una como Ceniza espiritual.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes015.php#paso1',
        locationId: 'loc_latenna_01_lobo',
        missable: false
      },
      {
        pasoId: 'latenna_02',
        orden: 2,
        ubicacionNombre: 'Ruinas del Desierto Apóstata',
        region: 'Campo Sacroníveo Norte',
        coords: [4520, 2800],
        descripcion: 'Invócala frente al cuerpo inmenso de Phillia en la iglesia derruida para entregar la gota primordial y recibir una Piedra de forja de dragón antiguo sombría.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes015.php#paso2',
        locationId: 'loc_latenna_02_apostata',
        missable: false
      }
    ]
  },
  {
    id: 'quest_dungeater',
    npc: 'El Zampaheces (Dung Eater)',
    icono: 'skull',
    pasos: [
      {
        pasoId: 'dung_01',
        orden: 1,
        ubicacionNombre: 'Prisión de las Alcantarillas',
        region: 'Subsuelo de los Marginados (Leyndell)',
        coords: [3280, 2390],
        descripcion: 'Usa la Llave de la celda de las cloacas para liberarlo de su pestilente confinamiento.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso1',
        locationId: 'loc_dung_01_celda',
        missable: false
      },
      {
        pasoId: 'dung_02',
        orden: 2,
        ubicacionNombre: 'Foso Exterior de la Capital',
        region: 'Leyndell Afueras',
        coords: [3460, 2360],
        descripcion: 'Vence al Zampaheces invasor en las aguas del foso. Dropea la Espada de Milos.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso2',
        locationId: 'loc_dung_02_foso',
        missable: false
      },
      {
        pasoId: 'dung_03',
        orden: 3,
        ubicacionNombre: 'Atadura del Trono de la Maldición',
        region: 'Subsuelo de los Marginados',
        coords: [3280, 2390],
        descripcion: 'Aliméntalo con 5 Maldiciones del semillero para obtener la Runa restauradora de la Maldición del Caído.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes011.php#paso3',
        locationId: 'loc_dung_03_runa',
        missable: true,
        advertenciaMissable: 'Si le das la poción de Seluvis en su lugar, podrás convertirlo en una poderosísima Ceniza invocable pero perderás su final.'
      }
    ]
  },
  {
    id: 'quest_diallos',
    npc: 'Diallos de Hoslow',
    icono: 'heart',
    pasos: [
      {
        pasoId: 'diallos_01',
        orden: 1,
        ubicacionNombre: 'Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2000, 2000],
        descripcion: 'Noble presumido en busca de su fiel sirvienta Lanya.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso1',
        locationId: 'loc_diallos_01_mesa',
        missable: false
      },
      {
        pasoId: 'diallos_02',
        orden: 2,
        ubicacionNombre: 'Pueblo de la Puerta de la Academia',
        region: 'Liurnia Centro',
        coords: [2460, 1580],
        descripcion: 'Llora desconsolado el cadáver de Lanya prometiendo vengar su sangre contra la Mansión.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso2',
        locationId: 'loc_diallos_02_lanya',
        missable: false
      },
      {
        pasoId: 'diallos_03',
        orden: 3,
        ubicacionNombre: 'Tarriburgo (Jarburg)',
        region: 'Liurnia Este',
        coords: [2510, 1790],
        descripcion: 'Diallos da su vida para defender heroicamente a los pequeños tarros de los cazadores furtivos. Recibe la Máscara de Hoslow y el Látigo de pétalos.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes010.php#paso3',
        locationId: 'loc_diallos_03_jarburg',
        missable: false
      }
    ]
  },
  {
    id: 'quest_irina_edgar',
    npc: 'Irina y Edgar de Morne',
    icono: 'heart',
    pasos: [
      {
        pasoId: 'morne_01',
        orden: 1,
        ubicacionNombre: 'Entrada del Puente del Sacrificio',
        region: 'Península del Llanto',
        coords: [1130, 2270],
        descripcion: 'Irina te pide que lleves su carta a su padre Edgar en el asediado Castillo de Morne.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso1',
        locationId: 'loc_morne_01_irina',
        missable: false
      },
      {
        pasoId: 'morne_02',
        orden: 2,
        ubicacionNombre: 'Torre del Castillo de Morne',
        region: 'Península del Llanto',
        coords: [740, 2240],
        descripcion: 'Entrega la carta de Irina al comandante Edgar en lo alto de la almena.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso2',
        locationId: 'loc_morne_02_edgar',
        missable: false
      },
      {
        pasoId: 'morne_03',
        orden: 3,
        ubicacionNombre: 'Playa de Morne (León Bastardo)',
        region: 'Península del Llanto Sur',
        coords: [720, 2240],
        descripcion: 'Derrota al León Bastardo para recuperar el Espadón de hoja injertada.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso3',
        locationId: 'loc_morne_03_leon',
        missable: false
      },
      {
        pasoId: 'morne_04',
        orden: 4,
        ubicacionNombre: 'Choza del Vengador',
        region: 'Liurnia Suroeste',
        coords: [2140, 1260],
        descripcion: 'Edgar enloquecido de venganza te invade como Dedo Sangriento. Dropea la Alabarda de caballero desterrado +8 y una Uva de Shabiri.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes016.php#paso4',
        locationId: 'loc_morne_04_vengador',
        missable: false
      }
    ]
  },
  {
    id: 'quest_rogier',
    npc: 'Hechicero Rogier',
    icono: 'sparkles',
    pasos: [
      {
        pasoId: 'rogier_01',
        orden: 1,
        ubicacionNombre: 'Capilla del Castillo de Velo Tormentoso',
        region: 'Castillo de Velo Tormentoso',
        coords: [1800, 1880],
        descripcion: 'Te instruye en hechizos con espada y te advierte del mal que infesta el castillo.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso1',
        locationId: 'loc_rogier_01_castillo',
        missable: false
      },
      {
        pasoId: 'rogier_02',
        orden: 2,
        ubicacionNombre: 'Cripta Subterránea del Castillo',
        region: 'Castillo de Velo Tormentoso',
        coords: [1760, 1870],
        descripcion: 'Examina la inmensa cara espectral en las profundidades donde Rogier fue infectado con la espina mortal.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso2',
        locationId: 'loc_rogier_02_cara',
        missable: false
      },
      {
        pasoId: 'rogier_03',
        orden: 3,
        ubicacionNombre: 'Balcón de la Mesa Redonda',
        region: 'Mesa Redonda',
        coords: [2000, 2000],
        descripcion: 'En silla de ruedas, te entrega su Estoque de Rogier +8 y pistas vitales sobre la Noche de los Cuchillos Negros y Ranni.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes025.php#paso3',
        locationId: 'loc_rogier_03_muerte',
        missable: false
      }
    ]
  },
  {
    id: 'quest_d_hunter',
    npc: 'D, Cazador de los Muertos',
    icono: 'sword',
    pasos: [
      {
        pasoId: 'd_01',
        orden: 1,
        ubicacionNombre: 'Afueras de Aldea de Aguainvocante',
        region: 'Necrolimbo Norte',
        coords: [1700, 2380],
        descripcion: 'Te previene de la presencia del Barquero Tibial que reanima los cadáveres.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php#paso1',
        locationId: 'loc_d_01_mariner',
        missable: false
      },
      {
        pasoId: 'd_02',
        orden: 2,
        ubicacionNombre: 'Acueducto de Siofra',
        region: 'Río Siofra (Subterráneo)',
        coords: [1640, 2990],
        descripcion: 'Entrega la armadura gemela a su hermano mudo en el acueducto para que tome venganza contra Fia tras su muerte.',
        eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes013.php#paso2',
        locationId: 'loc_d_02_hermano',
        missable: false,
        mapaOrigen: 'underground'
      }
    ]
  }
];

// --- 2. CATÁLOGO COMPLETO Y MASIVO DE UBICACIONES CALIBRADAS ---
const MASTER_LOCATIONS = [];

function addLoc(loc) {
  if (!loc.coords || loc.coords.length !== 2) {
    throw new Error(`Coordenadas inválidas para: ${loc.id}`);
  }
  MASTER_LOCATIONS.push({
    importante: false,
    mapaOrigen: 'surface',
    ...loc
  });
}

// Ingesta de todos los pasos de Questlines
ALL_QUESTLINES.forEach(quest => {
  quest.pasos.forEach(paso => {
    addLoc({
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

// =========================================================================
// A. SITIOS DE GRACIA (GRACES) - RED COMPLETA Y EXHAUSTIVA DE VIAJE RÁPIDO
// =========================================================================
const GRACES = [
  // --- NECROLIMBO & COLINA TORMENTOSA ---
  { id: 'grace_first_step', titulo: 'Sitio de Gracia: El Primer Paso', categoria: 'graces', region: 'Necrolimbo Centro', coords: [1370, 2090], descripcion: 'Punto de partida al salir a la superficie de las Tierras Intermedias.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php', importante: true },
  { id: 'grace_church_elleh', titulo: 'Sitio de Gracia: Iglesia de Elleh', categoria: 'graces', region: 'Necrolimbo Centro', coords: [1440, 2090], descripcion: 'Refugio en ruinas donde comercia Kalé y aparece Ranni.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php', importante: true },
  { id: 'grace_gatefront', titulo: 'Sitio de Gracia: Frente a la Puerta', categoria: 'graces', region: 'Necrolimbo Centro', coords: [1560, 2080], descripcion: 'Donde Melina te otorga el Torrencial y el acuerdo del viaje.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php', importante: true },
  { id: 'grace_agheel_lake_south', titulo: 'Sitio de Gracia: Sur del Lago Agheel', categoria: 'graces', region: 'Necrolimbo Centro', coords: [1360, 2180], descripcion: 'Mirador meridional sobre el gran lago infectado por el dragón.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php' },
  { id: 'grace_agheel_lake_north', titulo: 'Sitio de Gracia: Norte del Lago Agheel', categoria: 'graces', region: 'Necrolimbo Centro', coords: [1510, 2190], descripcion: 'Encrucijada que conduce hacia el puente del Barquero y el río.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php' },
  { id: 'grace_seaside_ruins', titulo: 'Sitio de Gracia: Ruinas de la Costa', categoria: 'graces', region: 'Necrolimbo Sur', coords: [1350, 2140], descripcion: 'Campamento sobre los acantilados donde descansa Yura.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php' },
  { id: 'grace_mistwood_outskirts', titulo: 'Sitio de Gracia: Afueras del Bosque Neblinoso', categoria: 'graces', region: 'Necrolimbo Este', coords: [1520, 2430], descripcion: 'Camino occidental flanqueado por ruinas y osos rúnicos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares002.php' },
  { id: 'grace_fort_haight_west', titulo: 'Sitio de Gracia: Oeste de Fuerte Haight', categoria: 'graces', region: 'Necrolimbo Sureste', coords: [1260, 2640], descripcion: 'Entrada al bastión costero custodiado por Kenneth Haight.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares002.php' },
  { id: 'grace_third_church_marika', titulo: 'Sitio de Gracia: Tercera Iglesia de Márika', categoria: 'graces', region: 'Necrolimbo Este', coords: [1580, 2630], descripcion: 'Santuario derruido con el Vial de Médica Milagrosa y Lágrima Sagrada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares002.php', importante: true },
  { id: 'grace_stormhill_shack', titulo: 'Sitio de Gracia: Cabaña de la Colina Tormentosa', categoria: 'graces', region: 'Colina de Tormentas', coords: [1660, 1990], descripcion: 'Cabaña desolada de Roderika antes de llegar a Velo Tormentoso.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php', importante: true },
  { id: 'grace_warmaster_shack', titulo: 'Sitio de Gracia: Cabaña del Maestro de la Guerra', categoria: 'graces', region: 'Colina de Tormentas', coords: [1680, 2070], descripcion: 'Refugio de Bernahl donde comprar Cenizas de Guerra.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php' },
  { id: 'grace_saintsbridge', titulo: 'Sitio de Gracia: Puente de los Santos', categoria: 'graces', region: 'Colina de Tormentas Este', coords: [1660, 2280], descripcion: 'Puente custodiado por un Cabeza de Calabaza loco camino a Aguainvocante.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php' },
  { id: 'grace_summonwater_village', titulo: 'Sitio de Gracia: Afueras de Aguainvocante', categoria: 'graces', region: 'Necrolimbo Norte', coords: [1700, 2380], descripcion: 'Aldea inundada asolada por los no muertos del Barquero Tibial.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares001.php' },

  // --- CASTILLO DE VELO TORMENTOSO ---
  { id: 'grace_margit', titulo: 'Sitio de Gracia: Colina de la Vileza (Margit)', categoria: 'graces', region: 'Castillo de Velo Tormentoso', coords: [1720, 1930], descripcion: 'Arena donde enfrentas a Margit, el Augurio Caído.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares007.php', importante: true },
  { id: 'grace_stormveil_cliffside', titulo: 'Sitio de Gracia: Acantilado de Velo Tormentoso', categoria: 'graces', region: 'Castillo de Velo Tormentoso', coords: [1760, 1890], descripcion: 'Ruta lateral escarpada sugerida por Gostoc.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares007.php' },
  { id: 'grace_rampart_tower', titulo: 'Sitio de Gracia: Torre del Muro Cortina', categoria: 'graces', region: 'Castillo de Velo Tormentoso', coords: [1800, 1880], descripcion: 'Corazón defensivo con aves de guerra y barriles explosivos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares007.php' },
  { id: 'grace_liftside_chamber', titulo: 'Sitio de Gracia: Cámara del Elevador', categoria: 'graces', region: 'Castillo de Velo Tormentoso', coords: [1820, 1890], descripcion: 'Acceso central al patio de guardia y el gran comedor.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares007.php' },
  { id: 'grace_secluded_cell', titulo: 'Sitio de Gracia: Celda Aislada', categoria: 'graces', region: 'Castillo de Velo Tormentoso', coords: [1840, 1860], descripcion: 'Inmediaciones de la niebla de combate contra Godrick el Injertado.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares007.php', importante: true },

  // --- PENÍNSULA DEL LLANTO ---
  { id: 'grace_bridge_sacrifice', titulo: 'Sitio de Gracia: Puente del Sacrificio', categoria: 'graces', region: 'Península del Llanto', coords: [1130, 2270], descripcion: 'Paso fuertemente fortificado con balistas hacia la península.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php', importante: true },
  { id: 'grace_church_pilgrimage', titulo: 'Sitio de Gracia: Iglesia de la Peregrinación', categoria: 'graces', region: 'Península del Llanto Norte', coords: [1080, 2060], descripcion: 'Cima de la colina norteña con una Lágrima Sagrada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php', importante: true },
  { id: 'grace_fourth_church_marika', titulo: 'Sitio de Gracia: Cuarta Iglesia de Márika', categoria: 'graces', region: 'Península del Llanto Oeste', coords: [960, 1970], descripcion: 'Santuario costero occidental con Lágrima Sagrada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php', importante: true },
  { id: 'grace_isolated_merchant_weeping', titulo: 'Sitio de Gracia: Comerciante Aislado (Península)', categoria: 'graces', region: 'Península del Llanto Oeste', coords: [840, 1960], descripcion: 'Cabaña solitaria al suroeste de la playa.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php' },
  { id: 'grace_castle_morne_rampart', titulo: 'Sitio de Gracia: Muralla del Castillo de Morne', categoria: 'graces', region: 'Península del Llanto', coords: [900, 2250], descripcion: 'Puesto de control frente al gigante arquero de Morne.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php' },
  { id: 'grace_morne_lift', titulo: 'Sitio de Gracia: Elevador del Castillo de Morne', categoria: 'graces', region: 'Castillo de Morne', coords: [770, 2240], descripcion: 'Patio principal tras el ascenso del montacargas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php' },
  { id: 'grace_beside_the_rampart_gaol', titulo: 'Sitio de Gracia: Tras la Cárcel de la Muralla', categoria: 'graces', region: 'Castillo de Morne', coords: [740, 2260], descripcion: 'Ruta hacia la parte trasera y las vigas sobre el mar.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php' },
  { id: 'grace_morne_trench', titulo: 'Sitio de Gracia: Playa Trasera de Morne', categoria: 'graces', region: 'Castillo de Morne', coords: [720, 2240], descripcion: 'Entrada a la arena del León Bastardo en el arrecife sur.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php', importante: true },

  // --- LIURNIA DE LOS LAGOS (OESTE, CENTRO, ESTE, NORTE) ---
  { id: 'grace_lake_facing_cliffs', titulo: 'Sitio de Gracia: Acantilados Frente al Lago', categoria: 'graces', region: 'Liurnia Sur', coords: [1940, 1780], descripcion: 'Primera y majestuosa vista panorámica de la cuenca de Liurnia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_liurnia_lake_shore', titulo: 'Sitio de Gracia: Orilla del Lago de Liurnia', categoria: 'graces', region: 'Liurnia Sur', coords: [2000, 1730], descripcion: 'Comerciante nómada y descenso directo hacia las aguas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_laskyar_ruins', titulo: 'Sitio de Gracia: Ruinas de Laskyar', categoria: 'graces', region: 'Liurnia Sur', coords: [2070, 1620], descripcion: 'Columnas sumergidas con espectros nobles y el portal a la academia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_scenic_isle', titulo: 'Sitio de Gracia: Isla Pintoresca', categoria: 'graces', region: 'Liurnia Centro', coords: [2240, 1560], descripcion: 'Campamento insular donde Patches ofrece sus ardides.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_boilprawn_shack', titulo: 'Sitio de Gracia: Cabaña del Hervidor de Gambas', categoria: 'graces', region: 'Liurnia Centro-Oeste', coords: [2280, 1530], descripcion: 'Hogar pantanoso de Boggart el bribón cocinero de marisco.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_rose_church', titulo: 'Sitio de Gracia: Iglesia de la Rosa', categoria: 'graces', region: 'Liurnia Suroeste', coords: [2230, 1420], descripcion: 'Templo en ruinas teñido de sangre donde Varré espera a los Sin Luz.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_albinauric_village', titulo: 'Sitio de Gracia: Aldea de los Albináuricos', categoria: 'graces', region: 'Liurnia Suroeste', coords: [2130, 1370], descripcion: 'Aldea cavernícola devastada por los perfumistas de Gideon.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_temple_quarter', titulo: 'Sitio de Gracia: Barrio del Templo', categoria: 'graces', region: 'Liurnia Centro-Oeste', coords: [2420, 1430], descripcion: 'Estructuras derruidas en el agua cerca del dragón durmiente.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_academy_gate_town', titulo: 'Sitio de Gracia: Pueblo de la Puerta de la Academia', categoria: 'graces', region: 'Liurnia Centro', coords: [2460, 1580], descripcion: 'Gran ciudad sumergida a los pies de la academia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_south_raya_gate', titulo: 'Sitio de Gracia: Puerta Sur de Raya Lucaria', categoria: 'graces', region: 'Liurnia Centro', coords: [2530, 1490], descripcion: 'Gran portón sellado por el sello mágico de piedra fulgurante.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_main_academy_gate', titulo: 'Sitio de Gracia: Puerta Principal de la Academia', categoria: 'graces', region: 'Academia de Raya Lucaria', coords: [2620, 1450], descripcion: 'Glorieta tras cruzar la barrera con la llave de piedra fulgurante.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares015.php', importante: true },
  { id: 'grace_debate_parlor', titulo: 'Sitio de Gracia: Salón de Debate', categoria: 'graces', region: 'Academia de Raya Lucaria', coords: [2640, 1420], descripcion: 'Arena tras vencer al Lobo Rojo de Radagon.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares015.php', importante: true },
  { id: 'grace_grand_library', titulo: 'Sitio de Gracia: Gran Biblioteca de Raya Lucaria', categoria: 'graces', region: 'Academia de Raya Lucaria', coords: [2670, 1410], descripcion: 'Trono de Rennala, Reina de la Luna Llena. Permite renacer atributos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares015.php', importante: true },
  { id: 'grace_east_gate_raya', titulo: 'Sitio de Gracia: Puerta Este de Raya Lucaria', categoria: 'graces', region: 'Liurnia Norte', coords: [2740, 1510], descripcion: 'Salida hacia la Calzada de Bellum y el Gran Elevador de Dectus.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_church_vows', titulo: 'Sitio de Gracia: Iglesia de los Votos', categoria: 'graces', region: 'Liurnia Este', coords: [2680, 1720], descripcion: 'Templo de la Absolución guardado por la sabia tortuga Miriel.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_carian_study_hall', titulo: 'Sitio de Gracia: Entrada del Salón de Estudio Cariano', categoria: 'graces', region: 'Liurnia Este', coords: [2490, 1850], descripcion: 'Biblioteca invertida que conduce a la Torre Divina de Liurnia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_jarburg', titulo: 'Sitio de Gracia: Tarriburgo (Jarburg)', categoria: 'graces', region: 'Liurnia Este', coords: [2510, 1790], descripcion: 'Pintoresco valle pacífico habitado por tarros parlantes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_four_belfries', titulo: 'Sitio de Gracia: Los Cuatro Campanarios', categoria: 'graces', region: 'Liurnia Oeste', coords: [2690, 1280], descripcion: 'Colina con tres portales hacia áreas secretas (Capilla de la Espera, Nokron, Farum Azula).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_road_to_manor', titulo: 'Sitio de Gracia: Camino a la Mansión', categoria: 'graces', region: 'Liurnia Noroeste', coords: [2990, 1380], descripcion: 'Puesto del Maestro Herrero Iji el Gigante.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_caria_manor_gate', titulo: 'Sitio de Gracia: Puerta Principal de la Mansión Cariana', categoria: 'graces', region: 'Mansión Cariana', coords: [3180, 1360], descripcion: 'Entrada al bastión asolado por trampas de manos rastreras.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_ranni_rise', titulo: 'Sitio de Gracia: Cámara de Ranni', categoria: 'graces', region: 'Liurnia Noroeste (Tres Hermanas)', coords: [3350, 1270], descripcion: 'Cúspide de la torre de Ranni en las Tres Hermanas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_grand_lift_dectus', titulo: 'Sitio de Gracia: Gran Elevador de Dectus', categoria: 'graces', region: 'Liurnia Norte (Bellum)', coords: [3180, 1720], descripcion: 'Mecanismo colosal que une Liurnia con la Meseta de Altus mediante los medallones.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_ravine_veiled_village', titulo: 'Sitio de Gracia: Aldea Oculta en el Desfiladero', categoria: 'graces', region: 'Liurnia Norte (Desfiladero)', coords: [3240, 1560], descripcion: 'Paso minero alternativo que asciende a pie hasta la Meseta de Altus.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php' },
  { id: 'grace_moonlight_altar', titulo: 'Sitio de Gracia: Altar del Claro de Luna', categoria: 'graces', region: 'Altar del Claro de Luna', coords: [2020, 1180], descripcion: 'Meseta mística en la cima de los acantilados de Liurnia accesible tras Astel.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },
  { id: 'grace_manus_celes', titulo: 'Sitio de Gracia: Catedral de Manus Celes', categoria: 'graces', region: 'Altar del Claro de Luna', coords: [2060, 1220], descripcion: 'Santuario estelar de Dos Dedos muertos donde culmina la misión de Ranni.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares014.php', importante: true },

  // --- CAELID & MONTEDRAGO DE GREYOLL ---
  { id: 'grace_rotview_balcony', titulo: 'Sitio de Gracia: Balcón con Vistas a la Podredumbre', categoria: 'graces', region: 'Caelid Noroeste', coords: [1830, 2760], descripcion: 'Mirador a la entrada de Caelid por la Calzada de los Sabios.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_smoldering_church', titulo: 'Sitio de Gracia: Iglesia Humeante', categoria: 'graces', region: 'Caelid Frontera', coords: [1820, 2680], descripcion: 'Límite entre Necrolimbo y Caelid donde invade Anastasia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_caelid_highway_south', titulo: 'Sitio de Gracia: Calzada de Caelid Sur', categoria: 'graces', region: 'Caelid Sur', coords: [1460, 2780], descripcion: 'Bifurcación que conecta Fuerte Gael y la Catedral Comunión Dragontina.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_cathedral_dragon_caelid', titulo: 'Sitio de Gracia: Catedral de la Comunión Dragontina', categoria: 'graces', region: 'Caelid Sur', coords: [1330, 2870], descripcion: 'Altar mayor para adquirir los alientos y poderes draconianos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php', importante: true },
  { id: 'grace_southern_aeonia_bank', titulo: 'Sitio de Gracia: Orilla Sur del Pantano de Eonia', categoria: 'graces', region: 'Pantano de Eonia', coords: [1530, 2960], descripcion: 'Borde meridional del inmenso lago escarlata.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_inner_aeonia', titulo: 'Sitio de Gracia: Interior de Eonia', categoria: 'graces', region: 'Pantano de Eonia', coords: [1640, 3040], descripcion: 'Corazón del pantano donde fue herido Radahn por el florecimiento de Malenia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_sellia_under_stair', titulo: 'Sitio de Gracia: Bajo la Escalera de Sellia', categoria: 'graces', region: 'Sellia, Ciudad Hechicería', coords: [1760, 3140], descripcion: 'Base de la ciudad mágica sellada por velas mágicas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_church_of_the_plague', titulo: 'Sitio de Gracia: Iglesia de la Plaga', categoria: 'graces', region: 'Caelid Este', coords: [1690, 3240], descripcion: 'Santuario sobre el acantilado donde agoniza Millicent.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php', importante: true },
  { id: 'grace_impassable_greatbridge', titulo: 'Sitio de Gracia: Gran Puente Impracticable', categoria: 'graces', region: 'Caelid Sur', coords: [1310, 3180], descripcion: 'Puente con portal directo hacia el Festival de la Melena Roja.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_chamber_outside_plaza', titulo: 'Sitio de Gracia: Cámara Fuera de la Plaza', categoria: 'graces', region: 'Castillo de la Melena Roja', coords: [1340, 3260], descripcion: 'Aposento anexo a la plaza del festival de guerreros.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php' },
  { id: 'grace_starscourge_radahn', titulo: 'Sitio de Gracia: Radahn, Azote de las Estrellas', categoria: 'graces', region: 'Dunas de la Melena Roja', coords: [1370, 3350], descripcion: 'Vasto campo de dunas rojas donde cayó el General Radahn.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares020.php', importante: true },
  { id: 'grace_dragonbarrow_west', titulo: 'Sitio de Gracia: Oeste de Montedrago', categoria: 'graces', region: 'Montedrago de Greyoll', coords: [1950, 2900], descripcion: 'Entrada a las tierras altas de dragones y bestias gigantes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares021.php' },
  { id: 'grace_divine_tower_caelid', titulo: 'Sitio de Gracia: Torre Divina de Caelid', categoria: 'graces', region: 'Montedrago de Greyoll', coords: [2080, 2980], descripcion: 'Torre con mazmorra interior para activar la Gran Runa de Radahn.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares021.php', importante: true },
  { id: 'grace_fort_faroth', titulo: 'Sitio de Gracia: Fuerte Faroth', categoria: 'graces', region: 'Montedrago de Greyoll', coords: [1930, 3210], descripcion: 'Fortaleza infestada de murciélagos con el Sello Doloroso de Radagon.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares021.php', importante: true },
  { id: 'grace_farum_greatbridge', titulo: 'Sitio de Gracia: Gran Puente de Farum', categoria: 'graces', region: 'Montedrago de Greyoll', coords: [2140, 3260], descripcion: 'Puente custodiado por el temible Dragón Volador Greyll.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares021.php' },
  { id: 'grace_bestial_sanctum', titulo: 'Sitio de Gracia: Santuario de las Bestias', categoria: 'graces', region: 'Montedrago de Greyoll', coords: [2340, 3240], descripcion: 'Templo de Gurranq, Clérigo Bestial, que devora Raíces Mortuorias.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares021.php', importante: true },

  // --- MESETA ALTUS, MONTE GELMIR & LEYNDELL ---
  { id: 'grace_altus_plateau', titulo: 'Sitio de Gracia: Meseta de Altus', categoria: 'graces', region: 'Meseta de Altus', coords: [3310, 1870], descripcion: 'Entrada dorada a la meseta central.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php' },
  { id: 'grace_erdtree_gazing_hill', titulo: 'Sitio de Gracia: Colina Mirador del Árbol Áureo', categoria: 'graces', region: 'Meseta de Altus', coords: [3320, 1780], descripcion: 'Punto de reunión con Millicent y acceso a Monte Gelmir.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php', importante: true },
  { id: 'grace_altus_highway_junction', titulo: 'Sitio de Gracia: Cruce de Caminos de Altus', categoria: 'graces', region: 'Meseta de Altus', coords: [3320, 1980], descripcion: 'Gran cruce custodiado por el Árbol del Crisol y la caballería.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php' },
  { id: 'grace_forest_spanning_bridge', titulo: 'Sitio de Gracia: Gran Puente del Bosque', categoria: 'graces', region: 'Meseta de Altus', coords: [3480, 1980], descripcion: 'Puente con portal que lleva hasta Máscara Dorada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php' },
  { id: 'grace_shaded_castle_ramparts', titulo: 'Sitio de Gracia: Murallas del Castillo Sombrío', categoria: 'graces', region: 'Meseta de Altus Norte', coords: [3680, 1860], descripcion: 'Foso venenoso del bastión de Elemer de la Zarza.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php' },
  { id: 'grace_windmill_village', titulo: 'Sitio de Gracia: Aldea del Molino (Dominula)', categoria: 'graces', region: 'Meseta de Altus Norte', coords: [3720, 2030], descripcion: 'Aldea festiva en las laderas danzantes donde acecha el Apóstol.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares025.php', importante: true },
  { id: 'grace_bridge_iniquity', titulo: 'Sitio de Gracia: Puente de la Iniquidad', categoria: 'graces', region: 'Monte Gelmir', coords: [3480, 1680], descripcion: 'Puente devastado por carromatos en llamas hacia Gelmir.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares030.php' },
  { id: 'grace_ninth_mt_gelmir_campsite', titulo: 'Sitio de Gracia: Noveno Campamento de Monte Gelmir', categoria: 'graces', region: 'Monte Gelmir', coords: [3620, 1420], descripcion: 'Cima del cráter donde combate la Bestia de la Estrella Fugaz.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares030.php' },
  { id: 'grace_volcano_manor', titulo: 'Sitio de Gracia: Mansión del Volcán', categoria: 'graces', region: 'Monte Gelmir', coords: [3520, 1380], descripcion: 'Sede de los Renegados liderada por Lady Tanith.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares031.php', importante: true },
  { id: 'grace_temple_of_eiglay', titulo: 'Sitio de Gracia: Templo de Eiglay', categoria: 'graces', region: 'Mansión del Volcán', coords: [3500, 1350], descripcion: 'Templo del Noble Sacrodermo que abre el atajo a Rykard.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares031.php', importante: true },
  { id: 'grace_rykard_audience', titulo: 'Sitio de Gracia: Vía de la Audiencia (Rykard)', categoria: 'graces', region: 'Mansión del Volcán', coords: [3470, 1340], descripcion: 'Niebla de la gran cueva de la Serpiente Devoradora de Dioses.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares031.php', importante: true },
  { id: 'grace_outer_wall_phantom_tree', titulo: 'Sitio de Gracia: Árbol Fantasma del Muro Exterior', categoria: 'graces', region: 'Leyndell Afueras', coords: [3420, 2180], descripcion: 'Explanada con 2 Semillas Doradas custodiada por centinelas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php', importante: true },
  { id: 'grace_outer_wall_battleground', titulo: 'Sitio de Gracia: Campo de Batalla del Muro Exterior', categoria: 'graces', region: 'Leyndell Afueras', coords: [3500, 2220], descripcion: 'Puerta nororiental de las defensas de la capital.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php' },
  { id: 'grace_east_capital_rampart', titulo: 'Sitio de Gracia: Muralla de la Capital Este', categoria: 'graces', region: 'Leyndell, Capital Real', coords: [3370, 2400], descripcion: 'Entrada a las calles de la gloriosa capital dorada Leyndell.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php', importante: true },
  { id: 'grace_avenue_balcony', titulo: 'Sitio de Gracia: Balcón de la Avenida', categoria: 'graces', region: 'Leyndell, Capital Real', coords: [3320, 2420], descripcion: 'Gran mirador sobre la avenida imperial vigilada por caballeros leyndell.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php', importante: true },
  { id: 'grace_west_capital_rampart', titulo: 'Sitio de Gracia: Muralla de la Capital Oeste', categoria: 'graces', region: 'Leyndell, Capital Real', coords: [3340, 2380], descripcion: 'Acceso hacia la réplica de la Mesa Redonda fortificada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php' },
  { id: 'grace_erdtree_sanctuary', titulo: 'Sitio de Gracia: Santuario del Árbol Áureo', categoria: 'graces', region: 'Leyndell, Capital Real', coords: [3260, 2440], descripcion: 'Arena de combate contra la sombra dorada del Primer Señor Godfrey.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php', importante: true },
  { id: 'grace_queens_bedchamber', titulo: 'Sitio de Gracia: Aposentos de la Reina', categoria: 'graces', region: 'Leyndell, Capital Real', coords: [3240, 2460], descripcion: 'Aposentos de la Reina Márika con el hechizo Bendición del Árbol Áureo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php' },
  { id: 'grace_elden_throne', titulo: 'Sitio de Gracia: Trono de Elden', categoria: 'graces', region: 'Leyndell, Capital Real', coords: [3210, 2480], descripcion: 'Trono del rey donde enfrentas a Morgott, el Rey de los Augurios.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares034.php', importante: true },
  { id: 'grace_underground_roadside', titulo: 'Sitio de Gracia: Camino Subterráneo', categoria: 'graces', region: 'Subsuelo de los Marginados', coords: [3280, 2390], descripcion: 'Refugio de las cloacas de Leyndell que conducen a Mohg el Augurio.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares035.php', importante: true },

  // --- PICOS DE LOS GIGANTES & CAMPO SACRONÍVEO ---
  { id: 'grace_forbidden_lands', titulo: 'Sitio de Gracia: Tierras Prohibidas', categoria: 'graces', region: 'Tierras Prohibidas', coords: [3320, 2680], descripcion: 'Desfiladero nevado que une la capital con el elevador de Rold.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares037.php' },
  { id: 'grace_rold_lift', titulo: 'Sitio de Gracia: Gran Elevador de Rold', categoria: 'graces', region: 'Picos de los Gigantes', coords: [3360, 2780], descripcion: 'Elevador colosal hacia las cumbres septentrionales.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares037.php', importante: true },
  { id: 'grace_zamor_ruins', titulo: 'Sitio de Gracia: Ruinas de Zamor', categoria: 'graces', region: 'Picos de los Gigantes', coords: [3450, 2870], descripcion: 'Entrada a las cumbres donde aguarda Shabriri y los caballeros de hielo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares037.php' },
  { id: 'grace_ancient_snow_valley', titulo: 'Sitio de Gracia: Ruinas del Valle de las Nieves', categoria: 'graces', region: 'Picos de los Gigantes', coords: [3640, 2970], descripcion: 'Valle profundo atravesado por gólems de piedra y el puente de Sol.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares038.php' },
  { id: 'grace_freezing_lake', titulo: 'Sitio de Gracia: Lago Helado', categoria: 'graces', region: 'Picos de los Gigantes', coords: [3850, 3340], descripcion: 'Vasto lago polar invadido por la niebla helada de Borealis.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares039.php' },
  { id: 'grace_first_church_marika', titulo: 'Sitio de Gracia: Primera Iglesia de Márika', categoria: 'graces', region: 'Picos de los Gigantes', coords: [3740, 3420], descripcion: 'Santuario en la orilla sur del lago con Lágrima Sagrada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares039.php', importante: true },
  { id: 'grace_castle_sol_gate', titulo: 'Sitio de Gracia: Puerta Principal del Castillo de Sol', categoria: 'graces', region: 'Picos de los Gigantes Norte', coords: [4020, 3070], descripcion: 'Entrada a la fortaleza custodiada por leones con cuchillas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares038.php' },
  { id: 'grace_castle_sol_rooftop', titulo: 'Sitio deGracia: Torre del Castillo de Sol (Niall)', categoria: 'graces', region: 'Picos de los Gigantes Norte', coords: [4060, 3080], descripcion: 'Arena de combate contra el Comandante Niall por el medallón secreto.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares038.php', importante: true },
  { id: 'grace_church_of_repose', titulo: 'Sitio de Gracia: Iglesia del Reposo', categoria: 'graces', region: 'Picos de los Gigantes Sur', coords: [3500, 3360], descripcion: 'Lugar donde invade Okina el Dedo Sangriento portando Ríos de Sangre.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares040.php', importante: true },
  { id: 'grace_foot_of_the_forge', titulo: 'Sitio de Gracia: Falda de la Forja', categoria: 'graces', region: 'Picos de los Gigantes Sur', coords: [3420, 3460], descripcion: 'Niebla del combate final de la región contra el Gigante de Fuego.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares040.php', importante: true },
  { id: 'grace_forge_of_the_giants', titulo: 'Sitio de Gracia: Forja de los Gigantes', categoria: 'graces', region: 'Picos de los Gigantes Sur', coords: [3320, 3560], descripcion: 'El caldero de llama primordial para prender fuego al Árbol Áureo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares040.php', importante: true },
  { id: 'grace_consecrated_snowfield', titulo: 'Sitio de Gracia: Campo Sacroníveo', categoria: 'graces', region: 'Campo Sacroníveo', coords: [4120, 2820], descripcion: 'Extensión cegada por ventiscas eternas al salir del camino secreto de Rold.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares045.php' },
  { id: 'grace_ordina', titulo: 'Sitio de Gracia: Ordina, Ciudad Litúrgica', categoria: 'graces', region: 'Campo Sacroníveo Norte', coords: [4420, 2860], descripcion: 'Rompecabezas de las 4 velas para abrir el portal hacia el Árbol Hierático.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares045.php', importante: true },
  { id: 'grace_apostate_derelict', titulo: 'Sitio de Gracia: Ruinas del Desierto Apóstata', categoria: 'graces', region: 'Campo Sacroníveo Noroeste', coords: [4520, 2800], descripcion: 'Iglesia solitaria custodiada por un mausoleo andante donde descansa Phillia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares045.php' },

  // --- ÁRBOL HIERÁTICO DE MIQUELLA & FARUM AZULA ---
  { id: 'grace_haligtree_canopy', titulo: 'Sitio de Gracia: Copa del Árbol Hierático', categoria: 'graces', region: 'Árbol Hierático de Miquella', coords: [4680, 3060], descripcion: 'Descenso arriesgado por las gigantescas ramas en las nubes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php', importante: true },
  { id: 'grace_haligtree_town', titulo: 'Sitio de Gracia: Pueblo del Árbol Hierático', categoria: 'graces', region: 'Árbol Hierático de Miquella', coords: [4720, 3080], descripcion: 'Casas colgantes pobladas de sirvientes de la putrefacción.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php' },
  { id: 'grace_haligtree_promenade', titulo: 'Sitio de Gracia: Paseo del Árbol Hierático (Loretta)', categoria: 'graces', region: 'Árbol Hierático de Miquella', coords: [4780, 3060], descripcion: 'Arena de combate contra la auténtica Loretta, Caballera del Árbol.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php' },
  { id: 'grace_prayer_room', titulo: 'Sitio de Gracia: Sala de Rezos', categoria: 'graces', region: 'Elphael, tutor del Árbol', coords: [4830, 3090], descripcion: 'Santuario interior en el corazón de Elphael.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php', importante: true },
  { id: 'grace_elphael_inner_wall', titulo: 'Sitio de Gracia: Muralla Interior de Elphael', categoria: 'graces', region: 'Elphael, tutor del Árbol', coords: [4860, 3080], descripcion: 'Acceso a los jardines infestados de Caballeros Inmaculados.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php' },
  { id: 'grace_haligtree_roots', titulo: 'Sitio de Gracia: Raíces del Árbol Hierático', categoria: 'graces', region: 'Elphael, tutor del Árbol', coords: [4920, 3100], descripcion: 'Niebla del combate contra Malenia, Espada de Miquella.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares048.php', importante: true },
  { id: 'grace_crumbling_beast_grave', titulo: 'Sitio de Gracia: Tumba de la Bestia Desmoronada', categoria: 'graces', region: 'Farum Azula en Ruinas', coords: [2680, 4280], descripcion: 'Llegada tras despertar en el torbellino de Farum Azula.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares043.php' },
  { id: 'grace_dragon_temple', titulo: 'Sitio de Gracia: Templo del Dragón', categoria: 'graces', region: 'Farum Azula en Ruinas', coords: [2760, 4420], descripcion: 'Acceso a la arena del infame Dúo Sacrodermo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares043.php', importante: true },
  { id: 'grace_beside_the_great_bridge', titulo: 'Sitio de Gracia: Junto al Gran Puente', categoria: 'graces', region: 'Farum Azula en Ruinas', coords: [2850, 4560], descripcion: 'Camino hacia el Centinela Agreste Draconiano y Maliketh.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares043.php', importante: true },
  { id: 'grace_dragonlord_placidusax', titulo: 'Sitio de Gracia: Señor Dragón Placidusax', categoria: 'graces', region: 'Farum Azula en Ruinas', coords: [2700, 4520], descripcion: 'Corazón secreto en el vórtice temporal donde reina Placidusax.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares043.php', importante: true },

  // --- SUBTERRÁNEO (SIOFRA, AINSEL, NOKRON, DEEPROOT, MOHGWYN) ---
  { id: 'grace_siofra_river_bank', titulo: 'Sitio de Gracia: Orilla del Río Siofra', categoria: 'graces', region: 'Río Siofra (Subterráneo)', coords: [1420, 2860], descripcion: 'Borde fluvial estrellado donde encender los 8 pilares de fuego.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares011.php', mapaOrigen: 'underground' },
  { id: 'grace_nokron_eternal_city', titulo: 'Sitio de Gracia: Nokron, Ciudad Eterna', categoria: 'graces', region: 'Nokron (Subterráneo)', coords: [1420, 2900], descripcion: 'Tejados y plazas de la ciudad subterránea caída.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares011.php', importante: true, mapaOrigen: 'underground' },
  { id: 'grace_ancestral_woods', titulo: 'Sitio de Gracia: Bosque Ancestral', categoria: 'graces', region: 'Nokron (Subterráneo)', coords: [1520, 2940], descripcion: 'Descenso hacia el Terreno Sagrado de la Noche.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares011.php', mapaOrigen: 'underground' },
  { id: 'grace_aqueduct_facing_cliffs', titulo: 'Sitio de Gracia: Acantilados del Acueducto', categoria: 'graces', region: 'Acueducto de Siofra', coords: [1620, 2980], descripcion: 'Paso elevado que conduce a las Gárgolas Denodadas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares011.php', mapaOrigen: 'underground' },
  { id: 'grace_deeproot_depths', titulo: 'Sitio de Gracia: Fondo de Raíz Profunda', categoria: 'graces', region: 'Fondo de Raíz Profunda', coords: [3380, 2400], descripcion: 'Vastas raíces milenarias inundadas en las entrañas de la tierra.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares027.php', importante: true, mapaOrigen: 'underground' },
  { id: 'grace_nameless_eternal_city', titulo: 'Sitio de Gracia: La Ciudad Eterna Sin Nombre', categoria: 'graces', region: 'Fondo de Raíz Profunda', coords: [3450, 2420], descripcion: 'Ruinas sumergidas con caballeros del crisol y espectros.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares027.php', mapaOrigen: 'underground' },
  { id: 'grace_ainsel_river_well', titulo: 'Sitio de Gracia: Pozo del Río Ainsel', categoria: 'graces', region: 'Río Ainsel', coords: [2380, 1600], descripcion: 'Entrada por el elevador de Liurnia Este.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares012.php', mapaOrigen: 'underground' },
  { id: 'grace_nokstella_eternal_city', titulo: 'Sitio de Gracia: Nokstella, Ciudad Eterna', categoria: 'graces', region: 'Río Ainsel', coords: [2540, 1540], descripcion: 'Magnífica metrópolis de plata habitada por lágrimas plateadas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares012.php', importante: true, mapaOrigen: 'underground' },
  { id: 'grace_lake_of_rot_shores', titulo: 'Sitio de Gracia: Orillas del Lago de la Putrefacción', categoria: 'graces', region: 'Lago de la Putrefacción', coords: [1950, 1520], descripcion: 'Enorme mar rojo de putrefacción que requiere pulsar pilares de piedra.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares013.php', importante: true, mapaOrigen: 'underground' },
  { id: 'grace_grand_cloister', titulo: 'Sitio de Gracia: Gran Claustro', categoria: 'graces', region: 'Lago de la Putrefacción', coords: [1840, 1480], descripcion: 'Ataúd de piedra en el río de sangre para descender hasta Astel.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares013.php', mapaOrigen: 'underground' },
  { id: 'grace_palace_approach_ledge', titulo: 'Sitio de Gracia: Cuesta de Acceso al Palacio', categoria: 'graces', region: 'Palacio de Mohgwyn', coords: [1220, 3320], descripcion: 'La zona de farmeo de runas más célebre de todo el juego (Albinaurics).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares036.php', importante: true, mapaOrigen: 'underground' },
  { id: 'grace_dynasty_mausoleum_midpoint', titulo: 'Sitio de Gracia: Punto Medio del Mausoleo de la Dinastía', categoria: 'graces', region: 'Palacio de Mohgwyn', coords: [1340, 3420], descripcion: 'Último elevador antes de la arena de combate de Mohg.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares036.php', importante: true, mapaOrigen: 'underground' }
];

GRACES.forEach(g => addLoc(g));

// =========================================================================
// B. JEFES, SEMIDIOSES E INVASORES (BOSSES)
// =========================================================================
const BOSSES = [
  // Necrolimbo & Colina Tormentosa
  { id: 'boss_tree_sentinel', titulo: 'Centinela Agreste (Tree Sentinel)', categoria: 'bosses', region: 'Necrolimbo Centro', coords: [1410, 2090], descripcion: 'Poderoso caballero dorado montado que patrulla entre El Primer Paso y la Iglesia de Elleh. Dropea la Alabarda dorada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes002.php', importante: true },
  { id: 'boss_agheel', titulo: 'Dragón Volador Agheel', categoria: 'bosses', region: 'Necrolimbo Centro', coords: [1450, 2200], descripcion: 'Temible dragón de fuego que desciende desde el cielo en el lago central de Necrolimbo. Otorga un Corazón de dragón.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes003.php', importante: true },
  { id: 'boss_darriwil', titulo: 'Caballero Sabueso Darriwil', categoria: 'bosses', region: 'Necrolimbo Sur', coords: [1260, 2240], descripcion: 'Recluido en la Cárcel Eterna del Sabueso Aislado. Dropea el prestigioso Colmillo de Sabueso.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes004.php', importante: true },
  { id: 'boss_tibia_mariner_summonwater', titulo: 'Barquero Tibial (Aguainvocante)', categoria: 'bosses', region: 'Necrolimbo Norte', coords: [1700, 2400], descripcion: 'Espectro en barca de huesos que reanima esqueletos. Dropea una Raíz Mortuoria y Ceniza de miliciano esquelético.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes005.php', importante: true },
  { id: 'boss_margit', titulo: 'Margit, el Augurio Caído', categoria: 'bosses', region: 'Colina de Tormentas', coords: [1720, 1930], descripcion: 'El inflexible guardián de las puertas de Velo Tormentoso. Recompensa: Bolsa de talismán.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes001.php', importante: true },
  { id: 'boss_godrick', titulo: 'Godrick el Injertado (Gran Runa)', categoria: 'bosses', region: 'Castillo de Velo Tormentoso', coords: [1840, 1860], descripcion: 'Gobernante decadente de Velo Tormentoso que injerta una cabeza de dragón en su brazo. Otorga la Gran Runa de Godrick y el Recuerdo del Injertado.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes008.php', importante: true },
  { id: 'boss_crucible_stormhill', titulo: 'Caballero del Crisol (Cárcel de la Colina)', categoria: 'bosses', region: 'Colina de Tormentas', coords: [1610, 1960], descripcion: 'Guerrero ancestral con escudo y cola dorada. Dropea el encantamiento Aspectos del Crisol: Cola.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes006.php', importante: true },

  // Península del Llanto
  { id: 'boss_leonine', titulo: 'León Bastardo (Leonine Misbegotten)', categoria: 'bosses', region: 'Castillo de Morne Sur', coords: [720, 2240], descripcion: 'Jefe final en la playa del Castillo de Morne. Dropea el Armamento Legendario Espadón de hoja injertada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes007.php', importante: true },
  { id: 'boss_erdtree_avatar_weeping', titulo: 'Avatar del Árbol Áureo (Península)', categoria: 'bosses', region: 'Península del Llanto Centro', coords: [910, 2170], descripcion: 'Guardián del Árbol Menor que dropea la Lágrima de cristal carmesí y Lágrima hendida.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes007.php' },

  // Liurnia de los Lagos
  { id: 'boss_smarag', titulo: 'Dragón de Piedra Fulgurante Smarag', categoria: 'bosses', region: 'Liurnia Centro-Oeste', coords: [2580, 1340], descripcion: 'Duerme custodiando la Llave de piedra fulgurante de la Academia en su nido rocoso.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes010.php', importante: true },
  { id: 'boss_red_wolf', titulo: 'Lobo Rojo de Radagon', categoria: 'bosses', region: 'Academia de Raya Lucaria', coords: [2640, 1420], descripcion: 'Guardián del salón de debate que blande espadas mágicas ardientes. Otorga una Piedra de la memoria.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes011.php', importante: true },
  { id: 'boss_rennala', titulo: 'Rennala, Reina de la Luna Llena (Gran Runa)', categoria: 'bosses', region: 'Academia de Raya Lucaria', coords: [2670, 1410], descripcion: 'Gobernante cariana que domina la luna. Otorga la Gran Runa de los Nonatos y desbloquea el Respec de atributos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes012.php', importante: true },
  { id: 'boss_loretta_caria', titulo: 'Loretta, Caballera Real', categoria: 'bosses', region: 'Mansión Cariana', coords: [3280, 1330], descripcion: 'Defensora montada del estanque de la Mansión Cariana. Dropea el Gran Arco de Loretta.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes014.php', importante: true },
  { id: 'boss_magma_wyrm_makar', titulo: 'Dragón de Magma Makar', categoria: 'bosses', region: 'Desfiladero de Ruinas', coords: [3350, 1560], descripcion: 'Guardián del paso montañoso hacia la Meseta de Altus. Dropea la Espada de escamas de dragón de magma.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes015.php', importante: true },
  { id: 'boss_adula', titulo: 'Dragón Fulgurante Adula', categoria: 'bosses', region: 'Altar del Claro de Luna', coords: [2060, 1220], descripcion: 'Dragón fiel a Ranni protegiendo la catedral. Otorga el hechizo Espadón de Adula.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes018.php', importante: true },
  { id: 'boss_alecto', titulo: 'Alecto, Líder de los Cuchillos Negros', categoria: 'bosses', region: 'Altar del Claro de Luna', coords: [2180, 1130], descripcion: 'Cárcel Eterna de la Cabecilla en el Altar. Otorga la Ceniza legendaria de Tiche, Cuchillo Negro.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes019.php', importante: true },

  // Caelid & Dragonbarrow
  { id: 'boss_commander_oneil', titulo: 'Comandante O\'Neil', categoria: 'bosses', region: 'Pantano de Eonia', coords: [1620, 3050], descripcion: 'Comandante militar en el pantano carmesí. Dropea el Estandarte de comandante y la Aguja de oro puro.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes021.php', importante: true },
  { id: 'boss_radahn', titulo: 'General Radahn, Azote de las Estrellas (Gran Runa)', categoria: 'bosses', region: 'Dunas de la Melena Roja', coords: [1370, 3350], descripcion: 'El semidiós de la gravedad. Su derrota provoca la caída de una estrella que abre el pozo a Nokron.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes020.php', importante: true },
  { id: 'boss_ekzykes', titulo: 'Dragón Decrépito Ekzykes', categoria: 'bosses', region: 'Caelid Sur', coords: [1440, 2900], descripcion: 'Dragón consumido por la putrefacción que exhala nubes mortíferas sobre la calzada sur.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes022.php' },
  { id: 'boss_greyll', titulo: 'Dragón Volador Greyll', categoria: 'bosses', region: 'Montedrago de Greyoll', coords: [2140, 3260], descripcion: 'Defiende el Gran Puente septentrional de Farum en Dragonbarrow.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes023.php' },
  { id: 'boss_black_blade_kindred', titulo: 'Sombra de la Hoja Negra (Gárgola)', categoria: 'bosses', region: 'Montedrago de Greyoll', coords: [2340, 3240], descripcion: 'Gárgola imponente frente al Santuario Bestial. Dropea la Espada gemela y el Hacha de gárgola negra.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes024.php', importante: true },

  // Meseta Altus & Monte Gelmir
  { id: 'boss_elemer', titulo: 'Elemer de la Zarza', categoria: 'bosses', region: 'Castillo Sombrío', coords: [3680, 1860], descripcion: 'Lanza espadas flotantes teledirigidas de carmesí. Dropea la Espada de verdugo de Marais y el Escudo con púas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes026.php', importante: true },
  { id: 'boss_godskin_apostle_windmill', titulo: 'Apóstol Sacrodermo de Dominula', categoria: 'bosses', region: 'Aldea del Molino', coords: [3720, 2030], descripcion: 'Daniliza en la cumbre de los molinos. Dropea el Pelador de piel de dios y el encantamiento Llama negra abrasadora.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes027.php', importante: true },
  { id: 'boss_godskin_noble_volcano', titulo: 'Noble Sacrodermo de la Mansión', categoria: 'bosses', region: 'Mansión del Volcán', coords: [3500, 1350], descripcion: 'En el Templo de Eiglay. Dropea el Estoque de Noble Sacrodermo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes029.php', importante: true },
  { id: 'boss_rykard', titulo: 'Rykard, Señor de la Blasfemia (Gran Runa)', categoria: 'bosses', region: 'Mansión del Volcán', coords: [3470, 1340], descripcion: 'Semidiós fusionado con la Serpiente Gigante. Se combate con el Cazador de Serpientes. Otorga la Gran Runa y la Hoja Blasfema.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes028.php', importante: true },
  { id: 'boss_draconic_sentinel', titulo: 'Centinela Agreste Draconiano', categoria: 'bosses', region: 'Leyndell Afueras', coords: [3520, 2370], descripcion: 'Guardián feroz con escudo de relámpago rojo que bloquea el portón norte de la capital Leyndell.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes030.php', importante: true },

  // Leyndell Capital
  { id: 'boss_godfrey_shade', titulo: 'Primer Señor del Círculo Godfrey (Sombra)', categoria: 'bosses', region: 'Leyndell, Capital Real', coords: [3260, 2440], descripcion: 'Aparición espectral dorada en el santuario. Recompensa: Bolsa de talismán adicional.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes033.php', importante: true },
  { id: 'boss_morgott', titulo: 'Morgott, el Rey de los Augurios (Gran Runa)', categoria: 'bosses', region: 'Leyndell, Capital Real', coords: [3210, 2480], descripcion: 'Soberano protector de Leyndell en el Trono de Elden. Otorga la Gran Runa de Morgott y la Espada maldita de Morgott.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes034.php', importante: true },
  { id: 'boss_mohg_omen', titulo: 'Mohg el Augurio (Cloacas)', categoria: 'bosses', region: 'Subsuelo de los Marginados', coords: [3280, 2390], descripcion: 'Versión espectral en la Catedral de los Desamparados que bloquea el descenso a los Tres Dedos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes035.php', importante: true },

  // Picos de los Gigantes & Campo Sacroníveo
  { id: 'boss_commander_niall', titulo: 'Comandante Niall', categoria: 'bosses', region: 'Castillo de Sol', coords: [4060, 3080], descripcion: 'Comandante veterano con pata de palo electrificada y dos caballeros desterrados invocados. Desbloquea el Medallón Secreto.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes038.php', importante: true },
  { id: 'boss_borealis', titulo: 'Borealis, la Niebla Helada', categoria: 'bosses', region: 'Picos de los Gigantes', coords: [3850, 3340], descripcion: 'Dragón milenario que sumerge el Lago Helado en una cegadora ventisca ártica.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes039.php' },
  { id: 'boss_fire_giant', titulo: 'Gigante de Fuego (Portador del Recuerdo)', categoria: 'bosses', region: 'Picos de los Gigantes (Forja)', coords: [3380, 3520], descripcion: 'El último gigante vivo que custodia la Forja sagrada. Desata el fuego ardiente arrancándose la pierna.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes040.php', importante: true },
  { id: 'boss_astel_yelough', titulo: 'Astel, Estrellas de la Oscuridad', categoria: 'bosses', region: 'Campo Sacroníveo', coords: [4210, 2690], descripcion: 'Entidad cósmica en el fondo del Túnel de Yelough Anix. Dropea el hechizo Meteorito de Astel.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes041.php', importante: true },

  // Árbol Hierático & Farum Azula
  { id: 'boss_loretta_haligtree', titulo: 'Loretta, Caballera del Árbol Hierático', categoria: 'bosses', region: 'Árbol Hierático de Miquella', coords: [4780, 3060], descripcion: 'Forma física real de Loretta que custodia el puente de Elphael. Dropea la Maestría de Loretta.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes049.php', importante: true },
  { id: 'boss_malenia', titulo: 'Malenia, Espada de Miquella (Gran Runa)', categoria: 'bosses', region: 'Elphael, tutor del Árbol', coords: [4940, 3100], descripcion: 'La Diosa de la Putrefacción que jamás conoció la derrota. Otorga la Gran Runa de Malenia y la legendaria Mano de Malenia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes050.php', importante: true },
  { id: 'boss_godskin_duo', titulo: 'Dúo Sacrodermo (Templo del Dragón)', categoria: 'bosses', region: 'Farum Azula en Ruinas', coords: [2780, 4460], descripcion: 'Apóstol y Noble Sacrodermo compartiendo una barra de vida común. Dropean la Esfera de minero [4].', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes044.php', importante: true },
  { id: 'boss_maliketh', titulo: 'Maliketh, la Hoja Negra (Portador del Recuerdo)', categoria: 'bosses', region: 'Farum Azula en Ruinas', coords: [2870, 4580], descripcion: 'La sombra de Márika y señor de la Muerte Destinada. Tras vencerlo, Leyndell se cubrirá de ceniza.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes045.php', importante: true },
  { id: 'boss_placidusax', titulo: 'Señor Dragón Placidusax (Jefe Legendario Secreto)', categoria: 'bosses', region: 'Farum Azula en Ruinas', coords: [2700, 4520], descripcion: 'Antiguo Señor de Elden dragón de dos cabezas suspendido en el ojo del huracán del tiempo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes046.php', importante: true },

  // Subterráneo
  { id: 'boss_ancestor_spirit', titulo: 'Espíritu del Ancestro', categoria: 'bosses', region: 'Río Siofra (Subterráneo)', coords: [1480, 2890], descripcion: 'Ciervo lumínico que se despierta encendiendo los 8 pilares del río. Dropea la Ceniza de espíritu del seguidor ancestral.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes017.php', mapaOrigen: 'underground' },
  { id: 'boss_mimic_tear', titulo: 'Lágrima Mimética (Jefe)', categoria: 'bosses', region: 'Nokron (Subterráneo)', coords: [1450, 2930], descripcion: 'Copia exacta de tu propio personaje y armamento. Otorga Lágrimas Larvales y la Máscara plateada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes013.php', importante: true, mapaOrigen: 'underground' },
  { id: 'boss_valiant_gargoyles', titulo: 'Gárgolas Denodadas (Dúo)', categoria: 'bosses', region: 'Acueducto de Siofra', coords: [1660, 3010], descripcion: 'Dúo de gárgolas con veneno. El ataúd de su cascada transporta al Fondo de Raíz Profunda.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes017.php', importante: true, mapaOrigen: 'underground' },
  { id: 'boss_astel_void', titulo: 'Astel, Inefable del Vacío', categoria: 'bosses', region: 'Gran Claustro (Lago Putrefacción)', coords: [1840, 1480], descripcion: 'Colosal aberración estelar del abismo cósmico. Desbloquea la subida al Altar del Claro de Luna.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes018.php', importante: true, mapaOrigen: 'underground' },
  { id: 'boss_mohg_blood', titulo: 'Mohg, Señor de la Sangre (Gran Runa)', categoria: 'bosses', region: 'Palacio de Mohgwyn', coords: [1380, 3450], descripcion: 'El Señor de la Dinastía de Sangre que secuestró a Miquella. Otorga su Gran Runa y la Lanza sagrada de Mohgwyn.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes036.php', importante: true, mapaOrigen: 'underground' },
  { id: 'boss_fortissax', titulo: 'Dragón Liche Fortissax', categoria: 'bosses', region: 'Fondo de Raíz Profunda', coords: [3520, 2460], descripcion: 'Poderoso dragón infectado por la muerte que se enfrenta en el lecho onírico de Fia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes027.php', importante: true, mapaOrigen: 'underground' },

  // Batallas Finales
  { id: 'boss_gideon', titulo: 'Sir Gideon Ofnir el Omnisciente', categoria: 'bosses', region: 'Leyndell Ceniza', coords: [3260, 2460], descripcion: 'Líder de la Mesa Redonda que intentará bloquear tu camino al trono empuñando todos los hechizos de los semidioses.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes051.php', importante: true },
  { id: 'boss_godfrey_real', titulo: 'Godfrey / Hoarah Loux, Guerrero', categoria: 'bosses', region: 'Leyndell Ceniza (Trono)', coords: [3230, 2480], descripcion: 'El primer Señor del Círculo en carne y hueso que desata a Serosh para luchar con sus garras.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes052.php', importante: true },
  { id: 'boss_radagon_beast', titulo: 'Radagon de la Orden Dorada y la Bestia del Círculo', categoria: 'bosses', region: 'El Árbol Áureo (Núcleo)', coords: [3160, 2510], descripcion: 'Los dos jefes finales definitivos de Elden Ring en el mar estelar del Árbol Áureo. Otorgan el Recuerdo de Elden.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_jefes053.php', importante: true }
];

BOSSES.forEach(b => addLoc(b));

// =========================================================================
// C. MAZMORRAS, CATACUMBAS, MINAS, CUEVAS Y TUMBAS DE HÉROE (DUNGEONS)
// =========================================================================
const DUNGEONS = [
  // Necrolimbo y Península
  { id: 'dung_fringefolk_hero', titulo: 'Tumba del Héroe de los Aledaños', categoria: 'dungeons', region: 'Necrolimbo Centro', coords: [1370, 2080], descripcion: 'Mazmorra con cuádrigas letales en la Cueva del conocimiento inicial. Jefe: Espíritu del árbol ulcerado. Recompensa: Talismán Favor del Árbol Áureo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares003.php', importante: true },
  { id: 'dung_groveside_cave', titulo: 'Cueva de la Arboleda', categoria: 'dungeons', region: 'Necrolimbo Centro', coords: [1480, 2030], descripcion: 'Cueva con lobos salvajes. Jefe: Hombre bestia de Farum Azula. Dropea el Talismán del dragón ígneo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares004.php' },
  { id: 'dung_stormfoot_catacombs', titulo: 'Catacumbas de la Colina Tormentosa', categoria: 'dungeons', region: 'Necrolimbo Centro', coords: [1530, 2020], descripcion: 'Catacumbas con trampas de fuego e diablillos de piedra. Jefe: Perro guardián del entierro. Dropea Ceniza de hechicero noble.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares004.php' },
  { id: 'dung_limgrave_tunnels', titulo: 'Mina de Necrolimbo', categoria: 'dungeons', region: 'Necrolimbo Centro', coords: [1460, 2180], descripcion: 'Mina rica en Piedras de forja [1]. Jefe: Trol excavador de piedra. Dropea el Medallón de rugido.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares005.php' },
  { id: 'dung_murkwater_catacombs', titulo: 'Catacumbas de Aguamarga', categoria: 'dungeons', region: 'Necrolimbo Centro', coords: [1570, 2240], descripcion: 'Catacumbas con trampas de flechas. Jefe: Duelista guardián de tumbas. Dropea el Gran hacha de duelista.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares006.php' },
  { id: 'dung_deathtouched_catacombs', titulo: 'Catacumbas Tocadas por la Muerte', categoria: 'dungeons', region: 'Colina de Tormentas Norte', coords: [1740, 2180], descripcion: 'Catacumbas infestadas de esqueletos. Jefe: Asesino de los Cuchillos Negros. Dropea la Daga carmesí de asesino y la Uchigatana.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares006.php', importante: true },
  { id: 'dung_highroad_cave', titulo: 'Cueva del Camino Principal', categoria: 'dungeons', region: 'Colina de Tormentas Este', coords: [1680, 2220], descripcion: 'Cueva con pulpos y cascadas que guarda la Espada curva de Shamshir.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares006.php' },
  { id: 'dung_impaling_catacombs', titulo: 'Catacumbas del Empalador', categoria: 'dungeons', region: 'Península del Llanto Este', coords: [1060, 2380], descripcion: 'Plataformas que suben hacia techos de pinchos. Jefe: Perro guardián.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares008.php' },
  { id: 'dung_tombsward_catacombs', titulo: 'Catacumbas de las Tumbas (Tombsward)', categoria: 'dungeons', region: 'Península del Llanto Centro', coords: [980, 2100], descripcion: 'Catacumbas con lanzallamas de piedra. Dropea la Ceniza legendaria de Lhutel la Acéfala.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares009.php', importante: true },
  { id: 'dung_earthbore_cave', titulo: 'Cueva de la Fosa Terrestre', categoria: 'dungeons', region: 'Península del Llanto Norte', coords: [1070, 2200], descripcion: 'Fosa habitada por osos que custodia el Talismán de escudo de espeluzno.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares009.php' },
  { id: 'dung_morne_tunnel', titulo: 'Galería de Morne', categoria: 'dungeons', region: 'Península del Llanto', coords: [880, 2190], descripcion: 'Mina con mineros semihumanos y abundantes piedras de forja sombría [1] y [2].', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares010.php' },

  // Liurnia de los Lagos
  { id: 'dung_stillwater_cave', titulo: 'Cueva de Stillwater', categoria: 'dungeons', region: 'Liurnia Sur', coords: [1980, 1790], descripcion: 'Cueva inundada de veneno en el fondo del barranco de Liurnia. Jefe: Caballero del Santo Inmaculado.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares016.php' },
  { id: 'dung_lakeside_crystal_cave', titulo: 'Cueva de Cristal del Lago', categoria: 'dungeons', region: 'Liurnia Sur', coords: [2060, 1630], descripcion: 'Cueva luminosa que conecta directamente con la Cabaña del Lobo Durmiente (Latenna).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares017.php', importante: true },
  { id: 'dung_raya_lucaria_crystal_tunnel', titulo: 'Galería de Cristal de Raya Lucaria', categoria: 'dungeons', region: 'Liurnia Este', coords: [2480, 1710], descripcion: 'Mina de cristales azules. Jefe: Cristalino de lanza. Dropea la Esfera de minero de piedra de forja [1].', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares018.php', importante: true },
  { id: 'dung_black_knife_catacombs', titulo: 'Catacumbas de los Cuchillos Negros', categoria: 'dungeons', region: 'Liurnia Noreste', coords: [2880, 1800], descripcion: 'Contiene dos jefes: Sombra de cementerio y Asesino de los Cuchillos Negros (Dropea la Daga cerúlea de asesino y la Huella del Cuchillo Negro).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares019.php', importante: true },
  { id: 'dung_cliffbottom_catacombs', titulo: 'Catacumbas del Fondo del Acantilado', categoria: 'dungeons', region: 'Liurnia Sureste', coords: [2180, 1840], descripcion: 'Catacumbas de múltiples niveles con cabezas de piedra móviles.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares019.php' },

  // Caelid & Dragonbarrow
  { id: 'dung_gael_tunnel', titulo: 'Túnel de Gael', categoria: 'dungeons', region: 'Caelid Frontera Oeste', coords: [1540, 2760], descripcion: 'Mina fronteriza. Jefe: Dragón de Magma. Dropea la famosa katana legendaria Velo Lunar (Moonveil).', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares022.php', importante: true },
  { id: 'dung_sellia_crystal_tunnel', titulo: 'Galería de Cristal de Sellia', categoria: 'dungeons', region: 'Caelid Centro', coords: [1820, 3110], descripcion: 'Mina trampa de teletransporte desde las ruinas quemadas por dragones. Jefe: Bestia de la Estrella Fugaz. Dropea la Esfera de sombría [1].', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares023.php', importante: true },
  { id: 'dung_caelid_catacombs', titulo: 'Catacumbas de Caelid', categoria: 'dungeons', region: 'Caelid Sur', coords: [1420, 2850], descripcion: 'Catacumbas inundadas de podredumbre bajo el acantilado. Jefe: Sombra de cementerio.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares022.php' },
  { id: 'dung_war_dead_catacombs', titulo: 'Catacumbas de los Caídos en Guerra', categoria: 'dungeons', region: 'Dunas de la Melena Roja', coords: [1470, 3370], descripcion: 'En el extremo norte del desierto de Radahn. Los espíritus de soldados de Radahn y Malenia luchan eternamente. Dropea la Ceniza de Ogha.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares024.php', importante: true },

  // Meseta Altus & Monte Gelmir
  { id: 'dung_altus_tunnel', titulo: 'Túnel de Altus', categoria: 'dungeons', region: 'Meseta de Altus', coords: [3480, 1940], descripcion: 'Mina rica en Piedras de forja sombría [5]. Jefe: Cristalino lanza y maza. Dropea la Esfera de sombría [2].', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares028.php', importante: true },
  { id: 'dung_sainted_hero_grave', titulo: 'Tumba del Héroe Santificado', categoria: 'dungeons', region: 'Meseta de Altus', coords: [3380, 1950], descripcion: 'Tumba con círculos de luz sagrada que quitan la invulnerabilidad a las sombras. Dropea la Ceniza del Caballero Kristoff.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares029.php', importante: true },
  { id: 'dung_gelmir_hero_grave', titulo: 'Tumba del Héroe de Gelmir', categoria: 'dungeons', region: 'Monte Gelmir', coords: [3430, 1630], descripcion: 'Descenso deslizándote sobre la lava ardiente y las cuádrigas mortales. Dropea el Conjunto de Caballero de Gelmir y Sabueso.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares032.php', importante: true },
  { id: 'dung_auriza_hero_grave', titulo: 'Tumba del Héroe de Auriza', categoria: 'dungeons', region: 'Leyndell Afueras', coords: [3440, 2280], descripcion: 'Mazmorra con cuádrigas dobles que deben destruirse entre sí con la luz de una columna. Jefe: Dúo de Caballeros del Crisol Ordovis. Recompensa: Espadón de Ordovis y Armadura.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares033.php', importante: true },

  // Picos de los Gigantes & Campo Sacroníveo
  { id: 'dung_giant_conquering_grave', titulo: 'Tumba del Héroe Conquistador de Gigantes', categoria: 'dungeons', region: 'Picos de los Gigantes', coords: [3550, 3180], descripcion: 'Tumba de sombras gigantes donde la luz revela a los troles y vigilantes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares041.php' },
  { id: 'dung_spiritcaller_cave', titulo: 'Cueva del Invocador de Espíritus', categoria: 'dungeons', region: 'Lago Helado', coords: [3820, 3310], descripcion: 'Cueva oculta tras llave de espada pétrea. Los caracoles invocan a los espíritus de Godskin Apostle y Noble. Dropea el Paño de la Deidad de la Piel.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares042.php', importante: true },
  { id: 'dung_yelough_anix_tunnel', titulo: 'Túnel de Yelough Anix', categoria: 'dungeons', region: 'Campo Sacroníveo', coords: [4210, 2690], descripcion: 'Mina helada con piedras de dragón antiguo y el temible Astel, Estrellas de la Oscuridad.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares046.php', importante: true },
  { id: 'dung_cave_of_the_forlorn', titulo: 'Cueva del Desolado', categoria: 'dungeons', region: 'Campo Sacroníveo', coords: [4280, 2910], descripcion: 'Cueva polar en el río helado. Dropea el legendario Espadón de la Orden Dorada.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_lugares047.php', importante: true }
];

DUNGEONS.forEach(d => addLoc(d));

// =========================================================================
// D. ARMAS, BASTONES, SELLOS Y ESCUDOS (WEAPONS)
// =========================================================================
const WEAPONS = [
  { id: 'weap_moonveil', titulo: 'Katana Velo Lunar (Moonveil)', categoria: 'weapons', region: 'Túnel de Gael (Caelid)', coords: [1540, 2760], descripcion: 'Una de las katanas más devastadoras del juego con proyectiles de luz fulgurante "Luz Transversal".', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas068.php', importante: true },
  { id: 'weap_rivers_of_blood', titulo: 'Katana Ríos de Sangre (Rivers of Blood)', categoria: 'weapons', region: 'Iglesia del Reposo (Picos)', coords: [3500, 3360], descripcion: 'La legendaria katana de hemorragia con la habilidad Danza Cadavérica. Dropeada por Okina.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas072.php', importante: true },
  { id: 'weap_dark_moon_greatsword', titulo: 'Espadón de la Luna Negra (Dark Moon Greatsword)', categoria: 'weapons', region: 'Catedral de Manus Celes', coords: [2060, 1220], descripcion: 'Armamento legendario entregado por Ranni tras colocarle el anillo. Carga la hoja con hielo y rayos lunares.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas056.php', importante: true },
  { id: 'weap_blasphemous_blade', titulo: 'Espada Blasfema (Blasphemous Blade)', categoria: 'weapons', region: 'Mansión del Volcán', coords: [3470, 1340], descripcion: 'Espadón del Recuerdo de Rykard cubierto de brazos retorcidos que absorbe salud con su Fuego del Saqueo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas058.php', importante: true },
  { id: 'weap_bolt_of_gransax', titulo: 'Cerrojo de Gransax (Bolt of Gransax - Legendario)', categoria: 'weapons', region: 'Leyndell, Capital Real', coords: [3310, 2440], descripcion: 'Lanza legendaria incrustada en la lanza colosal del dragón de piedra en Leyndell.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas080.php', importante: true, missable: true, advertenciaMissable: '¡Totalmente perdible! Recógela antes de derrotar a Maliketh en Farum Azula, pues la capital quedará en cenizas.' },
  { id: 'weap_bloodhound_fang', titulo: 'Colmillo de Sabueso (Bloodhound\'s Fang)', categoria: 'weapons', region: 'Necrolimbo Sur', coords: [1260, 2240], descripcion: 'Espadón curvo legendario por su habilidad Finura del Sabueso. Dropeado por Darriwil en la Cárcel Eterna.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas065.php', importante: true },
  { id: 'weap_golden_order_greatsword', titulo: 'Espadón de la Orden Dorada', categoria: 'weapons', region: 'Campo Sacroníveo', coords: [4280, 2910], descripcion: 'Espadón legendario forjado de pura luz áurea por Radagon en la Cueva del Desolado.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas055.php', importante: true },
  { id: 'weap_ruins_greatsword', titulo: 'Espadón de Ruinas', categoria: 'weapons', region: 'Castillo de la Melena Roja', coords: [1350, 3270], descripcion: 'Armamento legendario caído de un templo volante con Oleada de Gravedad.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas060.php', importante: true },
  { id: 'weap_sacred_relic_sword', titulo: 'Espada de la Reliquia Sagrada', categoria: 'weapons', region: 'El Árbol Áureo (Final)', coords: [3160, 2510], descripcion: 'Espada forjada del cuerpo de Radagon. Su Oleada de Oro barre hordas enteras al instante.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas052.php', importante: true },
  { id: 'weap_sword_of_night_and_flame', titulo: 'Espada de la Noche y la Llama (Legendaria)', categoria: 'weapons', region: 'Mansión Cariana', coords: [3220, 1350], descripcion: 'En un cofre en una azotea cerrada de la Mansión Cariana. Dispara el rayo del cometa o un mar de llamas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas050.php', importante: true },
  { id: 'weap_reduvia', titulo: 'Daga Reduvia', categoria: 'weapons', region: 'Necrolimbo Centro', coords: [1470, 2230], descripcion: 'Daga arrojadiza de sangre dropeada por Nerijus en el cauce de Murkwater.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas003.php' },
  { id: 'weap_greatsword_guts', titulo: 'Gran Espada (Greatsword "Guts")', categoria: 'weapons', region: 'Caelid Noroeste', coords: [1780, 2880], descripcion: 'Colosal espadón ubicado dentro del cofre del carruaje fúnebre abandonado en Caelid.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas062.php' },
  { id: 'weap_uchigatana', titulo: 'Katana Uchigatana', categoria: 'weapons', region: 'Catacumbas Tocadas Muerte', coords: [1740, 2180], descripcion: 'Katana en una repisa sobre las celdas de las catacumbas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas067.php' },
  { id: 'weap_nagakiba', titulo: 'Katana Larga Nagakiba', categoria: 'weapons', region: 'Segunda Iglesia de Márika', coords: [3380, 1880], descripcion: 'La katana más larga del juego que pertenecía a Yura.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas069.php', importante: true },
  { id: 'weap_eleonoras_poleblade', titulo: 'Hoja Doble de Eleonora', categoria: 'weapons', region: 'Segunda Iglesia de Márika', coords: [3380, 1880], descripcion: 'Arma de salto acrobático y daño de fuego/sangrado.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas075.php', importante: true },
  { id: 'weap_meteorite_staff', titulo: 'Bastón de Meteorito', categoria: 'weapons', region: 'Pantano de Eonia (Ruinas Sabios)', coords: [1720, 3020], descripcion: 'Escalado natural S en Inteligencia desde el inicio. En la Calle de los Sabios.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas110.php', importante: true },
  { id: 'weap_carian_regal_scepter', titulo: 'Cetro Regio Cariano', categoria: 'weapons', region: 'Academia de Raya Lucaria', coords: [2670, 1410], descripcion: 'El bastón supremo de la Reina Rennala potenciador de hechizos de luna llena.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas112.php', importante: true },
  { id: 'weap_lusats_staff', titulo: 'Bastón de Piedra Fulgurante de Lusat', categoria: 'weapons', region: 'Sellia, Ciudad Hechicería', coords: [1750, 3140], descripcion: 'Potencia al máximo el daño de cualquier hechicería consumiendo más PC.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_armas114.php', importante: true },
  { id: 'weap_fingerprint_shield', titulo: 'Gran Escudo de Piedra de Huella Dactilar', categoria: 'weapons', region: 'Subsuelo de los Marginados', coords: [3270, 2370], descripcion: 'El escudo de mayor estabilidad de todo el juego en el laberinto de lápidas de los Tres Dedos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_escudos025.php', importante: true },
  { id: 'weap_brass_shield', titulo: 'Escudo de Latón (Brass Shield)', categoria: 'weapons', region: 'Puerta de Necrolimbo', coords: [1560, 2080], descripcion: 'El mejor escudo mediano con 100% de absorción de daño físico.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_escudos008.php' }
];

WEAPONS.forEach(w => addLoc(w));

// =========================================================================
// E. HECHIZOS Y ENCANTAMIENTOS (SPELLS)
// =========================================================================
const SPELLS = [
  { id: 'spell_comet_azur', titulo: 'Cometa Azur (Hechizo Legendario)', categoria: 'spells', region: 'Monte Gelmir', coords: [3520, 1470], descripcion: 'El rayo mágico continuo más destructivo del juego, enseñado por el maestro Azur petrificado.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos020.php', importante: true },
  { id: 'spell_stars_of_ruin', titulo: 'Estrellas del Colapso (Stars of Ruin - Legendario)', categoria: 'spells', region: 'Montedrago de Greyoll (Sellia)', coords: [1810, 3240], descripcion: 'Doce proyectiles estelares teledirigidos enseñados por el Maestro Lusat.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos021.php', importante: true },
  { id: 'spell_rannis_dark_moon', titulo: 'Luna Negra de Ranni (Hechizo Legendario)', categoria: 'spells', region: 'Torre de Chelona (Altar)', coords: [1960, 1190], descripcion: 'Dispara una luna fría que reduce la defensa mágica de los objetivos en un 10%.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos022.php', importante: true },
  { id: 'spell_terra_magica', titulo: 'Terra Magica (Círculo de Potenciación)', categoria: 'spells', region: 'Cueva de Cristal de la Academia', coords: [2610, 1380], descripcion: 'Dibuja una marca mágica en el suelo que incrementa en un 35% todo daño mágico.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos015.php', importante: true },
  { id: 'spell_rock_sling', titulo: 'Lanzarrocas (Rock Sling)', categoria: 'spells', region: 'Ruinas de la Calle de los Sabios', coords: [1720, 3020], descripcion: 'Extrae tres grandes peñascos gravitatorios de la tierra que provocan un devastador daño de postura.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos008.php', importante: true },
  { id: 'spell_golden_vow', titulo: 'Encantamiento: Voto Dorado (Golden Vow)', categoria: 'spells', region: 'Meseta de Altus', coords: [3520, 1600], descripcion: 'Aumenta el daño en 15% y las defensas en 10% para el portador y aliados.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos030.php', importante: true },
  { id: 'spell_flame_grant_me_strength', titulo: 'Encantamiento: ¡Llama, concédeme fuerza!', categoria: 'spells', region: 'Fuerte Gael (Caelid)', coords: [1490, 2740], descripcion: 'Potencia el ataque físico y de fuego en un 20%.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos025.php', importante: true },
  { id: 'spell_rot_breath', titulo: 'Encantamiento: Aliento Podrido (Rot Breath)', categoria: 'spells', region: 'Catedral Comunión Dragontina', coords: [1330, 2870], descripcion: 'Desata una devastadora marea de putrefacción escarlata sobre los enemigos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos040.php', importante: true },
  { id: 'spell_lightning_spear', titulo: 'Encantamiento: Lanza Fulgurante', categoria: 'spells', region: 'Liurnia Este', coords: [2290, 1730], descripcion: 'Rayo veloz arrojadizo de la Orden del Dragón.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos018.php' },
  { id: 'spell_flame_of_frenzy', titulo: 'Encantamiento: La Llama del Frenesí', categoria: 'spells', region: 'Iglesia del Bautisterio de Callu', coords: [940, 2220], descripcion: 'Fuego amarillo de locura en cono frontal en la Península del Llanto.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos035.php' },
  { id: 'spell_night_comet', titulo: 'Hechizo: Cometa Nocturno (Night Comet)', categoria: 'spells', region: 'Sellia, Ciudad Hechicería', coords: [1750, 3140], descripcion: 'Magia semi-invisible que los enemigos no pueden esquivar instintivamente.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos018.php', importante: true },
  { id: 'spell_lorettas_greatbow', titulo: 'Hechizo: Gran Arco de Loretta', categoria: 'spells', region: 'Mansión Cariana', coords: [3280, 1330], descripcion: 'Genera un arco colosal que dispara flechas perforantes a larga distancia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_hechizos025.php', importante: true },
  { id: 'spell_black_flame', titulo: 'Encantamiento: Llama Negra (Black Flame)', categoria: 'spells', region: 'Castillo de Velo Tormentoso', coords: [1800, 1880], descripcion: 'Quema la salud máxima del objetivo durante unos segundos tras el impacto.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos012.php' },
  { id: 'spell_ancient_dragons_lightning', titulo: 'Encantamiento: Relámpago de Dragón Antiguo', categoria: 'spells', region: 'Farum Azula en Ruinas', coords: [2760, 4420], descripcion: 'Lluvia fulgurante de relámpagos rojos celestiales.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_encantamientos032.php', importante: true }
];

SPELLS.forEach(s => addLoc(s));

// =========================================================================
// F. CENIZAS DE GUERRA E INVOCACIONES (ASHES)
// =========================================================================
const ASHES = [
  { id: 'ash_mimic_tear', titulo: 'Ceniza de Lágrima Mimética (Mimic Tear - Legendaria)', categoria: 'ashes', region: 'Nokron, Terreno Sagrado', coords: [1560, 2920], descripcion: 'Invoca una réplica exacta de tu propio personaje y equipo consumiendo PS en vez de PC.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus032.php', importante: true, mapaOrigen: 'underground' },
  { id: 'ash_tiche', titulo: 'Ceniza de Tiche, Cuchillo Negro (Legendaria)', categoria: 'ashes', region: 'Altar del Claro de Luna', coords: [2180, 1130], descripcion: 'Asesina letal que esquiva con saltos acrobáticos y drena la salud máxima con llamas de muerte.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus040.php', importante: true },
  { id: 'ash_lhutel', titulo: 'Ceniza de Lhutel la Acéfala (Legendaria)', categoria: 'ashes', region: 'Catacumbas de las Tumbas', coords: [980, 2100], descripcion: 'Caballero espectral sin cabeza que se teletransporta y lanza lanzas fantasmales.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_espiritus020.php', importante: true },
  { id: 'ash_bloodhound_step', titulo: 'Ceniza de Guerra: Paso del Sabueso', categoria: 'ashes', region: 'Montedrago de Greyoll (Puente)', coords: [2140, 3260], descripcion: 'La habilidad evasiva por excelencia. Te vuelve invisible y esquiva cualquier golpe.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_guerra020.php', importante: true },
  { id: 'ash_seppuku', titulo: 'Ceniza de Guerra: Seppuku', categoria: 'ashes', region: 'Lago Helado (Picos)', coords: [3850, 3340], descripcion: 'Te clavas la katana en el abdomen para disparar al máximo el poder de sangrado de tus armas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_guerra035.php', importante: true },
  { id: 'ash_flame_of_redmanes', titulo: 'Ceniza de Guerra: Llama de los Melena Roja', categoria: 'ashes', region: 'Fuerte Gael Norte (Caelid)', coords: [1510, 2760], descripcion: 'Escupe un arco de fuego voraz con enorme capacidad de romper la postura de los jefes.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_guerra028.php', importante: true },
  { id: 'ash_lions_claw', titulo: 'Ceniza de Guerra: Garra de León', categoria: 'ashes', region: 'Fuerte Gael (Caelid)', coords: [1490, 2740], descripcion: 'Gran salto acrobático frontal descargando la hoja con fuerza demoledora que aplasta enemigos.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_guerra015.php', importante: true },
  { id: 'ash_hoarfrost_stomp', titulo: 'Ceniza de Guerra: Pisotón de Escarcha', categoria: 'ashes', region: 'Mansión Cariana Este (Lago)', coords: [3220, 1420], descripcion: 'Pisa el suelo congelando un gran cono frontal con escarcha expansiva.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_cenizas_guerra030.php', importante: true }
];

ASHES.forEach(a => addLoc(a));

// =========================================================================
// G. OBJETOS CLAVE, SEMILLAS, LÁGRIMAS Y TALISMANES (KEY_ITEMS)
// =========================================================================
const KEY_ITEMS = [
  // --- LAS 12 LÁGRIMAS SAGRADAS (SACRED TEARS) ---
  { id: 'tear_third_church', titulo: 'Lágrima Sagrada: Tercera Iglesia de Márika', categoria: 'key_items', region: 'Necrolimbo Este', coords: [1580, 2630], descripcion: 'Potencia la cantidad de recuperación de tus viales de vida y maná.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_church_pilgrimage', titulo: 'Lágrima Sagrada: Iglesia de la Peregrinación', categoria: 'key_items', region: 'Península del Llanto', coords: [1080, 2060], descripcion: 'A los pies de la estatua de Márika en la cumbre norte de la península.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_fourth_church', titulo: 'Lágrima Sagrada: Cuarta Iglesia de Márika', categoria: 'key_items', region: 'Península del Llanto', coords: [960, 1970], descripcion: 'En el templo costero occidental custodiado por soldados fantasmas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_callu_church', titulo: 'Lágrima Sagrada: Iglesia del Bautisterio de Callu', categoria: 'key_items', region: 'Península del Llanto', coords: [940, 2220], descripcion: 'En el interior de la iglesia donde brota la llama de la locura.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_church_irith', titulo: 'Lágrima Sagrada: Iglesia de Irith', categoria: 'key_items', region: 'Liurnia Sur', coords: [1970, 1750], descripcion: 'Junto a Thops al salir de Velo Tormentoso hacia Liurnia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_bellum_church', titulo: 'Lágrima Sagrada: Iglesia de Bellum', categoria: 'key_items', region: 'Liurnia Norte (Bellum)', coords: [2950, 1630], descripcion: 'En la calzada previa al Gran Elevador de Dectus.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_church_inhibition', titulo: 'Lágrima Sagrada: Iglesia de la Inhibición', categoria: 'key_items', region: 'Liurnia Noreste', coords: [3110, 1790], descripcion: 'En el templo invadido por Vyke de la Huella Dactilar.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_church_plague', titulo: 'Lágrima Sagrada: Iglesia de la Plaga', categoria: 'key_items', region: 'Caelid Este', coords: [1690, 3240], descripcion: 'Junto a Millicent en las ruinas sobre la ciudad de Sellia.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_second_church_marika', titulo: 'Lágrima Sagrada: Segunda Iglesia de Márika', categoria: 'key_items', region: 'Meseta de Altus', coords: [3380, 1880], descripcion: 'En el santuario donde Yura es herido por Eleonora.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_stormcaller_church', titulo: 'Lágrima Sagrada: Iglesia del Invocador de Tormentas', categoria: 'key_items', region: 'Meseta de Altus', coords: [3560, 2140], descripcion: 'En la cima de las colinas de los molinos de Altus.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_first_church_marika', titulo: 'Lágrima Sagrada: Primera Iglesia de Márika', categoria: 'key_items', region: 'Picos de los Gigantes', coords: [3740, 3420], descripcion: 'Orilla meridional del Lago Helado de Borealis.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },
  { id: 'tear_church_repose', titulo: 'Lágrima Sagrada: Iglesia del Reposo', categoria: 'key_items', region: 'Picos de los Gigantes', coords: [3500, 3360], descripcion: 'Frente a la forja sagrada donde invade Okina.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos005.php', importante: true },

  // --- SEMILLAS DORADAS (GOLDEN SEEDS) ---
  { id: 'seed_fringe_tree', titulo: 'Semilla Dorada: Frente a la Puerta', categoria: 'key_items', region: 'Necrolimbo Centro', coords: [1560, 2090], descripcion: 'En el pequeño brote de árbol áureo en el camino del desfiladero.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_stormhill_road', titulo: 'Semilla Dorada: Cabaña de la Colina', categoria: 'key_items', region: 'Colina de Tormentas', coords: [1660, 2010], descripcion: 'Brote áureo frente a la cabaña de Roderika.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_stormveil_courtyard', titulo: 'Semilla Dorada: Patio de Velo Tormentoso', categoria: 'key_items', region: 'Castillo de Velo Tormentoso', coords: [1830, 1870], descripcion: 'Junto al trol gigante en el patio interior del castillo.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_morne_castle', titulo: 'Semilla Dorada: Afueras de Morne', categoria: 'key_items', region: 'Península del Llanto', coords: [910, 2240], descripcion: 'Brote dorado en el camino de carretas de la muralla.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_fort_haight', titulo: 'Semilla Dorada: Exterior de Fuerte Haight', categoria: 'key_items', region: 'Necrolimbo Este', coords: [1260, 2650], descripcion: 'Brote dorado frente a la puerta del bastión de Kenneth.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_academy_gate_town', titulo: 'Semilla Dorada: Pueblo de la Puerta (Liurnia)', categoria: 'key_items', region: 'Liurnia Centro', coords: [2460, 1570], descripcion: 'Brote en las aguas de la ciudad sumergida.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_raya_lucaria_bridge', titulo: 'Semilla Dorada: Puente de Raya Lucaria', categoria: 'key_items', region: 'Academia de Raya Lucaria', coords: [2620, 1460], descripcion: 'Sobre el puente exterior de la entrada principal.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_caria_manor', titulo: 'Semilla Dorada: Jardín de Caria', categoria: 'key_items', region: 'Mansión Cariana', coords: [3330, 1310], descripcion: 'Tras derrotar a Loretta camino a las Tres Hermanas.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_sellia', titulo: 'Semilla Dorada: Sellia Ciudad Hechicería', categoria: 'key_items', region: 'Caelid Centro', coords: [1750, 3160], descripcion: 'Brote dorado junto a la escalera de la ciudad mágica.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_dragonbarrow', titulo: 'Semilla Dorada: Montedrago', categoria: 'key_items', region: 'Montedrago de Greyoll', coords: [1980, 3100], descripcion: 'En la colina del árbol menor de Dragonbarrow.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_erdtree_gazing_hill', titulo: 'Semilla Dorada: Colina Mirador de Altus', categoria: 'key_items', region: 'Meseta de Altus', coords: [3320, 1800], descripcion: 'Junto a la Gracia donde descansa Millicent.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },
  { id: 'seed_phantom_tree_double', titulo: 'Semillas Doradas Dobles: Árbol Fantasma Leyndell', categoria: 'key_items', region: 'Leyndell Afueras', coords: [3420, 2180], descripcion: '¡Otorga 2 Semillas Doradas de golpe bajo el gran árbol dorado del muro exterior!', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos006.php', importante: true },

  // --- TALISMANES LEGENDARIOS Y CLAVE ---
  { id: 'talisman_erdtree_favor_2', titulo: 'Talismán Legendario: Favor del Árbol Áureo +2', categoria: 'key_items', region: 'Leyndell de Ceniza', coords: [3340, 2460], descripcion: 'Incrementa enormemente los PS, la Resistencia máxima y la Carga de equipamiento.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes020.php', importante: true },
  { id: 'talisman_radagons_soreseal', titulo: 'Talismán Legendario: Sello Doloroso de Radagon', categoria: 'key_items', region: 'Fuerte Faroth (Caelid)', coords: [1930, 3210], descripcion: 'Otorga +5 en Vigor, Resistencia, Fuerza y Destreza a cambio de recibir un 15% más de daño.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes015.php', importante: true },
  { id: 'talisman_marikas_soreseal', titulo: 'Talismán Legendario: Sello Doloroso de Márika', categoria: 'key_items', region: 'Elphael (Árbol Hierático)', coords: [4860, 3080], descripcion: 'Otorga +5 en Mente, Inteligencia, Fe y Arcano tras un sello de espada pétrea en Elphael.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes016.php', importante: true },
  { id: 'talisman_dragoncrest_greatshield', titulo: 'Talismán Legendario: Gran Escudo de Blasón de Dragón', categoria: 'key_items', region: 'Elphael (Canal Drenaje)', coords: [4880, 3120], descripcion: 'El talismán defensivo supremo: reduce el daño físico recibido en un colosal 20%.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes018.php', importante: true },
  { id: 'talisman_shard_alexander', titulo: 'Talismán Legendario: Fragmento de Alexander', categoria: 'key_items', region: 'Farum Azula en Ruinas', coords: [2850, 4550], descripcion: 'Incrementa el daño de todas las habilidades y Cenizas de Guerra en un demoledor 15%.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes025.php', importante: true },
  { id: 'talisman_godfrey_icon', titulo: 'Talismán Legendario: Icono de Godfrey', categoria: 'key_items', region: 'Cárcel Eterna de Linaje Dorado', coords: [3360, 1920], descripcion: 'Incrementa el poder de ataque de todos los hechizos, encantamientos y habilidades cargadas en un 15%.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes022.php', importante: true },
  { id: 'talisman_moon_nokstella', titulo: 'Talismán Legendario: Luna de Nokstella', categoria: 'key_items', region: 'Nokstella, Ciudad Eterna', coords: [2540, 1540], descripcion: 'Aumenta las ranuras de memoria para hechizos en 2 espacios adicionales.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_talismanes024.php', importante: true, mapaOrigen: 'underground' },

  // --- MEDALLONES Y OBJETOS DE PROGRESIÓN ---
  { id: 'key_dectus_left', titulo: 'Medallón de Dectus (Izquierda)', categoria: 'key_items', region: 'Fuerte Haight (Necrolimbo)', coords: [1260, 2670], descripcion: 'En el cofre de la torre más alta de Fuerte Haight.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos008.php', importante: true },
  { id: 'key_dectus_right', titulo: 'Medallón de Dectus (Derecha)', categoria: 'key_items', region: 'Fuerte Faroth (Caelid)', coords: [1930, 3210], descripcion: 'En el cofre de la torre más alta de Fuerte Faroth.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos008.php', importante: true },
  { id: 'key_haligtree_secret_right', titulo: 'Medallón Secreto del Árbol (Derecha)', categoria: 'key_items', region: 'Aldea de los Albináuricos', coords: [2130, 1370], descripcion: 'Entregado por el anciano Albus oculto dentro de una tinaja en la aldea.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos009.php', importante: true },
  { id: 'key_haligtree_secret_left', titulo: 'Medallón Secreto del Árbol (Izquierda)', categoria: 'key_items', region: 'Castillo de Sol (Picos)', coords: [4060, 3080], descripcion: 'En la azotea del castillo tras derrotar al Comandante Niall.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos009.php', importante: true },
  { id: 'key_academy_glintstone_key', titulo: 'Llave de Piedra Fulgurante de la Academia', categoria: 'key_items', region: 'Nido de Smarag (Liurnia)', coords: [2580, 1340], descripcion: 'En el cadáver protegido por el Dragón Smarag. Permite cruzar el sello mágico de Raya Lucaria.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos007.php', importante: true },
  { id: 'key_pureblood_medal', titulo: 'Medalla de Caballero de Sangre Pura', categoria: 'key_items', region: 'Iglesia de la Rosa (Varré)', coords: [2230, 1420], descripcion: 'Objeto de teletransporte instantáneo directo al Palacio de Mohgwyn entregado por Varré.', eliteguiasUrl: 'https://www.eliteguias.com/guias/e/er/er_objetos012.php', importante: true }
];

KEY_ITEMS.forEach(k => addLoc(k));

// --- 3. ESCRITURA DE ARCHIVOS Y ESTADÍSTICAS FINALES ---
fs.writeFileSync(QUESTLINES_FILE, JSON.stringify(ALL_QUESTLINES, null, 2), 'utf8');
fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(MASTER_LOCATIONS, null, 2), 'utf8');

console.log(`\n======================================================`);
console.log(`✓ ÉXITO: Base de datos exhaustiva y calibrada de Elden Ring`);
console.log(`======================================================`);
console.log(`Total Questlines: ${ALL_QUESTLINES.length}`);
console.log(`Total Pasos de Misiones: ${ALL_QUESTLINES.reduce((acc, q) => acc + q.pasos.length, 0)}`);
console.log(`Total Ubicaciones en locations.json: ${MASTER_LOCATIONS.length}`);

const catCount = {};
const mapCount = {};
MASTER_LOCATIONS.forEach(l => {
  catCount[l.categoria] = (catCount[l.categoria] || 0) + 1;
  mapCount[l.mapaOrigen || 'surface'] = (mapCount[l.mapaOrigen || 'surface'] || 0) + 1;
});

console.log(`\nDesglose por Categorías:`);
console.table(catCount);

console.log(`\nDesglose por Mapas (Superficie / Subterráneo / DLC):`);
console.table(mapCount);
