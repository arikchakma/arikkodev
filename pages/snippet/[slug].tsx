import Container from '@/layouts/Container';
import { allSnippets } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { formatDate, formatDateFull } from '@/lib/formatDate';
import LinkPreview from '@/components/LinkPreview';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getFormattedSnippets } from '@/lib/getFormattedSnippet';

export default function Post({
  snippet,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXComponent = useMDXComponent(snippet.body.code);

  return (
    <Container
      title={`${snippet.title} | Arik Chakma`}
      date={formatDate(snippet.date)}
    >
      <article className="font-main prose mt-10 text-[#313233]">
        <div>
          <h1 className="mb-0 tracking-[-0.02em] [font-variation-settings:'wght'_700] -sm:text-3xl -sm:leading-[1.1111]">
            {snippet.title}
          </h1>
          <div className="mt-3 mb-10 flex items-center gap-1.5 text-sm opacity-70">
            {snippet.author}
            <span aria-hidden className="whitespace-nowrap">
              ·
            </span>
            <time>{formatDateFull(snippet.date)}</time>
          </div>
        </div>

        {snippet.headings ? (
          <div className="mb-10">
            <h4 className="mt-0">Table of Contents</h4>
            <ol className="list-inside pl-0">
              {snippet.headings.map(heading => (
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
                  {props.className || props.href.includes('twitter.com') ? (
                    <>
                      {props.href.includes('twitter.com') ? (
                        <>
                          <a
                            className={`${props.className} font-bold`}
                            href={props.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {props.children}
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            className={`${props.className} font-bold`}
                            href={props.href}
                          >
                            {props.children}
                          </a>
                        </>
                      )}
                    </>
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
    paths: allSnippets.map(writing => ({
      params: {
        slug: writing.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  snippet: ReturnType<typeof getFormattedSnippets>;
}> = async ({ params }) => {
  const data = allSnippets.find(writing => writing.slug === params?.slug);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      snippet: getFormattedSnippets(data),
    },
  };
};
