import fs from 'fs';
import path from 'path';
import { fetchGuidePage, parseGuideHtml } from '../scratch/parse_refined.js';

const catalog = JSON.parse(fs.readFileSync('src/data/checklistCatalog.json', 'utf8'));

const CACHE_DIR = 'public/guide-cache';
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Remaining categories: armas, armaduras, objetos
const remainingCategories = ['armas', 'armaduras', 'objetos'];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cacheItem(item) {
  const cachePath = path.join(CACHE_DIR, `${item.fileKey}.json`);
  if (fs.existsSync(cachePath)) {
    return false;
  }

  try {
    const html = await fetchGuidePage(item.url);
    const parsed = parseGuideHtml(html, item.url);
    if (!parsed.title) parsed.title = item.name;
    parsed.category = item.category;
    parsed.categoryName = item.categoryName;
    parsed.subcategory = item.subcategory;

    fs.writeFileSync(cachePath, JSON.stringify(parsed, null, 2));
    return true;
  } catch (err) {
    return false;
  }
}

async function runBatch(items, concurrency = 15) {
  let done = 0;
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    await Promise.all(chunk.map(async (item) => {
      await cacheItem(item);
      done++;
      if (done % 100 === 0 || done === items.length) {
        console.log(`Progress: ${done} / ${items.length} remaining items processed`);
      }
    }));
    await sleep(50);
  }
}

async function main() {
  const targetItems = catalog.items.filter(i => remainingCategories.includes(i.category));
  console.log(`Targeting ${targetItems.length} remaining items for complete cache coverage...`);
  await runBatch(targetItems, 15);
  console.log('Complete guide catalog pre-caching finished!');
}

main();
