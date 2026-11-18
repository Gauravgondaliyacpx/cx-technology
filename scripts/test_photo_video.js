const https = require('https');
const sharp = require('sharp');
const { execFileSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
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

async function testPhotographicMotionVideo() {
  console.log('Fetching realistic tech photo from Picsum...');
  // Photo 0 is a real photo of a developer with laptop and notebook on a desk
  const photoBuf = await fetchBuffer('https://picsum.photos/id/0/1440/900');
  fs.writeFileSync('sample_bg.jpg', photoBuf);

  console.log('Generating realistic motion video with camera zoom + animated UI...');
  // FFmpeg zoompan filter on the real photograph + animated code & metrics overlay
  execFileSync(ffmpeg, [
    '-y',
    '-loop', '1',
    '-i', 'sample_bg.jpg',
    '-vf', [
      "zoompan=z='min(zoom+0.0025,1.25)':d=72:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1440x900",
      "drawbox=x=0:y=0:w=1440:h=900:color=#0B0F17@0.45:t=fill",
      "drawbox=x=100:y=100:w=1240:h=700:color=#E0A16C@0.7:t=2",
      "drawbox=x=120:y='120+660*(t/3)':w=1200:h=3:color=#EFDDB7@0.9:t=fill",
      "format=yuv420p"
    ].join(','),
    '-t', '3',
    '-r', '24',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-movflags', '+faststart',
    'test_realistic_video.mp4'
  ]);

  console.log('Realistic video created! Size:', fs.statSync('test_realistic_video.mp4').size);
  fs.unlinkSync('sample_bg.jpg');
  fs.unlinkSync('test_realistic_video.mp4');
}

testPhotographicMotionVideo();

