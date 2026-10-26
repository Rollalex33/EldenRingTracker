/**
 * Datos y Fórmulas Canónicas de Bloodborne (FromSoftware)
 */

export const BB_ORIGINS = [
  { id: 'lone_survivor', name: 'Único superviviente', level: 10, desc: 'Alto vigor, resistencia media y atributos balanceados.', stats: { vit: 14, res: 11, fue: 11, hab: 10, viv: 7, arc: 7 } },
  { id: 'troubled_childhood', name: 'Infancia dura', level: 10, desc: 'Alta resistencia y gran destreza física para esquivas continuas.', stats: { vit: 9, res: 14, fue: 9, hab: 13, viv: 6, arc: 9 } },
  { id: 'military_veteran', name: 'Pasado militar', level: 10, desc: 'La mejor opción para builds de Calidad (Fuerza y Habilidad puras).', stats: { vit: 12, res: 10, fue: 14, hab: 13, viv: 7, arc: 6 } },
  { id: 'professional', name: 'Profesional', level: 10, desc: 'Dominio de la Habilidad y daño de ataques viscerales críticos.', stats: { vit: 9, res: 12, fue: 9, hab: 15, viv: 7, arc: 8 } },
  { id: 'noble_scion', name: 'Tronco noble', level: 10, desc: 'Ideal para Chikage y armas de Viveza de Sangre letal.', stats: { vit: 7, res: 8, fue: 9, hab: 13, viv: 14, arc: 9 } },
  { id: 'cruel_fate', name: 'Destino cruel', level: 10, desc: 'El origen rey para cazadores arcanos y herramientas del cosmos.', stats: { vit: 10, res: 12, fue: 10, hab: 9, viv: 5, arc: 14 } },
  { id: 'violent_past', name: 'Pasado violento', level: 10, desc: 'Fuerza descomunal para Espadón de Ludwig, Rueda de Logarius y Hacha.', stats: { vit: 12, res: 11, fue: 15, hab: 9, viv: 6, arc: 7 } },
  { id: 'waste_of_skin', name: 'Desperdicio de vida', level: 4, desc: 'Nivel 4 mínimo para optimización PvP meta (BL 120) a medida.', stats: { vit: 10, res: 9, fue: 10, hab: 9, viv: 7, arc: 9 } },
];

export const BB_PRESETS = [
  {
    id: 'bb_quality_ludwig',
    name: 'Espadón Sagrado de Calidad',
    archetype: 'Fuerza / Habilidad (50/50)',
    desc: 'El arquetipo más demoledor del juego base. Daño bruto visceral e interrupción con la Espada Sagrada de Ludwig.',
    targetStats: { vit: 50, res: 25, fue: 50, hab: 50, viv: 7, arc: 8 },
    mainWeapon: 'Espada sagrada de Ludwig',
    sideWeapon: 'Pistola de cazador / Trabuco',
    runes: ['Comunión (+Viales)', 'Metamorfosis horaria (+15% PS)', 'Metamorfosis antihoraria (+20% RES)', 'Cazador'],
  },
  {
    id: 'bb_blood_chikage',
    name: 'Samurái Carmesí de Cainhurst',
    archetype: 'Viveza de Sangre (Chikage + Evelyn)',
    desc: 'Desata el poder de la sangre con cortes envainados y disparos devastadores de Evelyn potenciados con Ceniza de Tuétano.',
    targetStats: { vit: 50, res: 20, fue: 14, hab: 25, viv: 50, arc: 6 },
    mainWeapon: 'Chikage (Forma sangrienta)',
    sideWeapon: 'Evelyn (+10)',
    runes: ['Comunión', 'Ruptura de sangre (+PS en visceral)', 'Garras de luna (+Ecos)', 'Sangrevil'],
  },
  {
    id: 'bb_pure_arcane',
    name: 'Erudito Cósmico de Byrgenwerth',
    archetype: 'Arcano Puro 99 (Herramientas Celestiales)',
    desc: 'Escalado sin límite con Augurio de Ebrietas, Guantes de Verdugo y Una Llamada del Más Allá.',
    targetStats: { vit: 40, res: 15, fue: 16, hab: 12, viv: 5, arc: 99 },
    mainWeapon: 'Parásito de Kos / Espadón Luna Sagrada',
    sideWeapon: 'Rociador de llamas',
    runes: ['Semillero (DLC)', 'Ojo (+Descubrimiento)', 'Comunión (+Viales)', 'Metamorfosis horaria'],
  },
  {
    id: 'bb_skill_visceral',
    name: 'Cazador Cuervo de Eileen',
    archetype: 'Habilidad Pura (Hoja de Piedad / Rakuyo)',
    desc: 'Velocidad ultrasónica de corte con el mayor daño crítico visceral por parry de todo Bloodborne.',
    targetStats: { vit: 50, res: 30, fue: 10, hab: 50, viv: 9, arc: 15 },
    mainWeapon: 'Hoja de piedad / Rakuyo',
    sideWeapon: 'Pistola de cazador',
    runes: ['Cazador (Regen Resistencia)', 'Metamorfosis antihoraria', 'Ojo', 'Comunión'],
  },
];

