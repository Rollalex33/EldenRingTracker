import fs from 'fs';
import path from 'path';
import { fetchGuidePage, parseGuideHtml } from '../scratch/parse_refined.js';

const catalog = JSON.parse(fs.readFileSync('src/data/checklistCatalog.json', 'utf8'));

const CACHE_DIR = 'public/guide-cache';
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Categories to pre-cache in priority
const priorityCategories = [
  'jefazos',
  'personajes',
  'talismanes',
  'hechizos',
  'encantamientos',
  'cenizas-espiritus',
  'cenizas-guerra',
  'escudos',
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cacheItem(item) {
  const cachePath = path.join(CACHE_DIR, `${item.fileKey}.json`);
  if (fs.existsSync(cachePath)) {
    return false; // already cached
  }

  try {
    const html = await fetchGuidePage(item.url);
    const parsed = parseGuideHtml(html, item.url);
    // Enrich with catalog info if missing
    if (!parsed.title) parsed.title = item.name;
    parsed.category = item.category;
    parsed.categoryName = item.categoryName;
    parsed.subcategory = item.subcategory;

    fs.writeFileSync(cachePath, JSON.stringify(parsed, null, 2));
    return true;
  } catch (err) {
    console.error(`Failed ${item.name} (${item.url}):`, err.message);
    return false;
  }
}

async function runBatch(items, concurrency = 10) {
  let done = 0;
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    await Promise.all(chunk.map(async (item) => {
      const res = await cacheItem(item);
      done++;
      if (done % 50 === 0 || done === items.length) {
        console.log(`Progress: ${done} / ${items.length} items processed`);
      }
    }));
    await sleep(60); // small polite pause
  }
}

async function main() {
  const targetItems = catalog.items.filter(i => priorityCategories.includes(i.category));
  console.log(`Targeting ${targetItems.length} priority items for offline/instant cache...`);
  await runBatch(targetItems, 12);
  console.log('Batch caching complete!');
}

main();
