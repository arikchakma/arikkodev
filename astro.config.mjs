import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug'; // Add id to headings
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Add links to headings
import rehypePrism from 'rehype-prism-plus'; // Syntax
import rehypeExternalLinks from 'rehype-external-links'; // External links

import { serializeSitemap, shouldIndexPage } from './scripts/sitemap.mjs';

import { remarkCodeTitles } from './src/lib/remark-code-titles';
import { writingRedirects } from './scripts/redirect.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://arikko.dev',
  trailingSlash: 'never',
  redirects: {
    ...(await writingRedirects()),
  },
  markdown: {
    syntaxHighlight: false,
    gfm: true,
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: function (element) {
            const href = element.properties.href;
            const whiteListedStarts = [
              '/',
              '#',
              'mailto:',
              'https://arikko.dev',
            ];
            if (whiteListedStarts.some((start) => href.startsWith(start))) {
              return [];
            }
            return 'noopener noreferrer nofollow';
          },
        },
      ],
      [
        rehypePrism,
        {
          ignoreMissing: true,
          showLineNumbers: true,
        },
      ],
    ],
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      serialize: serializeSitemap,
      filter: shouldIndexPage,
    }),
  ],
  build: {
    format: 'file',
  },
});
