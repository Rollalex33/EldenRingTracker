#!/usr/bin/env node
/**
 * scripts/parseGuideData.js
 * 
 * Script de ingesta y parseo automatizado de guías de Elden Ring desde fuentes externas
 * (principalmente EliteGuías y MapGenie) al formato estructurado del Interactive Tracker.
 * 
 * Uso por CLI:
 *   node scripts/parseGuideData.js --demo
 *   node scripts/parseGuideData.js ruta/a/archivo.html --npc "Millicent" --url "https://www.eliteguias.com/guias/e/er/er_personajesXXX.php"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diccionario de regiones conocidas de The Lands Between y sus coordenadas planas [y, x] (5000 x 5000 px)
export const REGIONES_MAPA = {
  'Necrolimbo': { center: [1300, 2400], keywords: ['necrolimbo', 'lago agheel', 'iglesia de elleh', 'primer paso', 'tormenta', 'bosque neblinoso', 'cárcel eterna'] },
  'Colina de Tormentas': { center: [1650, 2200], keywords: ['colina de tormentas', 'margit', 'velo tormentoso', 'cabaña de roderika'] },
  'Castillo de Velo Tormentoso': { center: [1700, 2180], keywords: ['velo tormentoso', 'godrick', 'rogier', 'nepheli'] },
  'Península del Llanto': { center: [850, 2500], keywords: ['península del llanto', 'morne', 'castillo de morne', 'edgar', 'irina'] },
  'Liurnia': { center: [2100, 1600], keywords: ['liurnia', 'academia', 'raya lucaria', 'tres hermanas', 'torre de ranni', 'cúpula', 'lago de liurnia'] },
  'Caelid': { center: [1400, 3500], keywords: ['caelid', 'aeonia', 'pantano de aeonia', 'castillo de la melena roja', 'radahn', 'gowry', 'sellia'] },
  'Meseta de Altus': { center: [3000, 2400], keywords: ['altus', 'meseta de altus', 'elevador de dectus', 'molinos', 'domula', 'castillo sombrío'] },
  'Monte Gelmir': { center: [3100, 1800], keywords: ['monte gelmir', 'mansión del volcán', 'rykart', 'cometa azur', 'lava'] },
  'Leyndell, Capital Real': { center: [3000, 2850], keywords: ['leyndell', 'capital real', 'árbol áureo', 'morgott', 'godfrey'] },
  'Picos de los Gigantes': { center: [3600, 3800], keywords: ['picos de los gigantes', 'zamor', 'forja de los gigantes', 'fuego', 'nieve'] },
  'Campo Sacroníveo': { center: [4000, 3100], keywords: ['campo sacroníveo', 'sacroniveo', 'ordina', 'albanáuricos'] },
  'Farum Azula': { center: [2800, 4700], keywords: ['farum azula', 'farum', 'dúo sacrodermo', 'maliketh', 'placidusax'] },
  'Río Siofra': { center: [1400, 3350], keywords: ['siofra', 'nokron', 'ciudad eterna', 'ancestral', 'acueducto'] },
  'Curso del Río Ainsel': { center: [2400, 1600], keywords: ['ainsel', 'nokstella', 'astel', 'cascada de nokstella'] },
  'Árbol Hierático de Miquella': { center: [4700, 3100], keywords: ['árbol hierático', 'elphael', 'malenia', 'loretta'] },
  'Altar del Claro de Luna': { center: [1800, 1200], keywords: ['altar del claro de luna', 'manus celes', 'catedral de manus celes', 'adula'] },
};

// Palabras clave que alertan sobre misiones perdibles (missable content)
const MISSABLE_KEYWORDS = [
  'cuidado',
  'importante',
  'atención',
  'atencion',
  'punto de no retorno',
  'no hacer',
  'no mates',
  'no avances',
  'si avanzas',
  'se saltará',
  'se saltara',
  'perderás',
  'perderas',
  'desaparecerá',
  'desaparecera',
  'bloquea',
  'bloqueará',
  'antes de derrotar',
  'antes de hablar',
  'antes de activar',
];

/**
 * Limpia etiquetas HTML y normaliza espacios en blanco
 */
