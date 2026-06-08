/// <reference types="bun" />
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dir, "..");
const svgPath = join(root, "public/favicon.svg");
const outDir = join(root, "public/manifest");

const svg = await readFile(svgPath);

type RenderOptions = {
  background?: sharp.Color | null;
  padding?: number;
};

// Render the logo onto a square canvas. Transparent for browser tabs,
// white-backed + padded for OS home-screen / tile icons.
async function render(
  size: number,
  options: RenderOptions = {},
): Promise<Buffer> {
  const { background = null, padding = 0 } = options;
  const inner = Math.round(size * (1 - padding * 2));
  const logo = await sharp(svg, { density: 384 })
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();
}

const white: sharp.Color = { r: 255, g: 255, b: 255, alpha: 1 };

// SVG covers modern browsers; these PNGs back the contexts that can't use it
// (iOS home screen, Android/PWA install icons).
const padded: [string, number][] = [
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

for (const [name, size] of padded) {
  await writeFile(
    join(outDir, name),
    await render(size, { background: white, padding: 0.12 }),
  );
}

// favicon.ico — an ICO container holding PNG-encoded 16/32/48 entries.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((s) => render(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoPngs.length, 4);

let offset = 6 + icoPngs.length * 16;
const entries = icoPngs.map((png, i) => {
  const entry = Buffer.alloc(16);
  const size = icoSizes[i]!;
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // size of data
  entry.writeUInt32LE(offset, 12); // offset
  offset += png.length;
  return entry;
});
await writeFile(
  join(outDir, "favicon.ico"),
  Buffer.concat([header, ...entries, ...icoPngs]),
);

console.log("Generated icons in public/manifest from favicon.svg");
