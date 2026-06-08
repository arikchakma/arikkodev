import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../lib/config";

export async function GET(context: APIContext) {
  const writings = await getCollection("writings");

  return rss({
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      content: "http://purl.org/rss/1.0/modules/content/",
      atom: "http://www.w3.org/2005/Atom",
    },
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    trailingSlash: false,
    items: writings
      .sort(
        (a, b) =>
          (b.data.publishedAt?.getTime() ?? 0) -
          (a.data.publishedAt?.getTime() ?? 0),
      )
      .map((writing) => ({
        title: writing.data.title,
        description: writing.data.description,
        link: `/writings/${writing.id}`,
        pubDate: writing.data.publishedAt,
        author: "hello@arikko.dev (Arik Chakma)",
      })),
    customData: `<language>en-us</language> <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/> <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
}
