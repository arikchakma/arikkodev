import path from "node:path";
import fs from "node:fs/promises";
import matter from "gray-matter";
import satori from "satori";
import sharp from "sharp";

const ROOT = process.cwd();
const WRITINGS_DIR = path.join(ROOT, "src/content/writings");
const FONTS_DIR = path.join(ROOT, "scripts/fonts");
const OUT_DIR = path.join(ROOT, "public/images/og-images/writings");

const BLACK = "#000000";
const RED = "#dc2626";
const ZINC_500 = "#71717a";
const ZINC_400 = "#a1a1aa";

type Writing = {
  id: string;
  title: string;
  description?: string;
};

// Victory hand, resting (open) pose — paths lifted from src/components/VictoryHand.tsx
const LEFT_UP =
  "M345.995 520.082C326.495 448.416 286.595 284.382 282.995 201.582C278.495 98.0823 298.995 27.5823 400.995 18.5823C502.995 9.58233 525.495 105.082 519.495 268.582L512 599.498";
const RIGHT_UP =
  "M722.995 590.582C764.995 480.082 784.118 425.391 807.995 368.582C863.495 212.582 891.419 199.468 882.995 137.082C866.995 18.5825 734.995 47.0822 695.995 74.0822C656.995 101.082 625.495 131.082 580.995 327.082L525 605.498";
const PALM =
  "M435.496 1005.09C397.495 943.589 412.996 841.089 495.996 789.089M601.496 767.089C560.996 783.589 458.696 803.389 373.496 750.589C266.996 684.589 311.495 586.589 373.496 588.589C435.496 590.589 452.022 623.363 590.496 592.585C653.496 578.582 843.496 573.586 849.496 789.089C854.911 983.582 609.495 1150.59 373.496 1113.59C184.696 1083.99 118.496 946.589 108.996 881.589";
const KNUCKLES =
  "M218.495 831.08C204.662 855.746 162.195 897.68 102.995 868.08C28.9951 831.08 22.4952 772.08 18.4952 716.58C14.4952 661.08 33.9954 580.081 102.995 562.58C136.662 554.04 164.328 572.246 173.495 580.08M412.995 772.582C411.329 801.248 391.995 858.182 327.995 856.582C247.995 854.582 186.495 838.578 165.495 716.58C144.495 594.581 194.995 513.081 277.995 506.081C344.395 500.481 386.329 559.081 398.995 589.081";
const HEART =
  "M134.995 398.082C100.995 365.082 53.372 332.22 70.372 379.22C81.372 411.22 124.372 442.22 160.372 452.22C176.372 414.22 193.372 366.22 171.372 339.22C161.372 327.22 143.995 388.082 134.995 398.082Z";

// Padded viewBox so the round stroke caps (the component uses overflow: visible)
// don't clip at the edges.
const VB_X = -40;
const VB_Y = -40;
const VB_W = 983;
const VB_H = 1217;
const HAND_SVG = `<svg width="${VB_W}" height="${VB_H}" viewBox="${VB_X} ${VB_Y} ${VB_W} ${VB_H}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${LEFT_UP}" stroke="${BLACK}" stroke-width="52" stroke-linecap="round"/><path d="${RIGHT_UP}" stroke="${BLACK}" stroke-width="52" stroke-linecap="round"/><path d="${PALM}" stroke="${BLACK}" stroke-width="52" stroke-linecap="round"/><path d="${KNUCKLES}" stroke="${BLACK}" stroke-width="52" stroke-linecap="round"/><path d="${HEART}" fill="${RED}" stroke="${RED}" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const HAND_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(HAND_SVG).toString("base64")}`;
const HAND_HEIGHT = 40;
const HAND_WIDTH = Math.round((VB_W / VB_H) * HAND_HEIGHT);

async function getWritings(): Promise<Writing[]> {
  const files = await fs.readdir(WRITINGS_DIR);
  const writings: Writing[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const raw = await fs.readFile(path.join(WRITINGS_DIR, file));
    const { data } = matter(raw);

    // Skip writings that pin their own OG image.
    if (data?.seo?.ogImageUrl) continue;

    writings.push({
      id: file.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
    });
  }

  return writings;
}

async function loadFonts() {
  const weights = [
    { weight: 400, file: "geist-regular.ttf" },
    { weight: 500, file: "geist-medium.ttf" },
    { weight: 600, file: "geist-semibold.ttf" },
  ] as const;
  return Promise.all(
    weights.map(async ({ weight, file }) => ({
      name: "Geist",
      weight,
      style: "normal" as const,
      data: await fs.readFile(path.join(FONTS_DIR, file)),
    })),
  );
}

async function renderCard(
  writing: Writing,
  fonts: Awaited<ReturnType<typeof loadFonts>>,
) {
  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        padding: "80px",
        backgroundColor: "#ffffff",
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 26,
        }}
      >
        <img
          src={HAND_DATA_URI}
          width={HAND_WIDTH}
          height={HAND_HEIGHT}
          style={{ marginRight: 14 }}
        />
        <span style={{ fontWeight: 500, color: ZINC_400 }}>arikko.dev</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: BLACK,
          }}
        >
          {writing.title}
        </div>
        {writing.description ? (
          <div
            style={{
              display: "flex",
              fontWeight: 400,
              fontSize: 30,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: ZINC_500,
              marginTop: 20,
              textWrap: "balance",
            }}
          >
            {writing.description}
          </div>
        ) : null}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(OUT_DIR, `${writing.id}.png`));
}

const writings = await getWritings();
const fonts = await loadFonts();
await fs.mkdir(OUT_DIR, { recursive: true });

console.log(`🎨 Generating ${writings.length} OG image(s)...`);
for (const writing of writings) {
  await renderCard(writing, fonts);
  console.log(`✅ ${writing.id}.png`);
}
console.log("✨ Done");
