import { allWritings, Writing } from 'contentlayer/generated';
import { GetStaticProps } from 'next';
import Container from '@/layouts/Container';
import NextLink from 'next/link';
import { formatDate } from '@/lib/formatDate';
import { compareDesc } from 'date-fns';

export default function AllWritings({ writings }: { writings: Writing[] }) {
  return (
    <Container>
      <ul className="mt-10">
        {writings.map(writing => (
          <li key={writing.slug} className="">
            <NextLink href={`/writing/${writing.slug}`}>
              <a className="flex items-baseline text-[#111827] no-underline transition-colors duration-100 ease-in-out hover:no-underline hover:opacity-70">
                <h3 className="flex-1 py-1 pr-4 text-[1.1rem] font-medium tracking-tight [font-variation-settings:'wght'_500]">
                  {writing.title}
                </h3>
                <time
                  dateTime={writing.date}
                  className="date text-sm text-[#9ca3af]"
                >
                  {formatDate(writing.date)}
                </time>
              </a>
            </NextLink>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ctx => {
  const writings = allWritings.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return {
    props: {
      writings,
    },
  };
};
