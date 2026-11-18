const https = require('https');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const photosIndex = require('../cache_real_photos/photos_index.json');
console.log(`Loaded ${photosIndex.length} real photo records from index.`);

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

// 40 Curated high quality diverse portrait IDs from Unsplash
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

// Additional Picsum portrait IDs
const picsumPortraits = [
  64, 91, 103, 177, 209, 219, 237, 334, 338, 342, 349, 375, 399, 433, 447, 453, 506, 514, 525, 532, 535, 545, 550, 560, 580
];

const accents = [
  '#E0A16C', '#EFDDB7', '#B1B6A2', '#38BDF8', '#60A5FA', 
  '#34D399', '#A78BFA', '#F472B6', '#FBBF24', '#2DD4BF'
];

const buttonLabels = [
  "INITIALIZE AI CLUSTER", "DEPLOY MICROSERVICE", "SCALE CLOUD NODES", "COMPILE TYPESCRIPT",
  "STREAM KAFKA PIPELINE", "EXECUTE RAG QUERY", "SYNC FIGMA TOKENS", "RUN UNIT TESTS",
  "ENCRYPT DATA VAULT", "AUTHORIZE OAUTH TOKEN", "INSPECT DOM TREE", "OPTIMIZE GSAP TIMELINE",
  "PROVISION KUBERNETES", "RUN BENCHMARKS", "TRIGGER WEBHOOK", "HYDRATE COMPONENT",
  "INDEX VECTOR EMBEDDINGS", "REBASE GIT BRANCH", "GENERATE TEST SUITE", "MONITOR CYBER DEFENSE",
  "QUERY GRAPHQL SCHEMA", "BUILD DOCKER IMAGE", "WARM SERVERLESS CACHE", "CALCULATE NEURAL WEIGHTS",
  "EXPORT OPENAPI SPEC", "VALIDATE JSON SCHEMA", "FORMAT PRETTIER CODE", "LINT ESLINT RULES",
  "TRACE DISTRIBUTED SPAN", "ANALYZE HEAP MEMORY", "FLUSH REDIS CACHE", "RESOLVE DNS RECORDS",
  "ROTATE TLS CERTIFICATES", "STREAM SSE EVENTS", "BROADCAST WEBSOCKET", "FORK REPOSITORY",
  "CHERRY-PICK COMMIT", "TAG PRODUCTION RELEASE", "ROLLBACK DEPLOYMENT", "DRAIN CANARY PODS",
  "VERIFY HASH INTEGRITY", "SIGN JWT CLAIMS", "GENERATE API KEY", "MIGRATE POSTGRES SCHEMA",
  "INDEX ELASTIC DATABASE", "RENDER CANVAS WEBGL", "MOUNT VIRTUAL DOM", "SUBSCRIBE RXJS STREAM",
  "COMPILE WEBASSEMBLY", "PROFILE CPU USAGE", "BENCHMARK TPS THROUGHPUT", "TRAIN TRANSFORMER MODEL",
  "FINE-TUNE HYPERPARAMETERS", "VECTORIZE DOCUMENTS", "EMBED SEMANTIC TEXT", "CLUSTER K-MEANS LATENT",
  "SYNTHESIZE VOICE AUDIO", "SEGMENT IMAGE MASKS", "DETECT OBJECT BOUNDING", "EVALUATE PRECISION METRIC",
  "QUANTIZE FP16 MODEL", "DISTILL STUDENT MODEL", "CACHE INFERENCE PROMPT", "ROUTE GATEWAY PROXY",
  "THROTTLE RATE LIMITS", "ENFORCE CORS POLICY", "VALIDATE CSRF TOKEN", "AUDIT IAM ROLES",
  "DEPLOY EDGE FUNCTION", "PRUNE UNUSED IMAGES", "COMPRESS VIDEO ASSET", "BUNDLE WEBPACK CHUNKS",
  "MINIFY CSS STYLESHEETS", "TRANSPILE BABEL CODE", "TREE-SHAKE EXPORTS", "REGISTER SERVICE WORKER",
  "CACHE OFFLINE PWA", "SIMULATE NETWORK LATENCY", "RUN END-TO-END CYPRESS", "CAPTURE VISUAL REGRESSION",
  "INSPECT NETWORK HAR", "DEBUG CHROME DEVTOOLS", "DUMP SQLITE DATABASE", "PARTITION KAFKA TOPIC",
  "ELECT RAFT LEADER", "CONSOLIDATE WAL LOGS", "REPLICATE CROSS-REGION", "TRIGGER PAGERDUTY ALERT",
  "CHECK PROMETHEUS METRICS", "RENDER GRAFANA DASHBOARD", "TRACE OPENTELEMETRY SPAN", "INGEST LOG STASH",
  "EXECUTE SQL QUERY", "SNAPSHOT EBS VOLUME", "RESTORE BACKUP ARCHIVE", "ESTABLISH VPC PEERING",
  "ATTACH IAM POLICY", "CONFIGURE LOAD BALANCER", "VERIFY HEALTH CHECK", "SCALE TO ZERO ACTIVE"
];

