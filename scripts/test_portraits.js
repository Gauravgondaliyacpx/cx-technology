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

// Curated list of 40 real developer & tech professional portrait IDs from Unsplash
const unsplashPortraits = [
  'photo-1534528741775-53994a69daeb', 'photo-1507003211169-0a1dd7228f2d', 'photo-1494790108377-be9c29b29330', 'photo-1500648767791-00dcc994a43e',
  'photo-1517841905240-472988babdf9', 'photo-1539571696357-5a69c17a67c6', 'photo-1524504388940-b1c1722653e1', 'photo-1506794778202-cad84cf45f1d',
  'photo-1534751516642-a171edd2521b', 'photo-1519085360753-af0119f7cbe7', 'photo-1544005313-94ddf0286df2', 'photo-1492562080023-ab3db95bfbce',
  'photo-1573496359142-b8d87734a5a2', 'photo-1501196354995-cbb51c65aaea', 'photo-1580489944761-15a19d654956', 'photo-1472099645785-5658abf4ff4e',
  'photo-1531746020798-e6953c6e8e04', 'photo-1522075469751-3a6694fb2f61', 'photo-1567532939604-b6b5b0db2604', 'photo-1560250097-0b93528c311a',
  'photo-1548142813-c348350df52b', 'photo-1528892952291-009c663ce843', 'photo-1519345182560-3f2917c472ef', 'photo-1570295999919-56ceb5ecca61',
  'photo-1544717305-2782549b5136', 'photo-1522529599102-193c0d76b5b6', 'photo-1535713875002-d1d0cf377fde', 'photo-1543610892-0b1f7e6d8ac1',
  'photo-1527980965255-d3b416303d12', 'photo-1541823709867-1b206113eafd', 'photo-1529626455594-4ff0802cfb7e', 'photo-1508214751196-bcfd4ca60f91',
  'photo-1542909168-82c3e7fdca5c', 'photo-1568602471122-7832951cc4c5', 'photo-1517486808906-6ca8b3f04846', 'photo-1506277886164-e25aa3f4ef7f',
  'photo-1573497019940-1c28c88b4f3e', 'photo-1544005313-94ddf0286df2', 'photo-1554151228-14d9def656e4', 'photo-1542178247-c052733d0a64'
];

console.log('Unsplash portrait IDs count:', unsplashPortraits.length);

