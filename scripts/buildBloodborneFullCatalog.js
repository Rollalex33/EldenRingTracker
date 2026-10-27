import fs from 'fs';
import path from 'path';
import { decodeHtml, parseGuideHtml } from '../src/utils/guideParser.js';

const CACHE_DIR = 'public/guide-cache';
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  const buf = await res.arrayBuffer();
  return new TextDecoder('iso-8859-1').decode(buf);
}

// 1. Fetch DLC index to know which items are DLC
async function getDlcFileKeys() {
  const dlcKeys = new Set();
  try {
    const html = await fetchPage('https://www.eliteguias.com/guias/b/bb/bloodborne_antiguos-cazadores.php');
    const regex = /href=[\"']([^\"']+\.php)[\"']/gi;
    let m;
    while ((m = regex.exec(html)) !== null) {
      const file = m[1].split('/').pop();
      if (file.startsWith('bloodborne_') && file.includes('-p')) {
        dlcKeys.add(file);
      }
    }
  } catch (e) {
    console.error('Error fetching DLC index:', e.message);
  }
  return dlcKeys;
}

// 2. Discover items from category pages
async function discoverItems() {
  const dlcKeys = await getDlcFileKeys();
  console.log(`Identified ${dlcKeys.size} DLC item keys.`);

  const categoryConfigs = [
    {
      id: 'armas',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_armas.php',
      defaultCat: 'armas_truco',
      name: 'Armas',
    },
    {
      id: 'atuendos',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_atuendos.php',
      defaultCat: 'atuendos',
      name: 'Atuendos y Sets',
    },
    {
      id: 'escudos',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_escudos.php',
      defaultCat: 'escudos',
      name: 'Escudos',
    },
    {
      id: 'objetos',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_objetos.php',
      defaultCat: 'objetos',
      name: 'Objetos',
    },
    {
      id: 'runas_caryll',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_runas-de-caryll.php',
      defaultCat: 'runas_caryll',
      name: 'Runas de Caryll',
    },
    {
      id: 'juramentos',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_juramentos.php',
      defaultCat: 'juramentos',
      name: 'Juramentos',
    },
    {
      id: 'jefazos',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss.php',
      defaultCat: 'jefazos',
      name: 'Jefazos',
    },
    {
      id: 'personajes',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_personajes.php',
      defaultCat: 'personajes',
      name: 'Personajes',
    },
    {
      id: 'gemas',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_gemas-sangrientas.php',
      defaultCat: 'gemas',
      name: 'Gemas Sangrientas',
    },
    {
      id: 'calices',
      url: 'https://www.eliteguias.com/guias/b/bb/bloodborne_mazmorra-caliz.php',
      defaultCat: 'calices',
      name: 'Mazmorras del Cáliz',
    },
  ];

  const itemsMap = new Map();

  for (const cfg of categoryConfigs) {
    try {
      console.log(`Scanning category index: ${cfg.name} (${cfg.url})...`);
      const html = await fetchPage(cfg.url);

      // 2a. Capture links BEFORE first <h3> (e.g. base characters, wooden shield)
      const firstH3Index = html.indexOf('<h3');
      const introHtml = firstH3Index > -1 ? html.substring(0, firstH3Index) : html;
      const introLinkRegex = /<a\s+[^>]*href=[\"']([^\"']+)[\"'][^>]*>(.*?)<\/a>/gi;
      let ilMatch;
      while ((ilMatch = introLinkRegex.exec(introHtml)) !== null) {
        const href = ilMatch[1].split('/').pop();
        const rawName = decodeHtml(ilMatch[2].replace(/<[^>]+>/g, '').trim());
        if (href.startsWith('bloodborne_') && href.includes('-p') && rawName && !rawName.startsWith('-')) {
          if (!itemsMap.has(href)) {
            let itemCat = cfg.defaultCat;
            if (cfg.id === 'armas') {
              itemCat = rawName.includes('Pistola') || rawName.includes('Trabuco') || rawName.includes('Fusil') || rawName.includes('Cañón') || rawName.includes('Antorcha') ? 'armas_fuego' : 'armas_truco';
            }
            itemsMap.set(href, {
              fileKey: href,
              name: rawName,
              category: itemCat,
              subcategory: 'Juego Base',
              isDlc: false,
              expansion: 'base',
              url: `https://www.eliteguias.com/guias/b/bb/${href}`,
            });
          }
        }
      }

      // 2b. Parse sections with <h3>
      const sectionRegex = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi;
      let sMatch;

      while ((sMatch = sectionRegex.exec(html)) !== null) {
        const rawSubcat = decodeHtml(sMatch[1].replace(/<[^>]+>/g, '').trim());
        const subcatHtml = sMatch[2];

        // Find links in this section
        const linkRegex = /<a\s+[^>]*href=[\"']([^\"']+)[\"'][^>]*>(.*?)<\/a>/gi;
        let lMatch;
        while ((lMatch = linkRegex.exec(subcatHtml)) !== null) {
          const href = lMatch[1].split('/').pop();
          const rawName = decodeHtml(lMatch[2].replace(/<[^>]+>/g, '').trim());

          if (href.startsWith('bloodborne_') && href.includes('-p') && rawName && !rawName.startsWith('-')) {
            const isDlc = dlcKeys.has(href) || rawSubcat.toLowerCase().includes('dlc') || rawSubcat.toLowerCase().includes('antiguos');

            let itemCat = cfg.defaultCat;
            let subcat = rawSubcat;

            // Specific overrides
            if (cfg.id === 'armas') {
              if (rawSubcat.toLowerCase().includes('fuego') || rawName.includes('Pistola') || rawName.includes('Trabuco') || rawName.includes('Fusil') || rawName.includes('Cañón') || rawName.includes('Antorcha') || rawName.includes('Evelyn') || rawName.includes('Rociador') || rawName.includes('Romero') || rawName.includes('Gatling') || rawName.includes('Puño')) {
                itemCat = 'armas_fuego';
              } else {
                itemCat = 'armas_truco';
              }
            } else if (cfg.id === 'objetos') {
              const lowerSub = rawSubcat.toLowerCase();
              if (lowerSub.includes('herramientas')) {
                itemCat = 'herramientas';
              } else if (lowerSub.includes('materiales')) {
                itemCat = 'materiales';
              } else if (lowerSub.includes('llaves') || lowerSub.includes('insignias')) {
                itemCat = 'llaves';
              } else if (lowerSub.includes('cálices') || lowerSub.includes('calices')) {
                itemCat = 'calices';
              } else if (rawName.toLowerCase().includes('cordón umbilical') || rawName.toLowerCase().includes('cordon umbilical')) {
                itemCat = 'cordones';
              } else {
                itemCat = 'objetos';
              }
            }

            if (!itemsMap.has(href)) {
              itemsMap.set(href, {
                fileKey: href,
                name: rawName,
                category: itemCat,
                subcategory: subcat,
                isDlc,
                expansion: isDlc ? 'dlc' : 'base',
                url: `https://www.eliteguias.com/guias/b/bb/${href}`,
              });
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error scanning ${cfg.name}:`, err.message);
    }
  }

  return Array.from(itemsMap.values());
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 3. Main runner
async function main() {
  const discovered = await discoverItems();
  console.log(`Discovered ${discovered.length} total items for Bloodborne catalog.`);

  const existingPath = 'src/data/bloodborneCatalog.json';
  let existingItems = [];
  if (fs.existsSync(existingPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
      existingItems = parsed.items || [];
    } catch (e) {}
  }

  const existingByName = new Map();
  for (const it of existingItems) {
    existingByName.set(it.name.toLowerCase().trim(), it);
  }

  console.log('Fetching details and pre-caching items into public/guide-cache/...');
  const enriched = [];
  const concurrency = 12;

  for (let i = 0; i < discovered.length; i += concurrency) {
    const chunk = discovered.slice(i, i + concurrency);
    await Promise.all(chunk.map(async (item) => {
      const cachePath = path.join(CACHE_DIR, `${item.fileKey}.json`);
      let guideData = null;

      // Check if already in cache
      if (fs.existsSync(cachePath)) {
        try {
          guideData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        } catch (e) {}
      }

      if (!guideData) {
        try {
          const html = await fetchPage(item.url);
          guideData = parseGuideHtml(html, item.url);
          guideData.category = item.category;
          guideData.subcategory = item.subcategory;
          fs.writeFileSync(cachePath, JSON.stringify(guideData, null, 2));
        } catch (e) {
          console.warn(`Failed fetching detail for ${item.name} (${item.url}):`, e.message);
        }
      }

      const matchKey = item.name.toLowerCase().trim();
      const existing = existingByName.get(matchKey);

      const id = existing?.id || `bb_${item.category.slice(0, 3)}_${item.fileKey.replace('.php', '').replace(/[^a-zA-Z0-9_]/g, '_')}`;

      // Image
      const image = guideData?.images?.[0] || existing?.image || null;

      // Description / Lore
      const description = guideData?.lore || (guideData?.intro?.[0]) || existing?.description || '';

      // Location
      let location = existing?.location || '';
      if (!location && guideData) {
        const locSec = guideData.sections?.find(s => s.heading.toLowerCase().includes('localiz') || s.heading.toLowerCase().includes('recompensa') || s.heading.toLowerCase().includes('dónde') || s.heading.toLowerCase().includes('utilidad'));
        if (locSec) {
          location = locSec.lines.slice(0, 3).join('; ');
        } else if (guideData.intro?.length > 0) {
          location = guideData.intro.slice(0, 2).join(' ');
        }
      }

      // Requirements
      let requirements = existing?.requirements || null;
      if (!requirements && guideData) {
        const reqSec = guideData.sections?.find(s => s.heading.toLowerCase().includes('requisitos'));
        if (reqSec) {
          const reqs = {};
          reqSec.lines.forEach(l => {
            const low = l.toLowerCase();
            const num = parseInt(l.match(/\d+/)?.[0] || '0', 10);
            if (num > 0) {
              if (low.includes('fuerza')) reqs.fue = num;
              else if (low.includes('habilidad') || low.includes('destreza')) reqs.des = num;
              else if (low.includes('sangre') || low.includes('viveza')) reqs.viv = num;
              else if (low.includes('arcano')) reqs.arc = num;
            }
          });
          if (Object.keys(reqs).length > 0) requirements = reqs;
        }
      }

      // Scaling
      let scaling = null;
      if (guideData) {
        const bonSec = guideData.sections?.find(s => s.heading.toLowerCase().includes('bonificaci'));
        if (bonSec) {
          const sc = {};
          bonSec.lines.forEach(l => {
            const low = l.toLowerCase();
            const matchGrade = l.match(/:\s*([SABCDE\-])/i);
            if (matchGrade && matchGrade[1] !== '-') {
              if (low.includes('fuerza')) sc.fue = matchGrade[1].toUpperCase();
              else if (low.includes('habilidad')) sc.des = matchGrade[1].toUpperCase();
              else if (low.includes('sangre')) sc.viv = matchGrade[1].toUpperCase();
              else if (low.includes('arcano')) sc.arc = matchGrade[1].toUpperCase();
            }
          });
          if (Object.keys(sc).length > 0) scaling = sc;
        }
      }

      // Stats
      let stats = null;
      if (guideData) {
        const statSec = guideData.sections?.find(s => s.heading.toLowerCase().includes('estadístic') || s.heading.toLowerCase().includes('estadistic') || s.heading.toLowerCase().includes('característic') || s.heading.toLowerCase().includes('caracteristic'));
        if (statSec) {
          stats = statSec.lines.slice(0, 6).join(' | ');
        }
      }

      enriched.push({
        id,
        fileKey: item.fileKey,
        name: guideData?.title || item.name,
        category: item.category,
        subcategory: item.subcategory,
        expansion: item.expansion,
        isDlc: item.isDlc,
        url: item.url,
        image,
        description: description.replace(/\n+/g, ' ').slice(0, 280),
        location: location.replace(/\n+/g, ' ').slice(0, 280),
        requirements,
        scaling,
        stats,
        ...(existing?.trophy ? { trophy: existing.trophy } : {})
      });
    }));

    if ((i + concurrency) % 50 === 0 || i + concurrency >= discovered.length) {
      console.log(`Processed ${Math.min(i + concurrency, discovered.length)} / ${discovered.length} items...`);
    }
    await sleep(20);
  }

  // Categories config
  const categories = [
    { id: 'armas_truco', name: 'Armas con Truco', icon: 'Sword' },
    { id: 'armas_fuego', name: 'Armas de Fuego', icon: 'Crosshair' },
    { id: 'atuendos', name: 'Atuendos y Sets', icon: 'Shield' },
    { id: 'escudos', name: 'Escudos', icon: 'ShieldAlert' },
    { id: 'herramientas', name: 'Herramientas de Cazador', icon: 'Sparkles' },
    { id: 'runas_caryll', name: 'Runas de Caryll', icon: 'Eye' },
    { id: 'juramentos', name: 'Juramentos', icon: 'Award' },
    { id: 'jefazos', name: 'Jefazos de Yharnam', icon: 'Skull' },
    { id: 'personajes', name: 'Personajes / NPCs', icon: 'Users' },
    { id: 'objetos', name: 'Consumibles y Proyectiles', icon: 'Package' },
    { id: 'materiales', name: 'Materiales de Taller y Cáliz', icon: 'Hammer' },
    { id: 'llaves', name: 'Llaves e Insignias', icon: 'Key' },
    { id: 'calices', name: 'Mazmorras del Cáliz', icon: 'Flame' },
    { id: 'gemas', name: 'Gemas Sangrientas', icon: 'Gem' },
    { id: 'cordones', name: 'Cordones Umbilicales', icon: 'Award' }
  ];

  categories.forEach(cat => {
    cat.totalCount = enriched.filter(it => it.category === cat.id).length;
    cat.baseCount = enriched.filter(it => it.category === cat.id && !it.isDlc).length;
    cat.dlcCount = enriched.filter(it => it.category === cat.id && it.isDlc).length;
  });

  const finalCatalog = {
    generatedAt: new Date().toISOString(),
    totalItems: enriched.length,
    baseItemsCount: enriched.filter(i => !i.isDlc).length,
    dlcItemsCount: enriched.filter(i => i.isDlc).length,
    categories,
    items: enriched
  };

  fs.writeFileSync('src/data/bloodborneCatalog.json', JSON.stringify(finalCatalog, null, 2));
  console.log(`Success! Saved ${enriched.length} items to src/data/bloodborneCatalog.json`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
