import { Writing } from 'contentlayer/generated';
import { formatDate } from './formatDate';

// don't send fields we don't use to the client
// the biggest culprit is post.body.raw (the raw MDX source)
export const getFormattedWriting = ({
  title,
  slug,
  summary,
  date,
  author,
  keywords,
  status,
  readingTime,
  body,
  // series,
  headings,
}: Writing) =>
  // allPosts: Writing[]
  ({
    title,
    slug,
    date,
    author,
    keywords,
    status,
    readingTime,
    formatedDate: formatDate(date),
    summary: summary ?? null,
    body: {
      code: body.code,
    },
    headings:
      (headings as { heading: number; text: string; slug: string }[]) ?? null,
  });
