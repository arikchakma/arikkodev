import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { transformerMetaHighlight } from "@shikijs/transformers";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

import { vercelTheme } from "./src/lib/shiki";
import { transformerCodeTitle } from "./src/lib/code-title";
import { autolinkOptions, externalLinksOptions } from "./src/lib/rehype";
import { serializeSitemap, shouldIndexPage } from "./src/lib/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://arikko.dev",
  trailingSlash: "never",
  output: "static",
  adapter: vercel({}),
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: vercelTheme,
      wrap: false,
      transformers: [transformerMetaHighlight(), transformerCodeTitle()],
    },
    processor: unified({
      gfm: true,
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, autolinkOptions],
        [rehypeExternalLinks, externalLinksOptions],
      ],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize: serializeSitemap,
      filter: shouldIndexPage,
    }),
  ],
});
