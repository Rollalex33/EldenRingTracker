/**
 * src/utils/gameOrder.js
 *
 * Módulo de orden canónico de Elden Ring.
 * Replica el orden exacto de inventario (opción oficial "Ordenar por tipo"):
 * 1. Categorías principales en el orden de las pestañas del juego.
 * 2. Diccionarios canónicos del orden oficial "Por Tipo" del inventario para:
 *    - Cenizas de espíritus (84 ítems completos del juego base y DLC).
 *    - Hechizos (84 ítems: 70 juego base + 14 DLC).
 *    - Encantamientos (129 ítems: 101 juego base + 28 DLC).
 *    - Talismanes (126 ítems: 87 juego base + 39 DLC).
 *    - Cenizas de guerra (117 ítems: 92 juego base + 25 DLC).
 * 3. Subcategorías canónicas por tipo de arma, escudo y armadura.
 */

// 1. ORDEN CANÓNICO DE PESTAÑAS / CATEGORÍAS EN EL EQUIPO DE ELDEN RING
export const CANONICAL_CATEGORIES_ORDER = [
  'armas',
  'escudos',
  'armaduras',
  'talismanes',
  'hechizos',
  'encantamientos',
  'cenizas-espiritus',
  'cenizas-guerra',
  'objetos',
  'jefazos',
  'personajes',
];

// 2. ORDEN DE TIPOS DE ARMAS (De Dagas a Antorchas, según menú oficial de armas)
export const WEAPON_TYPES_CANONICAL = [
  'dagas',
  'espadas rectas',
  'espadones',
  'espadas colosales',
  'espadones ligeros',
  'espadas de embestida',
  'espadas de embestida pesadas',
  'espadas curvas',
  'espadones curvos',
  'hojas de reves',
  'catanas',
  'grandes catanas',
  'hojas dobles',
  'hachas',
  'grandes hachas',
  'martillos',
  'mayales',
  'grandes martillos',
  'armas colosales',
  'lanzas',
  'lanzas largas',
  'alabardas',
  'guadanas',
  'latigos',
  'punos',
  'garras',
  'garras bestia',
  'cuerpo a cuerpo',
  'botellas de perfume',
  'hojas arrojadizas',
  'arcos ligeros',
  'arcos',
  'arcos grandes',
  'ballestas',
  'balistas',
  'bastones de piedra refulgente',
  'sellos sagrados',
  'antorchas',
];

// 3. ORDEN DE ESCUDOS
export const SHIELD_TYPES_CANONICAL = [
  'pequenos',
  'medianos',
  'grandes',
  'embestida',
  'escudo embestida',
];

// 4. ORDEN DE PIEZAS DE ARMADURA
export const ARMOR_TYPES_CANONICAL = [
  'cabeza',
  'pecho',
  'manos',
  'piernas',
  'armaduras',
];

// 5. ORDEN DE AFINIDADES DE CENIZAS DE GUERRA
export const ASHES_TYPES_CANONICAL = [
  'estandar',
  'pesado',
  'ligero',
  'de calidad',
  'magico',
  'frio',
  'igneo',
  'llameante',
  'fulgurante',
  'sagrado',
  'venenoso',
  'sangriento',
  'oculto',
  'sin afinidad',
];

// 6. ORDEN DE TIPOS DE OBJETOS
export const ITEM_TYPES_CANONICAL = [
  'objetos principales',
  'lagrimas',
  'consumibles',
  'proyectiles',
  'municion',
  'materiales de creacion',
  'materiales de refuerzo',
  'manuales',
  'runas',
  'grandes runas',
  'recuerdos',
  'multijugador',
  'informacion',
  'objetos',
];