function formatTitle(name) {
  return name
    .replace(/-\d+x\d+.*$/, '')
    .replace(/-v\d+$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function runInBatches(items, batchSize, fn) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map((item, idx) => fn(item, i + idx)));
    process.stdout.write(`  Processed ${Math.min(i + batchSize, items.length)}/${items.length}\r`);
  }
  console.log('');
}

// 1. Download and process realistic avatar photo
async function generateAvatar(destPath, index) {
  try {
    let buf;
    if (index < unsplashPortraits.length) {
      const uId = unsplashPortraits[index];
      buf = await fetchBuffer(`https://images.unsplash.com/${uId}?w=400&h=400&fit=crop&crop=faces&q=80`);
    } else {
      const pId = picsumPortraits[(index - unsplashPortraits.length) % picsumPortraits.length];
      buf = await fetchBuffer(`https://picsum.photos/id/${pId}/400/400`);
    }
    await sharp(buf)
      .resize(400, 400, { fit: 'cover' })
      .avif({ quality: 80, effort: 2 })
      .toFile(destPath);
  } catch (e) {
    // Fallback to picsum photo
    const p = photosIndex[(index * 7) % photosIndex.length];
    const buf = await fetchBuffer(`https://picsum.photos/id/${p.id}/400/400`);
    await sharp(buf).resize(400, 400, { fit: 'cover' }).avif({ quality: 80, effort: 2 }).toFile(destPath);
  }
}

