import Container from '@/layouts/Container';
import { allWritings, Writing } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { formatDate } from '@/lib/formatDate';

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
        <h1 className="tracking-[-0.02em] [font-variation-settings:'wght'_700]">
          {data.title}
        </h1>
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
