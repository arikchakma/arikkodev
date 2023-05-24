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
import { HeadingType } from './lib/getFormattedWriting';

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
      const slugger = new GithubSlugger();
      const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const headings = Array.from(doc.body.raw.matchAll(regXHeader)) as {
        groups: {
          flag: string;
          content: string;
        };
      }[];

      const enrichedHeadings: HeadingType[] = [];
      let parentHeading: HeadingType | null = null;

      headings.forEach((value, counter) => {
        const groups = value.groups;
        const flag = groups?.flag;
        const content = groups?.content;

        if (flag && flag.length === 2) {
          // If the heading is h2 (##), treat it as a parent
          parentHeading = {
            heading: flag.length,
            text: content,
            slug: content ? slugger.slug(content) : '',
            child: [],
          };
          enrichedHeadings.push(parentHeading);
        } else if (parentHeading) {
          // If the heading is not h2 (##) and there is a parent heading, treat it as a child
          parentHeading.child.push({
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : '',
          });
        }
      });

      parentHeading = null;
      return enrichedHeadings;
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

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post],
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
