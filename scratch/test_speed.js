import fs from 'fs';

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

async function testSpeed() {
  const t0 = Date.now();
  // Let's test fetching 10 items concurrently
  const urls = [
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p1.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p2.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p3.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p4.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p5.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p6.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p7.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p8.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p9.php',
    'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes-p10.php',
  ];

  await Promise.all(urls.map(u => fetchPage(u)));
  const elapsed = Date.now() - t0;
  console.log(`Fetched 10 items in ${elapsed}ms (${(elapsed / 10).toFixed(1)}ms per item)`);
}

testSpeed();