// 7. ORDEN CANÓNICO DEL INVENTARIO OFICIAL POR TIPO: CENIZAS DE ESPÍRITUS (84 ÍTEMS)
// Comienza con invocaciones comunes (humanoides, monstruos, soldados), luego invocaciones de élite y marionetas
export const SPIRIT_ASHES_INVENTORY_ORDER = [
  'Cenizas de noble errante',
  'Cenizas de hechicero noble',
  'Cenizas de nómada',
  'Cenizas de cadáver putrefacto',
  'Cenizas de esqueletos milicianos',
  'Cenizas de esqueleto bandido',
  'Cenizas de albináurico',
  'Cenizas de bastardo alado',
  'Cenizas de semihumano',
  'Cenizas de hombre de barro',
  'Cenizas de emisario del oráculo',
  'Cenizas de hombre mosca',
  'Cenizas de lobo solitario',
  'Cenizas de perro callejero podrido',
  'Cenizas de rata gigante',
  'Cenizas de halcón de guerra',
  'Cenizas de ascidias de tierra',
  'Cenizas de espíritu de medusa',
  'Cenizas de brote de Miranda',
  'Cenizas de escorpión araña',
  'Cenizas de hurgadedo',
  'Cenizas de diablillo colmilludo',
  'Cenizas de diablillo bocudo',
  'Cenizas de ave tumular',
  'Cenizas del trío tarrorífico',
  'Cenizas de arquero',
  'Cenizas de soldado de escudo grande',
  'Cenizas de paje',
  'Cenizas de carne de cañón',
  'Cenizas de soldado marioneta',
  'Cenizas de soldado avioneta',
  'Cenizas de soldado a sueldo de Kaiden',
  'Cenizas de lunático calabezudo',
  'Cenizas de monje ígneo',
  'Cenizas de adorador ancestral',
  'Cenizas de guerrero astado',
  'Cenizas de hombre bestia de Azula',
  'Cenizas de hombre serpiente',
  'Cenizas de cristaliano',
  'Cenizas de ancestro de la putrefacción',
  'Cenizas de hechicero sanguinemigo',
  'Cenizas de hechicero de piedras refulg.',
  'Cenizas de hechicero de la doble virtud',
  'Cenizas de inquisidora',
  'Cenizas de soldado de Godrick',
  'Cenizas de soldado de Raya Lucaria',
  'Cenizas de soldado de Leyndell',
  'Cenizas de soldado de Radahn',
  'Cenizas de soldado del Árbol Hierático',
  'Cenizas de soldado del mausoleo',
  'Cenizas de soldado de Messmer',
  'Halcón tormentoso Deenh',
  'Caballero proscrito Oleg',
  'Caballero proscrito Engvall',
  'Caballero sabueso Floh',
  'Huw, capitán de los Caballeros Negros',
  'Andreas, comandante de los Caballeros Negros',
  'Caballera de Fuego Hilde',
  'Caballero de Fuego Queelign',
  'Espadachina de la Noche Jolán',
  'Jolán y Anna',
  'Mago guerrero Hugues',
  'Latenna la albináurica',
  'Perfumista Tricia',
  'Perfumista corrupto Carmaan',
  'Rollo, asesino de augurios',
  'Monje de la llama negra Amon',
  'Hojamaldita Meera',
  'Yosh, el espadachín semihumano',
  'Kristoff, Caballero del dragón antiguo',
  'Caballero de la Melena Roja Ogha',
  'Lhutel la decapitada',
  'Caballera Imputrescible Finlay',
  'Tiche, la Cuchillo Negro',
  'Guerrero del Pájaro Divino Ornis',
  'Taylew, el herrero gólem',
  'Dragona antigua Florissax',
  'Cenizas de lágrima mimética',
  'Marioneta de la doncella del dedo Therolina',
  'Marioneta del jarróntropo',
  'Marioneta de Dolores, la Flecha Durmiente',
  'Marioneta de Nepheli Loux',
  'Marioneta del Zampaheces',
  'Marioneta de doncella nocturna y espadachina de Nox',
];