export function cleanHtmlText(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Infiere la región del juego analizando el texto del paso y título
 */
export function inferRegion(text) {
  const normalized = text.toLowerCase();
  for (const [regionName, config] of Object.entries(REGIONES_MAPA)) {
    for (const kw of config.keywords) {
      if (normalized.includes(kw)) {
        return regionName;
      }
    }
  }
  return 'Tierras Intermedias';
}

/**
 * Estima coordenadas planas [y, x] dentro del lienzo 5000x5000 a partir de la región inferida
 */
export function estimateCoords(region, index = 0) {
  const reg = REGIONES_MAPA[region] || { center: [2500, 2400] };
  const offsetY = ((index % 3) - 1) * 60;
  const offsetX = (Math.floor(index / 3) - 1) * 60;
  return [
    Math.round(reg.center[0] + offsetY),
    Math.round(reg.center[1] + offsetX),
  ];
}

/**
 * Detecta si el texto describe un paso perdible y extrae la advertencia
 */
export function detectMissable(text) {
  const lower = text.toLowerCase();
  const isMissable = MISSABLE_KEYWORDS.some((kw) => lower.includes(kw));

  if (!isMissable) {
    return { missable: false, advertenciaMissable: null };
  }

  // Extraer la oración o fragmento que contiene la advertencia
  const sentences = text.split(/(?<=[.!?])\s+/);
  const matchedSentence = sentences.find((s) =>
    MISSABLE_KEYWORDS.some((kw) => s.toLowerCase().includes(kw))
  );

  return {
    missable: true,
    advertenciaMissable: matchedSentence ? matchedSentence.trim() : text.slice(0, 180).trim(),
  };
}

/**
 * Genera un slug seguro para IDs (ej: "Ranni la Bruja" -> "ranni")
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Parsea contenido HTML o texto plano con formato de guía paso a paso de EliteGuías
 * 
 * @param {string} rawInput - Código HTML o texto plano de la guía
 * @param {object} options - Configuración adicional (npc, baseUrl, defaultCategory)
 * @returns {{ questline: object, locations: Array<object> }}
 */
export function parseEliteguiasGuide(rawInput, options = {}) {
  const npcName = options.npc || 'NPC Desconocido';
  const npcSlug = generateSlug(npcName).split('_')[0]; // Primer término (ej: "ranni", "millicent")
  const baseUrl = options.baseUrl || 'https://www.eliteguias.com/guias/e/er/';
  const questId = `quest_${npcSlug}`;

  // Buscar bloques de pasos. Soportamos divisiones comunes en EliteGuías:
  // - Encabezados tipo "Paso 1", "Paso 2"
  // - Etiquetas <h4>, <h3>, o párrafos que empiezan con "Paso X:" o números
  const rawClean = rawInput.replace(/\r\n/g, '\n');

  // Separar en secciones usando regex para detectar puntos de corte por pasos
  const stepRegex = /(?:<h[2-4][^>]*>|\n{2,}|<p>\s*<strong>)\s*(?:Paso\s*(\d+)[:.-]?|(\d+)[.:-])\s*([^<\n]+)(?:<\/h[2-4]>|<\/strong><\/p>)?/gi;

  const stepsMatches = [];
  let match;
  while ((match = stepRegex.exec(rawClean)) !== null) {
    stepsMatches.push({
      index: match.index,
      fullLength: match[0].length,
      stepNumber: parseInt(match[1] || match[2], 10),
      rawTitle: cleanHtmlText(match[3] || `Paso ${match[1] || match[2]}`),
    });
  }

  const parsedSteps = [];
  const generatedLocations = [];

  if (stepsMatches.length > 0) {
    for (let i = 0; i < stepsMatches.length; i++) {
      const current = stepsMatches[i];
      const startIndex = current.index + current.fullLength;
      const endIndex =
        i + 1 < stepsMatches.length ? stepsMatches[i + 1].index : rawClean.length;

      const rawStepContent = rawClean.substring(startIndex, endIndex);
      const cleanDesc = cleanHtmlText(rawStepContent);

      const order = current.stepNumber || i + 1;
      const stepIndexStr = String(order).padStart(2, '0');
      const pasoId = `${npcSlug}_${stepIndexStr}`;
      const locationId = `loc_${pasoId}_${generateSlug(current.rawTitle).slice(0, 18)}`;

      // Inferir región
      const fullTextToInspect = `${current.rawTitle} ${cleanDesc}`;
      const region = inferRegion(fullTextToInspect);

      // Detectar missable
      const { missable, advertenciaMissable } = detectMissable(fullTextToInspect);

      // Construir URL específica si el contenido tiene anclas
      const anchorMatch = rawStepContent.match(/id=["'](paso\d+|seccion\d+)["']/i);
      const anchor = anchorMatch ? `#${anchorMatch[1]}` : `#paso${order}`;
      const eliteguiasUrl = baseUrl.includes('#') ? baseUrl : `${baseUrl}${anchor}`;

      // Crear objeto del paso
      const pasoObj = {
        pasoId,
        orden: order,
        ubicacionNombre: current.rawTitle || `Encuentro con ${npcName}`,
        region,
        descripcion: cleanDesc || `Avanza en la misión de ${npcName} en esta ubicación.`,
        eliteguiasUrl,
        locationId,
        missable,
      };

      if (missable && advertenciaMissable) {
        pasoObj.advertenciaMissable = advertenciaMissable;
      }

      parsedSteps.push(pasoObj);

      // Crear entrada complementaria para locations.json
      generatedLocations.push({
        id: locationId,
        titulo: `${current.rawTitle} (${npcName})`,
        categoria: 'npcs',
        region,
        coords: estimateCoords(region, i),
        descripcion: cleanDesc.slice(0, 160) + (cleanDesc.length > 160 ? '...' : ''),
        eliteguiasUrl,
        questlinePasoId: pasoId,
        importante: missable || order === 1 || order === stepsMatches.length,
      });
    }
  } else {
    // Si no se detectaron encabezados "Paso X", procesar párrafos como pasos secuenciales
    const paragraphs = rawClean
      .split(/<\/p>|\n\n+/)
      .map(cleanHtmlText)
      .filter((p) => p.length > 30);

    paragraphs.forEach((pText, i) => {
      const order = i + 1;
      const stepIndexStr = String(order).padStart(2, '0');
      const pasoId = `${npcSlug}_${stepIndexStr}`;
      const region = inferRegion(pText);
      const locationId = `loc_${pasoId}`;
      const { missable, advertenciaMissable } = detectMissable(pText);

      const pasoObj = {
        pasoId,
        orden: order,
        ubicacionNombre: `${npcName} - Encuentro ${order}`,
        region,
        descripcion: pText,
        eliteguiasUrl: `${baseUrl}#paso${order}`,
        locationId,
        missable,
      };

      if (missable && advertenciaMissable) {
        pasoObj.advertenciaMissable = advertenciaMissable;
      }

      parsedSteps.push(pasoObj);

      generatedLocations.push({
        id: locationId,
        titulo: `${npcName} en ${region}`,
        categoria: 'npcs',
        region,
        coords: estimateCoords(region, i),
        descripcion: pText.slice(0, 150) + '...',
        eliteguiasUrl: `${baseUrl}#paso${order}`,
        questlinePasoId: pasoId,
        importante: missable,
      });
    });
  }

  const questline = {
    id: questId,
    npc: npcName,
    icono: options.icono || 'user',
    pasos: parsedSteps,
  };

  return {
    questline,
    locations: generatedLocations,
  };
}

// ==========================================
// MODO DEMO / CLI EXECUTION
// ==========================================
const SAMPLE_ELITEGUIAS_INPUT = `
<h1>Misión de Millicent</h1>
<p>Guía de personajes de Elden Ring: Millicent</p>

<h3>Paso 1: Choza de Gowry en Caelid</h3>
<p>Habla con el sabio Gowry en su choza al este de Sellia, en Caelid. Te pedirá que derrotes al Comandante O'Neil en el Pantano de Aeonia para conseguir la Aguja de oro puro que puede curar la podredumbre roja.</p>

<h3>Paso 2: Iglesia de la Plaga</h3>
<p>Tras reparar la aguja, dirígete a la Iglesia de la Plaga en lo alto de la colina de Sellia. Dale la aguja a Millicent para salvar su vida. <strong>Cuidado:</strong> Si avanzas a la Meseta de Altus sin entregarle la aguja aquí, se bloqueará este tramo de su historia y no recibirás el Talismán de la espada de la reliquia.</p>

<h3>Paso 3: Colina del Árbol Áureo en Altus</h3>
<p>Encuentra a Millicent en la Meseta de Altus, cerca de la colina con vistas a las murallas. Te mencionará que sin su brazo derecho no puede blandir una espada. Debes viajar al Castillo Sombrío al norte para recuperar la Prótesis de la valquiria custodiada por un Caballero de la Limpieza.</p>

<h3>Paso 4: Colina de los Molinos de Viento</h3>
<p>En el pueblo de Domula (Molinos de Viento), derrota al Apóstol Sacrodermo en la cima. Tras descansar en la Gracia, Millicent aparecerá allí agradecida por haberle devuelto su destreza en combate.</p>

<h3>Paso 5: Elphael, tutor del Árbol Hierático</h3>
<p>En las profundidades del Árbol Hierático, en la zona de la cascada de podredumbre, ayuda a Millicent interactuando con su señal dorada para combatir contra sus cuatro hermanas. <strong>Importante:</strong> No saltes sobre su cuerpo después de la pelea porque un solo punto de daño la matará y fallará la misión.</p>
`;

if (process.argv.includes('--demo')) {
  console.log('--- EJECUTANDO DEMO DE PARSEO DE DATOS ELITEGUÍAS ---');
  const result = parseEliteguiasGuide(SAMPLE_ELITEGUIAS_INPUT, {
    npc: 'Millicent',
    icono: 'sparkles',
    baseUrl: 'https://www.eliteguias.com/guias/e/er/er_personajes019.php',
  });

  console.log('\n[1] QUESTLINE ESTRUCTURADA:');
  console.log(JSON.stringify(result.questline, null, 2));

  console.log('\n[2] ENTRADAS COMPLEMENTARIAS PARA LOCATIONS.JSON:');
  console.log(JSON.stringify(result.locations, null, 2));
  console.log(`\n¡Parseo exitoso! Total de pasos procesados: ${result.questline.pasos.length}`);
} else if (process.argv.length > 2 && !process.argv[2].startsWith('--')) {
  const filePath = process.argv[2];
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const npcArgIndex = process.argv.indexOf('--npc');
    const npcName = npcArgIndex !== -1 ? process.argv[npcArgIndex + 1] : 'NPC Parseado';
    const result = parseEliteguiasGuide(content, { npc: npcName });
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.error(`Archivo no encontrado: ${filePath}`);
  }
}

export default parseEliteguiasGuide;
