import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import type { SitemapItem } from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';

type Writing = {
  id: string;
  publishedAt: Date | undefined;
};

export async function getPublishedWritings(): Promise<Writing[]> {
  const dir = path.join(process.cwd(), 'src/content/writings');
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => path.extname(file) === '.mdx')
    .flatMap((file) => {
      const { data } = matter.read(path.join(dir, file));

      if (data.status === 'draft') {
        return [];
      }

      return [
        { id: file.replace(/\.mdx$/, ''), publishedAt: new Date(data.publishedAt) },
      ];
    });
}

export function shouldIndexPage(pageUrl: string) {
  return !['https://arikko.dev/404'].includes(pageUrl);
}

export async function serializeSitemap(
  item: SitemapItem,
): Promise<SitemapItem | undefined> {
  const writings = await getPublishedWritings();

  const staticHighPriorityPages = [
    'https://arikko.dev',
    'https://arikko.dev/projects',
    'https://arikko.dev/writings',
  ];

  if (staticHighPriorityPages.includes(item.url)) {
    return {
      ...item,
      changefreq: EnumChangefreq.MONTHLY,
      priority: 1,
    };
  }

  const writing = writings.find(
    (w) => item.url === `https://arikko.dev/writings/${w.id}`,
  );

  if (writing) {
    return {
      ...item,
      changefreq: EnumChangefreq.MONTHLY,
      priority: 1,
      lastmod: writing.publishedAt?.toISOString() || undefined,
    };
  }

  return undefined;
}
