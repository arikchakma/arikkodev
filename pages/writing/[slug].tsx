import WritingLayout from '@/layouts/WritingLayout';
import { allWritings, Writing } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function Post({ data }: { data: Writing }) {
  const Component = useMDXComponent(data.body.code);
  return (
    <WritingLayout>
      <article className="font-main prose mt-10 text-[#313233]">
        {/* <h1>{data.title}</h1> */}
        <Component />
      </article>
    </WritingLayout>
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
