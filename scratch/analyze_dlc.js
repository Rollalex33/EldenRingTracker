import fs from 'fs';

const catalog = JSON.parse(fs.readFileSync('src/data/checklistCatalog.json', 'utf8'));

// Check how DLC is represented currently
let dlcBySubcat = 0;
let dlcByUrl = 0;
let dlcByName = 0;

const dlcSubcats = catalog.categories.flatMap(c => c.subcategories.filter(s => s.toLowerCase().includes('dlc') || s.toLowerCase().includes('erdtree')));
console.log('DLC Subcategories found in catalog:', dlcSubcats);

const dlcItems = [];
const baseItems = [];

catalog.items.forEach(item => {
  const isDlcSubcat = item.subcategory && (item.subcategory.toLowerCase().includes('dlc') || item.subcategory.toLowerCase().includes('erdtree'));
  // Also check if eliteguias marks it in URL or if fileKey or other categories have DLC indicators
  // For example, in armas or armaduras or objetos, how does eliteguias identify DLC items?
  if (isDlcSubcat) {
    dlcItems.push(item);
  } else {
    baseItems.push(item);
  }
});

console.log(`Direct DLC items by subcategory: ${dlcItems.length}`);
console.log(`Base items: ${baseItems.length}`);

// Let's inspect some cached files to see if the HTML or cache says "DLC" or "Shadow of the Erdtree"
const cachedFiles = fs.readdirSync('public/guide-cache').filter(f => f.endsWith('.json'));
console.log(`Total cached files: ${cachedFiles.length}`);

let detectedDlcFromCache = 0;
const dlcKeywords = ['shadow of the erdtree', 'del dlc', 'dlc:', 'contenido descargable'];

const samplesDlc = [];

for (const file of cachedFiles) {
  const content = fs.readFileSync(`public/guide-cache/${file}`, 'utf8');
  const lower = content.toLowerCase();
  const hasDlc = dlcKeywords.some(kw => lower.includes(kw));
  if (hasDlc) {
    detectedDlcFromCache++;
    if (samplesDlc.length < 10) {
      const parsed = JSON.parse(content);
      samplesDlc.push({ file, title: parsed.title, subcategory: parsed.subcategory });
    }
  }
}

console.log(`Items with DLC mentions in cached content: ${detectedDlcFromCache}`);
console.log('Sample DLC detected items:', samplesDlc);
