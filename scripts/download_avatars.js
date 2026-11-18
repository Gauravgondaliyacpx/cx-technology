const fs = require('fs');
const path = require('path');

// Curated high quality portraits of tech professionals from Unsplash
const avatarPhotoIds = [
  'photo-1534528741775-53994a69daeb', // Woman 1
  'photo-1507003211169-0a1dd7228f2d', // Man 1
  'photo-1494790108377-be9c29b29330', // Woman 2
  'photo-1500648767791-00dcc994a43e', // Man 2
  'photo-1517841905240-472988babdf9', // Woman 3
  'photo-1539571696357-5a69c17a67c6', // Man 3
  'photo-1524504388940-b1c1722653e1', // Woman 4
  'photo-1506794778202-cad84cf45f1d', // Man 4
  'photo-1534751516642-a171edd2521b', // Woman 5
  'photo-1519085360753-af0119f7cbe7', // Man 5
  'photo-1544005313-94ddf0286df2', // Woman 6
  'photo-1492562080023-ab3db95bfbce', // Man 6
  'photo-1573496359142-b8d87734a5a2', // Woman 7
  'photo-1501196354995-cbb51c65aaea', // Man 7
  'photo-1580489944761-15a19d654956', // Woman 8
  'photo-1472099645785-5658abf4ff4e', // Man 8
  'photo-1531746020798-e6953c6e8e04', // Woman 9
  'photo-1522075469751-3a6694fb2f61', // Man 9
  'photo-1567532939604-b6b5b0db2604', // Woman 10
  'photo-1560250097-0b93528c311a', // Man 10
  'photo-1573497019940-1c28c88b4f3e', // Woman 11
  'photo-1519345182560-3f2917c472ef', // Man 11
  'photo-1573497491765-dccce02b29df', // Woman 12
  'photo-1508214751196-bcfd4ca60f91'  // Woman 13
];

const destDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'avatars');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadAvatar(photoId, index) {
  const url = `https://images.unsplash.com/${photoId}?w=256&h=256&fit=crop&crop=faces&q=80&fm=avif`;
  const destPath = path.join(destDir, `avatar-${index}.avif`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`Saved avatar-${index}.avif (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Failed avatar-${index}:`, err.message);
  }
}

async function run() {
  console.log(`Downloading ${avatarPhotoIds.length} realistic avatars...`);
  for (let i = 0; i < avatarPhotoIds.length; i++) {
    await downloadAvatar(avatarPhotoIds[i], i + 1);
  }
  console.log('All avatars downloaded successfully!');
}

run();

