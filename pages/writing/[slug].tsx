import Container from '@/layouts/Container';
import { allWritings, Writing } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { formatDate, formatDateFull } from '@/lib/formatDate';

export default function Post({ data }: { data: Writing }) {
  const MDXComponent = useMDXComponent(data.body.code);
  // console.log(data.headings);

  return (
    <Container
      title={`${data.title} | Arik Chakma`}
      description={data.summary}
      keywords={data.keywords}
      date={formatDate(data.date)}
    >
      <article className="font-main prose mt-10 text-[#313233]">
        <div>
          <h1 className="mb-0 tracking-[-0.02em] [font-variation-settings:'wght'_700]">
            {data.title}
          </h1>
          <div className="mt-3 mb-10 flex items-center gap-1.5 text-sm opacity-70">
            {data.author}
            <span aria-hidden className="whitespace-nowrap">
              ·
            </span>
            <time>{formatDateFull(data.date)}</time>
          </div>
        </div>

        {data.headings ? (
          <div className="mb-10">
            <h4 className="mt-0">Table of Contents</h4>
            <ol className="list-inside pl-0">
              {data.headings.map(
                (heading: { slug: string; text: string; heading: string }) => (
                  <li key={heading.slug}>
                    <a href={`#${heading.slug}`} className="no-underline">
                      {heading.text}
                    </a>
                  </li>
                )
              )}
            </ol>
          </div>
        ) : null}

        <MDXComponent
          components={{
            li: (props: any) => <li className="[&>p]:m-0">{props.children}</li>,
          }}
        />
      </article>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: allWritings.map(writing => ({
      params: {
        slug: writing.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: {
      data: allWritings.find(writing => writing.slug === params?.slug),
    },
  };
}
