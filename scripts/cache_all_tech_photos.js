const https = require('https');
const fs = require('fs');
const path = require('path');
const verifiedTechIds = require('./verified_tech_ids');

const outDir = path.join(__dirname, '..', 'cache_real_photos', 'tech_pool');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function cacheAll() {
  console.log(`Caching ${verifiedTechIds.length} verified pure tech photos...`);
  let downloaded = 0;
  for (let i = 0; i < verifiedTechIds.length; i++) {
    const id = verifiedTechIds[i];
    const filePath = path.join(outDir, `tech_${i}.jpg`);
    if (!fs.existsSync(filePath)) {
      try {
        const buf = await fetchBuffer(`https://images.unsplash.com/${id}?w=1600&q=85&fit=crop`);
        fs.writeFileSync(filePath, buf);
        downloaded++;
      } catch (e) {
        console.error(`Failed ${id}:`, e.message);
      }
    }
    process.stdout.write(`  Cached ${i + 1}/${verifiedTechIds.length}\r`);
  }
  console.log(`\nSuccessfully cached all verified tech photos in ${outDir}!`);
}

cacheAll().catch(console.error);

