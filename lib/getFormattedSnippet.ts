import { Snippets } from 'contentlayer/generated';

// don't send fields we don't use to the client
// the biggest culprit is post.body.raw (the raw MDX source)
export const getFormattedSnippets = ({
  title,
  slug,
  date,
  author,
  status,
  readingTime,
  body,
  // series,
  headings,
}: Snippets) =>
  // allPosts: Snippets[]
  ({
    title,
    slug,
    date,
    author,
    status,
    readingTime,
    body: {
      code: body.code,
    },
    headings:
      (headings as { heading: number; text: string; slug: string }[]) ?? null,
  });
