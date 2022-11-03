import {
  defineDocumentType,
  makeSource,
  ComputedFields,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug'; // Post Slug
import rehypeCodeTitles from 'rehype-code-titles'; // Code Title
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Add links to headings
import rehypePrism from 'rehype-prism-plus'; // Syntax highlighting
import GithubSlugger from 'github-slugger';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: doc => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: doc => doc.body.raw.split(/\s+/gu).length,
  },
  slug: {
    type: 'string',
    resolve: doc => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  headings: {
    type: 'json',
    resolve: async doc => {
      // use same package as rehypeSlug so toc and sluggified headings match
      // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
      const slugger = new GithubSlugger();

      // https://stackoverflow.com/a/70802303
      const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;

      const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
        value => {
          const groups = (
            value as { groups: { flag: string; content: string } }
          ).groups;
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        }
      );
      console.log(headings);

      return headings;
    },
  },
  externalLinks: {
    type: 'json',
    resolve: async doc => {
      // https://morioh.com/p/2f455138edf8
      const regXExternalLink =
        /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/gi;

      const externalLinks = Array.from(
        doc.body.raw.matchAll(regXExternalLink)
      ).map((value: any) => {
        const text = value[1];
        const url = value[2];
        if (!url) return;
        // Replacing all the / with @ to avoid folder structure
        const name = (url as string).replace(/[\/#]/g, '@');

        return {
          text,
          url,
          name,
        };
      });

      return externalLinks;
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Writing',
  filePathPattern: `writing/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    status: {
      type: 'enum',
      options: ['draft', 'published'],
      description: 'The status of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'A short summary of the post',
      required: false,
    },
    keywords: {
      type: 'string',
      description: 'Keywords for SEO',
      required: false,
    },
    author: {
      type: 'string',
      description: 'Author of the post',
      required: false,
    },
  },
  computedFields,
}));

export const Snippets = defineDocumentType(() => ({
  name: 'Snippets',
  filePathPattern: `snippets/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    status: {
      type: 'enum',
      options: ['draft', 'published'],
      description: 'The status of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    author: {
      type: 'string',
      description: 'Author of the post',
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Snippets],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
