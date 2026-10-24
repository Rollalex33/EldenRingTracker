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
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

async function run() {
  for (const cat of categories) {
    const html = await fetchPage(cat.url);
    const guiasMatch = html.match(/<div\s+id=["']guias["']>([\s\S]*?)<div\s+id=["'](?:derpub|derg|ads|pubinf)/i);
    const content = guiasMatch ? guiasMatch[1] : html;

    // Split at the DLC header: `<h4 class="g_naranja">` or any heading containing "del DLC"
    // Let's find index where the heading containing "del DLC" occurs
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

    const baseHtml = dlcSplitIndex !== -1 ? content.slice(0, dlcSplitIndex) : content;
    const dlcHtml = dlcSplitIndex !== -1 ? content.slice(dlcSplitIndex) : '';

    const linkRegex = /<a\s+[^>]*href=["'](elden-ring_[^"']+-p\d+\.php)["'][^>]*>([\s\S]*?)<\/a>/gi;
    const baseSet = new Set();
    let m;
    while ((m = linkRegex.exec(baseHtml)) !== null) {
      baseSet.add(m[1]);
    }

    const dlcSet = new Set();
    if (dlcHtml) {
      const dlcLinkRegex = /<a\s+[^>]*href=["'](elden-ring_[^"']+-p\d+\.php)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let dm;
      while ((dm = dlcLinkRegex.exec(dlcHtml)) !== null) {
        dlcSet.add(dm[1]);
      }
    }

    console.log(`${cat.name}: Base = ${baseSet.size}, DLC = ${dlcSet.size} (Header: "${dlcHeadingFound}")`);
  }
}

run();
