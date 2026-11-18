const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const poolDir = path.join(__dirname, '..', 'cache_real_photos', 'tech_pool');
const poolFiles = fs.readdirSync(poolDir).filter(f => f.endsWith('.jpg')).map(f => path.join(poolDir, f));

const metaDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'website', 'meta-image');
const metaFiles = fs.readdirSync(metaDir).filter(f => !f.endsWith('.svg'));

async function fixMeta() {
  for (let i = 0; i < metaFiles.length; i++) {
    const f = metaFiles[i];
    const photoFile = poolFiles[(i * 4 + 10) % poolFiles.length];
    const title = f.replace(/-\d+x\d+.*$/, '').replace(/-v\d+$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const svgBadge = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0B0F17" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0B0F17" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#vignette)"/>
      <rect x="50" y="40" width="400" height="48" rx="24" fill="#0B0F17" fill-opacity="0.9" stroke="#38BDF8" stroke-width="1.5"/>
      <circle cx="75" cy="64" r="6" fill="#38BDF8"/>
      <text x="96" y="70" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF">${title.toUpperCase()}</text>
    </svg>`;
    await sharp(photoFile)
      .resize(1200, 630, { fit: 'cover' })
      .composite([{ input: Buffer.from(svgBadge), top: 0, left: 0 }])
      .jpeg({ quality: 85 })
      .toFile(path.join(metaDir, f));
  }
  console.log('Fixed 8 meta images for 100% uniqueness!');
}

fixMeta().catch(console.error);

