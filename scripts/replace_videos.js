const fs = require('fs');
const path = require('path');

const techVideos = [
  'src/assets/videos/web-transitions.mp4',
  'src/assets/videos/ai-development.mp4',
  'src/assets/videos/software-architecture.mp4',
  'src/assets/videos/cloud-infrastructure.mp4',
  'src/assets/videos/data-pipeline.mp4',
  'src/assets/videos/interactive-ui.mp4',
  'src/assets/videos/it-services.mp4',
  'src/assets/videos/cx-reel.mp4',
  'src/assets/videos/website/features/dashboard-overview-2880x1800.mp4',
  'src/assets/videos/button-preview.mp4'
];

// Check all source tech videos exist
techVideos.forEach(v => {
  if (!fs.existsSync(v)) console.error('Missing source video:', v);
  else console.log('Found source video:', v);
});

// 1. Replace all files in resource-video
const resVideoDir = 'src/assets/videos/resource-video';
const resFiles = fs.readdirSync(resVideoDir);
console.log(`Updating ${resFiles.length} videos in ${resVideoDir}...`);
resFiles.forEach((file, index) => {
  const target = path.join(resVideoDir, file);
  const src = techVideos[index % techVideos.length];
  fs.copyFileSync(src, target);
});

// 2. Replace all files in button-video
const btnVideoDir = 'src/assets/videos/button-video';
const btnFiles = fs.readdirSync(btnVideoDir);
console.log(`Updating ${btnFiles.length} videos in ${btnVideoDir}...`);
btnFiles.forEach((file, index) => {
  const target = path.join(btnVideoDir, file);
  const btnSources = [
    'src/assets/videos/button-preview.mp4',
    'src/assets/videos/interactive-ui.mp4',
    'src/assets/videos/web-transitions.mp4',
    'src/assets/videos/software-architecture.mp4'
  ];
  const src = btnSources[index % btnSources.length];
  fs.copyFileSync(src, target);
});

// 3. Replace Osmo Reel if present
const osmoReel = 'src/assets/videos/6708f85ff3d3cba6aff436fb%2F670e5ef201603b3a7dda3aa9_Osmo-V12-Reel-Tiny_compressed-transcode.mp4';
if (fs.existsSync(osmoReel)) {
  fs.copyFileSync('src/assets/videos/cx-reel.mp4', osmoReel);
  console.log('Replaced Osmo Reel with CX Reel.');
}

// 4. Replace resource-preview
const resPrev = 'src/assets/videos/resource-preview/preview.mp4';
if (fs.existsSync(resPrev)) {
  fs.copyFileSync('src/assets/videos/cx-reel.mp4', resPrev);
  console.log('Replaced resource-preview with CX Reel.');
}

// 5. Replace website/page-transition-course videos
const courseDir = 'src/assets/videos/website/page-transition-course';
if (fs.existsSync(courseDir)) {
  const courseFiles = fs.readdirSync(courseDir);
  console.log(`Updating ${courseFiles.length} videos in ${courseDir}...`);
  courseFiles.forEach((file, index) => {
    const target = path.join(courseDir, file);
    const src = techVideos[index % techVideos.length];
    fs.copyFileSync(src, target);
  });
}

// 6. Replace website/bandwidth video
const bandVideo = 'src/assets/videos/website/bandwidth/bandwidth-preview.mp4';
if (fs.existsSync(bandVideo)) {
  fs.copyFileSync('src/assets/videos/cloud-infrastructure.mp4', bandVideo);
  console.log('Replaced bandwidth preview with cloud-infrastructure video.');
}

console.log('SUCCESS: All video files updated successfully to CX Technology domain videos!');
