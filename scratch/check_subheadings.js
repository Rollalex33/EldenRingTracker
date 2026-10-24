import fs from 'fs';

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

async function testCategory(url, name) {
  const html = await fetchPage(url);
  console.log(`=== ${name} ===`);
  // Look for headings (h2, h3, h4, or strong/b tags that act as section headers)
  const headings = [...html.matchAll(/<(h[2-4]|strong|b)[^>]*>(.*?)<\/\1>/gi)]
    .map(m => decodeHtml(m[2].replace(/<[^>]+>/g, '').trim()))
    .filter(t => t.length > 2 && !t.includes('Eliteguias') && !t.includes('Información del juego') && !t.includes('Guía Elden Ring') && !t.includes('Foro'));
  console.log('Sample headings/subcategories:', headings.slice(0, 15));
}

async function run() {
  await testCategory('https://www.eliteguias.com/guias/e/er/elden-ring_armas.php', 'Armas');
  await testCategory('https://www.eliteguias.com/guias/e/er/elden-ring_objetos.php', 'Objetos');
  await testCategory('https://www.eliteguias.com/guias/e/er/elden-ring_jefazos.php', 'Jefazos');
}

run();
