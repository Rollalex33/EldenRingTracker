import fs from 'fs';
import path from 'path';

const categories = [
  { id: 'jefazos', name: 'Jefazos', icon: 'Skull', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php' },
  { id: 'personajes', name: 'Personajes', icon: 'Users', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_personajes.php' },
  { id: 'hechizos', name: 'Hechizos', icon: 'Wand2', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_hechizos.php' },
  { id: 'encantamientos', name: 'Encantamientos', icon: 'Flame', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_encantamientos.php' },
  { id: 'cenizas-espiritus', name: 'Cenizas de espíritus', icon: 'Ghost', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_cenizas-espiritus.php' },
  { id: 'cenizas-guerra', name: 'Cenizas de guerra', icon: 'Swords', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_cenizas-guerra.php' },
  { id: 'armas', name: 'Armas', icon: 'Sword', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_armas.php' },
  { id: 'armaduras', name: 'Armaduras', icon: 'ShieldAlert', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_armaduras.php' },
  { id: 'talismanes', name: 'Talismanes', icon: 'Gem', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes.php' },
  { id: 'escudos', name: 'Escudos', icon: 'Shield', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_escudos.php' },
  { id: 'objetos', name: 'Objetos', icon: 'Package', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_objetos.php' },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  return new TextDecoder('iso-8859-1').decode(buf);
}

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿').replace(/&iexcl;/g, '¡')
    .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
    .replace(/&rdquo;/g, '”')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '-').replace(/&mdash;/g, '—')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

// Function to get image thumbnail from cache
function getCachedImage(fileKey) {
  try {
    const p = path.resolve('public/guide-cache', `${fileKey}.json`);
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (data.images && data.images.length > 0) {
        return data.images[0];
      }
    }
  } catch (e) {}
  return null;
}

async function rebuildCatalog() {
  const allItems = [];
  const categoryStats = [];
  let globalBaseCount = 0;
  let globalDlcCount = 0;

  for (const cat of categories) {
    console.log(`Rebuilding ${cat.name}...`);
    const html = await fetchPage(cat.url);
    const guiasMatch = html.match(/<div\s+id=["']guias["']>([\s\S]*?)<div\s+id=["'](?:derpub|derg|ads|pubinf)/i);
    const content = guiasMatch ? guiasMatch[1] : html;

    // Split at the DLC header
    const headingMatches = [...content.matchAll(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi)];
    let dlcSplitIndex = -1;
    let dlcHeadingFound = '';

    for (const hm of headingMatches) {
      const headingText = decodeHtml(hm[1].replace(/<[^>]+>/g, '').trim());
      if (headingText.toLowerCase().includes('del dlc') || headingText.toLowerCase().includes('shadow of the erdtree')) {
        dlcSplitIndex = hm.index;
        dlcHeadingFound = headingText;
        break;
      }
    }

    // Function to parse a section (base or DLC)
    const parseTokens = (sectionContent, isDlc) => {
      const tokenRegex = /<(h[2-4]|b|strong)\b[^>]*>([\s\S]*?)<\/\1>|<a\s+[^>]*href=["'](elden-ring_[^"']+-p\d+\.php)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let currentSubcategory = isDlc ? 'DLC' : 'General';
      const items = [];
      let token;
      const seen = new Set();

      while ((token = tokenRegex.exec(sectionContent)) !== null) {
        if (token[1]) {
          const rawHeader = decodeHtml(token[2].replace(/<[^>]+>/g, '').trim());
          if (
            rawHeader &&
            rawHeader.length > 2 &&
            rawHeader.length < 50 &&
            !rawHeader.toLowerCase().includes('guía elden ring') &&
            !rawHeader.toLowerCase().includes('información del juego') &&
            !rawHeader.toLowerCase().includes('foro') &&
            !rawHeader.toLowerCase().includes('también conocido como')
          ) {
            currentSubcategory = rawHeader;
          }
        } else if (token[3]) {
          const href = token[3];
          const name = decodeHtml(token[4].replace(/<[^>]+>/g, '').trim());
          if (name && !seen.has(href)) {
            seen.add(href);
            const id = `${cat.id}_${href.replace('.php', '').replace('elden-ring_', '')}`;
            const image = getCachedImage(href);

            items.push({
              id,
              name,
              category: cat.id,
              categoryName: cat.name,
              subcategory: currentSubcategory,
              isDlc,
              expansion: isDlc ? 'dlc' : 'base',
              url: `https://www.eliteguias.com/guias/e/er/${href}`,
              fileKey: href,
              image: image || null,
            });
          }
        }
      }
      return items;
    };

    const baseSection = dlcSplitIndex !== -1 ? content.slice(0, dlcSplitIndex) : content;
    const dlcSection = dlcSplitIndex !== -1 ? content.slice(dlcSplitIndex) : '';

    const baseItems = parseTokens(baseSection, false);
    const dlcItems = parseTokens(dlcSection, true);

    const catItems = [...baseItems, ...dlcItems];
    globalBaseCount += baseItems.length;
    globalDlcCount += dlcItems.length;

    console.log(`  -> ${cat.name}: Base=${baseItems.length}, DLC=${dlcItems.length}, Total=${catItems.length}`);

    categoryStats.push({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      guideUrl: cat.url,
      totalCount: catItems.length,
      baseCount: baseItems.length,
      dlcCount: dlcItems.length,
      subcategories: [...new Set(catItems.map(i => i.subcategory))],
    });

    allItems.push(...catItems);
  }

  const catalogData = {
    generatedAt: new Date().toISOString(),
    totalItems: allItems.length,
    baseItemsCount: globalBaseCount,
    dlcItemsCount: globalDlcCount,
    categories: categoryStats,
    items: allItems,
  };

  fs.writeFileSync('src/data/checklistCatalog.json', JSON.stringify(catalogData, null, 2));
  console.log(`\nCOMPLETED! Total: ${allItems.length} (Base: ${globalBaseCount}, DLC: ${globalDlcCount})`);
  console.log('Saved to src/data/checklistCatalog.json');
}

rebuildCatalog();