// 2. Download and process realistic landscape tech photo
async function generateTechPhoto(destPath, photoIndex, w = 1440, h = 900, overlayTitle = null) {
  const p = photosIndex[photoIndex % photosIndex.length];
  const url = `https://picsum.photos/id/${p.id}/${Math.min(w, 1920)}/${Math.min(h, 1200)}`;
  const buf = await fetchBuffer(url);

  let pipeline = sharp(buf).resize(w, h, { fit: 'cover' });

  // If overlayTitle is provided, apply a subtle modern glassmorphic header badge
  if (overlayTitle) {
    const accent = accents[photoIndex % accents.length];
    const svgBadge = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#000000" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.7"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#vignette)"/>
      <rect x="50" y="40" width="340" height="48" rx="24" fill="#0B0F17" fill-opacity="0.8" stroke="${accent}" stroke-width="1.5"/>
      <circle cx="75" cy="64" r="6" fill="${accent}"/>
      <text x="95" y="70" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF">${overlayTitle.toUpperCase().slice(0, 32)}</text>
    </svg>`;
    pipeline = pipeline.composite([{ input: Buffer.from(svgBadge), top: 0, left: 0 }]);
  }

  const ext = path.extname(destPath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 85 }).toFile(destPath);
  } else {
    await pipeline.avif({ quality: 78, effort: 2 }).toFile(destPath);
  }
}

// 3. Realistic Button Image (Real photographic backdrop + sleek interactive button)
async function generateButtonImage(destPath, index) {
  const p = photosIndex[(index + 350) % photosIndex.length];
  const buf = await fetchBuffer(`https://picsum.photos/id/${p.id}/1440/900`);
  const label = buttonLabels[index % buttonLabels.length];
  const accent = accents[index % accents.length];
  const padded = String(index + 1).padStart(3, '0');

  const svgButton = `
  <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <!-- Dark glassmorphic backdrop overlay -->
    <rect width="1440" height="900" fill="#0B0F17" fill-opacity="0.75"/>
    
    <!-- Outer glass card -->
    <rect x="80" y="70" width="1280" height="760" rx="24" fill="#111827" fill-opacity="0.6" stroke="#334155" stroke-width="1.5"/>
    <circle cx="120" cy="110" r="6" fill="#EF4444"/>
    <circle cx="140" cy="110" r="6" fill="#F59E0B"/>
    <circle cx="160" cy="110" r="6" fill="#10B981"/>
    <text x="190" y="116" font-family="system-ui" font-weight="600" font-size="14" fill="#94A3B8">CX TECHNOLOGY // INTERACTIVE BUTTON PACK</text>
    <text x="1320" y="116" font-family="monospace" font-size="14" fill="${accent}" text-anchor="end">BTN-${padded}</text>
    
    <!-- Central Button -->
    <rect x="440" y="405" width="560" height="90" rx="45" fill="${accent}"/>
    <text x="720" y="460" font-family="system-ui" font-weight="bold" font-size="22" fill="#0B0F17" text-anchor="middle" letter-spacing="1">${label} →</text>
    <text x="720" y="550" font-family="monospace" font-size="14" fill="#94A3B8" text-anchor="middle">PHYSICS: SPRING | HOVER: MAGNETIC | ACCENT: ${accent}</text>
  </svg>`;

  await sharp(buf)
    .resize(1440, 900, { fit: 'cover' })
    .blur(8)
    .composite([{ input: Buffer.from(svgButton), top: 0, left: 0 }])
    .avif({ quality: 78, effort: 2 })
    .toFile(destPath);
}

async function run() {
  console.log('=== STARTING GENERATION OF 700+ REALISTIC PHOTOGRAPHIC IMAGES ===');

  // 1. Avatars (Real Human Portraits)
  console.log('1. Generating Real Human Portraits for Team Avatars...');
  const avDir = 'src/assets/images/avatars';
  const avFiles = fs.readdirSync(avDir);
  await runInBatches(avFiles, 6, (f, i) => generateAvatar(path.join(avDir, f), i));

  console.log('2. Generating Real Human Portraits for Showcase Credits...');
  const credDir = 'src/assets/images/showcase-credits-img';
  const credFiles = fs.readdirSync(credDir);
  await runInBatches(credFiles, 6, (f, i) => generateAvatar(path.join(credDir, f), i + 24));

  console.log('3. Generating Real Human Portraits for Authors...');
  const authDir = 'src/assets/images/website/author';
  const authFiles = fs.readdirSync(authDir);
  await runInBatches(authFiles, 6, (f, i) => generateAvatar(path.join(authDir, f), i + 132));

  // 2. Showcase Projects (Real Tech Workspaces & Screens)
  console.log('4. Generating Real Tech Photos for Showcase Projects...');
  const showDir = 'src/assets/images/showcase-img';
  const showFiles = fs.readdirSync(showDir);
  await runInBatches(showFiles, 6, (f, i) => {
    const title = formatTitle(f);
    return generateTechPhoto(path.join(showDir, f), i + 20, 1440, 900, title);
  });

  const featShowDir = 'src/assets/images/showcase';
  if (fs.existsSync(featShowDir)) {
    const featFiles = fs.readdirSync(featShowDir);
    await runInBatches(featFiles, 6, (f, i) => {
      const title = formatTitle(f);
      return generateTechPhoto(path.join(featShowDir, f), i + 120, 1440, 900, title);
    });
  }

  // 3. Resource Images (Real Web & Software Tech Workspaces)
  console.log('5. Generating Real Tech Photos for Resource Components...');
  const resDir = 'src/assets/images/resource-img';
  const resFiles = fs.readdirSync(resDir);
  await runInBatches(resFiles, 6, (f, i) => {
    const title = formatTitle(f);
    return generateTechPhoto(path.join(resDir, f), i + 150, 1440, 900, title);
  });

  const resCardsDir = 'src/assets/images/resources';
  if (fs.existsSync(resCardsDir)) {
    const resCardsFiles = fs.readdirSync(resCardsDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
    await runInBatches(resCardsFiles, 6, (f, i) => {
      const title = formatTitle(f);
      return generateTechPhoto(path.join(resCardsDir, f), i + 420, 1440, 900, title);
    });
  }

  // 4. Button Images (Real Photographic Backdrop + Glassmorphic Buttons)
  console.log('6. Generating Realistic Button Images...');
  const btnDir = 'src/assets/images/button-img';
  const btnFiles = fs.readdirSync(btnDir);
  await runInBatches(btnFiles, 6, (f, i) => generateButtonImage(path.join(btnDir, f), i));

  // 5. Bandwidth / Website / Features / Meta
  console.log('7. Generating Realistic Bandwidth & Website Images...');
  const bandDir = 'src/assets/images/website/bandwidth';
  if (fs.existsSync(bandDir)) {
    const bandFiles = fs.readdirSync(bandDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
    await runInBatches(bandFiles, 6, (f, i) => {
      const title = formatTitle(f);
      return generateTechPhoto(path.join(bandDir, f), i + 440, 1440, 900, title);
    });
  }

  const bpDir = 'src/assets/images/website/button-pack';
  if (fs.existsSync(bpDir)) {
    const bpFiles = fs.readdirSync(bpDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
    await runInBatches(bpFiles, 6, (f, i) => {
      return generateTechPhoto(path.join(bpDir, f), i + 490, 1440, 900, 'Button Pack');
    });
  }

  const metaDir = 'src/assets/images/website/meta-image';
  if (fs.existsSync(metaDir)) {
    const metaFiles = fs.readdirSync(metaDir);
    await runInBatches(metaFiles, 6, (f, i) => {
      const title = formatTitle(f);
      return generateTechPhoto(path.join(metaDir, f), i + 510, 1200, 630, title);
    });
  }

  const featImg = 'src/assets/images/website/features/dashboard-overview-2880x1800.jpg';
  if (fs.existsSync(path.dirname(featImg))) {
    await generateTechPhoto(featImg, 530, 2880, 1800, 'Enterprise Dashboard');
  }

  console.log('=== ALL 700+ IMAGES SUCCESSFULLY REPLACED WITH AUTHENTIC REALISTIC PHOTOGRAPHY! ===');
}

run().catch(err => {
  console.error('Fatal realistic image generation error:', err);
  process.exit(1);
});

