import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug'; // Add id to headings
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Add links to headings
import rehypePrism from 'rehype-prism-plus'; // Syntax
import rehypeExternalLinks from 'rehype-external-links'; // External links

import { serializeSitemap, shouldIndexPage } from './scripts/sitemap';
import { remarkCodeTitles } from './src/lib/remark-code-titles';
import { notesRedirects, writingRedirects } from './scripts/redirect';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://arikko.dev',
  trailingSlash: 'never',
  redirects: {
    ...(await writingRedirects()),
    ...(await notesRedirects()),
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
          // @ts-ignore
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
      // @ts-ignore
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
    mdx(),
    sitemap({
      serialize: serializeSitemap,
      filter: shouldIndexPage,
    }),
    react(),
  ],
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
