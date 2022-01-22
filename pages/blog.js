import { allBlogs } from '.contentlayer/data';
import { pick } from 'contentlayer/client';

import Container from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import Divider from '@/components/Divider';

export default function index({ posts }) {
  return (
    <Container
      title="Blog - Arik Chakma"
      description="Thoughts on tech, software, programming, tech, editing and cinematography."
    >
      <h1 className="mt-28 text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-gray-400">
        Thoughts on tech, software, programming, tech, editing and
        cinematography.
      </p>
      <div className="mt-12">
        {posts.map(post => (
          <BlogCard {...post} key={post.slug} />
        ))}
      </div>

      <Divider />
    </Container>
  );
}

export function getStaticProps() {
  const posts = allBlogs.map(post =>
    pick(post, ['slug', 'title', 'summary', 'readingTime'])
  );

  return { props: { posts } };
}
