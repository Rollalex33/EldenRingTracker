import { calcMaxEquipLoad } from '../components/Calculator/EquipLoadModal';

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

/**
 * Calcula el nivel en Elden Ring a partir de la clase y los stats asignados
 */
export function calcEldenLevel(startingClassId, stats) {
  const cls = STARTING_CLASSES.find((c) => c.id === startingClassId) || STARTING_CLASSES[0];
  const baseStatSum = Object.values(cls.stats).reduce((a, b) => a + b, 0);
  const currentStatSum = Object.values(stats || cls.stats).reduce((a, b) => a + b, 0);
  return cls.level + Math.max(0, currentStatSum - baseStatSum);
}

/**
 * Calcula el nivel de sangre (BL) en Bloodborne a partir del origen y los stats asignados
 */
export function calcBBLevel(originId, stats) {
  const ori = BB_ORIGINS.find((o) => o.id === originId) || BB_ORIGINS[0];
  const baseStatSum = Object.values(ori.stats).reduce((a, b) => a + b, 0);
  const currentStatSum = Object.values(stats || ori.stats).reduce((a, b) => a + b, 0);
  return ori.level + Math.max(0, currentStatSum - baseStatSum);
}

/**
 * Calcula HP aproximado en Elden Ring según Vigor
 */
export function calcEldenHP(vig) {
  if (vig <= 25) return Math.floor(300 + 500 * Math.pow((vig - 1) / 24, 1.5));
  if (vig <= 40) return Math.floor(800 + 650 * Math.pow((vig - 25) / 15, 1.1));
  if (vig <= 60) return Math.floor(1450 + 450 * (1 - Math.pow(1 - (vig - 40) / 20, 1.2)));
  return Math.floor(1900 + 200 * (1 - Math.pow(1 - (vig - 60) / 39, 1.2)));
}

/**
 * Calcula FP en Elden Ring según Mente
 */
export function calcEldenFP(mte) {
  if (mte <= 15) return Math.floor(50 + 45 * ((mte - 1) / 14));
  if (mte <= 35) return Math.floor(95 + 105 * ((mte - 15) / 20));
  if (mte <= 60) return Math.floor(200 + 150 * ((mte - 35) / 25));
  return Math.floor(350 + 100 * ((mte - 60) / 39));
}

/**
 * Calcula Stamina en Elden Ring según Aguante
 */
export function calcEldenStamina(agu) {
  if (agu <= 15) return Math.floor(80 + 25 * ((agu - 1) / 14));
  if (agu <= 30) return Math.floor(105 + 25 * ((agu - 15) / 15));
  if (agu <= 50) return Math.floor(130 + 25 * ((agu - 30) / 20));
  return Math.floor(155 + 15 * ((agu - 50) / 49));
}

/**
 * Calcula el peso total del equipamiento activo en Elden Ring
 */
export function calcEldenEquippedWeight(equipped) {
  if (!equipped) return 0;
  let total = 0;
  if (equipped.mainWeapon?.weight) total += Number(equipped.mainWeapon.weight);
  if (equipped.offhandWeapon?.weight) total += Number(equipped.offhandWeapon.weight);
  if (equipped.armorHead?.weight) total += Number(equipped.armorHead.weight);
  if (equipped.armorChest?.weight) total += Number(equipped.armorChest.weight);
  if (equipped.armorHands?.weight) total += Number(equipped.armorHands.weight);
  if (equipped.armorLegs?.weight) total += Number(equipped.armorLegs.weight);
  if (Array.isArray(equipped.talismans)) {
    equipped.talismans.forEach((t) => {
      if (t?.weight) total += Number(t.weight);
    });
  }
  return total;
}

/**
 * Determina el tier de rodamiento en Elden Ring
 */
export function getRollTier(currentWeight, maxEquipLoad) {
  if (maxEquipLoad <= 0) return { name: 'Medio', ratio: 50, color: 'text-amber-400', badge: 'bg-amber-950/80 border-amber-500/50 text-amber-200' };
  const ratio = (currentWeight / maxEquipLoad) * 100;
  if (ratio < 30) {
    return { name: 'Ligero', ratio, color: 'text-emerald-400', badge: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200', desc: 'Rápido con mayor ventana de invulnerabilidad' };
  }
  if (ratio <= 70) {
    return { name: 'Medio', ratio, color: 'text-amber-400', badge: 'bg-amber-950/80 border-amber-500/50 text-amber-200', desc: 'El estándar balanceado más seguro' };
  }
  if (ratio <= 100) {
    return { name: 'Pesado (Fat Roll)', ratio, color: 'text-rose-400', badge: 'bg-rose-950/80 border-rose-500/50 text-rose-200', desc: 'Lento, consume más estamina y recupera tarde' };
  }
  return { name: 'Sobrecargado', ratio, color: 'text-red-500', badge: 'bg-red-950 border-red-500 text-red-200 font-bold', desc: 'No puedes rodar ni correr' };
}

/**
 * Calcula HP en Bloodborne según Vitalidad
 */
export function calcBBHP(vit) {
  if (vit <= 10) return Math.floor(500 + (vit - 10) * 30);
  if (vit <= 30) return Math.floor(532 + (vit - 10) * 28.4);
  if (vit <= 50) return Math.floor(1100 + (vit - 30) * 20);
  return Math.floor(1500 + (vit - 50) * 7.5);
}

/**
 * Calcula Estamina en Bloodborne según Resistencia
 */
export function calcBBStamina(res) {
  if (res <= 40) return Math.floor(80 + res * 2);
  return Math.floor(160 + (res - 40) * 0.2);
}

/**
 * Calcula el rango de invasión / cooperativo en Bloodborne
 */
export function calcBBPvpRange(bl) {
  const lower = Math.max(1, Math.floor(bl - 10 - bl * 0.1));
  const upper = Math.floor(bl + 10 + bl * 0.1);
  return `${lower} - ${upper}`;
}
