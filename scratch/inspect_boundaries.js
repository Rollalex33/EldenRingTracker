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

async function inspectHtmlBoundaries(url) {
  const html = await fetchPage(url);
  console.log(`\n--- Inspecting ${url} ---`);
  // Look for elements that separate content from navigation/sidebar
  // Where does "Recorrido principal" or the bottom box start?
  const idxNav = html.indexOf('Recorrido principal');
  if (idxNav !== -1) {
    console.log('Found "Recorrido principal" at index', idxNav);
    console.log('100 chars before:', html.slice(idxNav - 200, idxNav));
  }
  // Look for table or div structure containing the article
  const tables = [...html.matchAll(/<table[^>]*>/gi)].length;
  console.log('Total tables:', tables);
  
  // Find where comments, footer, or sidebars start
  const divIds = [...html.matchAll(/<div\s+[^>]*id=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Div IDs:', divIds);
}

async function run() {
  await inspectHtmlBoundaries('https://www.eliteguias.com/guias/e/er/elden-ring_jefazos-p29.php');
  await inspectHtmlBoundaries('https://www.eliteguias.com/guias/e/er/elden-ring_personajes-p10.php');
}

run();
