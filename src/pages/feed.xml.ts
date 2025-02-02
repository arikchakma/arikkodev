import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../lib/config';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const writings = await getCollection('writings');

  return rss({
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    title: siteConfig.title,
    description: siteConfig.description,
    site: context?.site || 'https://arikko.dev',
    trailingSlash: false,
    items: [
      ...writings
        .sort(
          (a, b) =>
            new Date(b.data.publishedAt!).getTime() -
            new Date(a.data.publishedAt!).getTime(),
        )
        .map((writing) => ({
          title: writing.data.title,
          description: writing.data.description,
          link: `/writings/${writing.slug}`,
          pubDate: writing.data.publishedAt!,
          author: 'hello@arikko.dev (Arik Chakma)',
        })),
    ],
    customData: `<language>en-us</language> <atom:link href="https://arikko.dev/feed.xml" rel="self" type="application/rss+xml"/> <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
}