export const BB_COLDBLOOD_DATA = [
  { id: 'cb1', name: 'Rocío de sangre fría [1]', value: 350 },
  { id: 'cb2', name: 'Rocío de sangre fría [2]', value: 500 },
  { id: 'cb3', name: 'Rocío de sangre fría [3]', value: 1000 },
  { id: 'cb4', name: 'Rocío de sangre fría [4]', value: 1200 },
  { id: 'cb5', name: 'Rocío de sangre fría [5]', value: 1500 },
  { id: 'cb6', name: 'Rocío de sangre fría [6]', value: 1800 },
  { id: 'cb7', name: 'Rocío de sangre fría [7]', value: 2000 },
  { id: 'cb8', name: 'Rocío de sangre fría [8]', value: 3000 },
  { id: 'cb9', name: 'Rocío de sangre fría [9]', value: 5000 },
  { id: 'cb10', name: 'Sangre fría de pariente [10]', value: 8000 },
  { id: 'cb11', name: 'Sangre fría de pariente [11]', value: 10000 },
  { id: 'cb12', name: 'Sangre fría de pariente [12]', value: 20000 },
  { id: 'cb13', name: 'Gran sangre fría [13]', value: 40000 },
  { id: 'cb14', name: 'Vieja sangre de pariente (DLC)', value: 50000 },
];

export function getBloodEchoCost(level) {
  if (level <= 0) return 0;
  if (level < 12) {
    const baseTable = [0, 673, 689, 706, 723, 740, 757, 775, 793, 811, 829, 847];
    return baseTable[level] || 700;
  }
  const cost = 0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895;
  return Math.floor(cost);
}

export function getTotalEchoesBetween(startLvl, targetLvl) {
  if (targetLvl <= startLvl) return 0;
  let total = 0;
  for (let l = startLvl; l < targetLvl; l++) {
    total += getBloodEchoCost(l);
  }
  return total;
}

export const CHALICE_ROUTE_STEPS = [
  {
    step: 1,
    title: 'Cáliz de Pthumeru (Profundidad 1)',
    bosses: ['Gigante no muerto', 'Mercenarios despiadados', 'Perro guardián de los Antiguos Señores'],
    loot: 'Cáliz de Pthumeru Central. Recoger Sangre Ritual (2).',
  },
  {
    step: 2,
    title: 'Cáliz de Pthumeru Central (Profundidad 2)',
    bosses: ['Descendiente Pthumerio', 'Jabalí caníbal', 'Bestia poseída por la sombra'],
    loot: 'Cáliz de Pthumeru Inferior. Sangre Ritual (3).',
  },
  {
    step: 3,
    title: 'Cáliz de Pthumeru Inferior (Profundidad 3)',
    bosses: ['Gigante no muerto', 'Mercenarios despiadados', 'Rom la Araña Vacua de Cáliz', 'Descendiente Pthumerio'],
    loot: 'Cáliz de la Raíz. Recoger Sangre Ritual (4).',
  },
  {
    step: 4,
    title: 'Cáliz de Afligido Loran (Profundidad 4)',
    bosses: ['Bestia de la Sangre', 'Bestia Clérigo de Loran', 'Monstruo Sangriento'],
    loot: '¡CLAVE! Obtener 4 Hilos Rojos (Bastardo de Loran) y la Garra de Bestia (necesaria para trofeo de armas).',
  },
  {
    step: 5,
    title: 'Cáliz Profanado / Maldito (Profundidad 4)',
    bosses: ['Guardián de los Antiguos Señores', 'Perro guardián de fuego (¡Paciencia!)', 'Amygdala Profanada'],
    loot: '¡ATENCIÓN! Tu salud máxima se reduce permanentemente al 50%. Superar a Amygdala otorga el Gran Cáliz de Pthumeru Ihyll.',
  },
  {
    step: 6,
    title: 'Gran Cáliz de Pthumeru Ihyll (Profundidad 5 - FINAL)',
    bosses: ['Descendiente Pthumerio', 'Bestia Sangrienta sin Cabeza', 'YHARNAM, REINA DE PTHUMERU'],
    loot: 'Derrotar a la Reina Yharnam desbloquea el Trofeo de Oro "Yharnam, Reina Pthumeria", paso indispensable hacia el Platino.',
  },
];