// 8. ORDEN CANÓNICO DEL INVENTARIO OFICIAL POR TIPO: HECHIZOS (84 ÍTEMS)
export const SORCERIES_INVENTORY_ORDER = [
  'Guijarro de piedras refulgentes',
  'Esquirla de piedra refulgente ligera',
  'Esquirla de piedra refulgente grande',
  'Cometa esquirlado de piedra refulgente',
  'Cometa',
  'Vórtice de esquirlas',
  'Estrellas de piedras refulgentes',
  'Lluvia estelar',
  'Arco de piedra refulgente',
  'Aluvión de cristales',
  'Estallido de cristales',
  'Cañonazo de Haima',
  'Maza de Haima',
  'Rompetierra',
  'Desintegrador de rocas',
  'Armamento de erudito',
  'Escudo de erudito',
  'Luz de las estrellas',
  'Terra Magica',
  'Barrera de Thops',
  'Cometa Azur',
  'Estrellas de ruina',
  'Lluvia de estrellas de Goliath',
  'Hoja refulgente mágica',
  'Círculo de hojas refulgentes',
  'Círculo cariano',
  'Círculo de espadones',
  'Aguacero mágico',
  'Arco grande de Loretta',
  'Dominio de Loretta',
  'Luna Llena de Rennala',
  'Luna Negra de Ranni',
  'Rebanador cariano',
  'Espadón refulgente cariano',
  'Punzada cariana',
  'Hoja lunar de Adula',
  'Lucidez',
  'Represalia de los Caria',
  'Esquirla trampa',
  'Esquirla nocturna',
  'Cometa nocturno',
  'Niebla de doncella nocturna',
  'Hoja invisible',
  'Formación invisible',
  'Oscuridad eterna',
  'Disparo de magma',
  'Magma lodoso',
  'Ira de Gelmir',
  'Rencor de Rykard',
  'Risco helado de piedras refulgentes',
  'Niebla glacial',
  'Congelar armamento',
  'Tormenta helada de Zamor',
  'Cristal devastador',
  'Torrente de cristal',
  'Liberación de cristal',
  'Pozo de gravedad',
  'Estrellas en colapso',
  'Lanzarrocas',
  'Meteoritos',
  'Meteoritos de Astel',
  'Burbujas oraculares',
  'Gran burbuja oracular',
  'Zarza pecaminosa',
  'Zarza de castigo',
  'Llamada del rencor',
  'Rencor mortal antiguo',
  'Llama espectral explosiva',
  'Niebla de Fia',
  'Invocaciones tibiales',
  'Uña de piedra refulgente',
  'Uñas de piedra refulgente',
  'Trío de hojas refulgentes',
  'Lunas gemelas de Rellana',
  'Desaparición de Miriam',
  'Misil gravitatorio',
  'Hojas de piedra',
  'Microcosmos fugaz',
  'Dedos estimados',
  'Anillos de luz espectral',
  'Vórtice de putrefacción',
  'Masa de putrefacción',
  'Manto de espinas',
  'Espinas impenetrables',
];

// 9. ORDEN CANÓNICO DEL INVENTARIO OFICIAL POR TIPO: ENCANTAMIENTOS (129 ÍTEMS)
export const INCANTATIONS_INVENTORY_ORDER = [
  'Curación urgente',
  'Curación',
  'Curación superior',
  'Curación de señor',
  'Curar veneno',
  'Ayuda de señor',
  'Fortaleza mágica',
  'Fortaleza llameante',
  'Fortaleza fulgurante',
  'Fortaleza divina',
  'Fortaleza divina de señor',
  'Empuje',
  'Cebo sombrío',
  'Oscuridad',
  'Estrategia del asesino',
  'Juramento dorado',
  'Barrera dorada',
  'Fortaleza fulgurante dorada',
  'Protección del Árbol Áureo',
  'Ira dorada',
  'Curación del Árbol Áureo',
  'Don de la bendición',
  'Bendición del Árbol Áureo',
  'Características del crisol: Aliento',
  'Características del crisol: Cola',
  'Características del crisol: Cuernos',
  'Estrellas de Elden',
  'Hoja Negra',
  'Disco de luz',
  'Anillos de luz triples',
  'Anillo de luz de Radagon',
  'Letanía de una muerte digna',
  'Curación de la Orden',
  'Hoja de la Orden',
  'Escudo inalterable',
  'Ley de causalidad',
  'Ley de regresión',
  'Lanza fulgurante',
  'Ataque fulgurante',
  'Rayo punzante',
  'Lanza fulgurante de dragón antiguo',
  'Ataque fulgurante de dragón antiguo',
  'Guja de Lansseax',
  'Lanza fulgurante de Fortissax',
  'Lanza fulgurante helada',
  'Rayo letal',
  'Electrificar armamento',
  'Bendición del dracorrayo',
  'Dracorrayo de Vyke',
  'Chasquido ardiente',
  '¡Oh, llama!',
  'Llamapulta',
  'Llama del gigante, álzate',
  'Llama, cae sobre ellos',
  'Llama del dios caído',
  'Surge, ¡oh, llama!',
  'Gira, ¡oh, llama!',
  'Arde, ¡oh, llama!',
  'Llama, purifícame',
  'Llama, protégeme',
  'Llama, dame fuerza',
  'Pecado letal de fuego',
  'Llama negra',
  'Llama negra rastreadora',
  'Ritual de la llama negra',
  'Hoja de la Llama Negra',
  'Protección de la llama negra',
  'Presencia noble',
  'Garra de bestia',
  'Garra de la bestia Gurranq',
  'Lanzamiento de bestia',
  'Piedra de Gurranq',
  'Constitución de bestia',
  'Vitalidad de bestia',
  'Enjambre de moscas',
  'Garras de hemofuego',
  'Favor sanguino',
  'Hoja de hemofuego',
  'Niebla venenosa',
  'Envenenar armamento',
  'Hilera de la plaga',
  'Aeonia carmesí',
  'La llama de la locura',
  'Frenesí insoportable',
  'Estallido frenético',
  'Aullido de Shabriri',
  'Frenesí ineludible',
  'Fuego de dragón',
  'Llama de Agheel',
  'Aliento de magma',
  'Magma de Theodorix',
  'Aliento de piedras refulgentes',
  'Piedra refulgente de Smarag',
  'Aliento podrido',
  'Putrefacción de Ekzykes',
  'Hielo de dragón',
  'Niebla de Boreal',
  'Perdición de Placidusax',
  'Garra de dragón',
  'Fauces de dragón',
  'Rugido de Greyoll',
  'Curación a distancia',
  'Árbol Áureo pequeño',
  'Ira a distancia',
  'Arcos dorados',
  'Arco dorado gigante',
  'Anillo de luz en capas',
  'Luz de Miquella',
  'Características del crisol: Espinas',
  'Características del crisol: Florecer',
  'Plumas del Pájaro Divino',
  'Lanza fulgurante del caballero',
  'Electrocarga',
  'Dracorrayo de Florissax',
  'Serpiente de fuego',
  'Lluvia de fuego',
  'Orbe de Messmer',
  'La llama frenética de Midra',
  'Espada furiosa de Ansbach',
  'Rugido de Rugalea',
  'Tornado de bestia divina',
  'Espíritu vigilante',
  'Espiral',
  'Territorios de sombras',
  'Lanzas de plagas',
  'Mariposas podridas',
  'Rayo llameante de Bayle',
  'Tiranía de Bayle',
  'Aliento de llama espectral',
];

