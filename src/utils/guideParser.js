/**
 * src/utils/guideParser.js
 * Utilidad para decodificar y parsear páginas de EliteGuías
 */

export function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿').replace(/&iexcl;/g, '¡')
    .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘').replace(/&rsquo;/g, '’')
    .replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '-').replace(/&mdash;/g, '—')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

export function parseGuideHtml(html, originalUrl) {
  // Extract body inside div id="guias"
  const guiasMatch = html.match(/<div\s+id=["']guias["']>([\s\S]*?)<div\s+id=["'](?:derpub|derg|ads|pubinf)/i)
    || html.match(/<div\s+id=["']guias["']>([\s\S]*?)<\/div>\s*<\/div>\s*<div\s+id=["']der/i);
  
  const content = guiasMatch ? guiasMatch[1] : html;

  // Title: usually in <h3 class="gtit3">...</h3> or <h2 class="gtit2">...</h3>
  const titleMatch = content.match(/<h3[^>]*class=["']gtit3["'][^>]*>([\s\S]*?)<\/h3>/i)
    || content.match(/<h2[^>]*class=["']gtit2["'][^>]*>([\s\S]*?)<\/h2>/i)
    || content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  
  const title = titleMatch ? decodeHtml(titleMatch[1].replace(/<[^>]+>/g, '').trim()) : '';

  // Base guide URL
  const isBloodborne = (originalUrl && originalUrl.includes('/b/bb/'));
  const baseGuideUrl = isBloodborne ? 'https://www.eliteguias.com/guias/b/bb/' : 'https://www.eliteguias.com/guias/e/er/';

  // Extract all images
  const rawImgs = [...content.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  const images = [...new Set(rawImgs.map(src => {
    if (src.startsWith('/')) return 'https://www.eliteguias.com' + src;
    if (!src.startsWith('http')) return baseGuideUrl + src;
    return src;
  }))].filter(s => !s.includes('ads') && !s.includes('layout') && !s.includes('logo') && !s.includes('caratulas') && !s.includes('foro'));

  // Extract Lore / Quote in game (class="g_marron")
  const loreParagraphs = [...content.matchAll(/<p[^>]*class=["'][^"']*g_marron[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '').trim()))
    .filter(t => t && t !== '-');
  const lore = loreParagraphs.join('\n\n');

  // Split into sections by <h4> headers
  const sections = [];
  const parts = content.split(/<h4[^>]*>([\s\S]*?)<\/h4>/gi);

  // parts[0] is everything before first <h4>: contains intro text, general info, place where to find
  const introHtml = parts[0] || '';
  const introParagraphs = [...introHtml.matchAll(/<p[^>]*class=["'][^"']*gtext[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => decodeHtml(m[1].replace(/<[^>]+>/g, '').trim()))
    .filter(t => t && t !== '-' && t.length > 2);

  // Subsequent parts are heading / body pairs
  for (let i = 1; i < parts.length; i += 2) {
    const rawHeading = parts[i];
    const sectionBodyHtml = parts[i + 1] || '';
    const heading = decodeHtml(rawHeading.replace(/<[^>]+>/g, '').trim());
    if (!heading) continue;

    // Extract section paragraphs and lines
    const rawLines = sectionBodyHtml
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<li[^>]*>/gi, '\n- ')
      .replace(/<\/li>/gi, '')
      .replace(/<[^>]+>/g, ' ');

    const lines = rawLines
      .split('\n')
      .map(l => decodeHtml(l.trim()))
      .filter(l => l && l !== '-' && l.length > 1);

    // Extract section specific images
    const secImgs = [...sectionBodyHtml.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => {
      let src = m[1];
      if (src.startsWith('/')) return 'https://www.eliteguias.com' + src;
      if (!src.startsWith('http')) return baseGuideUrl + src;
      return src;
    }).filter(s => !s.includes('ads') && !s.includes('layout') && !s.includes('foro'));

    if (lines.length > 0) {
      sections.push({
        heading,
        lines,
        text: lines.join('\n'),
        images: secImgs
      });
    }
  }

  // If no sections were found (like some NPC pages that only have p.gtext), create a General section
  if (sections.length === 0 && introParagraphs.length > 0) {
    sections.push({
      heading: 'Guía y Pasos',
      lines: introParagraphs,
      text: introParagraphs.join('\n\n'),
      images: []
    });
  }

  return {
    title,
    originalUrl,
    images,
    lore,
    intro: introParagraphs,
    sections
  };
}
