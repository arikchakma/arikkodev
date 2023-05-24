import Container from '@/layouts/Container';
import { allWritings } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { formatDate } from '@/lib/formatDate';
import LinkPreview from '@/components/LinkPreview';
import { getFormattedWriting } from '@/lib/getFormattedWriting';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '@/components/CodeBlock';
import LinkPreviewDemo from '@/components/demos/LinkPreviewDemo';
import { CSSProperties } from 'react';

export default function Post({
  writing,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXComponent = useMDXComponent(writing.body.code);

  const imageUrl = `https://arikko.dev/api/og?${new URLSearchParams({
    title: writing.title ?? '',
    summary: writing.summary ?? '',
    date: writing.formatedDate ?? '',
  })}`;

  return (
    <Container
      title={`${writing.title} | Arik Chakma`}
      description={writing.summary}
      keywords={writing.keywords}
      date={formatDate(writing.date)}
      image={imageUrl}
    >
      <article className="font-main prose mt-10 text-[#313233]">
        <div>
          <h1 className="mb-0 tracking-[-0.02em] [font-variation-settings:'wght'_700] -sm:text-3xl -sm:leading-[1.1111]">
            {writing.title}
          </h1>
          <div className="mb-10 mt-3 flex items-center gap-1.5 text-sm opacity-70">
            {writing.author}

            <span aria-hidden className="whitespace-nowrap">
              ·
            </span>
            <time>{writing.formatedDate}</time>
          </div>
        </div>

        {writing.headings ? (
          <div className="mb-10">
            <h4 className="mt-0">Table of Contents</h4>
            <ol className="list-inside pl-0">
              {writing.headings.map((heading, counter) => (
                <li key={heading.slug}>
                  <a href={`#${heading.slug}`} className="no-underline">
                    {heading.text}
                  </a>

                  {heading.child.length > 0 && (
                    <ol className="my-0 ml-6">
                      {heading.child.map((children, childCounter) => {
                        return (
                          <li
                            key={children.slug}
                            style={
                              {
                                '--counter': `'${counter + 1}.${
                                  childCounter + 1
                                }.'`,
                              } as CSSProperties
                            }
                            className={`marker:content-[var(--counter)]`}
                          >
                            <a
                              href={`#${children.slug}`}
                              className="no-underline"
                            >
                              {children.text}
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  )}
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
            pre: (props: any) => <>{props.children}</>,
            code: (props: any) => {
              const isInlineCode = !props.className;
              return (
                <>
                  {isInlineCode ? (
                    <code className="[white-space:break-spaces]">
                      {props.children}
                    </code>
                  ) : (
                    <CodeBlock {...props}>{props.children}</CodeBlock>
                  )}
                </>
              );
            },
            LinkPreviewDemo: LinkPreviewDemo,
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