// 10. ORDEN CANÓNICO DEL INVENTARIO OFICIAL POR TIPO: TALISMANES (126 ÍTEMS)
export const TALISMANS_INVENTORY_ORDER = [
  'Medallón de ámbar carmesí',
  'Talismán de semilla carmesí',
  'Talismán de rocío bendito',
  'Medallón de ámbar cerúleo',
  'Talismán de semilla cerúlea',
  'Medallón de ámbar viridián',
  'Talismán de tortuga verde',
  'Amuleto de arsenal',
  'Arsenal del Gran Tarro',
  'Favor del Árbol Áureo',
  'Marca cicatrizada de Radagon',
  'Marca ulcerada de Radagon',
  'Reliquia del Azote de las Estrellas',
  'Reliquia de la guerrera protésica',
  'Reliquia de la astrónoma',
  'Reliquia de los Dos Dedos',
  'Marca cicatrizada de Márika',
  'Marca ulcerada de Márika',
  'Talismán de escudo con blasón de dragón',
  'Talismán de escudo grande con blasón de dragón',
  'Talismán con dragón hechicero',
  'Talismán con dragón ígneo',
  'Talismán con dragón fulgurante',
  'Talismán con dragón hierático',
  'Talismán con dragón perlado',
  'Amuleto córneo inmunizante',
  'Collar jaspeado',
  'Amuleto córneo clarificador',
  'Amuleto córneo de fiel',
  'Pústula del Príncipe de la Muerte',
  'Quiste del Príncipe de la Muerte',
  'Talismán de espada ritual',
  'Talismán de escudo ritual',
  'Daga carmesí de asesino',
  'Daga cerúlea de asesino',
  'Insignia con espada alada',
  'Insignia con espada alada podrida',
  'Prótesis de Millicent',
  'Empañadura sacroderma',
  'Espada ramificada con plumas azules',
  'Espada ramificada con plumas rojas',
  'Talismán con espada curva',
  'Talismán con hoja doble',
  'Talismán con hacha',
  'Talismán con martillo',
  'Talismán de lancero',
  'Talismán de caballería',
  'Talismán con garra',
  'Talismán con escudo grande',
  'Talismán de alcance de flecha',
  'Talismán de punzada de flecha',
  'Talismán de amalgama de magos',
  'Talismán de gran amalgama de magos',
  'Talismán del lienzo de la fe',
  'Talismán del lienzo de la congregación',
  'Hoja de piedra refulgente atávica',
  'Luna de Nokstella',
  'Talismán del antiguo señor',
  'Icono de Radagon',
  'Icono de Godfrey',
  'Medallón de rugido',
  'Talismán de taurocabra',
  'Talismán de perfumista',
  'Blasón cariano con filigrana',
  'Fragmento de Alexander',
  'Tarrismán',
  'Amuleto de escorpión mágico',
  'Amuleto de escorpión ígneo',
  'Amuleto de escorpión fulgurante',
  'Amuleto de escorpión sagrado',
  'Talismán de escamas del crisol',
  'Talismán de plumas de crisol',
  'Talismán de nudo del crisol',
  'Amuleto de bailarina azul',
  'Talismán con daga',
  'Velo de camuflaje',
  'Talismán de gata de cola larga',
  'Frasco de Crepus',
  'Pesar de Shabriri',
  'Pesar de Daedicar',
  'Camafeo del megalómano',
  'Cuerno de espíritu ancestral',
  'Exaltación del Señor de la Sangre',
  'Exaltación de ancestro de la putrefacción',
  'Escarabeo de plata',
  'Escarabeo de oro',
  'Bolsa para talismán',
  'Medallón de ámbar carmesí +3',
  'Talismán de semilla carmesí +1',
  'Talismán de rocío azul bendito',
  'Medallón de ámbar cerúleo +3',
  'Talismán de semilla cerúlea +1',
  'Medallón de ámbar viridián +3',
  'Talismán de tortuga bicéfala verde',
  'Talismán de escudo perlado',
  'Talismán con dragón hechicero +3',
  'Talismán con dragón ígneo +3',
  'Talismán con dragón fulgurante +3',
  'Trenza dorada',
  'Talismán con dragón perlado +3',
  'Amuleto córneo inmunizante +2',
  'Collar jaspeado +2',
  'Amuleto córneo clarificador +2',
  'Amuleto córneo de fiel +2',
  'Disco de verdín',
  'Talismán con espada a dos manos',
  'Talismán de efecto',
  'Talismán de tirador',
  'Talismán de punzada de flecha ascendido',
  'Camafeo de Rellana',
  'Talismán de forja',
  'Talismán de piedra destrozada',
  'Bestia divina furiosa',
  'Talismán del Temible',
  'Talismán de plumas del crisol de calidad',
  'Talismán de todos los crisoles',
  'Hoja de la piedad',
  'Insignia de cruzada',
  'Árbol cruzado de laceración',
  'Árbol cruzado de contraataque',
  'Ramo seco',
  'Sonrisa de Santa Trina',
  'Exaltación del anciano',
  'Reliquia del dios externo',
  'Talismán de la dádiva del señor',
  'Polvo estelar de los amados',
];

