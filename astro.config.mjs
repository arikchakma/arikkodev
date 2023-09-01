import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import rehypeSlug from 'rehype-slug'; // Add id to headings
import rehypeCodeTitles from 'rehype-code-titles'; // Code Title
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Add links to headings
import rehypePrism from 'rehype-prism-plus'; // Syntax highlighting

import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://arikko.dev',
  trailingSlash: "never",
  markdown: {
    syntaxHighlight: 'prism',
    gfm: true,
    rehypePlugins: [
      rehypeCodeTitles,
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
        rehypePrism,
        {
          ignoreMissing: true,
          showLineNumbers: true,
          transformInlineCode: true,
        },
      ],
    ],
  },
  integrations: [
    tailwind(),
    mdx({}),
    sitemap({
      serialize: serializeSitemap,
      filter: shouldIndexPage,
    }),
  ],
});