export const POPULAR_GLYPHS = [
  { glyph: 'cummmfpk', name: 'Cáliz Maldito Triple (Farmeo Rápido)', desc: 'Espera en la primera sala a que un cazador muera a distancia: +83,000 ecos en 12 segundos sin pelear.' },
  { glyph: 'pw8ykpwu', name: 'Gemas Radiales de Daño Físico +27.2%', desc: 'Derrota a los 3 Mercenarios en Nivel 1. La gema reina para armas de combate.' },
  { glyph: '5pw3tngr', name: 'Gemas Triangulares Físicas +27.2%', desc: 'Cáliz Isz. Farmear al trío del primer nivel para maximizar tu arma en la ranura triángulo.' },
  { glyph: 'kxb36fup', name: 'Armas Perdidas y Misteriosas Gratis', desc: 'Abre el primer cofre antes de la sala del jefe para conseguir variantes de armas con ranuras perfectas.' },
];

export const REFUGEE_CHOICES = [
  {
    name: 'Arianna, Mujer de la Noche',
    location: 'Distrito de la Catedral (Callejón)',
    oedonReward: 'Segura. Da sangre especial y el Tercio de Cordón Umbilical al final de su embarazo cósmico.',
    iosefkaReward: 'Transformada en criatura celestial. Pierdes su Cordón Umbilical para el final secreto.',
    warning: '¡NUNCA envíes al Mendigo Sospechoso a Oedon mientras Arianna esté allí o la asesinará!',
  },
  {
    name: 'Adella la Monja',
    location: 'Hypogean Gaol (Cárcel de Yahar’gul, en el sótano con atuendo de la Iglesia)',
    oedonReward: 'Segura. Te da su sangre. Si aceptas sangre de Arianna repetidamente frente a ella, entrará en celos asesinos.',
    iosefkaReward: 'Transformada en criatura celestial alienígena.',
  },
  {
    name: 'Anciana Quejica',
    location: 'Centro de Yharnam tras la jaula de perros',
    oedonReward: 'Te entrega sedantes. Si pides demasiados sedantes, se vuelve loca y muere en el cementerio.',
    iosefkaReward: 'Transformada en alienígena.',
  },
  {
    name: 'Mendigo Sospechoso (¡PELIGRO CRÍTICO!)',
    location: 'Bosque Prohibido (techo comiendo cadáveres)',
    oedonReward: '¡NO ENVIAR! Es una Bestia Abominable disfrazada. Cada vez que salgas matará a uno de los supervivientes de la capilla.',
    iosefkaReward: 'Envíalo a la Clínica de Iosefka (donde Iosefka lo enfrentará) o enfréntalo en el tejado con veneno.',
  },
];

export const INSIGHT_THRESHOLDS = [
  { level: 1, effect: 'Despierta la Muñeca en el Sueño del Cazador para poder subir de nivel.' },
  { level: 10, effect: 'Abre la Tienda de Lucidez de los Mensajeros en la cornisa superior del Sueño.' },
  { level: 15, effect: 'Los enemigos de la Catedral ganan nuevos ataques mágicos con crucifijos y ojos proyectados.' },
  { level: 40, effect: 'Puedes ver las descomunales Amygdalas Cósmicas colgadas de los muros antes de la Luna Roja.' },
  { level: 60, effect: 'La tienda de Lucidez permite comprar Rocas de Sangre (+10) por 60 unidades de Lucidez.' },
  { level: 'Nota', effect: 'A MAYOR Lucidez, MENOR es tu resistencia contra el FRENESÍ y menor la barra de Bestialidad acumulable.' },
];
