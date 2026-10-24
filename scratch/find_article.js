import fs from 'fs';

const html = fs.readFileSync('scratch/sample_item.html', 'utf8');

// Find article or main content tags
const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
if (articleMatch) {
  console.log('Found <article>! Length:', articleMatch[0].length);
  console.log(articleMatch[0].slice(0, 1000));
} else {
  // Let's check other container tags
  const bodyMatch = html.match(/<div id=["']cuerpo["'][\s\S]*?<\/div>/i) || html.match(/<section[\s\S]*?<\/section>/i);
  console.log('Alternative containers:', bodyMatch ? bodyMatch[0].slice(0, 500) : 'none');
}

// Let's look for h1
const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('H1:', h1 ? h1[1] : 'none');

// Find where the h1 is located in the HTML
if (h1) {
  const idx = html.indexOf(h1[0]);
  console.log('Snippet around H1:');
  console.log(html.slice(idx, idx + 2500));
}
