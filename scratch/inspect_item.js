import fs from 'fs';

const html = fs.readFileSync('scratch/sample_item.html', 'utf8');

console.log('Title match:');
const titleMatch = html.match(/<h[123][^>]*>(.*?)<\/h[123]>/i);
console.log(titleMatch ? titleMatch[1] : 'none');

// Look for the main article content container
// Typically in eliteguias it's inside <div class="col-md-..." or table or id="content" or <div align="left">
const contentMatches = html.match(/<table[\s\S]*?<\/table>/gi) || [];
console.log('Tables found:', contentMatches.length);

// Look for images
const imgMatches = [...html.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('Images:', imgMatches.filter(i => !i.includes('layout') && !i.includes('eliteguias') && !i.includes('menu')));

// Look for description/effects/where to find
// Let's print out lines around the item name or effects
const lines = html.split('\n');
const relevantLines = lines.filter(l => l.includes('Efecto') || l.includes('Localizaci') || l.includes('Descripci') || l.includes('Estad') || l.includes('Requisitos') || l.includes('img src'));
console.log('Relevant lines sample:', relevantLines.slice(0, 10));
