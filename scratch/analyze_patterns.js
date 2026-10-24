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
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

async function run() {
  for (const cat of categories) {
    const html = await fetchPage(cat.url);
    const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    let match;
    const itemLinks = new Set();
    const subcats = new Set();
    const items = [];
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1];
      const text = decodeHtml(match[2].replace(/<[^>]+>/g, '').trim());
      if (!href.startsWith('elden-ring_') || !href.endsWith('.php')) continue;
      if (['elden-ring.php', 'elden-ring_atributos.php', 'elden-ring_clases.php'].includes(href)) continue;
      
      // Let's see patterns
      if (href.match(/-p\d+\.php$/)) {
        itemLinks.add(href);
        items.push({ href, text });
      } else {
        subcats.add(href);
      }
    }
    console.log(`Cat [${cat.name}]: direct items (-pXX): ${itemLinks.size}, other subpages: ${subcats.size}`);
    if (subcats.size > 0 && subcats.size <= 30) {
      console.log(`   subpages:`, Array.from(subcats));
    }
  }
}

run();
