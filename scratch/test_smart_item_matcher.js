import fs from 'fs';

const catalog = JSON.parse(fs.readFileSync('src/data/checklistCatalog.json', 'utf8'));

// Build indexed maps
const byExactName = new Map();
// Sorted by length descending so longer titles match first
const sortedItems = [...catalog.items].sort((a, b) => b.name.length - a.name.length);

catalog.items.forEach(item => {
  byExactName.set(item.name.toLowerCase().trim(), item);
});

export function findMatchingItemInText(line) {
  if (!line || typeof line !== 'string') return null;

  // 1. Direct clean match
  const cleanLine = line
    .replace(/^[-•*–—]\s*/, '')
    .replace(/\s*x\d+$/i, '')
    .replace(/^\d+x\s*/i, '')
    .replace(/^(?:Hechizo|Encantamiento|Cenizas? de guerra|Cenizas? de espíritus?|Arma|Escudo|Talismán|Objeto)\s*:?\s*/i, '')
    .trim()
    .toLowerCase();

  if (byExactName.has(cleanLine)) {
    return byExactName.get(cleanLine);
  }

  // 2. Check if any catalog item name is contained within the line (for items >= 4 chars)
  const lineLower = line.toLowerCase();
  for (const item of sortedItems) {
    if (item.name.length < 4) continue;
    const nameLower = item.name.toLowerCase();
    
    // Check boundary or exact containment
    if (lineLower.includes(nameLower)) {
      // Avoid false positives like "espada" matching generic words
      const idx = lineLower.indexOf(nameLower);
      const prevChar = idx > 0 ? lineLower[idx - 1] : ' ';
      const nextChar = idx + nameLower.length < lineLower.length ? lineLower[idx + nameLower.length] : ' ';
      if (/[\s\-,.:;"'([\]]/.test(prevChar) && /[\s\-,.:;"'([\]]/.test(nextChar)) {
        return item;
      }
    }
  }

  return null;
}

const testCases = [
  "3.800 runas",
  "Llama del dios caído",
  "- Hechizo Dominio de Loretta",
  "-  Espada recta ornamental",
  "- Ceniza de Guerra: Tornado de la llama negra",
  "- Recuerdo de la Diosa de la Putrefacción",
  "Al vencerle obtendrás el arma Hoz de guerra de Loretta en el puente",
  "- Fisura en ataúd de piedra"
];

console.log('Testing Smart Item Matcher:');
testCases.forEach(tc => {
  const m = findMatchingItemInText(tc);
  if (m) {
    console.log(`✓ MATCHED: "${tc}" -> [${m.category}] ${m.name}`);
  } else {
    console.log(`✗ No match: "${tc}"`);
  }
});