// 11. ORDEN CANÓNICO DEL INVENTARIO OFICIAL POR TIPO: CENIZAS DE GUERRA (117 ÍTEMS)
export const ASHES_OF_WAR_INVENTORY_ORDER = [
  "Ceniza de Guerra: Pisotón y tajo vertical",
  "Ceniza de Guerra: Pisotón y barrido",
  "Ceniza de Guerra: Frenesí",
  "Ceniza de Guerra: Garra de león",
  "Ceniza de Guerra: Hoja rocosa",
  "Ceniza de Guerra: Patada",
  "Ceniza de Guerra: Indómito",
  "Ceniza de Guerra: Culada",
  "Ceniza de Guerra: Sacudida",
  "Ceniza de Guerra: Sacudida de Hoarah Loux",
  "Ceniza de Guerra: Grito de guerra",
  "Ceniza de Guerra: Rugido bárbaro",
  "Ceniza de Guerra: Rugido jactancioso",
  "Ceniza de Guerra: Rugido de trol",
  "Ceniza de Guerra: Tajo giratorio",
  "Ceniza de Guerra: Embestida empaladora",
  "Ceniza de Guerra: Colmillo perforador",
  "Ceniza de Guerra: Embestida reiterada",
  "Ceniza de Guerra: Tajo doble",
  "Ceniza de Guerra: Danza de espadas",
  "Ceniza de Guerra: Golpes giratorios",
  "Ceniza de Guerra: Desenvainar",
  "Ceniza de Guerra: Quiebro",
  "Ceniza de Guerra: Paso del sabueso",
  "Ceniza de Guerra: Rapaz de la neblina",
  "Ceniza de Guerra: Rugido de bestia",
  "Ceniza de Guerra: Combate",
  "Ceniza de Guerra: Carga al frente",
  "Ceniza de Guerra: Ataque tormentoso",
  "Ceniza de Guerra: Caza del gigante",
  "Ceniza de Guerra: Hoja tormentosa",
  "Ceniza de Guerra: Invocador de tormentas",
  "Ceniza de Guerra: Pisotón tormentoso",
  "Ceniza de Guerra: Corte de vacío",
  "Ceniza de Guerra: Tajo fantasma",
  "Ceniza de Guerra: Determinación",
  "Ceniza de Guerra: Resolución de caballero real",
  "Ceniza de Guerra: Guijarro de piedras refulgentes",
  "Ceniza de Guerra: Espadón cariano",
  "Ceniza de Guerra: Majestuosidad cariana",
  "Ceniza de Guerra: Arma giratoria",
  "Ceniza de Guerra: Tajo de Loretta",
  "Ceniza de Guerra: Gravitas",
  "Ceniza de Guerra: Olas de oscuridad",
  "Ceniza de Guerra: Falange de hojas refulgentes",
  "Ceniza de Guerra: Lanza helada",
  "Ceniza de Guerra: Niebla escalofriante",
  "Ceniza de Guerra: Pisotón escarchado",
  "Ceniza de Guerra: Golpe llameante",
  "Ceniza de Guerra: Llama de los Melena Roja",
  "Ceniza de Guerra: Erupción",
  "Ceniza de Guerra: Carga de prelado",
  "Ceniza de Guerra: Tornado de la llama negra",
  "Ceniza de Guerra: Rayo",
  "Ceniza de Guerra: Tajo fulgurante",
  "Ceniza de Guerra: Ariete fulgurante",
  "Ceniza de Guerra: Hoja sagrada",
  "Ceniza de Guerra: Golpe devoto",
  "Ceniza de Guerra: Anillo de luz sagrado",
  "Ceniza de Guerra: Orden sagrada",
  "Ceniza de Guerra: Orden común",
  "Ceniza de Guerra: Tierra Dorada",
  "Ceniza de Guerra: Culada áurea",
  "Ceniza de Guerra: Juramento dorado",
  "Ceniza de Guerra: Juramento del indómito",
  "Ceniza de Guerra: Suelo sagrado",
  "Ceniza de Guerra: Niebla venenosa",
  "Ceniza de Guerra: Vuelo de polilla venenosa",
  "Ceniza de Guerra: Filosanguino",
  "Ceniza de Guerra: Laceración",
  "Ceniza de Guerra: Tributo de sangre",
  "Ceniza de Guerra: Seppuku",
  "Ceniza de Guerra: Jabalina espectral",
  "Ceniza de Guerra: Puño robavida",
  "Ceniza de Guerra: Cebo de la sombra blanca",
  "Ceniza de Guerra: Técnica de asesino",
  "Ceniza de Guerra: Disparo poderoso",
  "Ceniza de Guerra: De punta en el blanco",
  "Ceniza de Guerra: Aluvión",
  "Ceniza de Guerra: Disparo en picado",
  "Ceniza de Guerra: Disparo encantado",
  "Ceniza de Guerra: Lluvia de flechas",
  "Ceniza de Guerra: Elusión",
  "Ceniza de Guerra: Elusión dorada",
  "Ceniza de Guerra: Muro tormentoso",
  "Ceniza de Guerra: Golpe de escudo",
  "Ceniza de Guerra: Impacto de escudo",
  "Ceniza de Guerra: Escudo barricada",
  "Ceniza de Guerra: Barrera de Thops",
  "Ceniza de Guerra: Contraataque cariano",
  "Ceniza de Guerra: Sin habilidad",
  "Ceniza de Guerra: Posición lateral",
  "Ceniza de Guerra: Chispas ondulantes",
  "Ceniza de Guerra: Muro de chispas",
  "Ceniza de Guerra: Invocac. llama esp.",
  "Ceniza de Guerra: Pisotón helado de bestia divina",
  "Ceniza de Guerra: Rayo   titilante",
  "Ceniza de Guerra: Bestia iracunda",
  "Ceniza de Guerra: Garras salvajes",
  "Ceniza de Guerra: Lanzamiento de dispersión",
  "Ceniza de Guerra: Lanzamiento perforante",
  "Ceniza de Guerra: Posición elevada",
  "Ceniza de Guerra: Punto ciego",
  "Ceniza de Guerra: Tajo rápido",
  "Ceniza de Guerra: Ensartado llameante",
  "Ceniza de Guerra: Lanza llameante",
  "Ceniza de Guerra: Soberanía cariana",
  "Ceniza de Guerra: Alarido de pesar",
  "Ceniza de Guerra: Embestida gravit. giratoria",
  "Ceniza de Guerra: Garra de león salvaje",
  "Ceniza de Guerra: Características del crisol (Alas)",
  "Ceniza de Guerra: Flor venenosa doble",
  "Ceniza de Guerra: Arremetida con escudo",
  "Ceniza de Guerra: Caza dracónica de Igon",
  "Ceniza de Guerra: Est. palma",
  "Ceniza de Guerra: Torb. hojaseca"
];

