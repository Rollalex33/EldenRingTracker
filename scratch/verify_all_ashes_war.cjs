const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const allAshes = cat.items.filter(i => i.category === 'cenizas-guerra');

// Orden oficial de Cenizas de Guerra por afinidad y tipo de inventario
const baseAshesOrdered = [
  // Guías y herramientas especiales de cenizas
  'Cuchillo de afilar',
  'Cenizas de guerra perdidas',
  'Maestro herrero Hewg',
  'Roderika',

  // Físicas / Estándar / Pesadas / Ligeras / Calidad
  'Ceniza de Guerra: Pisotón y tajo vertical',
  'Ceniza de Guerra: Pisotón y barrido',
  'Ceniza de Guerra: Frenesí',
  'Ceniza de Guerra: Garra de león',
  'Ceniza de Guerra: Hoja rocosa',
  'Ceniza de Guerra: Patada',
  'Ceniza de Guerra: Indómito',
  'Ceniza de Guerra: Culada',
  'Ceniza de Guerra: Sacudida',
  'Ceniza de Guerra: Sacudida de Hoarah Loux',
  'Ceniza de Guerra: Grito de guerra',
  'Ceniza de Guerra: Rugido bárbaro',
  'Ceniza de Guerra: Rugido jactancioso',
  'Ceniza de Guerra: Rugido de trol',
  'Ceniza de Guerra: Tajo giratorio',
  'Ceniza de Guerra: Embestida empaladora',
  'Ceniza de Guerra: Combate',
  'Ceniza de Guerra: Embestida reiterada',
  'Ceniza de Guerra: Tajo doble',
  'Ceniza de Guerra: Danza de espadas',
  'Ceniza de Guerra: Desenvainar',
  'Ceniza de Guerra: Quiebro',
  'Ceniza de Guerra: Paso del sabueso',
  'Ceniza de Guerra: Rapaz de la neblina',
  'Ceniza de Guerra: Rugido de bestia',
  'Ceniza de Guerra: Carga al frente',
  'Ceniza de Guerra: Ataque tormentoso',
  'Ceniza de Guerra: Caza del gigante',
  'Ceniza de Guerra: Hoja tormentosa',
  'Ceniza de Guerra: Invocador de tormentas',
  'Ceniza de Guerra: Pisotón tormentoso',
  'Ceniza de Guerra: Corte de vacío',
  'Ceniza de Guerra: Tajo fantasma',
  'Ceniza de Guerra: Determinación',
  'Ceniza de Guerra: Resolución de caballero real',

  // Mágicas / Frío
  'Ceniza de Guerra: Guijarro de piedras refulgentes',
  'Ceniza de Guerra: Espadón cariano',
  'Ceniza de Guerra: Majestuosidad cariana',
  'Ceniza de Guerra: Arma giratoria',
  'Ceniza de Guerra: Tajo de Loretta',
  'Ceniza de Guerra: Gravitas',
  'Ceniza de Guerra: Olas de oscuridad',
  'Ceniza de Guerra: Lanza helada',
  'Ceniza de Guerra: Niebla escalofriante',
  'Ceniza de Guerra: Pisotón escarchado',

  // Ígneas / Llameantes
  'Ceniza de Guerra: Golpe llameante',
  'Ceniza de Guerra: Llama de los Melena Roja',
  'Ceniza de Guerra: Erupción',
  'Ceniza de Guerra: Carga de prelado',
  'Ceniza de Guerra: Tornado de la llama negra',

  // Fulgurantes
  'Ceniza de Guerra: Rayo',
  'Ceniza de Guerra: Tajo fulgurante',
  'Ceniza de Guerra: Ariete fulgurante',

  // Sagradas
  'Ceniza de Guerra: Hoja sagrada',
  'Ceniza de Guerra: Golpe devoto',
  'Ceniza de Guerra: Anillo de luz sagrado',
  'Ceniza de Guerra: Orden sagrada',
  'Ceniza de Guerra: Orden común',
  'Ceniza de Guerra: Tierra Dorada',
  'Ceniza de Guerra: Culada áurea',
  'Ceniza de Guerra: Juramento dorado',
  'Ceniza de Guerra: Juramento del indómito',
  'Ceniza de Guerra: Suelo sagrado',

  // Venenosas / Sangrientas / Ocultas
  'Ceniza de Guerra: Niebla venenosa',
  'Ceniza de Guerra: Vuelo de polilla venenosa',
  'Ceniza de Guerra: Filosanguino',
  'Ceniza de Guerra: Laceración',
  'Ceniza de Guerra: Tributo de sangre',
  'Ceniza de Guerra: Seppuku',
  'Ceniza de Guerra: Jabalina espectral',
  'Ceniza de Guerra: Puño robavida',
  'Ceniza de Guerra: Cebo de la sombra blanca',
  'Ceniza de Guerra: Técnica de asesino',

  // Arcos
  'Ceniza de Guerra: Disparo poderoso',
  'Ceniza de Guerra: De punta en el blanco',
  'Ceniza de Guerra: Aluvión',
  'Ceniza de Guerra: Disparo en picado',
  'Ceniza de Guerra: Disparo encantado',
  'Ceniza de Guerra: Lluvia de flechas',

  // Escudos
  'Ceniza de Guerra: Elusión',
  'Ceniza de Guerra: Elusión dorada',
  'Ceniza de Guerra: Muro tormentoso',
  'Ceniza de Guerra: Golpe de escudo',
  'Ceniza de Guerra: Impacto de escudo',
  'Ceniza de Guerra: Escudo barricada',
  'Ceniza de Guerra: Barrera de Thops',
  'Ceniza de Guerra: Contraataque cariano',
  'Ceniza de Guerra: Sin habilidad'
];

const dlcAshes = allAshes.filter(i => i.isDlc).map(i => i.name);
const fullAshesOrder = [...baseAshesOrdered, ...dlcAshes];

console.log('Total catalog ashes:', allAshes.length);
console.log('Total full defined:', fullAshesOrder.length);

const catNames = new Set(allAshes.map(a => a.name));
const missingInCat = fullAshesOrder.filter(n => !catNames.has(n));
console.log('Missing in catalog:', missingInCat);

const missingInDef = allAshes.filter(a => !fullAshesOrder.includes(a.name)).map(a => a.name);
console.log('Missing in defined:', missingInDef);
