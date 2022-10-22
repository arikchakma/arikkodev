import Container from '@/layouts/Container';
import { allWritings } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { formatDate, formatDateFull } from '@/lib/formatDate';
import LinkPreview from '@/components/LinkPreview';
import { getFormattedWriting } from '@/lib/getFormattedWriting';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function Post({
  writing,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXComponent = useMDXComponent(writing.body.code);
  // console.log(writing.externalLinks);

  return (
    <Container
      title={`${writing.title} | Arik Chakma`}
      description={writing.summary}
      keywords={writing.keywords}
      date={formatDate(writing.date)}
    >
      <article className="font-main prose mt-10 text-[#313233]">
        <div>
          <h1 className="mb-0 tracking-[-0.02em] [font-variation-settings:'wght'_700]">
            {writing.title}
          </h1>
          <div className="mt-3 mb-10 flex items-center gap-1.5 text-sm opacity-70">
            {writing.author}
            <span aria-hidden className="whitespace-nowrap">
              ·
            </span>
            <time>{formatDateFull(writing.date)}</time>
          </div>
        </div>

        {writing.headings ? (
          <div className="mb-10">
            <h4 className="mt-0">Table of Contents</h4>
            <ol className="list-inside pl-0">
              {writing.headings.map(heading => (
                <li key={heading.slug}>
                  <a href={`#${heading.slug}`} className="no-underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <MDXComponent
          components={{
            li: (props: any) => <li className="[&>p]:m-0">{props.children}</li>,
            a: (props: any) => {
              return (
                <>
                  {props.className ? (
                    <a
                      className={`${props.className} font-bold`}
                      href={props.href}
                    >
                      {props.children}
                    </a>
                  ) : (
                    <LinkPreview href={props.href}>
                      {props.children}
                    </LinkPreview>
                  )}
                </>
              );
            },
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

export const getStaticProps: GetStaticProps<{
  writing: ReturnType<typeof getFormattedWriting>;
}> = async ({ params }) => {
  const data = allWritings.find(writing => writing.slug === params?.slug);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      writing: getFormattedWriting(data),
    },
  };
};
