import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import rehypeSlug from 'rehype-slug'; // Add id to headings
import rehypeCodeTitles from 'rehype-code-titles'; // Code Title
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Add links to headings
import rehypePrism from 'rehype-prism-plus'; // Syntax highlighting

// https://astro.build/config
export default defineConfig({
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
  integrations: [tailwind(), react(), mdx({})],
  site: 'https://arikko.dev',
});
