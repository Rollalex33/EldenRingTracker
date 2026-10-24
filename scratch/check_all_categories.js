import fs from 'fs';

const categories = [
  { id: 'jefazos', name: 'Jefazos', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php' },
  { id: 'personajes', name: 'Personajes', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_personajes.php' },
  { id: 'hechizos', name: 'Hechizos', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_hechizos.php' },
  { id: 'encantamientos', name: 'Encantamientos', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_encantamientos.php' },
  { id: 'cenizas-espiritus', name: 'Cenizas de espíritus', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_cenizas-espiritus.php' },
  { id: 'cenizas-guerra', name: 'Cenizas de guerra', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_cenizas-guerra.php' },
  { id: 'armas', name: 'Armas', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_armas.php' },
  { id: 'armaduras', name: 'Armaduras', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_armaduras.php' },
  { id: 'talismanes', name: 'Talismanes', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes.php' },
  { id: 'escudos', name: 'Escudos', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_escudos.php' },
  { id: 'objetos', name: 'Objetos', url: 'https://www.eliteguias.com/guias/e/er/elden-ring_objetos.php' },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  const buf = await res.arrayBuffer();
  return new TextDecoder('iso-8859-1').decode(buf);
}

function decodeHtml(html) {
  return html
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿').replace(/&iexcl;/g, '¡')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
}

async function run() {
  const results = {};
  for (const cat of categories) {
    console.log(`Checking ${cat.name} (${cat.url})...`);
    try {
      const html = await fetchPage(cat.url);
      // Find all links to subpages
      const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
      let match;
      const found = [];
      while ((match = linkRegex.exec(html)) !== null) {
        const href = match[1];
        const text = decodeHtml(match[2].replace(/<[^>]+>/g, '').trim());
        // Only internal ER links that are specific to this category
        if (href.startsWith('elden-ring_') && href.endsWith('.php') && href !== `${cat.url.split('/').pop()}`) {
          found.push({ href, text });
        }
      }
      results[cat.id] = {
        name: cat.name,
        totalLinks: found.length,
        sample: found.slice(0, 5)
      };
      console.log(`  -> Found ${found.length} links`);
    } catch (err) {
      console.error(`Error fetching ${cat.name}:`, err.message);
    }
  }
  fs.writeFileSync('scratch/categories_summary.json', JSON.stringify(results, null, 2));
  console.log('Saved summary to scratch/categories_summary.json');
}

run();
