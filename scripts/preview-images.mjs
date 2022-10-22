import { readFileSync } from 'fs';
import { chromium } from 'playwright-core';

const allWritings = readFileSync(
  '.contentlayer/generated/Writing/_index.json',
  'utf8'
);

function previewImages() {
  JSON.parse(allWritings).map(writing => {
    writing.externalLinks.map(async externalLink => {
      let browser = await chromium.launch();

      let page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 1080 });
      await page.goto(externalLink.url);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `public/previews/${externalLink.name}.png`,
      });
      await browser.close();
    });
  });
}

previewImages();
