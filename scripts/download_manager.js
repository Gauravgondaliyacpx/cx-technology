const https = require('https');
const fs = require('fs');
const path = require('path');

const creditProfileIds = [
  'photo-1534528741775-53994a69daeb',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1494790108377-be9c29b29330',
  'photo-1500648767791-00dcc994a43e',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1580489944761-15a19d654956',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1560250097-0b93528c311a',
  'photo-1539571696357-5a69c17a67c6',
  'photo-1517841905240-472988babdf9',
  'photo-1522075469751-3a6694fb2f61',
  'photo-1544005313-94ddf0286df2',
  'photo-1501196354995-cbb51c65aaea',
  'photo-1492562080023-ab3db95bfbce',
  'photo-1524504388940-b1c1722653e1',
  'photo-1531746020798-e6953c6e8e04',
  'photo-1519345182560-3f2917c472ef',
  'photo-1522529599102-193c0d76b5b6',
  'photo-1548142813-c348350df52b',
  'photo-1508214751196-bcfd4ca60f91',
  'photo-1529626455594-4ff0802cfb7e',
  'photo-1488426862026-3ee34a7d66df',
  'photo-1541823709867-1b206113eafd',
  'photo-1568602471122-7832951cc4c5',
  'photo-1570295999919-56ceb5ecca61',
  'photo-1543610892-0b1f7e6d8ac1',
  'photo-1527980965255-d3b416303d12'
];

