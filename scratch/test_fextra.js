async function checkFextra(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log(url, 'length:', html.length);
    const tableMatches = [...html.matchAll(/<table[^>]*>/gi)];
    console.log('Tables found:', tableMatches.length);
    const headers = [...html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    console.log('Headers:', headers.slice(0, 10));
  } catch (e) {
    console.error(e.message);
  }
}

async function run() {
  await checkFextra('https://eldenring.wiki.fextralife.com/Talismans');
  await checkFextra('https://eldenring.wiki.fextralife.com/Sorceries');
  await checkFextra('https://eldenring.wiki.fextralife.com/Incantations');
  await checkFextra('https://eldenring.wiki.fextralife.com/Ashes+of+War');
}

run();
