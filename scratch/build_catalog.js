import fs from 'fs';

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
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '-').replace(/&mdash;/g, '—')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

// Parse an index page extracting items and keeping track of subcategory headers
function parseCategoryIndex(html, cat) {
  // Extract body inside div id="guias"
  const guiasMatch = html.match(/<div\s+id=["']guias["']>([\s\S]*?)<div\s+id=["']der/i);
  const content = guiasMatch ? guiasMatch[1] : html;

  // Split by elements or tokens, or sequentially parse tags
  // We want to detect headers like <h2...>, <h3...>, <h4...>, <b>, <strong> that denote subcategories
  // And links <a href="elden-ring_...-pXX.php">Name</a>
  const tokenRegex = /<(h[2-4]|b|strong)\b[^>]*>([\s\S]*?)<\/\1>|<a\s+[^>]*href=["'](elden-ring_[^"']+-p\d+\.php)["'][^>]*>([\s\S]*?)<\/a>/gi;
  
  let currentSubcategory = 'General';
  const items = [];
  let token;
  const seenUrls = new Set();

  while ((token = tokenRegex.exec(content)) !== null) {
    if (token[1]) {
      // It's a heading / subcategory
      const headingText = decodeHtml(token[2].replace(/<[^>]+>/g, '').trim());
      if (
        headingText &&
        headingText.length > 2 &&
        headingText.length < 60 &&
        !headingText.toLowerCase().includes('guía elden ring') &&
        !headingText.toLowerCase().includes('información del juego') &&
        !headingText.toLowerCase().includes('foro') &&
        !headingText.toLowerCase().includes('también conocido como')
      ) {
        currentSubcategory = headingText;
      }
    } else if (token[3]) {
      // It's an item link!
      const href = token[3];
      const rawText = token[4];
      const name = decodeHtml(rawText.replace(/<[^>]+>/g, '').trim());

      if (name && !seenUrls.has(href)) {
        seenUrls.add(href);
        const id = `${cat.id}_${href.replace('.php', '').replace('elden-ring_', '')}`;
        items.push({
          id,
          name,
          category: cat.id,
          categoryName: cat.name,
          subcategory: currentSubcategory,
          url: `https://www.eliteguias.com/guias/e/er/${href}`,
          fileKey: href,
        });
      }
    }
  }

  return items;
}

async function run() {
  const allItems = [];
  const categoryStats = [];

  for (const cat of categories) {
    console.log(`Processing category: ${cat.name}...`);
    try {
      const html = await fetchPage(cat.url);
      const items = parseCategoryIndex(html, cat);
      console.log(`  -> Found ${items.length} items`);
      const subcats = [...new Set(items.map(i => i.subcategory))];
      console.log(`     Subcategories (${subcats.length}):`, subcats.slice(0, 8));
      
      categoryStats.push({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        guideUrl: cat.url,
        count: items.length,
        subcategories: subcats
      });

      allItems.push(...items);
    } catch (e) {
      console.error(`Failed ${cat.name}:`, e.message);
    }
  }

  console.log(`\nTOTAL ITEMS FOUND: ${allItems.length}`);

  const outputData = {
    generatedAt: new Date().toISOString(),
    totalItems: allItems.length,
    categories: categoryStats,
    items: allItems
  };

  fs.writeFileSync('src/data/checklistCatalog.json', JSON.stringify(outputData, null, 2));
  console.log('Saved to src/data/checklistCatalog.json');
}

run();
