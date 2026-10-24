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
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿').replace(/&iexcl;/g, '¡')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

// Function to parse the item detail page
export function parseItemPage(html, itemUrl) {
  // Title: usually in <h3 class="gtit3">...</h3>
  const titleMatch = html.match(/<h3[^>]*class=["']gtit3["'][^>]*>([\s\S]*?)<\/h3>/i)
    || html.match(/<h2[^>]*class=["']gtit2["'][^>]*>([\s\S]*?)<\/h2>/i)
    || html.match(/<title>([\s\S]*?)<\/title>/i);
  
  const title = titleMatch ? decodeHtml(titleMatch[1].replace(/<[^>]+>/g, '').trim()) : '';

  // Extract main content slice
  const h3Idx = html.indexOf('<h3 class="gtit3"');
  const startIdx = h3Idx !== -1 ? h3Idx : (html.indexOf('<h2 class="gtit2"') !== -1 ? html.indexOf('<h2 class="gtit2"') : 0);
  const asideIdx = html.indexOf('<aside');
  const footerIdx = html.indexOf('<footer');
  let endIdx = html.length;
  if (asideIdx !== -1) endIdx = asideIdx;
  else if (footerIdx !== -1) endIdx = footerIdx;
  
  const contentHtml = html.slice(startIdx, endIdx);

  // Extract images
  const imgMatches = [...contentHtml.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)];
  const images = imgMatches.map(m => {
    let src = m[1];
    if (src.startsWith('/')) src = 'https://www.eliteguias.com' + src;
    else if (!src.startsWith('http')) src = 'https://www.eliteguias.com/guias/e/er/' + src;
    return src;
  }).filter(src => !src.includes('layout') && !src.includes('logo') && !src.includes('caratulas') && !src.includes('foro'));

  // Extract lore/description paragraphs (in class="g_marron")
  const loreMatches = [...contentHtml.matchAll(/<p[^>]*class=["'][^"']*g_marron[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)];
  const description = loreMatches
    .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '').trim()))
    .filter(t => t && t !== '-')
    .join('\n\n');

  // Parse structured sections: h4 tags like Efecto, Estadísticas, Localización, Requisitos, etc.
  // Or paragraphs
  const sections = [];
  const parts = contentHtml.split(/<h4[^>]*>([\s\S]*?)<\/h4>/gi);
  // parts[0] is intro / images / lore
  for (let i = 1; i < parts.length; i += 2) {
    const heading = decodeHtml(parts[i].replace(/<[^>]+>/g, '').trim());
    const sectionBodyHtml = parts[i + 1] || '';
    
    // Clean sectionBodyHtml into readable paragraphs or list items
    const text = decodeHtml(
      sectionBodyHtml
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/li>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\n\s+\n/g, '\n\n')
        .trim()
    );

    // Also look for images inside this section (like map snippets or location pictures)
    const secImgs = [...sectionBodyHtml.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => {
      let src = m[1];
      if (src.startsWith('/')) src = 'https://www.eliteguias.com' + src;
      else if (!src.startsWith('http')) src = 'https://www.eliteguias.com/guias/e/er/' + src;
      return src;
    });

    if (heading && text) {
      sections.push({
        heading,
        content: text,
        images: secImgs
      });
    }
  }

  return {
    title,
    url: itemUrl,
    images,
    description,
    sections
  };
}

async function run() {
  const testUrls = [
    'https://www.eliteguias.com/guias/e/er/elden-ring_jefazos-p29.php', // Adan
    'https://www.eliteguias.com/guias/e/er/elden-ring_personajes-p10.php', // Blaidd
    'https://www.eliteguias.com/guias/e/er/elden-ring_hechizos-p16.php', // Aguacero mágico
    'https://www.eliteguias.com/guias/e/er/elden-ring_armas-p1.php', // Daga
  ];

  for (const u of testUrls) {
    console.log(`\n================= Fetching: ${u} =================`);
    const html = await fetchPage(u);
    const parsed = parseItemPage(html, u);
    console.log('Title:', parsed.title);
    console.log('Images:', parsed.images);
    console.log('Lore Desc preview:', parsed.description ? parsed.description.slice(0, 100) + '...' : 'none');
    console.log('Sections:', parsed.sections.map(s => `${s.heading} (${s.content.length} chars, ${s.images.length} imgs)`));
    if (parsed.sections.length > 0) {
      console.log('First Section content sample:', parsed.sections[0].content.slice(0, 150));
    }
  }
}

run();
