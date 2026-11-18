const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const poolDir = path.join(__dirname, '..', 'cache_real_photos', 'tech_pool');
const poolFiles = fs.readdirSync(poolDir).filter(f => f.endsWith('.jpg')).map(f => path.join(poolDir, f));

console.log(`Loaded ${poolFiles.length} pure tech background photos from pool.`);

// Segregate into Tech Landscape (0..55) and Tech Portraits (56..poolFiles.length-1)
const landscapePool = poolFiles.slice(0, 56);
const portraitPool = poolFiles.slice(56);
console.log(`Landscape tech photos: ${landscapePool.length}, Portrait developer photos: ${portraitPool.length}`);

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

// 1. Generate Developer & Tech Professional Portrait (Zero Nature)
async function generateDeveloperPortrait(destPath, index, size = 400) {
  const photoFile = portraitPool[index % portraitPool.length];
  const modBrightness = 0.96 + (index % 11) * 0.01;
  const modSat = 1.0 + (index % 7) * 0.02;

  const ext = path.extname(destPath).toLowerCase();
  let pipeline = sharp(photoFile)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .modulate({ brightness: modBrightness, saturation: modSat });

  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 85 }).toFile(destPath);
  } else if (ext === '.png') {
    await pipeline.png({ compressionLevel: 6 }).toFile(destPath);
  } else {
    await pipeline.avif({ quality: 80, effort: 2 }).toFile(destPath);
  }
}

