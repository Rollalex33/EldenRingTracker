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
  if (!html) return '';
  return html
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&ú/g, 'ú').replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿').replace(/&iexcl;/g, '¡')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

async function checkArticle(url) {
  const html = await fetchPage(url);
  const match = html.match(/<div\s+id=["']guias["']>([\s\S]*?)<\/div>\s*<\/div>\s*<div\s+id=["']der/i)
    || html.match(/<div\s+id=["']guias["']>([\s\S]*?)<div\s+id=["']der/i);
  
  if (match) {
    const guiasContent = match[1];
    console.log(`\n=== SUCCESS on ${url} ===`);
    console.log('Guias Content Length:', guiasContent.length);

    // Extract title
    const titleMatch = guiasContent.match(/<h3[^>]*class=["']gtit3["'][^>]*>([\s\S]*?)<\/h3>/i)
      || guiasContent.match(/<h2[^>]*class=["']gtit2["'][^>]*>([\s\S]*?)<\/h2>/i);
    console.log('Title:', titleMatch ? decodeHtml(titleMatch[1].replace(/<[^>]+>/g, '').trim()) : 'not found');

    // Extract images
    const imgMatches = [...guiasContent.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => {
      let src = m[1];
      if (src.startsWith('/')) src = 'https://www.eliteguias.com' + src;
      else if (!src.startsWith('http')) src = 'https://www.eliteguias.com/guias/e/er/' + src;
      return src;
    }).filter(s => !s.includes('ads') && !s.includes('layout'));
    console.log('Images:', imgMatches);

    // Lore
    const lore = [...guiasContent.matchAll(/<p[^>]*class=["'][^"']*g_marron[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '').trim()))
      .filter(t => t && t !== '-')
      .join('\n\n');
    console.log('Lore:', lore ? lore.slice(0, 100) + '...' : '(none)');

    // Text paragraphs
    const paragraphs = [...guiasContent.matchAll(/<p[^>]*class=["'][^"']*gtext[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '').trim()))
      .filter(t => t && t !== '-' && t.length > 2);
    console.log('Paragraphs found:', paragraphs.length);
    console.log('First 2 paragraphs:', paragraphs.slice(0, 2));

    // Headers (h4)
    const h4s = [...guiasContent.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)]
      .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '').trim()));
    console.log('H4 sections:', h4s);
  } else {
    console.log(`Failed to match for ${url}`);
  }
}

async function run() {
  await checkArticle('https://www.eliteguias.com/guias/e/er/elden-ring_jefazos-p29.php');
  await checkArticle('https://www.eliteguias.com/guias/e/er/elden-ring_personajes-p10.php');
  await checkArticle('https://www.eliteguias.com/guias/e/er/elden-ring_armas-p1.php');
  await checkArticle('https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p40.php');
}

run();
