import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../lib/config';

export function GET(context: APIContext) {
  return rss({
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    title: siteConfig.title,
    description: siteConfig.description,
    site: context?.site || 'https://arikko.dev',
    items: [],
    customData: `<language>en-us</language> <atom:link href="https://arikko.dev/feed.xml" rel="self" type="application/rss+xml"/> <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
}
