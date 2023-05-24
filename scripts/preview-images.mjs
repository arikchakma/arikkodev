import { readFileSync } from 'fs';
import { chromium } from 'playwright-core';

const allWritings = readFileSync(
  '.contentlayer/generated/Writing/_index.json',
  'utf8'
);

const altLinks = [
  'https://arikko.dev',
  'https://shoutly.club',
  'https://roadmap.sh',
  'https://tokens-army.vercel.app/',
  'https://preactjs.com/',
  'https://astro.build/',
  'https://github.com/kamranahmedse/developer-roadmap/blob/master/src/components/CommandMenu/CommandMenu.tsx',
];

function previewImages() {
  JSON.parse(allWritings).map(writing => {
    writing.externalLinks.map(async externalLink => {
      if (!externalLink) return;
      let browser = await chromium.launch();

      let page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 1080 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(externalLink.url);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `public/previews/${externalLink.name}.png`,
      });
      await browser.close();
    });
  });
  altLinks.map(async link => {
    const name = link.replace(/\//g, '@').replace(/#/g, '@');
    let browser = await chromium.launch();

    let page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 1080 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(link);
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `public/previews/${name}.png`,
    });
    await browser.close();
  });
}

previewImages();
