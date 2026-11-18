const fs = require('fs');

const codeFiles = ['src/index.njk', 'src/showcase.njk', 'src/collection.njk', 'src/plans.njk', 'src/product/vault.njk', 'src/product/page-transition-course.njk', 'src/product/button-pack.njk', 'src/product/community.njk', 'src/_includes/components/head.njk', 'src/_includes/components/nav.njk', 'src/_includes/components/footer.njk', 'src/_includes/components/sitemap.njk'];

const osmoFiles = [
  'osmo-icon-favicon',
  'osmo-icon-webclip',
  'osmo-logo',
  'osmo-micrographic-1',
  'osmo-micrographic-2',
  'osmo-micrographic-3',
  'osmo-page-transition-course-trailer-thumb',
  'osmo-vault-main-placeholder',
  'osmo-vault-webcam-static-500x500',
  'osmo-video-thumb-layered-image-slider',
  'made-with-osmo'
];

codeFiles.forEach(cf => {
  const c = fs.readFileSync(cf, 'utf8');
  osmoFiles.forEach(of => {
    if (c.includes(of)) console.log(`Code file ${cf} references ${of}`);
  });
});

