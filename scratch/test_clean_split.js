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

async function testParse() {
  let totalBase = 0;
  let totalDlc = 0;

  for (const cat of categories) {
    const html = await fetchPage(cat.url);
    const guiasMatch = html.match(/<div\s+id=["']guias["']>([\s\S]*?)<div\s+id=["'](?:derpub|derg|ads|pubinf)/i);
    const content = guiasMatch ? guiasMatch[1] : html;

    // Check where DLC header is located
    const dlcHeaderRegex = /<h[2-4][^>]*>[\s\S]*?(?:DLC|Shadow of the Erdtree)[\s\S]*?<\/h[2-4]>/i;
    const dlcMatch = content.match(dlcHeaderRegex);

    let baseContent = content;
    let dlcContent = '';

    if (dlcMatch) {
      const idx = dlcMatch.index;
      baseContent = content.slice(0, idx);
      dlcContent = content.slice(idx);
    }

    // Count links in base
    const linkRegex = /<a\s+[^>]*href=["'](elden-ring_[^"']+-p\d+\.php)["'][^>]*>([\s\S]*?)<\/a>/gi;
    const baseItems = [];
    let m;
    while ((m = linkRegex.exec(baseContent)) !== null) {
      baseItems.push({ href: m[1], name: decodeHtml(m[2].replace(/<[^>]+>/g, '').trim()) });
    }

    const dlcItems = [];
    if (dlcContent) {
      const dlcLinkRegex = /<a\s+[^>]*href=["'](elden-ring_[^"']+-p\d+\.php)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let dm;
      while ((dm = dlcLinkRegex.exec(dlcContent)) !== null) {
        dlcItems.push({ href: dm[1], name: decodeHtml(dm[2].replace(/<[^>]+>/g, '').trim()) });
      }
    }

    totalBase += baseItems.length;
    totalDlc += dlcItems.length;

    console.log(`${cat.name}: Base = ${baseItems.length}, DLC = ${dlcItems.length} (Total: ${baseItems.length + dlcItems.length})`);
  }

  console.log(`\nOVERALL: Base = ${totalBase}, DLC = ${totalDlc}, TOTAL = ${totalBase + totalDlc}`);
}

testParse();
