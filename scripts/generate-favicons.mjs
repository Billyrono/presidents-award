/**
 * Generate favicons and Open Graph image from the PA Logo SVG.
 */

import sharp from 'sharp';
import { readFileSync, copyFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const SVG_PATH = join(ROOT, 'public', 'Logo', 'PA Logo.svg');
const FAVICONS_DIR = join(ROOT, 'public', 'favicons');
const PUBLIC_DIR = join(ROOT, 'public');

mkdirSync(FAVICONS_DIR, { recursive: true });

const svgBuffer = readFileSync(SVG_PATH);

// ── Favicon sizes ──────────────────────────────────────────────
const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'mstile-150x150.png', size: 150 },
];

for (const { name, size } of sizes) {
    await sharp(svgBuffer, { density: 300 })
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(join(FAVICONS_DIR, name));
    console.log(`OK ${name} (${size}x${size})`);
}

// ── favicon.ico (48x48 PNG) ────────────────────────────────────
await sharp(svgBuffer, { density: 300 })
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(FAVICONS_DIR, 'favicon.ico'));
console.log('OK favicon.ico (48x48)');

// ── Copy SVG for safari-pinned-tab ─────────────────────────────
copyFileSync(SVG_PATH, join(FAVICONS_DIR, 'safari-pinned-tab.svg'));
console.log('OK safari-pinned-tab.svg');

// ── Open Graph image (1200x630) ────────────────────────────────
const logoSize = 400;
const ogWidth = 1200;
const ogHeight = 630;

const logoPng = await sharp(svgBuffer, { density: 300 })
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

await sharp({
    create: {
        width: ogWidth,
        height: ogHeight,
        channels: 4,
        background: { r: 26, g: 26, b: 26, alpha: 255 },
    },
})
    .composite([
        {
            input: logoPng,
            left: Math.round((ogWidth - logoSize) / 2),
            top: Math.round((ogHeight - logoSize) / 2),
        },
    ])
    .png()
    .toFile(join(PUBLIC_DIR, 'og-image.png'));
console.log('OK og-image.png (1200x630)');

// ── Web manifest ───────────────────────────────────────────────
const manifest = {
    name: "President's Award - Kirinyaga University",
    short_name: "President's Award",
    icons: [
        { src: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#1a1a1a',
    background_color: '#1a1a1a',
    display: 'standalone',
};
writeFileSync(join(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('OK site.webmanifest');

// ── browserconfig.xml ──────────────────────────────────────────
const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/favicons/mstile-150x150.png"/>
      <TileColor>#1a1a1a</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
writeFileSync(join(PUBLIC_DIR, 'browserconfig.xml'), browserconfig);
console.log('OK browserconfig.xml');

console.log('\nDone! All assets generated.');
