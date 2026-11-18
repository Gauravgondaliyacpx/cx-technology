const https = require('https');
const sharp = require('sharp');
const fs = require('fs');

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

async function testBatch() {
  console.time('batch20');
  const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  await Promise.all(ids.map(async id => {
    const url = `https://picsum.photos/id/${id}/500/300`;
    const buf = await fetchBuffer(url);
    const avif = await sharp(buf).avif({ quality: 75, effort: 2 }).toBuffer();
    return avif.length;
  }));
  console.timeEnd('batch20');
  console.log('20 real photos downloaded and converted to AVIF!');
}

testBatch();

