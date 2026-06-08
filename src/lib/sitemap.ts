import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SitemapItem } from "@astrojs/sitemap";
import { EnumChangefreq } from "sitemap";
import { siteConfig } from "./config";

type Writing = {
  id: string;
  publishedAt: Date | undefined;
};

export function getPublishedWritings(): Writing[] {
  const dir = path.join(process.cwd(), "src/content/writings");
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => path.extname(file) === ".mdx")
    .flatMap((file) => {
      const { data } = matter.read(path.join(dir, file));

      if (data.status === "draft") {
        return [];
      }

      return [
        {
          id: file.replace(/\.mdx$/, ""),
          publishedAt: data.publishedAt
            ? new Date(data.publishedAt)
            : undefined,
        },
      ];
    });
}

export function shouldIndexPage(pageUrl: string): boolean {
  return ![`${siteConfig.url}/404`].includes(pageUrl);
}

export function serializeSitemap(item: SitemapItem): SitemapItem | undefined {
  const writings = getPublishedWritings();

  // Astro emits the root as `${url}/`; normalise so it matches and so every
  // emitted entry is trailing-slash-free (consistent with the canonical URLs).
  const url = item.url.replace(/\/$/, "");
  const entry = { ...item, url };

  const staticHighPriorityPages = [
    siteConfig.url,
    `${siteConfig.url}/projects`,
    `${siteConfig.url}/writings`,
  ];

  if (staticHighPriorityPages.includes(url)) {
    return {
      ...entry,
      changefreq: EnumChangefreq.MONTHLY,
      priority: 1,
    };
  }

  const writing = writings.find(
    (w) => url === `${siteConfig.url}/writings/${w.id}`,
  );

  if (writing) {
    return {
      ...entry,
      changefreq: EnumChangefreq.MONTHLY,
      priority: 1,
      lastmod: writing.publishedAt?.toISOString() || undefined,
    };
  }

  return undefined;
}
