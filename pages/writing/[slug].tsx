import WritingLayout from '@/layouts/WritingLayout';
import { allWritings, Writing } from 'contentlayer/generated';

export default function Post({ data }: { data: Writing }) {
  return (
    <WritingLayout>
      <article className="prose mt-10">
        <h1>{data.title}</h1>
      </article>
    </WritingLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allWritings.map(writing => ({
      params: {
        slug: writing._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: {
      data: allWritings.find(
        writing =>
          // hello-world.mdx => hello-world
          writing._raw.sourceFileName.replace(/\.mdx$/, '') === params?.slug
      ),
    },
  };
}
