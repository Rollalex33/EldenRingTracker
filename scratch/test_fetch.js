import fs from 'fs';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  const buf = await res.arrayBuffer();
  return new TextDecoder('iso-8859-1').decode(buf);
}

async function run() {
  const url = 'https://www.eliteguias.com/guias/e/er/elden-ring_talismanes.php';
  const html = await fetchPage(url);
  console.log('HTML size:', html.length);
  
  // Find all links
  const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  const items = [];
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (href.includes('elden-ring_talismanes-p') || href.includes('elden-ring_talismanes_')) {
      items.push({ href, text });
    }
  }
  console.log('Talismanes matched:', items.length);
  console.log('First 5:', items.slice(0, 5));

  // Let's also check an individual item page to see how it's structured!
  if (items.length > 0) {
    const itemUrl = 'https://www.eliteguias.com/guias/e/er/' + items[0].href;
    console.log('Fetching sample item:', itemUrl);
    const itemHtml = await fetchPage(itemUrl);
    console.log('Sample item HTML size:', itemHtml.length);
    // Find main content block
    fs.writeFileSync('scratch/sample_item.html', itemHtml);
  }
}

run().catch(console.error);
