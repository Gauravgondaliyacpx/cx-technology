const https = require('https');
const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '..', 'cache_real_photos');
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function getPhotoList() {
  console.log('Fetching photo lists from Picsum...');
  let allPhotos = [];
  for (let page = 1; page <= 6; page++) {
    const jsonStr = await new Promise((resolve, reject) => {
      https.get(`https://picsum.photos/v2/list?page=${page}&limit=100`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(d));
      }).on('error', reject);
    });
    const parsed = JSON.parse(jsonStr);
    allPhotos = allPhotos.concat(parsed);
  }
  console.log(`Total photo records fetched: ${allPhotos.length}`);
  return allPhotos;
}

async function run() {
  const photos = await getPhotoList();
  
  // Save photo metadata index
  fs.writeFileSync(path.join(cacheDir, 'photos_index.json'), JSON.stringify(photos, null, 2));
  console.log('Saved photos_index.json');
}

run().catch(err => {
  console.error('Error fetching photo index:', err);
  process.exit(1);
});

