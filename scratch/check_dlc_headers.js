import fs from 'fs';

const categories = [
  'https://www.eliteguias.com/guias/e/er/elden-ring_armas.php',
  'https://www.eliteguias.com/guias/e/er/elden-ring_armaduras.php',
  'https://www.eliteguias.com/guias/e/er/elden-ring_escudos.php',
  'https://www.eliteguias.com/guias/e/er/elden-ring_cenizas-guerra.php',
  'https://www.eliteguias.com/guias/e/er/elden-ring_objetos.php',
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

async function run() {
  for (const url of categories) {
    const html = await fetchPage(url);
    const catName = url.split('/').pop().replace('elden-ring_', '').replace('.php', '');
    console.log(`\n=== CHECKING ${catName} ===`);
    // Find headings or references to "DLC" or "Shadow of the Erdtree"
    const matches = [...html.matchAll(/(?:DLC|Shadow of the Erdtree|Erdtree)/gi)];
    console.log(`Found ${matches.length} mentions of DLC/Erdtree in ${catName}`);

    // If there is a section header for DLC:
    const dlcIdx = html.toLowerCase().indexOf('shadow of the erdtree');
    if (dlcIdx !== -1) {
      console.log('Snippet around dlc header:');
      console.log(html.slice(dlcIdx - 100, dlcIdx + 300));
    }
  }
}

run();
