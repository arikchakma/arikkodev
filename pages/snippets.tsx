import { allSnippets } from 'contentlayer/generated';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Container from '@/layouts/Container';
import NextLink from 'next/link';
import { formatDate } from '@/lib/formatDate';
import { compareDesc } from 'date-fns';
import { getFormattedSnippets } from '@/lib/getFormattedSnippet';

export default function AllSnippets({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <ul className="mt-10">
        {snippets.map(snippet => (
          <li key={snippet.slug} className="">
            <NextLink
              href={{
                pathname: `/snippet/[slug]`,
                query: { slug: snippet.slug },
              }}
              className="flex items-baseline text-[#111827] no-underline transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70"
            >
              <h3 className="flex-1 py-1 pr-4 text-[1.1rem] font-medium tracking-tight [font-variation-settings:'wght'_500]">
                {snippet.title}
              </h3>
              <time
                dateTime={snippet.date}
                className="date text-sm text-[#9ca3af]"
              >
                {formatDate(snippet.date)}
              </time>
            </NextLink>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<{
  snippets: ReturnType<typeof getFormattedSnippets>[];
}> = async ctx => {
  const data = allSnippets.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  // .filter(writing => writing.status === 'published');
  return {
    props: {
      snippets: data.map(getFormattedSnippets),
    },
  };
};