const techVisualIds = [
  'photo-1460925895917-afdab827c52f',
  'photo-1507238691740-187a5b1d37b8',
  'photo-1581291518633-83b4ebd1d83e',
  'photo-1551288049-bebda4e38f71',
  'photo-1522542550221-31fd19575a2d',
  'photo-1542744094-3a31f272c490',
  'photo-1519389950473-47ba0277781c',
  'photo-1526374965328-7f61d4dc18c5',
  'photo-1504639725590-34d0984388bd',
  'photo-1498050108023-c5249f4df085',
  'photo-1559028012-481c04fa702d',
  'photo-1547658719-da2b51169166',
  'photo-1517245386807-bb43f82c33c4',
  'photo-1508739773434-c26b3d09e071',
  'photo-1558494949-ef010cbdcc31',
  'photo-1555066931-4365d14bab8c',
  'photo-1517694712202-14dd9538aa97',
  'photo-1526379095098-d400fd0bf935',
  'photo-1618401471353-b98afee0b2eb',
  'photo-1504384308090-c894fdcc538d',
  'photo-1531403009284-440f080d1e12',
  'photo-1518770660439-4636190af475',
  'photo-1571171637578-41bc2dd41cd2',
  'photo-1551836022-d5d88e9218df',
  'photo-1550751827-4bd374c3f58b',
  'photo-1563986768609-322da13575f3',
  'photo-1525547719571-a2d4ac8945e2',
  'photo-1544197150-b99a580bb7a8',
  'photo-1618005182384-a83a8bd57fbe',
  'photo-1677442136019-21780ecad995',
  'photo-1620712943543-bcc4688e7485',
  'photo-1634017839464-5c339ebe3cb4',
  'photo-1676299081847-824916de030a',
  'photo-1639762681485-074b7f938ba0',
  'photo-1509228468518-180dd4864904',
  'photo-1527474305487-b87b222841cc',
  'photo-1516321318423-f06f85e504b3',
  'photo-1535378620166-273708d44e4c',
  'photo-1618172193763-c511deb635ca',
  'photo-1620641788421-7a1c342ea42e'
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  const cacheDir = 'cache_media';
  const profileCache = path.join(cacheDir, 'profiles');
  const visualCache = path.join(cacheDir, 'visuals');
  
  fs.mkdirSync(profileCache, { recursive: true });
  fs.mkdirSync(visualCache, { recursive: true });

  console.log('--- Step 1: Downloading profile avatar pool (128x128) ---');
  const cachedProfiles = [];
  for (let i = 0; i < creditProfileIds.length; i++) {
    const id = creditProfileIds[i];
    const outPath = path.join(profileCache, `profile-${i}.avif`);
    if (!fs.existsSync(outPath) || fs.statSync(outPath).size === 0) {
      const url = `https://images.unsplash.com/${id}?w=128&h=128&fit=crop&crop=faces&q=85&fm=avif`;
      try {
        await downloadFile(url, outPath);
        console.log(`  Downloaded profile [${i + 1}/${creditProfileIds.length}]`);
      } catch (e) {
        console.warn(`  Failed profile ${id}: ${e.message}`);
      }
    }
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
      cachedProfiles.push(outPath);
    }
  }

  console.log('--- Step 2: Downloading tech visual pool (1440x900) ---');
  const cachedVisuals = [];
  for (let i = 0; i < techVisualIds.length; i++) {
    const id = techVisualIds[i];
    const outPath = path.join(visualCache, `visual-${i}.avif`);
    if (!fs.existsSync(outPath) || fs.statSync(outPath).size === 0) {
      const url = `https://images.unsplash.com/${id}?w=1440&h=900&fit=crop&q=85&fm=avif`;
      try {
        await downloadFile(url, outPath);
        console.log(`  Downloaded visual [${i + 1}/${techVisualIds.length}]`);
      } catch (e) {
        console.warn(`  Failed visual ${id}: ${e.message}`);
      }
    }
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
      cachedVisuals.push(outPath);
    }
  }

  console.log(`Cache ready: ${cachedProfiles.length} profiles, ${cachedVisuals.length} visuals.`);

  // Step 3: Populate showcase-credits-img (108 files)
  const creditsDir = 'src/assets/images/showcase-credits-img';
  if (fs.existsSync(creditsDir)) {
    const files = fs.readdirSync(creditsDir);
    console.log(`Populating ${files.length} showcase credit avatars...`);
    files.forEach((file, idx) => {
      const dest = path.join(creditsDir, file);
      const src = cachedProfiles[idx % cachedProfiles.length];
      fs.copyFileSync(src, dest);
    });
  }

  // Step 4: Populate showcase-img (96 files)
  const showcaseDir = 'src/assets/images/showcase-img';
  if (fs.existsSync(showcaseDir)) {
    const files = fs.readdirSync(showcaseDir);
    console.log(`Populating ${files.length} showcase images...`);
    files.forEach((file, idx) => {
      const dest = path.join(showcaseDir, file);
      const src = cachedVisuals[idx % cachedVisuals.length];
      fs.copyFileSync(src, dest);
    });
  }

  // Step 5: Populate resource-img (272 files)
  const resourceDir = 'src/assets/images/resource-img';
  if (fs.existsSync(resourceDir)) {
    const files = fs.readdirSync(resourceDir);
    console.log(`Populating ${files.length} resource images...`);
    files.forEach((file, idx) => {
      const dest = path.join(resourceDir, file);
      // Offset by 3 to vary from showcase
      const src = cachedVisuals[(idx + 3) % cachedVisuals.length];
      fs.copyFileSync(src, dest);
    });
  }

  // Step 6: Populate button-img (101 files)
  const buttonDir = 'src/assets/images/button-img';
  if (fs.existsSync(buttonDir)) {
    const files = fs.readdirSync(buttonDir);
    console.log(`Populating ${files.length} button images...`);
    files.forEach((file, idx) => {
      const dest = path.join(buttonDir, file);
      const src = cachedVisuals[(idx + 7) % cachedVisuals.length];
      fs.copyFileSync(src, dest);
    });
  }

  // Step 7: Populate website/bandwidth old templates
  const bandwidthDir = 'src/assets/images/website/bandwidth';
  if (fs.existsSync(bandwidthDir)) {
    const bwTargets = [
      'dash-screen-webflow.avif',
      'osmo-page-transition-course-trailer-thumb.avif',
      'osmo-vault-main-placeholder.avif',
      'osmo-vault-webcam-static-500x500.avif',
      'osmo-video-thumb-layered-image-slider-1440x900.avif',
      'pf-dennis.avif',
      'pf-ilja.avif',
      'dennis-cutout-new.avif',
      'ilja-cutout-new.avif',
      'female-dev-subject.avif',
      'video-tutorial-1440x900-v3.avif',
      'copy-context-ai-1440x900-v2.avif'
    ];
    bwTargets.forEach((file, idx) => {
      const dest = path.join(bandwidthDir, file);
      if (fs.existsSync(dest)) {
        if (file.startsWith('pf-') || file.includes('cutout') || file.includes('dev-subject')) {
          fs.copyFileSync(cachedProfiles[idx % cachedProfiles.length], dest);
        } else {
          fs.copyFileSync(cachedVisuals[idx % cachedVisuals.length], dest);
        }
      }
    });
    console.log('Updated bandwidth template visuals.');
  }

  // Step 8: Populate website/button-pack
  const btnPackDir = 'src/assets/images/website/button-pack';
  if (fs.existsSync(btnPackDir)) {
    const files = fs.readdirSync(btnPackDir);
    files.forEach((file, idx) => {
      const dest = path.join(btnPackDir, file);
      fs.copyFileSync(cachedVisuals[(idx + 11) % cachedVisuals.length], dest);
    });
    console.log('Updated button-pack visuals.');
  }

  console.log('\n=== ALL IMAGES SUCCESSFULLY UPDATED TO REAL CX TECHNOLOGY ASSETS! ===');
}

run();
