import { readFileSync, writeFileSync } from 'fs';
import { chromium } from 'playwright-core';

const allWritings = readFileSync(
  '.contentlayer/generated/Writing/_index.json',
  'utf8'
);

// Get all the file names from the public/previews folder
const images = JSON.parse(readFileSync('public/previews/index.json', 'utf8'));

const altLinks = [
  'https://arikko.dev',
  'https://maily.to',
  'https://roadmap.sh',
  'https://tokens-army.vercel.app/',
  'https://preactjs.com/',
  'https://astro.build/',
  'https://github.com/kamranahmedse/developer-roadmap/blob/master/src/components/CommandMenu/CommandMenu.tsx',
  'https://docs.astro.build/en/guides/imports/#astroglob',
  'https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints',
];
const imagesList = [];

async function previewImages() {
  const browser = await chromium.launch();
  await Promise.all(JSON.parse(allWritings).map(writing => {
    writing.externalLinks.map(async externalLink => {
      if (!externalLink) return;

      if (images.images.includes(externalLink.name)) return;
      let page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 1080 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(externalLink.url);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `public/previews/${externalLink.name}.png`,
      });
      imagesList.push(externalLink.name);
      await page.close();
    });
  }))
  await Promise.all(
    altLinks.map(async link => {
      const name = link.replace(/\//g, '@').replace(/#/g, '@');

      if (images.images?.includes(name)) return;

      let page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 1080 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(link);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `public/previews/${name}.png`,
      });
      await page.close();
      imagesList.push(name);
    })
  );
  await browser.close();
}

previewImages().finally(() => {
  console.log(imagesList)
  writeFileSync(
    'public/previews/index.json',
    JSON.stringify({
      images: [...images.images, ...imagesList],
    })
  );
});
