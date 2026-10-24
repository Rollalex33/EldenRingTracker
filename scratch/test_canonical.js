async function getList(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const matches = [...html.matchAll(/<li>\s*<label[^>]*>\s*<input[^>]*>\s*([^<]+)<\/label>/g)].map(m => m[1].trim());
  return matches;
}

async function run() {
  const urls = [
    'https://videochums.com/article/shadow-of-the-erdtree-all-talismans-checklist',
    'https://videochums.com/article/shadow-of-the-erdtree-all-spells-checklist',
    'https://videochums.com/article/shadow-of-the-erdtree-all-ashes-of-war-checklist',
    'https://videochums.com/article/shadow-of-the-erdtree-all-spirit-ashes-checklist'
  ];
  for (const u of urls) {
    const list = await getList(u);
    console.log(u, list.length, list.slice(0, 3));
  }
}

run();
