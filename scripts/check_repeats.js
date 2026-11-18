const fs = require('fs');

function checkFile(filePath) {
  const c = fs.readFileSync(filePath, 'utf8');
  const imgMatches = c.match(/\/assets\/images\/[^"'\s\)]+/g) || [];
  const vidMatches = c.match(/\/assets\/videos\/[^"'\s\)]+/g) || [];
  
  const imgCounts = {};
  imgMatches.forEach(i => imgCounts[i] = (imgCounts[i] || 0) + 1);
  const vidCounts = {};
  vidMatches.forEach(v => vidCounts[v] = (vidCounts[v] || 0) + 1);
  
  console.log(`=== ${filePath} ===`);
  console.log('Total img refs:', imgMatches.length, 'Unique:', Object.keys(imgCounts).length);
  console.log('Repeated imgs:', Object.entries(imgCounts).filter(([k, v]) => v > 1 && !k.includes('/svg/')).slice(0, 10));
  console.log('Total vid refs:', vidMatches.length, 'Unique:', Object.keys(vidCounts).length);
  console.log('Repeated vids:', Object.entries(vidCounts).filter(([k, v]) => v > 1).slice(0, 10));
}

['src/index.njk', 'src/plans.njk', 'src/product/vault.njk', 'src/product/page-transition-course.njk', 'src/product/button-pack.njk', 'src/product/community.njk'].forEach(checkFile);

