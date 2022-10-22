// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { chromium } from 'playwright-core';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { url } = req.query;
//   const replacedUrl = (url as string).replace(/\//g, '@');

//   let browser = await chromium.launch();

//   let page = await browser.newPage();
//   await page.setViewportSize({ width: 1440, height: 1080 });
//   await page.goto(url as string);
//   await page.waitForTimeout(1000);
//   await page.screenshot({ path: `public/previews/${replacedUrl}.png` });
//   await browser.close();
//   res.send('ok');
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}