// 2. Generate Real Tech / Code / AI Photo with glassmorphic title badge
async function generateTechImage(destPath, index, w = 1440, h = 900, overlayTitle = null) {
  const photoFile = landscapePool[index % landscapePool.length];
  const accent = accents[index % accents.length];
  const modBrightness = 0.95 + (index % 9) * 0.015;

  let pipeline = sharp(photoFile)
    .resize(w, h, { fit: 'cover' })
    .modulate({ brightness: modBrightness });

  if (overlayTitle) {
    const safeTitle = overlayTitle.replace(/[<>&"]/g, '').toUpperCase().slice(0, 36);
    const svgBadge = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0B0F17" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#0B0F17" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#0B0F17" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#vignette)"/>
      <rect x="50" y="40" width="380" height="48" rx="24" fill="#0B0F17" fill-opacity="0.88" stroke="${accent}" stroke-width="1.5"/>
      <circle cx="75" cy="64" r="6" fill="${accent}"/>
      <text x="96" y="70" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" fill="#FFFFFF">${safeTitle}</text>
    </svg>`;
    pipeline = pipeline.composite([{ input: Buffer.from(svgBadge), top: 0, left: 0 }]);
  }

  const ext = path.extname(destPath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 85 }).toFile(destPath);
  } else if (ext === '.png') {
    await pipeline.png({ compressionLevel: 6 }).toFile(destPath);
  } else {
    await pipeline.avif({ quality: 78, effort: 2 }).toFile(destPath);
  }
}

// 3. Generate Pure Tech Interactive Button Image (Code background + glassmorphic CTA)
async function generateButtonImage(destPath, index) {
  const photoFile = landscapePool[(index * 3) % landscapePool.length];
  const label = buttonLabels[index % buttonLabels.length];
  const accent = accents[index % accents.length];
  const padded = String(index + 1).padStart(3, '0');

  const svgButton = `
  <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <rect width="1440" height="900" fill="#0B0F17" fill-opacity="0.65"/>
    <rect x="80" y="60" width="1280" height="780" rx="16" fill="#131B2E" fill-opacity="0.4" stroke="#1E293B" stroke-width="2"/>
    <g transform="translate(120, 100)">
      <rect width="240" height="36" rx="18" fill="#0B0F17" fill-opacity="0.8" stroke="${accent}" stroke-width="1.5"/>
      <circle cx="20" cy="18" r="5" fill="${accent}"/>
      <text x="36" y="23" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF">CX-BTN-${padded}</text>
    </g>
    <g transform="translate(420, 405)">
      <rect width="600" height="90" rx="12" fill="${accent}" fill-opacity="0.95"/>
      <rect width="600" height="90" rx="12" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.5"/>
      <text x="300" y="54" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#0B0F17" text-anchor="middle" letter-spacing="1">${label}</text>
    </g>
  </svg>`;

  const ext = path.extname(destPath).toLowerCase();
  let pipeline = sharp(photoFile)
    .resize(1440, 900, { fit: 'cover' })
    .blur(8)
    .composite([{ input: Buffer.from(svgButton), top: 0, left: 0 }]);

  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 85 }).toFile(destPath);
  } else {
    await pipeline.avif({ quality: 78, effort: 2 }).toFile(destPath);
  }
}

async function generateAll() {
  console.log('=== STARTING GENERATION OF 770 PURE TECH IMAGES (ZERO NATURE) ===');

  // 1. Avatars (24)
  console.log('1. Generating 24 Developer Avatars...');
  const avatarDir = 'src/assets/images/avatars';
  const avatarFiles = fs.readdirSync(avatarDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(avatarFiles, 6, (f, i) => generateDeveloperPortrait(path.join(avatarDir, f), i, 400));

  // 2. Showcase Credits (108)
  console.log('2. Generating 108 Developer Credit Avatars...');
  const creditDir = 'src/assets/images/showcase-credits-img';
  const creditFiles = fs.readdirSync(creditDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(creditFiles, 12, (f, i) => generateDeveloperPortrait(path.join(creditDir, f), i + 24, 128));

  // 3. Authors (25)
  console.log('3. Generating 25 Tech Author Avatars...');
  const authorDir = 'src/assets/images/website/author';
  const authorFiles = fs.readdirSync(authorDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(authorFiles, 6, (f, i) => {
    const size = f.includes('270x270') ? 270 : 200;
    return generateDeveloperPortrait(path.join(authorDir, f), i + 132, size);
  });

  // 4. Showcase Images (96 + 12)
  console.log('4. Generating Showcase Web & Software Application Images...');
  const showDir = 'src/assets/images/showcase-img';
  const showFiles = fs.readdirSync(showDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(showFiles, 8, (f, i) => {
    const title = formatTitle(f);
    return generateTechImage(path.join(showDir, f), i, 1440, 900, title);
  });

  const showRoot = 'src/assets/images/showcase';
  const showRootFiles = fs.readdirSync(showRoot).filter(f => !f.endsWith('.svg'));
  await runInBatches(showRootFiles, 6, (f, i) => {
    const title = formatTitle(f);
    return generateTechImage(path.join(showRoot, f), i + 96, 1440, 900, title);
  });

  // 5. Resource Images (270 + 12)
  console.log('5. Generating 282 Resource Component Images...');
  const resDir = 'src/assets/images/resource-img';
  const resFiles = fs.readdirSync(resDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(resFiles, 12, (f, i) => {
    const title = formatTitle(f);
    return generateTechImage(path.join(resDir, f), i + 20, 1440, 900, title);
  });

  const resRoot = 'src/assets/images/resources';
  const resRootFiles = fs.readdirSync(resRoot).filter(f => !f.endsWith('.svg'));
  await runInBatches(resRootFiles, 6, (f, i) => {
    const title = formatTitle(f);
    return generateTechImage(path.join(resRoot, f), i + 290, 1440, 900, title);
  });

  // 6. Button Images (101 + 10)
  console.log('6. Generating 111 Tech Button Images...');
  const btnDir = 'src/assets/images/button-img';
  const btnFiles = fs.readdirSync(btnDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(btnFiles, 8, (f, i) => generateButtonImage(path.join(btnDir, f), i));

  const btnPackDir = 'src/assets/images/website/button-pack';
  const btnPackFiles = fs.readdirSync(btnPackDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(btnPackFiles, 6, (f, i) => generateButtonImage(path.join(btnPackDir, f), i + 101));

  // 7. Bandwidth & Features Images
  console.log('7. Generating Bandwidth & Features Tech Images...');
  const bandDir = 'src/assets/images/website/bandwidth';
  const bandFiles = fs.readdirSync(bandDir).filter(f => !f.endsWith('.svg'));
  await runInBatches(bandFiles, 8, (f, i) => {
    const title = formatTitle(f);
    const w = f.includes('1080x1350') ? 1080 : 1440;
    const h = f.includes('1080x1350') ? 1350 : 900;
    return generateTechImage(path.join(bandDir, f), i + 35, w, h, title);
  });

  const featDir = 'src/assets/images/website/features';
  if (fs.existsSync(featDir)) {
    const featFiles = fs.readdirSync(featDir).filter(f => !f.endsWith('.svg'));
    await runInBatches(featFiles, 6, (f, i) => {
      const title = formatTitle(f);
      return generateTechImage(path.join(featDir, f), i + 50, 1440, 900, title);
    });
  }

  const metaDir = 'src/assets/images/website/meta-image';
  if (fs.existsSync(metaDir)) {
    const metaFiles = fs.readdirSync(metaDir).filter(f => !f.endsWith('.svg'));
    await runInBatches(metaFiles, 4, (f, i) => generateTechImage(path.join(metaDir, f), 1, 1200, 630, 'CX TECHNOLOGY PLATFORM'));
  }

  console.log('=== ALL 770 IMAGES SUCCESSFULLY REPLACED WITH 100% PURE TECH & DEV ASSETS! ===');
}

generateAll().catch(err => {
  console.error('Fatal error in image generation:', err);
  process.exit(1);
});