/**
 * Normaliza cadenas para comparaciones ignorando acentos y mayúsculas
 */
export function normalizeStr(str) {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extrae el número de página de la guía (progresión cronológica en el juego)
 */
export function getGuidePageNum(item) {
  if (!item || !item.fileKey) return 99999;
  const match = item.fileKey.match(/-p(\d+)\.php/i);
  return match ? parseInt(match[1], 10) : 99999;
}

/**
 * Retorna el rango canónico de una subcategoría según la categoría
 */
export function getSubcategoryGameRank(categoryId, subcategory) {
  if (!subcategory) return 999;
  let s = normalizeStr(subcategory);

  if (categoryId === 'armas') {
    if (s === 'espadon') s = 'espadones';
    if (s === 'espadon curvo') s = 'espadones curvos';
    if (s === 'gran catana') s = 'grandes catanas';
    if (s === 'espadon ligero') s = 'espadones ligeros';
    if (s === 'hoja de reves') s = 'hojas de reves';
    if (s === 'ballesta') s = 'ballestas';
    if (s === 'baston de piedra refulgente') s = 'bastones de piedra refulgente';
    if (s === 'sello sagrado') s = 'sellos sagrados';
    if (s === 'antorcha') s = 'antorchas';
    if (s === 'martillo') s = 'martillos';
    if (s === 'puno' || s === 'puños') s = 'punos';
    if (s === 'guadana' || s === 'guadañas') s = 'guadanas';
    if (s === 'mayal') s = 'mayales';

    const idx = WEAPON_TYPES_CANONICAL.indexOf(s);
    return idx === -1 ? 900 : idx;
  }

  if (categoryId === 'escudos') {
    if (s === 'pequeno' || s === 'pequenos' || s === 'escudo pequeno' || s === 'escudos pequenos') s = 'pequenos';
    if (s === 'mediano' || s === 'medianos' || s === 'escudo mediano' || s === 'escudos medianos') s = 'medianos';
    if (s === 'grande' || s === 'grandes' || s === 'escudo grande' || s === 'escudos grandes') s = 'grandes';
    const idx = SHIELD_TYPES_CANONICAL.indexOf(s);
    return idx === -1 ? 900 : idx;
  }

  if (categoryId === 'armaduras') {
    const idx = ARMOR_TYPES_CANONICAL.indexOf(s);
    return idx === -1 ? 900 : idx;
  }

  if (categoryId === 'cenizas-guerra') {
    const idx = ASHES_TYPES_CANONICAL.indexOf(s);
    return idx === -1 ? 900 : idx;
  }

  if (categoryId === 'objetos') {
    const idx = ITEM_TYPES_CANONICAL.indexOf(s);
    return idx === -1 ? 900 : idx;
  }

  return 0;
}

/**
 * Obtiene el rango exacto de un ítem según la lista canónica oficial de inventario por tipo
 */
export function getItemInventoryRank(item) {
  if (!item || !item.category) return -1;

  if (item.category === 'cenizas-espiritus') {
    return SPIRIT_ASHES_INVENTORY_ORDER.indexOf(item.name);
  }

  if (item.category === 'hechizos') {
    return SORCERIES_INVENTORY_ORDER.indexOf(item.name);
  }

  if (item.category === 'encantamientos') {
    return INCANTATIONS_INVENTORY_ORDER.indexOf(item.name);
  }

  if (item.category === 'talismanes') {
    return TALISMANS_INVENTORY_ORDER.indexOf(item.name);
  }

  if (item.category === 'cenizas-guerra') {
    return ASHES_OF_WAR_INVENTORY_ORDER.indexOf(item.name);
  }

  return -1;
}

/**
 * Ordena una lista de subcategorías según el orden canónico del juego
 */
export function sortSubcategoriesByGame(subcategories, categoryId) {
  return [...subcategories].sort((a, b) => {
    const rankA = getSubcategoryGameRank(categoryId, a);
    const rankB = getSubcategoryGameRank(categoryId, b);
    if (rankA !== rankB) return rankA - rankB;
    return a.localeCompare(b, 'es');
  });
}

/**
 * Ordena ítems del checklist según el orden canónico oficial de Elden Ring ("Ordenar por tipo").
 * Funciona de manera coherente con cualquier combinación de filtros:
 * - Todas las categorías, Juego Base solo, DLC solo, Ambos.
 * - Filtros de estado (Pendientes, Ya los tengo, Todos).
 * - Búsqueda textual y subcategorías.
 */
export function sortItems(items, sortOrder = 'game', categoryId = null) {
  if (!items || items.length === 0) return [];

  if (sortOrder === 'alpha') {
    return [...items].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }

  // 1. Ordenar por Potencia de Ataque físico (Mayor a menor)
  if (sortOrder === 'atk_desc') {
    return [...items].sort((a, b) => {
      const atkA = a.attackPower ?? -1;
      const atkB = b.attackPower ?? -1;
      if (atkA !== atkB) return atkB - atkA;
      return a.name.localeCompare(b.name, 'es');
    });
  }

  // 2. Ordenar por Peso (Menor a mayor - Más ligero primero)
  if (sortOrder === 'weight_asc') {
    return [...items].sort((a, b) => {
      const wA = a.weight ?? 999;
      const wB = b.weight ?? 999;
      if (wA !== wB) return wA - wB;
      return a.name.localeCompare(b.name, 'es');
    });
  }

  // 3. Ordenar por Peso (Mayor a menor - Más pesado primero)
  if (sortOrder === 'weight_desc') {
    return [...items].sort((a, b) => {
      const wA = a.weight ?? -1;
      const wB = b.weight ?? -1;
      if (wA !== wB) return wB - wA;
      return a.name.localeCompare(b.name, 'es');
    });
  }

  // 4. Modo canónico 'game' (Por tipo oficial del inventario de Elden Ring)
  return [...items].sort((a, b) => {
    // 1. Si son de diferente categoría principal (ej. compendio completo)
    if (a.category !== b.category) {
      const idxA = CANONICAL_CATEGORIES_ORDER.indexOf(a.category);
      const idxB = CANONICAL_CATEGORIES_ORDER.indexOf(b.category);
      const posA = idxA === -1 ? 999 : idxA;
      const posB = idxB === -1 ? 999 : idxB;
      if (posA !== posB) return posA - posB;
    }

    // 2. Si la categoría tiene orden canónico oficial de inventario por tipo
    const rankA = getItemInventoryRank(a);
    const rankB = getItemInventoryRank(b);
    if (rankA !== -1 && rankB !== -1) {
      if (rankA !== rankB) return rankA - rankB;
    } else if (rankA !== -1) {
      return -1;
    } else if (rankB !== -1) {
      return 1;
    }

    // 3. Si tienen subcategorías estructuradas (armas, escudos, armaduras, objetos)
    const subRankA = getSubcategoryGameRank(a.category, a.subcategory);
    const subRankB = getSubcategoryGameRank(b.category, b.subcategory);
    if (subRankA !== subRankB) return subRankA - subRankB;

    // 4. Base Game vs DLC para armas, escudos, armaduras, objetos, jefes
    if (a.isDlc !== b.isDlc) return a.isDlc ? 1 : -1;

    // 5. Progresión cronológica en el juego según la página canónica
    const pageA = getGuidePageNum(a);
    const pageB = getGuidePageNum(b);
    if (pageA !== pageB) return pageA - pageB;

    // 6. Desempate alfabético
    return a.name.localeCompare(b.name, 'es');
  });
}
