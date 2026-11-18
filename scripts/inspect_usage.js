const fs = require('fs');
const path = require('path');

function getMatches(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imgMatches = content.match(/\/assets\/images\/[^"'`\s\)]+/g) || [];
  const vidMatches = content.match(/\/assets\/videos\/[^"'`\s\)]+/g) || [];
  return { file: filePath, imgs: imgMatches, vids: vidMatches };
}

const files = [
  'src/index.njk',
  'src/showcase.njk',
  'src/collection.njk',
  'src/plans.njk',
  'src/product/vault.njk',
  'src/product/page-transition-course.njk',
  'src/product/button-pack.njk',
  'src/product/community.njk',
  'src/_includes/components/nav.njk',
  'src/_includes/components/footer.njk',
  'src/_includes/components/sitemap.njk'
];

let allImgs = [];
let allVids = [];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const res = getMatches(f);
    console.log(`=== ${f} ===`);
    console.log(`Images: ${res.imgs.length} (unique: ${new Set(res.imgs).size})`);
    console.log(`Videos: ${res.vids.length} (unique: ${new Set(res.vids).size})`);
    allImgs.push(...res.imgs);
    allVids.push(...res.vids);
  }
});

console.log('\n--- TOTAL ACROSS TEMPLATES ---');
console.log(`Total image references: ${allImgs.length}, unique paths: ${new Set(allImgs).size}`);
console.log(`Total video references: ${allVids.length}, unique paths: ${new Set(allVids).size}`);

