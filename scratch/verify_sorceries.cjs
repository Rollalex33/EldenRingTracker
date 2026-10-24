const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('./src/data/checklistCatalog.json', 'utf8'));
const baseSorceries = cat.items.filter(i => i.category === 'hechizos' && !i.isDlc);

const sorceriesOrder = [
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
  'Invocaciones tibiales'
];

console.log('Defined sorceries count:', sorceriesOrder.length);
console.log('Catalog count:', baseSorceries.length);

const catalogNames = new Set(baseSorceries.map(i => i.name));
const missingInCatalog = sorceriesOrder.filter(name => !catalogNames.has(name));
console.log('Missing in catalog:', missingInCatalog);

const missingInDefined = baseSorceries.filter(i => !sorceriesOrder.includes(i.name)).map(i => i.name);
console.log('Missing in defined:', missingInDefined);
