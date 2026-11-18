const https = require('https');
const fs = require('fs');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function testPicsum() {
  console.log('Fetching Picsum photos list...');
  const p1 = await fetchJson('https://picsum.photos/v2/list?page=1&limit=100');
  const p2 = await fetchJson('https://picsum.photos/v2/list?page=2&limit=100');
  const p3 = await fetchJson('https://picsum.photos/v2/list?page=3&limit=100');
  const all = [...p1, ...p2, ...p3];
  console.log(`Total photos available from 3 pages: ${all.length}`);
  console.log('Sample photo:', all[0]);
}

testPicsum();

